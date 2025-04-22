"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToFirestoreWithBalance = exports.userFromFirestore = exports.userToFirestore = exports.userAppSchema = exports.userFirestoreSchema = exports.apiKeysSchema = exports.apiKeySchema = exports.partnerRefSchema = exports.profileRefSchema = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase-admin/firestore");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
// Define document reference schemas
exports.profileRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PROFILE_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(collections_1.PARTNER_COLLECTION);
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
// Field mapping for conversions
const refFieldMappings = [
    { app: 'profileRef', firestore: 'profileRef', collection: collections_1.PROFILE_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: collections_1.PARTNER_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'createdAt' },
    { field: 'review_requested', nullable: true },
    { field: 'last_seen', nullable: true }
];
// Conversion functions
const userToFirestore = (user) => {
    return (0, utils_1.genericToFirestore)({
        appObject: user,
        refFieldMappings,
        dateFieldMappings
    });
};
exports.userToFirestore = userToFirestore;
const userFromFirestore = (firestoreUser) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreUser,
        refFieldMappings,
        dateFieldMappings,
        specialCaseHandler: (result, firestoreData) => {
            // Handle special case for balance field
            if (firestoreData.balance instanceof firestore_1.FieldValue) {
                result.balance = null; // Handle FieldValue by converting to null for the app
            }
        }
    });
};
exports.userFromFirestore = userFromFirestore;
// Handle the special case of balance field which can be FieldValue
const userToFirestoreWithBalance = (user) => {
    const result = (0, exports.userToFirestore)(user);
    // Special handling for balance field if it's a FieldValue
    if (user.balance === null || typeof user.balance === 'number') {
        result.balance = user.balance;
    }
    return result;
};
exports.userToFirestoreWithBalance = userToFirestoreWithBalance;
