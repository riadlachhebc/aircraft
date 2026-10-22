import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use | Air Crafted Home",
  description:
    "Terms of use and legal disclaimers governing the use of Air Crafted Home.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
};

export default function TermsPage() {
  const breadcrumbs = [{ name: "Terms of Use", href: "/terms" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-b border-stone-200 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Terms of Use
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: October 18, 2026 &middot; Operational Domain: https://aircraftedhome.com
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Air Crafted Home (https://aircraftedhome.com), you
            agree to be bound by these Terms of Use and all applicable federal, state,
            and local laws. If you do not agree with any part of these terms, please do
            not use this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            2. Informational & Educational Purposes Only
          </h2>
          <p>
            All content, calculations, estimates, sizing charts, and product analyses
            published on Air Crafted Home are provided for general educational and
            informational purposes only. Nothing on this website constitutes professional
            HVAC engineering advice, licensed electrical contracting, architectural
            certifications, or formal safety audits.
          </p>
          <p>
            Always consult a licensed HVAC contractor or qualified master electrician
            before undertaking modifications to your home&apos;s electrical panel, ductwork,
            gas lines, or structural envelope.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            3. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p>
            While we strive for technical accuracy and verify specifications against
            official Department of Energy (DOE) and Association of Home Appliance
            Manufacturers (AHAM) records, we make no representations or warranties
            of any kind, express or implied, regarding completeness, operational
            safety, price accuracy, or fitness for a particular purpose.
          </p>
          <p>
            Air Crafted Home, its contributors, and operators shall not be liable for
            any direct, indirect, incidental, or consequential damages resulting from
            the use of, or inability to use, materials or tools provided on this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            4. Intellectual Property
          </h2>
          <p>
            All text, diagrams, original calculator implementations, editorial layouts,
            and brand marks appearing on this site are the property of Air Crafted Home
            and are protected by copyright and intellectual property laws. Reproduction
            or scraping for commercial republishing without express written consent is
            prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            5. Governing Law
          </h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with
            the laws of the United States and the State in which our operations are
            based, without giving effect to conflict-of-law principles.
          </p>
        </section>
      </div>
    </div>
  );
}
