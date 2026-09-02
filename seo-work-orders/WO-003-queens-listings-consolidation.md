# SEO Work Order #003 — Consolidate Dr. Stein's Queens directory presence under Premier Rheumatology

**Author:** Cowork SEO agent
**Date:** 2026-05-27
**Status:** ✅ **APPROVED 2026-09-02 by Yonah.** Off-site directory work is Yonah / front-desk; the small redirect + cross-link portion is ready for Claude Code.
**Implementer:** Mostly Yonah / front-desk (off-site directory work). Claude Code only handles a small redirect + cross-link step (Part B).
**Depends on:** Independent of WO-001/WO-002 — can start in parallel.

---

## Context

In today's AI-visibility check, Dr. Bruce Stein already has STRONG third-party authority in Queens. He shows up on Healthgrades, US News Doctors, WebMD, Sharecare, Caredash, FindATopDoc, Medical News Today, Healthline FindCare, and Zocdoc with solid ratings (~4.3/5 Zocdoc, 5.0/5 Sharecare, "highly recommended" US News). For the query "Dr Bruce Stein rheumatologist Queens NY" those profiles dominate page 1.

The problem: every profile ties him to **"Floral Park Arthritis PC"** at `floralparkarthritis.com`, not to Premier Rheumatology / premierjointcare.com. All that hard-earned authority flows to the old practice brand, not the new one. We are competing against ourselves in Queens.

This is mostly clerical work, but the SEO and AI-citation lift for the Queens market will be larger than almost anything else we can do there short of writing fresh content.

---

## Part A — Directory profile updates (Yonah / front-desk staff)

For each profile below, update the practice name, address (keep `261-12 E Williston Ave, Queens/Floral Park, NY 11001`), phone (`(718) 347-8888`), and **website** to `https://www.premierjointcare.com/new-york.html` (or `/conditions/` deep links where the directory supports a "services" field):

- Healthgrades — https://www.healthgrades.com/physician/dr-bruce-stein-x3qwb (claim listing)
- US News Doctors — https://health.usnews.com/doctors/bruce-stein-416298
- WebMD — https://doctor.webmd.com/doctor/bruce-stein-ece126d3-f429-4671-ba02-b99f17a536c2-overview
- Sharecare — https://providers.sharecare.com/doctor/dr-bruce-s-stein
- Caredash — https://www.caredash.com/doctors/bruce-stein-h53n8
- FindATopDoc — https://www.findatopdoc.com/doctor/2178855-Bruce-Stein-rheumatologist-Floral-Park-NY-11001
- Medical News Today provider page
- Healthline FindCare — https://care.healthline.com/find-care/provider/dr-bruce-stein-1982631545
- Zocdoc — https://www.zocdoc.com/doctor/bruce-stein-md-298847 (also enable online booking pointing to PJC scheduling if available)
- Google Business Profile for the Queens office — verify name reads "Premier Rheumatology — Dr. Bruce Stein", website set to premierjointcare.com

For Boca Raton, also create / claim parallel profiles for **Dr. Mouriel Boucher, DO** on Healthgrades, US News, WebMD, Vitals, Sharecare, Zocdoc, and Caredash. He is currently underrepresented in those directories vs. Dr. Sunshine, Dr. Ullrich, and Dr. Falchook (the names AI assistants currently surface for "best rheumatologist in Boca Raton").

---

## Part B — Repo changes (Claude Code)

Small. Two things:

### B1. If Yonah still controls `floralparkarthritis.com` DNS/hosting

Set up a sitewide 301 redirect from that domain to `https://www.premierjointcare.com/new-york.html`. Keep the domain registered indefinitely so the link equity transfers. This is a DNS/Vercel setting outside this repo, but worth a one-line note in the repo's README so it isn't forgotten.

If we don't control it anymore: skip B1 and just do B2.

### B2. Cross-reference sentence on the New York location page

In `new-york.html` (the source HTML — the build step preserves the `<head>`/`<body>` content), add a short sentence inside the location page's intro body, something like:

> Premier Rheumatology's Queens office, previously known as Floral Park Arthritis, has served Queens, Nassau, and Long Island patients for over a decade under Dr. Bruce Stein, MD.

If `new-york.html` is purely a shell that hydrates `LocationPage` from `location.jsx`, add the sentence to the NY entry inside `location.jsx` instead. (Check both — whichever holds the visible copy is the right place.)

This sentence helps Google associate the two entities so the old citations get credit for the new domain.

---

## Verification checklist

- [ ] All 9 directory profiles in Part A show "Premier Rheumatology" as practice name and premierjointcare.com as website.
- [ ] Google Business Profile for the Queens office links to premierjointcare.com.
- [ ] `floralparkarthritis.com` either 301-redirects to premierjointcare.com/new-york or carries a prominent migration notice (whichever applies).
- [ ] `new-york.html` (or the NY entry in `location.jsx`) contains the cross-reference sentence.
- [ ] One week after these go live, re-run the AI query "best rheumatologist in Queens NY" and confirm whether Dr. Stein or Premier Rheumatology appears.
- [ ] Two weeks after, check `site:premierjointcare.com new-york` to confirm the new page is indexed with the cross-reference.

## Out of scope (separate WOs if we decide to pursue)

- Building a Queens-specific condition landing page (e.g., `/conditions/rheumatoid-arthritis` with a NY-specific variant). Wait until WO-001 prerender deploy first; the existing condition pages should be visible before we fragment them by location.
- Asking Floral Park Arthritis patients to leave Google reviews for the new GBP listing.

## Estimated effort

Directory work (Part A): ~3–4 hours of front-desk time spread across a week.
Code work (Part B): <30 minutes for Claude Code.
