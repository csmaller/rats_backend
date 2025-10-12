import { PrismaClient } from '@prisma/client';

const globalAny:any = globalThis;

// Create a function to initialize Prisma
function createPrismaClient() {
  try {
    console.log('return prisma clients')
    return new PrismaClient();
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
    console.log('PRISMA IS CONNECTED');
  } catch (error) {
    console.error('Prisma connection failed:');
  } 
})();

export default prisma;