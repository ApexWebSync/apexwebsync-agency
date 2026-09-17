'use client';

import { Star, MessageSquareQuote } from 'lucide-react';

const reviews = [
  {
    quote:
      'ApexWebSync rebuilt our web application in Next.js and took us from Page 4 to #1 on Google for our top commercial keywords. In just 90 days, our qualified inbound pipeline spiked by 340%.',
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'NexaFlow SaaS',
    rating: 5,
    metrics: '+340% Inbound Pipeline',
  },
  {
    quote:
      'The speed difference is staggering. Our mobile bounce rate was cut in half immediately after launch. Our PageSpeed jumped from 32 to 100/100, which made an immediate impact on our ad ROAS and SEO.',
    author: 'Elena Rostova',
    role: 'Head of Growth',
    company: 'Solis Commerce',
    rating: 5,
    metrics: '0.3s Mobile Load Time',
  },
  {
    quote:
      'Most agencies sell pretty designs that rank nowhere, or SEO "experts" who cannot code. ApexWebSync provides both: pristine Next.js code and relentless search engine rankings.',
    author: 'David Chen',
    role: 'Managing Director',
    company: 'Vertex Advisory Group',
    rating: 5,
    metrics: '#1 Rank for 42 Terms',
  },
];

export default function Testimonials() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-cyan-400" />
            Client Reviews
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by Founders & <span className="text-[#00d2ff]">Growth Leaders</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Hear directly from businesses who entrusted ApexWebSync to build their code and grow their search dominance.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl glass-card border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {rev.metrics}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00d2ff] to-[#2563eb] flex items-center justify-center font-bold text-slate-950 text-sm">
                  {rev.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                  <p className="text-xs text-slate-400">
                    {rev.role} • <span className="text-cyan-400">{rev.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
