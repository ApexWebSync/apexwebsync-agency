import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sql, ensureTablesExist } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await req.json();

    await ensureTablesExist();

    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'string') {
        await sql`
          INSERT INTO site_settings (key, value, updated_at)
          VALUES (${key}, ${value}, CURRENT_TIMESTAMP)
          ON CONFLICT (key)
          DO UPDATE SET value = ${value}, updated_at = CURRENT_TIMESTAMP;
        `;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Website data and settings updated successfully.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
