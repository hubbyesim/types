"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFromFirestore = exports.userToFirestore = exports.userAppSchema = exports.userFirestoreSchema = exports.apiKeysSchema = exports.apiKeySchema = exports.partnerRefSchema = exports.profileRefSchema = exports.PARTNER_COLLECTION = exports.PROFILE_COLLECTION = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase-admin/firestore");
const helpers_1 = require("./helpers");
// Define collection paths
exports.PROFILE_COLLECTION = 'profiles';
exports.PARTNER_COLLECTION = 'partners';
// Define document reference schemas
exports.profileRefSchema = (0, helpers_1.createDocRefSchema)(exports.PROFILE_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
// Schema for API Key
exports.apiKeySchema = zod_1.z.object({
    expires_at: helpers_1.timestampSchema,
    secret: zod_1.z.string(),
    is_active: zod_1.z.boolean()
});
// Schema for API Keys
exports.apiKeysSchema = zod_1.z.object({
    allowed_keys: zod_1.z.array(zod_1.z.string()),
    keys: zod_1.z.record(zod_1.z.string(), exports.apiKeySchema)
});
// Common user fields shared between Firestore and App schemas
const commonUserFields = {
    name: zod_1.z.string().nullable(),
    email: zod_1.z.string().email().nullable(),
    stripe_id: zod_1.z.string().nullable(),
    referral: zod_1.z.string().nullable(),
    fcm: zod_1.z.string().optional(),
    deeplink: zod_1.z.string().nullable(),
    gender: zod_1.z.string().nullable(),
    company: zod_1.z.string().nullable(),
    coordinates: zod_1.z.string().nullable(),
    parameters: zod_1.z.any().nullable(),
    locale: zod_1.z.string().nullable(),
    phone_model: zod_1.z.string().nullable(),
    phone_os: zod_1.z.string().nullable(),
    phone_os_version: zod_1.z.string().nullable(),
    ios: zod_1.z.boolean().nullable(),
    has_card_saved: zod_1.z.boolean().nullable(),
    admin: zod_1.z.boolean().nullable(),
    api_keys: exports.apiKeysSchema.nullable(),
    currency: zod_1.z.string().nullable(),
    receipt_email: zod_1.z.string().nullable()
};
// Define Firestore schema
exports.userFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonUserFields), { createdAt: helpers_1.timestampSchema, partner: exports.partnerRefSchema.schema.nullable(), profileRef: exports.profileRefSchema.schema.nullable(), balance: zod_1.z.union([zod_1.z.number(), zod_1.z.null(), helpers_1.fieldValueSchema]), review_requested: helpers_1.timestampSchema.nullable(), last_seen: helpers_1.timestampSchema.nullable() }));
// Define App schema (with JavaScript-friendly types)
exports.userAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonUserFields), { createdAt: zod_1.z.date(), partner: (0, helpers_1.docRefToStringSchema)(exports.partnerRefSchema).nullable(), profileRef: (0, helpers_1.docRefToStringSchema)(exports.profileRefSchema).nullable(), balance: zod_1.z.number().nullable(), review_requested: zod_1.z.date().nullable(), last_seen: zod_1.z.date().nullable() }));
const refFieldMappings = [
    { app: 'profileRef', firestore: 'profileRef', collection: exports.PROFILE_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: exports.PARTNER_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'createdAt' },
    { field: 'review_requested', nullable: true },
    { field: 'last_seen', nullable: true }
];
// Conversion functions
const userToFirestore = (user) => {
    // Create base object with common fields
    const result = Object.assign({}, user);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(user.created_at);
    result.updated_at = helpers_1.toFirestore.date(user.updated_at);
    result.created_by = typeof user.created_by === 'string' ? user.created_by : null;
    result.updated_by = typeof user.updated_by === 'string' ? user.updated_by : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = user[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof Date) {
            result[field] = helpers_1.toFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = user[app];
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
exports.userToFirestore = userToFirestore;
const userFromFirestore = (firestoreUser) => {
    // Create base object with common fields
    const result = Object.assign({}, firestoreUser);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestoreUser.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestoreUser.updated_at);
    result.created_by = typeof firestoreUser.created_by === 'string'
        ? firestoreUser.created_by
        : firestoreUser.created_by ? helpers_1.fromFirestore.ref(firestoreUser.created_by) : null;
    result.updated_by = typeof firestoreUser.updated_by === 'string'
        ? firestoreUser.updated_by
        : firestoreUser.updated_by ? helpers_1.fromFirestore.ref(firestoreUser.updated_by) : null;
    // Convert date fields
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreUser[field];
        if (nullable && value === null) {
            result[field] = null;
        }
        else if (value instanceof firestore_1.Timestamp) {
            result[field] = helpers_1.fromFirestore.date(value);
        }
    });
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestoreUser[firestore];
        if (nullable && value === null) {
            result[app] = null;
        }
        else if (value) {
            result[app] = helpers_1.fromFirestore.ref(value);
        }
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    // Handle special case for balance field
    if (firestoreUser.balance instanceof firestore_1.FieldValue) {
        result.balance = null; // Handle FieldValue by converting to null for the app
    }
    return result;
};
exports.userFromFirestore = userFromFirestore;
