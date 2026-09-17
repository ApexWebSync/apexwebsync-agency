'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, TrendingUp, Zap, Code2, Globe } from 'lucide-react';

export default function Hero() {
  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl) return;
    const auditInput = document.getElementById('audit-url-input') as HTMLInputElement | null;
    const auditSection = document.getElementById('audit');
    if (auditInput) {
      auditInput.value = quickUrl;
      auditInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Glow Orbs & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00d2ff]/20 via-[#2563eb]/20 to-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#00d2ff]/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-cyan-500/10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#00d2ff] animate-pulse" />
            <span>ApexWebSync Agency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-white">Build Develop and Grow</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]">
            We Engineer Websites That{' '}
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#2563eb] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,210,255,0.4)]">
              Dominate Search
            </span>{' '}
            & Convert Visitors
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed">
            Stop losing qualified customers to slower competitors. ApexWebSync combines sub-second Next.js web architecture with aggressive technical SEO to push your brand to Google’s top ranks.
          </p>

          {/* Quick Action / Audit Bar */}
          <div className="mt-10 w-full max-w-2xl">
            <form
              onSubmit={handleQuickAudit}
              className="p-1.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl focus-within:border-cyan-500/80 focus-within:shadow-[0_0_30px_rgba(0,210,255,0.2)] transition-all"
            >
              <div className="flex items-center gap-3 px-4 py-2 w-full text-slate-400">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your website URL (e.g. yourcompany.com)"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#1d4ed8] text-white text-sm font-semibold tracking-wide shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200"
              >
                <span>Audit My Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Free Live Diagnostic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Instant Score in Seconds
              </span>
            </div>
          </div>

          {/* Agency Pillars / Proof Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
            <div className="p-5 rounded-2xl glass-card text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">99+</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">Google PageSpeed</div>
              <p className="text-[11px] text-slate-400 mt-1">Sub-second Core Web Vitals for maximum SEO equity.</p>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">+350%</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">Avg Organic Lift</div>
              <p className="text-[11px] text-slate-400 mt-1">Targeting high-intent search terms that generate revenue.</p>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">Custom Code</div>
              <p className="text-[11px] text-slate-400 mt-1">Zero bloated WordPress templates. Pure modern React & Next.js.</p>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white">4.9/5</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">Client Satisfaction</div>
              <p className="text-[11px] text-slate-400 mt-1">Trusted by founders, scaleups, and enterprise brands.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
