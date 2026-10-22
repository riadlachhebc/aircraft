"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ARTICLE_LIST } from "@/data/articles";
import { PRODUCT_LIST } from "@/data/products";
import { CATEGORY_LIST } from "@/data/categories";
import { Search, X, BookOpen, ShieldCheck, Tag } from "lucide-react";

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) {
      return { articles: [], products: [], categories: [] };
    }

    const articles = ARTICLE_LIST.filter(
      (a) =>
        a.title.toLowerCase().includes(trimmed) ||
        a.metaDescription.toLowerCase().includes(trimmed) ||
        a.directAnswer.toLowerCase().includes(trimmed) ||
        a.keyTakeaways.some((k) => k.toLowerCase().includes(trimmed))
    );

    const products = PRODUCT_LIST.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.manufacturer.toLowerCase().includes(trimmed) ||
        p.modelNumber.toLowerCase().includes(trimmed) ||
        p.bestFor.toLowerCase().includes(trimmed)
    );

    const categories = CATEGORY_LIST.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.shortDescription.toLowerCase().includes(trimmed)
    );

    return { articles, products, categories };
  }, [trimmed]);

  const totalResults =
    results.articles.length + results.products.length + results.categories.length;

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="site-search-input" className="sr-only">
          Search articles, guides, and products
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
          <Search className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="site-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, e.g., dual-hose, SACC, CADR, space heater cost, bedroom airflow..."
          className="w-full rounded-xl border border-stone-300 bg-white py-3.5 pl-11 pr-10 text-base text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-stone-700"
            aria-label="Clear search input"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Suggested Search Terms */}
      {!trimmed && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-semibold text-stone-700">Popular searches:</span>
          {[
            "dual-hose vs single-hose",
            "portable AC room size",
            "operating cost formula",
            "oil-filled radiator",
            "CADR air purifier",
            "bedroom airflow",
          ].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-stone-700 hover:border-forest-600 hover:text-stone-900 transition"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Results View */}
      {trimmed && (
        <div className="mt-6 space-y-6">
          <div className="text-sm text-stone-500 font-medium">
            Found {totalResults} {totalResults === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </div>

          {totalResults === 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
              <p className="text-base font-semibold text-stone-800">
                No matching articles or reviews found
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Try searching for broader keywords like &ldquo;AC&rdquo;, &ldquo;heater&rdquo;, &ldquo;fan&rdquo;, or &ldquo;CADR&rdquo;, or browse our primary categories above.
              </p>
            </div>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                Matching Categories ({results.categories.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="flex flex-col rounded-lg border border-stone-200 bg-white p-4 hover:border-forest-600 transition"
                  >
                    <span className="font-serif font-bold text-stone-900">
                      {c.name}
                    </span>
                    <span className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {c.shortDescription}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {results.articles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Editorial Guides & Research Articles ({results.articles.length})
              </h3>
              <div className="space-y-3">
                {results.articles.map((a) => (
                  <div
                    key={a.slug}
                    className="rounded-lg border border-stone-200 bg-white p-4 hover:border-forest-600 transition"
                  >
                    <Link
                      href={`/${a.categoryId}/${a.slug}`}
                      className="font-serif font-bold text-base text-stone-900 hover:text-forest-800"
                    >
                      {a.title}
                    </Link>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {a.metaDescription}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
                      <span>{a.readTimeMinutes} min read</span>
                      <span>&middot;</span>
                      <span className="capitalize">{a.categoryId.replace("-", " ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {results.products.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Product Specification Sheets ({results.products.length})
              </h3>
              <div className="space-y-3">
                {results.products.map((p) => (
                  <div
                    key={p.slug}
                    className="rounded-lg border border-stone-200 bg-white p-4 hover:border-forest-600 transition"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/reviews/${p.slug}`}
                        className="font-serif font-bold text-base text-stone-900 hover:text-forest-800"
                      >
                        {p.name}
                      </Link>
                      <span className="text-sm font-bold text-stone-900">
                        ${p.approximateUsdPrice}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">{p.bestFor}</p>
                    <div className="mt-2 text-[11px] text-stone-400">
                      Manufacturer: {p.manufacturer} &middot; Model {p.modelNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
