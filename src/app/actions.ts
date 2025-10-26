'use server';

import { collection, addDoc } from 'firebase/firestore';
import { initializeFirebase, addDocumentNonBlocking } from '@/firebase';

type Jurisdiction = {
  name: string;
  level: string;
};

export async function addJurisdiction(jurisdiction: Jurisdiction) {
  try {
    // Initialize Firebase on the server-side to get the firestore instance
    const { firestore } = initializeFirebase();
    
    // Use the non-blocking helper to add the document
    addDocumentNonBlocking(collection(firestore, 'jurisdictions'), {
      name: jurisdiction.name,
      level: jurisdiction.level,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error adding jurisdiction:', error);
    return { success: false, error: error.message };
  }
}
