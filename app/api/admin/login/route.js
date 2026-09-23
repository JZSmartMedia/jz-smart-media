import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  passwordMatches,
} from '@/lib/adminAuth';

// Slows down brute-forcing a short secret. Per-instance and best-effort —
// it is a speed bump, not a substitute for a strong ADMIN_SECRET.
const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return Response.json({ error: 'ADMIN_SECRET is not configured on the server.' }, { status: 503 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429 },
    );
  }

  let body = {};
  try { body = await request.json(); } catch {}

  if (!passwordMatches(body.password, secret)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  attempts.delete(ip);

  const token = await createSessionToken(secret);
  const response = Response.json({ ok: true });
  response.headers.append(
    'Set-Cookie',
    [
      `${ADMIN_COOKIE}=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${SESSION_MAX_AGE}`,
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ].filter(Boolean).join('; '),
  );
  return response;
}

/** Log out — clear the session cookie. */
export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.append(
    'Set-Cookie',
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
