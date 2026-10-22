import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";
import { ShieldCheck, FileCheck, CheckCircle2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Independence Standards | Air Crafted Home",
  description:
    "Our editorial principles: research standards, primary sourcing guidelines, conflict-of-interest policies, and transparent correction workflows.",
  alternates: {
    canonical: getCanonicalUrl("/editorial-policy"),
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbs = [{ name: "Editorial Policy", href: "/editorial-policy" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-2 border-black bg-stone-50 p-6 sm:p-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          <FileCheck className="h-3 w-3 text-forest-400" />
          <span>Editorial Independence</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
          Editorial Policy & Integrity Standards
        </h1>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal max-w-2xl">
          Air Crafted Home is committed to producing technical, evidence-based
          content that readers can trust with their homes, health, and budgets.
          Here are the non-negotiable rules governing our editorial output.
        </p>
      </header>

      <section className="space-y-4">
        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-base uppercase text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-forest-700" />
            <span>1. Separation of Editorial and Commercial Interests</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Our editorial staff does not receive compensation from manufacturers
            for favorable reviews, positive rankings, or product placements.
            Affiliate marketing links are added strictly after editorial conclusions
            and comparisons have been finalized. A manufacturer cannot purchase a
            spot on any &ldquo;Best Of&rdquo; list or influence our sizing formulas.
          </p>
        </div>

        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-base uppercase text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-forest-700" />
            <span>2. Primary Sourcing and Verification Standards</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We prioritize authoritative, verifiable primary sources:
          </p>
          <ul className="space-y-1.5 text-xs text-stone-600 pl-6 list-disc">
            <li>
              <strong>US Department of Energy (DOE)</strong>: Appliance standards, test procedures, and energy conservation regulations.
            </li>
            <li>
              <strong>Environmental Protection Agency (EPA)</strong>: Indoor air quality guidelines, radon mitigation, and ENERGY STAR criteria.
            </li>
            <li>
              <strong>Association of Home Appliance Manufacturers (AHAM)</strong>: Standardized CADR testing and room size certifications.
            </li>
            <li>
              <strong>Consumer Product Safety Commission (CPSC)</strong>: Space heater fire statistics, recall notices, and clearance standards.
            </li>
            <li>
              <strong>ASHRAE</strong>: Standards 55 (thermal comfort) and 62.2 (residential ventilation).
            </li>
          </ul>
        </div>

        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-base uppercase text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-forest-700" />
            <span>3. Accuracy and Corrections Policy</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            When factual errors, outdated specifications, or superseded regulatory
            standards are discovered, we correct the article promptly and document
            the date of modification. We welcome technical feedback, peer review,
            and reader verification.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Submit a technical correction or question &rarr;</span>
            </a>
          </div>
        </div>

        <div className="border border-stone-200 bg-white p-5 space-y-2">
          <h2 className="font-sans font-black text-base uppercase text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-forest-700" />
            <span>4. Real Author Identities and Byline Accountability</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Every published guide and review is attributed to an identified writer
            and technical reviewer with relevant engineering, environmental health,
            or energy auditing credentials. We do not use pseudonyms or AI-generated
            fictitious author personas.
          </p>
        </div>
      </section>
    </div>
  );
}
