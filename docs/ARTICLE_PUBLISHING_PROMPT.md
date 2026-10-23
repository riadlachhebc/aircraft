# Air Crafted Home — Reusable Article Publishing Prompt

Use the prompt template below whenever you want to draft, validate, and register a new article for **Air Crafted Home** (https://aircraftedhome.com).

Simply copy the template, fill in the parameter block, and submit it to the AI pair programmer.

---

## Publishing Prompt Template

```markdown
# TASK: PUBLISH A NEW ARTICLE FOR AIR CRAFTED HOME

Publish a new article for Air Crafted Home following the website's technical standards, SEO/GEO architecture, and strict anti-fabrication guidelines.

## INPUT PARAMETERS

- **Topic**: [e.g., "Midea Duo Inverter Portable Air Conditioner Review: Real Cooling Performance, Noise, and Operating Costs"]
- **Primary Keyword**: [e.g., "midea duo portable ac review"]
- **Article Type**: [Select one: "review" | "comparison" | "buying-guide" | "problem-solver" | "informational"]
- **Category**: [Select one: "air-conditioners" | "heating" | "fans-air-circulators" | "air-quality" | "energy-efficiency"]
- **Target Audience**: [e.g., "US apartment renters and suburban homeowners looking for quiet, energy-efficient bedroom cooling"]
- **Products to Review**:
  - **Product 1**:
    - **ID / Slug**: [e.g., "midea-duo-map12s1tbl"]
    - **Name**: [e.g., "Midea Duo 12,000 BTU Inverter Dual-Hose Portable AC"]
    - **Brand / Manufacturer**: [e.g., "Midea"]
    - **Exact Model / SKU**: [e.g., "MAP12S1TBL"]
    - **Official Manufacturer URL**: [e.g., "https://www.midea.com/us/..."]
    - **Verified Specs**: [e.g., 12,000 BTU DOE SACC, 1300W Max, 115V/60Hz, 42-52 dBA, 19.5"W x 16.7"D x 32.5"H, 71.6 lbs, 550 sq ft coverage]
    - **Verified Price & Date**: [e.g., $549 USD, verified 2026-11-01]
    - **Pros**: [List 2-4 verified strengths]
    - **Cons**: [List 2-3 documented engineering limitations]
    - **Audience / Best For**: [e.g., "Living rooms and master bedrooms up to 550 sq ft"]
    - **Editorial Limitations**: [e.g., "Window kit maximum extension is 48 inches without extension"]
    - **Evidence Type**: ["independent-consensus" | "manufacturer-spec" | "editorial-analysis" | "energy-calc"]
    - **Affiliate Link**: [e.g., "https://www.amazon.com/dp/B091CG2J8H?tag=youraffid-20" or None]
    - **Image & Rights**: [e.g., "/images/products/midea-duo.jpg", "Manufacturer Press Kit"]
- **Verified Sources**:
  - [e.g., "DOE Test Procedure 10 CFR Part 430 - US Department of Energy - https://www.energy.gov"]
  - [e.g., "ASHRAE Standard 55 Thermal Environmental Conditions - https://www.ashrae.org"]
- **Related Existing Articles**: [e.g., "single-hose-vs-dual-hose-portable-air-conditioners", "how-much-does-it-cost-to-run-portable-air-conditioner"]
- **Publication Preference**: ["draft" (Recommended for initial review) | "published"]

---

## REQUIRED EXECUTION WORKFLOW

1. **Anti-Cannibalization & Keyword Check**:
   - Check `data/articles.ts` to ensure the primary keyword does not overlap with existing published articles.
   - Verify category alignment.

2. **Product Record Integration**:
   - If the article associates products, register or update the product records in `data/products.ts`.
   - Ensure all nameplate engineering specifications, units, pros, cons, and sources are present.
   - If an affiliate URL is provided, ensure its hostname is in `ALLOWED_MERCHANT_HOSTNAMES` and register it in `data/affiliateRedirects.ts`.

3. **Article Composition**:
   - Create the article in `data/articles.ts` adhering to the `Article` interface.
   - Craft a concise, high-impact **Direct Engineering Verdict / Bottom Line** (2-4 sentences) optimized for AI answer engine extraction (GEO).
   - Write 3-5 substantive sections with technical physics/thermodynamics, US utility cost mathematics, acoustics, installation limits, and alternative comparisons.
   - Include at least 2 key takeaways and 1 clear boundary limitation.
   - Include 2-4 genuinely useful search-intent FAQs.
   - Add primary sources with publisher and URLs.
   - Keep `status: "draft"` unless explicitly requested as `"published"`.

4. **Validation & Integrity Verification**:
   - Run `npm run validate:content` to verify that all product records, article records, affiliate redirects, and sitemaps conform to integrity rules.
   - Run `npm test` to verify that tests pass.
   - Run `npm run build` to confirm production static page generation.

5. **Publishing Report**:
   - Output a clear pre-publication review report summarizing:
     - Slug and canonical URL
     - Associated product IDs and verified prices
     - Affiliate routing status (`/go/[slug]`)
     - Schema and SEO metadata
     - Publication status (`draft` vs `published`)
```
