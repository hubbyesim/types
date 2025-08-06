import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    COUNTRY_COLLECTION,
    PARTNER_COLLECTION,
    TRAFFIC_POLICY_COLLECTION,
    timestampRequired,
    hubbyModelSpec
} from './common';

import { countrySchemaSpec } from './country';

// Define the package schema spec
export const packageSchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
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
    traffic_policy: { _type: 'docRef' as const, collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
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
    country_data: {
        _type: 'object' as const,
        of: countrySchemaSpec,
        nullable: true,
        optional: true
    }
    // country_data: z.any().nullable()
});

export const commonPackageSchema = markAsSchemaSpec({
    size: z.string(),
    iso: z.string(),
    days: z.number(),
    price: z.number(),
    is_hidden: z.boolean(),
    is_active: z.boolean(),
    priority: z.number(),
    packageType: z.string(),
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
});

export const telnaPackageSchema = markAsSchemaSpec({
    traffic_policy: { _type: 'docRef' as const, collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
    ...commonPackageSchema,
});

export const bondioPackageSchema = markAsSchemaSpec({
    ...commonPackageSchema,
    label: z.enum(['lambda', 'tau']),
});