import type { IncomingMessage, ServerResponse } from 'http';

export interface HealthResponse {
  status: 'healthy' | 'degraded';
  service: string;
  uptimeSeconds: number;
  timestamp: string;
  version: string;
  youtubeApiStatus: {
    configured: boolean;
    headerAuth: 'X-goog-api-key';
  };
}

/**
 * Serverless /api/health endpoint
 * Compatible with Vercel, Express, and Node HTTP handlers.
 */
export default async function handler(req: any, res: any) {
  const isKeyConfigured = Boolean(process.env.YOUTUBE_API_KEY || req.headers?.['x-custom-youtube-key']);

  const responsePayload: HealthResponse = {
    status: 'healthy',
    service: 'pulsev3-youtube-intelligence',
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    youtubeApiStatus: {
      configured: isKeyConfigured,
      headerAuth: 'X-goog-api-key'
    }
  };

  if (res && typeof res.status === 'function') {
    return res.status(200).json(responsePayload);
  } else if (res && typeof res.writeHead === 'function') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responsePayload));
    return;
  }

  // Web Standard Response fallback (e.g. Next.js / Edge Runtime)
  return new Response(JSON.stringify(responsePayload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
