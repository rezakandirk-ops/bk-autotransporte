// Vercel Serverless Function: Kontaktformular → Resend
// Sendet zwei Mails: 1) Anfrage an Bilal, 2) Bestätigung an Kunden
//
// ENV (Vercel Dashboard):
//   RESEND_API_KEY      → API-Key von resend.com
//   CONTACT_TO_EMAIL    → Ziel (default: bk-autotransport@web.de)
//   CONTACT_FROM_EMAIL  → Absender (default: kontakt@bk-autotransporte.de)

const BRAND = {
  name: 'bk autotransporte',
  navy: '#0A1628',
  navyCard: '#112240',
  accent: '#00A8F0',
  accentDark: '#0090cc',
  text: '#1a2533',
  muted: '#6b7280',
  light: '#f5f7fa',
  border: '#e5e7eb',
  phone: '0172 383 1549',
  phoneIntl: '+491723831549',
  email: 'bk-autotransport@web.de',
  address: 'Anton-Heinen-Str. 27, 50181 Bedburg',
  website: 'bk-autotransporte.de'
};

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// ── E-Mail-Template-Bausteine ──────────────────────────────────────
function header(subline) {
  return `
  <tr>
    <td style="background:${BRAND.navy};padding:32px 32px 28px 32px;text-align:left;border-radius:12px 12px 0 0;">
      <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        bk <span style="color:${BRAND.accent};">autotransporte</span>
      </div>
      <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        ${esc(subline)}
      </div>
    </td>
  </tr>`;
}

function footer() {
  return `
  <tr>
    <td style="background:${BRAND.light};padding:28px 32px;border-radius:0 0 12px 12px;border-top:1px solid ${BRAND.border};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="font-size:13px;color:${BRAND.text};line-height:1.7;">
            <strong style="color:${BRAND.navy};">bk autotransporte</strong> &middot; Bilal Kilic Autotransporte<br>
            ${BRAND.address}<br>
            Tel: <a href="tel:${BRAND.phoneIntl}" style="color:${BRAND.accent};text-decoration:none;">${BRAND.phone}</a> &middot;
            E-Mail: <a href="mailto:${BRAND.email}" style="color:${BRAND.accent};text-decoration:none;">${BRAND.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding-top:14px;font-size:11px;color:${BRAND.muted};">
            <a href="https://${BRAND.website}/impressum.html" style="color:${BRAND.muted};text-decoration:underline;">Impressum</a>
            &nbsp;&middot;&nbsp;
            <a href="https://${BRAND.website}/datenschutz.html" style="color:${BRAND.muted};text-decoration:underline;">Datenschutz</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function wrap(innerHtml, preheader) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(BRAND.name)}</title></head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:transparent;">${esc(preheader)}</div>` : ''}
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eef1f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;box-shadow:0 4px 24px rgba(10,22,40,0.08);">
        ${innerHtml}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── 1) Mail an Bilal ───────────────────────────────────────────────
function ownerHtml({ name, email, phone, service, message }) {
  const inner = `
    ${header('Neue Anfrage über die Webseite')}
    <tr>
      <td style="padding:36px 32px 8px 32px;">
        <h1 style="margin:0 0 8px 0;font-size:22px;font-weight:800;color:${BRAND.navy};line-height:1.3;letter-spacing:-0.01em;">
          Neue Anfrage von ${esc(name)}
        </h1>
        <p style="margin:0;font-size:14px;color:${BRAND.muted};">
          Eingegangen über das Kontaktformular auf <a href="https://${BRAND.website}" style="color:${BRAND.accent};text-decoration:none;">${BRAND.website}</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.light};border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.accent};border-radius:8px;">
          <tr>
            <td style="padding:18px 22px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:${BRAND.text};">
                <tr>
                  <td style="padding:6px 0;color:${BRAND.muted};width:90px;font-size:13px;">Name</td>
                  <td style="padding:6px 0;font-weight:600;">${esc(name)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:${BRAND.muted};font-size:13px;">E-Mail</td>
                  <td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:${BRAND.accent};text-decoration:none;font-weight:600;">${esc(email)}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding:6px 0;color:${BRAND.muted};font-size:13px;">Telefon</td>
                  <td style="padding:6px 0;"><a href="tel:${esc(phone)}" style="color:${BRAND.accent};text-decoration:none;font-weight:600;">${esc(phone)}</a></td>
                </tr>` : ''}
                ${service ? `<tr>
                  <td style="padding:6px 0;color:${BRAND.muted};font-size:13px;">Leistung</td>
                  <td style="padding:6px 0;font-weight:600;">${esc(service)}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px 8px 32px;">
        <div style="font-size:13px;font-weight:700;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">
          Nachricht
        </div>
        <div style="font-size:15px;color:${BRAND.text};line-height:1.65;white-space:pre-wrap;background:#ffffff;border:1px solid ${BRAND.border};border-radius:8px;padding:18px 20px;">${esc(message)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 32px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${BRAND.accent};border-radius:8px;">
              <a href="mailto:${esc(email)}?subject=Re: Ihre Anfrage bei bk autotransporte" style="display:inline-block;padding:12px 22px;color:${BRAND.navy};text-decoration:none;font-weight:700;font-size:14px;">
                Per E-Mail antworten →
              </a>
            </td>
            ${phone ? `<td style="width:10px;"></td>
            <td style="border:1px solid ${BRAND.border};border-radius:8px;">
              <a href="tel:${esc(phone)}" style="display:inline-block;padding:12px 22px;color:${BRAND.text};text-decoration:none;font-weight:700;font-size:14px;">
                Anrufen
              </a>
            </td>` : ''}
          </tr>
        </table>
      </td>
    </tr>
    ${footer()}
  `;
  return wrap(inner, `Neue Anfrage von ${name}${service ? ' – ' + service : ''}`);
}

function ownerText({ name, email, phone, service, message }) {
  return `Neue Anfrage über bk-autotransporte.de

Name:    ${name}
E-Mail:  ${email}
${phone ? 'Telefon: ' + phone + '\n' : ''}${service ? 'Leistung: ' + service + '\n' : ''}
Nachricht:
${message}

──
Antworten direkt an: ${email}
`;
}

// ── 2) Bestätigung an Kunden ───────────────────────────────────────
function customerHtml({ name, email, phone, service, message }) {
  const inner = `
    ${header('Bestätigung Ihrer Anfrage')}
    <tr>
      <td style="padding:36px 32px 8px 32px;">
        <h1 style="margin:0 0 14px 0;font-size:22px;font-weight:800;color:${BRAND.navy};line-height:1.3;letter-spacing:-0.01em;">
          Vielen Dank für Ihre Anfrage, ${esc(name.split(' ')[0])}!
        </h1>
        <p style="margin:0 0 16px 0;font-size:15px;color:${BRAND.text};line-height:1.65;">
          Wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb von <strong>24 Stunden</strong> bei Ihnen — werktags meist deutlich schneller.
        </p>
        <p style="margin:0;font-size:15px;color:${BRAND.text};line-height:1.65;">
          Falls Ihre Anfrage dringend ist, erreichen Sie uns auch direkt telefonisch oder per WhatsApp.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 32px 8px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${BRAND.accent};border-radius:8px;">
              <a href="tel:${BRAND.phoneIntl}" style="display:inline-block;padding:13px 24px;color:${BRAND.navy};text-decoration:none;font-weight:700;font-size:14px;">
                ${BRAND.phone} anrufen
              </a>
            </td>
            <td style="width:10px;"></td>
            <td style="background:#25D366;border-radius:8px;">
              <a href="https://wa.me/491723831549" style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;">
                WhatsApp
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px 8px 32px;">
        <div style="font-size:13px;font-weight:700;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">
          Ihre Anfrage
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.light};border:1px solid ${BRAND.border};border-radius:8px;">
          <tr>
            <td style="padding:18px 22px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:${BRAND.text};">
                <tr>
                  <td style="padding:5px 0;color:${BRAND.muted};width:90px;font-size:13px;">Name</td>
                  <td style="padding:5px 0;">${esc(name)}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:${BRAND.muted};font-size:13px;">E-Mail</td>
                  <td style="padding:5px 0;">${esc(email)}</td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding:5px 0;color:${BRAND.muted};font-size:13px;">Telefon</td>
                  <td style="padding:5px 0;">${esc(phone)}</td>
                </tr>` : ''}
                ${service ? `<tr>
                  <td style="padding:5px 0;color:${BRAND.muted};font-size:13px;">Leistung</td>
                  <td style="padding:5px 0;">${esc(service)}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top:14px;padding-top:14px;border-top:1px solid ${BRAND.border};font-size:14px;color:${BRAND.text};line-height:1.65;white-space:pre-wrap;">${esc(message)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 32px 32px;font-size:13px;color:${BRAND.muted};line-height:1.65;">
        Diese E-Mail dient nur als Bestätigung Ihrer Anfrage. Bitte antworten Sie nicht direkt auf diese Mail — schreiben Sie stattdessen an
        <a href="mailto:${BRAND.email}" style="color:${BRAND.accent};text-decoration:none;">${BRAND.email}</a>.
      </td>
    </tr>
    ${footer()}
  `;
  return wrap(inner, 'Ihre Anfrage ist bei uns eingegangen — wir melden uns innerhalb von 24 Stunden.');
}

function customerText({ name, email, phone, service, message }) {
  return `Vielen Dank für Ihre Anfrage, ${name.split(' ')[0]}!

Wir haben Ihre Anfrage über bk-autotransporte.de erhalten und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen — werktags meist deutlich schneller.

Falls es dringend ist, erreichen Sie uns auch direkt:
Tel:      ${BRAND.phone}
WhatsApp: https://wa.me/491723831549
E-Mail:   ${BRAND.email}

──
Ihre Anfrage:

Name:    ${name}
E-Mail:  ${email}
${phone ? 'Telefon: ' + phone + '\n' : ''}${service ? 'Leistung: ' + service + '\n' : ''}
Nachricht:
${message}

──
bk autotransporte · Bilal Kilic Autotransporte
${BRAND.address}
${BRAND.website}
`;
}

// ── Resend-Versand ─────────────────────────────────────────────────
async function sendMail({ apiKey, from, to, replyTo, subject, html, text }) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
      text
    })
  });
}

// ── Handler ────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message, website } = req.body || {};

    if (website && website.trim() !== '') {
      return res.status(200).json({ ok: true });
    }

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

    const toOwner = process.env.CONTACT_TO_EMAIL || 'bk-autotransport@web.de';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'kontakt@bk-autotransporte.de';
    const fromHeader = `bk autotransporte <${fromEmail}>`;

    const payload = { name: name.trim(), email: email.trim(), phone: (phone || '').trim(), service: (service || '').trim(), message: message.trim() };

    // 1) Mail an Bilal — diese muss durchgehen
    const ownerResp = await sendMail({
      apiKey,
      from: fromHeader,
      to: toOwner,
      replyTo: payload.email,
      subject: `Neue Anfrage: ${payload.name}${payload.service ? ' – ' + payload.service : ''}`,
      html: ownerHtml(payload),
      text: ownerText(payload)
    });

    if (!ownerResp.ok) {
      const errText = await ownerResp.text();
      console.error('Resend (owner) Fehler:', ownerResp.status, errText);
      return res.status(502).json({ error: 'Versand fehlgeschlagen. Bitte später erneut versuchen oder telefonisch melden.' });
    }

    // 2) Bestätigung an Kunden — Fehler hier brechen den Request nicht ab
    try {
      const custResp = await sendMail({
        apiKey,
        from: fromHeader,
        to: payload.email,
        replyTo: toOwner,
        subject: 'Vielen Dank für Ihre Anfrage – bk autotransporte',
        html: customerHtml(payload),
        text: customerText(payload)
      });
      if (!custResp.ok) {
        const errText = await custResp.text();
        console.error('Resend (customer) Fehler:', custResp.status, errText);
      }
    } catch (err) {
      console.error('Customer-Mail-Fehler:', err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Unerwarteter Fehler beim Versand.' });
  }
}
