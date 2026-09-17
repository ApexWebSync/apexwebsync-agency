'use client';

import { useState } from 'react';
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-slate-50">
      {/* Soft Glow Orbs & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#00b4d8]/15 via-[#2563eb]/10 to-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>ApexWebSync Agency India</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="text-slate-700 font-bold">Build Develop and Grow</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl leading-[1.15]">
            We Engineer Websites That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]">
              Dominate Search
            </span>{' '}
            &amp; Convert Visitors
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl font-normal leading-relaxed">
            Stop losing qualified Indian &amp; global customers to slower competitors. ApexWebSync combines sub-second Next.js web architecture with aggressive technical SEO to push your brand to Google’s top ranks.
          </p>

          {/* Quick Action / Audit Bar */}
          <div className="mt-10 w-full max-w-2xl">
            <form
              onSubmit={handleQuickAudit}
              className="p-2 rounded-2xl bg-white border border-slate-300 shadow-xl shadow-slate-200/60 flex flex-col sm:flex-row items-center gap-2 focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-cyan-100 transition-all"
            >
              <div className="flex items-center gap-3 px-4 py-2 w-full text-slate-400">
                <Globe className="w-5 h-5 text-[#0284c7] shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your website URL (e.g. yourcompany.in)"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] hover:opacity-90 text-white text-sm font-semibold tracking-wide shrink-0 flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                <span>Audit My Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Free Live Diagnostic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Score in 10 Seconds
              </span>
            </div>
          </div>

          {/* Agency Proof Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-left shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-cyan-50 text-[#0284c7] w-fit mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">99+</div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">Google PageSpeed</div>
              <p className="text-[11px] text-slate-500 mt-1">Sub-second Core Web Vitals for maximum SEO equity.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-left shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">+350%</div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">Avg Organic Lift</div>
              <p className="text-[11px] text-slate-500 mt-1">High-intent search terms across India &amp; globally.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-left shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-cyan-50 text-[#0284c7] w-fit mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">Custom Code</div>
              <p className="text-[11px] text-slate-500 mt-1">Zero bloated plugins. Pure modern Next.js 15 &amp; React.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-left shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900">4.9/5</div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">Client Satisfaction</div>
              <p className="text-[11px] text-slate-500 mt-1">Trusted by Indian founders and expanding enterprises.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
