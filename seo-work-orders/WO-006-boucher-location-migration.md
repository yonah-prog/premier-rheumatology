# SEO Work Order #006 — Dr. Boucher directory profile migration (South Miami → Boca Raton)

**Author:** Cowork SEO agent
**Date:** 2026-05-28
**Status:** ✅ **APPROVED 2026-09-02 by Yonah.** Yonah / front-desk action — no code changes.
**Implementer:** Yonah / front-desk staff (no code changes).
**Depends on:** Independent — can run in parallel with WO-001/002/003/005.

---

## Why this work order exists

Tonight's directory health check surfaced a high-severity AI-visibility problem that earlier audits missed: **every authoritative directory profile for Dr. Mouriel Boucher still lists her as practicing in South Miami, FL**, with her former employer (Rheumatic Wellness Institute / rheumwell.com) as the practice affiliation. None of the high-authority profiles mention Premier Rheumatology in Boca Raton.

This is the Dr. Boucher equivalent of the Dr. Bruce Stein / Floral Park Arthritis lineage issue covered in WO-003. AI assistants build their model of "where this physician practices" from these high-DA directory profiles, and right now they uniformly point to the wrong city. That explains why Dr. Boucher does not surface in any of the "rheumatologist Boca Raton" AI answers tonight.

### Verified tonight (web search, 2026-05-28 evening)

| Directory | Current state | URL |
|---|---|---|
| Healthgrades | ❌ Listed as "South Miami, FL" — Internist designation | https://www.healthgrades.com/physician/dr-mouriel-boucher-xynqdb3 |
| US News | ❌ "South Miami, FL" | https://health.usnews.com/doctors/mouriel-boucher-1429809 |
| WebMD | ❌ "South Miami, FL" | https://doctor.webmd.com/doctor/mouriel-boucher-fc868952-1305-4815-9008-098ebbacbd24-overview |
| Doximity | ❌ "South Miami, FL" | https://www.doximity.com/pub/mouriel-boucher-do |
| Medifind | ❌ "South Miami, FL" — listed at Rheumatic Wellness Institute | https://www.medifind.com/doctors/mouriel-d-boucher/8079029 |
| LinkedIn | ❌ Employer: Rheumatic Wellness Institute | https://www.linkedin.com/in/mouriel-boucher-15a12294/ |
| ZoomInfo | ❌ Email domain: rheumwell.com | https://www.zoominfo.com/p/Mouriel-Boucher/6918311371 |
| NPI registry (`npidb.org`) | ⚠️ Specialty correct, address stale | https://npidb.org/doctors/allopathic_osteopathic_physicians/rheumatology_207rr0500x/1972009868.aspx |

NPI: **1972009868** (verified on `npidb.org`).

---

## Part A — Update the primary practice address with NPPES

NPPES is the upstream source most directories pull from. Updating it triggers downstream refreshes on aggregators that auto-sync.

1. Log in to https://nppes.cms.hhs.gov/ with Dr. Boucher's I&A credentials.
2. Update her **primary practice location** to:
   - **Premier Rheumatology**
   - 2900 N Military Trl, Suite 230
   - Boca Raton, FL 33431
   - Phone: (561) 730-3894
3. Remove or demote the South Miami / Rheumatic Wellness Institute address.
4. Submit and note the confirmation timestamp.

Aggregators (Doximity, Medifind, npidb.org) typically refresh from NPPES within 2–4 weeks.

---

## Part B — Manually claim/edit each high-authority profile

NPPES alone is not enough — Healthgrades, US News, WebMD, and Doximity each maintain their own editorial profiles. Each needs a direct claim + edit.

For each of the profiles below: claim the listing, update practice name to **Premier Rheumatology**, address to the Boca Raton suite above, phone to (561) 730-3894, website to **https://www.premierjointcare.com/florida.html**. Verify her bio mentions Boca Raton, FL prominently.

- [ ] Healthgrades — also fix specialty classification (currently "Internist"; should be Internal Medicine + Rheumatology)
- [ ] US News
- [ ] WebMD
- [ ] Doximity
- [ ] Medifind (Boca profile; remove or demote the South Miami profile)
- [ ] Vitals — create a Boca listing if she does not yet have one
- [ ] Healthline FindCare
- [ ] Sharecare
- [ ] FindATopDoc
- [ ] Caredash
- [ ] orthopedic.io — request edit/removal of the South Miami listing
- [ ] everydayhealth.care — same

LinkedIn and ZoomInfo are lower-priority but should be updated whenever Dr. Boucher has 10 minutes — they show up in AI answers more often than expected.

---

## Part C — Add a "Boca Raton" disambiguation sentence to every bio

Wherever a free-text bio field is offered, paste this near the top:

> Dr. Mouriel Boucher, DO is a board-certified rheumatologist practicing at Premier Rheumatology in Boca Raton, FL (2900 N Military Trail, Suite 230). She specializes in autoimmune disease, rheumatoid arthritis, lupus, osteoporosis, and on-site biologic and IV infusion therapy.

This gives AI assistants explicit local-intent signal even before the directory's structured fields catch up.

---

## Verification checklist

- [ ] NPPES updated; confirmation captured in this file.
- [ ] Top 4 directories (Healthgrades / US News / WebMD / Doximity) show Boca Raton + Premier Rheumatology.
- [ ] Medifind Boca profile reflects Premier Rheumatology; South Miami profile demoted/merged.
- [ ] Disambiguation sentence present in every claimable bio field.
- [ ] 2 weeks after submission, re-run the AI query "best rheumatologist in Boca Raton" — check if Dr. Boucher now appears.
- [ ] 4 weeks after submission, re-check Doximity / Medifind / npidb.org (NPPES-fed aggregators) for downstream sync.

## Estimated effort

~2–3 hours of front-desk time (claim-and-edit work, one profile at a time). NPPES update is ~15 min. No code changes.

## Why this is high impact

This is the single largest "wrong-place" AI-visibility leak we've found so far. Until the high-authority profiles point to Boca Raton, the prerendered site and the Phase-1 condition-page content depth (WO-001/WO-004 — already shipped tonight) cannot fully convert into AI citations, because the dominant signal from external authoritative sources says "South Miami." Fixing this is the highest-leverage off-site move available this week.
