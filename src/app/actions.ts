'use server';

import { z } from 'zod';
import {
  semanticPrecedentSearch,
  type SemanticPrecedentSearchOutput,
} from '@/ai/flows/semantic-precedent-search';
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


const contributionSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  section: z.string().min(1, 'Section is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  references: z.string().optional(),
  tags: z.string().optional(),
  contributorName: z.string().optional(),
  contributorEmail: z.string().email('Invalid email address').optional(),
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
    return {
      success: false,
      error: 'Invalid input.',
    };
  }
  
  const { contributorEmail, contributorName, ...data } = validatedFields.data;

  const contributionId = `${data.country.toLowerCase().replace(/ /g, '-')}-${data.section.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

  const submission = {
    id: contributionId,
    ...data,
    contributor: contributorName || 'Anonymous',
    ...(contributorEmail && { contributor_email: contributorEmail }),
    status: 'pending',
  };

  try {
    const pendingDir = path.join(process.cwd(), 'src/lib/data/contributions/pending');
    await fs.mkdir(pendingDir, { recursive: true });
    const filePath = path.join(pendingDir, `${contributionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(submission, null, 2));

    return { success: true };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: 'Failed to save contribution. Please try again later.',
    };
  }
}
