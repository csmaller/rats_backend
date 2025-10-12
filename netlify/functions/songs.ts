import type { Handler } from '@netlify/functions';
import prisma from './_prisma';

export const handler: Handler = async (event) => {
  try {
    const q = event.queryStringParameters?.q;
    console.log('Received query:', q);
    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { artist: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined;
    console.log('Querying with where clause:', where);
    const songs = await (prisma as any).songs.findMany({ where });
    console.log('Fetched songs:', songs.length);
    return { statusCode: 200, body: JSON.stringify(songs) };
  } catch (err) {
    console.log('Error fetching songs:');
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch songs' }) };
  }
};
