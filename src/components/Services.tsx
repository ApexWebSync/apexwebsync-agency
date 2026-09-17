'use client';

import {
  Code,
  Search,
  Zap,
  ShoppingBag,
  LineChart,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    badge: 'Next.js & React 19',
    description:
      'We craft bespoke, lightning-fast web applications built on modern Next.js and TypeScript. Zero slow WordPress plugins or clunky themes—just clean, scalable code engineered to convert.',
    features: [
      'Next.js 15 App Router Architecture',
      'Server-Side Rendering (SSR) & Edge Caching',
      'Ultra-fluid interactive animations',
      'Mobile-first responsive fluid UI',
    ],
  },
  {
    icon: Search,
    title: 'Dominant SEO Ranking',
    badge: 'Page 1 Supremacy',
    description:
      'Turn search engines into your most lucrative customer acquisition channel. We combine deep technical SEO, semantic keyword clustering, and high-authority link engineering.',
    features: [
      'Core Web Vitals 99-100 Optimization',
      'Programmatic SEO & Content Silos',
      'Schema.org Rich Snippet Markup',
      'Competitive Search Gap Exploitation',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Headless E-Commerce & SaaS',
    badge: 'High Conversion',
    description:
      'Supercharged online stores and custom SaaS platforms that eliminate checkout friction and retain customers. Built with custom Neon databases and secure cloud storage.',
    features: [
      'Custom checkout & payment integrations',
      'Instant catalog search & filtering',
      'Scalable database & cloud assets (S3)',
      'Sub-500ms transaction speeds',
    ],
  },
  {
    icon: Zap,
    title: 'Speed & Performance Tuning',
    badge: 'Sub-Second TTFB',
    description:
      'Every 100ms of latency costs you 7% in lost conversions. We audit and rebuild slow codebases to achieve instant, sub-second global page loads that Google algorithms love.',
    features: [
      'Global Edge CDN distribution',
      'Automated next-gen image compression',
      'Zero layout shift (CLS: 0.00)',
      'Aggressive asset tree-shaking',
    ],
  },
  {
    icon: LineChart,
    title: 'Conversion Rate Optimization',
    badge: 'Revenue Maximizer',
    description:
      'Traffic without conversions is wasted budget. We analyze user friction points, run multivariate tests, and re-engineer pages to maximize pipeline and revenue.',
    features: [
      'User journey heatmap tracking',
      'Behavioral funnel drop-off analysis',
      'Persuasive conversion copywriting',
      'Scientific A/B split testing',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Cloud Architecture & Security',
    badge: 'Enterprise Grade',
    description:
      'End-to-end cloud deployments with automatic scaling, continuous integration, DDoS protection, and bulletproof SSL security to keep your digital assets safe.',
    features: [
      'Vercel Edge & Serverless Functions',
      'Neon PostgreSQL serverless pooling',
      'S3-compatible secure asset pipelines',
      'Zero-downtime CI/CD automated deploys',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered to <span className="text-[#00d2ff]">Build, Develop & Grow</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We don&apos;t just build websites; we engineer digital revenue engines. Every line of code is optimized for search prominence, performance, and user retention.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl glass-card glass-card-hover border border-white/10 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-300 -z-10" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {srv.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-white/5 pt-5">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
