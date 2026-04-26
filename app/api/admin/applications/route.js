import supabase from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.ADMIN_SECRET;
  if (secret && searchParams.get('secret') !== secret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.SUPABASE_URL) {
    return Response.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const status = searchParams.get('status');   // ?status=submitted
  const limit  = Math.min(parseInt(searchParams.get('limit') || '500'), 1000);

  let query = supabase
    .from('applications')
    .select('id,ip,status,step,completion_pct,name,email,phone,location_tz,role,years,industries,tools,hours,answers,project_context,timeline,story_full,biggest_unlock,rate,start_date,links,other,file_count,ai_used,ai_attempted,step_times,refresh_count,device,submitted_at,created_at,updated_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ count: data.length, applications: data }, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.ADMIN_SECRET;
  if (secret && searchParams.get('secret') !== secret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = searchParams.get('id');
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase.from('applications').delete().eq('id', id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true });
}
