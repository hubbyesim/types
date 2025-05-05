import { z } from 'zod';
import { Timestamp, DocumentReference, FieldValue } from 'firebase-admin/firestore';

// --- Schemas moved from helpers.ts ---

// Basic Firebase type schemas
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

// Base model schema using Firebase types
export const baseModelSchema = z.object({
    id: z.string(),
    created_at: timestampSchema,
    updated_at: timestampSchema,
    created_by: z.union([z.string(), z.null(), documentRefSchema]),
    updated_by: z.union([z.string(), z.null(), documentRefSchema])
});

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

// --- End of moved schemas ---

// Type for the base model
export type HubbyModelFirestore = z.infer<typeof baseModelSchema>;
// For backwards compatibility
export type HubbyModel = HubbyModelFirestore; 