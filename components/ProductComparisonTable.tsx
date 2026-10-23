import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import {
  getPublishedProductById,
  getPublishedProductBySlug,
  getPublishedProductsByIds,
  getPublishedProductsBySlugs,
} from "@/data/products";
import { ResponsiveTable } from "./ResponsiveTable";
import { AffiliateButton } from "./AffiliateButton";
import { ExternalLink } from "lucide-react";

export interface ProductComparisonTableProps {
  id?: string;
  caption?: string;
  products?: Product[];
  productIds?: string[];
  productSlugs?: string[];
  className?: string;
}

export function ProductComparisonTable({
  id = "product-comparison-matrix",
  caption = "Side-by-Side Equipment Specification Comparison",
  products: directProducts,
  productIds,
  productSlugs,
  className = "",
}: ProductComparisonTableProps) {
  // Resolve published products only (never render unverified/draft equipment)
  const resolvedProducts: Product[] = React.useMemo(() => {
    if (directProducts && directProducts.length > 0) {
      return directProducts.filter((p) => p.status === "published");
    }
    if (productIds && productIds.length > 0) {
      return getPublishedProductsByIds(productIds);
    }
    if (productSlugs && productSlugs.length > 0) {
      return getPublishedProductsBySlugs(productSlugs);
    }
    return [];
  }, [directProducts, productIds, productSlugs]);

  if (resolvedProducts.length < 2) {
    return null;
  }

  const headers = [
    "Engineering Parameter",
    ...resolvedProducts.map((p) => `${p.brand || p.manufacturer} ${p.modelNumber}`),
  ];

  const rows: (string | React.ReactNode)[][] = [
    [
      "Product & Specification Sheet",
      ...resolvedProducts.map((p) => (
        <div key={p.slug} className="space-y-1">
          <Link
            href={`/reviews/${p.slug}`}
            className="font-bold text-stone-900 hover:text-forest-800 underline"
          >
            {p.name}
          </Link>
          <div className="text-[11px] text-stone-500 font-mono">
            Model: {p.modelNumber}
          </div>
        </div>
      )),
    ],
    [
      "Primary Capacity Rating",
      ...resolvedProducts.map((p) => {
        if (p.coolingCapacityBtuSacc) {
          return `${p.coolingCapacityBtuSacc.toLocaleString()} BTU/h (DOE SACC)`;
        }
        if (p.heatingCapacityWatts) {
          return `${p.heatingCapacityWatts}W (${Math.round(p.heatingCapacityWatts * 3.412)} BTU/h)`;
        }
        if (p.cadrSmoke) {
          return `CADR: Smoke ${p.cadrSmoke} / Dust ${p.cadrDust || "-"} / Pollen ${p.cadrPollen || "-"}`;
        }
        if (p.airFlowCfm) {
          return `${p.airFlowCfm.toLocaleString()} CFM High Velocity`;
        }
        return "Whole-Room Aerodynamic Vortex";
      }),
    ],
    [
      "Recommended Room Sizing",
      ...resolvedProducts.map(
        (p) => `Up to ${p.recommendedRoomSqFt} sq ft (${p.roomSizeBasis})`
      ),
    ],
    [
      "Max Power Draw & Duty Cycle",
      ...resolvedProducts.map(
        (p) => `${p.powerConsumptionWatts}W (${p.voltageFrequency})`
      ),
    ],
    [
      "Acoustics & Operating Noise",
      ...resolvedProducts.map((p) => `${p.noiseDbRange} (${p.noiseConditions})`),
    ],
    [
      "Physical Dimensions & Weight",
      ...resolvedProducts.map(
        (p) =>
          `${p.dimensionsInches.width}"W × ${p.dimensionsInches.depth}"D × ${p.dimensionsInches.height}"H (${p.weightLbs} lbs)`
      ),
    ],
    [
      "Key Engineering Strengths",
      ...resolvedProducts.map((p) => (
        <ul key={p.slug} className="space-y-1 text-xs">
          {p.pros.slice(0, 2).map((pro, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-forest-700 font-bold">&bull;</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      )),
    ],
    [
      "Documented Limitations",
      ...resolvedProducts.map((p) => (
        <ul key={p.slug} className="space-y-1 text-xs">
          {p.cons.slice(0, 2).map((con, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-stone-400 font-bold">&bull;</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      )),
    ],
    [
      "Verified Price & Date",
      ...resolvedProducts.map(
        (p) => `$${p.approximateUsdPrice} (Audited ${p.priceVerifiedDate})`
      ),
    ],
    [
      "Retailer Link & Availability",
      ...resolvedProducts.map((p) => (
        <div key={p.slug} className="pt-1">
          {p.affiliateSlug ? (
            <AffiliateButton
              slug={p.affiliateSlug}
              productName={p.name}
              price={p.approximateUsdPrice}
            />
          ) : (
            <a
              href={p.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-black bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-stone-800"
            >
              <span>Manufacturer Site</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )),
    ],
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <ResponsiveTable
        id={id}
        caption={caption}
        headers={headers}
        rows={rows}
      />
    </div>
  );
}
