import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="inline-flex items-center justify-center rounded-full bg-forest-50 p-4 text-forest-800 mb-6">
        <span className="font-mono text-2xl font-bold">404</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
        Page or Resource Not Found
      </h1>

      <p className="mt-3 text-base text-stone-600 max-w-lg mx-auto">
        The research article, product specification sheet, or URL you requested
        could not be located. It may have been updated or relocated.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-900 transition"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Return to Homepage
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition"
        >
          <Search className="h-4 w-4 text-stone-500" aria-hidden="true" />
          Search the Knowledge Base
        </Link>
      </div>

      <div className="mt-12 border-t border-stone-200 pt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">
          Popular Editorial Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <Link
            href="/air-conditioners"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-700 hover:border-forest-600"
          >
            Air Conditioners
          </Link>
          <Link
            href="/heating"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-700 hover:border-forest-600"
          >
            Heating & Space Heaters
          </Link>
          <Link
            href="/fans-air-circulators"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-700 hover:border-forest-600"
          >
            Fans & Airflow
          </Link>
          <Link
            href="/air-quality"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-700 hover:border-forest-600"
          >
            Indoor Air Quality (HEPA)
          </Link>
          <Link
            href="/energy-efficiency"
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-stone-700 hover:border-forest-600"
          >
            Operating Cost Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
