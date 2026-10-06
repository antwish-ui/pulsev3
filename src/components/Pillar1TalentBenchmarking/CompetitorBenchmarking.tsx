import React, { useState } from 'react';
import { Columns, Plus, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CHANNELS_DATA } from '../../data/mockData';
import { Channel } from '../../types';

interface CompetitorBenchmarkingProps {
  initialChannels?: Channel[];
}

export const CompetitorBenchmarking: React.FC<CompetitorBenchmarkingProps> = ({
  initialChannels = []
}) => {
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>(
    initialChannels.length >= 2 
      ? initialChannels 
      : [CHANNELS_DATA[2], CHANNELS_DATA[3]] // Elena Vance vs Maya Lin
  );

  const handleAddChannel = (channel: Channel) => {
    if (selectedChannels.length < 3 && !selectedChannels.some((c) => c.id === channel.id)) {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleRemoveChannel = (channelId: string) => {
    if (selectedChannels.length > 1) {
      setSelectedChannels(selectedChannels.filter((c) => c.id !== channelId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 1 &middot; Creator Benchmarking
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Head-to-Head Competitor Benchmarking
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Side-by-side telemetry for talent scouts and creator managers. Directly isolate engagement differentials, audience conversion velocity, and production consistency across comparable targets.
          </p>
        </div>

        {/* Quick Add Channel Dropdown */}
        {selectedChannels.length < 3 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Add to compare:</span>
            <div className="flex flex-wrap gap-1.5">
              {CHANNELS_DATA.filter((c) => !selectedChannels.some((sc) => sc.id === c.id)).slice(0, 3).map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleAddChannel(ch)}
                  className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded transition-colors"
                >
                  + {ch.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedChannels.map((channel) => (
          <div
            key={channel.id}
            className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 relative"
          >
            {/* Remove button if > 1 */}
            {selectedChannels.length > 1 && (
              <button
                onClick={() => handleRemoveChannel(channel.id)}
                className="absolute top-4 right-4 p-1 text-slate-500 hover:text-rose-400 rounded-md transition-colors"
                title="Remove from comparison"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Header info */}
            <div className="flex items-center gap-3 pr-6">
              <img
                src={channel.avatar}
                alt={channel.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <h3 className="text-base font-semibold text-white font-display">
                  {channel.title}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>{channel.handle}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-rose-400">{channel.category}</span>
                </div>
              </div>
            </div>

            {/* Core Comparative Metrics (Tabular Numbers) */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Domain Authority Score</span>
                  <span className="font-mono tabular-nums font-bold text-rose-400">
                    {channel.domainAuthorityScore}/100
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${channel.domainAuthorityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Organic Engagement Ratio</span>
                  <span className="font-mono tabular-nums font-bold text-emerald-400">
                    {channel.engagementRatio}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, channel.engagementRatio * 6.5)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Monthly Growth Velocity</span>
                  <span className="font-mono tabular-nums text-slate-200">
                    +{channel.growthRateMonthly}% / mo
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${Math.min(100, channel.growthRateMonthly * 2)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block">Total Subscribers</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-200">
                    {channel.subscriberCount.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block">Total Views</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-slate-200">
                    {channel.totalViews > 1000000 
                      ? `${(channel.totalViews / 1000000).toFixed(1)}M` 
                      : channel.totalViews.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-1 grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block">Upload Cadence</span>
                  <span className="font-mono tabular-nums text-xs text-slate-300">
                    {channel.recentUploadCadence}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block">Fraud Footprint</span>
                  <span className={`font-mono text-xs font-semibold ${
                    channel.fraudRisk === 'LOW' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {channel.fraudRisk} RISK
                  </span>
                </div>
              </div>
            </div>

            {/* Specialization List */}
            <div className="pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-500 font-medium block mb-1">Key Strengths:</span>
              <ul className="space-y-1 text-slate-300">
                {channel.verifiedExpertise.map((exp) => (
                  <li key={exp} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
