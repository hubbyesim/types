import { toFirestore, fromFirestore } from './firebase/helpers';
// Import nested conversions
import {
    processNestedFieldsToFirestore,
    processNestedFieldsFromFirestore,
    NestedFieldPathMapping
} from './utils/nested-conversions';

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
export const convertToDate = (value: any, field: string): Date => {
    if (typeof value === 'string') {
        return new Date(value);
    }
    if (value && typeof value === 'object' && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Unable to convert value to Date: ${value} for field: ${field}`);
};

export const isDate = (value: any): value is Date => {
    return value && typeof value === 'object' && 'getTime' in value;
};

// Generic toFirestore conversion function
export function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({
    appObject,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler,
    nestedFieldMappings
}: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
    nestedFieldMappings?: NestedFieldPathMapping[];
}): FirestoreType {
    // Create base object with common fields but exclude reference fields
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.app);
    Object.keys(appObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof AppType)) {
            // Only copy non-undefined values
            if (appObject[key as keyof AppType] !== undefined) {
                result[key] = appObject[key as keyof AppType];
            }
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

    // Process nested fields if provided
    if (nestedFieldMappings && nestedFieldMappings.length > 0) {
        processNestedFieldsToFirestore(result, nestedFieldMappings);

        // Special case for pricing_strategies.user and pricing_strategies.partner
        if (result.financial_properties && result.financial_properties.pricing_strategies) {
            const appPricingStrategies = appObject.financial_properties?.pricing_strategies;

            // If the financial_properties.pricing_strategies.user is undefined or doesn't have key 'user', delete it
            if (!appPricingStrategies?.user || Object.keys(appPricingStrategies?.user || {}).length === 0) {
                delete result.financial_properties.pricing_strategies.user;
            }

            // If the financial_properties.pricing_strategies.partner is undefined or doesn't have key 'partner', delete it
            if (!appPricingStrategies?.partner || Object.keys(appPricingStrategies?.partner || {}).length === 0) {
                delete result.financial_properties.pricing_strategies.partner;
            }

            // If pricing_strategies object is empty after possible deletions, don't include it
            if (Object.keys(result.financial_properties.pricing_strategies).length === 0) {
                result.financial_properties.pricing_strategies = null;
            }
        }
    }

    return result as unknown as FirestoreType;
}

// Helper function to clean up empty objects in nested structures
function cleanupEmptyObjects(obj: any): any {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(cleanupEmptyObjects).filter(item => item !== undefined);
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
            result[key] = null;
        } else if (typeof value === 'object') {
            // Recursively clean up nested objects
            const cleaned = cleanupEmptyObjects(value);

            // Only include non-empty objects
            if (cleaned !== undefined &&
                (typeof cleaned !== 'object' ||
                    Array.isArray(cleaned) ||
                    Object.keys(cleaned).length > 0)) {
                result[key] = cleaned;
            }
        } else if (value !== undefined) {
            result[key] = value;
        }
    }

    return Object.keys(result).length > 0 ? result : undefined;
}

// Generic fromFirestore conversion function
export function genericFromFirestore<FirestoreType extends Record<string, any>, AppType extends Record<string, any>>({
    firestoreObject,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler,
    nestedFieldMappings
}: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
    nestedFieldMappings?: NestedFieldPathMapping[];
}): AppType {
    // Create base object excluding reference fields that will be handled separately
    const result: Record<string, any> = {};

    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.firestore);
    Object.keys(firestoreObject as Record<string, any>).forEach(key => {
        if (!refFieldNames.includes(key as keyof FirestoreType)) {
            // Only copy non-undefined values
            if (firestoreObject[key as keyof FirestoreType] !== undefined) {
                result[key] = firestoreObject[key as keyof FirestoreType];
            }
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
        if ((nullable && value === null) || value === undefined) {
            result[field as string] = null;
        } else {
            result[field as string] = convertToDate(value, field as string);
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

    // Process nested fields if provided
    if (nestedFieldMappings && nestedFieldMappings.length > 0) {
        processNestedFieldsFromFirestore(result, nestedFieldMappings);

        // Special case for pricing_strategies.user and pricing_strategies.partner
        if (result.financial_properties && result.financial_properties.pricing_strategies) {
            // If the user property doesn't exist in Firestore, make sure it stays undefined
            if (!('user' in firestoreObject.financial_properties.pricing_strategies)) {
                delete result.financial_properties.pricing_strategies.user;
            }

            // If the partner property doesn't exist in Firestore, make sure it stays undefined
            if (!('partner' in firestoreObject.financial_properties.pricing_strategies)) {
                delete result.financial_properties.pricing_strategies.partner;
            }
        }
    }

    // Clean up any empty objects in the result
    if (result.financial_properties && result.financial_properties.pricing_strategies) {
        // Clean up the pricing_strategies object
        if (result.financial_properties.pricing_strategies.user &&
            Object.keys(result.financial_properties.pricing_strategies.user).length === 0) {
            delete result.financial_properties.pricing_strategies.user;
        }

        if (result.financial_properties.pricing_strategies.partner &&
            Object.keys(result.financial_properties.pricing_strategies.partner).length === 0) {
            delete result.financial_properties.pricing_strategies.partner;
        }

        // Special case for the custom_prices property
        if (result.financial_properties.pricing_strategies.user &&
            result.financial_properties.pricing_strategies.user.custom_prices &&
            Object.keys(result.financial_properties.pricing_strategies.user.custom_prices).length === 0) {
            result.financial_properties.pricing_strategies.user.custom_prices = [];
        }

        if (result.financial_properties.pricing_strategies.partner &&
            result.financial_properties.pricing_strategies.partner.custom_prices &&
            Object.keys(result.financial_properties.pricing_strategies.partner.custom_prices).length === 0) {
            result.financial_properties.pricing_strategies.partner.custom_prices = [];
        }
    }

    return result as unknown as AppType;
} 