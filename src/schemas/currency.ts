import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    genericToFirestore,
    genericFromFirestore
} from './utils';

// Define schema for conversion rates
export const conversionRateSchema = z.object({
    currency: z.number()
});

// Firestore schema for Currency
export const currencyFirestoreSchema = baseModelSchema.extend({
    base_code: z.string(),
    coversion_rates: conversionRateSchema
});

// App schema for Currency
export const currencyAppSchema = baseModelAppSchema.extend({
    base_code: z.string(),
    coversion_rates: conversionRateSchema
});

// Define types based on schemas
export type CoversionRate = z.infer<typeof conversionRateSchema>;
export type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
export type CurrencyApp = z.infer<typeof currencyAppSchema>;

// Conversion functions using generic utilities
export const currencyToFirestore = (currency: CurrencyApp): CurrencyFirestore => {
    return genericToFirestore({
        appObject: currency,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};

export const currencyFromFirestore = (firestoreCurrency: CurrencyFirestore): CurrencyApp => {
    return genericFromFirestore({
        firestoreObject: firestoreCurrency,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};

// For backwards compatibility
export type Currency = CurrencyFirestore;
export type HCurrency = CurrencyApp; 