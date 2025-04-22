"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = createValidator;
exports.createConversionValidator = createConversionValidator;
const zod_1 = require("zod");
/**
 * Creates a validation function for a Zod schema
 * Used to easily validate data against a schema and handle errors in a consistent way
 *
 * @param schema The Zod schema to validate against
 * @param schemaName Name of the schema for better error messages
 * @returns A validation function that returns a result object
 */
function createValidator(schema, schemaName) {
    return (data) => {
        try {
            const validData = schema.parse(data);
            return {
                success: true,
                data: validData
            };
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return {
                    success: false,
                    errors: error,
                    message: `${schemaName} validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
                };
            }
            return {
                success: false,
                message: `Unknown error validating ${schemaName}: ${String(error)}`
            };
        }
    };
}
/**
 * Creates functions to validate data conversion between Firestore and App schemas
 *
 * @param firestoreSchema The Firestore schema
 * @param appSchema The App schema
 * @param toFirestore Function to convert from app to firestore format
 * @param fromFirestore Function to convert from firestore to app format
 * @returns Validation functions for schema conversions
 */
function createConversionValidator(firestoreSchema, appSchema, toFirestore, fromFirestore) {
    return {
        validateAppToFirestore: (appData) => {
            // Validate input app data
            const appResult = appSchema.safeParse(appData);
            if (!appResult.success) {
                return {
                    success: false,
                    stage: 'app-validation',
                    errors: appResult.error
                };
            }
            try {
                // Convert to firestore format
                const firestoreData = toFirestore(appData);
                // Validate converted firestore data
                const firestoreResult = firestoreSchema.safeParse(firestoreData);
                if (!firestoreResult.success) {
                    return {
                        success: false,
                        stage: 'firestore-validation',
                        errors: firestoreResult.error
                    };
                }
                return {
                    success: true,
                    data: firestoreData
                };
            }
            catch (error) {
                return {
                    success: false,
                    stage: 'conversion',
                    error
                };
            }
        },
        validateFirestoreToApp: (firestoreData) => {
            // Validate input firestore data
            const firestoreResult = firestoreSchema.safeParse(firestoreData);
            if (!firestoreResult.success) {
                return {
                    success: false,
                    stage: 'firestore-validation',
                    errors: firestoreResult.error
                };
            }
            try {
                // Convert to app format
                const appData = fromFirestore(firestoreData);
                // Validate converted app data
                const appResult = appSchema.safeParse(appData);
                if (!appResult.success) {
                    return {
                        success: false,
                        stage: 'app-validation',
                        errors: appResult.error
                    };
                }
                return {
                    success: true,
                    data: appData
                };
            }
            catch (error) {
                return {
                    success: false,
                    stage: 'conversion',
                    error
                };
            }
        }
    };
}
