import type { Handler } from '@netlify/functions';
import prisma from './_prisma';
import fs from 'fs';
import path from 'path';

export const handler: Handler = async () => {
  // try {
  //   console.log('Seeding songs...');
  //   const songsPath = path.resolve('./src/songs.json');
  //   const raw = fs.readFileSync(songsPath, 'utf8');
  //   const parsed = JSON.parse(raw);
  //   const songs = Array.isArray(parsed.songs) ? parsed.songs : [];
  //   const toInsert = songs.map((s: any) => ({ title: s.title, artist: s.artist }));
  //   const result = await (prisma as any).songs.createMany({ data: toInsert, skipDuplicates: true });
   return { statusCode: 200, body: JSON.stringify('done seeding') };
  // } catch (err) {
  //   console.error(err);
  //   return { statusCode: 500, body: JSON.stringify({ error: 'Seeding failed' }) };
  // }
};
