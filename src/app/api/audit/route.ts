import { NextResponse } from 'next/server';
import { sql, ensureTablesExist } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { url, email } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'A valid website URL is required.' },
        { status: 400 }
      );
    }

    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please provide a valid domain.' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let responseText = '';
    let status = 0;
    let ttfbMs = 0;
    let isHttps = parsedUrl.protocol === 'https:';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(parsedUrl.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ApexWebSyncAudit/1.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeoutId);

      ttfbMs = Date.now() - startTime;
      status = res.status;
      responseText = await res.text();
    } catch (fetchError: unknown) {
      const err = fetchError as Error;
      return NextResponse.json(
        {
          error: `Could not reach ${parsedUrl.hostname}. Please check that the URL is live and accessible. (${err.message})`,
        },
        { status: 422 }
      );
    }

    // Parse HTML features
    const titleMatch = responseText.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const metaDescMatch = responseText.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
      || responseText.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

    const viewportMatch = /<meta[^>]+name=["']viewport["']/i.test(responseText);
    const h1Matches = responseText.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const ogTitleMatch = /<meta[^>]+property=["']og:title["']/i.test(responseText);
    const ogImageMatch = /<meta[^>]+property=["']og:image["']/i.test(responseText);
    const canonicalMatch = /<link[^>]+rel=["']canonical["']/i.test(responseText);
    const robotsMatch = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex[^"']*["']/i.test(responseText);

    const imgTags = responseText.match(/<img[^>]+>/gi) || [];
    const imgMissingAlt = imgTags.filter(img => !/alt=["'][^"']+["']/i.test(img)).length;

    // Score Calculation
    let score = 100;
    const diagnostics: Array<{
      category: string;
      title: string;
      status: 'pass' | 'warning' | 'fail';
      detail: string;
      recommendation?: string;
    }> = [];

    // 1. SSL
    if (isHttps) {
      diagnostics.push({
        category: 'Security',
        title: 'SSL / HTTPS Active',
        status: 'pass',
        detail: 'Site is served securely over HTTPS.',
      });
    } else {
      score -= 20;
      diagnostics.push({
        category: 'Security',
        title: 'Missing HTTPS Security',
        status: 'fail',
        detail: 'Site is loading over unencrypted HTTP.',
        recommendation: 'Enable an SSL certificate and redirect all HTTP traffic to HTTPS.',
      });
    }

    // 2. Speed / TTFB
    if (ttfbMs < 400) {
      diagnostics.push({
        category: 'Performance',
        title: 'Lightning-Fast TTFB',
        status: 'pass',
        detail: `Server responded in ${ttfbMs}ms (optimal < 400ms).`,
      });
    } else if (ttfbMs < 900) {
      score -= 8;
      diagnostics.push({
        category: 'Performance',
        title: 'Moderate Server Response',
        status: 'warning',
        detail: `Server responded in ${ttfbMs}ms. Can be improved with edge caching.`,
        recommendation: 'Implement Edge CDN caching and optimized server-side rendering.',
      });
    } else {
      score -= 18;
      diagnostics.push({
        category: 'Performance',
        title: 'Slow Server Response Time',
        status: 'fail',
        detail: `Response took ${ttfbMs}ms, hurting Core Web Vitals and Google rankings.`,
        recommendation: 'Migrate to modern Next.js Edge infrastructure with ApexWebSync.',
      });
    }

    // 3. Page Title
    if (title) {
      if (title.length >= 30 && title.length <= 65) {
        diagnostics.push({
          category: 'SEO',
          title: 'Optimized Title Tag',
          status: 'pass',
          detail: `"${title}" (${title.length} characters) is ideal for search snippets.`,
        });
      } else {
        score -= 6;
        diagnostics.push({
          category: 'SEO',
          title: 'Suboptimal Title Tag Length',
          status: 'warning',
          detail: `Current title length is ${title.length} chars (Recommended: 30-60 characters).`,
          recommendation: 'Target primary keywords at the front and keep length within 50-60 chars.',
        });
      }
    } else {
      score -= 15;
      diagnostics.push({
        category: 'SEO',
        title: 'Missing Title Tag',
        status: 'fail',
        detail: 'No <title> tag found on the page.',
        recommendation: 'Add a descriptive and keyword-rich <title> tag immediately.',
      });
    }

    // 4. Meta Description
    if (metaDescription) {
      if (metaDescription.length >= 70 && metaDescription.length <= 165) {
        diagnostics.push({
          category: 'SEO',
          title: 'Meta Description Present',
          status: 'pass',
          detail: `${metaDescription.length} characters, well-formatted for Google SERP snippet display.`,
        });
      } else {
        score -= 5;
        diagnostics.push({
          category: 'SEO',
          title: 'Meta Description Length',
          status: 'warning',
          detail: `Current meta description is ${metaDescription.length} chars (Optimal: 120-160 chars).`,
          recommendation: 'Rewrite meta description to be between 130-160 characters with strong call to action.',
        });
      }
    } else {
      score -= 12;
      diagnostics.push({
        category: 'SEO',
        title: 'Missing Meta Description',
        status: 'fail',
        detail: 'Search engines will auto-generate snippets, reducing CTR.',
        recommendation: 'Add a compelling meta description containing target keywords.',
      });
    }

    // 5. Mobile Viewport
    if (viewportMatch) {
      diagnostics.push({
        category: 'Mobile',
        title: 'Mobile-Friendly Viewport Configured',
        status: 'pass',
        detail: 'Page includes mobile viewport configuration for responsive scaling.',
      });
    } else {
      score -= 15;
      diagnostics.push({
        category: 'Mobile',
        title: 'Missing Mobile Viewport',
        status: 'fail',
        detail: 'Page is not configured for mobile devices, failing Google Mobile-First Indexing.',
        recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      });
    }

    // 6. Heading 1 (H1)
    if (h1Matches.length === 1) {
      diagnostics.push({
        category: 'SEO',
        title: 'Single Focused H1 Heading',
        status: 'pass',
        detail: 'Clean semantic structure with exactly 1 primary H1 heading.',
      });
    } else if (h1Matches.length === 0) {
      score -= 10;
      diagnostics.push({
        category: 'SEO',
        title: 'Missing H1 Heading',
        status: 'fail',
        detail: 'No <h1> tag found. Search engines rely on H1 to understand page hierarchy.',
        recommendation: 'Add one clear <h1> tag summarizing the main service or topic.',
      });
    } else {
      score -= 4;
      diagnostics.push({
        category: 'SEO',
        title: 'Multiple H1 Headings Detected',
        status: 'warning',
        detail: `Found ${h1Matches.length} <h1> tags. Best practice is one primary H1.`,
        recommendation: 'Structure secondary headers as <h2> and <h3> tags.',
      });
    }

    // 7. Social & OpenGraph
    if (ogTitleMatch && ogImageMatch) {
      diagnostics.push({
        category: 'Social',
        title: 'OpenGraph Rich Previews Configured',
        status: 'pass',
        detail: 'Social share cards for LinkedIn, Twitter, and Facebook are configured.',
      });
    } else {
      score -= 5;
      diagnostics.push({
        category: 'Social',
        title: 'Incomplete OpenGraph Tags',
        status: 'warning',
        detail: 'Missing og:image or og:title tags, causing blank or broken social media shares.',
        recommendation: 'Add complete OpenGraph and Twitter card meta tags.',
      });
    }

    // 8. Image Alt Attributes
    if (imgTags.length > 0 && imgMissingAlt > 0) {
      score -= Math.min(8, imgMissingAlt * 2);
      diagnostics.push({
        category: 'Accessibility & SEO',
        title: 'Images Missing Alt Text',
        status: 'warning',
        detail: `${imgMissingAlt} out of ${imgTags.length} images are missing descriptive alt attributes.`,
        recommendation: 'Add descriptive alt tags to improve image search ranking and accessibility.',
      });
    }

    // Clamp score
    score = Math.max(15, Math.min(100, score));

    const metrics = {
      title,
      metaDescription,
      ttfbMs,
      statusCode: status,
      isHttps,
      h1Count: h1Matches.length,
      imageCount: imgTags.length,
      missingAltCount: imgMissingAlt,
      hasCanonical: canonicalMatch,
      hasOpenGraph: ogTitleMatch && ogImageMatch,
      isNoIndex: robotsMatch,
      diagnostics,
    };

    // Save into Neon PostgreSQL
    try {
      await ensureTablesExist();
      await sql`
        INSERT INTO seo_audits (url, email, score, ttfb_ms, metrics)
        VALUES (${url}, ${email || null}, ${score}, ${ttfbMs}, ${JSON.stringify(metrics)})
      `;
    } catch (dbErr) {
      console.error('Failed to log audit in Neon DB:', dbErr);
    }

    return NextResponse.json({
      success: true,
      url,
      score,
      ttfbMs,
      diagnostics,
      summary: {
        totalChecks: diagnostics.length,
        passed: diagnostics.filter(d => d.status === 'pass').length,
        warnings: diagnostics.filter(d => d.status === 'warning').length,
        failed: diagnostics.filter(d => d.status === 'fail').length,
      }
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Audit handler error:', err);
    return NextResponse.json(
      { error: `Internal audit error: ${err.message}` },
      { status: 500 }
    );
  }
}
