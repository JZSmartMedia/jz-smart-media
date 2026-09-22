'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

const INDUSTRIES = [
  ['roofing', 'Roofing'],
  ['remodeling', 'Remodeling'],
  ['restoration', 'Restoration'],
  ['garage-door', 'Garage Door'],
  ['locksmith', 'Locksmith'],
  ['chimney', 'Chimney'],
  ['other-home-service', 'Other Home Service'],
];

const EMPTY = {
  name: '', business: '', phone: '', email: '',
  industry: '', market: '', challenge: '', website: '',
};

export default function AuditForm() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'v2-audit' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ textAlign: 'center', padding: '28px 8px' }}>
          <CheckCircle2
            className="w-12 h-12"
            style={{ margin: '0 auto 18px', color: '#69e2df' }}
            aria-hidden="true"
          />
          <h3 style={{ fontSize: '1.7rem' }}>Audit request received.</h3>
          <p style={{ marginTop: 14, color: '#b6c3d6', fontSize: '0.95rem' }}>
            We&rsquo;ll review your acquisition and follow-up system and reply within one
            business day with the biggest gaps we find.
          </p>
          <p style={{ marginTop: 18, color: '#8090a8', fontSize: '0.82rem' }}>
            Need us sooner? Call{' '}
            <a href="tel:+13527556501" style={{ color: '#69e2df' }}>(352) 755-6501</a>.
          </p>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="v2-name">Your name</label>
          <input id="v2-name" type="text" required placeholder="Mike Johnson"
            value={form.name} onChange={set('name')} autoComplete="name" />
        </div>

        <div className="field">
          <label htmlFor="v2-company">Company</label>
          <input id="v2-company" type="text" placeholder="Johnson Roofing LLC"
            value={form.business} onChange={set('business')} autoComplete="organization" />
        </div>

        <div className="field">
          <label htmlFor="v2-phone">Phone</label>
          <input id="v2-phone" type="tel" required placeholder="(555) 000-0000"
            value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </div>

        <div className="field">
          <label htmlFor="v2-email">Email</label>
          <input id="v2-email" type="email" required placeholder="mike@yourcompany.com"
            value={form.email} onChange={set('email')} autoComplete="email" />
        </div>

        <div className="field">
          <label htmlFor="v2-industry">Industry</label>
          <select id="v2-industry" required value={form.industry} onChange={set('industry')}>
            <option value="" disabled>Choose one</option>
            {INDUSTRIES.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="v2-market">Primary market</label>
          <input id="v2-market" type="text" placeholder="Miami, FL"
            value={form.market} onChange={set('market')} />
        </div>

        <div className="field full">
          <label htmlFor="v2-challenge">
            What is your biggest marketing challenge? <span style={{ color: '#8090a8' }}>(optional)</span>
          </label>
          <textarea id="v2-challenge" placeholder="Leads are coming in but they aren't turning into booked jobs…"
            value={form.challenge} onChange={set('challenge')} />
        </div>
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text" name="website" className="honeypot" tabIndex={-1}
        autoComplete="off" aria-hidden="true"
        value={form.website} onChange={set('website')}
      />

      {error && (
        <div className="form-error" role="alert">
          <AlertCircle className="w-4 h-4" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? (
          <>Sending… <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /></>
        ) : (
          <>Request my free audit <span className="arrow" aria-hidden="true">→</span></>
        )}
      </button>

      <p className="form-note">No spam. No obligation. We reply within one business day.</p>
      <p className="form-note">
        By submitting, you agree to our <Link href="/privacy">Privacy Policy</Link> and{' '}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </form>
  );
}
