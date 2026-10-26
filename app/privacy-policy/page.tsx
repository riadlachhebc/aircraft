import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Air Crafted Home",
  description:
    "Our privacy policy: how we collect, handle, and protect visitor information on Air Crafted Home.",
  alternates: {
    canonical: getCanonicalUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: "Privacy Policy", href: "/privacy-policy" }];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-b border-stone-200 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: October 18, 2026 &middot; Operational Domain: https://aircraftedhome.com
        </p>
      </header>

      <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            1. Overview & Commitment
          </h2>
          <p>
            Air Crafted Home (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
            respects the privacy of our visitors. This Privacy Policy outlines the
            minimal categories of information collected when you browse our website,
            use our interactive operating-cost calculators, or communicate with our
            editorial team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            2. Information We Do NOT Collect
          </h2>
          <p>
            We do not require user account registration, passwords, credit card
            numbers, or personal financial information. Our interactive Appliance
            Operating Cost Calculator runs purely client-side within your browser
            and does not store, transmit, or monetize your inputs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            3. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Direct Communications</strong>: When you submit an inquiry through
              our contact form, we collect your name, email address, and message contents
              solely to respond to your inquiry.
            </li>
            <li>
              <strong>Technical & Server Logs</strong>: Like most websites, our hosting
              infrastructure records standard HTTP request logs (IP addresses, browser
              user-agent strings, referral URLs, and timestamps) for network security,
              DDoS mitigation, and server maintenance.
            </li>
            <li>
              <strong>Analytics</strong>: If Google Analytics 4 (GA4) or an equivalent
              privacy-conscious analytics platform is enabled, anonymized aggregate usage
              data (pageviews, session durations, device types) is collected to help us
              improve article usability.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            4. Outbound Affiliate Links & Third-Party Cookies
          </h2>
          <p>
            When you click an outbound link to a merchant or manufacturer through our{" "}
            <code>/go/[brand-product]</code> redirect system, you will be redirected to
            the merchant&apos;s website. The third-party merchant may place a tracking
            cookie on your browser to record that you arrived via a referral from Air
            Crafted Home. Those interactions are governed exclusively by the respective
            merchant&apos;s privacy policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">
            5. Your Rights & Data Requests
          </h2>
          <p>
            Under state privacy laws such as the California Consumer Privacy Act (CCPA),
            residents have the right to request access to or deletion of any personal
            data held. Because we collect minimal personal data, inquiries can be directed
            to us via email at <a href="mailto:contact@aircraftedhome.com" className="underline font-semibold text-stone-900">contact@aircraftedhome.com</a> or
            through our <a href="/contact" className="underline font-semibold text-stone-900">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
