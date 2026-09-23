'use client';

import { useMemo, useState } from 'react';

const STATUS_META = {
  new:       { label: 'New',       color: '#60a5fa' },
  scheduled: { label: 'Scheduled', color: '#fbbf24' },
  met:       { label: 'Met',       color: '#a78bfa' },
  hired:     { label: 'Hired',     color: '#34d399' },
  passed:    { label: 'Passed',    color: '#f87171' },
  archived:  { label: 'Archived',  color: '#6b7280' },
};

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default function InterviewsTable({ rows: initialRows, tableMissing }) {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState('');

  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  const patch = async (id, payload) => {
    setSaving(id);
    setError('');
    try {
      const res = await fetch(`/api/admin/interviews?id=${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Update failed');
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...data.interview } : r)));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(null);
    }
  };

  if (tableMissing) {
    return (
      <div style={{ padding: '26px 24px', borderRadius: 12, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fcd34d', marginBottom: 10 }}>
          Interview requests aren&rsquo;t being stored yet
        </div>
        <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, margin: 0 }}>
          The booking form on <code style={{ color: '#c4b5fd' }}>/schedule</code> currently emails the
          team and keeps no record. The code to save them is already live — it just needs the table.
          Run <code style={{ color: '#c4b5fd' }}>supabase/interview_requests.sql</code> in
          Supabase → SQL Editor and new bookings will appear here automatically.
        </p>
        <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12, marginBottom: 0 }}>
          Nothing breaks in the meantime — candidates still get through and you still get the email.
        </p>
      </div>
    );
  }

  const chip = (active) => ({
    padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
    background: active ? 'rgba(102,126,234,0.18)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${active ? 'rgba(102,126,234,0.5)' : 'rgba(255,255,255,0.08)'}`,
    color: active ? '#a5b4fc' : '#9ca3af',
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        <button type="button" style={chip(filter === 'all')} onClick={() => setFilter('all')}>
          All ({rows.length})
        </button>
        {Object.entries(STATUS_META).map(([key, { label, color }]) => {
          const n = rows.filter((r) => r.status === key).length;
          if (!n && ['archived', 'passed'].includes(key)) return null;
          return (
            <button key={key} type="button" style={chip(filter === key)} onClick={() => setFilter(key)}>
              <span style={{ color, marginRight: 6 }}>●</span>{label} ({n})
            </button>
          );
        })}
      </div>

      {error && (
        <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.35)', color: '#fca5a5', fontSize: 12 }}>
          {error}
        </div>
      )}

      <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.1fr 1fr 0.9fr 0.9fr 40px', gap: 12, padding: '12px 18px', background: 'rgba(255,255,255,0.03)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6b7280' }}>
          <span>Candidate</span><span>Contact</span><span>Position</span><span>Timezone</span><span>Status</span><span />
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '46px 20px', textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
            {rows.length === 0
              ? 'No interview requests yet. Bookings from /schedule will appear here.'
              : 'No requests match this filter.'}
          </div>
        )}

        {filtered.map((row) => {
          const meta = STATUS_META[row.status] || STATUS_META.new;
          const isOpen = expanded === row.id;
          return (
            <div key={row.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                onClick={() => setExpanded(isOpen ? null : row.id)}
                style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.1fr 1fr 0.9fr 0.9fr 40px', gap: 12, padding: '16px 18px', alignItems: 'center', cursor: 'pointer', fontSize: 13 }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{row.name || '—'}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{fmtDate(row.created_at)}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <div>{row.phone || '—'}</div>
                  <div style={{ fontSize: 11, marginTop: 3, wordBreak: 'break-all' }}>{row.email || '—'}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{row.position || '—'}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{row.tz || '—'}</div>
                <div>
                  <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 20, background: `${meta.color}1a`, border: `1px solid ${meta.color}55`, color: meta.color, fontSize: 11, fontWeight: 600 }}>
                    {meta.label}
                  </span>
                </div>
                <div style={{ textAlign: 'right', color: '#4b5563', fontSize: 16 }}>{isOpen ? '−' : '+'}</div>
              </div>

              {isOpen && (
                <div style={{ padding: '4px 18px 22px', background: 'rgba(255,255,255,0.015)' }} onClick={(e) => e.stopPropagation()}>
                  {row.notes && (
                    <div style={{ marginBottom: 18, padding: '14px 16px', borderRadius: 8, background: 'rgba(102,126,234,0.06)', borderLeft: '3px solid rgba(102,126,234,0.5)' }}>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', marginBottom: 7 }}>Candidate notes</div>
                      <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{row.notes}</div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 18 }}>
                    <Detail label="Preferred time" value={row.preferred} />
                    <Detail label="LinkedIn" value={row.linkedin} wrap />
                    <Detail label="Resume attached" value={row.has_resume ? 'Yes — sent by email' : 'No'} />
                    <Detail label="IP address" value={row.ip} />
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#6b7280', marginRight: 4 }}>Move to:</span>
                    {Object.entries(STATUS_META).map(([key, { label, color }]) => (
                      <button
                        key={key}
                        type="button"
                        disabled={saving === row.id || row.status === key}
                        onClick={() => patch(row.id, { status: key })}
                        style={{
                          padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600,
                          cursor: row.status === key ? 'default' : 'pointer',
                          background: row.status === key ? `${color}22` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${row.status === key ? color + '77' : 'rgba(255,255,255,0.09)'}`,
                          color: row.status === key ? color : '#9ca3af',
                          opacity: saving === row.id ? 0.5 : 1,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <a href={`mailto:${row.email}`} style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 600, background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.4)', color: '#a5b4fc', textDecoration: 'none' }}>
                      Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value, wrap }) {
  return (
    <div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#4b5563', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#9ca3af', wordBreak: wrap ? 'break-all' : 'normal' }}>{value || '—'}</div>
    </div>
  );
}
