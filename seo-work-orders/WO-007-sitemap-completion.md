# SEO Work Order #007 — Sitemap completion (include all 45 condition pages + auto-regenerate at build)

**Author:** Cowork SEO agent
**Date:** 2026-05-30
**Status:** ⏳ Awaiting Yonah's approval
**Implementer:** Claude Code (engineering)
**Depends on:** WO-001/WO-002/WO-004 are already deployed. This is the next on-site lever.
**Estimated effort:** 20–40 minutes of agent time.

---

## Why this work order exists

WO-001 + WO-004 shipped on 2026-05-28: all 45 condition pages now serve real prerendered HTML, 8 of them carry deepened content + `FAQPage` JSON-LD, and the homepage / 6 main pages are all SSR. The on-site engineering is in a great place.

**But Google still does not know most of these pages exist.** Today's site-health check pulled `https://premierjointcare.com/sitemap.xml` and it lists exactly **7 URLs**: `/`, `/about`, `/florida`, `/new-york`, `/team`, `/conditions`, `/contact`. The 45 condition pages under `/conditions/<slug>` are absent. Same for `/conditions/lupus` (alias) and any future condition pages.

That single missing piece is plausibly the largest current limiter on the WO-001/WO-004 investment paying off:
- Google's crawlers do find pages without sitemaps, but slowly, and they down-weight crawl priority on URLs they discover only via internal links.
- Generative AI search engines (Perplexity, ChatGPT search, Google AI Overviews) routinely consult sitemaps when deciding which pages on a domain to ingest. Our brand-new FAQ JSON-LD on the 8 priority condition pages is exactly the kind of content these engines cite — but only if they crawl it.
- The current sitemap also has a static `<lastmod>2026-05-25</lastmod>` for everything, which is stale; it pre-dates the WO-004 content drop.

Fixing this is a small, mechanical, one-time engineering change with a multiplicative effect on every prior on-site work order.

---

## What to change

### Change 1 — Make `build.mjs` auto-generate `sitemap.xml`

Add a sitemap-generation step at the end of `build.mjs` (after the prerender loop), so that every Vercel build regenerates `dist/sitemap.xml` from the actual list of pages we prerendered. This means future condition pages get into the sitemap for free.

**File:** `/build.mjs`
**Location:** after the `console.log(`\nDone. Prerendered ${ok}/${PAGES.length} pages into dist/.`);` line (currently line 147).

**Insert:**

```js
// ── 3. Generate sitemap.xml from PAGES + redirect aliases ──
// Map a built filename to its canonical public URL (matches our canonical-tag policy).
function publicUrl(htmlPath) {
  // index.html → /
  if (htmlPath === 'index.html') return 'https://premierjointcare.com/';
  // main pages (about.html, team.html, …) → /about, /team, … (extensionless)
  if (!htmlPath.includes('/')) return `https://premierjointcare.com/${htmlPath.replace(/\.html$/, '')}`;
  // condition pages: conditions/<slug>.html → /conditions/<slug>
  if (htmlPath.startsWith('conditions/')) {
    const slug = htmlPath.replace(/^conditions\//, '').replace(/\.html$/, '');
    return `https://premierjointcare.com/conditions/${slug}`;
  }
  return `https://premierjointcare.com/${htmlPath.replace(/\.html$/, '')}`;
}

function priorityFor(htmlPath) {
  if (htmlPath === 'index.html') return '1.0';
  if (htmlPath === 'florida.html' || htmlPath === 'new-york.html' || htmlPath === 'about.html') return '0.9';
  if (htmlPath === 'team.html' || htmlPath === 'conditions.html') return '0.8';
  if (htmlPath === 'contact.html') return '0.7';
  if (htmlPath.startsWith('conditions/')) return '0.7';
  return '0.6';
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const urls = PAGES.map((p) => ({
  loc: publicUrl(p.html),
  lastmod: today,
  changefreq: p.html.startsWith('conditions/') ? 'monthly' : 'monthly',
  priority: priorityFor(p.html),
}));

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
console.log(`✓ wrote sitemap.xml with ${urls.length} URLs`);
```

### Change 2 — Delete or stop committing the static `sitemap.xml`

The static `/sitemap.xml` at the repo root is now misleading and will be overwritten in `dist/` on every build anyway. Two options:

- **Recommended:** delete `/sitemap.xml` from the repo so there is one source of truth.
- Alternative (if you'd rather keep something checked in for visibility): replace its contents with a one-line comment pointing to `build.mjs`, e.g. `<!-- Generated at build time by build.mjs. Do not edit. -->`. Note this will be overwritten in `dist/` regardless.

The current `cpSync` copy-through in `build.mjs` will copy the static file in first, then our new write step replaces it — so functionally it works either way. Recommendation: delete it to avoid future confusion.

### Change 3 — Verify `robots.txt` references the canonical sitemap URL

**File:** `/robots.txt`

Confirm the file contains a line:
```
Sitemap: https://premierjointcare.com/sitemap.xml
```

If absent, add it. (Today's fetch followed a 301 to `https://www.premierjointcare.com/robots.txt` which returned 200 but the redirect is fine; canonical sitemap URL should still be `premierjointcare.com` non-www to match our canonical-tag policy.)

---

## Verification checklist (after deploy)

1. `curl -s https://premierjointcare.com/sitemap.xml | grep -c '<loc>'` → should return **52** (1 homepage + 6 main + 45 condition pages). Currently returns 7.
2. `curl -s https://premierjointcare.com/sitemap.xml | grep '<lastmod>' | head -1` → should show today's date, not `2026-05-25`.
3. Spot-check: `curl -s https://premierjointcare.com/sitemap.xml | grep rheumatoid-arthritis` → should return a `<loc>https://premierjointcare.com/conditions/rheumatoid-arthritis</loc>` line.
4. `curl -s https://premierjointcare.com/robots.txt` → contains `Sitemap: https://premierjointcare.com/sitemap.xml`.
5. **Re-submit the sitemap to Google Search Console** after deploy (Search Console → Sitemaps → submit `https://premierjointcare.com/sitemap.xml`). This forces a re-crawl of all 52 URLs.

---

## Expected impact

- Closes the discovery gap for 45 condition pages (most importantly the 8 Phase 1 pages with FAQ JSON-LD that were the whole point of WO-004).
- Gives generative-AI engines a machine-readable list of the new content to ingest.
- Makes the sitemap self-maintaining — any future condition page (or future page added to `PAGES` in `build.mjs`) automatically appears.
- Low risk: pure additive change, no removed URLs, no canonical changes.
