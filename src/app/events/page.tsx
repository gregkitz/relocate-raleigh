import Link from 'next/link'
import type { Metadata } from 'next'
import EventsCalendar from '@/components/EventsCalendar'
import ModalTriggerButton from '@/components/ModalTriggerButton'
import { getAllUpcomingEvents } from '@/data/events'
import eventsData from '@/data/events.json'

export const metadata: Metadata = {
  title: 'Triangle Events Calendar | Relocate Raleigh',
  description:
    'Upcoming networking, cultural, tech, family, and outdoor events across the Raleigh-Durham-Chapel Hill Triangle. Refreshed weekly.',
}

export default function EventsPage() {
  const events = getAllUpcomingEvents()
  const generatedAt = new Date(eventsData.generatedAt)

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-50 selection:bg-blue-500/30">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-black/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
            R
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Relocate Raleigh
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden md:inline text-sm font-bold text-zinc-500 hover:text-white transition-colors"
          >
            ← Home
          </Link>
          <ModalTriggerButton
            variant="guide"
            className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all font-bold text-sm"
          >
            Get The Guide
          </ModalTriggerButton>
        </div>
      </nav>

      <header className="px-6 pt-20 pb-12 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          AI-curated, refreshed weekly
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6">
          The Triangle <br />
          <span className="text-blue-600">Events Calendar</span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed font-medium">
          Networking, cultural, tech, family, and outdoor events across the
          Raleigh-Durham-Chapel Hill region — and a few drivable picks beyond.
          Updated every Monday.
        </p>
        <p className="text-xs text-zinc-700 font-bold uppercase tracking-widest mt-6">
          Last refreshed{' '}
          {generatedAt.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </header>

      <main className="px-6 pb-32 max-w-5xl mx-auto">
        <EventsCalendar events={events} />
      </main>

      <footer className="py-16 px-6 bg-black border-t border-zinc-900 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-white font-black text-xs">
            R
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            Relocate Raleigh
          </span>
        </div>
        <p className="text-sm text-zinc-600 font-medium">
          © {new Date().getFullYear()} Relocate Raleigh. Built for the community, by the community.
        </p>
      </footer>
    </div>
  )
}
