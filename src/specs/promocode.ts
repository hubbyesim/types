import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    PARTNER_COLLECTION,
    COUNTRY_COLLECTION,
    PACKAGE_COLLECTION,
    BOOKING_COLLECTION,
    PROMO_CODE_COLLECTION,
    timestampRequired,
    timestampNullableOptional
} from './common';

// Define package specification schema for use in promo code
export const packageSpecificationSchema = z.object({
    destination: z.string().optional(),
    size: z.string().optional(),
    package_id: z.string().optional(),
    iata_code: z.string().optional(),
    package_duration: z.number().optional(),
    package_type: z.enum(['data-limited', 'time-limited', 'starter', 'unlimited']).optional()
});

// Define the promo code schema spec
export const promoCodeSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    redeemed_at: timestampNullableOptional,
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // PromoCode specific fields
    external_id: z.string(),
    code: z.string(),
    allowance_user: z.number(),
    allowance_total: z.number(),
    type: z.enum(['discount', 'booking', 'booking_without_destination']).nullable().or(z.string()),
    usage: z.array(z.string()),
    uuid_usage: z.array(z.string()),
    package_specification: packageSpecificationSchema.optional(),
    valid_from: timestampRequired,
    valid_to: timestampRequired,

    // Reference fields
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION, nullable: true },
    country: { _type: 'docRef' as const, collection: COUNTRY_COLLECTION, nullable: true },
    booking: { _type: 'docRef' as const, collection: BOOKING_COLLECTION, nullable: true },

    // Optional fields based on the type
    discount: z.number().optional(),
    package_size: z.string().optional(),
    countries: z.array(z.string()).optional(),
    max_bytes: z.number().optional(),
    starter_data: z.number().optional()
});