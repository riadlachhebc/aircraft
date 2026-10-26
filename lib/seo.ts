import { Article, Product } from "./types";

export const SITE_CONFIG = {
  name: "Air Crafted Home",
  domain: "https://aircraftedhome.com",
  email: "contact@aircraftedhome.com",
  tagline: "Evidence-Based Indoor Climate & Home Comfort Engineering",
  description:
    "Independent research, thermodynamic product comparisons, and transparent operating-cost calculations for US heating, cooling, and indoor air quality.",
  market: "United States",
  language: "en-US",
  currency: "USD",
};

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // Standardize without trailing slash except root
  if (cleanPath === "/") return SITE_CONFIG.domain;
  const noTrailing = cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;
  return `${SITE_CONFIG.domain}${noTrailing}`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    email: SITE_CONFIG.email,
    logo: `${SITE_CONFIG.domain}/logo.png`,
    description: SITE_CONFIG.description,
    publishingPrinciples: `${SITE_CONFIG.domain}/editorial-policy`,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      contactType: "customer service and editorial inquiries",
      url: `${SITE_CONFIG.domain}/contact`,
    },
    knowsAbout: [
      "Residential Air Conditioning",
      "Heating & Thermodynamics",
      "Indoor Air Quality & HEPA Filtration",
      "Energy Efficiency Calculations",
      "Airflow Dynamics & Ventilation",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.domain}/#website`,
    url: SITE_CONFIG.domain,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.domain}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.domain}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleSchema(
  article: Article,
  authorName: string,
  primaryProduct?: Product
) {
  const canonical = getCanonicalUrl(`/${article.categoryId}/${article.slug}`);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": article.articleType === "review" && primaryProduct ? "Review" : "Article",
    "@id": `${canonical}/#${article.articleType === "review" ? "review" : "article"}`,
    isPartOf: {
      "@type": "WebPage",
      "@id": canonical,
      url: canonical,
      name: article.title,
    },
    headline: article.title,
    description: article.metaDescription,
    image: [
      article.heroImage.startsWith("http")
        ? article.heroImage
        : `${SITE_CONFIG.domain}${article.heroImage}`,
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "en-US",
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${SITE_CONFIG.domain}/about`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.domain}/#organization`,
    },
  };

  if (article.articleType === "review" && primaryProduct) {
    const productImage = primaryProduct.imageUrl
      ? (primaryProduct.imageUrl.startsWith("http")
          ? primaryProduct.imageUrl
          : `${SITE_CONFIG.domain}${primaryProduct.imageUrl}`)
      : (article.heroImage.startsWith("http")
          ? article.heroImage
          : `${SITE_CONFIG.domain}${article.heroImage}`);

    schema.itemReviewed = {
      "@type": "Product",
      name: primaryProduct.name,
      description: primaryProduct.bestFor || article.metaDescription,
      image: [productImage],
      brand: {
        "@type": "Brand",
        name: primaryProduct.brand || primaryProduct.manufacturer,
      },
      model: primaryProduct.modelNumber,
      ...(primaryProduct.approximateUsdPrice
        ? {
            offers: {
              "@type": "Offer",
              price: primaryProduct.approximateUsdPrice,
              priceCurrency: "USD",
              url: primaryProduct.officialUrl,
              itemCondition: "https://schema.org/NewCondition",
            },
          }
        : {}),
    };
    if (article.verdict) {
      schema.reviewBody = article.verdict;
    }
  }

  if (article.faqs && article.faqs.length > 0) {
    schema.hasPart = {
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  return schema;
}

export function buildProductSchema(product: Product) {
  const canonical = getCanonicalUrl(`/reviews/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}/#product`,
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand || product.manufacturer,
    },
    model: product.modelNumber,
    description: product.bestFor,
    category: product.categoryId,
    ...(product.imageUrl
      ? {
          image: [
            product.imageUrl.startsWith("http")
              ? product.imageUrl
              : `${SITE_CONFIG.domain}${product.imageUrl}`,
          ],
        }
      : {}),
    offers: {
      "@type": "Offer",
      price: product.approximateUsdPrice,
      priceCurrency: "USD",
      url: product.officialUrl,
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; href?: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.href || item.path || "/"),
    })),
  };
}
