import { z } from 'zod';
import {
    baseModelAppSchema
} from './helpers';

// App schema for Payment
export const paymentAppSchema = baseModelAppSchema.extend({
    amount: z.number(),
    customer: z.string(),
    date: z.date(),
    iccid: z.string(),
    package: z.string(),
    promo: z.string(),
    topup: z.boolean()
});

// Define type based on schema
export type PaymentApp = z.infer<typeof paymentAppSchema>;

// For backwards compatibility
export type HPayment = PaymentApp; 