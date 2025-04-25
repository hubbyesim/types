import { Timestamp } from 'firebase/firestore';
import { toFirestore, fromFirestore } from '../helpers';

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
    if (value && typeof (value as any).toDate === 'function') {
        return (value as Timestamp).toDate();
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
    dateFieldMappings?: DateFieldMapping<TApp>[]
): TFirestore {
    // Create base object with common fields but exclude reference fields
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => String(mapping.app));
    Object.keys(appData).forEach(key => {
        if (!refFieldNames.includes(key)) {
            result[key] = appData[key];
        }
    });

    // Handle base model fields
    result.created_at = toFirestore.date(appData.created_at);
    result.updated_at = toFirestore.date(appData.updated_at);
    result.created_by = typeof appData.created_by === 'string' ? appData.created_by : null;
    result.updated_by = typeof appData.updated_by === 'string' ? appData.updated_by : null;

    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = appData[field];
            if (nullable && value === null) {
                result[String(field)] = null;
            } else if (isDate(value)) {
                result[String(field)] = toFirestore.date(value);
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
                result[firestoreKey] = value.map((id: string) => toFirestore.ref<any>(collection, id));
            }
        } else {
            if (nullable && value === null) {
                result[firestoreKey] = null;
            } else if (typeof value === 'string') {
                result[firestoreKey] = toFirestore.ref<any>(collection, value);
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
    result.created_at = fromFirestore.date(firestoreData.created_at);
    result.updated_at = fromFirestore.date(firestoreData.updated_at);
    result.created_by = typeof firestoreData.created_by === 'string'
        ? firestoreData.created_by
        : firestoreData.created_by ? fromFirestore.ref(firestoreData.created_by) : null;
    result.updated_by = typeof firestoreData.updated_by === 'string'
        ? firestoreData.updated_by
        : firestoreData.updated_by ? fromFirestore.ref(firestoreData.updated_by) : null;

    // Convert date fields
    if (dateFieldMappings) {
        dateFieldMappings.forEach(({ field, nullable }) => {
            const value = firestoreData[field];
            const fieldName = String(field);

            if (nullable && value === null) {
                result[fieldName] = null;
            } else {
                result[fieldName] = convertToDate(value);
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
                result[appKey] = value.map((ref: unknown) => fromFirestore.ref(ref as any));
            }
        } else {
            if (nullable && value === null) {
                result[appKey] = null;
            } else if (value) {
                result[appKey] = fromFirestore.ref(value as any);
            }
        }
    });

    // Apply any special case handling
    if (specialCaseHandler) {
        specialCaseHandler(result, firestoreData);
    }

    return result as unknown as TApp;
} 