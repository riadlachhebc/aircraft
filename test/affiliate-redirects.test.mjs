import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateAffiliateRedirect,
  AFFILIATE_REGISTRY,
  ALLOWED_MERCHANT_HOSTNAMES,
} from "../data/affiliateRedirects.ts";
import sitemap from "../app/sitemap.ts";

test("Affiliate Redirect: Production registry is clean with 0 demo destinations", () => {
  assert.equal(
    Object.keys(AFFILIATE_REGISTRY).length,
    0,
    "AFFILIATE_REGISTRY must contain 0 demo destinations for clean launch"
  );
});

test("Affiliate Redirect: Unknown or unconfigured slug is rejected safely", () => {
  const result = validateAffiliateRedirect("midea-duo-12000-btu-portable-ac");
  assert.equal(result.isValid, false);
  assert.equal(result.reason, "Slug not found in registry.");

  const fakeResult = validateAffiliateRedirect("non-existent-fake-product");
  assert.equal(fakeResult.isValid, false);
  assert.equal(fakeResult.reason, "Slug not found in registry.");
});

test("Affiliate Redirect: Merchant hostname allowlist security checks", () => {
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("malicious-site.com"), false);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("unverified-affiliate.com"), false);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("amazon.com"), true);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("www.amazon.com"), true);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("www.homedepot.com"), true);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("www.target.com"), true);
});

test("Affiliate Redirect: /go/ endpoints and search queries are NOT in sitemap", () => {
  const sitemapFn = typeof sitemap === "function" ? sitemap : sitemap?.default;
  assert.ok(typeof sitemapFn === "function", "sitemapFn should be a function");
  const sitemapEntries = sitemapFn();
  const hasGoRoute = sitemapEntries.some((entry) => entry.url.includes("/go/"));
  assert.equal(hasGoRoute, false, "Affiliate redirect URLs must never be in sitemap.xml");

  const hasSearchRoute = sitemapEntries.some((entry) => entry.url.includes("/search"));
  assert.equal(hasSearchRoute, false, "Internal search URLs must never be in sitemap.xml");
});
