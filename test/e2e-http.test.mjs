import { test } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test("HTTP E2E: Clean Launch Homepage returns 200 with category navigation and calculator", async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("AIR CRAFTED"));
  assert.ok(text.includes("Engineering the Perfect Indoor Climate"));
  assert.ok(text.includes("Appliance Operating Cost Simulator"));
  assert.ok(text.includes("New guides and product comparisons are coming soon"));
  assert.ok(text.includes("Choose Your Climate Focus"));
});

test("HTTP E2E: Category Page (/air-conditioners) returns 200 with clean launch status", async () => {
  const res = await fetch(`${BASE_URL}/air-conditioners`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("Precision Cooling for Every Room"));
  assert.ok(text.includes("DOE SACC"));
  assert.ok(text.includes("Upcoming Editorial Guides"));
});

test("HTTP E2E: Deleted demo article route returns 404 not-found", async () => {
  const res = await fetch(
    `${BASE_URL}/air-conditioners/how-to-choose-portable-air-conditioner-room-size`
  );
  assert.equal(res.status, 404, "Deleted demo articles must return 404");
});

test("HTTP E2E: Deleted demo product review route returns 404 not-found", async () => {
  const res = await fetch(`${BASE_URL}/reviews/vornado-660-air-circulator`);
  assert.equal(res.status, 404, "Deleted demo product reviews must return 404");
});

test("HTTP E2E: Security Headers are present on responses", async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "DENY");
  assert.equal(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
});

test("HTTP E2E: Sitemap.xml returns valid XML with 0 deleted demo URLs", async () => {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("<urlset"));
  assert.ok(text.includes("https://aircraftedhome.com/"));
  assert.ok(text.includes("https://aircraftedhome.com/air-conditioners"));
  assert.ok(!text.includes("how-to-choose-portable-air-conditioner-room-size"), "Deleted demo articles must not appear in sitemap");
  assert.ok(!text.includes("vornado-660-air-circulator"), "Deleted demo products must not appear in sitemap");
  assert.ok(!text.includes("/go/"), "Sitemap must not contain /go/ URLs");
  assert.ok(!text.includes("/search"), "Sitemap must not contain /search URLs");
});

test("HTTP E2E: Robots.txt returns valid directives", async () => {
  const res = await fetch(`${BASE_URL}/robots.txt`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(/user-agent:\s*\*/i.test(text), "Should have user-agent wildcard");
  assert.ok(text.includes("Disallow: /go/"));
  assert.ok(text.includes("Disallow: /search"));
  assert.ok(text.includes("Sitemap: https://aircraftedhome.com/sitemap.xml"));
});

test("HTTP E2E: Unknown or deleted affiliate redirect returns 404 with safety page", async () => {
  const res = await fetch(
    `${BASE_URL}/go/midea-duo-12000-btu-portable-ac`,
    { redirect: "manual" }
  );
  assert.equal(res.status, 404, "Deleted demo affiliate redirects must return 404");
  const text = await res.text();
  assert.ok(text.includes("Referral Link Unavailable"));
});

test("HTTP E2E: Invalid malicious affiliate slug returns 404 with safety warning", async () => {
  const res = await fetch(`${BASE_URL}/go/fake-malicious-slug`, {
    redirect: "manual",
  });
  assert.equal(res.status, 404);
  const text = await res.text();
  assert.ok(text.includes("Referral Link Unavailable"));
});

test("HTTP E2E: Buying Guides and Reviews index pages return 200 with clean launch states", async () => {
  const guidesRes = await fetch(`${BASE_URL}/buying-guides`);
  assert.equal(guidesRes.status, 200);
  const guidesText = await guidesRes.text();
  assert.ok(guidesText.includes("Editorial Guides Coming Soon"));

  const reviewsRes = await fetch(`${BASE_URL}/reviews`);
  assert.equal(reviewsRes.status, 200);
  const reviewsText = await reviewsRes.text();
  assert.ok(reviewsText.includes("Verified Product Reviews Coming Soon"));
});

test("HTTP E2E: Institutional pages (About, How We Test, Editorial Policy, Affiliate Disclosure) return 200", async () => {
  for (const path of [
    "/about",
    "/how-we-test",
    "/editorial-policy",
    "/affiliate-disclosure",
    "/contact",
    "/privacy-policy",
    "/terms",
  ]) {
    const res = await fetch(`${BASE_URL}${path}`);
    assert.equal(res.status, 200, `Expected 200 for ${path}`);
  }
});
