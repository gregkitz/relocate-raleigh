'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type Employer = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type Neighborhood = {
  name: string;
  price: number;
  schools: string;
  lat: number;
  lng: number;
};

const EMPLOYERS: Employer[] = [
  { id: 'cisco', name: 'Cisco / RTP', lat: 35.9005, lng: -78.838 },
  { id: 'redhat', name: 'Red Hat / DT Raleigh', lat: 35.7719, lng: -78.6389 },
  { id: 'epic', name: 'Epic Games / Cary', lat: 35.7845, lng: -78.7868 },
  { id: 'apple', name: 'Apple / RTP', lat: 35.9055, lng: -78.844 },
];

const NEIGHBORHOODS: Neighborhood[] = [
  { name: 'West Cary', price: 750_000, schools: '10/10', lat: 35.8031, lng: -78.8789 },
  { name: 'Apex', price: 620_000, schools: '9/10', lat: 35.7327, lng: -78.8503 },
  { name: 'Morrisville', price: 550_000, schools: '8/10', lat: 35.8238, lng: -78.8256 },
  { name: 'Holly Springs', price: 510_000, schools: '9/10', lat: 35.6513, lng: -78.8336 },
  { name: 'Downtown Raleigh', price: 680_000, schools: '7/10', lat: 35.7796, lng: -78.6382 },
  { name: 'South Durham', price: 480_000, schools: '7/10', lat: 35.908, lng: -78.939 },
  { name: 'North Hills', price: 850_000, schools: '8/10', lat: 35.8406, lng: -78.6427 },
  { name: 'Fuquay-Varina', price: 420_000, schools: '7/10', lat: 35.5843, lng: -78.8 },
];

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/** Rough door-to-door minutes from crow-flies km (illustrative, not traffic-aware). */
function estimateCommuteMinutes(km: number): number {
  const minutes = (km / 28) * 60;
  return Math.min(90, Math.max(8, Math.round(minutes)));
}

function useReachable(selectedEmployer: Employer) {
  return useMemo(() => {
    return NEIGHBORHOODS.map((n) => {
      const km = haversineKm(selectedEmployer.lat, selectedEmployer.lng, n.lat, n.lng);
      const commuteTime = estimateCommuteMinutes(km);
      return { ...n, commuteTime };
    });
  }, [selectedEmployer]);
}

const triangleCenter = { lat: 35.82, lng: -78.78 };

type MapPanelProps = {
  selectedEmployer: Employer;
  reachableNeighborhoods: Array<Neighborhood & { commuteTime: number }>;
  maxCommute: number;
};

const mapPaneStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

function GoogleMapPanel({ selectedEmployer, reachableNeighborhoods, maxCommute }: MapPanelProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'commute-optimizer-map',
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: selectedEmployer.lat, lng: selectedEmployer.lng });
    reachableNeighborhoods.forEach((n) => bounds.extend({ lat: n.lat, lng: n.lng }));
    map.fitBounds(bounds, 56);
  }, [selectedEmployer, reachableNeighborhoods]);

  if (loadError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-zinc-950 p-6 text-center text-sm text-zinc-400">
        Google Maps failed to load. Check the API key, billing, and that the{' '}
        <strong className="text-zinc-300">Maps JavaScript API</strong> is enabled for this project.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-zinc-950 text-sm font-bold uppercase tracking-widest text-zinc-500">
        Loading map…
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black">
      <div className="h-[min(420px,55vh)] min-h-[320px] w-full shrink-0">
        <GoogleMap
          mapContainerStyle={mapPaneStyle}
          center={triangleCenter}
          zoom={10}
          onLoad={onLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            gestureHandling: 'greedy',
          }}
        >
          <Marker
            position={{ lat: selectedEmployer.lat, lng: selectedEmployer.lng }}
            title={selectedEmployer.name}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#ffffff',
              fillOpacity: 1,
              strokeColor: '#3b82f6',
              strokeWeight: 3,
            }}
          />
          {reachableNeighborhoods.map((n) => {
            const isReachable = n.commuteTime <= maxCommute;
            return (
              <Marker
                key={n.name}
                position={{ lat: n.lat, lng: n.lng }}
                title={`${n.name} · ~${n.commuteTime} min`}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: isReachable ? 7 : 5,
                  fillColor: isReachable ? '#3b82f6' : '#52525b',
                  fillOpacity: isReachable ? 1 : 0.45,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            );
          })}
        </GoogleMap>
      </div>

      <div className="max-h-[220px] overflow-y-auto border-t border-zinc-800 bg-zinc-950 p-3 md:max-h-none md:p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {reachableNeighborhoods.map((n) => {
            const ok = n.commuteTime <= maxCommute;
            return (
              <div
                key={n.name}
                className={`rounded-xl border px-2 py-2 text-left text-[10px] ${
                  ok ? 'border-blue-500/40 bg-blue-600/10' : 'border-zinc-800 bg-zinc-900/50 opacity-50'
                }`}
              >
                <p className="font-black uppercase text-white">{n.name}</p>
                <p className="mt-1 font-bold text-blue-400">${(n.price / 1000).toFixed(0)}k</p>
                <p className="text-zinc-500">
                  ~{n.commuteTime}m · Schools {n.schools}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Schematic map when `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is not set (legacy x/y layout). */
function SvgFallbackMap({
  selectedEmployer,
  reachableNeighborhoods,
  maxCommute,
}: {
  selectedEmployer: Employer & { x: number; y: number };
  reachableNeighborhoods: Array<Neighborhood & { commuteTime: number; x: number; y: number }>;
  maxCommute: number;
}) {
  return (
    <div className="relative flex-1 bg-black p-4 min-h-[400px] group">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" strokeWidth="0.1" className="stroke-zinc-700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div
        className="absolute z-20 h-4 w-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out"
        style={{
          left: `${selectedEmployer.x}%`,
          top: `${selectedEmployer.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] font-black uppercase tracking-tighter text-black shadow-xl">
          {selectedEmployer.name}
        </div>
      </div>
      {reachableNeighborhoods.map((n) => {
        const isReachable = n.commuteTime <= maxCommute;
        return (
          <div
            key={n.name}
            className={`absolute transition-all duration-700 ease-in-out ${
              isReachable ? 'scale-100 opacity-100' : 'scale-50 opacity-20 grayscale'
            }`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className={`h-3 w-3 rounded-full border-2 ${
                isReachable ? 'border-white bg-blue-500' : 'border-zinc-600 bg-zinc-700'
              }`}
            />
            {isReachable && (
              <div className="absolute left-1/2 top-4 z-10 min-w-[140px] -translate-x-1/2 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl">
                <p className="mb-1 text-[10px] font-black uppercase text-white">{n.name}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-blue-400">${(n.price / 1000).toFixed(0)}k</span>
                  <span className="text-[10px] font-bold text-zinc-500">
                    Commute: <span className="text-white">{n.commuteTime}m</span>
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-emerald-500" style={{ width: `${parseInt(n.schools, 10) * 10}%` }} />
                </div>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-tighter text-zinc-600">
                  Schools: {n.schools}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Map abstract x/y for SVG fallback (aligned to Triangle layout). */
const EMPLOYER_XY: Record<string, { x: number; y: number }> = {
  cisco: { x: 40, y: 40 },
  redhat: { x: 80, y: 60 },
  epic: { x: 50, y: 60 },
  apple: { x: 35, y: 35 },
};

const NEIGHBORHOOD_XY: Record<string, { x: number; y: number }> = {
  'West Cary': { x: 42, y: 48 },
  Apex: { x: 38, y: 68 },
  Morrisville: { x: 44, y: 38 },
  'Holly Springs': { x: 32, y: 82 },
  'Downtown Raleigh': { x: 78, y: 58 },
  'South Durham': { x: 28, y: 28 },
  'North Hills': { x: 72, y: 45 },
  'Fuquay-Varina': { x: 35, y: 95 },
};

export default function CommuteMap() {
  const [selectedEmployer, setSelectedEmployer] = useState<Employer>(EMPLOYERS[0]);
  const [maxCommute, setMaxCommute] = useState(25);
  const hasMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim());

  const reachableNeighborhoods = useReachable(selectedEmployer);

  const fallbackEmployer = { ...selectedEmployer, ...EMPLOYER_XY[selectedEmployer.id] };
  const fallbackNeighborhoods = reachableNeighborhoods.map((n) => ({
    ...n,
    ...NEIGHBORHOOD_XY[n.name],
  }));

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="border-b border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
        <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white">Commute vs. Cost Optimizer</h3>
        {!hasMapsKey && (
          <p className="mb-6 text-xs font-medium text-zinc-500">
            Add <code className="text-zinc-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to{' '}
            <code className="text-zinc-400">.env.local</code> and enable the{' '}
            <strong className="text-zinc-400">Maps JavaScript API</strong> in Google Cloud to show the live map.
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Target Employer
            </label>
            <div className="grid grid-cols-2 gap-2">
              {EMPLOYERS.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => setSelectedEmployer(emp)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                    selectedEmployer.id === emp.id
                      ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {emp.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Max Commute Time
              </label>
              <span className="text-lg font-black text-blue-400">{maxCommute}m</span>
            </div>
            <input
              type="range"
              min={10}
              max={45}
              value={maxCommute}
              onChange={(e) => setMaxCommute(parseInt(e.target.value, 10))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-[400px] flex-1 overflow-hidden bg-black p-0">
        {hasMapsKey ? (
          <GoogleMapPanel
            selectedEmployer={selectedEmployer}
            reachableNeighborhoods={reachableNeighborhoods}
            maxCommute={maxCommute}
          />
        ) : (
          <>
            <SvgFallbackMap
              selectedEmployer={fallbackEmployer}
              reachableNeighborhoods={fallbackNeighborhoods}
              maxCommute={maxCommute}
            />
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 hidden md:block">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-center backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Schematic view · Add Google Maps key for live map
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {hasMapsKey && (
        <p className="border-t border-zinc-800 bg-zinc-950 px-4 py-2 text-center text-[10px] text-zinc-500">
          Map data © Google · Commute times are illustrative (crow-flight based), not live traffic.
        </p>
      )}
    </div>
  );
}
