import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";
import { ShieldCheck, AlertTriangle } from "lucide-react";

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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          <span>Evaluation Methodology</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
          How We Evaluate Products and Claims
        </h1>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal max-w-2xl">
          Air Crafted Home does not make fabricated claims of independent
          laboratory testing when research and consensus analysis have been conducted.
          Here is our transparent, repeatable evaluation framework.
        </p>
      </header>

      {/* 4 Pillars of Evaluation */}
      <section className="space-y-4">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            The 4 Pillars of Our Review Process
          </h2>
        </div>

        <div className="space-y-3">
          <div className="border border-stone-200 bg-white p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-sans font-black text-base uppercase text-black">
              <span className="flex h-6 w-6 items-center justify-center bg-black text-xs text-white">
                1
              </span>
              <span>Primary Source Verification</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
              We collect product data directly from manufacturer engineering
              specifications, Federal Trade Commission (FTC) EnergyGuide filings,
              and Department of Energy (DOE) compliance databases. We reject marketing
              summaries that omit exact model numbers or test standards.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-sans font-black text-base uppercase text-black">
              <span className="flex h-6 w-6 items-center justify-center bg-black text-xs text-white">
                2
              </span>
              <span>Thermodynamic & Building Science Modeling</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
              We analyze cooling and heating loads against physical building dynamics.
              For portable air conditioners, we examine infiltration heat penalties
              and duct radiant losses. For heaters, we model zone-heating savings against
              whole-house fuel consumption.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-sans font-black text-base uppercase text-black">
              <span className="flex h-6 w-6 items-center justify-center bg-black text-xs text-white">
                3
              </span>
              <span>Acoustic and Usability Evaluation</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
              A quiet appliance in a daytime lab test can be unacceptably loud next to
              a bed at 2:00 AM. We evaluate decibel ratings (dBA) in context, distinguishing
              between low-frequency compressor hums, motor vibration, and white-noise
              airflow.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-sans font-black text-base uppercase text-black">
              <span className="flex h-6 w-6 items-center justify-center bg-black text-xs text-white">
                4
              </span>
              <span>Total Cost of Ownership (TCO)</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-8">
              An affordable appliance that consumes excessive electricity or requires
              expensive replacement filters quickly becomes costly. We factor in
              annual electrical draw, consumable filter costs, and expected lifespan.
            </p>
          </div>
        </div>
      </section>

      {/* Difference Between Firsthand Testing and Consensus Research */}
      <section className="border border-amber-400 bg-amber-50/60 p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-950 font-sans font-black text-sm uppercase tracking-wider">
          <AlertTriangle className="h-4 w-4 text-amber-700" />
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
    </div>
  );
}
