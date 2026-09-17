'use client';

import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Web Launchpad',
    tagline: 'For startups & businesses seeking a modern, ultra-fast web presence.',
    price: '$2,490',
    frequency: 'one-time investment',
    highlighted: false,
    badge: 'Fast Delivery',
    features: [
      'Custom Next.js 15 Web Application',
      'Modern, Bespoke UI/UX Design (Tailwind CSS)',
      'Sub-Second Load Times (95+ PageSpeed)',
      'Baseline On-Page & Schema.org SEO',
      'Integrated Contact & Lead Capture Forms',
      'Mobile-First Responsive Layout',
      'Global CDN & Vercel Deployment',
      '14 Days Post-Launch Support',
    ],
  },
  {
    name: 'Growth Accelerator',
    tagline: 'Our flagship solution: High-converting Next.js app + Aggressive Monthly SEO.',
    price: '$4,890',
    frequency: 'project + monthly SEO sprint',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in Web Launchpad',
      'Core Web Vitals 99-100 Guarantee',
      'Deep Keyword Research & Competitor Gap Analysis',
      'Semantic Topic Silos & Programmatic SEO Setup',
      'Neon PostgreSQL Database & Lead Routing',
      'S3 Secure Document & Asset Uploads',
      'Conversion Rate Optimization (CRO) Funnels',
      'Monthly Ranking Reports & Dedicated SEO Manager',
      'Bi-Weekly Strategy & Analytics Reviews',
    ],
  },
  {
    name: 'Enterprise Apex',
    tagline: 'Complete bespoke web software, programmatic scale, and total search domination.',
    price: 'Custom',
    frequency: 'tailored to enterprise scope',
    highlighted: false,
    badge: 'Enterprise',
    features: [
      'Full Custom SaaS or Headless E-Commerce Platform',
      'Thousands of Programmatic Target Landing Pages',
      'Custom Database Architecture & API Integrations',
      'Dedicated Full-Stack Lead Engineer & SEO Director',
      'High-Authority Backlink Acquisition Campaigns',
      'Multi-Region Cloud Deployment & SLA Guarantee',
      'A/B Split Testing & Advanced Behavioral Analytics',
      'Priority 24/7 Slack & Phone Support',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Transparent Partnerships
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Predictable Pricing. <span className="text-[#00d2ff]">Exponential Returns.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
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
                  ? 'bg-gradient-to-b from-[#0f1d38] via-[#0d162b] to-[#070a12] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20 lg:-translate-y-3'
                  : 'glass-card border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 text-xs font-extrabold uppercase tracking-widest shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                  {!plan.highlighted && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="mt-6 mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider mt-1 block">
                    {plan.frequency}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4">
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#1d4ed8] text-slate-950 shadow-xl shadow-cyan-500/25'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
