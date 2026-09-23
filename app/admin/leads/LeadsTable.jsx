'use client';

import { useMemo, useState } from 'react';

export const STATUS_META = {
  new:       { label: 'New',       color: '#60a5fa' },
  contacted: { label: 'Contacted', color: '#fbbf24' },
  qualified: { label: 'Qualified', color: '#a78bfa' },
  won:       { label: 'Won',       color: '#34d399' },
  lost:      { label: 'Lost',      color: '#f87171' },
  archived:  { label: 'Archived',  color: '#6b7280' },
};

const SOURCE_LABELS = {
  hero: 'Hero form',
  contact: 'Contact section',
  'v2-audit': 'V2 audit',
};

const INDUSTRY_LABELS = {
  roofing: 'Roofing', hvac: 'HVAC', restoration: 'Restoration', remodeling: 'Remodeling',
  plumbing: 'Plumbing', electrical: 'Electrical', landscaping: 'Landscaping',
  'garage-door': 'Garage Door', locksmith: 'Locksmith', chimney: 'Chimney',
  'other-home-service': 'Other Home Service', other: 'Other',
};

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

function csvEscape(v) {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function LeadsTable({ rows: initialRows }) {
  const [rows, setRows] = useState(initialRows);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && r.source !== sourceFilter) return false;
      if (!q) return true;
      return [r.name, r.business, r.email, r.phone, r.market, r.industry]
        .filter(Boolean).some((f) => String(f).toLowerCase().includes(q));
    });
  }, [rows, statusFilter, sourceFilter, search]);

  const patch = async (id, payload) => {
    setSaving(id);
    setError('');
    try {
      // Auth rides on the httpOnly session cookie — no secret in the URL.
      const res = await fetch(
        `/api/admin/leads?id=${encodeURIComponent(id)}`,
        { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Update failed');
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...data.lead } : r)));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(null);
    }
  };

  const exportCsv = () => {
    const cols = ['created_at', 'name', 'business', 'phone', 'email', 'industry', 'market', 'source', 'status', 'challenge', 'notes', 'ip', 'referer'];
    const lines = [cols.join(',')];
    filtered.forEach((r) => lines.push(cols.map((c) => csvEscape(r[c])).join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jz-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chip = (active) => ({
    padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
    background: active ? 'rgba(102,126,234,0.18)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${active ? 'rgba(102,126,234,0.5)' : 'rgba(255,255,255,0.08)'}`,
    color: active ? '#a5b4fc' : '#9ca3af',
  });

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
        <button type="button" style={chip(statusFilter === 'all')} onClick={() => setStatusFilter('all')}>
          All ({rows.length})
        </button>
        {Object.entries(STATUS_META).map(([key, { label, color }]) => {
          const n = rows.filter((r) => r.status === key).length;
          if (!n && key === 'archived') return null;
          return (
            <button key={key} type="button" style={chip(statusFilter === key)} onClick={() => setStatusFilter(key)}>
              <span style={{ color, marginRight: 6 }}>●</span>{label} ({n})
            </button>
          );
        })}

        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, background: '#141414', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db', fontSize: 12 }}
        >
          <option value="all">All sources</option>
          {Object.entries(SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>

        <input
          type="search"
          placeholder="Search name, company, email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', minWidth: 180, padding: '8px 12px', borderRadius: 8, background: '#141414', border: '1px solid rgba(255,255,255,0.1)', color: '#f3f4f6', fontSize: 12 }}
        />

        <button
          type="button"
          onClick={exportCsv}
          disabled={!filtered.length}
          style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.35)', color: '#6ee7b7', fontSize: 12, fontWeight: 600, cursor: filtered.length ? 'pointer' : 'not-allowed', opacity: filtered.length ? 1 : 0.5 }}
        >
          Export CSV ({filtered.length})
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.35)', color: '#fca5a5', fontSize: 12 }}>
          {error}
        </div>
      )}

      {/* Table */}
      <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr 1fr 0.8fr 0.9fr 40px', gap: 12, padding: '12px 18px', background: 'rgba(255,255,255,0.03)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6b7280' }}>
          <span>Lead</span><span>Contact</span><span>Industry / Market</span><span>Source</span><span>Status</span><span />
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '46px 20px', textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
            {rows.length === 0
              ? 'No leads yet. The first homepage or /v2 submission will appear here.'
              : 'No leads match these filters.'}
          </div>
        )}

        {filtered.map((row) => {
          const meta = STATUS_META[row.status] || STATUS_META.new;
          const isOpen = expanded === row.id;
          return (
            <div key={row.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                onClick={() => setExpanded(isOpen ? null : row.id)}
                style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr 1fr 0.8fr 0.9fr 40px', gap: 12, padding: '16px 18px', alignItems: 'center', cursor: 'pointer', fontSize: 13 }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#f3f4f6' }}>{row.name || '—'}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>
                    {row.business || 'No company'} · {fmtDate(row.created_at)}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <div>{row.phone || '—'}</div>
                  <div style={{ fontSize: 11, marginTop: 3, wordBreak: 'break-all' }}>{row.email || '—'}</div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  <div>{INDUSTRY_LABELS[row.industry] || row.industry || '—'}</div>
                  <div style={{ fontSize: 11, marginTop: 3 }}>{row.market || '—'}</div>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{SOURCE_LABELS[row.source] || row.source || '—'}</div>
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: `${meta.color}1a`, border: `1px solid ${meta.color}55`, color: meta.color, fontSize: 11, fontWeight: 600 }}>
                    {meta.label}
                  </span>
                </div>
                <div style={{ textAlign: 'right', color: '#4b5563', fontSize: 16 }}>{isOpen ? '−' : '+'}</div>
              </div>

              {isOpen && (
                <div style={{ padding: '4px 18px 22px', background: 'rgba(255,255,255,0.015)' }} onClick={(e) => e.stopPropagation()}>
                  {row.challenge && (
                    <div style={{ marginBottom: 18, padding: '14px 16px', borderRadius: 8, background: 'rgba(102,126,234,0.06)', borderLeft: '3px solid rgba(102,126,234,0.5)' }}>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#818cf8', marginBottom: 7 }}>Biggest marketing challenge</div>
                      <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{row.challenge}</div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 18 }}>
                    <Detail label="Submitted" value={fmtDate(row.created_at)} />
                    <Detail label="IP address" value={row.ip} />
                    <Detail label="Landed on" value={row.referer} />
                    <Detail label="Device / browser" value={row.user_agent} wrap />
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
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
                    <a
                      href={`mailto:${row.email}`}
                      style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 600, background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.4)', color: '#a5b4fc', textDecoration: 'none' }}
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${(row.phone || '').replace(/[^\d+]/g, '')}`}
                      style={{ padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 600, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.35)', color: '#6ee7b7', textDecoration: 'none' }}
                    >
                      Call
                    </a>
                  </div>

                  <NotesBox
                    initial={row.notes || ''}
                    saving={saving === row.id}
                    onSave={(notes) => patch(row.id, { notes })}
                  />
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

function NotesBox({ initial, saving, onSave }) {
  const [value, setValue] = useState(initial);
  const dirty = value !== initial;

  return (
    <div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#4b5563', marginBottom: 6 }}>
        Internal notes
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Call outcome, budget discussed, next step…"
        style={{ width: '100%', minHeight: 72, padding: '11px 13px', borderRadius: 8, background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#e5e7eb', fontSize: 12, resize: 'vertical', fontFamily: 'inherit' }}
      />
      <button
        type="button"
        disabled={!dirty || saving}
        onClick={() => onSave(value)}
        style={{
          marginTop: 8, padding: '7px 16px', borderRadius: 7, fontSize: 11, fontWeight: 600,
          background: dirty ? 'rgba(102,126,234,0.15)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${dirty ? 'rgba(102,126,234,0.45)' : 'rgba(255,255,255,0.08)'}`,
          color: dirty ? '#a5b4fc' : '#4b5563',
          cursor: dirty && !saving ? 'pointer' : 'not-allowed',
        }}
      >
        {saving ? 'Saving…' : dirty ? 'Save note' : 'Saved'}
      </button>
    </div>
  );
}
