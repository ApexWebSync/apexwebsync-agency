import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { sql, ensureTablesExist } from '@/lib/db';

export const runtime = 'nodejs';

// GET all referral codes (strictly private offline tracking)
export async function GET() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureTablesExist();
    const referrals = await sql`
      SELECT id, code, referrer_name, contact_info, commission_type, commission_value, discount_value, status, usage_count, notes, created_at
      FROM referral_codes
      ORDER BY created_at DESC;
    `;
    return NextResponse.json({ success: true, referrals });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create a new referral code
export async function POST(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      code,
      referrer_name,
      contact_info = '',
      commission_type = 'percentage',
      commission_value = 10,
      discount_value = 0,
      status = 'Active',
      notes = '',
    } = body;

    if (!code || !referrer_name) {
      return NextResponse.json(
        { error: 'Code and Referrer Name are required.' },
        { status: 400 }
      );
    }

    await ensureTablesExist();

    // Clean uppercase code
    const cleanCode = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');

    const result = await sql`
      INSERT INTO referral_codes (
        code, referrer_name, contact_info, commission_type, commission_value, discount_value, status, notes
      ) VALUES (
        ${cleanCode}, ${referrer_name.trim()}, ${contact_info.trim()},
        ${commission_type}, ${commission_value}, ${discount_value},
        ${status}, ${notes.trim()}
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: 'Referral code created successfully.',
      referral: result[0],
    });
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message?.includes('unique constraint') || err.message?.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'A referral code with this name already exists. Please choose a different code.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update an existing referral code
export async function PUT(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      code,
      referrer_name,
      contact_info,
      commission_type,
      commission_value,
      discount_value,
      status,
      usage_count,
      notes,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Referral ID is required.' }, { status: 400 });
    }

    await ensureTablesExist();

    const cleanCode = code ? code.trim().toUpperCase() : null;

    const result = await sql`
      UPDATE referral_codes
      SET
        code = COALESCE(${cleanCode}, code),
        referrer_name = COALESCE(${referrer_name}, referrer_name),
        contact_info = COALESCE(${contact_info}, contact_info),
        commission_type = COALESCE(${commission_type}, commission_type),
        commission_value = COALESCE(${commission_value}, commission_value),
        discount_value = COALESCE(${discount_value}, discount_value),
        status = COALESCE(${status}, status),
        usage_count = COALESCE(${usage_count}, usage_count),
        notes = COALESCE(${notes}, notes)
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Referral code not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Referral code updated successfully.',
      referral: result[0],
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE a referral code
export async function DELETE(req: Request) {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Referral ID is required.' }, { status: 400 });
    }

    await ensureTablesExist();

    await sql`
      DELETE FROM referral_codes
      WHERE id = ${Number(id)};
    `;

    return NextResponse.json({
      success: true,
      message: 'Referral code deleted.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
