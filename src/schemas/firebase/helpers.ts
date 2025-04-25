import { z } from 'zod';
import { Timestamp, DocumentReference, FieldValue } from 'firebase-admin/firestore';
import { baseModelAppSchema, testEnv } from '../base/helpers';

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
export const timestampSchema = z.custom<Timestamp>(
    (val): val is Timestamp => val instanceof Timestamp
);

export const documentRefSchema = z.custom<DocumentReference>(
    (val): val is DocumentReference =>
        typeof val === 'object' &&
        val !== null &&
        'path' in val &&
        'id' in val
);

export const fieldValueSchema = z.custom<FieldValue>(
    (val): val is FieldValue =>
        typeof val === 'object' &&
        val !== null &&
        'isEqual' in val
);

// Conversion helpers
export const toFirestore = {
    date: (date: Date): Timestamp => Timestamp.fromDate(date),
    ref: <T>(collectionPath: string, id: string): DocumentReference<T> => {
        // For tests, return a mock document reference
        if (testEnv.isTestEnvironment) {
            return new MockDocumentReference(collectionPath, id) as any;
        }

        // In a real environment, this requires a Firestore instance
        throw new Error('Implementation requires Firestore instance');
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

// Base model schema for common fields using Firebase types
export const baseModelSchema = z.object({
    id: z.string(),
    created_at: timestampSchema,
    updated_at: timestampSchema,
    created_by: z.union([z.string(), z.null(), documentRefSchema]),
    updated_by: z.union([z.string(), z.null(), documentRefSchema])
});

// Re-export the app schema
export { baseModelAppSchema };

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
        (ref) => ref.path.startsWith(collectionPath),
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