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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-forest-800 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          <span>Structured Product Registry</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
          Appliance Reviews & Specification Sheets
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
          We evaluate home comfort appliances against traceable engineering
          metrics: DOE SACC cooling, AHAM verified CADR ratings, nameplate
          electrical draw, and realistic operating noise levels. We never use
          unverified star scores or artificial badges.
        </p>
      </header>

      <AffiliateNotice />

      <section className="space-y-5">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </div>
  );
}
