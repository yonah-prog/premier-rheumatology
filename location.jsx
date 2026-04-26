// Shared location page template — used by florida.html and new-york.html.
// Pass locationId="FL" or locationId="NY" to render the correct office.

const lp = palette;
const lps = chromeStyles;

const LOC_CONFIG = {
  FL: {
    id: 'FL',
    active: 'florida',
    region: 'Florida',
    city: 'Boca Raton',
    address: '2900 N Military Trl',
    cityline: 'Boca Raton, FL 33431',
    phone: '(561) 730-3894',
    phoneTel: '+15617303894',
    fax: '(561) 440-3280',
    hours: 'Mon–Fri · 8:30am–5:00pm',
    dot: palette.purple,
    mapSrc: 'https://www.google.com/maps?q=2900+N+Military+Trl,+Boca+Raton,+FL+33431&output=embed',
    mapsUrl: 'https://maps.google.com/?q=2900+N+Military+Trl,+Boca+Raton,+FL+33431',
    h1Line1: 'Rheumatology care',
    h1Line2: 'in Boca Raton, Florida.',
    eyebrow: 'Florida Office · Boca Raton',
    intro: "Premier Rheumatology's Boca Raton office provides expert, compassionate rheumatologic care to patients across South Florida, Palm Beach County, and surrounding communities. Our board-certified physicians specialize in the diagnosis and long-term management of autoimmune, inflammatory, and musculoskeletal conditions — with a focus on getting you back to the life you love.",
    seoBody: [
      "Whether you're experiencing joint pain for the first time or managing a long-standing autoimmune condition, our Boca Raton rheumatology team meets you where you are. We take time to listen, build individualized care plans, and provide ongoing support that adapts as your needs change.",
      'Conveniently located on N Military Trail, our Boca Raton clinic offers comprehensive rheumatology services including biologic infusion therapy, DEXA bone density scanning, joint assessments, and more — all in one location. New and established patients are welcome.',
    ],
    seoKeywords: ['rheumatologist Boca Raton', 'arthritis specialist South Florida', 'autoimmune disease Palm Beach County', 'lupus treatment Boca Raton', 'infusion therapy Boca Raton', 'rheumatology clinic Florida'],
    servingText: 'Serving Boca Raton, Delray Beach, Boynton Beach, West Palm Beach, Deerfield Beach, and surrounding Palm Beach County communities.',
    teamLoc: 'FL',
  },
  NY: {
    id: 'NY',
    active: 'new-york',
    region: 'New York',
    city: 'Queens',
    address: '261-12 E Williston Ave',
    cityline: 'Queens, NY 11001',
    phone: '(718) 347-8888',
    phoneTel: '+17183478888',
    fax: null,
    hours: 'Mon–Fri · 9:00am–5:00pm',
    dot: '#2e6b52',
    mapSrc: 'https://www.google.com/maps?q=261-12+E+Williston+Ave,+Queens,+NY+11001&output=embed',
    mapsUrl: 'https://maps.google.com/?q=261-12+E+Williston+Ave,+Queens,+NY+11001',
    h1Line1: 'Rheumatology care',
    h1Line2: 'in Queens, New York.',
    eyebrow: 'New York Office · Queens',
    intro: "Premier Rheumatology's Queens office brings board-certified rheumatologic expertise to New York City and the surrounding metro area. Our physician specializes in autoimmune arthritis, connective tissue diseases, bone health, and complex inflammatory conditions — delivering individualized care with the time and attention every patient deserves.",
    seoBody: [
      'At our Queens location, patients benefit from the same evidence-based, patient-first approach that defines Premier Rheumatology. We understand that navigating a rheumatologic diagnosis can be overwhelming — our goal is to make that process clear, supported, and as comfortable as possible.',
      'Conveniently located in Floral Park, Queens, our New York clinic offers comprehensive rheumatology services including biologic infusion therapy, joint evaluations, and long-term disease management. We welcome new patients and accept most major insurance plans.',
    ],
    seoKeywords: ['rheumatologist Queens NY', 'arthritis specialist New York', 'autoimmune disease Queens', 'lupus treatment New York', 'infusion therapy Queens NY', 'rheumatology Floral Park'],
    servingText: 'Serving Queens, Nassau County, Long Island, Brooklyn, and surrounding New York metro communities.',
    teamLoc: 'NY',
  },
};

// ─── Hero ────────────────────────────────────────────────────
const LocHero = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px 72px', background: lp.card, borderBottom: `1px solid ${lp.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: cfg.dot }} />
      <div style={{ ...lps.eyebrow, color: cfg.dot }}>{cfg.eyebrow}</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 24 : 72, alignItems: 'end' }}>
      <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: isMobile ? 44 : 76, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.04, margin: 0, color: lp.ink }}>
        {cfg.h1Line1}<br />
        <span style={{ color: cfg.dot }}>{cfg.h1Line2}</span>
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: lp.sub, margin: 0 }}>{cfg.intro}</p>
    </div>
  </section>
  );
};

// ─── Location bar + map ──────────────────────────────────────
const LocMap = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', minHeight: isMobile ? 'auto' : 440 }}>
    <div style={{ padding: isMobile ? '36px 20px' : '56px 56px', background: lp.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, borderRight: isMobile ? 'none' : `1px solid ${lp.line}`, borderBottom: isMobile ? `1px solid ${lp.line}` : 'none' }}>
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Address</div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>{cfg.address}</div>
        <div style={{ fontSize: 16, color: lp.sub }}>{cfg.cityline}</div>
      </div>
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Phone</div>
        <a href={`tel:${cfg.phoneTel}`} style={{ fontSize: 20, fontWeight: 700, color: lp.ink, textDecoration: 'none', letterSpacing: '-0.01em' }}>{cfg.phone}</a>
      </div>
      {cfg.fax && (
        <div>
          <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Fax</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{cfg.fax}</div>
        </div>
      )}
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Hours</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{cfg.hours}</div>
      </div>
      <a href={cfg.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
        <button style={{ background: lp.ink, color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'inherit' }}>
          Get directions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </a>
      <div style={{ fontSize: 13, color: lp.sub, lineHeight: 1.6, borderTop: `1px solid ${lp.line}`, paddingTop: 20 }}>{cfg.servingText}</div>
    </div>
    <div style={{ position: 'relative', minHeight: isMobile ? 300 : 440 }}>
      <iframe
        title={`${cfg.city} office map`}
        src={cfg.mapSrc}
        width="100%" height="100%"
        style={{ border: 0, display: 'block', minHeight: isMobile ? 300 : 440 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </section>
  );
};

// ─── Patient-centric care copy ───────────────────────────────
const LocAbout = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', borderTop: `1px solid ${lp.line}`, borderBottom: `1px solid ${lp.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? 32 : 80, alignItems: 'start' }}>
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 16 }}>Our {cfg.region} practice</div>
        <h2 style={{ ...lps.h2, fontSize: 44, marginBottom: 0 }}>
          Expert care, built around you.
        </h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cfg.seoKeywords.map((kw, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: lp.sub }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
              {kw}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {cfg.seoBody.map((para, i) => (
          <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: lp.sub, margin: 0 }}>{para}</p>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <a href="contact.html" style={{ textDecoration: 'none' }}>
            <button style={{ background: lp.ink, color: '#fff', border: 'none', padding: '16px 26px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'inherit' }}>
              Schedule a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </a>
          <a href={`tel:${cfg.phoneTel}`} style={{ textDecoration: 'none' }}>
            <button style={{ background: 'transparent', color: lp.ink, border: `1px solid ${lp.line}`, padding: '16px 26px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {cfg.phone}
            </button>
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

// ─── Care team for this location ─────────────────────────────
const LocTeam = ({ cfg }) => {
  const isMobile = useIsMobile();
  const team = CARE_TEAM.filter(p => p.loc === cfg.teamLoc);
  const tones = ['purple', 'warm', 'cool', 'mint'];
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', background: lp.card, borderBottom: `1px solid ${lp.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
        <div>
          <div style={{ ...lps.eyebrow, marginBottom: 14 }}>{cfg.region} Care Team</div>
          <h2 style={{ ...lps.h2, fontSize: 44, margin: 0 }}>Meet your {cfg.city} providers.</h2>
        </div>
        <a href="team.html" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', color: lp.ink, border: `1px solid ${lp.line}`, padding: '13px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
            Full team page
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${team.length}, 1fr)`, gap: 24 }}>
        {team.map((p, i) => (
          <div key={i} style={{ border: `1px solid ${lp.line}`, borderRadius: 20, overflow: 'hidden', background: lp.bg }}>
            {p.photo
              ? <img src={p.photo} alt={p.name} style={{ width: '100%', height: 360, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              : <Placeholder label={`${p.name} · portrait`} tone={tones[i] || 'cool'} h={360} radius={0} />
            }
            <div style={{ padding: '28px 30px 32px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: cfg.dot, fontWeight: 600, marginBottom: 14 }}>{p.role}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.65, color: lp.sub }}>{p.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Services — infusion therapy featured ────────────────────
const LocServices = ({ cfg }) => {
  const isMobile = useIsMobile();
  const other = SERVICES.filter(s => !s.t.toLowerCase().includes('infusion'));
  const infusion = SERVICES.find(s => s.t.toLowerCase().includes('infusion'));
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', borderBottom: `1px solid ${lp.line}` }}>
      <div style={{ ...lps.eyebrow, marginBottom: 14 }}>Services at our {cfg.city} office</div>
      <h2 style={{ ...lps.h2, fontSize: 44, marginBottom: 48 }}>Comprehensive rheumatology, all in one place.</h2>

      {/* Infusion therapy — featured full-width */}
      {infusion && (
        <div style={{ background: lp.purpleDeep, color: '#fff', borderRadius: 20, padding: isMobile ? '32px 20px' : '52px 56px', marginBottom: 24, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'center' }}>
          <div>
            <div style={{ ...lps.eyebrow, color: '#c9a8f0', marginBottom: 16 }}>Featured service</div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px' }}>{infusion.t}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.82, margin: '0 0 32px' }}>{infusion.d}</p>
            <p style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.72, margin: '0 0 32px' }}>
              Our {cfg.city} office administers biologic and IV infusion medications on-site in a comfortable, supervised clinical environment — no separate infusion center required. Medications are administered by trained clinical staff with physician oversight.
            </p>
            <a href="contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#fff', color: lp.purpleDeep, border: 'none', padding: '16px 26px', borderRadius: 10, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Ask about infusion therapy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={lp.purpleDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </a>
          </div>
          <img src="Images/site-images-3/5-Infusion-Therapy-Benefits.jpg" alt="Infusion therapy suite" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', borderRadius: 16 }} />
        </div>
      )}

      {/* Other services — grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
        {other.map((s, i) => (
          <div key={i} style={{ background: lp.card, border: `1px solid ${lp.line}`, borderRadius: 16, padding: '32px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: lp.purpleLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12.5 10 18 20 6" stroke={lp.purple} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>{s.t}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: lp.sub }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────────
const LocCTA = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px' }}>
    <div style={{ background: cfg.dot, color: '#fff', borderRadius: 24, padding: isMobile ? '36px 24px' : '64px 64px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 28 : 48, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffffff99', marginBottom: 18 }}>
          {cfg.city} · {cfg.region}
        </div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: isMobile ? 32 : 48, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, margin: '0 0 18px' }}>
          Ready to meet our {cfg.city} team?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
          New and established patients are welcome. Call us or submit a message and we'll follow up within one business day.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: '#fff', color: lp.ink, border: 'none', padding: '18px 26px', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Contact us online
          </button>
        </a>
        <a href={`tel:${cfg.phoneTel}`} style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid #ffffff55', padding: '18px 26px', borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            Call {cfg.phone}
          </button>
        </a>
      </div>
    </div>
  </section>
  );
};

// ─── Page ────────────────────────────────────────────────────
const LocationPage = ({ locationId }) => {
  const cfg = LOC_CONFIG[locationId];
  if (!cfg) return null;
  return (
    <PageShell active={cfg.active}>
      <LocHero cfg={cfg} />
      <LocMap cfg={cfg} />
      <LocAbout cfg={cfg} />
      <LocTeam cfg={cfg} />
      <LocServices cfg={cfg} />
      <LocCTA cfg={cfg} />
    </PageShell>
  );
};

window.LocationPage = LocationPage;
