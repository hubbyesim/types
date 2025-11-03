import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    PACKAGE_COLLECTION,
    timestampRequired
} from './common';

// Destination schema spec
export const destinationSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    type: z.string(), // "country" or region names like "Europe", "Asia", "Middle East"
    iso3s: z.array(z.string()),
    name: z.string(),
    slug: z.string(),
    active: z.boolean(),
    sort_order: z.number(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

// Destination offer schema spec
export const destinationBundleSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    type: z.enum(['unlimited', 'data-limited', 'starter']),
    duration_days: z.number(),
    size_gb: z.number(),
    package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION },
    currency: z.string(),
    b2c_price: z.number(),
    b2b_price: z.number(),
    partner_b2c_price: {
        _type: 'record' as const,
        of: z.number(),
        nullable: true,
        optional: true
    },
    partner_b2b_price: {
        _type: 'record' as const,
        of: z.number(),
        nullable: true,
        optional: true
    },
    active: z.boolean(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

