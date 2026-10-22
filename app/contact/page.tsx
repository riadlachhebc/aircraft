import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { getCanonicalUrl } from "@/lib/seo";
import { Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Submit Corrections | Air Crafted Home",
  description:
    "Get in touch with the Air Crafted Home editorial team. Submit technical corrections, report specification discrepancies, or ask climate questions.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  const breadcrumbs = [{ name: "Contact Us", href: "/contact" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
          <Mail className="h-3.5 w-3.5 text-forest-700" />
          Editorial Inquiries
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Contact Air Crafted Home
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Have an engineering inquiry, a question about appliance sizing formulas,
          or a correction to report? We welcome communication from readers,
          researchers, and building science practitioners.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">
            Send an Editorial Message
          </h2>
          <ContactForm />
        </div>

        {/* Side Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 space-y-3 text-xs text-stone-600 leading-relaxed">
            <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-forest-700" />
              Response Horizon
            </h3>
            <p>
              We prioritize inquiries related to technical corrections and safety
              updates. Most messages receive an editorial response within 48 business hours.
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 space-y-3 text-xs text-stone-600 leading-relaxed">
            <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-forest-700" />
              Manufacturer Pitch Policy
            </h3>
            <p>
              We do not accept sponsored product placements or pre-written promotional
              articles. If you represent an HVAC or air treatment brand and wish to provide
              spec sheets or laboratory test certificates for review, please choose the
              &ldquo;Product Specification Discrepancy&rdquo; option.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
