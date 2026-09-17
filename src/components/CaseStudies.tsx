'use client';

import { TrendingUp, ArrowUpRight, Award, Zap, CheckCircle2 } from 'lucide-react';

const cases = [
  {
    client: 'CloudScale Technologies',
    industry: 'B2B SaaS / DevOps Platform',
    title: 'From Page 4 to #1 Rank on High-Value Search Terms',
    summary:
      'CloudScale was struggling with a legacy bloated WordPress site taking 3.8s to load. We redesigned the entire web architecture with Next.js, executed programmatic SEO, and achieved 100/100 Core Web Vitals.',
    metrics: [
      { label: 'PageSpeed Score', before: '28 / 100', after: '99 / 100', change: '+253%' },
      { label: 'Organic Traffic', before: '4,200/mo', after: '28,400/mo', change: '+576%' },
      { label: 'Qualified Inbound Leads', before: '14/mo', after: '78/mo', change: '+457%' },
    ],
    tags: ['Next.js App Router', 'Technical SEO', 'PostgreSQL DB', 'Schema Markup'],
  },
  {
    client: 'Aura Luxe Living',
    industry: 'High-End Direct-to-Consumer Goods',
    title: 'Headless Rebuild Generating +$480K in New Revenue',
    summary:
      'High mobile bounce rate was bleeding revenue. ApexWebSync engineered a headless store on Edge CDN with instantaneous image caching and streamlined 1-click checkout.',
    metrics: [
      { label: 'Mobile Page Load', before: '4.2s', after: '0.4s', change: '-90%' },
      { label: 'Mobile Conversion Rate', before: '1.4%', after: '4.1%', change: '+192%' },
      { label: 'Google Top 3 Keywords', before: '12', after: '142', change: '+1,083%' },
    ],
    tags: ['Headless E-Commerce', 'Edge Caching', 'CRO & UX', 'Core Web Vitals'],
  },
  {
    client: 'Vanguard Capital Partners',
    industry: 'Private Equity & Financial Advisory',
    title: 'Dominating Local & National Institutional Search',
    summary:
      'Built a sleek, high-security web platform with custom client document portal integration via AWS S3 and automated lead routing directly into Neon PostgreSQL.',
    metrics: [
      { label: 'Organic Impressions', before: '18k/mo', after: '115k/mo', change: '+538%' },
      { label: 'Server TTFB Response', before: '1,100ms', after: '140ms', change: '-87%' },
      { label: 'Deal Inquiries', before: '3/mo', after: '22/mo', change: '+633%' },
    ],
    tags: ['Enterprise Web App', 'Neon PostgreSQL', 'S3 Cloud Storage', 'Authority SEO'],
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Real Results. <span className="text-[#00d2ff]">Verifiable Growth.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            See how ApexWebSync turns sluggish digital assets into high-ranking market leaders with measurable revenue impact.
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-8">
          {cases.map((item, index) => (
            <div
              key={index}
              className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Story */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {item.client}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span className="text-xs text-slate-400 font-medium">
                      {item.industry}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed font-normal">
                    {item.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Metrics Grid */}
                <div className="lg:col-span-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-[#090e1a] border border-white/5">
                    {item.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col justify-between text-center sm:text-left"
                      >
                        <div className="text-[11px] font-medium text-slate-400">{m.label}</div>
                        <div className="my-2">
                          <div className="text-xs line-through text-slate-500 font-mono">
                            {m.before}
                          </div>
                          <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                            {m.after}
                          </div>
                        </div>
                        <div className="inline-flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit mx-auto sm:mx-0">
                          <TrendingUp className="w-3 h-3" />
                          <span>{m.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
