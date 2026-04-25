import eventsData from './events.json'

export const EVENT_CATEGORIES = [
  'Networking',
  'Cultural',
  'Tech',
  'Family',
  'Outdoor',
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

export type CalendarEvent = {
  title: string
  date: string
  location: string
  category: EventCategory
  url: string | null
  summary: string
}

const MONTH_ABBR = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

export function formatDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map((part) => Number(part))
  if (!year || !month || !day) return isoDate
  return `${MONTH_ABBR[month - 1]} ${String(day).padStart(2, '0')}`
}

export function getUpcomingEvents(limit = 3, now: Date = new Date()): CalendarEvent[] {
  const today = now.toISOString().slice(0, 10)
  return (eventsData.events as CalendarEvent[])
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)
}
