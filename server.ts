import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import pulseHandler from './api/pulse.ts';
import youtubeHandler from './api/youtube.ts';
import videoHandler from './api/video.ts';
import channelHandler from './api/channel.ts';
import uploadsHandler from './api/uploads.ts';
import commentsHandler from './api/comments.ts';
import searchHandler from './api/search.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Serverless /api route wrappers
app.get('/api/health', (req, res) => healthHandler(req, res));
app.get('/api/pulse', (req, res) => pulseHandler(req, res));
app.all('/api/youtube', (req, res) => youtubeHandler(req, res));
app.all('/api/video', (req, res) => videoHandler(req, res));
app.all('/api/channel', (req, res) => channelHandler(req, res));
app.all('/api/uploads', (req, res) => uploadsHandler(req, res));
app.all('/api/comments', (req, res) => commentsHandler(req, res));
app.all('/api/search', (req, res) => searchHandler(req, res));

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`PulseV3 server running on http://0.0.0.0:${port}`);
    console.log(`Serverless endpoints mounted at /api/*`);
  });
}

startServer();
