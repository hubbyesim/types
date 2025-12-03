import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    timestampNullable,
    timestampRequired,
    ESIM_COLLECTION,
    USER_COLLECTION
} from './common';

// Live activity status schema
export const liveActivityStatusSchema = z.enum(['created', 'active', 'ended', 'dismissed', 'failed']);

// Live activity update event schema
export const liveActivityEventSchema = z.enum(['start', 'update', 'end']);

// Live activity end reason schema
export const liveActivityReasonSchema = z.enum(['expired', 'data_exhausted', 'no_packages', 'manual']);

// Last update nested object schema
export const lastUpdateSchema = z.object({
    event: liveActivityEventSchema,
    totalDataGb: z.number().optional(),
    dataLeftGb: z.number().optional(),
    apnsId: z.string().nullable().optional(),
    statusCode: z.number().nullable().optional(),
    reason: liveActivityReasonSchema.optional()
}).nullable().optional();

// Live Activity schema spec
export const liveActivitySchemaSpec = markAsSchemaSpec({
    id: z.string(),
    esim_id: z.string(),
    title: z.string(),
    message: z.string(),
    total_data_gb: z.string().nullable(),
    data_left_gb: z.string().nullable(),
    time_left: z.string().nullable(),
    time_total: z.string().nullable(),
    user_id: z.string(),
    push_to_start_token: z.string(),
    push_to_update_token: z.string().nullable(),
    status: liveActivityStatusSchema,
    last_update_at: timestampNullable,
    last_update: lastUpdateSchema,
    ended_at: timestampNullable,
    created_at: timestampRequired,
    updated_at: timestampNullable,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});