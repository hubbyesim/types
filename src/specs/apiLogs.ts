import { z } from 'zod';
import { timestampRequired } from './common';
import { markAsSchemaSpec } from '../common';

export const payloadSpec = {
    _type: 'record' as const,
    of: z.unknown(),
    optional: true
};

export const apiLogSchemaSpec = markAsSchemaSpec({
    id: z.string().optional(),
    method: z.string(),
    user_id: z.string().optional(),
    path: z.string(),
    resource_type: z.string().optional(),
    resource_id: z.string().optional(),
    partner_id: z.string().optional(),
    payload: payloadSpec,
    timestamp: timestampRequired,
    status_code: z.number()
});
