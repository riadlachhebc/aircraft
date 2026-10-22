import Link from "next/link";
import { Article } from "@/lib/types";
import { CATEGORIES } from "@/data/categories";
import { Clock, Calendar } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  const category = CATEGORIES[article.categoryId];

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md hover:border-forest-600/40">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-stone-900/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {category?.name || article.categoryId}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {article.readTimeMinutes} min read
          </span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            Updated {article.updatedAt}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-forest-800 transition-colors">
          <Link href={`/${article.categoryId}/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed flex-1">
          {article.metaDescription}
        </p>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="font-medium text-forest-800 group-hover:underline">
            Read Guide &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
