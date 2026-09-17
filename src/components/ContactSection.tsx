'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, UploadCloud, MessageSquare, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [settings, setSettings] = useState<any>({});
  
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: 'Business Showcase (3–5 Pages)',
    budget: '₹8,999 – ₹14,999',
    message: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('website', formData.website);
      data.append('service', formData.service);
      data.append('budget', formData.budget);
      data.append('message', formData.message);
      if (file) {
        data.append('file', file);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to send inquiry.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        service: 'Business Showcase (3–5 Pages)',
        budget: '₹8,999 – ₹14,999',
        message: '',
      });
      setFile(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Start Your Project
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Let&apos;s Build, Develop and <span className="text-[#0284c7]">Grow Your Business</span>
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Ready to dominate search rankings and engineer a web application that outpaces the competition? Schedule a consultation or message our team on WhatsApp.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0284c7] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email Us Directly</div>
                    <a
                      href={`mailto:${settings.contact_email || 'apexwebsync@gmail.com'}`}
                      className="text-slate-900 font-bold text-sm sm:text-base hover:text-[#0284c7] transition-colors font-mono"
                    >
                      {settings.contact_email || 'apexwebsync@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">WhatsApp Direct (+91)</div>
                    <a
                      href={`https://wa.me/${(settings.whatsapp_number || '919876543210').replace(/[^0-9]/g, '')}?text=Hello%20ApexWebSync%20Team`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 font-bold text-sm sm:text-base hover:text-emerald-600 transition-colors"
                    >
                      {settings.contact_phone || settings.whatsapp_number || '+91 98765 43210'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0284c7] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Agency Location</div>
                    <div className="text-slate-900 font-bold text-sm sm:text-base">
                      {settings.agency_location || 'Bengaluru / Pan-India • Global Delivery'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-1">
                Our Guarantee
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every project is covered by our Core Web Vitals guarantee and clear milestones. Senior Indian full-stack engineers only.
              </p>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl relative">
              {success ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="mt-2 text-slate-600 text-sm max-w-md">
                    Thank you for contacting ApexWebSync. Our technical team has received your project details and will follow up with an actionable roadmap within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name <span className="text-[#0284c7]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Work Email <span className="text-[#0284c7]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Current Website (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://yourbrand.in"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-cyan-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Service Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                      >
                        <option>Starter Landing Page (₹3,499 – ₹5,999)</option>
                        <option>Business Showcase (3–5 Pages) (₹8,999 – ₹14,999)</option>
                        <option>Appointment &amp; Booking Site (₹11,999 – ₹18,499)</option>
                        <option>Digital Menu &amp; Direct Ordering (₹9,499 – ₹15,999)</option>
                        <option>Custom Next.js Web Development (₹24,999 – ₹49,999)</option>
                        <option>Headless E-Commerce &amp; SaaS (₹44,999 – ₹89,999)</option>
                        <option>Page 1 Supremacy (SEO) (₹14,999 / mo)</option>
                        <option>Sub-Second TTFB Speed Tuning (₹7,999 – ₹14,999)</option>
                        <option>Revenue Maximizer CRO Audit (₹12,999 – ₹24,999)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Estimated Budget (₹ INR)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                      >
                        <option>&lt; ₹6,000 (Starter)</option>
                        <option>₹6,000 – ₹15,000 (Business Showcase / Booking)</option>
                        <option>₹15,000 – ₹30,000 (Custom Web &amp; Growth)</option>
                        <option>₹30,000 – ₹60,000 (Advanced SaaS / E-Commerce)</option>
                        <option>₹60,000+ (Enterprise Platform)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Project Goals &amp; Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your target audience, current page load issues, target search terms in India or globally, or features you want built..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  {/* File Upload to S3 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Attach RFP, Brief, or Wireframe (Optional)
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-[#0284c7] cursor-pointer transition-all">
                      <UploadCloud className="w-5 h-5 text-[#0284c7] shrink-0" />
                      <span className="text-xs text-slate-600 truncate">
                        {file ? file.name : 'Upload PDF, DOCX, PNG, or ZIP (Max 15MB)'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
