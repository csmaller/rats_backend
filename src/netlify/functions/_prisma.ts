import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

const globalAny:any = globalThis;

// Create a function to initialize Prisma
function createPrismaClient() {
  try {
    const apiKey = process.env.OPTIMIZE_API_KEY;
    if (!apiKey) {
      console.warn('OPTIMIZE_API_KEY is not set.');
    }
    return new PrismaClient().$extends(withOptimize({ apiKey }));
  } catch (error) {
    console.error('Failed to initialize PrismaClient:', error);
    throw new Error('PrismaClient initialization failed. Check environment variables and configuration.');
  }
}

const prisma = globalAny.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalAny.__prisma = prisma;
}

// Test connection to debug
(async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
  } catch (error) {
    console.error('Prisma connection failed:', error);
  } 
})();

export default prisma;