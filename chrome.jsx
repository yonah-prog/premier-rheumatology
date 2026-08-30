// Shared site chrome — header, footer, palette, page shell.
// Used by every page (index, about, team, etc.) so edits stay in one place.
//
// Visual language is aligned with the Premier Hematology & Oncology design
// system: Newsreader serif for display type, Hanken Grotesk for body, a
// monochrome purple palette, pill buttons, and a deep-indigo footer.
// Base tokens and article prose live in assets/css/style.css.

const palette = {
  bg: '#FAF8FD', card: '#ffffff', line: '#EFEAF8', lineCard: '#EEE7F7',
  ink: '#1C1633', sub: '#56526A', subAlt: '#43405A', subMuted: '#6A6480',
  mutedLabel: '#8A84A0',
  purple: '#5B3FA0', purpleDeep: '#3E2A6E', purpleHover: '#4C3388',
  purpleLight: '#EBE3FA', lavenderBg: '#F4F0FB',
  accent: '#8D7FB8', footerBg: '#141029', stepNumeral: '#C3AEF0',
  // Per-region accents. The practice runs two Florida offices and one New York
  // office; each region keeps a distinct marker, both inside the purple family.
  regionFL: '#5B3FA0', regionNY: '#3E2A6E',
};

const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, sans-serif";

const chromeStyles = {
  // Small uppercase label that opens most sections.
  eyebrow: {
    fontFamily: SANS, fontSize: 12.5, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: palette.purple, fontWeight: 600,
  },
  // Serif italic eyebrow, used where a softer lead-in reads better.
  eyebrowSerif: {
    fontFamily: SERIF, fontStyle: 'italic', fontSize: 17, color: palette.purple,
  },
  // Default section heading. Callers routinely override fontSize.
  h2: {
    fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.015em',
    fontSize: 42, lineHeight: 1.12, color: palette.ink, margin: 0,
  },
  // Page-level display heading.
  h1: {
    fontFamily: SERIF, fontWeight: 500, letterSpacing: '-0.02em',
    lineHeight: 1.06, color: palette.ink, margin: 0,
  },
  // Primary pill button.
  btn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    padding: '14px 28px', background: palette.purple, color: '#fff',
    borderRadius: 999, fontWeight: 600, fontSize: 15,
    fontFamily: SANS, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  // Secondary / outline pill button.
  btnGhost: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    padding: '14px 28px', background: 'transparent', color: palette.purple,
    border: `1.5px solid ${palette.purpleLight}`, borderRadius: 999,
    fontWeight: 600, fontSize: 15, fontFamily: SANS, cursor: 'pointer', whiteSpace: 'nowrap',
  },
  // White pill, for use on purple/dark panels.
  btnWhite: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    padding: '14px 28px', background: '#fff', color: palette.purple,
    borderRadius: 999, fontWeight: 600, fontSize: 15,
    fontFamily: SANS, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  // Outline pill on dark panels.
  btnOutlineLight: {
    display: 'inline-flex', alignItems: 'center', gap: 9,
    padding: '14px 28px', background: 'transparent', color: '#fff',
    border: '1px solid rgba(255,255,255,0.32)', borderRadius: 999,
    fontWeight: 500, fontSize: 15, fontFamily: SANS, cursor: 'pointer', whiteSpace: 'nowrap',
  },
  // Card surface.
  card: {
    background: '#fff', border: `1px solid ${palette.lineCard}`,
    borderRadius: 16, overflow: 'hidden',
  },
};

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    /* Nav hover */
    header nav a { transition: color 0.15s, border-bottom-color 0.15s; }
    header nav a:hover { color: ${palette.purple} !important; }

    /* Buttons */
    button:hover { filter: brightness(0.94); }
    button:active { transform: scale(0.985); }

    /* Card links — lift */
    section a > div, section a > article { transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; }
    section a:hover > div, section a:hover > article {
      box-shadow: 0 10px 32px rgba(91,63,160,0.12);
      transform: translateY(-3px);
      border-color: ${palette.purpleLight};
    }
    section a:hover { opacity: 1 !important; }

    /* Footer links */
    footer a { transition: color 0.15s; }

    /* FAQ accordion open/close */
    summary::-webkit-details-marker { display: none; }
    details summary:hover { color: ${palette.purple}; }
    details[open] > summary .acc-plus { transform: rotate(45deg); }
    .acc-plus { display: inline-block; transition: transform 0.2s ease; }

    /* Links */
    a { transition: opacity 0.15s, color 0.15s; }
  `}} />
);

const NavLink = ({ href, children, active }) => (
  <a href={href} style={{
    textDecoration: 'none', color: active ? palette.purple : '#2c2740',
    fontSize: 14.5, fontWeight: active ? 600 : 500,
    borderBottom: active ? `2px solid ${palette.purple}` : '2px solid transparent',
    paddingBottom: 4, whiteSpace: 'nowrap',
  }}>{children}</a>
);

const NAV_ITEMS = [
  { href: 'about.html', label: 'About Premier Rheumatology', key: 'about' },
  { href: 'team.html', label: 'Our Team', key: 'team' },
  { href: 'conditions.html', label: 'Conditions We Treat', key: 'conditions' },
  { href: 'florida.html', label: 'Florida', key: 'florida' },
  { href: 'new-york.html', label: 'New York', key: 'new-york' },
  { href: 'contact.html', label: 'Contact', key: 'contact' },
];

// Thin bar above the header carrying the same office phone numbers that
// appear in the footer — a signature element of the design system.
const UtilBar = () => (
  <div className="util-bar">
    <div className="util-bar__inner">
      <span className="util-bar__item util-bar__hide-sm">
        <span className="util-bar__dot" />
        Accepting new patients
      </span>
      <span className="util-bar__sep util-bar__hide-sm">|</span>
      <span className="util-bar__item">
        Florida
        <a href="tel:+15617303894" className="util-bar__phone">(561) 730-3894</a>
      </span>
      <span className="util-bar__item">
        New York
        <a href="tel:+17183478888" className="util-bar__phone">(718) 347-8888</a>
      </span>
    </div>
  </div>
);

const SiteHeader = ({ active }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <React.Fragment>
      <UtilBar />
      <header style={{ background: palette.card, borderBottom: `1px solid ${palette.line}`, position: 'relative', zIndex: 50 }}>
        <div style={{
          padding: isMobile ? '16px 20px' : '18px 56px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '200px 1fr auto',
          alignItems: 'center', gap: isMobile ? 0 : 32,
        }}>
          <a href="index.html" style={{ textDecoration: 'none' }}>
            <PRLogo size={isMobile ? 34 : 40} wordColor={palette.ink} />
          </a>
          {!isMobile && (
            <nav style={{ display: 'flex', gap: isTablet ? 18 : 28, justifyContent: 'center' }}>
              {NAV_ITEMS.map(item => (
                <NavLink key={item.key} href={item.href} active={active === item.key}>{item.label}</NavLink>
              ))}
            </nav>
          )}
          {!isMobile && (
            <a href="contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ ...chromeStyles.btn, padding: '12px 24px', fontSize: 14 }}>
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
            {NAV_ITEMS.map(item => (
              <a key={item.key} href={item.href} style={{
                textDecoration: 'none', color: active === item.key ? palette.purple : palette.ink,
                fontSize: 16, fontWeight: active === item.key ? 700 : 500,
                padding: '14px 0', borderBottom: `1px solid ${palette.line}`,
              }}>{item.label}</a>
            ))}
            <a href="contact.html" style={{ textDecoration: 'none', marginTop: 16 }}>
              <button style={{ ...chromeStyles.btn, width: '100%', padding: '15px 22px' }}>
                Schedule an Appointment
              </button>
            </a>
          </div>
        )}
      </header>
    </React.Fragment>
  );
};

const SiteFooter = () => {
  const isMobile = useIsMobile();
  const colLabel = {
    fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: palette.accent, marginBottom: 18,
  };
  const linkStyle = { color: '#B3ACC9', textDecoration: 'none', display: 'block' };
  return (
  <footer style={{ background: palette.footerBg, color: '#B3ACC9' }}>
    <div style={{
      maxWidth: 1400, margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : '1.5fr 1fr 1fr 1fr',
      gap: isMobile ? 32 : 48,
      padding: isMobile ? '48px 20px 30px' : '70px 56px 30px',
    }}>
      <div>
        <PRLogo size={36} wordColor="#fff" />
        <p style={{ marginTop: 20, maxWidth: 300, fontSize: 14, lineHeight: 1.7, color: '#968FB0' }}>
          Specialized rheumatology and autoimmune care serving South Florida and the New York metro area. Call today to schedule your consultation.
        </p>
      </div>
      <div>
        <div style={colLabel}>Florida Offices</div>
        <div style={{ lineHeight: 1.7, fontSize: 14, color: '#B3ACC9' }}>
          2900 N Military Trl, Suite 230<br/>Boca Raton, FL 33431<br/>(561) 730-3894
        </div>
        <div style={{ lineHeight: 1.7, fontSize: 14, marginTop: 14, paddingTop: 14, borderTop: '1px solid #2a2444', color: '#B3ACC9' }}>
          4400 W Sample Rd, Suite 236<br/>Coconut Creek, FL 33066
        </div>
      </div>
      <div>
        <div style={colLabel}>New York Office</div>
        <div style={{ lineHeight: 1.7, fontSize: 14, color: '#B3ACC9' }}>
          261-12 E Williston Ave<br/>Queens, NY 11001<br/>(718) 347-8888
        </div>
      </div>
      <div>
        <div style={colLabel}>Navigate</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
          <a href="about.html" style={linkStyle}>About</a>
          <a href="team.html" style={linkStyle}>Our Team</a>
          <a href="conditions.html" style={linkStyle}>Conditions</a>
          <a href="florida.html" style={linkStyle}>Florida</a>
          <a href="new-york.html" style={linkStyle}>New York</a>
          <a href="contact.html" style={linkStyle}>Contact</a>
        </div>
      </div>
    </div>
    <div style={{ borderTop: '1px solid #2a2444' }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: isMobile ? '18px 20px' : '22px 56px',
        fontSize: 13, color: '#6F6790',
      }}>
        © 2026 Premier Rheumatology
      </div>
    </div>
  </footer>
  );
};

const PageShell = ({ active, children }) => (
  <div style={{ background: palette.bg, color: palette.ink, fontFamily: SANS, minHeight: '100vh' }}>
    <GlobalStyles />
    <SiteHeader active={active} />
    {children}
    <SiteFooter />
  </div>
);

Object.assign(window, { palette, chromeStyles, SiteHeader, SiteFooter, PageShell, NavLink, GlobalStyles, SERIF, SANS });
