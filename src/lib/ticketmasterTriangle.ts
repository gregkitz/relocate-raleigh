/**
 * Triangle-area events via Ticketmaster Discovery API v2.
 * Register: https://developer.ticketmaster.com/
 * Env: TICKETMASTER_API_KEY (server only — do not use NEXT_PUBLIC_)
 */

export type TriangleEventCard = {
  id: string;
  dateLabel: string;
  title: string;
  loc: string;
  tag: string;
  url: string;
};

/** Shown when the API key is missing or the request fails */
const FALLBACK: TriangleEventCard[] = [
  {
    id: "static-1",
    dateLabel: "APR 20",
    title: "RTP Slavic Tech Meetup",
    loc: "Frontier RTP",
    tag: "Networking",
    url: "https://www.ticketmaster.com/search?q=RTP+tech+Raleigh",
  },
  {
    id: "static-2",
    dateLabel: "MAY 05",
    title: "Cary Dragon Boat Festival",
    loc: "Bond Park",
    tag: "Cultural",
    url: "https://www.ticketmaster.com/search?q=Cary+NC+festival",
  },
  {
    id: "static-3",
    dateLabel: "MAY 12",
    title: "Next.js RDU Workshop",
    loc: "Red Hat Annex",
    tag: "Tech",
    url: "https://www.ticketmaster.com/search?q=Raleigh+workshop",
  },
];

/** Approx. centroid Raleigh–Durham–Chapel Hill */
const LATLONG = "35.88,-78.85";
const RADIUS_MI = "40";

function formatDateLabel(localDate?: string, dateTime?: string): string {
  const raw = localDate ?? (dateTime ? dateTime.slice(0, 10) : "");
  if (!raw) return "TBD";
  const d = new Date(raw + (raw.length <= 10 ? "T12:00:00" : ""));
  if (Number.isNaN(d.getTime())) return "TBD";
  const mon = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  return `${mon} ${day}`;
}

function venueLine(e: {
  _embedded?: { venues?: Array<{ name?: string; city?: { name?: string } }> };
}): string {
  const v = e._embedded?.venues?.[0];
  if (!v) return "Triangle area";
  const city = v.city?.name ?? "";
  const name = v.name ?? "";
  if (name && city) return `${name} · ${city}`;
  return name || city || "Triangle area";
}

function inferTag(name: string, segment?: string): string {
  const n = name.toLowerCase();
  if (
    /\b(tech|developer|devops|code|software|data|ai\b|ml\b|startup|hackathon|python|java|webinar)\b/.test(
      n,
    )
  ) {
    return "Tech";
  }
  const s = (segment ?? "").toLowerCase();
  if (s.includes("arts") || s === "music" || s === "film" || s.includes("theatre") || s.includes("theater")) {
    return "Cultural";
  }
  if (s === "sports") return "Sports";
  if (s === "miscellaneous") return "Event";
  return "Cultural";
}

type TmEvent = {
  id: string;
  name: string;
  url: string;
  dates?: { start?: { localDate?: string; dateTime?: string } };
  classifications?: Array<{ segment?: { name?: string } }>;
  _embedded?: { venues?: Array<{ name?: string; city?: { name?: string } }> };
};

function mapEvent(e: TmEvent): TriangleEventCard {
  const segment = e.classifications?.[0]?.segment?.name;
  return {
    id: e.id,
    dateLabel: formatDateLabel(e.dates?.start?.localDate, e.dates?.start?.dateTime),
    title: e.name,
    loc: venueLine(e),
    tag: inferTag(e.name, segment),
    url: e.url,
  };
}

export type TriangleEventsResult = {
  events: TriangleEventCard[];
  /** True when Ticketmaster returned events; false for placeholder cards */
  isLive: boolean;
};

export async function getTriangleEvents(): Promise<TriangleEventsResult> {
  const key = process.env.TICKETMASTER_API_KEY?.trim();
  if (!key) {
    return { events: FALLBACK, isLive: false };
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const startDateTime = start.toISOString().replace(/\.\d{3}Z$/, "Z");

  const base = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  base.searchParams.set("apikey", key);
  base.searchParams.set("latlong", LATLONG);
  base.searchParams.set("radius", RADIUS_MI);
  base.searchParams.set("unit", "miles");
  base.searchParams.set("sort", "date,asc");
  base.searchParams.set("size", "60");
  base.searchParams.set("startDateTime", startDateTime);
  base.searchParams.set("countryCode", "US");

  try {
    const res = await fetch(base.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Ticketmaster events error:", res.status, await res.text().catch(() => ""));
      return { events: FALLBACK, isLive: false };
    }

    const data = (await res.json()) as {
      _embedded?: { events?: TmEvent[] };
    };

    const raw = data._embedded?.events ?? [];
    if (raw.length === 0) {
      return { events: FALLBACK, isLive: false };
    }

    return { events: raw.slice(0, 9).map(mapEvent), isLive: true };
  } catch (e) {
    console.error("Ticketmaster fetch failed:", e);
    return { events: FALLBACK, isLive: false };
  }
}

export const ticketmasterDiscoverRaleighUrl =
  "https://www.ticketmaster.com/discover/events?city=Raleigh&stateCode=NC";
