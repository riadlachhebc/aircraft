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
      className={`inline-flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold transition shadow-sm ${
        isPrimary
          ? "bg-forest-800 text-white hover:bg-forest-900 focus-visible:ring-forest-800"
          : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 hover:border-stone-400"
      } ${className}`}
      aria-label={`Check price and availability for ${productName} on ${merchant} (opens retailer website)`}
    >
      <span className="flex items-center gap-1.5">
        <span>Check Price on {merchant}</span>
        {price !== undefined && (
          <span className="text-xs font-normal opacity-90">
            (~${price})
          </span>
        )}
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />
    </a>
  );
}
