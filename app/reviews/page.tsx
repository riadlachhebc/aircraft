import Link from "next/link";
import { Metadata } from "next";
import { getPublishedProducts } from "@/data/products";
import { CATEGORY_LIST } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { getCanonicalUrl, buildBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Reviews & Technical Specification Sheets | Air Crafted Home",
  description:
    "Transparent appliance reviews based on verified manufacturer engineering specifications and AHAM/DOE consensus testing.",
  alternates: {
    canonical: getCanonicalUrl("/reviews"),
  },
};

export default function ReviewsIndexPage() {
  const publishedProducts = getPublishedProducts();
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
          Appliance Reviews &amp; Specification Sheets
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed max-w-2xl">
          We evaluate home comfort appliances against traceable engineering
          metrics: DOE SACC cooling, AHAM verified CADR ratings, nameplate
          electrical draw, and realistic operating noise levels. We never use
          unverified star scores or artificial badges.
        </p>
      </header>

      <AffiliateNotice />

      {publishedProducts.length > 0 ? (
        <section className="space-y-5">
          {publishedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      ) : (
        <section className="border border-stone-300 bg-white p-6 sm:p-10 space-y-5">
          <div className="space-y-2">
            <h2 className="font-sans font-black text-xl uppercase tracking-tight text-black">
              Verified Product Reviews Coming Soon
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
              New verified product specifications and evaluations are coming soon.
              In the meantime, explore our climate categories and practical home-energy tools
              while we prepare our first product audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="border border-stone-200 bg-stone-50/50 p-3.5 hover:border-black hover:bg-white transition flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase text-forest-800">
                    Category Hub
                  </div>
                  <div className="font-sans font-bold text-sm text-black">
                    {cat.name}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-400" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/energy-efficiency#calculator"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-forest-800 transition"
            >
              <Zap className="h-3.5 w-3.5 text-forest-400" />
              <span>Simulate Operating Costs on Lab Bench</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
