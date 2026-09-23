import supabase from '@/lib/supabase';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const get = (key) => formData.get(key)?.toString().trim() || '';

    const candidate = {
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      position: get('position'),
      linkedin: get('linkedin'),
      tz: get('tz'),
      preferred: get('preferred'),
      notes: get('notes'),
    };

    // Basic server-side validation
    if (!candidate.name || !candidate.email || !candidate.phone || !candidate.position || !candidate.tz) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Resume attachment (PDF / Word, max 10 MB)
    const attachments = [];
    const resume = formData.get('resume');
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > 10 * 1024 * 1024) {
        return Response.json({ error: 'Resume exceeds 10 MB' }, { status: 400 });
      }
      const buf = await resume.arrayBuffer();
      attachments.push({ filename: resume.name, content: Buffer.from(buf).toString('base64') });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('[interview] RESEND_API_KEY not configured — skipping email');
      return Response.json({ success: true, dev: true });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'JZ Smart Media Careers <careers@jzsmartmedia.com>',
        to: ['yarden@jzsmartmedia.com', 'assistant@jzsmartmedia.com'],
        reply_to: candidate.email,
        subject: `Interview request: ${candidate.position} — ${candidate.name}`,
        html: buildEmailHtml(candidate, attachments.length),
        ...(attachments.length > 0 && { attachments }),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('[interview] Resend error:', errText);
      return Response.json({ error: 'Email delivery failed' }, { status: 500 });
    }

    // Persist so interview requests show up in the admin dashboard alongside
    // leads and applications. Never fail the candidate's submission over a
    // storage error — the notification email has already gone out.
    if (process.env.SUPABASE_URL) {
      const { error } = await supabase.from('interview_requests').insert({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        linkedin: candidate.linkedin || null,
        tz: candidate.tz,
        preferred: candidate.preferred || null,
        notes: candidate.notes || null,
        has_resume: attachments.length > 0,
        ip:
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip') ||
          null,
      });
      if (error) console.error('[interview] Supabase insert failed:', error.message);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[interview] route error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

function buildEmailHtml(c, hasResume) {
  const row = (label, value) =>
    value
      ? `<div style="margin-bottom:14px;"><div style="font-size:11px;color:#9ca3af;margin-bottom:3px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;">${label}</div><div style="font-size:14px;color:#f3f4f6;line-height:1.6;">${esc(value)}</div></div>`
      : '';

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Interview Request</title></head>
<body style="background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f3f4f6;margin:0;padding:36px 20px;">
<div style="max-width:620px;margin:0 auto;">

  <div style="margin-bottom:28px;">
    <div style="font-size:28px;font-weight:900;color:#ec4899;">JZ.</div>
    <div style="font-size:12px;color:#6b7280;margin-top:2px;font-weight:500;">Smart Media — Interview Request Received</div>
  </div>

  <div style="background:linear-gradient(135deg,rgba(236,72,153,0.12),rgba(244,63,94,0.12));border:1px solid rgba(236,72,153,0.25);border-radius:12px;padding:24px 28px;margin-bottom:32px;">
    <div style="font-size:22px;font-weight:700;margin-bottom:4px;">${esc(c.name)}</div>
    <div style="font-size:14px;color:#f9a8d4;margin-bottom:14px;">Interviewing for: ${esc(c.position)}</div>
    <div style="font-size:13px;color:#9ca3af;line-height:2;">
      <a href="mailto:${esc(c.email)}" style="color:#ec4899;text-decoration:none;">${esc(c.email)}</a><br>
      ${esc(c.phone)} &nbsp;·&nbsp; ${esc(c.tz)}
    </div>
  </div>

  <div style="margin:0 0 24px;">
    <div style="font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#ec4899;margin:0 0 16px;padding-bottom:10px;border-bottom:1px solid rgba(236,72,153,0.2);">Details</div>
    ${row('Position', c.position)}
    ${row('Time Zone', c.tz)}
    ${row('LinkedIn / Portfolio', c.linkedin)}
    ${row('Preferred Times', c.preferred)}
    ${row('Notes', c.notes)}
    ${row('Resume Attached', hasResume ? 'Yes — see attachment' : 'No')}
  </div>

  <div style="margin-top:36px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);text-align:center;font-size:11px;color:#6b7280;">
    JZ Smart Media Careers &nbsp;·&nbsp; ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  </div>
</div>
</body></html>`;
}
