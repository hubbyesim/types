import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    timestampNullable,
    timestampRequired,
} from './common';

// Live activity status schema
export const liveActivityStatusSchema = z.enum(['created', 'active', 'ended', 'dismissed', 'failed']);

// Live activity update event schema
export const liveActivityEventSchema = z.enum(['start', 'update', 'end']);

// Live activity end reason schema
export const liveActivityReasonSchema = z.enum(['expired', 'data_exhausted', 'no_packages', 'manual', 'recreated']);

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
    user_id: z.string(),
    push_to_start_token: z.string(),
    push_to_update_token: z.string().nullable(),
    status: liveActivityStatusSchema,
    last_update_at: timestampNullable,
    last_update: lastUpdateSchema,
    ended_at: timestampNullable,
    started_at: timestampNullable,
    dismissed_at: timestampNullable,
    recreated_at: timestampNullable,
    recreation_count: z.number().default(0),
    click_count: z.number().default(0),
    click_timestamps: z.array(z.date()).default([]),
    created_at: timestampRequired,
    updated_at: timestampNullable,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});
