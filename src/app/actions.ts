'use server';

import { z } from 'zod';

const countryCodes: [string, ...string[]] = ['nigeria'];
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
