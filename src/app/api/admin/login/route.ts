import { NextResponse } from 'next/server';
import { verifyPassword, getExpectedToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid admin credentials. Access denied.' },
        { status: 401 }
      );
    }

    const token = getExpectedToken();
    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully.',
    });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
