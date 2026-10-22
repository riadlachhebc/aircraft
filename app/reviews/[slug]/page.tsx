import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, PRODUCT_LIST } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import {
  getCanonicalUrl,
  buildProductSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo";
import {
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  Wrench,
  AlertCircle,
} from "lucide-react";

export async function generateStaticParams() {
  return PRODUCT_LIST.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return {};

  const canonical = getCanonicalUrl(`/reviews/${product.slug}`);

  return {
    title: `${product.name} Review & Verified Specs | Air Crafted Home`,
    description: `Engineering review for ${product.name} (Model ${product.modelNumber}). Verified specifications, room size calculation basis, noise levels, and operating costs.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${product.name} Review & Verified Specs`,
      description: product.bestFor,
      url: canonical,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    notFound();
  }

  const category = CATEGORIES[product.categoryId];

  const breadcrumbs = [
    { name: "Reviews", href: "/reviews" },
    { name: product.name, href: `/reviews/${product.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const productSchema = buildProductSchema(product);

  const specRows: [string, string][] = [
    ["Manufacturer", product.manufacturer],
    ["Model / SKU Number", product.modelNumber],
    [
      "Primary Capacity Rating",
      product.coolingCapacityBtuSacc
        ? `${product.coolingCapacityBtuSacc.toLocaleString()} BTU/h (DOE SACC) / ${product.coolingCapacityBtuAshrae?.toLocaleString()} BTU/h (ASHRAE)`
        : product.heatingCapacityWatts
        ? `${product.heatingCapacityWatts}W (5,118 BTU/h)`
        : product.cadrSmoke
        ? `CADR: Smoke ${product.cadrSmoke} / Dust ${product.cadrDust} / Pollen ${product.cadrPollen}`
        : "Whole-Room Aerodynamic Vortex",
    ],
    [
      "Recommended Room Sizing",
      `Up to ${product.recommendedRoomSqFt} sq ft (${product.roomSizeBasis})`,
    ],
    ["Power Consumption (Max)", `${product.powerConsumptionWatts} Watts`],
    ["Electrical Standard", product.voltageFrequency],
    ["Acoustics & Noise Range", `${product.noiseDbRange} (${product.noiseConditions})`],
    [
      "Physical Dimensions",
      `${product.dimensionsInches.width}" W × ${product.dimensionsInches.depth}" D × ${product.dimensionsInches.height}" H`,
    ],
    ["Weight", `${product.weightLbs} lbs`],
    ["Installation Requirements", product.installationRequirements],
    ["Routine Maintenance", product.maintenanceSchedule],
    [
      "Estimated Parts / Filter Cost",
      product.replacementPartsCostEstimate || "No proprietary consumable filters required",
    ],
    ["Warranty Period", `${product.warrantyYears} Year(s) Manufacturer Warranty`],
    ["Verified Certifications", product.certifications.join(", ")],
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <header className="border-2 border-black bg-stone-50 p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
              {product.manufacturer}
            </span>
            <span className="font-mono text-xs text-stone-600 font-bold">
              MODEL {product.modelNumber}
            </span>
            <span className="inline-flex items-center gap-1 border border-stone-300 bg-white px-2 py-0.5 text-[10px] font-bold text-stone-800 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3 text-forest-700" />
              Verified Spec Sheet
            </span>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black font-sans text-black">
              ${product.approximateUsdPrice}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Verified {product.priceVerifiedDate}
            </div>
          </div>
        </div>

        <h1 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-black">
          {product.name}
        </h1>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl font-normal">
          {product.bestFor}
        </p>

        {/* Action Button */}
        <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-stone-200">
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

          <a
            href={product.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-black underline flex items-center gap-1"
          >
            <span>Official Documentation</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      <AffiliateNotice />

      {/* Pros & Cons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-xs uppercase tracking-wider text-forest-800 flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <Check className="h-4 w-4 text-forest-700" />
            <span>Engineering Strengths</span>
          </h2>
          <ul className="space-y-1.5 text-xs text-stone-800">
            {product.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-forest-700 font-bold">&bull;</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5 border-b border-stone-100 pb-2">
            <X className="h-4 w-4 text-stone-500" />
            <span>Documented Limitations</span>
          </h2>
          <ul className="space-y-1.5 text-xs text-stone-800">
            {product.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-stone-400 font-bold">&bull;</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Complete Technical Specifications Table */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-forest-800" />
          <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
            Technical Specification Matrix
          </h2>
        </div>
        <ResponsiveTable
          id={`${product.slug}-specs`}
          caption={`${product.name} Verified Technical Specifications`}
          headers={["Engineering Parameter", "Verified Specification"]}
          rows={specRows.map(([param, val]) => [param, val])}
        />
      </section>

      {/* Editorial Limitations & Evaluation Basis */}
      <section className="border border-stone-200 bg-stone-50 p-5 space-y-1.5">
        <h3 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-stone-500" />
          <span>Evaluation Methodology & Evidence Basis</span>
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          {product.editorialLimitations}
        </p>
      </section>

      {/* Back to Category Link */}
      <div className="border-t border-stone-200 pt-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
        <Link
          href={`/${product.categoryId}`}
          className="text-forest-800 hover:text-black"
        >
          &larr; Return to {category?.name}
        </Link>
        <Link href="/reviews" className="text-stone-500 hover:text-black">
          Browse All Reviews
        </Link>
      </div>
    </article>
  );
}
