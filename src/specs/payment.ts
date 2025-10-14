import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    USER_COLLECTION,
    timestampRequired,
    hubbyModelSpec,
    PARTNER_COLLECTION
} from './common';

// Define the payment schema spec
export const paymentSchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,

    // Core payment fields (universal across ALL payment types)
    amount: z.number(),
    customer: z.string(),
    date: timestampRequired,
    source: z.enum(['app', 'webapp', 'platform']),
    invoice: z.string().optional(),
    fee: z.number().optional(),
    topup: z.boolean(),

    // Common resolved package specification (same format for all sources)
    package_specifications: z.array(z.object({
        package_type: z.string().optional(),
        package_size: z.string().optional(),
        package_duration: z.number().optional(),
        destination: z.string().optional(),
        iso3: z.string().optional(),
    })).optional(),

    // Reference fields
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true, optional: true },

    // Source-specific payment properties
    app_payment_properties: z.object({
        package: z.string().optional(), // package_id for app payments
        promo: z.string().optional(),
        iccid: z.string().optional(),
        global: z.string().optional(),
        balance_used: z.number().optional(),
        booking_id: z.string().nullable().optional(),
        discount_amount: z.string().optional(),
    }).optional(),

    webapp_platform_payment_properties: z.object({
        promo_codes: z.array(z.string()).optional(),
        booking_id: z.string().optional(),
        partner: z.string().optional(),
        purchaseType: z.string().optional(),
        affiliateId: z.string().nullable().optional(),
        partner_name: z.string().optional(),
        locale: z.string().optional(),
    }).optional(),
});
