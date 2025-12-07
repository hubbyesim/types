import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    COUNTRY_COLLECTION,
    USER_COLLECTION,
    PARTNER_COLLECTION,
    PAYMENT_COLLECTION,
    timestampNullable,
    timestampRequired
} from './common';


export const statusHistorySchema = z.object({
    telna_esim_status: z.number(),
    source: z.string(),
    status: z.string(),
    timestamp: timestampRequired as unknown as z.ZodType<Date>,
})

export const esimStatusHistorySchema = markAsSchemaSpec(z.array(statusHistorySchema).nullable().optional());

// Define the eSIM schema spec
export const esimSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // Common eSIM fields
    imsi: z.number(),
    qr: z.string(),
    iccid: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable().optional(),
    total_data: z.number(),
    data_left: z.number(),
    uuid: z.string().uuid().nullable().optional(),
    data_used: z.boolean(),
    status: z.string().nullable(),
    status_history: esimStatusHistorySchema,
    status_updated_at: timestampNullable,
    name: z.string(),
    android_auto: z.boolean(),
    partner_price: z.number().nullable(),
    promo: z.string().nullable(),
    type: z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    is_auto_install: z.boolean(),
    is_archived: z.boolean(),
    user: z.string().nullable(),
    payment: z.string().nullable(),
    apn: z.string().nullable(),

    // Reference fields
    country: { _type: 'docRef' as const, collection: COUNTRY_COLLECTION, nullable: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },

    // Timestamp fields
    time_assigned: timestampNullable,
    last_updated: timestampNullable
});
