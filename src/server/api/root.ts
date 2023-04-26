import { createTRPCRouter } from "~/server/api/trpc";
import { wordRouter } from "~/server/api/routers/wordRegen";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  word: wordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
