// Premier Rheumatology — home page (single direction).
// Structure follows original copy: Hero → Premier Care (team) → How it works → Locations → Appointment.

const pl = {
  bg: '#fafafa', card: '#ffffff', line: '#e6e4ea',
  ink: '#12101a', sub: '#5a5664',
  purple: '#5a1f99', purpleDeep: '#2a1247', purpleLight: '#ede5f7', accent: '#7d3fbf',
};

const ps = {
  eyebrow: { fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: pl.purple, fontWeight: 500 },
  h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '-0.035em', fontSize: 56, lineHeight: 1.04, color: pl.ink, margin: 0 },
};

const navLink = { textDecoration: 'none', color: pl.ink, fontSize: 14.5, fontWeight: 500 };

// ─── Header ──────────────────────────────────────────────
const PHeader = () => (
  <div>
    <header style={{ padding: '22px 56px', display: 'grid', gridTemplateColumns: '220px 1fr auto', alignItems: 'center', gap: 40, background: pl.card, borderBottom: `1px solid ${pl.line}` }}>
      <a href="index.html" style={{ textDecoration: 'none' }}><PRLogo size={40} wordColor={pl.ink} /></a>
      <nav style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        <a href="about.html" style={navLink}>About Premier Rheumatology</a>
        <a href="team.html" style={navLink}>Our Team</a>
        <a href="conditions.html" style={navLink}>Conditions We Treat</a>
        <a href="conditions.html" style={navLink}>Services</a>
        <a href="about.html#locations" style={{ ...navLink, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Florida <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span></a>
        <a href="about.html#locations" style={{ ...navLink, display: 'inline-flex', alignItems: 'center', gap: 6 }}>New York <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span></a>
        <a href="tel:+15617303894" style={navLink}>Contact</a>
      </nav>
      <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
        <button style={{ background: pl.ink, color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Schedule an Appointment</button>
      </a>
    </header>
  </div>
);

// ─── Hero: "Move Freely. Live Fully." ───────────────────────
const PHero = () => (
  <section style={{ padding: '72px 56px 96px', background: pl.card, borderBottom: `1px solid ${pl.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 56 }}>
      <div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 120, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.98, margin: '0 0 32px', color: pl.ink }}>
          Move Freely.<br/>
          <span style={{ color: pl.purple }}>Live Fully.</span>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: pl.sub, maxWidth: 520, margin: '0 0 40px' }}>
          Dedicated to restoring mobility, relieving pain, and empowering every patient to live stronger and healthier. From the first consultation through ongoing care, our specialists combine clinical expertise with a warmth that makes complex conditions feel manageable—so you can get back to the life you love.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, height: 440 }}>
        <Placeholder label="Older man · portrait" tone="warm" h="100%" radius={16} />
        <Placeholder label="Older woman · smiling" tone="purple" h="100%" radius={16} style={{ marginTop: 32 }} />
        <Placeholder label="Active senior" tone="cool" h="100%" radius={16} />
      </div>
    </div>
  </section>
);

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
      <Placeholder label={`${p.name} · portrait`} tone={tone} h={340} radius={0} />
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
  const fl = CARE_TEAM.filter(p => p.loc === 'FL');
  const ny = CARE_TEAM.filter(p => p.loc === 'NY');
  return (
    <section style={{ padding: '110px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'start', marginBottom: 56 }}>
        <div>
          <div style={{ ...ps.eyebrow, marginBottom: 16 }}>Premier Care</div>
          <h2 style={ps.h2}>A team of professionals dedicated to your recovery.</h2>
        </div>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: pl.sub, maxWidth: 640, marginTop: 10 }}>
          Our care team brings together experienced clinicians with deep expertise in rheumatology and autoimmune disease management. We focus on delivering compassionate, personalized treatment that supports healing, restores function, and improves quality of life. Your health is our priority, and we are with you every step of the way.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <TeamColumnHeader dot={pl.purple} title="Florida Care Team" sub="Boca Raton" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {fl.map((p, i) => <TeamCard key={i} p={p} tone={i === 0 ? 'purple' : 'warm'} />)}
          </div>
        </div>
        <div>
          <TeamColumnHeader dot="#2e6b52" title="New York Care Team" sub="Queens" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {ny.map((p, i) => <TeamCard key={i} p={p} tone="cool" />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── How it works — 4 steps ─────────────────────────────
const PProcess = () => {
  const steps = [
    { t: 'Appointment', d: 'Schedule your consultation online or by phone at a time that\u2019s convenient for you.' },
    { t: 'Evaluation', d: 'Meet with our specialist for a personalized assessment and diagnosis tailored to your symptoms and medical history.' },
    { t: 'Treatment Plan', d: 'We create a custom care plan that may include medication, infusion therapy, or lifestyle adjustments.' },
    { t: 'Relief and Recovery', d: 'Experience lasting improvement in mobility, comfort, and quality of life with ongoing expert support.' },
  ];
  return (
    <section style={{ padding: '110px 56px', background: pl.card, borderTop: `1px solid ${pl.line}`, borderBottom: `1px solid ${pl.line}` }}>
      <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Your path to care</div>
      <h2 style={{ ...ps.h2, marginBottom: 56 }}>How care works here.</h2>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 36, left: 40, right: 40, height: 1, background: pl.line }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
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
const PServices = () => (
  <section style={{ padding: '110px 56px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'end', marginBottom: 48 }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Comprehensive Rheumatology Care</div>
        <h2 style={ps.h2}>Personalized treatment for every joint and every journey.</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a href="conditions.html" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'transparent', color: pl.ink, border: `1px solid ${pl.line}`, padding: '14px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            All Services <ArrowRight size={14} />
          </button>
        </a>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {SERVICES.map((s, i) => {
        const tones = ['purple', 'warm', 'cool', 'mint', 'purple'];
        const labels = [
          'Joint care · placeholder',
          'Autoimmune · placeholder',
          'Infusion suite · placeholder',
          'Bone health · placeholder',
          'Sports medicine · placeholder',
        ];
        return (
          <div key={i} style={{
            background: pl.card, border: `1px solid ${pl.line}`, borderRadius: 18,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{ position: 'relative' }}>
              <Placeholder label={labels[i]} tone={tones[i]} h={200} radius={0} />
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

// ─── Locations section (FL + NY shown here, with parity) ────
const PLocations = () => (
  <section style={{ padding: '110px 56px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
      <div>
        <div style={{ ...ps.eyebrow, marginBottom: 14 }}>Our locations</div>
        <h2 style={ps.h2}>Find the office nearest you.</h2>
      </div>
      <div style={{ fontSize: 15, color: pl.sub, maxWidth: 400, textAlign: 'right', lineHeight: 1.55 }}>
        Premier Rheumatology serves patients in South Florida and the New York metro area.
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {LOCATIONS.map((loc, i) => (
        <div key={loc.id} style={{ border: `1px solid ${pl.line}`, borderRadius: 20, overflow: 'hidden', background: pl.card }}>
          <div style={{ height: 240, position: 'relative' }}>
            <MapMini state={loc.id} tone={i === 0 ? pl.purpleLight : '#e6ede9'} ink={i === 0 ? pl.purple : '#2e6b52'} />
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
              <a href={`tel:${loc.id === 'FL' ? '+15617303894' : '+17183478888'}`} style={{ flex: 1, textDecoration: 'none' }}>
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

// ─── Contact CTA — location-specific buttons ─────────────────
const PContactCTA = () => (
  <section style={{ padding: '120px 56px', background: pl.ink, color: '#fff' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ ...ps.eyebrow, color: pl.accent, marginBottom: 20 }}>Get in touch</div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 72, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '0 0 24px' }}>
        Ready to feel better?<br/>
        <span style={{ color: pl.accent }}>Let's get you on the schedule.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.8, maxWidth: 620, margin: '0 auto 56px' }}>
        Select the office closest to you and our team will follow up to book your consultation.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 880, margin: '0 auto' }}>
        <a href="contact-florida.html" style={{ textDecoration: 'none' }}>
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
        <a href="contact-new-york.html" style={{ textDecoration: 'none' }}>
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

const PFooter = () => (
  <footer style={{ background: pl.purpleDeep, color: '#fff', padding: '56px 56px 28px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, paddingBottom: 40, borderBottom: '1px solid #ffffff20' }}>
      <div>
        <PRLogo size={36} wordColor="#fff" />
        <p style={{ marginTop: 20, opacity: 0.72, maxWidth: 360, fontSize: 15, lineHeight: 1.55 }}>
          Specialized rheumatology and autoimmune care. Call today to schedule your consultation.
        </p>
      </div>
      <div>
        <div style={{ ...ps.eyebrow, color: pl.accent, marginBottom: 12 }}>Florida</div>
        <div style={{ opacity: 0.78, lineHeight: 1.7, fontSize: 14 }}>2900 N Military Trl<br/>Boca Raton, FL 33431<br/><a href="tel:+15617303894" style={{ color: 'inherit', textDecoration: 'none' }}>(561) 730-3894</a></div>
      </div>
      <div>
        <div style={{ ...ps.eyebrow, color: pl.accent, marginBottom: 12 }}>New York</div>
        <div style={{ opacity: 0.78, lineHeight: 1.7, fontSize: 14 }}>261-12 E Williston Ave<br/>Queens, NY 11001<br/><a href="tel:+17183478888" style={{ color: 'inherit', textDecoration: 'none' }}>(718) 347-8888</a></div>
      </div>
      <div>
        <div style={{ ...ps.eyebrow, color: pl.accent, marginBottom: 12 }}>Navigate</div>
        <div style={{ opacity: 0.78, lineHeight: 2, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <a href="about.html" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
          <a href="team.html" style={{ color: 'inherit', textDecoration: 'none' }}>Our Team</a>
          <a href="conditions.html" style={{ color: 'inherit', textDecoration: 'none' }}>Conditions We Treat</a>
          <a href="tel:+15617303894" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    </div>
    <div style={{ paddingTop: 20, opacity: 0.5, fontSize: 12 }}>© 2026 Premier Rheumatology PLLC</div>
  </footer>
);

const PremierHome = () => (
  <div style={{ background: pl.bg, color: pl.ink, fontFamily: 'Manrope, sans-serif', minHeight: '100vh' }}>
    <PHeader />
    <PHero />
    <PPremierCare />
    <PProcess />
    <PServices />
    <PLocations />
    <PContactCTA />
    <PFooter />
  </div>
);

window.PremierHome = PremierHome;
