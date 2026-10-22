import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateNotice({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      aria-label="Editorial and affiliate disclosure"
      className={`rounded-lg border border-amber-200/80 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-950 mb-0.5">
            Editorial Transparency & Affiliate Notice
          </p>
          <p>
            Air Crafted Home may earn a commission when you purchase through links
            on this site, at no additional cost to you. Affiliate relationships do
            not automatically determine our editorial conclusions. Our recommendations
            are strictly supported by physical evidence, building-science standards
            (DOE, AHAM, EPA), and transparent evaluation criteria.{" "}
            <Link
              href="/affiliate-disclosure"
              className="font-medium underline hover:text-amber-950"
            >
              Read our full disclosure
            </Link>{" "}
            and{" "}
            <Link
              href="/how-we-test"
              className="font-medium underline hover:text-amber-950"
            >
              evaluation methodology
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
