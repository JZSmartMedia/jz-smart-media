'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeadsTable from './leads/LeadsTable';
import ApplicationsTable from './applications/ApplicationsTable';
import InterviewsTable from './InterviewsTable';

const TABS = [
  {
    key: 'leads',
    label: 'Client Leads',
    hint: 'Homepage + /v2 audit requests',
    accent: '#667eea',
  },
  {
    key: 'applications',
    label: 'Job Applications',
    hint: 'Careers form — hiring',
    accent: '#a78bfa',
  },
  {
    key: 'interviews',
    label: 'Interview Requests',
    hint: '/schedule booking form',
    accent: '#f472b6',
  },
];

export default function AdminDashboard({
  initialTab,
  leads,
  applications,
  interviews,
  interviewsTableMissing,
  stats,
}) {
  const router = useRouter();
  const [tab, setTab] = useState(TABS.some((t) => t.key === initialTab) ? initialTab : 'leads');
  const [loggingOut, setLoggingOut] = useState(false);

  const counts = {
    leads: leads.length,
    applications: applications.length,
    interviews: interviews.length,
  };

  const logout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/login', { method: 'DELETE' }).catch(() => {});
    router.replace('/admin/login');
    router.refresh();
  };

  const active = TABS.find((t) => t.key === tab);

  return (
    <div style={{
      background: '#0a0a0a', minHeight: '100vh', color: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#667eea', lineHeight: 1 }}>JZ.</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>Admin Dashboard</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              {counts.leads} leads · {counts.applications} applications · {counts.interviews} interview requests
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af',
            }}
          >
            {loggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 0 }}>
          {TABS.map(({ key, label, hint, accent }) => {
            const on = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                style={{
                  position: 'relative', textAlign: 'left', padding: '12px 18px 14px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  borderBottom: `2px solid ${on ? accent : 'transparent'}`, marginBottom: -1,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: on ? '#f3f4f6' : '#9ca3af' }}>
                  {label}
                  <span style={{
                    marginLeft: 8, padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: on ? `${accent}22` : 'rgba(255,255,255,0.05)',
                    color: on ? accent : '#6b7280',
                  }}>
                    {counts[key]}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: on ? '#6b7280' : '#4b5563', marginTop: 3 }}>{hint}</div>
              </button>
            );
          })}
        </div>

        {/* Stats for the active tab */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 28 }}>
          {(stats[tab] || []).map(({ label, value, color, sub }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 6, fontWeight: 500 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Panes — only the active one renders */}
        {tab === 'leads' && <LeadsTable rows={leads} />}
        {tab === 'applications' && <ApplicationsTable rows={applications} />}
        {tab === 'interviews' && (
          <InterviewsTable rows={interviews} tableMissing={interviewsTableMissing} />
        )}

        <div style={{ marginTop: 28, fontSize: 11, color: '#4b5563' }}>
          Viewing <strong style={{ color: '#6b7280' }}>{active?.label}</strong> · data is read live from Supabase on each page load.
        </div>
      </div>
    </div>
  );
}
