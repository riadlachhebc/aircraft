import { Product, CategoryId } from "@/lib/types";
import { validateAffiliateRedirect } from "./affiliateRedirects";

/**
 * Validates a product record against Air Crafted Home data integrity rules.
 * Ensures no unverified or placeholder data is presented publicly as a recommendation.
 */
export function validateProductRecord(product: Product): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!product.id || typeof product.id !== "string" || product.id.trim() === "") {
    errors.push("Product must have a stable, non-empty ID.");
  }

  if (!product.slug || typeof product.slug !== "string" || product.slug.trim() === "") {
    errors.push("Product must have a URL-safe slug.");
  }

  if (!product.name || typeof product.name !== "string" || product.name.trim() === "") {
    errors.push("Product must have a descriptive name.");
  }

  const brand = product.brand || product.manufacturer;
  if (!brand || typeof brand !== "string" || brand.trim() === "") {
    errors.push("Product must have a verified manufacturer/brand.");
  }

  if (!product.modelNumber || typeof product.modelNumber !== "string" || product.modelNumber.trim() === "") {
    errors.push("Product must have an exact model/SKU number.");
  }

  const validCategories: CategoryId[] = [
    "air-conditioners",
    "heating",
    "fans-air-circulators",
    "air-quality",
    "energy-efficiency",
  ];
  if (!validCategories.includes(product.categoryId)) {
    errors.push(`Invalid categoryId "${product.categoryId}".`);
  }

  if (!product.officialUrl || typeof product.officialUrl !== "string") {
    errors.push("Product must have an official manufacturer URL.");
  } else {
    try {
      new URL(product.officialUrl);
    } catch {
      errors.push("officialUrl must be a valid URL string.");
    }
  }

  // If status is published, enforce strict completeness
  if (product.status === "published") {
    if (!product.pros || !Array.isArray(product.pros) || product.pros.length === 0) {
      errors.push("Published product must list at least one verified advantage (pros).");
    }

    if (!product.cons || !Array.isArray(product.cons) || product.cons.length === 0) {
      errors.push("Published product must list at least one known limitation (cons).");
    }

    if (!product.bestFor || product.bestFor.trim().length < 10) {
      errors.push("Published product must have an intended audience / bestFor summary (>= 10 chars).");
    }

    if (typeof product.powerConsumptionWatts !== "number" || product.powerConsumptionWatts <= 0) {
      errors.push("Published product must have verified powerConsumptionWatts > 0.");
    }

    if (typeof product.weightLbs !== "number" || product.weightLbs <= 0) {
      errors.push("Published product must have verified weightLbs > 0.");
    }

    if (
      !product.dimensionsInches ||
      product.dimensionsInches.width <= 0 ||
      product.dimensionsInches.depth <= 0 ||
      product.dimensionsInches.height <= 0
    ) {
      errors.push("Published product must have verified physical dimensions (width, depth, height > 0).");
    }

    if (!product.noiseDbRange || product.noiseDbRange.trim() === "") {
      errors.push("Published product must provide noiseDbRange acoustics data.");
    }

    if (!product.editorialLimitations || product.editorialLimitations.trim().length < 15) {
      errors.push("Published product must have editorialLimitations explaining boundary conditions.");
    }

    // Verify price if specified
    if (product.approximateUsdPrice !== undefined) {
      if (typeof product.approximateUsdPrice !== "number" || product.approximateUsdPrice < 0) {
        errors.push("approximateUsdPrice must be a non-negative number.");
      }
      if (!product.priceVerifiedDate || !/^\d{4}-\d{2}-\d{2}$/.test(product.priceVerifiedDate)) {
        errors.push("Published product with price must have a valid priceVerifiedDate (YYYY-MM-DD).");
      }
    }

    // Verify affiliate slug destination safety if present
    if (product.affiliateSlug) {
      const affiliateValidation = validateAffiliateRedirect(product.affiliateSlug);
      if (!affiliateValidation.isValid) {
        errors.push(
          `affiliateSlug "${product.affiliateSlug}" is invalid or inactive: ${affiliateValidation.reason || "Validation failed"}`
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

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
 */
export const PRODUCTS: Record<string, Product> = {
  "lasko-duo-comfort-38-dc-fhv830": {
    id: "lasko-duo-comfort-38-dc-fhv830",
    slug: "lasko-duo-comfort-38-dc-fhv830",
    name: "Lasko DUO Comfort 38\" DC Tower Fan & Ceramic Space Heater",
    manufacturer: "Lasko",
    brand: "Lasko",
    modelNumber: "FHV830",
    categoryId: "heating",
    status: "published",
    officialUrl:
      "https://lasko.com/products/lasko-duo-comfort-38-dc-tower-fan-and-ceramic-space-heater-oscillating-3-heat-settings-4-fan-speeds-remote-timer-tip-over-switch",
    approximateUsdPrice: 159.99,
    priceVerifiedDate: "2026-10-23",
    heatingCapacityWatts: 1500,
    recommendedRoomSqFt: 300,
    roomSizeBasis:
      "Manufacturer-stated maximum coverage area (up to 300 sq ft); actual thermal comfort depends on room insulation, ceiling height, and outdoor winter temperatures",
    powerConsumptionWatts: 1500,
    voltageFrequency: "120V / 60Hz (Standard US 15A Circuit)",
    noiseDbRange: "Quiet DC operation (official dBA not published by manufacturer)",
    noiseConditions:
      "Manufacturer utilizes WhisperForce brushless DC motor technology for quiet residential operation; manufacturer does not publish formal dBA acoustic lab ratings",
    dimensionsInches: { width: 8.0, depth: 10.96, height: 37.5 },
    weightLbs: 15.13,
    installationRequirements:
      "Freestanding portable tower; tool-free quick-snap base assembly; requires 3-foot minimum clearance from combustible materials (bedding, curtains, furniture) per CPSC and manufacturer manual; plug directly into dedicated 120V wall outlet only (no extension cords or power strips)",
    maintenanceSchedule:
      "Unplug prior to cleaning; remove washable rear filter screen by pulling filter tab; vacuum filter and intake grills bi-weekly with brush attachment; wipe exterior with soft dry cloth; do not immerse in water",
    replacementPartsCostEstimate:
      "$0 (Permanent washable/vacuumable intake filter screen; no disposable filters required)",
    warrantyYears: 3,
    certifications: ["ETL Listed", "Intertek Safety Certified (UL 1278)"],
    pros: [
      "Year-round 2-in-1 hybrid design eliminates off-season storage headaches by combining tower fan and ceramic heater",
      "Brushless DC motor (WhisperForce) provides smooth, low-wattage air circulation across 4 speeds",
      "1,500W ceramic PTC element delivers rapid supplemental warmth with 3 heat settings",
      "AutoEco electronic thermostat cycles between High and Low heat and shuts off ~4°F above target to maintain comfort",
      "Comprehensive safety suite includes tip-over microswitch, automatic overheat cut-off, and cool-touch exterior",
    ],
    cons: [
      "Not an air conditioner: Fan mode circulates ambient air via wind-chill effect without lowering sensible room temperature",
      "High-heat mode draws up to 12.5 Amps (1,500W), requiring a dedicated 120V wall outlet (never extension cords or power strips)",
      "Manufacturer coverage of up to 300 sq ft is supplemental; heating performance varies significantly in drafty or high-ceiling spaces",
      "Initial break-in odor: Ceramic heating element and protective coatings emit a slight temporary warm odor during initial heating cycles",
    ],
    bestFor:
      "Bedrooms, home offices, and living spaces up to 300 sq ft needing all-season comfort with zero off-season appliance storage",
    targetAudience:
      "Renters, remote workers, and homeowners seeking supplemental zone heating in winter and quiet air circulation in summer",
    editorialLimitations:
      "Supplemental zone heater and air circulator only. Does not provide refrigerated cooling or air conditioning. Effective heating in larger spaces depends on room insulation and outdoor temperatures. Requires a dedicated 120V outlet and 3-foot clearance from combustibles.",
    evidenceType: "manufacturer-spec",
    affiliateSlug: "lasko-duo-comfort-38-dc",
    affiliateUrl: "https://lasko.sjv.io/jR39Ov",
    reviewArticleSlug: "lasko-duo-comfort-38-dc-fan-heater-review",
    imageUrl: "/images/products/lasko-fhv830/lasko-fhv830-main.jpg",
    imageAlt:
      "Lasko DUO Comfort 38-Inch DC Tower Fan & Ceramic Space Heater Model FHV830",
    imageUsagePermission:
      "Official manufacturer product documentation and retail distribution asset via Lasko Products, LLC",
    specSources: [
      {
        title:
          "Lasko DUO Comfort 38\" DC Tower Fan & Space Heater Specifications & Manual",
        publisher: "Lasko Products, LLC",
        url: "https://lasko.com/products/lasko-duo-comfort-38-dc-tower-fan-and-ceramic-space-heater-oscillating-3-heat-settings-4-fan-speeds-remote-timer-tip-over-switch",
      },
      {
        title: "CPSC Space Heater Safety Standards and Clearances",
        publisher: "US Consumer Product Safety Commission (CPSC)",
        url: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Heating-and-Thermal-Safety",
      },
      {
        title: "Intertek Directory of Listed Products (ETL / UL 1278)",
        publisher: "Intertek",
        url: "https://www.intertek.com",
      },
    ],
  },
  "lasko-ellipse-12-ceramic-cd12950": {
    id: "lasko-ellipse-12-ceramic-cd12950",
    slug: "lasko-ellipse-12-ceramic-cd12950",
    name: "Lasko Ellipse 12\" Ceramic Space Heater",
    manufacturer: "Lasko",
    brand: "Lasko",
    modelNumber: "CD12950",
    categoryId: "heating",
    status: "published",
    officialUrl:
      "https://lasko.com/products/lasko-ellipse-12-ceramic-space-heater-oscillating-3-heat-settings-tip-over-switch-child-lock",
    approximateUsdPrice: 69.99,
    priceVerifiedDate: "2026-10-25",
    heatingCapacityWatts: 1500,
    recommendedRoomSqFt: 150,
    roomSizeBasis:
      "Personal desk area and compact home office supplemental heating (up to 150 sq ft); actual thermal comfort depends on room insulation, ceiling height, and outdoor temperatures",
    powerConsumptionWatts: 1500,
    voltageFrequency: "120V / 60Hz (Standard US 15A Circuit)",
    noiseDbRange:
      "Quiet operation (<40 dB reported in retail specifications; official acoustic lab rating not published by manufacturer)",
    noiseConditions:
      "Internal cross-flow/blower fan across 2 fan speeds; manufacturer does not publish formal sound chamber dBA ratings",
    dimensionsInches: { width: 6.11, depth: 4.86, height: 11.65 },
    weightLbs: 3.1,
    installationRequirements:
      "Freestanding compact tabletop or floor placement; requires 3-foot minimum clearance from combustible materials (papers, curtains, furniture, bedding) per CPSC and manufacturer manual; plug directly into dedicated 120V wall outlet only (no extension cords or power strips)",
    maintenanceSchedule:
      "Unplug prior to cleaning; wipe exterior grilles with a soft dry cloth or vacuum with brush attachment bi-weekly; do not immerse in water; store in original packaging in a cool, dry place",
    replacementPartsCostEstimate:
      "$0 (Permanent intake screen; no disposable filters required)",
    warrantyYears: 3,
    certifications: ["ETL Listed", "Intertek Safety Certified (UL 1278)"],
    pros: [
      "Compact 11.65-inch vertical profile with a 4.86\" x 6.11\" footprint well-suited for home office desks and compact workspaces",
      "120-degree widespread oscillation distributes convective warmth across a broader seated personal zone",
      "Positive Temperature Coefficient (PTC) ceramic heating element delivers rapid supplemental heat within 60 seconds",
      "Integrated Child Lock function (activated by holding button for 3 seconds) prevents unintended setting adjustments by children or pets",
      "Built-in safety suite includes tip-over microswitch, automatic overheat thermal cut-off, and cool-touch housing",
    ],
    cons: [
      "High-heat mode draws up to 12.5 Amps (1,500W), requiring a dedicated 120V wall receptacle (never extension cords or power strips)",
      "Personal/desk-zone supplemental heater; not designed to heat large rooms, vaulted spaces, or open-concept living plans",
      "Price and availability subject to change from the supplied $69.99 baseline; check official manufacturer listing before purchasing",
    ],
    bestFor:
      "Home offices, desks, dens, and bedrooms up to 150 sq ft needing compact supplemental warmth and tabletop versatility",
    targetAudience:
      "Remote workers, students, and homeowners seeking affordable personal zone heating with oscillation, touch controls, and child safety features",
    editorialLimitations:
      "Supplemental personal and small-room heater only. Does not replace central heating. Effective warmth depends on room insulation and distance from the unit. Requires a dedicated 120V wall outlet and 3-foot clearance from combustibles.",
    evidenceType: "manufacturer-spec",
    affiliateSlug: "lasko-ellipse-12-ceramic",
    affiliateUrl: "https://lasko.sjv.io/E0X5V9",
    reviewArticleSlug: "best-space-heater-for-home-office",
    imageUrl: "/images/products/lasko-cd12950/lasko-cd12950-main.jpg",
    imageAlt: "Lasko Ellipse 12-Inch Ceramic Space Heater Model CD12950",
    imageUsagePermission:
      "Official manufacturer product documentation and retail distribution asset via Lasko Products, LLC",
    specSources: [
      {
        title:
          "Lasko Ellipse 12\" Ceramic Space Heater Product Specifications & Manual",
        publisher: "Lasko Products, LLC",
        url: "https://lasko.com/products/lasko-ellipse-12-ceramic-space-heater-oscillating-3-heat-settings-tip-over-switch-child-lock",
      },
      {
        title:
          "CPSC Space Heater Safety Clearances & Fire Prevention Guidelines",
        publisher: "US Consumer Product Safety Commission (CPSC)",
        url: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Heating-and-Thermal-Safety",
      },
      {
        title: "Intertek Directory of Listed Products (ETL / UL 1278 Standard)",
        publisher: "Intertek",
        url: "https://www.intertek.com",
      },
    ],
  },
};

export const PRODUCT_LIST: Product[] = Object.values(PRODUCTS);

/**
 * Returns only publicly viewable products with status === "published" that pass verification.
 */
export function getPublishedProducts(): Product[] {
  return PRODUCT_LIST.filter(
    (product) => product.status === "published" && validateProductRecord(product).isValid
  );
}

/**
 * Finds any product (including draft) by its stable ID.
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCT_LIST.find((p) => p.id === id);
}

/**
 * Finds a published product by its stable ID.
 */
export function getPublishedProductById(id: string): Product | undefined {
  const product = getProductById(id);
  if (!product || product.status !== "published" || !validateProductRecord(product).isValid) {
    return undefined;
  }
  return product;
}

/**
 * Finds any product (including draft) by slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS[slug] || PRODUCT_LIST.find((p) => p.slug === slug);
}

/**
 * Finds a published product by slug, or returns undefined if missing, draft, or archived.
 */
export function getPublishedProductBySlug(slug: string): Product | undefined {
  const product = getProductBySlug(slug);
  if (!product || product.status !== "published" || !validateProductRecord(product).isValid) {
    return undefined;
  }
  return product;
}

/**
 * Resolves multiple published products by their stable IDs.
 */
export function getPublishedProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => getPublishedProductById(id))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Resolves multiple published products by their slugs.
 */
export function getPublishedProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getPublishedProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

/**
 * Returns published products within a specific climate category.
 */
export function getPublishedProductsByCategory(categoryId: CategoryId): Product[] {
  return getPublishedProducts().filter((product) => product.categoryId === categoryId);
}
