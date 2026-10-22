import { ExternalLink } from "lucide-react";

interface AffiliateButtonProps {
  slug: string;
  productName: string;
  merchant?: string;
  price?: number;
  className?: string;
  variant?: "primary" | "secondary";
}

export function AffiliateButton({
  slug,
  productName,
  merchant = "Verified Retailer",
  price,
  className = "",
  variant = "primary",
}: AffiliateButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={`/go/${slug}`}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-center justify-between gap-3 px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
        isPrimary
          ? "bg-forest-800 text-white hover:bg-black"
          : "border border-stone-300 bg-white text-stone-900 hover:border-black"
      } ${className}`}
      aria-label={`Check price and availability for ${productName} on ${merchant} (opens retailer website)`}
    >
      <span className="flex items-center gap-1.5">
        <span>Check Price on {merchant}</span>
        {price !== undefined && (
          <span className="font-mono text-[11px] opacity-90">
            (~${price})
          </span>
        )}
      </span>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
    </a>
  );
}
