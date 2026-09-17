'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, UploadCloud, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: 'Full Growth Package (Web Dev + SEO)',
    budget: '$3,000 - $5,000',
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
        service: 'Full Growth Package (Web Dev + SEO)',
        budget: '$3,000 - $5,000',
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Start Your Project
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s Build, Develop and <span className="text-[#00d2ff]">Grow Your Business</span>
              </h2>
              <p className="mt-4 text-slate-300 text-base leading-relaxed">
                Ready to dominate search rankings and engineer a web application that outpaces the competition? Schedule a consultation or send us your RFP.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email Us Directly</div>
                    <div className="text-white font-semibold text-sm sm:text-base">
                      contact@apexwebsync.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Discovery Call</div>
                    <div className="text-white font-semibold text-sm sm:text-base">
                      Schedule a 30-min strategy review
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Global Execution</div>
                    <div className="text-white font-semibold text-sm sm:text-base">
                      Worldwide Client Coverage
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl glass-card border border-white/5">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                Our Guarantee
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every project is covered by our Core Web Vitals guarantee and clear milestones. No junior subcontractors—experienced senior engineers only.
              </p>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl relative">
              {success ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="mt-2 text-slate-300 text-sm max-w-md">
                    Thank you for reaching out to ApexWebSync. Our technical team has received your project details and will follow up with an actionable roadmap within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider hover:bg-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Work Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Current Website (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="https://yourcompany.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Service Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                      >
                        <option>Full Growth Package (Web Dev + SEO)</option>
                        <option>Custom Next.js Web Development</option>
                        <option>Dominant Technical & Organic SEO</option>
                        <option>Speed Optimization & Core Web Vitals</option>
                        <option>Headless E-Commerce / SaaS Platform</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                      >
                        <option>&lt; $2,500</option>
                        <option>$2,500 - $5,000</option>
                        <option>$5,000 - $10,000</option>
                        <option>$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Goals & Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current roadblocks, target search terms, desired timeline, or features you want to build..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* File Upload to S3 */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Attach RFP, Brief, or Wireframe (Optional)
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0b1120] border border-dashed border-slate-700 hover:border-cyan-400 cursor-pointer transition-all">
                      <UploadCloud className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span className="text-xs text-slate-400 truncate">
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
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#1d4ed8] text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4 text-slate-950" />
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
