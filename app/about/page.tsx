import { Metadata } from "next";
import { AUTHOR_LIST } from "@/data/authors";
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
          <Target className="h-3.5 w-3.5 text-forest-700" />
          Our Mission
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Engineering the Perfect Indoor Climate
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          Air Crafted Home was founded on a simple premise: consumer home-comfort
          appliances are too often marketed with exaggerated cooling ratings,
          misleading noise claims, and obscure energy estimates. We exist to bring
          building-science clarity and thermodynamic accuracy to everyday homeowners
          and renters.
        </p>
      </header>

      {/* Core Principles */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Our Guiding Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <ShieldCheck className="h-6 w-6 text-forest-700" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Evidence Over Hype
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We prioritize federally standardized metrics (DOE SACC, AHAM CADR,
              ENERGY STAR CEER) over unverified manufacturer marketing claims.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <HeartHandshake className="h-6 w-6 text-forest-700" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Editorial Independence
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Affiliate partnerships never buy favorable recommendations or higher
              rankings. If an appliance has drawbacks, we state them plainly.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm space-y-2">
            <Award className="h-6 w-6 text-forest-700" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Transparent Math
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every operating cost calculation is published with explicit formulas,
              duty cycle factors, and US Energy Information Administration (EIA) data.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Our Editorial & Research Team
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Meet the engineers, environmental specialists, and energy analysts
            behind our guides.
          </p>
        </div>

        <div className="space-y-6">
          {AUTHOR_LIST.map((author) => (
            <div
              key={author.id}
              id={author.id}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="h-20 w-20 rounded-full object-cover border border-stone-200 shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {author.name}
                  </h3>
                  <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-full">
                    {author.experienceYears}+ Years Experience
                  </span>
                </div>
                <div className="text-xs font-medium text-stone-500">
                  {author.role} &middot; {author.credentials}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-2">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* US Residential Focus */}
      <section className="rounded-xl border border-stone-200 bg-stone-50/70 p-6 text-xs text-stone-600 leading-relaxed space-y-2">
        <h3 className="font-serif font-bold text-sm text-stone-900">
          Geographic and Technical Scope
        </h3>
        <p>
          Air Crafted Home is engineered specifically for the <strong>United States residential market</strong>.
          All electrical advice assumes 120-volt, 60-hertz branch circuits (15A or 20A breakers).
          Cooling capacities are expressed in US customary BTUs and DOE SACC ratings; room sizes
          are calculated in square feet; and utility costs reflect current US Energy Information
          Administration (EIA) state-by-state tariffs.
        </p>
      </section>
    </div>
  );
}
