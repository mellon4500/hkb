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
  description: string;
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
    description: "Glow Deep Serum is a Beauty of Joseon product listed in our serum category, with its name visible on the box. Consider it for the serum step when planning your routine, using confirmed label directions to guide application. The full formula and product size are not yet verified.",
    identificationNote: "Glow Deep Serum is visible on the box. Full formula and size are not verified.",
    legacySlugs: ["dewy-rice-toner", "peach-glow-essence"],
  },
  {
    id: "hkb-002", brand: "Beauty of Joseon", name: "Relief Sun",
    slug: "beauty-of-joseon-relief-sun", category: "Sunscreen",
    regularPriceRON: 95, imagePath: "/Screenshot_2.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dark-spots", "fine-lines"],
    description: "Relief Sun is the Beauty of Joseon product in our sunscreen category, identifiable by the name on its tube. It is the sun-care option in this collection for planning a daytime routine. The formula, protection rating and size remain unverified; check confirmed packaging and directions before choosing it for your needs.",
    identificationNote: "Relief Sun is identifiable on the tube. Formula, protection rating and size must be verified before sale.",
  },
  {
    id: "hkb-003", brand: "Beauty of Joseon", name: "Ginseng Serum",
    slug: "beauty-of-joseon-ginseng-serum", category: "Serum",
    regularPriceRON: 99, imagePath: "/Screenshot_3.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["fine-lines"],
    description: "This Beauty of Joseon product is listed as a serum, with ginseng-related labeling visible on its packaging. It belongs alongside the serum options when exploring a skincare routine. Ginseng Serum is a provisional catalog name: the exact variant is unconfirmed, so refer to verified product labeling for its formula and application directions.",
    identificationNote: "Brand and ginseng-related serum labeling are visible. Ginseng Serum is a provisional name; the exact variant is unconfirmed.",
  },
  {
    id: "hkb-004", brand: "It's Skin", name: "Honey Sheet Mask",
    slug: "its-skin-honey-sheet-mask", category: "Sheet mask",
    regularPriceRON: 15, imagePath: "/Screenshot_4.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dryness"],
    description: "This It's Skin product is listed as a sheet mask, with Honey and the brand name visible on its sachet. It offers a mask-format option to explore alongside your usual skincare steps. The full range name and specifications are unconfirmed; use verified package directions to determine how it fits your routine.",
    identificationNote: "Honey and It's Skin are visible on the sachet. The full range name and specifications are unconfirmed.",
  },
  {
    id: "hkb-005", brand: "COSRX", name: "Hyaluronic Acid Intensive Cream",
    slug: "cosrx-hyaluronic-acid-intensive-cream", category: "Moisturiser",
    regularPriceRON: 109, discountPriceRON: 89, imagePath: "/Screenshot_5.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["dryness"],
    description: "Hyaluronic Acid Intensive Cream is a COSRX product listed in our moisturiser category. Its brand and product name are readable on the jar, making it a cream-format option to consider when planning the moisturiser step of a routine. The formula and other specifications have not been verified; check confirmed product directions before use.",
    identificationNote: "Product name and brand are readable on the jar. Formula and other specifications have not been verified.",
    legacySlugs: ["cloud-barrier-cream"],
  },
  {
    id: "hkb-006", brand: "COSRX", name: "Centella Blemish Cream",
    slug: "cosrx-centella-blemish-cream", category: "Moisturiser",
    regularPriceRON: 85, imagePath: "/Screenshot_6.jpg",
    isBestseller: true, stockStatus: "unconfirmed", concerns: ["acne", "sensitivity"],
    description: "Centella Blemish Cream is a COSRX product listed in our moisturiser category, with its name and brand readable on the jar. Explore it as a cream-format option when considering the moisturiser step of your routine. Suitability and performance claims remain unverified; consult confirmed product labeling rather than relying on the name alone.",
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
// Temporary presentation data only. Never treat these as verified reviews or live inventory.
export const demoProductData: Record<string, { reviewCount: number; stockQuantity: number }> = {
  "hkb-001": { reviewCount: 124, stockQuantity: 7 },
  "hkb-002": { reviewCount: 86, stockQuantity: 9 },
  "hkb-003": { reviewCount: 57, stockQuantity: 4 },
  "hkb-004": { reviewCount: 203, stockQuantity: 12 },
  "hkb-005": { reviewCount: 98, stockQuantity: 6 },
  "hkb-006": { reviewCount: 41, stockQuantity: 5 },
};
