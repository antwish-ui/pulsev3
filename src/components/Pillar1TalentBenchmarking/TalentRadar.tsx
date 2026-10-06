import React, { useState } from 'react';
import { Radar, Sparkles, TrendingUp, Music, Film, Cpu, Search, CheckCircle, ExternalLink } from 'lucide-react';
import { CHANNELS_DATA } from '../../data/mockData';
import { Channel } from '../../types';

interface TalentRadarProps {
  onSelectChannel: (channel: Channel) => void;
  onRequestDossier: (creatorName: string) => void;
}

export const TalentRadar: React.FC<TalentRadarProps> = ({
  onSelectChannel,
  onRequestDossier
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [subThreshold, setSubThreshold] = useState<number>(150000); // Filter for low-sub (<150k)
  const [minEngagement, setMinEngagement] = useState<number>(8.0); // Min engagement (>8%)

  const radarChannels = CHANNELS_DATA.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSubs = c.subscriberCount <= subThreshold;
    const matchesEng = c.engagementRatio >= minEngagement;
    return matchesCategory && matchesSubs && matchesEng;
  });

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 1 &middot; Talent Scouting Radar
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Emerging Talent & Artist Discovery Radar
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Engineered for record label A&amp;R executives, film studio producers, and talent agencies. Surfaces creators with under 150,000 subscribers demonstrating exceptional organic engagement ratios (&gt;8.0%) and rapid subscriber velocity before mass-market discovery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onRequestDossier('Emerging Talent Roster 2026')}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            Export Radar Talent Dossier
          </button>
        </div>
      </div>

      {/* Radar Controls: Category Selector & Threshold Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
        {/* Category Segmented Control */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Industry / Creative Domain
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Music & Audio', 'Cinema & VFX', 'Science & Math', 'Tech & AI'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white font-medium'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Max Subscriber Ceiling Slider */}
        <div>
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="text-slate-300">Max Subscriber Ceiling</span>
            <span className="font-mono text-rose-400 font-semibold">{subThreshold.toLocaleString()} subs</span>
          </div>
          <input
            type="range"
            min="20000"
            max="300000"
            step="10000"
            value={subThreshold}
            onChange={(e) => setSubThreshold(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>20k (Hyper-early)</span>
            <span>300k (Breakout)</span>
          </div>
        </div>

        {/* Min Engagement Ratio Slider */}
        <div>
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="text-slate-300">Min. Engagement Ratio</span>
            <span className="font-mono text-emerald-400 font-semibold">{minEngagement.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="16.0"
            step="0.5"
            value={minEngagement}
            onChange={(e) => setMinEngagement(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>4% (Average)</span>
            <span>16% (Super-Organic)</span>
          </div>
        </div>
      </div>

      {/* Radar Cards Grid */}
      {radarChannels.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
          No emerging talents match the current radar threshold parameters. Try lowering the minimum engagement ratio or raising the subscriber ceiling.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {radarChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={channel.avatar}
                      alt={channel.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-slate-100 font-display">
                        {channel.title}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{channel.handle}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="text-rose-400 font-medium">{channel.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Radar Alert Marker */}
                  <div className="text-right">
                    <div className="text-[11px] font-semibold text-emerald-400">
                      RADAR DETECTED
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      +{channel.growthRateMonthly}% / month
                    </div>
                  </div>
                </div>

                {/* Scouting Notes Box */}
                {channel.scoutingNotes && (
                  <div className="mt-3.5 p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-rose-300">A&amp;R Scouting Note: </span>
                    {channel.scoutingNotes}
                  </div>
                )}

                {/* Verified Expertise Tags (Zero-pill text separators) */}
                <div className="mt-3 text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-slate-500 font-medium">Core Expertise:</span>
                  {channel.verifiedExpertise.map((exp, idx) => (
                    <React.Fragment key={exp}>
                      <span className="text-slate-300">{exp}</span>
                      {idx < channel.verifiedExpertise.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">&middot;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 font-mono tabular-nums text-slate-300">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Subscribers</span>
                    <span className="font-semibold">{channel.subscriberCount.toLocaleString()}</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-700">&middot;</span>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Engagement</span>
                    <span className="font-semibold text-emerald-400">{channel.engagementRatio}%</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-700">&middot;</span>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Domain Auth</span>
                    <span className="font-semibold text-rose-400">{channel.domainAuthorityScore}/100</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRequestDossier(channel.title)}
                    className="px-3 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 rounded-md transition-colors"
                  >
                    Generate Dossier
                  </button>
                  <button
                    onClick={() => onSelectChannel(channel)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                  >
                    Audit Uploads
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
