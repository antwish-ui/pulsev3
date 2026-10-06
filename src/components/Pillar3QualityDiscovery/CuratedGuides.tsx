import React, { useState } from 'react';
import { BookOpen, Sparkles, Compass, CheckCircle2, Play, ExternalLink, ArrowRight } from 'lucide-react';
import { VIDEOS_DATA } from '../../data/mockData';
import { Video } from '../../types';

interface CuratedGuide {
  id: string;
  topic: string;
  domain: string;
  curatorNote: string;
  targetAudience: string;
  featuredVideoIds: string[];
}

const CURATED_GUIDES: CuratedGuide[] = [
  {
    id: 'guide_quantum_foundations',
    topic: 'Mathematical Foundations of Quantum Mechanics',
    domain: 'Science & Math',
    curatorNote: 'Filtered to exclude superficial pop-science metaphors. These lectures focus on rigorous Hilbert spaces, state vector linear algebra, and wave-function collapse.',
    targetAudience: 'Physics graduates, Quantum computing researchers',
    featuredVideoIds: ['v_quant_01', 'v_veritas_01']
  },
  {
    id: 'guide_anamorphic_cinematography',
    topic: 'Anamorphic Lens Character & Practical Subtractive Lighting',
    domain: 'Cinema & VFX',
    curatorNote: 'Hand-picked masterclasses focusing on negative fill, lighting balance for skin tones, and lens flare mitigation for independent narrative features.',
    targetAudience: 'Cinematographers, Directors of Photography, Gaffer crews',
    featuredVideoIds: ['v_elena_01', 'v_kestrel_01']
  },
  {
    id: 'guide_acoustic_recording',
    topic: 'Acoustic Guitar One-Take Tracking & Analog Preamps',
    domain: 'Music & Audio',
    curatorNote: 'Master-level acoustic recordings showcasing transparent microphone technique, room acoustics, and pure dynamic range without pitch correction.',
    targetAudience: 'Recording engineers, Indie singer-songwriters, A&R scouts',
    featuredVideoIds: ['v_maya_01']
  }
];

interface CuratedGuidesProps {
  onSelectVideo: (video: Video) => void;
}

export const CuratedGuides: React.FC<CuratedGuidesProps> = ({
  onSelectVideo
}) => {
  const [activeGuideId, setActiveGuideId] = useState<string>(CURATED_GUIDES[0].id);

  const activeGuide = CURATED_GUIDES.find((g) => g.id === activeGuideId) || CURATED_GUIDES[0];
  const guideVideos = VIDEOS_DATA.filter((v) => activeGuide.featuredVideoIds.includes(v.id));

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Pillar 3 &middot; Editorial Intelligence
          </div>
          <h2 className="mt-1 text-2xl font-bold font-display text-white">
            &quot;Best of&quot; Curated Guides &amp; Domain Recommendations
          </h2>
          <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
            Expert-level playlists and essential video curricula. Hand-selected for specialists seeking deep domain mastery without sifting through mass-market clickbait.
          </p>
        </div>
      </div>

      {/* Guides Segmented Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CURATED_GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => setActiveGuideId(guide.id)}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              activeGuideId === guide.id
                ? 'bg-slate-900 border-rose-500 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
            }`}
          >
            <div className="text-xs text-rose-400 font-medium mb-1">
              {guide.domain}
            </div>
            <h3 className="text-sm font-semibold text-slate-100 font-display line-clamp-1">
              {guide.topic}
            </h3>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {guide.curatorNote}
            </p>
          </div>
        ))}
      </div>

      {/* Active Guide Dossier */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
        <div className="space-y-2">
          <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
            Curated Syllabus &middot; {activeGuide.domain}
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            {activeGuide.topic}
          </h3>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            {activeGuide.curatorNote}
          </p>
          <div className="text-xs text-slate-400 pt-1">
            <span className="text-slate-500">Target Audience:</span> {activeGuide.targetAudience}
          </div>
        </div>

        {/* Recommended Videos in this Guide */}
        <div className="space-y-4 pt-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Featured Recommended Assets (Ranked by Quality Index)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guideVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="p-4 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-900">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-mono text-white rounded">
                      {video.duration}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">{video.channelTitle}</div>
                    <h4 className="text-sm font-semibold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2">
                      {video.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono tabular-nums text-rose-400 font-bold">
                    Quality Index: {video.qualityScore}/100
                  </span>
                  <span className="text-slate-500 font-mono tabular-nums">
                    {video.viewCount.toLocaleString()} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
