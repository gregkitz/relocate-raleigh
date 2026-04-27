'use client';

import React, { useMemo, useState } from 'react';
import {
  STATE_CODES_BY_NAME,
  US_STATE_DATA,
  type StateCode,
  computeHousingMedianDiff,
  computeRaleighEquivalentSalary,
  RALEIGH_METRO_MEDIAN_HOME,
} from '@/data/relocationStateData';

const DEFAULT_STATE: StateCode = 'WA';

export default function Calculator() {
  const [salaryInput, setSalaryInput] = useState('200000');
  const [stateCode, setStateCode] = useState<StateCode>(DEFAULT_STATE);

  const origin = US_STATE_DATA[stateCode];
  const salary = useMemo(() => {
    if (!salaryInput) return 0;
    const n = Number.parseInt(salaryInput, 10);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  }, [salaryInput]);

  const raleighEquivalent = useMemo(
    () =>
      Math.round(
        computeRaleighEquivalentSalary(salary, origin.mericIndex, origin.stateTaxRate),
      ),
    [salary, origin.mericIndex, origin.stateTaxRate],
  );

  const housingMedianDiff = useMemo(
    () => computeHousingMedianDiff(origin.medianHome),
    [origin.medianHome],
  );

  /** Monthly gross gap: current salary vs illustrative Raleigh-equivalent (same purchasing power) */
  const monthlyGrossGap = useMemo(
    () => Math.round(salary / 12 - raleighEquivalent / 12),
    [salary, raleighEquivalent],
  );

  const pctVersusCurrent =
    salary > 0 ? Math.round(((salary - raleighEquivalent) / salary) * 100) : 0;

  return (
    <div className="w-full max-w-2xl p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl shadow-blue-900/20 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 tracking-tight">
          The math, unvarnished.
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Engineers don&apos;t buy on vibes. Enter your salary and current state—we estimate a
          Raleigh-equivalent salary using state cost-of-living (MERIC vs. NC) and typical state
          income tax burdens. Federal taxes drop out of the comparison.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Current annual salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={salaryInput}
                onChange={(e) => {
                  const next = e.target.value.replace(/[^\d]/g, '');
                  setSalaryInput(next);
                }}
                onBlur={() => {
                  if (!salaryInput) return;
                  const normalized = String(Number.parseInt(salaryInput, 10) || 0);
                  setSalaryInput(normalized);
                }}
                className="w-full pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-zinc-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
              Current state
            </label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value as StateCode)}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-zinc-100 transition-all appearance-none"
            >
              {STATE_CODES_BY_NAME.map((code) => (
                <option key={code} value={code}>
                  {US_STATE_DATA[code].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl relative overflow-hidden group hover:bg-blue-600/20 transition-all">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
              Raleigh equivalent salary
            </p>
            <p className="text-3xl font-extrabold text-white">
              ${raleighEquivalent.toLocaleString()}
            </p>
            <p className="text-[10px] text-blue-300/60 mt-2 font-medium leading-relaxed">
              Pre-tax income in NC with similar after-tax purchasing power vs. your state (COL +
              state tax only).
            </p>
          </div>

          <div className="p-5 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl relative overflow-hidden group hover:bg-emerald-600/20 transition-all">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">
              Housing (median vs. Raleigh)
            </p>
            <p className="text-3xl font-extrabold text-white">
              {housingMedianDiff >= 0 ? '+' : ''}
              ${housingMedianDiff.toLocaleString()}
            </p>
            <p className="text-[10px] text-emerald-300/60 mt-2 font-medium leading-relaxed">
              State median sale price (${origin.medianHome.toLocaleString()}) minus Raleigh metro
              benchmark (${RALEIGH_METRO_MEDIAN_HOME.toLocaleString()}). Not a cash guarantee—markets
              vary by neighborhood.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            At this salary, a comparable lifestyle in the Triangle often lines up with roughly{' '}
            <span className="text-blue-400 font-bold">${raleighEquivalent.toLocaleString()}</span>{' '}
            pre-tax in NC vs.{' '}
            <span className="text-zinc-300 font-bold">${salary.toLocaleString()}</span> where you are
            now—about{' '}
            <span className="text-emerald-400 font-bold">
              {monthlyGrossGap >= 0 ? '+' : ''}
              ${monthlyGrossGap.toLocaleString()}/mo
            </span>{' '}
            gross gap ({pctVersusCurrent >= 0 ? '' : '−'}
            {Math.abs(pctVersusCurrent)}% vs. current). Illustrative only.
          </p>
        </div>

        <p className="text-[10px] text-zinc-600 leading-relaxed text-center px-2">
          Method: purchasing power = salary × (1 − state tax) ÷ COL vs. NC; Raleigh equivalent solves
          for NC salary at COL (relative to NC) = 1 and NC tax. Median prices:
          state-level sale medians vs. ${RALEIGH_METRO_MEDIAN_HOME.toLocaleString()} Raleigh-area
          benchmark. Not financial or tax advice.
        </p>
      </div>
    </div>
  );
}
