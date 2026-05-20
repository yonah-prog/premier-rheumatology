// Contact page — two-column layout, FL + NY side by side.

const cp2 = palette;
const cps2 = chromeStyles;

const inputStyle = {
  width: '100%', padding: '14px 16px',
  fontSize: 15, fontFamily: 'Manrope, sans-serif',
  border: `1px solid ${palette.line}`, borderRadius: 10,
  background: '#fafafa', color: palette.ink, outline: 'none',
  transition: 'border-color 0.15s',
};

const labelStyle = {
  fontSize: 12.5, fontWeight: 600, letterSpacing: '0.06em',
  textTransform: 'uppercase', color: palette.sub,
  fontFamily: 'Manrope, sans-serif', marginBottom: 7,
  display: 'block',
};

const Field = ({ label, type = 'text', name, placeholder, span = false, textarea = false }) => (
  <div style={{ gridColumn: span ? '1 / -1' : undefined, display: 'flex', flexDirection: 'column' }}>
    <label style={labelStyle}>{label}</label>
    {textarea
      ? <textarea name={name} placeholder={placeholder} rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => e.target.style.borderColor = palette.purple}
          onBlur={e => e.target.style.borderColor = palette.line} />
      : <input type={type} name={name} placeholder={placeholder}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = palette.purple}
          onBlur={e => e.target.style.borderColor = palette.line} />
    }
  </div>
);

// ─── Office info strip ───────────────────────────────────────
const OfficeInfo = ({ loc, dot }) => (
  <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${cp2.line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: dot, textTransform: 'uppercase', fontFamily: 'Manrope, sans-serif' }}>
        {loc.region} {loc.address2 ? 'Offices' : 'Office'}
      </span>
    </div>

    {/* Address(es) — side by side if two FL locations */}
    <div style={{ display: 'grid', gridTemplateColumns: loc.address2 ? '1fr 1fr' : '1fr', gap: 12, marginBottom: 16 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: cp2.ink, marginBottom: 3 }}>{loc.city}</div>
        <div style={{ fontSize: 13.5, color: cp2.sub, lineHeight: 1.6 }}>
          {loc.address}<br />{loc.cityline}
        </div>
      </div>
      {loc.address2 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: cp2.ink, marginBottom: 3 }}>{loc.city2}</div>
          <div style={{ fontSize: 13.5, color: cp2.sub, lineHeight: 1.6 }}>
            {loc.address2}<br />{loc.cityline2}
          </div>
        </div>
      )}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div>
        <div style={{ ...cps2.eyebrow, marginBottom: 4 }}>Phone</div>
        <a href={`tel:+1${loc.phone.replace(/\D/g,'')}`} style={{ fontSize: 14, fontWeight: 600, color: cp2.ink, textDecoration: 'none' }}>{loc.phone}</a>
      </div>
      <div>
        <div style={{ ...cps2.eyebrow, marginBottom: 4 }}>Hours</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{loc.hours}</div>
      </div>
    </div>
  </div>
);

// ─── Contact form for one office ────────────────────────────
const OfficeForm = ({ loc, dot, accentColor }) => {
  const isMobile = useIsMobile();
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.target;

    // Read optional attachment as base64
    let attachment = null;
    const fileInput = form.attachment;
    if (fileInput && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.size > 8 * 1024 * 1024) {
        setError('File is too large. Please attach a file under 8 MB.');
        setSending(false);
        return;
      }
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      attachment = { filename: file.name, content: base64, type: file.type };
    }

    const body = {
      officeId: loc.id,
      office: loc.city,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      insurance_provider: form.insurance_provider.value,
      insurance_id: form.insurance_id.value,
      message: form.message.value,
      attachment,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
      } else {
        setError('Something went wrong. Please call us directly.');
      }
    } catch {
      setError('Network error. Please call us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: cp2.card, border: `1px solid ${cp2.line}`, borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <OfficeInfo loc={loc} dot={dot} />

      {sent ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: accentColor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12.5 10 18 20 6" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Message sent!</div>
          <div style={{ fontSize: 15, color: cp2.sub, lineHeight: 1.6, maxWidth: 320 }}>
            Thank you for reaching out. Our {loc.city} team will follow up with you shortly.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
          <Field label="First Name" name="first_name" placeholder="Jane" />
          <Field label="Last Name" name="last_name" placeholder="Smith" />
          <Field label="Email" type="email" name="email" placeholder="jane@example.com" />
          <Field label="Phone" type="tel" name="phone" placeholder="(555) 000-0000" />
          <Field label="Insurance Provider" name="insurance_provider" placeholder="e.g. Blue Cross" />
          <Field label="Insurance ID #" name="insurance_id" placeholder="Member ID" />
          <Field label="Message" name="message" placeholder="Tell us about your symptoms or reason for visit…" span textarea />

          {/* File attachment */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Attach a document <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, opacity: 0.6 }}>(optional — referral, insurance card, records)</span></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', border: `1px dashed ${cp2.line}`, borderRadius: 10, background: '#fafafa', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke={cp2.sub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 14, color: cp2.sub, fontFamily: 'Manrope, sans-serif' }}>Click to choose file · PDF, JPG, PNG, DOC up to 8 MB</span>
              <input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{ display: 'none' }} onChange={e => {
                const label = e.target.closest('label').querySelector('span');
                label.textContent = e.target.files[0] ? e.target.files[0].name : 'Click to choose file · PDF, JPG, PNG, DOC up to 8 MB';
                label.style.color = e.target.files[0] ? cp2.ink : cp2.sub;
              }} />
            </label>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" disabled={sending} style={{
              width: '100%', background: accentColor, color: '#fff',
              border: 'none', padding: '17px 24px', borderRadius: 12,
              fontSize: 15, fontWeight: 700, cursor: sending ? 'wait' : 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontFamily: 'Manrope, sans-serif', opacity: sending ? 0.7 : 1,
            }}>
              {sending ? 'Sending…' : `Send message to ${loc.city} office`}
              {!sending && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
            {error && <p style={{ fontSize: 13, color: '#c0392b', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>{error}</p>}
            <p style={{ fontSize: 12.5, color: cp2.sub, textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
              We respond within 1 business day. For urgent matters, please call us directly.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

// ─── Hero ────────────────────────────────────────────────────
const ContactHero = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '48px 20px' : '80px 56px 72px', background: cp2.card, borderBottom: `1px solid ${cp2.line}` }}>
    <div style={{ ...cps2.eyebrow, marginBottom: 18 }}>Contact Us</div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 24 : 72, alignItems: 'end' }}>
      <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: isMobile ? 44 : 80, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.03, margin: 0, color: cp2.ink }}>
        We&apos;re here<br />
        <span style={{ color: cp2.purple }}>when you need us.</span>
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: cp2.sub, margin: 0 }}>
        Every patient deserves to feel heard. Whether you&apos;re scheduling your first visit, have a question about your care, or need to reach your care team — we make it easy. Reach out to whichever office is most convenient for you and we&apos;ll get back to you promptly.
      </p>
    </div>
  </section>
  );
};

// ─── Two-column forms ────────────────────────────────────────
const ContactForms = () => {
  const isMobile = useIsMobile();
  const fl = LOCATIONS.find(l => l.id === 'FL');
  const ny = LOCATIONS.find(l => l.id === 'NY');
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '80px 56px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28, alignItems: 'start' }}>
        <OfficeForm loc={fl} dot={cp2.purple} accentColor={cp2.purple} />
        <OfficeForm loc={ny} dot="#2e6b52" accentColor="#2e6b52" />
      </div>
    </section>
  );
};

// ─── Bottom note ─────────────────────────────────────────────
const ContactNote = () => (
  <section style={{ padding: '0 56px 80px' }}>
    <div style={{ background: cp2.purpleLight, borderRadius: 18, padding: '36px 44px', display: 'flex', alignItems: 'center', gap: 32 }}>
      <div style={{ fontSize: 36 }}>💬</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 6 }}>New to Premier Rheumatology?</div>
        <div style={{ fontSize: 15, lineHeight: 1.65, color: cp2.sub, maxWidth: 680 }}>
          If you're a new patient, please mention it in your message and let us know who referred you. We'll walk you through what to expect at your first visit and what to bring along.
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ────────────────────────────────────────────────────
const ContactPage = () => (
  <PageShell active="contact">
    <ContactHero />
    <ContactForms />
    <ContactNote />
  </PageShell>
);

window.ContactPage = ContactPage;
