import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

import { env } from "~/env.mjs";

import type {
} from "openai";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

const openAIConfig = new Configuration({
  organization: env.OPENAI_ORG_ID,
  apiKey: env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(openAIConfig);

export const drinksRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        brand: z.string(),
        messages: z.array(
          z.object({
            role: z.enum([
              ChatCompletionRequestMessageRoleEnum.User,
              ChatCompletionRequestMessageRoleEnum.System,
              ChatCompletionRequestMessageRoleEnum.Assistant,
            ]),
            content: z.string(), // add this line to include the 'content' property
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: make the call to the OpenAI API
      const requestObject = {
        messages: input.messages,
        // model gpt 3.5
        model: "gpt-3.5-turbo",
        temperature: 0.5,
      };

      try {
        const recipe = await openAI.createChatCompletion(requestObject);
        return {
          message: recipe.data.choices[0]?.message?.content,
        };
      } catch (error) {
        return {
          message: "Error",
        };
      }
    }),
});
