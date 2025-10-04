import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

const globalAny: any = globalThis as any;

// Create a Prisma client extended with the Optimize extension. The API key
// is provided via the OPTIMIZE_API_KEY environment variable.
const extendedPrisma = new PrismaClient().$extends(
	withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY })
);

// Preserve the global singleton so Netlify function invocations reuse the
// same Prisma client in development (and don't create many connections).
const prisma = globalAny.__prisma ?? extendedPrisma;
if (process.env.NODE_ENV !== 'production') globalAny.__prisma = prisma;

export default prisma;
