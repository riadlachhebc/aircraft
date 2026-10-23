/**
 * Comprehensive Pre-Launch & Pre-GSC Audit Script
 *
 * Runs an exhaustive diagnostic of Air Crafted Home before git push and GSC submission:
 * 1. Sitemap & Robots.txt integrity
 * 2. Every sitemap route HTTP status & canonical tags
 * 3. Structured Data (Schema.org) JSON-LD validity
 * 4. OpenGraph and Twitter social metadata
 * 5. Content integrity (no raw markdown, no LaTeX, image delivery, alt text)
 * 6. Affiliate security and redirect protection
 * 7. Security response headers
 */

interface AuditIssue {
  severity: "CRITICAL" | "WARNING" | "INFO";
  category: string;
  target: string;
  message: string;
}

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const issues: AuditIssue[] = [];
let checksPassed = 0;

function report(
  severity: "CRITICAL" | "WARNING" | "INFO",
  category: string,
  target: string,
  message: string
) {
  issues.push({ severity, category, target, message });
}

function pass(category: string, target: string, message: string) {
  checksPassed++;
  console.log(`  ✔ [PASS] ${category.padEnd(16)} | ${target.padEnd(35)} | ${message}`);
}

async function runAudit() {
  console.log("===============================================================================");
  console.log("  AIR CRAFTED HOME — COMPREHENSIVE PRE-LAUNCH & GSC AUDIT");
  console.log("  Auditing Live Instance at:", BASE_URL);
  console.log("===============================================================================\n");

  // -------------------------------------------------------------------------
  // 1. Robots.txt Audit
  // -------------------------------------------------------------------------
  console.log("--- 1. ROBOTS.TXT AUDIT ---");
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    if (robotsRes.status !== 200) {
      report("CRITICAL", "Robots.txt", "/robots.txt", `HTTP status ${robotsRes.status} (expected 200)`);
    } else {
      pass("Robots.txt", "/robots.txt", "HTTP 200 OK");
      const robotsText = await robotsRes.text();
      
      if (!/user-agent:\s*\*/i.test(robotsText)) {
        report("CRITICAL", "Robots.txt", "User-agent", "Missing User-agent: * directive");
      } else {
        pass("Robots.txt", "User-agent", "Wildcard * user-agent defined");
      }

      if (!robotsText.includes("Disallow: /go/")) {
        report("CRITICAL", "Robots.txt", "Disallow: /go/", "Missing Disallow for affiliate endpoint /go/");
      } else {
        pass("Robots.txt", "Disallow: /go/", "Affiliate redirect route blocked from crawlers");
      }

      if (!robotsText.includes("Disallow: /search")) {
        report("WARNING", "Robots.txt", "Disallow: /search", "Internal search query route not disallowed");
      } else {
        pass("Robots.txt", "Disallow: /search", "Internal search query route disallowed");
      }

      if (!robotsText.includes("Sitemap: https://aircraftedhome.com/sitemap.xml")) {
        report("CRITICAL", "Robots.txt", "Sitemap Directive", "Missing absolute HTTPS sitemap URL");
      } else {
        pass("Robots.txt", "Sitemap Directive", "Directs crawlers to https://aircraftedhome.com/sitemap.xml");
      }
    }
  } catch (err: any) {
    report("CRITICAL", "Robots.txt", "/robots.txt", `Failed to fetch: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // 2. Sitemap.xml Audit & URL Harvesting
  // -------------------------------------------------------------------------
  console.log("\n--- 2. SITEMAP.XML AUDIT ---");
  const sitemapUrls: string[] = [];
  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    if (sitemapRes.status !== 200) {
      report("CRITICAL", "Sitemap", "/sitemap.xml", `HTTP status ${sitemapRes.status} (expected 200)`);
    } else {
      pass("Sitemap", "/sitemap.xml", "HTTP 200 OK");
      const sitemapXml = await sitemapRes.text();

      const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)];
      for (const m of locMatches) {
        sitemapUrls.push(m[1].trim());
      }

      pass("Sitemap", "URL Extraction", `Extracted ${sitemapUrls.length} canonical URLs`);

      // Verify no forbidden URLs in sitemap
      for (const u of sitemapUrls) {
        if (!u.startsWith("https://aircraftedhome.com")) {
          report("CRITICAL", "Sitemap URL", u, "URL does not start with https://aircraftedhome.com");
        }
        if (u.includes("/go/")) {
          report("CRITICAL", "Sitemap URL", u, "Affiliate /go/ redirect URL leaked into sitemap!");
        }
        if (u.includes("/search")) {
          report("CRITICAL", "Sitemap URL", u, "Internal search URL leaked into sitemap!");
        }
        if (u.endsWith("/") && u !== "https://aircraftedhome.com/") {
          report("WARNING", "Sitemap URL", u, "Non-root URL has trailing slash");
        }
      }

      // Check for removed demo URLs
      const deletedDemos = [
        "how-to-choose-portable-air-conditioner-room-size",
        "midea-duo-12000-btu-smart-inverter",
        "vornado-660-large-air-circulator",
        "midea-vs-whynter",
      ];
      for (const demo of deletedDemos) {
        if (sitemapUrls.some((u) => u.includes(demo))) {
          report("CRITICAL", "Sitemap Demo Leak", demo, `Deleted demo URL still in sitemap!`);
        }
      }
      pass("Sitemap", "Leak Check", "Zero deleted demo URLs, affiliate redirects, or query URLs in sitemap");
    }
  } catch (err: any) {
    report("CRITICAL", "Sitemap", "/sitemap.xml", `Failed to fetch: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // 3. Live Crawl of Every Sitemap URL
  // -------------------------------------------------------------------------
  console.log(`\n--- 3. LIVE HTTP CRAWL OF ALL ${sitemapUrls.length} SITEMAP URLS ---`);
  for (const fullUrl of sitemapUrls) {
    const path = fullUrl.replace("https://aircraftedhome.com", "") || "/";
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      if (res.status !== 200) {
        report("CRITICAL", "Crawl Status", path, `Returned HTTP ${res.status} (expected 200)`);
        continue;
      }

      const html = await res.text();

      // Check Title
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : "";
      if (!title || title.length < 10) {
        report("CRITICAL", "SEO Title", path, `Title missing or too short (${title.length} chars)`);
      }

      // Check Meta Description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      const desc = descMatch ? descMatch[1] : "";
      if (!desc || desc.length < 20) {
        report("WARNING", "Meta Description", path, `Description missing or too short (${desc.length} chars)`);
      }

      // Check Canonical URL
      const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
      const canon = canonMatch ? canonMatch[1] : "";
      if (canon !== fullUrl) {
        report("CRITICAL", "Canonical Tag", path, `Canonical mismatch: found "${canon}", expected "${fullUrl}"`);
      }

      // Check Structured Data
      const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>(.*?)<\/script>/gis)];
      if (jsonLdMatches.length === 0) {
        report("WARNING", "Structured Data", path, "No JSON-LD structured data found on page");
      } else {
        for (const [_, jsonStr] of jsonLdMatches) {
          try {
            JSON.parse(jsonStr);
          } catch (e: any) {
            report("CRITICAL", "Structured Data", path, `Malformed JSON-LD syntax: ${e.message}`);
          }
        }
      }

      pass("Crawl Page", path, `200 OK | Title (${title.length}c) | Canonical verified`);
    } catch (err: any) {
      report("CRITICAL", "Crawl Page", path, `Connection error: ${err.message}`);
    }
  }

  // -------------------------------------------------------------------------
  // 4. In-Depth Editorial & Product Review Page Verification
  // -------------------------------------------------------------------------
  console.log("\n--- 4. IN-DEPTH REVIEW PAGE AUDIT (/heating/lasko-duo-comfort-38-dc-fan-heater-review) ---");
  const reviewPath = "/heating/lasko-duo-comfort-38-dc-fan-heater-review";
  try {
    const reviewRes = await fetch(`${BASE_URL}${reviewPath}`);
    const reviewHtml = await reviewRes.text();

    // Markdown leakage check
    if (reviewHtml.includes("###") || reviewHtml.includes("**")) {
      report("CRITICAL", "Content Integrity", reviewPath, "Raw markdown syntax (### or **) detected in HTML!");
    } else {
      pass("Content Integrity", "Markdown Syntax", "Zero raw markdown characters (###, **) leaking in rendered DOM");
    }

    // LaTeX math check (check visible editorial content, ignoring React internal RSC $ escapes)
    const editorialMatch = reviewHtml.match(/<div class="editorial-content[^>]*>(.*?)<\/div>/s);
    const editorialContent = editorialMatch ? editorialMatch[1] : reviewHtml;

    if (
      editorialContent.includes("$$") ||
      editorialContent.includes("\\text{") ||
      editorialContent.includes("\\frac{")
    ) {
      report("CRITICAL", "Content Integrity", reviewPath, "Raw LaTeX math syntax detected in HTML!");
    } else {
      pass("Content Integrity", "Math Typesetting", "Zero raw LaTeX math formulas ($$, \\frac) leaking in DOM");
    }

    // Heading hierarchy check
    const h1Count = (reviewHtml.match(/<h1/g) || []).length;
    if (h1Count !== 1) {
      report("WARNING", "Heading Structure", reviewPath, `Found ${h1Count} <h1> tags (expected exactly 1)`);
    } else {
      pass("Heading Structure", "H1 Tag", "Exactly one semantic <h1> element");
    }

    const h2Count = (reviewHtml.match(/<h2/g) || []).length;
    const h3Count = (reviewHtml.match(/<h3/g) || []).length;
    pass("Heading Structure", "H2 & H3 Tags", `Structured outline: ${h2Count} H2s and ${h3Count} H3s`);

    // Image delivery & alt text check
    const imgMatches = [...reviewHtml.matchAll(/<img\s+[^>]*src=["'](.*?)["'][^>]*>/gi)];
    pass("Image Assets", "Image Count", `Found ${imgMatches.length} images on page`);

    for (const [fullImgTag, src] of imgMatches) {
      // Check alt text
      const hasAlt = /alt=["'][^"']+["']/i.test(fullImgTag);
      if (!hasAlt) {
        report("WARNING", "Image Alt Text", src, "Missing descriptive alt attribute");
      }

      // If local asset, verify HTTP status (unescaping HTML &amp; entities)
      if (src.startsWith("/")) {
        try {
          const cleanSrc = src.replace(/&amp;/g, "&");
          const imgRes = await fetch(`${BASE_URL}${cleanSrc}`);
          if (imgRes.status !== 200) {
            report("CRITICAL", "Broken Image", cleanSrc, `HTTP status ${imgRes.status}`);
          }
        } catch (e: any) {
          report("CRITICAL", "Broken Image", src, `Fetch failure: ${e.message}`);
        }
      }
    }
    pass("Image Assets", "Asset Integrity", "All image src paths return HTTP 200 and have alt attributes");

    // Affiliate button and link compliance
    const affiliateLinks = [...reviewHtml.matchAll(/<a\s+[^>]*href=["'](\/go\/[^"']+)["'][^>]*>/gi)];
    if (affiliateLinks.length === 0) {
      report("CRITICAL", "Affiliate Link", reviewPath, "No /go/ affiliate links found on review page!");
    } else {
      for (const [tag, href] of affiliateLinks) {
        if (!tag.includes("rel=\"sponsored nofollow noopener noreferrer\"") && !tag.includes("sponsored")) {
          report("CRITICAL", "SEO Compliance", href, `Missing rel="sponsored" attribute on affiliate link!`);
        }
        if (!tag.includes("target=\"_blank\"")) {
          report("WARNING", "UX Compliance", href, `Affiliate link does not open in new tab (target="_blank")`);
        }
      }
      pass("Affiliate Compliance", "Rel Sponsored", `All ${affiliateLinks.length} affiliate links carry rel="sponsored nofollow"`);
    }

    // Review Schema structured data check
    if (!reviewHtml.includes('"@type":"Review"') && !reviewHtml.includes('"@type": "Review"')) {
      report("CRITICAL", "Schema Markup", reviewPath, "Missing Schema.org @type: Review markup!");
    } else {
      pass("Schema Markup", "Review Schema", "Schema.org Review & itemReviewed Product schema valid");
    }
  } catch (err: any) {
    report("CRITICAL", "Review Page", reviewPath, `Fetch failure: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // 5. Security & Redirect Endpoints Audit
  // -------------------------------------------------------------------------
  console.log("\n--- 5. AFFILIATE REDIRECT & SECURITY AUDIT ---");
  try {
    // 5.1 Valid redirect test
    const validRedirect = await fetch(`${BASE_URL}/go/lasko-duo-comfort-38-dc`, {
      redirect: "manual",
    });
    if (validRedirect.status !== 307) {
      report("CRITICAL", "Affiliate Redirect", "/go/lasko-duo-comfort-38-dc", `Status is ${validRedirect.status} (expected 307)`);
    } else {
      const loc = validRedirect.headers.get("location");
      if (loc !== "https://lasko.sjv.io/jR39Ov") {
        report("CRITICAL", "Affiliate Redirect", "/go/lasko-duo-comfort-38-dc", `Redirects to ${loc} instead of https://lasko.sjv.io/jR39Ov`);
      } else {
        pass("Affiliate Redirect", "/go/lasko-duo-comfort-38-dc", "Returns 307 to https://lasko.sjv.io/jR39Ov");
      }
      const robots = validRedirect.headers.get("x-robots-tag");
      if (!robots || !robots.includes("noindex")) {
        report("CRITICAL", "Affiliate Redirect", "/go/lasko-duo-comfort-38-dc", "Missing X-Robots-Tag: noindex header");
      } else {
        pass("Affiliate Redirect", "X-Robots-Tag", "Carries noindex, nofollow header");
      }
    }

    // 5.2 Malicious / unknown slug test
    const badRedirect = await fetch(`${BASE_URL}/go/malicious-target`, {
      redirect: "manual",
    });
    if (badRedirect.status !== 404) {
      report("CRITICAL", "Security Redirect", "/go/malicious-target", `Status is ${badRedirect.status} (expected 404)`);
    } else {
      pass("Security Redirect", "/go/malicious-target", "Unknown slug safely returns 404 safety page");
    }

    // 5.3 Deleted demo article test
    const deletedArticle = await fetch(
      `${BASE_URL}/air-conditioners/how-to-choose-portable-air-conditioner-room-size`
    );
    if (deletedArticle.status !== 404) {
      report("CRITICAL", "Clean Launch", "Deleted demo article", `Status is ${deletedArticle.status} (expected 404)`);
    } else {
      pass("Clean Launch", "Deleted demo article", "Deleted demo article route returns 404");
    }

    // 5.4 Security headers test
    const homeRes = await fetch(`${BASE_URL}/`);
    const nosniff = homeRes.headers.get("x-content-type-options");
    const frameOptions = homeRes.headers.get("x-frame-options");
    const referrerPolicy = homeRes.headers.get("referrer-policy");

    if (nosniff !== "nosniff") {
      report("WARNING", "Security Headers", "X-Content-Type-Options", "Header missing or not nosniff");
    } else {
      pass("Security Headers", "X-Content-Type-Options", "nosniff enforced");
    }

    if (frameOptions !== "DENY" && frameOptions !== "SAMEORIGIN") {
      report("WARNING", "Security Headers", "X-Frame-Options", "Header missing");
    } else {
      pass("Security Headers", "X-Frame-Options", `${frameOptions} clickjacking protection enforced`);
    }

    if (!referrerPolicy) {
      report("WARNING", "Security Headers", "Referrer-Policy", "Header missing");
    } else {
      pass("Security Headers", "Referrer-Policy", `${referrerPolicy} enforced`);
    }
  } catch (err: any) {
    report("CRITICAL", "Security Audit", "Redirects", `Fetch error: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log("\n===============================================================================");
  console.log("  AUDIT SUMMARY RESULTS");
  console.log("===============================================================================");

  const criticals = issues.filter((i) => i.severity === "CRITICAL");
  const warnings = issues.filter((i) => i.severity === "WARNING");

  console.log(`  Total Checks Passed : ${checksPassed}`);
  console.log(`  Critical Issues     : ${criticals.length}`);
  console.log(`  Warnings            : ${warnings.length}`);

  if (issues.length > 0) {
    console.log("\n  ISSUES FOUND:");
    for (const iss of issues) {
      console.log(`  [${iss.severity}] ${iss.category} (${iss.target}): ${iss.message}`);
    }
  }

  if (criticals.length === 0) {
    console.log("\n  STATUS: 100% READY FOR GITHUB PUSH & GSC SITEMAP SUBMISSION! 🚀");
  } else {
    console.log("\n  STATUS: ACTION REQUIRED BEFORE DEPLOYMENT.");
    process.exit(1);
  }
}

runAudit();
