// Condition article template — renders a single condition.
// Articles with `htmlBody` render real WordPress content.
// Stubs render a "coming soon" layout but still include SEO shell.

const ap2 = palette;
const aps2 = chromeStyles;

// ─── Raw HTML body (from WordPress import) ───────────────────
const HtmlBody = ({ html }) => (
  // Typography for this block lives in assets/css/style.css ([data-wp-body]).
  <div
    data-wp-body=""
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

// ─── Article body sections (if provided) ─────────────────
const ArticleBody = ({ body }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
    {body.map((section, i) => (
      <section key={i} id={section.id || undefined} style={{ scrollMarginTop: 80 }}>
        {section.h2 && <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2, margin: '0 0 18px', color: ap2.ink }}>{section.h2}</h2>}
        {section.p && section.p.map((para, j) => (
          <p key={j} style={{ fontSize: 18, lineHeight: 1.8, color: ap2.subAlt, margin: '0 0 26px' }}>{para}</p>
        ))}
        {section.list && (
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.list.map((item, j) => (
              <li key={j} style={{ display: 'flex', gap: 12, fontSize: 17, lineHeight: 1.7, color: ap2.subAlt }}>
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
    <p style={{ fontSize: 18, lineHeight: 1.8, color: ap2.subAlt, marginBottom: 28 }}>
      {c.excerpt}
    </p>
    <div style={{ background: ap2.lavenderBg, border: `1px solid ${ap2.lineCard}`, borderRadius: 16, padding: '28px 30px', marginBottom: 32 }}>
      <div style={{ ...aps2.eyebrow, marginBottom: 10 }}>Full article coming soon</div>
      <p style={{ fontSize: 15.5, lineHeight: 1.7, color: ap2.subMuted, margin: 0 }}>
        Our physicians are preparing an in-depth, evidence-based article on {c.title.toLowerCase()}. In the meantime, if you'd like to discuss symptoms, evaluation, or treatment options, please reach out to either of our offices.
      </p>
    </div>
  </div>
);

// ─── Sidebar key facts ───────────────────────────────────
const KeyFacts = ({ facts }) => (
  <aside style={{ border: `1px solid ${ap2.lineCard}`, borderRadius: 18, background: ap2.card, padding: '28px 28px', position: 'sticky', top: 24, boxShadow: '0 4px 24px rgba(91,63,160,.06)' }}>
    <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ap2.mutedLabel, marginBottom: 18 }}>Key facts</div>
    <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {facts.map((f, i) => (
        <div key={i} style={{ paddingBottom: 18, borderBottom: i === facts.length - 1 ? 'none' : `1px solid ${ap2.borderRow || '#F1EDF8'}` }}>
          <dt style={{ fontSize: 12, fontWeight: 700, color: ap2.purple, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: SANS }}>{f.label}</dt>
          <dd style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: ap2.ink }}>{f.value}</dd>
        </div>
      ))}
    </dl>
  </aside>
);

// ─── FAQ accordion ───────────────────────────────────────
const FAQs = ({ faqs }) => (
  <section style={{ padding: '72px 0 16px' }}>
    <div style={{ ...aps2.eyebrow, marginBottom: 12 }}>Common questions</div>
    <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 500, letterSpacing: '-0.015em', color: ap2.ink, margin: '0 0 28px' }}>Frequently asked</h2>
    <div style={{ borderTop: `1px solid ${ap2.line}` }}>
      {faqs.map((f, i) => (
        <details key={i} style={{ borderBottom: `1px solid ${ap2.line}`, padding: '22px 0' }}>
          <summary style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, color: ap2.ink, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 20 }}>
            <span>{f.q}</span>
            <span className="acc-plus" style={{ color: ap2.purple, fontSize: 22, fontWeight: 300 }}>+</span>
          </summary>
          <div style={{ marginTop: 14, fontSize: 16, lineHeight: 1.75, color: ap2.sub }}>{f.a}</div>
        </details>
      ))}
    </div>
    {/* FAQPage JSON-LD for search engines and AI assistants */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }),
      }}
    />
  </section>
);

// ─── Local-intent answer block (rendered right under H1) ──
const LocalAnswer = ({ text }) => (
  <div style={{
    background: ap2.lavenderBg,
    border: `1px solid ${ap2.lineCard}`,
    borderLeft: `3px solid ${ap2.purple}`,
    borderRadius: 14,
    padding: '22px 28px',
    margin: '0 0 36px',
    fontSize: 16.5,
    lineHeight: 1.7,
    color: ap2.subAlt,
  }}>
    {text}
  </div>
);

// ─── On-site biologic / IV infusion call-out ──────────────
const BiologicCallout = () => (
  <section style={{ padding: '40px 0 0' }}>
    <a href="../florida.html#infusion" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{
        background: ap2.card,
        border: `1px solid ${ap2.lineCard}`,
        borderLeft: `3px solid ${ap2.purple}`,
        borderRadius: 16,
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...aps2.eyebrow, marginBottom: 6 }}>Available on-site in Boca Raton</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: ap2.ink, marginBottom: 6 }}>
            On-site biologic & IV infusion therapy
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.6, color: ap2.subMuted }}>
            Receive your infusion treatment in the same office where you see your rheumatologist — no separate infusion-center referral needed.
          </div>
        </div>
        <div style={{ color: ap2.purple, fontSize: 22, fontWeight: 300 }}>→</div>
      </div>
    </a>
  </section>
);

// ─── Related conditions ──────────────────────────────────
const Related = ({ current }) => {
  const isMobile = useIsMobile();
  const related = CONDITIONS.filter(c => c.category === current.category && c.slug !== current.slug).slice(0, 3);
  if (!related.length) return null;
  const cat = CATEGORIES.find(c => c.id === current.category);
  return (
    <section style={{ padding: '56px 0 0', borderTop: `1px solid ${ap2.line}`, marginTop: 56 }}>
      <div style={{ ...aps2.eyebrow, marginBottom: 10 }}>Related in {cat.short}</div>
      <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', color: ap2.ink, margin: '0 0 24px' }}>You may also want to read</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
        {related.map(c => (
          <a key={c.slug} href={`${c.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: `1px solid ${ap2.lineCard}`, borderRadius: 16, padding: '24px 24px', background: ap2.card, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600, color: ap2.ink, marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: ap2.subMuted, flex: 1 }}>{c.excerpt}</div>
              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ap2.purple, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Read <ArrowRight size={12} /></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ─── Article CTA ─────────────────────────────────────────
const ArticleCTA = ({ c }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: '72px 0 0' }}>
    <div style={{ background: `linear-gradient(110deg, ${ap2.purple}, ${ap2.purpleDeep})`, color: '#fff', borderRadius: 22, padding: isMobile ? '34px 24px' : '48px 44px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 26 : 36, alignItems: 'center' }}>
      <div>
        <div style={{ ...aps2.eyebrow, color: '#D9CDF3', marginBottom: 14 }}>Schedule a consultation</div>
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 26 : 32, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, color: '#fff' }}>
          Concerned about {c.title.toLowerCase()}? Our rheumatologists can help.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="../contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps2.btnWhite, width: '100%', padding: '15px 22px', fontSize: 14.5 }}>Request an appointment</button>
        </a>
        <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps2.btnOutlineLight, width: '100%', padding: '15px 22px', fontSize: 13.5 }}>Florida · (561) 730-3894</button>
        </a>
        <a href="tel:+17183478888" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps2.btnOutlineLight, width: '100%', padding: '15px 22px', fontSize: 13.5 }}>New York · (718) 347-8888</button>
        </a>
      </div>
    </div>
  </section>
  );
};

// ─── Main renderer ───────────────────────────────────────
const ConditionArticle = ({ slug }) => {
  const isMobile = useIsMobile();
  const c = CONDITIONS.find(x => x.slug === slug);
  if (!c) {
    return (
      <PageShell active="conditions">
        <section style={{ padding: '120px 24px', textAlign: 'center' }}>
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
      <div style={{ padding: isMobile ? '14px 20px' : '18px 56px', fontSize: 13, color: ap2.mutedLabel, background: ap2.card, borderBottom: `1px solid ${ap2.line}` }}>
        <a href="../index.html" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href="../conditions.html" style={{ color: 'inherit', textDecoration: 'none' }}>Conditions We Treat</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: ap2.purple }}>{c.title}</span>
      </div>

      {/* Article hero */}
      <section style={{ padding: isMobile ? '40px 20px 40px' : '60px 56px 56px', background: `linear-gradient(160deg, ${ap2.lavenderBg}, #ffffff)` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: ap2.purple,
            background: ap2.card, padding: '7px 15px', borderRadius: 999, marginBottom: 22,
          }}>{cat.label}</div>
          <h1 style={{ ...aps2.h1, fontSize: isMobile ? 38 : 52, margin: '0 0 22px' }}>{c.title}</h1>
          <p style={{ fontSize: isMobile ? 17 : 19, lineHeight: 1.65, color: ap2.sub, margin: 0, maxWidth: 780 }}>{c.excerpt}</p>
          <div style={{ marginTop: 26, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12.5, letterSpacing: '0.06em', color: ap2.mutedLabel, fontFamily: SANS, fontWeight: 600 }}>
            <span>{c.readTime} MIN READ</span>
            <span>· PHYSICIAN-REVIEWED</span>
            <span>· UPDATED 2026</span>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section style={{ padding: isMobile ? '40px 20px 64px' : '56px 56px 96px', borderTop: `1px solid ${ap2.line}` }}>
        <div style={{
          display: 'grid',
          // Only reserve a sidebar track when the article actually has one,
          // otherwise the prose sits in a comfortable centred measure.
          gridTemplateColumns: (c.keyFacts && !isMobile) ? '1fr 320px' : '1fr',
          gap: 64, alignItems: 'start',
          maxWidth: c.keyFacts ? 1180 : 820, margin: '0 auto',
        }}>
          <div>
            {c.localAnswer && <LocalAnswer text={c.localAnswer} />}
            {c.htmlBody ? <HtmlBody html={c.htmlBody} /> : c.body ? <ArticleBody body={c.body} /> : <StubBody c={c} />}
            {c.treatsWithBiologics && <BiologicCallout />}
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
