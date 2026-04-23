// Conditions We Treat — hub page. Search, category filter, A-Z index, featured + full grid.

const cp = palette;
const cps = chromeStyles;

const CatChip = ({ cat, active, onClick, count }) => (
  <button onClick={onClick} style={{
    background: active ? cp.ink : cp.card,
    color: active ? '#fff' : cp.ink,
    border: `1px solid ${active ? cp.ink : cp.line}`,
    padding: '10px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 500,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    whiteSpace: 'nowrap', fontFamily: 'inherit',
  }}>
    {cat ? cat.label : 'All conditions'}
    <span style={{ opacity: 0.6, fontSize: 12 }}>{count}</span>
  </button>
);

const ConditionCard = ({ c, featured = false }) => {
  const cat = CATEGORIES.find(x => x.id === c.category);
  const tones = { purple: cp.purpleLight, warm: '#f3ece0', cool: '#e6ebf2', mint: '#e3ede6' };
  const inks = { purple: cp.purple, warm: '#8a6a3a', cool: '#3e5172', mint: '#2e6b52' };
  return (
    <a href={`conditions/${c.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article style={{
        border: `1px solid ${cp.line}`, borderRadius: 16, background: cp.card,
        padding: featured ? '32px 28px' : '24px 24px',
        display: 'flex', flexDirection: 'column', height: '100%',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = cp.ink}
      onMouseLeave={e => e.currentTarget.style.borderColor = cp.line}
      >
        <div style={{
          display: 'inline-flex', alignSelf: 'flex-start',
          background: tones[cat.tone], color: inks[cat.tone],
          fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '5px 10px', borderRadius: 6, marginBottom: 16,
          fontFamily: 'Manrope, sans-serif',
        }}>{cat.short}</div>
        <h3 style={{
          fontSize: featured ? 24 : 19, fontWeight: 700, letterSpacing: '-0.02em',
          margin: '0 0 10px', lineHeight: 1.2,
        }}>{c.title}</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: cp.sub, margin: 0, flex: 1 }}>{c.excerpt}</p>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${cp.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: cp.sub, fontFamily: 'Manrope, sans-serif' }}>{c.readTime} min read</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: cp.ink, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Read <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </a>
  );
};

// ─── Hero + search ───────────────────────────────────────
const CHero = ({ q, setQ }) => (
  <section style={{ padding: '72px 56px 56px', background: cp.card, borderBottom: `1px solid ${cp.line}` }}>
    <div style={{ ...cps.eyebrow, marginBottom: 18 }}>Conditions We Treat</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'end', marginBottom: 40 }}>
      <h1 style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.03, margin: 0 }}>
        A library of <span style={{ color: cp.purple }}>rheumatologic conditions</span> — evaluated, explained, and treated at our Boca Raton and Queens offices.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: cp.sub, margin: 0, maxWidth: 500 }}>
        Browse in-depth, physician-reviewed articles covering the autoimmune, inflammatory, and musculoskeletal conditions our rheumatologists diagnose and manage every day.
      </p>
    </div>

    <div style={{ position: 'relative', maxWidth: 720 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 22, top: 22 }}>
        <circle cx="11" cy="11" r="7" stroke={cp.sub} strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke={cp.sub} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search conditions, symptoms, or keywords (e.g. 'joint pain', 'lupus', 'ANA')"
        style={{
          width: '100%', padding: '20px 24px 20px 56px',
          fontSize: 16, border: `1px solid ${cp.line}`, borderRadius: 12,
          background: cp.bg, fontFamily: 'inherit', outline: 'none', color: cp.ink,
        }}
      />
    </div>
  </section>
);

// ─── Featured strip ──────────────────────────────────────
const CFeatured = ({ items }) => (
  <section style={{ padding: '72px 56px', borderBottom: `1px solid ${cp.line}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
      <div>
        <div style={{ ...cps.eyebrow, marginBottom: 10 }}>Featured</div>
        <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>Most common conditions we manage.</h2>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {items.map(c => <ConditionCard key={c.slug} c={c} featured />)}
    </div>
  </section>
);

// ─── Main browser ────────────────────────────────────────
const CBrowser = ({ q, setQ, active, setActive }) => {
  const filtered = CONDITIONS.filter(c => {
    if (active && c.category !== active) return false;
    if (q) {
      const needle = q.toLowerCase();
      const hay = [c.title, c.excerpt, ...(c.keywords || [])].join(' ').toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const countBy = (catId) => CONDITIONS.filter(c => c.category === catId).length;

  return (
    <section style={{ padding: '72px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div>
          <div style={{ ...cps.eyebrow, marginBottom: 10 }}>Browse all</div>
          <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? 'condition' : 'conditions'}
            {active && <span style={{ color: cp.sub, fontWeight: 500 }}> · {CATEGORIES.find(c => c.id === active).label}</span>}
          </h2>
        </div>
        {(q || active) && (
          <button onClick={() => { setQ(''); setActive(null); }} style={{ background: 'transparent', border: `1px solid ${cp.line}`, padding: '10px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
        <CatChip cat={null} active={!active} onClick={() => setActive(null)} count={CONDITIONS.length} />
        {CATEGORIES.map(cat => (
          <CatChip key={cat.id} cat={cat} active={active === cat.id} onClick={() => setActive(cat.id)} count={countBy(cat.id)} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: 72, textAlign: 'center', border: `1px dashed ${cp.line}`, borderRadius: 16, color: cp.sub }}>
          No conditions match your search. Try a different keyword or clear filters.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(c => <ConditionCard key={c.slug} c={c} />)}
        </div>
      )}
    </section>
  );
};

// ─── A-Z index ───────────────────────────────────────────
const CAZIndex = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const byLetter = {};
  letters.forEach(L => byLetter[L] = []);
  CONDITIONS.forEach(c => {
    const L = c.title.replace(/^(dr\.|the )\s*/i, '').charAt(0).toUpperCase();
    if (byLetter[L]) byLetter[L].push(c);
  });

  return (
    <section style={{ padding: '72px 56px', background: cp.card, borderTop: `1px solid ${cp.line}` }}>
      <div style={{ ...cps.eyebrow, marginBottom: 10 }}>A–Z index</div>
      <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', margin: 0, marginBottom: 32 }}>Browse alphabetically.</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
        {letters.filter(L => byLetter[L].length).map(L => (
          <div key={L}>
            <div style={{ fontSize: 22, fontWeight: 700, color: cp.purple, marginBottom: 10, fontFamily: 'Manrope, sans-serif', letterSpacing: '0.05em' }}>{L}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {byLetter[L].map(c => (
                <li key={c.slug}>
                  <a href={`conditions/${c.slug}.html`} style={{ color: cp.ink, textDecoration: 'none', fontSize: 14.5, lineHeight: 1.4 }}>{c.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────
const CConsult = () => (
  <section style={{ padding: '80px 56px' }}>
    <div style={{ background: cp.purpleDeep, color: '#fff', borderRadius: 24, padding: '60px 56px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'center' }}>
      <div>
        <div style={{ ...cps.eyebrow, color: '#d9c3ea', marginBottom: 16 }}>Can't find your condition?</div>
        <h2 style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>
          Talk with a Premier rheumatologist about your symptoms.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: '#fff', color: cp.ink, border: 'none', padding: '18px 26px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Request a consultation</button>
        </a>
      </div>
    </div>
  </section>
);

// ─── Page ────────────────────────────────────────────────
const ConditionsPage = () => {
  const [q, setQ] = React.useState('');
  const [active, setActive] = React.useState(null);
  const featured = CONDITIONS.filter(c => c.featured).slice(0, 6);

  return (
    <PageShell active="conditions">
      <CHero q={q} setQ={setQ} />
      {!q && !active && <CFeatured items={featured} />}
      <CBrowser q={q} setQ={setQ} active={active} setActive={setActive} />
      {!q && !active && <CAZIndex />}
      <CConsult />
    </PageShell>
  );
};

window.ConditionsPage = ConditionsPage;
