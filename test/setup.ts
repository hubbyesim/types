import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Firebase once for all tests
const initFirebase = () => {
  // Check if Firebase is already initialized to prevent multiple initializations
  try {
    let credential;
    let projectId = process.env.FIREBASE_PROJECT_ID || 'hubby-esim-dev';

    // In GitHub Actions, use service account credentials if available
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
        credential = cert(serviceAccount);
        projectId = serviceAccount.project_id || projectId;
        console.log(`Using service account for project: ${projectId}`);
      } catch (error) {
        console.warn('Failed to read service account, falling back to application default:', error);
        credential = applicationDefault();
      }
    } else {
      // Local development - use application default credentials
      credential = applicationDefault();
      console.log('Using application default credentials');
    }

    const app = initializeApp({
      credential,
      projectId,
    }, 'test-app');

    // Configure Firestore to use emulator if needed
    const firestore = getFirestore(app);
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      firestore.settings({
        host: process.env.FIRESTORE_EMULATOR_HOST,
        ssl: false,
      });
      console.log('Using Firestore emulator');
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
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Firebase Project: ${process.env.FIREBASE_PROJECT_ID || 'hubby-esim-dev'}`);
}; 