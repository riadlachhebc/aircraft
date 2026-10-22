import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Air Crafted Home - Home Page"
    >
      {/* Editorial Geometric Emblem */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center font-black text-sm tracking-tighter ${
          isLight
            ? "bg-forest-600 text-white"
            : "bg-black text-white"
        }`}
        aria-hidden="true"
      >
        <span>AC</span>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xl font-black tracking-tighter uppercase font-sans ${
              isLight ? "text-white" : "text-black"
            }`}
          >
            AIR CRAFTED
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-1 py-0.5 ${
              isLight
                ? "bg-stone-800 text-stone-300"
                : "bg-forest-700 text-white"
            }`}
          >
            HOME
          </span>
        </div>
        <span
          className={`text-[9.5px] font-bold tracking-widest uppercase mt-0.5 ${
            isLight ? "text-stone-400" : "text-stone-500"
          }`}
        >
          INDOOR CLIMATE & GEAR LAB
        </span>
      </div>
    </Link>
  );
}
