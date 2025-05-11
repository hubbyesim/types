import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired } from './common';

// Define the message schema spec
export const messageSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    key: z.string(),
    method: z.enum(["push", "sms", "email"]),
    status: z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: timestampRequired,
    updated_at: timestampRequired
});

