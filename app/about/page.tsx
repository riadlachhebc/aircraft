import { Metadata } from "next";
import { AUTHOR_LIST } from "@/data/authors";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorAvatar } from "@/components/AuthorAvatar";
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

      {/* Editorial Team */}
      <section className="space-y-4">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">Our Editorial & Research Team</h2>
        </div>

        <div className="space-y-4">
          {AUTHOR_LIST.map((author) => (
            <div
              key={author.id}
              id={author.id}
              className="border border-stone-300 bg-white p-5 flex flex-col sm:flex-row gap-4 items-start"
            >
              <AuthorAvatar
                src={author.avatarUrl}
                name={author.name}
                size="lg"
              />
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-sans font-black text-base uppercase text-black">
                    {author.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2 py-0.5 border border-forest-200">
                    {author.experienceYears}+ Years Experience
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {author.role} &middot; {author.credentials}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
