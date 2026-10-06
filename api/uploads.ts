import { resolveApiKey, fetchChannelUploads } from './youtube';

/**
 * Serverless /api/uploads
 * Target: https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50
 * Quota Cost: 1 unit/page (bypasses 100-unit search.list calls)
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const playlistOrChannelId = query.playlistId || query.channelId || query.id || '';

  if (!playlistOrChannelId) {
    const errorBody = {
      error: 'Missing playlistId or channelId',
      message: 'Please provide ?playlistId=PLAYLIST_ID (UU...) or ?channelId=CHANNEL_ID (UC... will be auto-translated to UU...)',
      quotaNote: 'Consumes only 1 quota unit instead of 100 units from search.list'
    };
    if (res?.status) return res.status(400).json(errorBody);
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const maxResults = Number(query.maxResults) || 50;
  const result = await fetchChannelUploads(playlistOrChannelId, apiKey, maxResults);

  if (res?.status) {
    return res.status(result.status).json(result.data);
  }
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
