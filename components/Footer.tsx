import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-black bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-stone-800">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Air Crafted Home is an independent editorial publication dedicated
              to helping US homeowners and apartment renters engineer the perfect
              indoor climate through thermodynamic research, transparent product
              comparisons, and verified energy-cost calculations.
            </p>
            <div className="text-[11px] font-mono text-stone-500">
              Primary Market: United States (120V / 60Hz, US Customary Units,
              DOE/EPA Standards)
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              Climate Categories
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/air-conditioners"
                  className="hover:text-white transition-colors"
                >
                  Air Conditioners
                </Link>
              </li>
              <li>
                <Link
                  href="/heating"
                  className="hover:text-white transition-colors"
                >
                  Residential Heating
                </Link>
              </li>
              <li>
                <Link
                  href="/fans-air-circulators"
                  className="hover:text-white transition-colors"
                >
                  Fans & Air Circulators
                </Link>
              </li>
              <li>
                <Link
                  href="/air-quality"
                  className="hover:text-white transition-colors"
                >
                  Indoor Air Quality
                </Link>
              </li>
              <li>
                <Link
                  href="/energy-efficiency"
                  className="hover:text-white transition-colors"
                >
                  Energy Efficiency
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Tools */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              Research & Tools
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/buying-guides"
                  className="hover:text-white transition-colors"
                >
                  All Buying Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-white transition-colors"
                >
                  Product Review Index
                </Link>
              </li>
              <li>
                <Link
                  href="/energy-efficiency#calculator"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
                >
                  Appliance Cost Simulator
                </Link>
              </li>
              <li>
                <Link
                  href="/how-we-test"
                  className="hover:text-white transition-colors"
                >
                  How We Test & Research
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial-policy"
                  className="hover:text-white transition-colors"
                >
                  Editorial Independence
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Affiliate Disclosure Footer Banner */}
        <div className="pt-8 text-[11px] text-stone-400 leading-relaxed">
          <p className="font-bold text-stone-200 uppercase tracking-wider text-[10px] mb-1">
            FTC Affiliate Disclosure Notice:
          </p>
          <p>
            Air Crafted Home participates in transparent affiliate referral programs.
            When you click links on this site and make a purchase, we may earn an
            affiliate commission at no additional cost to you. Affiliate partnerships
            never influence our technical calculations, thermodynamic formulas, or
            editorial conclusions. Every quantitative specification is verified
            against manufacturer data sheets, DOE standards, or AHAM certifications.
            See our full{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-white underline hover:text-stone-300"
            >
              Affiliate Disclosure
            </Link>{" "}
            and{" "}
            <Link
              href="/editorial-policy"
              className="text-white underline hover:text-stone-300"
            >
              Editorial Policy
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 border-t border-stone-900 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Air Crafted Home. All rights
            reserved. Domain: https://aircraftedhome.com
          </p>
          <p className="mt-2 sm:mt-0">
            Engineered for US residential climates &middot; English (US)
          </p>
        </div>
      </div>
    </footer>
  );
}
