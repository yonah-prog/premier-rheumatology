# Premier Rheumatology — premierjointcare.com

React marketing site with build-time prerendering (esbuild + react-dom/server) for SEO,
deployed on Vercel. Boca Raton, FL + Queens, NY.

## Build

```bash
npm run build      # runs node build.mjs, writes dist/
```

The script auto-discovers every condition page under `conditions/` and prerenders it
into `dist/`. The 6 main pages (about, team, contact, conditions, florida, new-york)
are also prerendered. Pages not listed in `PAGES` are copied through untouched (still
client-rendered) so the rollout can be incremental.

## SEO workflow

- `seo-daily-notes/YYYY-MM-DD.md` — daily SEO notes from the autonomous agent.
- `seo-work-orders/WO-###-name.md` — numbered work orders. Open WOs are queued; closed ones are kept for history.
- Continuous scheduled agent runs three times a day (morning deep pass, midday quick pass, evening pass) and produces a Monday weekly digest.

## External properties to remember

- **floralparkarthritis.com** — the legacy domain for Premier Rheumatology's Queens office (formerly Floral Park Arthritis, PC, Dr. Bruce Stein, MD). If we still control DNS, set a sitewide 301 to `https://www.premierjointcare.com/new-york.html` and keep the domain registered indefinitely so the link equity transfers. If we've lost control, prioritize WO-003 directory consolidation instead. (See `seo-work-orders/WO-003-queens-listings-consolidation.md`.)

## Pages with structured data

| Page | Schema |
|---|---|
| Homepage (`index.html`) | `MedicalBusiness`, `Physician` |
| Contact (`contact.html`) | `MedicalClinic` + `ContactPoint` (per office) |
| Each condition page | `MedicalCondition` (always), `FAQPage` (where `faqs` is present in `conditions-data.jsx`) |
