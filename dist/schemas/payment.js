"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFromFirestore = exports.paymentToFirestore = exports.paymentAppSchema = exports.paymentFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
// Firestore schema for Payment
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
// Define date field mappings
const dateFieldMappings = [
    { field: 'date' }
];
// Conversion functions using generic utilities
const paymentToFirestore = (payment) => {
    return (0, utils_1.genericToFirestore)({
        appObject: payment,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.paymentToFirestore = paymentToFirestore;
const paymentFromFirestore = (firestorePayment) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestorePayment,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.paymentFromFirestore = paymentFromFirestore;
