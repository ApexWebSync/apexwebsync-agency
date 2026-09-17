import { NextResponse } from 'next/server';
import { getPricingConfig } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const pricing = await getPricingConfig();
    return NextResponse.json({ success: true, pricing });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
