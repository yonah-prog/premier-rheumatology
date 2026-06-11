# WO-013 — Apex serving INCONSISTENT content (legacy WordPress vs. React build) — 🚨 REOPENED / CONFIRMED (CRITICAL)

**Status:** 🚨 **OPEN — CONFIRMED.** Reopened 2026-06-08 morning deep pass on fresh live fetches that show the exact legacy markers this WO's prior closure named as the reopen trigger. **Human / infra action required (Vercel domain assignment + apex DNS).**

> **🔑 KEY DIAGNOSIS (2026-06-08): the apex is serving INCONSISTENT responses.** On 2026-06-08, two same-day passes fetched the **same** URL `https://premierjointcare.com/` and got **different sites**: this deep pass got the **legacy WordPress** build (evidence below); a concurrent pass got the **React/SSR** build (phone 730-3894, Queens, Dr. Bruce Stein). Both observations are credible. This intermittency — not a one-time regression and not a "stale snippet" — is the real defect, and it explains why WO-013 has flip-flopped OPEN/CLOSED across the week: different fetches genuinely return different origins. **Likely cause: the apex resolves to / is served by two origins** (legacy WordPress host *and* Vercel) via split DNS, a lingering A-record, failover, or edge inconsistency. A site that serves WordPress on *any* fraction of requests at its canonical host is broken for SEO and for patients. **Re-close criterion is therefore stricter than before: multiple consecutive healthy fetches across several passes AND confirmation the legacy WP host/record is fully decommissioned — not a single healthy fetch.**
**Opened:** 2026-06-06 (filed CRITICAL).
**Closed (DISPROVEN):** 2026-06-06 evening + 2026-06-07 morning — prior passes reported live fetches showing the React build at the apex.
**REOPENED:** 2026-06-08 morning deep pass — see live evidence below. The prior "disproven" closure does **not** hold against today's live responses.
**Severity:** CRITICAL. The apex `https://premierjointcare.com/` is the canonical host for the entire new build; it is currently serving the old WordPress site.

---

## Why this is reopened (the prior closure authorized exactly this)

The prior closure stated, verbatim: *"Do NOT reopen without a fresh live fetch of `https://premierjointcare.com/` that actually shows the legacy markers… Only if it ever shows (561) 440-3270 or a 'What is physiotherapy?' FAQ should this be reopened."*

Today's fresh live fetches show **both** of those exact markers, plus every other legacy signal. The documented reopen bar is met.

## Live evidence — 2026-06-08 morning deep pass

Two independent live fetches this pass:

**1. `https://premierjointcare.com/` (apex, no redirect to www observed)** returned the legacy WordPress homepage:
- `<title>` = "Premier Rheumatology | Florida's Top Joint & Autoimmune Care" (legacy WP title)
- Header phone **(561) 440-3270**; **Fax: (561)-440 3280** (old numbers)
- Logo + images served from **`/wp-content/uploads/...`**
- FAQ is lorem-ipsum **"What is physiotherapy?"** placeholder content
- Providers: **Boucher + Akerman only** — **no Dr. Bruce Stein, no Queens office**
- Footer: **"© 2026 Specialty infusions FL Inc"**
- Nav points to legacy WP URLs: `/about-premier-rheumatology/`, `/our-team/`, `/contact-us/`, `/rheumatology-services/`, `/infusion-therapy/`, `/osteoarthritis/`, `/osteopenia/`

**2. `https://premierjointcare.com/our-team/`** returned **200** with a full live WordPress page (NOT a 301 to `/team.html` as `vercel.json` would produce): `meta-generator: Elementor 3.35.7`, live `canonical`/OG tags, `wp-content` images, phone **(561) 440-3270**, footer "© 2026 Premier Rheumatology PLLC", Boucher + Akerman only. The Elementor generator tag and live response headers confirm this is a **live WordPress server**, not a cached Google snippet.

| Signal | Correct (new build, in repo) | Live apex 2026-06-08 (ACTUAL) |
|---|---|---|
| `<title>` | "Rheumatologist in Boca Raton, FL & Queens, NY \| Premier Rheumatology" | "Premier Rheumatology \| Florida's Top Joint & Autoimmune Care" ❌ |
| Phone | (561) 730-3894 | **(561) 440-3270** ❌ |
| FAQ | real rheumatology Q&A | lorem-ipsum "What is physiotherapy?" ❌ |
| Images | `/Images/...`, `/logo.png` | **`/wp-content/uploads/...`** ❌ |
| Providers | Boucher + Akerman + **Dr. Bruce Stein** | Boucher + Akerman only ❌ |
| Locations | Boca Raton + Coconut Creek + Queens | Boca only ❌ |
| Footer | "© 2026 Premier Rheumatology" | "© 2026 Specialty infusions FL Inc" ❌ |
| `/our-team/` | 301 → `/team.html` (per vercel.json) | **200, live WP page (Elementor)** ❌ |

## Corrected root-cause analysis (supersedes the "stale snippet" theory)

The 2026-06-06/06-07 closures attributed the legacy markers to **Google's stale index snippet** while asserting the live apex served the React build. **Today's live fetches disprove that.** The markers are on the **live server**, not in a cache:
- `/our-team/` returns a live Elementor-generated WordPress page with live response headers — caches don't emit `meta-generator: Elementor 3.35.7` with a 200 from the origin.
- A `site:premierjointcare.com` search surfaces **only** legacy WordPress URLs (`/osteoarthritis/`, `/our-team/`, `/contact-us/`, `/osteopenia/`); none of the new build's URLs (`/florida`, `/new-york`, `/conditions/<slug>`, `*.html`) are indexed — consistent with the new build **never having been live at the apex**, not merely a slow re-crawl.

**Most likely technical cause (for human to confirm):** the apex `premierjointcare.com` is still pointed at / served by the **legacy WordPress host**, not the Vercel deployment. Either (a) the apex A/ALIAS record points at the old WP host, or (b) the apex is not assigned to the Vercel project, or (c) the Vercel project for the new build was never promoted to production on this domain. The repo's React build is correct and current (verified: `index.html` carries apex canonical, phone 730-3894, Queens, `MedicalClinic` JSON-LD) — **this is a deployment/DNS problem, not a code problem.**

> Note on the prior "disproven" record: I could not independently re-fetch the `www` subdomain this pass (tooling provenance limit), so it's possible `www` serves the React build while the **apex** does not. If so, that is itself a critical misconfiguration, because every canonical, OG URL, and sitemap entry in the new build points to the **apex** (`https://premierjointcare.com/`) — which is serving WordPress. The honest, verifiable finding stands either way: the canonical apex host is serving the legacy WordPress site today.

## Required human action (do NOT auto-fix — infra, outside autonomy)

1. **Confirm what the apex serves:** open `https://premierjointcare.com/` and `https://www.premierjointcare.com/` in a browser. Note which one shows phone (561) 730-3894 + Queens + Dr. Bruce Stein (new build) vs. (561) 440-3270 + "What is physiotherapy?" (legacy WP).
2. **In Vercel:** verify the `premier-rheumatology` project owns both `premierjointcare.com` (apex) and `www.premierjointcare.com`, and that the latest production deployment is the React build.
3. **In DNS:** point the apex A/ALIAS (and `www` CNAME) at Vercel per Vercel's domain instructions; remove any record still pointing at the legacy WordPress host.
4. **Decommission / redirect the legacy WordPress** so it can't reclaim the domain.
5. After cutover, re-fetch apex + `/florida` + `/new-york` + `/conditions/<slug>` and confirm the new build + correct phone; then submit the updated sitemap (WO-007) to force re-crawl.

## Relationship to other WOs
- **Supersedes the WO-008 "stale snippet" framing in priority.** WO-008 (clean-URL canonicals in `vercel.json`) only matters **once the React build is actually live at the apex** — it is currently moot in production.
- **WO-012** (push auth) compounds this: even a corrected build can't deploy until push/deploy is restored.

## Reopen/close discipline
This reopening is backed by two live fetches captured 2026-06-08 (apex homepage + `/our-team/`). Do **not** re-close as "disproven" without a fresh live fetch of the apex showing phone **(561) 730-3894**, the Queens office, and Dr. Bruce Stein — i.e., the inverse of today's evidence.

---

## Recurrence log

- **2026-06-08 morning** — REOPENED on live evidence (above).
- **2026-06-10 (morning/midday/evening)** — apex fetched **clean** (correct React build at the homepage; Suite 236 propagating). Per the strict re-close criterion (multiple consecutive healthy fetches across passes AND legacy host decommissioned), this did **not** clear the WO — and today proves why.
- **2026-06-11 — 🚨 SAME-DAY TWO-ORIGIN EVIDENCE (strongest since 06-08).** Two same-day deep passes fetched the **same** apex URL `https://premierjointcare.com/` and got **different sites**, exactly as the KEY DIAGNOSIS predicts:
  - **Pass A (concurrent):** apex returned the **correct React build** — title "Rheumatologist in Boca Raton, FL & Queens, NY | Premier Rheumatology", 301→www, phone 730-3894, Boucher + Akerman + Dr. Bruce Stein, Boca Ste 230 + Coconut Creek Ste 236 (footer caught up), 0 WP markers, canonical → apex. (Recorded in `seo-daily-notes/2026-06-11.md` main note as "Site health — CLEAN.")
  - **Pass B (this pass):** apex returned the **legacy WordPress** homepage — `<title>` "Premier Rheumatology | Florida's Top Joint & Autoimmune Care"; header phone **(561) 440-3270** + Fax (561)-440 3280; `/wp-content/uploads/...` images; lorem-ipsum **"What is physiotherapy?"** FAQ; **Boucher + Akerman only, no Dr. Bruce Stein / no Queens**; footer **"© 2026 Specialty infusions FL Inc"**; nav to legacy WP URLs.
  - Both fetches are credible. The repo source is verified correct in both passes (deploy/serving problem, not code): `index.html` title correct, phone 730-3894, apex canonical, 0 WP markers; `florida.html`/`new-york.html` correct titles, Suite 230 + Suite 236. **This is the intermittent two-origin defect — not a one-off regression and not a stale snippet.** It confirms the apex is still being served by two origins (legacy WP + Vercel) on a per-request basis. Required human action unchanged (see above): assign the apex to the Vercel project / repoint apex DNS off the legacy WP host and decommission the WordPress origin. `www` not independently fetchable this pass (web_fetch provenance allow-list).
