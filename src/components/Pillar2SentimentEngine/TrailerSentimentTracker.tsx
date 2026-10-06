import React, { useState } from 'react';
import { Film, Sparkles, TrendingUp, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle } from 'lucide-react';
import { TRAILERS_DATA } from '../../data/mockData';
import { TrailerProject } from '../../types';

interface TrailerSentimentTrackerProps {
  onCollateComments: (trailer: TrailerProject) => void;
  onRequestStudioDossier: (trailerTitle: string) => void;
}

export const TrailerSentimentTracker: React.FC<TrailerSentimentTrackerProps> = ({
  onCollateComments,
  onRequestStudioDossier
}) => {
  const [selectedTrailerId, setSelectedTrailerId] = useState<string>(TRAILERS_DATA[0].id);

  const selectedTrailer = TRAILERS_DATA.find((t) => t.id === selectedTrailerId) || TRAILERS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 2 &middot; Market Intelligence Engine
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Product &amp; Blockbuster Trailer Sentiment Tracking
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Measures public sentiment, excitement velocity, and franchise fatigue for upcoming theatrical releases (e.g. Warner Bros, Disney) and premier hardware/brand announcements (e.g. Apple, Prada).
          </p>
        </div>

        <button
          onClick={() => onRequestStudioDossier(selectedTrailer.title)}
          className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          Generate Studio Briefing Report
        </button>
      </div>

      {/* Trailer Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {TRAILERS_DATA.map((trailer) => (
          <button
            key={trailer.id}
            onClick={() => setSelectedTrailerId(trailer.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs text-left transition-all ${
              selectedTrailerId === trailer.id
                ? 'bg-slate-900 border-rose-500 text-white shadow-sm'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-slate-100">{trailer.brandOrStudio}</div>
            <div className="text-[11px] text-slate-400 truncate max-w-xs">{trailer.title}</div>
          </button>
        ))}
      </div>

      {/* Selected Trailer Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Media & Key Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={selectedTrailer.thumbnail}
              alt={selectedTrailer.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="text-[11px] font-mono text-rose-300 uppercase tracking-wider">
                {selectedTrailer.entityType}
              </div>
              <div className="text-sm font-bold font-display line-clamp-1">
                {selectedTrailer.title}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Total Views</span>
              <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                {(selectedTrailer.views / 1000000).toFixed(1)}M
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Likes</span>
              <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                {(selectedTrailer.likes / 1000).toFixed(0)}k
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Comments</span>
              <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                {(selectedTrailer.comments / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          {/* Collate Comments Button */}
          <button
            onClick={() => onCollateComments(selectedTrailer)}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-rose-300 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Collate &amp; Deep-Analyze Raw Comment Stream</span>
          </button>
        </div>

        {/* Right Column: Sentiment Diagnostics & Praises/Critiques (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Sentiment Index Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Excitement vs. Fatigue Index</span>
                <div className="text-xl font-bold font-display text-white">
                  {selectedTrailer.excitementScore}% Net Excitement
                </div>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                <span>Fatigue Factor: </span>
                <span className={selectedTrailer.fatigueScore > 15 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                  {selectedTrailer.fatigueScore}%
                </span>
              </div>
            </div>

            {/* Sentiment Ratio Bar */}
            <div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${selectedTrailer.positiveRatio}%` }}
                  title={`Positive: ${selectedTrailer.positiveRatio}%`}
                />
                <div
                  className="bg-slate-500 h-full"
                  style={{ width: `${selectedTrailer.neutralRatio}%` }}
                  title={`Neutral: ${selectedTrailer.neutralRatio}%`}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${selectedTrailer.negativeRatio}%` }}
                  title={`Critical/Negative: ${selectedTrailer.negativeRatio}%`}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-emerald-400">{selectedTrailer.positiveRatio}% Positive Reaction</span>
                <span className="text-slate-400">{selectedTrailer.neutralRatio}% Neutral</span>
                <span className="text-rose-400">{selectedTrailer.negativeRatio}% Skeptical / Critical</span>
              </div>
            </div>

            {/* Market Takeaway Narrative */}
            <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-lg text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-rose-300">Executive Market Takeaway: </span>
              {selectedTrailer.marketTakeaway}
            </div>
          </div>

          {/* Praises & Critiques NLP Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Praises */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Primary Positive Drivers</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedTrailer.topPraises.map((praise, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono mt-0.5">&bull;</span>
                    <span className="leading-snug">{praise}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Critiques */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Audience Reservations &amp; Criticisms</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedTrailer.topCritiques.map((critique, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono mt-0.5">&bull;</span>
                    <span className="leading-snug">{critique}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sentiment Velocity Timeline */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-medium text-slate-300 block">
              Sentiment Velocity Curve (Post-Release Temporal Tracking)
            </span>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {selectedTrailer.sentimentVelocity.map((item, idx) => (
                <div key={idx} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded text-center">
                  <div className="text-[10px] text-slate-500 font-mono">{item.time}</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                    {item.excitement}%
                  </div>
                  <div className="text-[10px] text-slate-400">Excitement</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
