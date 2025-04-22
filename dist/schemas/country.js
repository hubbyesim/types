"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryFromFirestore = exports.countryToFirestore = exports.countryAppSchema = exports.countryFirestoreSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
// Country Firestore schema - no transformations needed as it doesn't 
// contain Firestore-specific types
exports.countryFirestoreSchema = zod_1.z.object({
    id: zod_1.z.string().nullable(),
    bokun_id: zod_1.z.number().nullable(),
    LTE: zod_1.z.boolean().nullable(),
    apn: zod_1.z.string().nullable(),
    click_count: zod_1.z.number().nullable(),
    global_network: zod_1.z.string().nullable(),
    global_price: zod_1.z.number().nullable(),
    hubby: zod_1.z.number().nullable(),
    imsi: zod_1.z.number().nullable(),
    name: zod_1.z.string().nullable(),
    region: zod_1.z.boolean().nullable(),
    is_region: zod_1.z.boolean().nullable(),
    countries: zod_1.z.array(zod_1.z.string()).nullable(),
    tier: zod_1.z.number().nullable()
});
// For Country, the app schema is identical to the Firestore schema
// since there are no Firestore-specific types to convert
exports.countryAppSchema = exports.countryFirestoreSchema;
// Conversion functions using generic utilities for consistency
const countryToFirestore = (country) => {
    return (0, utils_1.genericToFirestore)({
        appObject: country,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};
exports.countryToFirestore = countryToFirestore;
const countryFromFirestore = (firestoreCountry) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreCountry,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};
exports.countryFromFirestore = countryFromFirestore;
