import { PrismaClient } from '@prisma/client';
import { fetch } from 'undici';

// Polyfill fetch for Node < 18
if (typeof (globalThis as any).fetch !== 'function') {
  (globalThis as any).fetch = fetch;
}

async function run() {
  const prisma = new PrismaClient();
  try {
    const count = await (prisma as any).songs.count();
    console.log(`Songs count: ${count}`);
    if (count < 57) {
      console.error('Test failed: expected at least 57 songs after seeding.');
      process.exit(1);
    }
    console.log('Seed test passed: at least 57 songs present.');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

run();
