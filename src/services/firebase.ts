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

// Define variable to hold singleton instance
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
        this.app = initializeApp(options);
      }
    } else {
      // Standard initialization for non-test environments
      if (!getApps().length) {
        this.app = initializeApp(options);
      } else {
        this.app = getApps()[0];
      }
    }

    this.firestoreInstance = getFirestore(this.app);
  }

  get firestore(): Firestore {
    return this.firestoreInstance;
  }

  // Get default instance with singleton pattern
  public static getDefaultInstance(): FirebaseService {
    if (!defaultInstance) {
      defaultInstance = new FirebaseService();
    }
    return defaultInstance;
  }

  // Allow for setting a custom default instance (useful for tests)
  public static setDefaultInstance(instance: FirebaseService): void {
    defaultInstance = instance;
  }
}

// For backward compatibility, export a default instance
const defaultService = FirebaseService.getDefaultInstance();
export const db = defaultService.firestore;

// Function to create a new Firebase service instance
export function createFirebaseService(config?: FirebaseConfig): FirebaseService {
  return new FirebaseService(config);
}