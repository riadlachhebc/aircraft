"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Search, Menu, X, Zap, ArrowRight, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "/air-conditioners", label: "Air Conditioners" },
  { href: "/heating", label: "Heating" },
  { href: "/fans-air-circulators", label: "Fans & Airflow" },
  { href: "/air-quality", label: "Air Quality" },
  { href: "/energy-efficiency", label: "Energy & Costs" },
  { href: "/buying-guides", label: "Buying Guides" },
  { href: "/reviews", label: "Gear Reviews" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white">
      {/* 1. Top Magazine Ticker Bar */}
      <div className="hidden lg:block border-b border-stone-200 bg-stone-900 text-stone-200 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex items-center gap-3">
            <span className="bg-forest-600 text-white font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm">
              CLIMATE PILLARS
            </span>
            <div className="flex items-center gap-4 text-[11.5px] font-medium text-stone-300">
              <Link
                href="/air-conditioners"
                className="hover:text-white transition-colors"
              >
                Cooling &amp; SACC Ratings
              </Link>
              <span className="text-stone-600">&bull;</span>
              <Link
                href="/heating"
                className="hover:text-white transition-colors"
              >
                Heating &amp; 15A Electrical Limits
              </Link>
              <span className="text-stone-600">&bull;</span>
              <Link
                href="/fans-air-circulators"
                className="hover:text-white transition-colors"
              >
                Vortex Circulation &amp; Aerodynamics
              </Link>
              <span className="text-stone-600">&bull;</span>
              <Link
                href="/air-quality"
                className="hover:text-white transition-colors"
              >
                True HEPA &amp; CADR Filtration
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-stone-400">
            <Link
              href="/energy-efficiency#calculator"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
            >
              <Zap className="h-3 w-3" />
              <span>Cost Calculator</span>
            </Link>
            <span className="text-stone-700">|</span>
            <Link href="/how-we-test" className="hover:text-white">
              Evaluation Framework
            </Link>
            <span className="text-stone-700">|</span>
            <Link href="/editorial-policy" className="hover:text-white">
              Editorial Policy
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Editorial Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        <Logo />

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-0.5 text-xs font-black uppercase tracking-wider text-stone-800"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 transition-colors hover:text-forest-700 ${
                  isActive
                    ? "text-forest-800 font-black border-b-2 border-forest-700 -mb-px"
                    : "text-stone-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 sm:py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:border-black transition min-h-[44px] sm:min-h-0"
            aria-label="Search articles and reviews"
          >
            <Search className="h-3.5 w-3.5 text-stone-700" aria-hidden="true" />
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Search</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex xl:hidden items-center justify-center min-h-[44px] min-w-[44px] p-2 text-stone-800 hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="xl:hidden border-b border-stone-300 bg-white px-4 pt-3 pb-6 shadow-xl"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col space-y-2 text-sm font-bold uppercase tracking-wide"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-stone-100 py-2.5 ${
                    isActive
                      ? "text-forest-800 font-black pl-2 border-l-2 border-l-forest-800"
                      : "text-stone-900 hover:text-forest-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 text-xs normal-case tracking-normal text-stone-500 space-y-2 font-medium">
              <Link
                href="/energy-efficiency#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 font-bold text-forest-800"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Operating Cost Calculator</span>
              </Link>
              <Link
                href="/how-we-test"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                How We Test & Research
              </Link>
              <Link
                href="/affiliate-disclosure"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-amber-800 font-semibold"
              >
                Affiliate Disclosure
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
