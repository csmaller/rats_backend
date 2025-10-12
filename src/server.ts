import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { fetch } from 'undici';
import fs from 'fs';
import path from 'path';

// Polyfill fetch for Node < 18 so Prisma's runtime can make HTTP requests
if (typeof (globalThis as any).fetch !== 'function') {
  (globalThis as any).fetch = fetch;
}

const app = express();
app.use(cors({
      origin: 'https://ratsmusic.netlify.app' // Allow requests from your frontend's origin
    }));
app.use(express.json());

const prisma = new PrismaClient();

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

app.get('/songs', async (req: Request, res: Response) => {
  const q = req.query.q ? String(req.query.q) : undefined;
  try {
    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { artist: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined;
    const songs = await (prisma as any).songs.findMany({ where });
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

app.get('/songs/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const song = await (prisma as any).songs.findUnique({ where: { id } });
    if (!song) return res.status(404).json({ error: 'Not found' });
    res.json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch song' });
  }
});

// Seed endpoint - idempotent (skip duplicates)
app.post('/songs/seed', async (_req: Request, res: Response) => {
  try {
    const songsPath = path.resolve(__dirname, 'songs.json');
    const raw = fs.readFileSync(songsPath, 'utf8');
    const parsed = JSON.parse(raw);
    const songs = Array.isArray(parsed.songs) ? parsed.songs : [];
    const toInsert = songs.map((s: any) => ({ title: s.title, artist: s.artist }));
    const result = await (prisma as any).songs.createMany({ data: toInsert, skipDuplicates: true });
    res.json({ inserted: result.count ?? toInsert.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

// Add songs via request body. Accepts either an array of song objects or { songs: [...] }
// Each song should have { title: string, artist: string }
app.post('/songs', async (req: Request, res: Response) => {
  const payload = req.body;
  const incoming = Array.isArray(payload) ? payload : payload?.songs;

  if (!Array.isArray(incoming)) {
    return res.status(400).json({ error: 'Expected request body to be an array of songs or { songs: [...] }' });
  }

  const toInsert = incoming
    .map((s: any) => ({ title: String(s?.title ?? '').trim(), artist: String(s?.artist ?? '').trim() }))
    .filter((s: any) => s.title.length > 0 && s.artist.length > 0);

  if (toInsert.length === 0) {
    return res.status(400).json({ error: 'No valid songs provided (each item needs title and artist).' });
  }

  try {
    const result = await (prisma as any).songs.createMany({ data: toInsert, skipDuplicates: true });
    return res.json({ inserted: result.count ?? toInsert.length });
  } catch (err) {
    console.error('Failed to insert songs via API:', err);
    return res.status(500).json({ error: 'Failed to insert songs.' });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
