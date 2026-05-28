# SEO Work Order #002 — Prerender the 6 main pages

**Author:** Cowork SEO agent
**Date:** 2026-05-25
**Status:** ⏳ Awaiting Yonah's approval
**Implementer:** Claude Code (apply, commit, push, deploy)
**Depends on:** WO-001 (the prerender build step must already be in `main`)

---

## Context

WO-001 added the prerender build step and rolled it out to the homepage and all
condition pages. This work order extends it to the 6 remaining content pages:
about, team, contact, conditions (the index/library), and the two location pages.

I verified all 6 server-render cleanly with the existing build logic (isolated test):

| Page | Component | SSR HTML |
|------|-----------|---------:|
| about.html | AboutPage | 26.7 KB |
| team.html | TeamPage | 17.5 KB |
| contact.html | ContactPage | 21.2 KB |
| conditions.html | ConditionsPage | 100.7 KB |
| florida.html | LocationPage (FL) | 24.4 KB |
| new-york.html | LocationPage (NY) | 21.1 KB |

Each already has good title/description/canonical tags (canonicals are correct after
WO-001's domain fix). No `.jsx` layout changes are needed — they're all SSR-safe; the
contact form's only browser call (`fetch('/api/contact')`) lives in a submit handler
that never runs during render.

---

## The change — `build.mjs` only

After WO-001, the `PAGES` definition ends like this:

```js
const PAGES = [
  { html: 'index.html', deps: ['shared.jsx', 'chrome.jsx', 'homepage.jsx'], global: 'PremierHome', props: null, bundle: 'home' },
  ...conditionPages,
];
```

**Add this `mainPages` array just above the `PAGES` definition:**

```js
const mainPages = [
  { html: 'about.html',      deps: ['shared.jsx', 'chrome.jsx', 'about.jsx'],                            global: 'AboutPage',      props: null,                 bundle: 'about' },
  { html: 'team.html',       deps: ['shared.jsx', 'chrome.jsx', 'team.jsx'],                             global: 'TeamPage',       props: null,                 bundle: 'team' },
  { html: 'contact.html',    deps: ['shared.jsx', 'chrome.jsx', 'contact.jsx'],                          global: 'ContactPage',    props: null,                 bundle: 'contact' },
  { html: 'conditions.html', deps: ['shared.jsx', 'chrome.jsx', 'conditions-data.jsx', 'conditions.jsx'], global: 'ConditionsPage', props: null,                 bundle: 'conditions' },
  { html: 'florida.html',    deps: ['shared.jsx', 'chrome.jsx', 'location.jsx'],                          global: 'LocationPage',   props: { locationId: 'FL' }, bundle: 'florida' },
  { html: 'new-york.html',   deps: ['shared.jsx', 'chrome.jsx', 'location.jsx'],                          global: 'LocationPage',   props: { locationId: 'NY' }, bundle: 'new-york' },
];
```

**Then update `PAGES` to include them:**

```js
const PAGES = [
  { html: 'index.html', deps: ['shared.jsx', 'chrome.jsx', 'homepage.jsx'], global: 'PremierHome', props: null, bundle: 'home' },
  ...mainPages,
  ...conditionPages,
];
```

That's the entire change. The SSR/rewrite logic already handles everything else.

---

## Verification

```bash
DIST_DIR=/tmp/predist node build.mjs   # expect ~54 pages prerendered, 0 errors
# main pages should have real markup and no dev/babel scripts:
for p in about team contact conditions florida new-york; do
  echo "== $p =="
  grep -cE "development\.js|babel" /tmp/predist/$p.html          # expect 0
  grep -o '<div id="root">.\{0,40\}' /tmp/predist/$p.html        # expect real markup
done
```

**On the Vercel preview, confirm the contact form actually works** — fill it in and
submit; it should still POST to `/api/contact` and succeed. This is the one page with
interactive behavior, so it's the most important to click-test before merging to `main`.

---

## Also do — add contact-page structured data

`contact.html` has no structured data. Add this JSON-LD block inside its `<head>`
(just before `</head>` is fine), so search and AI assistants can extract how to
reach each office:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Premier Rheumatology",
  "url": "https://premierjointcare.com/contact",
  "contactPoint": [
    { "@type": "ContactPoint", "telephone": "+1-561-730-3894", "contactType": "Appointments", "areaServed": "US-FL" },
    { "@type": "ContactPoint", "telephone": "+1-718-347-8888", "contactType": "Appointments", "areaServed": "US-NY" }
  ]
}
</script>
```

This is a head edit to the source `contact.html`; the build preserves the head, so
it carries through to the deployed page. Verify it parses (valid JSON) after editing.

## Do NOT change
- `403.html` / `404.html` — leave as static error pages.
- `routes` / `redirects` in `vercel.json`.
- Any `.jsx` layout/visual code.
