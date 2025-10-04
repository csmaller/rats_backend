import type { Handler } from '@netlify/functions';
import prisma from './_prisma';

export const handler: Handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || 'null');
    const incoming = Array.isArray(payload) ? payload : payload?.songs;
    if (!Array.isArray(incoming)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Expected array or { songs: [...] }' }) };
    }
    const toInsert = incoming
      .map((s: any) => ({ title: String(s?.title ?? '').trim(), artist: String(s?.artist ?? '').trim() }))
      .filter((s: any) => s.title.length > 0 && s.artist.length > 0);
    if (toInsert.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'No valid songs provided' }) };
    const result = await (prisma as any).songs.createMany({ data: toInsert, skipDuplicates: true });
    return { statusCode: 200, body: JSON.stringify({ inserted: result.count ?? toInsert.length }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to insert songs' }) };
  }
};
