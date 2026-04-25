'use client'

import { useMemo, useState } from 'react'
import {
  EVENT_CATEGORIES,
  formatDateLabel,
  formatMonthLabel,
  type CalendarEvent,
  type EventCategory,
} from '@/data/events'

type Filter = EventCategory | 'All'

const FILTERS: Filter[] = ['All', ...EVENT_CATEGORIES]

export default function EventsCalendar({ events }: { events: CalendarEvent[] }) {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(() => {
    return filter === 'All' ? events : events.filter((e) => e.category === filter)
  }, [events, filter])

  const groups = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of filtered) {
      const key = event.date.slice(0, 7)
      const list = map.get(key) ?? []
      list.push(event)
      map.set(key, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        {FILTERS.map((option) => {
          const active = option === filter
          const count =
            option === 'All'
              ? events.length
              : events.filter((e) => e.category === option).length
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={
                active
                  ? 'px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold transition-all'
                  : 'px-5 py-2.5 rounded-full bg-zinc-900 text-zinc-400 text-sm font-bold border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all'
              }
              aria-pressed={active}
            >
              {option}
              <span className={active ? 'ml-2 text-blue-200' : 'ml-2 text-zinc-600'}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {groups.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-lg font-medium">
            No upcoming {filter === 'All' ? 'events' : `${filter.toLowerCase()} events`} on the
            calendar yet.
          </p>
          <p className="text-zinc-600 text-sm mt-3">
            The calendar refreshes every Monday. Check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {groups.map(([monthKey, monthEvents]) => (
            <section key={monthKey}>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-8">
                {formatMonthLabel(monthKey)}
              </h2>
              <ul className="space-y-4">
                {monthEvents.map((event) => (
                  <li key={`${event.date}-${event.title}`}>
                    <EventRow event={event} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function EventRow({ event }: { event: CalendarEvent }) {
  const dayLabel = formatDateLabel(event.date)
  const [monthAbbr, dayNum] = dayLabel.split(' ')

  const Wrapper = event.url ? 'a' : 'div'
  const wrapperProps = event.url
    ? {
        href: event.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={
        'flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 transition-all ' +
        (event.url ? 'hover:bg-zinc-900 hover:border-blue-500/40 cursor-pointer block' : '')
      }
    >
      <div className="flex md:flex-col items-baseline md:items-center gap-3 md:gap-1 md:w-20 shrink-0">
        <div className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">
          {monthAbbr}
        </div>
        <div className="text-white text-4xl md:text-5xl font-black leading-none">{dayNum}</div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-300">
            {event.category}
          </span>
          <span className="text-sm text-zinc-500 font-bold">📍 {event.location}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
          {event.title}
          {event.url && (
            <span className="inline-block ml-2 text-blue-400 text-base">→</span>
          )}
        </h3>
        <p className="text-zinc-400 leading-relaxed font-medium">{event.summary}</p>
      </div>
    </Wrapper>
  )
}
