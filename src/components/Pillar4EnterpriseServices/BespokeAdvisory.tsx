import React, { useState } from 'react';
import { FileText, Download, Sparkles, Building2, CheckCircle2, ChevronRight, Share2, Printer } from 'lucide-react';
import { ADVISORY_REPORTS_DATA } from '../../data/mockData';
import { AdvisoryReportRequest } from '../../types';

interface BespokeAdvisoryProps {
  initialTargetTopic?: string;
}

export const BespokeAdvisory: React.FC<BespokeAdvisoryProps> = ({
  initialTargetTopic = ''
}) => {
  const [reports, setReports] = useState<AdvisoryReportRequest[]>(ADVISORY_REPORTS_DATA);
  const [selectedReportId, setSelectedReportId] = useState<string>(ADVISORY_REPORTS_DATA[0].id);

  // New report builder state
  const [clientName, setClientName] = useState<string>('Sony Pictures Releasing');
  const [industry, setIndustry] = useState<any>('Film & Entertainment');
  const [targetTopic, setTargetTopic] = useState<string>(initialTargetTopic || 'Beyond the Spider-Verse Theatrical Teaser Audience Polarity & Hype Trajectory');
  const [scope, setScope] = useState<any>('Trailer Sentiment Forensics');
  const [deliveryFormat, setDeliveryFormat] = useState<any>('Executive PDF & Data Export');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const selectedReport = reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: AdvisoryReportRequest = {
      id: `ADV-2026-00${reports.length + 1}`,
      clientName,
      industry,
      targetQueryOrTopic: targetTopic,
      scope,
      deliveryFormat,
      status: 'Delivered',
      summaryFindings: `Executive Analysis for ${clientName}: High organic excitement marker across tracked demographic clusters. Sentiment baseline is 89% positive with verified low fatigue. Algorithmic fraud audit verified organic viewer distribution.`
    };

    setReports([newReport, ...reports]);
    setSelectedReportId(newReport.id);
    setIsGenerated(true);
    setTimeout(() => setIsGenerated(false), 2500);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 4 &middot; Enterprise Advisory
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Bespoke Market Intelligence &amp; Custom Advisory
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Tailored analysis services for film studios, global record labels, luxury fashion houses, and investment offices. Transforms raw video data into board-ready executive briefings.
          </p>
        </div>

        <button
          onClick={handlePrintDossier}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
        >
          <Printer className="w-3.5 h-3.5 text-rose-400" />
          <span>Export / Print Active Dossier</span>
        </button>
      </div>

      {/* Reports Directory & Active Briefing View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Delivered Briefing Archive & Request Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
              Executive Briefing Archive
            </span>

            <div className="space-y-2">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedReportId === report.id
                      ? 'bg-slate-900 border-rose-500 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{report.id}</span>
                    <span className="text-emerald-400 font-medium">{report.status}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                    {report.clientName}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {report.targetQueryOrTopic}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Advisory Request Builder */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-white font-display">
              Commission Custom Intelligence Report
            </h3>

            <form onSubmit={handleCreateReport} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Client Organization</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Industry Vertical</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="Film & Entertainment">Film &amp; Entertainment</option>
                  <option value="Record Label & Music">Record Label &amp; Music</option>
                  <option value="Consumer Tech & Hardware">Consumer Tech &amp; Hardware</option>
                  <option value="Luxury & Fashion">Luxury &amp; Fashion</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Topic / Release / Query</label>
                <textarea
                  value={targetTopic}
                  onChange={(e) => setTargetTopic(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Analytical Scope</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  <option value="Trailer Sentiment Forensics">Trailer Sentiment Forensics</option>
                  <option value="Talent Scouting Dossier">Talent Scouting Dossier</option>
                  <option value="Competitor Dominance Analysis">Competitor Dominance Analysis</option>
                  <option value="Full Market Intelligence">Full Market Intelligence</option>
                </select>
              </div>

              {isGenerated && (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Executive dossier compiled and delivered!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm"
              >
                Generate Custom Dossier Report
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Interactive Executive Dossier Preview (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
          {/* Executive Dossier Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-rose-400 font-semibold">{selectedReport.id}</span>
              <span className="text-slate-500 font-mono">Classification: Confidential / Board Grade</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              {selectedReport.targetQueryOrTopic}
            </h3>
            <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
              <span className="text-slate-200 font-medium">{selectedReport.clientName}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{selectedReport.industry}</span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-rose-400">{selectedReport.scope}</span>
            </div>
          </div>

          {/* Key Executive Findings */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Executive Findings Summary
            </h4>
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 leading-relaxed">
              {selectedReport.summaryFindings}
            </div>
          </div>

          {/* Empirical Benchmarks Box */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Calculated Sentiment</span>
              <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">92% Net Positive</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Audience Fatigue</span>
              <span className="text-base font-bold font-mono text-slate-300 tabular-nums">4% (Low)</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Fraud Risk</span>
              <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">Zero Bot Clusters</span>
            </div>
          </div>

          {/* Strategic Advisory Recommendations */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Strategic Advisory Recommendations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">01.</span>
                <span>
                  <strong>Ad Spend Allocation: </strong>
                  Concentrate 65% of secondary trailer digital spend across the verified high-retention acoustic/cinema creator clusters identified in Pillar 1.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">02.</span>
                <span>
                  <strong>Comment Friction Mitigation: </strong>
                  Address the specific release-window and pricing ambiguities flagged in comment NLP collation before the primary press junket.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-mono mt-0.5">03.</span>
                <span>
                  <strong>Talent Scouting Outright Acquisition: </strong>
                  Initiate direct representation contact with scouted indie prodigies before engagement ratios dilute post-viral exposure.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
