import { getTriangleEvents, ticketmasterDiscoverRaleighUrl } from "@/lib/ticketmasterTriangle";

export default async function TriangleEventsSection() {
  const { events, isLive } = await getTriangleEvents();

  return (
    <section className="bg-blue-600 py-32 px-6 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Upcoming Events</h2>
            <p className="text-blue-100 text-xl font-medium leading-relaxed">
              {isLive
                ? "Upcoming Ticketmaster listings within ~40 miles of the Triangle—concerts, shows, and more. Tech-flavored titles are tagged when we spot them in the name."
                : "Sample events shown. Add a Ticketmaster API key to pull live cultural and tech-leaning listings for the Triangle."}
            </p>
          </div>
          <a
            href={ticketmasterDiscoverRaleighUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-white text-blue-600 rounded-full font-black text-lg hover:bg-blue-50 transition-all shadow-xl shadow-black/10 whitespace-nowrap inline-block text-center"
          >
            View Full Calendar
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <a
              key={event.id}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all text-left"
            >
              <div className="text-blue-200 text-xs font-black mb-3 uppercase tracking-[0.2em]">{event.dateLabel}</div>
              <h4 className="text-2xl font-black mb-6 leading-tight">{event.title}</h4>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-blue-100 font-bold tracking-tight">📍 {event.loc}</span>
                <span className="shrink-0 px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  {event.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        {isLive && (
          <p className="mt-12 text-center text-xs text-blue-200/80 font-medium">
            Event data © Ticketmaster. Not affiliated with Relocate Raleigh.
          </p>
        )}
      </div>
    </section>
  );
}
