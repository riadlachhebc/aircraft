import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateNotice({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      aria-label="Editorial and affiliate disclosure"
      className={`border border-stone-300 bg-stone-50 p-4 text-xs text-stone-700 leading-relaxed ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="h-4 w-4 shrink-0 text-stone-800 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold uppercase tracking-wider text-[10.5px] text-stone-900 mb-0.5">
            Editorial Transparency & Affiliate Disclosure
          </p>
          <p className="text-[11.5px] text-stone-600">
            Air Crafted Home may earn a commission when you purchase through links
            on this site, at no additional cost to you. Affiliate relationships do
            not automatically determine our editorial conclusions. Our recommendations
            are strictly supported by physical evidence, building-science standards
            (DOE, AHAM, EPA), and transparent evaluation criteria.{" "}
            <Link
              href="/affiliate-disclosure"
              className="font-bold underline text-black hover:text-forest-800"
            >
              Read full disclosure
            </Link>{" "}
            and{" "}
            <Link
              href="/how-we-test"
              className="font-bold underline text-black hover:text-forest-800"
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
