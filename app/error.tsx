"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <div className="inline-flex items-center justify-center rounded-full bg-amber-50 p-4 text-amber-800 mb-6">
        <AlertTriangle className="h-8 w-8 text-amber-700" aria-hidden="true" />
      </div>

      <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
        Something went wrong
      </h1>

      <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto">
        An unexpected error occurred while rendering this page. Our team has
        been alerted to the issue.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-900 transition"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition"
        >
          <Home className="h-4 w-4 text-stone-500" aria-hidden="true" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
