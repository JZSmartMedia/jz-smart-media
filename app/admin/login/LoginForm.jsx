'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ next }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Sign in failed.');
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setPassword('');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="admin-password" style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginBottom: 7 }}>
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 9,
          background: '#111', border: '1px solid rgba(255,255,255,0.12)',
          color: '#f3f4f6', fontSize: 14, outline: 'none',
        }}
      />

      {error && (
        <div
          role="alert"
          style={{
            marginTop: 14, padding: '10px 13px', borderRadius: 8, fontSize: 12,
            background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.35)', color: '#fca5a5',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy || !password}
        style={{
          width: '100%', marginTop: 18, padding: '13px', borderRadius: 9, border: 'none',
          background: busy || !password ? 'rgba(102,126,234,0.35)' : 'linear-gradient(90deg,#667eea,#764ba2)',
          color: '#fff', fontSize: 14, fontWeight: 700,
          cursor: busy || !password ? 'not-allowed' : 'pointer',
        }}
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
