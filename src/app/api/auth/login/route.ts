import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, AUTH_COOKIE_NAME, createSessionToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = createSessionToken(username);
      const response = NextResponse.json({
        success: true,
        user: { username: 'admin', role: 'Studio Administrator' }
      });

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
