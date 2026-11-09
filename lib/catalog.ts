export const concerns = [
  { slug: "acne", label: "Acne & Breakouts" },
  { slug: "dryness", label: "Dryness" },
  { slug: "dark-spots", label: "Dark Spots" },
  { slug: "sensitivity", label: "Sensitivity" },
  { slug: "fine-lines", label: "Fine Lines" },
] as const;

export type Product = {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: "Serum" | "Sunscreen" | "Sheet mask" | "Moisturiser";
  regularPriceRON: number;
  discountPriceRON?: number;
  imagePath: string;
  isBestseller: boolean;
  stockStatus: "unconfirmed" | "in_stock" | "out_of_stock";
  concerns: string[];
  identificationNote: string;
  legacySlugs?: string[];
};

// One source of truth for all cards, search results and product pages.
// Names are transcribed conservatively from the supplied photographs.
// All prices, bestseller selections and concern groupings are DEMO values.
// No live stock, efficacy, ingredients or product authenticity is verified.
export const products: Product[] = [
  {
    id: "hkb-001", brand: "Beauty of Joseon", name: "Glow Deep Serum",
    slug: "beauty-of-joseon-glow-deep-serum", category: "Serum",
    regularPriceRON: 89, discountPriceRON: 75, imagePath: "/Screenshot_1.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dark-spots"],
    identificationNote: "Glow Deep Serum is visible on the box. Full formula and size are not verified.",
    legacySlugs: ["dewy-rice-toner", "peach-glow-essence"],
  },
  {
    id: "hkb-002", brand: "Beauty of Joseon", name: "Relief Sun",
    slug: "beauty-of-joseon-relief-sun", category: "Sunscreen",
    regularPriceRON: 95, imagePath: "/Screenshot_2.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dark-spots", "fine-lines"],
    identificationNote: "Relief Sun is identifiable on the tube. Formula, protection rating and size must be verified before sale.",
  },
  {
    id: "hkb-003", brand: "Beauty of Joseon", name: "Ginseng Serum",
    slug: "beauty-of-joseon-ginseng-serum", category: "Serum",
    regularPriceRON: 99, imagePath: "/Screenshot_3.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["fine-lines"],
    identificationNote: "Brand and ginseng-related serum labeling are visible. Ginseng Serum is a provisional name; the exact variant is unconfirmed.",
  },
  {
    id: "hkb-004", brand: "It's Skin", name: "Honey Sheet Mask",
    slug: "its-skin-honey-sheet-mask", category: "Sheet mask",
    regularPriceRON: 15, imagePath: "/Screenshot_4.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dryness"],
    identificationNote: "Honey and It's Skin are visible on the sachet. The full range name and specifications are unconfirmed.",
  },
  {
    id: "hkb-005", brand: "COSRX", name: "Hyaluronic Acid Intensive Cream",
    slug: "cosrx-hyaluronic-acid-intensive-cream", category: "Moisturiser",
    regularPriceRON: 109, discountPriceRON: 89, imagePath: "/Screenshot_5.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dryness"],
    identificationNote: "Product name and brand are readable on the jar. Formula and other specifications have not been verified.",
    legacySlugs: ["cloud-barrier-cream"],
  },
  {
    id: "hkb-006", brand: "COSRX", name: "Centella Blemish Cream",
    slug: "cosrx-centella-blemish-cream", category: "Moisturiser",
    regularPriceRON: 85, imagePath: "/Screenshot_6.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["acne", "sensitivity"],
    identificationNote: "Product name and brand are readable on the jar. Suitability and performance claims have not been verified.",
    legacySlugs: ["calm-centella-serum"],
  },
];

export const catalogNotice = "Prototype catalog: photo-based identification, temporary RON prices, demo bestseller placement and unverified concern groupings. Stock is unconfirmed; ordering is unavailable.";
export const formatPrice = (price: number) => new Intl.NumberFormat("ro-RO", {
  style: "currency", currency: "RON", minimumFractionDigits: 2,
}).format(price);
export const getProductBySlug = (slug: string) => products.find(product =>
  product.slug === slug || product.legacySlugs?.includes(slug));
