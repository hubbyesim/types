import { z } from 'zod';
import { DocumentReference } from 'firebase-admin/firestore';
export declare const PROFILE_COLLECTION = "profiles";
export declare const profileRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const userFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    profileRef: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    email: string | null;
    name: string | null;
    createdAt: FirebaseFirestore.Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    email: string | null;
    name: string | null;
    createdAt: FirebaseFirestore.Timestamp;
    profileRef: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
}>;
export declare const userAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    profileId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date;
    profileId: string | null;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date;
    profileId: string | null;
}>;
export type UserFirestore = z.infer<typeof userFirestoreSchema>;
export type UserApp = z.infer<typeof userAppSchema>;
export declare const userToFirestore: (user: UserApp) => UserFirestore;
export declare const userFromFirestore: (firestoreUser: UserFirestore) => UserApp;
export type User = UserApp;
export type UserWithFirestore = UserFirestore;
