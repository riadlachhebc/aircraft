import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";
import { ShieldCheck, Scale, Cpu, Search, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Test & Evaluate Home Comfort Appliances | Air Crafted Home",
  description:
    "Our research framework: how we verify appliance specifications, distinguish advertised claims from consensus standards, and calculate energy costs.",
  alternates: {
    canonical: getCanonicalUrl("/how-we-test"),
  },
};

export default function HowWeTestPage() {
  const breadcrumbs = [{ name: "How We Test", href: "/how-we-test" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
          <ShieldCheck className="h-3.5 w-3.5 text-forest-700" />
          Evaluation Methodology
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          How We Evaluate Products and Claims
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Air Crafted Home does not make fabricated claims of independent
          laboratory testing when research and consensus analysis have been conducted.
          Here is our transparent, repeatable evaluation framework.
        </p>
      </header>

      {/* 4 Pillars of Evaluation */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          The 4 Pillars of Our Technical Review Process
        </h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-stone-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-xs text-forest-800">
                1
              </span>
              <span>Primary Source Verification</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              We collect product data directly from manufacturer engineering
              specifications, Federal Trade Commission (FTC) EnergyGuide filings,
              and Department of Energy (DOE) compliance databases. We reject marketing
              summaries that omit exact model numbers or test standards.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-stone-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-xs text-forest-800">
                2
              </span>
              <span>Thermodynamic & Building Science Modeling</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              We analyze cooling and heating loads against physical building dynamics.
              For portable air conditioners, we examine infiltration heat penalties
              and duct radiant losses. For heaters, we model zone-heating savings against
              whole-house fuel consumption.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-stone-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-xs text-forest-800">
                3
              </span>
              <span>Acoustic and Usability Evaluation</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              A quiet appliance in a daytime lab test can be unacceptably loud next to
              a bed at 2:00 AM. We evaluate decibel ratings (dBA) in context, distinguishing
              between low-frequency compressor hums, motor vibration, and white-noise
              airflow.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-stone-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-xs text-forest-800">
                4
              </span>
              <span>Total Cost of Ownership (TCO)</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-9">
              An affordable appliance that consumes excessive electricity or requires
              expensive replacement filters quickly becomes costly. We factor in
              annual electrical draw, consumable filter costs, and expected lifespan.
            </p>
          </div>
        </div>
      </section>

      {/* Difference Between Firsthand Testing and Consensus Research */}
      <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-lg">
          <AlertTriangle className="h-5 w-5 text-amber-700" />
          <span>Research-Based Reviews vs. Firsthand Lab Testing</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          Unless explicitly documented with physical test dates, photographs, and
          serial numbers, our product specification reviews are <strong>research-based
          engineering analyses</strong>. We synthesize verified test data from certified
          bodies (AHAM, UL, ETL, DOE, EPA) and cross-reference multiple independent
          user datasets. We never invent five-star ratings, fake award logos, or
          simulated laboratory test results.
        </p>
      </section>

      {/* Price Verification Standards */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
        <h3 className="font-serif font-bold text-base text-stone-900">
          How Pricing and Retailer Availability Are Tracked
        </h3>
        <p>
          Prices listed across our reviews and specification sheets are verified
          manually against authorized retailer listings and manufacturer suggested
          retail prices (MSRP). Because retail pricing fluctuates based on seasonal
          promotions and inventory, each product card notes the exact date of price
          verification. We recommend verifying current retail prices directly on the
          merchant&apos;s site prior to making a purchasing decision.
        </p>
      </section>
    </div>
  );
}
