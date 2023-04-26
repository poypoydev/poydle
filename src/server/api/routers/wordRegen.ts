import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getWordOfTheDay } from "~/utils/regeneration";

export const wordRouter = createTRPCRouter({
  hello: publicProcedure.query(({}) => {
    return {
      word: getWordOfTheDay(),
    };
  }),
});
