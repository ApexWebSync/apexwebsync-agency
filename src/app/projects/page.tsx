'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ArrowUpRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
  Layers,
  Building2,
  MapPin,
  Calendar,
  MessageCircle,
} from 'lucide-react';

const completedProjects = [
  {
    title: 'Aura Luxe Living',
    businessInfo: {
      industry: 'Luxury Home Decor & D2C Furniture',
      location: 'Mumbai & Bengaluru, India',
      websiteType: 'Headless E-Commerce & Catalog',
      scale: 'Pan-India Delivery, 1,200+ SKUs',
    },
    challenge:
      'The client was losing 60%+ of mobile shoppers due to an outdated WooCommerce setup that took 4.6 seconds to load product pages. Mobile checkout abandonment was sky-high.',
    solution:
      'Re-engineered the entire storefront using Next.js 15 App Router, Neon PostgreSQL serverless pooling for instant catalog filtering, S3 asset delivery, and a streamlined 1-click Razorpay UPI checkout.',
    results: [
      { label: 'Page Load Speed', before: '4.6s', after: '0.38s', highlight: '-91% Latency' },
      { label: 'Mobile Conversion', before: '1.2%', after: '4.3%', highlight: '3.5x Lift' },
      { label: 'Quarterly Revenue', before: 'Baseline', after: '+₹48.5 Lakhs', highlight: 'Organic Growth' },
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Neon PostgreSQL', 'Razorpay UPI', 'AWS S3', 'Tailwind CSS'],
    status: 'Delivered & Scaling',
  },
  {
    title: 'ZestEat Cloud Kitchens & Dining',
    businessInfo: {
      industry: 'Multi-Brand Cloud Kitchen & Restaurant',
      location: 'Delhi-NCR, India',
      websiteType: 'Digital Menu & 1-Click WhatsApp Ordering',
      scale: '4 Kitchen Hubs, 180+ Menu Items',
    },
    challenge:
      'High commission fees (25-30%) on food delivery apps were eating into margins, while static PDF menus failed to engage customers on Instagram and local search.',
    solution:
      'Engineered an interactive mobile digital menu with dietary tags (Jain, Vegan, Gluten-Free), real-time dish search, and automatic WhatsApp cart checkout directly routing orders to kitchen dispatch.',
    results: [
      { label: 'Direct WhatsApp Orders', before: '0 / day', after: '115+ / day', highlight: 'Zero Commission' },
      { label: 'Average Order Value', before: '₹380', after: '₹620', highlight: '+63% Upsell' },
      { label: 'Local Google Map Rank', before: 'Page 3', after: 'Top 3 Pack', highlight: 'Dominant SEO' },
    ],
    techStack: ['Next.js', 'WhatsApp Business API', 'Edge CDN', 'Tailwind UI', 'QR Code Engine'],
    status: 'Delivered & Scaling',
  },
  {
    title: 'VedicCure Ayurveda & Wellness',
    businessInfo: {
      industry: 'Holistic Healthcare & Tele-Consultation',
      location: 'Kochi & Pan-India Coverage',
      websiteType: 'Appointment Booking & Health Blog Portal',
      scale: '12 Ayurvedic Specialists, 5,000+ Patients',
    },
    challenge:
      'Manual patient bookings through phone calls were causing scheduling clashes and high patient drop-off. Competing clinics dominated local Google search.',
    solution:
      'Built a HIPAA-compliant appointment booking web application with automated doctor slot synchronization, patient WhatsApp confirmation alerts, and authoritative medical schema SEO.',
    results: [
      { label: 'Automated Bookings', before: 'Manual Calls', after: '450+ / month', highlight: '100% Automated' },
      { label: 'Target Keyword Ranks', before: 'Not in Top 100', after: '42 Keywords in Top 3', highlight: '#1 Position' },
      { label: 'Google PageSpeed', before: '31 / 100', after: '99 / 100', highlight: 'Perfect Vitals' },
    ],
    techStack: ['Next.js', 'PostgreSQL DB', 'Automated Calendly/WhatsApp', 'Schema.org', 'Edge Caching'],
    status: 'Delivered & Scaling',
  },
  {
    title: 'FinScale Capital Partners',
    businessInfo: {
      industry: 'Private Equity & Wealth Advisory',
      location: 'Hyderabad, India & Dubai, UAE',
      websiteType: 'High-Security Institutional Web Platform',
      scale: 'Institutional Investors & Family Offices',
    },
    challenge:
      'The firm needed an ultra-sleek, credible web presence to attract high-net-worth investors and provide a secure digital vault for investor prospectus downloads.',
    solution:
      'Architected a bespoke corporate web platform on Vercel Edge with signed pre-signed S3 download URLs for financial reports and programmatic lead intake stored in Neon PostgreSQL.',
    results: [
      { label: 'Server TTFB', before: '1,400ms', after: '120ms', highlight: 'Instant Global Load' },
      { label: 'Inbound Consultations', before: '2 / month', after: '26 / month', highlight: '+1,200% Surge' },
      { label: 'Institutional Trust', before: 'Average', after: 'Industry Benchmark', highlight: 'Elite Standard' },
    ],
    techStack: ['Next.js 15', 'Neon DB', 'AWS S3 Vault', 'Enterprise SSL', 'TypeScript'],
    status: 'Delivered & Scaling',
  },
];

const currentProjects = [
  {
    client: 'NexusPulse IoT & Telematics',
    industry: 'Enterprise Fleet & Hardware Tech',
    location: 'Pune & Germany',
    scope:
      'Complete re-platforming to Next.js 15 with interactive 3D product interactive tours, live telemetry data demo widgets, and multi-language international SEO.',
    currentMilestone: 'Core Web Vitals & 3D WebGL optimization sprint',
    progress: 85,
    targetLaunch: 'October 2026',
    status: 'Testing & Calibration',
  },
  {
    client: 'UrbanCrust Artisan Bakery & Cafe',
    industry: 'Hospitality & Retail Bakery',
    location: 'Bengaluru (Indiranagar & Whitefield)',
    scope:
      'Multi-outlet digital menu with live inventory sync, automated pre-order booking for custom celebration cakes, and Google Maps local SEO dominance.',
    currentMilestone: 'Razorpay payment gateway & WhatsApp dispatch integration',
    progress: 60,
    targetLaunch: 'November 2026',
    status: 'In Active Sprint',
  },
  {
    client: 'Starlight Jewels International',
    industry: 'Fine Jewelry & Certified Diamonds',
    location: 'Surat & London',
    scope:
      'High-security headless jewelry portal with high-resolution image zoom pipelines via S3, certificate verification tool, and private VIP consultation booking.',
    currentMilestone: 'Custom database schema & S3 asset pipeline setup',
    progress: 40,
    targetLaunch: 'December 2026',
    status: 'Architecture & UX Phase',
  },
];

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#00b4d8]/10 via-[#2563eb]/10 to-purple-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Portfolio &amp; Client Showcases
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Our Works &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]">Proven Results</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore delivered web applications, digital menus, appointment portals, and the active engineering sprints currently underway at ApexWebSync.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> 100% On-Time Delivery Track Record
            </span>
            <span className="flex items-center gap-1.5 text-[#0284c7]">
              <Zap className="w-4 h-4" /> Sub-400ms Server TTFB Across All Deploys
            </span>
          </div>
        </div>

        {/* SECTION 1: DELIVERED CLIENT PROJECTS */}
        <div className="mb-24">
          <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                <Globe className="w-7 h-7 text-[#0284c7]" />
                Completed Works &amp; Case Studies
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Detailed business profiles, technical architectures, and verified commercial impact.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {completedProjects.map((proj, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Business Profile & Story */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-50 text-[#0284c7] border border-cyan-200">
                          {proj.businessInfo.websiteType}
                        </span>
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {proj.status}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Business Information Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                          Industry &amp; Domain:
                        </span>
                        <span className="font-medium text-slate-800">{proj.businessInfo.industry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                          Location:
                        </span>
                        <span className="font-medium text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0284c7]" />
                          {proj.businessInfo.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                          Operational Scale:
                        </span>
                        <span className="font-medium text-slate-800">{proj.businessInfo.scale}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                          Apex Service:
                        </span>
                        <span className="font-medium text-[#0284c7]">Full Next.js Build &amp; SEO</span>
                      </div>
                    </div>

                    {/* The Challenge & Solution */}
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          The Business Challenge:
                        </h4>
                        <p className="text-slate-600 leading-relaxed pl-4">{proj.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          ApexWebSync Engineering Solution:
                        </h4>
                        <p className="text-slate-600 leading-relaxed pl-4">{proj.solution}</p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Results & Metrics */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#0284c7]" />
                        Measurable Business Impact
                      </h4>

                      <div className="space-y-4">
                        {proj.results.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm"
                          >
                            <div>
                              <span className="text-xs font-medium text-slate-500 block">
                                {res.label}
                              </span>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xs line-through text-slate-400 font-mono">
                                  {res.before}
                                </span>
                                <span className="text-base font-extrabold text-slate-900 font-mono">
                                  {res.after}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {res.highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <Link
                        href="/contact"
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Build Something Similar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CURRENT IN-PROGRESS PROJECTS (ACTIVE SPRINTS) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white to-slate-50 border-2 border-cyan-200 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-100 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                Live Engineering Pipeline
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Current In-Progress Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Active client build cycles and optimization sprints currently running in our pipeline.
              </p>
            </div>

            <a
              href="https://wa.me/919876543210?text=Hello%20ApexWebSync%2C%20I%20would%20like%20to%20reserve%20a%20slot%20in%20your%20next%20development%20sprint."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Reserve Sprint Slot (+91)
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentProjects.map((inProg, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-cyan-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-50 text-[#0284c7] border border-cyan-200">
                      {inProg.status}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {inProg.targetLaunch}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{inProg.client}</h3>
                  <div className="text-xs text-slate-500 font-medium mb-3">
                    {inProg.industry} &bull; <span className="text-slate-700">{inProg.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {inProg.scope}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Current Milestone:
                    </span>
                    <span className="font-semibold text-slate-800">{inProg.currentMilestone}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Sprint Completion:</span>
                    <span className="font-mono text-[#0284c7]">{inProg.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00b4d8] to-[#2563eb] rounded-full transition-all duration-500"
                      style={{ width: `${inProg.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-cyan-50/50 border border-cyan-200 text-center">
            <h4 className="text-base font-bold text-slate-900">
              Want your web application or SEO campaign scheduled in our upcoming sprint?
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-xl mx-auto">
              We take on a limited number of clients per sprint to guarantee senior engineering attention and sub-second page performance.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="px-5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all"
              >
                View Packages
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-sm transition-all"
              >
                Schedule Kickoff Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
