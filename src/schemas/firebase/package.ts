import { z } from 'zod';
import { DocumentReference } from 'firebase-admin/firestore';
import {
    baseModelSchema
} from './core';
import {
    GenericRefFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import {
    COUNTRY_COLLECTION,
    PARTNER_COLLECTION
} from './utils/collections';
import { countryFirestoreSchema, CountryFirestore } from './country';
import {
    countryRefSchema,
    partnerRefNullable
} from './refs';

// Import base schemas
import {
    PackageApp
} from '../base/package';

// Re-export base schemas
export * from '../base/package';

// Common package fields with Firebase types
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
    partner: partnerRefNullable,
});

// Define types based on schemas
export type PackageFirestore = z.infer<typeof packageFirestoreSchema>;

// Field mapping for conversions
const refFieldMappings: GenericRefFieldMapping<PackageApp, PackageFirestore>[] = [
    { app: 'country', firestore: 'country', collection: COUNTRY_COLLECTION },
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true }
];

// Conversion functions
export const packageToFirestore = (packageData: PackageApp): PackageFirestore => {
    return genericToFirestore({
        appObject: packageData,
        refFieldMappings,
        dateFieldMappings: []
    });
};

export const packageFromFirestore = (firestorePackage: PackageFirestore): PackageApp => {
    return genericFromFirestore({
        firestoreObject: firestorePackage,
        refFieldMappings,
        dateFieldMappings: []
    });
};

// For backwards compatibility
export type Package = PackageFirestore; 