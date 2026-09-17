'use client';

import { useState } from 'react';
import { DollarSign, Users, TrendingUp, Sparkles, ArrowRight, Percent } from 'lucide-react';

export default function RoiCalculator() {
  const [traffic, setTraffic] = useState(10000);
  const [dealValue, setDealValue] = useState(300);
  const [conversionRate, setConversionRate] = useState(1.5);

  // Calculations
  const currentMonthlyLeads = (traffic * (conversionRate / 100));
  const currentMonthlyRevenue = currentMonthlyLeads * dealValue;

  // With ApexWebSync (conservative estimates based on SEO ranking + sub-second speed)
  const trafficMultiplier = 2.8; // +180% organic SEO lift
  const crMultiplier = 1.6; // +60% conversion rate from Next.js sub-second speed & UX

  const projectedTraffic = traffic * trafficMultiplier;
  const projectedCr = Math.min(6.5, conversionRate * crMultiplier);
  const projectedMonthlyLeads = projectedTraffic * (projectedCr / 100);
  const projectedMonthlyRevenue = projectedMonthlyLeads * dealValue;

  const additionalMonthlyRevenue = Math.max(0, projectedMonthlyRevenue - currentMonthlyRevenue);
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI & Revenue Projection
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your <span className="text-[#00d2ff]">Growth Potential</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            See the compounding revenue impact of dominating top Google rankings combined with a sub-second, high-converting Next.js web application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Sliders Box */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-white mb-6">Your Current Baseline Metrics</h3>

            <div className="space-y-8">
              {/* Slider 1: Traffic */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Current Monthly Website Visitors
                  </label>
                  <span className="font-mono font-bold text-cyan-300 text-base">
                    {traffic.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1,000/mo</span>
                  <span>50,000/mo</span>
                  <span>100,000/mo</span>
                </div>
              </div>

              {/* Slider 2: Deal Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Average Customer / Contract Value
                  </label>
                  <span className="font-mono font-bold text-emerald-300 text-base">
                    {formatCurrency(dealValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>$50</span>
                  <span>$2,500</span>
                  <span>$5,000+</span>
                </div>
              </div>

              {/* Slider 3: Conversion Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-400" />
                    Current Conversion Rate
                  </label>
                  <span className="font-mono font-bold text-blue-300 text-base">
                    {conversionRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5.0}
                  step={0.1}
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0.5% (Low)</span>
                  <span>2.0% (Average)</span>
                  <span>5.0% (High)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Current Monthly Revenue:</span>
              <span className="font-mono font-bold text-white text-sm">
                {formatCurrency(currentMonthlyRevenue)}
              </span>
            </div>
          </div>

          {/* Projection Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#070a12] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Apex Growth Forecast
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Projected Lift
                </span>
              </div>

              <div className="mt-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Estimated New Annual Revenue
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 tracking-tight mt-1">
                  +{formatCurrency(additionalAnnualRevenue)}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  or <span className="text-emerald-400 font-bold">+{formatCurrency(additionalMonthlyRevenue)}</span> / month added pipeline
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm border-t border-white/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Projected Traffic (SEO Lift):</span>
                  <span className="font-mono font-bold text-white">
                    {Math.round(projectedTraffic).toLocaleString()} <span className="text-cyan-400 text-xs">(+180%)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Projected Conversion Rate:</span>
                  <span className="font-mono font-bold text-white">
                    {projectedCr.toFixed(1)}% <span className="text-cyan-400 text-xs">(+60%)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Conversions / Deals:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {Math.round(projectedMonthlyLeads).toLocaleString()} clients
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <a
                href="#contact"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#1d4ed8] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
              >
                <span>Unlock This Growth</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
