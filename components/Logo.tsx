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
      className={`inline-flex items-center gap-2.5 font-serif font-bold tracking-tight transition-opacity hover:opacity-90 ${className}`}
      aria-label="Air Crafted Home - Home Page"
    >
      {/* Airflow Vortex Emblem */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isLight ? "bg-forest-600 text-white" : "bg-forest-700 text-emerald-100"
        } shadow-sm`}
        aria-hidden="true"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized airflow vortex streamlines */}
          <path d="M4 8h12a4 4 0 1 0-4-4" />
          <path d="M2 14h16a3 3 0 1 0-3-3" />
          <path d="M6 20h10a2 2 0 1 0-2-2" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`text-lg leading-tight font-serif ${
            isLight ? "text-white" : "text-slate-900"
          }`}
        >
          Air Crafted Home
        </span>
        <span
          className={`text-[10px] tracking-wider uppercase font-sans font-medium ${
            isLight ? "text-emerald-200" : "text-emerald-800"
          }`}
        >
          Climate & Comfort Engineering
        </span>
      </div>
    </Link>
  );
}
