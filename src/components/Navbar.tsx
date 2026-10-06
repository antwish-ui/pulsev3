import React from 'react';
import { KeyRound, FileSpreadsheet, ShieldAlert, Zap } from 'lucide-react';

export type ActiveTab = 
  | 'pillar1_talent'
  | 'pillar2_sentiment'
  | 'pillar3_quality'
  | 'pillar4_enterprise'
  | 'zero_quota_search';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  quotaUsed: number;
  quotaBudget: number;
  onOpenApiKeyModal: () => void;
  onOpenAdvisoryModal: () => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  quotaUsed,
  quotaBudget,
  onOpenApiKeyModal,
  onOpenAdvisoryModal,
  hasApiKey
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B0F17]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Wordmark Text */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('pillar1_talent')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm shadow-rose-900/50">
              P3
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
              PulseV3
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line text, 4-6 links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('pillar1_talent')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'pillar1_talent'
                ? 'text-rose-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Talent & Radar
            {activeTab === 'pillar1_talent' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pillar2_sentiment')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'pillar2_sentiment'
                ? 'text-rose-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sentiment & Fraud
            {activeTab === 'pillar2_sentiment' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pillar3_quality')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'pillar3_quality'
                ? 'text-rose-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Quality & Playbooks
            {activeTab === 'pillar3_quality' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pillar4_enterprise')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'pillar4_enterprise'
                ? 'text-rose-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Pipeline & Advisory
            {activeTab === 'pillar4_enterprise' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('zero_quota_search')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1.5 ${
              activeTab === 'zero_quota_search'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Zero-Quota Upload Search
            {activeTab === 'zero_quota_search' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Quota & API Key trigger */}
          <button
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
            title="Configure YouTube Data API v3 Key & Monitor Quota Pool"
          >
            <KeyRound className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-mono tabular-nums text-slate-300">
              {quotaUsed.toLocaleString()} / {quotaBudget.toLocaleString()} pts
            </span>
            {hasApiKey && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Live API Key Active" />
            )}
          </button>

          {/* Bespoke Request CTA */}
          <button
            onClick={onOpenAdvisoryModal}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Request Custom Advisory
          </button>
        </div>

      </div>

      {/* Mobile Nav Row */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        <button
          onClick={() => setActiveTab('pillar1_talent')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeTab === 'pillar1_talent' ? 'bg-rose-600/30 text-rose-300 font-medium' : 'text-slate-400'
          }`}
        >
          Talent & Radar
        </button>
        <button
          onClick={() => setActiveTab('pillar2_sentiment')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeTab === 'pillar2_sentiment' ? 'bg-rose-600/30 text-rose-300 font-medium' : 'text-slate-400'
          }`}
        >
          Sentiment & Fraud
        </button>
        <button
          onClick={() => setActiveTab('pillar3_quality')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeTab === 'pillar3_quality' ? 'bg-rose-600/30 text-rose-300 font-medium' : 'text-slate-400'
          }`}
        >
          Quality & Playbooks
        </button>
        <button
          onClick={() => setActiveTab('pillar4_enterprise')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeTab === 'pillar4_enterprise' ? 'bg-rose-600/30 text-rose-300 font-medium' : 'text-slate-400'
          }`}
        >
          Data & Advisory
        </button>
        <button
          onClick={() => setActiveTab('zero_quota_search')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeTab === 'zero_quota_search' ? 'bg-amber-600/30 text-amber-300 font-medium' : 'text-slate-400'
          }`}
        >
          Zero-Quota Search
        </button>
      </div>
    </header>
  );
};
