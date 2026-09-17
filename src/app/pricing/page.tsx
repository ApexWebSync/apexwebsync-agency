'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  Globe,
  Server,
  CreditCard,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
  TrendingUp,
  FileText,
  Printer,
} from 'lucide-react';

const standardPackages = [
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
];

const engineeringServices = [
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
];

const technicalAddOns = [
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
];

export default function PricingPage() {
  const [pricingMode, setPricingMode] = useState<'turnkey' | 'standard'>('turnkey');

  const getWhatsAppLink = (pkgName: string) => {
    const text = encodeURIComponent(
      `Hello ApexWebSync, I am interested in the "${pkgName}" package. Please share details on timeline and onboarding.`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#00d2ff]/15 via-[#2563eb]/15 to-purple-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Transparent India Rates &bull; ₹ INR
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Transparent Pricing.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#2563eb]">
              Zero Hidden Charges.
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            High-converting web development and search ranking packages engineered specifically for Indian businesses, startups, and expanding brands.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 100% Mobile & Core Web Vitals Guaranteed
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CreditCard className="w-4 h-4" /> UPI, NetBanking & Razorpay Accepted
            </span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-white/10"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save Proposal
            </button>
          </div>
        </div>

        {/* SECTION 1: Standard Website Packages */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                <Globe className="w-7 h-7 text-[#00d2ff]" />
                Standard Website Packages
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Ideal for local businesses, professionals, clinics, and restaurants seeking a rapid, polished web presence.
              </p>
            </div>

            {/* Toggle Standard vs Turnkey */}
            <div className="flex items-center p-1 rounded-2xl bg-[#0b1120] border border-slate-700">
              <button
                onClick={() => setPricingMode('turnkey')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  pricingMode === 'turnkey'
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Turnkey (Domain & Cloud Included)
              </button>
              <button
                onClick={() => setPricingMode('standard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  pricingMode === 'standard'
                    ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Client Has Domain & Host
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.recommended
                    ? 'bg-gradient-to-b from-[#0f2142] via-[#0b172e] to-[#070a12] border-2 border-[#00d2ff] shadow-xl shadow-cyan-500/20'
                    : 'glass-card border border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 text-[10px] font-extrabold uppercase tracking-widest shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.tier}</h3>

                  <div className="my-4 pb-4 border-b border-white/10">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      {pricingMode === 'turnkey' ? pkg.turnkeyPrice : pkg.clientHostPrice}
                    </div>
                    <span className="text-[11px] text-cyan-300 uppercase tracking-wider font-semibold mt-1 block">
                      {pricingMode === 'turnkey' ? 'Turnkey Complete Setup' : 'Deployed on Your Hosting'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Deliverables & Inclusions:
                      </span>
                      <p className="leading-relaxed">{pkg.deliverables}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Hosting & Deployment:
                      </span>
                      <p className="text-slate-400 leading-relaxed text-[11px]">{pkg.hosting}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href={getWhatsAppLink(pkg.tier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    WhatsApp Quote
                  </a>

                  <Link
                    href="/contact"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 hover:opacity-90'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    Book Consultation
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: High-Performance Engineering & Growth Services */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <Code2 className="w-7 h-7 text-[#00d2ff]" />
              High-Performance Engineering & Growth Services
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Engineered with Next.js 15, Neon PostgreSQL, S3 storage, and aggressive technical SEO for high-growth startups and established enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringServices.map((eng, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {eng.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{eng.service}</h3>

                  <div className="my-3 pb-3 border-b border-white/10">
                    <div className="text-2xl font-extrabold text-white font-mono">{eng.price}</div>
                    {eng.subPrice && (
                      <div className="text-xs text-slate-400 font-medium">{eng.subPrice}</div>
                    )}
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Architecture & Deliverables:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{eng.deliverables}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Ideal For:
                      </span>
                      <p className="text-slate-400 leading-relaxed text-[11px]">{eng.useCase}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <a
                    href={getWhatsAppLink(eng.service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
                  >
                    Enquire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Technical Add-Ons & Maintenance Menu */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <Server className="w-7 h-7 text-[#00d2ff]" />
              Technical Add-Ons & Maintenance Menu
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Modular technical services for domain setup, business email, server migrations, and payment gateways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicalAddOns.map((addon, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090e1a] border border-white/5 flex flex-col justify-between hover:border-cyan-500/20 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{addon.title}</h4>
                    <span className="font-mono font-extrabold text-cyan-300 text-sm shrink-0">
                      {addon.price}
                    </span>
                  </div>
                  {addon.subPrice && (
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      {addon.subPrice}
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{addon.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <a
                    href={getWhatsAppLink(addon.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Request Add-On via WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
