import { NextRequest, NextResponse } from "next/server";
import { validateAffiliateRedirect } from "@/data/affiliateRedirects";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return new NextResponse(
      JSON.stringify({ error: "Invalid or missing redirect slug." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );
  }

  const validation = validateAffiliateRedirect(slug);

  if (!validation.isValid || !validation.redirect) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Affiliate Link Unavailable | Air Crafted Home</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF9F6; color: #1E293B; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 32px; max-width: 500px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    h1 { font-size: 20px; margin-bottom: 8px; color: #0F172A; }
    p { font-size: 14px; color: #64748B; line-height: 1.5; margin-bottom: 24px; }
    a { display: inline-block; background: #244A36; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Referral Link Unavailable</h1>
    <p>The destination link for "<strong>${slug}</strong>" could not be verified or is temporarily deactivated (${validation.reason || "Safety check failed"}).</p>
    <a href="/reviews">Browse All Verified Reviews</a>
  </div>
</body>
</html>`,
      {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  // Valid, safe redirect
  const destination = validation.redirect.destinationUrl;

  return NextResponse.redirect(destination, {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Referrer-Policy": "no-referrer-when-downgrade",
    },
  });
}
