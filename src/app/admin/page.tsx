'use client';

import { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Edit3,
  Globe,
  Settings,
  ShieldCheck,
  Save,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  service?: string;
  budget?: string;
  message?: string;
  attachment_url?: string;
  status: string;
  notes?: string;
  created_at: string;
}

interface AuditRecord {
  id: number;
  url: string;
  email?: string;
  score: number;
  ttfb_ms?: number;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard Data
  const [activeTab, setActiveTab] = useState<'leads' | 'audits' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    announcement_banner: '',
    announcement_enabled: 'true',
    whatsapp_number: '',
    contact_email: '',
    contact_phone: '',
    agency_location: '',
  });

  const [loadingData, setLoadingData] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Filters & Selected Lead
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Check existing session
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setAudits(data.audits || []);
        setSettings(data.settings || {});
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setAuthenticated(true);
      setPassword('');
      fetchData();
    } catch (err: unknown) {
      setLoginError((err as Error).message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
  };

  const updateLeadStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });
      if (res.ok) {
        setLeads(
          leads.map((l) =>
            l.id === id ? { ...l, status: newStatus, notes: notes !== undefined ? notes : l.notes } : l
          )
        );
        if (selectedLead?.id === id) {
          setSelectedLead({
            ...selectedLead,
            status: newStatus,
            notes: notes !== undefined ? notes : selectedLead.notes,
          });
        }
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const deleteLead = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.service && lead.service.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login Screen
  if (authenticated === false) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-card border border-white/10 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white text-center">
            ApexWebSync Admin Portal
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1">
            Enter administrative master password to monitor leads and modify website data.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loggingIn ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading State
  if (authenticated === null) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center text-cyan-400">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              Authenticated Backend
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              ApexWebSync Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loadingData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Lead Monitoring ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('audits')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'audits'
                ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            SEO Audits Run ({audits.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            Website Data &amp; CMS
          </button>
        </div>

        {/* TAB 1: LEADS MONITORING */}
        {activeTab === 'leads' && (
          <div>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, email, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-slate-400 shrink-0 font-medium">Status:</span>
                {['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      statusFilter === st
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto rounded-2xl glass-card border border-white/10">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#090e1a] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Service &amp; Budget</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        {lead.website && (
                          <a
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                          >
                            {lead.website}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-300">{lead.email}</div>
                        {lead.phone && (
                          <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-cyan-400" />
                            {lead.phone}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium">{lead.service || 'Not specified'}</div>
                        <div className="text-cyan-300 text-[11px] font-mono">{lead.budget || 'Open'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-[#0b1120] border border-slate-700 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-cyan-400"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-rose-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        No leads match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Selected Lead Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                      <div className="text-xs text-cyan-400">{selectedLead.email}</div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Phone / WhatsApp:</span>
                      <span className="text-white">{selectedLead.phone || 'None'}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Website:</span>
                      <span className="text-white">{selectedLead.website || 'None'}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Selected Service:</span>
                      <span className="text-white">{selectedLead.service}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Estimated Budget:</span>
                      <span className="text-cyan-300 font-mono">{selectedLead.budget}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block">Project Message:</span>
                      <p className="p-3 rounded-xl bg-[#090e1a] border border-white/5 text-slate-300 mt-1 whitespace-pre-wrap">
                        {selectedLead.message || 'No additional message provided.'}
                      </p>
                    </div>

                    {selectedLead.attachment_url && (
                      <div>
                        <span className="text-slate-400 font-semibold block">Attachment (S3):</span>
                        <a
                          href={selectedLead.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline mt-1 font-mono"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Client Uploaded File
                        </a>
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10">
                      <label className="block text-slate-400 font-semibold mb-1">
                        Internal Admin Notes:
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={selectedLead.notes || ''}
                        onBlur={(e) => updateLeadStatus(selectedLead.id, selectedLead.status, e.target.value)}
                        placeholder="Add notes about call discussion, quotes sent, follow-ups..."
                        className="w-full p-2.5 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AUDITS TRACKER */}
        {activeTab === 'audits' && (
          <div className="overflow-x-auto rounded-2xl glass-card border border-white/10">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#090e1a] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Scanned URL</th>
                  <th className="py-3.5 px-4">Visitor Email</th>
                  <th className="py-3.5 px-4">SEO Score</th>
                  <th className="py-3.5 px-4">Server Latency (TTFB)</th>
                  <th className="py-3.5 px-4">Scan Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {audits.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-mono text-cyan-300">{a.url}</td>
                    <td className="py-3.5 px-4">{a.email || 'Anonymous'}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md ${
                          a.score >= 85
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : a.score >= 60
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-rose-400 bg-rose-500/10'
                        }`}
                      >
                        {a.score} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{a.ttfb_ms ? `${a.ttfb_ms}ms` : 'N/A'}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {new Date(a.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: WEBSITE DATA MODIFICATION (CMS) */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl glass-card border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Live Website Data &amp; CMS</h3>
            <p className="text-xs text-slate-400 mb-6">
              Modify top announcements, agency contact details, and WhatsApp routing in real-time. Changes are stored in Neon PostgreSQL and take effect immediately.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Top Announcement Banner Text
                </label>
                <input
                  type="text"
                  value={settings.announcement_banner || ''}
                  onChange={(e) =>
                    setSettings({ ...settings, announcement_banner: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="announcement_enabled"
                  checked={settings.announcement_enabled === 'true'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      announcement_enabled: e.target.checked ? 'true' : 'false',
                    })
                  }
                  className="w-4 h-4 rounded accent-[#00d2ff]"
                />
                <label htmlFor="announcement_enabled" className="text-xs text-slate-300 font-medium">
                  Enable Announcement Banner at Top of Website
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp Chat Number (+91 format)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp_number || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, whatsapp_number: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, contact_email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.contact_phone || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, contact_phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Agency Hub Location
                  </label>
                  <input
                    type="text"
                    value={settings.agency_location || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, agency_location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {settingsSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Website settings and banner updated successfully in Neon DB!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'Saving Changes...' : 'Save Website Settings'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
