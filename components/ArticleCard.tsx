import Link from "next/link";
import { Article } from "@/lib/types";
import { CATEGORIES } from "@/data/categories";
import { SafeImage } from "./SafeImage";
import { Clock } from "lucide-react";

export function ArticleCard({
  article,
  layout = "grid",
}: {
  article: Article;
  layout?: "grid" | "horizontal";
}) {
  const category = CATEGORIES[article.categoryId];

  if (layout === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-4 border-b border-stone-200 pb-5 hover:bg-stone-50/60 p-2 transition">
        {/* Thumbnail */}
        <Link
          href={`/${article.categoryId}/${article.slug}`}
          className="relative aspect-[16/10] sm:w-56 shrink-0 overflow-hidden bg-stone-100"
        >
          <SafeImage
            src={article.heroImage}
            alt={article.heroImageAlt}
            categoryId={article.categoryId}
            className="transition duration-300 group-hover:scale-105"
          />
          <span className="absolute top-2 left-2 z-10 bg-stone-900 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
            {category?.name || article.categoryId}
          </span>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            <span className="text-forest-700">{category?.name}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 font-normal">
              <Clock className="h-3 w-3" />
              {article.readTimeMinutes} MIN READ
            </span>
          </div>

          <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 leading-snug group-hover:text-forest-700 transition-colors">
            <Link href={`/${article.categoryId}/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {article.metaDescription}
          </p>

          <div className="mt-2.5 text-[11px] text-stone-500 font-medium">
            Updated {article.updatedAt}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col border border-stone-200 bg-white hover:border-black transition duration-200">
      {/* Thumbnail */}
      <Link
        href={`/${article.categoryId}/${article.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100"
      >
        <SafeImage
          src={article.heroImage}
          alt={article.heroImageAlt}
          categoryId={article.categoryId}
          className="transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-stone-900/90 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
            {category?.name || article.categoryId}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
          <span className="text-forest-700">{category?.name}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 font-normal">
            <Clock className="h-3 w-3" />
            {article.readTimeMinutes} min
          </span>
        </div>

        <h3 className="font-sans font-bold text-base text-stone-900 leading-snug group-hover:text-forest-700 transition-colors">
          <Link href={`/${article.categoryId}/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed flex-1">
          {article.metaDescription}
        </p>

        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-semibold text-stone-400">
            {article.updatedAt}
          </span>
          <span className="font-bold text-[11px] uppercase tracking-wider text-forest-800 group-hover:text-black transition-colors">
            Read Guide &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
