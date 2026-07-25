import { PrismaClient } from '@prisma/client';

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_FZBchL02PnQI@ep-calm-shape-ax7pfgo8.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: dbUrl,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
