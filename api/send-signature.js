// Einmalig: Schickt die E-Mail-Signatur an CONTACT_TO_EMAIL.
// Nach erfolgreichem Versand kann diese Datei gelöscht werden.
// Aufruf: GET https://bk-autotransporte.de/api/send-signature

const SIGNATURE = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a2533;font-size:14px;line-height:1.5;border-collapse:collapse;">
  <tr>
    <td style="border-left:4px solid #00A8F0;padding:6px 0 6px 18px;">

      <div style="font-size:19px;font-weight:800;color:#0A1628;letter-spacing:-0.01em;line-height:1.2;">
        bk <span style="color:#00A8F0;">autotransporte</span>
      </div>
      <div style="font-size:12px;color:#6b7280;margin-top:3px;letter-spacing:0.02em;">
        schnell &middot; zuverlässig &middot; kompetent
      </div>

      <div style="margin-top:14px;font-size:15px;font-weight:700;color:#0A1628;">
        Bilal Kilic
      </div>
      <div style="font-size:13px;color:#6b7280;margin-top:1px;">
        Inhaber &middot; IHK-geprüfter Verkehrsleiter
      </div>

      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;font-size:13px;border-collapse:collapse;">
        <tr>
          <td style="color:#6b7280;padding:3px 14px 3px 0;vertical-align:top;font-weight:600;">Tel</td>
          <td style="padding:3px 0;vertical-align:top;">
            <a href="tel:+491723831549" style="color:#0A1628;text-decoration:none;font-weight:600;">0172 383 1549</a>
            <span style="color:#6b7280;">&nbsp;&middot;&nbsp;</span>
            <a href="https://wa.me/491723831549" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td style="color:#6b7280;padding:3px 14px 3px 0;vertical-align:top;font-weight:600;">Mail</td>
          <td style="padding:3px 0;vertical-align:top;">
            <a href="mailto:bk-autotransport@web.de" style="color:#0A1628;text-decoration:none;">bk-autotransport@web.de</a>
          </td>
        </tr>
        <tr>
          <td style="color:#6b7280;padding:3px 14px 3px 0;vertical-align:top;font-weight:600;">Web</td>
          <td style="padding:3px 0;vertical-align:top;">
            <a href="https://bk-autotransporte.de" style="color:#00A8F0;text-decoration:none;font-weight:600;">bk-autotransporte.de</a>
          </td>
        </tr>
        <tr>
          <td style="color:#6b7280;padding:3px 14px 3px 0;vertical-align:top;font-weight:600;">Adresse</td>
          <td style="padding:3px 0;vertical-align:top;color:#1a2533;">
            Anton-Heinen-Str. 27, 50181 Bedburg
          </td>
        </tr>
      </table>

      <div style="margin-top:14px;padding-top:10px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;line-height:1.5;">
        Bilal Kilic Autotransporte &middot; Einzelunternehmen &middot; USt-ID: DE333306833
      </div>

    </td>
  </tr>
</table>
`;

const EMAIL_HTML = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eef1f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;box-shadow:0 4px 24px rgba(10,22,40,0.08);">

        <tr>
          <td style="background:#0A1628;padding:30px 32px;border-radius:12px 12px 0 0;">
            <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
              bk <span style="color:#00A8F0;">autotransporte</span>
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">
              Deine neue E-Mail-Signatur
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 32px 8px 32px;color:#1a2533;font-size:15px;line-height:1.65;">
            <p style="margin:0 0 14px 0;">Hallo Bilal,</p>
            <p style="margin:0 0 14px 0;">hier ist deine E-Mail-Signatur. So baust du sie bei web.de ein:</p>
            <ol style="margin:0 0 14px 20px;padding:0;color:#1a2533;">
              <li style="margin-bottom:6px;">Markiere die Signatur unten (alles innerhalb der gestrichelten Linien)</li>
              <li style="margin-bottom:6px;">Kopieren mit <strong>Strg+C</strong> (Windows) bzw. <strong>Cmd+C</strong> (Mac)</li>
              <li style="margin-bottom:6px;">Bei web.de oben rechts auf das Zahnrad → <strong>E-Mail-Einstellungen</strong> → <strong>Signatur</strong></li>
              <li style="margin-bottom:6px;">Im Signatur-Feld einfügen mit <strong>Strg+V</strong> / <strong>Cmd+V</strong> → <strong>Speichern</strong></li>
            </ol>
            <p style="margin:0;font-size:13px;color:#6b7280;">Wichtig: Beim Einfügen den „Formatierten Text"-Modus nutzen, sonst gehen Farben und Layout verloren.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 8px 32px;">
            <div style="border-top:1px dashed #cbd5e1;padding-top:24px;padding-bottom:24px;border-bottom:1px dashed #cbd5e1;">
              ${SIGNATURE}
            </div>
            <div style="text-align:center;font-size:11px;color:#9ca3af;margin-top:10px;text-transform:uppercase;letter-spacing:0.1em;">
              ↑ Diesen Bereich kopieren ↑
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 32px 32px;font-size:13px;color:#6b7280;line-height:1.65;">
            Falls etwas nicht passt — Farbe, Reihenfolge, anderer Titel — sag Bescheid, ich passe sie an.
          </td>
        </tr>

        <tr>
          <td style="background:#f5f7fa;padding:20px 32px;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Automatisch generiert &middot; bk-autotransporte.de
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const EMAIL_TEXT = `Hallo Bilal,

hier ist deine neue E-Mail-Signatur für web.de.

So baust du sie ein:
1. Markiere die Signatur (HTML-Version)
2. Kopieren (Strg+C / Cmd+C)
3. Bei web.de: Zahnrad → E-Mail-Einstellungen → Signatur → Einfügen → Speichern

Hinweis: Im Plain-Text gehen Farben und Layout verloren. Bitte die HTML-Version dieser E-Mail nutzen.

──
bk autotransporte
Bilal Kilic — Inhaber · IHK-geprüfter Verkehrsleiter
Tel: 0172 383 1549 · WhatsApp: wa.me/491723831549
Mail: bk-autotransport@web.de
Web: bk-autotransporte.de
Anton-Heinen-Str. 27, 50181 Bedburg
USt-ID: DE333306833
`;

export default async function handler(req, res) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'RESEND_API_KEY fehlt.' });
    }

    const to = process.env.CONTACT_TO_EMAIL || 'bk-autotransport@web.de';
    const from = process.env.CONTACT_FROM_EMAIL || 'kontakt@bk-autotransporte.de';

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `bk autotransporte <${from}>`,
        to: [to],
        subject: 'Deine neue E-Mail-Signatur – bk autotransporte',
        html: EMAIL_HTML,
        text: EMAIL_TEXT
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('Resend-Fehler:', r.status, errText);
      return res.status(502).json({ error: 'Versand fehlgeschlagen.', detail: errText });
    }

    return res.status(200).json({ ok: true, message: `Signatur wurde an ${to} gesendet.` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}
