import { genkit, AIMiddleware } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const logger: AIMiddleware = async (action, next) => {
  console.log('Running action', action.name);
  const result = await next(action);
  console.log('Result for action', action.name, result);
  return result;
};

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  // Disabling logs for production.
  // logSchema: process.env.NODE_ENV === 'development',
  // middlewares: [logger],
});
