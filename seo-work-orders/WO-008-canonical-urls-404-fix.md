# SEO Work Order #008 — Fix canonical URLs returning 404 (vercel.json routing bug)

**Author:** Cowork SEO agent
**Date:** 2026-05-31
**Status:** 🚨 HIGH PRIORITY — awaiting Yonah's approval
**Implementer:** Claude Code (engineering)
**Supersedes priority of:** WO-007 (sitemap completion). WO-008 must ship first; WO-007 is moot until canonical URLs serve content.
**Estimated effort:** 30–60 minutes including verification.

---

## Why this work order exists (the bug)

Today's site-health check uncovered a critical regression: **every canonical URL declared on the site currently returns HTTP 404 in production.**

Observed live:

| Page | Canonical tag points to | What that URL actually returns |
|---|---|---|
| `/about.html` (200) | `https://premierjointcare.com/about` | **404** |
| `/conditions.html` (200) | `https://premierjointcare.com/conditions` | **404** |
| `/conditions/rheumatoid-arthritis.html` (200) | `https://premierjointcare.com/conditions/rheumatoid-arthritis` | **404** |
| `/conditions/lupus.html` (200) | `https://premierjointcare.com/conditions/lupus` | **404** |

Same for `/team`, `/contact`, `/florida`, `/new-york`, and all 45 condition slugs. The sitemap's 6 non-root entries also all 404.

The `vercel.json` `redirects` array (lines 5–131) — including 51 legacy WordPress redirects from `/about-premier-rheumatology`, `/our-team`, `/rheumatoid-arthritis`, etc. — is **not being applied in production**. Verified by hitting each of those URLs: they all return 404.

### Root cause

Vercel ignores the entire `redirects` array when a `routes` block is present. The current `vercel.json` ends with:

```json
"routes": [
  { "handle": "filesystem" },
  { "src": "/api/(.*)", "dest": "/api/$1" },
  { "src": "/(.*)", "dest": "/404.html", "status": 404 }
]
```

`routes` is the legacy Vercel routing system; when present, it fully overrides the newer `redirects` / `rewrites` / `cleanUrls` configuration. So:
- The filesystem handler matches `.html` files at their exact path (`/about.html` → `about.html`) — these work.
- Anything else (`/about`, `/conditions/lupus`, `/our-team`) immediately falls through to the catch-all 404 rule.
- No redirect ever fires.

### Why this matters

This single bug undermines the entire WO-001/WO-002/WO-004 investment:

1. **Canonical-tag self-inflicted damage.** Google's crawler finds `/conditions/rheumatoid-arthritis.html` (200), reads its `<link rel="canonical" href=".../conditions/rheumatoid-arthritis">`, tries the canonical URL, gets 404, and concludes the page should not be indexed under either URL. Confidence-weighted, Google treats canonical-to-404 as a strong "do not index" signal.
2. **Stale Google index confirmed.** `site:premierjointcare.com` currently returns only 4 URLs: `/`, `/about-premier-rheumatology/`, `/contact-us/`, `/our-team/` — all three of those legacy URLs now 404. Google has discovered zero of the 45 prerendered condition pages and none of the 6 SSR'd main pages under their new paths.
3. **Sitemap fix (WO-007) is blocked.** WO-007's `publicUrl()` helper outputs extensionless URLs (`/conditions/rheumatoid-arthritis`, `/about`, etc.) consistent with current canonical tags. Submitting that sitemap to Google today would tell Google about 52 URLs that all 404. Must fix WO-008 first, then WO-007 becomes safe and effective.
4. **51 legacy redirects are dead.** Patients clicking old links anywhere on the internet — old Google index entries, business cards, prior directory listings, the WordPress redirect map — get a 404 instead of being redirected to the new content. Brand damage on every legacy hit.

---

## What to change

### Option A (recommended) — Delete the `routes` block, enable `cleanUrls`

This is the cleanest fix and lets the `redirects` array do its job.

**File:** `/vercel.json`

**Edit 1 — add `"cleanUrls": true` near the top:**

```json
{
  "buildCommand": "node build.mjs",
  "outputDirectory": "dist",
  "trailingSlash": false,
  "cleanUrls": true,
  "redirects": [
    ...existing entries unchanged...
  ]
}
```

`cleanUrls: true` tells Vercel to:
- Serve `/about` from `about.html`
- Serve `/conditions/rheumatoid-arthritis` from `conditions/rheumatoid-arthritis.html`
- 301-redirect requests for the `.html` variant to the clean URL (matching our canonical tags)

**Edit 2 — delete the `routes` block entirely (lines 133–137):**

```json
  "routes": [
    { "handle": "filesystem" },
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/404.html", "status": 404 }
  ]
```

Vercel's default behavior already does the right thing without this block:
- Filesystem matching is automatic.
- `/api/*` routes are auto-detected from the `api/` directory.
- A `404.html` at the root of the output directory is automatically served on any unmatched route.

So deleting the block is safe. The two custom behaviors it was providing (api proxy + 404 fallback) are both Vercel defaults.

### Option B (fallback if Option A breaks anything) — Convert `routes` to `rewrites`

If for some reason Option A introduces a regression, replace the `routes` block with a `rewrites` block (which coexists with `redirects`):

```json
"rewrites": [
  { "source": "/api/:path*", "destination": "/api/:path*" }
]
```

And add per-page rewrites for clean URLs (more verbose, less maintainable than `cleanUrls`).

Option A is strongly preferred.

---

## Verification checklist (after deploy)

Run each of these. Each should pass.

1. **Canonical URLs serve content (no longer 404):**
   ```
   curl -sI https://premierjointcare.com/about | head -1                                    # expect HTTP/2 200
   curl -sI https://premierjointcare.com/conditions | head -1                               # expect HTTP/2 200
   curl -sI https://premierjointcare.com/conditions/rheumatoid-arthritis | head -1          # expect HTTP/2 200
   curl -sI https://premierjointcare.com/conditions/lupus | head -1                         # expect HTTP/2 200
   curl -sI https://premierjointcare.com/conditions/gout | head -1                          # expect HTTP/2 200
   curl -sI https://premierjointcare.com/team | head -1                                     # expect HTTP/2 200
   curl -sI https://premierjointcare.com/florida | head -1                                  # expect HTTP/2 200
   curl -sI https://premierjointcare.com/new-york | head -1                                 # expect HTTP/2 200
   ```

2. **Content at the clean URL matches the `.html` version:**
   ```
   curl -sL https://premierjointcare.com/conditions/rheumatoid-arthritis | grep -c FAQPage  # expect 1
   curl -sL https://premierjointcare.com/conditions/rheumatoid-arthritis | grep -oE '<title>[^<]*</title>'
   ```

3. **`.html` URL 301-redirects to the clean URL (cleanUrls behavior):**
   ```
   curl -sI https://premierjointcare.com/about.html | head -3
   # Expect: HTTP/2 308 (or 301) with Location: /about
   ```

4. **Legacy WordPress redirects fire:**
   ```
   curl -sIL https://premierjointcare.com/about-premier-rheumatology | grep -E '^HTTP|^location'
   curl -sIL https://premierjointcare.com/our-team | grep -E '^HTTP|^location'
   curl -sIL https://premierjointcare.com/rheumatoid-arthritis | grep -E '^HTTP|^location'
   curl -sIL https://premierjointcare.com/contact-us | grep -E '^HTTP|^location'
   # Each: a 301 to /about, /team, /conditions/rheumatoid-arthritis, /contact (then a 200 on the final page)
   ```

5. **404 page still serves on truly bad URLs:**
   ```
   curl -sI https://premierjointcare.com/this-does-not-exist | head -1                      # expect HTTP/2 404
   ```

6. **`site:premierjointcare.com` in Google Search after re-crawl** (give it 1–2 weeks, or submit the sitemap from WO-007 immediately after deploy): the new prerendered URLs should start replacing the legacy 404 entries.

7. **Google Search Console:** check the "Coverage" report. The "Page with redirect" and "Not found (404)" buckets should shrink as Google re-crawls.

---

## Sequencing

1. Deploy WO-008 first. Verify checklist above passes.
2. **Then** deploy WO-007 (sitemap completion). The sitemap will list extensionless canonical URLs — those URLs will now serve real content thanks to WO-008.
3. After both ship: resubmit `https://premierjointcare.com/sitemap.xml` in Google Search Console. Request reindexing of the 4 stale legacy URLs (`/about-premier-rheumatology/`, `/contact-us/`, `/our-team/`, root) so they get replaced with the new index.

---

## Expected impact

- Unblocks every canonical URL on the site (52 pages start serving 200 at their canonical path).
- Restores 51 dormant legacy WordPress redirects so old inbound links no longer 404.
- Removes the canonical-to-404 self-defeating signal Google has been seeing on the homepage and every prerendered page.
- Makes WO-007 deployable (sitemap will no longer be a list of 404s).
- Highest-ROI on-site engineering change available right now. Single config-file edit, no content changes, no risk to the SSR work already shipped.

## Risk

- Very low. `cleanUrls: true` is a Vercel-native flag that's been stable for years. Deleting a `routes` block whose behaviors are already Vercel defaults is a no-op functionally.
- One thing to spot-check after deploy: the `/api/*` paths still work (POST to `/api/contact` if you have a contact-form handler). Verification step #5 covers the 404 fallback; if `/api/contact` 404s after deploy, restore Option B's `rewrites` block.
