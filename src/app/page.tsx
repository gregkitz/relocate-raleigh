import Image from "next/image";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import NickBio from "@/components/NickBio";
import CommuteMap from "@/components/CommuteMap";
import InfrastructureCultureMap from "@/components/InfrastructureCultureMap";
import ModalTriggerButton from "@/components/ModalTriggerButton";
import { getUpcomingEvents, formatDateLabel } from "@/data/events";

export default function Home() {
  const upcomingEvents = getUpcomingEvents(3);
  return (
    <div className="min-h-screen bg-black font-sans text-zinc-50 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">R</div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Relocate Raleigh</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-500">
          <a href="#calculator" className="hover:text-white transition-colors">The Math</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
          <a href="#guide" className="hover:text-white transition-colors">About us</a>
          <ModalTriggerButton
            variant="guide"
            className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all font-bold"
          >
            Get The Guide
          </ModalTriggerButton>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 md:py-40 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em]">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            West Coast Tech Pipeline
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
            Keep Your <br />
            <span className="text-blue-600">Career.</span> <br />
            Upgrade <br />
            Your Life.
          </h1>
          <p className="text-xl text-zinc-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Raleigh-Durham offers top-tier hybrid roles, half the cost of living, and the best public schools in the South. Let a local tech-insider help you navigate the move.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <ModalTriggerButton
              variant="guide"
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-full font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
            >
              Relocation Guide (PDF)
            </ModalTriggerButton>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 overflow-hidden shadow-xl">
                    <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="User" width={48} height={48} />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-zinc-500 tracking-tight">
                Joined by <span className="text-white">120+</span> tech families
              </div>
            </div>
          </div>
        </div>
        <div id="calculator" className="flex-1 w-full max-w-2xl lg:max-w-none flex justify-center lg:justify-end">
          <Calculator />
        </div>
      </header>

      {/* Community fit — inclusive, equal professional service */}
      <section id="community" className="bg-zinc-950 py-32 px-6 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">
              Finding the Right Fit <br />
              for Your Family
            </h2>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium">
              Moving is hard. Moving with a family is harder. We help you weigh what matters—not only the home, but schools, commute, and the community around it.
            </p>
          </div>
          <div className="max-w-4xl p-10 md:p-12 bg-zinc-900/50 rounded-[2.5rem] border border-zinc-800/50">
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
              <p>
                Every household is different. In our work together, we focus on{" "}
                <span className="text-zinc-300">your</span> stated priorities—whether that includes schools, commute, faith communities, cultural connections, or access to services and amenities that support how your family lives day to day. We provide the same professional service to every client, guided by what you tell us you need.
              </p>
              <p>
                Complimentary consultations include a structured conversation about your goals and practical, objective information about the Triangle—so you can compare areas, understand what is near each option, and choose a location that balances convenience and quality of life for your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-help" className="border-y border-zinc-900 bg-black py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              How we can help you
            </h2>
            <p className="text-xl font-medium leading-relaxed text-zinc-500">
              From housing to community—practical support for your Triangle relocation.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: 'Find your ideal home',
                body: 'We help you find a house for rent or purchase in the area most suitable for you and your family.',
              },
              {
                title: 'Mortgage assistance',
                body: 'We connect you with the best mortgage brokers in the area.',
              },
              {
                title: 'Organize moving logistics',
                body: 'We manage the details of your move to ensure a smooth transition.',
              },
              {
                title: 'Expert local guidance',
                body: 'We answer your questions regarding neighborhoods, schools, career opportunities, and more.',
              },
              {
                title: 'Community connection',
                body: 'We connect you to desired communities and provide information about various business and community events.',
              },
              {
                title: 'Property management',
                body: 'If you own a property, we can manage it for you—including coordinating repairs and regular inspections.',
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 p-8 transition-colors hover:border-blue-500/25"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden />
                  <h3 className="text-lg font-black tracking-tight text-white md:text-xl">{item.title}</h3>
                </div>
                <p className="text-base font-medium leading-relaxed text-zinc-400">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Infrastructure Section — store explorer is the primary change here */}
      <section
        id="infrastructure"
        className="scroll-mt-24 py-32 px-6 max-w-7xl mx-auto space-y-10"
      >
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            The &quot;Hidden&quot; Infrastructure
          </h2>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
            Specialty grocers · Slavic, Asian, Indian, American
          </p>
          <p className="text-xl text-zinc-500 leading-relaxed font-medium">
            Use the tabs below to browse example Triangle stores by community, click a row or map pin for details,
            then scroll to the commute tool to weigh drive time against neighborhood cost.
          </p>
        </div>
        <div id="infrastructure-grocers" className="scroll-mt-8">
          <InfrastructureCultureMap />
        </div>
        <CommuteMap />
      </section>

      {/* Events Section */}
      <section className="bg-blue-600 py-32 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="text-left max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Upcoming Events</h2>
              <p className="text-blue-100 text-xl font-medium leading-relaxed">
                Our AI-curated calendar finds the most relevant cultural and tech events in the Triangle.
              </p>
            </div>
            <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-full font-black text-lg hover:bg-blue-50 transition-all shadow-xl shadow-black/10 whitespace-nowrap">
              View Full Calendar
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <a
                  key={`${event.date}-${event.title}`}
                  href={event.url ?? undefined}
                  target={event.url ? "_blank" : undefined}
                  rel={event.url ? "noopener noreferrer" : undefined}
                  className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer block"
                >
                  <div className="text-blue-200 text-xs font-black mb-3 uppercase tracking-[0.2em]">{formatDateLabel(event.date)}</div>
                  <h4 className="text-2xl font-black mb-6 leading-tight">{event.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-100 font-bold tracking-tight">📍 {event.location}</span>
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">{event.category}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-blue-100 text-lg font-medium">
              The calendar refreshes weekly — check back Monday for the next set of events.
            </p>
          )}
        </div>
      </section>

      <NickBio />

      {/* Footer */}
      <footer className="py-16 px-6 bg-black border-t border-zinc-900 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-white font-black text-xs">R</div>
          <span className="text-lg font-black tracking-tight text-white">Relocate Raleigh</span>
        </div>
        <p className="text-sm text-zinc-600 font-medium">
          © {new Date().getFullYear()} Relocate Raleigh. Built for the community, by the community.
        </p>
      </footer>
    </div>
  );
}
