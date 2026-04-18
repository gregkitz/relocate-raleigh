'use server'

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Resend } from 'resend'
import { z } from 'zod'

const DEST = 'team@relocateraleigh.com'
const FROM = 'Relocate Raleigh <team@relocateraleigh.com>'
const GUIDE_PDF_PATH = path.join(process.cwd(), 'content', 'relocation-guide.pdf')
const GUIDE_PDF_FILENAME = 'Relocate-Raleigh-Guide.pdf'

async function loadGuidePdf(): Promise<Buffer | null> {
  try {
    return await readFile(GUIDE_PDF_PATH)
  } catch (err) {
    console.error('Guide PDF not found at', GUIDE_PDF_PATH, err)
    return null
  }
}

const guideSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Please enter a valid email'),
  origin: z.string().max(100).optional(),
})

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Please enter a valid email'),
  message: z.string().min(1, 'Message is required').max(5000),
  timeline: z.string().max(50).optional(),
})

export type FormState = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

const initialStateOk = (message: string): FormState => ({ ok: true, message })
const initialStateErr = (message: string): FormState => ({ ok: false, message })

function getClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

export async function submitGuideRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = guideSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    origin: formData.get('origin') || undefined,
  })

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, origin } = parsed.data
  const resend = getClient()
  const pdfBuffer = await loadGuidePdf()

  try {
    await resend.emails.send({
      from: FROM,
      to: DEST,
      replyTo: email,
      subject: `New guide request: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        origin ? `Moving from: ${origin}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    const visitorEmail = {
      from: FROM,
      to: email,
      replyTo: DEST,
      subject: 'Your Relocate Raleigh Guide',
      text:
        `Hi ${name},\n\n` +
        (pdfBuffer
          ? `Your Relocate Raleigh Guide is attached as a PDF — 8 chapters plus checklists, written by a local who made the move himself.\n\n`
          : `Thanks for requesting the Relocate Raleigh Guide. We'll email the PDF shortly.\n\n`) +
        `Reply to this email with any questions about the move — we read every response.\n\n` +
        `— The Relocate Raleigh team`,
      ...(pdfBuffer
        ? {
            attachments: [
              {
                filename: GUIDE_PDF_FILENAME,
                content: pdfBuffer,
              },
            ],
          }
        : {}),
    }

    await resend.emails.send(visitorEmail)

    return initialStateOk(
      pdfBuffer
        ? 'Check your inbox — the guide is on its way.'
        : "Check your inbox — we just sent you a confirmation.",
    )
  } catch (err) {
    console.error('submitGuideRequest failed:', err)
    return initialStateErr('Something went wrong sending your request. Please try again.')
  }
}

export async function submitContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    timeline: formData.get('timeline') || undefined,
  })

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, message, timeline } = parsed.data
  const resend = getClient()

  try {
    await resend.emails.send({
      from: FROM,
      to: DEST,
      replyTo: email,
      subject: `New contact: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        timeline ? `Timeline: ${timeline}` : null,
        '',
        'Message:',
        message,
      ]
        .filter((l) => l !== null)
        .join('\n'),
    })

    return initialStateOk('Thanks — Nick will reply within a day or two.')
  } catch (err) {
    console.error('submitContactMessage failed:', err)
    return initialStateErr('Something went wrong sending your message. Please try again.')
  }
}
