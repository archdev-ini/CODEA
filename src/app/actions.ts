
'use server';

import { adminDb } from '@/firebase/server';
import { extractDocumentText } from '@/ai/flows/extract-document-text';
import { FieldValue } from 'firebase-admin/firestore';

type Jurisdiction = {
  name: string;
  level: string;
};

export async function addJurisdiction(jurisdiction: Jurisdiction) {
  try {
    await adminDb.collection('jurisdictions').add({
      ...jurisdiction,
      articleCount: 0,
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
    const jurisdictionRef = adminDb
      .collection('jurisdictions')
      .doc(article.jurisdictionId);
    const newArticleRef = adminDb.collection('articles').doc();

    await adminDb.runTransaction(async (transaction) => {
      // 1. Create the new article document
      transaction.set(newArticleRef, article);
      // 2. Atomically increment the article count on the parent jurisdiction
      transaction.update(jurisdictionRef, {
        articleCount: FieldValue.increment(1),
      });
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error adding code article:', error);
    return { success: false, error: error.message };
  }
}

type Contribution = {
  country: string;
  section: string;
  title: string;
  description: string;
  references?: string;
  tags?: string;
  contributorName?: string;
  contributorEmail?: string;
};

export async function submitContribution(contribution: Contribution) {
  try {
    const { country, tags, ...rest } = contribution;
    await adminDb.collection('insights').add({
      ...rest,
      jurisdictionId: country, // Remapping country to jurisdictionId
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error submitting contribution:', error);
    return { success: false, error: error.message };
  }
}

type UploadDocumentPayload = {
  title: string;
  fileContent: string;
  fileName: string;
  tags?: string;
};

export async function uploadDocument(payload: UploadDocumentPayload) {
  try {
    const aiResult = await extractDocumentText({
      documentText: payload.fileContent,
    });

    const userTags = payload.tags
      ? payload.tags.split(',').map((t) => t.trim())
      : [];
    const allTags = [...new Set([...userTags, ...aiResult.tags])];

    await adminDb.collection('documents').add({
      title: payload.title,
      sourceFile: payload.fileName,
      content: aiResult.extractedText,
      summary: aiResult.summary,
      tags: allTags,
      uploadedBy: 'admin', // Placeholder for user management
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error uploading document:', error);
    return { success: false, error: error.message };
  }
}

type JurisdictionRequest = {
  name: string;
};

export async function requestJurisdiction(request: JurisdictionRequest) {
  try {
    await adminDb.collection('requests').add({
      name: request.name,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      // requestedBy: 'anonymous' // Placeholder for user management
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error submitting jurisdiction request:', error);
    return { success: false, error: error.message };
  }
}
