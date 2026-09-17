'use client';

import { Check, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter Landing Page',
    tagline: '1-page smooth-scroll layout with lead capture, Google Maps & mobile speed.',
    price: '₹3,499',
    frequency: 'turnkey ₹4,999 with domain & cloud',
    highlighted: false,
    badge: 'Fast Delivery (3-5 Days)',
    features: [
      '1-Page Smooth-Scroll Responsive Layout',
      'Hero Banner with Brand Identity & Slogan',
      'Services & About Us Presentation',
      'Lead Capture Form & Google Maps Embed',
      'Mobile Speed & Viewport Optimization',
      'Direct cPanel/FTP or Free Vercel Cloud Deploy',
    ],
  },
  {
    name: 'Business Showcase',
    tagline: 'Multi-page architecture with speed tuning and WhatsApp form routing.',
    price: '₹8,999',
    frequency: 'turnkey ₹11,999 with domain & cloud',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Multi-Page Structure (Home, About, Services, Gallery, Contact)',
      '1-Click WhatsApp Lead & Order Routing',
      'Sub-Second Page Load Optimization',
      'Business Email Integration (Google/Zoho)',
      'Schema.org Rich Snippets & Local SEO',
      'Global Edge CDN Deployment with Zero Server Rent',
      'Priority Post-Launch Support',
    ],
  },
  {
    name: 'Custom Web & Growth',
    tagline: 'Custom Next.js App Router, database pooling, and aggressive Google ranking.',
    price: '₹24,999',
    frequency: 'or ₹14,999/mo ongoing SEO retainer',
    highlighted: false,
    badge: 'High Performance',
    features: [
      'Next.js 15 App Router & React 19 Architecture',
      'Neon PostgreSQL Serverless Database Integration',
      'AWS S3 Secure Cloud Asset Storage',
      'Core Web Vitals 99–100 Guarantee',
      'Aggressive Programmatic SEO & Keyword Strategy',
      'Razorpay / UPI Payment Gateway Setup',
      'Dedicated Senior Full-Stack Engineer',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Transparent Partnerships &bull; ₹ INR
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Predictable Pricing. <span className="text-[#0284c7]">Exponential Returns.</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            No hidden fees, no opaque agency billables. Choose the tier that matches your growth ambitions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-cyan-50/50 via-white to-white border-2 border-[#0284c7] shadow-xl shadow-cyan-500/10 lg:-translate-y-2'
                  : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900">{plan.name}</h3>
                  {!plan.highlighted && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="mt-6 mb-8 pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider mt-1 block">
                    {plan.frequency}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-cyan-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4">
                <Link
                  href="/pricing"
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white hover:opacity-95 shadow-md shadow-cyan-500/20'
                      : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300'
                  }`}
                >
                  <span>View Package &amp; Inclusions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="text-xs font-bold text-[#0284c7] hover:underline inline-flex items-center gap-1.5"
          >
            <span>Looking for Digital Menus, Appointment Sites, or Technical Add-Ons? View the full rate card</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
