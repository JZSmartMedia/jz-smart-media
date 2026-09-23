/**
 * Admin session auth.
 *
 * Replaces passing ?secret= in the URL, which leaked through browser history,
 * server access logs and Referer headers. A successful login instead sets an
 * httpOnly cookie holding a signed, expiring token.
 *
 * The token is `<expiry>.<HMAC-SHA256(expiry, ADMIN_SECRET)>` — stateless, so
 * it needs no session store, and it cannot be forged without the secret. Uses
 * Web Crypto rather than node:crypto so the same code runs in Edge middleware
 * and in Node route handlers.
 */

export const ADMIN_COOKIE = 'jz_admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function base64url(buffer) {
  let binary = '';
  for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return base64url(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

/** Compare without leaking how many characters matched. */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(secret, maxAgeSeconds = SESSION_MAX_AGE) {
  const expiry = String(Math.floor(Date.now() / 1000) + maxAgeSeconds);
  return `${expiry}.${await sign(expiry, secret)}`;
}

export async function verifySessionToken(token, secret) {
  if (!token || !secret) return false;
  const split = token.lastIndexOf('.');
  if (split < 1) return false;

  const expiry = token.slice(0, split);
  const signature = token.slice(split + 1);
  if (!/^\d+$/.test(expiry)) return false;
  if (Number(expiry) * 1000 < Date.now()) return false;

  return safeEqual(signature, await sign(expiry, secret));
}

/** True when the password submitted at login matches ADMIN_SECRET. */
export function passwordMatches(input, secret) {
  return safeEqual(String(input ?? ''), String(secret ?? ''));
}
