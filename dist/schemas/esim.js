"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esimFromFirestore = exports.esimToFirestore = exports.esimAppSchema = exports.esimFirestoreSchema = exports.paymentRefSchema = exports.partnerRefSchema = exports.userRefSchema = exports.countryRefSchema = exports.PAYMENT_COLLECTION = exports.PARTNER_COLLECTION = exports.USER_COLLECTION = exports.COUNTRY_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const firestore_1 = require("firebase-admin/firestore");
// Define collection paths
exports.COUNTRY_COLLECTION = 'countries';
exports.USER_COLLECTION = 'users';
exports.PARTNER_COLLECTION = 'partners';
exports.PAYMENT_COLLECTION = 'payments';
// Define document reference schemas
exports.countryRefSchema = (0, helpers_1.createDocRefSchema)(exports.COUNTRY_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(exports.USER_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
exports.paymentRefSchema = (0, helpers_1.createDocRefSchema)(exports.PAYMENT_COLLECTION);
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
exports.esimAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonESIMFields), { countryId: zod_1.z.string().nullable(), userId: zod_1.z.string().nullable(), time_assigned: zod_1.z.date().nullable(), last_updated: zod_1.z.date().nullable(), partnerId: zod_1.z.string().nullable(), paymentId: zod_1.z.string().nullable() }));
const refFieldMappings = [
    { app: 'countryId', firestore: 'country', collection: exports.COUNTRY_COLLECTION, nullable: true },
    { app: 'userId', firestore: 'user', collection: exports.USER_COLLECTION, nullable: true },
    { app: 'partnerId', firestore: 'partner', collection: exports.PARTNER_COLLECTION, nullable: true },
    { app: 'paymentId', firestore: 'payment', collection: exports.PAYMENT_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'time_assigned', nullable: true },
    { field: 'last_updated', nullable: true }
];
// Conversion functions
const esimToFirestore = (esim) => {
    // Create base object with common fields
    const result = Object.assign({}, esim);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(esim.created_at);
    result.updated_at = helpers_1.toFirestore.date(esim.updated_at);
    result.created_by = typeof esim.created_by === 'string' ? esim.created_by : null;
    result.updated_by = typeof esim.updated_by === 'string' ? esim.updated_by : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = esim[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof Date) {
            result[field] = helpers_1.toFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = esim[app];
        if (nullable && value === null) {
            result[firestore] = null;
        }
        else if (typeof value === 'string') {
            result[firestore] = helpers_1.toFirestore.ref(collection, value);
        }
        // Delete app field to avoid duplication
        delete result[app];
    });
    return result;
};
exports.esimToFirestore = esimToFirestore;
const esimFromFirestore = (firestoreEsim) => {
    // Create base object with common fields
    const result = Object.assign({}, firestoreEsim);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestoreEsim.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestoreEsim.updated_at);
    result.created_by = typeof firestoreEsim.created_by === 'string'
        ? firestoreEsim.created_by
        : firestoreEsim.created_by ? helpers_1.fromFirestore.ref(firestoreEsim.created_by) : null;
    result.updated_by = typeof firestoreEsim.updated_by === 'string'
        ? firestoreEsim.updated_by
        : firestoreEsim.updated_by ? helpers_1.fromFirestore.ref(firestoreEsim.updated_by) : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreEsim[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof firestore_1.Timestamp) {
            result[field] = helpers_1.fromFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestoreEsim[firestore];
        if (nullable && value === null) {
            result[app] = null;
        }
        else if (value) {
            result[app] = helpers_1.fromFirestore.ref(value);
        }
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    return result;
};
exports.esimFromFirestore = esimFromFirestore;
