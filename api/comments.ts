import { resolveApiKey, fetchVideoComments } from './youtube';

/**
 * Serverless /api/comments
 * Target: https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100 (1 unit/page)
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const videoId = query.videoId || query.id || '';

  if (!videoId) {
    const errorBody = {
      error: 'Missing videoId',
      message: 'Please provide ?videoId=VIDEO_ID'
    };
    if (res?.status) return res.status(400).json(errorBody);
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const maxResults = Number(query.maxResults) || 100;
  const result = await fetchVideoComments(videoId, apiKey, maxResults);

  if (res?.status) {
    return res.status(result.status).json(result.data);
  }
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
