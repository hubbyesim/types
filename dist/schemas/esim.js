"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esimFromFirestore = exports.esimToFirestore = exports.esimAppSchema = exports.esimFirestoreSchema = exports.paymentRefSchema = exports.partnerRefSchema = exports.userRefSchema = exports.countryRefSchema = exports.PAYMENT_COLLECTION = exports.PARTNER_COLLECTION = exports.USER_COLLECTION = exports.COUNTRY_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
// Define collection paths
exports.COUNTRY_COLLECTION = 'countries';
exports.USER_COLLECTION = 'users';
exports.PARTNER_COLLECTION = 'partners';
exports.PAYMENT_COLLECTION = 'payments';
// Define document reference schemas
exports.countryRefSchema = (0, helpers_1.createDocRefSchema)(exports.COUNTRY_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(exports.USER_COLLECTION);
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
exports.paymentRefSchema = (0, helpers_1.createDocRefSchema)(exports.PAYMENT_COLLECTION);
// Firestore schema for ESIM
exports.esimFirestoreSchema = helpers_1.baseModelSchema.extend({
    country: exports.countryRefSchema.schema.nullable(),
    imsi: zod_1.z.number(),
    qr: zod_1.z.string(),
    user: exports.userRefSchema.schema.nullable(),
    iccid: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable().optional(),
    total_data: zod_1.z.number().nullable(),
    data_left: zod_1.z.number().nullable(),
    data_used: zod_1.z.boolean().nullable(),
    time_assigned: helpers_1.timestampSchema.nullable(),
    last_updated: helpers_1.timestampSchema.nullable(),
    status: zod_1.z.string().nullable(),
    name: zod_1.z.string(),
    android_auto: zod_1.z.boolean(),
    partner: exports.partnerRefSchema.schema.nullable(),
    partner_price: zod_1.z.number().nullable(),
    promo: zod_1.z.string().nullable(),
    type: zod_1.z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    payment: exports.paymentRefSchema.schema.nullable(),
    is_auto_install: zod_1.z.boolean(),
    is_archived: zod_1.z.boolean(),
    apn: zod_1.z.string().nullable()
});
// App schema for ESIM
exports.esimAppSchema = helpers_1.baseModelAppSchema.extend({
    countryId: zod_1.z.string().nullable(),
    imsi: zod_1.z.number(),
    qr: zod_1.z.string(),
    userId: zod_1.z.string().nullable(),
    iccid: zod_1.z.string(),
    provider: zod_1.z.string(),
    coverage_label: zod_1.z.string().nullable().optional(),
    total_data: zod_1.z.number().nullable(),
    data_left: zod_1.z.number().nullable(),
    data_used: zod_1.z.boolean().nullable(),
    time_assigned: zod_1.z.date().nullable(),
    last_updated: zod_1.z.date().nullable(),
    status: zod_1.z.string().nullable(),
    name: zod_1.z.string(),
    android_auto: zod_1.z.boolean(),
    partnerId: zod_1.z.string().nullable(),
    partner_price: zod_1.z.number().nullable(),
    promo: zod_1.z.string().nullable(),
    type: zod_1.z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    paymentId: zod_1.z.string().nullable(),
    is_auto_install: zod_1.z.boolean(),
    is_archived: zod_1.z.boolean(),
    apn: zod_1.z.string().nullable()
});
// Conversion functions
const esimToFirestore = (esim) => {
    return {
        id: esim.id,
        created_at: helpers_1.toFirestore.date(esim.created_at),
        updated_at: helpers_1.toFirestore.date(esim.updated_at),
        created_by: typeof esim.created_by === 'string' ? esim.created_by : null,
        updated_by: typeof esim.updated_by === 'string' ? esim.updated_by : null,
        country: esim.countryId ? helpers_1.toFirestore.ref(exports.COUNTRY_COLLECTION, esim.countryId) : null,
        imsi: esim.imsi,
        qr: esim.qr,
        user: esim.userId ? helpers_1.toFirestore.ref(exports.USER_COLLECTION, esim.userId) : null,
        iccid: esim.iccid,
        provider: esim.provider,
        coverage_label: esim.coverage_label,
        total_data: esim.total_data,
        data_left: esim.data_left,
        data_used: esim.data_used,
        time_assigned: esim.time_assigned ? helpers_1.toFirestore.date(esim.time_assigned) : null,
        last_updated: esim.last_updated ? helpers_1.toFirestore.date(esim.last_updated) : null,
        status: esim.status,
        name: esim.name,
        android_auto: esim.android_auto,
        partner: esim.partnerId ? helpers_1.toFirestore.ref(exports.PARTNER_COLLECTION, esim.partnerId) : null,
        partner_price: esim.partner_price,
        promo: esim.promo,
        type: esim.type,
        payment: esim.paymentId ? helpers_1.toFirestore.ref(exports.PAYMENT_COLLECTION, esim.paymentId) : null,
        is_auto_install: esim.is_auto_install,
        is_archived: esim.is_archived,
        apn: esim.apn
    };
};
exports.esimToFirestore = esimToFirestore;
const esimFromFirestore = (firestoreEsim) => {
    return {
        id: firestoreEsim.id,
        created_at: helpers_1.fromFirestore.date(firestoreEsim.created_at),
        updated_at: helpers_1.fromFirestore.date(firestoreEsim.updated_at),
        created_by: typeof firestoreEsim.created_by === 'string'
            ? firestoreEsim.created_by
            : firestoreEsim.created_by ? helpers_1.fromFirestore.ref(firestoreEsim.created_by) : null,
        updated_by: typeof firestoreEsim.updated_by === 'string'
            ? firestoreEsim.updated_by
            : firestoreEsim.updated_by ? helpers_1.fromFirestore.ref(firestoreEsim.updated_by) : null,
        countryId: firestoreEsim.country ? helpers_1.fromFirestore.ref(firestoreEsim.country) : null,
        imsi: firestoreEsim.imsi,
        qr: firestoreEsim.qr,
        userId: firestoreEsim.user ? helpers_1.fromFirestore.ref(firestoreEsim.user) : null,
        iccid: firestoreEsim.iccid,
        provider: firestoreEsim.provider,
        coverage_label: firestoreEsim.coverage_label,
        total_data: firestoreEsim.total_data,
        data_left: firestoreEsim.data_left,
        data_used: firestoreEsim.data_used,
        time_assigned: firestoreEsim.time_assigned ? helpers_1.fromFirestore.date(firestoreEsim.time_assigned) : null,
        last_updated: firestoreEsim.last_updated ? helpers_1.fromFirestore.date(firestoreEsim.last_updated) : null,
        status: firestoreEsim.status,
        name: firestoreEsim.name,
        android_auto: firestoreEsim.android_auto,
        partnerId: firestoreEsim.partner ? helpers_1.fromFirestore.ref(firestoreEsim.partner) : null,
        partner_price: firestoreEsim.partner_price,
        promo: firestoreEsim.promo,
        type: firestoreEsim.type,
        paymentId: firestoreEsim.payment ? helpers_1.fromFirestore.ref(firestoreEsim.payment) : null,
        is_auto_install: firestoreEsim.is_auto_install,
        is_archived: firestoreEsim.is_archived,
        apn: firestoreEsim.apn
    };
};
exports.esimFromFirestore = esimFromFirestore;
