import { z } from 'zod';
import {
    baseModelSchema
} from './helpers';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import { documentedObject } from '../utils/documentation';

// Import base schemas
import {
    commonCurrencyFields,
    conversionRateSchema,
    CoversionRate,
    CurrencyApp
} from '../base/currency';

// Re-export base schemas
export * from '../base/currency';

// Define documentation for the schema fields
const currencyFieldDocs = {
    code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
    symbol: 'Currency symbol (e.g., "$", "€")',
    name: 'Full name of the currency (e.g., "US Dollar")',
    rate: 'Exchange rate relative to base currency',
    is_default: 'Whether this is the default currency'
};

// Firestore schema for Currency
export const currencyFirestoreSchema = documentedObject(
    baseModelSchema.extend({
        ...commonCurrencyFields
    }),
    currencyFieldDocs
);

// Define type based on schema
export type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;

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