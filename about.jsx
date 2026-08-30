// About Premier Rheumatology — location-centric SEO copy for Boca Raton, FL + Queens, NY.

const ap = palette;
const aps = chromeStyles;

// ─── Hero ────────────────────────────────────────────────
const AHero = () => (
  <section style={{ padding: '80px 56px 72px', background: ap.card, borderBottom: `1px solid ${ap.line}` }}>
    <div style={{ ...aps.eyebrow, marginBottom: 20 }}>About Premier Rheumatology</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'end' }}>
      <h1 style={{ ...aps.h1, fontSize: 60 }}>
        Trusted <em style={{ fontStyle: 'italic', color: ap.purple }}>rheumatology care</em> in Boca Raton, FL and Queens, NY.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, color: ap.sub, margin: 0, maxWidth: 520 }}>
        Premier Rheumatology is a specialty practice focused on the diagnosis, long-term management, and personalized treatment of autoimmune, inflammatory, and musculoskeletal conditions — with board-certified rheumatologists serving patients across South Florida and the New York metro area.
      </p>
    </div>

    <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div>
        <div style={{ ...aps.eyebrow, color: ap.regionFL, marginBottom: 10 }}>Florida</div>
        <div style={{ borderRadius: 18, overflow: 'hidden', height: 320, border: `1px solid ${ap.lineCard}` }}>
          <iframe
            src="https://www.google.com/maps?q=2900+N+Military+Trl+Suite+230,+Boca+Raton,+FL+33431&output=embed&z=15"
            width="100%" height="320" style={{ border: 'none', display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Boca Raton office map"
          />
        </div>
      </div>
      <div>
        <div style={{ ...aps.eyebrow, color: ap.regionNY, marginBottom: 10 }}>New York</div>
        <div style={{ borderRadius: 18, overflow: 'hidden', height: 320 }}>
          <iframe
            src="https://www.google.com/maps?q=261-12+E+Williston+Ave,+Queens,+NY+11001&output=embed&z=15"
            width="100%" height="320" style={{ border: 'none', display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Queens office map"
          />
        </div>
      </div>
    </div>
  </section>
);

// ─── Table of contents (anchor nav, good for SEO + UX) ───
const ATOC = () => {
  const items = [
    { id: 'practice', label: 'About our practice' },
    { id: 'comprehensive', label: 'Comprehensive care' },
    { id: 'treatment', label: 'Personalized treatment' },
    { id: 'long-term', label: 'Long-term management' },
    { id: 'approach', label: 'Patient-centered approach' },
    { id: 'locations', label: 'Our locations' },
    { id: 'faq', label: 'Common questions' },
  ];
  return (
    <nav aria-label="On this page" style={{ padding: '20px 56px', background: ap.lavenderBg, borderBottom: `1px solid ${ap.line}`, position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', gap: 28, overflow: 'auto', fontSize: 13.5, color: ap.sub }}>
        <span style={{ ...aps.eyebrow, color: ap.mutedLabel, flexShrink: 0 }}>On this page</span>
        {items.map(i => (
          <a key={i.id} href={`#${i.id}`} style={{ color: ap.subAlt, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 }}>{i.label}</a>
        ))}
      </div>
    </nav>
  );
};

// ─── Reusable long-form section ──────────────────────────
const ASection = ({ id, eyebrow, h2, children, img, imgLabel, imgTone = 'purple', imgSrc, flip = false }) => (
  <section id={id} style={{ padding: '96px 56px', borderBottom: `1px solid ${ap.line}`, scrollMarginTop: 80 }}>
    <div style={{ display: 'grid', gridTemplateColumns: img ? '1fr 1fr' : '1fr 1.8fr', gap: 72, alignItems: 'start' }}>
      {flip && img && (imgSrc
        ? <img src={imgSrc} alt={imgLabel} style={{ width: '100%', height: 440, objectFit: 'cover', objectPosition: 'center', borderRadius: 18, display: 'block' }} />
        : <Placeholder label={imgLabel} tone={imgTone} h={440} radius={18} />
      )}
      <div>
        <div style={{ ...aps.eyebrow, marginBottom: 16 }}>{eyebrow}</div>
        <h2 style={{ ...aps.h2, fontSize: 40, marginBottom: 26 }}>{h2}</h2>
        <div style={{ fontSize: 16.5, lineHeight: 1.78, color: ap.sub, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {children}
        </div>
      </div>
      {!flip && img && (imgSrc
        ? <img src={imgSrc} alt={imgLabel} style={{ width: '100%', height: 440, objectFit: 'cover', objectPosition: 'center', borderRadius: 18, display: 'block' }} />
        : <Placeholder label={imgLabel} tone={imgTone} h={440} radius={18} />
      )}
    </div>
  </section>
);

// ─── Highlights strip ────────────────────────────────────
const AHighlights = () => {
  const items = [
    { n: '2', l: 'Convenient office locations' },
    { n: '20+', l: 'Years of combined experience' },
    { n: '30+', l: 'Rheumatologic conditions treated' },
    { n: 'Board', l: 'Certified rheumatologists' },
  ];
  return (
    <section style={{ padding: '64px 56px', background: `linear-gradient(110deg, ${ap.purple}, ${ap.purpleDeep})`, color: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
        {items.map((it, i) => (
          <div key={i} style={{ borderLeft: i === 0 ? 'none' : '1px solid #ffffff22', paddingLeft: i === 0 ? 0 : 32 }}>
            <div style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>{it.n}</div>
            <div style={{ marginTop: 12, fontSize: 14, opacity: 0.8, maxWidth: 200, lineHeight: 1.55 }}>{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Locations callout ───────────────────────────────────
const ALocations = () => (
  <section id="locations" style={{ padding: '96px 56px', borderBottom: `1px solid ${ap.line}`, scrollMarginTop: 80 }}>
    <div style={{ ...aps.eyebrow, marginBottom: 14 }}>Our locations</div>
    <h2 style={{ ...aps.h2, fontSize: 40, marginBottom: 18 }}>Rheumatology care in two convenient locations.</h2>
    <p style={{ fontSize: 16.5, lineHeight: 1.7, color: ap.sub, maxWidth: 720, marginBottom: 48 }}>
      Whether you live in Palm Beach County, Broward, or the greater New York metro, our specialists provide the same evidence-based rheumatologic care at both offices — from initial evaluation through ongoing disease management.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {LOCATIONS.map((loc, i) => (
        <div key={loc.id} style={{ ...aps.card, borderRadius: 20, padding: '30px 32px 32px' }}>
          <div style={{ ...aps.eyebrow, color: i === 0 ? ap.regionFL : ap.regionNY, marginBottom: 12 }}>
            {i === 0 ? 'South Florida' : 'New York Metro'}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 500, letterSpacing: '-0.01em', color: ap.ink, marginBottom: 16 }}>
            Rheumatologist in {loc.city}, {loc.id}
          </div>
          {/* Primary address */}
          <div style={{ fontSize: 15, color: ap.sub, lineHeight: 1.6, marginBottom: 8 }}>
            {loc.address}<br/>{loc.cityline}<br/>{loc.phone} · {loc.hours}
          </div>
          {/* Second FL address */}
          {loc.address2 && (
            <div style={{ fontSize: 15, color: ap.sub, lineHeight: 1.6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${ap.line}` }}>
              {loc.address2}<br/>{loc.cityline2}
            </div>
          )}
          <a href={loc.id === 'FL' ? 'florida.html' : 'new-york.html'} style={{ textDecoration: 'none', display: 'inline-block', marginTop: 20 }}>
            <button style={{ ...aps.btn, padding: '13px 24px', fontSize: 14 }}>
              Visit {loc.region} office <ArrowRight size={14} />
            </button>
          </a>
        </div>
      ))}
    </div>
  </section>
);

// ─── FAQ (great for SEO + patient trust) ─────────────────
const AFAQ = () => {
  const faqs = [
    {
      q: 'What conditions does a rheumatologist treat?',
      a: 'Rheumatologists specialize in autoimmune and inflammatory conditions affecting the joints, bones, muscles, and connective tissues — including rheumatoid arthritis, lupus, psoriatic arthritis, gout, osteoporosis, ankylosing spondylitis, vasculitis, and fibromyalgia. Premier Rheumatology evaluates and manages more than thirty rheumatologic conditions at both our Boca Raton and Queens offices.',
    },
    {
      q: 'When should I see a rheumatologist in Boca Raton or Queens?',
      a: 'Consider scheduling a consultation if you have persistent joint pain, stiffness lasting more than thirty minutes in the morning, unexplained swelling, recurring inflammation, or have been told your blood work suggests an autoimmune condition. Early evaluation often leads to better long-term outcomes.',
    },
    {
      q: 'Do I need a referral to visit Premier Rheumatology?',
      a: 'Referral requirements depend on your insurance plan. Many patients at our Boca Raton, FL and Queens, NY offices self-refer, while others are referred by their primary care provider. Our team can help confirm whether a referral is required when you call to schedule.',
    },
    {
      q: 'What insurance plans does Premier Rheumatology accept?',
      a: 'We participate with most major commercial insurance plans and Medicare at both the Florida and New York locations. Please contact the office directly to confirm your specific plan before your first visit.',
    },
    {
      q: 'What happens at a first rheumatology appointment?',
      a: 'Your first visit typically includes a detailed medical history, a physical examination focused on affected joints and systems, and — when appropriate — laboratory testing or imaging. The goal is to clarify your diagnosis, answer your questions, and outline a clear next step.',
    },
    {
      q: 'Do you offer infusion therapy on-site?',
      a: 'Yes. Both the Boca Raton and Queens offices provide in-office infusion therapy for patients whose treatment plans include biologic medications, allowing care to be delivered in a familiar, supervised setting.',
    },
  ];

  return (
    <section id="faq" style={{ padding: '96px 56px', background: ap.card }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 72, alignItems: 'start' }}>
        <div>
          <div style={{ ...aps.eyebrow, marginBottom: 16 }}>Common questions</div>
          <h2 style={{ ...aps.h2, fontSize: 40 }}>What patients ask before their first visit.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: ap.sub, marginTop: 22, maxWidth: 400 }}>
            If you don't see your question answered here, our team is happy to help. Call either office or send a message through our contact form.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${ap.line}` }}>
          {faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: `1px solid ${ap.line}`, padding: '24px 0' }}>
              <summary style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 500, color: ap.ink, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <span>{f.q}</span>
                <span className="acc-plus" style={{ fontSize: 22, color: ap.purple, fontWeight: 300 }}>+</span>
              </summary>
              <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.75, color: ap.sub }}>{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Consultation CTA ────────────────────────────────────
const ACTA = () => (
  <section style={{ padding: '96px 56px', background: ap.bg }}>
    <div style={{ background: `linear-gradient(110deg, ${ap.purple}, ${ap.purpleDeep})`, color: '#fff', borderRadius: 24, padding: '72px 64px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
      <div>
        <div style={{ ...aps.eyebrow, color: '#D9CDF3', marginBottom: 18 }}>Schedule a consultation</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.12, margin: '0 0 20px', color: '#fff' }}>
          Experiencing joint pain, stiffness, or inflammation?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.68, opacity: 0.85, maxWidth: 560, margin: 0 }}>
          A Premier Rheumatology consultation can help clarify the cause of your symptoms and outline appropriate management. We welcome new patients at our Boca Raton, FL and Queens, NY offices.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href="contact.html" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps.btnWhite, width: '100%', padding: '18px 28px', fontSize: 16, justifyContent: 'space-between' }}>
            <span>Request an appointment</span>
            <ArrowRight size={18} />
          </button>
        </a>
        <a href="tel:+15617303894" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps.btnOutlineLight, width: '100%', padding: '18px 28px' }}>
            Florida · (561) 730-3894
          </button>
        </a>
        <a href="tel:+17183478888" style={{ textDecoration: 'none' }}>
          <button style={{ ...aps.btnOutlineLight, width: '100%', padding: '18px 28px' }}>
            New York · (718) 347-8888
          </button>
        </a>
      </div>
    </div>
  </section>
);

// ─── Page composition ────────────────────────────────────
const AboutPage = () => (
  <PageShell active="about">
    <AHero />
    <ATOC />

    <ASection
      id="practice"
      eyebrow="Our practice"
      h2="A dedicated rheumatology practice serving Boca Raton and Queens."
      img imgLabel="Consultation · lifestyle" imgTone="warm"
      imgSrc="Images/site-images-3/care.webp"
    >
      <p>
        Premier Rheumatology is a specialty practice focused on the accurate diagnosis, long-term management, and personalized treatment of autoimmune, inflammatory, degenerative, and musculoskeletal conditions affecting the joints, bones, and connective tissues. With offices in <strong>Boca Raton, Florida</strong> and <strong>Queens, New York</strong>, we serve patients across South Florida, Palm Beach County, and the greater New York metro area.
      </p>
      <p>
        Rheumatologic conditions are often complex and can evolve over time. Our approach emphasizes careful clinical assessment, evidence-based treatment strategies, and consistent monitoring — so patients feel supported through every stage of their care, from first evaluation to long-term follow-up.
      </p>
    </ASection>

    <ASection
      id="comprehensive"
      eyebrow="Comprehensive rheumatology care"
      h2="Expert evaluation for a broad range of rheumatologic conditions."
      img imgLabel="Clinical evaluation" imgTone="purple" flip
      imgSrc="Images/site-images-3/blood-test.png"
    >
      <p>
        Our rheumatologists care for patients with inflammatory and autoimmune arthritis (including rheumatoid arthritis, psoriatic arthritis, and ankylosing spondylitis), connective tissue diseases such as lupus and Sjögren's syndrome, metabolic bone disorders including osteoporosis, crystal-induced arthritis such as gout, spine and axial conditions, and chronic musculoskeletal pain.
      </p>
      <p>
        Evaluation typically includes a detailed medical history, a focused physical examination, targeted laboratory testing, and imaging when appropriate. This comprehensive approach allows our Boca Raton and Queens rheumatology teams to identify underlying causes, differentiate between inflammatory and non-inflammatory conditions, and guide appropriate treatment decisions with confidence.
      </p>
    </ASection>

    <ASection
      id="treatment"
      eyebrow="Personalized, evidence-based treatment"
      h2="Treatment plans built around you — not a one-size-fits-all protocol."
      img imgLabel="Treatment planning" imgTone="cool"
      imgSrc="Images/site-images-3/pexels-samuel-patrick-2155522097-33776738.jpg"
    >
      <p>
        Treatment plans at Premier Rheumatology are individualized and grounded in current clinical guidelines. Depending on your condition, care may include conservative management, oral medication therapy, advanced biologic treatments, and on-site infusion therapy at both our Florida and New York locations.
      </p>
      <p>
        We place a strong emphasis on shared decision-making, patient education, and clear communication. Our goal is to help you understand your diagnosis, weigh your options, and participate actively in building a plan that fits your goals and daily life.
      </p>
    </ASection>

    <ASection
      id="long-term"
      eyebrow="Long-term disease management"
      h2="Continuity of care that keeps pace with your condition."
      img imgLabel="Follow-up visit" imgTone="mint" flip
      imgSrc="Images/site-images-3/pexels-konrads-photo-32254525.jpg"
    >
      <p>
        Many rheumatologic conditions require ongoing management rather than one-time treatment. We focus on continuity — with regular follow-up, disease-activity monitoring, and thoughtful adjustments to your plan as your needs change.
      </p>
      <p>
        Our team works collaboratively across the Boca Raton and Queens offices to support long-term joint health, preserve function, and reduce the risk of disease-related complications over time.
      </p>
    </ASection>

    <ASection
      id="approach"
      eyebrow="A thoughtful, patient-centered approach"
      h2="Careful, individualized care — never rushed."
      img imgLabel="Patient and clinician" imgTone="warm"
      imgSrc="Images/site-images-3/pexels-mo3ath-photos-110226063-26886760.jpg"
    >
      <p>
        We recognize that rheumatologic conditions can affect mobility, energy, sleep, and overall quality of life. Our care model is designed to be supportive, accessible, and responsive — with attention to both physical symptoms and how you feel day to day.
      </p>
      <p>
        Patients can expect a professional, respectful environment focused on careful evaluation and individualized care. We take the time to listen, explain, and plan together — because thoughtful care produces better outcomes.
      </p>
    </ASection>

    <ALocations />
    <AFAQ />
    <ACTA />
  </PageShell>
);

window.AboutPage = AboutPage;
