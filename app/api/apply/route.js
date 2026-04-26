export async function POST(request) {
  try {
    const formData = await request.formData();

    const get = (key) => formData.get(key)?.toString() || '';
    const getAll = (key) => formData.getAll(key).map((v) => v.toString()).filter(Boolean);

    const applicant = {
      name: `${get('firstName')} ${get('lastName')}`.trim(),
      email: get('email'),
      phone: get('phone'),
      locationTz: get('locationTz'),
      role: get('role'),
      years: get('years'),
      industries: getAll('industries'),
      tools: getAll('tools'),
      hours: get('hours'),
      q1: get('q1'),
      q2: get('q2'),
      q3: get('q3'),
      q4: get('q4'),
      q5: get('q5'),
      projectContext: get('projectContext'),
      timeline: get('timeline'),
      storyFull: get('storyFull'),
      biggestUnlock: get('biggestUnlock'),
      rate: get('rate'),
      startDate: get('startDate'),
      links: get('links'),
      other: get('other'),
    };

    let questions = null;
    try {
      const raw = get('questions');
      if (raw) questions = JSON.parse(raw);
    } catch {}

    // Convert uploaded files to Resend attachment format
    const fileEntries = formData.getAll('files');
    const attachments = [];
    for (const file of fileEntries) {
      if (file instanceof File && file.size > 0) {
        const buf = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(buf).toString('base64'),
        });
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured — skipping email');
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
        reply_to: applicant.email,
        subject: `Application: ${applicant.role} — ${applicant.name}`,
        html: buildEmailHtml(applicant, questions, attachments.length),
        ...(attachments.length > 0 && { attachments }),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', errText);
      return Response.json({ error: 'Email delivery failed' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('apply route error:', err);
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

function buildEmailHtml(applicant, questions, fileCount) {
  const q = (i) => {
    const item = questions?.[i];
    return typeof item === 'string' ? item : item?.question || `Question ${i + 1}`;
  };

  const section = (title, body) => `
    <div style="margin:0 0 32px;">
      <div style="font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#667eea;margin:0 0 16px;padding-bottom:10px;border-bottom:1px solid rgba(102,126,234,0.2);">${title}</div>
      ${body}
    </div>`;

  const row = (label, value) =>
    value
      ? `<div style="margin-bottom:12px;"><div style="font-size:11px;color:#9ca3af;margin-bottom:3px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;">${label}</div><div style="font-size:14px;color:#f3f4f6;line-height:1.6;">${esc(value)}</div></div>`
      : '';

  const answer = (question, answer) => `
    <div style="margin-bottom:20px;padding:16px 18px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid rgba(102,126,234,0.45);">
      <div style="font-size:13px;color:#c4b5fd;margin-bottom:10px;font-style:italic;">${esc(question)}</div>
      <div style="font-size:14px;color:#f3f4f6;line-height:1.7;white-space:pre-wrap;">${esc(answer)}</div>
    </div>`;

  const answers = [applicant.q1, applicant.q2, applicant.q3, applicant.q4, applicant.q5];

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Application</title></head>
<body style="background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f3f4f6;margin:0;padding:36px 20px;">
<div style="max-width:660px;margin:0 auto;">

  <div style="margin-bottom:28px;">
    <div style="font-size:28px;font-weight:900;color:#667eea;">JZ.</div>
    <div style="font-size:12px;color:#6b7280;margin-top:2px;font-weight:500;">Smart Media — New Application Received</div>
  </div>

  <div style="background:linear-gradient(135deg,rgba(102,126,234,0.12),rgba(118,75,162,0.12));border:1px solid rgba(102,126,234,0.25);border-radius:12px;padding:24px 28px;margin-bottom:32px;">
    <div style="font-size:22px;font-weight:700;margin-bottom:4px;">${esc(applicant.name)}</div>
    <div style="font-size:14px;color:#a5b4fc;margin-bottom:14px;">${esc(applicant.role)}</div>
    <div style="font-size:13px;color:#9ca3af;line-height:2;">
      <a href="mailto:${esc(applicant.email)}" style="color:#667eea;text-decoration:none;">${esc(applicant.email)}</a><br>
      ${esc(applicant.phone)} &nbsp;·&nbsp; ${esc(applicant.locationTz)}
    </div>
  </div>

  ${section('Background',
    row('Role Applied For', applicant.role) +
    row('Years of Experience', applicant.years) +
    row('Hours Per Week Available', applicant.hours) +
    row('Industries Worked In', applicant.industries.join(', ')) +
    row('Tools Used Daily', applicant.tools.join(', '))
  )}

  ${section('Technical Assessment',
    answers.map((a, i) => answer(q(i), a)).join('')
  )}

  ${section('Proof of Work',
    row('Project Context', applicant.projectContext) +
    row('Engagement Timeline', applicant.timeline) +
    answer('Full Story: BEFORE / WHAT YOU DID / AFTER', applicant.storyFull) +
    answer('Biggest Unlock', applicant.biggestUnlock) +
    row('Proof Files Attached', `${fileCount} file${fileCount !== 1 ? 's' : ''}`)
  )}

  ${section('Logistics',
    row('Expected Hourly Rate', applicant.rate) +
    row('Earliest Start Date', applicant.startDate) +
    (applicant.links ? row('Portfolio / Links', applicant.links) : '') +
    (applicant.other ? row('Additional Notes', applicant.other) : '')
  )}

  <div style="margin-top:36px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);text-align:center;font-size:11px;color:#6b7280;">
    JZ Smart Media Careers &nbsp;·&nbsp; ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  </div>
</div>
</body></html>`;
}
