/**
 * Content & Publishing Validation CLI Tool for Air Crafted Home.
 *
 * Runs rigorous data integrity, SEO, GEO, and affiliate checks across:
 * - Product records (specs, sources, units, prices, affiliate destinations)
 * - Article records (5 supported types, keywords, search intent, internal links, direct answers)
 * - Affiliate redirect registry (merchant allowlist, https protocols, status)
 * - Public routes, sitemap, and publication status rules
 *
 * Usage:
 *   npm run validate:content
 */

import { ARTICLES, ARTICLE_LIST, validateArticleRecord } from "../data/articles";
import { PRODUCTS, PRODUCT_LIST, validateProductRecord } from "../data/products";
import {
  AFFILIATE_REGISTRY,
  validateAffiliateRedirect,
  ALLOWED_MERCHANT_HOSTNAMES,
} from "../data/affiliateRedirects";
import { CATEGORIES } from "../data/categories";
import sitemap from "../app/sitemap";

interface CheckResult {
  category: string;
  name: string;
  status: "PASS" | "FAIL" | "WARN" | "INFO";
  details: string;
}

const results: CheckResult[] = [];

function check(
  category: string,
  name: string,
  passed: boolean,
  passMsg: string,
  failMsg: string
) {
  results.push({
    category,
    name,
    status: passed ? "PASS" : "FAIL",
    details: passed ? passMsg : failMsg,
  });
}

function info(category: string, name: string, details: string) {
  results.push({
    category,
    name,
    status: "INFO",
    details,
  });
}

function warn(category: string, name: string, details: string) {
  results.push({
    category,
    name,
    status: "WARN",
    details,
  });
}

console.log("===============================================================================");
console.log("  AIR CRAFTED HOME — PUBLISHING SYSTEM CONTENT & SCHEMA AUDIT");
console.log("===============================================================================\n");

// 1. Audit Products
const totalProducts = PRODUCT_LIST.length;
const publishedProducts = PRODUCT_LIST.filter((p) => p.status === "published");
const draftProducts = PRODUCT_LIST.filter((p) => p.status === "draft");

info(
  "Products",
  "Registry Counts",
  `Total: ${totalProducts} | Published: ${publishedProducts.length} | Drafts: ${draftProducts.length}`
);

for (const product of PRODUCT_LIST) {
  const validation = validateProductRecord(product);
  check(
    "Products",
    `[${product.status.toUpperCase()}] ${product.name} (${product.id})`,
    validation.isValid,
    "All specification and integrity criteria satisfied",
    `Validation errors: ${validation.errors.join("; ")}`
  );

  // Check product image permissions if image is specified
  if (product.imageUrl && !product.imageUsagePermission) {
    warn(
      "Products",
      `Image Permission for ${product.name}`,
      "Product has imageUrl but no explicit imageUsagePermission documented."
    );
  }

  // Check that affiliateSlug matches an active registry entry
  if (product.affiliateSlug) {
    const aff = AFFILIATE_REGISTRY[product.affiliateSlug];
    check(
      "Affiliate",
      `Product Affiliate Mapping: ${product.name} -> /go/${product.affiliateSlug}`,
      Boolean(aff && aff.isActive),
      `Valid active affiliate destination: ${aff?.destinationUrl}`,
      `Affiliate slug "${product.affiliateSlug}" is missing or deactivated in registry`
    );
  }
}

// 2. Audit Articles
const totalArticles = ARTICLE_LIST.length;
const publishedArticles = ARTICLE_LIST.filter((a) => a.status === "published");
const draftArticles = ARTICLE_LIST.filter((a) => a.status === "draft");

info(
  "Articles",
  "Registry Counts",
  `Total: ${totalArticles} | Published: ${publishedArticles.length} | Drafts: ${draftArticles.length}`
);

for (const article of ARTICLE_LIST) {
  const validation = validateArticleRecord(article);
  check(
    "Articles",
    `[${article.status.toUpperCase()}] ${article.title} (/${article.categoryId}/${article.slug})`,
    validation.isValid,
    `Valid article record [Type: ${article.articleType || "default"}]`,
    `Validation errors: ${validation.errors.join("; ")}`
  );

  // Check referenced products exist
  const refProductKeys = [
    ...(article.productIds || []),
    ...(article.relatedProductSlugs || []),
    ...(article.primaryProductId ? [article.primaryProductId] : []),
  ];

  for (const pKey of refProductKeys) {
    const exists = PRODUCTS[pKey] || PRODUCT_LIST.find((p) => p.id === pKey);
    check(
      "Relationships",
      `Article "${article.slug}" -> Product "${pKey}"`,
      Boolean(exists),
      `Resolved to ${exists?.name} (status: ${exists?.status})`,
      `Referenced product key "${pKey}" does not exist in PRODUCTS registry`
    );
  }

  // Check related articles exist
  for (const relSlug of article.relatedArticleSlugs || []) {
    const exists = ARTICLES[relSlug];
    check(
      "Internal Links",
      `Article "${article.slug}" -> Related Guide "${relSlug}"`,
      Boolean(exists),
      `Resolved internal guide: ${exists?.title}`,
      `Broken internal link: related article "${relSlug}" does not exist`
    );
  }

  // Check primary keyword and search intent
  if (article.status === "published" && (!article.primaryKeyword || !article.searchIntent)) {
    warn(
      "SEO",
      `Search Intent Metadata: ${article.slug}`,
      "Article is published but missing explicit primaryKeyword or searchIntent metadata."
    );
  }

  // Check for raw LaTeX syntax in article body sections
  const hasRawLatex = article.contentSections?.some(
    (sec) =>
      sec.bodyMarkdown.includes("$$") ||
      sec.bodyMarkdown.includes("\\frac") ||
      sec.bodyMarkdown.includes("\\text{") ||
      sec.bodyMarkdown.includes("\\times")
  );
  check(
    "Content Integrity",
    `No Raw LaTeX Syntax: ${article.slug}`,
    !hasRawLatex,
    "Zero raw LaTeX math syntax ($$, \\frac, \\text) in body content",
    "CRITICAL: Raw LaTeX math syntax detected in article content sections! Use clean Unicode/Markdown instead."
  );
}

// 3. Audit Affiliate Registry
const totalRedirects = Object.keys(AFFILIATE_REGISTRY).length;
info("Affiliate", "Redirect Destinations", `Total registered: ${totalRedirects}`);

for (const [slug, redirect] of Object.entries(AFFILIATE_REGISTRY)) {
  const result = validateAffiliateRedirect(slug);
  check(
    "Affiliate",
    `/go/${slug} -> ${redirect.merchant}`,
    result.isValid,
    `Approved destination: ${redirect.destinationUrl}`,
    `Security rejection: ${result.reason}`
  );
}

// 4. Audit Sitemap & Robots
const sitemapFn = typeof sitemap === "function" ? sitemap : (sitemap as any)?.default;
const sitemapEntries = sitemapFn();

info("Sitemap", "Sitemap Entries", `Total canonical URLs in sitemap: ${sitemapEntries.length}`);

// Ensure all published articles are in sitemap
for (const art of publishedArticles) {
  const url = `https://aircraftedhome.com/${art.categoryId}/${art.slug}`;
  const inSitemap = sitemapEntries.some((e: any) => e.url === url);
  check(
    "Sitemap",
    `Published Article in Sitemap: ${art.slug}`,
    inSitemap,
    `Indexed canonical: ${url}`,
    `MISSING from sitemap.xml: ${url}`
  );
}

// Ensure all published products are in sitemap
for (const prod of publishedProducts) {
  const url = `https://aircraftedhome.com/reviews/${prod.slug}`;
  const inSitemap = sitemapEntries.some((e: any) => e.url === url);
  check(
    "Sitemap",
    `Published Product in Sitemap: ${prod.slug}`,
    inSitemap,
    `Indexed canonical: ${url}`,
    `MISSING from sitemap.xml: ${url}`
  );
}

// Ensure draft articles are NOT in sitemap
for (const art of draftArticles) {
  const url = `https://aircraftedhome.com/${art.categoryId}/${art.slug}`;
  const inSitemap = sitemapEntries.some((e: any) => e.url === url);
  check(
    "Sitemap",
    `Draft Article Excluded from Sitemap: ${art.slug}`,
    !inSitemap,
    `Draft safely excluded: ${url}`,
    `SECURITY LEAK: Draft article found in sitemap: ${url}`
  );
}

// Ensure no /go/ or /search URLs in sitemap
const hasGoRoute = sitemapEntries.some((e: any) => e.url.includes("/go/"));
const hasSearchRoute = sitemapEntries.some((e: any) => e.url.includes("/search"));

check(
  "Sitemap",
  "Affiliate Redirects Excluded from Sitemap",
  !hasGoRoute,
  "All /go/* endpoints are excluded from sitemap.xml",
  "Affiliate redirect URLs found in sitemap.xml"
);

check(
  "Sitemap",
  "Search Query URLs Excluded from Sitemap",
  !hasSearchRoute,
  "Internal /search endpoints are excluded from sitemap.xml",
  "Search query URLs found in sitemap.xml"
);

// Summary Table
console.log("-------------------------------------------------------------------------------");
console.log(
  "STATUS".padEnd(8) +
  "CATEGORY".padEnd(16) +
  "NAME / CHECK".padEnd(36) +
  "DETAILS"
);
console.log("-------------------------------------------------------------------------------");

let hasErrors = false;
for (const res of results) {
  const icon =
    res.status === "PASS"
      ? "✔ PASS"
      : res.status === "FAIL"
      ? "✖ FAIL"
      : res.status === "WARN"
      ? "▲ WARN"
      : "ℹ INFO";

  const colorStart =
    res.status === "PASS"
      ? "\x1b[32m"
      : res.status === "FAIL"
      ? "\x1b[31m"
      : res.status === "WARN"
      ? "\x1b[33m"
      : "\x1b[36m";
  const colorEnd = "\x1b[0m";

  console.log(
    `${colorStart}${icon.padEnd(8)}${colorEnd}` +
    `${res.category.padEnd(16)}` +
    `${res.name.slice(0, 34).padEnd(36)}` +
    `${res.details}`
  );

  if (res.status === "FAIL") {
    hasErrors = true;
  }
}

console.log("\n===============================================================================");
if (hasErrors) {
  console.log("✖ AUDIT FAILED: Unresolved content or publication errors detected.");
  console.log("===============================================================================");
  process.exit(1);
} else {
  console.log("✔ ALL AUDITS PASSED: Publishing system and data schemas are 100% sound.");
  console.log("===============================================================================");
  process.exit(0);
}
