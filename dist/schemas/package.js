"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageFromFirestore = exports.packageToFirestore = exports.packageAppSchema = exports.packageFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const collections_1 = require("./utils/collections");
const country_1 = require("./country");
const refs_1 = require("./refs");
// Common package fields shared between Firestore and App schemas
const commonPackageFields = {
    external_id: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable(),
    label: zod_1.z.string(),
    bytes: zod_1.z.number(),
    hidden: zod_1.z.boolean(),
    is_hidden: zod_1.z.boolean(),
    is_active: zod_1.z.boolean(),
    priority: zod_1.z.number(),
    country_data: country_1.countryFirestoreSchema.nullable(),
    price: zod_1.z.number(),
    partner_price: zod_1.z.number(),
    days: zod_1.z.number(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: zod_1.z.number().optional(),
    provider_parameters: zod_1.z.object({
        imsi: zod_1.z.number()
    }).nullable()
};
// Firestore schema for Package
exports.packageFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPackageFields), { country: refs_1.countryRefSchema.schema, partner: refs_1.partnerRefNullable }));
// App schema for Package
exports.packageAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPackageFields), { country: refs_1.countryRefString, partner: refs_1.partnerRefStringNullable }));
// Field mapping for conversions
const refFieldMappings = [
    { app: 'country', firestore: 'country', collection: collections_1.COUNTRY_COLLECTION },
    { app: 'partner', firestore: 'partner', collection: collections_1.PARTNER_COLLECTION, nullable: true }
];
// Conversion functions
const packageToFirestore = (packageData) => {
    return (0, utils_1.genericToFirestore)({
        appObject: packageData,
        refFieldMappings,
        dateFieldMappings: []
    });
};
exports.packageToFirestore = packageToFirestore;
const packageFromFirestore = (firestorePackage) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestorePackage,
        refFieldMappings,
        dateFieldMappings: []
    });
};
exports.packageFromFirestore = packageFromFirestore;
