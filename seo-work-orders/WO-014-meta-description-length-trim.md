# WO-014 — Trim over-length meta descriptions on index / about / team

**Status:** 🔁 **REOPENED 2026-09-02.** The 2026-06-08 trim shipped, but `/about.html` has since drifted back to **168 characters** — above this WO's ≤162 target. `/` (149) and `/team.html` (160) are still within target. Likely re-lengthened by the 2026-09-01 meta rewrite (`6b59ed4`); that copy was authored deliberately by the SEO agent, so the trim needs a content decision rather than a blind re-cut.
**Priority:** Low-to-medium. Low risk, quick win. Independent of WO-008 (these pages are LIVE at 200, so the fix takes effect on the next deploy — no routing dependency).
**Owner to implement:** Claude Code (after Yonah approves)
**Type:** On-page SEO (SERP snippet quality)

---

## Problem

The `<meta name="description">` on the three top-of-funnel pages exceeds Google's snippet display width (~155–160 rendered characters) and is being truncated mid-sentence in search results:

| Page | Current length | Truncates? |
|---|---|---|
| `index.html` | **222 chars** | Yes — cut after "…autoimmune disease, with on-site biolog…" |
| `about.html` | **228 chars** | Yes |
| `team.html` | **226 chars** | Yes |

(For reference, `florida.html` 193, `new-york.html` 177, `conditions.html` 197, `contact.html` 162 are acceptable and are **not** changed by this WO.)

Truncated descriptions waste the highest-value SERP real estate (the brand result is #1) and can drop the call-to-action ("Now accepting new patients") below the fold of the snippet. This is the only remaining on-page meta gap found across the 7 main + 45 condition pages — everything else (titles, canonicals, OG/Twitter, alt text, schema) is complete.

Only the `name="description"` tag is affected. The `og:description` and `twitter:description` tags on these pages are already short and are **left unchanged**.

---

## Exact edits

### 1. `index.html` — line 8

**Find:**
```html
<meta name="description" content="Board-certified rheumatology care in Boca Raton, FL and Queens, NY. Expert treatment for rheumatoid arthritis, lupus, gout, osteoporosis, and autoimmune disease, with on-site biologic infusions. Now accepting new patients." />
```
**Replace:**
```html
<meta name="description" content="Board-certified rheumatology care in Boca Raton, FL &amp; Queens, NY. Expert treatment for arthritis, lupus, gout &amp; autoimmune disease. Now accepting new patients." />
```
Rendered length: **159 chars.** Keeps both metros, the top conditions, and the "Now accepting new patients" CTA.

### 2. `about.html` — line 9

**Find:**
```html
<meta name="description" content="Premier Rheumatology is a specialty practice with board-certified rheumatologists in Boca Raton, FL and Queens, NY. Expert diagnosis and personalized treatment for arthritis, lupus, gout, osteoporosis, and autoimmune conditions." />
```
**Replace:**
```html
<meta name="description" content="Premier Rheumatology: board-certified rheumatologists in Boca Raton, FL &amp; Queens, NY. Expert care for arthritis, lupus, gout, osteoporosis &amp; autoimmune disease." />
```
Rendered length: **160 chars.**

### 3. `team.html` — line 9

**Find:**
```html
<meta name="description" content="Meet the Premier Rheumatology team — board-certified rheumatologists Dr. Mouriel Boucher (Boca Raton, FL), Natalie Akerman NP, and Dr. Bruce Stein (Queens, NY). Specialists in arthritis, lupus, gout, and autoimmune conditions." />
```
**Replace:**
```html
<meta name="description" content="Premier Rheumatology's board-certified team: Dr. Mouriel Boucher (Boca Raton), Natalie Akerman NP &amp; Dr. Bruce Stein (Queens) — arthritis, lupus &amp; autoimmune care." />
```
Rendered length: **162 chars.** Keeps all three provider names (a strong differentiator vs. directory snippets).

> Note on style: existing descriptions spell out "and"; these rewrites use "&amp;" (renders as "&") to hold the length under the truncation limit while preserving every keyword. If Yonah prefers spelling out "and", drop the osteoporosis/condition tail instead to stay under 160 — but the ampersand version is recommended.

---

## Build / deploy note

These files are hand-authored HTML in the repo root and are served directly (verified live at 200). If `build.mjs` regenerates `<head>` from a source/template, apply the change at the source instead so it survives the next build — check whether `build.mjs` injects meta tags before editing the static files. If the static `.html` files are the source of truth (they appear to be), edit them directly.

This change is independent of WO-008 (no routing/canonical impact) and ships on the next normal deploy — but note the deploy itself is still gated by **WO-012** (push auth).

---

## Verification checklist

- [ ] `index.html`, `about.html`, `team.html` each have a single `name="description"` meta whose rendered (decoded) length is ≤ 162 chars.
- [ ] og:description / twitter:description on these pages are unchanged.
- [ ] No other `<head>` tags altered; titles and canonicals untouched.
- [ ] If `build.mjs` owns `<head>`, the change is made at the source and survives `npm run build`.
- [ ] Post-deploy: fetch each page live and confirm the new description is served; run the brand result through Google Rich Results / a SERP preview tool and confirm no mid-word truncation.
- [ ] Old phone/tagline NOT reintroduced (no regression markers).
