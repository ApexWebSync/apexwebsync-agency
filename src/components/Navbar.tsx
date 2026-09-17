'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Zap, MessageCircle, Lock, Sparkles } from 'lucide-react';

interface SiteSettings {
  announcement_banner?: string;
  announcement_enabled?: boolean;
  whatsapp_number?: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({});
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic banner and settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing & Packages', href: '/pricing' },
    { name: 'Free SEO Audit', href: '/audit' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const waNumber = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919876543210';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Dynamic Top Announcement Banner */}
      {settings.announcement_enabled && settings.announcement_banner && (
        <div className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#2563eb] text-slate-950 py-1.5 px-4 text-center text-[11px] font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3 h-3 fill-current" />
          <span>{settings.announcement_banner}</span>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#070a12]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#2563eb] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
                <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="ApexWebSync Logo"
                    width={44}
                    height={44}
                    className="object-cover w-full h-full scale-110"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Apex<span className="text-[#00d2ff]">WebSync</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
                  Build Develop and Grow
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#00d2ff]'
                        : 'text-slate-300 hover:text-[#00d2ff]'
                    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#00d2ff] ${
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                    } after:transition-all after:duration-300`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`https://wa.me/${waNumber}?text=Hello%20ApexWebSync%20Team%2C%20I%20would%20like%20to%20discuss%20a%20website%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                WhatsApp (+91)
              </a>

              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#00d2ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00d2ff] shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                Free Audit
              </Link>

              <Link
                href="/admin"
                className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                title="Admin Portal"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 border-b border-white/5 ${
                  pathname === link.href ? 'text-[#00d2ff]' : 'text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <a
                href={`https://wa.me/${waNumber}?text=Hello%20ApexWebSync%20Team`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Direct (+91)
              </a>

              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#00d2ff] to-[#38bdf8]"
              >
                <Zap className="w-4 h-4 fill-current" />
                Run Free SEO Audit
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin Portal Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
