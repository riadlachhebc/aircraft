import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles, getPublishedArticleBySlug } from "@/data/articles";
import { CATEGORIES } from "@/data/categories";
import { getAuthorById } from "@/data/authors";
import { getPublishedProductById, getPublishedProductBySlug } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { ProductCard } from "@/components/ProductCard";
import { ProductComparisonTable } from "@/components/ProductComparisonTable";
import { ProductReviewSummary } from "@/components/ProductReviewSummary";
import { ArticleCard } from "@/components/ArticleCard";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SafeImage } from "@/components/SafeImage";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import {
  getCanonicalUrl,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Tag,
} from "lucide-react";

export async function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    category: article.categoryId,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) return {};

  const canonical = getCanonicalUrl(`/${article.categoryId}/${article.slug}`);

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.heroImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug, category: catSlug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article || article.categoryId !== catSlug) {
    notFound();
  }

  const category = CATEGORIES[article.categoryId];
  const author = getAuthorById(article.authorId);
  const reviewer = article.reviewerId ? getAuthorById(article.reviewerId) : undefined;

  const breadcrumbs = [
    { name: category?.name || article.categoryId, href: `/${article.categoryId}` },
    { name: article.title, href: `/${article.categoryId}/${article.slug}` },
  ];

  // Resolve primary product for review articles (via primaryProductId, productIds, or relatedProductSlugs)
  const primaryKey =
    article.primaryProductId ||
    article.productIds?.[0] ||
    article.relatedProductSlugs?.[0];

  const primaryProduct = primaryKey
    ? getPublishedProductById(primaryKey) || getPublishedProductBySlug(primaryKey)
    : undefined;

  // Resolve compared products for comparison articles
  const comparedKeys =
    article.comparedProductIds ||
    (article.articleType === "comparison" ? article.productIds : undefined) ||
    [];

  const comparedProducts = comparedKeys
    .map((k) => getPublishedProductById(k) || getPublishedProductBySlug(k))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const articleSchema = buildArticleSchema(article, author.name, primaryProduct);

  const relatedArticles = article.relatedArticleSlugs
    .map((s) => getPublishedArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const allProductKeys = Array.from(
    new Set([
      ...(article.productIds || []),
      ...(article.relatedProductSlugs || []),
      ...(article.primaryProductId ? [article.primaryProductId] : []),
    ])
  );

  const relatedProducts = allProductKeys
    .map((k) => getPublishedProductById(k) || getPublishedProductBySlug(k))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <header className="space-y-3 border-b-2 border-black pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/${article.categoryId}`}
            className="bg-forest-800 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5"
          >
            {category?.name}
          </Link>
          {article.articleType && (
            <span className="border border-stone-300 bg-white text-stone-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
              {article.articleType === "review"
                ? "Product Review"
                : article.articleType === "comparison"
                ? "Comparison"
                : article.articleType === "buying-guide"
                ? "Buying Guide"
                : article.articleType === "problem-solver"
                ? "Troubleshooting"
                : "Informational"}
            </span>
          )}
          <span className="text-stone-300">&bull;</span>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {article.readTimeMinutes} MIN READ
          </span>
          <span className="text-stone-300">&bull;</span>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            UPDATED {article.updatedAt}
          </span>
        </div>

        <h1 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-black leading-[1.12]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
          {article.metaDescription}
        </p>

        {/* Author Byline & Peer Reviewer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 text-xs">
          <div className="flex items-center gap-3">
            <AuthorAvatar
              src={author.avatarUrl}
              name={author.name}
              size="md"
            />
            <div>
              <div className="font-bold text-black uppercase tracking-wider text-[11px]">
                By {author.name}
              </div>
              <div className="text-stone-500 text-[11px]">{author.role}</div>
            </div>
          </div>

          {reviewer && (
            <div className="flex items-center gap-1.5 text-stone-700 bg-stone-100 px-3 py-1.5 border border-stone-200 text-[11px] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-forest-700" />
              <span>
                Peer-reviewed by <strong>{reviewer.name}</strong>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Image - 1:1 Aspect Ratio Canvas (Uncropped) */}
      <div className="relative aspect-square max-w-xl mx-auto w-full overflow-hidden border border-black bg-white shadow-sm">
        <SafeImage
          src={article.heroImage}
          alt={article.heroImageAlt}
          categoryId={article.categoryId}
          priority={true}
          aspectRatio="square"
          objectFit="contain"
        />
        <div className="absolute bottom-2 right-2 z-10 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-white">
          {article.heroImageAlt}
        </div>
      </div>

      {/* Editorial Transparency & Affiliate Disclosure */}
      <AffiliateNotice />

      {/* Primary Engineering Verdict / Product Review Hero */}
      {article.articleType === "review" && primaryProduct ? (
        <ProductReviewSummary product={primaryProduct} article={article} />
      ) : (
        /* GEO: Direct Answer Callout for Informational / Comparison / Buying Guides */
        <section
          role="region"
          aria-label="Direct Answer Summary"
          className="border-l-4 border-black bg-stone-50 p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-forest-800 mb-1.5">
            <BookOpen className="h-4 w-4 text-forest-700" aria-hidden="true" />
            <span>The Bottom Line / Direct Engineering Answer</span>
          </div>
          <p className="text-base sm:text-lg font-sans font-bold text-black leading-relaxed">
            {article.directAnswer}
          </p>
        </section>
      )}

      {/* Key Takeaways */}
      <section className="border border-stone-200 bg-white p-5">
        <h2 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
          <CheckCircle2 className="h-4 w-4 text-forest-700" aria-hidden="true" />
          <span>Core Takeaways</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-stone-800">
          {article.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-forest-700 font-bold mt-0.5">&bull;</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Scientific & Testing Methodology Distinction */}
      {article.testingMethodologyDistinction && (
        <section className="border border-stone-200 bg-stone-50 p-4 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-stone-900 text-[10.5px]">
            <ShieldCheck className="h-4 w-4 text-forest-700" />
            <span>Evidence Basis &amp; Evaluation Methodology</span>
          </div>
          <p className="text-stone-700 leading-relaxed text-[11.5px]">
            {article.testingMethodologyDistinction}
          </p>
        </section>
      )}

      {/* Dynamic Equipment Comparison Table if 2+ Products Linked */}
      {comparedProducts.length >= 2 && (
        <section className="space-y-2">
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            Comparative Equipment Specification Matrix
          </h2>
          <ProductComparisonTable
            id={`${article.slug}-comparison`}
            caption={`Standardized Specification Comparison: ${article.title}`}
            products={comparedProducts}
          />
        </section>
      )}

      {/* Custom Comparison Table if Defined in Article */}
      {article.comparisonTable && (
        <section className="space-y-2">
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            Comparative Performance Analysis
          </h2>
          <ResponsiveTable
            id={`${article.slug}-table`}
            caption={article.comparisonTable.caption}
            headers={[
              "Evaluation Criteria",
              article.comparisonTable.optionAName,
              article.comparisonTable.optionBName,
              "Engineering Verdict",
            ]}
            rows={article.comparisonTable.rows.map((row) => [
              row.criteria,
              row.optionA,
              row.optionB,
              row.verdict,
            ])}
          />
        </section>
      )}

      {/* Content Sections */}
      <div className="space-y-8 text-stone-900 leading-relaxed">
        {article.contentSections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-black border-b border-stone-200 pb-2">
              {sec.heading}
            </h2>
            <MarkdownRenderer content={sec.bodyMarkdown} />
          </section>
        ))}
      </div>

      {/* Scientific Limitations & Exceptions */}
      <section className="border border-amber-300 bg-amber-50/50 p-5 space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-700" aria-hidden="true" />
          <span>Technical Assumptions & Boundary Conditions</span>
        </h2>
        <ul className="space-y-1.5 text-xs text-amber-900">
          {article.limitations.map((lim, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-700 font-bold">&bull;</span>
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Product Reference Cards if Linked */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4 border-t-2 border-black">
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            {article.articleType === "review"
              ? "Evaluated Model & Alternative Recommendations"
              : "Referenced Equipment & Specification Sheets"}
          </h2>
          <div className="space-y-4">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.slug} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Primary Sources & Citations */}
      <section className="border border-stone-200 bg-stone-50 p-5 space-y-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-stone-500" aria-hidden="true" />
          <span>Primary Sources & Regulatory References</span>
        </h2>
        <ul className="space-y-1.5 text-xs text-stone-600">
          {article.sources.map((src, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-mono text-stone-400">[{idx + 1}]</span>
              <div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-black underline hover:text-forest-800"
                >
                  {src.title}
                </a>{" "}
                &mdash; <span className="text-stone-500">{src.publisher}</span>{" "}
                {src.publishedYear && (
                  <span className="text-stone-400">({src.publishedYear})</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Frequently Asked Questions */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="space-y-4 border-t border-stone-200 pt-6">
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-forest-700" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {article.faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-stone-200 bg-white p-4"
              >
                <h3 className="font-sans font-bold text-sm text-black mb-1">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Author Biography Box */}
      <section className="border-2 border-black bg-stone-50 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <AuthorAvatar
            src={author.avatarUrl}
            name={author.name}
            size="lg"
          />
          <div className="space-y-1">
            <div className="font-sans font-black text-base uppercase text-black">
              Written by {author.name}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-forest-800">
              {author.role}{author.credentials ? ` · ${author.credentials}` : ""}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 border-t-2 border-black pt-6">
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            Related Climate & Comfort Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.slug} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
