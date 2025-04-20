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

// Firestore schema for Booking
export const bookingFirestoreSchema = baseModelSchema.extend({
    title: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    full_name: z.string(),
    pax: z.number(),
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
    booking_id: z.string().nullable(),
    return_date: timestampSchema.nullable(),
    partner: partnerRefSchema.schema,
    promo_codes: z.array(promoCodeRefSchema.schema),
    departure_date: timestampSchema,
    flight_number: z.string().optional(),
    gender: z.enum(['M', 'F', 'O']).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    users: z.array(userRefSchema.schema).nullable(),
    esims: z.array(esimRefSchema.schema).nullable(),
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
});

// App schema for Booking
export const bookingAppSchema = baseModelAppSchema.extend({
    title: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    full_name: z.string(),
    pax: z.number(),
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
    booking_id: z.string().nullable(),
    return_date: z.date().nullable(),
    partnerId: docRefToStringSchema(partnerRefSchema),
    promo_code_ids: z.array(docRefToStringSchema(promoCodeRefSchema)),
    departure_date: z.date(),
    flight_number: z.string().optional(),
    gender: z.enum(['M', 'F', 'O']).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    user_ids: z.array(z.string()).nullable(),
    esim_ids: z.array(z.string()).nullable(),
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
});

// Define types based on schemas
export type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;
export type BookingApp = z.infer<typeof bookingAppSchema>;

// Conversion functions
export const bookingToFirestore = (booking: BookingApp): BookingFirestore => {
    return {
        id: booking.id,
        created_at: toFirestore.date(booking.created_at),
        updated_at: toFirestore.date(booking.updated_at),
        created_by: typeof booking.created_by === 'string' ? booking.created_by : null,
        updated_by: typeof booking.updated_by === 'string' ? booking.updated_by : null,
        title: booking.title,
        first_name: booking.first_name,
        last_name: booking.last_name,
        full_name: booking.full_name,
        pax: booking.pax,
        email: booking.email,
        phone: booking.phone,
        booking_id: booking.booking_id,
        return_date: booking.return_date ? toFirestore.date(booking.return_date) : null,
        partner: toFirestore.ref<any>(PARTNER_COLLECTION, booking.partnerId),
        promo_codes: booking.promo_code_ids.map(id =>
            toFirestore.ref<any>(PROMO_CODE_COLLECTION, id)
        ),
        departure_date: toFirestore.date(booking.departure_date),
        flight_number: booking.flight_number,
        gender: booking.gender,
        package_size: booking.package_size,
        sent_messages: booking.sent_messages,
        users: booking.user_ids ? booking.user_ids.map(id =>
            toFirestore.ref<any>(USER_COLLECTION, id)
        ) : null,
        esims: booking.esim_ids ? booking.esim_ids.map(id =>
            toFirestore.ref<any>(ESIM_COLLECTION, id)
        ) : null,
        locale: booking.locale,
        status: booking.status,
        data: booking.data,
        communication_options: booking.communication_options,
        is_processed_for_esim_restoration: booking.is_processed_for_esim_restoration,
        is_pseudonymized: booking.is_pseudonymized,
        import_id: booking.import_id,
        package_specifications: booking.package_specifications
    };
};

export const bookingFromFirestore = (firestoreBooking: BookingFirestore): BookingApp => {
    return {
        id: firestoreBooking.id,
        created_at: fromFirestore.date(firestoreBooking.created_at),
        updated_at: fromFirestore.date(firestoreBooking.updated_at),
        created_by: typeof firestoreBooking.created_by === 'string'
            ? firestoreBooking.created_by
            : firestoreBooking.created_by ? fromFirestore.ref(firestoreBooking.created_by) : null,
        updated_by: typeof firestoreBooking.updated_by === 'string'
            ? firestoreBooking.updated_by
            : firestoreBooking.updated_by ? fromFirestore.ref(firestoreBooking.updated_by) : null,
        title: firestoreBooking.title,
        first_name: firestoreBooking.first_name,
        last_name: firestoreBooking.last_name,
        full_name: firestoreBooking.full_name,
        pax: firestoreBooking.pax,
        email: firestoreBooking.email,
        phone: firestoreBooking.phone,
        booking_id: firestoreBooking.booking_id,
        return_date: firestoreBooking.return_date ? fromFirestore.date(firestoreBooking.return_date) : null,
        partnerId: fromFirestore.ref(firestoreBooking.partner),
        promo_code_ids: firestoreBooking.promo_codes.map(ref => fromFirestore.ref(ref)),
        departure_date: fromFirestore.date(firestoreBooking.departure_date),
        flight_number: firestoreBooking.flight_number,
        gender: firestoreBooking.gender,
        package_size: firestoreBooking.package_size,
        sent_messages: firestoreBooking.sent_messages,
        user_ids: firestoreBooking.users
            ? firestoreBooking.users.map(ref => fromFirestore.ref(ref))
            : null,
        esim_ids: firestoreBooking.esims
            ? firestoreBooking.esims.map(ref => fromFirestore.ref(ref))
            : null,
        locale: firestoreBooking.locale,
        status: firestoreBooking.status,
        data: firestoreBooking.data,
        communication_options: firestoreBooking.communication_options,
        is_processed_for_esim_restoration: firestoreBooking.is_processed_for_esim_restoration,
        is_pseudonymized: firestoreBooking.is_pseudonymized,
        import_id: firestoreBooking.import_id,
        package_specifications: firestoreBooking.package_specifications
    };
};

// For backwards compatibility
export type Booking = BookingApp;
export type BookingWithFirestore = BookingFirestore; 