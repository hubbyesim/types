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

// Define collection paths
export const COUNTRY_COLLECTION = 'countries';
export const PARTNER_COLLECTION = 'partners';

// Define document reference schemas
export const countryRefSchema = createDocRefSchema<CountryFirestore>(COUNTRY_COLLECTION);
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);

// Firestore schema for Package
export const packageFirestoreSchema = baseModelSchema.extend({
    external_id: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable(),
    label: z.string(),
    bytes: z.number(),
    country: countryRefSchema.schema,
    hidden: z.boolean(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    country_data: countryFirestoreSchema.nullable(),
    price: z.number(),
    partner_price: z.number(),
    days: z.number(),
    partner: partnerRefSchema.schema.nullable(),
    name: z.string(),
    type: z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: z.number().optional(),
    provider_parameters: z.object({
        imsi: z.number()
    }).nullable()
});

// App schema for Package
export const packageAppSchema = baseModelAppSchema.extend({
    external_id: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable(),
    label: z.string(),
    bytes: z.number(),
    countryId: docRefToStringSchema(countryRefSchema),
    hidden: z.boolean(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    country_data: countryFirestoreSchema.nullable(),
    price: z.number(),
    partner_price: z.number(),
    days: z.number(),
    partnerId: z.string().nullable(),
    name: z.string(),
    type: z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: z.number().optional(),
    provider_parameters: z.object({
        imsi: z.number()
    }).nullable()
});

// Define types based on schemas
export type PackageFirestore = z.infer<typeof packageFirestoreSchema>;
export type PackageApp = z.infer<typeof packageAppSchema>;

// Conversion functions
export const packageToFirestore = (packageData: PackageApp): PackageFirestore => {
    return {
        id: packageData.id,
        created_at: toFirestore.date(packageData.created_at),
        updated_at: toFirestore.date(packageData.updated_at),
        created_by: typeof packageData.created_by === 'string' ? packageData.created_by : null,
        updated_by: typeof packageData.updated_by === 'string' ? packageData.updated_by : null,
        external_id: packageData.external_id,
        provider: packageData.provider,
        coverage_label: packageData.coverage_label,
        label: packageData.label,
        bytes: packageData.bytes,
        country: toFirestore.ref<CountryFirestore>(COUNTRY_COLLECTION, packageData.countryId),
        hidden: packageData.hidden,
        is_hidden: packageData.is_hidden,
        is_active: packageData.is_active,
        priority: packageData.priority,
        country_data: packageData.country_data,
        price: packageData.price,
        partner_price: packageData.partner_price,
        days: packageData.days,
        partner: packageData.partnerId
            ? toFirestore.ref<any>(PARTNER_COLLECTION, packageData.partnerId)
            : null,
        name: packageData.name,
        type: packageData.type,
        throttling: packageData.throttling,
        provider_parameters: packageData.provider_parameters
    };
};

export const packageFromFirestore = (firestorePackage: PackageFirestore): PackageApp => {
    return {
        id: firestorePackage.id,
        created_at: fromFirestore.date(firestorePackage.created_at),
        updated_at: fromFirestore.date(firestorePackage.updated_at),
        created_by: typeof firestorePackage.created_by === 'string'
            ? firestorePackage.created_by
            : firestorePackage.created_by ? fromFirestore.ref(firestorePackage.created_by) : null,
        updated_by: typeof firestorePackage.updated_by === 'string'
            ? firestorePackage.updated_by
            : firestorePackage.updated_by ? fromFirestore.ref(firestorePackage.updated_by) : null,
        external_id: firestorePackage.external_id,
        provider: firestorePackage.provider,
        coverage_label: firestorePackage.coverage_label,
        label: firestorePackage.label,
        bytes: firestorePackage.bytes,
        countryId: fromFirestore.ref(firestorePackage.country),
        hidden: firestorePackage.hidden,
        is_hidden: firestorePackage.is_hidden,
        is_active: firestorePackage.is_active,
        priority: firestorePackage.priority,
        country_data: firestorePackage.country_data,
        price: firestorePackage.price,
        partner_price: firestorePackage.partner_price,
        days: firestorePackage.days,
        partnerId: firestorePackage.partner ? fromFirestore.ref(firestorePackage.partner) : null,
        name: firestorePackage.name,
        type: firestorePackage.type,
        throttling: firestorePackage.throttling,
        provider_parameters: firestorePackage.provider_parameters
    };
};

// For backwards compatibility
export type Package = PackageApp; 