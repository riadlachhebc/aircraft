import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateAffiliateRedirect,
  AFFILIATE_REGISTRY,
  ALLOWED_MERCHANT_HOSTNAMES,
} from "../data/affiliateRedirects.ts";
import sitemap from "../app/sitemap.ts";

test("Affiliate Redirect: Valid registered slug passes validation", () => {
  const result = validateAffiliateRedirect("midea-duo-12000-btu-portable-ac");
  assert.equal(result.isValid, true);
  assert.ok(result.redirect);
  assert.equal(result.redirect.slug, "midea-duo-12000-btu-portable-ac");
  assert.ok(result.redirect.destinationUrl.startsWith("https://"));
});

test("Affiliate Redirect: Unknown slug is rejected safely", () => {
  const result = validateAffiliateRedirect("non-existent-fake-product");
  assert.equal(result.isValid, false);
  assert.equal(result.reason, "Slug not found in registry.");
});

test("Affiliate Redirect: Disallowed or unsafe destination host is blocked", () => {
  // Test by checking ALLOWED_MERCHANT_HOSTNAMES directly
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("malicious-site.com"), false);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("amazon.com"), true);
  assert.equal(ALLOWED_MERCHANT_HOSTNAMES.has("www.midea.com"), true);
});

test("Affiliate Redirect: /go/ endpoints are NOT in sitemap", () => {
  const sitemapFn = typeof sitemap === "function" ? sitemap : sitemap?.default;
  assert.ok(typeof sitemapFn === "function", "sitemapFn should be a function");
  const sitemapEntries = sitemapFn();
  const hasGoRoute = sitemapEntries.some((entry) => entry.url.includes("/go/"));
  assert.equal(hasGoRoute, false, "Affiliate redirect URLs must never be in sitemap.xml");

  const hasSearchRoute = sitemapEntries.some((entry) => entry.url.includes("/search"));
  assert.equal(hasSearchRoute, false, "Internal search URLs must never be in sitemap.xml");
});
