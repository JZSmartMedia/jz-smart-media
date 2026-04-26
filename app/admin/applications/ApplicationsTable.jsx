'use client';

import { useState } from 'react';

const STATUS_COLORS = {
  submitted:   { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  text: '#34d399' },
  in_progress: { bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.3)',  text: '#fbbf24' },
  timed_out:   { bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.25)',  text: '#f87171' },
  blocked:     { bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.2)', text: '#9ca3af' },
};

function pctColor(pct) {
  if (pct >= 100) return '#34d399';
  if (pct >= 80)  return '#a78bfa';
  if (pct >= 60)  return '#fbbf24';
  return '#f87171';
}

function formatSecs(s) {
  if (!s || s < 60) return `${s || 0}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function AiBadge({ used, attempted }) {
  if (used)      return <span style={{ background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.35)', color: '#a5b4fc', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>✦ AI tailored</span>;
  if (attempted) return <span style={{ background: 'rgba(245,158,11,0.1)',   border: '1px solid rgba(245,158,11,0.3)',   color: '#fbbf24', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>AI failed → default</span>;
  return             <span style={{ background: 'rgba(255,255,255,0.04)',   border: '1px solid rgba(255,255,255,0.1)',  color: '#6b7280',  padding: '2px 8px', borderRadius: 99, fontSize: 11 }}>Default Qs</span>;
}

function DetailPanel({ row }) {
  const st = row.step_times || {};
  const stepNames = ['—', 'Who you are', 'Background', 'How you think', 'Proof of work', 'Logistics'];

  // For in-progress sessions, submitted data lives in form_snapshot; for submitted, top-level columns are set
  const snap = row.form_snapshot || {};
  const d = {
    name:            row.name            || [snap.firstName, snap.lastName].filter(Boolean).join(' ') || null,
    email:           row.email           || snap.email           || null,
    phone:           row.phone           || snap.phone           || null,
    location_tz:     row.location_tz     || snap.locationTz      || null,
    role:            row.role            || snap.role            || null,
    years:           row.years           || snap.years           || null,
    hours:           row.hours           || snap.hours           || null,
    rate:            row.rate            || snap.rate            || null,
    start_date:      row.start_date      || snap.startDate       || null,
    industries:      row.industries      || snap.industries      || [],
    tools:           row.tools           || snap.tools           || [],
    project_context: row.project_context || snap.projectContext  || null,
    timeline:        row.timeline        || snap.timeline        || null,
    story_full:      row.story_full      || snap.storyFull       || null,
    biggest_unlock:  row.biggest_unlock  || snap.biggestUnlock   || null,
    links:           row.links           || snap.links           || null,
    other:           row.other           || snap.other           || null,
  };

  // Answers: from top-level column (submitted) or snapshot fields q1-q5 (in-progress)
  const answers = row.answers?.length
    ? row.answers
    : [snap.q1, snap.q2, snap.q3, snap.q4, snap.q5].filter(Boolean);

  return (
    <div style={{ padding: '24px 28px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 28 }}>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 12 }}>Contact</div>
          <Info label="Name"     value={d.name} />
          <Info label="Email"    value={d.email ? <a href={`mailto:${d.email}`} style={{ color: '#667eea' }}>{d.email}</a> : null} />
          <Info label="Phone"    value={d.phone} />
          <Info label="Timezone" value={d.location_tz} />
          <Info label="Device"   value={row.device} />
          <Info label="IP"       value={<span style={{ fontFamily: 'monospace', fontSize: 11 }}>{row.ip}</span>} />
        </div>

        {/* Background */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 12 }}>Background</div>
          <Info label="Role"       value={d.role} />
          <Info label="Years"      value={d.years} />
          <Info label="Hours/week" value={d.hours} />
          <Info label="Rate"       value={d.rate} />
          <Info label="Start date" value={d.start_date} />
          <Info label="Industries" value={d.industries?.join(', ')} />
          <Info label="Tools"      value={d.tools?.join(', ')} />
        </div>

        {/* AI & Behavior */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 12 }}>AI & Behavior</div>
          <div style={{ marginBottom: 10 }}>
            <AiBadge used={row.ai_used} attempted={row.ai_attempted} />
          </div>
          <Info label="Refresh attempts" value={row.refresh_count ?? 0} />
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>Time per step</div>
            {[1,2,3,4,5].map((s) => (
              <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: '#6b7280' }}>{stepNames[s]}</span>
                <span style={{ color: st[s] > 60 ? '#a78bfa' : '#9ca3af', fontWeight: 500 }}>{st[s] ? formatSecs(st[s]) : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answers */}
      {answers.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 14 }}>Technical Answers</div>
          {answers.map((ans, i) => ans ? (
            <div key={i} style={{ marginBottom: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, borderLeft: '3px solid rgba(102,126,234,0.4)' }}>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6, fontWeight: 600 }}>Answer {i + 1}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{ans}</div>
            </div>
          ) : null)}
        </div>
      )}

      {/* Proof of work */}
      {(d.project_context || d.story_full) && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 14 }}>Proof of Work</div>
          <Info label="Project context"   value={d.project_context} />
          <Info label="Timeline"          value={d.timeline} />
          <Info label="Biggest unlock"    value={d.biggest_unlock} />
          <Info label="Files attached"    value={row.file_count ? `${row.file_count} file${row.file_count !== 1 ? 's' : ''}` : null} />
          {d.story_full && (
            <div style={{ marginTop: 10, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 8 }}>Full story</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{d.story_full}</div>
            </div>
          )}
        </div>
      )}

      {/* Links & notes */}
      {(d.links || d.other) && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#667eea', marginBottom: 12 }}>Extra</div>
          <Info label="Links" value={d.links} />
          <Info label="Notes" value={d.other} />
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}: </span>
      <span style={{ fontSize: 12, color: '#d1d5db' }}>{value}</span>
    </div>
  );
}

export default function ApplicationsTable({ rows }) {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { key: 'all',         label: `All (${rows.length})` },
          { key: 'submitted',   label: `Submitted (${rows.filter(r => r.status === 'submitted').length})` },
          { key: 'in_progress', label: `In Progress (${rows.filter(r => r.status === 'in_progress').length})` },
          { key: 'timed_out',   label: `Timed Out (${rows.filter(r => r.status === 'timed_out').length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              background: filter === key ? 'rgba(102,126,234,0.2)' : 'rgba(255,255,255,0.04)',
              border: filter === key ? '1px solid rgba(102,126,234,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: filter === key ? '#a5b4fc' : '#9ca3af',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['', 'Name', 'Role', 'Email', 'Completion', 'Status', 'AI', 'Refreshes', 'Step', 'Date'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const sc = STATUS_COLORS[row.status] || STATUS_COLORS.blocked;
              const isOpen = expanded === row.id;
              const snap = row.form_snapshot || {};
              const displayName  = row.name  || [snap.firstName, snap.lastName].filter(Boolean).join(' ') || '—';
              const displayRole  = row.role  || snap.role  || '—';
              const displayEmail = row.email || snap.email || null;
              const date = row.submitted_at
                ? new Date(row.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : row.created_at
                ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '—';

              return (
                <>
                  <tr
                    key={row.id}
                    onClick={() => setExpanded(isOpen ? null : row.id)}
                    style={{ borderBottom: isOpen ? 'none' : '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: isOpen ? 'rgba(102,126,234,0.05)' : 'transparent', transition: 'background 0.15s' }}
                  >
                    <td style={{ padding: '14px 8px 14px 14px', color: '#667eea', fontSize: 16 }}>{isOpen ? '▾' : '▸'}</td>
                    <td style={{ padding: '14px 14px', color: '#f3f4f6', fontWeight: 500, whiteSpace: 'nowrap' }}>{displayName}</td>
                    <td style={{ padding: '14px 14px', color: '#a5b4fc', maxWidth: 180 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayRole}</div>
                    </td>
                    <td style={{ padding: '14px 14px', color: '#9ca3af' }}>
                      {displayEmail ? <a href={`mailto:${displayEmail}`} style={{ color: '#667eea', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>{displayEmail}</a> : '—'}
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${row.completion_pct ?? 0}%`, background: pctColor(row.completion_pct ?? 0), borderRadius: 2 }} />
                        </div>
                        <span style={{ color: pctColor(row.completion_pct ?? 0), fontWeight: 600, fontSize: 12 }}>{row.completion_pct ?? 0}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <span style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {row.status?.replace('_', ' ') ?? '—'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <AiBadge used={row.ai_used} attempted={row.ai_attempted} />
                    </td>
                    <td style={{ padding: '14px 14px', textAlign: 'center', color: row.refresh_count > 0 ? '#f87171' : '#4b5563', fontWeight: row.refresh_count > 0 ? 700 : 400 }}>
                      {row.refresh_count ?? 0}
                    </td>
                    <td style={{ padding: '14px 14px', color: '#9ca3af', textAlign: 'center' }}>{row.step ?? '—'}</td>
                    <td style={{ padding: '14px 14px', color: '#6b7280', fontSize: 12, whiteSpace: 'nowrap' }}>{date}</td>
                  </tr>
                  {isOpen && (
                    <tr key={`${row.id}-detail`} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td colSpan={10} style={{ padding: 0 }}>
                        <DetailPanel row={row} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#4b5563' }}>No applications in this filter.</div>
        )}
      </div>
    </div>
  );
}
