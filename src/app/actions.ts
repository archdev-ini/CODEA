'use server';

import { adminDb } from '@/firebase/server';

type Jurisdiction = {
  name: string;
  level: string;
};

export async function addJurisdiction(jurisdiction: Jurisdiction) {
  try {
    await adminDb.collection('jurisdictions').add({
      name: jurisdiction.name,
      level: jurisdiction.level,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error adding jurisdiction:', error);
    return { success: false, error: error.message };
  }
}

type CodeArticle = {
  jurisdictionId: string;
  codeId: string;
  codeName: string;
  title: string;
  description: string;
  version: string;
};

export async function addCodeArticle(article: CodeArticle) {
  try {
    // We can add more fields from the schema as needed in the form
    await adminDb.collection('articles').add(article);
    return { success: true };
  } catch (error: any) {
    console.error('Error adding code article:', error);
    return { success: false, error: error.message };
  }
}
