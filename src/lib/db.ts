import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const sql = neon(databaseUrl);

export async function ensureTablesExist() {
  if (!databaseUrl) {
    console.warn('DATABASE_URL is missing. Skipping table creation.');
    return;
  }

  try {
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

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
    console.log('Database tables verified or created successfully.');
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
  }
}
