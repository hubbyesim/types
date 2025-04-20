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
export const PARTNER_COLLECTION = 'partners';
export const COUNTRY_COLLECTION = 'countries';
export const BOOKING_COLLECTION = 'bookings';
export const PACKAGE_COLLECTION = 'packages';

// Define document reference schemas
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const countryRefSchema = createDocRefSchema<any>(COUNTRY_COLLECTION);
export const bookingRefSchema = createDocRefSchema<any>(BOOKING_COLLECTION);
export const packageRefSchema = createDocRefSchema<any>(PACKAGE_COLLECTION);

// Schema for package specification
export const packageSpecificationSchema = z.record(z.any());

// Firestore schema for PromoCode
export const promoCodeFirestoreSchema = baseModelSchema.extend({
    external_id: z.string(),
    code: z.string(),
    allowance_user: z.number(),
    allowance_total: z.number(),
    type: z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(z.string()),
    usage: z.array(z.string()),
    uuid_usage: z.array(z.string()),
    package_specification: packageSpecificationSchema.optional(),
    partner: partnerRefSchema.schema.optional(),
    valid_from: z.union([z.string(), z.date(), timestampSchema]),
    valid_to: z.union([z.string(), z.date(), timestampSchema]),

    // Optional fields based on the type
    discount: z.number().optional(),
    package_size: z.string().optional(),
    package: packageRefSchema.schema.optional(),
    country: countryRefSchema.schema.optional(),
    booking: bookingRefSchema.schema.nullable().optional(),
    countries: z.array(z.string()).optional(),
    max_bytes: z.number().optional(),
    starter_data: z.number().optional()
});

// App schema for PromoCode
export const promoCodeAppSchema = baseModelAppSchema.extend({
    external_id: z.string(),
    code: z.string(),
    allowance_user: z.number(),
    allowance_total: z.number(),
    type: z.enum(['full-discount', 'partial-discount', 'booking', 'traveler']).nullable().or(z.string()),
    usage: z.array(z.string()),
    uuid_usage: z.array(z.string()),
    package_specification: packageSpecificationSchema.optional(),
    partnerId: z.string().optional(),
    valid_from: z.date(),
    valid_to: z.date(),

    // Optional fields based on the type
    discount: z.number().optional(),
    package_size: z.string().optional(),
    packageId: z.string().optional(),
    countryId: z.string().optional(),
    bookingId: z.string().nullable().optional(),
    countries: z.array(z.string()).optional(),
    max_bytes: z.number().optional(),
    starter_data: z.number().optional()
});

// Define types based on schemas
export type PromoCodeFirestore = z.infer<typeof promoCodeFirestoreSchema>;
export type PromoCodeApp = z.infer<typeof promoCodeAppSchema>;

// Helper function to convert date/timestamp to Date
const convertToDate = (value: string | Date | any): Date => {
    if (typeof value === 'string') {
        return new Date(value);
    } else if (value instanceof Date) {
        return value;
    } else if (value && typeof value.toDate === 'function') {
        return value.toDate();
    }
    throw new Error(`Cannot convert to Date: ${value}`);
};

// Conversion functions
export const promoCodeToFirestore = (promoCode: PromoCodeApp): PromoCodeFirestore => {
    const result: any = {
        id: promoCode.id,
        created_at: toFirestore.date(promoCode.created_at),
        updated_at: toFirestore.date(promoCode.updated_at),
        created_by: typeof promoCode.created_by === 'string' ? promoCode.created_by : null,
        updated_by: typeof promoCode.updated_by === 'string' ? promoCode.updated_by : null,
        external_id: promoCode.external_id,
        code: promoCode.code,
        allowance_user: promoCode.allowance_user,
        allowance_total: promoCode.allowance_total,
        type: promoCode.type,
        usage: promoCode.usage,
        uuid_usage: promoCode.uuid_usage,
        valid_from: toFirestore.date(promoCode.valid_from),
        valid_to: toFirestore.date(promoCode.valid_to)
    };

    // Handle optional fields
    if (promoCode.package_specification) {
        result.package_specification = promoCode.package_specification;
    }

    if (promoCode.partnerId) {
        result.partner = toFirestore.ref<any>(PARTNER_COLLECTION, promoCode.partnerId);
    }

    if ('discount' in promoCode) {
        result.discount = promoCode.discount;
    }

    if (promoCode.package_size) {
        result.package_size = promoCode.package_size;
    }

    if (promoCode.packageId) {
        result.package = toFirestore.ref<any>(PACKAGE_COLLECTION, promoCode.packageId);
    }

    if (promoCode.countryId) {
        result.country = toFirestore.ref<any>(COUNTRY_COLLECTION, promoCode.countryId);
    }

    if (promoCode.bookingId !== undefined) {
        result.booking = promoCode.bookingId
            ? toFirestore.ref<any>(BOOKING_COLLECTION, promoCode.bookingId)
            : null;
    }

    if (promoCode.countries) {
        result.countries = promoCode.countries;
    }

    if ('max_bytes' in promoCode) {
        result.max_bytes = promoCode.max_bytes;
    }

    if ('starter_data' in promoCode) {
        result.starter_data = promoCode.starter_data;
    }

    return result;
};

export const promoCodeFromFirestore = (firestorePromoCode: PromoCodeFirestore): PromoCodeApp => {
    const result: any = {
        id: firestorePromoCode.id,
        created_at: fromFirestore.date(firestorePromoCode.created_at),
        updated_at: fromFirestore.date(firestorePromoCode.updated_at),
        created_by: typeof firestorePromoCode.created_by === 'string'
            ? firestorePromoCode.created_by
            : firestorePromoCode.created_by ? fromFirestore.ref(firestorePromoCode.created_by) : null,
        updated_by: typeof firestorePromoCode.updated_by === 'string'
            ? firestorePromoCode.updated_by
            : firestorePromoCode.updated_by ? fromFirestore.ref(firestorePromoCode.updated_by) : null,
        external_id: firestorePromoCode.external_id,
        code: firestorePromoCode.code,
        allowance_user: firestorePromoCode.allowance_user,
        allowance_total: firestorePromoCode.allowance_total,
        type: firestorePromoCode.type,
        usage: firestorePromoCode.usage,
        uuid_usage: firestorePromoCode.uuid_usage,
        valid_from: convertToDate(firestorePromoCode.valid_from),
        valid_to: convertToDate(firestorePromoCode.valid_to)
    };

    // Handle optional fields
    if (firestorePromoCode.package_specification) {
        result.package_specification = firestorePromoCode.package_specification;
    }

    if (firestorePromoCode.partner) {
        result.partnerId = fromFirestore.ref(firestorePromoCode.partner);
    }

    if ('discount' in firestorePromoCode) {
        result.discount = firestorePromoCode.discount;
    }

    if (firestorePromoCode.package_size) {
        result.package_size = firestorePromoCode.package_size;
    }

    if (firestorePromoCode.package) {
        result.packageId = fromFirestore.ref(firestorePromoCode.package);
    }

    if (firestorePromoCode.country) {
        result.countryId = fromFirestore.ref(firestorePromoCode.country);
    }

    if (firestorePromoCode.booking !== undefined) {
        result.bookingId = firestorePromoCode.booking
            ? fromFirestore.ref(firestorePromoCode.booking)
            : null;
    }

    if (firestorePromoCode.countries) {
        result.countries = firestorePromoCode.countries;
    }

    if ('max_bytes' in firestorePromoCode) {
        result.max_bytes = firestorePromoCode.max_bytes;
    }

    if ('starter_data' in firestorePromoCode) {
        result.starter_data = firestorePromoCode.starter_data;
    }

    return result;
};

// For backwards compatibility
export type PromoCode = PromoCodeApp; 