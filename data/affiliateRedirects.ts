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
 *
 * All demo affiliate links and sample tracking destinations have been reset for launch.
 * Register genuine affiliate redirects below once approved by partner merchant networks.
 *
 * Example Schema:
 * ```typescript
 * "example-appliance-slug": {
 *   slug: "example-appliance-slug",
 *   productId: "example-sku",
 *   productName: "Manufacturer Model Name",
 *   merchant: "Amazon / Official Store",
 *   destinationUrl: "https://www.amazon.com/dp/B0XXXXXX?tag=youraffid-20",
 *   isActive: true,
 *   lastVerifiedDate: "2026-11-01",
 *   disclosureNotice: "Air Crafted Home may receive a commission on qualified purchases made through this link at no additional cost to you.",
 * }
 * ```
 */
export const AFFILIATE_REGISTRY: Record<string, AffiliateRedirect> = {};

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
