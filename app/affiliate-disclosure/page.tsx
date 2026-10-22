import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";
import { DollarSign, ShieldAlert, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure & Commercial Transparency | Air Crafted Home",
  description:
    "Complete disclosure of our affiliate relationships, FTC compliance standards, and commercial referral policies.",
  alternates: {
    canonical: getCanonicalUrl("/affiliate-disclosure"),
  },
};

export default function AffiliateDisclosurePage() {
  const breadcrumbs = [
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
          <DollarSign className="h-3.5 w-3.5 text-amber-700" />
          FTC Compliance & Transparency
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Affiliate Relationship & Monetization Disclosure
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          In compliance with Federal Trade Commission (FTC) guidelines concerning
          the use of endorsements and testimonials in advertising (16 CFR Part 255),
          this page explains how Air Crafted Home sustains its operations through
          transparent affiliate partnerships.
        </p>
      </header>

      <section className="space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-lg text-stone-900">
            How Affiliate Referrals Work
          </h2>
          <p>
            Air Crafted Home participates in affiliate referral programs with verified
            retailers and direct appliance manufacturers (such as Amazon, The Home
            Depot, Target, Midea, Vornado, Coway, De&apos;Longhi, Dreo, and Levoit).
          </p>
          <p>
            When you click on certain product links across our guides and specification
            sheets and subsequently make a purchase, the merchant pays us a referral
            commission. This commission comes <strong>at no additional cost to you</strong>.
            You pay the exact same retail price as any other direct customer.
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Editorial Independence Guarantee
          </h2>
          <p>
            Affiliate partnerships <strong>do not automatically determine our editorial conclusions</strong>.
            We evaluate products on their technical merits, safety certifications,
            and thermodynamic performance:
          </p>
          <ul className="space-y-2 pl-6 list-disc">
            <li>
              We routinely highlight severe drawbacks, noise limitations, or poor
              energy efficiency for products that offer commercial affiliate programs.
            </li>
            <li>
              We frequently recommend products, DIY maintenance practices, or energy-saving
              tactics that generate zero commission revenue.
            </li>
            <li>
              Merchants and manufacturers have no advance review privileges or approval
              rights over our articles before publication.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Technical Implementation of Referral Links
          </h2>
          <p>
            To protect reader security and prevent open redirects, our affiliate links
            route through a dedicated, server-side verified endpoint:
          </p>
          <div className="rounded bg-stone-50 p-3 font-mono text-xs text-stone-800 border border-stone-200">
            https://aircraftedhome.com/go/[brand-product]
          </div>
          <p className="pt-1">
            Every monetized link displayed to readers explicitly includes the search engine
            directive <code>rel=&quot;sponsored nofollow&quot;</code> in its HTML anchor tags.
            Our redirect route checks destination hostnames against a strict allowlist
            before issuing an HTTP 307 redirect.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm space-y-2 text-amber-900">
          <div className="flex items-center gap-2 font-serif font-bold text-base">
            <ShieldAlert className="h-5 w-5 text-amber-700" />
            <span>Questions Regarding Our Affiliate Relationships?</span>
          </div>
          <p>
            If you have questions about specific product links, merchant partnerships,
            or how our referral system operates, please reach out directly through our{" "}
            <Link href="/contact" className="underline font-semibold hover:text-amber-950">
              contact form
            </Link>{" "}
            or review our{" "}
            <Link href="/editorial-policy" className="underline font-semibold hover:text-amber-950">
              Editorial Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
