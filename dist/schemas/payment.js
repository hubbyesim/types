"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFromFirestore = exports.paymentToFirestore = exports.paymentAppSchema = exports.paymentFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
// Firestore schema for Payment - this is simple as it doesn't contain Firestore specific types
exports.paymentFirestoreSchema = helpers_1.baseModelSchema.extend({
    amount: zod_1.z.number(),
    customer: zod_1.z.string(),
    date: zod_1.z.date(), // Note: In Firestore this would be a Timestamp, but we simplified for this example
    iccid: zod_1.z.string(),
    package: zod_1.z.string(),
    promo: zod_1.z.string(),
    topup: zod_1.z.boolean()
});
// App schema for Payment - identical to Firestore schema since no special types
exports.paymentAppSchema = helpers_1.baseModelAppSchema.extend({
    amount: zod_1.z.number(),
    customer: zod_1.z.string(),
    date: zod_1.z.date(),
    iccid: zod_1.z.string(),
    package: zod_1.z.string(),
    promo: zod_1.z.string(),
    topup: zod_1.z.boolean()
});
// Conversion functions (simplified since no special conversions needed)
const paymentToFirestore = (payment) => {
    return {
        id: payment.id,
        created_at: helpers_1.toFirestore.date(payment.created_at),
        updated_at: helpers_1.toFirestore.date(payment.updated_at),
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
exports.paymentToFirestore = paymentToFirestore;
const paymentFromFirestore = (firestorePayment) => {
    return {
        id: firestorePayment.id,
        created_at: helpers_1.fromFirestore.date(firestorePayment.created_at),
        updated_at: helpers_1.fromFirestore.date(firestorePayment.updated_at),
        created_by: typeof firestorePayment.created_by === 'string'
            ? firestorePayment.created_by
            : firestorePayment.created_by ? helpers_1.fromFirestore.ref(firestorePayment.created_by) : null,
        updated_by: typeof firestorePayment.updated_by === 'string'
            ? firestorePayment.updated_by
            : firestorePayment.updated_by ? helpers_1.fromFirestore.ref(firestorePayment.updated_by) : null,
        amount: firestorePayment.amount,
        customer: firestorePayment.customer,
        date: firestorePayment.date,
        iccid: firestorePayment.iccid,
        package: firestorePayment.package,
        promo: firestorePayment.promo,
        topup: firestorePayment.topup
    };
};
exports.paymentFromFirestore = paymentFromFirestore;
