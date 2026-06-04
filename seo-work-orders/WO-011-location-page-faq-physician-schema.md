# WO-011 — Location-page FAQ blocks + Physician schema (Florida & New York)

**Status:** ✅ IMPLEMENTED 2026-06-04 (morning deep pass) — committed locally, **pending push (blocked by WO-012 push auth)**. Drafted 2026-06-02.

> **2026-06-04 implementation note.** Done under the standing autonomy grant (structured data + FAQ blocks + location copy are pre-authorized). Changes: added a location-aware FAQ section (`LocFAQ`) + `faqs` arrays to `location.jsx`; added `FAQPage` + `Physician` JSON-LD to the `<head>` of `florida.html` and `new-york.html` (paste-ready blocks from Appendix A). Verified via an isolated `esbuild`+`react-dom/server` SSR build (the repo's bundled esbuild is a macOS binary and won't run in the Linux agent sandbox, so the in-repo `node build.mjs` can't be exercised here — verification used a clean temp install of `esbuild@0.25.0`): both pages SSR with a 6-question `<details>` FAQ block whose text matches the JSON-LD **verbatim**; `grep -c FAQPage` = 1 each; Physician = 2 (FL) / 1 (NY); all `ld+json` blocks parse as valid JSON; canonicals unchanged. **Remaining human steps:** push to deploy (WO-012), then validate both live pages in Google's Rich Results Test and re-run the AI probes ~2 weeks post-deploy.
**Priority:** High (net-new, NOT blocked by WO-008 — these pages already serve & index at `.html`)
**Owner to implement:** Claude Code
**Estimated effort:** ~45–60 min
**Pairs with:** WO-004 (condition-page FAQ JSON-LD, already shipped), about-page FAQ (already live)

---

## Why this matters

The two location pages are our strongest local-intent assets and they target the exact queries we lose every day:

- `florida.html` → "rheumatologist Boca Raton", "lupus specialist Boca Raton", "biologic infusion therapy Boca Raton"
- `new-york.html` → "rheumatologist Queens NY", "best rheumatologist Queens NY"

As of today's crawl both pages carry **only** `MedicalClinic` + `PostalAddress` JSON-LD. They have **no FAQ section and no FAQPage schema, and no `Physician` schema** for the providers who actually practice there. By contrast:

- `index.html` already has `MedicalClinic` + 3× `Physician` + 5× `MedicalProcedure`.
- `about.html` already has a full `FAQPage` (6 Q&A) via the `AFAQ` component in `about.jsx`.

So the location pages are the weakest schema/extractable-content pages we have, despite carrying the most commercially important local keywords. AI assistants (ChatGPT, Perplexity, Google AI Overviews) preferentially cite pages with extractable Q&A blocks + entity schema. This is the highest-leverage **on-page** AI-visibility move available that is **not** gated behind the WO-008 canonical fix, because the `.html` location pages render and index fine today (verified live: `florida.html` and `new-york.html` both return 200 with full SSR).

This directly addresses the standing 0/4 AI-visibility problem and the Queens regression (Dr. Bruce Stein absent from "best rheumatologist Queens NY") by putting his name + credentials in both extractable prose AND `Physician` schema on the page Google already trusts.

---

## Exact changes

### 1. Add a location-specific FAQ section to `location.jsx`

Mirror the existing `AFAQ` component pattern in `about.jsx` (lines ~153–215): a `<section id="faq">` with a `faqs` array rendered as `<details>/<summary>`. Make the copy **location-aware** using the existing `locationId` prop (`'FL'` vs `'NY'`) so each page gets its own questions.

**Florida (`locationId === 'FL'`) — suggested 6 Q&A** (edit for accuracy before shipping):

1. **Who are the rheumatologists at Premier Rheumatology in Boca Raton?** — Dr. Mouriel Boucher, DO (board-certified rheumatologist) and Natalie Akerman, NP see patients at our Boca Raton (2900 N Military Trl, Suite 230) and Coconut Creek offices.
2. **Does the Boca Raton office offer on-site biologic / IV infusion therapy?** — Yes. Biologic and IV infusions are administered in-office under clinical supervision, so patients don't need a separate infusion center.
3. **What conditions do you treat in Boca Raton?** — Rheumatoid arthritis, lupus, osteoporosis, gout, psoriatic arthritis, scleroderma, vasculitis, and other autoimmune/inflammatory joint diseases.
4. **Where exactly is the Boca Raton office located?** — 2900 N Military Trl, Suite 230, Boca Raton, FL 33431, with a second Florida office at 4400 W Sample Rd, Suite 234, Coconut Creek, FL 33066.
5. **Are you accepting new patients in Boca Raton?** — Yes, the Florida practice is currently accepting new patients; call (561) 730-3894 to schedule.
6. **Do I need a referral?** — Depends on your insurance; many patients self-refer. The front desk can confirm when you call.

**New York (`locationId === 'NY'`) — suggested 6 Q&A**:

1. **Who is the rheumatologist at Premier Rheumatology in Queens?** — Dr. Bruce Stein, MD, fellowship-trained at Long Island Jewish Medical Center, has led the Queens practice for over a decade. *(Put his full name + credentials in the answer text — this is the extractable signal that's currently missing for the Queens query.)*
2. **What conditions does Dr. Stein treat?** — Rheumatoid arthritis, lupus, gout, osteoarthritis, osteoporosis, myositis, fibromyalgia, and sports-related injuries.
3. **Where is the Queens office located?** — 261-12 E Williston Ave, Queens, NY 11001; phone (718) 347-8888.
4. **Is the Queens practice accepting new patients?** — Yes; call (718) 347-8888 to schedule.
5. **Do you treat autoimmune and inflammatory arthritis in Queens?** — Yes — full rheumatologic evaluation and management, including biologic therapy where appropriate.
6. **Do I need a referral to see Dr. Stein?** — Depends on your insurance plan; the office can confirm.

Wire the section into the `LocationPage` render so it appears on both built pages (place it before the consultation CTA, consistent with about.jsx ordering).

### 2. Add `FAQPage` JSON-LD to the `<head>` of `florida.html` and `new-york.html`

Mirror the `FAQPage` `<script type="application/ld+json">` block that already exists in `about.html`'s `<head>`. Each `Question`/`Answer` must **match the on-page `<details>` text verbatim** (Google requires parity). One block per page, using that page's location-specific Q&A from step 1.

### 3. Add `Physician` JSON-LD to the `<head>` of `florida.html` and `new-york.html`

Mirror the `Physician` schema pattern already in `index.html`. 
- `florida.html`: `Physician` entries for **Dr. Mouriel Boucher, DO** and **Natalie Akerman, NP**, each with `name`, `medicalSpecialty: "Rheumatology"`, and `worksFor`/`address` = the Boca Raton MedicalClinic.
- `new-york.html`: `Physician` entry for **Dr. Bruce Stein, MD**, `medicalSpecialty: "Rheumatology"`, address = the Queens MedicalClinic. Include `alumniOf` = Long Island Jewish Medical Center if the index.html pattern supports it.

### 4. Rebuild

Run the prerender build (`node build.mjs`) so `florida.html` / `new-york.html` get the new FAQ section in their prerendered `<body>`. Confirm no build errors and that `dist/` output updates.

---

## Files to touch

- `location.jsx` — add the location-aware FAQ section (new component, mirror `about.jsx` `AFAQ`).
- `florida.html` — add `FAQPage` + `Physician` JSON-LD to `<head>`.
- `new-york.html` — add `FAQPage` + `Physician` JSON-LD to `<head>`.
- (build artifacts in `dist/` regenerate via `node build.mjs`.)

---

## Verification checklist

- [ ] `node build.mjs` completes with no errors; `florida.html` and `new-york.html` rebuilt.
- [ ] `grep -c FAQPage florida.html new-york.html` → each returns `1`.
- [ ] `grep -c '"@type": "Physician"' florida.html` → `≥2` (Boucher + Akerman); `new-york.html` → `≥1` (Stein).
- [ ] On-page `<details>` question/answer text matches the JSON-LD `Question`/`Answer` text **verbatim** on both pages.
- [ ] Dr. Bruce Stein's full name + "Long Island Jewish" + "Queens" appear in the rendered body text of `new-york.html` (extractable for the Queens AI query).
- [ ] Validate both pages in Google's Rich Results Test (FAQPage + Physician eligible, no errors).
- [ ] Canonical tags unchanged and still point to `premierjointcare.com` (do not regress WO-008 work).
- [ ] Re-run "best rheumatologist Queens NY" and "rheumatologist Boca Raton" AI probes ~2 weeks post-deploy to check for new citations.

---

## Notes

- This is **independent of WO-008** — the `.html` location pages already serve 200, so this content can index immediately rather than waiting on the clean-URL fix.
- After this ships, the only main pages still lacking a FAQ block would be `index.html`, `team.html`, `contact.html`, `conditions.html` — a possible WO-012 follow-up, lower priority than the location pages.

---

## Appendix A — Paste-ready JSON-LD (added 2026-06-04)

These blocks match the exact structure already used in `index.html` (Physician) and `about.html` (FAQPage) so they validate identically. Drop each `<script type="application/ld+json">…</script>` into the `<head>` of the named file. The `Question`/`Answer` text below is the canonical wording — make the on-page `<details>`/`<summary>` text in `location.jsx` match it **verbatim** (Google requires parity).

### A1. `florida.html` — Physician schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Mouriel Boucher, DO",
  "medicalSpecialty": "Rheumatologic",
  "worksFor": { "@type": "MedicalClinic", "name": "Premier Rheumatology - Boca Raton" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2900 N Military Trl, Suite 230",
    "addressLocality": "Boca Raton",
    "addressRegion": "FL",
    "postalCode": "33431",
    "addressCountry": "US"
  },
  "telephone": "+1-561-730-3894"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Natalie Akerman, NP",
  "jobTitle": "Family Nurse Practitioner, Rheumatology Specialist",
  "medicalSpecialty": "Rheumatologic",
  "worksFor": { "@type": "MedicalClinic", "name": "Premier Rheumatology - Boca Raton" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2900 N Military Trl, Suite 230",
    "addressLocality": "Boca Raton",
    "addressRegion": "FL",
    "postalCode": "33431",
    "addressCountry": "US"
  },
  "telephone": "+1-561-730-3894"
}
</script>
```

### A2. `florida.html` — FAQPage schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Who are the rheumatologists at Premier Rheumatology in Boca Raton?",
      "acceptedAnswer": { "@type": "Answer", "text": "Dr. Mouriel Boucher, DO, a board-certified rheumatologist, and Natalie Akerman, NP see patients at our Boca Raton office (2900 N Military Trl, Suite 230) and our Coconut Creek office (4400 W Sample Rd, Suite 234)." } },
    { "@type": "Question", "name": "Does the Boca Raton office offer on-site biologic or IV infusion therapy?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Biologic and IV infusions are administered in-office under clinical supervision, so patients do not need to go to a separate infusion center." } },
    { "@type": "Question", "name": "What conditions do you treat in Boca Raton?",
      "acceptedAnswer": { "@type": "Answer", "text": "Rheumatoid arthritis, lupus, osteoporosis, gout, psoriatic arthritis, scleroderma, vasculitis, and other autoimmune and inflammatory joint diseases." } },
    { "@type": "Question", "name": "Where is the Boca Raton office located?",
      "acceptedAnswer": { "@type": "Answer", "text": "2900 N Military Trl, Suite 230, Boca Raton, FL 33431, with a second Florida office at 4400 W Sample Rd, Suite 234, Coconut Creek, FL 33066." } },
    { "@type": "Question", "name": "Are you accepting new patients in Boca Raton?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, the Florida practice is currently accepting new patients. Call (561) 730-3894 to schedule." } },
    { "@type": "Question", "name": "Do I need a referral to see a rheumatologist in Boca Raton?",
      "acceptedAnswer": { "@type": "Answer", "text": "It depends on your insurance plan. Many patients self-refer; the front desk can confirm whether a referral is required when you call." } }
  ]
}
</script>
```

### A3. `new-york.html` — Physician schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Bruce Stein, MD",
  "medicalSpecialty": "Rheumatologic",
  "alumniOf": { "@type": "MedicalOrganization", "name": "Long Island Jewish Medical Center" },
  "worksFor": { "@type": "MedicalClinic", "name": "Premier Rheumatology - Queens" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "261-12 E Williston Ave",
    "addressLocality": "Queens",
    "addressRegion": "NY",
    "postalCode": "11001",
    "addressCountry": "US"
  },
  "telephone": "+1-718-347-8888"
}
</script>
```

### A4. `new-york.html` — FAQPage schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Who is the rheumatologist at Premier Rheumatology in Queens?",
      "acceptedAnswer": { "@type": "Answer", "text": "Dr. Bruce Stein, MD, fellowship-trained at Long Island Jewish Medical Center, has led our Queens practice for over a decade." } },
    { "@type": "Question", "name": "What conditions does Dr. Stein treat?",
      "acceptedAnswer": { "@type": "Answer", "text": "Rheumatoid arthritis, lupus, gout, osteoarthritis, osteoporosis, myositis, fibromyalgia, and sports-related injuries." } },
    { "@type": "Question", "name": "Where is the Queens office located?",
      "acceptedAnswer": { "@type": "Answer", "text": "261-12 E Williston Ave, Queens, NY 11001. Phone: (718) 347-8888." } },
    { "@type": "Question", "name": "Is the Queens practice accepting new patients?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Call (718) 347-8888 to schedule." } },
    { "@type": "Question", "name": "Do you treat autoimmune and inflammatory arthritis in Queens?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — full rheumatologic evaluation and management, including biologic therapy where appropriate." } },
    { "@type": "Question", "name": "Do I need a referral to see Dr. Stein?",
      "acceptedAnswer": { "@type": "Answer", "text": "It depends on your insurance plan; the office can confirm when you call." } }
  ]
}
</script>
```

**Verification after paste:** `grep -c FAQPage florida.html new-york.html` → `1` each; `grep -c '"@type": "Physician"' florida.html` → `2`, `new-york.html` → `1`; run both through Google Rich Results Test (FAQPage + Physician eligible, no errors); confirm on-page `<details>` text matches verbatim.
