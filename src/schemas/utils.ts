import { toFirestore, fromFirestore } from './firebase/helpers';

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
export const convertToDate = (value: any): Date => {
    if (value && typeof value === 'object' && 'getTime' in value) {
        return value as Date;
    }
    if (typeof value === 'string') {
        return new Date(value);
    }
    if (value && typeof value === 'object' && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Unable to convert value to Date: ${value}`);
};

export const isDate = (value: any): value is Date => {
    return value && typeof value === 'object' && 'getTime' in value;
};

// Generic toFirestore conversion function
export function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({
    appObject,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler
}: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
}): FirestoreType {
    // Create base object with common fields but exclude reference fields
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.app);
    Object.keys(appObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof AppType)) {
            result[key] = appObject[key as keyof AppType];
        }
    });

    // Handle base model fields
    if ('created_at' in appObject && isDate(appObject.created_at)) {
        result.created_at = toFirestore.date(appObject.created_at);
    }

    if ('updated_at' in appObject && isDate(appObject.updated_at)) {
        result.updated_at = toFirestore.date(appObject.updated_at);
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
            result[field as string] = toFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = appObject[app];

        if (isArray) {
            if (nullable && value === null) {
                result[firestore as string] = null;
            } else if (Array.isArray(value)) {
                result[firestore as string] = value.map((id: string) => toFirestore.ref<any>(collection, id));
            }
        } else {
            if (nullable && value === null) {
                result[firestore as string] = null;
            } else if (typeof value === 'string') {
                result[firestore as string] = toFirestore.ref<any>(collection, value);
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
    specialCaseHandler
}: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
}): AppType {
    // Create base object excluding reference fields that will be handled separately
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.firestore);
    Object.keys(firestoreObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof FirestoreType)) {
            result[key] = firestoreObject[key as keyof FirestoreType];
        }
    });

    // Handle base model fields
    if ('created_at' in firestoreObject) {
        result.created_at = fromFirestore.date(firestoreObject.created_at as any);
    }

    if ('updated_at' in firestoreObject) {
        result.updated_at = fromFirestore.date(firestoreObject.updated_at as any);
    }

    if ('created_by' in firestoreObject) {
        const createdBy = firestoreObject.created_by;
        result.created_by = typeof createdBy === 'string'
            ? createdBy
            : createdBy ? fromFirestore.ref(createdBy as any) : null;
    }

    if ('updated_by' in firestoreObject) {
        const updatedBy = firestoreObject.updated_by;
        result.updated_by = typeof updatedBy === 'string'
            ? updatedBy
            : updatedBy ? fromFirestore.ref(updatedBy as any) : null;
    }

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreObject[field];
        if (nullable && value === null) {
            result[field as string] = null;
        } else {
            result[field as string] = convertToDate(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable, isArray }) => {
        const value = firestoreObject[firestore];

        if (isArray) {
            if (nullable && value === null) {
                result[app as string] = null;
            } else if (Array.isArray(value)) {
                result[app as string] = value.map((ref: any) => fromFirestore.ref(ref));
            }
        } else {
            if (nullable && value === null) {
                result[app as string] = null;
            } else if (value) {
                result[app as string] = fromFirestore.ref(value as any);
            }
        }
    });

    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreObject);
    }

    return result as unknown as AppType;
} 