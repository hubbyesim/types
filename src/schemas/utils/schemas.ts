import { z } from 'zod';
import { createDocRefSchema, docRefToStringSchema } from '../helpers';

/**
 * Creates both Firestore and App schema versions of a reference field
 * @param collection The collection path
 * @param nullable Whether the reference is nullable
 * @returns An object with Firestore and App schema definitions
 */
export function createReferenceSchemas<T>(collection: string, nullable = false) {
    const refSchema = createDocRefSchema<T>(collection);
    
    // Create Firestore schema - either the document reference schema or nullable version
    const firestoreSchema = nullable 
        ? refSchema.schema.nullable()
        : refSchema.schema;
    
    // Create App schema - either the string schema or nullable version
    const appSchema = nullable 
        ? docRefToStringSchema(refSchema).nullable()
        : docRefToStringSchema(refSchema);
    
    return {
        firestore: firestoreSchema,
        app: appSchema,
        refSchema
    };
}

/**
 * Creates both Firestore and App schema versions of an array reference field
 * @param collection The collection path
 * @param nullable Whether the array itself is nullable
 * @returns An object with Firestore and App schema definitions
 */
export function createArrayReferenceSchemas<T>(collection: string, nullable = false) {
    const refSchema = createDocRefSchema<T>(collection);
    
    // Create Firestore schema - array of document references, optionally nullable
    const firestoreSchema = nullable 
        ? z.array(refSchema.schema).nullable()
        : z.array(refSchema.schema);
    
    // Create App schema - array of strings, optionally nullable
    const appSchema = nullable 
        ? z.array(z.string()).nullable()
        : z.array(z.string());
    
    return {
        firestore: firestoreSchema,
        app: appSchema,
        refSchema
    };
} 