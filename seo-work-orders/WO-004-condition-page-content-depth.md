# SEO Work Order #004 — Condition-page content depth (post-prerender)

**Author:** Cowork SEO agent
**Date:** 2026-05-27
**Status:** ✅ **APPROVED 2026-09-02 by Yonah — and now UNBLOCKED.** The WO-001 prerender dependency shipped and is verified live, so this content work is no longer invisible to crawlers. Ready for Claude Code to implement.
**Implementer:** Claude Code (content edits to the `conditions-data.jsx` dataset, plus a small set of additions to `condition-article.jsx` if needed for new components).
**Depends on:** WO-001 (prerender) must be in `main` and live on premierjointcare.com.

---

## Why this work order exists

The 40+ condition pages already exist in `conditions/` and have:
- A correct `<title>`, meta description, canonical, OG tags
- `MedicalCondition` JSON-LD schema
- Body content rendered from `conditions-data.jsx` via `condition-article.jsx`

Once WO-001 ships, these pages will be crawlable for the first time. To actually *rank* against jointderm.com, awiboca.com, and rasf.com — and to be cited by AI assistants — each page needs three additional content elements that those competitors already include:

1. **A local-intent answer block** near the top — 60–80 words that tie the condition to "Boca Raton, FL" / "Queens, NY" and our specific providers + on-site infusion capability.
2. **A patient-facing FAQ block** — 5–8 questions per condition, with 2–4 sentence answers. This is what gets us into Google AI Overviews and ChatGPT citations.
3. **An on-site biologic-infusion call-out** on every condition that is commonly treated with biologics (RA, lupus, psoriatic arthritis, ankylosing spondylitis, vasculitis, scleroderma).

We also need matching `FAQPage` JSON-LD so AI engines see the FAQ as a structured Q&A list.

---

## Scope — Phase 1 (priority conditions only)

To avoid a 40-page rewrite all at once, ship content depth in the following order. Phase 1 is what this WO covers:

1. `rheumatoid-arthritis`
2. `lupus-systemic-lupus-erythematosus` (also create a `lupus.html` alias redirect → this slug if not already present)
3. `osteoporosis`
4. `gout`
5. `psoriatic-arthritis`
6. `vasculitis`
7. `scleroderma`
8. `polymyalgia-rheumatica`

(Phase 2 — the remaining ~32 conditions — will be a follow-up WO once Phase 1 has been live for ~2 weeks and we have a ranking signal.)

---

## The content changes — `conditions-data.jsx`

Each condition entry in `conditions-data.jsx` likely already has fields like `title`, `description`, `body` (or sections). Extend each Phase 1 entry with:

```js
{
  // ...existing fields...
  localAnswer: "Rheumatoid arthritis (RA) is an autoimmune disease in which the immune system attacks the joint lining, causing pain, stiffness, and joint damage. At Premier Rheumatology in Boca Raton, FL and Queens, NY, board-certified rheumatologists diagnose and treat RA using current guidelines — including DMARDs, JAK inhibitors, and on-site biologic infusion therapy so patients don't need a separate infusion-center referral.",
  faqs: [
    { q: "What's the difference between rheumatoid arthritis and osteoarthritis?", a: "..." },
    { q: "How soon should I see a rheumatologist after diagnosis?", a: "..." },
    { q: "Do I have to drive to a separate infusion center for biologics?", a: "No. Our Boca Raton office offers on-site biologic and IV infusion therapy, so RA patients can receive their medications in the same office where they see their rheumatologist." },
    { q: "Will my insurance cover biologic infusions?", a: "..." },
    { q: "How long does the first appointment take?", a: "..." },
    { q: "Can rheumatoid arthritis go into remission?", a: "..." }
  ],
  treatsWithBiologics: true,
}
```

Write 5–8 FAQs per Phase 1 condition. Keep answers 2–4 sentences, plain language, and where appropriate, include a stat or a clinic-specific fact (e.g., "RA affects ~1.3M U.S. adults — CDC"; "Same-week new-patient appointments typically available.").

For `localAnswer`, name the city explicitly and name the on-site infusion capability where applicable.

---

## The rendering changes — `condition-article.jsx`

The article component needs to render two new sections if the data is present:

1. **Local-intent answer block** — render `localAnswer` as a styled callout right under the H1, above the rest of the body. Use a slightly elevated background (`#f6f1ff` works with the existing purple accent).

2. **FAQ section** — render `faqs` as a list of `<details>`/`<summary>` accordion items near the bottom of the article, above the CTA. Heading: `Frequently Asked Questions`.

3. **Biologic-infusion call-out** — if `treatsWithBiologics === true`, render a small linked card after the treatment section: "On-site biologic & IV infusion therapy in Boca Raton — learn more →" linking to whichever page describes infusion services (homepage anchor for now; a dedicated `/conditions/biologic-infusion-therapy.html` is a future WO).

---

## Schema changes — `condition-article.jsx` head injection

For each page where `faqs` exists, also inject a `FAQPage` JSON-LD block. The existing build step already preserves head content; have the component render the JSON-LD as part of its server-rendered output. Pattern:

```jsx
{faqs && faqs.length > 0 && (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  }) }} />
)}
```

(Confirm where the existing `MedicalCondition` JSON-LD is injected and add the FAQ block alongside it.)

Also extend the existing `MedicalCondition` schema with `possibleTreatment` (one or more `MedicalTherapy` entries — e.g., "Methotrexate", "Adalimumab", "Rituximab IV infusion") and `recognizingAuthority` already-set to Premier Rheumatology. This makes the page more citable.

---

## Verification

- [ ] On the Vercel preview for Phase 1 pages, view-source shows the local-answer text and all FAQ Q&As in the raw HTML body (not added by client-side JS).
- [ ] Each Phase 1 page passes [validator.schema.org](https://validator.schema.org/) for both `MedicalCondition` and `FAQPage` without errors.
- [ ] Lighthouse SEO score ≥ 95 on `rheumatoid-arthritis` and `lupus-systemic-lupus-erythematosus`.
- [ ] One week after deploy, re-run today's keyword check for "rheumatoid arthritis treatment Boca Raton" and "lupus specialist Boca Raton" and capture the new rank.

## Out of scope
- Patient reviews / testimonials embed (separate WO).
- Spanish-language versions.
- Phase 2 (the remaining ~32 conditions) — separate follow-up WO after Phase 1 has indexed.
