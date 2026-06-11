# SEO Work Order #016 — Dedicated infusion-therapy service page (`/infusion-therapy.html`)

**Author:** Cowork SEO agent
**Date:** 2026-06-11
**Status:** ⏳ DRAFTED — awaiting Yonah's approval, then Claude Code to implement. NOT yet built.
**Implementer:** Claude Code (engineering)
**Depends on:** Nothing to build the page. Goes live on next deploy (gated by WO-012 push auth, like everything else). Add to `sitemap.xml` (WO-015) when created.
**Estimated effort:** 45–75 minutes of agent time.

---

## Why this work order exists (evidence, 2026-06-11)

Two independent findings point at the same missing page:

1. **"Biologic infusion therapy Boca Raton" is the one service term Premier consistently loses — to the wrong kind of competitor.** Across the daily passes the page-1 SERP and the AI answers for both "biologic infusion therapy Boca Raton" and the natural-language probe "where can I get biologic infusions near Boca Raton" are dominated by **wellness/IV-drip and hospital infusion centers** — BocaInfusion, thebiostation, Restore Hyper Wellness, änasa, Hybrid Medical, 4Ever Young, Baptist Health, First Choice Neurology. These are NAD+/vitamin-drip or general hospital infusion businesses, **not** rheumatology biologic providers. Premier's genuine differentiator — *on-site biologic/IV infusions for autoimmune and inflammatory disease, in the same office as the rheumatologist, no separate infusion-center referral* — is real, repeated all over the site's body copy, and yet has **no dedicated landing page to rank or be cited for it.** This is the clearest "we have the substance but not the page" gap on the site.

2. **The site's own content model already assumes this page exists — and it doesn't.** `conditions-data.jsx` contains **12 internal links to `infusion-therapy.html`** (e.g. lines 538, 963, 1241, 1692, 2123, 2625, 2944, 3019, 3335, 3653 …), with anchor text like "infusion-based therapies" and "Infusion-based treatments." But **`infusion-therapy.html` does not exist anywhere in the repo** (`find . -iname "infusion-therapy*"` → nothing). So every one of those links is a latent broken internal link / 404 wherever the article body renders it. The homepage's "Infusion Therapy Services" service card also points to `conditions.html` rather than a real infusion page.

Building one page fixes both: it captures the highest-intent un-owned service term **and** resolves the 12 dangling internal links into a real, crawlable, internally-linked destination (internal links to a page Google can see are a ranking signal).

> Implementer note: confirm which *rendered* `conditions/*.html` currently emit the `infusion-therapy.html` anchor (the links are present in the `conditions-data.jsx` source; verify the build's rendered output) so the new page resolves them rather than leaving 404s. If the build currently strips these anchors, the page still stands on its own SEO merits — but wiring the internal links through is part of the value.

---

## What to build

Create **`/infusion-therapy.html`** — a top-level service page (sibling of `florida.html`, `conditions.html`), built through the existing `build.mjs` pipeline so it gets the standard prerendered head + Chrome (nav/footer) and is server-rendered HTML (not a client-only shell). Follow the existing main-page pattern; do NOT introduce a new template system.

### Target query set
Primary: **"biologic infusion therapy Boca Raton"**, "infusion therapy Boca Raton", "IV infusion rheumatology Boca Raton", "biologic infusions near me".
Secondary (Queens): "infusion therapy Queens NY" — but the on-site infusion suite is the **Boca Raton** office, so the page should be honest that infusions are administered in Boca Raton (per the body copy already used in `conditions-data.jsx`).

### Head metadata (mirror the site's existing convention — all four fields kept in sync)
- **`<title>`** (≤60 chars): `Biologic & IV Infusion Therapy in Boca Raton | Premier Rheumatology`
- **`<meta name="description">`** (≤160 chars): `On-site biologic and IV infusion therapy in Boca Raton, FL for rheumatoid arthritis, lupus, and autoimmune disease — administered in-office by your rheumatologist.`
- Mirror into `og:title`/`og:description`/`twitter:title`/`twitter:description` and set `og:url`/canonical to `https://premierjointcare.com/infusion-therapy.html` (apex host, matching the site's canonical policy; do **not** use `premierrheumatology.com`).
- `meta robots: index, follow, max-image-preview:large`.

### Page content (extractable, AEO-structured — use the ai-seo methodology)
Write in the site's existing clinical-but-warm voice. Structure for extraction:

1. **H1:** `Biologic & IV Infusion Therapy in Boca Raton`
2. **Lead paragraph / "local answer" (1–3 sentences, directly quotable):** State plainly that Premier Rheumatology provides on-site biologic and IV infusion therapy in its Boca Raton office for autoimmune and inflammatory conditions, so patients receive advanced medications in the same office as their rheumatologist without a separate infusion-center referral. (This mirrors the `localAnswer` pattern already used in `conditions-data.jsx` — reuse that exact framing so it's consistent.)
3. **What we infuse (extractable list):** common rheumatology biologics/IV agents named generically (e.g. infliximab, rituximab, belimumab, abatacept, tocilizumab, IV immunoglobulin, zoledronic acid for bone health) — described as examples, not a promise of any specific drug. Frame around the *conditions* treated: RA, lupus, psoriatic arthritis, vasculitis, scleroderma, osteoporosis (IV bone agents).
4. **How on-site infusion works (numbered steps):** referral/eval → insurance prior-auth & benefit verification (the office handles it) → scheduled in-office infusion under clinical supervision → monitoring & follow-up. Steps are highly extractable for AI answers.
5. **Why on-site (vs. a separate infusion center):** continuity with the treating rheumatologist, same-office convenience, clinical supervision — the genuine differentiator vs. the wellness-IV and standalone-center competitors who currently own this SERP.
6. **FAQ block with FAQPage JSON-LD** (this is the single highest-leverage AEO element — 4–6 Q&As). Reuse/adapt the infusion Q&As already written in `conditions-data.jsx`, e.g.:
   - "Do I have to drive to a separate infusion center for biologics?" → No; administered on-site in Boca Raton.
   - "Will my insurance cover biologic infusions?" → Most major commercial plans and Medicare cover medically-necessary biologic infusions; the office handles prior auth and benefit verification.
   - "Which conditions are treated with infusion therapy here?" → RA, lupus, psoriatic arthritis, vasculitis, scleroderma, osteoporosis (IV bone therapy), and other inflammatory/autoimmune disease.
   - "Is infusion therapy available at the Queens office?" → Be accurate per current operations (on-site infusion suite is the Boca Raton office); Queens patients are directed accordingly.
   - "How long does an infusion appointment take?" / "Is it safe?" → standard reassurance copy.
7. **NAP + CTA:** Boca Raton office address (2900 N Military Trl, Suite 230, Boca Raton, FL 33431), phone (561) 730-3894, link to `contact.html`. Include `MedicalClinic`/`MedicalProcedure` or `MedicalTherapy` schema if it fits the site's existing schema pattern, in addition to the FAQPage JSON-LD.

### Wiring it in
- **Internal links IN:** point the existing 12 `infusion-therapy.html` references in `conditions-data.jsx` at the now-real page (verify they render). Add a link from the homepage "Infusion Therapy Services" service card (currently → `conditions.html`) to `/infusion-therapy.html`. Add it to the `florida.html` services list if one exists.
- **Sitemap:** add `https://premierjointcare.com/infusion-therapy.html` to `sitemap.xml` (priority `0.9`, `changefreq monthly`, `lastmod` = build date) — this brings the WO-015 sitemap to 53 URLs.
- **Nav:** optional — do not clutter the top nav; the service card + condition-page links are sufficient.

---

## Verification checklist (for Claude Code after implementing)
- [ ] `https://premierjointcare.com/infusion-therapy.html` returns **200** and is **server-rendered** (curl returns the H1 + body text, not an empty `<div id="root">`).
- [ ] `<title>` ≤60 chars, `<meta description>` ≤160 chars, all four og/twitter fields mirrored, canonical → `https://premierjointcare.com/infusion-therapy.html`.
- [ ] Valid **FAQPage JSON-LD** present and matches the visible FAQ copy (test in Google Rich Results Test).
- [ ] All 12 `infusion-therapy.html` links in the rendered condition pages resolve to **200** (no 404s); homepage service card updated.
- [ ] `infusion-therapy.html` present in `dist/` after `npm run build` and in `sitemap.xml` (now 53 URLs).
- [ ] No `premierrheumatology.com` references; NAP matches the site (Boca Ste 230 / (561) 730-3894).
- [ ] After deploy: request indexing in GSC for `/infusion-therapy.html` and re-submit the sitemap.

## Out of scope
- Claims about specific drugs being guaranteed/stocked — keep examples generic and medically careful.
- A separate Queens infusion page — single page, honest about where infusions are administered.
- Paid search for the infusion term — organic/AEO only here.
