import supabase from '@/lib/supabase';

// Pipeline stages a lead can move through. Nothing is ever hard-deleted —
// 'archived' is the terminal state, so a mis-click can't destroy a prospect.
const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'archived'];

// Authentication is handled in middleware.js (session cookie, or ?secret= for
// legacy bookmarks), so by the time a request lands here it is already trusted.
function authorize() {
  if (!process.env.SUPABASE_URL) {
    return Response.json({ error: 'Supabase not configured' }, { status: 503 });
  }
  return null;
}

export async function GET(request) {
  const denied = authorize();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const source = searchParams.get('source');
  const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10), 1000);

  let query = supabase
    .from('leads')
    .select('id,created_at,name,business,phone,email,industry,market,challenge,source,status,notes,ip,user_agent,referer')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (status) query = query.eq('status', status);
  if (source) query = query.eq('source', source);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ count: data.length, leads: data });
}

// Move a lead through the pipeline, or save a note against it.
export async function PATCH(request) {
  const denied = authorize();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

  let body = {};
  try { body = await request.json(); } catch {}

  const update = {};
  if (typeof body.status === 'string') {
    if (!STATUSES.includes(body.status)) {
      return Response.json({ error: `status must be one of: ${STATUSES.join(', ')}` }, { status: 400 });
    }
    update.status = body.status;
  }
  if (typeof body.notes === 'string') update.notes = body.notes.slice(0, 5000);

  if (Object.keys(update).length === 0) {
    return Response.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('leads')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, lead: data });
}
