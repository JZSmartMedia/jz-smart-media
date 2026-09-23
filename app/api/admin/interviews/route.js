import supabase from '@/lib/supabase';

// Nothing is ever hard-deleted — 'archived' is the terminal state.
const STATUSES = ['new', 'scheduled', 'met', 'hired', 'passed', 'archived'];

const COLUMNS =
  'id,created_at,name,email,phone,position,linkedin,tz,preferred,notes,has_resume,ip,status,admin_notes';

export async function GET(request) {
  if (!process.env.SUPABASE_URL) {
    return Response.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10), 1000);

  let query = supabase
    .from('interview_requests')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    // The table is optional until its migration is run — say so plainly
    // instead of surfacing a raw Postgres error as a 500.
    if (isMissingTable(error)) {
      return Response.json(
        {
          count: 0,
          interviews: [],
          tableMissing: true,
          hint: 'Run supabase/interview_requests.sql in Supabase → SQL Editor to start storing interview requests.',
        },
        { status: 200 },
      );
    }
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ count: data.length, interviews: data });
}

function isMissingTable(error) {
  return /relation|does not exist|schema cache/i.test(error?.message || '');
}

export async function PATCH(request) {
  if (!process.env.SUPABASE_URL) {
    return Response.json({ error: 'Supabase not configured' }, { status: 503 });
  }

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
  if (typeof body.admin_notes === 'string') update.admin_notes = body.admin_notes.slice(0, 5000);

  if (Object.keys(update).length === 0) {
    return Response.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('interview_requests')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, interview: data });
}
