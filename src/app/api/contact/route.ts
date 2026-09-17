import { NextResponse } from 'next/server';
import { sql, ensureTablesExist } from '@/lib/db';
import { uploadFileToS3 } from '@/lib/s3';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let name = '';
    let email = '';
    let phone = '';
    let website = '';
    let service = '';
    let budget = '';
    let message = '';
    let attachmentUrl = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      website = (formData.get('website') as string) || '';
      service = (formData.get('service') as string) || '';
      budget = (formData.get('budget') as string) || '';
      message = (formData.get('message') as string) || '';

      const file = formData.get('file') as File | null;
      if (file && file.size > 0) {
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const key = `leads/${Date.now()}-${safeName}`;
          attachmentUrl = await uploadFileToS3(key, buffer, file.type);
        } catch (s3Err) {
          console.error('File upload to S3 failed, continuing lead capture:', s3Err);
        }
      }
    } else {
      const body = await req.json();
      name = body.name || '';
      email = body.email || '';
      phone = body.phone || '';
      website = body.website || '';
      service = body.service || '';
      budget = body.budget || '';
      message = body.message || '';
      attachmentUrl = body.attachmentUrl || '';
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    await ensureTablesExist();

    const insertResult = await sql`
      INSERT INTO leads (name, email, phone, website, service, budget, message, attachment_url)
      VALUES (${name}, ${email}, ${phone || null}, ${website || null}, ${service || null}, ${budget || null}, ${message || null}, ${attachmentUrl || null})
      RETURNING id, created_at;
    `;

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting ApexWebSync! Our technical team will review your project and get back to you within 24 hours.',
      leadId: insertResult[0]?.id,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { error: `Failed to submit inquiry: ${err.message}` },
      { status: 500 }
    );
  }
}
