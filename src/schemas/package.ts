import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    GenericRefFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import {
    COUNTRY_COLLECTION,
    PARTNER_COLLECTION
} from './utils/collections';
import { countryFirestoreSchema, CountryFirestore, CountryApp } from './country';
import { DocumentReference } from 'firebase-admin/firestore';
import { 
    countryRefSchema, 
    partnerRefNullable,
    countryRefString,
    partnerRefStringNullable
} from './refs';

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
    partner: partnerRefNullable,
});

// App schema for Package
export const packageAppSchema = baseModelAppSchema.extend({
    ...commonPackageFields,
    country: countryRefString,
    partner: partnerRefStringNullable,
});

// Define types based on schemas
export type PackageFirestore = z.infer<typeof packageFirestoreSchema>;
export type PackageApp = z.infer<typeof packageAppSchema>;

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
export type HPackage = PackageApp; 