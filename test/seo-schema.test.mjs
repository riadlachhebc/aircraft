import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCanonicalUrl,
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildArticleSchema,
  buildProductSchema,
} from "../lib/seo.ts";
import { DEFAULT_AUTHOR } from "../data/authors.ts";

test("Canonical URLs: Standardized without trailing slash except root", () => {
  assert.equal(getCanonicalUrl("/"), "https://aircraftedhome.com");
  assert.equal(getCanonicalUrl("/air-conditioners"), "https://aircraftedhome.com/air-conditioners");
  assert.equal(getCanonicalUrl("/air-conditioners/"), "https://aircraftedhome.com/air-conditioners");
  assert.equal(
    getCanonicalUrl("/buying-guides"),
    "https://aircraftedhome.com/buying-guides"
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

test("Structured Data: Article schema contains author, publisher, and FAQs using test fixture", () => {
  const fixtureArticle = {
    slug: "fixture-article",
    title: "Fixture Title for Climate Engineering",
    metaTitle: "Fixture Meta Title | Air Crafted Home",
    metaDescription: "Fixture description for testing schema outputs.",
    primaryIntent: "Testing intent",
    categoryId: "air-conditioners",
    authorId: DEFAULT_AUTHOR.id,
    status: "published",
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-01",
    readTimeMinutes: 5,
    heroImage: "/images/fallback-cooling.svg",
    heroImageAlt: "Testing hero image",
    directAnswer: "Testing direct answer for schema extraction.",
    keyTakeaways: ["Point 1", "Point 2", "Point 3"],
    limitations: ["Limitation 1", "Limitation 2"],
    contentSections: [{ heading: "Section 1", level: 2, bodyMarkdown: "Content" }],
    sources: [{ title: "Source 1", publisher: "Publisher", url: "https://example.com" }],
    faqs: [{ question: "Test Question?", answer: "Test Answer for Schema" }],
    relatedArticleSlugs: [],
  };

  const schema = buildArticleSchema(fixtureArticle, DEFAULT_AUTHOR.name);
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, fixtureArticle.title);
  assert.equal(schema.author["@type"], "Person");
  assert.equal(schema.author.name, DEFAULT_AUTHOR.name);
  assert.ok(schema.hasPart);
  assert.equal(schema.hasPart["@type"], "FAQPage");
  assert.ok(schema.hasPart.mainEntity.length > 0);
});

test("Structured Data: Product schema contains valid Offer and Brand without fabricated inventory using test fixture", () => {
  const fixtureProduct = {
    id: "fixture-sku",
    slug: "fixture-inverter-ac",
    name: "Fixture Inverter AC Unit",
    manufacturer: "TestingBrand",
    modelNumber: "TEST-100",
    categoryId: "air-conditioners",
    status: "published",
    officialUrl: "https://example.com/product",
    approximateUsdPrice: 499,
    priceVerifiedDate: "2026-11-01",
    recommendedRoomSqFt: 400,
    roomSizeBasis: "Baseline",
    powerConsumptionWatts: 1000,
    voltageFrequency: "120V / 60Hz",
    noiseDbRange: "45 dBA",
    noiseConditions: "Nominal",
    dimensionsInches: { width: 15, depth: 15, height: 25 },
    weightLbs: 50,
    installationRequirements: "Standard",
    maintenanceSchedule: "Monthly",
    warrantyYears: 1,
    certifications: ["UL Listed"],
    pros: ["Quiet"],
    cons: ["Heavy"],
    bestFor: "Testing",
    editorialLimitations: "None",
    evidenceType: "independent-consensus",
  };

  const schema = buildProductSchema(fixtureProduct);
  assert.equal(schema["@type"], "Product");
  assert.equal(schema.name, fixtureProduct.name);
  assert.equal(schema.brand.name, "TestingBrand");
  assert.equal(schema.offers.priceCurrency, "USD");
  assert.equal(schema.offers.price, 499);
  // Guarantee no fabricated InStock claim in editorial schema
  assert.equal(schema.offers.availability, undefined);
  assert.equal(schema.offers.itemCondition, "https://schema.org/NewCondition");
});

test("Structured Data: Review article schema includes itemReviewed Product with valid offers for GSC", () => {
  const reviewArticle = {
    slug: "lasko-review",
    title: "Lasko Review",
    metaTitle: "Lasko Review | Air Crafted Home",
    metaDescription: "Verified review of the Lasko DUO Comfort heater.",
    primaryIntent: "Evaluation",
    categoryId: "heating",
    authorId: DEFAULT_AUTHOR.id,
    status: "published",
    publishedAt: "2026-10-18",
    updatedAt: "2026-10-18",
    readTimeMinutes: 8,
    heroImage: "/images/products/lasko-fhv830/lasko-fhv830-main.jpg",
    heroImageAlt: "Lasko DUO",
    directAnswer: "Great combination unit.",
    keyTakeaways: ["Quiet DC motor"],
    limitations: ["No oscillation in cool mode"],
    articleType: "review",
    contentSections: [],
    sources: [],
    relatedArticleSlugs: [],
    verdict: "Recommended for bedrooms.",
  };

  const product = {
    id: "lasko-fhv830",
    slug: "lasko-duo-comfort-38-dc-fhv830",
    name: "Lasko DUO Comfort 38\" DC Tower Fan & Ceramic Space Heater",
    manufacturer: "Lasko Products, LLC",
    brand: "Lasko",
    modelNumber: "FHV830",
    categoryId: "heating",
    status: "published",
    officialUrl: "https://lasko.com/product",
    approximateUsdPrice: 139.99,
    priceVerifiedDate: "2026-10-18",
    recommendedRoomSqFt: 300,
    roomSizeBasis: "Standard ceiling",
    powerConsumptionWatts: 1500,
    voltageFrequency: "120V / 60Hz",
    noiseDbRange: "38 - 52 dBA",
    noiseConditions: "Low fan to high heat",
    bestFor: "Year-round personal space comfort",
  };

  const schema = buildArticleSchema(reviewArticle, DEFAULT_AUTHOR.name, product);
  assert.equal(schema["@type"], "Review");
  assert.equal(schema.itemReviewed["@type"], "Product");
  assert.equal(schema.itemReviewed.name, product.name);
  assert.equal(schema.itemReviewed.brand.name, "Lasko");
  assert.equal(schema.itemReviewed.model, "FHV830");
  assert.ok(schema.itemReviewed.offers, "itemReviewed Product must contain offers to satisfy Google Search Console Product snippet validation");
  assert.equal(schema.itemReviewed.offers.price, 139.99);
  assert.equal(schema.itemReviewed.offers.priceCurrency, "USD");
  assert.equal(schema.itemReviewed.offers.itemCondition, "https://schema.org/NewCondition");
});
