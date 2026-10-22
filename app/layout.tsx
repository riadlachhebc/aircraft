import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  SITE_CONFIG,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.name} — Evidence-Based Home Climate & Indoor Comfort`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "portable air conditioner sizing",
    "DOE SACC ratings",
    "dual-hose portable AC",
    "space heater vs central heat",
    "air circulator vs tower fan",
    "CADR air purifier room size",
    "appliance electricity cost calculator",
    "indoor air quality",
  ],
  authors: [{ name: "Air Crafted Home Editorial Team" }],
  creator: "Air Crafted Home",
  publisher: "Air Crafted Home",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Evidence-Based Home Climate & Indoor Comfort`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Air Crafted Home - Evidence-Based Indoor Climate & Home Comfort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return (
    <html lang="en-US">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-stone-900 antialiased selection:bg-forest-100 selection:text-forest-900">
        {/* Skip Link for WCAG 2.2 AA Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
