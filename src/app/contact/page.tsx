import ContactSection from '@/components/ContactSection';
import { MessageSquare, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { getAllSiteSettings } from '@/lib/db';

export const metadata = {
  title: 'Contact & Consultation | ApexWebSync India',
  description:
    'Schedule a consultation with ApexWebSync. Contact us at apexwebsync@gmail.com or connect directly via WhatsApp.',
};

export default async function ContactPage() {
  const settings = await getAllSiteSettings();
  const contactEmail = settings.contact_email || 'apexwebsync@gmail.com';
  const whatsappNumber = settings.whatsapp_number || '+91 98765 43210';
  const waClean = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Technical Intake
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Let&apos;s Discuss Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]">Next Project</span>
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Reach out for turnkey quotes, custom web development milestones, or monthly SEO sprint retainers.
        </p>

        {/* Quick Contact Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:border-[#0284c7] hover:text-[#0284c7] text-xs font-semibold shadow-sm transition-all"
          >
            <Mail className="w-4 h-4 text-[#0284c7]" />
            {contactEmail}
          </a>
          <a
            href={`https://wa.me/${waClean}?text=Hello%20ApexWebSync%20Team`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
            Chat on WhatsApp (+91)
          </a>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
