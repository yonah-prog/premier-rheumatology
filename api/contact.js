// api/contact.js — Vercel serverless function
// Receives form data, sends via Resend to the correct office recipients.

const OFFICE_CONFIG = {
  FL: {
    label: 'Florida (Boca Raton)',
    recipients: [
      'yonah@premierhealthalliance.com',
      'office@premierjointcare.com',
    ],
  },
  NY: {
    label: 'New York (Queens)',
    recipients: [
      'yonah@premierhealthalliance.com',
      'asilberberg@premierhematology.com',
    ],
  },
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    officeId, office,
    first_name, last_name,
    email, phone,
    insurance_provider, insurance_id,
    message,
  } = req.body;

  const config = OFFICE_CONFIG[officeId];
  if (!config) {
    return res.status(400).json({ error: 'Invalid office' });
  }

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #12100a;">
      <div style="background: #6b3fa0; padding: 28px 32px; border-radius: 12px 12px 0 0;">
        <div style="color: #d9c3ea; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">Premier Rheumatology</div>
        <div style="color: #fff; font-size: 22px; font-weight: 700;">New Patient Inquiry — ${office} Office</div>
      </div>
      <div style="border: 1px solid #e8e4f0; border-top: none; border-radius: 0 0 12px 12px; padding: 28px 32px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; font-weight: 600; font-size: 15px;">${first_name} ${last_name}</td>
          </tr>
          <tr style="border-top: 1px solid #f0edf7;">
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #6b3fa0;">${email}</a></td>
          </tr>
          <tr style="border-top: 1px solid #f0edf7;">
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; font-size: 15px;">${phone || '—'}</td>
          </tr>
          <tr style="border-top: 1px solid #f0edf7;">
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Insurance</td>
            <td style="padding: 10px 0; font-size: 15px;">${insurance_provider || '—'}</td>
          </tr>
          <tr style="border-top: 1px solid #f0edf7;">
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Insurance ID</td>
            <td style="padding: 10px 0; font-size: 15px;">${insurance_id || '—'}</td>
          </tr>
        </table>
        ${message ? `
        <div style="background: #f8f6fc; border-left: 3px solid #6b3fa0; padding: 16px 20px; border-radius: 0 8px 8px 0;">
          <div style="font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Message</div>
          <div style="font-size: 15px; line-height: 1.6; color: #333;">${message}</div>
        </div>` : ''}
        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f0edf7; font-size: 12px; color: #aaa;">
          Submitted via premierjointcare.com · ${config.label}
        </div>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Premier Rheumatology <noreply@premierjointcare.com>',
        to: config.recipients,
        reply_to: email,
        subject: `New patient inquiry — Premier Rheumatology ${office}`,
        html,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const err = await response.json();
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
