import type { Handler } from '@netlify/functions';
import prisma from './_prisma';

export const handler: Handler = async (event) => {
  try {
    const q = event.queryStringParameters?.q;
    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { artist: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined;
    const songs = await (prisma as any).songs.findMany({ where });
    return { statusCode: 200, body: JSON.stringify(songs) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch songs' }) };
  }
};
