# Air Crafted Home (https://aircraftedhome.com)

**Air Crafted Home** is an editorial affiliate website engineered to help US homeowners and apartment renters optimize indoor climate, heating, cooling, airflow, and indoor air quality through evidence-based research, transparent thermodynamic comparisons, and verified energy-cost calculations.

---

## 1. Mission and Editorial Philosophy

- **Target Market**: United States residential homeowners, apartment renters, and DIY climate enthusiasts.
- **Electrical Standard**: 120V / 60Hz US single-phase branch circuits (15A/20A).
- **Measurement Units**: US customary units (BTU/h, CFM, sq ft, inches, dBA, USD).
- **Core Objective**: Provide useful, reproducible information that earns the trust of human readers, search engines (Technical SEO), and AI answer engines (Generative Engine Optimization — GEO).
- **Zero Sponsored Placements**: We never accept paid product placements or rank products higher for commercial kickbacks. All quantitative specifications link directly to official standards (DOE SACC, AHAM CADR, ENERGY STAR, EPA, CPSC, EIA).

---

## 2. Information Architecture & Implemented Routes

### Primary Editorial & Category Routes
1. `/` — Comprehensive homepage with hero, problem-based room navigator, core pillars, interactive cost calculator, featured guides, verified spec sheets, and editorial independence notice.
2. `/air-conditioners` — Sizing guides, dual-hose thermodynamic comparisons, and inverter technology.
3. `/heating` — Electric space heaters, oil-filled radiators, zone heating economics, and CPSC 3-foot clearance fire safety standards.
4. `/fans-air-circulators` — Convective wind chill, whole-room vortex dynamics vs tower fans, and quiet bedroom airflow design.
5. `/air-quality` — True HEPA filtration, AHAM CADR standards, Air Changes per Hour (ACH), and activated carbon adsorption limits.
6. `/energy-efficiency` — Appliance electricity consumption mathematics, US regional utility rate analysis, and interactive calculator.

### Editorial Indexes & Detail Templates
7. `/buying-guides` — Index of all 8 in-depth buying guides and sizing frameworks.
8. `/reviews` — Index of verified product specification sheets.
9. `/reviews/[slug]` — Structured product review and specification matrix pages.
10. `/[category]/[slug]` — Substantive editorial articles with direct answer callouts, key takeaways, boundary conditions, responsive comparison tables, mathematical proofs, primary citations, and FAQs.

### Institutional & Legal Compliance
11. `/about` — Mission statement, editorial principles, and verified author profiles with credentials.
12. `/how-we-test` — 4-pillar evaluation methodology, consensus research distinction, and testing boundary conditions.
13. `/editorial-policy` — Sourcing hierarchy (DOE/EPA/AHAM/CPSC), peer review, and corrections submission workflow.
14. `/affiliate-disclosure` — FTC 16 CFR Part 255 compliance disclosure, explanation of referral commissions at no extra cost, and redirect security.
15. `/contact` — Working contact form with honeypot spam protection and category routing.
16. `/privacy-policy` — Minimal data collection policy, no-account architecture, and CCPA rights.
17. `/terms` — Terms of use, informational disclaimers, and limitation of liability.
18. `/search` — Full-text interactive client-side search across articles, products, and categories (configured with `noindex, follow`).
19. `/not-found` — Custom 404 page with search shortcut and category navigation.
20. `/go/[slug]` — Secure server-side affiliate redirection endpoint with hostname allowlist validation and `rel="sponsored nofollow"`.
21. `/sitemap.xml` — Canonical XML sitemap containing only indexable editorial pages (excludes `/go/*` and `/search`).
22. `/robots.txt` — Search crawler directives protecting non-editorial endpoints.

---

## 3. Starter Editorial Content

The site launches with 8 substantive starter articles:

1. **How to Choose the Right Portable Air Conditioner for Your Room** (`/air-conditioners/how-to-choose-portable-air-conditioner-room-size`)
   - Direct answer, DOE SACC vs obsolete ASHRAE 128 comparison, square footage sizing chart, ceiling height volume adjustments, 120V 15A electrical limits.
2. **Single-Hose vs. Dual-Hose Portable Air Conditioners: Differences and Trade-Offs** (`/air-conditioners/single-hose-vs-dual-hose-portable-air-conditioners`)
   - Negative air pressure physics, outdoor air infiltration penalty, closed-loop condenser cooling, exhaust hose radiant heat losses.
3. **How Much Does It Cost to Run a Portable Air Conditioner?** (`/energy-efficiency/how-much-does-it-cost-to-run-portable-air-conditioner`)
   - Hourly, daily, and monthly mathematical formulas, US EIA regional utility rate breakdown, inverter vs single-speed compressor modulation, portable vs window vs central AC cost comparisons.
4. **Space Heater vs. Central Heating: When Supplemental Heating Makes Sense** (`/heating/space-heater-vs-central-heating`)
   - Zone heating thermodynamics, square footage setback math, natural gas vs electricity price per 100,000 BTU, CPSC 3-foot clearance fire safety rules.
5. **Tower Fan vs. Air Circulator: Which Is Better for Your Room?** (`/fans-air-circulators/tower-fan-vs-air-circulator`)
   - Convective wind chill and perceived cooling (ASHRAE Standard 55), cross-flow impellers vs axial vortex thrusters, seasonal room destratification.
6. **How to Choose an Air Purifier by Room Size and CADR** (`/air-quality/how-to-choose-air-purifier-room-size-cadr`)
   - AHAM CADR 2/3 room rule, Air Changes per Hour (ACH) formula for high ceilings, True HEPA vs unregulated 'HEPA-type', filter ownership costs.
7. **How to Calculate the Electricity Cost of a Home Comfort Appliance** (`/energy-efficiency/how-to-calculate-electricity-cost-appliance`)
   - Step-by-step nameplate reading (Volts × Amps = Watts), conversion to kWh, finding true all-in utility tariffs, factoring in compressor duty cycles.
8. **How to Improve Bedroom Airflow Without Replacing Your HVAC System** (`/fans-air-circulators/how-to-improve-bedroom-airflow-without-replacing-hvac`)
   - The 'Closed Door Problem' return air pressure bottleneck, jumper ducts, supply trunk seasonal damper balancing, counterclockwise ceiling fan rotation.

---

## 4. Technical SEO and GEO (Generative Engine Optimization)

- **Answer-First Architecture**: Every question-focused article begins with a direct answer summarizing key findings in 2–4 sentences.
- **Hierarchical Semantics**: Single `<h1>`, followed by logical `<h2>` and `<h3>` tags, semantic `<header>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
- **JSON-LD Schema**:
  - `Organization`: Brand identity, logo, domain, and topical coverage.
  - `WebSite`: SearchAction configuration.
  - `Article`: Author byline, publication and modified dates, publisher ID, and nested `FAQPage`.
  - `Product`: Verified specs, brand, model number, price, and in-stock offers.
  - `BreadcrumbList`: Structured hierarchy on all deep pages.
- **Modern Responsive Table Architecture**:
  - Implements container queries (`@container (width < 640px)`) and sticky column headers (`position: sticky`).
  - Accessible attributes: `tabindex="0"`, `role="region"`, `aria-labelledby`, and `data-label` pseudo-element injection for card views on mobile.
- **Canonical Standardization**: Self-referencing canonical URLs without trailing slashes.
- **Crawler Controls**:
  - `/go/*` affiliate endpoints return `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`.
  - `/search` internal search results return `robots: { index: false, follow: true }`.
  - Sitemap automatically excludes all redirect and internal search routes.

---

## 5. Affiliate Redirect System (`/go/[slug]`)

Affiliate monetization routes through a secure server-side redirect endpoint:
- **Allowlist Hostname Verification**: Destination URLs are checked against `ALLOWED_MERCHANT_HOSTNAMES` (`amazon.com`, `midea.com`, `vornado.com`, etc.) to prevent open redirects.
- **Protocol Enforcement**: Only `https:` destinations are permitted.
- **HTTP 307 Redirect**: Issues a temporary redirect preserving search integrity.
- **Sponsored Attributes**: All outbound anchor links render with `rel="sponsored nofollow noopener noreferrer"`.
- **Centralized Registry**: Stored in `data/affiliateRedirects.ts` with product IDs, active status, and last verification dates.

---

## 6. Development, Testing, and Build Commands

### Prerequisites
- Node.js 18+ (tested on Node.js v24.11.1)
- npm 10+

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run automated tests (calculator, affiliate redirects, schemas, editorial checks)
npm test

# 4. Run TypeScript checks and production build
npm run build

# 5. Start production server locally
npm start
```

---

## 7. Launch Checklist for Site Owner

Before taking the domain live to commercial traffic:

1. **Affiliate Program Credentials**: Update `destinationUrl` in `data/affiliateRedirects.ts` with your verified Amazon Associates, Home Depot, or merchant tracking tags.
2. **Google Search Console**: Add your verification token to `NEXT_PUBLIC_GSC_VERIFICATION_TOKEN` in `.env.local` or DNS TXT records.
3. **Google Analytics 4**: Add your Measurement ID to `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`.
4. **Contact Form Endpoint**: Configure `CONTACT_FORM_ENDPOINT` (e.g., Formspree, Resend, or SendGrid webhook) in `.env.local` for email routing.
5. **DNS & SSL**: Point `aircraftedhome.com` to your Vercel or Node hosting provider with an automated HTTPS certificate.
