'use server';

import { z } from 'zod';
import {
  semanticPrecedentSearch,
  type SemanticPrecedentSearchOutput,
} from '@/ai/flows/semantic-precedent-search';
import {
  answerCodeQuestion,
  type AnswerCodeQuestionOutput,
} from '@/ai/flows/answer-code-question';
import fs from 'fs/promises';
import path from 'path';

const precedentSearchSchema = z.object({
  concept: z.string().min(3),
});

type PrecedentSearchResponse = {
  success: boolean;
  data?: SemanticPrecedentSearchOutput;
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

const codeQuestionSchema = z.object({
  question: z.string().min(10),
  country: z.enum(['nigeria']),
});

type CodeQuestionResponse = {
  success: boolean;
  data?: AnswerCodeQuestionOutput;
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
    const results = await answerCodeQuestion({
      question: validatedFields.data.question,
      country: validatedFields.data.country,
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
      error: 'Failed to get an answer. Please try again later.',
    };
  }
}