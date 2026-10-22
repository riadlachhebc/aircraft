import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { ArticleCard } from "@/components/ArticleCard";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LIST } from "@/data/categories";
import { ARTICLE_LIST, ARTICLES } from "@/data/articles";
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
  Clock,
  Layers,
  ChevronRight,
  Award,
} from "lucide-react";

export default function HomePage() {
  const leadStory = ARTICLES["how-to-choose-portable-air-conditioner-room-size"];
  const spotlightStories = [
    ARTICLES["single-hose-vs-dual-hose-portable-air-conditioners"],
    ARTICLES["space-heater-vs-central-heating"],
    ARTICLES["tower-fan-vs-air-circulator"],
  ].filter(Boolean);

  const horizontalGuides = [
    ARTICLES["how-much-does-it-cost-to-run-portable-air-conditioner"],
    ARTICLES["how-to-choose-air-purifier-room-size-cadr"],
    ARTICLES["how-to-calculate-electricity-cost-appliance"],
    ARTICLES["how-to-improve-bedroom-airflow-without-replacing-hvac"],
  ].filter(Boolean);

  const featuredGear = PRODUCT_LIST.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Asymmetric Magazine Lead Grid (Inspired by GearJunkie & Man of Many) */}
      <section className="border-b border-stone-200 bg-stone-50/50 pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Lead Feature (8 Cols) */}
            <div className="lg:col-span-8 group">
              <Link
                href={`/${leadStory.categoryId}/${leadStory.slug}`}
                className="block relative aspect-[16/9] w-full overflow-hidden bg-black"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={leadStory.heroImage}
                  alt={leadStory.heroImageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-forest-700 text-white font-black text-xs uppercase tracking-wider px-2.5 py-1">
                    FEATURED INVESTIGATION
                  </span>
                  <span className="bg-black text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1">
                    DOE SACC STANDARDS
                  </span>
                </div>
              </Link>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                  <span className="text-forest-800">AIR CONDITIONERS</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 font-normal">
                    <Clock className="h-3 w-3" />
                    {leadStory.readTimeMinutes} MIN READ
                  </span>
                  <span>&bull;</span>
                  <span>UPDATED {leadStory.updatedAt}</span>
                </div>

                <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-tight group-hover:text-forest-800 transition-colors tracking-tight">
                  <Link href={`/${leadStory.categoryId}/${leadStory.slug}`}>
                    {leadStory.title}
                  </Link>
                </h1>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed line-clamp-3">
                  {leadStory.metaDescription} Older ASHRAE ratings exaggerate real cooling
                  capacity by up to 35% because single-hose exhausts create negative air
                  pressure that pulls hot outside air indoors. Here is how to size portable
                  AC units using federally mandated DOE SACC metrics.
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-black">
                  <span className="text-forest-800 underline">Read Full Sizing Guide &rarr;</span>
                </div>
              </div>
            </div>

            {/* Spotlight Sidebar Stack (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-forest-700" />
                  <span>Editor&apos;s Spotlight</span>
                </h2>
                <span className="text-[10px] font-bold uppercase text-stone-400">
                  BUILDING SCIENCE
                </span>
              </div>

              <div className="space-y-5">
                {spotlightStories.map((story, idx) => (
                  <article key={story.slug} className="group flex gap-3.5 items-start">
                    <span className="font-mono text-2xl font-black text-stone-300 group-hover:text-forest-700 shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                        {story.categoryId.toUpperCase().replace("-", " ")}
                      </span>
                      <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-forest-800 leading-snug">
                        <Link href={`/${story.categoryId}/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h3>
                      <div className="text-[11px] text-stone-500 font-medium">
                        {story.readTimeMinutes} min read &middot; {story.updatedAt}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Quick Search Drawer */}
              <div className="border border-stone-200 bg-white p-4">
                <span className="block text-[11px] font-black uppercase tracking-wider text-stone-900 mb-2">
                  Search Climate Knowledge Base:
                </span>
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Daily Spotlight" Bullet Ticker (Inspired by Image 3 GearJunkie) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-black bg-stone-900 text-white p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-forest-600 text-white font-black text-xs uppercase tracking-wider px-2 py-1">
                DAILY SPOTLIGHT
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 hidden sm:inline">
                CRITICAL BUILDING STANDARDS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="border-l-2 border-forest-500 pl-3">
                <strong className="block text-white font-bold">DOE SACC Benchmark</strong>
                <span className="text-stone-300 text-[11.5px]">
                  Never buy portable ACs by ASHRAE ratings. SACC accounts for infiltration drafts.
                </span>
              </div>
              <div className="border-l-2 border-amber-500 pl-3">
                <strong className="block text-white font-bold">1,500W Circuit Limit</strong>
                <span className="text-stone-300 text-[11.5px]">
                  Space heaters draw 12.5A. Never use power strips or light extension cords.
                </span>
              </div>
              <div className="border-l-2 border-forest-500 pl-3">
                <strong className="block text-white font-bold">AHAM 2/3 Rule</strong>
                <span className="text-stone-300 text-[11.5px]">
                  Smoke CADR must equal at least 67% of floor square footage.
                </span>
              </div>
              <div className="border-l-2 border-teal-500 pl-3">
                <strong className="block text-white font-bold">Closed Door Airflow</strong>
                <span className="text-stone-300 text-[11.5px]">
                  Closed bedroom doors without returns cut HVAC supply by up to 35%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Choose Your Journey" Split Feature (Inspired by GearJunkie Image 3) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
            START YOUR COMFORT JOURNEY
          </h2>
          <p className="font-sans font-black text-2xl uppercase tracking-tight text-black mt-0.5">
            Choose Your Climate Focus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journey A: Cooling & Airflow */}
          <div className="group relative aspect-[16/9] overflow-hidden border border-black bg-stone-900 flex flex-col justify-end p-6 sm:p-8 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80"
              alt="Air conditioning and airflow testing"
              className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 space-y-2">
              <span className="bg-forest-700 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                THERMODYNAMICS & AIRFLOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                Cooling & Humidity Control
              </h3>
              <p className="text-xs text-stone-300 max-w-md line-clamp-2">
                Dual-hose portable ACs, DOE SACC capacity formulas, inverter compressor modulation, and whole-room vortex circulation.
              </p>
              <div className="pt-2">
                <Link
                  href="/air-conditioners"
                  className="inline-flex items-center gap-2 bg-forest-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-forest-600 transition"
                >
                  <span>Explore Cooling Pillar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Journey B: Heating & Indoor Air Quality */}
          <div className="group relative aspect-[16/9] overflow-hidden border border-black bg-stone-900 flex flex-col justify-end p-6 sm:p-8 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
              alt="Residential warming and indoor air quality"
              className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 space-y-2">
              <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                ZONE HEATING & FILTRATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                Heating & Air Quality
              </h3>
              <p className="text-xs text-stone-300 max-w-md line-clamp-2">
                Supplemental electric radiator economics, 120V 15A branch safety, True HEPA CADR sizing, and PM2.5 dander filtration.
              </p>
              <div className="pt-2">
                <Link
                  href="/heating"
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-amber-500 transition"
                >
                  <span>Explore Heating & IAQ</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Stories / Editorial Field Guides (Wirecutter / GearJunkie Horizontal List) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Latest Editorial Field Guides
          </h2>
          <Link
            href="/buying-guides"
            className="bg-forest-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-black transition"
          >
            SEE ALL GUIDES
          </Link>
        </div>

        <div className="space-y-4">
          {horizontalGuides.map((article) => (
            <ArticleCard key={article.slug} article={article} layout="horizontal" />
          ))}
        </div>
      </section>

      {/* 5. The Air Crafted Lab — Appliance Operating Cost Calculator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            The Air Crafted Lab: Operating Cost Simulator
          </h2>
          <span className="text-xs font-mono font-bold text-stone-500">
            EIA 2026 TARIFF DATA
          </span>
        </div>
        <CalculatorWidget />
      </section>

      {/* 6. Trending Gear & Verified Spec Sheets (Inspired by GearJunkie Trending Gear) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Trending Tested Gear & Spec Sheets
          </h2>
          <Link
            href="/reviews"
            className="bg-forest-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-black transition"
          >
            VIEW ALL REVIEWS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGear.map((prod) => (
            <ProductCard key={prod.slug} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. Editorial Trust Stamp & Authority Banner (Inspired by Image 3 GearJunkie Green Seal) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-black bg-stone-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-forest-600 text-white font-black text-[10px] tracking-widest uppercase px-2 py-0.5">
                EDITORIAL INDEPENDENCE GUARANTEE
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                We deliver evidence-based reviews, expert knowledge, and curated calculations that give readers the confidence to engineer a better home.
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                Every rating is grounded in physical building science, Department of Energy (DOE) test procedures, and AHAM standards. We never accept sponsored product placements or invent laboratory credentials.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
                <Link
                  href="/how-we-test"
                  className="bg-white text-black px-4 py-2 hover:bg-forest-400 transition"
                >
                  Our Testing Methodology &rarr;
                </Link>
                <Link
                  href="/editorial-policy"
                  className="border border-stone-600 text-stone-300 px-4 py-2 hover:border-white hover:text-white transition"
                >
                  Editorial Policy
                </Link>
                <Link
                  href="/affiliate-disclosure"
                  className="border border-stone-600 text-amber-400 px-4 py-2 hover:border-amber-400 transition"
                >
                  Affiliate Disclosure
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              {/* Graphic Editorial Seal */}
              <div className="h-44 w-44 rounded-full border-4 border-dashed border-forest-500 flex flex-col items-center justify-center p-4 text-center bg-stone-800/80">
                <Award className="h-8 w-8 text-forest-400 mb-1" />
                <span className="font-sans font-black text-xs uppercase tracking-wider text-white">
                  AIR CRAFTED
                </span>
                <span className="font-mono text-[9px] font-bold text-forest-400 uppercase tracking-widest">
                  LAB VERIFIED
                </span>
                <span className="text-[8px] text-stone-400 mt-1 uppercase tracking-tight">
                  DOE &bull; AHAM &bull; EPA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Browse by Climate Category Tiles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Browse All 5 Climate Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CATEGORY_LIST.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="border border-stone-300 bg-white p-4 hover:border-black hover:bg-stone-50 transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                  PILLAR
                </span>
                <h3 className="font-sans font-black text-sm uppercase tracking-tight text-black group-hover:text-forest-800 transition-colors mt-0.5">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                  {cat.shortDescription}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold uppercase text-stone-400 group-hover:text-black">
                <span>Explore</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
