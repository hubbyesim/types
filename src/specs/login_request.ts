import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired } from './common';

// Define the login request schema spec
export const loginRequestSchemaSpec = markAsSchemaSpec({
    email: z.string().email(),
    status: z.enum(['pending', 'completed', 'expired']),
    created_at: timestampRequired,
    expires_at: timestampRequired
});
