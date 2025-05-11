import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired } from './common';

// Define schema for conversion rates (for backward compatibility)
export const conversionRateSchema = z.object({
    currency: z.number()
});

export type CoversionRate = z.infer<typeof conversionRateSchema>;

// Define the currency schema spec
export const currencySchemaSpec = markAsSchemaSpec({
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),
    // ISO 4217 currency code (e.g., "USD", "EUR")
    code: z.string().describe('ISO 4217 currency code (e.g., "USD", "EUR")'),
    // Currency symbol (e.g., "$", "€")
    symbol: z.string().describe('Currency symbol (e.g., "$", "€")'),
    // Full name of the currency (e.g., "US Dollar")
    name: z.string().describe('Full name of the currency (e.g., "US Dollar")'),
    // Exchange rate relative to base currency
    rate: z.number().describe('Exchange rate relative to base currency'),
    // Whether this is the default currency
    is_default: z.boolean().describe('Whether this is the default currency')
});
