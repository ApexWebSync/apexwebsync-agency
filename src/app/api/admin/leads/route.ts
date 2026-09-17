import { NextResponse } from 'next/server';
import { sql, ensureTablesExist } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await ensureTablesExist();
    const leads = await sql`
      SELECT id, name, email, phone, website, service, budget, message, attachment_url, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    const audits = await sql`
      SELECT id, url, email, score, ttfb_ms, metrics, created_at
      FROM seo_audits
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    return NextResponse.json({
      success: true,
      totalLeads: leads.length,
      totalAudits: audits.length,
      leads,
      audits,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
