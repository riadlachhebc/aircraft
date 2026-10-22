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
          Home Comfort & Climate Buying Guides
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
          Every guide is authored by building science and HVAC specialists using
          Department of Energy (DOE) test procedures, AHAM CADR protocols, and
          reproducible utility rate calculations.
        </p>
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
