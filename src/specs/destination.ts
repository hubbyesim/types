import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    PACKAGE_TEMPLATE_COLLECTION,
    PARTNER_COLLECTION,
    timestampNullable,
    timestampRequired,
    TRAFFIC_POLICY_COLLECTION
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

    provider: z.enum(['telna', 'bondio']),

    duration_in_days: z.number(),
    duration_in_seconds: z.number(),
    
    size_in_bytes: z.number(),
    size_in_megabytes: z.number(),
    size_in_gigabytes: z.number(),

    package_template: { _type: 'docRef' as const, collection: PACKAGE_TEMPLATE_COLLECTION, nullable: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    //All unlimited packages will have a traffic policy, but this only refers to telna bundles
    traffic_policy: { _type: 'docRef' as const, collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
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
    is_active: z.boolean().default(true),
    is_visible: z.boolean().default(true), //All bundles that will have a partner will probably be invisible
    priority: z.number().default(10),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    deleted_at: timestampNullable,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),
    deleted_by: z.string().nullable()
});

