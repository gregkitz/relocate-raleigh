import React from 'react';

export default function NickBio() {
  return (
    <section id="guide" className="bg-zinc-950 py-24 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 relative overflow-hidden group">
              <span className="text-xs uppercase tracking-widest font-bold opacity-50 group-hover:opacity-100 transition-opacity">Photo Placeholder</span>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Credentials</p>
              <ul className="space-y-2 text-sm text-zinc-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Licensed NC Realtor®
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Senior IT Professional @ Cisco
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Bilingual: English, Russian/Ukrainian
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Your local, not your realtor
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                I made the move. <br />
                Now I help you do the same.
              </h2>
            </div>

            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
              <p>
                As a senior IT professional at a major tech company here in the Research Triangle, I know exactly what you're weighing. I made the cross-country relocation myself, navigating the complexities of finding the right community while balancing a high-growth tech career.
              </p>
              <p>
                I don't just sell houses; I help tech families land in a community. My household is a linguistic melting pot—I speak English and Russian/Ukrainian, and we're raising our kids in a home that also speaks Mandarin. I understand the cultural and educational priorities that matter most to international tech talent.
              </p>
              <p className="text-zinc-500 italic text-base">
                Looking for an unvarnished take on Raleigh life? Let's connect.
              </p>
            </div>

            <div className="pt-8">
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all shadow-xl shadow-white/5">
                Get In Touch with Nick
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
