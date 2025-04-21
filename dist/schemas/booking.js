"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingFromFirestore = exports.bookingToFirestore = exports.bookingAppSchema = exports.bookingFirestoreSchema = exports.bookingStatusSchema = exports.communicationOptionsSchema = exports.communicationChannelSchema = exports.esimRefSchema = exports.userRefSchema = exports.promoCodeRefSchema = exports.partnerRefSchema = exports.ESIM_COLLECTION = exports.USER_COLLECTION = exports.PROMO_CODE_COLLECTION = exports.PARTNER_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
const firestore_1 = require("firebase/firestore");
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
// Common booking fields shared between Firestore and App schemas
const commonBookingFields = {
    title: zod_1.z.string().nullable(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    full_name: zod_1.z.string(),
    pax: zod_1.z.number(),
    email: zod_1.z.string().email().nullable(),
    phone: zod_1.z.string().nullable(),
    booking_id: zod_1.z.string().nullable(),
    flight_number: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['M', 'F', 'O']).optional(),
    package_size: zod_1.z.string().optional(),
    sent_messages: zod_1.z.record(zod_1.z.any()).optional(),
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
};
// Firestore schema for Booking
exports.bookingFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonBookingFields), { return_date: helpers_1.timestampSchema.nullable(), departure_date: helpers_1.timestampSchema, partner: exports.partnerRefSchema.schema, promo_codes: zod_1.z.array(exports.promoCodeRefSchema.schema), users: zod_1.z.array(exports.userRefSchema.schema).nullable(), esims: zod_1.z.array(exports.esimRefSchema.schema).nullable() }));
// App schema for Booking
exports.bookingAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonBookingFields), { return_date: zod_1.z.date().nullable(), departure_date: zod_1.z.date(), partnerId: (0, helpers_1.docRefToStringSchema)(exports.partnerRefSchema), promo_code_ids: zod_1.z.array((0, helpers_1.docRefToStringSchema)(exports.promoCodeRefSchema)), user_ids: zod_1.z.array(zod_1.z.string()).nullable(), esim_ids: zod_1.z.array(zod_1.z.string()).nullable() }));
const refFieldMappings = [
    { app: 'partnerId', firestore: 'partner', collection: exports.PARTNER_COLLECTION },
    { app: 'promo_code_ids', firestore: 'promo_codes', collection: exports.PROMO_CODE_COLLECTION, isArray: true },
    { app: 'user_ids', firestore: 'users', collection: exports.USER_COLLECTION, isArray: true, nullable: true },
    { app: 'esim_ids', firestore: 'esims', collection: exports.ESIM_COLLECTION, isArray: true, nullable: true }
];
const dateFieldMappings = [
    { field: 'return_date', nullable: true },
    { field: 'departure_date' }
];
// Conversion functions
const bookingToFirestore = (booking) => {
    // Create base object with common fields
    const result = Object.assign({}, booking);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(booking.created_at);
    result.updated_at = helpers_1.toFirestore.date(booking.updated_at);
    result.created_by = typeof booking.created_by === 'string' ? booking.created_by : null;
    result.updated_by = typeof booking.updated_by === 'string' ? booking.updated_by : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = booking[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof Date) {
            result[field] = helpers_1.toFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, isArray, nullable }) => {
        const value = booking[app];
        if (isArray) {
            if (nullable && value === null) {
                result[firestore] = null;
            }
            else if (Array.isArray(value)) {
                result[firestore] = value.map(id => helpers_1.toFirestore.ref(collection, id));
            }
        }
        else if (typeof value === 'string') {
            result[firestore] = helpers_1.toFirestore.ref(collection, value);
        }
        // Delete app field to avoid duplication
        delete result[app];
    });
    return result;
};
exports.bookingToFirestore = bookingToFirestore;
const bookingFromFirestore = (firestoreBooking) => {
    // Create base object with common fields
    const result = Object.assign({}, firestoreBooking);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestoreBooking.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestoreBooking.updated_at);
    result.created_by = typeof firestoreBooking.created_by === 'string'
        ? firestoreBooking.created_by
        : firestoreBooking.created_by ? helpers_1.fromFirestore.ref(firestoreBooking.created_by) : null;
    result.updated_by = typeof firestoreBooking.updated_by === 'string'
        ? firestoreBooking.updated_by
        : firestoreBooking.updated_by ? helpers_1.fromFirestore.ref(firestoreBooking.updated_by) : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreBooking[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof firestore_1.Timestamp) {
            result[field] = helpers_1.fromFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, isArray, nullable }) => {
        const value = firestoreBooking[firestore];
        if (isArray) {
            if (nullable && value === null) {
                result[app] = null;
            }
            else if (Array.isArray(value)) {
                result[app] = value.map(ref => helpers_1.fromFirestore.ref(ref));
            }
        }
        else if (value) {
            result[app] = helpers_1.fromFirestore.ref(value);
        }
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    return result;
};
exports.bookingFromFirestore = bookingFromFirestore;
