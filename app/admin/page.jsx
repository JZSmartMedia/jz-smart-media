import supabase from '@/lib/supabase';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

// Auth is enforced in middleware.js — nothing unauthenticated reaches here.
export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const initialTab = typeof params?.tab === 'string' ? params.tab : 'leads';

  if (!process.env.SUPABASE_URL) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0a0a', color: '#9ca3af', fontFamily: 'sans-serif' }}>
        Supabase not configured.
      </div>
    );
  }

  const [leadsRes, appsRes, interviewsRes] = await Promise.all([
    supabase
      .from('leads')
      .select('id,created_at,name,business,phone,email,industry,market,challenge,source,status,notes,ip,user_agent,referer')
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('interview_requests')
      .select('id,created_at,name,email,phone,position,linkedin,tz,preferred,notes,has_resume,ip,status,admin_notes')
      .order('created_at', { ascending: false })
      .limit(500),
  ]);

  const leads = leadsRes.data ?? [];
  const applications = appsRes.data ?? [];
  const interviews = interviewsRes.data ?? [];

  // The interview table is optional until its migration is run — treat a
  // missing relation as "not set up yet" rather than an error.
  const interviewsTableMissing =
    !!interviewsRes.error && /relation|does not exist|schema cache/i.test(interviewsRes.error.message);

  if (leadsRes.error) console.error('[admin] leads:', leadsRes.error.message);
  if (appsRes.error) console.error('[admin] applications:', appsRes.error.message);
  if (interviewsRes.error && !interviewsTableMissing) {
    console.error('[admin] interview_requests:', interviewsRes.error.message);
  }

  const now = Date.now();
  const within7d = (r) => now - new Date(r.created_at).getTime() < 7 * 864e5;
  const countBy = (rows, fn) => rows.filter(fn).length;

  const wonLeads = countBy(leads, (r) => r.status === 'won');
  const closedLeads = countBy(leads, (r) => ['won', 'lost'].includes(r.status));
  const winRate = closedLeads ? Math.round((wonLeads / closedLeads) * 100) : null;

  const submitted = countBy(applications, (r) => r.status === 'submitted');

  const stats = {
    leads: [
      { label: 'New', value: countBy(leads, (r) => r.status === 'new'), color: '#60a5fa', sub: 'awaiting first contact' },
      { label: 'Last 7 days', value: countBy(leads, within7d), color: '#a78bfa', sub: 'recent volume' },
      { label: 'Contacted', value: countBy(leads, (r) => r.status === 'contacted'), color: '#fbbf24', sub: 'in conversation' },
      { label: 'Qualified', value: countBy(leads, (r) => r.status === 'qualified'), color: '#c084fc', sub: 'real opportunity' },
      { label: 'Won', value: wonLeads, color: '#34d399', sub: winRate !== null ? `${winRate}% win rate` : 'no closes yet' },
      { label: 'Lost', value: countBy(leads, (r) => r.status === 'lost'), color: '#f87171', sub: 'closed out' },
    ],
    applications: [
      { label: 'Submitted', value: submitted, color: '#34d399', sub: '100% complete' },
      { label: 'Last 7 days', value: countBy(applications, within7d), color: '#a78bfa', sub: 'recent volume' },
      { label: 'In progress', value: countBy(applications, (r) => r.status === 'in_progress'), color: '#60a5fa', sub: 'still active' },
      { label: 'Timed out', value: countBy(applications, (r) => r.status === 'timed_out'), color: '#f87171', sub: "didn't finish" },
      { label: 'Used AI Qs', value: countBy(applications, (r) => r.ai_used), color: '#c084fc', sub: 'vs default' },
      { label: 'Tried to leave', value: countBy(applications, (r) => (r.refresh_count ?? 0) > 1), color: '#fb923c', sub: '2+ refreshes' },
    ],
    interviews: [
      { label: 'New', value: countBy(interviews, (r) => r.status === 'new'), color: '#60a5fa', sub: 'needs scheduling' },
      { label: 'Last 7 days', value: countBy(interviews, within7d), color: '#a78bfa', sub: 'recent volume' },
      { label: 'Scheduled', value: countBy(interviews, (r) => r.status === 'scheduled'), color: '#fbbf24', sub: 'booked in' },
      { label: 'Met', value: countBy(interviews, (r) => r.status === 'met'), color: '#c084fc', sub: 'interview done' },
      { label: 'Hired', value: countBy(interviews, (r) => r.status === 'hired'), color: '#34d399', sub: 'joined the team' },
      { label: 'With resume', value: countBy(interviews, (r) => r.has_resume), color: '#f472b6', sub: 'sent by email' },
    ],
  };

  return (
    <AdminDashboard
      initialTab={initialTab}
      leads={leads}
      applications={applications}
      interviews={interviews}
      interviewsTableMissing={interviewsTableMissing}
      stats={stats}
    />
  );
}
