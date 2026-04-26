import supabase from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ApplicationsTable from './ApplicationsTable';

export const dynamic = 'force-dynamic';

function pctColor(pct) {
  if (pct >= 100) return '#34d399';
  if (pct >= 80)  return '#a78bfa';
  if (pct >= 60)  return '#fbbf24';
  return '#f87171';
}

export default async function AdminApplicationsPage({ searchParams }) {
  const params = await searchParams;
  const secret = process.env.ADMIN_SECRET;
  if (secret && params?.secret !== secret) return notFound();

  if (!process.env.SUPABASE_URL) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#9ca3af', fontFamily: 'sans-serif' }}>
        Supabase not configured.
      </div>
    );
  }

  const { data: rows = [], error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) console.error('[admin] Supabase error:', error.message);

  const submitted    = rows.filter((r) => r.status === 'submitted');
  const inProgress   = rows.filter((r) => r.status === 'in_progress');
  const timedOut     = rows.filter((r) => r.status === 'timed_out');
  const aiUsed       = rows.filter((r) => r.ai_used);
  const highRefresh  = rows.filter((r) => (r.refresh_count ?? 0) > 1);
  const pct80plus    = rows.filter((r) => (r.completion_pct ?? 0) >= 80);

  // Average time on step 3 (how they think) for submitted applicants
  const step3Times = submitted.map((r) => r.step_times?.[3]).filter(Boolean);
  const avgStep3 = step3Times.length ? Math.round(step3Times.reduce((a, b) => a + b, 0) / step3Times.length) : null;

  const apiUrl = `/api/admin/applications?secret=${params?.secret ?? ''}`;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f3f4f6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#667eea' }}>JZ.</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f3f4f6', marginTop: 4 }}>Applications Dashboard</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{rows.length} total sessions · last updated now</div>
          </div>
          <a
            href={apiUrl}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.3)', color: '#a5b4fc', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            JSON API
          </a>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 32 }}>
          {[
            { label: 'Submitted',        value: submitted.length,   color: '#34d399', sub: '100% complete' },
            { label: '80%+ complete',    value: pct80plus.length,   color: '#a78bfa', sub: 'strong intent' },
            { label: 'In Progress',      value: inProgress.length,  color: '#60a5fa', sub: 'still active' },
            { label: 'Timed Out',        value: timedOut.length,    color: '#f87171', sub: 'didn\'t finish' },
            { label: 'Used AI Qs',       value: aiUsed.length,      color: '#c084fc', sub: 'vs default' },
            { label: 'Tried to Leave',   value: highRefresh.length, color: '#fb923c', sub: '2+ refreshes' },
          ].map(({ label, value, color, sub }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 6, fontWeight: 500 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* AI & Behavior insights bar */}
        {rows.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, padding: '14px 20px', background: 'rgba(102,126,234,0.06)', border: '1px solid rgba(102,126,234,0.15)', borderRadius: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#667eea' }}>AI Insights</span>
            <Insight label="AI question rate" value={`${submitted.length ? Math.round((aiUsed.filter(r => r.status === 'submitted').length / submitted.length) * 100) : 0}% of submissions used AI Qs`} />
            {avgStep3 && <Insight label="Avg time on 'How you think'" value={`${Math.floor(avgStep3 / 60)}m ${avgStep3 % 60}s`} />}
            <Insight label="Drop-off" value={`${timedOut.length} timed out, ${inProgress.length} still in progress`} />
            <Insight label="Evasion attempts" value={`${rows.reduce((a, r) => a + (r.refresh_count ?? 0), 0)} total refresh attempts across all sessions`} />
          </div>
        )}

        {/* Table */}
        <ApplicationsTable rows={rows} />
      </div>
    </div>
  );
}

function Insight({ label, value }) {
  return (
    <div style={{ fontSize: 12, color: '#9ca3af' }}>
      <span style={{ color: '#6b7280' }}>{label}: </span>
      <span style={{ color: '#d1d5db', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
