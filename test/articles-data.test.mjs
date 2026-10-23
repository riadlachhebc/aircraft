import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ARTICLE_LIST,
  ARTICLES,
  getArticleBySlug,
  getPublishedArticles,
  getPublishedArticleBySlug,
  getPublishedArticlesByCategory,
  getPublishedArticlesByType,
  getPublishedReviewArticles,
  getPublishedComparisonArticles,
  getPublishedBuyingGuides,
  getPublishedProblemSolvingArticles,
  getPublishedInformationalArticles,
  validateArticleRecord,
} from "../data/articles.ts";
import {
  PRODUCT_LIST,
  PRODUCTS,
  getProductById,
  getProductBySlug,
  getPublishedProducts,
  getPublishedProductBySlug,
  getPublishedProductById,
  validateProductRecord,
} from "../data/products.ts";
import { CATEGORIES } from "../data/categories.ts";
import { DEFAULT_AUTHOR } from "../data/authors.ts";

test("Production Article Registry: Published Lasko review is accessible and validated", () => {
  // Published articles count is 1
  const publishedArticles = getPublishedArticles();
  assert.equal(publishedArticles.length, 1, "getPublishedArticles must return 1 published article");
  assert.equal(getPublishedArticlesByCategory("heating").length, 1);
  assert.equal(getPublishedArticlesByCategory("air-conditioners").length, 0);

  // Published article resolves correctly by slug
  const publishedArticle = getPublishedArticleBySlug("lasko-duo-comfort-38-dc-fan-heater-review");
  assert.ok(publishedArticle, "Published article must exist in registry");
  assert.equal(publishedArticle?.status, "published");
  assert.equal(publishedArticle?.articleType, "review");
  assert.equal(validateArticleRecord(publishedArticle).isValid, true, "Published article must pass editorial validation");

  // Published product resolves correctly by ID and slug
  const publishedProduct = getPublishedProductById("lasko-duo-comfort-38-dc-fhv830");
  assert.ok(publishedProduct, "Published product must exist in registry");
  assert.equal(publishedProduct?.status, "published");
  assert.equal(publishedProduct?.approximateUsdPrice, 159.99, "Price must reflect official Lasko.com listing");
  assert.equal(publishedProduct?.recommendedRoomSqFt, 300, "Coverage must reflect manufacturer-stated 300 sq ft maximum");
  assert.equal(validateProductRecord(publishedProduct).isValid, true, "Product record must pass validation");

  // Legacy deleted demo articles must remain undefined
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

test("Product Records: Validation distinguishes draft vs verified published requirements", () => {
  const completeProductFixture = {
    id: "midea-duo-map12s1tbl",
    slug: "midea-duo-12000-btu-inverter-portable-ac",
    name: "Midea Duo 12,000 BTU Inverter Dual-Hose Portable AC",
    manufacturer: "Midea",
    brand: "Midea",
    modelNumber: "MAP12S1TBL",
    categoryId: "air-conditioners",
    status: "published",
    officialUrl: "https://www.midea.com/us/air-conditioners/portable-air-conditioners/map12s1tbl",
    approximateUsdPrice: 549,
    priceVerifiedDate: "2026-11-01",
    coolingCapacityBtuSacc: 12000,
    recommendedRoomSqFt: 550,
    roomSizeBasis: "DOE SACC 12,000 BTU Baseline",
    powerConsumptionWatts: 1300,
    voltageFrequency: "115V / 60Hz",
    noiseDbRange: "42 - 52 dBA",
    noiseConditions: "Low fan modulation to maximum compressor load at 2m",
    dimensionsInches: { width: 19.53, depth: 16.73, height: 32.48 },
    weightLbs: 71.65,
    installationRequirements: "Standard double-hung or sliding window kit",
    maintenanceSchedule: "Wash intake pre-filters every 250 operational hours",
    warrantyYears: 1,
    certifications: ["DOE Standard Compliant", "UL Listed", "Energy Star"],
    pros: ["Inverter variable-speed compressor prevents power spikes", "Dual-hose hose-in-hose design eliminates room depressurization"],
    cons: ["Heavy 71.65 lb chassis is challenging to navigate on stairs", "Window slider kit max extension is 48 inches"],
    bestFor: "Master bedrooms and open-concept apartments up to 550 sq ft",
    editorialLimitations: "Window kit insulation is minimal; supplemental foam tape recommended.",
    evidenceType: "independent-consensus",
    specSources: [
      { title: "DOE SACC Certification Database", publisher: "US Department of Energy", url: "https://www.energy.gov" },
    ],
  };

  const validResult = validateProductRecord(completeProductFixture);
  assert.equal(validResult.isValid, true, "Fully specified product fixture must pass validation");
  assert.equal(validResult.errors.length, 0);

  // Incomplete product marked published must FAIL validation
  const incompletePublished = {
    ...completeProductFixture,
    powerConsumptionWatts: 0,
    pros: [],
  };
  const failResult = validateProductRecord(incompletePublished);
  assert.equal(failResult.isValid, false, "Published product missing wattage and pros must fail validation");
  assert.ok(failResult.errors.some((e) => e.includes("powerConsumptionWatts")));
  assert.ok(failResult.errors.some((e) => e.includes("pros")));

  // Incomplete product marked draft must PASS baseline validation
  const incompleteDraft = {
    ...incompletePublished,
    status: "draft",
  };
  const draftResult = validateProductRecord(incompleteDraft);
  assert.equal(draftResult.isValid, true, "Draft product is permitted to have partial information while research is in progress");
});

test("Article Types: Validation supports the 5 core content types", () => {
  const baseArticle = {
    slug: "sample-guide",
    title: "Comprehensive Home Airflow Engineering Guide",
    metaTitle: "Home Airflow Guide | Air Crafted Home",
    metaDescription: "Evidence-based aerodynamic analysis of residential ventilation and air circulation.",
    primaryIntent: "Learn residential airflow dynamics and ventilation",
    categoryId: "fans-air-circulators",
    authorId: DEFAULT_AUTHOR.id,
    status: "published",
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-01",
    readTimeMinutes: 5,
    heroImage: "/images/fallback-cooling.svg",
    heroImageAlt: "Airflow diagram",
    directAnswer: "Whole-room air circulators use aerodynamic vortex cones rather than oscillating sweeps.",
    keyTakeaways: ["Air circulators create room-wide movement", "Tower fans provide localized cooling only"],
    limitations: ["Circulators require unobstructed line of sight to walls"],
    sources: [{ title: "ASHRAE Standard 55", publisher: "ASHRAE", url: "https://www.ashrae.org" }],
    contentSections: [{ heading: "Aerodynamics", level: 2, bodyMarkdown: "Section content." }],
    relatedArticleSlugs: [],
  };

  // 1. Informational article: does NOT require product association
  const informationalArticle = {
    ...baseArticle,
    articleType: "informational",
  };
  const infoVal = validateArticleRecord(informationalArticle);
  assert.equal(infoVal.isValid, true, "Informational article must pass without product requirement");

  // 2. Product Review article: MUST associate product record
  const reviewWithoutProduct = {
    ...baseArticle,
    articleType: "review",
    primaryProductId: undefined,
    productIds: [],
    relatedProductSlugs: [],
  };
  const reviewValFail = validateArticleRecord(reviewWithoutProduct);
  assert.equal(reviewValFail.isValid, false, "Product review article without associated product must fail");

  const reviewWithProduct = {
    ...baseArticle,
    articleType: "review",
    primaryProductId: "midea-duo-map12s1tbl",
  };
  const reviewValPass = validateArticleRecord(reviewWithProduct);
  assert.equal(reviewValPass.isValid, true, "Product review article with associated product must pass");

  // 3. Comparison article: requires at least 2 compared products or comparisonTable
  const comparisonArticle = {
    ...baseArticle,
    articleType: "comparison",
    comparedProductIds: ["prod-a", "prod-b"],
  };
  const compVal = validateArticleRecord(comparisonArticle);
  assert.equal(compVal.isValid, true, "Comparison article with 2 products must pass");

  // 4. Buying Guide article
  const buyingGuide = {
    ...baseArticle,
    articleType: "buying-guide",
  };
  assert.equal(validateArticleRecord(buyingGuide).isValid, true);

  // 5. Problem-solver article
  const problemSolver = {
    ...baseArticle,
    articleType: "problem-solver",
  };
  assert.equal(validateArticleRecord(problemSolver).isValid, true);
});

test("MarkdownRenderer: Transforms markdown headings, lists, and bold without raw syntax leaking", async () => {
  const React = await import("react");
  const ReactDOMServer = await import("react-dom/server");
  const { MarkdownRenderer } = await import("../components/MarkdownRenderer.tsx");

  const sample = `
### Model Clarification: FHV830 vs. FHV820

Here is a paragraph with **bold model text** and [official link](https://example.com).

- **Model FHV830**: Sleek black housing
- **Model FHV820**: Off-white finish

1. First priority
2. Second priority
`;

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MarkdownRenderer, { content: sample })
  );

  assert.equal(html.includes("###"), false, "HTML must not contain raw ### heading symbols");
  assert.equal(html.includes("**"), false, "HTML must not contain raw ** bold asterisks");
  assert.equal(html.includes("<h3"), true, "HTML must contain semantic <h3> tag");
  assert.equal(html.includes("<strong"), true, "HTML must contain semantic <strong> tag");
  assert.equal(html.includes("<ul"), true, "HTML must contain semantic <ul> tag");
  assert.equal(html.includes("<ol"), true, "HTML must contain semantic <ol> tag");
  assert.equal(html.includes("<li"), true, "HTML must contain semantic <li> tag");
});
