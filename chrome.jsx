// Shared site chrome — header, footer, palette, page shell.
// Used by every page (index, about, team, etc.) so edits stay in one place.

const palette = {
  bg: '#fafafa', card: '#ffffff', line: '#e6e4ea',
  ink: '#12101a', sub: '#5a5664',
  purple: '#5a1f99', purpleDeep: '#2a1247', purpleLight: '#ede5f7', accent: '#7d3fbf',
};

const chromeStyles = {
  eyebrow: { fontFamily: 'Manrope, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: palette.purple, fontWeight: 300 },
  h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '-0.035em', fontSize: 56, lineHeight: 1.04, color: palette.ink, margin: 0 },
};

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    /* Nav hover */
    header nav a { transition: color 0.18s, border-bottom-color 0.18s; }
    header nav a:hover { color: #5a1f99 !important; border-bottom-color: #5a1f99 !important; opacity: 1 !important; }

    /* All buttons */
    button { transition: filter 0.15s, transform 0.1s; }
    button:hover { filter: brightness(0.88); }
    button:active { transform: scale(0.97); }

    /* Card links — lift */
    section a > div { transition: box-shadow 0.2s, transform 0.2s; }
    section a:hover > div { box-shadow: 0 10px 32px rgba(18,16,26,0.1); transform: translateY(-3px); }
    section a:hover { opacity: 1 !important; }

    /* Footer links */
    footer a { transition: opacity 0.15s; }
    footer a:hover { opacity: 1 !important; }

    /* FAQ accordion open/close */
    details summary { transition: color 0.15s; }
    details summary:hover { color: #5a1f99; }
    details[open] summary span:last-child { display: inline-block; transform: rotate(45deg); }

    /* Global link transitions */
    a { transition: opacity 0.15s; }
  `}} />
);

const NavLink = ({ href, children, active }) => (
  <a href={href} style={{
    textDecoration: 'none', color: active ? palette.purple : palette.ink,
    fontSize: 14.5, fontWeight: active ? 600 : 500,
    borderBottom: active ? `2px solid ${palette.purple}` : '2px solid transparent',
    paddingBottom: 4,
  }}>{children}</a>
);

const SiteHeader = ({ active }) => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header style={{ background: palette.card, borderBottom: `1px solid ${palette.line}` }}>
      <div style={{ padding: isMobile ? '16px 20px' : '22px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : '220px 1fr auto', alignItems: 'center', gap: isMobile ? 0 : 40 }}>
        <a href="index.html" style={{ textDecoration: 'none' }}>
          <PRLogo size={isMobile ? 34 : 40} wordColor={palette.ink} />
        </a>
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32, color: palette.ink, justifyContent: 'center' }}>
            <NavLink href="about.html" active={active === 'about'}>About Premier Rheumatology</NavLink>
            <NavLink href="team.html" active={active === 'team'}>Our Team</NavLink>
            <NavLink href="conditions.html" active={active === 'conditions'}>Conditions We Treat</NavLink>
            <NavLink href="florida.html" active={active === 'florida'}>Florida</NavLink>
            <NavLink href="new-york.html" active={active === 'new-york'}>New York</NavLink>
            <NavLink href="contact.html" active={active === 'contact'}>Contact</NavLink>
          </nav>
        )}
        {!isMobile && (
          <a href="contact.html" style={{ textDecoration: 'none' }}>
            <button style={{ background: palette.purple, color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Schedule an Appointment
            </button>
          </a>
        )}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 24, padding: '4px 8px', color: palette.ink }}
            aria-label="Toggle navigation"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>
      {isMobile && menuOpen && (
        <div style={{ borderTop: `1px solid ${palette.line}`, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 0, background: palette.card }}>
          {[
            { href: 'about.html', label: 'About Premier Rheumatology', key: 'about' },
            { href: 'team.html', label: 'Our Team', key: 'team' },
            { href: 'conditions.html', label: 'Conditions We Treat', key: 'conditions' },
            { href: 'florida.html', label: 'Florida', key: 'florida' },
            { href: 'new-york.html', label: 'New York', key: 'new-york' },
            { href: 'contact.html', label: 'Contact', key: 'contact' },
          ].map(item => (
            <a key={item.key} href={item.href} style={{
              textDecoration: 'none', color: active === item.key ? palette.purple : palette.ink,
              fontSize: 16, fontWeight: active === item.key ? 700 : 500,
              padding: '14px 0', borderBottom: `1px solid ${palette.line}`,
            }}>{item.label}</a>
          ))}
          <a href="contact.html" style={{ textDecoration: 'none', marginTop: 16 }}>
            <button style={{ width: '100%', background: palette.purple, color: '#fff', border: 'none', padding: '15px 22px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Schedule an Appointment
            </button>
          </a>
        </div>
      )}
    </header>
  );
};

const SiteFooter = () => {
  const isMobile = useIsMobile();
  return (
  <footer style={{ background: palette.purpleDeep, color: '#fff', padding: isMobile ? '40px 20px 24px' : '56px 56px 28px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 32 : 48, paddingBottom: 40, borderBottom: '1px solid #ffffff20' }}>
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
};

const PageShell = ({ active, children }) => (
  <div style={{ background: palette.bg, color: palette.ink, fontFamily: 'Manrope, sans-serif', minHeight: '100vh' }}>
    <GlobalStyles />
    <SiteHeader active={active} />
    {children}
    <SiteFooter />
  </div>
);

Object.assign(window, { palette, chromeStyles, SiteHeader, SiteFooter, PageShell, NavLink });
