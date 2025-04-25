import { z } from 'zod';
import {
    FirestoreProvider,
    TimestampLike,
    DocumentReferenceLike,
    FieldValueLike,
    isTimestamp,
    isDocumentReference,
    isFieldValue
} from './utils/firestoreProvider';

// Flag to indicate if we're running in a test environment
// Export as object to make it mutable in ESM context
export const testEnv = { isTestEnvironment: false };

// Test environment document references for mocking
export class MockDocumentReference {
    path: string;
    id: string;

    constructor(collectionPath: string, id: string) {
        this.path = `${collectionPath}/${id}`;
        this.id = id;
    }
}

// Firebase type schemas with custom type guards instead of z.instanceof
export const timestampSchema = z.custom<TimestampLike>(
    (val: unknown): val is TimestampLike => isTimestamp(val)
);

export const documentRefSchema = z.custom<DocumentReferenceLike>(
    (val: unknown): val is DocumentReferenceLike => isDocumentReference(val)
);

export const fieldValueSchema = z.custom<FieldValueLike>(
    (val: unknown): val is FieldValueLike => isFieldValue(val)
);

// Conversion helpers that use FirestoreProvider
export const createFirestoreHelpers = (firestore: FirestoreProvider) => ({
    toFirestore: {
        date: (date: Date): TimestampLike => firestore.Timestamp.fromDate(date),
        ref: <T>(collectionPath: string, id: string): DocumentReferenceLike => {
            // For tests, return a mock document reference
            if (testEnv.isTestEnvironment) {
                return new MockDocumentReference(collectionPath, id) as any;
            }

            // Use the provided Firestore instance
            return firestore.doc(`${collectionPath}/${id}`);
        },
        serverTimestamp: (): FieldValueLike => firestore.FieldValue.serverTimestamp()
    },
    fromFirestore: {
        date: (timestamp: TimestampLike): Date => timestamp.toDate(),
        ref: <T>(docRef: DocumentReferenceLike | MockDocumentReference): string => {
            if (docRef instanceof MockDocumentReference) {
                return docRef.id;
            }
            return docRef.id;
        }
    }
});

// Legacy untyped helpers for compatibility
export const toFirestore = {
    date: (date: Date): any => {
        throw new Error('Please use createFirestoreHelpers(firestore).toFirestore.date() instead');
    },
    ref: <T>(collectionPath: string, id: string): any => {
        // For tests, return a mock document reference
        if (testEnv.isTestEnvironment) {
            return new MockDocumentReference(collectionPath, id) as any;
        }

        // In a real environment, this requires a Firestore instance
        throw new Error('Please use createFirestoreHelpers(firestore).toFirestore.ref() instead');
    }
};

export const fromFirestore = {
    date: (timestamp: any): Date => {
        if (isTimestamp(timestamp)) {
            return timestamp.toDate();
        }
        throw new Error('Invalid timestamp object');
    },
    ref: <T>(docRef: any): string => {
        if (docRef instanceof MockDocumentReference) {
            return docRef.id;
        }
        if (isDocumentReference(docRef)) {
            return docRef.id;
        }
        throw new Error('Invalid document reference');
    }
};

// Base model schema for common fields
export const baseModelSchema = z.object({
    id: z.string(),
    created_at: timestampSchema,
    updated_at: timestampSchema,
    created_by: z.union([z.string(), z.null(), documentRefSchema]),
    updated_by: z.union([z.string(), z.null(), documentRefSchema])
});

// App version of the base model
export const baseModelAppSchema = z.object({
    id: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    created_by: z.union([z.string(), z.null()]),
    updated_by: z.union([z.string(), z.null()])
});

// Define HubbyModel schemas explicitly
export const hubbyModelFirestoreSchema = baseModelSchema;
export const hubbyModelAppSchema = baseModelAppSchema;

// Type for the base model
export type HubbyModelFirestore = z.infer<typeof hubbyModelFirestoreSchema>;
export type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;

// For backwards compatibility
export type HubbyModel = HubbyModelFirestore;
export type HHubbyModel = HubbyModelApp;

// Helper function to create document reference schemas
export const createDocRefSchema = <T>(collectionPath: string) => {
    const schema = documentRefSchema.refine(
        (ref: DocumentReferenceLike) => ref.path.startsWith(collectionPath),
        {
            message: `Document reference must be from collection ${collectionPath}`
        }
    );

    return {
        schema,
        collectionPath
    };
};

// Helper function to convert a document reference schema to a string schema
export const docRefToStringSchema = <T>(docRefSchema: ReturnType<typeof createDocRefSchema<T>>) => {
    return z.string().describe(`ID from ${docRefSchema.collectionPath}`);
};