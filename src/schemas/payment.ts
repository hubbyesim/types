import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';

// Firestore schema for Payment - this is simple as it doesn't contain Firestore specific types
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

// Conversion functions (simplified since no special conversions needed)
export const paymentToFirestore = (payment: PaymentApp): PaymentFirestore => {
    return {
        id: payment.id,
        created_at: toFirestore.date(payment.created_at),
        updated_at: toFirestore.date(payment.updated_at),
        created_by: typeof payment.created_by === 'string' ? payment.created_by : null,
        updated_by: typeof payment.updated_by === 'string' ? payment.updated_by : null,
        amount: payment.amount,
        customer: payment.customer,
        date: payment.date,
        iccid: payment.iccid,
        package: payment.package,
        promo: payment.promo,
        topup: payment.topup
    };
};

export const paymentFromFirestore = (firestorePayment: PaymentFirestore): PaymentApp => {
    return {
        id: firestorePayment.id,
        created_at: fromFirestore.date(firestorePayment.created_at),
        updated_at: fromFirestore.date(firestorePayment.updated_at),
        created_by: typeof firestorePayment.created_by === 'string'
            ? firestorePayment.created_by
            : firestorePayment.created_by ? fromFirestore.ref(firestorePayment.created_by) : null,
        updated_by: typeof firestorePayment.updated_by === 'string'
            ? firestorePayment.updated_by
            : firestorePayment.updated_by ? fromFirestore.ref(firestorePayment.updated_by) : null,
        amount: firestorePayment.amount,
        customer: firestorePayment.customer,
        date: firestorePayment.date,
        iccid: firestorePayment.iccid,
        package: firestorePayment.package,
        promo: firestorePayment.promo,
        topup: firestorePayment.topup
    };
};

// For backwards compatibility
export type Payment = PaymentApp; 