'use server';

import { z } from 'zod';
import { getCountryCodes } from '@/lib/codes';

const precedentSearchSchema = z.object({
  concept: z.string().min(3),
});

type PrecedentSearchResponse = {
  success: boolean;
  data?: any; //SemanticPrecedentSearchOutput;
  error?: string;
};

export async function searchPrecedents(
  values: z.infer<typeof precedentSearchSchema>
): Promise<PrecedentSearchResponse> {
  const validatedFields = precedentSearchSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }

  try {
    // const results = await semanticPrecedentSearch({
    //   concept: validatedFields.data.concept,
    // });
    return {
      success: true,
      data: { results: [] },
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

const countryCodes = getCountryCodes();
const codeQuestionSchema = z.object({
  question: z.string().min(10),
  country: z.enum(countryCodes),
});

type CodeQuestionResponse = {
  success: boolean;
  data?: any; //AnswerCodeQuestionOutput;
  error?: string;
};

export async function askCodeQuestion(
  values: z.infer<typeof codeQuestionSchema>
): Promise<CodeQuestionResponse> {
  const validatedFields = codeQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input. Please ask a more detailed question.',
    };
  }

  try {
    // const results = await answerCodeQuestion({
    //   question: validatedFields.data.question,
    //   country: validatedFields.data.country,
    // });
    return {
      success: true,
      data: { answer: 'AI is disabled.', relevant_articles: [] },
    };
  } catch (e) {
    console.error(e);
    // This is a user-facing error. Be careful what's exposed.
    return {
      success: false,
      error: 'Failed to get an answer. Please try again later.',
    };
  }
}


const contributionSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  section: z.string().min(1, 'Section is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  references: z.string().optional(),
  tags: z.string().optional(),
  contributorName: z.string().optional(),
  contributorEmail: z.union([z.string().email(), z.literal('')]).optional(),
});


type ContributionResponse = {
  success: boolean;
  error?: string;
};

export async function submitContribution(
  values: z.infer<typeof contributionSchema>
): Promise<ContributionResponse> {
  const validatedFields = contributionSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten());
    return {
      success: false,
      error: 'Invalid input. Please check the form and try again.',
    };
  }

  try {
    // TODO: In the future, this will save the contribution to Firestore
    // For now, we just log it to the console.
    console.log('New contribution received:', validatedFields.data);
    return { success: true };
  } catch (e) {
    console.error('Failed to submit contribution:', e);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
