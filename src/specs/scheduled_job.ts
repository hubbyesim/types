import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    timestampNullable,
    timestampRequired
} from './common';

// Job status schema
export const jobStatusSchema = z.enum(['pending', 'completed', 'failed']);

// Scheduled job schema spec
export const scheduledJobSchemaSpec = markAsSchemaSpec({
    id: z.string().nullable().optional(),
    job_type: z.string(),
    execute_at: timestampRequired,
    status: jobStatusSchema,
    task_data: z.record(z.unknown()),
    retry_count: z.number(),
    max_retries: z.number(),
    error: z.string().nullable(),
    scheduled_at: timestampNullable,
    last_retry_at: timestampNullable,
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

