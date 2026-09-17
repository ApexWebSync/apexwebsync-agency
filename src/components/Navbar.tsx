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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);

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
    { name: 'Projects & Works', href: '/projects' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Free SEO Audit', href: '/audit' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const waNumber = settings.whatsapp_number?.replace(/[^0-9]/g, '') || '919876543210';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Banner */}
      {settings.announcement_enabled && settings.announcement_banner && (
        <div className="bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb] text-white py-1.5 px-4 text-center text-[11px] font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3 h-3 fill-current" />
          <span>{settings.announcement_banner}</span>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3'
            : 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00b4d8] via-[#0284c7] to-[#2563eb] shadow-md group-hover:shadow-lg transition-all duration-300">
                <div className="w-full h-full bg-[#0a1124] rounded-[10px] flex items-center justify-center overflow-hidden">
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
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Apex<span className="text-[#0284c7]">WebSync</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 group-hover:text-[#0284c7] transition-colors">
                  Build Develop and Grow
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#0284c7]'
                        : 'text-slate-700 hover:text-[#0284c7]'
                    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0284c7] ${
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
                WhatsApp (+91)
              </a>

              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb] hover:opacity-95 shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                Free Audit
              </Link>

              <Link
                href="/admin"
                className="p-2 rounded-full text-slate-500 hover:text-[#0284c7] hover:bg-slate-100 transition-colors"
                title="Admin Portal"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 border-b border-slate-100 ${
                  pathname === link.href ? 'text-[#0284c7]' : 'text-slate-700'
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
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-300"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
                WhatsApp Direct (+91)
              </a>

              <Link
                href="/audit"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]"
              >
                <Zap className="w-4 h-4 fill-current" />
                Run Free SEO Audit
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
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
