'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { SHARED_GOOGLE_MAPS_LOADER_ID } from '@/lib/googleMapsLoaderId';
import {
  CULTURE_STORES,
  CULTURE_TABS,
  type CultureStore,
  type CultureTabId,
} from '@/data/cultureStores';

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const TRIANGLE = { lat: 35.82, lng: -78.78 };

const TAB_SHORT: Record<CultureTabId, string> = {
  slavic: 'Slavic',
  asian: 'Asian',
  indian: 'Indian',
  american: 'American',
};

function fitBoundsForStores(map: google.maps.Map, list: CultureStore[]) {
  if (list.length === 0) return;
  const bounds = new google.maps.LatLngBounds();
  list.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));
  map.fitBounds(bounds, 56);
}

type CultureStoresGoogleMapProps = {
  apiKey: string;
  stores: CultureStore[];
  tab: CultureTabId;
  selectedId: string | null;
  selectedStore: CultureStore | null;
  onMapReady: (map: google.maps.Map | null) => void;
  onSelectStore: (s: CultureStore) => void;
  onCloseInfo: () => void;
};

function CultureStoresGoogleMap({
  apiKey,
  stores,
  tab,
  selectedId,
  selectedStore,
  onMapReady,
  onSelectStore,
  onCloseInfo,
}: CultureStoresGoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: SHARED_GOOGLE_MAPS_LOADER_ID,
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      fitBoundsForStores(mapRef.current, stores);
    }
  }, [tab, stores, isLoaded]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      onMapReady(map);
      fitBoundsForStores(map, stores);
    },
    [stores, onMapReady],
  );

  useEffect(() => {
    return () => onMapReady(null);
  }, [onMapReady]);

  if (loadError) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center p-6 text-center text-sm text-zinc-400">
        Google Maps failed to load. Check billing and that the{' '}
        <strong className="text-zinc-300">Maps JavaScript API</strong> is enabled.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center text-sm font-black uppercase tracking-widest text-zinc-500">
        Loading map…
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={TRIANGLE}
      zoom={9}
      onLoad={onLoad}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        gestureHandling: 'greedy',
      }}
    >
      {stores.map((s) => {
        const isSel = s.id === selectedId;
        return (
          <Marker
            key={s.id}
            position={{ lat: s.lat, lng: s.lng }}
            title={s.name}
            onClick={() => onSelectStore(s)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: isSel ? 11 : 7,
              fillColor: isSel ? '#2563eb' : '#52525b',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        );
      })}
      {selectedStore && (
        <InfoWindow
          position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
          onCloseClick={onCloseInfo}
        >
          <div className="max-w-[220px] p-1 text-zinc-900">
            <p className="text-sm font-black">{selectedStore.name}</p>
            <p className="mt-1 text-xs font-medium leading-snug">{selectedStore.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default function InfrastructureCultureMap() {
  const [tab, setTab] = useState<CultureTabId>('slavic');
  const stores = CULTURE_STORES[tab];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';
  const hasMapsKey = Boolean(apiKey);

  const onMapReady = useCallback((map: google.maps.Map | null) => {
    mapInstanceRef.current = map;
  }, []);

  useEffect(() => {
    setSelectedId(stores[0]?.id ?? null);
  }, [tab, stores]);

  const focusStore = useCallback((s: CultureStore) => {
    setSelectedId(s.id);
    const m = mapInstanceRef.current;
    if (m) {
      m.panTo({ lat: s.lat, lng: s.lng });
      m.setZoom(14);
    }
  }, []);

  const tabMeta = CULTURE_TABS.find((t) => t.id === tab);
  const selectedStore = stores.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="w-full overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 shadow-2xl ring-1 ring-blue-500/15">
      <div className="border-b border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm md:p-8">
        <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
          Triangle specialty groceries
        </h3>
        <p className="mb-6 text-sm font-medium text-zinc-500">
          Pick a group to see Triangle-area examples. Click a row or a map pin to focus a store.
        </p>
        {!hasMapsKey && (
          <p className="mb-4 text-xs font-medium text-zinc-500">
            Add <code className="text-zinc-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to{' '}
            <code className="text-zinc-400">.env.local</code> with the{' '}
            <strong className="text-zinc-400">Maps JavaScript API</strong> enabled to show the live map.
          </p>
        )}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Store groups">
          {CULTURE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-black uppercase tracking-tight transition-all ${
                tab === t.id
                  ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              {TAB_SHORT[t.id]}
            </button>
          ))}
        </div>
        {tabMeta && (
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">{tabMeta.blurb}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        <div className="border-b border-zinc-800 p-4 md:p-6 lg:border-b-0 lg:border-r">
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/80">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <th className="px-4 py-3">Store</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Address</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((s) => {
                  const active = s.id === selectedId;
                  return (
                    <tr
                      key={s.id}
                      tabIndex={0}
                      onClick={() => focusStore(s)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          focusStore(s);
                        }
                      }}
                      className={`cursor-pointer border-b border-zinc-800/80 transition-colors last:border-b-0 ${
                        active ? 'bg-blue-600/15 ring-1 ring-inset ring-blue-500/40' : 'hover:bg-zinc-900'
                      }`}
                    >
                      <td className="px-4 py-3 font-bold text-white">{s.name}</td>
                      <td className="hidden max-w-[220px] px-4 py-3 text-xs font-medium text-zinc-500 sm:table-cell">
                        {s.address}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            Pins are approximate — confirm hours and addresses before visiting.
          </p>
        </div>

        <div className="min-h-[min(380px,50vh)] bg-black lg:min-h-[420px]">
          {!hasMapsKey && (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-sm font-bold text-zinc-400">Map preview unavailable</p>
              <p className="max-w-sm text-xs text-zinc-600">
                Configure a Google Maps API key to plot these locations. The list on the left still works.
              </p>
            </div>
          )}
          {hasMapsKey && (
            <CultureStoresGoogleMap
              apiKey={apiKey}
              stores={stores}
              tab={tab}
              selectedId={selectedId}
              selectedStore={selectedStore}
              onMapReady={onMapReady}
              onSelectStore={focusStore}
              onCloseInfo={() => setSelectedId(null)}
            />
          )}
        </div>
      </div>

      {hasMapsKey && (
        <p className="border-t border-zinc-800 bg-zinc-950 px-4 py-2 text-center text-[10px] text-zinc-500">
          Map data © Google
        </p>
      )}
    </div>
  );
}
