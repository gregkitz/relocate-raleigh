/**
 * Large tech / software employers commonly associated with the Triangle (RTP, Raleigh, Durham, Cary, Morrisville).
 * Coordinates are approximate campus or primary office locations for map pins — verify for routing.
 */

export type CommuteEmployer = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export const COMMUTE_EMPLOYERS: CommuteEmployer[] = [
  { id: "cisco", name: "Cisco (RTP)", lat: 35.9005, lng: -78.838 },
  { id: "apple", name: "Apple (RTP)", lat: 35.9055, lng: -78.844 },
  { id: "ibm", name: "IBM (RTP)", lat: 35.8988, lng: -78.8412 },
  { id: "google", name: "Google (Durham)", lat: 35.9935, lng: -78.902 },
  { id: "microsoft", name: "Microsoft (Morrisville)", lat: 35.8542, lng: -78.8248 },
  { id: "meta", name: "Meta (RTP)", lat: 35.8915, lng: -78.8285 },
  { id: "oracle", name: "Oracle (RTP)", lat: 35.8972, lng: -78.8405 },
  { id: "nvidia", name: "NVIDIA (Triangle)", lat: 35.9038, lng: -78.8435 },
  { id: "redhat", name: "Red Hat (Raleigh)", lat: 35.7719, lng: -78.6389 },
  { id: "epic", name: "Epic Games (Cary)", lat: 35.7845, lng: -78.7868 },
  { id: "sas", name: "SAS (Cary)", lat: 35.6185, lng: -78.6741 },
  { id: "lenovo", name: "Lenovo (Morrisville)", lat: 35.8259, lng: -78.8364 },
  { id: "netapp", name: "NetApp (RTP)", lat: 35.9018, lng: -78.8365 },
  { id: "fidelity", name: "Fidelity (RTP)", lat: 35.9065, lng: -78.8225 },
  { id: "iqv", name: "IQVIA (Durham)", lat: 36.0008, lng: -78.9012 },
];

/** Schematic x/y (0–100) for SVG fallback map — roughly RTP left, Raleigh right, Cary south, Durham northwest. */
export const COMMUTE_EMPLOYER_XY: Record<string, { x: number; y: number }> = {
  cisco: { x: 40, y: 40 },
  apple: { x: 38, y: 36 },
  ibm: { x: 42, y: 38 },
  google: { x: 20, y: 28 },
  microsoft: { x: 48, y: 37 },
  meta: { x: 44, y: 34 },
  oracle: { x: 41, y: 42 },
  nvidia: { x: 39, y: 38 },
  redhat: { x: 82, y: 58 },
  epic: { x: 52, y: 62 },
  sas: { x: 50, y: 88 },
  lenovo: { x: 49, y: 39 },
  netapp: { x: 43, y: 41 },
  fidelity: { x: 36, y: 35 },
  iqv: { x: 22, y: 26 },
};
