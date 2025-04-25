import { createFirestoreHelpers } from './helpers';
import {
    FirestoreProvider,
    isTimestamp,
    isDocumentReference,
    isFieldValue,
    TimestampLike,
    DocumentReferenceLike,
    FieldValueLike
} from './utils/firestoreProvider';

// Re-export the FirestoreProvider interface and helper functions
export {
    FirestoreProvider,
    isTimestamp,
    isDocumentReference,
    isFieldValue,
    TimestampLike,
    DocumentReferenceLike,
    FieldValueLike
};

// Generic interfaces for field mappings
export interface GenericRefFieldMapping<AppType, FirestoreType> {
    app: keyof AppType;
    firestore: keyof FirestoreType;
    collection: string;
    nullable?: boolean;
    isArray?: boolean;
}

export interface GenericDateFieldMapping<AppType, FirestoreType> {
    field: keyof FirestoreType & keyof AppType;
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

export const isDate = (value: unknown): value is Date => {
    return value instanceof Date;
};

// Generic toFirestore conversion function
export function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({
    appObject,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler,
    firestore
}: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
    firestore?: FirestoreProvider;
}): FirestoreType {
    // Create base object with common fields but exclude reference fields
    const result: Record<string, any> = {};
    const { toFirestore } = firestore ? createFirestoreHelpers(firestore) : { toFirestore: null };

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.app);
    Object.keys(appObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof AppType)) {
            result[key] = appObject[key as keyof AppType];
        }
    });

    // Handle base model fields
    if ('created_at' in appObject && isDate(appObject.created_at)) {
        result.created_at = toFirestore
            ? toFirestore.date(appObject.created_at)
            : appObject.created_at; // Pass through if no Firestore provider
    }

    if ('updated_at' in appObject && isDate(appObject.updated_at)) {
        result.updated_at = toFirestore
            ? toFirestore.date(appObject.updated_at)
            : appObject.updated_at; // Pass through if no Firestore provider
    }

    if ('created_by' in appObject) {
        result.created_by = typeof appObject.created_by === 'string' ? appObject.created_by : null;
    }

    if ('updated_by' in appObject) {
        result.updated_by = typeof appObject.updated_by === 'string' ? appObject.updated_by : null;
    }

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = appObject[field];
        if (nullable && value === null) {
            result[field as string] = null;
        } else if (isDate(value)) {
            result[field as string] = toFirestore
                ? toFirestore.date(value)
                : value; // Pass through if no Firestore provider
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore: firestoreField, collection, isArray, nullable }) => {
        const value = appObject[app];

        if (isArray) {
            if (nullable && value === null) {
                result[firestoreField as string] = null;
            } else if (Array.isArray(value)) {
                if (toFirestore) {
                    result[firestoreField as string] = value.map((id: string) =>
                        toFirestore.ref(collection, id));
                } else {
                    result[firestoreField as string] = value; // Pass through if no Firestore provider
                }
            }
        } else {
            if (nullable && value === null) {
                result[firestoreField as string] = null;
            } else if (typeof value === 'string') {
                if (toFirestore) {
                    result[firestoreField as string] = toFirestore.ref(collection, value);
                } else {
                    result[firestoreField as string] = value; // Pass through if no Firestore provider
                }
            }
        }
    });

    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, appObject);
    }

    return result as unknown as FirestoreType;
}

// Generic fromFirestore conversion function
export function genericFromFirestore<FirestoreType extends Record<string, any>, AppType extends Record<string, any>>({
    firestoreObject,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler,
    firestore
}: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
    firestore?: FirestoreProvider;
}): AppType {
    // Create base object excluding reference fields that will be handled separately
    const result: Record<string, any> = {};
    const { fromFirestore } = firestore ? createFirestoreHelpers(firestore) : { fromFirestore: null };

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.firestore);
    Object.keys(firestoreObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof FirestoreType)) {
            result[key] = firestoreObject[key as keyof FirestoreType];
        }
    });

    // Handle base model fields
    if ('created_at' in firestoreObject) {
        const createdAt = firestoreObject.created_at as unknown;
        result.created_at = isTimestamp(createdAt)
            ? createdAt.toDate()
            : createdAt instanceof Date ? createdAt : new Date();
    }

    if ('updated_at' in firestoreObject) {
        const updatedAt = firestoreObject.updated_at as unknown;
        result.updated_at = isTimestamp(updatedAt)
            ? updatedAt.toDate()
            : updatedAt instanceof Date ? updatedAt : new Date();
    }

    if ('created_by' in firestoreObject) {
        const createdBy = firestoreObject.created_by;
        if (typeof createdBy === 'string') {
            result.created_by = createdBy;
        } else if (createdBy && 'id' in createdBy && typeof createdBy.id === 'string') {
            result.created_by = createdBy.id;
        } else {
            result.created_by = null;
        }
    }

    if ('updated_by' in firestoreObject) {
        const updatedBy = firestoreObject.updated_by;
        if (typeof updatedBy === 'string') {
            result.updated_by = updatedBy;
        } else if (updatedBy && 'id' in updatedBy && typeof updatedBy.id === 'string') {
            result.updated_by = updatedBy.id;
        } else {
            result.updated_by = null;
        }
    }

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreObject[field];
        if (nullable && value === null) {
            result[field as string] = null;
        } else {
            try {
                result[field as string] = convertToDate(value);
            } catch (error) {
                console.warn(`Failed to convert field ${String(field)} to Date: ${error}`);
                result[field as string] = value; // Keep original value on error
            }
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore: firestoreField, nullable, isArray }) => {
        const value = firestoreObject[firestoreField];

        if (isArray) {
            if (nullable && value === null) {
                result[app as string] = null;
            } else if (Array.isArray(value)) {
                result[app as string] = value.map((ref: any) => {
                    if (typeof ref === 'string') return ref;
                    return ref && 'id' in ref ? ref.id : null;
                }).filter(Boolean);
            }
        } else {
            if (nullable && value === null) {
                result[app as string] = null;
            } else if (value) {
                if (typeof value === 'string') {
                    result[app as string] = value;
                } else if ('id' in value && typeof value.id === 'string') {
                    result[app as string] = value.id;
                } else {
                    result[app as string] = null;
                }
            }
        }
    });

    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreObject);
    }

    return result as unknown as AppType;
} 