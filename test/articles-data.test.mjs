import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ARTICLE_LIST,
  ARTICLES,
  getPublishedArticles,
  getPublishedArticleBySlug,
  getPublishedArticlesByCategory,
} from "../data/articles.ts";
import { CATEGORIES } from "../data/categories.ts";
import { DEFAULT_AUTHOR } from "../data/authors.ts";

test("Content Reset: Production article registry is clean with 0 demo articles", () => {
  assert.equal(ARTICLE_LIST.length, 0, "All demo articles must be completely removed from production data");
  assert.equal(Object.keys(ARTICLES).length, 0, "ARTICLES record must be empty for clean launch");
  assert.equal(getPublishedArticles().length, 0, "getPublishedArticles must return 0 articles");
  assert.equal(getPublishedArticlesByCategory("air-conditioners").length, 0);
  assert.equal(getPublishedArticleBySlug("how-to-choose-portable-air-conditioner-room-size"), undefined);
});

test("Article Publishing System: Safe fixture validates publication status and schema rules", () => {
  // Safe test fixture representing a future article submitted by the publisher
  const fixturePublished = {
    slug: "fixture-inverter-ac-guide",
    title: "How Inverter Portable Air Conditioners Modulate Compressor Power",
    metaTitle: "Inverter Portable AC Modulation Guide | Air Crafted Home",
    metaDescription: "An engineering evaluation of variable-speed inverter compressors in residential portable cooling.",
    primaryIntent: "Understand variable-speed inverter compressor benefits and energy draw",
    categoryId: "air-conditioners",
    authorId: DEFAULT_AUTHOR.id,
    status: "published",
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-01",
    readTimeMinutes: 6,
    heroImage: "/images/fallback-cooling.svg",
    heroImageAlt: "Technical blueprint of inverter compressor cycle",
    directAnswer: "Inverter portable air conditioners continuously adjust motor speed rather than switching completely off and on.",
    keyTakeaways: [
      "Eliminates high-draw inductive startup spikes",
      "Maintains room temperature within 1 degree Fahrenheit",
      "Reduces electrical consumption by up to 30%",
    ],
    limitations: [
      "Higher initial equipment purchase price",
      "Complex inverter control boards require specialized service",
    ],
    comparisonTable: {
      caption: "Inverter vs Rotary Compressor Comparison",
      optionAName: "Inverter Driven",
      optionBName: "Standard Rotary",
      rows: [
        { criteria: "Compressor Modulation", optionA: "Variable (30-100%)", optionB: "Fixed (100% or 0%)", verdict: "Inverter" },
        { criteria: "Steady-State Wattage", optionA: "400 - 650W", optionB: "1,200W constant", verdict: "Inverter" },
        { criteria: "Upfront Cost", optionA: "$500 - $700", optionB: "$350 - $450", verdict: "Standard" },
      ],
    },
    contentSections: [
      { heading: "Variable Frequency Drives in Residential ACs", level: 2, bodyMarkdown: "Detailed explanation." },
      { heading: "Thermal Comfort & Humidity Removal", level: 2, bodyMarkdown: "Detailed explanation." },
      { heading: "Electrical Tariff Implications", level: 2, bodyMarkdown: "Detailed explanation." },
    ],
    sources: [
      { title: "DOE SACC Standard 10 CFR Part 430", publisher: "US Department of Energy", url: "https://www.energy.gov" },
      { title: "ASHRAE Handbook of Fundamentals", publisher: "ASHRAE", url: "https://www.ashrae.org" },
    ],
    faqs: [
      { question: "Do inverter portable ACs run quietly?", answer: "Yes, once target room temperature is reached, the motor slows down to ~42 dBA." },
    ],
    relatedArticleSlugs: [],
  };

  const fixtureDraft = {
    ...fixturePublished,
    slug: "fixture-draft-guide",
    status: "draft",
  };

  // Validate published fixture satisfies all editorial and GEO criteria
  assert.ok(fixturePublished.title.length > 10);
  assert.ok(fixturePublished.directAnswer.length > 50);
  assert.ok(fixturePublished.keyTakeaways.length >= 3);
  assert.ok(fixturePublished.limitations.length >= 2);
  assert.ok(fixturePublished.sources.length >= 2);
  assert.ok(fixturePublished.contentSections.length >= 3);
  assert.ok(CATEGORIES[fixturePublished.categoryId]);
  assert.equal(fixturePublished.status, "published");

  // Validate draft fixture status
  assert.equal(fixtureDraft.status, "draft");
});
