"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerApiResponseSchema = exports.partnerApiRequestSchema = exports.bookingApiRequestSchema = exports.promoCodeApiResponseSchema = exports.bookingApiResponseSchema = exports.packageSpecificationsSchema = exports.packageSpecificationSchema = void 0;
const zod_1 = require("zod");
const booking_1 = require("./booking");
// Schema for package specification
exports.packageSpecificationSchema = zod_1.z.object({
    destination: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    package_id: zod_1.z.string().optional(),
    iata_code: zod_1.z.string().optional()
});
exports.packageSpecificationsSchema = zod_1.z.array(exports.packageSpecificationSchema);
// ===== API TYPES FOR BOOKING =====
// Booking API response schema
exports.bookingApiResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().nullable(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    full_name: zod_1.z.string(),
    pax: zod_1.z.number(),
    email: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
    booking_id: zod_1.z.string().nullable(),
    return_date: zod_1.z.string().nullable(), // ISO string
    partner: zod_1.z.string(), // DocumentReference id
    promo_codes: zod_1.z.array(zod_1.z.string()), // Array of DocumentReference ids
    departure_date: zod_1.z.string(), // ISO string
    flight_number: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["M", "F", "O"]).optional(),
    package_size: zod_1.z.string().optional(),
    sent_messages: zod_1.z.record(zod_1.z.any()).optional(),
    users: zod_1.z.array(zod_1.z.string()), // Array of DocumentReference ids
    esims: zod_1.z.array(zod_1.z.string()).nullable(), // Array of DocumentReference ids or null
    locale: zod_1.z.string(),
    status: zod_1.z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'UNPAID', 'EXPIRED']),
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }),
    communication_options: booking_1.communicationOptionsSchema,
    is_processed_for_esim_restoration: zod_1.z.boolean(),
    is_pseudonymized: zod_1.z.boolean(),
    import_id: zod_1.z.string().nullable().optional(),
    created_at: zod_1.z.string(), // ISO string
    updated_at: zod_1.z.string(), // ISO string
    created_by: zod_1.z.string().optional(),
    updated_by: zod_1.z.string().optional()
});
// PromoCode API response schema
exports.promoCodeApiResponseSchema = zod_1.z.object({
    promo_code: zod_1.z.string(),
    package_id: zod_1.z.string(),
    package_size: zod_1.z.string(),
    destination: zod_1.z.string()
});
// Booking API request schema
exports.bookingApiRequestSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().nullable(),
    first_name: zod_1.z.string().nullable().optional(),
    last_name: zod_1.z.string().nullable().optional(),
    full_name: zod_1.z.string().nullable().optional(),
    pax: zod_1.z.number().int().min(1).nullable().optional(),
    email: zod_1.z.string().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    booking_id: zod_1.z.string().min(3).nullable().optional(),
    return_date: zod_1.z.date().nullable(), // Must be after departure_date
    departure_date: zod_1.z.date(), // ISO 8601 date string
    flight_number: zod_1.z.string().nullable().optional(),
    gender: zod_1.z.enum(["M", "F", "O"]).optional(),
    package_size: zod_1.z.string().optional(),
    sent_messages: zod_1.z.record(zod_1.z.any()).optional(),
    locale: zod_1.z.string().min(2).max(5).optional(),
    status: zod_1.z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'UNPAID', 'EXPIRED']),
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }),
    communication_options: booking_1.communicationOptionsSchema,
    is_processed_for_esim_restoration: zod_1.z.boolean(),
    is_pseudonymized: zod_1.z.boolean(),
    date_of_birth: zod_1.z.date().optional(),
    package_specifications: exports.packageSpecificationsSchema,
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date()
});
// ===== API TYPES FOR PARTNER =====
// Partner API request schema
exports.partnerApiRequestSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().nullable(),
    type: zod_1.z.string().nullable(),
    is_active: zod_1.z.boolean().nullable().optional(),
    external_id: zod_1.z.string().nullable().optional(),
    parent: zod_1.z.string().nullable(), // Previously DocumentReference
    contact: zod_1.z.object({
        email: zod_1.z.string().nullable(),
        office_phone: zod_1.z.string().nullable().optional()
    }).nullable(),
    address: zod_1.z.object({
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        postal_code: zod_1.z.string().optional(),
        country: zod_1.z.string().optional()
    }).nullable().optional(),
    registration: zod_1.z.object({
        chamber_of_commerce_number: zod_1.z.string().nullable().optional(),
        vat_number: zod_1.z.string().nullable().optional(),
        anvr_number: zod_1.z.number().nullable().optional(),
        tax_number: zod_1.z.string().nullable().optional()
    }).nullable().optional(),
    banking_details: zod_1.z.object({
        account_holder: zod_1.z.string(),
        bank_name: zod_1.z.string(),
        iban: zod_1.z.string()
    }).nullable().optional(),
    finance: zod_1.z.object({
        administration_fee: zod_1.z.number().nullable(),
        income_per_gb: zod_1.z.number().nullable(),
        commission_fee: zod_1.z.number().optional(),
        payment_method: zod_1.z.enum(["invoice", "direct"]),
        requires_card: zod_1.z.boolean().nullable(),
        next_invoice: zod_1.z.date().nullable(), // Previously Timestamp
        last_invoice: zod_1.z.date().nullable(), // Previously Timestamp
        pricing_strategies: zod_1.z.object({
            partner: zod_1.z.object({
                strategy: zod_1.z.enum(["split", "bundle"]),
                default_price_list: zod_1.z.string().nullable(),
                custom_prices: zod_1.z.array(zod_1.z.any()),
                modification_percentage: zod_1.z.number()
            }),
            user: zod_1.z.object({
                default_price_list: zod_1.z.string().nullable(),
                custom_prices: zod_1.z.array(zod_1.z.any()),
                modification_percentage: zod_1.z.number()
            })
        }).optional()
    }).nullable(),
    platform_settings: zod_1.z.any().optional(),
    visual_identity: zod_1.z.any().nullable(),
    users: zod_1.z.array(zod_1.z.string()).nullable(), // Previously DocumentReference[]
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }).optional(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
    created_by: zod_1.z.string().nullable(),
    updated_by: zod_1.z.string().nullable()
});
exports.partnerApiResponseSchema = exports.partnerApiRequestSchema;
