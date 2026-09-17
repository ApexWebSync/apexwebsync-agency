'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'SEO Audit', href: '#audit' },
    { name: 'ROI Calculator', href: '#calculator' },
    { name: 'Case Studies', href: '#cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070a12]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#2563eb] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
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
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#00d2ff] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00d2ff] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#00d2ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00d2ff] shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-[1.02] transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Free SEO Audit
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 border border-slate-700 hover:border-cyan-500 hover:text-white transition-all duration-200"
            >
              Contact Us
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#00d2ff] py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="#audit"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#00d2ff] to-[#38bdf8]"
              >
                <Zap className="w-4 h-4 fill-current" />
                Free SEO Audit
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-white border border-slate-700"
              >
                Get in Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
