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
// Firestore schema for Package
exports.packageFirestoreSchema = helpers_1.baseModelSchema.extend({
    external_id: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable(),
    label: zod_1.z.string(),
    bytes: zod_1.z.number(),
    country: exports.countryRefSchema.schema,
    hidden: zod_1.z.boolean(),
    is_hidden: zod_1.z.boolean(),
    is_active: zod_1.z.boolean(),
    priority: zod_1.z.number(),
    country_data: country_1.countryFirestoreSchema.nullable(),
    price: zod_1.z.number(),
    partner_price: zod_1.z.number(),
    days: zod_1.z.number(),
    partner: exports.partnerRefSchema.schema.nullable(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: zod_1.z.number().optional(),
    provider_parameters: zod_1.z.object({
        imsi: zod_1.z.number()
    }).nullable()
});
// App schema for Package
exports.packageAppSchema = helpers_1.baseModelAppSchema.extend({
    external_id: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable(),
    label: zod_1.z.string(),
    bytes: zod_1.z.number(),
    countryId: (0, helpers_1.docRefToStringSchema)(exports.countryRefSchema),
    hidden: zod_1.z.boolean(),
    is_hidden: zod_1.z.boolean(),
    is_active: zod_1.z.boolean(),
    priority: zod_1.z.number(),
    country_data: country_1.countryFirestoreSchema.nullable(),
    price: zod_1.z.number(),
    partner_price: zod_1.z.number(),
    days: zod_1.z.number(),
    partnerId: zod_1.z.string().nullable(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['data-limited', 'time-limited']).nullable(),
    throttling: zod_1.z.number().optional(),
    provider_parameters: zod_1.z.object({
        imsi: zod_1.z.number()
    }).nullable()
});
// Conversion functions
const packageToFirestore = (packageData) => {
    return {
        id: packageData.id,
        created_at: helpers_1.toFirestore.date(packageData.created_at),
        updated_at: helpers_1.toFirestore.date(packageData.updated_at),
        created_by: typeof packageData.created_by === 'string' ? packageData.created_by : null,
        updated_by: typeof packageData.updated_by === 'string' ? packageData.updated_by : null,
        external_id: packageData.external_id,
        provider: packageData.provider,
        coverage_label: packageData.coverage_label,
        label: packageData.label,
        bytes: packageData.bytes,
        country: helpers_1.toFirestore.ref(exports.COUNTRY_COLLECTION, packageData.countryId),
        hidden: packageData.hidden,
        is_hidden: packageData.is_hidden,
        is_active: packageData.is_active,
        priority: packageData.priority,
        country_data: packageData.country_data,
        price: packageData.price,
        partner_price: packageData.partner_price,
        days: packageData.days,
        partner: packageData.partnerId
            ? helpers_1.toFirestore.ref(exports.PARTNER_COLLECTION, packageData.partnerId)
            : null,
        name: packageData.name,
        type: packageData.type,
        throttling: packageData.throttling,
        provider_parameters: packageData.provider_parameters
    };
};
exports.packageToFirestore = packageToFirestore;
const packageFromFirestore = (firestorePackage) => {
    return {
        id: firestorePackage.id,
        created_at: helpers_1.fromFirestore.date(firestorePackage.created_at),
        updated_at: helpers_1.fromFirestore.date(firestorePackage.updated_at),
        created_by: typeof firestorePackage.created_by === 'string'
            ? firestorePackage.created_by
            : firestorePackage.created_by ? helpers_1.fromFirestore.ref(firestorePackage.created_by) : null,
        updated_by: typeof firestorePackage.updated_by === 'string'
            ? firestorePackage.updated_by
            : firestorePackage.updated_by ? helpers_1.fromFirestore.ref(firestorePackage.updated_by) : null,
        external_id: firestorePackage.external_id,
        provider: firestorePackage.provider,
        coverage_label: firestorePackage.coverage_label,
        label: firestorePackage.label,
        bytes: firestorePackage.bytes,
        countryId: helpers_1.fromFirestore.ref(firestorePackage.country),
        hidden: firestorePackage.hidden,
        is_hidden: firestorePackage.is_hidden,
        is_active: firestorePackage.is_active,
        priority: firestorePackage.priority,
        country_data: firestorePackage.country_data,
        price: firestorePackage.price,
        partner_price: firestorePackage.partner_price,
        days: firestorePackage.days,
        partnerId: firestorePackage.partner ? helpers_1.fromFirestore.ref(firestorePackage.partner) : null,
        name: firestorePackage.name,
        type: firestorePackage.type,
        throttling: firestorePackage.throttling,
        provider_parameters: firestorePackage.provider_parameters
    };
};
exports.packageFromFirestore = packageFromFirestore;
