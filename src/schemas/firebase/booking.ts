import { z } from 'zod';
import { DocumentReference, DocumentData, Timestamp } from 'firebase/firestore';
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
    PARTNER_COLLECTION,
    PROMO_CODE_COLLECTION,
    USER_COLLECTION,
    ESIM_COLLECTION
} from './utils/collections';
import {
    partnerRefSchema,
    promoCodeRefArray,
    userRefArrayNullable,
    esimRefArrayNullable
} from './refs';

// Import base schemas and types
import {
    commonBookingFields,
    BookingApp,
    communicationChannelSchema,
    CommunicationChannelType,
    communicationOptionsSchema,
    bookingStatusSchema,
    BookingStatus,
    CommunicationOptions
} from '../base/booking';

// Re-export base types and constants
export * from '../base/booking';

// Firestore schema for Booking
export const bookingFirestoreSchema = baseModelSchema.extend({
    ...commonBookingFields,
    return_date: timestampSchema.nullable(),
    departure_date: timestampSchema,
    partner: partnerRefSchema.schema,
    promo_codes: promoCodeRefArray,
    users: userRefArrayNullable,
    esims: esimRefArrayNullable,
});

// Define types based on schemas
export type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;

// Field mapping types for conversions
const refFieldMappings: GenericRefFieldMapping<BookingApp, BookingFirestore>[] = [
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION },
    { app: 'promo_codes', firestore: 'promo_codes', collection: PROMO_CODE_COLLECTION, isArray: true },
    { app: 'users', firestore: 'users', collection: USER_COLLECTION, isArray: true, nullable: true },
    { app: 'esims', firestore: 'esims', collection: ESIM_COLLECTION, isArray: true, nullable: true }
];

const dateFieldMappings: GenericDateFieldMapping<BookingApp, BookingFirestore>[] = [
    { field: 'return_date', nullable: true },
    { field: 'departure_date' }
];

// Conversion functions
export const bookingToFirestore = (booking: BookingApp): BookingFirestore => {
    return genericToFirestore({
        appObject: booking,
        refFieldMappings,
        dateFieldMappings
    });
};

export const bookingFromFirestore = (firestoreBooking: BookingFirestore): BookingApp => {
    return genericFromFirestore({
        firestoreObject: firestoreBooking,
        refFieldMappings,
        dateFieldMappings
    });
};

// For backwards compatibility
export type Booking = BookingFirestore; 