"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingFromFirestore = exports.bookingToFirestore = exports.bookingAppSchema = exports.bookingFirestoreSchema = exports.bookingStatusSchema = exports.communicationOptionsSchema = exports.communicationChannelSchema = exports.esimRefSchema = exports.userRefSchema = exports.promoCodeRefSchema = exports.partnerRefSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
const constants_1 = require("../constants");
// Define document reference schemas for related collections
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PARTNER_COLLECTION);
exports.promoCodeRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PROMO_CODE_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.USER_COLLECTION);
exports.esimRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.ESIM_COLLECTION);
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
    locale: constants_1.supportedLocalesSchema,
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
exports.bookingAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonBookingFields), { return_date: zod_1.z.date().nullable(), departure_date: zod_1.z.date(), partner: (0, helpers_1.docRefToStringSchema)(exports.partnerRefSchema), promo_codes: zod_1.z.array((0, helpers_1.docRefToStringSchema)(exports.promoCodeRefSchema)), users: zod_1.z.array(zod_1.z.string()).nullable(), esims: zod_1.z.array(zod_1.z.string()).nullable() }));
// Field mapping types for conversions
const refFieldMappings = [
    { app: 'partner', firestore: 'partner', collection: collections_1.PARTNER_COLLECTION },
    { app: 'promo_codes', firestore: 'promo_codes', collection: collections_1.PROMO_CODE_COLLECTION, isArray: true },
    { app: 'users', firestore: 'users', collection: collections_1.USER_COLLECTION, isArray: true, nullable: true },
    { app: 'esims', firestore: 'esims', collection: collections_1.ESIM_COLLECTION, isArray: true, nullable: true }
];
const dateFieldMappings = [
    { field: 'return_date', nullable: true },
    { field: 'departure_date' }
];
// Conversion functions
const bookingToFirestore = (booking) => {
    return (0, utils_1.genericToFirestore)({
        appObject: booking,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.bookingToFirestore = bookingToFirestore;
const bookingFromFirestore = (firestoreBooking) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreBooking,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.bookingFromFirestore = bookingFromFirestore;
