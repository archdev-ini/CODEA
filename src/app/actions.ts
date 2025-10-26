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
