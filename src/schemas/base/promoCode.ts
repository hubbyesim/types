import { z } from 'zod';
import {
    baseModelAppSchema,
    zDateString
} from './helpers';
import {
    partnerRefStringNullable,
    countryRefStringNullable,
    packageRefStringNullable,
    bookingRefStringNullable
} from './refs';
import { packageSpecificationSchema } from './api';

// App schema for PromoCode
export const promoCodeAppSchema = baseModelAppSchema.extend({
    external_id: z.string(),
    code: z.string(),
    allowance_user: z.number(),
    allowance_total: z.number(),
    type: z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(z.string()),
    usage: z.array(z.string()),
    uuid_usage: z.array(z.string()),
    package_specification: packageSpecificationSchema.optional(),
    partner: partnerRefStringNullable,
    valid_from: zDateString(),
    valid_to: zDateString(),

    // Optional fields based on the type
    discount: z.number().optional(),
    package_size: z.string().optional(),
    package: packageRefStringNullable,
    country: countryRefStringNullable,
    booking: bookingRefStringNullable,
    countries: z.array(z.string()).optional(),
    max_bytes: z.number().optional(),
    starter_data: z.number().optional()
});

// Type definition
export type PromoCodeApp = z.infer<typeof promoCodeAppSchema>;

// For backwards compatibility
export type HPromoCode = PromoCodeApp; 