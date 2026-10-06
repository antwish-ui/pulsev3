import React, { useState } from 'react';
import { MessageSquare, Filter, ThumbsUp, ThumbsDown, HelpCircle, AlertTriangle, Search, Sparkles } from 'lucide-react';
import { COLLATED_COMMENTS_SAMPLE } from '../../data/mockData';
import { CommentItem } from '../../types';

interface CommentCollationNLPProps {
  initialVideoTitle?: string;
}

export const CommentCollationNLP: React.FC<CommentCollationNLPProps> = ({
  initialVideoTitle = 'DUNE: PART THREE - Messiah (Official Teaser Trailer)'
}) => {
  const [videoUrlInput, setVideoUrlInput] = useState<string>('https://youtube.com/watch?v=dune_messiah_2026');
  const [activeFilter, setActiveFilter] = useState<'all' | 'praise' | 'criticism' | 'feature_request' | 'spam_flagged'>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [comments, setComments] = useState<CommentItem[]>(COLLATED_COMMENTS_SAMPLE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCollationRunning, setIsCollationRunning] = useState<boolean>(false);

  const handleSimulateCollation = () => {
    setIsCollationRunning(true);
    setTimeout(() => {
      setIsCollationRunning(false);
    }, 600);
  };

  const themes = ['all', 'Lighting Technique', 'Audio Hardware', 'Color Grading Request', 'Mix Balance', 'Talent Discovery', 'Educational Rigor', 'Benchmark Omission'];

  const filteredComments = comments.filter((c) => {
    const matchCategory = activeFilter === 'all' || c.category === activeFilter;
    const matchTheme = themeFilter === 'all' || c.theme === themeFilter;
    const matchSearch = c.text.toLowerCase().includes(searchQuery.toLowerCase()) || c.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchTheme && matchSearch;
  });

  const praiseCount = comments.filter((c) => c.category === 'praise').length;
  const critiqueCount = comments.filter((c) => c.category === 'criticism').length;
  const requestCount = comments.filter((c) => c.category === 'feature_request').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 2 &middot; Comment NLP Collation
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            Raw Comment Stream Collation &amp; Insight Synthesis
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Captures and parses YouTube video comment threads at scale. Dissects audience reactions into explicit likes, constructive dislikes, feature/content requests, and bot spam patterns.
          </p>
        </div>
      </div>

      {/* Target Video Capture Input */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          Capture Comments from YouTube Video URL or Video ID
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
            placeholder="Paste YouTube Video URL (e.g. https://youtube.com/watch?v=...)"
            className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={handleSimulateCollation}
            disabled={isCollationRunning}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            {isCollationRunning ? 'Parsing Comment Tree...' : 'Collate Comments & Run NLP'}
          </button>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <span className="text-emerald-400 font-medium">&bull; Currently Analyzed:</span>
          <span>{initialVideoTitle}</span>
        </div>
      </div>

      {/* Categorical Breakdown Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setActiveFilter('all')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
            activeFilter === 'all' ? 'bg-slate-850 border-rose-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-slate-400">Total Collated</div>
          <div className="text-xl font-bold font-mono text-slate-100 tabular-nums">
            {comments.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Full Thread Stream</div>
        </div>

        <div 
          onClick={() => setActiveFilter('praise')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
            activeFilter === 'praise' ? 'bg-emerald-950/30 border-emerald-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
            <ThumbsUp className="w-3 h-3" />
            <span>What Viewers Liked</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-300 tabular-nums">
            {praiseCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Specific Praises &amp; Highlights</div>
        </div>

        <div 
          onClick={() => setActiveFilter('criticism')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
            activeFilter === 'criticism' ? 'bg-rose-950/30 border-rose-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-rose-400 flex items-center gap-1.5 font-medium">
            <ThumbsDown className="w-3 h-3" />
            <span>Dislikes &amp; Criticisms</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-300 tabular-nums">
            {critiqueCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Constructive Points &amp; Friction</div>
        </div>

        <div 
          onClick={() => setActiveFilter('feature_request')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
            activeFilter === 'feature_request' ? 'bg-sky-950/30 border-sky-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-xs text-sky-400 flex items-center gap-1.5 font-medium">
            <HelpCircle className="w-3 h-3" />
            <span>Viewer Inquiries &amp; Requests</span>
          </div>
          <div className="text-xl font-bold font-mono text-sky-300 tabular-nums">
            {requestCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Follow-up Topic Ideas</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within comments or author handles..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Theme Filter Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">Theme:</span>
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-300 focus:outline-none focus:border-rose-500"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t === 'all' ? 'All Semantic Clusters' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comment Stream Items List */}
      <div className="space-y-3">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">{comment.author}</span>
                <span aria-hidden="true" className="text-slate-600">&middot;</span>
                <span className="text-slate-500">{comment.publishedAt}</span>
                <span aria-hidden="true" className="text-slate-600">&middot;</span>
                <span className="text-slate-400 font-mono text-[11px]">{comment.theme}</span>
              </div>

              {/* Category indicator (Strict unboxed text, no pill box) */}
              <div className="text-xs font-medium">
                {comment.category === 'praise' && (
                  <span className="text-emerald-400">Audience Praise</span>
                )}
                {comment.category === 'criticism' && (
                  <span className="text-rose-400">Audience Critique</span>
                )}
                {comment.category === 'feature_request' && (
                  <span className="text-sky-400">Inquiry / Request</span>
                )}
                {comment.category === 'spam_flagged' && (
                  <span className="text-amber-400">Bot / Spam Flag</span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;{comment.text}&quot;
            </p>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 font-mono tabular-nums">
              <span>{comment.likeCount} viewer upvotes</span>
              <span className="capitalize">{comment.sentiment} sentiment score</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
