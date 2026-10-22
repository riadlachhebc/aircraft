"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/air-conditioners", label: "Air Conditioners" },
  { href: "/heating", label: "Heating" },
  { href: "/fans-air-circulators", label: "Fans & Airflow" },
  { href: "/air-quality", label: "Air Quality" },
  { href: "/energy-efficiency", label: "Energy & Costs" },
  { href: "/buying-guides", label: "Buying Guides" },
  { href: "/reviews", label: "Reviews" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-1 text-[13.5px] font-medium text-stone-700"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2.5 py-1.5 transition-colors ${
                  isActive
                    ? "bg-forest-700/10 text-forest-800 font-semibold"
                    : "hover:bg-stone-200/60 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Search & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm transition hover:border-forest-600 hover:text-forest-800"
            aria-label="Search articles and reviews"
          >
            <Search className="h-3.5 w-3.5 text-stone-500" aria-hidden="true" />
            <span className="hidden sm:inline">Search site...</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex xl:hidden items-center justify-center rounded-md p-2 text-stone-700 hover:bg-stone-200/60 focus:outline-none focus:ring-2 focus:ring-forest-700"
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
          className="xl:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-6 shadow-lg"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col space-y-1"
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
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-forest-50 text-forest-800 font-semibold"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-stone-100">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800"
              >
                About Our Mission
              </Link>
              <Link
                href="/how-we-test"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800"
              >
                How We Test & Research
              </Link>
              <Link
                href="/affiliate-disclosure"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800"
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
