"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFromFirestore = exports.userToFirestore = exports.userAppSchema = exports.userFirestoreSchema = exports.profileRefSchema = exports.PROFILE_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
// Define Profile collection path
exports.PROFILE_COLLECTION = 'profiles';
// Define Firestore schema
exports.profileRefSchema = (0, helpers_1.createDocRefSchema)(exports.PROFILE_COLLECTION);
exports.userFirestoreSchema = helpers_1.baseModelSchema.extend({
    name: zod_1.z.string().nullable(),
    email: zod_1.z.string().email().nullable(),
    createdAt: helpers_1.timestampSchema,
    profileRef: exports.profileRefSchema.schema.nullable()
});
// Define App schema (with JavaScript-friendly types)
exports.userAppSchema = helpers_1.baseModelAppSchema.extend({
    name: zod_1.z.string().nullable(),
    email: zod_1.z.string().email().nullable(),
    createdAt: zod_1.z.date(),
    profileId: (0, helpers_1.docRefToStringSchema)(exports.profileRefSchema).nullable()
});
// Conversion functions
const userToFirestore = (user) => {
    // Create a new object with the correct types
    return {
        id: user.id,
        created_at: helpers_1.toFirestore.date(user.created_at),
        updated_at: helpers_1.toFirestore.date(user.updated_at),
        created_by: typeof user.created_by === 'string' ? user.created_by : null,
        updated_by: typeof user.updated_by === 'string' ? user.updated_by : null,
        name: user.name,
        email: user.email,
        createdAt: helpers_1.toFirestore.date(user.createdAt),
        profileRef: user.profileId
            ? helpers_1.toFirestore.ref(exports.PROFILE_COLLECTION, user.profileId)
            : null,
    };
};
exports.userToFirestore = userToFirestore;
const userFromFirestore = (firestoreUser) => {
    // Create a new object with the correct types
    return {
        id: firestoreUser.id,
        created_at: helpers_1.fromFirestore.date(firestoreUser.created_at),
        updated_at: helpers_1.fromFirestore.date(firestoreUser.updated_at),
        created_by: typeof firestoreUser.created_by === 'string'
            ? firestoreUser.created_by
            : firestoreUser.created_by ? helpers_1.fromFirestore.ref(firestoreUser.created_by) : null,
        updated_by: typeof firestoreUser.updated_by === 'string'
            ? firestoreUser.updated_by
            : firestoreUser.updated_by ? helpers_1.fromFirestore.ref(firestoreUser.updated_by) : null,
        name: firestoreUser.name,
        email: firestoreUser.email,
        createdAt: helpers_1.fromFirestore.date(firestoreUser.createdAt),
        profileId: firestoreUser.profileRef
            ? helpers_1.fromFirestore.ref(firestoreUser.profileRef)
            : null,
    };
};
exports.userFromFirestore = userFromFirestore;
