import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sql, ensureTablesExist } from '@/lib/db';

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

    return NextResponse.json({ success: true, leads });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    await ensureTablesExist();

    if (status !== undefined && notes !== undefined) {
      await sql`
        UPDATE leads
        SET status = ${status}, notes = ${notes}
        WHERE id = ${id};
      `;
    } else if (status !== undefined) {
      await sql`
        UPDATE leads
        SET status = ${status}
        WHERE id = ${id};
      `;
    } else if (notes !== undefined) {
      await sql`
        UPDATE leads
        SET notes = ${notes}
        WHERE id = ${id};
      `;
    }

    return NextResponse.json({ success: true, message: 'Lead updated successfully.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });
    }

    await ensureTablesExist();
    await sql`DELETE FROM leads WHERE id = ${id};`;

    return NextResponse.json({ success: true, message: 'Lead deleted.' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
