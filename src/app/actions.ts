'use server';

import { collection, addDoc, Firestore } from 'firebase/firestore';
import { getSdks } from '@/firebase'; // Assuming getSdks is exported and gives firestore instance

type Jurisdiction = {
  name: string;
  level: string;
};

export async function addJurisdiction(jurisdiction: Jurisdiction) {
  try {
    const { firestore } = getSdks();
    if (!firestore) {
      throw new Error('Firestore is not initialized.');
    }
    
    await addDoc(collection(firestore, 'jurisdictions'), {
      name: jurisdiction.name,
      level: jurisdiction.level,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error adding jurisdiction:', error);
    return { success: false, error: error.message };
  }
}
