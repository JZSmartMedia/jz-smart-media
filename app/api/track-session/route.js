import supabase from '@/lib/supabase';

function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function getDevice(request) {
  const ua = request.headers.get('user-agent') || '';
  if (/mobile|android|iphone|ipad/i.test(ua)) return 'mobile';
  if (/tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, sessionId, step, formSnapshot, behavior } = body;
    const ip = getIP(request);

    // ── Check if IP is blocked ────────────────────────────────────────────────
    if (action === 'check') {
      if (!process.env.SUPABASE_URL) return Response.json({ allowed: true });

      const { data } = await supabase
        .from('applications')
        .select('id, status, step')
        .eq('ip', ip)
        .in('status', ['submitted', 'blocked'])
        .maybeSingle();

      if (data) return Response.json({ allowed: false, reason: data.status });

      const device = getDevice(request);
      const { data: row, error } = await supabase
        .from('applications')
        .insert({ ip, status: 'in_progress', step: 1, completion_pct: 0, device })
        .select('id')
        .single();

      if (error) throw error;
      return Response.json({ allowed: true, sessionId: row.id });
    }

    // ── Save progress ─────────────────────────────────────────────────────────
    if (action === 'progress' && sessionId) {
      if (!process.env.SUPABASE_URL) return Response.json({ ok: true });

      const completion_pct = Math.round(((step - 1) / 5) * 100);
      const update = {
        step,
        completion_pct,
        form_snapshot: formSnapshot,
        updated_at: new Date().toISOString(),
      };
      if (behavior?.stepTimes)    update.step_times    = behavior.stepTimes;
      if (behavior?.aiUsed  != null) update.ai_used    = behavior.aiUsed;
      if (behavior?.aiAttempted != null) update.ai_attempted = behavior.aiAttempted;
      if (behavior?.refreshCount != null) update.refresh_count = behavior.refreshCount;

      await supabase.from('applications').update(update).eq('id', sessionId);
      return Response.json({ ok: true });
    }

    // ── Mark timed out ────────────────────────────────────────────────────────
    if (action === 'timeout' && sessionId) {
      if (!process.env.SUPABASE_URL) return Response.json({ ok: true });

      const update = { status: 'timed_out', updated_at: new Date().toISOString() };
      if (behavior?.stepTimes)       update.step_times    = behavior.stepTimes;
      if (behavior?.aiUsed  != null) update.ai_used       = behavior.aiUsed;
      if (behavior?.aiAttempted != null) update.ai_attempted = behavior.aiAttempted;

      await supabase.from('applications').update(update).eq('id', sessionId);
      return Response.json({ ok: true });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[track-session] Error:', err.message);
    return Response.json({ ok: true });
  }
}
