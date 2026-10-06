import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ApiKeyModal } from './components/ApiKeyModal';
import { VideoDetailModal } from './components/VideoDetailModal';
import { ZeroQuotaSearch } from './components/ZeroQuotaSearch';
import { TalentRadar } from './components/Pillar1TalentBenchmarking/TalentRadar';
import { DomainAuthorityRanking } from './components/Pillar1TalentBenchmarking/DomainAuthorityRanking';
import { CompetitorBenchmarking } from './components/Pillar1TalentBenchmarking/CompetitorBenchmarking';
import { TrailerSentimentTracker } from './components/Pillar2SentimentEngine/TrailerSentimentTracker';
import { CommentCollationNLP } from './components/Pillar2SentimentEngine/CommentCollationNLP';
import { FraudDetectionAudit } from './components/Pillar2SentimentEngine/FraudDetectionAudit';
import { QualityOverPopularity } from './components/Pillar3QualityDiscovery/QualityOverPopularity';
import { CuratedGuides } from './components/Pillar3QualityDiscovery/CuratedGuides';
import { CreatorPlaybook } from './components/Pillar3QualityDiscovery/CreatorPlaybook';
import { DataIntegrityPipeline } from './components/Pillar4EnterpriseServices/DataIntegrityPipeline';
import { TieredSupport } from './components/Pillar4EnterpriseServices/TieredSupport';
import { BespokeAdvisory } from './components/Pillar4EnterpriseServices/BespokeAdvisory';
import { getStoredApiKey } from './services/youtubeApi';
import { Channel, Video, TrailerProject } from './types';
import { Zap, Sparkles, Shield, Database, Users, TrendingUp, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pillar1_talent');
  
  // Pillar sub-tabs
  const [pillar1SubTab, setPillar1SubTab] = useState<'radar' | 'ranking' | 'benchmark'>('radar');
  const [pillar2SubTab, setPillar2SubTab] = useState<'trailers' | 'comments' | 'fraud'>('trailers');
  const [pillar3SubTab, setPillar3SubTab] = useState<'quality' | 'guides' | 'playbook'>('quality');
  const [pillar4SubTab, setPillar4SubTab] = useState<'pipeline' | 'support' | 'advisory'>('pipeline');

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [selectedVideoModal, setSelectedVideoModal] = useState<Video | null>(null);

  // Cross-component state transfers
  const [selectedBenchmarkChannels, setSelectedBenchmarkChannels] = useState<Channel[]>([]);
  const [activeCommentVideoTitle, setActiveCommentVideoTitle] = useState<string>('DUNE: PART THREE - Messiah (Official Teaser Trailer)');
  const [customAdvisoryTopic, setCustomAdvisoryTopic] = useState<string>('');

  // API Key & Quota state
  const [apiKey, setApiKey] = useState<string>(getStoredApiKey());
  const [quotaUsed, setQuotaUsed] = useState<number>(34); // initial units
  const [quotaBudget, setQuotaBudget] = useState<number>(10000);
  const [quotaSaved, setQuotaSaved] = useState<number>(14850); // units saved avoiding search.list

  const handleIncrementQuotaSaved = (amount: number) => {
    setQuotaSaved((prev) => prev + amount);
    setQuotaUsed((prev) => prev + 1);
  };

  const handleChannelSelectForAudit = (channel: Channel) => {
    setActiveTab('zero_quota_search');
  };

  const handleChannelBenchmark = (channel: Channel) => {
    setSelectedBenchmarkChannels([channel]);
    setPillar1SubTab('benchmark');
    setActiveTab('pillar1_talent');
  };

  const handleCollateTrailerComments = (trailer: TrailerProject) => {
    setActiveCommentVideoTitle(trailer.title);
    setPillar2SubTab('comments');
    setActiveTab('pillar2_sentiment');
  };

  const handleRequestDossier = (topicOrCreator: string) => {
    setCustomAdvisoryTopic(`Executive Intelligence Briefing: ${topicOrCreator}`);
    setPillar4SubTab('advisory');
    setActiveTab('pillar4_enterprise');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      {/* Universal Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        quotaUsed={quotaUsed}
        quotaBudget={quotaBudget}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenAdvisoryModal={() => handleRequestDossier('Comprehensive Enterprise Intelligence')}
        hasApiKey={apiKey.length > 20}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Contextual Breadcrumb & Sub-Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">PulseV3 Engine</span>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="text-slate-300 font-medium">
              {activeTab === 'pillar1_talent' && 'Pillar 1: Talent Scouting & Creator Benchmarking'}
              {activeTab === 'pillar2_sentiment' && 'Pillar 2: Audience Sentiment & Market Intelligence'}
              {activeTab === 'pillar3_quality' && 'Pillar 3: Quality-First Discovery & Optimization'}
              {activeTab === 'pillar4_enterprise' && 'Pillar 4: High-Reliability Platform & Enterprise'}
              {activeTab === 'zero_quota_search' && 'API Quota Optimizer & Channel Uploads Engine'}
            </span>
          </div>

          {/* Sub-Tab Segmented Controls (Functional buttons with active/inactive states) */}
          {activeTab === 'pillar1_talent' && (
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setPillar1SubTab('radar')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar1SubTab === 'radar'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Talent Radar (Emerging)
              </button>
              <button
                onClick={() => setPillar1SubTab('ranking')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar1SubTab === 'ranking'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Domain Authority Ranking
              </button>
              <button
                onClick={() => setPillar1SubTab('benchmark')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar1SubTab === 'benchmark'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Competitor Benchmarking
              </button>
            </div>
          )}

          {activeTab === 'pillar2_sentiment' && (
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setPillar2SubTab('trailers')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar2SubTab === 'trailers'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Trailer &amp; Product Sentiment
              </button>
              <button
                onClick={() => setPillar2SubTab('comments')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar2SubTab === 'comments'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Comment NLP Collation
              </button>
              <button
                onClick={() => setPillar2SubTab('fraud')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar2SubTab === 'fraud'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fake View Fraud Audit
              </button>
            </div>
          )}

          {activeTab === 'pillar3_quality' && (
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setPillar3SubTab('quality')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar3SubTab === 'quality'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Quality-Over-Popularity Ranking
              </button>
              <button
                onClick={() => setPillar3SubTab('guides')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar3SubTab === 'guides'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                &quot;Best of&quot; Curated Guides
              </button>
              <button
                onClick={() => setPillar3SubTab('playbook')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar3SubTab === 'playbook'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Creator Playbook &amp; Timing
              </button>
            </div>
          )}

          {activeTab === 'pillar4_enterprise' && (
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setPillar4SubTab('pipeline')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar4SubTab === 'pipeline'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Data Integrity Pipeline
              </button>
              <button
                onClick={() => setPillar4SubTab('support')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar4SubTab === 'support'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tiered Customer Support
              </button>
              <button
                onClick={() => setPillar4SubTab('advisory')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  pillar4SubTab === 'advisory'
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bespoke Advisory Reports
              </button>
            </div>
          )}
        </div>

        {/* View Content Rendering */}

        {/* Pillar 1: Talent & Benchmarking */}
        {activeTab === 'pillar1_talent' && (
          <div className="space-y-6">
            {pillar1SubTab === 'radar' && (
              <TalentRadar
                onSelectChannel={handleChannelSelectForAudit}
                onRequestDossier={handleRequestDossier}
              />
            )}
            {pillar1SubTab === 'ranking' && (
              <DomainAuthorityRanking
                onSelectChannel={handleChannelSelectForAudit}
                onBenchmarkChannel={handleChannelBenchmark}
              />
            )}
            {pillar1SubTab === 'benchmark' && (
              <CompetitorBenchmarking
                initialChannels={selectedBenchmarkChannels}
              />
            )}
          </div>
        )}

        {/* Pillar 2: Sentiment & Fraud */}
        {activeTab === 'pillar2_sentiment' && (
          <div className="space-y-6">
            {pillar2SubTab === 'trailers' && (
              <TrailerSentimentTracker
                onCollateComments={handleCollateTrailerComments}
                onRequestStudioDossier={handleRequestDossier}
              />
            )}
            {pillar2SubTab === 'comments' && (
              <CommentCollationNLP
                initialVideoTitle={activeCommentVideoTitle}
              />
            )}
            {pillar2SubTab === 'fraud' && (
              <FraudDetectionAudit />
            )}
          </div>
        )}

        {/* Pillar 3: Quality & Playbooks */}
        {activeTab === 'pillar3_quality' && (
          <div className="space-y-6">
            {pillar3SubTab === 'quality' && (
              <QualityOverPopularity
                onSelectVideo={(video) => setSelectedVideoModal(video)}
              />
            )}
            {pillar3SubTab === 'guides' && (
              <CuratedGuides
                onSelectVideo={(video) => setSelectedVideoModal(video)}
              />
            )}
            {pillar3SubTab === 'playbook' && (
              <CreatorPlaybook />
            )}
          </div>
        )}

        {/* Pillar 4: Data Pipeline & Advisory */}
        {activeTab === 'pillar4_enterprise' && (
          <div className="space-y-6">
            {pillar4SubTab === 'pipeline' && (
              <DataIntegrityPipeline
                quotaUsed={quotaUsed}
                quotaBudget={quotaBudget}
                quotaSaved={quotaSaved}
                onRefreshPipeline={() => setQuotaUsed((prev) => prev + 1)}
              />
            )}
            {pillar4SubTab === 'support' && (
              <TieredSupport />
            )}
            {pillar4SubTab === 'advisory' && (
              <BespokeAdvisory
                initialTargetTopic={customAdvisoryTopic}
              />
            )}
          </div>
        )}

        {/* Zero Quota Channel Upload Search (Key User Requirement) */}
        {activeTab === 'zero_quota_search' && (
          <ZeroQuotaSearch
            onSelectVideo={(video) => setSelectedVideoModal(video)}
            onIncrementQuotaSaved={handleIncrementQuotaSaved}
            apiKey={apiKey}
          />
        )}
      </main>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        quotaUsed={quotaUsed}
        quotaBudget={quotaBudget}
        quotaSaved={quotaSaved}
        onKeyUpdated={(newKey) => setApiKey(newKey)}
      />

      <VideoDetailModal
        video={selectedVideoModal}
        onClose={() => setSelectedVideoModal(null)}
      />

      {/* Quiet Footer (strictly copyright and technical standards, no fake telemetry ticker) */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PulseV3 Intelligence</span>
            <span aria-hidden="true">&middot;</span>
            <span>Optimized for YouTube Data API v3 Protocol</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Quota-Guard Enabled (99% Search Cost Reduction)</span>
            <span aria-hidden="true">&middot;</span>
            <span>Studio &amp; A&amp;R Enterprise SLA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
