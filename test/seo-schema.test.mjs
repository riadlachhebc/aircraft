import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCanonicalUrl,
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildArticleSchema,
  buildProductSchema,
} from "../lib/seo.ts";
import { ARTICLES } from "../data/articles.ts";
import { PRODUCTS } from "../data/products.ts";

test("Canonical URLs: Standardized without trailing slash except root", () => {
  assert.equal(getCanonicalUrl("/"), "https://aircraftedhome.com");
  assert.equal(getCanonicalUrl("/air-conditioners"), "https://aircraftedhome.com/air-conditioners");
  assert.equal(getCanonicalUrl("/air-conditioners/"), "https://aircraftedhome.com/air-conditioners");
  assert.equal(
    getCanonicalUrl("/air-conditioners/how-to-choose-portable-air-conditioner-room-size"),
    "https://aircraftedhome.com/air-conditioners/how-to-choose-portable-air-conditioner-room-size"
  );
});

test("Structured Data: Organization schema conforms to Schema.org requirements", () => {
  const org = buildOrganizationSchema();
  assert.equal(org["@type"], "Organization");
  assert.equal(org.name, "Air Crafted Home");
  assert.equal(org.url, "https://aircraftedhome.com");
  assert.ok(Array.isArray(org.knowsAbout));
});

test("Structured Data: WebSite schema has SearchAction", () => {
  const ws = buildWebSiteSchema();
  assert.equal(ws["@type"], "WebSite");
  assert.ok(ws.potentialAction);
});

test("Structured Data: Article schema contains author, publisher, and FAQs", () => {
  const sampleArticle = ARTICLES["how-to-choose-portable-air-conditioner-room-size"];
  assert.ok(sampleArticle);
  const schema = buildArticleSchema(sampleArticle, "Marcus Vance");
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, sampleArticle.title);
  assert.equal(schema.author["@type"], "Person");
  assert.equal(schema.author.name, "Marcus Vance");
  assert.ok(schema.hasPart);
  assert.equal(schema.hasPart["@type"], "FAQPage");
  assert.ok(schema.hasPart.mainEntity.length > 0);
});

test("Structured Data: Product schema contains valid Offer and Brand", () => {
  const sampleProduct = PRODUCTS["midea-duo-12000-btu-portable-ac"];
  assert.ok(sampleProduct);
  const schema = buildProductSchema(sampleProduct);
  assert.equal(schema["@type"], "Product");
  assert.equal(schema.name, sampleProduct.name);
  assert.equal(schema.brand.name, "Midea");
  assert.equal(schema.offers.priceCurrency, "USD");
  assert.equal(schema.offers.price, 549);
});
