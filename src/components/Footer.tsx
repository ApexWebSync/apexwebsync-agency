import Image from 'next/image';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin, Database, Cloud, Sparkles, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00b4d8] via-[#0284c7] to-[#2563eb]">
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
                  Apex<span className="text-[#38bdf8]">WebSync</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                  Build Develop and Grow
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs text-slate-400 max-w-sm leading-relaxed">
              ApexWebSync is an Indian web development and SEO ranking agency. We engineer sub-second Next.js web applications, digital menus, appointment portals, and high-converting search strategies for modern brands.
            </p>

            {/* Direct Contacts */}
            <div className="mt-5 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href="mailto:apexwebsync@gmail.com" className="hover:text-cyan-400 font-mono text-white">
                  apexwebsync@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919876543210?text=Hello%20ApexWebSync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 text-slate-200"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>India Tech Hub &bull; Serving Pan-India &amp; Global Clients</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2.5 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">
                <Database className="w-3 h-3 text-cyan-400" /> Neon Postgres
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">
                <Cloud className="w-3 h-3 text-cyan-400" /> S3 Cloud
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Vercel Edge
              </span>
            </div>
          </div>

          {/* Quick Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Website Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                  Projects &amp; Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing &amp; Packages (₹ INR)
                </Link>
              </li>
              <li>
                <Link href="/audit" className="hover:text-cyan-400 transition-colors">
                  Free SEO &amp; Speed Audit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Popular Packages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Starter Landing Page (₹3,499)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Business Showcase (₹8,999)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Appointment &amp; Booking Site
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Digital Menu &amp; WhatsApp Order
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Page 1 SEO Supremacy
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
                  Custom Next.js Web App
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Management
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/admin" className="text-cyan-400 hover:underline flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Admin Portal Login
                </Link>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  ROI Growth Calculator
                </a>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Active Sprint Pipeline
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Engagement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ApexWebSync India. All rights reserved. &bull;{' '}
            <span className="text-slate-400">Slogan: Build Develop and Grow</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Contact: apexwebsync@gmail.com</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Pan-India Support Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
