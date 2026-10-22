import { Metadata } from "next";
import { PRODUCT_LIST } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Reviews & Technical Specification Sheets | Air Crafted Home",
  description:
    "Transparent appliance reviews based on verified manufacturer engineering specifications and AHAM/DOE consensus testing.",
  alternates: {
    canonical: getCanonicalUrl("/reviews"),
  },
};

export default function ReviewsIndexPage() {
  const breadcrumbs = [{ name: "Reviews", href: "/reviews" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
            <ShieldCheck className="h-3.5 w-3.5 text-forest-700" />
            Structured Product Registry
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Appliance Reviews & Specification Sheets
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            We evaluate home comfort appliances against traceable engineering
            metrics: DOE SACC cooling, AHAM verified CADR ratings, nameplate
            electrical draw, and realistic operating noise levels. We never use
            unverified star scores or artificial badges.
          </p>
        </div>
      </header>

      <AffiliateNotice />

      <section className="space-y-6">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </div>
  );
}
