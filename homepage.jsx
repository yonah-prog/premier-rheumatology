// Premier Rheumatology — home page (single direction).
// Structure follows original copy: Hero → Premier Care (team) → How it works → Locations → Appointment.
// Styling follows the shared design system in chrome.jsx (Newsreader display
// type, Hanken Grotesk body, monochrome purple, pill buttons).

const pl = palette;
const ps = chromeStyles;

// ─── Hero: "Move Freely. Live Fully." ───────────────────────
const PHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
    <section style={{ padding: isMobile ? '48px 20px 56px' : '84px 56px 90px', background: pl.card, borderBottom: `1px solid ${pl.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'center', marginBottom: 56 }}>
        <div>
          <h1 style={{ ...ps.h1, fontSize: isMobile ? 46 : isTablet ? 58 : 72, margin: '0 0 24px' }}>
            Move Freely.<br/>
            <em style={{ fontStyle: 'italic', color: pl.purple }}>Live Fully.</em>
          </h1>
          <p style={{ fontSize: isMobile ? 16.5 : 17.5, lineHeight: 1.68, color: pl.sub, maxWidth: 520, margin: '0 0 34px' }}>
            Dedicated to restoring mobility, relieving pain, and empowering every patient to live stronger and healthier. From the first consultation through ongoing care, our specialists combine clinical expertise with a warmth that makes complex conditions feel manageable—so you can get back to the life you love.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ ...ps.btn, padding: '15px 30px' }}>
                Make an Appointment <ArrowRight size={15} />
              </button>
            </a>
            <a href="team.html" style={{ textDecoration: 'none' }}>
              <button style={{ ...ps.btnGhost, padding: '15px 30px' }}>
                Meet our team
              </button>
            </a>
          </div>
        </div>
        {!isMobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, height: 480 }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', height: '100%' }}>
              <img src="Images/site-images-1/yonah0704_15145_older_man_enjoying_his_children_and_grandchil_f2bee724-272c-4956-80db-f039c79f19e7_2.png" alt="Patient enjoying life after care" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', height: '100%', marginTop: 32 }}>
              <img src="Images/site-images-1/yonah0704_15145_Smiling_older_female_with_arthritis_wearing_c_64df078b-4892-4c76-8378-58edb7542b42_2.png" alt="Patient consulting with rheumatologist" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', height: '100%' }}>
              <img src="Images/site-images-1/yonah0704_15145_young_black_nurse_caring_for_elderly_white_ma_958d6e56-9cca-4cda-82b4-2bf75add2b8f_0.png" alt="Care team with patient" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Premier Care — team of professionals (FL + NY sub-sections) ──
const PTeamGrid = ({ people, toneA = 'purple', toneB = 'warm' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(people.length, 3)}, 1fr)`, gap: 24 }}>
    {people.map((p, i) => (
      <div key={i} style={{ ...ps.card }}>
        <Placeholder label={`${p.name} · portrait`} tone={i === 0 ? toneA : toneB} h={380} radius={0} />
        <div style={{ padding: '24px 26px 28px' }}>
          <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: pl.ink, marginBottom: 6 }}>{p.name}</div>
          <div style={{ fontSize: 13, color: pl.purple, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>{p.role}</div>
          <div style={{ fontSize: 14.5, lineHeight: 1.6, color: pl.subMuted }}>{p.bio}</div>
        </div>
      </div>
    ))}
  </div>
);

const TeamCard = ({ p, tone }) => (
  <a href="team.html" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{ ...ps.card, height: '100%' }}>
      {p.photo
        ? <img src={p.photo} alt={p.name} style={{ width: '100%', height: 340, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        : <Placeholder label={`${p.name} · portrait`} tone={tone} h={340} radius={0} />
      }
      <div style={{ padding: '22px 24px 26px' }}>
        <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: pl.ink, marginBottom: 6 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: pl.purple, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{p.role}</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: pl.subMuted }}>{p.bio}</div>
      </div>
    </div>
  </a>
);

const TeamColumnHeader = ({ dot, title, sub }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${pl.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: dot }} />
      <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', color: pl.ink, margin: 0 }}>{title}</h3>
      <span style={{ fontSize: 13, color: pl.mutedLabel }}>· {sub}</span>
    </div>
  </div>
);

const PPremierCare = () => {
  const isMobile = useIsMobile();
  const fl = CARE_TEAM.filter(p => p.loc === 'FL');
  const ny = CARE_TEAM.filter(p => p.loc === 'NY');
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 24 : 72, alignItems: 'start', marginBottom: 56 }}>
        <div>
          <div style={{ ...ps.eyebrow, marginBottom: 16 }}>Premier Care</div>
          <h2 style={{ ...ps.h2, fontSize: isMobile ? 32 : 42 }}>A team of professionals dedicated to your recovery.</h2>
        </div>
        <p style={{ fontSize: 16.5, lineHeight: 1.75, color: pl.sub, maxWidth: 640, marginTop: isMobile ? 0 : 10 }}>
          Our care team brings together experienced clinicians with deep expertise in rheumatology and autoimmune disease management. We focus on delivering compassionate, personalized treatment that supports healing, restores function, and improves quality of life. Your health is our priority, and we are with you every step of the way.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <TeamColumnHeader dot={pl.regionFL} title="Florida Care Team" sub="Boca Raton" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {fl.map((p, i) => <TeamCard key={i} p={p} tone={i === 0 ? 'purple' : 'warm'} />)}
          </div>
        </div>
        <div>
          <TeamColumnHeader dot={pl.regionNY} title="New York Care Team" sub="Queens" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {ny.map((p, i) => <TeamCard key={i} p={p} tone="cool" />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── How it works — 4 steps ─────────────────────────────
const PProcess = () => {
  const isMobile = useIsMobile();
  const steps = [
    { t: 'Appointment', d: 'Schedule your consultation online or by phone at a time that’s convenient for you.' },
    { t: 'Evaluation', d: 'Meet with our specialist for a personalized assessment and diagnosis tailored to your symptoms and medical history.' },
    { t: 'Treatment Plan', d: 'We create a custom care plan that may include medication, infusion therapy, or lifestyle adjustments.' },
    { t: 'Relief and Recovery', d: 'Experience lasting improvement in mobility, comfort, and quality of life with ongoing expert support.' },
  ];
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '100px 56px', background: pl.card, borderTop: `1px solid ${pl.line}`, borderBottom: `1px solid ${pl.line}` }}>
      <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Your path to care</div>
      <h2 style={{ ...ps.h2, fontSize: isMobile ? 32 : 42, marginBottom: 56 }}>How care works here.</h2>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 32 : 36, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 34,
                color: pl.stepNumeral, lineHeight: 1, minWidth: 34, flexShrink: 0,
              }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: pl.ink, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.65, color: pl.subMuted }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...ps.btn, padding: '15px 34px' }}>
            Get Started <ArrowRight size={15} />
          </button>
        </a>
      </div>
    </section>
  );
};

// ─── Services — card grid ─────────────────────────────────
const PServices = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
  <section style={{ padding: isMobile ? '60px 20px' : '100px 56px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 20 : 72, alignItems: 'end', marginBottom: 48 }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Comprehensive Rheumatology Care</div>
        <h2 style={{ ...ps.h2, fontSize: isMobile ? 32 : 42 }}>Personalized treatment for every joint and every journey.</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
        <a href="conditions.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...ps.btnGhost, padding: '13px 24px', fontSize: 14 }}>
            All Services <ArrowRight size={14} />
          </button>
        </a>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 26 }}>
      {SERVICES.map((s, i) => {
        const serviceImages = [
          'Images/site-images-3/joint-pain.png',
          'Images/site-images-3/blood-test.png',
          'Images/site-images-3/womens-infusion.png',
          'Images/site-images-3/aging-2-1.png',
          'Images/site-images-1/pexels-yankrukov-5793798.jpg',
        ];
        const [hovered, setHovered] = React.useState(false);
        return (
          <div key={i}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              ...ps.card,
              borderColor: hovered ? pl.purpleLight : pl.lineCard,
              display: 'flex', flexDirection: 'column',
              transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: hovered ? '0 10px 32px rgba(91,63,160,0.12)' : '0 0 0 rgba(0,0,0,0)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              cursor: 'pointer',
            }}>
            {/* 3:4 aspect ratio image */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '133.33%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={serviceImages[i]} alt={s.t} style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                display: 'block',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }} />
            </div>
            <div style={{ padding: '26px 28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, lineHeight: 1.25, color: pl.ink, marginBottom: 10 }}>{s.t}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: pl.subMuted, marginBottom: 20 }}>{s.d}</div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${pl.line}` }}>
                <a href="conditions.html" style={{ textDecoration: 'none' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: pl.purple, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Learn more <ArrowRight size={13} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
  );
};

// ─── Locations section (FL + NY shown here, with parity) ────
const PLocations = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '60px 20px' : '100px 56px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48, gap: 32, flexWrap: 'wrap' }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Our locations</div>
        <h2 style={{ ...ps.h2, fontSize: isMobile ? 32 : 42 }}>Find the office nearest you.</h2>
      </div>
      <div style={{ fontSize: 15.5, color: pl.sub, maxWidth: 400, textAlign: isMobile ? 'left' : 'right', lineHeight: 1.65 }}>
        Premier Rheumatology serves patients in South Florida and the New York metro area.
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 26 }}>
      {LOCATIONS.map((loc, i) => (
        <div key={loc.id} style={{ ...ps.card, borderRadius: 20 }}>
          <div style={{ height: 240, position: 'relative' }}>
            <iframe
              src={loc.id === 'FL'
                ? 'https://www.google.com/maps?q=2900+N+Military+Trl+Suite+230,+Boca+Raton,+FL+33431&output=embed&z=15'
                : 'https://www.google.com/maps?q=261-12+E+Williston+Ave,+Queens,+NY+11001&output=embed&z=15'}
              width="100%" height="240" style={{ border: 'none', display: 'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title={`${loc.city} office map`}
            />
            <div style={{ position: 'absolute', top: 20, left: 20, background: pl.card, padding: '9px 16px', borderRadius: 999, border: `1px solid ${pl.lineCard}`, display: 'inline-flex', alignItems: 'center', gap: 9, boxShadow: '0 2px 12px rgba(28,22,51,.08)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: i === 0 ? pl.regionFL : pl.regionNY }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: pl.ink }}>{loc.region.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ padding: '32px 32px 36px' }}>
            <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 500, letterSpacing: '-0.015em', color: pl.ink, marginBottom: 6 }}>{loc.city}</div>
            <div style={{ fontSize: 15, color: pl.sub, marginBottom: loc.address2 ? 10 : 22 }}>{loc.address}, {loc.cityline}</div>
            {loc.address2 && (
              <div style={{ fontSize: 15, color: pl.sub, marginBottom: 22, paddingTop: 10, borderTop: `1px solid ${pl.line}` }}>
                {loc.address2}, {loc.cityline2}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '20px 0', borderTop: `1px solid ${pl.line}`, borderBottom: `1px solid ${pl.line}`, marginBottom: 22 }}>
              <div>
                <div style={{ ...ps.eyebrow, fontSize: 11, marginBottom: 6 }}>Phone</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: pl.ink }}>{loc.phone}</div>
              </div>
              <div>
                <div style={{ ...ps.eyebrow, fontSize: 11, marginBottom: 6 }}>Fax</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: pl.ink }}>{loc.fax}</div>
              </div>
              <div>
                <div style={{ ...ps.eyebrow, fontSize: 11, marginBottom: 6 }}>Hours</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: pl.ink }}>{loc.hours}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: pl.mutedLabel, marginBottom: 18 }}>
              {loc.team.join(' · ')}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="contact.html" style={{ flex: 1, textDecoration: 'none', minWidth: 180 }}>
                <button style={{ ...ps.btn, width: '100%', padding: '14px 20px', fontSize: 14 }}>Contact our {loc.region} Office</button>
              </a>
              <a href={loc.id === 'FL' ? 'https://maps.google.com/?q=2900+N+Military+Trl+Suite+230,+Boca+Raton,+FL+33431' : 'https://maps.google.com/?q=261-12+E+Williston+Ave,+Queens,+NY+11001'} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none', minWidth: 140 }}>
                <button style={{ ...ps.btnGhost, width: '100%', padding: '14px 20px', fontSize: 14 }}>Get directions</button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
};

// ─── Contact CTA — location-specific buttons ─────────────────
const PContactCTA = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px 60px' : '80px 56px 100px' }}>
    <div style={{
      background: `linear-gradient(110deg, ${pl.purple}, ${pl.purpleDeep})`,
      color: '#fff', borderRadius: 24,
      padding: isMobile ? '48px 24px' : '84px 64px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ ...ps.eyebrow, color: '#D9CDF3', marginBottom: 20 }}>Get in touch</div>
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 34 : 52, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 22px', color: '#fff' }}>
          Ready to feel better?<br/>
          <em style={{ fontStyle: 'italic', color: '#D9CDF3' }}>Let&apos;s get you on the schedule.</em>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.85, maxWidth: 620, margin: '0 auto 52px' }}>
          Select the office closest to you and our team will follow up to book your consultation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, maxWidth: 880, margin: '0 auto' }}>
          <a href="contact.html" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', background: '#fff', color: pl.ink, border: 'none',
              padding: '30px 28px', borderRadius: 18, cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16, textAlign: 'left',
              fontFamily: SANS,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: pl.regionFL }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', color: pl.purple, textTransform: 'uppercase' }}>Florida Office</span>
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 500, letterSpacing: '-0.01em', color: pl.ink, marginBottom: 8 }}>Contact Florida Offices</div>
                <div style={{ fontSize: 13, color: pl.subMuted, lineHeight: 1.6 }}>Boca Raton · 2900 N Military Trl<br/>Coconut Creek · 4400 W Sample Rd</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: pl.purple, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={19} />
              </div>
            </button>
          </a>
          <a href="contact.html" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', background: '#fff', color: pl.ink, border: 'none',
              padding: '30px 28px', borderRadius: 18, cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16, textAlign: 'left',
              fontFamily: SANS,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: pl.regionNY }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', color: pl.purpleDeep, textTransform: 'uppercase' }}>New York Office</span>
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 500, letterSpacing: '-0.01em', color: pl.ink, marginBottom: 8 }}>Contact Queens</div>
                <div style={{ fontSize: 13, color: pl.subMuted, lineHeight: 1.6 }}>261-12 E Williston Ave · Queens, NY</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: pl.purpleDeep, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={19} />
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

const PremierHome = () => (
  <div style={{ background: pl.bg, color: pl.ink, fontFamily: SANS, minHeight: '100vh' }}>
    <GlobalStyles />
    <SiteHeader active="home" />
    <PHero />
    <PPremierCare />
    <PProcess />
    <PServices />
    <PLocations />
    <PContactCTA />
    <SiteFooter />
  </div>
);

window.PremierHome = PremierHome;
