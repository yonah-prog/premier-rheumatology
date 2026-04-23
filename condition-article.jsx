// Condition article template — renders a single condition.
// Articles with `htmlBody` render real WordPress content.
// Stubs render a "coming soon" layout but still include SEO shell.

const ap2 = palette;
const aps2 = chromeStyles;

// ─── Raw HTML body (from WordPress import) ───────────────────
const HtmlBody = ({ html }) => (
  <div
    data-wp-body=""
    dangerouslySetInnerHTML={{ __html: html }}
    style={{ fontSize: 17, lineHeight: 1.75, color: ap2.ink }}
  />
);

// ─── Article body sections (if provided) ─────────────────
const ArticleBody = ({ body }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
    {body.map((section, i) => (
      <section key={i} id={section.id || undefined} style={{ scrollMarginTop: 80 }}>
        {section.h2 && <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 18px', color: ap2.ink }}>{section.h2}</h2>}
        {section.p && section.p.map((para, j) => (
          <p key={j} style={{ fontSize: 17, lineHeight: 1.75, color: ap2.ink, margin: '0 0 16px' }}>{para}</p>
        ))}
        {section.list && (
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.list.map((item, j) => (
              <li key={j} style={{ display: 'flex', gap: 12, fontSize: 16.5, lineHeight: 1.65, color: ap2.ink }}>
                <span style={{ color: ap2.purple, marginTop: 8, flexShrink: 0 }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);

// ─── Stub layout (for conditions without full content yet) ──
const StubBody = ({ c }) => (
  <div style={{ padding: '40px 0' }}>
    <p style={{ fontSize: 18, lineHeight: 1.7, color: ap2.ink, marginBottom: 28 }}>
      {c.excerpt}
    </p>
    <div style={{ background: ap2.card, border: `1px solid ${ap2.line}`, borderRadius: 14, padding: '28px 30px', marginBottom: 32 }}>
      <div style={{ ...aps2.eyebrow, marginBottom: 10 }}>Full article coming soon</div>
      <p style={{ fontSize: 15.5, lineHeight: 1.65, color: ap2.sub, margin: 0 }}>
        Our physicians are preparing an in-depth, evidence-based article on {c.title.toLowerCase()}. In the meantime, if you'd like to discuss symptoms, evaluation, or treatment options, please reach out to either of our offices.
      </p>
    </div>
  </div>
);

// ─── Sidebar key facts ───────────────────────────────────
const KeyFacts = ({ facts }) => (
  <aside style={{ border: `1px solid ${ap2.line}`, borderRadius: 16, background: ap2.card, padding: '28px 28px', position: 'sticky', top: 24 }}>
    <div style={{ ...aps2.eyebrow, marginBottom: 14 }}>Key facts</div>
    <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {facts.map((f, i) => (
        <div key={i} style={{ paddingBottom: 18, borderBottom: i === facts.length - 1 ? 'none' : `1px solid ${ap2.line}` }}>
          <dt style={{ fontSize: 12, fontWeight: 600, color: ap2.purple, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'Manrope, sans-serif' }}>{f.label}</dt>
          <dd style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: ap2.ink }}>{f.value}</dd>
        </div>
      ))}
    </dl>
  </aside>
);

// ─── FAQ accordion ───────────────────────────────────────
const FAQs = ({ faqs }) => (
  <section style={{ padding: '72px 0 16px' }}>
    <div style={{ ...aps2.eyebrow, marginBottom: 12 }}>Common questions</div>
    <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 28px' }}>Frequently asked</h2>
    <div style={{ borderTop: `1px solid ${ap2.line}` }}>
      {faqs.map((f, i) => (
        <details key={i} style={{ borderBottom: `1px solid ${ap2.line}`, padding: '22px 0' }}>
          <summary style={{ fontSize: 17, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 20 }}>
            <span>{f.q}</span>
            <span style={{ color: ap2.purple, fontSize: 22, fontWeight: 300 }}>+</span>
          </summary>
          <div style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.7, color: ap2.sub }}>{f.a}</div>
        </details>
      ))}
    </div>
  </section>
);

// ─── Related conditions ──────────────────────────────────
const Related = ({ current }) => {
  const related = CONDITIONS.filter(c => c.category === current.category && c.slug !== current.slug).slice(0, 3);
  if (!related.length) return null;
  const cat = CATEGORIES.find(c => c.id === current.category);
  return (
    <section style={{ padding: '56px 0 0', borderTop: `1px solid ${ap2.line}`, marginTop: 56 }}>
      <div style={{ ...aps2.eyebrow, marginBottom: 10 }}>Related in {cat.short}</div>
      <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 24px' }}>You may also want to read</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {related.map(c => (
          <a key={c.slug} href={`${c.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: `1px solid ${ap2.line}`, borderRadius: 14, padding: '22px 22px', background: ap2.card, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: ap2.sub, flex: 1 }}>{c.excerpt}</div>
              <div style={{ marginTop: 14, fontSize: 12.5, fontWeight: 600, color: ap2.ink, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Read <ArrowRight size={12} /></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ─── Article CTA ─────────────────────────────────────────
const ArticleCTA = ({ c }) => (
  <section style={{ padding: '72px 0 0' }}>
    <div style={{ background: ap2.ink, color: '#fff', borderRadius: 20, padding: '48px 44px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems: 'center' }}>
      <div>
        <div style={{ ...aps2.eyebrow, color: '#d9c3ea', marginBottom: 14 }}>Schedule a consultation</div>
        <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, margin: 0 }}>
          Concerned about {c.title.toLowerCase()}? Our rheumatologists can help.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="../contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: '#fff', color: ap2.ink, border: 'none', padding: '16px 22px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>Request an appointment</button>
        </a>
        <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid #ffffff40', padding: '16px 22px', borderRadius: 10, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}>Florida · (561) 730-3894</button>
        </a>
        <a href="tel:+17183478888" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid #ffffff40', padding: '16px 22px', borderRadius: 10, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}>New York · (718) 347-8888</button>
        </a>
      </div>
    </div>
  </section>
);

// ─── Main renderer ───────────────────────────────────────
const ConditionArticle = ({ slug }) => {
  const c = CONDITIONS.find(x => x.slug === slug);
  if (!c) {
    return (
      <PageShell active="conditions">
        <section style={{ padding: '120px 56px', textAlign: 'center' }}>
          <h1>Condition not found</h1>
          <a href="../conditions.html">Return to conditions library</a>
        </section>
      </PageShell>
    );
  }
  const cat = CATEGORIES.find(x => x.id === c.category);
  const hasBody = !!(c.htmlBody || c.body);

  return (
    <PageShell active="conditions">
      {/* Breadcrumb */}
      <div style={{ padding: '22px 56px', fontSize: 13, color: ap2.sub, background: ap2.card, borderBottom: `1px solid ${ap2.line}` }}>
        <a href="../index.html" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href="../conditions.html" style={{ color: 'inherit', textDecoration: 'none' }}>Conditions We Treat</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: ap2.ink }}>{c.title}</span>
      </div>

      {/* Article hero */}
      <section style={{ padding: '64px 56px 48px', background: ap2.card }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ ...aps2.eyebrow, marginBottom: 14 }}>{cat.label}</div>
          <h1 style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '0 0 24px' }}>{c.title}</h1>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: ap2.sub, margin: 0, maxWidth: 780 }}>{c.excerpt}</p>
          <div style={{ marginTop: 26, display: 'flex', gap: 20, fontSize: 13, color: ap2.sub, fontFamily: 'Manrope, sans-serif' }}>
            <span>{c.readTime} MIN READ</span>
            <span>· PHYSICIAN-REVIEWED</span>
            <span>· UPDATED 2026</span>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section style={{ padding: '56px 56px 96px', borderTop: `1px solid ${ap2.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }}>
          <div>
            {c.htmlBody ? <HtmlBody html={c.htmlBody} /> : c.body ? <ArticleBody body={c.body} /> : <StubBody c={c} />}
            {c.faqs && <FAQs faqs={c.faqs} />}
            <Related current={c} />
            <ArticleCTA c={c} />
          </div>
          {c.keyFacts && <KeyFacts facts={c.keyFacts} />}
        </div>
      </section>
    </PageShell>
  );
};

window.ConditionArticle = ConditionArticle;
