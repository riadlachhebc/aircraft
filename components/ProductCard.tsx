import Link from "next/link";
import { Product } from "@/lib/types";
import { AffiliateButton } from "./AffiliateButton";
import { Check, X, ShieldCheck, Gauge, Volume2, Home, Zap } from "lucide-react";

export function ProductCard({
  product,
  showFullDetails = false,
}: {
  product: Product;
  showFullDetails?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-stone-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {product.manufacturer}
            </span>
            <span className="text-stone-300">&middot;</span>
            <span className="text-xs font-mono text-stone-500">
              Model {product.modelNumber}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
              <ShieldCheck className="h-3 w-3 text-forest-700" aria-hidden="true" />
              {product.evidenceType === "independent-consensus"
                ? "AHAM / EPA Verified"
                : "Verified Manufacturer Spec"}
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-stone-900">
            <Link
              href={`/reviews/${product.slug}`}
              className="hover:text-forest-800 transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            {product.bestFor}
          </p>
        </div>

        <div className="sm:text-right shrink-0">
          <div className="text-2xl font-bold font-serif text-stone-900">
            ${product.approximateUsdPrice}
          </div>
          <div className="text-[11px] text-stone-500">
            Verified {product.priceVerifiedDate}
          </div>
        </div>
      </div>

      {/* Technical Spec Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-stone-100 text-xs">
        <div className="rounded-lg bg-stone-50 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 mb-0.5">
            <Gauge className="h-3 w-3" aria-hidden="true" />
            <span>Capacity</span>
          </div>
          <div className="font-semibold text-stone-900">
            {product.coolingCapacityBtuSacc
              ? `${product.coolingCapacityBtuSacc.toLocaleString()} BTU (SACC)`
              : product.heatingCapacityWatts
              ? `${product.heatingCapacityWatts}W (5,118 BTU)`
              : product.cadrSmoke
              ? `CADR ${product.cadrSmoke} Smoke`
              : "High Airflow"}
          </div>
        </div>

        <div className="rounded-lg bg-stone-50 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 mb-0.5">
            <Home className="h-3 w-3" aria-hidden="true" />
            <span>Coverage</span>
          </div>
          <div className="font-semibold text-stone-900">
            Up to {product.recommendedRoomSqFt} sq ft
          </div>
        </div>

        <div className="rounded-lg bg-stone-50 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 mb-0.5">
            <Zap className="h-3 w-3" aria-hidden="true" />
            <span>Power Draw</span>
          </div>
          <div className="font-semibold text-stone-900">
            {product.powerConsumptionWatts}W Max
          </div>
        </div>

        <div className="rounded-lg bg-stone-50 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 mb-0.5">
            <Volume2 className="h-3 w-3" aria-hidden="true" />
            <span>Acoustics</span>
          </div>
          <div className="font-semibold text-stone-900">
            {product.noiseDbRange}
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
        <div className="space-y-1.5">
          <h4 className="font-semibold text-forest-800 flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-forest-700" aria-hidden="true" />
            Key Advantages
          </h4>
          <ul className="space-y-1 text-stone-700">
            {product.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-forest-700 font-bold">&bull;</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1.5">
          <h4 className="font-semibold text-amber-900 flex items-center gap-1">
            <X className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
            Trade-Offs & Drawbacks
          </h4>
          <ul className="space-y-1 text-stone-700">
            {product.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-700 font-bold">&bull;</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footnote / Editorial Limitations */}
      <div className="rounded bg-stone-50/80 p-3 text-[11px] text-stone-600 border border-stone-100 mb-4">
        <strong className="text-stone-800">Testing & Evidence Basis:</strong>{" "}
        {product.editorialLimitations}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <Link
          href={`/reviews/${product.slug}`}
          className="text-xs font-semibold text-forest-800 hover:text-forest-900 underline"
        >
          View Full Specification Sheet &rarr;
        </Link>

        {product.affiliateSlug ? (
          <AffiliateButton
            slug={product.affiliateSlug}
            productName={product.name}
            price={product.approximateUsdPrice}
          />
        ) : (
          <a
            href={product.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-50"
          >
            Visit Official Manufacturer Site &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
