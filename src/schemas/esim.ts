import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

// Define collection paths
export const COUNTRY_COLLECTION = 'countries';
export const USER_COLLECTION = 'users';
export const PARTNER_COLLECTION = 'partners';
export const PAYMENT_COLLECTION = 'payments';

// Define document reference schemas
export const countryRefSchema = createDocRefSchema<any>(COUNTRY_COLLECTION);
export const userRefSchema = createDocRefSchema<any>(USER_COLLECTION);
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const paymentRefSchema = createDocRefSchema<any>(PAYMENT_COLLECTION);

// Common fields shared between Firestore and App schemas
const commonESIMFields = {
    imsi: z.number(),
    qr: z.string(),
    iccid: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable().optional(),
    total_data: z.number().nullable(),
    data_left: z.number().nullable(),
    data_used: z.boolean().nullable(),
    status: z.string().nullable(),
    name: z.string(),
    android_auto: z.boolean(),
    partner_price: z.number().nullable(),
    promo: z.string().nullable(),
    type: z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    is_auto_install: z.boolean(),
    is_archived: z.boolean(),
    apn: z.string().nullable()
};

// Firestore schema for ESIM
export const esimFirestoreSchema = baseModelSchema.extend({
    ...commonESIMFields,
    country: countryRefSchema.schema.nullable(),
    user: userRefSchema.schema.nullable(),
    time_assigned: timestampSchema.nullable(),
    last_updated: timestampSchema.nullable(),
    partner: partnerRefSchema.schema.nullable(),
    payment: paymentRefSchema.schema.nullable(),
});

// App schema for ESIM
export const esimAppSchema = baseModelAppSchema.extend({
    ...commonESIMFields,
    country: z.string().nullable(),
    user: z.string().nullable(),
    time_assigned: z.date().nullable(),
    last_updated: z.date().nullable(),
    partner: z.string().nullable(),
    payment: z.string().nullable(),
});

// Define types based on schemas
export type ESIMFirestore = z.infer<typeof esimFirestoreSchema>;
export type ESIMApp = z.infer<typeof esimAppSchema>;

// Field mapping types for conversions
interface RefFieldMapping {
    app: keyof ESIMApp;
    firestore: keyof ESIMFirestore;
    collection: string;
    nullable: boolean;
}

interface DateFieldMapping {
    field: 'time_assigned' | 'last_updated';
    nullable: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'country', firestore: 'country', collection: COUNTRY_COLLECTION, nullable: true },
    { app: 'user', firestore: 'user', collection: USER_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'payment', firestore: 'payment', collection: PAYMENT_COLLECTION, nullable: true }
];

const dateFieldMappings: DateFieldMapping[] = [
    { field: 'time_assigned', nullable: true },
    { field: 'last_updated', nullable: true }
];

// Conversion functions
export const esimToFirestore = (esim: ESIMApp): ESIMFirestore => {
    // Create base object with common fields
    const result = { ...esim } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = toFirestore.date(esim.created_at);
    result.updated_at = toFirestore.date(esim.updated_at);
    result.created_by = typeof esim.created_by === 'string' ? esim.created_by : null;
    result.updated_by = typeof esim.updated_by === 'string' ? esim.updated_by : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = esim[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Date) {
            result[field] = toFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = esim[app];

        if (nullable && value === null) {
            result[firestore] = null;
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }

        // Delete app field to avoid duplication
        delete result[app];
    });

    return result as unknown as ESIMFirestore;
};

export const esimFromFirestore = (firestoreEsim: ESIMFirestore): ESIMApp => {
    // Create base object with common fields
    const result = { ...firestoreEsim } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = fromFirestore.date(firestoreEsim.created_at);
    result.updated_at = fromFirestore.date(firestoreEsim.updated_at);
    result.created_by = typeof firestoreEsim.created_by === 'string'
        ? firestoreEsim.created_by
        : firestoreEsim.created_by ? fromFirestore.ref(firestoreEsim.created_by) : null;
    result.updated_by = typeof firestoreEsim.updated_by === 'string'
        ? firestoreEsim.updated_by
        : firestoreEsim.updated_by ? fromFirestore.ref(firestoreEsim.updated_by) : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreEsim[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Timestamp) {
            result[field] = fromFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestoreEsim[firestore];

        if (nullable && value === null) {
            result[app] = null;
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }

        // Delete firestore field to avoid duplication
        delete result[firestore];
    });

    return result as unknown as ESIMApp;
};

// For backwards compatibility
export type ESIM = ESIMFirestore;
export type HESIM = ESIMApp; 