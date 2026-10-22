import { Metadata } from "next";
import { ARTICLE_LIST } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "All Buying Guides & Sizing Manuals | Air Crafted Home",
  description:
    "Explore our complete library of evidence-based heating, cooling, airflow, and indoor air quality buying guides.",
  alternates: {
    canonical: getCanonicalUrl("/buying-guides"),
  },
};

export default function BuyingGuidesIndexPage() {
  const breadcrumbs = [{ name: "Buying Guides", href: "/buying-guides" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
            <BookOpen className="h-3.5 w-3.5 text-forest-700" />
            Editorial Knowledge Base
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Home Comfort & Climate Buying Guides
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            Every guide is authored by building science and HVAC specialists.
            We use Department of Energy (DOE) test procedures, Association of
            Home Appliance Manufacturers (AHAM) CADR standards, and real-world
            utility rate modeling.
          </p>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLE_LIST.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
