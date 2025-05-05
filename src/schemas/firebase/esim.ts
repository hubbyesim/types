import { z } from 'zod';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    timestampSchema
} from './core';
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
import {
    countryRefNullable,
    userRefNullable,
    partnerRefNullable,
    paymentRefNullable
} from './refs';

// Import base schemas
import {
    commonESIMFields,
    ESIMApp
} from '../base/esim';

// Re-export base schemas
export * from '../base/esim';

// Firestore schema for ESIM
export const esimFirestoreSchema = baseModelSchema.extend({
    ...commonESIMFields,
    country: countryRefNullable,
    time_assigned: timestampSchema.nullable(),
    last_updated: timestampSchema.nullable(),
    partner: partnerRefNullable,
});

// Define types based on schemas
export type ESIMFirestore = z.infer<typeof esimFirestoreSchema>;

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