import { z } from 'zod';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
export declare const PROFILE_COLLECTION = "profiles";
export declare const profileRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const userFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    createdAt: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    profileRef: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string | null;
    id: string;
    email: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    createdAt: Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
}, {
    name: string | null;
    id: string;
    email: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    createdAt: Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
}>;
export declare const userAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    createdAt: z.ZodDate;
    profileId: z.ZodNullable<z.ZodString>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string | null;
    id: string;
    email: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    createdAt: Date;
    profileId: string | null;
}, {
    name: string | null;
    id: string;
    email: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    createdAt: Date;
    profileId: string | null;
}>;
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;
export declare const userToFirestore: (user: UserApp) => UserFirestore;
export declare const userFromFirestore: (firestoreUser: UserFirestore) => UserApp;
export type User = UserApp;
export type UserWithFirestore = UserFirestore;
