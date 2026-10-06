import React, { useState } from 'react';
import { Award, ArrowUpDown, CheckCircle2, ChevronRight, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { CHANNELS_DATA } from '../../data/mockData';
import { Channel } from '../../types';

interface DomainAuthorityRankingProps {
  onSelectChannel: (channel: Channel) => void;
  onBenchmarkChannel: (channel: Channel) => void;
}

export const DomainAuthorityRanking: React.FC<DomainAuthorityRankingProps> = ({
  onSelectChannel,
  onBenchmarkChannel
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'domain_authority' | 'engagement' | 'subscribers' | 'growth'>('domain_authority');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const domains = ['All', 'Tech & AI', 'Cinema & VFX', 'Music & Audio', 'Science & Math'];

  const filteredChannels = CHANNELS_DATA
    .filter((c) => {
      const matchDomain = selectedDomain === 'All' || c.category === selectedDomain;
      const matchSearch = 
        c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.handle.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.verifiedExpertise.some((e) => e.toLowerCase().includes(searchFilter.toLowerCase()));
      return matchDomain && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'domain_authority') return b.domainAuthorityScore - a.domainAuthorityScore;
      if (sortBy === 'engagement') return b.engagementRatio - a.engagementRatio;
      if (sortBy === 'subscribers') return b.subscriberCount - a.subscriberCount;
      if (sortBy === 'growth') return b.growthRateMonthly - a.growthRateMonthly;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 1 &middot; Expert Identification
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Domain Authority Ranking &amp; Field Experts
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Identifies who the verified experts are in any target domain. Unlike raw subscriber counts that reward sensationalism, our custom Domain Authority Score evaluates four rigorous vectors: topical relevance (35%), viewer engagement ratio (30%), upload cadence consistency (20%), and sustainable growth momentum (15%).
          </p>
        </div>

        {/* Algorithm Weight Indicator */}
        <div className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 shrink-0 font-mono">
          <span className="text-slate-500 font-sans">Formula:</span> 35% Relevance + 30% Engagement + 20% Cadence + 15% Growth
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        {/* Domain Segmented Control */}
        <div className="flex flex-wrap gap-1">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedDomain === d
                  ? 'bg-rose-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Search & Sort by */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter expertise (e.g. quantum, color science, guitar)..."
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 w-56"
          />

          <div className="flex items-center bg-slate-950 p-0.5 rounded-md border border-slate-800">
            <button
              onClick={() => setSortBy('domain_authority')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'domain_authority' ? 'bg-slate-800 text-rose-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Authority
            </button>
            <button
              onClick={() => setSortBy('engagement')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'engagement' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Engagement
            </button>
            <button
              onClick={() => setSortBy('growth')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'growth' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Growth
            </button>
          </div>
        </div>
      </div>

      {/* Expert Ranking Table (High-density SaaS data grid, tabular-nums) */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th className="py-3 px-4 font-semibold text-center w-12">Rank</th>
                <th className="py-3 px-4 font-semibold">Creator &amp; Expertise</th>
                <th className="py-3 px-4 font-semibold text-right">Subscribers</th>
                <th className="py-3 px-4 font-semibold text-right">Cadence</th>
                <th className="py-3 px-4 font-semibold text-right">Engagement</th>
                <th className="py-3 px-4 font-semibold text-right">Monthly Growth</th>
                <th className="py-3 px-4 font-semibold text-center">Authority Score</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredChannels.map((channel, index) => (
                <tr
                  key={channel.id}
                  className="hover:bg-slate-850/60 transition-colors group"
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-500 font-semibold">
                    {index + 1}
                  </td>

                  {/* Creator Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={channel.avatar}
                        alt={channel.title}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-slate-100 flex items-center gap-2">
                          <span>{channel.title}</span>
                          {channel.isRadarEmerging && (
                            <span className="text-[10px] text-emerald-400 font-normal">
                              (Emerging Prodigy)
                            </span>
                          )}
                          {channel.fraudRisk === 'HIGH' && (
                            <span className="text-[10px] text-rose-400 font-normal">
                              (Suspicious Footprint)
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                          <span>{channel.category}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{channel.verifiedExpertise.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subscribers */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-200">
                    {channel.subscriberCount.toLocaleString()}
                  </td>

                  {/* Cadence */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-400">
                    {channel.recentUploadCadence}
                  </td>

                  {/* Engagement */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                    <span className={channel.engagementRatio > 8 ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                      {channel.engagementRatio.toFixed(1)}%
                    </span>
                  </td>

                  {/* Growth Momentum */}
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-400 font-medium">
                    +{channel.growthRateMonthly.toFixed(1)}%
                  </td>

                  {/* Domain Authority Score */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 font-mono tabular-nums font-bold text-rose-300">
                      {channel.domainAuthorityScore}
                      <span className="text-[10px] font-normal text-slate-500 ml-0.5">/100</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onBenchmarkChannel(channel)}
                        className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors whitespace-nowrap"
                        title="Add to side-by-side benchmarking"
                      >
                        Compare
                      </button>
                      <button
                        onClick={() => onSelectChannel(channel)}
                        className="px-2.5 py-1 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-900/50 rounded transition-colors whitespace-nowrap"
                      >
                        View Channel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
