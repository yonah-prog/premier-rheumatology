// Conditions We Treat — hub page. Search, category filter, A-Z index, featured + full grid.

const cp = palette;
const cps = chromeStyles;

const CatChip = ({ cat, active, onClick, count }) => (
  <button onClick={onClick} style={{
    background: active ? cp.purple : cp.card,
    color: active ? '#fff' : cp.subAlt,
    border: `1px solid ${active ? cp.purple : cp.lineCard}`,
    padding: '10px 18px', borderRadius: 999, fontSize: 13.5, fontWeight: active ? 600 : 500,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    whiteSpace: 'nowrap', fontFamily: 'inherit',
  }}>
    {cat ? cat.label : 'All conditions'}
    <span style={{ opacity: 0.6, fontSize: 12 }}>{count}</span>
  </button>
);

const ConditionCard = ({ c, featured = false }) => {
  const cat = CATEGORIES.find(x => x.id === c.category);
  const tones = { purple: cp.purpleLight, warm: cp.lavenderBg, cool: '#E4DBF4', mint: '#F2EEFA' };
  const inks = { purple: cp.purple, warm: '#7C6BA6', cool: '#4C3388', mint: '#6A6094' };
  return (
    <a href={`conditions/${c.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article style={{
        border: `1px solid ${cp.lineCard}`, borderRadius: 16, background: cp.card,
        padding: featured ? '32px 30px' : '26px 26px',
        display: 'flex', flexDirection: 'column', height: '100%',
        transition: 'border-color 0.15s, box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = cp.purpleLight}
      onMouseLeave={e => e.currentTarget.style.borderColor = cp.lineCard}
      >
        <div style={{
          display: 'inline-flex', alignSelf: 'flex-start',
          background: tones[cat.tone], color: inks[cat.tone],
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '6px 13px', borderRadius: 999, marginBottom: 16,
          fontFamily: SANS,
        }}>{cat.short}</div>
        <h3 style={{
          fontFamily: SERIF, fontSize: featured ? 25 : 21, fontWeight: 600, letterSpacing: '-0.01em',
          color: cp.ink, margin: '0 0 10px', lineHeight: 1.22,
        }}>{c.title}</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: cp.subMuted, margin: 0, flex: 1 }}>{c.excerpt}</p>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${cp.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: cp.mutedLabel, fontFamily: SANS }}>{c.readTime} min read</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: cp.purple, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Read <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </a>
  );
};

// ─── Hero + search ───────────────────────────────────────
const CHero = ({ q, setQ }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '72px 56px 56px', background: cp.card, borderBottom: `1px solid ${cp.line}` }}>
    <div style={{ ...cps.eyebrow, marginBottom: 18 }}>Conditions We Treat</div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 20 : 64, alignItems: 'end', marginBottom: 40 }}>
      <h1 style={{ ...cps.h1, fontSize: isMobile ? 38 : 54 }}>
        A library of <em style={{ fontStyle: 'italic', color: cp.purple }}>rheumatologic conditions</em> — evaluated, explained, and treated at our Boca Raton and Queens offices.
      </h1>
      <p style={{ fontSize: 16.5, lineHeight: 1.7, color: cp.sub, margin: 0, maxWidth: 500 }}>
        Browse in-depth, physician-reviewed articles covering the autoimmune, inflammatory, and musculoskeletal conditions our rheumatologists diagnose and manage every day.
      </p>
    </div>

    <div style={{ position: 'relative', maxWidth: 720 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 22, top: 22 }}>
        <circle cx="11" cy="11" r="7" stroke={cp.purple} strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke={cp.purple} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search conditions, symptoms, or keywords"
        style={{
          width: '100%', padding: '19px 24px 19px 56px',
          fontSize: 16, border: `1.5px solid #d8d2ec`, borderRadius: 999,
          background: cp.card, fontFamily: 'inherit', outline: 'none', color: cp.ink,
          boxSizing: 'border-box',
        }}
      />
    </div>
  </section>
  );
};

// ─── Featured strip ──────────────────────────────────────
const CFeatured = ({ items }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '72px 56px', borderBottom: `1px solid ${cp.line}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
      <div>
        <div style={{ ...cps.eyebrow, marginBottom: 10 }}>Featured</div>
        <h2 style={{ ...cps.h2, fontSize: 36 }}>Most common conditions we manage.</h2>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 20 }}>
      {items.map(c => <ConditionCard key={c.slug} c={c} featured />)}
    </div>
  </section>
  );
};

// ─── Main browser ────────────────────────────────────────
const CBrowser = ({ q, setQ, active, setActive }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
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
    <section style={{ padding: isMobile ? '48px 20px' : '72px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div>
          <div style={{ ...cps.eyebrow, marginBottom: 10 }}>Browse all</div>
          <h2 style={{ ...cps.h2, fontSize: 36 }}>
            {filtered.length} {filtered.length === 1 ? 'condition' : 'conditions'}
            {active && <span style={{ color: cp.mutedLabel }}> · {CATEGORIES.find(c => c.id === active).label}</span>}
          </h2>
        </div>
        {(q || active) && (
          <button onClick={() => { setQ(''); setActive(null); }} style={{ background: 'transparent', border: `1px solid ${cp.lineCard}`, color: cp.purple, fontWeight: 600, padding: '10px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
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
        <div style={{ padding: 72, textAlign: 'center', border: `1px dashed ${cp.lineCard}`, borderRadius: 16, color: cp.subMuted, background: cp.card }}>
          No conditions match your search. Try a different keyword or clear filters.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(c => <ConditionCard key={c.slug} c={c} />)}
        </div>
      )}
    </section>
  );
};

// ─── A-Z index ───────────────────────────────────────────
const CAZIndex = () => {
  const isMobile = useIsMobile();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const byLetter = {};
  letters.forEach(L => byLetter[L] = []);
  CONDITIONS.forEach(c => {
    const L = c.title.replace(/^(dr\.|the )\s*/i, '').charAt(0).toUpperCase();
    if (byLetter[L]) byLetter[L].push(c);
  });

  return (
    <section style={{ padding: isMobile ? '48px 20px' : '72px 56px', background: cp.card, borderTop: `1px solid ${cp.line}` }}>
      <div style={{ ...cps.eyebrow, marginBottom: 10 }}>A–Z index</div>
      <h2 style={{ ...cps.h2, fontSize: 36, marginBottom: 32 }}>Browse alphabetically.</h2>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 24 : 40 }}>
        {letters.filter(L => byLetter[L].length).map(L => (
          <div key={L}>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 26, fontWeight: 500, color: cp.purple, marginBottom: 10 }}>{L}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {byLetter[L].map(c => (
                <li key={c.slug}>
                  <a href={`conditions/${c.slug}.html`} style={{ color: cp.subAlt, textDecoration: 'none', fontSize: 14.5, lineHeight: 1.45 }}>{c.title}</a>
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
const CConsult = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px' }}>
    <div style={{ background: `linear-gradient(110deg, ${cp.purple}, ${cp.purpleDeep})`, color: '#fff', borderRadius: 24, padding: isMobile ? '36px 24px' : '60px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 24 : 40, alignItems: 'center' }}>
      <div>
        <div style={{ ...cps.eyebrow, color: '#D9CDF3', marginBottom: 16 }}>Can't find your condition?</div>
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 30 : 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.14, margin: 0, color: '#fff' }}>
          Talk with a Premier rheumatologist about your symptoms.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...cps.btnWhite, width: '100%', padding: '16px 26px' }}>Request a consultation</button>
        </a>
      </div>
    </div>
  </section>
  );
};

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
