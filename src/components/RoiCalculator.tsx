'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Sparkles, ArrowRight, Percent, IndianRupee } from 'lucide-react';

export default function RoiCalculator() {
  const [traffic, setTraffic] = useState(0);
  const [dealValue, setDealValue] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  // Calculations
  const currentMonthlyLeads = traffic * (conversionRate / 100);
  const currentMonthlyRevenue = currentMonthlyLeads * dealValue;

  // With ApexWebSync (India market calibrated)
  const trafficMultiplier = 2.8; // +180% organic SEO lift
  const crMultiplier = 1.6; // +60% conversion rate from Next.js sub-second speed & UX

  const isNewSite = traffic === 0;
  const projectedTraffic = traffic > 0 ? Math.round(traffic * trafficMultiplier) : (dealValue > 0 ? 1200 : 0);
  const effectiveCr = conversionRate > 0 ? conversionRate : 1.5;
  const projectedCr = Math.min(6.5, Number((effectiveCr * crMultiplier).toFixed(1)));
  const projectedMonthlyLeads = Math.round(projectedTraffic * (projectedCr / 100));
  const projectedMonthlyRevenue = projectedMonthlyLeads * dealValue;

  const additionalMonthlyRevenue = Math.max(0, projectedMonthlyRevenue - currentMonthlyRevenue);
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI &amp; Revenue Projection (₹ INR)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb]">Growth Potential</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            See the direct financial returns of dominating top Google rankings in India paired with an ultra-fast Next.js web application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Sliders Box */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Your Current Baseline Metrics</h3>
              {(traffic > 0 || dealValue > 0 || conversionRate > 0) && (
                <button
                  onClick={() => {
                    setTraffic(0);
                    setDealValue(0);
                    setConversionRate(0);
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-[#0284c7] transition-colors"
                >
                  Reset to 0
                </button>
              )}
            </div>

            <div className="space-y-8">
              {/* Slider 1: Traffic */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0284c7]" />
                    Current Monthly Website Visitors
                  </label>
                  <span className="font-mono font-bold text-[#0284c7] text-base">
                    {traffic.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={500}
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0/mo</span>
                  <span>50,000/mo</span>
                  <span>1,00,000/mo</span>
                </div>
              </div>

              {/* Slider 2: Deal Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    Average Order / Customer Value (₹ INR)
                  </label>
                  <span className="font-mono font-bold text-emerald-700 text-base">
                    {formatINR(dealValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={250}
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹0</span>
                  <span>₹25,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Slider 3: Conversion Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-blue-600" />
                    Current Conversion Rate
                  </label>
                  <span className="font-mono font-bold text-blue-600 text-base">
                    {conversionRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5.0}
                  step={0.1}
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0.0%</span>
                  <span>2.5% (Average)</span>
                  <span>5.0% (High)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Current Monthly Revenue:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatINR(currentMonthlyRevenue)}
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
                  Estimated Additional Annual Revenue
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 tracking-tight mt-1">
                  +{formatINR(additionalAnnualRevenue)}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  or <span className="text-emerald-400 font-bold">+{formatINR(additionalMonthlyRevenue)}</span> / month added pipeline
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm border-t border-white/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Projected Traffic (SEO Lift):</span>
                  <span className="font-mono font-bold text-white">
                    {Math.round(projectedTraffic).toLocaleString('en-IN')}{' '}
                    <span className="text-cyan-400 text-xs">
                      {isNewSite ? (dealValue > 0 ? '(New Launch)' : '(+180%)') : '(+180%)'}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Projected Conversion Rate:</span>
                  <span className="font-mono font-bold text-white">
                    {conversionRate === 0 && dealValue === 0 ? '0.0%' : `${projectedCr.toFixed(1)}%`}{' '}
                    <span className="text-cyan-400 text-xs">
                      {conversionRate > 0 ? '(+60%)' : '(Optimized UX)'}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Conversions / Orders:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {Math.round(projectedMonthlyLeads).toLocaleString('en-IN')} clients
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6">
              <Link
                href="/pricing"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>View Matching Packages</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
