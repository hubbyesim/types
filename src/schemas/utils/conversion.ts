import { FirestoreProvider, isTimestamp } from './firestoreProvider';
import { createFirestoreHelpers } from '../helpers';

// Common interfaces for field mappings
export interface RefFieldMapping<TApp, TFirestore> {
    app: keyof TApp;
    firestore: keyof TFirestore;
    collection: string;
    isArray?: boolean;
    nullable?: boolean;
}

export interface DateFieldMapping<T> {
    field: keyof T;
    nullable?: boolean;
}

// Helper function to convert date-like values to Date
export const convertToDate = (value: unknown): Date => {
    if (value instanceof Date) {
        return value;
    }
    if (typeof value === 'string') {
        return new Date(value);
    }
    if (isTimestamp(value)) {
        return value.toDate();
    }
    throw new Error(`Unable to convert value to Date: ${value}`);
};

// Helper function to safely check if a value is a Date
export const isDate = (value: unknown): value is Date => {
    return value instanceof Date;
};

// Generic conversion function from App to Firestore
export function convertToFirestore<TApp extends Record<string, any>, TFirestore extends Record<string, any>>(
    appData: TApp,
    refFieldMappings: RefFieldMapping<TApp, TFirestore>[],
    dateFieldMappings?: DateFieldMapping<TApp>[],
    firestore?: FirestoreProvider
): TFirestore {
    // Create base object with common fields but exclude reference fields
    const result: Record<string, any> = {};
    const firestoreHelpers = firestore ? createFirestoreHelpers(firestore) : null;

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => String(mapping.app));
    Object.keys(appData).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = appData[key];
        }
    });

    // Handle base model fields
    if (appData.created_at instanceof Date) {
        result.created_at = firestoreHelpers
            ? firestoreHelpers.toFirestore.date(appData.created_at)
            : appData.created_at;
    }

    if (appData.updated_at instanceof Date) {
        result.updated_at = firestoreHelpers
            ? firestoreHelpers.toFirestore.date(appData.updated_at)
            : appData.updated_at;
    }

    result.created_by = typeof appData.created_by === 'string' ? appData.created_by : null;
    result.updated_by = typeof appData.updated_by === 'string' ? appData.updated_by : null;

    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = appData[field];
            if (nullable && value === null) {
                result[String(field)] = null;
            } else if (isDate(value)) {
                result[String(field)] = firestoreHelpers
                    ? firestoreHelpers.toFirestore.date(value)
                    : value;
            }
        });
    }

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = appData[app];
        const firestoreKey = String(firestore);

        if (isArray) {
            if (nullable && value === null) {
                result[firestoreKey] = null;
            } else if (Array.isArray(value)) {
                if (firestoreHelpers) {
                    result[firestoreKey] = value.map((id: string) =>
                        firestoreHelpers.toFirestore.ref(collection, id));
                } else {
                    result[firestoreKey] = value; // Pass through if no Firestore provider
                }
            }
        } else {
            if (nullable && value === null) {
                result[firestoreKey] = null;
            } else if (typeof value === 'string') {
                if (firestoreHelpers) {
                    result[firestoreKey] = firestoreHelpers.toFirestore.ref(collection, value);
                } else {
                    result[firestoreKey] = value; // Pass through if no Firestore provider
                }
            }
        }
    });

    return result as unknown as TFirestore;
}

// Generic conversion function from Firestore to App
export function convertFromFirestore<TFirestore extends Record<string, any>, TApp extends Record<string, any>>(
    firestoreData: TFirestore,
    refFieldMappings: RefFieldMapping<TApp, TFirestore>[],
    dateFieldMappings?: DateFieldMapping<TFirestore>[],
    specialCaseHandler?: (result: Record<string, any>, firestoreData: TFirestore) => void
): TApp {
    // Create base object excluding reference fields that will be handled separately
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => String(mapping.firestore));
    Object.keys(firestoreData).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = firestoreData[key];
        }
    });

    // Handle base model fields
    if (isTimestamp(firestoreData.created_at)) {
        result.created_at = firestoreData.created_at.toDate();
    } else if (firestoreData.created_at instanceof Date) {
        result.created_at = firestoreData.created_at;
    }

    if (isTimestamp(firestoreData.updated_at)) {
        result.updated_at = firestoreData.updated_at.toDate();
    } else if (firestoreData.updated_at instanceof Date) {
        result.updated_at = firestoreData.updated_at;
    }

    result.created_by = typeof firestoreData.created_by === 'string'
        ? firestoreData.created_by
        : firestoreData.created_by && typeof firestoreData.created_by === 'object' && 'id' in firestoreData.created_by
            ? firestoreData.created_by.id
            : null;

    result.updated_by = typeof firestoreData.updated_by === 'string'
        ? firestoreData.updated_by
        : firestoreData.updated_by && typeof firestoreData.updated_by === 'object' && 'id' in firestoreData.updated_by
            ? firestoreData.updated_by.id
            : null;

    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = firestoreData[field];
            const fieldName = String(field);

            if (nullable && value === null) {
                result[fieldName] = null;
            } else {
                try {
                    result[fieldName] = convertToDate(value);
                } catch (error) {
                    console.warn(`Failed to convert field ${fieldName} to Date: ${error}`);
                    result[fieldName] = value; // Keep original value on error
                }
            }
        });
    }

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, isArray, nullable }) => {
        const value = firestoreData[firestore];
        const appKey = String(app);

        if (isArray) {
            if (nullable && value === null) {
                result[appKey] = null;
            } else if (Array.isArray(value)) {
                result[appKey] = value.map((ref: unknown) => {
                    if (typeof ref === 'string') return ref;
                    return ref && typeof ref === 'object' && 'id' in ref ? ref.id : null;
                }).filter(Boolean);
            }
        } else {
            if (nullable && value === null) {
                result[appKey] = null;
            } else if (value) {
                if (typeof value === 'string') {
                    result[appKey] = value;
                } else if (typeof value === 'object' && value !== null && 'id' in value) {
                    result[appKey] = value.id;
                } else {
                    result[appKey] = null;
                }
            }
        }
    });

    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreData);
    }

    return result as unknown as TApp;
} 