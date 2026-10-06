export interface PulseResponse {
  pulse: 'ACTIVE_ONLINE';
  timestamp: string;
  memoryUsageMb: number;
  environment: string;
  keySecurity: {
    keyInjected: boolean;
    headerMode: 'X-goog-api-key (URL leak-proof)';
  };
  supportedEndpoints: {
    videoStats: {
      urlPattern: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID';
      quotaCost: '1 unit';
      handler: '/api/video or /api/youtube?action=video';
    };
    channelNumbers: {
      urlPattern: 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE';
      quotaCost: '1 unit';
      handler: '/api/channel or /api/youtube?action=channel';
    };
    channelUploadsZeroSearchQuota: {
      urlPattern: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50';
      quotaCost: '1 unit/page';
      handler: '/api/uploads or /api/youtube?action=uploads';
      note: 'Transforms UC... into UU... uploads playlist to bypass 100-unit search quota';
    };
    videoComments: {
      urlPattern: 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100';
      quotaCost: '1 unit/page';
      handler: '/api/comments or /api/youtube?action=comments';
    };
    preciousSearch: {
      urlPattern: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video';
      quotaCost: '100 calls/day/project standard bucket';
      handler: '/api/search or /api/youtube?action=search';
    };
  };
}

/**
 * Serverless /api/pulse endpoint
 * Compatible with Vercel, Express, and Node HTTP handlers.
 */
export default async function handler(req: any, res: any) {
  const isKeyConfigured = Boolean(process.env.YOUTUBE_API_KEY || req.headers?.['x-custom-youtube-key']);
  const mem = process.memoryUsage ? process.memoryUsage() : { heapUsed: 0 };

  const payload: PulseResponse = {
    pulse: 'ACTIVE_ONLINE',
    timestamp: new Date().toISOString(),
    memoryUsageMb: Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100,
    environment: process.env.NODE_ENV || 'production',
    keySecurity: {
      keyInjected: isKeyConfigured,
      headerMode: 'X-goog-api-key (URL leak-proof)'
    },
    supportedEndpoints: {
      videoStats: {
        urlPattern: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID',
        quotaCost: '1 unit',
        handler: '/api/video or /api/youtube?action=video'
      },
      channelNumbers: {
        urlPattern: 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE',
        quotaCost: '1 unit',
        handler: '/api/channel or /api/youtube?action=channel'
      },
      channelUploadsZeroSearchQuota: {
        urlPattern: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50',
        quotaCost: '1 unit/page',
        handler: '/api/uploads or /api/youtube?action=uploads',
        note: 'Transforms UC... into UU... uploads playlist to bypass 100-unit search quota'
      },
      videoComments: {
        urlPattern: 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100',
        quotaCost: '1 unit/page',
        handler: '/api/comments or /api/youtube?action=comments'
      },
      preciousSearch: {
        urlPattern: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video',
        quotaCost: '100 calls/day/project standard bucket',
        handler: '/api/search or /api/youtube?action=search'
      }
    }
  };

  if (res && typeof res.status === 'function') {
    return res.status(200).json(payload);
  } else if (res && typeof res.writeHead === 'function') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
    return;
  }

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
