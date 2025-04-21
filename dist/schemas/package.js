"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageFromFirestore = exports.packageToFirestore = exports.packageAppSchema = exports.packageFirestoreSchema = exports.partnerRefSchema = exports.countryRefSchema = exports.PARTNER_COLLECTION = exports.COUNTRY_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const country_1 = require("./country");
// Define collection paths
exports.COUNTRY_COLLECTION = 'countries';
exports.PARTNER_COLLECTION = 'partners';
// Define document reference schemas
exports.countryRefSchema = (0, helpers_1.createDocRefSchema)(exports.COUNTRY_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
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
exports.packageFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPackageFields), { country: exports.countryRefSchema.schema, partner: exports.partnerRefSchema.schema.nullable() }));
// App schema for Package
exports.packageAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPackageFields), { country: (0, helpers_1.docRefToStringSchema)(exports.countryRefSchema), partner: zod_1.z.string().nullable() }));
const refFieldMappings = [
    { app: 'country', firestore: 'country', collection: exports.COUNTRY_COLLECTION },
    { app: 'partner', firestore: 'partner', collection: exports.PARTNER_COLLECTION, nullable: true }
];
// Conversion functions
const packageToFirestore = (packageData) => {
    // Create base object with common fields
    const result = Object.assign({}, packageData);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(packageData.created_at);
    result.updated_at = helpers_1.toFirestore.date(packageData.updated_at);
    result.created_by = typeof packageData.created_by === 'string' ? packageData.created_by : null;
    result.updated_by = typeof packageData.updated_by === 'string' ? packageData.updated_by : null;
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = packageData[app];
        if (nullable && value === null) {
            result[firestore] = null;
        }
        else if (typeof value === 'string') {
            result[firestore] = helpers_1.toFirestore.ref(collection, value);
        }
        // Delete app field to avoid duplication
        delete result[app];
    });
    return result;
};
exports.packageToFirestore = packageToFirestore;
const packageFromFirestore = (firestorePackage) => {
    // Create base object with common fields
    const result = Object.assign({}, firestorePackage);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestorePackage.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestorePackage.updated_at);
    result.created_by = typeof firestorePackage.created_by === 'string'
        ? firestorePackage.created_by
        : firestorePackage.created_by ? helpers_1.fromFirestore.ref(firestorePackage.created_by) : null;
    result.updated_by = typeof firestorePackage.updated_by === 'string'
        ? firestorePackage.updated_by
        : firestorePackage.updated_by ? helpers_1.fromFirestore.ref(firestorePackage.updated_by) : null;
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestorePackage[firestore];
        if (nullable && value === null) {
            result[app] = null;
        }
        else if (value) {
            result[app] = helpers_1.fromFirestore.ref(value);
        }
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    return result;
};
exports.packageFromFirestore = packageFromFirestore;
