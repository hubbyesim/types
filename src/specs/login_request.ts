import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired, USER_COLLECTION } from './common';

// Define the login request schema spec
export const loginRequestSchemaSpec = markAsSchemaSpec({
    id: z.string().nullable().optional(),
    email: z.string().email(),
    status: z.enum(['pending', 'completed', 'expired']),
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    created_at: timestampRequired,
    expires_at: timestampRequired
});
