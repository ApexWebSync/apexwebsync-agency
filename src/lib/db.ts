import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const sql = neon(databaseUrl);

export async function ensureTablesExist() {
  if (!databaseUrl) {
    console.warn('DATABASE_URL is missing. Skipping table creation.');
    return;
  }

  try {
    // 1. Leads table
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        service VARCHAR(100),
        budget VARCHAR(100),
        message TEXT,
        attachment_url TEXT,
        status VARCHAR(50) DEFAULT 'New',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure status and notes columns exist if table was created previously
    try {
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New';`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;`;
    } catch {
      // Column may already exist
    }

    // 2. SEO Audits table
    await sql`
      CREATE TABLE IF NOT EXISTS seo_audits (
        id SERIAL PRIMARY KEY,
        url VARCHAR(500) NOT NULL,
        email VARCHAR(255),
        score INTEGER NOT NULL,
        ttfb_ms INTEGER,
        metrics JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Site Settings table (for dynamic data modification by admin)
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default site settings if not present
    const defaultSettings = [
      { key: 'announcement_banner', value: '⚡ Special Offer: 20% Off on All Turnkey Web Development Packages for Indian Businesses!' },
      { key: 'announcement_enabled', value: 'true' },
      { key: 'whatsapp_number', value: '+919876543210' },
      { key: 'contact_email', value: 'apexwebsync@gmail.com' },
      { key: 'contact_phone', value: '+91 98765 43210' },
      { key: 'agency_location', value: 'Bengaluru / Pan-India' },
    ];

    for (const setting of defaultSettings) {
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES (${setting.key}, ${setting.value})
        ON CONFLICT (key) DO NOTHING;
      `;
    }

    console.log('Database tables and settings verified successfully.');
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
  }
}

export async function getAllSiteSettings(): Promise<Record<string, string>> {
  try {
    await ensureTablesExist();
    const rows = await sql`SELECT key, value FROM site_settings;`;
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return settings;
  } catch (err) {
    console.error('Failed to get site settings:', err);
    return {
      announcement_banner: '⚡ High-Performance Next.js Engineering & Page 1 SEO Supremacy across India.',
      announcement_enabled: 'true',
      whatsapp_number: '+919876543210',
      contact_email: 'apexwebsync@gmail.com',
      contact_phone: '+91 98765 43210',
      agency_location: 'Bengaluru / Pan-India',
    };
  }
}
