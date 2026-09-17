'use client';

import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Shield,
  Gauge,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface Diagnostic {
  category: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  recommendation?: string;
}

interface AuditResult {
  success: boolean;
  url: string;
  score: number;
  ttfbMs: number;
  diagnostics: Diagnostic[];
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    failed: number;
  };
}

export default function SeoAuditTool() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [stageText, setStageText] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'fail' | 'warning' | 'pass'>('all');

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const stages = [
      'Establishing secure SSL connection...',
      'Measuring Time to First Byte (TTFB)...',
      'Crawling HTML hierarchy and semantic tags...',
      'Checking Google mobile-readiness & viewport...',
      'Evaluating OpenGraph and social snippets...',
      'Compiling diagnostic scores & recommendations...',
    ];

    let currentStage = 0;
    setStageText(stages[0]);
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setStageText(stages[currentStage]);
      }
    }, 800);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      });

      clearInterval(interval);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete website audit.');
      }

      setResult(data);
    } catch (err: unknown) {
      clearInterval(interval);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const filteredDiagnostics = result?.diagnostics.filter((d) => {
    if (activeFilter === 'all') return true;
    return d.status === activeFilter;
  });

  return (
    <section id="audit" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Live Diagnostic Tool
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Free Real-Time <span className="text-[#00d2ff]">SEO & Speed Audit</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Test your website right now. Uncover Google ranking blockers, slow server response times, and missing SEO metadata in under 10 seconds.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative">
            <form onSubmit={runAudit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5 text-cyan-400" />
                  </div>
                  <input
                    id="audit-url-input"
                    type="text"
                    required
                    placeholder="Website URL (e.g. yourcompany.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Work Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#1d4ed8] text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Analyzing Site Architecture...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Instant Audit</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </form>

            {/* Loading Status Bar */}
            {loading && (
              <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center animate-pulse">
                <div className="flex items-center justify-center gap-3 text-cyan-300 text-sm font-medium">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>{stageText}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-rose-200">Analysis Failed</div>
                  <div>{error}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Audit Results Presentation */}
        {result && (
          <div className="mt-12 max-w-4xl mx-auto animate-fade-in">
            {/* Score Overview Card */}
            <div className="p-8 rounded-3xl glass-card border border-white/10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    <span>Audit Report For</span>
                    <span className="text-cyan-400 flex items-center gap-1 font-mono">
                      {result.url}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Apex SEO Health Score
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Server Response TTFB: <span className="font-mono text-cyan-300 font-semibold">{result.ttfbMs}ms</span>
                  </p>
                </div>

                {/* Score Dial */}
                <div className="flex items-center gap-6">
                  <div
                    className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-lg ${getScoreColor(
                      result.score
                    )}`}
                  >
                    <span className="text-4xl font-extrabold tracking-tight">{result.score}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">/ 100</span>
                  </div>

                  {/* Summary Counts */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-xl font-bold text-emerald-400">{result.summary.passed}</div>
                      <div className="text-[10px] uppercase font-medium text-slate-400">Passed</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="text-xl font-bold text-amber-400">{result.summary.warnings}</div>
                      <div className="text-[10px] uppercase font-medium text-slate-400">Warnings</div>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <div className="text-xl font-bold text-rose-400">{result.summary.failed}</div>
                      <div className="text-[10px] uppercase font-medium text-slate-400">Critical</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Filter by:</span>
                  {(['all', 'fail', 'warning', 'pass'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        activeFilter === filter
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {filter === 'fail' ? 'Critical' : filter}
                    </button>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                >
                  Want ApexWebSync to fix these issues for you?
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Diagnostic Checklist */}
              <div className="mt-6 space-y-3">
                {filteredDiagnostics?.map((diag, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#090e1a] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5">
                        {diag.status === 'pass' && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        {diag.status === 'warning' && (
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                        )}
                        {diag.status === 'fail' && (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{diag.title}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-slate-800 text-slate-300">
                            {diag.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {diag.detail}
                        </p>
                        {diag.recommendation && (
                          <div className="mt-2 text-xs text-cyan-300/90 font-medium bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-800/30">
                            Fix: {diag.recommendation}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          diag.status === 'pass'
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : diag.status === 'warning'
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-rose-400 bg-rose-500/10'
                        }`}
                      >
                        {diag.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA Banner */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Ready to achieve a 100/100 Core Web Vitals score?
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Our technical SEO and web development experts resolve bottlenecks and rank your target keywords.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 hover:opacity-90 shadow-lg shadow-cyan-500/20"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
