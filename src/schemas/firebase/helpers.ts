import { z } from 'zod';
import { Timestamp, DocumentReference, FieldValue, Firestore } from 'firebase-admin/firestore';
import { baseModelAppSchema, testEnv } from '../base/helpers';
import * as admin from 'firebase-admin';
import { baseModelSchema } from './core';
import { createDocRefSchema } from './core';

// Try to get the global Firestore instance
let globalDb: Firestore | undefined;

try {
    // This will work if firebase-admin is already initialized elsewhere
    if (admin.apps.length > 0) {
        globalDb = admin.firestore();
    }
} catch (e) {
    // Silently fail - we'll handle missing DB in the function calls
}

// Test environment document references for mocking
export class MockDocumentReference {
    path: string;
    id: string;

    constructor(collectionPath: string, id: string) {
        this.path = `${collectionPath}/${id}`;
        this.id = id;
    }
}

// Singleton to hold the firestore instance
let firestoreInstance: Firestore | null = null;

// Setter for the Firestore instance
export const setFirestoreInstance = (db: Firestore) => {
    firestoreInstance = db;
};

// Getter for the Firestore instance
export const getFirestoreInstance = (): Firestore => {
    // First check our explicitly set instance
    if (firestoreInstance) {
        return firestoreInstance;
    }
    
    // Then try the global instance
    if (globalDb) {
        return globalDb;
    }
    
    // As a last resort, try to get it directly from firebase-admin
    try {
        if (admin.apps.length > 0) {
            return admin.firestore();
        }
    } catch (e) {
        // Fall through to error
    }
    
    throw new Error('Firestore instance not available. Initialize firebase-admin or call setFirestoreInstance first.');
};

// Conversion helpers
export const toFirestore = {
    date: (date: Date): Timestamp => Timestamp.fromDate(date),
    ref: <T>(collectionPath: string, id: string, db?: Firestore): DocumentReference<T> => {
        // For tests, return a mock document reference
        if (testEnv.isTestEnvironment) {
            return new MockDocumentReference(collectionPath, id) as any;
        }

        // Use provided db instance or try to get the global instance
        const firestore = db || getFirestoreInstance();
        return firestore.collection(collectionPath).doc(id) as DocumentReference<T>;
    }
};

export const fromFirestore = {
    date: (timestamp: Timestamp): Date => timestamp.toDate(),
    ref: <T>(docRef: DocumentReference<T> | MockDocumentReference): string => {
        if (docRef instanceof MockDocumentReference) {
            return docRef.id;
        }
        return (docRef as any).id;
    }
};

// Re-export the app schema
export { baseModelAppSchema };

// Define HubbyModel schemas explicitly
export const hubbyModelFirestoreSchema = baseModelSchema;
export const hubbyModelAppSchema = baseModelAppSchema;

// Type for the base model
export type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;

// For backwards compatibility
export type HHubbyModel = HubbyModelApp;

// Helper function to convert a document reference schema to a string schema
export const docRefToStringSchema = <T>(docRefSchema: ReturnType<typeof createDocRefSchema<T>>) => {
    return z.string().describe(`ID from ${docRefSchema.collectionPath}`);
}; 