import { z } from 'zod';
export declare const conversionRateSchema: z.ZodObject<{
    currency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    currency: number;
}, {
    currency: number;
}>;
export declare const currencyFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    base_code: z.ZodString;
    coversion_rates: z.ZodObject<{
        currency: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: number;
    }, {
        currency: number;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    base_code: string;
    coversion_rates: {
        currency: number;
    };
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    created_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    base_code: string;
    coversion_rates: {
        currency: number;
    };
}>;
export declare const currencyAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    base_code: z.ZodString;
    coversion_rates: z.ZodObject<{
        currency: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: number;
    }, {
        currency: number;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    base_code: string;
    coversion_rates: {
        currency: number;
    };
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    base_code: string;
    coversion_rates: {
        currency: number;
    };
}>;
export type CoversionRate = z.infer<typeof conversionRateSchema>;
export type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
export type CurrencyApp = z.infer<typeof currencyAppSchema>;
export declare const currencyToFirestore: (currency: CurrencyApp) => CurrencyFirestore;
export declare const currencyFromFirestore: (firestoreCurrency: CurrencyFirestore) => CurrencyApp;
export type Currency = CurrencyApp;
