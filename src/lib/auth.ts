import { NextRequest } from 'next/server';

export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin',
};

export const AUTH_COOKIE_NAME = 'dotmkv_admin_session';

export function createSessionToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  // Simple signature simulation compatible with Edge runtime
  const encoded = Buffer.from(payload).toString('base64');
  return `session_${encoded}_dotmkv`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !token.startsWith('session_') || !token.endsWith('_dotmkv')) {
    return false;
  }
  try {
    const parts = token.split('_');
    if (parts.length !== 3) return false;
    const decoded = Buffer.from(parts[1], 'base64').toString('utf-8');
    const [username, timestampStr] = decoded.split(':');
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    if (username !== expectedUsername) return false;
    const timestamp = parseInt(timestampStr, 10);
    // 7 days validity
    if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  return verifySessionToken(cookie?.value);
}
