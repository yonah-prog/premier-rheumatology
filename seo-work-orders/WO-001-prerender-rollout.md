# SEO Work Order #001 — Finish prerender deploy + roll out to all condition pages

**Author:** Cowork SEO agent
**Date:** 2026-05-25
**Status:** ✅ **DELIVERED** — approved 2026-09-02 retroactively; work already shipped. Verified live 2026-09-02: all 45 `/conditions/*.html` pages serve prerendered SSR markup.
**Implementer:** Claude Code (apply, commit, push, deploy)

---

## Context

The site renders content in the browser via runtime Babel + dev-build React, so the
initial HTML body is empty — bad for search and AI crawlers. Branch `seo/prerender`
already adds a build-time prerender step (`build.mjs` + `package.json`, wired into
`vercel.json`) and was verified locally on the homepage + 4 condition pages. It also
fixes the sitewide canonical-domain bug (premierrheumatology.com → premierjointcare.com)
and adds homepage title/meta/OG/schema. This work order finishes that deploy and extends
prerendering to the remaining condition pages.

---

## Part A — Merge & deploy the existing branch (already built + verified)

No code changes needed; this branch is ready. From the repo root:

```bash
rm -f .git/index.lock            # clears a stale lock if present
git checkout seo/prerender
git add -u
git add build.mjs package.json package-lock.json
git commit -m "SEO: prerender key pages, fix canonical domain, add homepage meta+schema"
git push -u origin seo/prerender   # -> Vercel preview URL
# After preview looks good:
git checkout main && git pull origin main
git merge seo/prerender && git push origin main   # -> production deploy
```

**Verify before merging to main:** homepage + the 4 condition pages render identically
to production, and the contact form (`/api/contact`) still submits on the preview.

---

## Part B — Extend prerendering to ALL condition pages

The build script currently hardcodes 4 condition slugs. Replace that with
auto-discovery so every page in `conditions/` is prerendered. **Edit `build.mjs`:**

**Find** the `PAGES` definition:

```js
const PAGES = [
  { html: 'index.html', deps: ['shared.jsx', 'chrome.jsx', 'homepage.jsx'], global: 'PremierHome', props: null, bundle: 'home' },
  ...['rheumatoid-arthritis', 'lupus-systemic-lupus-erythematosus', 'osteoporosis', 'gout'].map((slug) => ({
    html: `conditions/${slug}.html`,
    deps: ['shared.jsx', 'chrome.jsx', 'conditions-data.jsx', 'condition-article.jsx'],
    global: 'ConditionArticle',
    props: { slug },
    bundle: slug,
  })),
];
```

**Replace with** (discovers every condition page and reads its real slug from the
page's own inline render call, falling back to the filename):

```js
const conditionDeps = ['shared.jsx', 'chrome.jsx', 'conditions-data.jsx', 'condition-article.jsx'];
const conditionPages = fs
  .readdirSync(path.join(ROOT, 'conditions'))
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const fileSlug = f.replace(/\.html$/, '');
    const src = fs.readFileSync(path.join(ROOT, 'conditions', f), 'utf8');
    const m = src.match(/ConditionArticle\s+slug="([^"]+)"/);
    return {
      html: `conditions/${f}`,
      deps: conditionDeps,
      global: 'ConditionArticle',
      props: { slug: m ? m[1] : fileSlug },
      bundle: fileSlug,
    };
  });

const PAGES = [
  { html: 'index.html', deps: ['shared.jsx', 'chrome.jsx', 'homepage.jsx'], global: 'PremierHome', props: null, bundle: 'home' },
  ...conditionPages,
];
```

Nothing else changes — the rewrite/SSR logic is already generic.

### Verification for Part B

```bash
DIST_DIR=/tmp/predist node build.mjs   # should report ~48 pages prerendered, 0 errors
# spot-check 3 random condition pages have non-empty #root and no dev/babel scripts:
for s in scleroderma vasculitis psoriatic-arthritis; do
  echo "== $s =="; grep -cE "development\.js|babel" /tmp/predist/conditions/$s.html  # expect 0
  grep -o '<div id="root">.\{0,40\}' /tmp/predist/conditions/$s.html                 # expect real markup
done
```

If any page errors during build, leave it out of `PAGES` and flag it back to me —
don't block the others.

---

## Do NOT change in this work order
- The 6 main pages (about, team, contact, conditions, florida, new-york) — they use
  different components; I'll spec those in WO-002 after I verify each one's wiring.
- The `routes`/`redirects` blocks in `vercel.json`.
- Any visual/layout code in the `.jsx` files.

## Known follow-up (not now)
Each condition bundle is ~215KB because it includes the full `conditions-data.jsx`
dataset. Future optimization: emit per-condition data so each page only ships its own.
Tracking for a later work order.
