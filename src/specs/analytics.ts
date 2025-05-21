import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { hubbyModelSpec, PARTNER_COLLECTION } from './common';

// Country schema spec
export const analyticsSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    service: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    event: z.string(),
    parameter: z.string().nullable(),
    sum: z.number(),
});