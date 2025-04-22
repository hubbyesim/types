import { z } from 'zod';
export declare const conversionRateSchema: z.ZodObject<{
    currency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    currency: number;
}, {
    currency: number;
}>;
export type CoversionRate = z.infer<typeof conversionRateSchema>;
export declare const currencyFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    code: string;
    name: string;
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    code: string;
    name: string;
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    rate: number;
    is_default: boolean;
}>;
export declare const currencyAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    code: string;
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    code: string;
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    rate: number;
    is_default: boolean;
}>;
export type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
export type CurrencyApp = z.infer<typeof currencyAppSchema>;
export declare const currencyToFirestore: (currency: CurrencyApp) => CurrencyFirestore;
export declare const currencyFromFirestore: (firestoreCurrency: CurrencyFirestore) => CurrencyApp;
export type Currency = CurrencyFirestore;
export type HCurrency = CurrencyApp;
