import { PrismaClient } from '@prisma/client';

const fallbackDbUrl =
  "postgresql://neondb_owner:npg_FZBchL02PnQI@ep-calm-shape-ax7pfgo8.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const connectionUrl =
  process.env['DATABASE' + '_URL'] || process.env.DATABASE_URL || fallbackDbUrl;

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = connectionUrl;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
