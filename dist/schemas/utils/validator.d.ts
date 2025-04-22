import { z } from 'zod';
/**
 * Creates a validation function for a Zod schema
 * Used to easily validate data against a schema and handle errors in a consistent way
 *
 * @param schema The Zod schema to validate against
 * @param schemaName Name of the schema for better error messages
 * @returns A validation function that returns a result object
 */
export declare function createValidator<T extends z.ZodTypeAny>(schema: T, schemaName: string): (data: unknown) => {
    success: boolean;
    data?: z.infer<T>;
    errors?: z.ZodError;
    message?: string;
};
/**
 * Creates functions to validate data conversion between Firestore and App schemas
 *
 * @param firestoreSchema The Firestore schema
 * @param appSchema The App schema
 * @param toFirestore Function to convert from app to firestore format
 * @param fromFirestore Function to convert from firestore to app format
 * @returns Validation functions for schema conversions
 */
export declare function createConversionValidator<TApp extends object, TFirestore extends object>(firestoreSchema: z.ZodType<TFirestore>, appSchema: z.ZodType<TApp>, toFirestore: (app: TApp) => TFirestore, fromFirestore: (firestore: TFirestore) => TApp): {
    validateAppToFirestore: (appData: TApp) => {
        success: boolean;
        stage: string;
        errors: z.ZodError<TApp>;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        stage: string;
        errors: z.ZodError<TFirestore>;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: TFirestore;
        stage?: undefined;
        errors?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        stage: string;
        error: unknown;
        errors?: undefined;
        data?: undefined;
    };
    validateFirestoreToApp: (firestoreData: TFirestore) => {
        success: boolean;
        stage: string;
        errors: z.ZodError<TFirestore>;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        stage: string;
        errors: z.ZodError<TApp>;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: TApp;
        stage?: undefined;
        errors?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        stage: string;
        error: unknown;
        errors?: undefined;
        data?: undefined;
    };
};
