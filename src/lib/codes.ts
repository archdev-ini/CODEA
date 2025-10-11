import nigeriaData from './data/nigeria.json';
import { getCountryCodes } from './countries';
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

export const codeLibraries: Record<string, CodeData> = {
  nigeria: nigeriaData,
  // ghana: ghanaData, // Example for future expansion
};

const countryCodes = getCountryCodes();
