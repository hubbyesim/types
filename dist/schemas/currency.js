"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFromFirestore = exports.currencyToFirestore = exports.currencyAppSchema = exports.currencyFirestoreSchema = exports.conversionRateSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const documentation_1 = require("./utils/documentation");
// Define schema for conversion rates (for backward compatibility)
exports.conversionRateSchema = zod_1.z.object({
    currency: zod_1.z.number()
});
// Define documentation for the schema fields
const currencyFieldDocs = {
    code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
    symbol: 'Currency symbol (e.g., "$", "€")',
    name: 'Full name of the currency (e.g., "US Dollar")',
    rate: 'Exchange rate relative to base currency',
    is_default: 'Whether this is the default currency'
};
// Common currency fields shared between Firestore and App schemas
const commonCurrencyFields = {
    code: zod_1.z.string(),
    symbol: zod_1.z.string(),
    name: zod_1.z.string(),
    rate: zod_1.z.number(),
    is_default: zod_1.z.boolean()
};
// Firestore schema for Currency
exports.currencyFirestoreSchema = (0, documentation_1.documentedObject)(helpers_1.baseModelSchema.extend(Object.assign({}, commonCurrencyFields)), currencyFieldDocs);
// App schema for Currency
exports.currencyAppSchema = (0, documentation_1.documentedObject)(helpers_1.baseModelAppSchema.extend(Object.assign({}, commonCurrencyFields)), currencyFieldDocs);
// Field mappings for date conversions
const dateFieldMappings = [];
// Conversion functions
const currencyToFirestore = (currency) => {
    return (0, utils_1.genericToFirestore)({
        appObject: currency,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.currencyToFirestore = currencyToFirestore;
const currencyFromFirestore = (firestoreCurrency) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreCurrency,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.currencyFromFirestore = currencyFromFirestore;
