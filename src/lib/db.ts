import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const sql = neon(databaseUrl);

export interface ReferralCode {
  id: number;
  code: string;
  referrer_name: string;
  contact_info?: string;
  commission_type: 'percentage' | 'fixed';
  commission_value: number;
  discount_value: number;
  status: 'Active' | 'Paused' | 'Expired';
  usage_count: number;
  notes?: string;
  created_at: string;
}

export const defaultPricingPackages = {
  standardPackages: [
    {
      tier: 'Starter Landing Page',
      deliverables:
        '1-page smooth-scroll responsive layout, Hero banner, About & Services, Lead capture form, Google Maps embed.',
      hosting:
        "Deployed directly to client's cPanel/FTP or hosted on free static cloud (Cloudflare/Vercel).",
      clientHostPrice: '₹3,499 – ₹5,999',
      turnkeyPrice: '₹4,999 – ₹7,499',
      turnkeyNote: 'Domain & Free Cloud Included',
      recommended: false,
    },
    {
      tier: 'Business Showcase (3–5 Pages)',
      deliverables:
        'Multi-page structure (Home, About, Services, Gallery, Contact), mobile speed optimization, business email/WhatsApp form routing.',
      hosting:
        'Uploaded to client server or deployed on global Edge CDN with zero server rent.',
      clientHostPrice: '₹8,999 – ₹14,999',
      turnkeyPrice: '₹11,999 – ₹17,999',
      turnkeyNote: 'Domain & Free Cloud Included',
      recommended: true,
    },
    {
      tier: 'Appointment & Booking Site',
      deliverables:
        'Service catalog, automated appointment scheduling integration (Calendly/WhatsApp slots), customer reviews, FAQ.',
      hosting:
        'Widget integration, domain verification, mobile layout calibration on target host.',
      clientHostPrice: '₹11,999 – ₹18,499',
      turnkeyPrice: '₹14,999 – ₹21,999',
      turnkeyNote: 'Domain & Free Cloud Included',
      recommended: false,
    },
    {
      tier: 'Digital Menu & Direct Ordering',
      deliverables:
        'Categorized mobile menu with dietary filters, 1-click WhatsApp checkout, direct call ordering, QR code generation.',
      hosting: 'Fast Edge distribution, instant mobile cache configuration.',
      clientHostPrice: '₹9,499 – ₹15,999',
      turnkeyPrice: '₹12,499 – ₹18,999',
      turnkeyNote: 'Domain & Free Cloud Included',
      recommended: false,
    },
  ],
  engineeringServices: [
    {
      service: 'Custom Web Development',
      deliverables:
        'Next.js App Router, TypeScript, Server-Side Rendering (SSR) & Edge caching, fluid micro-interactions, zero-plugin bloat architecture.',
      useCase:
        'High-growth startups, bespoke brands, and modern businesses replacing slow CMS platforms.',
      price: '₹24,999 – ₹49,999',
      type: 'Fixed Milestone',
    },
    {
      service: 'Headless E-Commerce & SaaS',
      deliverables:
        'Custom checkout flows, instant catalog search/filtering, Neon PostgreSQL serverless pooling, S3 cloud storage, sub-500ms transaction speeds.',
      useCase:
        'High-conversion online retail, custom portals, client dashboards, and subscription models.',
      price: '₹44,999 – ₹89,999',
      type: 'Fixed Milestone',
    },
    {
      service: 'Page 1 Supremacy (Dominant SEO)',
      deliverables:
        'Technical SEO audit, semantic keyword clustering, programmatic SEO architecture, Schema.org rich snippets, Core Web Vitals 99–100 tuning.',
      useCase:
        'Brands seeking organic inbound customer acquisition from Google India & Global search.',
      price: '₹14,999 / month',
      subPrice: 'or ₹19,999 one-time setup',
      type: 'Monthly Retainer / Setup',
    },
    {
      service: 'Sub-Second TTFB (Speed Tuning)',
      deliverables:
        'Edge CDN distribution, automated next-gen image compression, CLS 0.00 zero layout shift, aggressive asset tree-shaking.',
      useCase:
        'Existing slow websites losing conversions due to page load latency and bad Core Web Vitals.',
      price: '₹7,999 – ₹14,999',
      type: 'Per Codebase Audit & Rebuild',
    },
    {
      service: 'Revenue Maximizer (CRO Audit)',
      deliverables:
        'User journey heatmap setup, behavioral drop-off tracking, persuasive conversion copywriting, scientific A/B split-testing framework.',
      useCase:
        'Sites generating traffic that fails to convert into paying customers or consultation calls.',
      price: '₹12,999 – ₹24,999',
      type: 'Comprehensive Sprint',
    },
    {
      service: 'Enterprise Cloud & Security',
      deliverables:
        'Vercel Edge/Serverless setup, serverless DB pooling, automated zero-downtime CI/CD pipelines, DDoS mitigation, enterprise SSL.',
      useCase:
        'Scalable web apps requiring 99.99% uptime, security compliance, and fault tolerance.',
      price: '₹14,999 – ₹29,999',
      type: 'Infrastructure Setup',
    },
  ],
  technicalAddOns: [
    {
      title: 'DNS & Domain Re-pointing',
      desc: 'Nameserver mapping, custom records (A, CNAME, TXT, MX) configuration.',
      price: '₹799',
    },
    {
      title: 'Business Email Setup',
      desc: 'Custom domain inbox routing on Google Workspace or Zoho Mail with DKIM & SPF.',
      price: '₹999',
    },
    {
      title: 'Hosting Clean-Up & Server Migration',
      desc: 'Legacy site wipe, malware check, and clean deployment to a new host without downtime.',
      price: '₹1,499',
    },
    {
      title: 'UPI / Razorpay Payment Gateway Integration',
      desc: 'Direct payment checkout flow setup with webhook confirmation and email receipts.',
      price: '₹2,499',
    },
    {
      title: 'On-Demand Content & Maintenance Edits',
      desc: 'Ad-hoc banner, text, or menu modifications.',
      price: '₹799 / update',
      subPrice: 'or ₹2,999 / month retainer',
    },
  ],
};

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

    // 4. Private Offline Referral Codes table (Strictly private offline tracker)
    await sql`
      CREATE TABLE IF NOT EXISTS referral_codes (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        referrer_name VARCHAR(255) NOT NULL,
        contact_info VARCHAR(255),
        commission_type VARCHAR(20) DEFAULT 'percentage',
        commission_value NUMERIC(10,2) DEFAULT 10,
        discount_value NUMERIC(10,2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'Active',
        usage_count INTEGER DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default site settings if not present
    const defaultSettings = [
      { key: 'announcement_banner', value: '⚡ Special Offer: 20% Off on All Turnkey Web Development Packages for Indian Businesses!' },
      { key: 'announcement_enabled', value: 'true' },
      { key: 'offer_badge', value: 'LIMITED TIME OFFER' },
      { key: 'offer_coupon', value: 'APEX20' },
      { key: 'offer_link', value: '/pricing' },
      { key: 'whatsapp_number', value: '+919876543210' },
      { key: 'contact_email', value: 'apexwebsync@gmail.com' },
      { key: 'contact_phone', value: '+91 98765 43210' },
      { key: 'agency_location', value: 'Bengaluru / Pan-India' },
      { key: 'pricing_packages_data', value: JSON.stringify(defaultPricingPackages) },
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
      announcement_banner: '⚡ Special Offer: 20% Off on All Turnkey Web Development Packages for Indian Businesses!',
      announcement_enabled: 'true',
      offer_badge: 'LIMITED TIME OFFER',
      offer_coupon: 'APEX20',
      offer_link: '/pricing',
      whatsapp_number: '+919876543210',
      contact_email: 'apexwebsync@gmail.com',
      contact_phone: '+91 98765 43210',
      agency_location: 'Bengaluru / Pan-India',
    };
  }
}

export async function getPricingConfig() {
  try {
    const settings = await getAllSiteSettings();
    if (settings.pricing_packages_data) {
      return JSON.parse(settings.pricing_packages_data);
    }
  } catch (e) {
    console.warn('Falling back to default pricing config:', e);
  }
  return defaultPricingPackages;
}
