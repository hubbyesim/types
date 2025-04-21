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
import { SupportedLocales, SUPPORTED_LOCALES } from '../constants';
import { DocumentReference, DocumentData, Timestamp } from 'firebase/firestore';

// Define collection paths
export const PARTNER_COLLECTION = 'partners';
export const PROMO_CODE_COLLECTION = 'promoCodes';
export const USER_COLLECTION = 'users';
export const ESIM_COLLECTION = 'esims';

// Define document reference schemas for related collections
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const promoCodeRefSchema = createDocRefSchema<any>(PROMO_CODE_COLLECTION);
export const userRefSchema = createDocRefSchema<any>(USER_COLLECTION);
export const esimRefSchema = createDocRefSchema<any>(ESIM_COLLECTION);

// Enum for communication channels
export const communicationChannelSchema = z.enum([
    'EMAIL',
    'WHATSAPP',
    'PUSH_NOTIFICATION',
    'SMS'
]);
export type CommunicationChannel = z.infer<typeof communicationChannelSchema>;

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
    locale: z.enum(SUPPORTED_LOCALES),
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
    promo_codes: z.array(promoCodeRefSchema.schema),
    users: z.array(userRefSchema.schema).nullable(),
    esims: z.array(esimRefSchema.schema).nullable(),
});

// App schema for Booking
export const bookingAppSchema = baseModelAppSchema.extend({
    ...commonBookingFields,
    return_date: z.date().nullable(),
    departure_date: z.date(),
    partner: docRefToStringSchema(partnerRefSchema),
    promo_codes: z.array(docRefToStringSchema(promoCodeRefSchema)),
    users: z.array(z.string()).nullable(),
    esims: z.array(z.string()).nullable(),
});

// Define types based on schemas
export type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;
export type BookingApp = z.infer<typeof bookingAppSchema>;
export type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;

// Field mapping types for conversions
interface DateFieldMapping {
    field: 'return_date' | 'departure_date';
    nullable?: boolean;
}

interface RefFieldMapping {
    app: keyof BookingApp;
    firestore: keyof BookingFirestore;
    collection: string;
    isArray?: boolean;
    nullable?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION },
    { app: 'promo_codes', firestore: 'promo_codes', collection: PROMO_CODE_COLLECTION, isArray: true },
    { app: 'users', firestore: 'users', collection: USER_COLLECTION, isArray: true, nullable: true },
    { app: 'esims', firestore: 'esims', collection: ESIM_COLLECTION, isArray: true, nullable: true }
];

const dateFieldMappings: DateFieldMapping[] = [
    { field: 'return_date', nullable: true },
    { field: 'departure_date' }
];

// Conversion functions
export const bookingToFirestore = (booking: BookingApp): BookingFirestore => {
    // Create base object with common fields
    const result = { ...booking } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = toFirestore.date(booking.created_at);
    result.updated_at = toFirestore.date(booking.updated_at);
    result.created_by = typeof booking.created_by === 'string' ? booking.created_by : null;
    result.updated_by = typeof booking.updated_by === 'string' ? booking.updated_by : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = booking[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Date) {
            result[field] = toFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = booking[app];

        if (isArray) {
            if (nullable && value === null) {
                result[firestore] = null;
            } else if (Array.isArray(value)) {
                result[firestore] = value.map(id => toFirestore.ref<any>(collection, id));
            }
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }

        // Delete app field to avoid duplication
        delete result[app];
    });

    return result as unknown as BookingFirestore;
};

export const bookingFromFirestore = (firestoreBooking: BookingFirestore): BookingApp => {
    // Create base object with common fields
    const result = { ...firestoreBooking } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = fromFirestore.date(firestoreBooking.created_at);
    result.updated_at = fromFirestore.date(firestoreBooking.updated_at);
    result.created_by = typeof firestoreBooking.created_by === 'string'
        ? firestoreBooking.created_by
        : firestoreBooking.created_by ? fromFirestore.ref(firestoreBooking.created_by) : null;
    result.updated_by = typeof firestoreBooking.updated_by === 'string'
        ? firestoreBooking.updated_by
        : firestoreBooking.updated_by ? fromFirestore.ref(firestoreBooking.updated_by) : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreBooking[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Timestamp) {
            result[field] = fromFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, isArray, nullable }) => {
        const value = firestoreBooking[firestore];

        if (isArray) {
            if (nullable && value === null) {
                result[app] = null;
            } else if (Array.isArray(value)) {
                result[app] = value.map(ref => fromFirestore.ref(ref as any));
            }
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }

        // Delete firestore field to avoid duplication
        delete result[firestore];
    });

    return result as unknown as BookingApp;
};

// For backwards compatibility
export type Booking = BookingFirestore;
export type HBooking = BookingApp; 