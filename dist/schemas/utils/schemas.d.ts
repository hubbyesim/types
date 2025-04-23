import { z } from 'zod';
/**
 * Creates both Firestore and App schema versions of a reference field
 *
 * NOTE: Consider using the centralized ref schemas in refs.ts whenever possible
 * instead of creating new ones with this function.
 *
 * @param collection The collection path
 * @param nullable Whether the reference is nullable
 * @returns An object with Firestore and App schema definitions
 */
export declare function createReferenceSchemas<T>(collection: string, nullable?: boolean): {
    firestore: any;
    app: z.ZodString | z.ZodNullable<z.ZodString>;
    refSchema: any;
} | {
    firestore: any;
    app: any;
    refSchema: {
        schema: any;
        collectionPath: string;
    };
};
/**
 * Creates both Firestore and App schema versions of an array reference field
 * @param collection The collection path
 * @param nullable Whether the array itself is nullable
 * @returns An object with Firestore and App schema definitions
 */
export declare function createArrayReferenceSchemas<T>(collection: string, nullable?: boolean): {
    firestore: z.ZodArray<any, "many"> | z.ZodNullable<z.ZodArray<any, "many">>;
    app: z.ZodArray<z.ZodString, "many"> | z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    refSchema: any;
} | {
    firestore: any;
    app: any;
    refSchema: {
        schema: any;
        collectionPath: string;
    };
};
