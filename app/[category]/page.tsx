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
                Core Topics & Physics Explored:
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
      <section className="space-y-4">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Editorial Buying Guides & Research ({categoryArticles.length})
          </h2>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-500 py-6">
            New research guides are currently undergoing peer review for this category.
          </p>
        )}
      </section>

      {/* Products in Category */}
      {categoryProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">
              Verified Product Specifications & Reviews ({categoryProducts.length})
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
