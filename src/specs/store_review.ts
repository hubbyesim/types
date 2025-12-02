import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { hubbyModelSpec } from './common';
import { supportedLocalesSchema } from '../constants';

export const storeReviewSchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    user_id: z.string(),
    rating: z.number().int(),
    review: z.string().nullable().optional(),
    platform: z.string().nullable().optional(),
    app_version: z.string().nullable().optional(),
    locale: supportedLocalesSchema.nullable().optional(),
    iccid: z.string().nullable().optional()
});
