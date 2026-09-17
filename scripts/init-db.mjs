import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in environment variables.');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  console.log('Connecting to Neon PostgreSQL database...');
  
  try {
    const result = await sql`SELECT version();`;
    console.log('Successfully connected to Neon PostgreSQL!');
    console.log('Database version:', result[0]?.version);

    console.log('Creating/Updating "leads" table...');
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

    try {
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New';`;
      await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;`;
    } catch (e) {
      console.log('Note: columns might already exist:', e.message);
    }

    console.log('Creating "seo_audits" table if not exists...');
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

    console.log('Creating "site_settings" table for dynamic modifications...');
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

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

    console.log('All tables and settings verified successfully!');
  } catch (err) {
    console.error('Error during database initialization:', err);
    process.exit(1);
  }
}

main();
