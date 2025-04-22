import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import { documentedObject } from './utils/documentation';

// Define schema for conversion rates (for backward compatibility)
export const conversionRateSchema = z.object({
    currency: z.number()
});

export type CoversionRate = z.infer<typeof conversionRateSchema>;

// Define documentation for the schema fields
const currencyFieldDocs = {
    code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
    symbol: 'Currency symbol (e.g., "$", "€")',
    name: 'Full name of the currency (e.g., "US Dollar")',
    rate: 'Exchange rate relative to base currency',
    is_default: 'Whether this is the default currency'
};

// Common currency fields shared between Firestore and App schemas
const commonCurrencyFields = {
    code: z.string(),
    symbol: z.string(),
    name: z.string(),
    rate: z.number(),
    is_default: z.boolean()
};

// Firestore schema for Currency
export const currencyFirestoreSchema = documentedObject(
    baseModelSchema.extend({
        ...commonCurrencyFields
    }),
    currencyFieldDocs
);

// App schema for Currency
export const currencyAppSchema = documentedObject(
    baseModelAppSchema.extend({
        ...commonCurrencyFields
    }),
    currencyFieldDocs
);

// Define types based on schemas
export type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
export type CurrencyApp = z.infer<typeof currencyAppSchema>;

// Field mappings for date conversions
const dateFieldMappings: GenericDateFieldMapping<CurrencyApp, CurrencyFirestore>[] = [];

// Conversion functions
export const currencyToFirestore = (currency: CurrencyApp): CurrencyFirestore => {
    return genericToFirestore({
        appObject: currency,
        refFieldMappings: [],
        dateFieldMappings
    });
};

export const currencyFromFirestore = (firestoreCurrency: CurrencyFirestore): CurrencyApp => {
    return genericFromFirestore({
        firestoreObject: firestoreCurrency,
        refFieldMappings: [],
        dateFieldMappings
    });
};

// For backwards compatibility
export type Currency = CurrencyFirestore;
export type HCurrency = CurrencyApp; 