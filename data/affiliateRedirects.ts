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
  "lasko.com",
  "www.lasko.com",
  "lasko.sjv.io",
]);

/**
 * Centralized server-side registry of affiliate links.
 *
 * Real, approved affiliate tracking destinations are registered below.
 */
export const AFFILIATE_REGISTRY: Record<string, AffiliateRedirect> = {
  "lasko-duo-comfort-38-dc": {
    slug: "lasko-duo-comfort-38-dc",
    productId: "lasko-duo-comfort-38-dc-fhv830",
    productName: "Lasko DUO Comfort 38\" DC Tower Fan & Ceramic Space Heater (FHV830)",
    merchant: "Lasko Official Store",
    destinationUrl: "https://lasko.sjv.io/jR39Ov",
    isActive: true,
    lastVerifiedDate: "2026-10-23",
    disclosureNotice:
      "Air Crafted Home may receive a referral commission on qualified purchases made through this link at no additional cost to you.",
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
