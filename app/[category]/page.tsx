import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CATEGORIES, CATEGORY_LIST } from "@/data/categories";
import { ARTICLE_LIST } from "@/data/articles";
import { PRODUCT_LIST } from "@/data/products";
import { CategoryId } from "@/lib/types";
import { ArticleCard } from "@/components/ArticleCard";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, BookOpen, Layers } from "lucide-react";

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

  const categoryArticles = ARTICLE_LIST.filter(
    (a) => a.categoryId === category.id
  );
  const categoryProducts = PRODUCT_LIST.filter(
    (p) => p.categoryId === category.id
  );

  const breadcrumbs = [
    { name: category.name, href: `/${category.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Category Hero */}
      <section className="rounded-2xl border border-stone-200/90 bg-white p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
            <Layers className="h-3.5 w-3.5 text-forest-700" aria-hidden="true" />
            Category Pillar
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            {category.heroHeadline}
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            {category.editorialSummary}
          </p>

          {/* Key Topics & Standards */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-100 text-xs">
            <div>
              <span className="font-semibold text-stone-900 block mb-1">
                Core Topics Explored:
              </span>
              <ul className="space-y-1 text-stone-600">
                {category.keyTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-forest-700 font-bold">&bull;</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-semibold text-stone-900 block mb-1">
                Referenced US Standards Bodies:
              </span>
              <ul className="space-y-1 text-stone-600">
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
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-forest-800" />
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Editorial Buying Guides & Research ({categoryArticles.length})
            </h2>
          </div>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500 py-6">
            New research guides are currently undergoing peer review for this category.
          </p>
        )}
      </section>

      {/* Products in Category */}
      {categoryProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-forest-800" />
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Verified Product Specifications & Reviews ({categoryProducts.length})
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
