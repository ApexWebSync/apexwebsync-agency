import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Twitter, Sparkles, Shield, Database, Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070d] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#2563eb]">
                <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="ApexWebSync Logo"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full scale-110"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Apex<span className="text-[#00d2ff]">WebSync</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                  Build Develop and Grow
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs text-slate-400 max-w-sm leading-relaxed">
              ApexWebSync is a high-performance web development and search engine optimization agency. We build bespoke Next.js web applications and execute aggressive SEO campaigns to scale revenue.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-white/5 font-mono text-[11px] text-cyan-300">
                <Database className="w-3 h-3 text-cyan-400" /> Neon PostgreSQL
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-white/5 font-mono text-[11px] text-cyan-300">
                <Cloud className="w-3 h-3 text-cyan-400" /> S3 Cloud
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-white/5 font-mono text-[11px] text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Vercel Edge
              </span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Next.js Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Technical SEO Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Core Web Vitals 100/100
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Headless E-Commerce
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Conversion Rate Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Free Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Growth Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#audit" className="hover:text-cyan-400 transition-colors">
                  Live Free SEO Audit
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  Revenue Growth Calculator
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-cyan-400 transition-colors">
                  Case Studies & Metrics
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing & Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About ApexWebSync
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Schedule Consultation
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ApexWebSync. All rights reserved. &bull;{' '}
            <span className="text-slate-400">Slogan: Build Develop and Grow</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Systems 100% Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
