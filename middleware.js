import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';

/**
 * Gate every admin page and admin API behind a valid session cookie.
 *
 * Doing it here means the pages and route handlers below no longer carry their
 * own auth checks — nothing unauthenticated ever reaches them.
 */
export async function middleware(request) {
  const secret = process.env.ADMIN_SECRET;

  // No secret configured — leave everything open, matching previous behaviour
  // on a fresh install rather than locking the owner out of their own admin.
  if (!secret) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  // The login screen and its endpoint must stay reachable.
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifySessionToken(token, secret)) return NextResponse.next();

  // Still honour ?secret= so existing bookmarks and scripted JSON pulls keep
  // working. Prefer logging in — a URL secret leaks via logs and Referer.
  if (searchParams.get('secret') === secret) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
