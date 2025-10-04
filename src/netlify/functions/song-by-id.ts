import type { Handler } from '@netlify/functions';
import prisma from './_prisma';

export const handler: Handler = async (event) => {
  const id = Number(event.path.split('/').pop());
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid id' }) };
  try {
    const song = await (prisma as any).songs.findUnique({ where: { id } });
    if (!song) return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    return { statusCode: 200, body: JSON.stringify(song) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch song' }) };
  }
};
