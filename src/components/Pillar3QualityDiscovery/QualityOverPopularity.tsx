import React, { useState } from 'react';
import { Award, ArrowUpDown, Filter, Eye, ThumbsUp, MessageSquare, Sparkles, BookOpen } from 'lucide-react';
import { VIDEOS_DATA } from '../../data/mockData';
import { Video } from '../../types';

interface QualityOverPopularityProps {
  onSelectVideo: (video: Video) => void;
}

export const QualityOverPopularity: React.FC<QualityOverPopularityProps> = ({
  onSelectVideo
}) => {
  const [rankingMode, setRankingMode] = useState<'quality' | 'views' | 'likes' | 'comments' | 'retention' | 'discussion'>('quality');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Science & Math', 'Cinema & VFX', 'Music & Audio', 'Tech & AI'];

  const sortedVideos = [...VIDEOS_DATA]
    .filter((v) => selectedCategory === 'All' || v.category === selectedCategory)
    .sort((a, b) => {
      if (rankingMode === 'quality') return b.qualityScore - a.qualityScore;
      if (rankingMode === 'views') return b.viewCount - a.viewCount;
      if (rankingMode === 'likes') return b.likeCount - a.likeCount;
      if (rankingMode === 'comments') return b.commentCount - a.commentCount;
      if (rankingMode === 'retention') return b.retentionMarker - a.retentionMarker;
      if (rankingMode === 'discussion') return b.discussionDepthScore - a.discussionDepthScore;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 3 &middot; Quality Discovery
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Quality-Over-Popularity Content Ranking
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            YouTube&apos;s native feed amplifies sensationalism and clickbait volume. PulseV3 re-indexes videos based on substantive retention markers, depth of viewer discussions, and informational density rather than pure viral click counts.
          </p>
        </div>

        {/* Quality Formula Callout */}
        <div className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 shrink-0">
          <span className="text-slate-500 font-sans">Index:</span> 40% Retention + 35% Discussion Depth + 25% Engagement
        </div>
      </div>

      {/* Control Strip: Ranking Mode & Categories */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dimensions (Rank by views, likes, comments, quality, retention) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 mr-1">Rank By:</span>
          {[
            { id: 'quality', label: 'Quality Index' },
            { id: 'retention', label: 'Retention' },
            { id: 'discussion', label: 'Discussion Depth' },
            { id: 'views', label: 'View Count' },
            { id: 'likes', label: 'Likes' },
            { id: 'comments', label: 'Comments' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setRankingMode(mode.id as any)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                rankingMode === mode.id
                  ? 'bg-slate-800 text-rose-300 font-semibold border border-rose-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Ranking Cards List */}
      <div className="space-y-4">
        {sortedVideos.map((video, index) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer flex flex-col md:flex-row gap-5 items-start justify-between group"
          >
            {/* Rank badge + Thumbnail */}
            <div className="flex gap-4 items-start w-full md:w-auto">
              <div className="text-lg font-bold font-mono tabular-nums text-slate-500 pt-1 w-6 text-center shrink-0">
                #{index + 1}
              </div>

              <div className="relative aspect-video w-36 sm:w-44 bg-slate-950 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-[10px] font-mono text-white rounded">
                  {video.duration}
                </span>
              </div>

              {/* Title & Channel details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="font-medium text-slate-300">{video.channelTitle}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-rose-400">{video.category}</span>
                </div>

                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Tags (Zero-pill text separators) */}
                <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 pt-1">
                  {video.tags.map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span>#{tag}</span>
                      {tIdx < video.tags.length - 1 && <span aria-hidden="true">&middot;</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Breakdown (Tabular figures) */}
            <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0">
              {/* Quality Score Primary Stamp */}
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Quality Index</span>
                <span className="font-mono text-xl font-bold text-rose-400 tabular-nums">
                  {video.qualityScore}
                  <span className="text-xs font-normal text-slate-500">/100</span>
                </span>
              </div>

              {/* Retention & Discussion Depth */}
              <div className="flex md:flex-col gap-3 md:gap-1 text-right text-xs font-mono tabular-nums text-slate-400">
                <div>
                  <span className="text-slate-500 text-[11px]">Retention: </span>
                  <span className="text-emerald-400 font-medium">{video.retentionMarker}%</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Discussion Depth: </span>
                  <span className="text-sky-400 font-medium">{video.discussionDepthScore}/100</span>
                </div>
              </div>

              {/* Standard Counts */}
              <div className="text-right text-[11px] font-mono tabular-nums text-slate-500">
                {video.viewCount.toLocaleString()} views &middot; {video.likeCount.toLocaleString()} likes
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
