import { z } from 'zod';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
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

// Common user fields shared between Firestore and App schemas
const commonUserFields = {
    name: z.string().nullable(),
    email: z.string().email().nullable(),
};

// Define Firestore schema
export const userFirestoreSchema = baseModelSchema.extend({
    ...commonUserFields,
    createdAt: timestampSchema,
    profileRef: profileRefSchema.schema.nullable()
});

// Define App schema (with JavaScript-friendly types)
export const userAppSchema = baseModelAppSchema.extend({
    ...commonUserFields,
    createdAt: z.date(),
    profileRef: docRefToStringSchema(profileRefSchema).nullable()
});

// Define types based on schemas
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;

// Field mapping for conversions
interface RefFieldMapping {
    app: keyof UserApp;
    firestore: keyof UserFirestore;
    collection: string;
    nullable?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'profileRef', firestore: 'profileRef', collection: PROFILE_COLLECTION, nullable: true }
];

interface DateFieldMapping {
    field: keyof UserFirestore & keyof UserApp;
}

const dateFieldMappings: DateFieldMapping[] = [
    { field: 'createdAt' }
];

// Conversion functions
export const userToFirestore = (user: UserApp): UserFirestore => {
    // Create base object with common fields
    const result = { ...user } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = toFirestore.date(user.created_at);
    result.updated_at = toFirestore.date(user.updated_at);
    result.created_by = typeof user.created_by === 'string' ? user.created_by : null;
    result.updated_by = typeof user.updated_by === 'string' ? user.updated_by : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field }) => {
        const value = user[field];
        if (value instanceof Date) {
            result[field] = toFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = user[app];

        if (nullable && value === null) {
            result[firestore] = null;
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }

        // Delete app field to avoid duplication
        delete result[app];
    });

    return result as unknown as UserFirestore;
};

export const userFromFirestore = (firestoreUser: UserFirestore): UserApp => {
    // Create base object with common fields
    const result = { ...firestoreUser } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = fromFirestore.date(firestoreUser.created_at);
    result.updated_at = fromFirestore.date(firestoreUser.updated_at);
    result.created_by = typeof firestoreUser.created_by === 'string'
        ? firestoreUser.created_by
        : firestoreUser.created_by ? fromFirestore.ref(firestoreUser.created_by) : null;
    result.updated_by = typeof firestoreUser.updated_by === 'string'
        ? firestoreUser.updated_by
        : firestoreUser.updated_by ? fromFirestore.ref(firestoreUser.updated_by) : null;

    // Convert date fields
    dateFieldMappings.forEach(({ field }) => {
        const value = firestoreUser[field];
        if (value instanceof Timestamp) {
            result[field] = fromFirestore.date(value);
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestoreUser[firestore];

        if (nullable && value === null) {
            result[app] = null;
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }

        // Delete firestore field to avoid duplication
        delete result[firestore];
    });

    return result as unknown as UserApp;
};

// For backwards compatibility
export type User = UserFirestore;
export type HUser = UserApp; 