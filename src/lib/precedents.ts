import data from './precedents.json';

// This is a placeholder. The original implementation used Genkit.
export async function getArchitecturalPrecedents(input: { concept?: string }) {
  if (input.concept) {
    return data.precedents.filter(p => p.concept.toLowerCase().includes(input.concept!.toLowerCase()));
  }
  return data.precedents;
}
