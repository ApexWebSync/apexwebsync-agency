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

    console.log('Creating "leads" table if not exists...');
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

    console.log('All tables created and verified successfully!');
  } catch (err) {
    console.error('Error during database initialization:', err);
    process.exit(1);
  }
}

main();
