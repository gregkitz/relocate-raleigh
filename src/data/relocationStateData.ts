/**
 * Relocation calculator inputs (state level, illustrative).
 *
 * COL: MERIC 2025 annual average composite index (U.S. = 100).
 *   https://meric.mo.gov/data/cost-living-data-series/
 *
 * Median home sale price: Rocket Mortgage 2024 guide (state medians).
 *   https://www.rocketmortgage.com/learn/median-home-price-by-state
 *
 * stateTaxRate: Approximate effective state income tax on ~$200k wage income,
 * single filer, for relative comparison only. No local/City taxes (e.g. NYC),
 * no federal tax (same in both locations). Not tax advice.
 */

/** North Carolina MERIC composite — baseline for “Raleigh area” proxy */
export const NC_MERIC_INDEX = 97.9;

/** Representative Raleigh–Cary metro median sale price (between state & metro sources; illustrative) */
export const RALEIGH_METRO_MEDIAN_HOME = 420_000;

/** NC flat income tax ≈ 4.75% (illustrative effective share at high income) */
export const RALEIGH_STATE_EFFECTIVE_TAX_RATE = 0.0475;

export type StateCode =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "DC"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

export type StateRow = {
  name: string;
  /** MERIC composite index (U.S. average = 100) */
  mericIndex: number;
  /** Approximate median home sale price, USD */
  medianHome: number;
  /** Approximate effective state income tax rate on high wage income */
  stateTaxRate: number;
};

export const US_STATE_DATA: Record<StateCode, StateRow> = {
  AL: { name: "Alabama", mericIndex: 88.1, medianHome: 258_789, stateTaxRate: 0.05 },
  AK: { name: "Alaska", mericIndex: 126.7, medianHome: 354_333, stateTaxRate: 0 },
  AZ: { name: "Arizona", mericIndex: 110.3, medianHome: 426_731, stateTaxRate: 0.042 },
  AR: { name: "Arkansas", mericIndex: 90.1, medianHome: 265_717, stateTaxRate: 0.055 },
  CA: { name: "California", mericIndex: 143.1, medianHome: 785_386, stateTaxRate: 0.093 },
  CO: { name: "Colorado", mericIndex: 103.1, medianHome: 555_122, stateTaxRate: 0.044 },
  CT: { name: "Connecticut", mericIndex: 114.0, medianHome: 361_885, stateTaxRate: 0.065 },
  DE: { name: "Delaware", mericIndex: 103.1, medianHome: 360_076, stateTaxRate: 0.066 },
  DC: { name: "District of Columbia", mericIndex: 137.8, medianHome: 655_071, stateTaxRate: 0.085 },
  FL: { name: "Florida", mericIndex: 101.4, medianHome: 358_039, stateTaxRate: 0 },
  GA: { name: "Georgia", mericIndex: 92.2, medianHome: 351_137, stateTaxRate: 0.055 },
  HI: { name: "Hawaii", mericIndex: 183.9, medianHome: 757_032, stateTaxRate: 0.075 },
  ID: { name: "Idaho", mericIndex: 99.3, medianHome: 488_375, stateTaxRate: 0.055 },
  IL: { name: "Illinois", mericIndex: 95.0, medianHome: 267_685, stateTaxRate: 0.0495 },
  IN: { name: "Indiana", mericIndex: 90.7, medianHome: 231_484, stateTaxRate: 0.031 },
  IA: { name: "Iowa", mericIndex: 89.8, medianHome: 249_882, stateTaxRate: 0.06 },
  KS: { name: "Kansas", mericIndex: 88.4, medianHome: 262_667, stateTaxRate: 0.056 },
  KY: { name: "Kentucky", mericIndex: 91.5, medianHome: 243_103, stateTaxRate: 0.04 },
  LA: { name: "Louisiana", mericIndex: 92.9, medianHome: 225_846, stateTaxRate: 0.045 },
  ME: { name: "Maine", mericIndex: 114.0, medianHome: 320_496, stateTaxRate: 0.065 },
  MD: { name: "Maryland", mericIndex: 117.4, medianHome: 386_246, stateTaxRate: 0.068 },
  MA: { name: "Massachusetts", mericIndex: 148.5, medianHome: 571_436, stateTaxRate: 0.05 },
  MI: { name: "Michigan", mericIndex: 91.9, medianHome: 228_126, stateTaxRate: 0.0425 },
  MN: { name: "Minnesota", mericIndex: 93.6, medianHome: 317_863, stateTaxRate: 0.073 },
  MS: { name: "Mississippi", mericIndex: 86.0, medianHome: 296_175, stateTaxRate: 0.05 },
  MO: { name: "Missouri", mericIndex: 88.9, medianHome: 241_929, stateTaxRate: 0.05 },
  MT: { name: "Montana", mericIndex: 96.8, medianHome: 448_311, stateTaxRate: 0.059 },
  NE: { name: "Nebraska", mericIndex: 91.8, medianHome: 283_890, stateTaxRate: 0.055 },
  NV: { name: "Nevada", mericIndex: 99.7, medianHome: 400_665, stateTaxRate: 0 },
  NH: { name: "New Hampshire", mericIndex: 110.5, medianHome: 414_518, stateTaxRate: 0 },
  NJ: { name: "New Jersey", mericIndex: 115.3, medianHome: 455_311, stateTaxRate: 0.065 },
  NM: { name: "New Mexico", mericIndex: 93.7, medianHome: 332_358, stateTaxRate: 0.056 },
  NY: { name: "New York", mericIndex: 125.8, medianHome: 420_586, stateTaxRate: 0.068 },
  NC: { name: "North Carolina", mericIndex: 97.9, medianHome: 320_068, stateTaxRate: 0.0475 },
  ND: { name: "North Dakota", mericIndex: 91.1, medianHome: 288_113, stateTaxRate: 0.025 },
  OH: { name: "Ohio", mericIndex: 94.6, medianHome: 222_715, stateTaxRate: 0.035 },
  OK: { name: "Oklahoma", mericIndex: 84.7, medianHome: 225_348, stateTaxRate: 0.047 },
  OR: { name: "Oregon", mericIndex: 112.8, medianHome: 465_486, stateTaxRate: 0.087 },
  PA: { name: "Pennsylvania", mericIndex: 97.1, medianHome: 277_142, stateTaxRate: 0.0307 },
  RI: { name: "Rhode Island", mericIndex: 110.7, medianHome: 433_184, stateTaxRate: 0.057 },
  SC: { name: "South Carolina", mericIndex: 92.7, medianHome: 323_821, stateTaxRate: 0.064 },
  SD: { name: "South Dakota", mericIndex: 91.8, medianHome: 338_375, stateTaxRate: 0 },
  TN: { name: "Tennessee", mericIndex: 90.1, medianHome: 331_220, stateTaxRate: 0 },
  TX: { name: "Texas", mericIndex: 91.1, medianHome: 332_134, stateTaxRate: 0 },
  UT: { name: "Utah", mericIndex: 99.5, medianHome: 553_633, stateTaxRate: 0.046 },
  VT: { name: "Vermont", mericIndex: 113.5, medianHome: 346_768, stateTaxRate: 0.055 },
  VA: { name: "Virginia", mericIndex: 102.2, medianHome: 411_735, stateTaxRate: 0.057 },
  WA: { name: "Washington", mericIndex: 112.9, medianHome: 552_256, stateTaxRate: 0 },
  WV: { name: "West Virginia", mericIndex: 88.0, medianHome: 218_649, stateTaxRate: 0.052 },
  WI: { name: "Wisconsin", mericIndex: 98.5, medianHome: 267_946, stateTaxRate: 0.055 },
  WY: { name: "Wyoming", mericIndex: 94.6, medianHome: 264_375, stateTaxRate: 0 },
};

/** US_STATE_DATA keys sorted alphabetically by display name */
export const STATE_CODES_BY_NAME: StateCode[] = (Object.keys(US_STATE_DATA) as StateCode[]).sort(
  (a, b) => US_STATE_DATA[a].name.localeCompare(US_STATE_DATA[b].name),
);

/**
 * Relative cost of living vs North Carolina (Raleigh proxy): COL_rel = MERIC_origin / MERIC_NC.
 * 1.0 ≈ same basket cost as NC average.
 */
export function colIndexRelativeToRaleigh(mericIndex: number): number {
  return mericIndex / NC_MERIC_INDEX;
}

/**
 * Raleigh-equivalent salary (illustrative):
 * Same after-state-tax “real income” per unit COL, solved for Raleigh.
 *
 * PPP_origin = salary × (1 − τ_origin) / COL_rel_origin
 * PPP_raleigh = S_R × (1 − τ_NC) / COL_rel_raleigh  with COL_rel_raleigh = 1
 * Set PPP equal → S_R = PPP_origin × 1 / (1 − τ_NC)
 */
export function computeRaleighEquivalentSalary(
  salary: number,
  originMericIndex: number,
  originStateTaxRate: number,
): number {
  const originCol = colIndexRelativeToRaleigh(originMericIndex);
  const purchasingPower = (salary * (1 - originStateTaxRate)) / originCol;
  return purchasingPower / (1 - RALEIGH_STATE_EFFECTIVE_TAX_RATE);
}

/**
 * Housing: difference between origin state median sale price and Raleigh metro benchmark.
 * Positive ≈ median home in origin state costs more than benchmark Raleigh metro median.
 */
export function computeHousingMedianDiff(originMedianHome: number): number {
  return originMedianHome - RALEIGH_METRO_MEDIAN_HOME;
}
