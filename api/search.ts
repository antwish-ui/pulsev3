import { resolveApiKey, searchVideos } from './youtube';

/**
 * Serverless /api/search
 * Target: https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video
 * Quota Cost: 100 quota units / request
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const q = query.q || query.query || '';

  if (!q) {
    const errorBody = {
      error: 'Missing query',
      message: 'Please provide ?q=QUERY or ?query=QUERY',
      quotaNote: 'Warning: search.list costs 100 quota units per call. Consider /api/uploads for zero-search-quota channel indexing.'
    };
    if (res?.status) return res.status(400).json(errorBody);
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const result = await searchVideos(q, apiKey);

  if (res?.status) {
    return res.status(result.status).json(result.data);
  }
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
