'use client';

import React, { useState, useMemo } from 'react';

const EMPLOYERS = [
  { id: 'cisco', name: 'Cisco / RTP', x: 40, y: 40 },
  { id: 'redhat', name: 'Red Hat / DT Raleigh', x: 80, y: 60 },
  { id: 'epic', name: 'Epic Games / Cary', x: 50, y: 60 },
  { id: 'apple', name: 'Apple / RTP', x: 35, y: 35 },
];

const NEIGHBORHOODS = [
  { name: 'West Cary', price: 750000, schools: '10/10', x: 42, y: 48 },
  { name: 'Apex', price: 620000, schools: '9/10', x: 38, y: 68 },
  { name: 'Morrisville', price: 550000, schools: '8/10', x: 44, y: 38 },
  { name: 'Holly Springs', price: 510000, schools: '9/10', x: 32, y: 82 },
  { name: 'Downtown Raleigh', price: 680000, schools: '7/10', x: 78, y: 58 },
  { name: 'South Durham', price: 480000, schools: '7/10', x: 28, y: 28 },
  { name: 'North Hills', price: 850000, schools: '8/10', x: 72, y: 45 },
  { name: 'Fuquay-Varina', price: 420000, schools: '7/10', x: 35, y: 95 },
];

export default function CommuteMap() {
  const [selectedEmployer, setSelectedEmployer] = useState(EMPLOYERS[0]);
  const [maxCommute, setMaxCommute] = useState(25);

  const reachableNeighborhoods = useMemo(() => {
    return NEIGHBORHOODS.map(n => {
      // Very simplified "Manhattan distance" to commute time conversion for the prototype
      const distance = Math.sqrt(Math.pow(n.x - selectedEmployer.x, 2) + Math.pow(n.y - selectedEmployer.y, 2));
      const commuteTime = Math.round(distance * 1.2); // 1 unit = ~1.2 minutes
      return { ...n, commuteTime };
    });
  }, [selectedEmployer]);

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
      <div className="p-8 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight">Commute vs. Cost Optimizer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target Employer</label>
            <div className="grid grid-cols-2 gap-2">
              {EMPLOYERS.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedEmployer(emp)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedEmployer.id === emp.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {emp.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Max Commute Time</label>
              <span className="text-blue-400 font-black text-lg">{maxCommute}m</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="45" 
              value={maxCommute}
              onChange={(e) => setMaxCommute(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-black p-4 min-h-[400px] group">
        {/* Simple SVG Map Grid */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-zinc-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Employer Pin */}
        <div 
          className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20 transition-all duration-500 ease-out"
          style={{ left: `${selectedEmployer.x}%`, top: `${selectedEmployer.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl uppercase tracking-tighter">
            {selectedEmployer.name}
          </div>
        </div>

        {/* Neighborhood Pins */}
        {reachableNeighborhoods.map(n => {
          const isReachable = n.commuteTime <= maxCommute;
          return (
            <div 
              key={n.name}
              className={`absolute transition-all duration-700 ease-in-out ${isReachable ? 'scale-100 opacity-100' : 'scale-50 opacity-20 grayscale'}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`w-3 h-3 rounded-full border-2 ${isReachable ? 'bg-blue-500 border-white' : 'bg-zinc-700 border-zinc-600'}`}></div>
              
              {isReachable && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shadow-2xl min-w-[140px] z-10">
                  <p className="text-[10px] font-black text-white uppercase mb-1">{n.name}</p>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-xs font-bold text-blue-400">${(n.price/1000).toFixed(0)}k</span>
                    <span className="text-[10px] font-bold text-zinc-500">Commute: <span className="text-white">{n.commuteTime}m</span></span>
                  </div>
                  <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${parseInt(n.schools) * 10}%` }}></div>
                  </div>
                  <p className="text-[8px] font-bold text-zinc-600 mt-1 uppercase tracking-tighter">Schools: {n.schools}</p>
                </div>
              )}
            </div>
          );
        })}

        <div className="absolute bottom-6 left-6 right-6 p-4 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl text-center">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            Interactive Heatmap <span className="text-blue-500">·</span> Real-Time Transit Diffs
          </p>
        </div>
      </div>
    </div>
  );
}
