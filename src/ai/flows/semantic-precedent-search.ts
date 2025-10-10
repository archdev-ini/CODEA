'use server';
/**
 * @fileOverview Implements semantic search within the CODEA library to explore architectural precedents by concept.
 *
 * - semanticPrecedentSearch - A function that handles the semantic search process.
 * - SemanticPrecedentSearchInput - The input type for the semanticPrecedentSearch function.
 * - SemanticPrecedentSearchOutput - The return type for the semanticPrecedentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getArchitecturalPrecedents } from '@/lib/precedents';

const SemanticPrecedentSearchInputSchema = z.object({
  concept: z
    .string()
    .describe('The architectural concept to search for in the CODEA library.'),
});
export type SemanticPrecedentSearchInput = z.infer<
  typeof SemanticPrecedentSearchInputSchema
>;

const SemanticPrecedentSearchOutputSchema = z.object({
  results: z
    .array(z.string())
    .describe(
      'A list of relevant architectural precedents found in the CODEA library.'
    ),
});
export type SemanticPrecedentSearchOutput = z.infer<
  typeof SemanticPrecedentSearchOutputSchema
>;

export async function semanticPrecedentSearch(
  input: SemanticPrecedentSearchInput
): Promise<SemanticPrecedentSearchOutput> {
  return semanticPrecedentSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'semanticPrecedentSearchPrompt',
  input: {schema: SemanticPrecedentSearchInputSchema},
  output: {schema: SemanticPrecedentSearchOutputSchema},
  prompt: `You are an expert architectural assistant. Using the CODEA library, find architectural precedents related to the following concept: {{{concept}}}. Return a list of relevant precedents.`,
  tools: [getArchitecturalPrecedents]
});

const semanticPrecedentSearchFlow = ai.defineFlow(
  {
    name: 'semanticPrecedentSearchFlow',
    inputSchema: SemanticPrecedentSearchInputSchema,
    outputSchema: SemanticPrecedentSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
