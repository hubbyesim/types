import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';

// Firestore schema for Payment
export const paymentFirestoreSchema = baseModelSchema.extend({
    amount: z.number(),
    customer: z.string(),
    date: z.date(), // Note: In Firestore this would be a Timestamp, but we simplified for this example
    iccid: z.string(),
    package: z.string(),
    promo: z.string(),
    topup: z.boolean()
});

// App schema for Payment - identical to Firestore schema since no special types
export const paymentAppSchema = baseModelAppSchema.extend({
    amount: z.number(),
    customer: z.string(),
    date: z.date(),
    iccid: z.string(),
    package: z.string(),
    promo: z.string(),
    topup: z.boolean()
});

// Define types based on schemas
export type PaymentFirestore = z.infer<typeof paymentFirestoreSchema>;
export type PaymentApp = z.infer<typeof paymentAppSchema>;

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
export type HPayment = PaymentApp; 