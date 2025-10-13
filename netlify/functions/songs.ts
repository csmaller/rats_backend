import type { Handler } from '@netlify/functions';
import prisma from './_prisma';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://ratsmusic.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const q = event.queryStringParameters?.q;
    
    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive', sort:'asc' } },
            { artist: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined;
    const songs = await (prisma as any).songs.findMany({ where });
    return { statusCode: 200, headers, body: JSON.stringify(songs) };
  } catch (err) {
    console.log('Error fetching songs:');
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to fetch songs' }) };
  }
};
