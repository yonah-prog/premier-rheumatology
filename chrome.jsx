// Shared site chrome — header, footer, palette, page shell.
// Used by every page (index, about, team, etc.) so edits stay in one place.

const palette = {
  bg: '#fafafa', card: '#ffffff', line: '#e6e4ea',
  ink: '#12101a', sub: '#5a5664',
  purple: '#5a1f99', purpleDeep: '#2a1247', purpleLight: '#ede5f7', accent: '#7d3fbf',
};

const chromeStyles = {
  eyebrow: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: palette.purple, fontWeight: 500 },
  h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '-0.035em', fontSize: 56, lineHeight: 1.04, color: palette.ink, margin: 0 },
};

const NavLink = ({ href, children, active }) => (
  <a href={href} style={{
    textDecoration: 'none', color: active ? palette.purple : palette.ink,
    fontSize: 14.5, fontWeight: active ? 600 : 500,
    borderBottom: active ? `2px solid ${palette.purple}` : '2px solid transparent',
    paddingBottom: 4,
  }}>{children}</a>
);

const SiteHeader = ({ active }) => (
  <header style={{ padding: '22px 56px', display: 'grid', gridTemplateColumns: '220px 1fr auto', alignItems: 'center', gap: 40, background: palette.card, borderBottom: `1px solid ${palette.line}` }}>
    <a href="index.html" style={{ textDecoration: 'none' }}>
      <PRLogo size={40} wordColor={palette.ink} />
    </a>
    <nav style={{ display: 'flex', gap: 32, color: palette.ink, justifyContent: 'center' }}>
      <NavLink href="about.html" active={active === 'about'}>About Premier Rheumatology</NavLink>
      <NavLink href="team.html" active={active === 'team'}>Our Team</NavLink>
      <NavLink href="conditions.html" active={active === 'conditions'}>Conditions We Treat</NavLink>
      <NavLink href="florida.html" active={active === 'florida'}>Florida</NavLink>
      <NavLink href="new-york.html" active={active === 'new-york'}>New York</NavLink>
      <NavLink href="contact.html" active={active === 'contact'}>Contact</NavLink>
    </nav>
    <a href="contact.html" style={{ textDecoration: 'none' }}>
      <button style={{ background: palette.ink, color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
        Schedule an Appointment
      </button>
    </a>
  </header>
);

const SiteFooter = () => (
  <footer style={{ background: palette.purpleDeep, color: '#fff', padding: '56px 56px 28px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, paddingBottom: 40, borderBottom: '1px solid #ffffff20' }}>
      <div>
        <PRLogo size={36} wordColor="#fff" />
        <p style={{ marginTop: 20, opacity: 0.72, maxWidth: 360, fontSize: 15, lineHeight: 1.55 }}>
          Specialized rheumatology and autoimmune care serving South Florida and the New York metro area. Call today to schedule your consultation.
        </p>
      </div>
      <div>
        <div style={{ ...chromeStyles.eyebrow, color: palette.accent, marginBottom: 12 }}>Florida Office</div>
        <div style={{ opacity: 0.78, lineHeight: 1.7, fontSize: 14 }}>
          2900 N Military Trl<br/>Boca Raton, FL 33431<br/>(561) 730-3894
        </div>
      </div>
      <div>
        <div style={{ ...chromeStyles.eyebrow, color: palette.accent, marginBottom: 12 }}>New York Office</div>
        <div style={{ opacity: 0.78, lineHeight: 1.7, fontSize: 14 }}>
          261-12 E Williston Ave<br/>Queens, NY 11001<br/>(718) 347-8888
        </div>
      </div>
      <div>
        <div style={{ ...chromeStyles.eyebrow, color: palette.accent, marginBottom: 12 }}>Navigate</div>
        <div style={{ opacity: 0.78, lineHeight: 2, fontSize: 14 }}>
          <a href="about.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>About</a>
          <a href="team.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Our Team</a>
          <a href="conditions.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Conditions</a>
          <a href="florida.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Florida</a>
          <a href="new-york.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>New York</a>
          <a href="contact.html" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Contact</a>
        </div>
      </div>
    </div>
    <div style={{ paddingTop: 20, opacity: 0.5, fontSize: 12 }}>© 2026 Premier Rheumatology</div>
  </footer>
);

const PageShell = ({ active, children }) => (
  <div style={{ background: palette.bg, color: palette.ink, fontFamily: 'Manrope, sans-serif', minHeight: '100vh' }}>
    <SiteHeader active={active} />
    {children}
    <SiteFooter />
  </div>
);

Object.assign(window, { palette, chromeStyles, SiteHeader, SiteFooter, PageShell, NavLink });
