import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    documentRefSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import { countryFirestoreSchema, CountryFirestore, CountryApp } from './country';
import { DocumentReference } from 'firebase-admin/firestore';

// Define collection paths
export const COUNTRY_COLLECTION = 'countries';
export const PARTNER_COLLECTION = 'partners';

// Define document reference schemas
export const countryRefSchema = createDocRefSchema<CountryFirestore>(COUNTRY_COLLECTION);
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);

// Common package fields shared between Firestore and App schemas
const commonPackageFields = {
    external_id: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable(),
    label: z.string(),
    bytes: z.number(),
    hidden: z.boolean(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    country_data: countryFirestoreSchema.nullable(),
    price: z.number(),
    partner_price: z.number(),
    days: z.number(),
    name: z.string(),
    type: z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: z.number().optional(),
    provider_parameters: z.object({
        imsi: z.number()
    }).nullable()
};

// Firestore schema for Package
export const packageFirestoreSchema = baseModelSchema.extend({
    ...commonPackageFields,
    country: countryRefSchema.schema,
    partner: partnerRefSchema.schema.nullable(),
});

// App schema for Package
export const packageAppSchema = baseModelAppSchema.extend({
    ...commonPackageFields,
    countryId: docRefToStringSchema(countryRefSchema),
    partnerId: z.string().nullable(),
});

// Define types based on schemas
export type PackageFirestore = z.infer<typeof packageFirestoreSchema>;
export type PackageApp = z.infer<typeof packageAppSchema>;

// Field mapping for conversions
interface RefFieldMapping {
    app: keyof PackageApp;
    firestore: keyof PackageFirestore;
    collection: string;
    nullable?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'countryId', firestore: 'country', collection: COUNTRY_COLLECTION },
    { app: 'partnerId', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true }
];

// Conversion functions
export const packageToFirestore = (packageData: PackageApp): PackageFirestore => {
    // Create base object with common fields
    const result = { ...packageData } as unknown as Record<string, any>;
    
    // Handle base model fields
    result.created_at = toFirestore.date(packageData.created_at);
    result.updated_at = toFirestore.date(packageData.updated_at);
    result.created_by = typeof packageData.created_by === 'string' ? packageData.created_by : null;
    result.updated_by = typeof packageData.updated_by === 'string' ? packageData.updated_by : null;
    
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = packageData[app];
        
        if (nullable && value === null) {
            result[firestore] = null;
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }
        
        // Delete app field to avoid duplication
        delete result[app];
    });
    
    return result as unknown as PackageFirestore;
};

export const packageFromFirestore = (firestorePackage: PackageFirestore): PackageApp => {
    // Create base object with common fields
    const result = { ...firestorePackage } as unknown as Record<string, any>;
    
    // Handle base model fields
    result.created_at = fromFirestore.date(firestorePackage.created_at);
    result.updated_at = fromFirestore.date(firestorePackage.updated_at);
    result.created_by = typeof firestorePackage.created_by === 'string'
        ? firestorePackage.created_by
        : firestorePackage.created_by ? fromFirestore.ref(firestorePackage.created_by) : null;
    result.updated_by = typeof firestorePackage.updated_by === 'string'
        ? firestorePackage.updated_by
        : firestorePackage.updated_by ? fromFirestore.ref(firestorePackage.updated_by) : null;
    
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestorePackage[firestore];
        
        if (nullable && value === null) {
            result[app] = null;
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }
        
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    
    return result as unknown as PackageApp;
};

// For backwards compatibility
export type Package = PackageApp; 