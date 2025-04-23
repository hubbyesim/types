import { z } from 'zod';
import { DocumentReference, Timestamp, FieldValue } from 'firebase-admin/firestore';
export declare const apiKeySchema: z.ZodObject<{
    expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    secret: z.ZodString;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    secret: string;
    is_active: boolean;
    expires_at: Timestamp;
}, {
    secret: string;
    is_active: boolean;
    expires_at: Timestamp;
}>;
export declare const apiKeysSchema: z.ZodObject<{
    allowed_keys: z.ZodArray<z.ZodString, "many">;
    keys: z.ZodRecord<z.ZodString, z.ZodObject<{
        expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
        secret: z.ZodString;
        is_active: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        secret: string;
        is_active: boolean;
        expires_at: Timestamp;
    }, {
        secret: string;
        is_active: boolean;
        expires_at: Timestamp;
    }>>;
}, "strip", z.ZodTypeAny, {
    keys: Record<string, {
        secret: string;
        is_active: boolean;
        expires_at: Timestamp;
    }>;
    allowed_keys: string[];
}, {
    keys: Record<string, {
        secret: string;
        is_active: boolean;
        expires_at: Timestamp;
    }>;
    allowed_keys: string[];
}>;
export declare const userFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    createdAt: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    profileRef: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    balance: z.ZodUnion<[z.ZodNumber, z.ZodNull, z.ZodType<FieldValue, z.ZodTypeDef, FieldValue>]>;
    review_requested: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    last_seen: z.ZodNullable<z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodNullable<z.ZodString>;
    referral: z.ZodNullable<z.ZodString>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    company: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodString>;
    parameters: z.ZodNullable<z.ZodAny>;
    locale: z.ZodNullable<z.ZodString>;
    phone_model: z.ZodNullable<z.ZodString>;
    phone_os: z.ZodNullable<z.ZodString>;
    phone_os_version: z.ZodNullable<z.ZodString>;
    ios: z.ZodNullable<z.ZodBoolean>;
    has_card_saved: z.ZodNullable<z.ZodBoolean>;
    admin: z.ZodNullable<z.ZodBoolean>;
    api_keys: z.ZodNullable<z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    }>>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: string | null;
    name: string | null;
    id: string;
    email: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    gender: string | null;
    locale: string | null;
    balance: number | FieldValue | null;
    createdAt: Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    review_requested: Timestamp | null;
    last_seen: Timestamp | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}, {
    currency: string | null;
    name: string | null;
    id: string;
    email: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    partner: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    gender: string | null;
    locale: string | null;
    balance: number | FieldValue | null;
    createdAt: Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    review_requested: Timestamp | null;
    last_seen: Timestamp | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}>;
export declare const userAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    createdAt: z.ZodDate;
    partner: z.ZodNullable<z.ZodString>;
    profileRef: z.ZodNullable<z.ZodString>;
    balance: z.ZodNullable<z.ZodNumber>;
    review_requested: z.ZodNullable<z.ZodDate>;
    last_seen: z.ZodNullable<z.ZodDate>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodNullable<z.ZodString>;
    referral: z.ZodNullable<z.ZodString>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    company: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodString>;
    parameters: z.ZodNullable<z.ZodAny>;
    locale: z.ZodNullable<z.ZodString>;
    phone_model: z.ZodNullable<z.ZodString>;
    phone_os: z.ZodNullable<z.ZodString>;
    phone_os_version: z.ZodNullable<z.ZodString>;
    ios: z.ZodNullable<z.ZodBoolean>;
    has_card_saved: z.ZodNullable<z.ZodBoolean>;
    admin: z.ZodNullable<z.ZodBoolean>;
    api_keys: z.ZodNullable<z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    }>>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: string | null;
    name: string | null;
    id: string;
    email: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    gender: string | null;
    locale: string | null;
    balance: number | null;
    createdAt: Date;
    profileRef: string | null;
    review_requested: Date | null;
    last_seen: Date | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}, {
    currency: string | null;
    name: string | null;
    id: string;
    email: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    gender: string | null;
    locale: string | null;
    balance: number | null;
    createdAt: Date;
    profileRef: string | null;
    review_requested: Date | null;
    last_seen: Date | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at: Timestamp;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}>;
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;
export type ApiKeys = z.infer<typeof apiKeysSchema>;
export type ApiKey = z.infer<typeof apiKeySchema>;
export declare const userToFirestore: (user: UserApp) => UserFirestore;
export declare const userFromFirestore: (firestoreUser: UserFirestore) => UserApp;
export declare const userToFirestoreWithBalance: (user: UserApp) => UserFirestore;
export type User = UserFirestore;
export type HUser = UserApp;
