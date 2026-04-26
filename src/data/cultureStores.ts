/**
 * Triangle-area specialty grocers & food halls (illustrative pins for the map).
 * Coordinates are approximate; verify addresses and hours before visiting.
 */

export type CultureTabId = "slavic" | "asian" | "indian" | "american";

export type CultureStore = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const CULTURE_TABS: { id: CultureTabId; label: string; blurb: string }[] = [
  {
    id: "slavic",
    label: "Slavic & Eastern European",
    blurb: "Markets and bakeries popular with Eastern European communities.",
  },
  {
    id: "asian",
    label: "Asian",
    blurb: "Large-format Asian supermarkets and pan-Asian specialty shops.",
  },
  {
    id: "indian",
    label: "Indian",
    blurb: "South Asian groceries along the Chatham / Morrisville corridor and beyond.",
  },
  {
    id: "american",
    label: "American & local",
    blurb: "Farmers markets, food halls, and Carolina-forward retail.",
  },
];

export const CULTURE_STORES: Record<CultureTabId, CultureStore[]> = {
  slavic: [
    {
      id: "golden-hex",
      name: "Golden Hex",
      address: "1200 NW Maynard Rd, Cary, NC 27513",
      lat: 35.7966,
      lng: -78.8259,
    },
    {
      id: "tala",
      name: "Tala Euro-Russian Mart",
      address: "5720 Capital Blvd, Raleigh, NC 27616",
      lat: 35.8535,
      lng: -78.5895,
    },
    {
      id: "polonez",
      name: "Polish Market Polonez",
      address: "3219 New Bern Ave, Raleigh, NC 27610",
      lat: 35.7948,
      lng: -78.5992,
    },
    {
      id: "guglhupf",
      name: "Guglhupf Bakery & Patisserie",
      address: "2706 Durham-Chapel Hill Blvd, Durham, NC 27707",
      lat: 35.9678,
      lng: -78.9545,
    },
    {
      id: "la-farm",
      name: "La Farm Bakery",
      address: "4244 NW Cary Pkwy, Cary, NC 27513",
      lat: 35.8382,
      lng: -78.8561,
    },
    {
      id: "vom-fass",
      name: "Vom FASS (Waverly Place)",
      address: "302 Colonades Way Ste 201, Cary, NC 27518",
      lat: 35.7731,
      lng: -78.7806,
    },
  ],
  asian: [
    {
      id: "grand-asia",
      name: "Grand Asia Market",
      address: "1253 Buck Jones Rd, Raleigh, NC 27606",
      lat: 35.7684,
      lng: -78.7441,
    },
    {
      id: "hmart",
      name: "H Mart Cary",
      address: "1961 High House Rd, Cary, NC 27519",
      lat: 35.8234,
      lng: -78.8512,
    },
    {
      id: "li-mings",
      name: "Li Ming's Global Mart",
      address: "3400 Westgate Dr Ste 14A, Durham, NC 27707",
      lat: 35.9646,
      lng: -78.9567,
    },
    {
      id: "pacific-rim",
      name: "Pacific Rim",
      address: "201 S Estes Dr, Chapel Hill, NC 27514",
      lat: 35.9102,
      lng: -79.0754,
    },
    {
      id: "compare-avondale",
      name: "Compare Foods (Avondale)",
      address: "2000 Avondale Dr, Durham, NC 27704",
      lat: 35.9772,
      lng: -78.8895,
    },
    {
      id: "today-asia",
      name: "Today Asia Market",
      address: "1207 Kildaire Farm Rd Ste I, Cary, NC 27511",
      lat: 35.7609,
      lng: -78.7818,
    },
  ],
  indian: [
    {
      id: "patel",
      name: "Patel Brothers",
      address: "802 E Chatham St, Cary, NC 27511",
      lat: 35.7724,
      lng: -78.7631,
    },
    {
      id: "india-bazaar",
      name: "India Bazaar",
      address: "123 E Chatham St, Cary, NC 27511",
      lat: 35.7719,
      lng: -78.7624,
    },
    {
      id: "apna-bazar",
      name: "Apna Bazar",
      address: "3607 Davis Dr Ste 116, Morrisville, NC 27560",
      lat: 35.8249,
      lng: -78.8391,
    },
    {
      id: "vaishno",
      name: "Vaishno Bhog",
      address: "810 E Chatham St, Cary, NC 27511",
      lat: 35.7726,
      lng: -78.7626,
    },
    {
      id: "grand-india-mart",
      name: "Grand India Mart",
      address: "544 E Williams St, Apex, NC 27502",
      lat: 35.7378,
      lng: -78.8506,
    },
    {
      id: "spices-hut",
      name: "Spices Hut",
      address: "9601 Chapel Hill Rd, Morrisville, NC 27560",
      lat: 35.8074,
      lng: -78.8382,
    },
  ],
  american: [
    {
      id: "farmers-market",
      name: "NC State Farmers Market",
      address: "1209 Farmers Market Dr, Raleigh, NC 27603",
      lat: 35.6481,
      lng: -78.6764,
    },
    {
      id: "morgan-hall",
      name: "Morgan Street Food Hall",
      address: "411 W Morgan St, Raleigh, NC 27603",
      lat: 35.7761,
      lng: -78.6442,
    },
    {
      id: "weaver",
      name: "Weaver Street Market",
      address: "101 E Weaver St, Carrboro, NC 27510",
      lat: 35.9105,
      lng: -79.0742,
    },
    {
      id: "durham-food-hall",
      name: "Durham Food Hall",
      address: "530 Foster St, Durham, NC 27701",
      lat: 35.9964,
      lng: -78.9012,
    },
    {
      id: "butcher",
      name: "The Butcher's Market",
      address: "111 Seaboard Ave, Raleigh, NC 27604",
      lat: 35.7892,
      lng: -78.6359,
    },
    {
      id: "logan",
      name: "Logan's Garden Shop (Six Forks)",
      address: "707 Semart Dr, Raleigh, NC 27604",
      lat: 35.8571,
      lng: -78.6034,
    },
  ],
};
