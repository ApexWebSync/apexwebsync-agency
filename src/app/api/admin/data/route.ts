import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sql, ensureTablesExist, getAllSiteSettings } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureTablesExist();

    const leads = await sql`
      SELECT id, name, email, phone, website, service, budget, message, attachment_url, status, notes, created_at
      FROM leads
      ORDER BY created_at DESC;
    `;

    const audits = await sql`
      SELECT id, url, email, score, ttfb_ms, metrics, created_at
      FROM seo_audits
      ORDER BY created_at DESC;
    `;

    const settings = await getAllSiteSettings();

    const referrals = await sql`
      SELECT id, code, referrer_name, contact_info, commission_type, commission_value, discount_value, status, usage_count, notes, created_at
      FROM referral_codes
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({
      success: true,
      leads,
      audits,
      settings,
      referrals,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
