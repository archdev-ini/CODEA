import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error('Firebase service account is not set.');
}

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
  });
}

const adminDb = admin.firestore();
export { adminDb };
