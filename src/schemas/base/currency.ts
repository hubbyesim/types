import { z } from 'zod';
import {
    baseModelAppSchema
} from './helpers';
import { documentedObject } from '../utils/documentation';

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

// Common currency fields shared between schemas
export const commonCurrencyFields = {
    code: z.string(),
    symbol: z.string(),
    name: z.string(),
    rate: z.number(),
    is_default: z.boolean()
};

// App schema for Currency
export const currencyAppSchema = documentedObject(
    baseModelAppSchema.extend({
        ...commonCurrencyFields
    }),
    currencyFieldDocs
);

// Define type based on schema
export type CurrencyApp = z.infer<typeof currencyAppSchema>;

// For backwards compatibility
export type HCurrency = CurrencyApp; 