import Link from "next/link";
import { Metadata } from "next";
import { getPublishedArticles } from "@/data/articles";
import { CATEGORY_LIST } from "@/data/categories";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { BookOpen, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Buying Guides & Sizing Manuals | Air Crafted Home",
  description:
    "Explore our complete library of evidence-based heating, cooling, airflow, and indoor air quality buying guides.",
  alternates: {
    canonical: getCanonicalUrl("/buying-guides"),
  },
};

export default function BuyingGuidesIndexPage() {
  const publishedArticles = getPublishedArticles();
  const breadcrumbs = [{ name: "Buying Guides", href: "/buying-guides" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          <BookOpen className="h-3 w-3" />
          <span>Complete Research Library</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
          Home Comfort &amp; Climate Buying Guides
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
          Every guide is authored using primary consensus standards:
          Department of Energy (DOE) test procedures, AHAM CADR protocols, and
          reproducible utility rate calculations.
        </p>
      </header>

      {publishedArticles.length > 0 ? (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : (
        <section className="border border-stone-300 bg-white p-6 sm:p-10 space-y-5">
          <div className="space-y-2">
            <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
              Editorial Guides Coming Soon
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
              New guides and product comparisons are coming soon. Explore our climate
              categories and practical home-energy tools while we prepare our first editorial guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="border border-stone-200 bg-stone-50/50 p-3.5 hover:border-black hover:bg-white transition flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase text-forest-800">
                    Category Hub
                  </div>
                  <div className="font-sans font-bold text-sm text-black">
                    {cat.name}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-400" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/energy-efficiency#calculator"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition"
            >
              <Zap className="h-3.5 w-3.5 text-forest-400" />
              <span>Use the Appliance Operating Cost Simulator</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
