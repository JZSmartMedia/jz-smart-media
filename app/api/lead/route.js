import supabase from '@/lib/supabase';

const NOTIFY_TO = ['yarden@jzsmartmedia.com', 'assistant@jzsmartmedia.com'];

const INDUSTRY_LABELS = {
  roofing: 'Roofing',
  hvac: 'HVAC',
  restoration: 'Restoration',
  remodeling: 'Remodeling',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  landscaping: 'Landscaping',
  // V2 audit form adds these trades
  'garage-door': 'Garage Door',
  locksmith: 'Locksmith',
  chimney: 'Chimney',
  'other-home-service': 'Other Home Service',
  other: 'Other',
};

const SOURCE_LABELS = {
  hero: 'Homepage — Hero Form',
  contact: 'Homepage — Contact Section',
  'v2-audit': 'V2 — Free Growth Audit',
};

const SOURCES = Object.keys(SOURCE_LABELS);

export async function POST(request) {
  try {
    const body = await request.json();
    const str = (v) => (typeof v === 'string' ? v.trim() : '');

    // Honeypot — bots fill hidden fields, humans never see them.
    if (str(body.website)) {
      console.warn('[lead] honeypot triggered — dropping submission');
      return Response.json({ success: true });
    }

    const rawSource = str(body.source);
    const lead = {
      name: str(body.name),
      business: str(body.business),
      phone: str(body.phone),
      email: str(body.email),
      industry: str(body.industry),
      // V2 audit form only — the homepage forms never send these.
      market: str(body.market),
      challenge: str(body.challenge),
      source: SOURCES.includes(rawSource) ? rawSource : 'contact',
    };

    // Server-side validation — never trust the client.
    if (!lead.name || !lead.phone || !lead.email || !lead.industry) {
      return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (lead.phone.replace(/\D/g, '').length < 7) {
      return Response.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      null;
    const userAgent = request.headers.get('user-agent') || null;
    const referer = request.headers.get('referer') || null;

    if (!process.env.RESEND_API_KEY) {
      console.warn('[lead] RESEND_API_KEY not configured — skipping email');
    } else {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'JZ Smart Media Leads <leads@jzsmartmedia.com>',
          to: NOTIFY_TO,
          reply_to: lead.email,
          subject: `New Audit Request: ${lead.name}${lead.business ? ` — ${lead.business}` : ''}`,
          html: buildEmailHtml(lead, { ip, referer }),
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('[lead] Resend error:', errText);
        return Response.json({ error: 'We could not send your request. Please call (352) 755-6501.' }, { status: 502 });
      }
    }

    // Persist to Supabase. Never fail the visitor's submission over a storage error —
    // the notification email has already gone out at this point.
    if (process.env.SUPABASE_URL) {
      // market/challenge are only included when actually supplied, so the
      // homepage forms keep working even before those columns are added.
      const { error } = await supabase.from('leads').insert({
        name: lead.name,
        business: lead.business || null,
        phone: lead.phone,
        email: lead.email,
        industry: lead.industry,
        source: lead.source,
        ip,
        user_agent: userAgent,
        referer,
        ...(lead.market && { market: lead.market }),
        ...(lead.challenge && { challenge: lead.challenge }),
      });
      if (error) console.error('[lead] Supabase insert failed:', error.message);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[lead] route error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildEmailHtml(lead, meta) {
  const row = (label, value, href) =>
    value
      ? `<tr>
           <td style="padding:10px 0;font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;width:150px;vertical-align:top;">${label}</td>
           <td style="padding:10px 0;font-size:15px;color:#f3f4f6;line-height:1.5;">${
             href ? `<a href="${esc(href)}" style="color:#a5b4fc;text-decoration:none;">${esc(value)}</a>` : esc(value)
           }</td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>New Audit Request</title></head>
<body style="background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f3f4f6;margin:0;padding:36px 20px;">
<div style="max-width:620px;margin:0 auto;">

  <div style="margin-bottom:28px;">
    <div style="font-size:28px;font-weight:900;color:#667eea;">JZ.</div>
    <div style="font-size:12px;color:#6b7280;margin-top:2px;font-weight:500;">Smart Media — New Audit Request</div>
  </div>

  <div style="background:linear-gradient(135deg,rgba(102,126,234,0.12),rgba(240,147,251,0.10));border:1px solid rgba(102,126,234,0.25);border-radius:12px;padding:24px 28px;margin-bottom:28px;">
    <div style="font-size:22px;font-weight:700;margin-bottom:4px;">${esc(lead.name)}</div>
    <div style="font-size:14px;color:#a5b4fc;">${esc(lead.business || INDUSTRY_LABELS[lead.industry] || lead.industry)}</div>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    ${row('Phone', lead.phone, `tel:${lead.phone.replace(/[^\d+]/g, '')}`)}
    ${row('Email', lead.email, `mailto:${lead.email}`)}
    ${row('Business', lead.business)}
    ${row('Industry', INDUSTRY_LABELS[lead.industry] || lead.industry)}
    ${row('Primary Market', lead.market)}
    ${row('Biggest Challenge', lead.challenge)}
    ${row('Submitted From', SOURCE_LABELS[lead.source] || lead.source)}
    ${row('Page', meta.referer)}
    ${row('IP Address', meta.ip)}
  </table>

  <div style="margin-top:28px;padding:16px 20px;background:rgba(240,147,251,0.08);border-left:3px solid #f093fb;border-radius:6px;font-size:13px;color:#f9a8d4;">
    They were promised a response <strong>within 30 minutes</strong>.
  </div>

  <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);text-align:center;font-size:11px;color:#6b7280;">
    JZ Smart Media &nbsp;·&nbsp; ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
  </div>
</div>
</body></html>`;
}
