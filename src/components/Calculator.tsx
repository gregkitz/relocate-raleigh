'use client';

import React, { useState, useEffect } from 'react';

const CITY_DATA = {
  seattle: {
    name: 'Seattle, WA',
    taxRate: 0, // No state income tax in WA
    colIndex: 1.5, // 50% more expensive than baseline
    medianHome: 850000,
  },
  san_francisco: {
    name: 'San Francisco, CA',
    taxRate: 0.093, // Simplified CA tax for tech salaries
    colIndex: 1.8, // 80% more expensive
    medianHome: 1300000,
  },
  raleigh: {
    name: 'Raleigh/Cary, NC',
    taxRate: 0.045, // NC flat tax roughly
    colIndex: 1.0, // Baseline
    medianHome: 500000,
  },
};

export default function Calculator() {
  const [salary, setSalary] = useState(200000);
  const [currentCity, setCurrentCity] = useState('seattle');
  const [results, setResults] = useState({
    raleighEquivalent: 0,
    housingSavings: 0,
    monthlyDisposable: 0,
  });

  useEffect(() => {
    const city = CITY_DATA[currentCity as keyof typeof CITY_DATA];
    const raleigh = CITY_DATA.raleigh;

    // Simplified math for the "flex"
    // Purchasing power = (Salary * (1 - tax)) / colIndex
    const currentPurchasingPower = (salary * (1 - city.taxRate)) / city.colIndex;
    
    // Equivalent Raleigh salary to maintain same power:
    // (Equivalent * (1 - raleigh.taxRate)) / raleigh.colIndex = currentPurchasingPower
    const equivalent = (currentPurchasingPower * raleigh.colIndex) / (1 - raleigh.taxRate);

    const monthlySavings = (salary / 12) - (equivalent / 12);

    setResults({
      raleighEquivalent: Math.round(equivalent),
      housingSavings: city.medianHome - raleigh.medianHome,
      monthlyDisposable: Math.round(monthlySavings),
    });
  }, [salary, currentCity]);

  return (
    <div className="w-full max-w-2xl p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl shadow-blue-900/20 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 tracking-tight">
          The math, unvarnished.
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Engineers don't buy on vibes. Drop in your current salary and city, and see exactly what the move gets you.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Current Annual Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-zinc-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Current Location
            </label>
            <select
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-zinc-100 transition-all appearance-none"
            >
              <option value="seattle">Seattle, WA</option>
              <option value="san_francisco">San Francisco, CA</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl relative overflow-hidden group hover:bg-blue-600/20 transition-all">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
              Raleigh Equivalent
            </p>
            <p className="text-3xl font-extrabold text-white">
              ${results.raleighEquivalent.toLocaleString()}
            </p>
            <p className="text-[10px] text-blue-300/60 mt-2 font-medium">
              Maintain lifestyle for less.
            </p>
          </div>

          <div className="p-5 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl relative overflow-hidden group hover:bg-emerald-600/20 transition-all">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">
              Housing Equity Gain
            </p>
            <p className="text-3xl font-extrabold text-white">
              +${results.housingSavings.toLocaleString()}
            </p>
            <p className="text-[10px] text-emerald-300/60 mt-2 font-medium">
              Median home price diff.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            "You could take a <span className="text-blue-400 font-bold">20% pay cut</span> and still have more disposable income every month."
          </p>
        </div>
      </div>
    </div>
  );
}
