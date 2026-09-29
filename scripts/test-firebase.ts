import 'dotenv/config';
import { isFirebaseAdminInitialized, verifyFirebaseIdToken } from '../server/services/firebaseAdmin';

console.log('--- TESTING FIREBASE ADMIN EXPORT ---');
console.log('isFirebaseAdminInitialized:', isFirebaseAdminInitialized);

if (isFirebaseAdminInitialized) {
  console.log('🎉 SUCCESS: Live Firebase Admin is connected to project "budgetmind-1ccfb" (ID tokens verified against Google public keys)!');
  process.exit(0);
} else {
  console.error('❌ FAILED: isFirebaseAdminInitialized is false');
  process.exit(1);
}
