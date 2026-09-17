import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Compass, Users, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | ApexWebSync India - Build Develop and Grow',
  description:
    'ApexWebSync is an Indian web engineering and SEO agency delivering global standard Next.js applications and top search rankings.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission &amp; Ethos
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Build, Develop and <span className="text-[#00d2ff]">Grow</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            ApexWebSync was founded with a singular conviction: businesses shouldn&apos;t have to choose between a visually stunning design and a lightning-fast, high-ranking search presence.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Engineering Excellence from India for the World
            </h2>
            <p>
              Based out of India, ApexWebSync serves clients across metropolitan hubs (Bengaluru, Mumbai, Delhi-NCR, Hyderabad) and worldwide. Our engineering team specializes in custom full-stack web applications and mathematical, data-driven SEO.
            </p>
            <p>
              Too many businesses in India are misled by generic agencies selling 5-year-old WordPress templates bloated with 40+ plugins, which crawl at 4-second load speeds and get penalized by Google&apos;s Core Web Vitals.
            </p>
            <p>
              We bring enterprise-grade Next.js, Edge CDN caching, Neon PostgreSQL serverless pooling, and white-hat programmatic SEO to businesses of all sizes at competitive, transparent Indian market rates.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="p-4 rounded-2xl glass-card border border-white/5 flex-1 min-w-[140px]">
                <div className="text-2xl font-extrabold text-[#00d2ff]">100%</div>
                <div className="text-xs text-slate-400 mt-1">In-House Engineers</div>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/5 flex-1 min-w-[140px]">
                <div className="text-2xl font-extrabold text-emerald-400">&lt; 0.4s</div>
                <div className="text-xs text-slate-400 mt-1">Target Server TTFB</div>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/5 flex-1 min-w-[140px]">
                <div className="text-2xl font-extrabold text-cyan-300">24/7</div>
                <div className="text-xs text-slate-400 mt-1">Direct WhatsApp Support</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-1 bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#2563eb] shadow-2xl shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070a12] rounded-[22px] flex items-center justify-center p-8 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="ApexWebSync Logo Emblem"
                  width={360}
                  height={360}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl glass-card border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Build</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We architect solid digital foundations. Every codebase is typed, modular, responsive, and stripped of unnecessary bloat.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Develop</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We craft high-converting user journeys, seamless checkout flows, serverless database interactions, and frictionless appointments.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Grow</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We push your business to Google&apos;s Page 1. Relentless technical and semantic search optimization that captures customer demand.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d1c38] to-[#070a12] border-2 border-cyan-500/40 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to partner with ApexWebSync?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Get in touch directly with our leadership team for a project roadmap and milestone estimate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all"
            >
              View Transparent Packages
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 hover:bg-slate-700 transition-all"
            >
              Contact Us Directly
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
