import { Author } from "@/lib/types";

/**
 * Editorial Author Registry for Air Crafted Home.
 *
 * All fictional author profiles and sample credentials have been removed.
 * Genuine author profiles can be registered here as individual contributors join.
 */
export const DEFAULT_AUTHOR: Author = {
  id: "editorial-team",
  name: "Air Crafted Home Editorial Staff",
  role: "Climate Research & Technical Review Staff",
  bio: "Our editorial staff evaluates residential heating, cooling, airflow, and indoor air quality appliances against published US engineering and safety standards.",
};

export const AUTHORS: Record<string, Author> = {
  "editorial-team": DEFAULT_AUTHOR,
};

export const AUTHOR_LIST: Author[] = Object.values(AUTHORS);

export function getAuthorById(id?: string): Author {
  if (!id) return DEFAULT_AUTHOR;
  return AUTHORS[id] || DEFAULT_AUTHOR;
}
