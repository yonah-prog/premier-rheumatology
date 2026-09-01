// Blog article template — renders one POSTS entry, matching the condition
// article's visual system: breadcrumb, lavender hero, centred prose measure,
// related posts, CTA banner.

const bp = palette;
const bps = chromeStyles;

const BlogHtmlBody = ({ html }) => (
  <div data-wp-body="" dangerouslySetInnerHTML={{ __html: html }} />
);

const RelatedPosts = ({ current }) => {
  const isMobile = useIsMobile();
  const related = POSTS.filter(p => p.slug !== current.slug).slice(0, 3);
  if (!related.length) return null;
  return (
    <section style={{ padding: '56px 0 0', borderTop: `1px solid ${bp.line}`, marginTop: 56 }}>
      <div style={{ ...bps.eyebrow, marginBottom: 10 }}>More from the blog</div>
      <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', color: bp.ink, margin: '0 0 24px' }}>You may also want to read</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(related.length, 3)}, 1fr)`, gap: 16 }}>
        {related.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: `1px solid ${bp.lineCard}`, borderRadius: 16, padding: '24px 24px', background: bp.card, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600, color: bp.ink, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: bp.subMuted, flex: 1 }}>{p.excerpt}</div>
              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: bp.purple, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Read <ArrowRight size={12} /></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

const BlogCTA = () => {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: '72px 0 0' }}>
      <div style={{ background: `linear-gradient(110deg, ${bp.purple}, ${bp.purpleDeep})`, color: '#fff', borderRadius: 22, padding: isMobile ? '34px 24px' : '48px 44px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 26 : 36, alignItems: 'center' }}>
        <div>
          <div style={{ ...bps.eyebrow, color: '#D9CDF3', marginBottom: 14 }}>Schedule a consultation</div>
          <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 26 : 32, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, color: '#fff' }}>
            Waiting on answers for joint pain or an autoimmune concern?
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="/contact.html" style={{ textDecoration: 'none' }}>
            <button style={{ ...bps.btnWhite, width: '100%', padding: '15px 22px', fontSize: 14.5 }}>Request an appointment</button>
          </a>
          <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
            <button style={{ ...bps.btnOutlineLight, width: '100%', padding: '15px 22px', fontSize: 13.5 }}>Florida · (561) 730-3894</button>
          </a>
          <a href="tel:+17183478888" style={{ textDecoration: 'none' }}>
            <button style={{ ...bps.btnOutlineLight, width: '100%', padding: '15px 22px', fontSize: 13.5 }}>New York · (718) 347-8888</button>
          </a>
        </div>
      </div>
    </section>
  );
};

const BlogArticle = ({ slug }) => {
  const isMobile = useIsMobile();
  const post = POSTS.find(p => p.slug === slug);
  if (!post) {
    return (
      <PageShell active="blog">
        <section style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h1>Article not found</h1>
          <a href="/blog.html">Return to the blog</a>
        </section>
      </PageShell>
    );
  }
  return (
    <PageShell active="blog">
      <div style={{ padding: isMobile ? '14px 20px' : '18px 56px', fontSize: 13, color: bp.mutedLabel, background: bp.card, borderBottom: `1px solid ${bp.line}` }}>
        <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href="/blog.html" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: bp.purple }}>{post.title}</span>
      </div>

      <section style={{ padding: isMobile ? '40px 20px 40px' : '60px 56px 56px', background: `linear-gradient(160deg, ${bp.lavenderBg}, #ffffff)` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: bp.purple, background: bp.card, padding: '7px 15px', borderRadius: 999, marginBottom: 22 }}>{post.category}</div>
          <h1 style={{ ...bps.h1, fontSize: isMobile ? 36 : 48, margin: '0 0 22px' }}>{post.title}</h1>
          <p style={{ fontSize: isMobile ? 17 : 19, lineHeight: 1.65, color: bp.sub, margin: 0, maxWidth: 780 }}>{post.excerpt}</p>
          <div style={{ marginTop: 26, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12.5, letterSpacing: '0.06em', color: bp.mutedLabel, fontFamily: SANS, fontWeight: 600 }}>
            <span>BY {post.author.toUpperCase()}</span>
            <span>· {post.dateDisplay.toUpperCase()}</span>
            <span>· {post.readTime} MIN READ</span>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px 64px' : '56px 56px 96px', borderTop: `1px solid ${bp.line}` }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <BlogHtmlBody html={post.htmlBody} />
          <RelatedPosts current={post} />
          <BlogCTA />
        </div>
      </section>
    </PageShell>
  );
};

window.BlogArticle = BlogArticle;
