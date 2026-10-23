import Link from "next/link";
import { Product } from "@/lib/types";
import { getPublishedProductById, getPublishedProductBySlug } from "@/data/products";
import { AffiliateButton } from "./AffiliateButton";
import { SafeImage } from "./SafeImage";
import { Check, X, ShieldCheck, Gauge, Volume2, Home, Zap, ExternalLink } from "lucide-react";

export interface ProductCardProps {
  product?: Product;
  productId?: string;
  slug?: string;
}

export function ProductCard({
  product: directProduct,
  productId,
  slug,
}: ProductCardProps) {
  const product =
    directProduct && directProduct.status === "published"
      ? directProduct
      : productId
      ? getPublishedProductById(productId)
      : slug
      ? getPublishedProductBySlug(slug)
      : undefined;

  // Never render unverified or draft products in public components
  if (!product || product.status !== "published") {
    return null;
  }

  const evidenceLabel =
    product.evidenceType === "independent-consensus"
      ? "Consensus Standard Verified"
      : product.evidenceType === "manufacturer-spec"
      ? "Nameplate Audited"
      : product.evidenceType === "energy-calc"
      ? "Thermodynamic Model"
      : "Editorial Audit";

  const capacityDisplay = product.coolingCapacityBtuSacc
    ? `${product.coolingCapacityBtuSacc.toLocaleString()} BTU (SACC)`
    : product.heatingCapacityWatts
    ? `${product.heatingCapacityWatts}W (${Math.round(product.heatingCapacityWatts * 3.412)} BTU)`
    : product.cadrSmoke
    ? `CADR ${product.cadrSmoke} Smoke`
    : product.airFlowCfm
    ? `${product.airFlowCfm.toLocaleString()} CFM`
    : "High Velocity Circulation";

  return (
    <article className="border border-stone-200 bg-white p-5 hover:border-black transition duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-3.5">
        <div className="flex items-start gap-4">
          {product.imageUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-stone-200 overflow-hidden bg-white shadow-sm">
              <SafeImage
                src={product.imageUrl}
                alt={product.imageAlt || product.name}
                categoryId={product.categoryId}
              />
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-stone-900 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                {product.brand || product.manufacturer}
              </span>
              <span className="font-mono text-xs text-stone-500 font-semibold">
                SKU: {product.modelNumber}
              </span>
              <span className="inline-flex items-center gap-1 border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-bold text-stone-700 uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3 text-forest-700" aria-hidden="true" />
                {evidenceLabel}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-sans font-bold text-stone-900 tracking-tight">
              <Link
                href={`/reviews/${product.slug}`}
                className="hover:text-forest-800 transition-colors"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-stone-600 mt-0.5 max-w-xl">
              {product.bestFor}
            </p>
          </div>
        </div>

        <div className="sm:text-right shrink-0">
          <div className="text-2xl font-black font-sans text-stone-900 tracking-tight">
            ${product.approximateUsdPrice}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Verified {product.priceVerifiedDate}
          </div>
        </div>
      </div>

      {/* Technical Spec Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3.5 border-b border-stone-100 text-xs">
        <div className="border border-stone-100 bg-stone-50/70 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">
            <Gauge className="h-3 w-3 text-forest-700" aria-hidden="true" />
            <span>Capacity</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            {capacityDisplay}
          </div>
        </div>

        <div className="border border-stone-100 bg-stone-50/70 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">
            <Home className="h-3 w-3 text-forest-700" aria-hidden="true" />
            <span>Coverage</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            Up to {product.recommendedRoomSqFt} sq ft
          </div>
        </div>

        <div className="border border-stone-100 bg-stone-50/70 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">
            <Zap className="h-3 w-3 text-forest-700" aria-hidden="true" />
            <span>Power Draw</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            {product.powerConsumptionWatts}W Max
          </div>
        </div>

        <div className="border border-stone-100 bg-stone-50/70 p-2.5">
          <div className="flex items-center gap-1 text-stone-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">
            <Volume2 className="h-3 w-3 text-forest-700" aria-hidden="true" />
            <span>Acoustics</span>
          </div>
          <div className="font-bold text-stone-900 text-xs">
            {product.noiseDbRange}
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 text-xs">
        <div>
          <h4 className="font-bold text-forest-800 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1.5">
            <Check className="h-3.5 w-3.5 text-forest-700" aria-hidden="true" />
            Key Strengths
          </h4>
          <ul className="space-y-1 text-stone-700 text-[11.5px]">
            {product.pros.slice(0, 3).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-forest-700 font-bold">&bull;</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-stone-600 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1.5">
            <X className="h-3.5 w-3.5 text-stone-500" aria-hidden="true" />
            Known Limitations
          </h4>
          <ul className="space-y-1 text-stone-700 text-[11.5px]">
            {product.cons.slice(0, 3).map((con, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-stone-400 font-bold">&bull;</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
        <div className="flex items-center gap-3">
          <Link
            href={`/reviews/${product.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-black underline"
          >
            View Full Specification Matrix &rarr;
          </Link>
          {product.reviewArticleSlug && (
            <Link
              href={`/${product.categoryId}/${product.reviewArticleSlug}`}
              className="text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-black underline"
            >
              Read Editorial Review &rarr;
            </Link>
          )}
        </div>

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
            className="inline-flex items-center justify-center gap-1.5 border border-black bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-stone-800"
          >
            <span>Visit Manufacturer Site</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}
