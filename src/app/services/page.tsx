import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldAlert, Cpu, Rocket } from 'lucide-react';

export const metadata = {
  title: 'Engineering & SEO Services | ApexWebSync India',
  description:
    'Custom Next.js web application development, Page 1 SEO supremacy, Core Web Vitals 100/100, and Headless E-Commerce solutions across India.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          Technical Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Bespoke Code &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]">Search Supremacy</span>
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">
          We replace bloated WordPress plugins and sluggish page builders with clean Next.js 15, TypeScript, and serverless Postgres infrastructure.
        </p>
      </div>

      <Services />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Architecture Audit?
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Our lead engineers will inspect your existing codebase, Core Web Vitals, and search gap opportunities to prepare a tailored sprint roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider shrink-0 hover:opacity-90 shadow-xl shadow-cyan-500/25 flex items-center gap-2"
          >
            <span>Book Technical Review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <CaseStudies />
    </div>
  );
}
