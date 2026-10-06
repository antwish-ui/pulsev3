import { resolveApiKey, fetchVideoStats } from './youtube';

/**
 * Serverless /api/video
 * Target: https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID (1 unit)
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const videoId = query.id || query.videoId || '';

  if (!videoId) {
    const errorBody = {
      error: 'Missing videoId',
      message: 'Please provide ?id=VIDEO_ID or ?videoId=VIDEO_ID'
    };
    if (res?.status) return res.status(400).json(errorBody);
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const result = await fetchVideoStats(videoId, apiKey);

  if (res?.status) {
    return res.status(result.status).json(result.data);
  }
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
