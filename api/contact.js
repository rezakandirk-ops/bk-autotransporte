// Vercel Serverless Function: Kontaktformular → Resend → Bilal
// ENV-Variablen (in Vercel Dashboard setzen):
//   RESEND_API_KEY      → API-Key von resend.com
//   CONTACT_TO_EMAIL    → Ziel-Adresse (default: bk-autotransport@web.de)
//   CONTACT_FROM_EMAIL  → Absender (default: onboarding@resend.dev)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message, website } = req.body || {};

    // Honeypot: Bots füllen das versteckte Feld aus
    if (website && website.trim() !== '') {
      return res.status(200).json({ ok: true });
    }

    // Pflichtfelder
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Bitte eine gültige E-Mail-Adresse angeben.' });
    }
    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return res.status(400).json({ error: 'Eingabe zu lang.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY ist nicht gesetzt');
      return res.status(500).json({ error: 'Mailversand ist aktuell nicht konfiguriert.' });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'bk-autotransport@web.de';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;color:#111;">
        <h2 style="color:#0A1628;border-bottom:2px solid #00A8F0;padding-bottom:8px;">
          Neue Anfrage über bk-autotransporte.de
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 0;width:140px;color:#666;">Name:</td><td style="padding:8px 0;"><strong>${esc(name)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666;">E-Mail:</td><td style="padding:8px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#666;">Telefon:</td><td style="padding:8px 0;"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>` : ''}
          ${service ? `<tr><td style="padding:8px 0;color:#666;">Leistung:</td><td style="padding:8px 0;">${esc(service)}</td></tr>` : ''}
        </table>
        <h3 style="margin-top:24px;color:#0A1628;">Nachricht:</h3>
        <div style="background:#f5f7fa;padding:16px;border-radius:8px;white-space:pre-wrap;">${esc(message)}</div>
        <p style="margin-top:24px;font-size:12px;color:#999;">
          Diese E-Mail wurde automatisch über das Kontaktformular auf bk-autotransporte.de versendet.
        </p>
      </div>
    `;

    const text = `Neue Anfrage über bk-autotransporte.de

Name: ${name}
E-Mail: ${email}
${phone ? 'Telefon: ' + phone + '\n' : ''}${service ? 'Leistung: ' + service + '\n' : ''}
Nachricht:
${message}
`;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `bk autotransporte <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `Neue Anfrage: ${name}${service ? ' – ' + service : ''}`,
        html,
        text
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('Resend-Fehler:', r.status, errText);
      return res.status(502).json({ error: 'Versand fehlgeschlagen. Bitte später erneut versuchen oder telefonisch melden.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Unerwarteter Fehler beim Versand.' });
  }
}
