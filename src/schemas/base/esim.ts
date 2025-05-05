import { z } from 'zod';
import {
    baseModelAppSchema,
    zDateString
} from './helpers';

// Common fields shared between schemas
export const commonESIMFields = {
    imsi: z.number(),
    qr: z.string(),
    iccid: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable().optional(),
    total_data: z.number().nullable(),
    data_left: z.number().nullable(),
    data_used: z.boolean().nullable(),
    status: z.string().nullable(),
    name: z.string(),
    android_auto: z.boolean(),
    partner_price: z.number().nullable(),
    promo: z.string().nullable(),
    type: z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    is_auto_install: z.boolean(),
    is_archived: z.boolean(),
    user: z.string().nullable(),
    payment: z.string().nullable(),
    apn: z.string().nullable()
};

// App schema for ESIM
export const esimAppSchema = baseModelAppSchema.extend({
    ...commonESIMFields,
    country: z.string().nullable(),
    time_assigned: zDateString().nullable(),
    last_updated: zDateString().nullable(),
    partner: z.string().nullable(),
});

// Define types based on schemas
export type ESIMApp = z.infer<typeof esimAppSchema>;

// For backwards compatibility
export type HESIM = ESIMApp; 