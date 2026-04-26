// Premier Rheumatology — home page (single direction).
// Structure follows original copy: Hero → Premier Care (team) → How it works → Locations → Appointment.

const pl = {
  bg: '#fafafa', card: '#ffffff', line: '#e6e4ea',
  ink: '#12101a', sub: '#5a5664',
  purple: '#5a1f99', purpleDeep: '#2a1247', purpleLight: '#ede5f7', accent: '#7d3fbf',
};

const ps = {
  eyebrow: { fontFamily: 'Manrope, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: pl.purple, fontWeight: 300 },
  h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '-0.035em', fontSize: 56, lineHeight: 1.04, color: pl.ink, margin: 0 },
};

// ─── Hero: "Move Freely. Live Fully." ───────────────────────
const PHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
    <section style={{ padding: isMobile ? '40px 20px 56px' : '72px 56px 96px', background: pl.card, borderBottom: `1px solid ${pl.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'center', marginBottom: 56 }}>
        <div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: isMobile ? 52 : isTablet ? 80 : 120, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.98, margin: '0 0 32px', color: pl.ink }}>
            Move Freely.<br/>
            <span style={{ color: pl.purple }}>Live Fully.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.55, color: pl.sub, maxWidth: 520, margin: '0 0 40px' }}>
            Dedicated to restoring mobility, relieving pain, and empowering every patient to live stronger and healthier. From the first consultation through ongoing care, our specialists combine clinical expertise with a warmth that makes complex conditions feel manageable—so you can get back to the life you love.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ background: pl.ink, color: '#fff', border: 'none', padding: '18px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                Make an Appointment <ArrowRight size={16} />
              </button>
            </a>
            <a href="team.html" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'transparent', color: pl.ink, border: `1px solid ${pl.line}`, padding: '18px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                Meet our team
              </button>
            </a>
          </div>
        </div>
        {!isMobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, height: 440 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: '100%' }}>
              <img src="Images/site-images-1/yonah0704_15145_older_man_enjoying_his_children_and_grandchil_f2bee724-272c-4956-80db-f039c79f19e7_2.png" alt="Patient enjoying life after care" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: '100%', marginTop: 32 }}>
              <img src="Images/site-images-1/yonah0704_15145_Smiling_older_female_with_arthritis_wearing_c_64df078b-4892-4c76-8378-58edb7542b42_2.png" alt="Patient consulting with rheumatologist" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: '100%' }}>
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
      <div key={i} style={{ border: `1px solid ${pl.line}`, borderRadius: 18, overflow: 'hidden', background: pl.card }}>
        <Placeholder label={`${p.name} · portrait`} tone={i === 0 ? toneA : toneB} h={380} radius={0} />
        <div style={{ padding: '24px 26px 28px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{p.name}</div>
          <div style={{ fontSize: 13.5, color: pl.purple, fontWeight: 600, marginBottom: 12 }}>{p.role}</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: pl.sub }}>{p.bio}</div>
        </div>
      </div>
    ))}
  </div>
);

const TeamCard = ({ p, tone }) => (
  <a href="team.html" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{ border: `1px solid ${pl.line}`, borderRadius: 18, overflow: 'hidden', background: pl.card }}>
      {p.photo
        ? <img src={p.photo} alt={p.name} style={{ width: '100%', height: 340, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        : <Placeholder label={`${p.name} · portrait`} tone={tone} h={340} radius={0} />
      }
      <div style={{ padding: '22px 24px 24px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{p.name}</div>
        <div style={{ fontSize: 13, color: pl.purple, fontWeight: 600, marginBottom: 12 }}>{p.role}</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: pl.sub }}>{p.bio}</div>
      </div>
    </div>
  </a>
);

const TeamColumnHeader = ({ dot, title, sub }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${pl.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot }} />
      <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{title}</h3>
      <span style={{ fontSize: 13, color: pl.sub }}>· {sub}</span>
    </div>
  </div>
);

const PPremierCare = () => {
  const isMobile = useIsMobile();
  const fl = CARE_TEAM.filter(p => p.loc === 'FL');
  const ny = CARE_TEAM.filter(p => p.loc === 'NY');
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '110px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 24 : 72, alignItems: 'start', marginBottom: 56 }}>
        <div>
          <div style={{ ...ps.eyebrow, marginBottom: 16 }}>Premier Care</div>
          <h2 style={ps.h2}>A team of professionals dedicated to your recovery.</h2>
        </div>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: pl.sub, maxWidth: 640, marginTop: isMobile ? 0 : 10 }}>
          Our care team brings together experienced clinicians with deep expertise in rheumatology and autoimmune disease management. We focus on delivering compassionate, personalized treatment that supports healing, restores function, and improves quality of life. Your health is our priority, and we are with you every step of the way.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <TeamColumnHeader dot={pl.purple} title="Florida Care Team" sub="Boca Raton" />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {fl.map((p, i) => <TeamCard key={i} p={p} tone={i === 0 ? 'purple' : 'warm'} />)}
          </div>
        </div>
        <div>
          <TeamColumnHeader dot="#2e6b52" title="New York Care Team" sub="Queens" />
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
    { t: 'Appointment', d: 'Schedule your consultation online or by phone at a time that\u2019s convenient for you.' },
    { t: 'Evaluation', d: 'Meet with our specialist for a personalized assessment and diagnosis tailored to your symptoms and medical history.' },
    { t: 'Treatment Plan', d: 'We create a custom care plan that may include medication, infusion therapy, or lifestyle adjustments.' },
    { t: 'Relief and Recovery', d: 'Experience lasting improvement in mobility, comfort, and quality of life with ongoing expert support.' },
  ];
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '110px 56px', background: pl.card, borderTop: `1px solid ${pl.line}`, borderBottom: `1px solid ${pl.line}` }}>
      <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Your path to care</div>
      <h2 style={{ ...ps.h2, fontSize: isMobile ? 32 : 56, marginBottom: 56 }}>How care works here.</h2>
      <div style={{ position: 'relative' }}>
        {!isMobile && <div style={{ position: 'absolute', top: 36, left: 40, right: 40, height: 1, background: pl.line }} />}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i}>
              <div style={{
                width: 72, height: 72, borderRadius: 16, background: i === 0 ? pl.ink : pl.card,
                color: i === 0 ? '#fff' : pl.ink, border: `1px solid ${i === 0 ? pl.ink : pl.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24,
              }}>{i + 1}</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>{s.t}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: pl.sub }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ background: pl.ink, color: '#fff', border: 'none', padding: '18px 34px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            Get Started <ArrowRight size={16} />
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
  <section style={{ padding: isMobile ? '56px 20px' : '110px 56px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 20 : 72, alignItems: 'end', marginBottom: 48 }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Comprehensive Rheumatology Care</div>
        <h2 style={ps.h2}>Personalized treatment for every joint and every journey.</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
        <a href="conditions.html" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', color: pl.ink, border: `1px solid ${pl.line}`, padding: '14px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            All Services <ArrowRight size={14} />
          </button>
        </a>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 20 }}>
      {SERVICES.map((s, i) => {
        const serviceImages = [
          'Images/site-images-3/joint-pain.png',
          'Images/site-images-3/blood-test.png',
          'Images/site-images-3/womens-infusion.png',
          'Images/site-images-3/aging-2-1.png',
          'Images/site-images-1/pexels-yankrukov-5793798.jpg',
        ];
        return (
          <div key={i} style={{
            background: pl.card, border: `1px solid ${pl.line}`, borderRadius: 18,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
              <img src={serviceImages[i]} alt={s.t} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '26px 28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{s.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: pl.sub, marginBottom: 20 }}>{s.d}</div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${pl.line}` }}>
                <a href="conditions.html" style={{ textDecoration: 'none', color: pl.ink }}>
                  <span style={{ fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Learn more <ArrowRight size={14} />
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
  <section style={{ padding: isMobile ? '56px 20px' : '110px 56px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Our locations</div>
        <h2 style={ps.h2}>Find the office nearest you.</h2>
      </div>
      <div style={{ fontSize: 15, color: pl.sub, maxWidth: 400, textAlign: 'right', lineHeight: 1.55 }}>
        Premier Rheumatology serves patients in South Florida and the New York metro area.
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
      {LOCATIONS.map((loc, i) => (
        <div key={loc.id} style={{ border: `1px solid ${pl.line}`, borderRadius: 20, overflow: 'hidden', background: pl.card }}>
          <div style={{ height: 240, position: 'relative' }}>
            <iframe
              src={loc.id === 'FL'
                ? 'https://www.google.com/maps?q=2900+N+Military+Trl,+Boca+Raton,+FL+33431&output=embed&z=15'
                : 'https://www.google.com/maps?q=261-12+E+Williston+Ave,+Queens,+NY+11001&output=embed&z=15'}
              width="100%" height="240" style={{ border: 'none', display: 'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title={`${loc.city} office map`}
            />
            <div style={{ position: 'absolute', top: 20, left: 20, background: pl.card, padding: '10px 16px', borderRadius: 10, border: `1px solid ${pl.line}`, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? pl.purple : '#2e6b52' }} />
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>{loc.region.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ padding: '32px 32px 36px' }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 4 }}>{loc.city}</div>
            <div style={{ fontSize: 15, color: pl.sub, marginBottom: 22 }}>{loc.address}, {loc.cityline}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '20px 0', borderTop: `1px solid ${pl.line}`, borderBottom: `1px solid ${pl.line}`, marginBottom: 22 }}>
              <div>
                <div style={{ ...ps.eyebrow, marginBottom: 6 }}>Phone</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{loc.phone}</div>
              </div>
              <div>
                <div style={{ ...ps.eyebrow, marginBottom: 6 }}>Fax</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{loc.fax}</div>
              </div>
              <div>
                <div style={{ ...ps.eyebrow, marginBottom: 6 }}>Hours</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{loc.hours}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: pl.sub, marginBottom: 16 }}>
              {loc.team.join(' · ')}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="contact.html" style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ width: '100%', background: pl.ink, color: '#fff', border: 'none', padding: '15px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Contact our {loc.region} Office</button>
              </a>
              <a href={loc.id === 'FL' ? 'https://maps.google.com/?q=2900+N+Military+Trl,+Boca+Raton,+FL+33431' : 'https://maps.google.com/?q=261-12+E+Williston+Ave,+Queens,+NY+11001'} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                <button style={{ width: '100%', background: 'transparent', color: pl.ink, border: `1px solid ${pl.line}`, padding: '15px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get directions</button>
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
  <section style={{ padding: isMobile ? '56px 20px' : '120px 56px', background: pl.ink, color: '#fff' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ ...ps.eyebrow, color: pl.accent, marginBottom: 20 }}>Get in touch</div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: isMobile ? 40 : 72, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '0 0 24px' }}>
        Ready to feel better?<br/>
        <span style={{ color: pl.accent }}>Let&apos;s get you on the schedule.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.8, maxWidth: 620, margin: '0 auto 56px' }}>
        Select the office closest to you and our team will follow up to book your consultation.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, maxWidth: 880, margin: '0 auto' }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%', background: pl.card, color: pl.ink, border: 'none',
            padding: '32px 28px', borderRadius: 18, cursor: 'pointer',
            display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16, textAlign: 'left',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: pl.purple }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: pl.purple, textTransform: 'uppercase' }}>Florida Office</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Contact Boca Raton</div>
              <div style={{ fontSize: 14, color: pl.sub }}>2900 N Military Trl · (561) 730-3894</div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: pl.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={20} />
            </div>
          </button>
        </a>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%', background: pl.card, color: pl.ink, border: 'none',
            padding: '32px 28px', borderRadius: 18, cursor: 'pointer',
            display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16, textAlign: 'left',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2e6b52' }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#2e6b52', textTransform: 'uppercase' }}>New York Office</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Contact Queens</div>
              <div style={{ fontSize: 14, color: pl.sub }}>261-12 E Williston Ave · Queens, NY</div>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: pl.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={20} />
            </div>
          </button>
        </a>
      </div>
    </div>
  </section>
  );
};

const PremierHome = () => (
  <div style={{ background: pl.bg, color: pl.ink, fontFamily: 'Manrope, sans-serif', minHeight: '100vh' }}>
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
