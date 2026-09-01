// Blog index — cards for every POSTS entry, newest first.

const bip = palette;
const bips = chromeStyles;

const PostCard = ({ p }) => (
  <a href={`/blog/${p.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <article style={{ border: `1px solid ${bip.lineCard}`, borderRadius: 18, background: bip.card, padding: '30px 30px', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(91,63,160,.05)' }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: bip.purple, marginBottom: 14 }}>{p.category}</div>
      <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25, color: bip.ink, margin: '0 0 12px' }}>{p.title}</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: bip.subMuted, margin: '0 0 20px', flex: 1 }}>{p.excerpt}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: bip.mutedLabel, fontWeight: 600, letterSpacing: '0.04em' }}>
        <span>{p.dateDisplay} · {p.readTime} min read</span>
        <span style={{ color: bip.purple, display: 'inline-flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.1em' }}>Read <ArrowRight size={12} /></span>
      </div>
    </article>
  </a>
);

const BlogIndex = () => {
  const isMobile = useIsMobile();
  return (
    <PageShell active="blog">
      <section style={{ padding: isMobile ? '52px 20px 40px' : '84px 56px 56px', background: `linear-gradient(160deg, ${bip.lavenderBg}, #ffffff)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ ...bips.eyebrow, marginBottom: 14 }}>Patient resources</div>
          <h1 style={{ ...bips.h1, fontSize: isMobile ? 38 : 54, margin: '0 0 18px' }}>Insights from Premier Rheumatology</h1>
          <p style={{ fontSize: isMobile ? 16.5 : 18.5, lineHeight: 1.7, color: bip.sub, maxWidth: 680, margin: 0 }}>
            Plain-English articles from our care team on arthritis, autoimmune disease,
            and getting the right diagnosis — written for patients in Queens, NY and
            Boca Raton, FL.
          </p>
        </div>
      </section>
      <section style={{ padding: isMobile ? '36px 20px 72px' : '56px 56px 104px', borderTop: `1px solid ${bip.line}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {POSTS.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
              {POSTS.map(p => <PostCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <p style={{ color: bip.subMuted }}>Articles are on the way. In the meantime, browse our <a href="/conditions.html" style={{ color: bip.purple }}>conditions library</a>.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
};

window.BlogIndex = BlogIndex;
