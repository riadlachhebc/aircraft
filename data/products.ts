import { Product, CategoryId } from "@/lib/types";

/**
 * Product Specification & Review Registry for Air Crafted Home.
 *
 * All demo products and placeholder prices have been removed for clean affiliate launch.
 * Add verified product records to the PRODUCTS record below.
 *
 * Publication Workflow:
 * - Set `status: "draft"` while gathering and auditing manufacturer nameplate specs and retailer links.
 * - Set `status: "published"` once verified (traceable engineering data, real price, active affiliate slug).
 * - Set `status: "archived"` if discontinued by manufacturer or superseded.
 *
 * Example Schema:
 * ```typescript
 * "example-inverter-portable-ac": {
 *   id: "example-ac-sku",
 *   slug: "example-inverter-portable-ac",
 *   name: "Brand Inverter 12,000 BTU Dual-Hose Portable AC",
 *   manufacturer: "Brand",
 *   modelNumber: "MAP12S1TBL",
 *   categoryId: "air-conditioners",
 *   status: "published",
 *   officialUrl: "https://brand.com/official-product-page",
 *   approximateUsdPrice: 549,
 *   priceVerifiedDate: "2026-11-01",
 *   coolingCapacityBtuSacc: 12000,
 *   recommendedRoomSqFt: 550,
 *   roomSizeBasis: "DOE SACC 12,000 BTU baseline",
 *   powerConsumptionWatts: 1300,
 *   voltageFrequency: "115V / 60Hz (Standard US 15A)",
 *   noiseDbRange: "42 - 52 dBA",
 *   noiseConditions: "Low blower to Maximum compressor draw at 2 meters",
 *   dimensionsInches: { width: 19.5, depth: 16.7, height: 32.5 },
 *   weightLbs: 71.6,
 *   installationRequirements: "Standard double-hung or sliding window",
 *   maintenanceSchedule: "Wash washable pre-filters bi-weekly during cooling season",
 *   warrantyYears: 1,
 *   certifications: ["DOE Standard Compliant", "UL Listed", "Energy Star"],
 *   pros: ["Inverter compressor modulates smoothly", "Dual-hose hose-in-hose design"],
 *   cons: ["Heavy 71.6 lb chassis requires two people to carry"],
 *   bestFor: "Living rooms and master bedrooms up to 550 sq ft",
 *   editorialLimitations: "Window kit max reach is 48 inches without extension",
 *   evidenceType: "independent-consensus",
 *   affiliateSlug: "brand-inverter-portable-ac"
 * }
 * ```
 */
export const PRODUCTS: Record<string, Product> = {};

export const PRODUCT_LIST: Product[] = Object.values(PRODUCTS);

/**
 * Returns only publicly viewable products with status === "published".
 */
export function getPublishedProducts(): Product[] {
  return PRODUCT_LIST.filter((product) => product.status === "published");
}

/**
 * Finds a published product by slug, or returns undefined if missing, draft, or archived.
 */
export function getPublishedProductBySlug(slug: string): Product | undefined {
  const product = PRODUCTS[slug];
  if (!product || product.status !== "published") {
    return undefined;
  }
  return product;
}

/**
 * Returns published products within a specific climate category.
 */
export function getPublishedProductsByCategory(categoryId: CategoryId): Product[] {
  return getPublishedProducts().filter((product) => product.categoryId === categoryId);
}
