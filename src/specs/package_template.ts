import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    timestampRequired
} from './common';

// Package Template Schema Spec - unified schema for all providers
export const packageTemplateSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    provider: z.string(), // e.g., "telna", "bondio"
    type: z.string(),
    purchase_price: z.number(),
    external_id: z.string(),
    supported_countries: z.array(z.string()), // iso3 codes
    provider_specific_data: {
        _type: 'record' as const,
        of: z.any(),
        nullable: true,
        optional: true
    },
    size_in_gigabytes: z.number(),
    tier: z.number().nullable().optional(), // 1, 2, 3
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});
