import { PrismaClient } from '@prisma/client';

// Shared Prisma client instance; swap for connection pooling if needed later.
export const prisma = new PrismaClient();
