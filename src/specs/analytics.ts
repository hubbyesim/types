import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { hubbyModelSpec } from './common';

// Country schema spec
export const analyticsSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    service: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
    partner: z.string(),
    event: z.string(),
    sum: z.number(),
});