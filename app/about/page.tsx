import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";
import { ShieldCheck, Target, HeartHandshake, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us: Mission, Editorial Team & Standards | Air Crafted Home",
  description:
    "Learn about Air Crafted Home's mission to provide evidence-based residential climate engineering advice, thermodynamic research, and honest product reviews.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
};

export default function AboutPage() {
  const breadcrumbs = [{ name: "About Us", href: "/about" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          <Target className="h-3 w-3" />
          <span>Our Mission</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
          Engineering the Perfect Indoor Climate
        </h1>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
          Air Crafted Home was founded on a simple premise: consumer home-comfort
          appliances are too often marketed with exaggerated cooling ratings,
          misleading noise claims, and obscure energy estimates. We exist to bring
          building-science clarity and thermodynamic accuracy to everyday homeowners
          and renters.
        </p>
      </header>

      {/* Core Principles */}
      <section className="space-y-4">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">Our Guiding Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-stone-200 bg-white p-5 space-y-2">
            <ShieldCheck className="h-5 w-5 text-forest-700" />
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-black">
              Evidence Over Hype
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We prioritize federally standardized metrics (DOE SACC, AHAM CADR,
              ENERGY STAR CEER) over unverified manufacturer marketing claims.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5 space-y-2">
            <HeartHandshake className="h-5 w-5 text-forest-700" />
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-black">
              Editorial Independence
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Affiliate partnerships never buy favorable recommendations or higher
              rankings. If an appliance has drawbacks, we state them plainly.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5 space-y-2">
            <Award className="h-5 w-5 text-forest-700" />
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-black">
              Transparent Math
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every operating cost calculation is published with explicit formulas,
              duty cycle factors, and US Energy Information Administration (EIA) data.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Governance */}
      <section className="space-y-4">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">Editorial Governance & Operations</h2>
        </div>

        <div className="border border-stone-300 bg-white p-6 sm:p-8 space-y-3">
          <h3 className="font-sans font-black text-lg uppercase tracking-tight text-black">
            Independent Research & Future Byline Transparency
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Air Crafted Home is an independent digital publication based in the United States.
            Our editorial staff evaluates residential heating, cooling, airflow, and indoor air
            quality appliances against published US engineering and safety standards (including
            DOE SACC 10 CFR § 430, ANSI/AHAM AC-1, ASHRAE 55, and UL 1278).
          </p>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            We do not employ synthetic pseudonyms or AI personas. As our editorial roster
            expands, individual author profiles with verifiable building science, HVAC, or
            energy auditing credentials will be published directly alongside signed research guides.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
            <a
              href="/how-we-test"
              className="text-forest-800 hover:text-black underline"
            >
              Read our evaluation framework &rarr;
            </a>
            <a
              href="/editorial-policy"
              className="text-forest-800 hover:text-black underline"
            >
              Review our editorial policy &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
