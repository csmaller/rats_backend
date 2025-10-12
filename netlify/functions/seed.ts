import type { Handler } from '@netlify/functions';
import prisma from './_prisma';
import fs from 'fs';
import path from 'path';

export const handler: Handler = async () => {
  try {
    console.log('Seeding songs...');
   const result = await (prisma as any).songs.createOne({ data:{title:'test', artist:'test'} , skipDuplicates: true });
  console.log('seeded', result);
   return { statusCode: 200, body: JSON.stringify('done seeding') };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Seeding failed' }) };
  }
};
