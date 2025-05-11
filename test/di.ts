import { firestore, app } from './setup';
import { Firestore } from 'firebase-admin/firestore';
import { App } from 'firebase-admin/app';

// Class-based dependency container that can be mocked in tests
class DIContainer {
  private static instance: DIContainer;
  
  // Services
  private _firestore: Firestore;
  private _app: App;
  
  private constructor() {
    // Default to the globally initialized services
    this._firestore = firestore;
    this._app = app;
  }
  
  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
  
  // Reset for testing - allows replacing services with mocks
  public static resetForTesting(services?: {
    firestore?: Firestore;
    app?: App;
  }): void {
    const instance = DIContainer.getInstance();
    if (services?.firestore) instance._firestore = services.firestore;
    if (services?.app) instance._app = services.app;
  }
  
  // Service getters
  get firestore(): Firestore {
    return this._firestore;
  }
  
  get app(): App {
    return this._app;
  }
}

// Export a singleton instance
export const getDI = (): DIContainer => DIContainer.getInstance();

// Helper for tests to mock services
export const resetDIForTesting = (services?: {
  firestore?: Firestore;
  app?: App;
}): void => {
  DIContainer.resetForTesting(services);
};

// Example function to create a test document reference
export const createDocRef = (collection: string, id: string) => {
  return getDI().firestore.collection(collection).doc(id);
}; 