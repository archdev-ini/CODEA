'use server';
/**
 * @fileOverview An AI flow to extract and structure text from a document.
 *
 * - extractDocumentText - A function that processes raw text into structured data.
 * - DocumentExtractInput - The input type for the flow.
 * - DocumentExtractOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const DocumentExtractInputSchema = z.object({
  documentText: z.string().describe('The raw text content from a document.'),
});
export type DocumentExtractInput = z.infer<typeof DocumentExtractInputSchema>;

export const DocumentExtractOutputSchema = z.object({
  extractedText: z
    .string()
    .describe(
      'The cleaned, primary text content from the document, with noise like headers, footers, and page numbers removed.'
    ),
  summary: z
    .string()
    .describe('A concise, AI-generated summary of the document content.'),
  tags: z
    .array(z.string())
    .describe(
      'A list of 3-5 relevant keywords or tags for categorization.'
    ),
});
export type DocumentExtractOutput = z.infer<typeof DocumentExtractOutputSchema>;

export async function extractDocumentText(
  input: DocumentExtractInput
): Promise<DocumentExtractOutput> {
  return extractDocumentTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDocumentTextPrompt',
  input: { schema: DocumentExtractInputSchema },
  output: { schema: DocumentExtractOutputSchema },
  prompt: `You are an expert system for parsing architectural and legal documents. Your task is to process the following document text, extract the core content, generate a summary, and provide relevant tags.

Follow these steps precisely:
1.  **Extract Core Text**: Read the document text provided below. Identify and remove all non-essential elements. This includes headers, footers, page numbers, tables of contents, and any metadata that is not part of the main body of the document. The goal is to produce a clean, readable version of the core content.
2.  **Generate Summary**: Based on the cleaned text, write a concise, neutral summary (2-3 sentences) that captures the main purpose and scope of the document.
3.  **Generate Tags**: Based on the content, generate a list of 3 to 5 relevant tags or keywords that would help someone search for this document. Examples: "zoning", "fire-safety", "residential-permits", "structural-integrity".

Document Text to Process:
'''
{{{documentText}}}
'''
`,
});

const extractDocumentTextFlow = ai.defineFlow(
  {
    name: 'extractDocumentTextFlow',
    inputSchema: DocumentExtractInputSchema,
    outputSchema: DocumentExtractOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model failed to produce a valid output.');
    }
    return output;
  }
);
