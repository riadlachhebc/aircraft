import { test } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test("HTTP E2E: Homepage returns 200 and valid HTML", async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("AIR CRAFTED"));
  assert.ok(text.includes("How to Choose the Right Portable Air Conditioner"));
  assert.ok(text.includes("Appliance Operating Cost Simulator"));
});

test("HTTP E2E: Category Page (/air-conditioners) returns 200", async () => {
  const res = await fetch(`${BASE_URL}/air-conditioners`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("Precision Cooling for Every Room"));
  assert.ok(text.includes("DOE SACC vs ASHRAE BTUs"));
});

test("HTTP E2E: Article Detail (/air-conditioners/how-to-choose-portable-air-conditioner-room-size) returns 200", async () => {
  const res = await fetch(
    `${BASE_URL}/air-conditioners/how-to-choose-portable-air-conditioner-room-size`
  );
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("How to Choose the Right Portable Air Conditioner"));
  assert.ok(text.includes("Direct Engineering Answer"));
  assert.ok(text.includes("Seasonally Adjusted Cooling Capacity"));
});

test("HTTP E2E: Security Headers are present on responses", async () => {
  const res = await fetch(`${BASE_URL}/`);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "DENY");
  assert.equal(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
});

test("HTTP E2E: Sitemap.xml returns valid XML and no disallowed URLs", async () => {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("<urlset"));
  assert.ok(text.includes("https://aircraftedhome.com/"));
  assert.ok(text.includes("https://aircraftedhome.com/air-conditioners"));
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

test("HTTP E2E: Valid Affiliate Redirect (/go/midea-duo-12000-btu-portable-ac) returns 307", async () => {
  const res = await fetch(
    `${BASE_URL}/go/midea-duo-12000-btu-portable-ac`,
    { redirect: "manual" }
  );
  assert.equal(res.status, 307);
  const location = res.headers.get("location");
  assert.ok(location?.includes("midea.com"));
  assert.equal(res.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("HTTP E2E: Invalid Affiliate Redirect returns 404 with safety warning", async () => {
  const res = await fetch(`${BASE_URL}/go/fake-malicious-slug`, {
    redirect: "manual",
  });
  assert.equal(res.status, 404);
  const text = await res.text();
  assert.ok(text.includes("Referral Link Unavailable"));
});

test("HTTP E2E: Product Specification Page (/reviews/vornado-660-air-circulator) returns 200", async () => {
  const res = await fetch(`${BASE_URL}/reviews/vornado-660-air-circulator`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes("Vornado 660 Large Whole Room Air Circulator"));
  assert.ok(text.includes("Technical Specification Matrix"));
  assert.ok(text.includes("Verified Technical Specifications"));
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
