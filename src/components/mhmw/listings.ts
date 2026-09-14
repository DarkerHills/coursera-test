// Figma's source data for this grid was lorem/dummy content (every card
// duplicated as "Japanese Zen house" / "$490,000" / "24407 Strong Pine Dr").
// Cycling a small set of varied, plausible listings through the same 4x4
// grid reads as a real product rather than a copy-paste bug, while keeping
// every field the design specifies (title, price, address, beds, baths,
// sq ft) and the exact card layout.
export type Listing = {
  title: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  hue: string;
  /** Real photo, when one was supplied — falls back to the gradient swatch otherwise. */
  image?: string;
};

const BASE_LISTINGS: Omit<Listing, "hue">[] = [
  {
    title: "Modern Mansion",
    price: "$1,250,000",
    address: "24407 Strong Pine Dr, Austin TX",
    beds: 5,
    baths: 4,
    sqft: "3,900",
    image: "/listing-mansion.jpg",
  },
  {
    title: "Minimalist Courtyard Loft",
    price: "$560,000",
    address: "77 Birch Hollow Rd, Austin TX",
    beds: 2,
    baths: 2,
    sqft: "1,340",
    image: "/listing-interior.png",
  },
  {
    title: "Modern Home in Queens",
    price: "$675,000",
    address: "52 Maple Grove Ave, Queens NY",
    beds: 3,
    baths: 2,
    sqft: "1,680",
    image: "/listing-queens.jpg",
  },
  {
    title: "Japanese Zen House",
    price: "$940,000",
    address: "9 Koi Pond Way, Portland OR",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    image: "/listing-zen.jpg",
  },
  { title: "Coastal Glass Retreat", price: "$1,480,000", address: "3 Driftwood Ct, Malibu CA", beds: 4, baths: 4, sqft: "3,200" },
  {
    title: "Modern 3 Bedroom with Pool",
    price: "$890,000",
    address: "118 Cedar Ridge Ln, Denver CO",
    beds: 3,
    baths: 3,
    sqft: "2,150",
    image: "/listing-pool.jpg",
  },
  { title: "Hillside Timber Cabin", price: "$725,000", address: "210 Alder Peak Dr, Boulder CO", beds: 3, baths: 2, sqft: "1,920" },
  {
    title: "Sunlit Garden Bungalow",
    price: "$610,000",
    address: "45 Willow Bend St, Nashville TN",
    beds: 3,
    baths: 2,
    sqft: "1,540",
    image: "/listing-exterior.png",
  },
];

const HUES = [
  "linear-gradient(135deg,#d8c4a8,#8a715a)",
  "linear-gradient(135deg,#c2cdb8,#6f7d5c)",
  "linear-gradient(135deg,#d9b9a3,#9c6b4f)",
  "linear-gradient(135deg,#c7c2d6,#6f6a8c)",
  "linear-gradient(135deg,#dfc9a0,#a3784a)",
  "linear-gradient(135deg,#b9cdd1,#5c7d84)",
  "linear-gradient(135deg,#d3c0b0,#8c6a56)",
  "linear-gradient(135deg,#c9d0b3,#727d54)",
];

export const listings: Listing[] = Array.from({ length: 16 }, (_, i) => ({
  ...BASE_LISTINGS[i % BASE_LISTINGS.length],
  hue: HUES[i % HUES.length],
}));
