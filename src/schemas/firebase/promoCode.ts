import { z } from 'zod';
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
    PROMO_CODE_COLLECTION,
    PARTNER_COLLECTION,
    COUNTRY_COLLECTION,
    PACKAGE_COLLECTION,
    BOOKING_COLLECTION
} from './utils/collections';
import { packageSpecificationSchema } from './api';
import {
    partnerRefNullable,
    countryRefNullable,
    packageRefNullable,
    bookingRefNullable
} from './refs';

// Import base schemas
import {
    PromoCodeApp
} from '../base/promoCode';

// Re-export base schemas
export * from '../base/promoCode';

// Firestore schema for PromoCode
export const promoCodeFirestoreSchema = baseModelSchema.extend({
    external_id: z.string(),
    code: z.string(),
    allowance_user: z.number(),
    allowance_total: z.number(),
    type: z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(z.string()),
    usage: z.array(z.string()),
    uuid_usage: z.array(z.string()),
    package_specification: packageSpecificationSchema.optional(),
    partner: partnerRefNullable,
    valid_from: z.union([z.string(), z.date(), timestampSchema]),
    valid_to: z.union([z.string(), z.date(), timestampSchema]),

    // Optional fields based on the type
    discount: z.number().optional(),
    package_size: z.string().optional(),
    package: packageRefNullable,
    country: countryRefNullable,
    booking: bookingRefNullable,
    countries: z.array(z.string()).optional(),
    max_bytes: z.number().optional(),
    starter_data: z.number().optional()
});

// Type definition
export type PromoCodeFirestore = z.infer<typeof promoCodeFirestoreSchema>;

// Field mapping for conversions
const refFieldMappings: GenericRefFieldMapping<PromoCodeApp, PromoCodeFirestore>[] = [
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'package', firestore: 'package', collection: PACKAGE_COLLECTION, nullable: true },
    { app: 'country', firestore: 'country', collection: COUNTRY_COLLECTION, nullable: true },
    { app: 'booking', firestore: 'booking', collection: BOOKING_COLLECTION, nullable: true }
];

const dateFieldMappings: GenericDateFieldMapping<PromoCodeApp, PromoCodeFirestore>[] = [
    { field: 'valid_from' },
    { field: 'valid_to' }
];

// Conversion functions
export const promoCodeToFirestore = (promoCode: PromoCodeApp): PromoCodeFirestore => {
    return genericToFirestore({
        appObject: promoCode,
        refFieldMappings,
        dateFieldMappings
    });
};

export const promoCodeFromFirestore = (firestorePromoCode: PromoCodeFirestore): PromoCodeApp => {
    return genericFromFirestore({
        firestoreObject: firestorePromoCode,
        refFieldMappings,
        dateFieldMappings
    });
};

// For backwards compatibility
export type PromoCode = PromoCodeFirestore; 