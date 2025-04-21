import { z } from 'zod';
export declare const paymentFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodDate;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    date: Date;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: string;
    iccid: string;
    promo: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    date: Date;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    package: string;
    iccid: string;
    promo: string;
    amount: number;
    customer: string;
    topup: boolean;
}>;
export declare const paymentAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodDate;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    date: Date;
    updated_by: string | null;
    package: string;
    iccid: string;
    promo: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    date: Date;
    updated_by: string | null;
    package: string;
    iccid: string;
    promo: string;
    amount: number;
    customer: string;
    topup: boolean;
}>;
export type PaymentFirestore = z.infer<typeof paymentFirestoreSchema>;
export type PaymentApp = z.infer<typeof paymentAppSchema>;
export declare const paymentToFirestore: (payment: PaymentApp) => PaymentFirestore;
export declare const paymentFromFirestore: (firestorePayment: PaymentFirestore) => PaymentApp;
export type Payment = PaymentApp;
