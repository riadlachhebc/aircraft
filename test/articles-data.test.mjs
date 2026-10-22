import { test } from "node:test";
import assert from "node:assert/strict";
import { ARTICLE_LIST, ARTICLES } from "../data/articles.ts";
import { CATEGORIES } from "../data/categories.ts";
import { AUTHORS } from "../data/authors.ts";

test("Editorial Quality: Contains at least 8 starter substantive articles", () => {
  assert.ok(ARTICLE_LIST.length >= 8, `Expected at least 8 articles, found ${ARTICLE_LIST.length}`);
});

test("Editorial Quality: All 8 required starter article titles exist and satisfy GEO standards", () => {
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

    // Verify sources have valid URLs and publishers
    for (const source of article.sources) {
      assert.ok(source.title, `Missing source title in ${slug}`);
      assert.ok(source.publisher, `Missing source publisher in ${slug}`);
      assert.ok(
        source.url.startsWith("http://") || source.url.startsWith("https://"),
        `Source URL must be valid HTTP(S): ${source.url} in ${slug}`
      );
    }

    // Verify comparison table if present
    if (article.comparisonTable) {
      assert.ok(article.comparisonTable.caption, `Missing table caption in ${slug}`);
      assert.ok(article.comparisonTable.optionAName, `Missing table option A in ${slug}`);
      assert.ok(article.comparisonTable.optionBName, `Missing table option B in ${slug}`);
      assert.ok(article.comparisonTable.rows.length >= 3, `Expected >= 3 rows in comparison table in ${slug}`);
      for (const row of article.comparisonTable.rows) {
        assert.ok(row.criteria, `Missing row criteria in ${slug}`);
        assert.ok(row.optionA, `Missing row optionA in ${slug}`);
        assert.ok(row.optionB, `Missing row optionB in ${slug}`);
        assert.ok(row.verdict, `Missing row verdict in ${slug}`);
      }
    }

    // Verify FAQs if present
    if (article.faqs && article.faqs.length > 0) {
      for (const faq of article.faqs) {
        assert.ok(faq.question.length > 10, `FAQ question too short in ${slug}`);
        assert.ok(faq.answer.length > 20, `FAQ answer too short in ${slug}`);
      }
    }
  }
});
