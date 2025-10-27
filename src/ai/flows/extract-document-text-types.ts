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
