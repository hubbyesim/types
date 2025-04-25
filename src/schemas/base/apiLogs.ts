import { z } from 'zod';

// App schema for ApiLog
export const apiLogAppSchema = z.object({
    id: z.string().optional(),
    method: z.string(),
    user_id: z.string().optional(),
    path: z.string(),
    resource_type: z.string().optional(),
    resource_id: z.string().optional(),
    partner_id: z.string().optional(),
    payload: z.record(z.unknown()).optional(),
    timestamp: z.date(),
    status_code: z.number()
});

// Define type based on schema
export type ApiLogApp = z.infer<typeof apiLogAppSchema>;

// For backwards compatibility
export type HApiLog = ApiLogApp; 