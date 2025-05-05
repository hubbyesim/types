import { z } from 'zod';
import { DocumentReference, Timestamp, FieldValue } from 'firebase-admin/firestore';
import {
    baseModelSchema,
    timestampSchema,
    fieldValueSchema
} from './core';
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
import { toFirestore, fromFirestore } from './helpers';
import { NestedFieldPathMapping } from '../utils/nested-conversions';

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
    review_requested: timestampSchema.nullable().optional(),
    last_seen: timestampSchema.nullable().optional(),
    api_keys: apiKeysSchema.nullable().optional(),
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

// Define nested field mappings for api_keys and any other nested structure
const nestedFieldMappings: NestedFieldPathMapping[] = [
    // API Keys nested timestamps
    {
        path: ['api_keys', 'keys', '*', 'expires_at'],
        type: 'timestamp',
        nullable: true,
        wildcardIndex: 2
    },
    // Optional conversions for parameters field - only apply if needed
    // Parameters nested timestamps - for example, if storing login timestamps
    {
        path: ['parameters', 'timestamps', 'lastLogin'],
        type: 'timestamp',
        nullable: true
    },
    {
        path: ['parameters', 'timestamps', 'accountCreated'],
        type: 'timestamp',
        nullable: true
    },
    // Parameters nested partner references
    {
        path: ['parameters', 'relationships', 'primaryPartner'],
        type: 'reference',
        collection: PARTNER_COLLECTION,
        nullable: true
    },
    {
        path: ['parameters', 'relationships', 'otherPartners'],
        type: 'reference',
        collection: PARTNER_COLLECTION,
        nullable: true,
        arrayField: true
    }
];

// Conversion functions
export const userToFirestore = (user: UserApp): UserFirestore => {
    const result = genericToFirestore({
        appObject: user,
        refFieldMappings,
        dateFieldMappings,
        nestedFieldMappings
    });

    return result;
};

export const userFromFirestore = (firestoreUser: UserFirestore): UserApp => {
    const result = genericFromFirestore({
        firestoreObject: firestoreUser,
        refFieldMappings,
        dateFieldMappings,
        nestedFieldMappings,
        specialCaseHandler: (result, firestoreData) => {
            // Handle special case for balance field
            if (firestoreData.balance instanceof FieldValue) {
                result.balance = null; // Handle FieldValue by converting to null for the app
            }
        }
    });

    return result;
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
export type { UserApp };

// For backwards compatibility
export type User = UserFirestore; 