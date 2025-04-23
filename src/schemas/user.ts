import { z } from 'zod';
import { DocumentReference, Timestamp, FieldValue } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    fromFirestore,
    toFirestore,
    fieldValueSchema
} from './helpers';
import {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import {
    PROFILE_COLLECTION,
    PARTNER_COLLECTION
} from './utils/collections';
import { 
    partnerRefNullable, 
    profileRefNullable, 
    partnerRefStringNullable, 
    profileRefStringNullable 
} from './refs';

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
    partner: partnerRefNullable,
    profileRef: profileRefNullable,
    balance: z.union([z.number(), z.null(), fieldValueSchema]),
    review_requested: timestampSchema.nullable(),
    last_seen: timestampSchema.nullable()
});

// Define App schema (with JavaScript-friendly types)
export const userAppSchema = baseModelAppSchema.extend({
    ...commonUserFields,
    createdAt: z.date(),
    partner: partnerRefStringNullable,
    profileRef: profileRefStringNullable,
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
const refFieldMappings: GenericRefFieldMapping<UserApp, UserFirestore>[] = [
    { app: 'profileRef', firestore: 'profileRef', collection: PROFILE_COLLECTION, nullable: true },
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true }
];

const dateFieldMappings: GenericDateFieldMapping<UserApp, UserFirestore>[] = [
    { field: 'createdAt' },
    { field: 'review_requested', nullable: true },
    { field: 'last_seen', nullable: true }
];

// Conversion functions
export const userToFirestore = (user: UserApp): UserFirestore => {
    return genericToFirestore({
        appObject: user,
        refFieldMappings,
        dateFieldMappings
    });
};

export const userFromFirestore = (firestoreUser: UserFirestore): UserApp => {
    return genericFromFirestore({
        firestoreObject: firestoreUser,
        refFieldMappings,
        dateFieldMappings,
        specialCaseHandler: (result, firestoreData) => {
            // Handle special case for balance field
            if (firestoreData.balance instanceof FieldValue) {
                result.balance = null; // Handle FieldValue by converting to null for the app
            }
        }
    });
};

// Handle the special case of balance field which can be FieldValue
export const userToFirestoreWithBalance = (user: UserApp): UserFirestore => {
    const result = userToFirestore(user);
    
    // Special handling for balance field if it's a FieldValue
    if (user.balance === null || typeof user.balance === 'number') {
        result.balance = user.balance;
    }
    
    return result;
};

// For backwards compatibility
export type User = UserFirestore;
export type HUser = UserApp; 