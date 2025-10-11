'use server';
/**
 * @fileOverview Implements an AI flow to answer questions about Nigerian building codes.
 *
 * - answerCodeQuestion - A function that handles the question answering process.
 * - AnswerCodeQuestionInput - The input type for the answerCodeQuestion function.
 * - AnswerCodeQuestionOutput - The return type for the answerCodeQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { searchNigerianBuildingCodes } from '@/lib/codes';

const AnswerCodeQuestionInputSchema = z.object({
  question: z
    .string()
    .describe('A natural language question about Nigerian building codes.'),
});
export type AnswerCodeQuestionInput = z.infer<
  typeof AnswerCodeQuestionInputSchema
>;

const ArticleSchema = z.object({
  code_id: z.string(),
  title: z.string(),
  description: z.string(),
  requirements: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

const AnswerCodeQuestionOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A direct, synthesized answer to the user\'s question, based on the provided code articles. If no relevant articles are found, this should state that an answer could not be determined.'
    ),
  relevant_articles: z
    .array(ArticleSchema)
    .describe('A list of the most relevant code articles used to form the answer.'),
});
export type AnswerCodeQuestionOutput = z.infer<
  typeof AnswerCodeQuestionOutputSchema
>;

export async function answerCodeQuestion(
  input: AnswerCodeQuestionInput
): Promise<AnswerCodeQuestionOutput> {
  return answerCodeQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCodeQuestionPrompt',
  input: { schema: AnswerCodeQuestionInputSchema },
  output: { schema: AnswerCodeQuestionOutputSchema },
  prompt: `You are an expert architectural assistant specializing in African building regulations. Your task is to answer a user's question based on the Nigerian National Building Code.

Use the 'searchNigerianBuildingCodes' tool to find relevant articles for the user's question: {{{question}}}.

Once you have the search results, perform the following steps:
1. Carefully review the retrieved articles.
2. Synthesize a concise, direct answer to the user's question based *only* on the information in the articles.
3. If the articles do not contain enough information to answer the question, state that you could not find a definitive answer in the provided code documents. Do not invent information.
4. Populate the 'answer' field with your synthesized response.
5. Populate the 'relevant_articles' field with the exact article objects that you used to form the answer.

Begin now.`,
  tools: [searchNigerianBuildingCodes],
});

const answerCodeQuestionFlow = ai.defineFlow(
  {
    name: 'answerCodeQuestionFlow',
    inputSchema: AnswerCodeQuestionInputSchema,
    outputSchema: AnswerCodeQuestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
