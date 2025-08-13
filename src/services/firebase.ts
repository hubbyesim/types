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

  private firestoreInstance: Firestore;
  constructor(db: Firestore) {
    this.firestoreInstance = db;
  }

  getFirestore(): Firestore {
    return this.firestoreInstance;
  }

  // Get default instance with singleton pattern
  public static getDefaultInstance(): FirebaseService {
    if (defaultInstance === null) {
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
export function createFirebaseService(db: Firestore): FirebaseService {
  return new FirebaseService(db);
}