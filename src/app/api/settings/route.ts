import { NextResponse } from 'next/server';
import { getAllSiteSettings } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const settings = await getAllSiteSettings();
    return NextResponse.json({
      success: true,
      settings: {
        announcement_banner: settings.announcement_banner,
        announcement_enabled: settings.announcement_enabled === 'true',
        offer_badge: settings.offer_badge || '',
        offer_coupon: settings.offer_coupon || '',
        offer_link: settings.offer_link || '',
        whatsapp_number: settings.whatsapp_number || '+919876543210',
        contact_email: settings.contact_email || 'apexwebsync@gmail.com',
        contact_phone: settings.contact_phone || '+91 98765 43210',
        agency_location: settings.agency_location || 'Bengaluru / Pan-India',
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
