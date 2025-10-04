import { PrismaClient } from '@prisma/client';

const globalAny: any = globalThis as any;
const prisma = globalAny.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalAny.__prisma = prisma;

export default prisma;
