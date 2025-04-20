import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';

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

// Conversion functions (simple as there are no special types to convert)
export const currencyToFirestore = (currency: CurrencyApp): CurrencyFirestore => {
    return {
        id: currency.id,
        created_at: toFirestore.date(currency.created_at),
        updated_at: toFirestore.date(currency.updated_at),
        created_by: typeof currency.created_by === 'string' ? currency.created_by : null,
        updated_by: typeof currency.updated_by === 'string' ? currency.updated_by : null,
        base_code: currency.base_code,
        coversion_rates: currency.coversion_rates
    };
};

export const currencyFromFirestore = (firestoreCurrency: CurrencyFirestore): CurrencyApp => {
    return {
        id: firestoreCurrency.id,
        created_at: fromFirestore.date(firestoreCurrency.created_at),
        updated_at: fromFirestore.date(firestoreCurrency.updated_at),
        created_by: typeof firestoreCurrency.created_by === 'string'
            ? firestoreCurrency.created_by
            : firestoreCurrency.created_by ? fromFirestore.ref(firestoreCurrency.created_by) : null,
        updated_by: typeof firestoreCurrency.updated_by === 'string'
            ? firestoreCurrency.updated_by
            : firestoreCurrency.updated_by ? fromFirestore.ref(firestoreCurrency.updated_by) : null,
        base_code: firestoreCurrency.base_code,
        coversion_rates: firestoreCurrency.coversion_rates
    };
};

// For backwards compatibility
export type Currency = CurrencyApp; 