import data from './precedents.json';

export type Precedent = {
  id: string;
  title: string;
  description: string;
  architect: string;
  location: string;
  year: number;
  imageUrl: string;
  imageHint?: string;
  tags: string[];
  codeaCategories: string[];
};

export async function getArchitecturalPrecedents(input: { concept?: string }): Promise<Precedent[]> {
  if (input.concept) {
    return data.precedents.filter(p => 
      p.tags.some(tag => tag.toLowerCase().includes(input.concept!.toLowerCase())) ||
      p.title.toLowerCase().includes(input.concept!.toLowerCase())
    );
  }
  return data.precedents;
}

export async function getPrecedentById(id: string): Promise<Precedent | undefined> {
  return data.precedents.find(p => p.id === id);
}
