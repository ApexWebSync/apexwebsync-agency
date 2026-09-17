import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sql, ensureTablesExist, getPricingConfig } from '@/lib/db';

export const runtime = 'nodejs';

// GET current pricing configuration
export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const config = await getPricingConfig();
    return NextResponse.json({ success: true, pricing: config });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST or PUT to update pricing configuration
export async function POST(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await ensureTablesExist();

    const jsonString = JSON.stringify(body);

    await sql`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES ('pricing_packages_data', ${jsonString}, CURRENT_TIMESTAMP)
      ON CONFLICT (key)
      DO UPDATE SET value = ${jsonString}, updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({
      success: true,
      message: 'Pricing packages updated successfully across website.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
