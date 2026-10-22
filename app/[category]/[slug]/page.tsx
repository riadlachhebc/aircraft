import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, ARTICLE_LIST } from "@/data/articles";
import { CATEGORIES } from "@/data/categories";
import { AUTHORS } from "@/data/authors";
import { PRODUCTS } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { ProductCard } from "@/components/ProductCard";
import { ArticleCard } from "@/components/ArticleCard";
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
  ExternalLink,
  BookOpen,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export async function generateStaticParams() {
  return ARTICLE_LIST.map((article) => ({
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
  const article = ARTICLES[slug];
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
  const article = ARTICLES[slug];

  if (!article || article.categoryId !== catSlug) {
    notFound();
  }

  const category = CATEGORIES[article.categoryId];
  const author = AUTHORS[article.authorId] || AUTHORS["marcus-vance"];
  const reviewer = article.reviewerId ? AUTHORS[article.reviewerId] : undefined;

  const breadcrumbs = [
    { name: category?.name || article.categoryId, href: `/${article.categoryId}` },
    { name: article.title, href: `/${article.categoryId}/${article.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const articleSchema = buildArticleSchema(article, author.name);

  const relatedArticles = article.relatedArticleSlugs
    .map((s) => ARTICLES[s])
    .filter(Boolean);

  const relatedProducts = (article.relatedProductSlugs || [])
    .map((s) => PRODUCTS[s])
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
      <header className="space-y-4 border-b border-stone-200 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/${article.categoryId}`}
            className="rounded-md bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-800 hover:bg-forest-100 transition"
          >
            {category?.name}
          </Link>
          <span className="text-stone-300">&middot;</span>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readTimeMinutes} min read
          </span>
          <span className="text-stone-300">&middot;</span>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            Updated {article.updatedAt}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          {article.metaDescription}
        </p>

        {/* Author Byline & Peer Reviewer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover border border-stone-200"
            />
            <div>
              <div className="font-semibold text-stone-900">{author.name}</div>
              <div className="text-stone-500">{author.role}</div>
            </div>
          </div>

          {reviewer && (
            <div className="flex items-center gap-2 text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/80">
              <ShieldCheck className="h-4 w-4 text-forest-700" />
              <span>
                Peer-reviewed by <strong>{reviewer.name}</strong> ({reviewer.role})
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-stone-200 shadow-sm bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-2 right-3 rounded bg-stone-900/70 px-2 py-0.5 text-[10px] text-stone-200 backdrop-blur-sm">
          {article.heroImageAlt}
        </div>
      </div>

      {/* Editorial Transparency & Affiliate Disclosure */}
      <AffiliateNotice />

      {/* GEO: Direct Answer Callout */}
      <section
        role="region"
        aria-label="Direct Answer Summary"
        className="rounded-xl border-l-4 border-forest-700 bg-forest-50/50 p-5 sm:p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-900 mb-2">
          <BookOpen className="h-4 w-4 text-forest-700" aria-hidden="true" />
          Direct Technical Answer
        </div>
        <p className="text-base sm:text-lg font-serif font-medium text-stone-900 leading-relaxed">
          {article.directAnswer}
        </p>
      </section>

      {/* Key Takeaways */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-4 w-4 text-forest-700" aria-hidden="true" />
          Core Engineering Takeaways
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-stone-700">
          {article.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-forest-700 font-bold mt-0.5">&bull;</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison Table if Present */}
      {article.comparisonTable && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
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
      <div className="prose prose-stone max-w-none space-y-8 text-stone-800 leading-relaxed">
        {article.contentSections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-100 pb-2">
              {sec.heading}
            </h2>
            <div className="text-base space-y-4 text-stone-700 whitespace-pre-line leading-relaxed">
              {sec.bodyMarkdown}
            </div>
          </section>
        ))}
      </div>

      {/* Scientific Limitations & Exceptions */}
      <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-700" aria-hidden="true" />
          Technical Assumptions & Boundary Conditions
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
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
        <section className="space-y-4 pt-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Referenced Equipment & Specification Sheets
          </h2>
          <div className="space-y-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.slug} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Primary Sources & Citations */}
      <section className="rounded-xl border border-stone-200 bg-stone-50/70 p-6 shadow-sm space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-stone-500" aria-hidden="true" />
          Primary Sources & Authoritative References
        </h2>
        <ul className="space-y-2 text-xs text-stone-600">
          {article.sources.map((src, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-mono text-stone-400">[{idx + 1}]</span>
              <div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-stone-900 underline hover:text-forest-800"
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
        <section className="space-y-4 border-t border-stone-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-forest-700" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {article.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Author Biography Box */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="h-16 w-16 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div className="space-y-1">
            <div className="font-serif text-lg font-bold text-stone-900">
              Written by {author.name}
            </div>
            <div className="text-xs font-medium text-forest-800">
              {author.role} &middot; {author.credentials}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 border-t border-stone-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Related Climate & Comfort Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.slug} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
