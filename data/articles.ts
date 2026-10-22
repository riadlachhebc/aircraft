import { Article, CategoryId } from "@/lib/types";

/**
 * Editorial Article Registry for Air Crafted Home.
 *
 * All demo articles have been removed for clean production affiliate launch.
 * Add new verified articles to the ARTICLES record below.
 *
 * Publication Workflow:
 * - Set `status: "draft"` while drafting (inaccessible publicly, excluded from search & sitemap).
 * - Set `status: "published"` when reviewed and ready for live public distribution.
 * - Set `status: "archived"` when deprecated or superseded by updated research.
 *
 * Example Schema:
 * ```typescript
 * "portable-ac-sizing-guide": {
 *   slug: "portable-ac-sizing-guide",
 *   title: "How to Size a Portable Air Conditioner for US Homes",
 *   metaTitle: "Portable AC Sizing Guide: SACC vs ASHRAE | Air Crafted Home",
 *   metaDescription: "Evidence-based guide to sizing residential portable air conditioners using DOE SACC ratings.",
 *   primaryIntent: "Learn how to calculate portable AC cooling capacity for room square footage",
 *   categoryId: "air-conditioners",
 *   authorId: "editorial-team",
 *   status: "published",
 *   publishedAt: "2026-11-01",
 *   updatedAt: "2026-11-01",
 *   readTimeMinutes: 7,
 *   heroImage: "/images/fallback-cooling.svg",
 *   heroImageAlt: "Technical schematic of portable air conditioner thermodynamics",
 *   directAnswer: "Size portable air conditioners using DOE SACC ratings: 20 BTU/h per square foot.",
 *   keyTakeaways: ["Always use DOE SACC, not legacy ASHRAE", "Dual-hose units prevent negative room pressure"],
 *   limitations: ["High ceiling rooms require 10-20% capacity buffer"],
 *   contentSections: [{ heading: "SACC vs ASHRAE 128", level: 2, bodyMarkdown: "..." }],
 *   sources: [{ title: "DOE Test Procedure 10 CFR Part 430", publisher: "US Department of Energy", url: "https://www.energy.gov" }],
 *   relatedArticleSlugs: [],
 * }
 * ```
 */
export const ARTICLES: Record<string, Article> = {};

export const ARTICLE_LIST: Article[] = Object.values(ARTICLES);

/**
 * Returns only publicly viewable articles with status === "published".
 */
export function getPublishedArticles(): Article[] {
  return ARTICLE_LIST.filter((article) => article.status === "published");
}

/**
 * Finds a published article by slug, or returns undefined if missing, draft, or archived.
 */
export function getPublishedArticleBySlug(slug: string): Article | undefined {
  const article = ARTICLES[slug];
  if (!article || article.status !== "published") {
    return undefined;
  }
  return article;
}

/**
 * Returns published articles within a specific climate category.
 */
export function getPublishedArticlesByCategory(categoryId: CategoryId): Article[] {
  return getPublishedArticles().filter((article) => article.categoryId === categoryId);
}
