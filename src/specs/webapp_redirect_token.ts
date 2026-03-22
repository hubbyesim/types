import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    PARTNER_COLLECTION,
    timestampNullable,
    timestampRequired,
} from './common';

export const webappRedirectTokenSchemaSpec = markAsSchemaSpec({
    id: z.string().nullable().optional(),
    token: z.string(),
    external_user_id: z.string(),
    partner_id: z.string(),
    consumed: z.boolean(),
    consumed_at: timestampNullable,
    expires_at: timestampRequired,
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
});
