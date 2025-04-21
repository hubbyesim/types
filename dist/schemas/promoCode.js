"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoCodeFromFirestore = exports.promoCodeToFirestore = exports.promoCodeAppSchema = exports.promoCodeFirestoreSchema = exports.packageSpecificationSchema = exports.packageRefSchema = exports.bookingRefSchema = exports.countryRefSchema = exports.partnerRefSchema = exports.PACKAGE_COLLECTION = exports.BOOKING_COLLECTION = exports.COUNTRY_COLLECTION = exports.PARTNER_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
// Define collection paths
exports.PARTNER_COLLECTION = 'partners';
exports.COUNTRY_COLLECTION = 'countries';
exports.BOOKING_COLLECTION = 'bookings';
exports.PACKAGE_COLLECTION = 'packages';
// Define document reference schemas
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
exports.countryRefSchema = (0, helpers_1.createDocRefSchema)(exports.COUNTRY_COLLECTION);
exports.bookingRefSchema = (0, helpers_1.createDocRefSchema)(exports.BOOKING_COLLECTION);
exports.packageRefSchema = (0, helpers_1.createDocRefSchema)(exports.PACKAGE_COLLECTION);
// Schema for package specification
exports.packageSpecificationSchema = zod_1.z.record(zod_1.z.any());
// Firestore schema for PromoCode
exports.promoCodeFirestoreSchema = helpers_1.baseModelSchema.extend({
    external_id: zod_1.z.string(),
    code: zod_1.z.string(),
    allowance_user: zod_1.z.number(),
    allowance_total: zod_1.z.number(),
    type: zod_1.z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(zod_1.z.string()),
    usage: zod_1.z.array(zod_1.z.string()),
    uuid_usage: zod_1.z.array(zod_1.z.string()),
    package_specification: exports.packageSpecificationSchema.optional(),
    partner: exports.partnerRefSchema.schema.optional(),
    valid_from: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    valid_to: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: exports.packageRefSchema.schema.optional(),
    country: exports.countryRefSchema.schema.optional(),
    booking: exports.bookingRefSchema.schema.nullable().optional(),
    countries: zod_1.z.array(zod_1.z.string()).optional(),
    max_bytes: zod_1.z.number().optional(),
    starter_data: zod_1.z.number().optional()
});
// App schema for PromoCode
exports.promoCodeAppSchema = helpers_1.baseModelAppSchema.extend({
    external_id: zod_1.z.string(),
    code: zod_1.z.string(),
    allowance_user: zod_1.z.number(),
    allowance_total: zod_1.z.number(),
    type: zod_1.z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(zod_1.z.string()),
    usage: zod_1.z.array(zod_1.z.string()),
    uuid_usage: zod_1.z.array(zod_1.z.string()),
    package_specification: exports.packageSpecificationSchema.optional(),
    partner: zod_1.z.string().optional(),
    valid_from: zod_1.z.date(),
    valid_to: zod_1.z.date(),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    booking: zod_1.z.string().nullable().optional(),
    countries: zod_1.z.array(zod_1.z.string()).optional(),
    max_bytes: zod_1.z.number().optional(),
    starter_data: zod_1.z.number().optional()
});
// Helper function to convert date/timestamp to Date
const convertToDate = (value) => {
    if (typeof value === 'string') {
        return new Date(value);
    }
    else if (value instanceof Date) {
        return value;
    }
    else if (value && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Cannot convert to Date: ${value}`);
};
// Conversion functions
const promoCodeToFirestore = (promoCode) => {
    const result = {
        id: promoCode.id,
        created_at: helpers_1.toFirestore.date(promoCode.created_at),
        updated_at: helpers_1.toFirestore.date(promoCode.updated_at),
        created_by: typeof promoCode.created_by === 'string' ? promoCode.created_by : null,
        updated_by: typeof promoCode.updated_by === 'string' ? promoCode.updated_by : null,
        external_id: promoCode.external_id,
        code: promoCode.code,
        allowance_user: promoCode.allowance_user,
        allowance_total: promoCode.allowance_total,
        type: promoCode.type,
        usage: promoCode.usage,
        uuid_usage: promoCode.uuid_usage,
        valid_from: helpers_1.toFirestore.date(promoCode.valid_from),
        valid_to: helpers_1.toFirestore.date(promoCode.valid_to)
    };
    // Handle optional fields
    if (promoCode.package_specification) {
        result.package_specification = promoCode.package_specification;
    }
    if (promoCode.partner) {
        result.partner = helpers_1.toFirestore.ref(exports.PARTNER_COLLECTION, promoCode.partner);
    }
    if ('discount' in promoCode) {
        result.discount = promoCode.discount;
    }
    if (promoCode.package_size) {
        result.package_size = promoCode.package_size;
    }
    if (promoCode.package) {
        result.package = helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, promoCode.package);
    }
    if (promoCode.country) {
        result.country = helpers_1.toFirestore.ref(exports.COUNTRY_COLLECTION, promoCode.country);
    }
    if (promoCode.booking !== undefined) {
        result.booking = promoCode.booking
            ? helpers_1.toFirestore.ref(exports.BOOKING_COLLECTION, promoCode.booking)
            : null;
    }
    if (promoCode.countries) {
        result.countries = promoCode.countries;
    }
    if ('max_bytes' in promoCode) {
        result.max_bytes = promoCode.max_bytes;
    }
    if ('starter_data' in promoCode) {
        result.starter_data = promoCode.starter_data;
    }
    return result;
};
exports.promoCodeToFirestore = promoCodeToFirestore;
const promoCodeFromFirestore = (firestorePromoCode) => {
    const result = {
        id: firestorePromoCode.id,
        created_at: helpers_1.fromFirestore.date(firestorePromoCode.created_at),
        updated_at: helpers_1.fromFirestore.date(firestorePromoCode.updated_at),
        created_by: typeof firestorePromoCode.created_by === 'string'
            ? firestorePromoCode.created_by
            : firestorePromoCode.created_by ? helpers_1.fromFirestore.ref(firestorePromoCode.created_by) : null,
        updated_by: typeof firestorePromoCode.updated_by === 'string'
            ? firestorePromoCode.updated_by
            : firestorePromoCode.updated_by ? helpers_1.fromFirestore.ref(firestorePromoCode.updated_by) : null,
        external_id: firestorePromoCode.external_id,
        code: firestorePromoCode.code,
        allowance_user: firestorePromoCode.allowance_user,
        allowance_total: firestorePromoCode.allowance_total,
        type: firestorePromoCode.type,
        usage: firestorePromoCode.usage,
        uuid_usage: firestorePromoCode.uuid_usage,
        valid_from: convertToDate(firestorePromoCode.valid_from),
        valid_to: convertToDate(firestorePromoCode.valid_to)
    };
    // Handle optional fields
    if (firestorePromoCode.package_specification) {
        result.package_specification = firestorePromoCode.package_specification;
    }
    if (firestorePromoCode.partner) {
        result.partner = helpers_1.fromFirestore.ref(firestorePromoCode.partner);
    }
    if ('discount' in firestorePromoCode) {
        result.discount = firestorePromoCode.discount;
    }
    if (firestorePromoCode.package_size) {
        result.package_size = firestorePromoCode.package_size;
    }
    if (firestorePromoCode.package) {
        result.package = helpers_1.fromFirestore.ref(firestorePromoCode.package);
    }
    if (firestorePromoCode.country) {
        result.country = helpers_1.fromFirestore.ref(firestorePromoCode.country);
    }
    if (firestorePromoCode.booking !== undefined) {
        result.booking = firestorePromoCode.booking
            ? helpers_1.fromFirestore.ref(firestorePromoCode.booking)
            : null;
    }
    if (firestorePromoCode.countries) {
        result.countries = firestorePromoCode.countries;
    }
    if ('max_bytes' in firestorePromoCode) {
        result.max_bytes = firestorePromoCode.max_bytes;
    }
    if ('starter_data' in firestorePromoCode) {
        result.starter_data = firestorePromoCode.starter_data;
    }
    return result;
};
exports.promoCodeFromFirestore = promoCodeFromFirestore;
