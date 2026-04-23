// Our Team — Florida & New York clinicians in side-by-side columns.

const tp = palette;
const tps = chromeStyles;

const TEAM_FL = [
  {
    name: 'Dr. Mouriel Boucher, DO',
    role: 'Rheumatologist',
    bio: 'Dr. Mouriel Boucher is a board-certified rheumatologist with advanced training in the diagnosis and management of autoimmune and inflammatory conditions. She completed her rheumatology fellowship at HCA Florida Healthcare and her internal medicine residency at Palmetto General Hospital. Dr. Boucher provides evidence-based, patient-centered care for conditions including rheumatoid arthritis, lupus, osteoporosis, and complex joint disorders.',
    tone: 'purple',
  },
  {
    name: 'Natalie Akerman, NP',
    role: 'Family Nurse Practitioner · Rheumatology Specialist',
    bio: "Natalie Akerman, NP is an experienced Family Nurse Practitioner specializing in rheumatology and chronic disease management. With over a decade of clinical experience across acute care, emergency medicine, pediatrics, and telehealth, she brings a comprehensive, collaborative approach to treating autoimmune and musculoskeletal conditions, with a strong focus on continuity of care and patient education.",
    tone: 'warm',
  },
];

const TEAM_NY = [
  {
    name: 'Dr. Bruce Stein, MD',
    role: 'Rheumatologist',
    bio: 'After completing a residency in internal medicine in Columbus, Ohio, Dr. Stein completed a fellowship in rheumatology at Long Island Jewish Medical Center. Dr. Stein worked in a large group practicing rheumatology before opening Floral Park Arthritis, P.C., where he has been practicing for over 10 years. He takes special interest in the diagnosis and management of Rheumatoid Arthritis, Lupus, Gout, Fibromyalgia, Osteoarthritis, Myositis, and Osteoporosis, with additional expertise in treating Tendonitis, Bursitis, and Sports Injuries.',
    tone: 'cool',
  },
];

// ─── Hero ────────────────────────────────────────────────
const THero = () => (
  <section style={{ padding: '80px 56px 72px', background: tp.card, borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ ...tps.eyebrow, marginBottom: 20 }}>Our Team</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'end' }}>
      <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 84, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.03, margin: 0, color: tp.ink }}>
        Rheumatology care that <span style={{ color: tp.purple }}>South Florida and New York</span> trust.
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.6, color: tp.sub, margin: 0, maxWidth: 520 }}>
        Our team brings together experienced physicians, nurse practitioners, and clinical staff dedicated to the diagnosis and long-term management of autoimmune, inflammatory, and musculoskeletal conditions. We focus on evidence-based care, thoughtful evaluation, and personalized treatment plans designed to support patients over time.
      </p>
    </div>
  </section>
);

// ─── Provider card ───────────────────────────────────────
const ProviderCard = ({ p }) => (
  <article style={{ border: `1px solid ${tp.line}`, borderRadius: 20, overflow: 'hidden', background: tp.card, display: 'flex', flexDirection: 'column' }}>
    <Placeholder label={`${p.name} · portrait`} tone={p.tone} h={360} radius={0} />
    <div style={{ padding: '28px 30px 32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>{p.name}</div>
      <div style={{ fontSize: 13.5, color: tp.purple, fontWeight: 600, marginBottom: 18 }}>{p.role}</div>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: tp.sub, flex: 1 }}>{p.bio}</div>
    </div>
  </article>
);

// ─── Column header ───────────────────────────────────────
const ColumnHeader = ({ dot, title, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${tp.line}` }}>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: dot }} />
    <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
    <span style={{ fontSize: 14, color: tp.sub }}>· {sub}</span>
  </div>
);

// ─── Team columns (FL + NY side-by-side) ─────────────────
const TTeams = () => (
  <section style={{ padding: '96px 56px', borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
      <div>
        <ColumnHeader dot={tp.purple} title="Florida Care Team" sub="Boca Raton, FL" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {TEAM_FL.map((p, i) => <ProviderCard key={i} p={p} />)}
        </div>
      </div>
      <div>
        <ColumnHeader dot="#2e6b52" title="New York Care Team" sub="Queens, NY" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {TEAM_NY.map((p, i) => <ProviderCard key={i} p={p} />)}
        </div>
      </div>
    </div>
  </section>
);

// ─── Philosophy ──────────────────────────────────────────
const TPhilosophy = () => (
  <section style={{ padding: '96px 56px', borderBottom: `1px solid ${tp.line}` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
      <div>
        <div style={{ ...tps.eyebrow, marginBottom: 14 }}>Clinical philosophy</div>
        <h2 style={{ ...tps.h2, fontSize: 44, margin: 0 }}>Our clinical care philosophy.</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 17, lineHeight: 1.7, color: tp.sub }}>
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

// ─── Conditions commonly managed ─────────────────────────
const TConditions = () => {
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
    <section style={{ padding: '96px 56px', background: tp.card }}>
      <div style={{ ...tps.eyebrow, marginBottom: 14 }}>Conditions we commonly manage</div>
      <h2 style={{ ...tps.h2, fontSize: 44, marginBottom: 40 }}>Expertise across the rheumatologic spectrum.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: `1px solid ${tp.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{
            padding: '26px 28px',
            borderRight: i % 2 === 0 ? `1px solid ${tp.line}` : 'none',
            borderBottom: i < items.length - 2 ? `1px solid ${tp.line}` : 'none',
            display: 'flex', alignItems: 'center', gap: 16,
            fontSize: 16.5, color: tp.ink,
          }}>
            <CheckIcon size={18} color={tp.purple} />
            <span>{it}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
        <a href="conditions.html" style={{ textDecoration: 'none' }}>
          <button style={{ background: tp.ink, color: '#fff', border: 'none', padding: '16px 26px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            View all conditions we treat <ArrowRight size={14} />
          </button>
        </a>
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────
const TCTA = () => (
  <section style={{ padding: '80px 56px' }}>
    <div style={{ background: tp.purpleDeep, color: '#fff', borderRadius: 24, padding: '60px 56px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'center' }}>
      <div>
        <div style={{ ...tps.eyebrow, color: '#d9c3ea', marginBottom: 16 }}>Ready to meet with our team?</div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>
          Schedule a consultation at the office closest to you.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: '#fff', color: tp.ink, border: 'none', padding: '18px 26px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Contact our Florida Office</button>
        </a>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid #ffffff40', padding: '18px 26px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Contact our New York Office</button>
        </a>
      </div>
    </div>
  </section>
);

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
