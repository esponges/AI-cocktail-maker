import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { env } from "~/env.mjs";

import type { CreateCompletionRequest} from "openai";
import { Configuration, OpenAIApi } from "openai";

const openAIConfig = new Configuration({
  organization: env.OPENAI_ORG_ID,
  apiKey: env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(openAIConfig);

export const drinksRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ brand: z.string() }))
    .mutation(async ({ input }) => {
      // TODO: make the call to the OpenAI API
      const requestObject: CreateCompletionRequest = {
        prompt: `I want a ${input.brand} cocktail recipe`,
        // model gpt 3.5
        model: "text-davinci-003",
        max_tokens: 100,
        temperature: 0.5,
      };

      try {
        const recipe = await openAI.createCompletion(requestObject);
        console.log('recipe', recipe.data?.choices[0]?.text);
        return {
          recipe: recipe.data?.choices[0]?.text,
        };
      } catch (error) {
        console.log(error);
        return {
          recipe: "Sorry, I don't know that brand.",
        };
      }
    }),
});
