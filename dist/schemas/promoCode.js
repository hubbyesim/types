"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoCodeFromFirestore = exports.promoCodeToFirestore = exports.promoCodeAppSchema = exports.promoCodeFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
const api_1 = require("./api");
const refs_1 = require("./refs");
// Firestore schema for PromoCode
exports.promoCodeFirestoreSchema = helpers_1.baseModelSchema.extend({
    external_id: zod_1.z.string(),
    code: zod_1.z.string(),
    allowance_user: zod_1.z.number(),
    allowance_total: zod_1.z.number(),
    type: zod_1.z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(zod_1.z.string()),
    usage: zod_1.z.array(zod_1.z.string()),
    uuid_usage: zod_1.z.array(zod_1.z.string()),
    package_specification: api_1.packageSpecificationSchema.optional(),
    partner: refs_1.partnerRefNullable,
    valid_from: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    valid_to: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: refs_1.packageRefNullable,
    country: refs_1.countryRefNullable,
    booking: refs_1.bookingRefNullable,
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
    package_specification: api_1.packageSpecificationSchema.optional(),
    partner: refs_1.partnerRefStringNullable,
    valid_from: zod_1.z.date(),
    valid_to: zod_1.z.date(),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: refs_1.packageRefStringNullable,
    country: refs_1.countryRefStringNullable,
    booking: refs_1.bookingRefStringNullable,
    countries: zod_1.z.array(zod_1.z.string()).optional(),
    max_bytes: zod_1.z.number().optional(),
    starter_data: zod_1.z.number().optional()
});
// Field mapping for conversions
const refFieldMappings = [
    { app: 'partner', firestore: 'partner', collection: collections_1.PARTNER_COLLECTION, nullable: true },
    { app: 'package', firestore: 'package', collection: collections_1.PACKAGE_COLLECTION, nullable: true },
    { app: 'country', firestore: 'country', collection: collections_1.COUNTRY_COLLECTION, nullable: true },
    { app: 'booking', firestore: 'booking', collection: collections_1.BOOKING_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'valid_from' },
    { field: 'valid_to' }
];
// Conversion functions
const promoCodeToFirestore = (promoCode) => {
    return (0, utils_1.genericToFirestore)({
        appObject: promoCode,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.promoCodeToFirestore = promoCodeToFirestore;
const promoCodeFromFirestore = (firestorePromoCode) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestorePromoCode,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.promoCodeFromFirestore = promoCodeFromFirestore;
