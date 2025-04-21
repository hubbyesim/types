"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFromFirestore = exports.userToFirestore = exports.userAppSchema = exports.userFirestoreSchema = exports.profileRefSchema = exports.PROFILE_COLLECTION = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase-admin/firestore");
const helpers_1 = require("./helpers");
// Define Profile collection path
exports.PROFILE_COLLECTION = 'profiles';
// Define Firestore schema
exports.profileRefSchema = (0, helpers_1.createDocRefSchema)(exports.PROFILE_COLLECTION);
// Common user fields shared between Firestore and App schemas
const commonUserFields = {
    name: zod_1.z.string().nullable(),
    email: zod_1.z.string().email().nullable(),
};
// Define Firestore schema
exports.userFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonUserFields), { createdAt: helpers_1.timestampSchema, profileRef: exports.profileRefSchema.schema.nullable() }));
// Define App schema (with JavaScript-friendly types)
exports.userAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonUserFields), { createdAt: zod_1.z.date(), profileId: (0, helpers_1.docRefToStringSchema)(exports.profileRefSchema).nullable() }));
const refFieldMappings = [
    { app: 'profileId', firestore: 'profileRef', collection: exports.PROFILE_COLLECTION, nullable: true }
];
const dateFieldMappings = [
    { field: 'createdAt' }
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
    dateFieldMappings.forEach(({ field }) => {
        const value = user[field];
        if (value instanceof Date) {
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
    dateFieldMappings.forEach(({ field }) => {
        const value = firestoreUser[field];
        if (value instanceof firestore_1.Timestamp) {
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
    return result;
};
exports.userFromFirestore = userFromFirestore;
