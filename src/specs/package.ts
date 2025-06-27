import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    COUNTRY_COLLECTION,
    PARTNER_COLLECTION,
    timestampRequired
} from './common';

// Define the package schema spec
export const packageSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // Package specific fields
    external_id: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable(),
    label: z.string(),
    bytes: z.number(),
    hidden: z.boolean(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    price: z.number(),
    partner_price: z.number(),
    days: z.number(),
    name: z.string(),
    type: z.enum(['data-limited', 'time-limited', 'starter']).nullable(),
    throttling: z.number().optional(),
    provider_parameters: z.object({
        imsi: z.number()
    }).nullable(),

    // Reference fields
    country: { _type: 'docRef' as const, collection: COUNTRY_COLLECTION },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },

    // Nested country data - need to use dynamic reference to country schema
    // This would typically be handled better with a proper recursive schema definition
    // but for simplicity, we're using any type here
    country_data: z.any().nullable()
});
