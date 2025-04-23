import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
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
    PARTNER_COLLECTION,
    PROMO_CODE_COLLECTION,
    USER_COLLECTION,
    ESIM_COLLECTION
} from './utils/collections';
import { SupportedLocales, SUPPORTED_LOCALES, supportedLocalesSchema } from '../constants';
import { DocumentReference, DocumentData, Timestamp } from 'firebase/firestore';
import { 
    partnerRefSchema, 
    promoCodeRefArray, 
    userRefArrayNullable, 
    esimRefArrayNullable,
    partnerRefString,
    promoCodeRefStringArray,
    userRefStringArrayNullable,
    esimRefStringArrayNullable
} from './refs';

// Enum for communication channels
export const communicationChannelSchema = z.enum([
    'EMAIL',
    'WHATSAPP',
    'PUSH_NOTIFICATION',
    'SMS'
]);
export type CommunicationChannelType = z.infer<typeof communicationChannelSchema>;

// For backward compatibility
export type CommunicationChannel = CommunicationChannelType;

// Add enum-like object for use in code
export const CommunicationChannel = {
    EMAIL: 'EMAIL' as const,
    WHATSAPP: 'WHATSAPP' as const,
    PUSH_NOTIFICATION: 'PUSH_NOTIFICATION' as const,
    SMS: 'SMS' as const
} as const;

// Schema for communication options
export const communicationOptionsSchema = z.object({
    should_send_message: z.boolean(),
    channels: z.array(communicationChannelSchema)
});

// Status type for bookings
export const bookingStatusSchema = z.enum([
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'UNPAID',
    'EXPIRED'
]);
export type BookingStatus = z.infer<typeof bookingStatusSchema>;

// Common booking fields shared between Firestore and App schemas
const commonBookingFields = {
    title: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    full_name: z.string(),
    pax: z.number(),
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
    booking_id: z.string().nullable(),
    flight_number: z.string().optional(),
    gender: z.enum(['M', 'F', 'O']).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    locale: supportedLocalesSchema,
    status: bookingStatusSchema,
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }),
    communication_options: communicationOptionsSchema,
    is_processed_for_esim_restoration: z.boolean(),
    is_pseudonymized: z.boolean(),
    import_id: z.string().nullable().optional(),
    package_specifications: z.record(z.any()).optional()
};

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

// App schema for Booking
export const bookingAppSchema = baseModelAppSchema.extend({
    ...commonBookingFields,
    return_date: z.date().nullable(),
    departure_date: z.date(),
    partner: partnerRefString,
    promo_codes: promoCodeRefStringArray,
    users: userRefStringArrayNullable,
    esims: esimRefStringArrayNullable,
});

// Define types based on schemas
export type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;
export type BookingApp = z.infer<typeof bookingAppSchema>;
export type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;

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
export type HBooking = BookingApp; 