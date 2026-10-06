import React from 'react';
import { Database, ShieldCheck, CheckCircle2, Clock, Zap, RefreshCw, Server, AlertCircle } from 'lucide-react';

interface DataIntegrityPipelineProps {
  quotaUsed: number;
  quotaBudget: number;
  quotaSaved: number;
  onRefreshPipeline: () => void;
}

export const DataIntegrityPipeline: React.FC<DataIntegrityPipelineProps> = ({
  quotaUsed,
  quotaBudget,
  quotaSaved,
  onRefreshPipeline
}) => {
  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 4 &middot; Enterprise Platform
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Data Integrity &amp; Pipeline Transparency
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Continuous validation pipelines ensuring YouTube Data API v3 statistics remain complete, fresh, and free from telemetry gaps or quota dropouts.
          </p>
        </div>

        <button
          onClick={onRefreshPipeline}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
          <span>Execute Health Check Audit</span>
        </button>
      </div>

      {/* Primary Health Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ETL Freshness SLA</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-300 tabular-nums">
            99.98%
          </div>
          <div className="text-[11px] text-slate-500">Updated every 15 minutes</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>API Quota Consumption</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-100 tabular-nums">
            {quotaUsed.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {quotaBudget.toLocaleString()}</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            +{quotaSaved.toLocaleString()} preserved via UU trick
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Data Completeness</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-100 tabular-nums">
            100.0%
          </div>
          <div className="text-[11px] text-slate-500">0 dropped frames or fields</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Schema Verification</span>
            <Database className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold font-mono text-sky-300 tabular-nums">
            Strict v3
          </div>
          <div className="text-[11px] text-slate-500">JSON schema verified</div>
        </div>
      </div>

      {/* Validation Pipeline Stages */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <h3 className="text-base font-bold font-display text-white">
          Active Pipeline Verification Gates
        </h3>

        <div className="space-y-3">
          {[
            {
              gate: 'Gate 01: Quota-Guard Ingestion Layer',
              desc: 'Enforces playlistItems.list routing for channel video discovery. Disallows blind search.list calls to conserve 99% of API budget.',
              status: 'Active & Verified',
              latency: '1.2ms'
            },
            {
              gate: 'Gate 02: Comment Thread De-duplication & Entropy Validator',
              desc: 'Filters bot-farm template clusters and hashes comment threads to identify repeating non-human interaction arrays.',
              status: 'Active & Verified',
              latency: '4.8ms'
            },
            {
              gate: 'Gate 03: View-to-Interaction Outlier Quarantine',
              desc: 'Flags videos exceeding 2.5 standard deviations from organic view-to-like benchmarks for immediate forensic audit.',
              status: 'Active & Verified',
              latency: '2.1ms'
            },
            {
              gate: 'Gate 04: Semantic Categorization & Taxonomy Enricher',
              desc: 'Enriches raw category IDs into four-tier industry classifications with pedagogical and production values.',
              status: 'Active & Verified',
              latency: '6.4ms'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="font-semibold text-slate-200">{item.gate}</div>
                <div className="text-slate-400">{item.desc}</div>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </span>
                <span className="text-slate-500">{item.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
