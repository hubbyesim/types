import { z } from 'zod';
import { bookingAppSchema } from './booking';
import { partnerAppSchema } from './partner';

// Schema for package specification
export const packageSpecificationSchema = z.object({
    destination: z.string(),
    size: z.string(),
    package_id: z.string().optional(),
    iata_code: z.string().optional()
});

export const packageSpecificationsSchema = z.array(packageSpecificationSchema);

// Communication options schema
export const communicationOptionsSchema = z.object({
    should_send_message: z.boolean(),
    channels: z.array(z.enum(["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]))
});

// ===== API TYPES FOR BOOKING =====
// Booking API response schema
export const bookingApiResponseSchema = z.object({
    id: z.string(),
    title: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    full_name: z.string(),
    pax: z.number(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    booking_id: z.string().nullable(),
    return_date: z.string().nullable(), // ISO string
    partner: z.string(), // DocumentReference id
    promo_codes: z.array(z.string()), // Array of DocumentReference ids
    departure_date: z.string(), // ISO string
    flight_number: z.string().optional(),
    gender: z.enum(["M", "F", "O"]).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    users: z.array(z.string()), // Array of DocumentReference ids
    esims: z.array(z.string()).nullable(), // Array of DocumentReference ids or null
    locale: z.string(),
    status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'UNPAID', 'EXPIRED']),
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }),
    communication_options: communicationOptionsSchema,
    is_processed_for_esim_restoration: z.boolean(),
    is_pseudonymized: z.boolean(),
    import_id: z.string().nullable().optional(),
    created_at: z.string(), // ISO string
    updated_at: z.string(), // ISO string
    created_by: z.string().optional(),
    updated_by: z.string().optional()
});

// PromoCode API response schema
export const promoCodeApiResponseSchema = z.object({
    promo_code: z.string(),
    package_id: z.string(),
    package_size: z.string(),
    destination: z.string()
});

// Booking API request schema
export const bookingApiRequestSchema = z.object({
    id: z.string(),
    title: z.string().nullable(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    full_name: z.string().nullable().optional(),
    pax: z.number().int().min(1).nullable().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    booking_id: z.string().min(3).nullable().optional(),
    return_date: z.date().nullable(), // Must be after departure_date
    departure_date: z.date(), // ISO 8601 date string
    flight_number: z.string().nullable().optional(),
    gender: z.enum(["M", "F", "O"]).optional(),
    package_size: z.string().optional(),
    sent_messages: z.record(z.any()).optional(),
    locale: z.string().min(2).max(5).optional(),
    status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'UNPAID', 'EXPIRED']),
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }),
    communication_options: communicationOptionsSchema,
    is_processed_for_esim_restoration: z.boolean(),
    is_pseudonymized: z.boolean(),
    date_of_birth: z.date().optional(),
    package_specifications: packageSpecificationsSchema,
    created_at: z.date(),
    updated_at: z.date()
});

// ===== API TYPES FOR PARTNER =====
// Partner API request schema
export const partnerApiRequestSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),
    parent: z.string().nullable(), // Previously DocumentReference
    contact: z.object({
        email: z.string().nullable(),
        office_phone: z.string().nullable().optional()
    }).nullable(),
    address: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        postal_code: z.string().optional(),
        country: z.string().optional()
    }).nullable().optional(),
    registration: z.object({
        chamber_of_commerce_number: z.string().nullable().optional(),
        vat_number: z.string().nullable().optional(),
        anvr_number: z.number().nullable().optional(),
        tax_number: z.string().nullable().optional()
    }).nullable().optional(),
    banking_details: z.object({
        account_holder: z.string(),
        bank_name: z.string(),
        iban: z.string()
    }).nullable().optional(),
    finance: z.object({
        administration_fee: z.number().nullable(),
        income_per_gb: z.number().nullable(),
        commission_fee: z.number().optional(),
        payment_method: z.enum(["invoice", "direct"]),
        requires_card: z.boolean().nullable(),
        next_invoice: z.date().nullable(), // Previously Timestamp
        last_invoice: z.date().nullable(), // Previously Timestamp
        pricing_strategies: z.object({
            partner: z.object({
                strategy: z.enum(["split", "bundle"]),
                default_price_list: z.string().nullable(),
                custom_prices: z.array(z.any()),
                modification_percentage: z.number()
            }),
            user: z.object({
                default_price_list: z.string().nullable(),
                custom_prices: z.array(z.any()),
                modification_percentage: z.number()
            })
        }).optional()
    }).nullable(),
    platform_settings: z.any().optional(),
    visual_identity: z.any().nullable(),
    users: z.array(z.string()).nullable(), // Previously DocumentReference[]
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }).optional(),
    created_at: z.date(),
    updated_at: z.date(),
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

export const partnerApiResponseSchema = partnerApiRequestSchema;

// Define types based on schemas
export type PackageSpecification = z.infer<typeof packageSpecificationSchema>;
export type PackageSpecifications = z.infer<typeof packageSpecificationsSchema>;
export type BookingApiRequest = z.infer<typeof bookingApiRequestSchema>;
export type BookingApiResponse = z.infer<typeof bookingApiResponseSchema>;
export type PromoCodeApiResponse = z.infer<typeof promoCodeApiResponseSchema>;
export type PartnerApiRequest = z.infer<typeof partnerApiRequestSchema>;
export type PartnerApiResponse = z.infer<typeof partnerApiResponseSchema>; 