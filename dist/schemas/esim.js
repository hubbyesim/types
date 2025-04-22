"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esimFromFirestore = exports.esimToFirestore = exports.esimAppSchema = exports.esimFirestoreSchema = exports.paymentRefSchema = exports.partnerRefSchema = exports.userRefSchema = exports.countryRefSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
// Define document reference schemas
exports.countryRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.COUNTRY_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.USER_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PARTNER_COLLECTION);
exports.paymentRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PAYMENT_COLLECTION);
// Common fields shared between Firestore and App schemas
const commonESIMFields = {
    imsi: zod_1.z.number(),
    qr: zod_1.z.string(),
    iccid: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable().optional(),
    total_data: zod_1.z.number().nullable(),
    data_left: zod_1.z.number().nullable(),
    data_used: zod_1.z.boolean().nullable(),
    status: zod_1.z.string().nullable(),
    name: zod_1.z.string(),
    android_auto: zod_1.z.boolean(),
    partner_price: zod_1.z.number().nullable(),
    promo: zod_1.z.string().nullable(),
    type: zod_1.z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    is_auto_install: zod_1.z.boolean(),
    is_archived: zod_1.z.boolean(),
    apn: zod_1.z.string().nullable()
};
// Firestore schema for ESIM
exports.esimFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonESIMFields), { country: exports.countryRefSchema.schema.nullable(), user: exports.userRefSchema.schema.nullable(), time_assigned: helpers_1.timestampSchema.nullable(), last_updated: helpers_1.timestampSchema.nullable(), partner: exports.partnerRefSchema.schema.nullable(), payment: exports.paymentRefSchema.schema.nullable() }));
// App schema for ESIM
exports.esimAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonESIMFields), { country: zod_1.z.string().nullable(), user: zod_1.z.string().nullable(), time_assigned: zod_1.z.date().nullable(), last_updated: zod_1.z.date().nullable(), partner: zod_1.z.string().nullable(), payment: zod_1.z.string().nullable() }));
// Field mapping for conversions
const refFieldMappings = [
    { app: 'country', firestore: 'country', collection: collections_1.COUNTRY_COLLECTION, nullable: true },
    { app: 'user', firestore: 'user', collection: collections_1.USER_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: collections_1.PARTNER_COLLECTION, nullable: true },
    { app: 'payment', firestore: 'payment', collection: collections_1.PAYMENT_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'time_assigned', nullable: true },
    { field: 'last_updated', nullable: true }
];
// Conversion functions
const esimToFirestore = (esim) => {
    return (0, utils_1.genericToFirestore)({
        appObject: esim,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.esimToFirestore = esimToFirestore;
const esimFromFirestore = (firestoreEsim) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreEsim,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.esimFromFirestore = esimFromFirestore;
