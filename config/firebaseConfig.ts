import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import { ServiceAccount } from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  // ... other firebase config
});

const db = admin.firestore();
export { admin, db };