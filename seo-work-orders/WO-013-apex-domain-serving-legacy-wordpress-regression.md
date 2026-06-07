# WO-013 — Apex "reverted to legacy WordPress" alert — ✅ CLOSED (DISPROVEN)

**Status:** ✅ CLOSED — DISPROVEN. No human action required. Do NOT reopen without a fresh live fetch of `https://premierjointcare.com/` that actually shows the legacy markers in the table below.
**Opened:** 2026-06-06 (auto pass) — filed as a CRITICAL "apex serving WordPress" regression.
**Disproven:** 2026-06-06 evening pass (3 live fetches) and **re-confirmed disproven 2026-06-07 morning deep pass** (independent live fetches of apex + /florida + /new-york + /conditions + /team).
**Severity (as filed):** CRITICAL. **Actual:** none — the live apex has been healthy on every verified fetch.
**Type:** False alarm originating from a stale Google index snippet (see Root cause). The real, low-severity kernel is tracked under **WO-008**.

---

## Summary

A 2026-06-06 pass filed this WO claiming the apex `https://premierjointcare.com/` had reverted to the old WordPress site — wrong phone (561) 440-3270, lorem-ipsum "physiotherapy" FAQ, `/wp-content/` images, no Queens office / no Dr. Bruce Stein, footer "© 2026 Specialty infusions FL Inc". After it was retracted, a "CONFLICT NOTE" banner re-asserted the regression, creating a self-perpetuating reopen loop across passes.

**Every claim in the alert is contradicted by the live site.** The apex 307-redirects to `www` and serves the correct React/SSR build. Verified independently on 2026-06-06 (3×) and again on 2026-06-07.

## Live evidence — 2026-06-07 morning deep pass

Direct fetches of `https://premierjointcare.com/` (→ 307 → `https://www.premierjointcare.com/`) and the `/florida`, `/new-york`, `/conditions`, `/team` pages all returned the correct current build:

| Signal | Alert claimed (WRONG) | Live apex 2026-06-07 (ACTUAL) |
|---|---|---|
| `<title>` | "Premier Rheumatology \| Florida's Top Joint & Autoimmune Care" | "Rheumatologist in Boca Raton, FL & Queens, NY \| Premier Rheumatology" ✅ |
| Phone | (561) 440-3270 | **(561) 730-3894** ✅ |
| FAQ | lorem-ipsum "physiotherapy" | real rheumatology content / no lorem ipsum ✅ |
| Images | `/wp-content/...` | `/Images/...` ✅ |
| Providers | Boucher + Akerman only | Boucher + Akerman + **Dr. Bruce Stein** all present ✅ |
| Locations | Boca only | Boca Raton + Coconut Creek + Queens ✅ |
| Footer | "© 2026 Specialty infusions FL Inc" | "© 2026 Premier Rheumatology" ✅ |
| Canonical | — | `https://premierjointcare.com/` ✅ |

No legacy markers (`440-3270`, `wp-content`, "physiotherapy", "Specialty infusions FL", "Florida's Top Joint") appear anywhere in the live responses.

## Root cause of the false alarm

The legacy markers the alert cited are real — but they live in **Google's stale indexed snippet**, not on the live site. The 2026-06-07 brand search for "Premier Rheumatology Boca Raton" still surfaces the old WordPress title ("Florida's Top Joint & Autoimmune Care"), legacy WP URLs (`/osteoarthritis/`, `/our-team/`, `/contact-us/`, `/about-premier-rheumatology/`, `/osteopenia/`), and the old phone **(561) 440-3270** — all served from Google's cache. A pass that read the cached SERP instead of the live page mistook the stale index for a live regression.

That stale-index issue is genuine but low-severity and is already tracked as **WO-008** (clean-URL canonicals / retiring legacy indexed URLs). Shipping WO-008 plus the expanded sitemap (WO-007) will accelerate re-crawl and clear the legacy snippet.

## Disposition

- **No DNS / Vercel domain action is warranted.** The apex is correctly assigned and serving the React build via Vercel.
- This WO is committed in the CLOSED state to end the reopen loop. The only real follow-up is **WO-008**.
- 30-second human spot-check if ever in doubt: open `https://premierjointcare.com/` — it shows phone **(561) 730-3894**, the Queens office, and Dr. Bruce Stein. Only if it ever shows (561) 440-3270 or a "What is physiotherapy?" FAQ should this be reopened.
