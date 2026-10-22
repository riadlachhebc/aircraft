import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { ArticleCard } from "@/components/ArticleCard";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LIST } from "@/data/categories";
import { ARTICLE_LIST } from "@/data/articles";
import { PRODUCT_LIST } from "@/data/products";
import {
  Wind,
  Flame,
  Fan,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Scale,
  Bed,
  Building,
  Briefcase,
  Layers,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "air-conditioners": <Wind className="h-6 w-6 text-emerald-700" />,
  heating: <Flame className="h-6 w-6 text-amber-700" />,
  "fans-air-circulators": <Fan className="h-6 w-6 text-teal-700" />,
  "air-quality": <Sparkles className="h-6 w-6 text-emerald-800" />,
  "energy-efficiency": <Zap className="h-6 w-6 text-amber-800" />,
};

export default function HomePage() {
  const featuredArticles = ARTICLE_LIST.filter((a) => a.isFeatured).slice(0, 4);
  const recentArticles = ARTICLE_LIST.slice(4, 8);
  const featuredProducts = PRODUCT_LIST.slice(0, 2);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-100/70 via-stone-50 to-[#FAF9F6] pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50/80 px-3.5 py-1 text-xs font-semibold text-forest-800">
                <ShieldCheck className="h-4 w-4 text-forest-700" aria-hidden="true" />
                Evidence-Based Climate Engineering
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Create a More Comfortable Home,{" "}
                <span className="text-forest-800 italic">Room by Room.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Independent research, practical buying guides, and transparent
                energy-cost breakdowns to help US homeowners and renters choose
                better heating, cooling, and indoor-air-quality solutions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/buying-guides"
                  className="rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-forest-900 focus-visible:ring-2 focus-visible:ring-forest-800 transition"
                >
                  Explore Buying Guides
                </Link>
                <Link
                  href="#calculator"
                  className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition"
                >
                  Calculate Running Costs
                </Link>
              </div>

              {/* Research Transparency Notice */}
              <div className="flex items-center gap-3 pt-2 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-forest-700" />
                  DOE SACC Ratings
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-forest-700" />
                  AHAM Verified CADR
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-forest-700" />
                  Zero Sponsored Rankings
                </span>
              </div>
            </div>

            {/* Hero Image / Editorial Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
                  alt="Naturally illuminated modern home interior with balanced temperature and clean airflow"
                  className="h-[380px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                    The Science of Home Comfort
                  </span>
                  <p className="text-sm font-serif font-medium mt-1">
                    Matching appliance capacity to room volume, thermal insulation, and airflow physics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent Search Bar */}
          <div className="mt-12 max-w-3xl">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* 2. Core Category Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Topical Authority Pillars
            </h2>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Explore Home Climate Categories
            </p>
          </div>
          <p className="text-xs text-stone-500 mt-2 md:mt-0 max-w-md">
            All guides adhere to official US building codes, DOE energy test procedures, and AHAM air quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_LIST.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex flex-col rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-forest-600/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-stone-50 border border-stone-100 group-hover:bg-forest-50 transition-colors">
                {CATEGORY_ICONS[cat.id]}
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-forest-800 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-xs text-stone-600 line-clamp-3 flex-1 leading-relaxed">
                {cat.shortDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-forest-800 group-hover:translate-x-0.5 transition-transform">
                <span>View Category</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "Start With Your Room" Problem-Based Navigation */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200/90 bg-stone-100/70 p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Problem-Based Navigation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Start With Your Specific Room
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Every room has unique thermal loads, acoustics, and air exchange requirements. Select your space:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Link
              href="/air-conditioners/how-to-choose-portable-air-conditioner-room-size"
              className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-forest-600 transition"
            >
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 mb-1">
                <Bed className="h-4 w-4 text-forest-700" />
                <span>Bedroom Climate</span>
              </div>
              <p className="text-xs text-stone-600">
                Quiet operation under 40 dBA, dark-display filters, and night zone cooling.
              </p>
            </Link>

            <Link
              href="/fans-air-circulators/how-to-improve-bedroom-airflow-without-replacing-hvac"
              className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-forest-600 transition"
            >
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 mb-1">
                <Briefcase className="h-4 w-4 text-forest-700" />
                <span>Home Office Comfort</span>
              </div>
              <p className="text-xs text-stone-600">
                Eliminating stagnant desk zones and managing PC electronics heat loads.
              </p>
            </Link>

            <Link
              href="/air-conditioners/single-hose-vs-dual-hose-portable-air-conditioners"
              className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-forest-600 transition"
            >
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 mb-1">
                <Building className="h-4 w-4 text-forest-700" />
                <span>Renter Apartment</span>
              </div>
              <p className="text-xs text-stone-600">
                Non-permanent installations where window AC units are prohibited.
              </p>
            </Link>

            <Link
              href="/heating/space-heater-vs-central-heating"
              className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-forest-600 transition"
            >
              <div className="flex items-center gap-2 font-serif font-bold text-stone-900 mb-1">
                <Layers className="h-4 w-4 text-forest-700" />
                <span>Zone Heating</span>
              </div>
              <p className="text-xs text-stone-600">
                Lowering whole-house central thermostats while warming occupied rooms.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured In-Depth Buying Guides */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              In-Depth Analysis
            </h2>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Featured Editorial Guides
            </p>
          </div>
          <Link
            href="/buying-guides"
            className="mt-3 md:mt-0 text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>View All Buying Guides</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* 5. Operating Cost Calculator Interactive Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CalculatorWidget />
      </section>

      {/* 6. Selected Verified Product Specification Sheets */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Verified Technical Data
            </h2>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Product Analysis & Specification Sheets
            </p>
          </div>
          <Link
            href="/reviews"
            className="mt-3 md:mt-0 text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>Browse All Product Reviews</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.slug} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. How We Evaluate Products & Claims (Editorial Trust) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest-800">
                Editorial Independence & Integrity
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                How We Research, Calculate, and Evaluate
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                At Air Crafted Home, we do not invent laboratory tests or fabricate
                review scores. Our evaluations are grounded in thermodynamic principles,
                building science research, and transparent calculations. We distinguish
                advertised marketing claims from verified consensus standards (such as
                DOE SACC cooling ratings and AHAM verified CADR scores).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="rounded-lg bg-stone-50 p-3 border border-stone-200/80">
                  <Scale className="h-4 w-4 text-forest-700 mb-1" />
                  <div className="font-bold text-stone-900">Zero Paid Rankings</div>
                  <div className="text-stone-500 mt-0.5">
                    Affiliate partnerships never determine editorial conclusions.
                  </div>
                </div>
                <div className="rounded-lg bg-stone-50 p-3 border border-stone-200/80">
                  <ShieldCheck className="h-4 w-4 text-forest-700 mb-1" />
                  <div className="font-bold text-stone-900">Traceable Data</div>
                  <div className="text-stone-500 mt-0.5">
                    Every quantitative spec links to manufacturer or federal sources.
                  </div>
                </div>
                <div className="rounded-lg bg-stone-50 p-3 border border-stone-200/80">
                  <HelpCircle className="h-4 w-4 text-forest-700 mb-1" />
                  <div className="font-bold text-stone-900">Transparent Limits</div>
                  <div className="text-stone-500 mt-0.5">
                    We clearly document assumptions, circuit limits, and exceptions.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/how-we-test"
                className="rounded-lg bg-forest-800 px-5 py-3 text-center text-xs font-semibold text-white shadow-sm hover:bg-forest-900 transition"
              >
                Read Evaluation Methodology
              </Link>
              <Link
                href="/editorial-policy"
                className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-center text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-50 transition"
              >
                Our Editorial Policy
              </Link>
              <Link
                href="/affiliate-disclosure"
                className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-3 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
              >
                Affiliate Disclosure Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Recently Published & Updated Articles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-forest-800">
              Latest Research
            </h2>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Recently Updated Articles
            </p>
          </div>
          <Link
            href="/buying-guides"
            className="mt-3 md:mt-0 text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>Browse Full Editorial Library &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
