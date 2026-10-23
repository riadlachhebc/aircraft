import React from "react";
import Link from "next/link";
import { Product, Article } from "@/lib/types";
import { AffiliateButton } from "./AffiliateButton";
import {
  ShieldCheck,
  Check,
  X,
  Gauge,
  Volume2,
  Home,
  Zap,
  ExternalLink,
  Info,
  DollarSign,
} from "lucide-react";

export interface ProductReviewSummaryProps {
  product: Product;
  article: Article;
  className?: string;
}

export function ProductReviewSummary({
  product,
  article,
  className = "",
}: ProductReviewSummaryProps) {
  const verdictText = article.verdict || article.directAnswer;
  const ratingLabel = article.verdictSummary?.ratingLabel || "Editorial Consensus";

  const capacityLabel = product.coolingCapacityBtuSacc
    ? `${product.coolingCapacityBtuSacc.toLocaleString()} BTU (DOE SACC)`
    : product.heatingCapacityWatts
    ? `${product.heatingCapacityWatts}W (${Math.round(product.heatingCapacityWatts * 3.412)} BTU)`
    : product.cadrSmoke
    ? `CADR ${product.cadrSmoke} Smoke`
    : product.airFlowCfm
    ? `${product.airFlowCfm.toLocaleString()} CFM`
    : "High Velocity Vortex";

  // Operating cost calculation based on US EIA average $0.168/kWh and 8 hours daily nominal run
  const monthlyKwhEst = Math.round(
    ((product.powerConsumptionWatts * 0.75 * 8) / 1000) * 30
  );
  const monthlyCostEst = (monthlyKwhEst * 0.168).toFixed(2);

  return (
    <section
      role="region"
      aria-label="Product Review Summary & Engineering Verdict"
      className={`border-2 border-black bg-stone-50 p-6 sm:p-8 space-y-6 ${className}`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
            {product.brand || product.manufacturer}
          </span>
          <span className="font-mono text-xs text-stone-600 font-bold">
            MODEL {product.modelNumber}
          </span>
          <span className="inline-flex items-center gap-1 border border-stone-300 bg-white px-2 py-0.5 text-[10px] font-bold text-stone-800 uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 text-forest-700" />
            Verified Evaluation
          </span>
        </div>

        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-black font-sans text-black">
            ${product.approximateUsdPrice}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Verified {product.priceVerifiedDate}
          </div>
        </div>
      </div>

      {/* Direct Verdict */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-forest-800">
          <Info className="h-4 w-4 text-forest-700" />
          <span>The Bottom Line / Engineering Verdict</span>
        </div>
        <p className="text-base sm:text-lg font-sans font-bold text-black leading-relaxed">
          {verdictText}
        </p>
      </div>

      {/* Target Audience: Who It's Best For vs Avoid If */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="border border-stone-200 bg-white p-4 space-y-1">
          <div className="font-bold text-forest-800 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-forest-700" />
            Best Suited For
          </div>
          <p className="text-stone-700 leading-relaxed">
            {article.verdictSummary?.idealBuyer || product.bestFor}
          </p>
        </div>

        <div className="border border-stone-200 bg-white p-4 space-y-1">
          <div className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <X className="h-3.5 w-3.5 text-stone-500" />
            Consider Alternatives If
          </div>
          <p className="text-stone-700 leading-relaxed">
            {article.verdictSummary?.avoidIf || product.editorialLimitations}
          </p>
        </div>
      </div>

      {/* Spec Snapshot Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-1">
            <Gauge className="h-3 w-3 text-forest-700" />
            <span>Capacity</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">{capacityLabel}</div>
        </div>

        <div className="border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-1">
            <Home className="h-3 w-3 text-forest-700" />
            <span>Room Coverage</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            Up to {product.recommendedRoomSqFt} sq ft
          </div>
        </div>

        <div className="border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-1">
            <Zap className="h-3 w-3 text-forest-700" />
            <span>Power Draw</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            {product.powerConsumptionWatts}W Max
          </div>
        </div>

        <div className="border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-1">
            <Volume2 className="h-3 w-3 text-forest-700" />
            <span>Acoustics</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            {product.noiseDbRange}
          </div>
        </div>
      </div>

      {/* Operating Cost Snapshot */}
      <div className="border border-stone-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-forest-700 shrink-0" />
          <div>
            <span className="font-bold text-stone-900 block">
              Estimated Monthly Electricity Cost: ~${monthlyCostEst}/mo
            </span>
            <span className="text-[11px] text-stone-500">
              Based on nominal 8 hrs/day @ US national average rate of $0.168/kWh (~{monthlyKwhEst} kWh/mo).
            </span>
          </div>
        </div>
        <Link
          href="/energy-efficiency#calculator"
          className="text-[11px] font-bold uppercase tracking-wider text-forest-800 hover:text-black underline shrink-0"
        >
          Calculate for Your State &rarr;
        </Link>
      </div>

      {/* Pros & Cons Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="border border-stone-200 bg-white p-4 space-y-2">
          <h4 className="font-bold text-forest-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Check className="h-4 w-4 text-forest-700" />
            <span>Key Engineering Strengths</span>
          </h4>
          <ul className="space-y-1.5 text-stone-800">
            {product.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-forest-700 font-bold">&bull;</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-stone-200 bg-white p-4 space-y-2">
          <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <X className="h-4 w-4 text-stone-500" />
            <span>Documented Limitations</span>
          </h4>
          <ul className="space-y-1.5 text-stone-800">
            {product.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">&bull;</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primary CTA and Spec Sheet Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
        <div className="flex flex-wrap items-center gap-3">
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
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              <span>Visit Official Manufacturer Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          <Link
            href={`/reviews/${product.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-black underline"
          >
            View Full Technical Spec Matrix &rarr;
          </Link>
        </div>

        <div className="text-[11px] text-stone-500 italic">
          Zero sponsored placements &bull; Traceable standards
        </div>
      </div>
    </section>
  );
}
