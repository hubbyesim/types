import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore
} from './helpers';

// Define collection paths
export const COUNTRY_COLLECTION = 'countries';
export const USER_COLLECTION = 'users';
export const PARTNER_COLLECTION = 'partners';
export const PAYMENT_COLLECTION = 'payments';

// Define document reference schemas
export const countryRefSchema = createDocRefSchema<any>(COUNTRY_COLLECTION);
export const userRefSchema = createDocRefSchema<any>(USER_COLLECTION);
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const paymentRefSchema = createDocRefSchema<any>(PAYMENT_COLLECTION);

// Firestore schema for ESIM
export const esimFirestoreSchema = baseModelSchema.extend({
    country: countryRefSchema.schema.nullable(),
    imsi: z.number(),
    qr: z.string(),
    user: userRefSchema.schema.nullable(),
    iccid: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable().optional(),
    total_data: z.number().nullable(),
    data_left: z.number().nullable(),
    data_used: z.boolean().nullable(),
    time_assigned: timestampSchema.nullable(),
    last_updated: timestampSchema.nullable(),
    status: z.string().nullable(),
    name: z.string(),
    android_auto: z.boolean(),
    partner: partnerRefSchema.schema.nullable(),
    partner_price: z.number().nullable(),
    promo: z.string().nullable(),
    type: z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    payment: paymentRefSchema.schema.nullable(),
    is_auto_install: z.boolean(),
    is_archived: z.boolean(),
    apn: z.string().nullable()
});

// App schema for ESIM
export const esimAppSchema = baseModelAppSchema.extend({
    countryId: z.string().nullable(),
    imsi: z.number(),
    qr: z.string(),
    userId: z.string().nullable(),
    iccid: z.string(),
    provider: z.string(),
    coverage_label: z.string().nullable().optional(),
    total_data: z.number().nullable(),
    data_left: z.number().nullable(),
    data_used: z.boolean().nullable(),
    time_assigned: z.date().nullable(),
    last_updated: z.date().nullable(),
    status: z.string().nullable(),
    name: z.string(),
    android_auto: z.boolean(),
    partnerId: z.string().nullable(),
    partner_price: z.number().nullable(),
    promo: z.string().nullable(),
    type: z.enum(['api', 'promo', 'balance', 'code', 'external', 'payment']),
    paymentId: z.string().nullable(),
    is_auto_install: z.boolean(),
    is_archived: z.boolean(),
    apn: z.string().nullable()
});

// Define types based on schemas
export type ESIMFirestore = z.infer<typeof esimFirestoreSchema>;
export type ESIMApp = z.infer<typeof esimAppSchema>;

// Conversion functions
export const esimToFirestore = (esim: ESIMApp): ESIMFirestore => {
    return {
        id: esim.id,
        created_at: toFirestore.date(esim.created_at),
        updated_at: toFirestore.date(esim.updated_at),
        created_by: typeof esim.created_by === 'string' ? esim.created_by : null,
        updated_by: typeof esim.updated_by === 'string' ? esim.updated_by : null,
        country: esim.countryId ? toFirestore.ref<any>(COUNTRY_COLLECTION, esim.countryId) : null,
        imsi: esim.imsi,
        qr: esim.qr,
        user: esim.userId ? toFirestore.ref<any>(USER_COLLECTION, esim.userId) : null,
        iccid: esim.iccid,
        provider: esim.provider,
        coverage_label: esim.coverage_label,
        total_data: esim.total_data,
        data_left: esim.data_left,
        data_used: esim.data_used,
        time_assigned: esim.time_assigned ? toFirestore.date(esim.time_assigned) : null,
        last_updated: esim.last_updated ? toFirestore.date(esim.last_updated) : null,
        status: esim.status,
        name: esim.name,
        android_auto: esim.android_auto,
        partner: esim.partnerId ? toFirestore.ref<any>(PARTNER_COLLECTION, esim.partnerId) : null,
        partner_price: esim.partner_price,
        promo: esim.promo,
        type: esim.type,
        payment: esim.paymentId ? toFirestore.ref<any>(PAYMENT_COLLECTION, esim.paymentId) : null,
        is_auto_install: esim.is_auto_install,
        is_archived: esim.is_archived,
        apn: esim.apn
    };
};

export const esimFromFirestore = (firestoreEsim: ESIMFirestore): ESIMApp => {
    return {
        id: firestoreEsim.id,
        created_at: fromFirestore.date(firestoreEsim.created_at),
        updated_at: fromFirestore.date(firestoreEsim.updated_at),
        created_by: typeof firestoreEsim.created_by === 'string'
            ? firestoreEsim.created_by
            : firestoreEsim.created_by ? fromFirestore.ref(firestoreEsim.created_by) : null,
        updated_by: typeof firestoreEsim.updated_by === 'string'
            ? firestoreEsim.updated_by
            : firestoreEsim.updated_by ? fromFirestore.ref(firestoreEsim.updated_by) : null,
        countryId: firestoreEsim.country ? fromFirestore.ref(firestoreEsim.country) : null,
        imsi: firestoreEsim.imsi,
        qr: firestoreEsim.qr,
        userId: firestoreEsim.user ? fromFirestore.ref(firestoreEsim.user) : null,
        iccid: firestoreEsim.iccid,
        provider: firestoreEsim.provider,
        coverage_label: firestoreEsim.coverage_label,
        total_data: firestoreEsim.total_data,
        data_left: firestoreEsim.data_left,
        data_used: firestoreEsim.data_used,
        time_assigned: firestoreEsim.time_assigned ? fromFirestore.date(firestoreEsim.time_assigned) : null,
        last_updated: firestoreEsim.last_updated ? fromFirestore.date(firestoreEsim.last_updated) : null,
        status: firestoreEsim.status,
        name: firestoreEsim.name,
        android_auto: firestoreEsim.android_auto,
        partnerId: firestoreEsim.partner ? fromFirestore.ref(firestoreEsim.partner) : null,
        partner_price: firestoreEsim.partner_price,
        promo: firestoreEsim.promo,
        type: firestoreEsim.type,
        paymentId: firestoreEsim.payment ? fromFirestore.ref(firestoreEsim.payment) : null,
        is_auto_install: firestoreEsim.is_auto_install,
        is_archived: firestoreEsim.is_archived,
        apn: firestoreEsim.apn
    };
};

// For backwards compatibility
export type ESIM = ESIMApp; 