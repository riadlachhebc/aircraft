import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import { CATEGORY_LIST } from "@/data/categories";
import { ARTICLE_LIST } from "@/data/articles";
import { PRODUCT_LIST } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;

  // Static institutional and primary index routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/buying-guides`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-we-test`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Category Pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_LIST.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date("2026-10-18"),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Article Pages
  const articleRoutes: MetadataRoute.Sitemap = ARTICLE_LIST.map((art) => ({
    url: `${baseUrl}/${art.categoryId}/${art.slug}`,
    lastModified: new Date(art.updatedAt),
    changeFrequency: "monthly",
    priority: art.isFeatured ? 0.9 : 0.8,
  }));

  // Product Review Pages
  const productRoutes: MetadataRoute.Sitemap = PRODUCT_LIST.map((prod) => ({
    url: `${baseUrl}/reviews/${prod.slug}`,
    lastModified: new Date(prod.priceVerifiedDate),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...productRoutes];
}
