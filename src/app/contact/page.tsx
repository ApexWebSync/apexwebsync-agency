import ContactSection from '@/components/ContactSection';
import { MessageSquare, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact & Consultation | ApexWebSync India',
  description:
    'Schedule a consultation with ApexWebSync. Contact us at apexwebsync@gmail.com or connect directly via WhatsApp.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Technical Intake
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Let&apos;s Discuss Your <span className="text-[#00d2ff]">Next Project</span>
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
          Reach out for turnkey quotes, custom web development milestones, or monthly SEO sprint retainers.
        </p>

        {/* Quick Contact Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:apexwebsync@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 text-xs font-semibold"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            apexwebsync@gmail.com
          </a>
          <a
            href="https://wa.me/919876543210?text=Hello%20ApexWebSync%20Team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Chat on WhatsApp (+91)
          </a>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
