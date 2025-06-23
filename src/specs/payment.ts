import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    USER_COLLECTION,
    timestampRequired
} from './common';

// Define the payment schema spec
export const paymentSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // Payment specific fields
    amount: z.number(),
    customer: z.string(),
    date: timestampRequired,
    iccid: z.string(),
    package: z.string(),
    promo: z.string(),
    topup: z.boolean(),

    // Reference fields
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true }
});
