import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import nigeriaData from './data/nigeria.json';
// Import other country data here in the future
// import ghanaData from './data/ghana.json';

type Article = {
  code_id: string;
  title: string;
  description: string;
  requirements: string[];
  references: string[];
  keywords: string[];
  notes?: string;
  examples?: { context: string; application: string }[];
  related_codes?: string[];
};

type CodeData = {
  meta: object;
  sections: {
    id: string;
    title: string;
    summary: string;
    articles: Article[];
  }[];
};

const codeLibraries: Record<string, CodeData> = {
  nigeria: nigeriaData,
  // ghana: ghanaData, // Example for future expansion
};

export const searchBuildingCodes = ai.defineTool(
  {
    name: 'searchBuildingCodes',
    description:
      'Searches the building code for a specified country. Returns articles relevant to a query.',
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          'The search query. Can be keywords or a natural language question.'
        ),
      country: z
        .enum(['nigeria'])
        .describe('The country code to search within.'),
    }),
    outputSchema: z.array(
      z.object({
        code_id: z.string(),
        title: z.string(),
        description: z.string(),
        requirements: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
      })
    ),
  },
  async (input) => {
    const library = codeLibraries[input.country];
    if (!library) {
      // In a real app, you might throw an error or return a specific message.
      console.error(`No code library found for country: ${input.country}`);
      return [];
    }

    const allArticles: Article[] = library.sections.flatMap(
      (section) => section.articles
    );

    const queryLower = input.query.toLowerCase();
    const queryTerms = queryLower.split(/\s+/); // Split query into terms

    // A simple scoring mechanism
    const scoredArticles = allArticles.map((article) => {
      let score = 0;
      const content = [
        article.title,
        article.description,
        ...article.keywords,
        ...(article.requirements || []),
      ]
        .join(' ')
        .toLowerCase();

      // Score based on term frequency
      for (const term of queryTerms) {
        const occurrences = (content.match(new RegExp(term, 'g')) || [])
          .length;
        if (occurrences > 0) {
          score += occurrences;
        }
      }

      // Boost score for title match
      if (article.title.toLowerCase().includes(queryLower)) {
        score += 10;
      }

      return { article, score };
    });

    const relevantArticles = scoredArticles
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Return top 5 matches
      .map((item) => ({
        code_id: item.article.code_id,
        title: item.article.title,
        description: item.article.description,
        requirements: item.article.requirements,
        keywords: item.article.keywords,
      }));

    return relevantArticles;
  }
);