import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'dotmkv_admin_session';

function isValidToken(token: string | undefined | null): boolean {
  if (!token || !token.startsWith('session_') || !token.endsWith('_dotmkv')) {
    return false;
  }
  try {
    const parts = token.split('_');
    if (parts.length !== 3) return false;
    // Edge-safe decoding
    const decoded = atob(parts[1]);
    const [username, timestampStr] = decoded.split(':');
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    if (username !== expectedUsername) return false;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, Next.js internal files, and login API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname === '/api/auth/login'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authenticated = isValidToken(token);

  // If user visits /login while authenticated, redirect to /
  if (pathname === '/login') {
    if (authenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If not authenticated
  if (!authenticated) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
