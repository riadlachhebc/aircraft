import { test } from "node:test";
import assert from "node:assert/strict";
import { ARTICLE_LIST, ARTICLES } from "../data/articles.ts";
import { CATEGORIES } from "../data/categories.ts";
import { AUTHORS } from "../data/authors.ts";

test("Editorial Quality: Contains at least 8 starter substantive articles", () => {
  assert.ok(ARTICLE_LIST.length >= 8, `Expected at least 8 articles, found ${ARTICLE_LIST.length}`);
});

test("Editorial Quality: All 8 required starter article titles exist", () => {
  const requiredSlugs = [
    "how-to-choose-portable-air-conditioner-room-size",
    "single-hose-vs-dual-hose-portable-air-conditioners",
    "how-much-does-it-cost-to-run-portable-air-conditioner",
    "space-heater-vs-central-heating",
    "tower-fan-vs-air-circulator",
    "how-to-choose-air-purifier-room-size-cadr",
    "how-to-calculate-electricity-cost-appliance",
    "how-to-improve-bedroom-airflow-without-replacing-hvac",
  ];

  for (const slug of requiredSlugs) {
    const article = ARTICLES[slug];
    assert.ok(article, `Missing required article slug: ${slug}`);
    assert.ok(article.title.length > 10, `Title too short for ${slug}`);
    assert.ok(article.directAnswer.length > 50, `Direct answer too short for ${slug}`);
    assert.ok(article.keyTakeaways.length >= 3, `Expected at least 3 takeaways for ${slug}`);
    assert.ok(article.limitations.length >= 2, `Expected at least 2 limitations for ${slug}`);
    assert.ok(article.sources.length >= 2, `Expected at least 2 sources for ${slug}`);
    assert.ok(article.contentSections.length >= 3, `Expected at least 3 content sections for ${slug}`);

    // Verify valid category link
    assert.ok(CATEGORIES[article.categoryId], `Invalid category ${article.categoryId} in ${slug}`);

    // Verify valid author link
    assert.ok(AUTHORS[article.authorId], `Invalid author ${article.authorId} in ${slug}`);
  }
});
