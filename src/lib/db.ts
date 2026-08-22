import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

/**
 * Lazily-instantiated Prisma client.
 *
 * The client is created on first *property access* rather than at module load.
 * Route handlers import `db` at the top level, and Next.js imports every route
 * module during `next build` to collect page data — eagerly constructing the
 * client there would crash the build on any machine where the Prisma engine
 * has not been generated, even though no query is ever executed at build time.
 *
 * Deferring construction keeps the build (and type-checking) independent of
 * generator state while behaving identically at runtime: the singleton is
 * still cached, and still reused across hot reloads in development.
 */
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = (globalForPrisma.prisma ??= createPrismaClient());
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
  has(_target, prop) {
    return prop in (globalForPrisma.prisma ??= createPrismaClient());
  },
});

/**
 * The client handed to a `db.$transaction(async (tx) => ...)` callback.
 *
 * It is the full client minus the connection/transaction-management methods,
 * which are not available inside an interactive transaction. Derived from
 * `PrismaClient` so it tracks the generated Prisma types automatically, and
 * still resolves before `prisma generate` has been run.
 */
export type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
