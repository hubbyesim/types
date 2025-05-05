import { z } from 'zod';
import {
    baseModelSchema,
    timestampSchema
} from './core';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';

// Import base schemas
import {
    paymentAppSchema as basePaymentAppSchema,
    PaymentApp
} from '../base/payment';

// Re-export base schemas
export * from '../base/payment';

// Firestore schema for Payment
export const paymentFirestoreSchema = baseModelSchema.extend({
    amount: z.number(),
    customer: z.string(),
    date: timestampSchema, // In Firestore this is a Timestamp
    iccid: z.string(),
    package: z.string(),
    promo: z.string(),
    topup: z.boolean()
});

// Define type based on schema
export type PaymentFirestore = z.infer<typeof paymentFirestoreSchema>;

// Define date field mappings
const dateFieldMappings: GenericDateFieldMapping<PaymentApp, PaymentFirestore>[] = [
    { field: 'date' }
];

// Conversion functions using generic utilities
export const paymentToFirestore = (payment: PaymentApp): PaymentFirestore => {
    return genericToFirestore({
        appObject: payment,
        refFieldMappings: [],
        dateFieldMappings
    });
};

export const paymentFromFirestore = (firestorePayment: PaymentFirestore): PaymentApp => {
    return genericFromFirestore({
        firestoreObject: firestorePayment,
        refFieldMappings: [],
        dateFieldMappings
    });
};

// For backwards compatibility
export type Payment = PaymentFirestore; 