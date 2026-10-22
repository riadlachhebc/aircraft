import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { ArticleCard } from "@/components/ArticleCard";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { CATEGORY_LIST } from "@/data/categories";
import { getPublishedArticles } from "@/data/articles";
import { getPublishedProducts } from "@/data/products";
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
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const publishedArticles = getPublishedArticles();
  const publishedProducts = getPublishedProducts();

  const leadStory = publishedArticles[0];
  const spotlightStories = publishedArticles.slice(1, 4);
  const remainingArticles = publishedArticles.slice(4);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Masthead Lead Section */}
      <section className="border-b border-stone-200 bg-stone-50/50 pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {leadStory ? (
            /* Dynamic Magazine Lead Grid when published articles exist */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 group">
                <Link
                  href={`/${leadStory.categoryId}/${leadStory.slug}`}
                  className="block relative aspect-[16/9] w-full overflow-hidden bg-black"
                >
                  <SafeImage
                    src={leadStory.heroImage}
                    alt={leadStory.heroImageAlt}
                    categoryId={leadStory.categoryId}
                    priority={true}
                    className="transition duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-forest-700 text-white font-black text-xs uppercase tracking-wider px-2.5 py-1">
                      FEATURED GUIDE
                    </span>
                  </div>
                </Link>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                    <span className="text-forest-800">
                      {leadStory.categoryId.replace("-", " ").toUpperCase()}
                    </span>
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
                    {leadStory.metaDescription}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/${leadStory.categoryId}/${leadStory.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-black transition"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar Stack */}
              <div className="lg:col-span-4 space-y-6">
                {spotlightStories.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <h2 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-forest-700" />
                        <span>Recent Guides</span>
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {spotlightStories.map((story, idx) => (
                        <article key={story.slug} className="group flex gap-3 items-start">
                          <span className="font-mono text-xl font-black text-stone-300 group-hover:text-forest-700 shrink-0">
                            0{idx + 1}
                          </span>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                              {story.categoryId.replace("-", " ")}
                            </span>
                            <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-forest-800 leading-snug">
                              <Link href={`/${story.categoryId}/${story.slug}`}>
                                {story.title}
                              </Link>
                            </h3>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border border-stone-200 bg-white p-4">
                  <span className="block text-[11px] font-black uppercase tracking-wider text-stone-900 mb-2">
                    Search Climate Knowledge Base:
                  </span>
                  <SearchBox />
                </div>
              </div>
            </div>
          ) : (
            /* Clean Editorial Platform Launch Hero (When 0 articles published) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-stone-900 text-white font-black text-xs uppercase tracking-wider px-2.5 py-1">
                    EDITORIAL PLATFORM
                  </span>
                  <span className="bg-forest-800 text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1">
                    US RESIDENTIAL CLIMATE
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-black leading-tight tracking-tight">
                    Engineering the Perfect Indoor Climate for US Homes
                  </h1>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
                    Air Crafted Home is an independent research publication helping US homeowners
                    and apartment renters navigate residential heating, cooling, airflow, and indoor
                    air quality through evidence-based engineering, consensus standards, and
                    transparent operating-cost calculations.
                  </p>
                </div>

                {/* Intentional Launch Announcement Box */}
                <div className="border-l-4 border-black bg-white p-5 sm:p-6 border border-stone-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-forest-800 font-bold uppercase text-xs tracking-wider">
                    <BookOpen className="h-4 w-4" />
                    <span>Editorial Launch Status</span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-stone-900 leading-snug font-medium">
                    New guides and product comparisons are coming soon. Explore our climate
                    categories and practical home-energy tools while we prepare our first editorial guides.
                  </p>
                  <p className="text-xs text-stone-500 pt-1">
                    Every future review is grounded in federally certified metrics: DOE SACC cooling
                    capacities, ANSI/AHAM AC-1 CADR filtration, UL 1278 safety standards, and EIA electric tariffs.
                  </p>
                </div>

                {/* Fast Action Links */}
                <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-bold uppercase tracking-wider">
                  <Link
                    href="/air-conditioners"
                    className="border border-stone-900 bg-stone-900 text-white px-3.5 py-2 hover:bg-forest-800 hover:border-forest-800 transition"
                  >
                    Cooling Pillar &rarr;
                  </Link>
                  <Link
                    href="/heating"
                    className="border border-stone-300 bg-white text-stone-900 px-3.5 py-2 hover:border-black transition"
                  >
                    Heating Pillar &rarr;
                  </Link>
                  <Link
                    href="/fans-air-circulators"
                    className="border border-stone-300 bg-white text-stone-900 px-3.5 py-2 hover:border-black transition"
                  >
                    Fans &amp; Airflow &rarr;
                  </Link>
                  <Link
                    href="/air-quality"
                    className="border border-stone-300 bg-white text-stone-900 px-3.5 py-2 hover:border-black transition"
                  >
                    Air Quality &rarr;
                  </Link>
                  <Link
                    href="/energy-efficiency#calculator"
                    className="border border-forest-800 bg-forest-50 text-forest-900 px-3.5 py-2 hover:bg-forest-100 transition flex items-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-forest-700" />
                    <span>Operating Cost Simulator</span>
                  </Link>
                </div>
              </div>

              {/* Sidebar Quick Access */}
              <div className="lg:col-span-4 space-y-4">
                <div className="border border-stone-300 bg-white p-5 space-y-3">
                  <h2 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-stone-200 pb-2">
                    <Zap className="h-4 w-4 text-forest-700" />
                    <span>Knowledge Base Search</span>
                  </h2>
                  <p className="text-xs text-stone-600">
                    Search across climate pillars, engineering standards, and appliance categories:
                  </p>
                  <SearchBox />
                </div>

                <div className="border border-stone-200 bg-stone-100/60 p-4 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">
                    Referenced Consensus Standards
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                      <span>DOE SACC (10 CFR Part 430)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                      <span>ANSI/AHAM AC-1 CADR Standard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                      <span>ASHRAE Standard 55 Thermal Comfort</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-forest-700 shrink-0" />
                      <span>NEC NFPA 70 15A Residential Limits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Choose Your Climate Focus Split Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Primary Climate Disciplines
          </h2>
          <p className="font-sans font-black text-2xl uppercase tracking-tight text-black mt-0.5">
            Choose Your Climate Focus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journey A: Cooling & Airflow */}
          <div className="group relative aspect-[16/9] overflow-hidden border border-black bg-stone-900 flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="absolute inset-0 opacity-40 transition duration-500 group-hover:scale-105">
              <SafeImage
                src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80"
                alt="Air conditioning and airflow testing"
                categoryId="air-conditioners"
              />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="bg-forest-700 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                THERMODYNAMICS & AIRFLOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                Cooling &amp; Humidity Control
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
            <div className="absolute inset-0 opacity-40 transition duration-500 group-hover:scale-105">
              <SafeImage
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Residential warming and indoor air quality"
                categoryId="heating"
              />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                ZONE HEATING & FILTRATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                Heating &amp; Air Quality
              </h3>
              <p className="text-xs text-stone-300 max-w-md line-clamp-2">
                Safe 1,500W supplemental zone heating, radiant oil convection, True HEPA particulate filtration, and CADR room sizing.
              </p>
              <div className="pt-2">
                <Link
                  href="/heating"
                  className="inline-flex items-center gap-2 bg-stone-900 text-white border border-stone-600 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black transition"
                >
                  <span>Explore Heating Pillar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Air Crafted Lab — Appliance Operating Cost Calculator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            The Air Crafted Lab: Operating Cost Simulator
          </h2>
          <span className="text-xs font-mono font-bold text-stone-500">
            EIA 2026 RESIDENTIAL TARIFF BASELINES
          </span>
        </div>
        <CalculatorWidget />
      </section>

      {/* 4. Optional Remaining Published Guides (Only rendered when articles are published) */}
      {remainingArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">
              Published Editorial Guides
            </h2>
            <Link
              href="/buying-guides"
              className="bg-forest-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-black transition"
            >
              SEE ALL GUIDES
            </Link>
          </div>

          <div className="space-y-4">
            {remainingArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} layout="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* 5. Optional Verified Product Spec Sheets (Only rendered when products are published) */}
      {publishedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">
              Verified Product Spec Sheets
            </h2>
            <Link
              href="/reviews"
              className="bg-forest-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-black transition"
            >
              VIEW ALL REVIEWS
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedProducts.map((prod) => (
              <ProductCard key={prod.slug} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Editorial Standards & Independence Banner */}
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
                  Our Evaluation Methodology &rarr;
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
              <div className="h-44 w-44 rounded-full border-4 border-dashed border-forest-500 flex flex-col items-center justify-center p-4 text-center bg-stone-800/80">
                <Award className="h-8 w-8 text-forest-400 mb-1" />
                <span className="font-sans font-black text-xs uppercase tracking-wider text-white">
                  AIR CRAFTED
                </span>
                <span className="font-mono text-[9px] font-bold text-forest-400 uppercase tracking-widest">
                  BENCH RESEARCH
                </span>
                <span className="text-[8px] text-stone-400 mt-1 uppercase tracking-tight">
                  DOE &bull; AHAM &bull; EPA &bull; ASHRAE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Browse All 5 Climate Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="editorial-section-header">
          <h2 className="editorial-section-title">
            Explore Our Climate Categories
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
