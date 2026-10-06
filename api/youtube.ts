/**
 * Serverless YouTube Data API v3 Connection Module
 *
 * Implements the 5 core endpoints requested:
 * 1. Video stats: https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID (1 unit)
 * 2. Channel numbers: https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE (1 unit)
 * 3. Channel uploads without burning search quota: https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50 (1 unit/page)
 * 4. Comments on video: https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100 (1 unit/page)
 * 5. Search: https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video (100 calls/day/project)
 *
 * Security Invariant:
 * Strictly injects YouTube API key via headers (X-goog-api-key).
 * NEVER appends key to the query string URL to prevent logging leakage.
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Resolves the API key dynamically from environment variable or custom request header.
 * NO HARDCODED KEYS.
 */
export function resolveApiKey(req: any): string {
  const envKey = process.env.YOUTUBE_API_KEY || '';
  if (envKey.trim()) return envKey.trim();

  // Allow optional per-request header injection from client session
  const headerKey = 
    req.headers?.['x-custom-youtube-key'] ||
    req.headers?.['x-goog-api-key'] ||
    '';

  return String(headerKey).trim();
}

/**
 * Helper to execute upstream Google API request using X-goog-api-key header
 */
export async function executeYouTubeRequest(endpointPath: string, apiKey: string) {
  if (!apiKey) {
    return {
      status: 401,
      data: {
        error: 'Missing YOUTUBE_API_KEY',
        message: 'No YouTube Data API v3 key configured. Set YOUTUBE_API_KEY in environment variables or pass X-Custom-YouTube-Key header.',
        securityPolicy: 'Key is passed strictly via X-goog-api-key header to prevent URL log exposure.'
      }
    };
  }

  const url = `${YOUTUBE_API_BASE}/${endpointPath}`;

  try {
    const upstreamRes = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // In your /api function, prefer the header form for the key:
        // X-goog-api-key: <YOUTUBE_API_KEY> (URLs leak into logs; headers do not)
        'X-goog-api-key': apiKey
      }
    });

    const data = await upstreamRes.json();
    return {
      status: upstreamRes.status,
      data
    };
  } catch (err: any) {
    return {
      status: 502,
      data: {
        error: 'Bad Gateway',
        message: err?.message || 'Failed connecting to upstream YouTube Data API v3'
      }
    };
  }
}

/**
 * 1. Stats for one video (1 unit)
 * https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID
 */
export async function fetchVideoStats(videoId: string, apiKey: string) {
  const cleanId = encodeURIComponent(videoId.trim());
  return executeYouTubeRequest(`videos?part=snippet,statistics&id=${cleanId}`, apiKey);
}

/**
 * 2. A channel's numbers (1 unit)
 * https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE
 */
export async function fetchChannelNumbers(handle: string, apiKey: string) {
  let cleanHandle = handle.trim();
  if (cleanHandle.startsWith('@')) {
    cleanHandle = cleanHandle.substring(1);
  }
  return executeYouTubeRequest(`channels?part=snippet,statistics&forHandle=${encodeURIComponent(cleanHandle)}`, apiKey);
}

/**
 * 3. A channel's uploads WITHOUT burning search quota (1 unit/page)
 * https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50
 */
export async function fetchChannelUploads(playlistOrChannelId: string, apiKey: string, maxResults = 50) {
  let playlistId = playlistOrChannelId.trim();
  // Automatic helper: if channel ID starting with UC is passed, transform to UU uploads playlist
  if (playlistId.startsWith('UC')) {
    playlistId = 'UU' + playlistId.substring(2);
  }
  const limit = Math.min(50, Math.max(1, maxResults));
  return executeYouTubeRequest(`playlistItems?part=snippet&playlistId=${encodeURIComponent(playlistId)}&maxResults=${limit}`, apiKey);
}

/**
 * 4. Comments on a video (1 unit/page)
 * https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100
 */
export async function fetchVideoComments(videoId: string, apiKey: string, maxResults = 100) {
  const cleanId = encodeURIComponent(videoId.trim());
  const limit = Math.min(100, Math.max(1, maxResults));
  return executeYouTubeRequest(`commentThreads?part=snippet&videoId=${cleanId}&maxResults=${limit}`, apiKey);
}

/**
 * 5. Search, the precious one (its own bucket: 100 calls/day/project)
 * https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video
 */
export async function searchVideos(query: string, apiKey: string) {
  const cleanQuery = encodeURIComponent(query.trim());
  return executeYouTubeRequest(`search?part=snippet&q=${cleanQuery}&type=video`, apiKey);
}

/**
 * Primary Serverless Route Handler
 * Dispatches based on ?action= (video | channel | uploads | comments | search)
 */
export default async function handler(req: any, res: any) {
  const apiKey = resolveApiKey(req);
  const query = req.query || {};
  const action = query.action || query.endpoint;

  let result: { status: number; data: any };

  switch (action) {
    case 'video':
      result = await fetchVideoStats(query.id || query.videoId || '', apiKey);
      break;

    case 'channel':
      result = await fetchChannelNumbers(query.forHandle || query.handle || '', apiKey);
      break;

    case 'uploads':
      result = await fetchChannelUploads(
        query.playlistId || query.channelId || '',
        apiKey,
        Number(query.maxResults) || 50
      );
      break;

    case 'comments':
      result = await fetchVideoComments(
        query.videoId || query.id || '',
        apiKey,
        Number(query.maxResults) || 100
      );
      break;

    case 'search':
      result = await searchVideos(query.q || query.query || '', apiKey);
      break;

    default:
      result = {
        status: 400,
        data: {
          error: 'Bad Request',
          message: 'Specify ?action= (video | channel | uploads | comments | search)',
          usage: {
            video: '/api/youtube?action=video&id=VIDEO_ID',
            channel: '/api/youtube?action=channel&forHandle=SOME_HANDLE',
            uploads: '/api/youtube?action=uploads&playlistId=PLAYLIST_ID',
            comments: '/api/youtube?action=comments&videoId=VIDEO_ID',
            search: '/api/youtube?action=search&q=QUERY'
          },
          security: 'Keys are transmitted via X-goog-api-key header.'
        }
      };
  }

  if (res && typeof res.status === 'function') {
    return res.status(result.status).json(result.data);
  } else if (res && typeof res.writeHead === 'function') {
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.data));
    return;
  }

  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
