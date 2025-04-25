import { z } from 'zod';
import { DocumentReference, Timestamp, FieldValue } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    timestampSchema,
    fieldValueSchema
} from './helpers';
import {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from '../utils';
import {
    PROFILE_COLLECTION,
    PARTNER_COLLECTION
} from '../utils/collections';
import {
    partnerRefNullable,
    profileRefNullable
} from './refs';

// Import base schemas
import {
    apiKeysSchema as baseApiKeysSchema,
    commonUserFields,
    UserApp
} from '../base/user';

// Schema for API Key with Timestamp
export const apiKeySchema = z.object({
    expires_at: timestampSchema,
    secret: z.string(),
    is_active: z.boolean()
});

// Schema for API Keys with Firebase specific types
export const apiKeysSchema = z.object({
    allowed_keys: z.array(z.string()),
    keys: z.record(z.string(), apiKeySchema)
});

// Define Firestore schema
export const userFirestoreSchema = baseModelSchema.extend({
    ...commonUserFields,
    createdAt: timestampSchema,
    partner: partnerRefNullable,
    profileRef: profileRefNullable,
    balance: z.union([z.number(), z.null(), fieldValueSchema]),
    review_requested: timestampSchema.nullable(),
    last_seen: timestampSchema.nullable(),
    api_keys: apiKeysSchema.nullable(),
});

// Define types based on schemas
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
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

// Re-export the App schema type for convenience
export { UserApp };

// For backwards compatibility
export type User = UserFirestore; 