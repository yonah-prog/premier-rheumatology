// Shared helpers used across the Premier Rheumatology site.

// Paths are absolute: condition pages live one level down at /conditions/*,
// so a relative src would 404 on every article page.
const PRLogo = ({ size = 44, wordmark = true, wordColor = '#12101a' }) => {
  const isLight = wordColor === '#fff';
  const src = isLight ? '/Images/site-images-1/Asset-3.png' : '/logo.png';
  return (
    <img
      src={src}
      alt="Premier Rheumatology"
      style={{ height: size, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  );
};

const Placeholder = ({ label, w = '100%', h = 320, tone = 'warm', radius = 18, style = {} }) => {
  // Tones stay inside the purple family so placeholders read as brand surfaces.
  const palettes = {
    warm:   { bg: '#F4F0FB', stripe: '#EBE3FA', ink: '#7C6BA6' },
    cool:   { bg: '#EFEAF8', stripe: '#E4DBF4', ink: '#6E63A0' },
    purple: { bg: '#EBE3FA', stripe: '#DED2F3', ink: '#5B3FA0' },
    mint:   { bg: '#F2EEFA', stripe: '#E7E0F6', ink: '#6A6094' },
  };
  const p = palettes[tone] || palettes.warm;
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${p.bg} 0 14px, ${p.stripe} 14px 28px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: p.ink, fontFamily: "'Hanken Grotesk', system-ui, sans-serif", fontSize: 12, letterSpacing: '0.1em',
      textTransform: 'uppercase', textAlign: 'center', padding: 12, fontWeight: 600, ...style,
    }}>
      <span style={{ background: p.bg, padding: '6px 10px', borderRadius: 4, border: `1px dashed ${p.ink}55` }}>
        {label}
      </span>
    </div>
  );
};

const MapMini = ({ state = 'FL', tone = '#EBE3FA', ink = '#5B3FA0' }) => (
  <svg viewBox="0 0 240 160" style={{ width: '100%', height: '100%', display: 'block' }} preserveAspectRatio="xMidYMid slice">
    <rect width="240" height="160" fill={tone} />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 14} x2="240" y2={i * 14} stroke={ink} strokeWidth="0.3" opacity="0.25" />
    ))}
    {Array.from({ length: 18 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 14} y1="0" x2={i * 14} y2="160" stroke={ink} strokeWidth="0.3" opacity="0.25" />
    ))}
    {state === 'FL' ? (
      <path d="M60 50 Q80 45 110 55 Q140 62 165 70 Q185 78 195 105 Q200 130 175 140 Q150 145 135 135 Q125 118 115 110 Q95 100 85 85 Q70 72 60 50 Z" fill={ink} opacity="0.18" />
    ) : (
      <path d="M40 40 L120 30 L180 55 L200 90 L165 125 L100 130 L55 110 L35 80 Z" fill={ink} opacity="0.18" />
    )}
    <g transform={state === 'FL' ? 'translate(165,100)' : 'translate(170,70)'}>
      <circle r="18" fill={ink} opacity="0.15" />
      <circle r="8" fill={ink} />
      <circle r="3" fill="#fff" />
    </g>
  </svg>
);

const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 12.5 10 18 20 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CARE_TEAM = [
  { loc: 'FL', name: 'Dr. Mouriel Boucher, DO', role: 'Rheumatologist', bio: 'Board-certified rheumatologist with deep expertise in autoimmune disease, inflammatory arthritis, and long-term joint preservation.', photo: 'Images/mouriel-headshot.png' },
  { loc: 'FL', name: 'Natalie Akerman, NP', role: 'Family Nurse Practitioner · Rheumatology Specialist', bio: 'Specialized in ongoing disease management, infusion therapy, and thoughtful patient education.', photo: 'natalie-1.png' },
  { loc: 'NY', name: 'Dr. Bruce Stein, MD', role: 'Rheumatologist', bio: 'Fellowship-trained at Long Island Jewish Medical Center with over a decade leading our Queens practice. Special interest in rheumatoid arthritis, lupus, gout, fibromyalgia, osteoarthritis, myositis, osteoporosis, and sports-related injuries.', photo: 'Images/bruce-stein.png' },
];

const SERVICES = [
  { t: 'Arthritis & Joint Pain Management', d: 'Targeted therapy for osteoarthritis, rheumatoid arthritis, and inflammatory joint diseases to reduce pain and preserve mobility.' },
  { t: 'Autoimmune & Connective Tissue Disorders', d: 'Expert care for lupus, scleroderma, vasculitis, and other systemic conditions requiring specialized rheumatologic treatment.' },
  { t: 'Infusion Therapy Services', d: 'On-site infusions for advanced biologic and IV medications in a comfortable, patient-centered environment.' },
  { t: 'Bone Health & Osteoporosis Care', d: 'Comprehensive evaluation and treatment to strengthen bones, prevent fractures, and promote long-term skeletal health.' },
  { t: 'Sports & Musculoskeletal Medicine', d: 'Specialized care for overuse injuries, joint strain, and chronic pain to help you stay active and strong.' },
];

const LOCATIONS = [
  { id: 'FL', region: 'Florida', city: 'Boca Raton', address: '2900 N Military Trl, Suite 230', cityline: 'Boca Raton, FL 33431', phone: '(561) 730-3894', fax: '(561) 440-3280', hours: 'Mon–Fri · 8:30am–5:00pm', team: ['Dr. Mouriel Boucher, DO', 'Natalie Akerman, NP'],
    city2: 'Coconut Creek', address2: '4400 W Sample Rd, Suite 236', cityline2: 'Coconut Creek, FL 33066',
    mapSrc2: 'https://www.google.com/maps?q=4400+W+Sample+Rd+Suite+236,+Coconut+Creek,+FL+33066&output=embed&z=15',
    mapsUrl2: 'https://maps.google.com/?q=4400+W+Sample+Rd+Suite+236,+Coconut+Creek,+FL+33066',
  },
  { id: 'NY', region: 'New York', city: 'Queens', address: '261-12 E Williston Ave', cityline: 'Queens, NY 11001', phone: '(718) 347-8888', fax: '—', hours: 'Mon–Fri · 9:00am–5:00pm', team: ['Our New York physician'] },
];

// Width the pages are prerendered at. build.mjs's SSR sandbox reports this same
// value, so keep the two in sync: the first client render must produce the exact
// tree the server produced or hydration fails (React #418 -> #423, which throws
// away the whole prerendered DOM and re-renders on the client — the opposite of
// what the prerender is for).
const SSR_VIEWPORT_WIDTH = 1200;

// Viewport width for responsive layout decisions.
//
// Reads documentElement.clientWidth, not window.innerWidth. The prerendered HTML
// is server-rendered at a desktop width, so on a phone the first paint overflows
// the viewport — which inflates window.innerWidth to the overflowing content
// width and makes the client agree it is "desktop", so the mobile layout never
// engages. clientWidth reports the true layout viewport and breaks that loop.
//
// The measurement is deliberately NOT used for the initial render: state starts
// at the prerender width so render #1 matches the server markup, and the effect
// below swaps in the real width immediately after mount (the standard two-pass
// pattern). Narrow clients therefore hydrate the desktop tree and re-render once
// into the mobile tree — same paint sequence they already got from the hydration
// fallback, minus the errors and minus discarding the server DOM.
const useViewportWidth = () => {
  const read = () =>
    (typeof document !== 'undefined' && document.documentElement && document.documentElement.clientWidth)
      ? document.documentElement.clientWidth
      : (typeof window !== 'undefined' && window.innerWidth ? window.innerWidth : SSR_VIEWPORT_WIDTH);

  const [w, setW] = React.useState(SSR_VIEWPORT_WIDTH);
  React.useEffect(() => {
    const h = () => setW(read());
    h(); // adopt the real viewport width now that hydration is done
    window.addEventListener('resize', h);
    window.addEventListener('orientationchange', h);
    return () => {
      window.removeEventListener('resize', h);
      window.removeEventListener('orientationchange', h);
    };
  }, []);
  return w;
};

const useIsMobile = () => useViewportWidth() < 768;
const useIsTablet = () => useViewportWidth() < 1024;

Object.assign(window, { PRLogo, Placeholder, MapMini, CheckIcon, ArrowRight, CARE_TEAM, LOCATIONS, SERVICES, useIsMobile, useIsTablet, useViewportWidth });
