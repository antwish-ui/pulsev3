import { resolveApiKey, fetchChannelNumbers } from './youtube';

/**
 * Serverless /api/channel
 * Target: https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE (1 unit)
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const handle = query.forHandle || query.handle || '';

  if (!handle) {
    const errorBody = {
      error: 'Missing handle',
      message: 'Please provide ?forHandle=SOME_HANDLE or ?handle=SOME_HANDLE'
    };
    if (res?.status) return res.status(400).json(errorBody);
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const result = await fetchChannelNumbers(handle, apiKey);

  if (res?.status) {
    return res.status(result.status).json(result.data);
  }
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
