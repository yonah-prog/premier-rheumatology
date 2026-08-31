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
    address: '2900 N Military Trl, Suite 230',
    cityline: 'Boca Raton, FL 33431',
    phone: '(561) 730-3894',
    phoneTel: '+15617303894',
    fax: '(561) 440-3280',
    hours: 'Mon–Fri · 8:30am–5:00pm',
    dot: palette.regionFL,
    mapSrc: 'https://www.google.com/maps?q=2900+N+Military+Trl+Suite+230,+Boca+Raton,+FL+33431&output=embed',
    mapsUrl: 'https://maps.google.com/?q=2900+N+Military+Trl+Suite+230,+Boca+Raton,+FL+33431',
    city2: 'Coconut Creek', address2: '4400 W Sample Rd, Suite 236', cityline2: 'Coconut Creek, FL 33066',
    mapSrc2: 'https://www.google.com/maps?q=4400+W+Sample+Rd+Suite+236,+Coconut+Creek,+FL+33066&output=embed',
    mapsUrl2: 'https://maps.google.com/?q=4400+W+Sample+Rd+Suite+236,+Coconut+Creek,+FL+33066',
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
    // FAQ copy must stay verbatim-identical to the FAQPage JSON-LD in florida.html (Google parity).
    faqs: [
      { q: 'Who are the rheumatologists at Premier Rheumatology in Boca Raton?',
        a: 'Dr. Mouriel Boucher, DO, a board-certified rheumatologist, and Natalie Akerman, NP see patients at our Boca Raton office (2900 N Military Trl, Suite 230) and our Coconut Creek office (4400 W Sample Rd, Suite 236).' },
      { q: 'Does the Boca Raton office offer on-site biologic or IV infusion therapy?',
        a: 'Yes. Biologic and IV infusions are administered in-office under clinical supervision, so patients do not need to go to a separate infusion center.' },
      { q: 'What conditions do you treat in Boca Raton?',
        a: 'Rheumatoid arthritis, lupus, osteoporosis, gout, psoriatic arthritis, scleroderma, vasculitis, and other autoimmune and inflammatory joint diseases.' },
      { q: 'Where is the Boca Raton office located?',
        a: '2900 N Military Trl, Suite 230, Boca Raton, FL 33431, with a second Florida office at 4400 W Sample Rd, Suite 236, Coconut Creek, FL 33066.' },
      { q: 'Are you accepting new patients in Boca Raton?',
        a: 'Yes, the Florida practice is currently accepting new patients. Call (561) 730-3894 to schedule.' },
      { q: 'Do I need a referral to see a rheumatologist in Boca Raton?',
        a: 'It depends on your insurance plan. Many patients self-refer; the front desk can confirm whether a referral is required when you call.' },
    ],
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
    dot: palette.regionNY,
    mapSrc: 'https://www.google.com/maps?q=261-12+E+Williston+Ave,+Queens,+NY+11001&output=embed',
    mapsUrl: 'https://maps.google.com/?q=261-12+E+Williston+Ave,+Queens,+NY+11001',
    h1Line1: 'Rheumatology care',
    h1Line2: 'in Queens, New York.',
    eyebrow: 'New York Office · Queens',
    intro: "Premier Rheumatology's Queens office brings board-certified rheumatologic expertise to New York City and the surrounding metro area. Our physician specializes in autoimmune arthritis, connective tissue diseases, bone health, and complex inflammatory conditions — delivering individualized care with the time and attention every patient deserves.",
    seoBody: [
      "Premier Rheumatology's Queens office — previously known as Floral Park Arthritis — has served Queens, Nassau, and Long Island patients for over a decade under Dr. Bruce Stein, MD. The practice is now part of Premier Rheumatology, bringing the same physician and the same location together with our Boca Raton team under one brand.",
      'At our Queens location, patients benefit from the same evidence-based, patient-first approach that defines Premier Rheumatology. We understand that navigating a rheumatologic diagnosis can be overwhelming — our goal is to make that process clear, supported, and as comfortable as possible.',
      'Conveniently located in Floral Park, Queens, our New York clinic offers comprehensive rheumatology services including biologic infusion therapy, joint evaluations, and long-term disease management. We welcome new patients and accept most major insurance plans.',
    ],
    seoKeywords: ['rheumatologist Queens NY', 'arthritis specialist New York', 'autoimmune disease Queens', 'lupus treatment New York', 'infusion therapy Queens NY', 'rheumatology Floral Park'],
    servingText: 'Serving Queens, Nassau County, Long Island, Brooklyn, and surrounding New York metro communities.',
    teamLoc: 'NY',
    // FAQ copy must stay verbatim-identical to the FAQPage JSON-LD in new-york.html (Google parity).
    faqs: [
      { q: 'Who is the rheumatologist at Premier Rheumatology in Queens?',
        a: 'Dr. Bruce Stein, MD, fellowship-trained at Long Island Jewish Medical Center, has led our Queens practice for over a decade.' },
      { q: 'What conditions does Dr. Stein treat?',
        a: 'Rheumatoid arthritis, lupus, gout, osteoarthritis, osteoporosis, myositis, fibromyalgia, and sports-related injuries.' },
      { q: 'Where is the Queens office located?',
        a: '261-12 E Williston Ave, Queens, NY 11001. Phone: (718) 347-8888.' },
      { q: 'Is the Queens practice accepting new patients?',
        a: 'Yes. Call (718) 347-8888 to schedule.' },
      { q: 'Do you treat autoimmune and inflammatory arthritis in Queens?',
        a: 'Yes — full rheumatologic evaluation and management, including biologic therapy where appropriate.' },
      { q: 'Do I need a referral to see Dr. Stein?',
        a: 'It depends on your insurance plan; the office can confirm when you call.' },
    ],
  },
};

// ─── Hero ────────────────────────────────────────────────────
const LocHero = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '76px 56px 72px', background: `linear-gradient(160deg, ${lp.lavenderBg}, #ffffff)`, borderBottom: `1px solid ${lp.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: cfg.dot }} />
      <div style={{ ...lps.eyebrow, color: cfg.dot }}>{cfg.eyebrow}</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 24 : 72, alignItems: 'end' }}>
      <h1 style={{ ...lps.h1, fontSize: isMobile ? 40 : 56 }}>
        {cfg.h1Line1}<br />
        <em style={{ fontStyle: 'italic', color: cfg.dot }}>{cfg.h1Line2}</em>
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: lp.sub, margin: 0 }}>{cfg.intro}</p>
    </div>
  </section>
  );
};

// ─── Location bar + map (single location — used for NY) ──────
const LocMap = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', minHeight: isMobile ? 'auto' : 440 }}>
    <div style={{ padding: isMobile ? '36px 20px' : '56px 56px', background: lp.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, borderRight: isMobile ? 'none' : `1px solid ${lp.line}`, borderBottom: isMobile ? `1px solid ${lp.line}` : 'none' }}>
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Address</div>
        <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: lp.ink, marginBottom: 6 }}>{cfg.address}</div>
        <div style={{ fontSize: 16, color: lp.sub }}>{cfg.cityline}</div>
      </div>
      <div>
        <div style={{ ...lps.eyebrow, marginBottom: 12 }}>Phone</div>
        <a href={`tel:${cfg.phoneTel}`} style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: lp.purple, textDecoration: 'none' }}>{cfg.phone}</a>
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
        <button style={{ ...lps.btn, padding: '14px 26px', fontSize: 14 }}>
          Get directions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </a>
      <div style={{ fontSize: 13, color: lp.mutedLabel, lineHeight: 1.65, borderTop: `1px solid ${lp.line}`, paddingTop: 20 }}>{cfg.servingText}</div>
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

// ─── Two FL locations side by side ───────────────────────────
const LocMapsGrid = ({ cfg }) => {
  const isMobile = useIsMobile();
  const locs = [
    { label: cfg.city,  address: cfg.address,  cityline: cfg.cityline,  mapsUrl: cfg.mapsUrl,  mapSrc: cfg.mapSrc  },
    { label: cfg.city2, address: cfg.address2, cityline: cfg.cityline2, mapsUrl: cfg.mapsUrl2, mapSrc: cfg.mapSrc2 },
  ];
  return (
    <section style={{ borderBottom: `1px solid ${lp.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        {locs.map((loc, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column',
            borderRight: !isMobile && i === 0 ? `1px solid ${lp.line}` : 'none',
            borderBottom: isMobile && i === 0 ? `1px solid ${lp.line}` : 'none',
          }}>
            {/* Info panel */}
            <div style={{ padding: isMobile ? '36px 20px' : '48px 48px', background: lp.bg, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ ...lps.eyebrow, color: cfg.dot, marginBottom: 10 }}>{loc.label}</div>
                <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, color: lp.ink, marginBottom: 4 }}>{loc.address}</div>
                <div style={{ fontSize: 15, color: lp.sub }}>{loc.cityline}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ ...lps.eyebrow, marginBottom: 8 }}>Phone</div>
                  <a href={`tel:${cfg.phoneTel}`} style={{ fontSize: 15, fontWeight: 700, color: lp.purple, textDecoration: 'none' }}>{cfg.phone}</a>
                </div>
                <div>
                  <div style={{ ...lps.eyebrow, marginBottom: 8 }}>Hours</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{cfg.hours}</div>
                </div>
              </div>
              {i === 0 && cfg.fax && (
                <div>
                  <div style={{ ...lps.eyebrow, marginBottom: 8 }}>Fax</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{cfg.fax}</div>
                </div>
              )}
              <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <button style={{ ...lps.btn, padding: '13px 24px', fontSize: 14 }}>
                  Get directions
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </a>
            </div>
            {/* Map */}
            <div style={{ flex: 1, minHeight: isMobile ? 260 : 320 }}>
              <iframe
                title={`${loc.label} office map`}
                src={loc.mapSrc}
                width="100%" height="100%"
                style={{ border: 0, display: 'block', minHeight: isMobile ? 260 : 320 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}
      </div>
      {cfg.servingText && (
        <div style={{ padding: isMobile ? '20px 20px' : '20px 48px', fontSize: 13, color: lp.mutedLabel, lineHeight: 1.65, borderTop: `1px solid ${lp.line}`, background: lp.bg }}>
          {cfg.servingText}
        </div>
      )}
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
        <h2 style={{ ...lps.h2, fontSize: 40, marginBottom: 0 }}>
          Expert care, built around you.
        </h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cfg.seoKeywords.map((kw, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: lp.subMuted }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
              {kw}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {cfg.seoBody.map((para, i) => (
          <p key={i} style={{ fontSize: 16.5, lineHeight: 1.8, color: lp.sub, margin: 0 }}>{para}</p>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <a href="contact.html" style={{ textDecoration: 'none' }}>
            <button style={{ ...lps.btn, padding: '15px 30px' }}>
              Schedule a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </a>
          <a href={`tel:${cfg.phoneTel}`} style={{ textDecoration: 'none' }}>
            <button style={{ ...lps.btnGhost, padding: '15px 30px' }}>
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
          <h2 style={{ ...lps.h2, fontSize: 40, margin: 0 }}>Meet your {cfg.city} providers.</h2>
        </div>
        <a href="team.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...lps.btnGhost, padding: '13px 24px', fontSize: 14 }}>
            Full team page
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {team.map((p, i) => (
          <div key={i} style={{ border: `1px solid ${lp.lineCard}`, borderRadius: 16, overflow: 'hidden', background: lp.bg, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Square image */}
            <div style={{ flexShrink: 0, width: isMobile ? '100%' : 180, height: isMobile ? 'auto' : 180 }}>
              {isMobile
                ? <div style={{ position: 'relative', width: '100%', paddingBottom: '55%', overflow: 'hidden' }}>
                    {p.photo
                      ? <img src={p.photo} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                      : <Placeholder label={p.name} tone={tones[i] || 'cool'} h={160} radius={0} />
                    }
                  </div>
                : (p.photo
                    ? <img src={p.photo} alt={p.name} style={{ width: 180, height: 180, objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    : <Placeholder label={p.name} tone={tones[i] || 'cool'} h={180} radius={0} />
                  )
              }
            </div>
            {/* Text */}
            <div style={{ padding: isMobile ? '20px 22px 24px' : '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: lp.ink, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: cfg.dot, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{p.role}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: lp.subMuted }}>{p.bio}</div>
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
      <h2 style={{ ...lps.h2, fontSize: 40, marginBottom: 48 }}>Comprehensive rheumatology, all in one place.</h2>

      {/* Infusion therapy — featured full-width */}
      {infusion && (
        <div style={{ background: `linear-gradient(110deg, ${lp.purple}, ${lp.purpleDeep})`, color: '#fff', borderRadius: 22, padding: isMobile ? '32px 20px' : '52px 56px', marginBottom: 24, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'center' }}>
          <div>
            <div style={{ ...lps.eyebrow, color: '#D9CDF3', marginBottom: 16 }}>Featured service</div>
            <h3 style={{ fontFamily: SERIF, fontSize: isMobile ? 28 : 36, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.14, margin: '0 0 20px', color: '#fff' }}>{infusion.t}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.75, opacity: 0.88, margin: '0 0 28px' }}>{infusion.d}</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.76, margin: '0 0 32px' }}>
              Our {cfg.city} office administers biologic and IV infusion medications on-site in a comfortable, supervised clinical environment — no separate infusion center required. Medications are administered by trained clinical staff with physician oversight.
            </p>
            <a href="contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ ...lps.btnWhite, padding: '15px 28px', fontSize: 14.5 }}>
                Ask about infusion therapy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={lp.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </a>
          </div>
          <img src="Images/site-images-3/5-Infusion-Therapy-Benefits.jpg" alt="Infusion therapy suite" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block', borderRadius: 16 }} />
        </div>
      )}

      {/* Other services — grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
        {other.map((s, i) => (
          <div key={i} style={{ background: lp.card, border: `1px solid ${lp.lineCard}`, borderRadius: 16, padding: '32px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: lp.purpleLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12.5 10 18 20 6" stroke={lp.purple} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: lp.ink, marginBottom: 9 }}>{s.t}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.65, color: lp.subMuted }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Location FAQ (on-page parity for the FAQPage JSON-LD) ────
const LocFAQ = ({ cfg }) => {
  const isMobile = useIsMobile();
  if (!cfg.faqs || !cfg.faqs.length) return null;
  return (
    <section id="faq" style={{ padding: isMobile ? '56px 20px' : '96px 56px', background: lp.card, borderTop: `1px solid ${lp.line}`, borderBottom: `1px solid ${lp.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 28 : 72, alignItems: 'start' }}>
        <div>
          <div style={{ ...lps.eyebrow, marginBottom: 16 }}>Common questions</div>
          <h2 style={{ ...lps.h2, fontSize: 40, margin: 0 }}>{cfg.city} rheumatology FAQ.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: lp.sub, marginTop: 22, maxWidth: 400 }}>
            Have a question about care at our {cfg.city} office? Call {cfg.phone} and our team will be glad to help.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${lp.line}` }}>
          {cfg.faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: `1px solid ${lp.line}`, padding: '24px 0' }}>
              <summary style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 500, color: lp.ink, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <span>{f.q}</span>
                <span className="acc-plus" style={{ fontSize: 22, color: cfg.dot, fontWeight: 300 }}>+</span>
              </summary>
              <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.75, color: lp.sub }}>{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────────
const LocCTA = ({ cfg }) => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px' }}>
    <div style={{ background: `linear-gradient(110deg, ${cfg.dot}, ${lp.purpleDeep})`, color: '#fff', borderRadius: 24, padding: isMobile ? '36px 24px' : '64px 64px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 28 : 48, alignItems: 'center' }}>
      <div>
        <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D9CDF3', marginBottom: 18 }}>
          {cfg.city} · {cfg.region}
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 30 : 42, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.14, margin: '0 0 18px', color: '#fff' }}>
          Ready to meet our {cfg.city} team?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.68, opacity: 0.88, margin: 0 }}>
          New and established patients are welcome. Call us or submit a message and we'll follow up within one business day.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...lps.btnWhite, width: '100%', padding: '16px 26px' }}>
            Contact us online
          </button>
        </a>
        <a href={`tel:${cfg.phoneTel}`} style={{ textDecoration: 'none' }}>
          <button style={{ ...lps.btnOutlineLight, width: '100%', padding: '16px 26px', justifyContent: 'center' }}>
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
      {cfg.address2 ? <LocMapsGrid cfg={cfg} /> : <LocMap cfg={cfg} />}
      <LocAbout cfg={cfg} />
      <LocTeam cfg={cfg} />
      <LocServices cfg={cfg} />
      <LocFAQ cfg={cfg} />
      <LocCTA cfg={cfg} />
    </PageShell>
  );
};

window.LocationPage = LocationPage;
