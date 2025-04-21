"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingFromFirestore = exports.bookingToFirestore = exports.bookingAppSchema = exports.bookingFirestoreSchema = exports.bookingStatusSchema = exports.communicationOptionsSchema = exports.communicationChannelSchema = exports.esimRefSchema = exports.userRefSchema = exports.promoCodeRefSchema = exports.partnerRefSchema = exports.ESIM_COLLECTION = exports.USER_COLLECTION = exports.PROMO_CODE_COLLECTION = exports.PARTNER_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
// Define collection paths
exports.PARTNER_COLLECTION = 'partners';
exports.PROMO_CODE_COLLECTION = 'promoCodes';
exports.USER_COLLECTION = 'users';
exports.ESIM_COLLECTION = 'esims';
// Define document reference schemas for related collections
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
exports.promoCodeRefSchema = (0, helpers_1.createDocRefSchema)(exports.PROMO_CODE_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(exports.USER_COLLECTION);
exports.esimRefSchema = (0, helpers_1.createDocRefSchema)(exports.ESIM_COLLECTION);
// Enum for communication channels
exports.communicationChannelSchema = zod_1.z.enum([
    'EMAIL',
    'WHATSAPP',
    'PUSH_NOTIFICATION',
    'SMS'
]);
// Schema for communication options
exports.communicationOptionsSchema = zod_1.z.object({
    should_send_message: zod_1.z.boolean(),
    channels: zod_1.z.array(exports.communicationChannelSchema)
});
// Status type for bookings
exports.bookingStatusSchema = zod_1.z.enum([
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'UNPAID',
    'EXPIRED'
]);
// Firestore schema for Booking
exports.bookingFirestoreSchema = helpers_1.baseModelSchema.extend({
    title: zod_1.z.string().nullable(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    full_name: zod_1.z.string(),
    pax: zod_1.z.number(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().nullable(),
    booking_id: zod_1.z.string().nullable(),
    return_date: helpers_1.timestampSchema.nullable(),
    partner: exports.partnerRefSchema.schema,
    promo_codes: zod_1.z.array(exports.promoCodeRefSchema.schema),
    departure_date: helpers_1.timestampSchema,
    flight_number: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['M', 'F', 'O']).optional(),
    package_size: zod_1.z.string().optional(),
    sent_messages: zod_1.z.record(zod_1.z.any()).optional(),
    users: zod_1.z.array(exports.userRefSchema.schema).nullable(),
    esims: zod_1.z.array(exports.esimRefSchema.schema).nullable(),
    locale: zod_1.z.enum(constants_1.SUPPORTED_LOCALES),
    status: exports.bookingStatusSchema,
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }),
    communication_options: exports.communicationOptionsSchema,
    is_processed_for_esim_restoration: zod_1.z.boolean(),
    is_pseudonymized: zod_1.z.boolean(),
    import_id: zod_1.z.string().nullable().optional(),
    package_specifications: zod_1.z.record(zod_1.z.any()).optional()
});
// App schema for Booking
exports.bookingAppSchema = helpers_1.baseModelAppSchema.extend({
    title: zod_1.z.string().nullable(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    full_name: zod_1.z.string(),
    pax: zod_1.z.number(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().nullable(),
    booking_id: zod_1.z.string().nullable(),
    return_date: zod_1.z.date().nullable(),
    partnerId: (0, helpers_1.docRefToStringSchema)(exports.partnerRefSchema),
    promo_code_ids: zod_1.z.array((0, helpers_1.docRefToStringSchema)(exports.promoCodeRefSchema)),
    departure_date: zod_1.z.date(),
    flight_number: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['M', 'F', 'O']).optional(),
    package_size: zod_1.z.string().optional(),
    sent_messages: zod_1.z.record(zod_1.z.any()).optional(),
    user_ids: zod_1.z.array(zod_1.z.string()).nullable(),
    esim_ids: zod_1.z.array(zod_1.z.string()).nullable(),
    locale: zod_1.z.enum(constants_1.SUPPORTED_LOCALES),
    status: exports.bookingStatusSchema,
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }),
    communication_options: exports.communicationOptionsSchema,
    is_processed_for_esim_restoration: zod_1.z.boolean(),
    is_pseudonymized: zod_1.z.boolean(),
    import_id: zod_1.z.string().nullable().optional(),
    package_specifications: zod_1.z.record(zod_1.z.any()).optional()
});
// Conversion functions
const bookingToFirestore = (booking) => {
    return {
        id: booking.id,
        created_at: helpers_1.toFirestore.date(booking.created_at),
        updated_at: helpers_1.toFirestore.date(booking.updated_at),
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
        return_date: booking.return_date ? helpers_1.toFirestore.date(booking.return_date) : null,
        partner: helpers_1.toFirestore.ref(exports.PARTNER_COLLECTION, booking.partnerId),
        promo_codes: booking.promo_code_ids.map(id => helpers_1.toFirestore.ref(exports.PROMO_CODE_COLLECTION, id)),
        departure_date: helpers_1.toFirestore.date(booking.departure_date),
        flight_number: booking.flight_number,
        gender: booking.gender,
        package_size: booking.package_size,
        sent_messages: booking.sent_messages,
        users: booking.user_ids ? booking.user_ids.map(id => helpers_1.toFirestore.ref(exports.USER_COLLECTION, id)) : null,
        esims: booking.esim_ids ? booking.esim_ids.map(id => helpers_1.toFirestore.ref(exports.ESIM_COLLECTION, id)) : null,
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
exports.bookingToFirestore = bookingToFirestore;
const bookingFromFirestore = (firestoreBooking) => {
    return {
        id: firestoreBooking.id,
        created_at: helpers_1.fromFirestore.date(firestoreBooking.created_at),
        updated_at: helpers_1.fromFirestore.date(firestoreBooking.updated_at),
        created_by: typeof firestoreBooking.created_by === 'string'
            ? firestoreBooking.created_by
            : firestoreBooking.created_by ? helpers_1.fromFirestore.ref(firestoreBooking.created_by) : null,
        updated_by: typeof firestoreBooking.updated_by === 'string'
            ? firestoreBooking.updated_by
            : firestoreBooking.updated_by ? helpers_1.fromFirestore.ref(firestoreBooking.updated_by) : null,
        title: firestoreBooking.title,
        first_name: firestoreBooking.first_name,
        last_name: firestoreBooking.last_name,
        full_name: firestoreBooking.full_name,
        pax: firestoreBooking.pax,
        email: firestoreBooking.email,
        phone: firestoreBooking.phone,
        booking_id: firestoreBooking.booking_id,
        return_date: firestoreBooking.return_date ? helpers_1.fromFirestore.date(firestoreBooking.return_date) : null,
        partnerId: helpers_1.fromFirestore.ref(firestoreBooking.partner),
        promo_code_ids: firestoreBooking.promo_codes.map(ref => helpers_1.fromFirestore.ref(ref)),
        departure_date: helpers_1.fromFirestore.date(firestoreBooking.departure_date),
        flight_number: firestoreBooking.flight_number,
        gender: firestoreBooking.gender,
        package_size: firestoreBooking.package_size,
        sent_messages: firestoreBooking.sent_messages,
        user_ids: firestoreBooking.users
            ? firestoreBooking.users.map(ref => helpers_1.fromFirestore.ref(ref))
            : null,
        esim_ids: firestoreBooking.esims
            ? firestoreBooking.esims.map(ref => helpers_1.fromFirestore.ref(ref))
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
exports.bookingFromFirestore = bookingFromFirestore;
