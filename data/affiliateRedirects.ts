import { AffiliateRedirect } from "@/lib/types";

/**
 * Strict hostname allowlist for outbound affiliate redirections.
 * Any destination hostname not in this set is rejected automatically to prevent open redirect vulnerabilities.
 */
export const ALLOWED_MERCHANT_HOSTNAMES = new Set([
  "amazon.com",
  "www.amazon.com",
  "amzn.to",
  "homedepot.com",
  "www.homedepot.com",
  "target.com",
  "www.target.com",
  "midea.com",
  "www.midea.com",
  "vornado.com",
  "www.vornado.com",
  "cowaymega.com",
  "www.cowaymega.com",
  "delonghi.com",
  "www.delonghi.com",
  "dreo.com",
  "www.dreo.com",
  "levoit.com",
  "www.levoit.com",
]);

/**
 * Centralized server-side registry of affiliate links.
 * Note: If commercial affiliate credentials are not yet configured for a product,
 * it points directly to the verified official manufacturer product page.
 */
export const AFFILIATE_REGISTRY: Record<string, AffiliateRedirect> = {
  "midea-duo-12000-btu-portable-ac": {
    slug: "midea-duo-12000-btu-portable-ac",
    productId: "midea-duo-map12s1tbl",
    productName: "Midea Duo 12,000 BTU Inverter Portable Air Conditioner",
    merchant: "Midea Official / Verified Retailer",
    destinationUrl: "https://www.midea.com/us/air-conditioners/portable-air-conditioners/midea-duo-smart-inverter-portable-air-conditioner-map12s1tbl",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
  "vornado-660-air-circulator": {
    slug: "vornado-660-air-circulator",
    productId: "vornado-660-circulator",
    productName: "Vornado 660 Large Whole Room Air Circulator",
    merchant: "Vornado Official / Verified Retailer",
    destinationUrl: "https://www.vornado.com/shop/circulators-fans/whole-room/660-large-whole-room-air-circulator",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
  "coway-airmega-ap-1512hh": {
    slug: "coway-airmega-ap-1512hh",
    productId: "coway-airmega-ap1512hh",
    productName: "Coway Airmega AP-1512HH True HEPA Air Purifier",
    merchant: "Coway Official / Verified Retailer",
    destinationUrl: "https://cowaymega.com/products/airmega-ap-1512hh",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
  "delonghi-dragon4-radiator": {
    slug: "delonghi-dragon4-radiator",
    productId: "delonghi-trd40615e",
    productName: "De'Longhi Dragon4 1500W Oil-Filled Radiant Space Heater",
    merchant: "De'Longhi Official / Verified Retailer",
    destinationUrl: "https://www.delonghi.com/en-us/dragon4-oil-filled-radiator-heater-with-timer-trd40615e/p/TRD40615E",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
  "dreo-nomad-one-tower-fan": {
    slug: "dreo-nomad-one-tower-fan",
    productId: "dreo-nomad-one",
    productName: "Dreo Nomad One 36-Inch Oscillating Tower Fan",
    merchant: "Dreo Official / Verified Retailer",
    destinationUrl: "https://www.dreo.com/products/dreo-nomad-one-tower-fan",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
  "levoit-core-300-air-purifier": {
    slug: "levoit-core-300-air-purifier",
    productId: "levoit-core-300p",
    productName: "Levoit Core 300 True HEPA Air Purifier",
    merchant: "Levoit Official / Verified Retailer",
    destinationUrl: "https://levoit.com/products/core-300-true-hepa-air-purifier",
    isActive: true,
    lastVerifiedDate: "2026-10-15",
    disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
  },
};

/**
 * Validates whether a redirect slug exists, is active, and points to an allowed secure URL.
 */
export function validateAffiliateRedirect(slug: string): {
  isValid: boolean;
  redirect?: AffiliateRedirect;
  reason?: string;
} {
  const entry = AFFILIATE_REGISTRY[slug];
  if (!entry) {
    return { isValid: false, reason: "Slug not found in registry." };
  }

  if (!entry.isActive) {
    return { isValid: false, reason: "Redirect is currently deactivated." };
  }

  try {
    const parsedUrl = new URL(entry.destinationUrl);
    if (parsedUrl.protocol !== "https:") {
      return { isValid: false, reason: "Insecure protocol rejected." };
    }

    const host = parsedUrl.hostname.toLowerCase();
    if (!ALLOWED_MERCHANT_HOSTNAMES.has(host)) {
      return {
        isValid: false,
        reason: `Destination host ${host} is not in the approved merchant allowlist.`,
      };
    }

    return { isValid: true, redirect: entry };
  } catch {
    return { isValid: false, reason: "Malformed destination URL." };
  }
}
