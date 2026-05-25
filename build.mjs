// Build-time prerender (SSG) for the Premier Rheumatology static site.
//
// Why: pages previously rendered entirely in the browser via runtime Babel +
// React development builds, leaving the initial HTML body empty. Search and AI
// crawlers that don't execute that transform saw a blank page. This script
// server-renders each configured page into static HTML at build time and swaps
// the runtime-Babel/dev-React setup for a pre-compiled production bundle that
// hydrates on the client. Output goes to /dist, which Vercel serves.
//
// Pages NOT listed in PAGES are copied through untouched (still client-rendered),
// so this can be rolled out incrementally.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { transform } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';

const ROOT = process.cwd();
// Output dir is overridable (DIST_DIR) so local verification can build off the
// mounted folder; Vercel uses the default ./dist in its own clean filesystem.
const DIST = process.env.DIST_DIR ? path.resolve(process.env.DIST_DIR) : path.join(ROOT, 'dist');

const REACT_VER = '18.3.1';

// ── Pages to prerender (auto-discovers every page in conditions/) ──
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

// ── 1. Reset dist and copy the repo through (excluding build artifacts) ──
const SKIP = new Set(['.git', 'node_modules', 'dist', '.claude']);
const SKIP_FILES = new Set(['build.mjs', 'package.json', 'package-lock.json', '.DS_Store']);
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const entry of fs.readdirSync(ROOT)) {
  if (SKIP.has(entry) || SKIP_FILES.has(entry)) continue;
  fs.cpSync(path.join(ROOT, entry), path.join(DIST, entry), { recursive: true });
}
fs.mkdirSync(path.join(DIST, 'build'), { recursive: true });

// ── helper: transform a JSX file to plain JS (React.createElement calls) ──
async function compile(file) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const out = await transform(code, { loader: 'jsx', jsx: 'transform' });
  return out.code;
}

// ── helper: SSR a component defined by concatenated global-scope code ──
function ssr(bundleCode, globalName, props) {
  const sandbox = {
    React,
    console,
    setTimeout,
    clearTimeout,
    window: {
      innerWidth: 1200,
      addEventListener() {},
      removeEventListener() {},
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    },
    document: { addEventListener() {}, getElementById: () => null, createElement: () => ({ style: {} }) },
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(bundleCode, sandbox, { filename: `${globalName}.bundle.js` });
  const Comp = sandbox.window[globalName];
  if (typeof Comp !== 'function') throw new Error(`Component window.${globalName} not found after eval`);
  return renderToString(React.createElement(Comp, props || undefined));
}

// ── helper: rewrite a page's <head>/<body> scripts for prerendered output ──
function rewriteHtml(html, ssrHtml, bundle, globalName, props) {
  // Inject SSR markup into the root container.
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${ssrHtml}</div>`);

  // Remove runtime Babel + React development script tags.
  html = html.replace(
    /\s*<script\b[^>]*src="[^"]*(?:react(?:-dom)?@[^"]*\.development\.js|@babel\/standalone[^"]*)"[^>]*><\/script>/g,
    ''
  );
  // Remove all text/babel includes and inline blocks.
  html = html.replace(/\s*<script\s+type="text\/babel"[^>]*>[\s\S]*?<\/script>/g, '');

  const propsArg = props ? `, ${JSON.stringify(props)}` : '';
  const inject =
    `\n<script src="https://unpkg.com/react@${REACT_VER}/umd/react.production.min.js" crossorigin="anonymous"></script>` +
    `\n<script src="https://unpkg.com/react-dom@${REACT_VER}/umd/react-dom.production.min.js" crossorigin="anonymous"></script>` +
    `\n<script src="/build/${bundle}.client.js"></script>` +
    `\n<script>ReactDOM.hydrateRoot(document.getElementById('root'), React.createElement(window.${globalName}${propsArg}));</script>\n`;
  return html.replace(/<\/body>/, `${inject}</body>`);
}

// ── 2. Prerender each configured page ──
let ok = 0;
for (const page of PAGES) {
  const compiled = [];
  for (const dep of page.deps) compiled.push(await compile(dep));
  const bundleCode = compiled.join('\n;\n');

  // Client bundle: same compiled code, relies on global (UMD) React at runtime.
  fs.writeFileSync(path.join(DIST, 'build', `${page.bundle}.client.js`), bundleCode);

  // Server render.
  const ssrHtml = ssr(bundleCode, page.global, page.props);

  // Rewrite and write the page.
  const src = fs.readFileSync(path.join(ROOT, page.html), 'utf8');
  const outHtml = rewriteHtml(src, ssrHtml, page.bundle, page.global, page.props);
  fs.writeFileSync(path.join(DIST, page.html), outHtml);

  const bytes = Buffer.byteLength(ssrHtml, 'utf8');
  console.log(`✓ prerendered ${page.html}  (${bytes.toLocaleString()} bytes of SSR HTML)`);
  ok++;
}

console.log(`\nDone. Prerendered ${ok}/${PAGES.length} pages into dist/.`);
