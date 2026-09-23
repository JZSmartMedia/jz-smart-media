import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === 'string' && params.next.startsWith('/admin')
    ? params.next
    : '/admin';

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a', color: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 34, fontWeight: 900, color: '#667eea', lineHeight: 1 }}>JZ.</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Smart Media
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '32px 28px',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Admin sign in</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8, marginBottom: 24, lineHeight: 1.6 }}>
            Enter the admin password to open the dashboard.
          </p>
          <LoginForm next={next} />
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#4b5563', marginTop: 20 }}>
          Sessions last 7 days on this device.
        </p>
      </div>
    </div>
  );
}
