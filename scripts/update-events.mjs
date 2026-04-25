// Refresh src/data/events.json by asking Claude (Opus 4.7 with web search)
// to research upcoming Triangle-area events.
//
// Local: `npm run update-events` — loads ANTHROPIC_API_KEY from .env.local
// CI:    GitHub Actions sets ANTHROPIC_API_KEY directly from secrets.

import Anthropic from '@anthropic-ai/sdk'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'events.json')

const EVENT_CATEGORIES = ['Networking', 'Cultural', 'Tech', 'Family', 'Outdoor']

const today = new Date().toISOString().slice(0, 10)
const horizonDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10)

const SYSTEM_PROMPT = `You are a local-events researcher for a Raleigh-Durham relocation marketing site whose audience is families considering a move to the Triangle.

Your job: research and curate 6–8 upcoming public events between ${today} and ${horizonDate} that would help a transplant get a feel for the region. Use the web_search tool to find real, verified events with confirmed dates — search broad terms (e.g. "Triangle events June 2026", "Raleigh tech meetups summer 2026") rather than one search per event so you stay efficient. When you have enough, call the submit_events tool exactly once.

Geography: Raleigh, Durham, Chapel Hill, Cary, Apex, Morrisville, Holly Springs, Wake Forest, RTP, plus drivable-from-Triangle events (coast, mountains, Charlotte day trips) when they're particularly notable.

Categories (use exactly these labels):
- Networking — tech meetups, professional groups, scaleups
- Cultural — festivals, arts, multicultural events
- Tech — conferences, hackathons, technical talks
- Family — kid-friendly events, museums, family festivals
- Outdoor — hikes, paddles, park programs, outdoor festivals

Rules:
- Verify dates from primary sources (event website, venue calendar, official org page). Skip anything you can't confirm.
- Aim for variety across categories. No more than 3 events of the same category.
- Prefer events with broad appeal over narrow niche meetups.
- "url" should be a direct link to the event page when available, or null.
- "summary" is 1–2 sentences describing the event in plain, useful language. No marketing fluff.
- Date format: YYYY-MM-DD (ISO 8601).`

const submitEventsTool = {
  name: 'submit_events',
  description:
    'Submit the final curated list of upcoming Triangle events. Call this exactly once after research is complete.',
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      events: {
        type: 'array',
        description: 'The curated list of 8–10 events.',
        items: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'The event name.',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'ISO 8601 date in YYYY-MM-DD format.',
            },
            location: {
              type: 'string',
              description: 'Venue and city, e.g. "Frontier RTP" or "DPAC, Durham".',
            },
            category: {
              type: 'string',
              enum: EVENT_CATEGORIES,
            },
            url: {
              type: ['string', 'null'],
              description: 'Direct link to the event page, or null if no clear URL.',
            },
            summary: {
              type: 'string',
              description: '1–2 sentence description for a transplant audience.',
            },
          },
          required: ['title', 'date', 'location', 'category', 'url', 'summary'],
          additionalProperties: false,
        },
      },
    },
    required: ['events'],
    additionalProperties: false,
  },
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set')
  }

  // maxRetries: 0 disables the SDK's automatic retry on timeouts and 5xx
  // errors. Each retry triggers a full new model run that we still get billed
  // for, even when the response never makes it back. With retries off, a
  // failure surfaces immediately and we don't burn credits on phantom runs.
  const client = new Anthropic({ maxRetries: 0 })

  const userPrompt = `Research and submit 6–8 upcoming Triangle-area events between ${today} and ${horizonDate}. You have a budget of 4 web searches — use them efficiently by searching broad terms (e.g. "Triangle NC events June 2026") rather than one search per event. Verify dates from the search results before including any event.`

  // Streaming avoids the SDK's default 10-minute HTTP timeout for long-running
  // tool-use calls. .finalMessage() resolves to the same shape as a non-streamed
  // response.
  const baseParams = {
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    tools: [
      // max_uses caps server-side web searches per request. Each search result
      // feeds back into the model's context (~2-4K input tokens per search) plus
      // a per-search fee. Tier 1 orgs have a 30K input-tokens-per-minute limit
      // on Sonnet 4.6 — keeping max_uses low keeps a single request under it.
      { type: 'web_search_20260209', name: 'web_search', max_uses: 4 },
      submitEventsTool,
    ],
  }

  const messages = [{ role: 'user', content: userPrompt }]
  console.log('Starting research with web_search...')

  let response = await client.messages.stream({ ...baseParams, messages }).finalMessage()
  console.log(`Initial pass done: stop_reason=${response.stop_reason}`)

  // web_search_20260209 uses dynamic filtering, which provisions a server-side
  // code execution container. On pause_turn continuations, we must pass the
  // same container_id so Claude can resume in the existing container.
  let containerId = response.container?.id ?? null

  // The web_search tool runs server-side. If it hits its iteration cap before
  // Claude calls submit_events, the API returns stop_reason="pause_turn" and
  // expects us to re-send the assistant turn so it can continue.
  let safetyCounter = 0
  while (response.stop_reason === 'pause_turn' && safetyCounter < 3) {
    console.log(`pause_turn — continuing (round ${safetyCounter + 1})...`)
    messages.push({ role: 'assistant', content: response.content })
    const params = { ...baseParams, messages }
    if (containerId) params.container = containerId
    response = await client.messages.stream(params).finalMessage()
    if (response.container?.id) containerId = response.container.id
    safetyCounter += 1
  }

  const submitBlock = response.content.find(
    (b) => b.type === 'tool_use' && b.name === 'submit_events',
  )
  if (!submitBlock) {
    throw new Error(
      `Claude did not call submit_events. stop_reason=${response.stop_reason}. ` +
        `Content types: ${response.content.map((b) => b.type).join(', ')}`,
    )
  }

  const events = submitBlock.input.events
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error('submit_events returned no events')
  }

  events.sort((a, b) => a.date.localeCompare(b.date))

  const output = {
    generatedAt: new Date().toISOString(),
    events,
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n')

  console.log(`Wrote ${events.length} events to ${OUTPUT_PATH}`)
  console.log(
    `Usage: ${response.usage.input_tokens} input + ${response.usage.output_tokens} output tokens`,
  )
}

main().catch((err) => {
  console.error('update-events failed:', err)
  process.exit(1)
})
