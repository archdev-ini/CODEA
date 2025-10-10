'use server';

import { z } from 'zod';
import {
  semanticPrecedentSearch,
  type SemanticPrecedentSearchOutput,
} from '@/ai/flows/semantic-precedent-search';

const formSchema = z.object({
  concept: z.string().min(3),
});

type Response = {
  success: boolean;
  data?: SemanticPrecedentSearchOutput;
  error?: string;
};

export async function searchPrecedents(
  values: z.infer<typeof formSchema>
): Promise<Response> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }

  try {
    const results = await semanticPrecedentSearch({
      concept: validatedFields.data.concept,
    });
    return {
      success: true,
      data: results,
    };
  } catch (e) {
    console.error(e);
    // This is a user-facing error. Be careful what's exposed.
    return {
      success: false,
      error: 'Failed to perform search. Please try again later.',
    };
  }
}
