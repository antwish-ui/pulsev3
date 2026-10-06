import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, ShieldAlert, Sparkles, MessageSquare, ThumbsUp, Eye, Clock, Award } from 'lucide-react';
import { Video } from '../types';
import { auditVideoFraud } from '../services/youtubeApi';

interface VideoDetailModalProps {
  video: Video | null;
  onClose: () => void;
  onNavigateToAudit?: (video: Video) => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  video,
  onClose,
  onNavigateToAudit
}) => {
  if (!video) return null;

  const fraudAudit = auditVideoFraud(video);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-rose-400 font-semibold">{video.category}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{video.channelTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Media & Metadata Banner */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative aspect-video w-full sm:w-64 bg-slate-950 rounded-xl overflow-hidden shrink-0 border border-slate-800">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-mono text-white rounded">
                {video.duration}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-lg font-bold font-display text-white leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {video.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-500">
                {video.tags.map((tag) => (
                  <span key={tag} className="text-slate-400">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Analytics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Total Views</span>
              <span className="font-mono text-base font-bold text-slate-200 tabular-nums">
                {video.viewCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Likes</span>
              <span className="font-mono text-base font-bold text-slate-200 tabular-nums">
                {video.likeCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Comments</span>
              <span className="font-mono text-base font-bold text-slate-200 tabular-nums">
                {video.commentCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Quality Index</span>
              <span className="font-mono text-base font-bold text-rose-400 tabular-nums">
                {video.qualityScore}/100
              </span>
            </div>
          </div>

          {/* Quality vs Viral Metrics Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                <Award className="w-4 h-4 text-rose-400" />
                <span>Quality-Over-Popularity Markers</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Audience Retention Marker</span>
                  <span className="font-mono text-emerald-400 font-bold">{video.retentionMarker}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Discussion Depth Index</span>
                  <span className="font-mono text-sky-400 font-bold">{video.discussionDepthScore}/100</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Audience Excitement Polarity</span>
                  <span className="font-mono text-slate-200 font-bold">+{video.sentimentPolarity}%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Forensic View Integrity Check</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Fraud Anomaly Verdict</span>
                  <span className={`font-mono font-bold ${
                    fraudAudit.anomalyVerdict === 'CRITICAL_BOT_FARM' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {fraudAudit.anomalyVerdict}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>View-to-Interaction Ratio</span>
                  <span className="font-mono text-slate-200 font-bold">{fraudAudit.viewToInteractionRatio}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Vocabulary Entropy</span>
                  <span className="font-mono text-slate-200 font-bold">{fraudAudit.commentEntropy} / 1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <span className="text-xs text-slate-500 font-mono">
            YouTube Video ID: {video.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
