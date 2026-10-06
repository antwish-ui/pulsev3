import React, { useState } from 'react';
import { Search, Zap, ArrowRight, ShieldCheck, Database, Layers, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { CHANNELS_DATA, VIDEOS_DATA } from '../data/mockData';
import { getUploadsPlaylistId, fetchChannelUploadsZeroSearchQuota } from '../services/youtubeApi';
import { Video } from '../types';

interface ZeroQuotaSearchProps {
  onSelectVideo: (video: Video) => void;
  onIncrementQuotaSaved: (amount: number) => void;
  apiKey: string;
}

export const ZeroQuotaSearch: React.FC<ZeroQuotaSearchProps> = ({
  onSelectVideo,
  onIncrementQuotaSaved,
  apiKey
}) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>(CHANNELS_DATA[0].id);
  const [customChannelInput, setCustomChannelInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'views' | 'likes' | 'comments' | 'quality'>('quality');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeChannelId, setActiveChannelId] = useState<string>(CHANNELS_DATA[0].id);
  const [currentVideos, setCurrentVideos] = useState<Video[]>(VIDEOS_DATA);
  const [lastQuotaResult, setLastQuotaResult] = useState<{
    method: string;
    quotaUsed: number;
    quotaSaved: number;
  }>({
    method: 'Zero-Quota Playlist Architecture (UU... Uploads Pipeline)',
    quotaUsed: 1,
    quotaSaved: 99
  });

  const activeChannel = CHANNELS_DATA.find((c) => c.id === activeChannelId) || {
    id: activeChannelId,
    uploadsPlaylistId: getUploadsPlaylistId(activeChannelId),
    title: 'Selected Channel',
    handle: '@custom_channel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    subscriberCount: 250000,
    videoCount: 84
  };

  const currentUploadPlaylistId = getUploadsPlaylistId(activeChannelId);

  const handleExecuteFetch = async (channelIdToFetch: string) => {
    setLoading(true);
    setActiveChannelId(channelIdToFetch);

    const result = await fetchChannelUploadsZeroSearchQuota(channelIdToFetch, apiKey);
    setCurrentVideos(result.videos);
    setLastQuotaResult({
      method: result.methodUsed,
      quotaUsed: result.quotaUsed,
      quotaSaved: result.quotaSaved
    });
    onIncrementQuotaSaved(result.quotaSaved);
    setLoading(false);
  };

  // Client-side instant search on fetched channel uploads
  const filteredVideos = currentVideos
    .filter((v) => {
      const q = searchQuery.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.viewCount - a.viewCount;
      if (sortBy === 'likes') return b.likeCount - a.likeCount;
      if (sortBy === 'comments') return b.commentCount - a.commentCount;
      return b.qualityScore - a.qualityScore;
    });

  return (
    <div className="space-y-6">
      {/* Top Architectural Explainer Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>YOUTUBE DATA API V3 QUOTA INVARIANT</span>
            </div>
            <h2 className="mt-1 text-xl font-bold font-display text-white">
              Search Channel Uploads Without Burning Search Quota
            </h2>
            <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
              Standard YouTube <code className="text-rose-300">search.list</code> consumes <strong>100 quota units</strong> per request, exhausting a free 10,000 quota budget in just 100 requests. PulseV3 transforms Channel IDs into Upload Playlist IDs (<code className="text-emerald-400">UC... &rarr; UU...</code>) to query <code className="text-emerald-400">playlistItems.list</code> at only <strong>1 quota unit</strong>, followed by zero-cost client-side indexing.
            </p>
          </div>

          {/* Quota Cost Comparison Matrix */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-rose-950/30 border border-rose-900/40 rounded-lg text-center">
              <div className="text-[11px] text-rose-300 font-medium">Standard search.list</div>
              <div className="text-lg font-bold font-mono text-rose-400 tabular-nums">100 units</div>
              <div className="text-[10px] text-slate-500">100 searches = Quota Dead</div>
            </div>

            <div className="text-slate-600 font-mono text-lg">&rarr;</div>

            <div className="px-4 py-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-center">
              <div className="text-[11px] text-emerald-300 font-medium">PulseV3 UU... Method</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">1 unit</div>
              <div className="text-[10px] text-emerald-500 font-medium">99% Quota Saved</div>
            </div>
          </div>
        </div>

        {/* Live Transformation Visualizer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Target Channel ID:</span>
            <span className="px-2 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded">
              {activeChannelId}
            </span>
          </div>

          <div className="text-amber-400 font-bold">&rarr; [UC &rarr; UU Translation] &rarr;</div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Uploads Playlist ID:</span>
            <span className="px-2 py-1 bg-slate-950 border border-emerald-900/50 text-emerald-300 rounded font-bold">
              {currentUploadPlaylistId}
            </span>
          </div>

          <div className="ml-auto text-slate-400 text-xs font-sans">
            Cost: <span className="font-mono text-emerald-400 font-bold">1 unit</span> (Saved: <span className="font-mono text-emerald-400">99 units</span>)
          </div>
        </div>
      </div>

      {/* Control Bar: Channel Selector & Custom Channel Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Preset Channels */}
        <div className="lg:col-span-6 space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Select Tracked Creator or Expert
          </label>
          <div className="flex flex-wrap gap-2">
            {CHANNELS_DATA.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChannelId(ch.id);
                  handleExecuteFetch(ch.id);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                  activeChannelId === ch.id
                    ? 'bg-rose-950/60 border-rose-600 text-rose-200 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Channel ID Input */}
        <div className="lg:col-span-6 space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Or Test Any Custom Channel ID (<code className="text-rose-300 font-mono">UC...</code>)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customChannelInput}
              onChange={(e) => setCustomChannelInput(e.target.value)}
              placeholder="e.g. UCX6OQ3DkcsbYNE6H8uQQuVA"
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => {
                if (customChannelInput.trim()) {
                  handleExecuteFetch(customChannelInput.trim());
                }
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Fetch Uploads (1 Unit)
            </button>
          </div>
        </div>
      </div>

      {/* Instant Search & Sort Filter inside the Uploads */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
        {/* Search Query */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Instant search across uploads without API search quota (e.g. quantum, camera, audio, apple)..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400">Sort by:</span>
          <div className="flex bg-slate-950 p-0.5 rounded-md border border-slate-800">
            <button
              onClick={() => setSortBy('quality')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'quality' ? 'bg-slate-800 text-rose-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Quality Score
            </button>
            <button
              onClick={() => setSortBy('views')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'views' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Views
            </button>
            <button
              onClick={() => setSortBy('likes')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'likes' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Likes
            </button>
            <button
              onClick={() => setSortBy('comments')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                sortBy === 'comments' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Comments
            </button>
          </div>
        </div>
      </div>

      {/* Videos List Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          Querying uploads playlist via playlistItems.list (1 Quota Unit)...
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
          No uploads found matching &quot;{searchQuery}&quot;. Try adjusting your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-mono font-medium text-white rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span>{video.channelTitle}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="font-mono tabular-nums">{new Date(video.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics Bar (Strict unboxed metadata with separators) */}
              <div className="px-4 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-mono tabular-nums">
                  <span>{video.viewCount.toLocaleString()} views</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{video.likeCount.toLocaleString()} likes</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{video.commentCount.toLocaleString()} comments</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">Quality:</span>
                  <span className="font-mono tabular-nums font-bold text-rose-400">
                    {video.qualityScore}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
