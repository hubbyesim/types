import { z } from 'zod';
import { DocumentReference, Timestamp, FieldValue } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    documentRefSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore,
    fieldValueSchema
} from './helpers';

// Define collection paths
export const PROFILE_COLLECTION = 'profiles';
export const PARTNER_COLLECTION = 'partners';

// Define document reference schemas
export const profileRefSchema = createDocRefSchema<any>(PROFILE_COLLECTION);
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);

// Schema for API Key
export const apiKeySchema = z.object({
    expires_at: timestampSchema,
    secret: z.string(),
    is_active: z.boolean()
});

// Schema for API Keys
export const apiKeysSchema = z.object({
    allowed_keys: z.array(z.string()),
    keys: z.record(z.string(), apiKeySchema)
});

// Common user fields shared between Firestore and App schemas
const commonUserFields = {
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    stripe_id: z.string().nullable(),
    referral: z.string().nullable(),
    fcm: z.string().optional(),
    deeplink: z.string().nullable(),
    gender: z.string().nullable(),
    company: z.string().nullable(),
    coordinates: z.string().nullable(),
    parameters: z.any().nullable(),
    locale: z.string().nullable(),
    phone_model: z.string().nullable(),
    phone_os: z.string().nullable(),
    phone_os_version: z.string().nullable(),
    ios: z.boolean().nullable(),
    has_card_saved: z.boolean().nullable(),
    admin: z.boolean().nullable(),
    api_keys: apiKeysSchema.nullable(),
    currency: z.string().nullable(),
    receipt_email: z.string().nullable()
};

// Define Firestore schema
export const userFirestoreSchema = baseModelSchema.extend({
    ...commonUserFields,
    createdAt: timestampSchema,
    partner: partnerRefSchema.schema.nullable(),
    profileRef: profileRefSchema.schema.nullable(),
    balance: z.union([z.number(), z.null(), fieldValueSchema]),
    review_requested: timestampSchema.nullable(),
    last_seen: timestampSchema.nullable()
});

// Define App schema (with JavaScript-friendly types)
export const userAppSchema = baseModelAppSchema.extend({
    ...commonUserFields,
    createdAt: z.date(),
    partner: docRefToStringSchema(partnerRefSchema).nullable(),
    profileRef: docRefToStringSchema(profileRefSchema).nullable(),
    balance: z.number().nullable(),
    review_requested: z.date().nullable(),
    last_seen: z.date().nullable()
});

// Define types based on schemas
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;
export type ApiKeys = z.infer<typeof apiKeysSchema>;
export type ApiKey = z.infer<typeof apiKeySchema>;

// Field mapping for conversions
interface RefFieldMapping {
    app: keyof UserApp;
    firestore: keyof UserFirestore;
    collection: string;
    nullable?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'profileRef', firestore: 'profileRef', collection: PROFILE_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true }
];

interface DateFieldMapping {
    field: 'createdAt' | 'review_requested' | 'last_seen';
    nullable?: boolean;
}

const dateFieldMappings: DateFieldMapping[] = [
    { field: 'createdAt' },
    { field: 'review_requested', nullable: true },
    { field: 'last_seen', nullable: true }
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
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = user[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Date) {
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
    dateFieldMappings.forEach(({ field, nullable }) => {
        const value = firestoreUser[field];
        if (nullable && value === null) {
            result[field] = null;
        } else if (value instanceof Timestamp) {
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

    // Handle special case for balance field
    if (firestoreUser.balance instanceof FieldValue) {
        result.balance = null; // Handle FieldValue by converting to null for the app
    }

    return result as unknown as UserApp;
};

// For backwards compatibility
export type User = UserFirestore;
export type HUser = UserApp; 