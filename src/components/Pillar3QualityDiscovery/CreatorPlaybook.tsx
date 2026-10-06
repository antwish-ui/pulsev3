import React, { useState } from 'react';
import { Compass, Clock, Sparkles, TrendingUp, Tag, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { CREATOR_PLAYBOOK_INSIGHTS } from '../../data/mockData';

export const CreatorPlaybook: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Thursday');
  const [enrichmentTagInput, setEnrichmentTagInput] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([
    'Pedagogical Rigor: High',
    'Audience Tier: Professional / Semi-Pro',
    'Commercial Intent: B2B Production',
    'Color Profile: Rec709 / LogC3',
    'Retention Model: Non-Decaying Evergreen'
  ]);

  const handleAddTag = () => {
    if (enrichmentTagInput.trim() && !activeTags.includes(enrichmentTagInput.trim())) {
      setActiveTags([...activeTags, enrichmentTagInput.trim()]);
      setEnrichmentTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter((t) => t !== tagToRemove));
  };

  const currentDayStats = CREATOR_PLAYBOOK_INSIGHTS.optimalTimingHeatmap.find((d) => d.day === selectedDay) || CREATOR_PLAYBOOK_INSIGHTS.optimalTimingHeatmap[3];

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 3 &middot; Optimization Engine
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Creator Playbook: What to Make &amp; Why
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Turns raw YouTube API telemetry into actionable strategic models: uncovered niche content gaps, empirical optimal upload timing heatmaps, and high-retention title archetype benchmarks.
          </p>
        </div>
      </div>

      {/* Section 1: Niche Gaps Dashboard (What to make & why) */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-400" />
              <span>Uncovered Niche Content Gaps (High Demand &times; Low Quality Supply)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Topics exhibiting high search query intent with a notable shortage of high-production, comprehensive videos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CREATOR_PLAYBOOK_INSIGHTS.nicheGaps.map((gap, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-rose-400 font-medium">{gap.niche}</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    Gap Index: {gap.gapScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                  {gap.topic}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {gap.recommendation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono tabular-nums">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Search Demand</span>
                  <span className="font-semibold text-slate-200">{gap.searchDemandIndex}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Competing Supply</span>
                  <span className="font-semibold text-slate-400">{gap.competitionSupplyIndex}/100 (Low)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Optimal Upload Timing Heatmap */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Optimal Upload Timing Matrix (Audience Peak Engagement)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Aggregated from 14.8M viewer interaction events across global timezones.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
            Peak Global Window: <span className="text-emerald-400 font-bold">Thursday 15:00 UTC</span>
          </div>
        </div>

        {/* Days Heatmap Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {CREATOR_PLAYBOOK_INSIGHTS.optimalTimingHeatmap.map((dayItem) => (
            <button
              key={dayItem.day}
              onClick={() => setSelectedDay(dayItem.day)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedDay === dayItem.day
                  ? 'bg-emerald-950/40 border-emerald-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-semibold">{dayItem.day}</div>
              <div className="mt-1 font-mono text-xs font-bold text-emerald-400 tabular-nums">
                {dayItem.bestUtcHour}:00 UTC
              </div>
              <div className="mt-1 text-[10px] text-slate-500">
                Index: {dayItem.avgViewerIndex}/100
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Insight Callout */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center justify-between">
          <div>
            <span className="font-semibold text-emerald-400">{selectedDay} Strategy: </span>
            Best release slot is <strong>{currentDayStats.bestUtcHour}:00 UTC</strong> (allows simultaneous morning West Coast US and peak evening European consumption).
          </div>
          <span className="font-mono text-slate-400 text-xs">Engagement Index: {currentDayStats.avgViewerIndex}/100</span>
        </div>
      </div>

      {/* Section 3: Title & Thumbnail Performance Intelligence */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="text-base font-bold font-display text-white">
          Title &amp; Framing Performance Benchmarks
        </h3>

        <div className="space-y-3">
          {CREATOR_PLAYBOOK_INSIGHTS.titlePatterns.map((pattern, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold text-rose-300">
                  {pattern.archetype}
                </div>
                <div className="text-sm font-medium text-slate-100 font-mono">
                  &ldquo;{pattern.example}&rdquo;
                </div>
                <div className="text-xs text-slate-400">
                  {pattern.verdict}
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 font-mono text-xs tabular-nums">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">CTR Proxy</span>
                  <span className="font-bold text-slate-200">{pattern.avgClickThroughRateProxy}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Retention Score</span>
                  <span className={`font-bold ${pattern.retentionScore > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {pattern.retentionScore}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Data Enrichment & Taxonomy Classifier */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-400" />
              <span>Data Enrichment &amp; Deep Categorization Tags</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              PulseV3 enriches standard YouTube Data API categories into multidimensional industry classification taxonomy.
            </p>
          </div>
        </div>

        {/* Active Enrichment Tags (Strict unboxed text metadata with separators or interactive tags) */}
        <div className="flex flex-wrap gap-2 pt-2">
          {activeTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-300"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-slate-500 hover:text-rose-400 text-xs ml-1"
                title="Remove tag"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Add Tag Input */}
        <div className="flex gap-2 pt-2 max-w-md">
          <input
            type="text"
            value={enrichmentTagInput}
            onChange={(e) => setEnrichmentTagInput(e.target.value)}
            placeholder="Add custom enrichment tag..."
            className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          />
          <button
            onClick={handleAddTag}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-md transition-colors"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};
