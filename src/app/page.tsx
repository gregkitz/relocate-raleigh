import Image from "next/image";
import Calculator from "@/components/Calculator";
import NickBio from "@/components/NickBio";
import CommuteMap from "@/components/CommuteMap";

export default function Home() {
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
          <a href="#guide" className="hover:text-white transition-colors">About Nick</a>
          <button className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all font-bold">
            Get The Guide
          </button>
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
            <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-full font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20">
              Relocation Guide (PDF)
            </button>
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

      {/* Multilingual Support Section */}
      <section id="community" className="bg-zinc-950 py-32 px-6 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">Built for a Global <br />Community</h2>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium">
              Moving is hard. Moving with a family is harder. We provide support in your native language to ensure your family settles in smoothly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-10 bg-zinc-900/50 rounded-[2.5rem] border border-zinc-800/50 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 mb-8 group-hover:scale-110 transition-transform origin-left rounded-lg overflow-hidden border border-zinc-800">
                <img src="https://flagcdn.com/tw.svg" alt="Taiwan Flag" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">繁體中文支持</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                We help Taiwanese families find the best Chinese schools and communities in Cary and Raleigh.
              </p>
            </div>
            <div className="p-10 bg-zinc-900/50 rounded-[2.5rem] border border-zinc-800/50 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 mb-8 group-hover:scale-110 transition-transform origin-left rounded-lg overflow-hidden border border-zinc-800">
                <img src="https://flagcdn.com/ru.svg" alt="Russian Flag" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Русская підтримка</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Slavic community roots are deep here. We'll connect you with the best markets and social circles.
              </p>
            </div>
            <div className="p-10 bg-zinc-900/50 rounded-[2.5rem] border border-zinc-800/50 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 mb-8 group-hover:scale-110 transition-transform origin-left rounded-lg overflow-hidden border border-zinc-800">
                <img src="https://flagcdn.com/ua.svg" alt="Ukrainian Flag" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Українська підтримка</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                We assist Ukrainian families in navigating the local landscape and finding welcoming neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">The "Hidden" Infrastructure</h2>
              <p className="text-xl text-zinc-500 leading-relaxed font-medium">
                Beyond school rankings and home prices, Raleigh has a hidden layer of infrastructure that makes it feel like home.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Grand Asia Market", desc: "Authentic groceries and local food hub.", icon: "🍜" },
                { title: "Golden Hex", desc: "Premier Eastern European market.", icon: "🍞" },
                { title: "RTP Corridor", desc: "Cisco, Red Hat, Apple, and Epic Games.", icon: "💻" },
                { title: "Wake County Schools", desc: "Ranked among the best in the Southeast.", icon: "🏫" },
              ].map((item) => (
                <li key={item.title} className="flex gap-5 group">
                  <div className="w-14 h-14 shrink-0 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl border border-zinc-800 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg">{item.title}</h4>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <CommuteMap />
          </div>
        </div>
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
            <button className="px-10 py-5 bg-white text-blue-600 rounded-full font-black text-lg hover:bg-blue-50 transition-all shadow-xl shadow-black/10 whitespace-nowrap">
              View Full Calendar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { date: "APR 20", title: "RTP Slavic Tech Meetup", loc: "Frontier RTP", tag: "Networking" },
              { date: "MAY 05", title: "Cary Dragon Boat Festival", loc: "Bond Park", tag: "Cultural" },
              { date: "MAY 12", title: "Next.js RDU Workshop", loc: "Red Hat Annex", tag: "Tech" },
            ].map((event) => (
              <div key={event.title} className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-blue-200 text-xs font-black mb-3 uppercase tracking-[0.2em]">{event.date}</div>
                <h4 className="text-2xl font-black mb-6 leading-tight">{event.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100 font-bold tracking-tight">📍 {event.loc}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">{event.tag}</span>
                </div>
              </div>
            ))}
          </div>
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
