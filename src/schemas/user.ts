import { z } from 'zod';
import { DocumentReference } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore
} from './helpers';

// Define Profile collection path
export const PROFILE_COLLECTION = 'profiles';

// Define Firestore schema
export const profileRefSchema = createDocRefSchema<any>(PROFILE_COLLECTION);

export const userFirestoreSchema = baseModelSchema.extend({
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    createdAt: timestampSchema,
    profileRef: profileRefSchema.schema.nullable()
});

// Define App schema (with JavaScript-friendly types)
export const userAppSchema = baseModelAppSchema.extend({
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    createdAt: z.date(),
    profileId: docRefToStringSchema(profileRefSchema).nullable()
});

// Define types based on schemas
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;

// Conversion functions
export const userToFirestore = (user: UserApp): UserFirestore => {
    // Create a new object with the correct types
    return {
        id: user.id,
        created_at: toFirestore.date(user.created_at),
        updated_at: toFirestore.date(user.updated_at),
        created_by: typeof user.created_by === 'string' ? user.created_by : null,
        updated_by: typeof user.updated_by === 'string' ? user.updated_by : null,
        name: user.name,
        email: user.email,
        createdAt: toFirestore.date(user.createdAt),
        profileRef: user.profileId
            ? toFirestore.ref<any>(PROFILE_COLLECTION, user.profileId)
            : null,
    };
};

export const userFromFirestore = (firestoreUser: UserFirestore): UserApp => {
    // Create a new object with the correct types
    return {
        id: firestoreUser.id,
        created_at: fromFirestore.date(firestoreUser.created_at),
        updated_at: fromFirestore.date(firestoreUser.updated_at),
        created_by: typeof firestoreUser.created_by === 'string'
            ? firestoreUser.created_by
            : firestoreUser.created_by ? fromFirestore.ref(firestoreUser.created_by) : null,
        updated_by: typeof firestoreUser.updated_by === 'string'
            ? firestoreUser.updated_by
            : firestoreUser.updated_by ? fromFirestore.ref(firestoreUser.updated_by) : null,
        name: firestoreUser.name,
        email: firestoreUser.email,
        createdAt: fromFirestore.date(firestoreUser.createdAt),
        profileId: firestoreUser.profileRef
            ? fromFirestore.ref(firestoreUser.profileRef)
            : null,
    };
};

// For backwards compatibility
export type User = UserApp;
export type UserWithFirestore = UserFirestore; 