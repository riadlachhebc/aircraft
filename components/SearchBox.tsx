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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
          <Search className="h-4 w-4" aria-hidden="true" />
        </div>
        <input
          id="site-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics (e.g. dual-hose, SACC, CADR, 1500W space heater, airflow)..."
          className="w-full border-2 border-stone-300 bg-white py-2.5 pl-10 pr-9 text-sm text-black placeholder:text-stone-400 focus:border-black focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-black"
            aria-label="Clear search input"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Suggested Search Terms */}
      {!trimmed && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-black uppercase text-[10px] tracking-wider text-stone-500 mr-1">
            HOT TOPICS:
          </span>
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
              className="border border-stone-300 bg-white px-2 py-0.5 text-[11px] font-bold text-stone-700 hover:border-black hover:text-black transition"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Results View */}
      {trimmed && (
        <div className="mt-5 space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Found {totalResults} {totalResults === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </div>

          {totalResults === 0 && (
            <div className="border border-stone-200 bg-stone-50 p-6 text-center">
              <p className="text-sm font-bold text-black uppercase">
                No matching guides or reviews found
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Try searching for broader keywords like &ldquo;AC&rdquo;, &ldquo;heater&rdquo;, &ldquo;fan&rdquo;, or &ldquo;CADR&rdquo;.
              </p>
            </div>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <Tag className="h-3 w-3" aria-hidden="true" />
                Matching Pillars ({results.categories.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="border border-stone-300 bg-white p-3 hover:border-black transition"
                  >
                    <span className="font-bold text-sm text-black uppercase">
                      {c.name}
                    </span>
                    <span className="text-xs text-stone-600 block mt-0.5 line-clamp-1">
                      {c.shortDescription}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {results.articles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <BookOpen className="h-3 w-3" aria-hidden="true" />
                Editorial Field Guides ({results.articles.length})
              </h3>
              <div className="space-y-2">
                {results.articles.map((a) => (
                  <div
                    key={a.slug}
                    className="border border-stone-300 bg-white p-3 hover:border-black transition"
                  >
                    <Link
                      href={`/${a.categoryId}/${a.slug}`}
                      className="font-bold text-sm text-black hover:text-forest-800"
                    >
                      {a.title}
                    </Link>
                    <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">
                      {a.metaDescription}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold uppercase text-stone-400">
                      <span>{a.readTimeMinutes} min read</span>
                      <span>&bull;</span>
                      <span>{a.categoryId.replace("-", " ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {results.products.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                Product Specification Sheets ({results.products.length})
              </h3>
              <div className="space-y-2">
                {results.products.map((p) => (
                  <div
                    key={p.slug}
                    className="border border-stone-300 bg-white p-3 hover:border-black transition"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/reviews/${p.slug}`}
                        className="font-bold text-sm text-black hover:text-forest-800"
                      >
                        {p.name}
                      </Link>
                      <span className="text-sm font-black text-black">
                        ${p.approximateUsdPrice}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">{p.bestFor}</p>
                    <div className="mt-1 text-[10px] font-mono text-stone-400">
                      {p.manufacturer} &middot; Model {p.modelNumber}
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
