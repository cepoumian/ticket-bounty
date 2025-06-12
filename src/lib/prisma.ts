import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// This code initializes a Prisma Client instance and ensures that it is reused in development mode to prevent exhausting database connections.
// In production, a new instance is created each time to ensure proper connection management.
// The globalForPrisma variable is used to store the Prisma Client instance globally, allowing it to be accessed across different modules without creating multiple instances.
// This is particularly useful in Next.js applications where the server may restart frequently during development, leading to multiple Prisma Client instances being created if not handled properly.
// The prisma client is exported for use in other parts of the application, such as API routes or server-side functions.
