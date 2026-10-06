import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Sliders, ShieldX, Eye, ThumbsUp, MessageSquare } from 'lucide-react';
import { VIDEOS_DATA, FRAUD_AUDIT_SAMPLES } from '../../data/mockData';
import { auditVideoFraud } from '../../services/youtubeApi';
import { Video, FraudAnalysisResult } from '../../types';

interface FraudDetectionAuditProps {
  onSelectVideoForAudit?: (video: Video) => void;
}

export const FraudDetectionAudit: React.FC<FraudDetectionAuditProps> = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('v_fraud_suspect_01');
  const [customInputId, setCustomInputId] = useState<string>('');
  
  const currentVideo = VIDEOS_DATA.find((v) => v.id === selectedVideoId) || VIDEOS_DATA[0];
  const auditResult: FraudAnalysisResult = auditVideoFraud(currentVideo);

  const handleAuditCustom = () => {
    if (customInputId.trim()) {
      // Find or build simulated
      const found = VIDEOS_DATA.find((v) => v.id === customInputId.trim() || v.title.toLowerCase().includes(customInputId.toLowerCase()));
      if (found) {
        setSelectedVideoId(found.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 2 &middot; Forensic Intelligence
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Fake View &amp; Engagement Fraud Detection Engine
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Forensic analysis detecting purchased view counts, bot clusters, and synthetic watch-time injection. Protects brands, studios, and agencies against deploying capital on inflated vanity statistics.
          </p>
        </div>
      </div>

      {/* Preset Audit Targets */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          Select Video for Forensic Anomaly Audit
        </label>
        <div className="flex flex-wrap gap-2">
          {VIDEOS_DATA.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVideoId(v.id)}
              className={`px-3 py-2 text-xs rounded-lg border text-left transition-colors ${
                selectedVideoId === v.id
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="truncate max-w-xs">{v.title}</div>
              <div className="text-[11px] font-mono text-slate-500">
                {v.viewCount.toLocaleString()} views &middot; {v.fraudFlag}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Forensic Audit Results Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Verdict Card & Ratios (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Verdict Card */}
          <div className={`p-6 rounded-xl border ${
            auditResult.anomalyVerdict === 'CRITICAL_BOT_FARM'
              ? 'bg-rose-950/30 border-rose-800'
              : auditResult.anomalyVerdict === 'ELEVATED_ANOMALY'
              ? 'bg-amber-950/30 border-amber-800'
              : 'bg-emerald-950/30 border-emerald-800'
          }`}>
            <div className="flex items-center gap-3">
              {auditResult.anomalyVerdict === 'CRITICAL_BOT_FARM' ? (
                <ShieldX className="w-8 h-8 text-rose-500 shrink-0" />
              ) : auditResult.anomalyVerdict === 'ELEVATED_ANOMALY' ? (
                <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
              )}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Forensic Integrity Verdict
                </span>
                <div className={`text-lg font-bold font-display ${
                  auditResult.anomalyVerdict === 'CRITICAL_BOT_FARM'
                    ? 'text-rose-400'
                    : auditResult.anomalyVerdict === 'ELEVATED_ANOMALY'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {auditResult.anomalyVerdict.replace(/_/g, ' ')}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Fraud Probability Score</span>
                <span className="font-mono font-bold text-slate-100 tabular-nums">
                  {auditResult.anomalyScore}/100
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    auditResult.anomalyScore > 70
                      ? 'bg-rose-500'
                      : auditResult.anomalyScore > 30
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${auditResult.anomalyScore}%` }}
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-rose-300">Action Recommendation: </span>
              {auditResult.recommendation}
            </div>
          </div>

          {/* Ratio Comparison Box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              Interaction Footprint vs. YouTube Industry Baselines
            </span>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Observed Interaction Ratio:</span>
                <span className="font-mono font-bold text-rose-400 tabular-nums">
                  {auditResult.viewToInteractionRatio}%
                </span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Expected Organic Baseline:</span>
                <span className="font-mono text-emerald-400 tabular-nums">
                  3.50% &ndash; 7.20%
                </span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Comment Vocabulary Entropy:</span>
                <span className="font-mono text-slate-300 tabular-nums">
                  {auditResult.commentEntropy.toFixed(2)} / 1.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Violation Flags & Video Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Target Video Summary */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs text-slate-500">Audited Asset:</span>
            <h3 className="text-base font-semibold text-white font-display">
              {currentVideo.title}
            </h3>
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono tabular-nums">
              <span>{currentVideo.channelTitle}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{currentVideo.viewCount.toLocaleString()} views</span>
              <span aria-hidden="true">&middot;</span>
              <span>{currentVideo.likeCount.toLocaleString()} likes</span>
              <span aria-hidden="true">&middot;</span>
              <span>{currentVideo.commentCount.toLocaleString()} comments</span>
            </div>
          </div>

          {/* Triggered Forensic Flags */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              Forensic Rule Evaluations ({auditResult.flags.length})
            </span>

            {auditResult.flags.map((flag, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      flag.severity === 'high'
                        ? 'bg-rose-500'
                        : flag.severity === 'medium'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`} />
                    <span className="font-semibold text-slate-100">{flag.rule}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 uppercase">
                    Severity: {flag.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-4">
                  {flag.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Explainer Note */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">How Fake View Detection Works: </strong>
            Commercial bot syndicates generate headless HTTP requests that register view increments in YouTube Data API v3 without triggering corresponding event listeners for likes, comment threads, or authentic browser session cookies. PulseV3 measures the statistical divergence between raw video view counts and the high-entropy interaction cluster signature.
          </div>
        </div>
      </div>
    </div>
  );
};
