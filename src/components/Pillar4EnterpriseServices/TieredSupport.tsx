import React, { useState } from 'react';
import { Headphones, Shield, Clock, CheckCircle2, MessageSquare, Plus, AlertCircle } from 'lucide-react';
import { SUPPORT_TICKETS_DATA } from '../../data/mockData';
import { SupportTicket } from '../../types';

export const TieredSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS_DATA);
  const [newSubject, setNewSubject] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<'Studio VIP' | 'Enterprise' | 'Agency'>('Studio VIP');
  const [selectedPriority, setSelectedPriority] = useState<'Urgent' | 'High' | 'Normal'>('Urgent');
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(8800 + Math.random() * 1000)}`,
      subject: newSubject.trim(),
      tier: selectedTier,
      status: 'Open',
      priority: selectedPriority,
      createdAt: 'Just now',
      assignedEngineer: 'Dedicated Solutions Architect (On Call)',
      slaTargetMinutes: selectedTier === 'Studio VIP' ? 15 : selectedTier === 'Enterprise' ? 30 : 60
    };

    setTickets([newTicket, ...tickets]);
    setNewSubject('');
    setIsCreated(true);
    setTimeout(() => setIsCreated(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 4 &middot; Enterprise Support
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Tiered High-Touch Support &amp; Technical Onboarding
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Direct, guaranteed-SLA access to senior data architects for studios, labels, and creative agencies with mission-critical marketing deadlines.
          </p>
        </div>
      </div>

      {/* SLA Tiers Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            tier: 'Studio VIP SLA',
            audience: 'For Major Hollywood Studios & Global Brands',
            sla: '15-Minute Guaranteed Response',
            features: [
              'Dedicated Principal Architect hotline',
              'Custom trailer tracking pipeline setup',
              'Direct API webhook integration assistance',
              'Real-time box office sentiment monitoring'
            ],
            accent: 'border-rose-500/80'
          },
          {
            tier: 'Enterprise SLA',
            audience: 'For Record Labels & Multi-Channel Networks',
            sla: '30-Minute Response Window',
            features: [
              'Custom talent radar threshold tuning',
              'Weekly automated A&R scout dossiers',
              'Shared private Slack / Teams channel',
              'Unlimited forensic fraud audits'
            ],
            accent: 'border-slate-700'
          },
          {
            tier: 'Agency SLA',
            audience: 'For Digital Agencies & Influencer Marketing',
            sla: '60-Minute Resolution Target',
            features: [
              'Multi-seat workspace management',
              'Quarterly creator benchmark reviews',
              'Standard email & ticket portal support',
              'API quota pool optimization consultation'
            ],
            accent: 'border-slate-800'
          }
        ].map((plan, idx) => (
          <div
            key={idx}
            className={`p-5 bg-slate-900 border ${plan.accent} rounded-xl space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white text-sm">{plan.tier}</span>
                <span className="font-mono text-[11px] text-rose-400 font-semibold">{plan.sla}</span>
              </div>
              <p className="text-xs text-slate-400">{plan.audience}</p>

              <ul className="space-y-2 pt-2 text-xs text-slate-300">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-500 font-mono">
              Status: Active Priority Service
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Management & Priority Submission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Submission Form (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-white font-display">
            Submit Enterprise Technical Request
          </h3>

          <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Service SLA Tier</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="Studio VIP">Studio VIP (15-min SLA)</option>
                <option value="Enterprise">Enterprise (30-min SLA)</option>
                <option value="Agency">Agency (60-min SLA)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Priority Level</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="Urgent">Urgent (Production Critical / Launch Live)</option>
                <option value="High">High (Target Campaign in 48 Hours)</option>
                <option value="Normal">Normal (General Inquiry / Config)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Subject / Technical Need</label>
              <textarea
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g. Set up real-time sentiment stream for 2026 tentpole movie teaser release..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {isCreated && (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ticket dispatched to on-call solutions architect.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm"
            >
              Dispatch Priority Request
            </button>
          </form>
        </div>

        {/* Existing Priority Tickets List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-semibold text-white font-display">
            Active Enterprise Support Queue ({tickets.length})
          </h3>

          <div className="space-y-2.5">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-400">{ticket.id}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-rose-400 font-medium">{ticket.tier}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-slate-500">{ticket.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className={ticket.status === 'Resolved' ? 'text-emerald-400' : 'text-amber-400 font-semibold'}>
                      {ticket.status}
                    </span>
                  </div>
                </div>

                <div className="font-semibold text-slate-200 text-xs leading-snug">
                  {ticket.subject}
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Assigned: {ticket.assignedEngineer}</span>
                  <span>Target SLA: {ticket.slaTargetMinutes}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
