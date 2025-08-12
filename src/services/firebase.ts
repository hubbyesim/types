import { getApps, initializeApp, cert, AppOptions, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { applicationDefault } from "firebase-admin/app";

export interface FirebaseConfig {
  credential?: AppOptions['credential'];
  projectId?: string;
  storageBucket?: string;
  databaseURL?: string;
  // Options for testing
  isTest?: boolean;
}

// Define variable to hold singleton instance (must be injected by consumer/tests)
let defaultInstance: FirebaseService | null = null;

export class FirebaseService {
  private app: App;
  private firestoreInstance: Firestore;

  constructor(config: FirebaseConfig = {}) {
    // Use default credentials if none provided
    const options: AppOptions = {
      credential: config.credential || applicationDefault(),
      projectId: config.projectId || process.env.FIREBASE_PROJECT_ID,
      storageBucket: config.storageBucket,
      databaseURL: config.databaseURL
    };

    // For test environments, we may want to use a different initialization strategy
    if (config.isTest) {
      // Check if we already have apps initialized - reuse if available
      if (getApps().length) {
        this.app = getApps()[0];
      } else {
        console.log('Initializing Firebase app for test environment SHOULD NEVER APPEAR IN ANY LOGS OUTSIDE OF THE TEST SUITE');
        this.app = initializeApp(options);
      }
    } else {
      // Standard initialization for non-test environments
      this.app = getApps()[0];
    }

    if (!this.app) {
      throw new Error('Firebase app not initialized');
    }

    this.firestoreInstance = getFirestore(this.app);
  }

  get firestore(): Firestore {
    return this.firestoreInstance;
  }

  // Get default instance with singleton pattern
  public static getDefaultInstance(): FirebaseService {
    if (!defaultInstance) {
      throw new Error(
        "FirebaseService default instance not set. Inject a FirebaseService via FirebaseService.setDefaultInstance(...) in your application startup or test setup."
      );
    }
    return defaultInstance;
  }

  // Allow for setting a custom default instance (useful for tests)
  public static setDefaultInstance(instance: FirebaseService): void {
    defaultInstance = instance;
  }
}

// Function to create a new Firebase service instance (use in tests or by consumers before injection)
export function createFirebaseService(config?: FirebaseConfig): FirebaseService {
  return new FirebaseService(config);
}