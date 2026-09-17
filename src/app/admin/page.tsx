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
  Tag,
  Gift,
  Percent,
  IndianRupee,
  Plus,
  X,
  Copy,
  Check,
  Sparkles,
  Zap,
  Megaphone,
  CreditCard,
  Layers,
  ArrowRight,
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

interface ReferralCode {
  id: number;
  code: string;
  referrer_name: string;
  contact_info?: string;
  commission_type: 'percentage' | 'fixed';
  commission_value: number;
  discount_value: number;
  status: 'Active' | 'Paused' | 'Expired';
  usage_count: number;
  notes?: string;
  created_at: string;
}

interface StandardPackage {
  tier: string;
  deliverables: string;
  hosting: string;
  clientHostPrice: string;
  turnkeyPrice: string;
  turnkeyNote?: string;
  recommended: boolean;
}

interface EngineeringService {
  service: string;
  deliverables: string;
  useCase: string;
  price: string;
  subPrice?: string;
  type: string;
}

interface TechnicalAddOn {
  title: string;
  desc: string;
  price: string;
  subPrice?: string;
}

interface PricingConfig {
  standardPackages: StandardPackage[];
  engineeringServices: EngineeringService[];
  technicalAddOns: TechnicalAddOn[];
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'offer' | 'pricing' | 'referrals' | 'audits' | 'settings'>('leads');

  // Data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [audits, setAudits] = useState<AuditRecord[]>([]);
  const [referrals, setReferrals] = useState<ReferralCode[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    announcement_banner: '⚡ Special Offer: 20% Off on All Turnkey Web Development Packages for Indian Businesses!',
    announcement_enabled: 'true',
    offer_badge: 'LIMITED TIME OFFER',
    offer_coupon: 'APEX20',
    offer_link: '/pricing',
    whatsapp_number: '+919876543210',
    contact_email: 'apexwebsync@gmail.com',
    contact_phone: '+91 98765 43210',
    agency_location: 'Bengaluru / Pan-India',
  });

  const [pricing, setPricing] = useState<PricingConfig | null>(null);

  const [loadingData, setLoadingData] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Filter & Selected Lead
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Referral Modal State
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState<ReferralCode | null>(null);
  const [referralForm, setReferralForm] = useState({
    code: '',
    referrer_name: '',
    contact_info: '',
    commission_type: 'percentage' as 'percentage' | 'fixed',
    commission_value: 10,
    discount_value: 10,
    status: 'Active' as 'Active' | 'Paused' | 'Expired',
    notes: '',
  });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
        if (data.settings) setSettings(data.settings);
        setReferrals(data.referrals || []);
        setAuthenticated(true);

        // Fetch pricing
        const priceRes = await fetch('/api/admin/pricing');
        if (priceRes.ok) {
          const pData = await priceRes.json();
          if (pData.pricing) setPricing(pData.pricing);
        }
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
      if (res.ok && data.success) {
        setAuthenticated(true);
        setPassword('');
        fetchData();
      } else {
        setLoginError(data.error || 'Invalid password.');
      }
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

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleSaveSettings = async (customSettings?: Record<string, string>) => {
    setSavingSettings(true);
    try {
      const payload = customSettings || settings;
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification('Settings saved and live on website!');
      } else {
        alert('Failed to save settings.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSavePricing = async () => {
    if (!pricing) return;
    setSavingSettings(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing),
      });

      if (res.ok) {
        showNotification('Pricing packages updated successfully across website!');
      } else {
        alert('Failed to save pricing.');
      }
    } catch {
      alert('Error updating pricing.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateLead = async (leadId: number, status: string, notes?: string) => {
    try {
      const res = await fetch('/api/admin/lead', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status, notes }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status, notes: notes ?? l.notes } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status, notes: notes ?? prev.notes } : null));
        }
        showNotification('Lead record updated.');
      }
    } catch {
      alert('Failed to update lead.');
    }
  };

  // Referral CRUD
  const handleSaveReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingReferral ? 'PUT' : 'POST';
      const payload = editingReferral
        ? { ...referralForm, id: editingReferral.id }
        : referralForm;

      const res = await fetch('/api/admin/referrals', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setReferralModalOpen(false);
        setEditingReferral(null);
        setReferralForm({
          code: '',
          referrer_name: '',
          contact_info: '',
          commission_type: 'percentage',
          commission_value: 10,
          discount_value: 10,
          status: 'Active',
          notes: '',
        });
        fetchData();
        showNotification(editingReferral ? 'Referral updated.' : 'Referral code created.');
      } else {
        alert(data.error || 'Failed to save referral code.');
      }
    } catch (err: unknown) {
      alert((err as Error).message);
    }
  };

  const handleUpdateReferralUsage = async (id: number, delta: number) => {
    const ref = referrals.find((r) => r.id === id);
    if (!ref) return;
    const newCount = Math.max(0, ref.usage_count + delta);

    try {
      const res = await fetch('/api/admin/referrals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, usage_count: newCount }),
      });

      if (res.ok) {
        setReferrals((prev) =>
          prev.map((r) => (r.id === id ? { ...r, usage_count: newCount } : r))
        );
      }
    } catch {
      alert('Failed to update usage count.');
    }
  };

  const handleDeleteReferral = async (id: number) => {
    if (!confirm('Are you sure you want to delete this referral code?')) return;
    try {
      const res = await fetch(`/api/admin/referrals?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReferrals((prev) => prev.filter((r) => r.id !== id));
        showNotification('Referral code removed.');
      }
    } catch {
      alert('Failed to delete referral.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2500);
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
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-slate-50">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#0284c7]">
              <Lock className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 text-center tracking-tight">
            ApexWebSync Admin Portal
          </h2>
          <p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
            Enter administrative master password to monitor client leads, edit pricing, and manage website announcements.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-60"
            >
              {loggingIn ? 'Verifying Credentials...' : 'Access Command Center'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading State
  if (authenticated === null) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center text-[#0284c7] bg-slate-50">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0284c7]">
              <ShieldCheck className="w-4 h-4" />
              Authenticated Executive Portal
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              ApexWebSync Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loadingData}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin text-[#0284c7]' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {saveSuccessMsg && (
          <div className="my-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 my-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Client Leads</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-white">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('offer')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'offer'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Top Offer Banner</span>
            {settings.announcement_enabled === 'true' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'pricing'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Pricing Packages CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'referrals'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>Offline Referral Codes</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-mono">
              {referrals.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('audits')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'audits'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span>SEO Audits Log</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700">
              {audits.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Agency Info</span>
          </button>
        </div>

        {/* TAB 1: CLIENT LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search client name, email, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      statusFilter === status
                        ? 'bg-[#0284c7] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Service &amp; Budget</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Received</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          No inquiries match your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                            {lead.website && (
                              <a
                                href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0284c7] hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <span>{lead.website}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </td>
                          <td className="px-6 py-4 space-y-1">
                            <div className="font-mono text-slate-800">{lead.email}</div>
                            {lead.phone && (
                              <div className="text-slate-500 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-900 font-semibold">{lead.service || 'Not specified'}</div>
                            <div className="text-emerald-700 font-medium font-mono text-[11px]">
                              {lead.budget || 'Budget unspecified'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLead(lead.id, e.target.value)}
                              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                                lead.status === 'New'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : lead.status === 'Converted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : lead.status === 'In Progress'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-[11px]">
                            {new Date(lead.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold inline-flex items-center gap-1.5 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#0284c7]" />
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#0284c7] border border-cyan-200">
                        Lead #{selectedLead.id}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedLead.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-slate-400 hover:text-slate-700 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Email:</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-[#0284c7] font-mono font-bold">
                        {selectedLead.email}
                      </a>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Phone:</span>
                      <span className="text-slate-900 font-bold">{selectedLead.phone || 'None'}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Website:</span>
                      <span className="text-slate-900">{selectedLead.website || 'None'}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Budget:</span>
                      <span className="text-emerald-700 font-bold">{selectedLead.budget || 'Not set'}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Client Project Requirements
                    </span>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedLead.message || 'No project description provided.'}
                    </div>
                  </div>

                  {selectedLead.attachment_url && (
                    <div className="mb-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0284c7]">
                        <FileText className="w-4 h-4" />
                        <span>S3 Cloud Attachment Included</span>
                      </div>
                      <a
                        href={selectedLead.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-cyan-300 text-xs font-bold text-[#0284c7] hover:bg-cyan-50 flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Download File</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Internal Team Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add private team notes, meeting minutes, quote discussions..."
                      defaultValue={selectedLead.notes || ''}
                      onBlur={(e) => handleUpdateLead(selectedLead.id, selectedLead.status, e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TOP OFFER & ANNOUNCEMENT BANNER */}
        {activeTab === 'offer' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-[#0284c7]" />
                    Top Announcement &amp; Offer Banner
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Control the promotional ribbon displayed at the very top of all screens across the website.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Banner Visibility:</span>
                  <button
                    onClick={() => {
                      const updated = settings.announcement_enabled === 'true' ? 'false' : 'true';
                      setSettings({ ...settings, announcement_enabled: updated });
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      settings.announcement_enabled === 'true'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border border-slate-300'
                    }`}
                  >
                    {settings.announcement_enabled === 'true' ? 'ACTIVE & VISIBLE' : 'HIDDEN / PAUSED'}
                  </button>
                </div>
              </div>

              {/* LIVE VISUAL PREVIEW */}
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Live Visual Preview (As Seen on Website):
                </span>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  {settings.announcement_enabled === 'true' ? (
                    <div className="bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#2563eb] text-white py-2 px-4 text-center text-xs font-bold tracking-wide flex flex-wrap items-center justify-center gap-2">
                      {settings.offer_badge && (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase tracking-widest text-[9px] border border-white/30">
                          {settings.offer_badge}
                        </span>
                      )}
                      <span>{settings.announcement_banner}</span>
                      {settings.offer_coupon && (
                        <span className="px-2 py-0.5 rounded bg-black/25 text-cyan-200 font-mono text-[10px] tracking-wider border border-white/20">
                          USE CODE: {settings.offer_coupon}
                        </span>
                      )}
                      {settings.offer_link && (
                        <span className="underline underline-offset-2 text-[11px] font-extrabold ml-1">
                          Claim &rarr;
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-100 text-slate-400 text-center text-xs italic">
                      Banner is currently hidden. Switch visibility to Active to display.
                    </div>
                  )}
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Offer Headline / Announcement Message
                  </label>
                  <input
                    type="text"
                    value={settings.announcement_banner || ''}
                    onChange={(e) => setSettings({ ...settings, announcement_banner: e.target.value })}
                    placeholder="e.g. ⚡ Special Offer: 20% Off on All Turnkey Web Development Packages for Indian Businesses!"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Promotional Badge
                    </label>
                    <input
                      type="text"
                      value={settings.offer_badge || ''}
                      onChange={(e) => setSettings({ ...settings, offer_badge: e.target.value })}
                      placeholder="e.g. LIMITED TIME OFFER"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Promo / Coupon Code
                    </label>
                    <input
                      type="text"
                      value={settings.offer_coupon || ''}
                      onChange={(e) => setSettings({ ...settings, offer_coupon: e.target.value.toUpperCase() })}
                      placeholder="e.g. APEX20"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Call to Action Target Link
                    </label>
                    <input
                      type="text"
                      value={settings.offer_link || ''}
                      onChange={(e) => setSettings({ ...settings, offer_link: e.target.value })}
                      placeholder="e.g. /pricing or /contact"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={savingSettings}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingSettings ? 'Saving...' : 'Save & Publish Offer Banner'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DYNAMIC PRICING CMS */}
        {activeTab === 'pricing' && pricing && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#0284c7]" />
                    Pricing &amp; Packages CMS
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Modify package prices, turnkey rates, deliverables, and retainers. Changes sync directly to the public website.
                  </p>
                </div>

                <button
                  onClick={handleSavePricing}
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-cyan-500/20 flex items-center gap-2 self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? 'Saving...' : 'Save Pricing Changes'}</span>
                </button>
              </div>

              {/* SECTION 1: Standard Packages */}
              <div className="mb-10">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Standard Website Packages (4 Tiers)
                </h4>

                <div className="space-y-6">
                  {pricing.standardPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-sm">{pkg.tier}</span>
                        <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pkg.recommended}
                            onChange={(e) => {
                              const updated = [...pricing.standardPackages];
                              updated[idx].recommended = e.target.checked;
                              setPricing({ ...pricing, standardPackages: updated });
                            }}
                            className="rounded text-[#0284c7] focus:ring-0"
                          />
                          <span>Highlight as &quot;Most Popular&quot;</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-600 font-medium mb-1">
                            Price (Client Has Domain &amp; Host)
                          </label>
                          <input
                            type="text"
                            value={pkg.clientHostPrice}
                            onChange={(e) => {
                              const updated = [...pricing.standardPackages];
                              updated[idx].clientHostPrice = e.target.value;
                              setPricing({ ...pricing, standardPackages: updated });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold font-mono focus:outline-none focus:border-[#0284c7]"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-medium mb-1">
                            Turnkey Price (Domain &amp; Free Cloud Included)
                          </label>
                          <input
                            type="text"
                            value={pkg.turnkeyPrice}
                            onChange={(e) => {
                              const updated = [...pricing.standardPackages];
                              updated[idx].turnkeyPrice = e.target.value;
                              setPricing({ ...pricing, standardPackages: updated });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold font-mono focus:outline-none focus:border-[#0284c7]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-medium mb-1">
                          Deliverables &amp; Inclusions
                        </label>
                        <textarea
                          rows={2}
                          value={pkg.deliverables}
                          onChange={(e) => {
                            const updated = [...pricing.standardPackages];
                            updated[idx].deliverables = e.target.value;
                            setPricing({ ...pricing, standardPackages: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#0284c7]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Engineering & Growth Services */}
              <div className="mb-10 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Engineering &amp; Growth Services (6 Tiers)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pricing.engineeringServices.map((eng, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
                    >
                      <span className="font-bold text-slate-900 block text-sm">{eng.service}</span>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-500 font-medium mb-1">Price Rate</label>
                          <input
                            type="text"
                            value={eng.price}
                            onChange={(e) => {
                              const updated = [...pricing.engineeringServices];
                              updated[idx].price = e.target.value;
                              setPricing({ ...pricing, engineeringServices: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-medium mb-1">Type / Period</label>
                          <input
                            type="text"
                            value={eng.type}
                            onChange={(e) => {
                              const updated = [...pricing.engineeringServices];
                              updated[idx].type = e.target.value;
                              setPricing({ ...pricing, engineeringServices: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-500 font-medium mb-1">Deliverables</label>
                        <textarea
                          rows={2}
                          value={eng.deliverables}
                          onChange={(e) => {
                            const updated = [...pricing.engineeringServices];
                            updated[idx].deliverables = e.target.value;
                            setPricing({ ...pricing, engineeringServices: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Technical Add-Ons */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0284c7] mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Technical Add-Ons &amp; Maintenance Menu
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pricing.technicalAddOns.map((addon, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <span className="font-bold text-slate-900 block">{addon.title}</span>
                      <div>
                        <label className="block text-slate-500 text-[10px] mb-1">Price</label>
                        <input
                          type="text"
                          value={addon.price}
                          onChange={(e) => {
                            const updated = [...pricing.technicalAddOns];
                            updated[idx].price = e.target.value;
                            setPricing({ ...pricing, technicalAddOns: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSavePricing}
                  disabled={savingSettings}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? 'Saving...' : 'Save All Pricing Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRIVATE OFFLINE REFERRAL CODES */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            {/* Disclaimer & Header */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-900 text-sm">
                    🔒 Strictly Private Offline Referral Tracker
                  </div>
                  <p className="text-amber-800 mt-1">
                    These referral codes and partner details are maintained exclusively for your internal offline use. They are <strong>never displayed</strong> anywhere on the public website.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingReferral(null);
                  setReferralForm({
                    code: '',
                    referrer_name: '',
                    contact_info: '',
                    commission_type: 'percentage',
                    commission_value: 10,
                    discount_value: 10,
                    status: 'Active',
                    notes: '',
                  });
                  setReferralModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create Referral Code</span>
              </button>
            </div>

            {/* Referral Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Total Referral Partners
                </span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1 font-mono">
                  {referrals.length}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Active Referral Codes
                </span>
                <div className="text-3xl font-extrabold text-emerald-600 mt-1 font-mono">
                  {referrals.filter((r) => r.status === 'Active').length}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Total Recorded Usages
                </span>
                <div className="text-3xl font-extrabold text-[#0284c7] mt-1 font-mono">
                  {referrals.reduce((acc, r) => acc + (Number(r.usage_count) || 0), 0)}
                </div>
              </div>
            </div>

            {/* Referrals Table */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Referrer / Partner</th>
                      <th className="px-6 py-4">Commission</th>
                      <th className="px-6 py-4">Client Discount</th>
                      <th className="px-6 py-4">Times Used</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Notes</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                          No offline referral codes created yet. Click &quot;Create Referral Code&quot; to add your first partner.
                        </td>
                      </tr>
                    ) : (
                      referrals.map((ref) => (
                        <tr key={ref.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-900 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-100 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200">
                                {ref.code}
                              </span>
                              <button
                                onClick={() => copyToClipboard(ref.code)}
                                title="Copy code"
                                className="text-slate-400 hover:text-[#0284c7] p-1"
                              >
                                {copiedCode === ref.code ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{ref.referrer_name}</div>
                            {ref.contact_info && (
                              <div className="text-slate-500 text-[11px] mt-0.5">{ref.contact_info}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-emerald-700 font-mono">
                              {ref.commission_type === 'percentage'
                                ? `${ref.commission_value}%`
                                : `₹${ref.commission_value}`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-cyan-700 font-mono">
                              {ref.discount_value}% Off
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 font-mono">
                              <button
                                onClick={() => handleUpdateReferralUsage(ref.id, -1)}
                                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="font-bold text-slate-900 w-6 text-center">
                                {ref.usage_count}
                              </span>
                              <button
                                onClick={() => handleUpdateReferralUsage(ref.id, 1)}
                                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                ref.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ref.status === 'Paused'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {ref.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                            {ref.notes || '—'}
                          </td>
                          <td className="px-6 py-4 text-right space-x-1">
                            <button
                              onClick={() => {
                                setEditingReferral(ref);
                                setReferralForm({
                                  code: ref.code,
                                  referrer_name: ref.referrer_name,
                                  contact_info: ref.contact_info || '',
                                  commission_type: ref.commission_type || 'percentage',
                                  commission_value: Number(ref.commission_value) || 10,
                                  discount_value: Number(ref.discount_value) || 10,
                                  status: ref.status || 'Active',
                                  notes: ref.notes || '',
                                });
                                setReferralModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteReferral(ref.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CREATE / EDIT REFERRAL MODAL */}
            {referralModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-8 shadow-2xl text-slate-900 relative">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingReferral ? 'Edit Offline Referral Code' : 'New Offline Referral Code'}
                    </h3>
                    <button
                      onClick={() => setReferralModalOpen(false)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveReferral} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Referral Code (Must be unique) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. VIP2026 or RAHUL10"
                        value={referralForm.code}
                        onChange={(e) =>
                          setReferralForm({
                            ...referralForm,
                            code: e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''),
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Referrer / Partner Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={referralForm.referrer_name}
                        onChange={(e) =>
                          setReferralForm({ ...referralForm, referrer_name: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Partner Contact (Phone / Email)
                      </label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210 / rahul@gmail.com"
                        value={referralForm.contact_info}
                        onChange={(e) =>
                          setReferralForm({ ...referralForm, contact_info: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                          Commission Reward
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={referralForm.commission_value}
                            onChange={(e) =>
                              setReferralForm({
                                ...referralForm,
                                commission_value: Number(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold"
                          />
                          <select
                            value={referralForm.commission_type}
                            onChange={(e) =>
                              setReferralForm({
                                ...referralForm,
                                commission_type: e.target.value as 'percentage' | 'fixed',
                              })
                            }
                            className="px-2 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800"
                          >
                            <option value="percentage">%</option>
                            <option value="fixed">₹</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                          Client Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={referralForm.discount_value}
                          onChange={(e) =>
                            setReferralForm({
                              ...referralForm,
                              discount_value: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Status
                      </label>
                      <select
                        value={referralForm.status}
                        onChange={(e) =>
                          setReferralForm({
                            ...referralForm,
                            status: e.target.value as 'Active' | 'Paused' | 'Expired',
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-semibold"
                      >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Private Offline Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Internal offline notes, payment terms, or client names referred..."
                        value={referralForm.notes}
                        onChange={(e) =>
                          setReferralForm({ ...referralForm, notes: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setReferralModalOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold"
                      >
                        {editingReferral ? 'Save Changes' : 'Create Code'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SEO AUDITS LOG */}
        {activeTab === 'audits' && (
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">URL Scanned</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Server TTFB</th>
                    <th className="px-6 py-4">Work Email</th>
                    <th className="px-6 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {audits.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No audit scans recorded yet.
                      </td>
                    </tr>
                  ) : (
                    audits.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-900 font-semibold">{a.url}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              a.score >= 85
                                ? 'bg-emerald-100 text-emerald-800'
                                : a.score >= 60
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {a.score} / 100
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-600">{a.ttfb_ms || '—'} ms</td>
                        <td className="px-6 py-4 text-slate-600">{a.email || 'Anonymous'}</td>
                        <td className="px-6 py-4 text-slate-500 text-[11px]">
                          {new Date(a.created_at).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: AGENCY INFO & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  Agency Communication &amp; Branding Data
                </h3>
                <p className="text-slate-500">
                  Update primary agency contact credentials displayed in headers, footers, and contact forms.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Official Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      WhatsApp Routing Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp_number || ''}
                      onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                      placeholder="+919876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Display Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.contact_phone || ''}
                      onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Agency Hub &amp; Location
                  </label>
                  <input
                    type="text"
                    value={settings.agency_location || ''}
                    onChange={(e) => setSettings({ ...settings, agency_location: e.target.value })}
                    placeholder="Bengaluru / Pan-India &bull; Global Delivery"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={savingSettings}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingSettings ? 'Saving...' : 'Save Agency Info'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
