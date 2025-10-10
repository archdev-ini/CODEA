import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import data from './precedents.json';

export const getArchitecturalPrecedents = ai.defineTool(
    {
      name: 'getArchitecturalPrecedents',
      description: 'Returns a list of architectural precedents from the CODEA library. Can be filtered by concept.',
      inputSchema: z.object({
        concept: z.string().optional().describe('An optional architectural concept to filter by.'),
      }),
      outputSchema: z.array(z.object({
        id: z.string(),
        title: z.string(),
        concept: z.string(),
        description: z.string(),
      })),
    },
    async (input) => {
        if (input.concept) {
            return data.precedents.filter(p => p.concept.toLowerCase().includes(input.concept!.toLowerCase()));
        }
      return data.precedents;
    }
  )
