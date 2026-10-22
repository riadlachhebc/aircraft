import { Metadata } from "next";
import { SearchBox } from "@/components/SearchBox";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Knowledge Base | Air Crafted Home",
  description:
    "Search through our evidence-based residential heating, cooling, airflow, and indoor air quality guides.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: getCanonicalUrl("/search"),
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const breadcrumbs = [{ name: "Search", href: "/search" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2 border-b border-stone-200 pb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
          Search Air Crafted Home
        </h1>
        <p className="text-sm text-stone-600">
          Explore research articles, thermodynamic calculations, and verified
          product specification sheets across all categories.
        </p>
      </header>

      <SearchBox initialQuery={q || ""} />
    </div>
  );
}
