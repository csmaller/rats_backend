import { PrismaClient } from '@prisma/client';
import { fetch } from 'undici';

// Node version check: warn if Node < 18. Set SEED_STRICT_NODE=1 to make this script exit instead of continuing.
const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 18) {
  console.warn(
    `Warning: Node ${process.versions.node} detected. Prisma 6+ recommends Node >= 18. The seed will continue, but for best compatibility run this script with Node 18+.`,
  );
  if (process.env.SEED_STRICT_NODE === '1') {
    console.error('SEED_STRICT_NODE=1 is set — aborting seed due to Node version.');
    process.exit(1);
  }
}

// Polyfill global fetch for runtimes that don't provide it (Node < 18)
if (typeof (globalThis as any).fetch !== 'function') {
  (globalThis as any).fetch = fetch;
}
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const songsPath = path.resolve(__dirname, 'songs.json');
  const raw = fs.readFileSync(songsPath, 'utf8');
  const parsed = JSON.parse(raw);
  const songs = Array.isArray(parsed.songs)
    ? (parsed.songs as Array<{ id?: number; title: string; artist: string }>)
    : [];

  if (songs.length === 0) {
    console.log('No songs found in songs.json to insert.');
    return;
  }

  const toInsert = songs.map((s) => ({ title: s.title, artist: s.artist }));

  try {
    const result = await (prisma as any).songs.createMany({
      data: toInsert,
      skipDuplicates: true,
    });
    console.log(`Inserted ${result.count ?? toInsert.length} songs into the Songs table`);
  } catch (err) {
    console.error('Failed to insert songs:', err);
    throw err;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
