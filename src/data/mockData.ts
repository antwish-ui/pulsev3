import { Channel, Video, CommentItem, TrailerProject, FraudAnalysisResult, SupportTicket, AdvisoryReportRequest } from '../types';

export const CHANNELS_DATA: Channel[] = [
  {
    id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
    uploadsPlaylistId: 'UUX6OQ3DkcsbYNE6H8uQQuVA',
    title: 'Mrwhosetheboss',
    handle: '@mrwhosetheboss',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Tech & AI',
    subscriberCount: 19800000,
    videoCount: 1720,
    totalViews: 4890000000,
    growthRateMonthly: 3.4,
    engagementRatio: 5.8,
    uploadConsistencyScore: 95,
    domainRelevanceScore: 92,
    domainAuthorityScore: 94,
    isRadarEmerging: false,
    verifiedExpertise: ['Consumer Electronics', 'Smartphone Benchmarking', 'Display Tech'],
    recentUploadCadence: '2.1 videos / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UCsooa4yRKGN_zEE8iknghZA',
    uploadsPlaylistId: 'UUsooa4yRKGN_zEE8iknghZA',
    title: 'TED-Ed',
    handle: '@teded',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Science & Math',
    subscriberCount: 19400000,
    videoCount: 2240,
    totalViews: 4200000000,
    growthRateMonthly: 2.1,
    engagementRatio: 6.9,
    uploadConsistencyScore: 98,
    domainRelevanceScore: 98,
    domainAuthorityScore: 96,
    isRadarEmerging: false,
    verifiedExpertise: ['Pedagogical Animation', 'World History', 'Cognitive Psychology', 'Astrophysics'],
    recentUploadCadence: '4.5 videos / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UC7-E5xhZBkvW-8_TrvW47wA',
    uploadsPlaylistId: 'UU7-E5xhZBkvW-8_TrvW47wA',
    title: 'Elena Vance - Cinematic Lighting',
    handle: '@elenavance_film',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Cinema & VFX',
    subscriberCount: 84200,
    videoCount: 42,
    totalViews: 3820000,
    growthRateMonthly: 28.4,
    engagementRatio: 12.8,
    uploadConsistencyScore: 88,
    domainRelevanceScore: 96,
    domainAuthorityScore: 89,
    isRadarEmerging: true,
    scoutingNotes: 'High-leverage scouting prospect. Exceptional 12.8% engagement ratio on master-class camera rigs. Top film academy students frequent comment threads.',
    verifiedExpertise: ['Anamorphic Cinematography', 'Arri Alexa Color Science', 'Gaffer Lighting Setups'],
    recentUploadCadence: '1.2 videos / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UCmY_w2D1qE3T8yFwz1b3dQQ',
    uploadsPlaylistId: 'UUmY_w2D1qE3T8yFwz1b3dQQ',
    title: 'Maya Lin - Acoustic Prodigy',
    handle: '@mayalinacoustic',
    avatar: '/src/assets/images/talent_scout_portrait_1791252101550.jpg',
    category: 'Music & Audio',
    subscriberCount: 62400,
    videoCount: 28,
    totalViews: 4120000,
    growthRateMonthly: 41.2,
    engagementRatio: 14.6,
    uploadConsistencyScore: 84,
    domainRelevanceScore: 99,
    domainAuthorityScore: 91,
    isRadarEmerging: true,
    scoutingNotes: 'URGENT TALENT RADAR ALERT: Self-written acoustic ballads with >14.6% organic engagement. 3 record label A&Rs already active in top comment chains.',
    verifiedExpertise: ['Acoustic Fingerstyle', 'Vocal Phrasing', 'Microphone Positioning', 'Songwriting Harmony'],
    recentUploadCadence: '1.0 video / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UCb29h2kPjU9bXvG1k6fB90A',
    uploadsPlaylistId: 'UUb29h2kPjU9bXvG1k6fB90A',
    title: 'Dr. Aris Thorne - Quantum Mechanics',
    handle: '@dr_thorne_physics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Science & Math',
    subscriberCount: 112000,
    videoCount: 64,
    totalViews: 5800000,
    growthRateMonthly: 19.5,
    engagementRatio: 11.2,
    uploadConsistencyScore: 91,
    domainRelevanceScore: 97,
    domainAuthorityScore: 93,
    isRadarEmerging: true,
    scoutingNotes: 'Deep explanatory power. Zero clickbait, high retention (>81%). Recognized by MIT & CERN researchers in comment replies.',
    verifiedExpertise: ['Quantum Decoherence', 'Qubit Topology', 'Condensed Matter Physics'],
    recentUploadCadence: '1.5 videos / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UCw1K9_X8sOqUuK27A9B3z11',
    uploadsPlaylistId: 'UUw1K9_X8sOqUuK27A9B3z11',
    title: 'NeoTrend Bot Network Alpha (Suspect)',
    handle: '@neotrend_viral_hub',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Tech & AI',
    subscriberCount: 420000,
    videoCount: 310,
    totalViews: 92000000,
    growthRateMonthly: 88.0,
    engagementRatio: 0.12,
    uploadConsistencyScore: 40,
    domainRelevanceScore: 22,
    domainAuthorityScore: 28,
    isRadarEmerging: false,
    scoutingNotes: 'FRAUD ALERT: Flagged by Bot-Cluster Algorithm. 92M views with only 0.12% engagement. Suspicious view bursts on foreign proxies.',
    verifiedExpertise: [],
    recentUploadCadence: '14.0 videos / week',
    fraudRisk: 'HIGH'
  },
  {
    id: 'UCz_B6d6X1p_eY8V4W9Q0k12',
    uploadsPlaylistId: 'UUz_B6d6X1p_eY8V4W9Q0k12',
    title: 'Kestrel Visuals - Virtual Production',
    handle: '@kestrel_vp',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Cinema & VFX',
    subscriberCount: 95400,
    videoCount: 51,
    totalViews: 4600000,
    growthRateMonthly: 33.1,
    engagementRatio: 10.9,
    uploadConsistencyScore: 89,
    domainRelevanceScore: 94,
    domainAuthorityScore: 90,
    isRadarEmerging: true,
    scoutingNotes: 'Top candidate for Hollywood VFX scouting. Unreal Engine 5.4 in-camera VFX tutorials with studio-grade color pipe.',
    verifiedExpertise: ['Unreal Engine 5 nDisplay', 'LED Wall Parallax', 'Mo-Sys StarTracker'],
    recentUploadCadence: '1.4 videos / week',
    fraudRisk: 'LOW'
  },
  {
    id: 'UC3vP4r7vE9uW1z5T8y0x999',
    uploadsPlaylistId: 'UU3vP4r7vE9uW1z5T8y0x999',
    title: 'Veritasium',
    handle: '@veritasium',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80',
    category: 'Science & Math',
    subscriberCount: 16500000,
    videoCount: 410,
    totalViews: 2450000000,
    growthRateMonthly: 2.8,
    engagementRatio: 6.2,
    uploadConsistencyScore: 94,
    domainRelevanceScore: 99,
    domainAuthorityScore: 98,
    isRadarEmerging: false,
    verifiedExpertise: ['Scientific Inquiry', 'Misconception Deconstruction', 'Experimental Physics'],
    recentUploadCadence: '0.8 videos / week',
    fraudRisk: 'LOW'
  }
];

export const VIDEOS_DATA: Video[] = [
  {
    id: 'v_quant_01',
    channelId: 'UCb29h2kPjU9bXvG1k6fB90A',
    channelTitle: 'Dr. Aris Thorne - Quantum Mechanics',
    title: 'The Real Geometry of Quantum Superposition (Mathematical Proof)',
    description: 'An unhurried, rigorous walkthrough of Hilbert space state vectors and why pop-science ball-spinning analogies fail completely.',
    publishedAt: '2026-03-12T14:00:00Z',
    duration: '26:14',
    viewCount: 184500,
    likeCount: 22100,
    commentCount: 2310,
    qualityScore: 96,
    retentionMarker: 82,
    discussionDepthScore: 94,
    sentimentExcitement: 91,
    sentimentPolarity: 88,
    category: 'Science & Math',
    tags: ['quantum mechanics', 'hilbert space', 'superposition', 'mathematical physics', 'wavefunction'],
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&h=225&q=80',
    isClickbaitSuspect: false,
    fraudFlag: 'ORGANIC'
  },
  {
    id: 'v_maya_01',
    channelId: 'UCmY_w2D1qE3T8yFwz1b3dQQ',
    channelTitle: 'Maya Lin - Acoustic Prodigy',
    title: 'Silverlight & Timber (Original Song - Live One-Take at Abbey Road Studio 3)',
    description: 'Recorded live with matched stereo pair of Neumann KM184s straight into a Neve 1073 preamp. No pitch correction, no punch-ins.',
    publishedAt: '2026-03-24T18:30:00Z',
    duration: '04:38',
    viewCount: 240000,
    likeCount: 38400,
    commentCount: 4120,
    qualityScore: 98,
    retentionMarker: 91,
    discussionDepthScore: 92,
    sentimentExcitement: 97,
    sentimentPolarity: 96,
    category: 'Music & Audio',
    tags: ['indie folk', 'fingerstyle guitar', 'abbey road', 'acoustic one take', 'emerging artist'],
    thumbnail: '/src/assets/images/talent_scout_portrait_1791252101550.jpg',
    isClickbaitSuspect: false,
    fraudFlag: 'ORGANIC'
  },
  {
    id: 'v_elena_01',
    channelId: 'UC7-E5xhZBkvW-8_TrvW47wA',
    channelTitle: 'Elena Vance - Cinematic Lighting',
    title: 'How I Lit a 35mm Feature Scene Using Only Negative Fill and 1 Source',
    description: 'A deep dive into sub-tractive lighting, bounce containment, and skin tone fidelity under tungsten balance.',
    publishedAt: '2026-03-18T16:00:00Z',
    duration: '19:45',
    viewCount: 142000,
    likeCount: 18900,
    commentCount: 1640,
    qualityScore: 94,
    retentionMarker: 78,
    discussionDepthScore: 89,
    sentimentExcitement: 90,
    sentimentPolarity: 92,
    category: 'Cinema & VFX',
    tags: ['cinematography', 'negative fill', '35mm film', 'gaffer techniques', 'lighting masterclass'],
    thumbnail: '/src/assets/images/trailer_cinematic_frame_1791252090198.jpg',
    isClickbaitSuspect: false,
    fraudFlag: 'ORGANIC'
  },
  {
    id: 'v_fraud_suspect_01',
    channelId: 'UCw1K9_X8sOqUuK27A9B3z11',
    channelTitle: 'NeoTrend Bot Network Alpha (Suspect)',
    title: 'NEW IPHONE 18 PRO ULTRA MAX UNBOXING & CRAZY FEATURE LEAK!! (OMG)',
    description: 'Watch until the end to see the mind blowing titanium foldable hologram screen reveal you will not believe!',
    publishedAt: '2026-04-01T09:00:00Z',
    duration: '08:02',
    viewCount: 680000,
    likeCount: 310,
    commentCount: 22,
    qualityScore: 18,
    retentionMarker: 14,
    discussionDepthScore: 8,
    sentimentExcitement: 30,
    sentimentPolarity: -42,
    category: 'Tech & AI',
    tags: ['iphone 18', 'unboxing', 'viral', 'leak', 'gadgets'],
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&h=225&q=80',
    isClickbaitSuspect: true,
    fraudFlag: 'BOT_FLAGGED'
  },
  {
    id: 'v_kestrel_01',
    channelId: 'UCz_B6d6X1p_eY8V4W9Q0k12',
    channelTitle: 'Kestrel Visuals - Virtual Production',
    title: 'Camera Tracking Latency Solved: Genlock & Timecode sync in Unreal 5.4',
    description: 'Eliminating frame drops between optical tracker genlock sync and real-time LED wall frustum rendering.',
    publishedAt: '2026-03-29T17:00:00Z',
    duration: '15:20',
    viewCount: 89000,
    likeCount: 11400,
    commentCount: 1020,
    qualityScore: 93,
    retentionMarker: 79,
    discussionDepthScore: 88,
    sentimentExcitement: 88,
    sentimentPolarity: 89,
    category: 'Cinema & VFX',
    tags: ['unreal engine 5', 'virtual production', 'genlock', 'vfx studio'],
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=225&q=80',
    isClickbaitSuspect: false,
    fraudFlag: 'ORGANIC'
  },
  {
    id: 'v_veritas_01',
    channelId: 'UC3vP4r7vE9uW1z5T8y0x999',
    channelTitle: 'Veritasium',
    title: 'Why The Speed of Light Can Never Be Measured In One Direction',
    description: 'Einstein’s synchronization convention and the fundamental limitation of one-way speed of light experiments.',
    publishedAt: '2026-02-10T15:00:00Z',
    duration: '17:15',
    viewCount: 12400000,
    likeCount: 680000,
    commentCount: 42000,
    qualityScore: 97,
    retentionMarker: 85,
    discussionDepthScore: 95,
    sentimentExcitement: 94,
    sentimentPolarity: 91,
    category: 'Science & Math',
    tags: ['physics', 'speed of light', 'relativity', 'einstein', 'veritasium'],
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=225&q=80',
    isClickbaitSuspect: false,
    fraudFlag: 'ORGANIC'
  }
];

export const TRAILERS_DATA: TrailerProject[] = [
  {
    id: 'tr_warner_dune3',
    title: 'DUNE: PART THREE - Messiah (Official Teaser Trailer)',
    entityType: 'Blockbuster Film Trailer',
    brandOrStudio: 'Warner Bros. Pictures / Legendary',
    videoId: 'dune_messiah_teaser_2026',
    youtubeUrl: 'https://youtube.com/watch?v=dune_messiah_2026',
    thumbnail: '/src/assets/images/trailer_cinematic_frame_1791252090198.jpg',
    releaseDate: '2026-03-15',
    views: 34800000,
    likes: 2150000,
    comments: 142000,
    excitementScore: 96,
    fatigueScore: 4,
    positiveRatio: 92,
    neutralRatio: 6,
    negativeRatio: 2,
    topPraises: [
      'Hans Zimmer revised choral orchestration at 1:44',
      'Paul Atreides visual transformation into the Prophet',
      'Zero Marvel-style bathos or comedic undercutting',
      'Cinematography matches Greig Fraser depth of field'
    ],
    topCritiques: [
      'Trailer reveals 1 major plot beat from the book',
      'Expected IMAX release date shifted by 3 weeks'
    ],
    sentimentVelocity: [
      { time: 'Hour 1', excitement: 98, fatigue: 2 },
      { time: 'Hour 6', excitement: 97, fatigue: 3 },
      { time: 'Day 1', excitement: 96, fatigue: 4 },
      { time: 'Day 3', excitement: 95, fatigue: 5 },
      { time: 'Day 7', excitement: 94, fatigue: 6 }
    ],
    marketTakeaway: 'Universal blockbuster anticipation. Comment NLP indicates 84% intent to purchase Day 1 IMAX 70mm tickets. Minimal franchise fatigue detected.'
  },
  {
    id: 'tr_apple_vision2',
    title: 'Apple Vision Pro 2 & Spatial Computing Architecture Teaser',
    entityType: 'Luxury / Tech Product Launch',
    brandOrStudio: 'Apple Inc.',
    videoId: 'apple_vision_pro_gen2',
    youtubeUrl: 'https://youtube.com/watch?v=apple_vision_2',
    thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&h=338&q=80',
    releaseDate: '2026-03-22',
    views: 18400000,
    likes: 720000,
    comments: 89000,
    excitementScore: 78,
    fatigueScore: 22,
    positiveRatio: 74,
    neutralRatio: 16,
    negativeRatio: 10,
    topPraises: [
      '40% weight reduction and magnesium alloy frame',
      'Seamless multi-display Mac virtual desktop 4K tether',
      'New haptic glove accessory integration'
    ],
    topCritiques: [
      'Price still hovering near enterprise tier ($2,999)',
      'External battery pack cable still present',
      'Lack of native AAA gaming ecosystem'
    ],
    sentimentVelocity: [
      { time: 'Hour 1', excitement: 86, fatigue: 14 },
      { time: 'Hour 6', excitement: 82, fatigue: 18 },
      { time: 'Day 1', excitement: 79, fatigue: 21 },
      { time: 'Day 3', excitement: 78, fatigue: 22 },
      { time: 'Day 7', excitement: 76, fatigue: 24 }
    ],
    marketTakeaway: 'High interest among enterprise creative pros and software architects; consumer skepticism remains centered around weight and entry price point.'
  },
  {
    id: 'tr_prada_fw26',
    title: 'PRADA Fall/Winter 2026 Film by Nicolas Winding Refn',
    entityType: 'Luxury / Tech Product Launch',
    brandOrStudio: 'PRADA Milano',
    videoId: 'prada_fw26_refn',
    youtubeUrl: 'https://youtube.com/watch?v=prada_fw26_film',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=338&q=80',
    releaseDate: '2026-02-28',
    views: 6200000,
    likes: 410000,
    comments: 24000,
    excitementScore: 91,
    fatigueScore: 9,
    positiveRatio: 88,
    neutralRatio: 8,
    negativeRatio: 4,
    topPraises: [
      'Refn signature neon color palette and synth pulse',
      'Re-nylon tailoring structural silhouettes',
      'Artistic integrity vs commercial advert'
    ],
    topCritiques: [
      'Avant-garde pacing may obscure individual accessories'
    ],
    sentimentVelocity: [
      { time: 'Hour 1', excitement: 93, fatigue: 7 },
      { time: 'Hour 6', excitement: 92, fatigue: 8 },
      { time: 'Day 1', excitement: 91, fatigue: 9 },
      { time: 'Day 3', excitement: 90, fatigue: 10 },
      { time: 'Day 7', excitement: 91, fatigue: 9 }
    ],
    marketTakeaway: 'Exceptional brand equity elevation. Over 91% positive luxury brand affinity; heavy sharing among fashion directors and independent cinematographers.'
  }
];

export const COLLATED_COMMENTS_SAMPLE: CommentItem[] = [
  {
    id: 'c1',
    author: 'CinematographerKai',
    text: 'The negative fill decision at 08:42 completely changed the dimensionality of the actor’s jawline. Most creators just blast a 300W key light and blow out the highlights.',
    likeCount: 842,
    publishedAt: '2 days ago',
    sentiment: 'positive',
    category: 'praise',
    theme: 'Lighting Technique'
  },
  {
    id: 'c2',
    author: 'SoundEngineerUK',
    text: 'What preamps were used on the acoustic guitar at 02:15? The transient response on the finger-picking feels remarkably clean without any digital harshness.',
    likeCount: 521,
    publishedAt: '3 days ago',
    sentiment: 'positive',
    category: 'feature_request',
    theme: 'Audio Hardware'
  },
  {
    id: 'c3',
    author: 'FilmStudent_99',
    text: 'Could you do a follow up video breaking down the exact color transform LUT from LogC3 to Rec709 you used in the wide outdoor exterior?',
    likeCount: 310,
    publishedAt: '1 day ago',
    sentiment: 'neutral',
    category: 'feature_request',
    theme: 'Color Grading Request'
  },
  {
    id: 'c4',
    author: 'AudioCritic2026',
    text: 'The vocal mix in the second verse sits slightly too low behind the 120Hz bass frequency in car speakers. You might want a 1.5dB dip in the bass around there.',
    likeCount: 142,
    publishedAt: '4 days ago',
    sentiment: 'skeptical',
    category: 'criticism',
    theme: 'Mix Balance'
  },
  {
    id: 'c5',
    author: 'StudioExecutive_AAR',
    text: 'Maya’s vocal tone at 03:20 is pure star power. Sent this straight to our head of A&R in London. Absolutely breathtaking phrasing.',
    likeCount: 1240,
    publishedAt: '1 day ago',
    sentiment: 'positive',
    category: 'praise',
    theme: 'Talent Discovery'
  },
  {
    id: 'c6',
    author: 'PhysicsNerd_Beta',
    text: 'I spent 4 years in undergrad physics and this 26-minute video explained wave function collapse geometry clearer than my professor ever did.',
    likeCount: 940,
    publishedAt: '5 days ago',
    sentiment: 'positive',
    category: 'praise',
    theme: 'Educational Rigor'
  },
  {
    id: 'c7',
    author: 'User_9088219412',
    text: 'Great video check my channel for free gift cards fast link bio',
    likeCount: 0,
    publishedAt: '12 mins ago',
    sentiment: 'neutral',
    category: 'spam_flagged',
    theme: 'Bot Spam'
  },
  {
    id: 'c8',
    author: 'HardwareGuy',
    text: 'Disappointed there was no direct latency comparison against the Gen 1 headset when running dual 6K monitors. That was the main question everyone asked.',
    likeCount: 180,
    publishedAt: '2 days ago',
    sentiment: 'negative',
    category: 'criticism',
    theme: 'Benchmark Omission'
  }
];

export const FRAUD_AUDIT_SAMPLES: Record<string, FraudAnalysisResult> = {
  'v_fraud_suspect_01': {
    videoId: 'v_fraud_suspect_01',
    videoTitle: 'NEW IPHONE 18 PRO ULTRA MAX UNBOXING & CRAZY FEATURE LEAK!! (OMG)',
    channelTitle: 'NeoTrend Bot Network Alpha (Suspect)',
    viewCount: 680000,
    likeCount: 310,
    commentCount: 22,
    viewToInteractionRatio: 0.048, // 0.048% is extremely low (normal is 2-8%)
    commentEntropy: 0.18, // 0.18 is very low entropy (repeating identical text)
    anomalyVerdict: 'CRITICAL_BOT_FARM',
    anomalyScore: 94,
    flags: [
      {
        rule: 'Severe View-to-Interaction Deficit',
        description: '680,000 views recorded with only 310 likes (0.045% ratio). Organic YouTube benchmark is 3.5% - 7.0%. Statistical probability of organic distribution: < 0.0001%.',
        severity: 'high'
      },
      {
        rule: 'Comment Entropy Collapse',
        description: '78% of comments share identical 3-word templates ("nice video bro", "great video link") posted within a single 4-minute cluster window.',
        severity: 'high'
      },
      {
        rule: 'Retention Cliff Anomaly',
        description: 'Average view duration is 6.2 seconds on an 8-minute upload (1.2% retention), characteristic of datacenter headless browser traffic.',
        severity: 'high'
      }
    ],
    recommendation: 'DO NOT PARTNER OR SPONSOR. Channel exhibits commercial view-inflation bots. Ad budgets deployed here will yield zero authentic human impressions.'
  },
  'v_quant_01': {
    videoId: 'v_quant_01',
    videoTitle: 'The Real Geometry of Quantum Superposition (Mathematical Proof)',
    channelTitle: 'Dr. Aris Thorne - Quantum Mechanics',
    viewCount: 184500,
    likeCount: 22100,
    commentCount: 2310,
    viewToInteractionRatio: 13.23, // 13.2%
    commentEntropy: 0.94, // High vocabulary diversity
    anomalyVerdict: 'VERIFIED_ORGANIC',
    anomalyScore: 4,
    flags: [
      {
        rule: 'Natural Engagement Distribution',
        description: 'High engagement ratio (13.2%) with linear growth curve matching organic subscriber notification delivery.',
        severity: 'low'
      },
      {
        rule: 'Deep Discussion Entropy',
        description: 'Average comment word length is 38.4 words with mathematical notation and verified academic citations.',
        severity: 'low'
      }
    ],
    recommendation: 'EXCEPTIONAL CREDIBILITY. High-value sponsorship target and educational authority. Zero synthetic view patterns detected.'
  }
};

export const CREATOR_PLAYBOOK_INSIGHTS = {
  nicheGaps: [
    {
      topic: 'In-Depth Camera Rigging for Solo Documentarians',
      niche: 'Cinema & VFX',
      searchDemandIndex: 88,
      competitionSupplyIndex: 24,
      gapScore: 92,
      recommendation: 'Extreme gap. Viewers actively searching for sub-$3,000 audio/camera rigging for solo operators with under 5 competing quality videos.'
    },
    {
      topic: 'Local LLM Inference Quantization on Consumer Hardware (M4 & RTX 5080)',
      niche: 'Tech & AI',
      searchDemandIndex: 95,
      competitionSupplyIndex: 32,
      gapScore: 89,
      recommendation: 'High velocity topic. Search volume up +210% over 60 days with high viewer dissatisfaction in superficial benchmark reviews.'
    },
    {
      topic: 'Practical Acoustic Room Treatment for Bedroom Vocalists',
      niche: 'Music & Audio',
      searchDemandIndex: 82,
      competitionSupplyIndex: 28,
      gapScore: 85,
      recommendation: 'Steady year-round search with evergreen watch-time. Viewers want empirical decibel comparisons of DIY rockwool vs foam.'
    }
  ],
  titlePatterns: [
    {
      archetype: 'Direct Problem Statement + Hard Metric',
      example: 'How We Cut Audio Latency from 48ms to 2.1ms',
      avgClickThroughRateProxy: '8.4%',
      retentionScore: 86,
      verdict: 'Highest Long-Term Evergreen Retention'
    },
    {
      archetype: 'Open Intellectual Paradox',
      example: 'Why The Speed of Light Can Never Be Measured One-Way',
      avgClickThroughRateProxy: '9.8%',
      retentionScore: 89,
      verdict: 'Highest Viral Discovery + Discussion Depth'
    },
    {
      archetype: 'Superlative Clickbait (All-Caps / OMG)',
      example: 'THIS NEW TECH WILL CHANGE EVERYTHING FOREVER!!',
      avgClickThroughRateProxy: '4.2%',
      retentionScore: 21,
      verdict: 'High Initial Bounce, Severe Algorithmic Penalty'
    }
  ],
  optimalTimingHeatmap: [
    { day: 'Monday', bestUtcHour: 15, avgViewerIndex: 78 },
    { day: 'Tuesday', bestUtcHour: 14, avgViewerIndex: 84 },
    { day: 'Wednesday', bestUtcHour: 16, avgViewerIndex: 89 },
    { day: 'Thursday', bestUtcHour: 15, avgViewerIndex: 94 },
    { day: 'Friday', bestUtcHour: 13, avgViewerIndex: 91 },
    { day: 'Saturday', bestUtcHour: 11, avgViewerIndex: 82 },
    { day: 'Sunday', bestUtcHour: 12, avgViewerIndex: 88 }
  ]
};

export const SUPPORT_TICKETS_DATA: SupportTicket[] = [
  {
    id: 'TCK-8812',
    subject: 'Warner Bros. Entertainment - Custom Trailer Tracking Webhook integration',
    tier: 'Studio VIP',
    status: 'In Progress',
    priority: 'Urgent',
    createdAt: '2026-04-03 10:14 UTC',
    assignedEngineer: 'Marcus Vance (Principal Data Architect)',
    slaTargetMinutes: 15
  },
  {
    id: 'TCK-8794',
    subject: 'Columbia Records A&R - Automated Talent Radar Alerts for 30-day velocity >35%',
    tier: 'Enterprise',
    status: 'Resolved',
    priority: 'High',
    createdAt: '2026-04-02 16:40 UTC',
    assignedEngineer: 'Dr. Sarah Chen (NLP Specialist)',
    slaTargetMinutes: 30
  },
  {
    id: 'TCK-8740',
    subject: 'Daily YouTube Quota Pool sync for 100k channel monitor cluster',
    tier: 'Agency',
    status: 'Resolved',
    priority: 'Normal',
    createdAt: '2026-04-01 09:22 UTC',
    assignedEngineer: 'Alex Ross (DevOps)',
    slaTargetMinutes: 60
  }
];

export const ADVISORY_REPORTS_DATA: AdvisoryReportRequest[] = [
  {
    id: 'ADV-2026-001',
    clientName: 'Warner Bros. Discovery - Global Theatrical Marketing',
    industry: 'Film & Entertainment',
    targetQueryOrTopic: 'DUNE: PART THREE - Pre-Release Audience Sentiment & IMAX Demand Velocity',
    scope: 'Trailer Sentiment Forensics',
    deliveryFormat: 'Executive PDF & Data Export',
    status: 'Delivered',
    summaryFindings: 'Overall 92% positive reception across 34.8M views. Hans Zimmer score cue drove 31% of positive comment mentions. Projected Day-1 ticket demand exceeds Part Two benchmark by +18%.'
  },
  {
    id: 'ADV-2026-002',
    clientName: 'Universal Music Group - Digital Talent Scout Division',
    industry: 'Record Label & Music',
    targetQueryOrTopic: 'Emerging Independent Singer-Songwriters Under 100k Subs with >10% Organic Engagement',
    scope: 'Talent Scouting Dossier',
    deliveryFormat: 'Executive PDF & Data Export',
    status: 'Delivered',
    summaryFindings: 'Identified Maya Lin (@mayalinacoustic) and 4 complementary acoustic creators. Growth velocity of 41.2% annualized with zero bot anomalies. Early contract outreach recommended.'
  },
  {
    id: 'ADV-2026-003',
    clientName: 'Kering Group (Saint Laurent / Balenciaga / Gucci)',
    industry: 'Luxury & Fashion',
    targetQueryOrTopic: 'Runway Teaser Engagement vs Audience Fatigue Benchmarks across European Fashion Week',
    scope: 'Competitor Dominance Analysis',
    deliveryFormat: 'Direct Analyst Briefing',
    status: 'Generating',
    summaryFindings: 'Cross-analyzing 18 luxury brand runway shorts. Cinematic narrative format (e.g. Prada Refn film) yields 3.8x longer viewer dwell time than conventional catwalk cuts.'
  }
];
