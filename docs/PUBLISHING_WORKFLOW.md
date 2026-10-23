# Air Crafted Home — Editorial & Affiliate Publishing Workflow

This document details the repeatable, evidence-based publishing system for **Air Crafted Home** (https://aircraftedhome.com).

---

## 1. Editorial Mission & Monetization Architecture

Air Crafted Home is an SEO-driven, technical affiliate publication serving US homeowners, apartment renters, and DIY climate enthusiasts. 

- **Primary Traffic Engine**: High-intent organic search (Google, Bing) and AI answer engines (Generative Engine Optimization / GEO: Perplexity, ChatGPT, Gemini, Copilot).
- **Monetization Engine**: Real affiliate referral commissions generated when informed readers click vetted product recommendations.
- **Strict Anti-Fabrication Rule**: We never invent prices, specifications, star ratings, lab testing results, affiliate URLs, or merchant relationships.

---

## 2. Supported Article Types

The publishing system supports 5 core content types:

| Article Type | Key Purpose | Product Association Requirement | Primary URL Route |
| :--- | :--- | :--- | :--- |
| **1. Individual Product Review** (`review`) | In-depth engineering audit of a specific model | **Required**: Primary product record (`primaryProductId`) | `/[category]/[slug]` + links to `/reviews/[product-slug]` |
| **2. Product-vs-Product Comparison** (`comparison`) | Objective, side-by-side analysis between 2+ models | **Required**: 2+ product records (`comparedProductIds`) | `/[category]/[slug]` |
| **3. Best-Product Buying Guide** (`buying-guide`) | Curated recommendations categorized by room size/budget | **Required**: 2+ product records (`productIds`) | `/[category]/[slug]` + indexed on `/buying-guides` |
| **4. Problem-Solving Article** (`problem-solver`) | Diagnosing climate bottlenecks (e.g., negative pressure) | **Optional/Recommended**: Solution equipment records | `/[category]/[slug]` |
| **5. Informational Article** (`informational`) | Physics, utility tariffs, sizing math, building science | **None**: No products required | `/[category]/[slug]` |

---

## 3. Product Record Data Format

Product records live in `data/products.ts` within the `PRODUCTS` dictionary. Products are keyed by their stable URL slug or SKU.

### Required Fields for Publicly Published Products:
```typescript
{
  id: "midea-duo-map12s1tbl",                                   // Stable unique product identifier
  slug: "midea-duo-12000-btu-inverter-portable-ac",             // URL-safe slug for spec sheet route
  name: "Midea Duo 12,000 BTU Inverter Dual-Hose Portable AC",  // Full descriptive commercial name
  manufacturer: "Midea",                                       // Brand / manufacturer
  brand: "Midea",                                              // Brand alias (matches manufacturer)
  modelNumber: "MAP12S1TBL",                                   // Exact manufacturer SKU/model number
  categoryId: "air-conditioners",                              // Category (see valid categories below)
  status: "draft" | "published" | "archived",                  // Publication state
  officialUrl: "https://www.midea.com/us/...",                 // Verified manufacturer product page
  approximateUsdPrice: 549,                                    // Real audited price in USD
  priceVerifiedDate: "2026-11-01",                             // YYYY-MM-DD date price was confirmed
  
  // Category-Specific Capacity (provide verified metric where applicable):
  coolingCapacityBtuSacc: 12000,                               // DOE SACC BTU/h (ACs)
  coolingCapacityBtuAshrae: 14000,                             // Legacy ASHRAE 128 BTU/h (if available)
  heatingCapacityWatts: 1500,                                  // Maximum electrical draw for heaters
  cadrSmoke: 240, cadrDust: 245, cadrPollen: 250,              // AHAM CADR cubic ft/min (Air Purifiers)
  airFlowCfm: 1200,                                            // Maximum measured airflow (Fans/Circulators)
  
  // Standard Electrical & Acoustic Specs:
  recommendedRoomSqFt: 550,                                    // Rated room square footage
  roomSizeBasis: "DOE SACC 12,000 BTU Baseline",               // Engineering sizing basis
  powerConsumptionWatts: 1300,                                 // Nameplate maximum continuous wattage
  voltageFrequency: "115V / 60Hz",                             // US branch circuit standard (15A/20A)
  noiseDbRange: "42 - 52 dBA",                                 // Acoustic range (low to high)
  noiseConditions: "Low blower modulation to max compressor",  // Acoustic measurement boundary
  dimensionsInches: { width: 19.5, depth: 16.7, height: 32.5 },// Physical chassis size
  weightLbs: 71.6,                                             // Physical weight in pounds
  
  // Operation & Ownership:
  installationRequirements: "Standard double-hung window kit", // Physical installation limits
  maintenanceSchedule: "Wash washable pre-filters bi-weekly",  // Routine maintenance cadence
  replacementPartsCostEstimate: "$0 (Washable filters)",       // Consumable replacement costs
  warrantyYears: 1,                                            // Manufacturer limited warranty
  certifications: ["DOE Standard Compliant", "UL Listed"],     // Verified certifications
  
  // Editorial Evaluation:
  pros: [                                                      // Key verified strengths (min 1)
    "Inverter compressor eliminates high-draw startup spikes",
    "Dual-hose hose-in-hose design prevents negative air pressure"
  ],
  cons: [                                                      // Documented engineering limitations (min 1)
    "Heavy 71.6 lb chassis is difficult to maneuver between floors",
    "Window slider panel max extension is 48 inches"
  ],
  bestFor: "Living rooms and master bedrooms up to 550 sq ft", // Intended audience & ideal room type
  editorialLimitations: "Window kit insulation is minimal; foam tape recommended.", // Critical caveats
  evidenceType: "independent-consensus" | "manufacturer-spec" | "editorial-analysis" | "energy-calc",
  
  // Affiliate Linkage:
  affiliateSlug: "midea-duo-12000-btu-ac",                     // Registered slug in data/affiliateRedirects.ts
  
  // Primary Spec Citations:
  specSources: [
    {
      title: "DOE Test Procedure 10 CFR Part 430",
      publisher: "US Department of Energy",
      url: "https://www.energy.gov/eere/buildings/appliance-and-equipment-standards-program"
    }
  ]
}
```

---

## 4. Article Record Data Format

Articles live in `data/articles.ts` within the `ARTICLES` dictionary:

```typescript
{
  slug: "midea-duo-12000-btu-inverter-review",
  title: "Midea Duo 12,000 BTU Inverter Review: Tested SACC Cooling & Efficiency",
  metaTitle: "Midea Duo 12,000 BTU Inverter Review & Verified Specs | Air Crafted Home",
  metaDescription: "Evidence-based review of the Midea Duo (MAP12S1TBL). Verified DOE SACC cooling, dual-hose thermodynamics, electrical wattage draw, and operating noise.",
  primaryKeyword: "midea duo portable ac review",
  searchIntent: "commercial",
  articleType: "review",
  primaryProductId: "midea-duo-map12s1tbl",
  categoryId: "air-conditioners",
  authorId: "editorial-team",
  status: "draft",                                             // Kept in draft until publisher approves!
  publishedAt: "2026-11-01",
  updatedAt: "2026-11-01",
  readTimeMinutes: 7,
  heroImage: "/images/fallback-cooling.svg",
  heroImageAlt: "Midea Duo Dual-Hose Inverter Portable Air Conditioner schematic",
  
  // GEO Direct Answer Callout (Crucial for AI search engine answers):
  directAnswer: "The Midea Duo 12,000 BTU (DOE SACC) is one of the most thermodynamically efficient portable air conditioners available for US homes. Its dual-hose hose-in-hose architecture prevents room depressurization, while its variable-speed inverter compressor drops steady-state electrical consumption to 450–650W.",
  
  // Key Takeaways (min 2):
  keyTakeaways: [
    "Dual-hose assembly eliminates the 25–40% outdoor air infiltration penalty of single-hose ACs.",
    "Variable-speed inverter compressor modulates between 30% and 100% power, reducing cycling noise.",
    "At 71.6 lbs, the chassis requires two people to navigate stairs safely."
  ],
  
  // Transparent Technical Boundaries (min 1):
  limitations: [
    "Window adapter maximum reach is 48 inches without supplemental extensions.",
    "Condensate auto-evaporation functions effectively up to ~75% relative humidity; manual draining required in extreme humidity."
  ],
  
  // Evidence Distinction Notice:
  testingMethodologyDistinction: "Independent Technical Consensus & Physical Spec Audit: We analyze manufacturer nameplate disclosures, DOE SACC/AHAM test reports, and published thermodynamics. We do not claim hands-on testing unless conducted in a certified laboratory.",
  
  // Body Content Sections:
  contentSections: [
    {
      heading: "Thermodynamic Performance & The Dual-Hose Advantage",
      level: 2,
      bodyMarkdown: "Detailed explanation of negative pressure and how the Duo overcomes it..."
    },
    {
      heading: "Inverter Modulation & Energy Draw",
      level: 2,
      bodyMarkdown: "Analysis of the variable-frequency inverter compressor..."
    },
    {
      heading: "Acoustics & Bedroom Usability",
      level: 2,
      bodyMarkdown: "Low-blower steady-state acoustics vs high-draw startup..."
    },
    {
      heading: "Installation and Window Kit Fit",
      level: 2,
      bodyMarkdown: "Step-by-step window kit setup..."
    },
    {
      heading: "Price, Value, and Alternatives",
      level: 2,
      bodyMarkdown: "Cost-to-benefit comparison with single-hose and window units..."
    }
  ],
  
  // Regulatory & Technical Citations:
  sources: [
    {
      title: "10 CFR Part 430: Energy Conservation Program for Consumer Products",
      publisher: "US Department of Energy",
      url: "https://www.energy.gov"
    }
  ],
  
  // High-Intent FAQs for Search Engine Accordions:
  faqs: [
    {
      question: "Does the Midea Duo need to be drained constantly?",
      answer: "Under normal US summer humidity (below 75% RH), the unit expels moisture through the exhaust hose. In saturated environments, the internal float switch triggers an E5 code requiring manual drainage."
    }
  ],
  
  // Internal Links:
  relatedArticleSlugs: [
    "single-hose-vs-dual-hose-portable-air-conditioners",
    "how-much-does-it-cost-to-run-portable-air-conditioner"
  ],
  productIds: ["midea-duo-map12s1tbl"]
}
```

---

## 5. Affiliate Link Infrastructure (`/go/[slug]`)

Affiliate links live in `data/affiliateRedirects.ts`:

1. **Protocol**: Must be `https:`
2. **Host Allowlist**: Destination URL domain must be in `ALLOWED_MERCHANT_HOSTNAMES`:
   - `amazon.com`, `www.amazon.com`, `amzn.to`
   - `homedepot.com`, `www.homedepot.com`
   - `target.com`, `www.target.com`
   - `midea.com`, `vornado.com`, `cowaymega.com`, `delonghi.com`, `dreo.com`, `levoit.com`
3. **Outbound Tagging**: Anchor links automatically include `rel="sponsored nofollow noopener noreferrer"`.
4. **Endpoint Protection**: `/go/*` returns `X-Robots-Tag: noindex, nofollow` and is excluded from sitemap.

---

## 6. The 7-Step Publishing Workflow

Follow these steps for every new article:

```
[1. Intake] ------------> [2. Product Audit] ---------> [3. SEO Research]
                              |                              |
[4. Content Drafting] <-------+                              |
         |                                                   |
         v                                                   v
[5. Registration] ------> [6. Automated Validation] --> [7. Publisher Review & Approval]
 (data/*.ts in 'draft')      (npm run validate:content)     (Explicit switch to 'published')
```

### Step 1: Intake
Collect: Topic, Primary Keyword, Article Type, Target Audience, Models to evaluate, Verified Sources, and Affiliate URLs.

### Step 2: Product Audit
Gather exact nameplate specs from official manufacturer manuals or DOE/AHAM databases:
- Model SKU, Watts, Voltage, Dimensions, Weight, dB range, SACC/Watts/CADR/CFM.
- Confirm retail pricing and verification date.
- Verify affiliate URL destination domain is on the merchant allowlist.

### Step 3: SEO & Search Intent Analysis
- Verify the primary keyword does not conflict with existing articles in `data/articles.ts`.
- Determine search intent (commercial, informational, transactional).
- Identify 2–3 existing articles to cross-link.

### Step 4: Content Drafting
Draft according to the article type:
- **Review**: Product Verdict + Who suited for + Category specs + Operating costs + Pros/Cons + Limitations + Alternatives.
- **Comparison**: Consistent criteria comparison matrix + Head-to-head analysis + Specific use-case verdicts.
- **Buying Guide**: Sizing framework + Recommendations by room size/budget + Comparison table.
- **Problem-Solver**: Physical diagnosis + Step-by-step solution + Recommended equipment.
- **Informational**: Thermodynamic equations + Building science + Citations.

### Step 5: Code Registration (In Draft Status)
- Add product to `data/products.ts` with `status: "draft"`.
- If affiliate link exists, add redirect to `data/affiliateRedirects.ts` with `isActive: true`.
- Add article to `data/articles.ts` with `status: "draft"`.

### Step 6: Automated Validation
Run the content validator:
```bash
npm run validate:content
npm test
npm run build
```
Verify that:
- All schema validations pass.
- No broken internal links exist.
- Draft content does not leak into sitemap or public feeds.

### Step 7: Publisher Review & Approval
Present the pre-publication audit report to the publisher. Once explicitly approved, toggle `status: "published"`.

---

## 7. Commands Reference

```bash
# 1. Run full content and schema audit
npm run validate:content

# 2. Run automated test suite (schemas, calculator, redirects, e2e)
npm test

# 3. Test production build
npm run build

# 4. Start local development server
npm run dev
```
