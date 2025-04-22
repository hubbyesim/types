"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoCodeFromFirestore = exports.promoCodeToFirestore = exports.promoCodeAppSchema = exports.promoCodeFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
const schemas_1 = require("./utils/schemas");
const api_1 = require("./api");
// Define document reference schemas using the utility function
const partnerRef = (0, schemas_1.createReferenceSchemas)(collections_1.PARTNER_COLLECTION, true);
const countryRef = (0, schemas_1.createReferenceSchemas)(collections_1.COUNTRY_COLLECTION, true);
const packageRef = (0, schemas_1.createReferenceSchemas)(collections_1.PACKAGE_COLLECTION, true);
const bookingRef = (0, schemas_1.createReferenceSchemas)(collections_1.BOOKING_COLLECTION, true);
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
    partner: partnerRef.firestore,
    valid_from: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    valid_to: zod_1.z.union([zod_1.z.string(), zod_1.z.date(), helpers_1.timestampSchema]),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: packageRef.firestore,
    country: countryRef.firestore,
    booking: bookingRef.firestore,
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
    partner: partnerRef.app,
    valid_from: zod_1.z.date(),
    valid_to: zod_1.z.date(),
    // Optional fields based on the type
    discount: zod_1.z.number().optional(),
    package_size: zod_1.z.string().optional(),
    package: packageRef.app,
    country: countryRef.app,
    booking: bookingRef.app,
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
