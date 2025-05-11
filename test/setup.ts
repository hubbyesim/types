import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase once for all tests
const initFirebase = () => {
  // Check if Firebase is already initialized to prevent multiple initializations
  try {
    const app = initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID || 'hubby-esim-dev',
    }, 'test-app');

    // Configure Firestore to use emulator if needed
    const firestore = getFirestore(app);
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      firestore.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
      });
    }

    return { app, firestore };
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'app/duplicate-app') {
      return {
        app: initializeApp(undefined, 'test-app'),
        firestore: getFirestore()
      };
    }
    throw error;
  }
};

// Export initialized services for use in tests
export const { app, firestore } = initFirebase();

// For Jest globalSetup
export default async () => {
  // Additional setup can be added here if needed
  console.log('Global test setup complete');
}; 