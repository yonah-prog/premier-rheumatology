# SEO Work Order #015 — Interim corrected sitemap using working `.html` URLs (unblock condition-page indexing)

**Author:** Cowork SEO agent
**Date:** 2026-06-09
**Status:** ✅ IMPLEMENTED in repo 2026-06-10 (morning deep pass) — pending deploy via WO-012. `sitemap.xml` rewritten to 52 working URLs (apex `/` + 6 main `.html` + all 45 `/conditions/*.html`); zero extensionless entries; `robots.txt` reference unchanged. `build.mjs` copies the repo through to `dist`, so the new sitemap propagates on next deploy. GSC sitemap resubmit + index requests (RA/lupus/gout/osteoporosis/psoriatic) remain a human step post-deploy.
**Implementer:** Claude Code (engineering)
**Depends on:** Nothing. Deliberately decoupled from WO-008 (clean URLs) and WO-013 (apex serving). Ship on next deploy.
**Relationship to WO-007:** This is the *interim, ship-now* version of WO-007. WO-007 auto-generates the sitemap at build time but was parked behind WO-008/WO-013. This WO ships a correct sitemap **today** using URLs that already return 200, then WO-007 can later automate it. If WO-007 ships first with `.html` URLs, this WO is satisfied — close it.
**Estimated effort:** 15–25 minutes of agent time.

---

## Why this work order exists (new evidence, 2026-06-09)

Two things are now true at the same time, and together they point to one clear lever:

1. **New-build `.html` URLs that Google has indexed are starting to surface.** Today's pass logged `premierjointcare.com/florida.html` on page 1 for **three** Boca queries ("lupus specialist," "biologic infusion therapy," "psoriatic arthritis"), and `premierjointcare.com/new-york.html` surfaced in an AI answer for a Queens query (the first Queens AI surfacing in 15 passes). So when a new-build page gets indexed, it ranks.

2. **The 45 condition pages are not getting indexed, and the sitemap is actively working against us.** `https://premierjointcare.com/sitemap.xml` currently lists **7 URLs**, and they are the **extensionless** forms (`/about`, `/florida`, `/new-york`, `/team`, `/conditions`, `/contact`) — which **404 in production** per WO-008 (real content lives at `*.html`). So the sitemap we hand to crawlers points them at dead URLs, and the 45 real condition pages (`/conditions/<slug>.html`) are absent entirely.

The condition keywords with **zero** Premier presence today — "rheumatoid arthritis treatment Boca Raton," "osteoporosis treatment Boca Raton," "gout specialist Boca Raton," "autoimmune specialist Boca Raton" — are exactly the pages missing from the sitemap. We have the content (45 prerendered pages, 8 with deepened FAQ JSON-LD); Google just doesn't know it exists.

**The fix is a small, mechanical, low-risk change with multiplicative upside on every prior on-page work order.** It does not touch routing, DNS, or hosting, so it is safe to ship independent of the WO-008 clean-URL change and the WO-013 apex work.

---

## What to change

Replace `/sitemap.xml` with a complete sitemap that lists only URLs that **return HTTP 200 today** — i.e. the `.html` forms for main + location pages and every condition page, plus the apex `/`.

### Rules
- **Use `.html` extensions** for every page except the homepage (`/`). These resolve 200 right now; the extensionless forms 404 (WO-008).
- **Host:** use the canonical apex `https://premierjointcare.com/...` (no `www`), matching the canonical-tag policy. (Apex 301s to `www`, but list the canonical host; that is what the `<link rel=canonical>` tags already declare.)
- **Include all 45 condition pages** under `/conditions/<slug>.html` (full list below).
- **`<lastmod>`** = `2026-06-09` for the regenerated file.
- **Priorities:** homepage `1.0`; location + main pages `0.9`; `team`/`conditions` index `0.8`; `contact` `0.7`; condition detail pages `0.7`; `changefreq` `monthly` (yearly for `contact`).

### File: `/sitemap.xml`

Main + location + index pages (note `.html`):
```
https://premierjointcare.com/                 (priority 1.0)
https://premierjointcare.com/about.html        (0.9)
https://premierjointcare.com/florida.html      (0.9)
https://premierjointcare.com/new-york.html     (0.9)
https://premierjointcare.com/team.html         (0.8)
https://premierjointcare.com/conditions.html   (0.8)
https://premierjointcare.com/contact.html      (0.7)
```

Condition detail pages — `https://premierjointcare.com/conditions/<slug>.html` for each of the 45 slugs (priority 0.7 each):
```
ankylosing-spondylitis, bursitis, chronic-fatigue-syndrome, chronic-joint-pain,
chronic-musculoskeletal-pain, degenerative-disc-disease, enteropathic-arthritis,
fibromyalgia, fragility-fractures, gout, inflammatory-back-pain,
juvenile-idiopathic-arthritis-jia, knee-pain, ligament-tendon-inflammation,
lupus-systemic-lupus-erythematosus, lupus, mechanical-back-pain, metabolic-bone-disease,
mixed-connective-tissue-disease, myofascial-pain-syndrome, neck-pain, osteoarthritis,
osteopenia, osteoporosis, overuse-joint-injuries, polymyalgia-rheumatica,
positive-autoimmune-blood-tests, pseudogout-cppd, psoriatic-arthritis, reactive-arthritis,
repetitive-strain-injuries, rheumatoid-arthritis, sacroiliitis, sarcoidosis, scleroderma,
shoulder-pain, sjogrens-syndrome, spinal-arthritis, sports-related-inflammatory-conditions,
temporal-arteritis-giant-cell-arteritis, tendinitis,
undifferentiated-connective-tissue-disease, unexplained-inflammation,
unexplained-joint-pain, vasculitis
```

That is **7 + 45 = 52 URLs.**

### Generation tip (so this is reproducible)
A `.html` URL set can be generated mechanically from the repo so no slug is mistyped:
```bash
ls conditions/*.html | sed 's#conditions/#https://premierjointcare.com/conditions/#'
```
Wrap each in `<url><loc>…</loc><lastmod>2026-06-09</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>` and prepend the 7 main entries. Make sure `build.mjs` copies `sitemap.xml` through to `dist/` unmodified (it is not in `PAGES`, so it is copied through — confirm it lands in `dist/sitemap.xml`).

---

## Important caveat on canonical vs. sitemap host
The homepage `<link rel=canonical>` currently points to the **apex** (`https://premierjointcare.com/`) while the apex **301-redirects to `www`**. That is a (pre-existing) minor mismatch, not introduced by this WO. List the **apex** `.html` URLs here to match the canonical tags. If WO-008/clean-URL work later changes the canonical policy, regenerate the sitemap to match (WO-007 automates this).

---

## Verification checklist (for Claude Code after implementing)
- [ ] `https://premierjointcare.com/sitemap.xml` returns 200 and is valid XML (52 `<url>` entries).
- [ ] Spot-check 5 listed URLs return **200** (e.g. `/conditions/rheumatoid-arthritis.html`, `/conditions/gout.html`, `/conditions/osteoporosis.html`, `/florida.html`, `/new-york.html`). None should 404.
- [ ] No extensionless URLs remain in the sitemap (grep for `/about<`, `/florida<`, etc. should return nothing).
- [ ] `dist/sitemap.xml` matches the source after `npm run build` (build copies it through; confirm not overwritten with the old 7-URL version).
- [ ] `robots.txt` still references `https://premierjointcare.com/sitemap.xml` (unchanged).
- [ ] After deploy, submit the updated sitemap in Google Search Console and request indexing for 3–5 priority condition pages (RA, lupus, gout, osteoporosis, psoriatic arthritis).

## Out of scope
- Clean/extensionless URLs (WO-008) — independent; this WO uses the `.html` forms that already work.
- Apex serving / DNS (WO-013) — independent.
- Auto-generating the sitemap at build (WO-007) — this is the manual interim; WO-007 supersedes when it ships.
```