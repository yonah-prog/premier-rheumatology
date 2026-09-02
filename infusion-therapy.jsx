// Infusion-therapy service page (WO-016).
//
// Why this page exists: the practice administers biologic and IV infusions
// in-office, and that is repeated all over the site's body copy, but there was
// no page to rank or be cited for it — the service term was being lost to
// wellness-IV and standalone infusion centers. This is also the destination for
// the 12 condition-page links that used to point at the legacy WordPress slug
// infusion-therapy.html.
//
// Copy discipline: named agents are framed as examples of what rheumatology
// infusion regimens can involve, never as a promise that a given drug is
// stocked or appropriate. Anything patient-specific defers to the office.

const ip = palette;
const ips = chromeStyles;

const FL_PHONE = '(561) 730-3894';
const FL_PHONE_TEL = '+15617303894';
const NY_PHONE = '(718) 347-8888';

// ─── Hero + the directly-quotable local answer ───────────
const IHero = () => {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '56px 20px 48px' : '80px 56px 72px', background: ip.card, borderBottom: `1px solid ${ip.line}` }}>
      <div style={{ ...ips.eyebrow, marginBottom: 20 }}>Infusion therapy</div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 1fr', gap: isMobile ? 32 : 72, alignItems: 'end' }}>
        <h1 style={{ ...ips.h1, fontSize: isMobile ? 38 : 58 }}>
          Biologic &amp; IV <em style={{ fontStyle: 'italic', color: ip.purple }}>infusion therapy</em> in Boca Raton.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: ip.sub, margin: 0, maxWidth: 520 }}>
          Premier Rheumatology administers biologic and IV infusion medications on-site, in the same office as your
          rheumatologist — so patients being treated for autoimmune and inflammatory disease do not need a separate
          referral to an outside infusion center.
        </p>
      </div>

      <div style={{ marginTop: isMobile ? 36 : 56, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        <a href={`tel:${FL_PHONE_TEL}`} style={{ textDecoration: 'none' }}>
          <button style={ips.btn}>
            Call {FL_PHONE}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </a>
        <a href="/contact.html" style={{ textDecoration: 'none' }}>
          <button style={ips.btnGhost}>Request an appointment</button>
        </a>
      </div>
    </section>
  );
};

// ─── Section wrapper ─────────────────────────────────────
const ISection = ({ id, eyebrow, h2, children, tone }) => {
  const isMobile = useIsMobile();
  return (
    <section
      id={id}
      style={{
        padding: isMobile ? '56px 20px' : '88px 56px',
        borderBottom: `1px solid ${ip.line}`,
        background: tone === 'alt' ? ip.lavenderBg : 'transparent',
      }}
    >
      {eyebrow && <div style={{ ...ips.eyebrow, marginBottom: 14 }}>{eyebrow}</div>}
      <h2 style={{ ...ips.h2, fontSize: isMobile ? 30 : 40, marginBottom: 28, maxWidth: 860 }}>{h2}</h2>
      <div style={{ maxWidth: 860, fontSize: 16.5, lineHeight: 1.78, color: ip.subAlt }}>{children}</div>
    </section>
  );
};

// ─── What gets infused, framed by condition ──────────────
const INFUSION_USES = [
  { c: 'Rheumatoid arthritis', d: 'IV biologics are commonly used when disease activity persists despite oral therapy, or when an oral regimen is not tolerated.' },
  { c: 'Lupus (SLE)', d: 'Infused biologic therapy is one option in moderate-to-severe disease, alongside standard oral treatment.' },
  { c: 'Psoriatic arthritis', d: 'IV agents are used in inflammatory arthritis that has not responded adequately to first-line treatment.' },
  { c: 'Vasculitis', d: 'Infusion regimens play a role in induction and maintenance of remission in several forms of vasculitis.' },
  { c: 'Scleroderma & connective-tissue disease', d: 'Infused therapy is considered in selected patients as part of a broader management plan.' },
  { c: 'Osteoporosis & bone health', d: 'IV bone-directed agents are an alternative for patients who cannot tolerate or absorb oral bisphosphonates.' },
];

const IUses = () => {
  const isMobile = useIsMobile();
  return (
    <ISection
      id="conditions-treated"
      eyebrow="What we treat with infusion therapy"
      h2="Infusion therapy for autoimmune and inflammatory disease."
    >
      <p style={{ marginTop: 0 }}>
        Infusion therapy delivers medication directly into a vein, which allows certain treatments to be given at
        controlled doses under clinical supervision. In rheumatology it is used across a range of autoimmune and
        inflammatory conditions — most often when an oral regimen has not achieved adequate disease control.
      </p>
      <p>
        Regimens can involve agents such as infliximab, rituximab, belimumab, abatacept, tocilizumab, intravenous
        immunoglobulin, or zoledronic acid for bone health. These are examples of the medication classes used in
        rheumatology infusion care, not a treatment recommendation: which medication is appropriate — if any — is a
        clinical decision made with your rheumatologist based on your diagnosis, history, and prior treatment.
      </p>
      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        {INFUSION_USES.map((u) => (
          <div key={u.c} style={{ ...ips.card, padding: '22px 24px' }}>
            <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, color: ip.ink, marginBottom: 8 }}>{u.c}</div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: ip.sub }}>{u.d}</div>
          </div>
        ))}
      </div>
    </ISection>
  );
};

// ─── How it works, as numbered steps ─────────────────────
const STEPS = [
  { t: 'Evaluation', d: 'Your rheumatologist confirms the diagnosis and reviews prior treatment to determine whether an infused therapy is an appropriate next step.' },
  { t: 'Insurance authorization', d: 'Our staff handles prior authorization and benefit verification with your plan, and will tell you what your expected out-of-pocket cost is before anything is scheduled.' },
  { t: 'In-office infusion', d: 'The infusion is administered in our office by trained clinical staff with physician oversight. Most appointments take between one and several hours depending on the medication.' },
  { t: 'Monitoring and follow-up', d: 'You are monitored during and after the infusion, and your response is reviewed at follow-up so the plan can be adjusted over time.' },
];

const ISteps = () => {
  const isMobile = useIsMobile();
  return (
    <ISection id="how-it-works" eyebrow="How on-site infusion works" h2="What to expect, step by step." tone="alt">
      <div style={{ display: 'grid', gap: 18, marginTop: 8 }}>
        {STEPS.map((s, i) => (
          <div key={s.t} style={{ display: 'grid', gridTemplateColumns: isMobile ? '40px 1fr' : '64px 1fr', gap: isMobile ? 16 : 24, alignItems: 'start' }}>
            <div style={{ fontFamily: SERIF, fontSize: isMobile ? 30 : 44, lineHeight: 1, color: ip.stepNumeral, fontWeight: 500 }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 500, color: ip.ink, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 16, lineHeight: 1.75, color: ip.subAlt }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </ISection>
  );
};

// ─── The actual differentiator ───────────────────────────
const IWhyOnSite = () => {
  const isMobile = useIsMobile();
  const points = [
    { t: 'Continuity with your own rheumatologist', d: 'The physician managing your condition is the physician overseeing your infusion. Dose changes, side effects, and lab results are handled by the person who already knows your case.' },
    { t: 'No separate infusion-center referral', d: 'Treatment happens where you are already being seen, rather than at an unaffiliated infusion center that has to coordinate back with our office.' },
    { t: 'Clinical supervision throughout', d: 'Infusions are administered by trained clinical staff with physician oversight, in a setting equipped for the medications being given.' },
  ];
  return (
    <ISection id="why-on-site" eyebrow="Why on-site matters" h2="Rheumatology infusions, not a drip lounge.">
      <p style={{ marginTop: 0 }}>
        Many infusion providers are standalone centers or wellness clinics offering vitamin and hydration drips. Those
        are a different service. Infusion therapy here is prescribed, supervised, and followed up by a board-certified
        rheumatologist treating a diagnosed autoimmune or inflammatory condition.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
        {points.map((p) => (
          <div key={p.t} style={{ ...ips.card, padding: '24px 24px' }}>
            <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, color: ip.ink, marginBottom: 10 }}>{p.t}</div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: ip.sub }}>{p.d}</div>
          </div>
        ))}
      </div>
    </ISection>
  );
};

// ─── FAQ — copy here must stay verbatim-identical to the
// FAQPage JSON-LD in infusion-therapy.html (Google parity).
const FAQS = [
  { q: 'Do I have to go to a separate infusion center for biologics?',
    a: 'No. Biologic and IV infusions are administered in our office under clinical supervision, so patients do not need a referral to an outside infusion center.' },
  { q: 'Which conditions are treated with infusion therapy?',
    a: 'Rheumatoid arthritis, lupus, psoriatic arthritis, vasculitis, scleroderma and other connective-tissue disease, and osteoporosis through IV bone-directed therapy. Whether infusion is appropriate for you is a clinical decision made with your rheumatologist.' },
  { q: 'Will my insurance cover biologic infusions?',
    a: 'Most major commercial plans and Medicare cover medically necessary biologic infusions. Our staff handles prior authorization and benefit verification with your plan, and will review your expected out-of-pocket cost with you before treatment is scheduled.' },
  { q: 'How long does an infusion appointment take?',
    a: 'It depends on the medication. Some infusions take about an hour; others run several hours including the monitoring period afterward. You will be told what to expect for your specific medication when the appointment is scheduled.' },
  { q: 'Is infusion therapy safe?',
    a: 'Infusions are administered by trained clinical staff with physician oversight, and you are monitored during and after treatment. Every infused medication carries potential side effects, which your rheumatologist will review with you before you start.' },
  { q: 'Is infusion therapy available at the Queens office as well as Boca Raton?',
    a: `Both offices provide in-office infusion therapy for patients whose treatment plans include biologic medications. Call the Boca Raton office at ${FL_PHONE} or the Queens office at ${NY_PHONE} to confirm scheduling for your specific medication.` },
];

const IFAQ = () => {
  const isMobile = useIsMobile();
  return (
    <section id="faq" style={{ padding: isMobile ? '56px 20px' : '88px 56px', borderBottom: `1px solid ${ip.line}` }}>
      <div style={{ ...ips.eyebrow, marginBottom: 14 }}>Common questions</div>
      <h2 style={{ ...ips.h2, fontSize: isMobile ? 30 : 40, marginBottom: 32 }}>Infusion therapy questions.</h2>
      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        {FAQS.map((f) => (
          <div key={f.q} style={{ ...ips.card, padding: '24px 26px' }}>
            <div style={{ fontFamily: SERIF, fontSize: 19.5, fontWeight: 500, color: ip.ink, marginBottom: 10 }}>{f.q}</div>
            <div style={{ fontSize: 16, lineHeight: 1.75, color: ip.subAlt }}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── NAP + CTA ───────────────────────────────────────────
const ICTA = () => {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '56px 20px' : '88px 56px' }}>
      <div style={{ background: `linear-gradient(110deg, ${ip.purple}, ${ip.purpleDeep})`, color: '#fff', borderRadius: 22, padding: isMobile ? '32px 22px' : '56px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 28 : 56, alignItems: 'center' }}>
        <div>
          <div style={{ ...ips.eyebrow, color: '#D9CDF3', marginBottom: 16 }}>Ask about infusion therapy</div>
          <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? 28 : 38, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.14, margin: '0 0 18px', color: '#fff' }}>
            Talk to a rheumatologist about whether infusion therapy fits your plan.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, opacity: 0.86, margin: '0 0 28px' }}>
            New and established patients are welcome. Our staff will verify your benefits and walk you through what to
            expect before anything is scheduled.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href={`tel:${FL_PHONE_TEL}`} style={{ textDecoration: 'none' }}>
              <button style={{ ...ips.btnWhite, padding: '15px 28px', fontSize: 14.5 }}>Call {FL_PHONE}</button>
            </a>
            <a href="/contact.html" style={{ textDecoration: 'none' }}>
              <button style={{ ...ips.btnOutlineLight, padding: '15px 28px', fontSize: 14.5 }}>Request an appointment</button>
            </a>
          </div>
        </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.8, opacity: 0.9 }}>
          <div style={{ ...ips.eyebrow, color: '#D9CDF3', marginBottom: 10 }}>Boca Raton office</div>
          2900 N Military Trl, Suite 230<br />
          Boca Raton, FL 33431<br />
          {FL_PHONE}<br />
          Mon–Fri · 8:30am–5:00pm
          <div style={{ marginTop: 22 }}>
            <a href="/florida.html" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              More about our Florida offices
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfusionPage = () => (
  <PageShell active="infusion-therapy">
    <IHero />
    <IUses />
    <ISteps />
    <IWhyOnSite />
    <IFAQ />
    <ICTA />
  </PageShell>
);

window.InfusionPage = InfusionPage;
