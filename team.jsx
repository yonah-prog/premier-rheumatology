// Our Team — Florida & New York clinicians in side-by-side columns.

const tp = palette;
const tps = chromeStyles;

const TEAM_FL = [
  {
    name: 'Dr. Mouriel Boucher, DO',
    role: 'Rheumatologist',
    bio: 'Dr. Mouriel Boucher is a board-certified rheumatologist with advanced training in the diagnosis and management of autoimmune and inflammatory conditions. She completed her rheumatology fellowship at HCA Florida Healthcare and her internal medicine residency at Palmetto General Hospital. Dr. Boucher provides evidence-based, patient-centered care for conditions including rheumatoid arthritis, lupus, osteoporosis, and complex joint disorders.',
    tone: 'purple',
    photo: 'Images/mouriel-headshot.png',
  },
  {
    name: 'Natalie Akerman, NP',
    role: 'Family Nurse Practitioner · Rheumatology Specialist',
    bio: "Natalie Akerman, NP is an experienced Family Nurse Practitioner specializing in rheumatology and chronic disease management. With over a decade of clinical experience across acute care, emergency medicine, pediatrics, and telehealth, she brings a comprehensive, collaborative approach to treating autoimmune and musculoskeletal conditions, with a strong focus on continuity of care and patient education.",
    tone: 'warm',
    photo: 'natalie-1.png',
  },
];

const TEAM_NY = [
  {
    name: 'Dr. Bruce Stein, MD',
    role: 'Rheumatologist',
    bio: 'After completing a residency in internal medicine in Columbus, Ohio, Dr. Stein completed a fellowship in rheumatology at Long Island Jewish Medical Center. Dr. Stein worked in a large group practicing rheumatology before opening Floral Park Arthritis, P.C., where he has been practicing for over 10 years. He takes special interest in the diagnosis and management of Rheumatoid Arthritis, Lupus, Gout, Fibromyalgia, Osteoarthritis, Myositis, and Osteoporosis, with additional expertise in treating Tendonitis, Bursitis, and Sports Injuries.',
    tone: 'cool',
    photo: 'Images/bruce-stein.png',
  },
];

// ─── Hero ────────────────────────────────────────────────
const THero = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px 72px', background: tp.card, borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ ...tps.eyebrow, marginBottom: 20 }}>Our Team</div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 24 : 72, alignItems: 'end' }}>
      <h1 style={{ ...tps.h1, fontSize: isMobile ? 40 : 58 }}>
        Rheumatology care that <em style={{ fontStyle: 'italic', color: tp.purple }}>South Florida and New York</em> trust.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: tp.sub, margin: 0, maxWidth: 520 }}>
        Our team brings together experienced physicians, nurse practitioners, and clinical staff dedicated to the diagnosis and long-term management of autoimmune, inflammatory, and musculoskeletal conditions. We focus on evidence-based care, thoughtful evaluation, and personalized treatment plans designed to support patients over time.
      </p>
    </div>
  </section>
  );
};

// ─── Provider card ───────────────────────────────────────
const ProviderCard = ({ p }) => {
  const isMobile = useIsMobile();
  return (
    <article style={{ ...tps.card, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Square image */}
      <div style={{ flexShrink: 0, width: isMobile ? '100%' : 180, height: isMobile ? 'auto' : 180 }}>
        {isMobile
          ? <div style={{ position: 'relative', width: '100%', paddingBottom: '60%', overflow: 'hidden' }}>
              {p.photo
                ? <img src={p.photo} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                : <Placeholder label={p.name} tone={p.tone} h={160} radius={0} />
              }
            </div>
          : (p.photo
              ? <img src={p.photo} alt={p.name} style={{ width: 180, height: 180, objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              : <Placeholder label={p.name} tone={p.tone} h={180} radius={0} />
            )
        }
      </div>
      {/* Text */}
      <div style={{ padding: isMobile ? '20px 22px 24px' : '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: tp.ink, marginBottom: 6 }}>{p.name}</div>
        <div style={{ fontSize: 11.5, color: tp.purple, fontWeight: 700, marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.role}</div>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: tp.subMuted }}>{p.bio}</div>
      </div>
    </article>
  );
};

// ─── Column header ───────────────────────────────────────
const ColumnHeader = ({ dot, title, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${tp.line}` }}>
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot }} />
    <h2 style={{ fontFamily: SERIF, fontSize: 29, fontWeight: 500, letterSpacing: '-0.015em', color: tp.ink, margin: 0 }}>{title}</h2>
    <span style={{ fontSize: 14, color: tp.mutedLabel }}>· {sub}</span>
  </div>
);

// ─── Team columns (FL + NY side-by-side) ─────────────────
const TTeams = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 56, alignItems: 'start' }}>
      <div>
        <ColumnHeader dot={tp.regionFL} title="Florida Care Team" sub="Boca Raton, FL" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {TEAM_FL.map((p, i) => <ProviderCard key={i} p={p} />)}
        </div>
      </div>
      <div>
        <ColumnHeader dot={tp.regionNY} title="New York Care Team" sub="Queens, NY" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {TEAM_NY.map((p, i) => <ProviderCard key={i} p={p} />)}
        </div>
      </div>
    </div>
  </section>
  );
};

// ─── Philosophy ──────────────────────────────────────────
const TPhilosophy = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? 28 : 72, alignItems: 'start' }}>
      <div>
        <div style={{ ...tps.eyebrow, marginBottom: 14 }}>Clinical philosophy</div>
        <h2 style={{ ...tps.h2, fontSize: 40, margin: 0 }}>Our clinical care philosophy.</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 16.5, lineHeight: 1.78, color: tp.sub }}>
        <p style={{ margin: 0 }}>
          Rheumatologic conditions are often complex and evolving. Our team takes a comprehensive approach that emphasizes accurate diagnosis, ongoing monitoring, and individualized treatment strategies.
        </p>
        <p style={{ margin: 0 }}>
          We believe effective care requires time, communication, and continuity — especially for chronic and systemic conditions. Both our Boca Raton and Queens practices are built around this principle.
        </p>
      </div>
    </div>
  </section>
  );
};

// ─── Conditions commonly managed ─────────────────────────
const TConditions = () => {
  const isMobile = useIsMobile();
  const items = [
    'Inflammatory and autoimmune arthritis',
    'Lupus and connective tissue diseases',
    'Osteoporosis and metabolic bone disorders',
    'Gout and crystal-induced arthritis',
    'Chronic joint, muscle, and spine-related pain',
    'Rheumatoid arthritis and psoriatic arthritis',
    'Fibromyalgia and myositis',
    'Tendonitis, bursitis, and sports injuries',
  ];
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '96px 56px', background: tp.card }}>
      <div style={{ ...tps.eyebrow, marginBottom: 14 }}>Conditions we commonly manage</div>
      <h2 style={{ ...tps.h2, fontSize: 40, marginBottom: 40 }}>Expertise across the rheumatologic spectrum.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 0, border: `1px solid ${tp.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{
            padding: '26px 28px',
            borderRight: !isMobile && i % 2 === 0 ? `1px solid ${tp.line}` : 'none',
            borderBottom: isMobile ? (i < items.length - 1 ? `1px solid ${tp.line}` : 'none') : (i < items.length - 2 ? `1px solid ${tp.line}` : 'none'),
            display: 'flex', alignItems: 'center', gap: 16,
            fontSize: 16, color: tp.subAlt,
          }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: tp.purpleLight, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckIcon size={14} color={tp.purple} />
            </span>
            <span>{it}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
        <a href="conditions.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...tps.btn, padding: '15px 30px' }}>
            View all conditions we treat <ArrowRight size={14} />
          </button>
        </a>
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────
const TCTA = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px' }}>
    <div style={{ background: `linear-gradient(110deg, ${tp.purple}, ${tp.purpleDeep})`, color: '#fff', borderRadius: 24, padding: isMobile ? '36px 24px' : '60px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 28 : 40, alignItems: 'center' }}>
      <div>
        <div style={{ ...tps.eyebrow, color: '#D9CDF3', marginBottom: 16 }}>Ready to meet with our team?</div>
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 30 : 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.14, margin: 0, color: '#fff' }}>
          Schedule a consultation at the office closest to you.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...tps.btnWhite, width: '100%', padding: '16px 26px' }}>Contact our Florida Office</button>
        </a>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...tps.btnOutlineLight, width: '100%', padding: '16px 26px', justifyContent: 'center' }}>Contact our New York Office</button>
        </a>
      </div>
    </div>
  </section>
  );
};

const TeamPage = () => (
  <PageShell active="team">
    <THero />
    <TTeams />
    <TPhilosophy />
    <TConditions />
    <TCTA />
  </PageShell>
);

window.TeamPage = TeamPage;
