export interface Channel {
  id: string; // e.g., UCX6OQ3DkcsbYNE6H8uQQuVA
  uploadsPlaylistId: string; // e.g., UUX6OQ3DkcsbYNE6H8uQQuVA
  title: string;
  handle: string;
  avatar: string;
  category: 'Tech & AI' | 'Cinema & VFX' | 'Music & Audio' | 'Science & Math' | 'Investigative Journalism' | 'Art & Design';
  subscriberCount: number;
  videoCount: number;
  totalViews: number;
  growthRateMonthly: number; // e.g. +14.2%
  engagementRatio: number; // (likes + comments) / views * 100
  uploadConsistencyScore: number; // 0-100
  domainRelevanceScore: number; // 0-100
  domainAuthorityScore: number; // custom weighted formula 0-100
  isRadarEmerging: boolean; // Flag for emerging talent scouting (<150k subs, >8% engagement)
  scoutingNotes?: string;
  verifiedExpertise: string[];
  recentUploadCadence: string; // e.g. "2.4 videos / week"
  fraudRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Video {
  id: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string; // e.g. "18:42"
  viewCount: number;
  likeCount: number;
  commentCount: number;
  qualityScore: number; // 0-100 quality over popularity metric
  retentionMarker: number; // percentage estimated e.g. 74%
  discussionDepthScore: number; // 0-100 (avg comment length & replies)
  sentimentExcitement: number; // 0-100
  sentimentPolarity: number; // -100 to +100
  category: string;
  tags: string[];
  thumbnail: string;
  isClickbaitSuspect: boolean;
  fraudFlag: 'ORGANIC' | 'SUSPICIOUS' | 'BOT_FLAGGED';
}

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  likeCount: number;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'skeptical';
  category: 'praise' | 'criticism' | 'feature_request' | 'discussion' | 'spam_flagged';
  theme: string;
}

export interface TrailerProject {
  id: string;
  title: string;
  entityType: 'Blockbuster Film Trailer' | 'Luxury / Tech Product Launch' | 'Record Label Single Teaser';
  brandOrStudio: string;
  videoId: string;
  youtubeUrl: string;
  thumbnail: string;
  releaseDate: string;
  views: number;
  likes: number;
  comments: number;
  excitementScore: number; // 0-100
  fatigueScore: number; // 0-100
  positiveRatio: number; // %
  neutralRatio: number; // %
  negativeRatio: number; // %
  topPraises: string[];
  topCritiques: string[];
  sentimentVelocity: { time: string; excitement: number; fatigue: number }[];
  marketTakeaway: string;
}

export interface FraudAnalysisResult {
  videoId: string;
  videoTitle: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  viewToInteractionRatio: number; // normal is 2-8%
  commentEntropy: number; // bot detection: repeated comments
  anomalyVerdict: 'VERIFIED_ORGANIC' | 'ELEVATED_ANOMALY' | 'CRITICAL_BOT_FARM';
  anomalyScore: number; // 0-100 (100 = blatant fraud)
  flags: {
    rule: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  recommendation: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  tier: 'Enterprise' | 'Agency' | 'Studio VIP';
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Urgent' | 'High' | 'Normal';
  createdAt: string;
  assignedEngineer: string;
  slaTargetMinutes: number;
}

export interface AdvisoryReportRequest {
  id: string;
  clientName: string;
  industry: 'Film & Entertainment' | 'Record Label & Music' | 'Consumer Tech & Hardware' | 'Luxury & Fashion';
  targetQueryOrTopic: string;
  scope: 'Talent Scouting Dossier' | 'Trailer Sentiment Forensics' | 'Competitor Dominance Analysis' | 'Full Market Intelligence';
  deliveryFormat: 'Executive PDF & Data Export' | 'Direct Analyst Briefing' | 'Live API Webhook Feed';
  status: 'Delivered' | 'Generating' | 'Under Review';
  summaryFindings: string;
}
