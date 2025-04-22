"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFromFirestore = exports.currencyToFirestore = exports.currencyAppSchema = exports.currencyFirestoreSchema = exports.conversionRateSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
// Define schema for conversion rates
exports.conversionRateSchema = zod_1.z.object({
    currency: zod_1.z.number()
});
// Firestore schema for Currency
exports.currencyFirestoreSchema = helpers_1.baseModelSchema.extend({
    base_code: zod_1.z.string(),
    coversion_rates: exports.conversionRateSchema
});
// App schema for Currency
exports.currencyAppSchema = helpers_1.baseModelAppSchema.extend({
    base_code: zod_1.z.string(),
    coversion_rates: exports.conversionRateSchema
});
// Conversion functions using generic utilities
const currencyToFirestore = (currency) => {
    return (0, utils_1.genericToFirestore)({
        appObject: currency,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};
exports.currencyToFirestore = currencyToFirestore;
const currencyFromFirestore = (firestoreCurrency) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreCurrency,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};
exports.currencyFromFirestore = currencyFromFirestore;
