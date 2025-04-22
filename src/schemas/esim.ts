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
import {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import {
    COUNTRY_COLLECTION,
    USER_COLLECTION,
    PARTNER_COLLECTION,
    PAYMENT_COLLECTION
} from './utils/collections';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

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

// Field mapping for conversions
const refFieldMappings: GenericRefFieldMapping<ESIMApp, ESIMFirestore>[] = [
    { app: 'country', firestore: 'country', collection: COUNTRY_COLLECTION, nullable: true },
    { app: 'user', firestore: 'user', collection: USER_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'payment', firestore: 'payment', collection: PAYMENT_COLLECTION, nullable: true }
];

const dateFieldMappings: GenericDateFieldMapping<ESIMApp, ESIMFirestore>[] = [
    { field: 'time_assigned', nullable: true },
    { field: 'last_updated', nullable: true }
];

// Conversion functions
export const esimToFirestore = (esim: ESIMApp): ESIMFirestore => {
    return genericToFirestore({
        appObject: esim,
        refFieldMappings,
        dateFieldMappings
    });
};

export const esimFromFirestore = (firestoreEsim: ESIMFirestore): ESIMApp => {
    return genericFromFirestore({
        firestoreObject: firestoreEsim,
        refFieldMappings,
        dateFieldMappings
    });
};

// For backwards compatibility
export type ESIM = ESIMFirestore;
export type HESIM = ESIMApp; 