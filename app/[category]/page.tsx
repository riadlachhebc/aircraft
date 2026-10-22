import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES, CATEGORY_LIST } from "@/data/categories";
import { getPublishedArticlesByCategory } from "@/data/articles";
import { getPublishedProductsByCategory } from "@/data/products";
import { CategoryId } from "@/lib/types";
import { ArticleCard } from "@/components/ArticleCard";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, BookOpen, Layers, Zap } from "lucide-react";

export async function generateStaticParams() {
  return CATEGORY_LIST.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = CATEGORIES[catSlug as CategoryId];
  if (!category) return {};

  const canonical = getCanonicalUrl(`/${category.slug}`);

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: canonical,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: catSlug } = await params;
  const category = CATEGORIES[catSlug as CategoryId];

  if (!category) {
    notFound();
  }

  const categoryArticles = getPublishedArticlesByCategory(category.id);
  const categoryProducts = getPublishedProductsByCategory(category.id);

  const breadcrumbs = [
    { name: category.name, href: `/${category.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Category Hero */}
      <section className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-4">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-forest-800 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
            <Layers className="h-3 w-3" aria-hidden="true" />
            <span>Category Pillar Hub</span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
            {category.heroHeadline}
          </h1>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            {category.editorialSummary}
          </p>

          {/* Key Topics & Standards */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-300 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-black block mb-1.5 text-[11px]">
                Core Topics &amp; Physics Explored:
              </span>
              <ul className="space-y-1 text-stone-700">
                {category.keyTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-forest-700 font-bold">&bull;</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-black block mb-1.5 text-[11px]">
                Referenced US Standards Bodies:
              </span>
              <ul className="space-y-1 text-stone-700">
                {category.standardsBodies.map((std, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator on Energy Efficiency Page */}
      {category.id === "energy-efficiency" && <CalculatorWidget />}

      {/* Articles in Category */}
      {categoryArticles.length > 0 ? (
        <section className="space-y-4">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">
              Editorial Buying Guides &amp; Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : (
        <section className="border border-stone-300 bg-white p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-forest-800 font-bold uppercase text-xs tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Pillar Research Status</span>
          </div>
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            Upcoming Editorial Guides for {category.name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
            New guides and product comparisons are coming soon. Explore our climate
            categories and practical home-energy tools while we prepare our first editorial guides.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/energy-efficiency#calculator"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition"
            >
              <Zap className="h-3.5 w-3.5 text-forest-400" />
              <span>Simulate Operating Costs</span>
            </Link>
            <Link
              href="/how-we-test"
              className="inline-flex items-center gap-2 border border-stone-300 bg-white text-stone-800 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-black transition"
            >
              <span>Our Evaluation Framework</span>
            </Link>
          </div>
        </section>
      )}

      {/* Products in Category (Only shown when verified products are published) */}
      {categoryProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">
              Verified Product Specifications &amp; Reviews
            </h2>
          </div>

          <div className="space-y-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
