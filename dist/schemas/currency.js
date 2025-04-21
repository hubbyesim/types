"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFromFirestore = exports.currencyToFirestore = exports.currencyAppSchema = exports.currencyFirestoreSchema = exports.conversionRateSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
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
// Conversion functions (simple as there are no special types to convert)
const currencyToFirestore = (currency) => {
    return {
        id: currency.id,
        created_at: helpers_1.toFirestore.date(currency.created_at),
        updated_at: helpers_1.toFirestore.date(currency.updated_at),
        created_by: typeof currency.created_by === 'string' ? currency.created_by : null,
        updated_by: typeof currency.updated_by === 'string' ? currency.updated_by : null,
        base_code: currency.base_code,
        coversion_rates: currency.coversion_rates
    };
};
exports.currencyToFirestore = currencyToFirestore;
const currencyFromFirestore = (firestoreCurrency) => {
    return {
        id: firestoreCurrency.id,
        created_at: helpers_1.fromFirestore.date(firestoreCurrency.created_at),
        updated_at: helpers_1.fromFirestore.date(firestoreCurrency.updated_at),
        created_by: typeof firestoreCurrency.created_by === 'string'
            ? firestoreCurrency.created_by
            : firestoreCurrency.created_by ? helpers_1.fromFirestore.ref(firestoreCurrency.created_by) : null,
        updated_by: typeof firestoreCurrency.updated_by === 'string'
            ? firestoreCurrency.updated_by
            : firestoreCurrency.updated_by ? helpers_1.fromFirestore.ref(firestoreCurrency.updated_by) : null,
        base_code: firestoreCurrency.base_code,
        coversion_rates: firestoreCurrency.coversion_rates
    };
};
exports.currencyFromFirestore = currencyFromFirestore;
