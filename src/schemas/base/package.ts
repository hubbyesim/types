import { z } from 'zod';
import {
    baseModelAppSchema
} from './helpers';
import {
    countryRefString,
    partnerRefStringNullable
} from './refs';
import { countryAppSchema } from './country';

// Common package fields shared between schemas
export const commonPackageFields = {
    external_id: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable(),
    label: z.string(),
    bytes: z.number(),
    hidden: z.boolean(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    country_data: countryAppSchema.nullable(),
    price: z.number(),
    partner_price: z.number(),
    days: z.number(),
    name: z.string(),
    type: z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: z.number().optional(),
    provider_parameters: z.object({
        imsi: z.number()
    }).nullable()
};

// App schema for Package
export const packageAppSchema = baseModelAppSchema.extend({
    ...commonPackageFields,
    country: countryRefString,
    partner: partnerRefStringNullable,
});

// Define types based on schemas
export type PackageApp = z.infer<typeof packageAppSchema>;

// For backwards compatibility
export type HPackage = PackageApp; 