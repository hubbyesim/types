import { z, ZodLazy } from 'zod';
import { markAsSchemaSpec } from '../common';
import { supportedLocalesSchema, SUPPORTED_LOCALES, SupportedLocales } from '../constants';
import {
    PARTNER_COLLECTION,
    USER_COLLECTION,
    PACKAGE_COLLECTION,
    PRICE_LIST_COLLECTION,
    tagModelSpec,
    timestampRequired,
    timestampNullableOptional
} from './common';

// ===== Helper schemas for nested structures =====

// Address schema
export const addressSchema = z.object({
    street: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    postal_code: z.string().nullable().optional(),
    country: z.string().nullable().optional()
});

export const companyDetailsSchema = z.object({
    business_name: z.string().nullable().optional(),
    company_registration_number: z.string().nullable().optional(),
    tax_id: z.string().nullable().optional()
});

// Emit event schema
export const emitEventSchema = z.object({
    topup: z.boolean().optional().default(false),
    redemption: z.boolean().optional().default(false),
    activation: z.boolean().optional().default(false),
    depletion: z.boolean().optional().default(false),
});

// Registration schema
export const registrationSchema = z.object({
    chamber_of_commerce_number: z.string().nullable().optional(),
    vat_number: z.string().nullable().optional(),
    anvr_number: z.number().nullable().optional(),
    tax_number: z.string().nullable().optional()
});

// Banking details schema
export const bankingDetailsSchema = z.object({
    account_holder: z.string().nullable().optional(),
    billing_email: z.string().nullable().optional(),
    bank_name: z.string().nullable().optional(),
    iban: z.string().nullable().optional(),
    currency: z.string().nullable().optional()
});

// Package price schema
export const packagePriceSchema = z.object({
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limited', 'time-limited']),
    price: z.number(),
    package: z.object({ _type: z.literal('docRef'), collection: z.literal(PACKAGE_COLLECTION) })
});

// Package specification schema
export const packageSpecificationSchema = z.object({
    size: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    destination: z.string().nullable().optional()
});

// Pricing strategy schema
export const pricingStrategySchema = z.object({
    strategy: z.enum(['split', 'bundle']),
    modification_percentage: z.number(),
    default_price_list: z.object({
        _type: z.literal('docRef'),
        collection: z.literal(PRICE_LIST_COLLECTION),
        nullable: z.literal(true)
    }),
    custom_prices: z.array(packagePriceSchema)
});

// Visual identity banner schema
export const visualIdentityBannerSchema = z.object({
    action: z.string().nullable().optional(),
    image_url: z.string(),
    alt: z.string(),
    click_url: z.string(),
    locale: supportedLocalesSchema,
    properties: z.record(z.string())
});

// Schedule filter schema
export const scheduleFilterSchema = z.object({
    type: z.enum(['iso3', 'gender', 'percentage', 'age']),
    value: z.union([z.string(), z.number()]),
    comparison: z.enum([
        'equal',
        'not_equal',
        'greater_than',
        'less_than',
        'greater_than_or_equal',
        'less_than_or_equal'
    ])
});

// Convert object-like schemas to proper Zod objects
export const visualIdentityBannersSchema = z.object({
    strategy: z.enum(['fixed', 'rotating', 'destination', 'time_of_day']),
    banners: z.array(visualIdentityBannerSchema).nullable().optional()
});

export const visualIdentitySchema = z.object({
    primary_color: z.string(),
    secondary_color: z.string(),
    logo: z.string(),
    font: z.string().nullable().optional(),
    top_banner: visualIdentityBannersSchema.optional(),
    mid_banner: visualIdentityBannersSchema.optional()
});

// Partner contact schema
export const partnerContactSchema = z.object({
    name: z.string().nullable().optional(),
    email: z.string().nullable(),
    office_phone: z.string().nullable().optional(),
    office_email: z.string().nullable().optional()
});

// Partner data schema
export const partnerDataSchema = z.object({
    source: z.string(),
    manual: z.boolean()
});

// Package strategy schema
export const packageStrategySchema = z.object({
    name: z.string(),
    iso3_white_list: z.array(z.string()).optional(),
    parameters: z.any()
});

// Schedule email schema
export const scheduleEmailSchema = z.object({
    brevo_template_id: z.number(),
    subject: z.record(z.string()).refine(
        (val: Record<string, string>) => Object.keys(val).every(key => SUPPORTED_LOCALES.includes(key as SupportedLocales)),
        { message: "Keys must be supported locales" }
    ).optional(),
    preview_text: z.record(z.string()).refine(
        (val: Record<string, string>) => Object.keys(val).every(key => SUPPORTED_LOCALES.includes(key as SupportedLocales)),
        { message: "Keys must be supported locales" }
    ).optional()
}).nullable().optional();

// Schedule push schema
export const schedulePushSchema = z.object({
    title: z.record(z.string()).optional(),
    body: z.record(z.string()).optional(),
    target: z.string()
}).nullable().optional();

// Schedule schema
export const scheduleSchema = z.object({
    days: z.number(),
    email: scheduleEmailSchema,
    push: schedulePushSchema,
    hour: z.number(),
    key: z.string(),
    method: z.enum(['email', 'sms', 'whatsapp', 'push']),
    moment: z.enum(['departure_date', 'return_date', 'immediate']),
    filter: scheduleFilterSchema.nullable().optional()
});

export const freeEsimSchema = z.object({
    enabled: z.boolean(),
    package_specification: z.object({
        size: z.string(),
        package_type: z.string(),
        destination: z.string(),
        package_duration: z.number(),
        type: z.string().nullable().optional()
    }),
    booking_id_verification: z.boolean().default(false),
    booking_id_verification_pattern: z.string().nullable().optional(),
    allowance: z.number(),
    total_allowance: z.number(),
});

// Agent signup settings schema
export const agentSignupSettingsSchema = z.object({
    slack_channel: z.string().nullable().optional(),
    welcome_email_template: z.number().nullable().optional(),
    password_reset_template: z.number().nullable().optional(),
    partner_type: z.enum(['wholesale', 'reseller', 'platform', 'agent']).nullable().optional(),
    enable_complimentary_booking: z.boolean().default(true),
    complimentary_booking_partner_id: z.string().nullable().optional(),
    visual_identity_options: z.object({
        hubby_branding: z.boolean().default(true),
        source_partner_branding: z.boolean().default(false),
        own_branding: z.boolean().default(false)
    }).default({})
});

// Platform settings schema
export const platformSettingsSchema = z.object({
    package_strategy: z.object({
        name: z.string(),
        iso3_white_list: z.array(z.string()).optional(),
        parameters: z.any(),
        supported_package_types: z.enum(['data-limited', 'unlimited']).optional()
    }).nullable().optional(),
    free_esim: freeEsimSchema.nullable().optional(),
    booking_defaults: z.object({
        locale: supportedLocalesSchema
    }).nullable().optional(),
    booking_confirmation: z.object({
        brevo_template_id: z.number(),
        send_booking_confirmation: z.boolean()
    }).nullable().optional(),
    emit_events: emitEventSchema.nullable().optional(),
    schedules: z.array(scheduleSchema).optional(),
    brevo: z.object({
        list_ids: z.array(z.number()),
        campaign_mode: z.boolean()
    }).nullable().optional(),
    visual_identity_options: z.object({
        hubby_branding: z.boolean().optional().default(true),
        source_partner_branding: z.boolean().optional().default(false),
        own_branding: z.boolean().optional().default(false)
    }).nullable().optional(),
    agent_signup_settings: agentSignupSettingsSchema.nullable().optional()
});

// ===== Exportable schema specs =====

// Package price schema spec
export const packagePriceSchemaSpec = markAsSchemaSpec({
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limited', 'time-limited']),
    price: z.number(),
    package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION }
});

// Financial properties schema spec
export const financialPropertiesSchemaSpec = markAsSchemaSpec({
    administration_fee: z.number().nullable(),
    income_per_gb: z.number().nullable(),
    commission_fee: z.number().nullable().optional(),
    commission_percentage: z.number().nullable().optional(),
    payment_method: z.enum(['invoice', 'direct']),
    requires_card: z.boolean().nullable(),
    next_invoice: timestampNullableOptional,
    last_invoice: timestampNullableOptional,
    pricing_strategies: {
        _type: 'object' as const,
        of: {
            partner: {
                _type: 'object' as const,
                of: {
                    strategy: z.enum(['split', 'bundle']),
                    modification_percentage: z.number(),
                    default_price_list: { _type: 'docRef' as const, collection: PRICE_LIST_COLLECTION, nullable: true },
                    custom_prices: {
                        _type: 'array' as const,
                        of: {
                            _type: 'object' as const,
                            of: {
                                destination: z.string(),
                                label: z.string(),
                                type: z.enum(['data-limited', 'time-limited']),
                                price: z.number(),
                                package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION }
                            }
                        }
                    }
                },
                optional: true
            },
            user: {
                _type: 'object' as const,
                of: {
                    modification_percentage: z.number(),
                    default_price_list: { _type: 'docRef' as const, collection: PRICE_LIST_COLLECTION, nullable: true },
                    custom_prices: {
                        _type: 'array' as const,
                        of: {
                            _type: 'object' as const,
                            of: {
                                destination: z.string(),
                                label: z.string(),
                                type: z.enum(['data-limited', 'time-limited']),
                                price: z.number(),
                                package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION }
                            }
                        }
                    }
                },
                optional: true
            }
        },
        nullable: true
    }
});

// Platform settings schema spec
export const platformSettingsSchemaSpec = markAsSchemaSpec({
    package_strategy: {
        _type: 'object' as const,
        of: packageStrategySchema.shape,
        nullable: true,
        optional: true
    },
    free_esim: {
        _type: 'object' as const,
        of: freeEsimSchema.shape,
        nullable: true,
        optional: true
    },
    booking_defaults: {
        _type: 'object' as const,
        of: {
            locale: supportedLocalesSchema
        },
        nullable: true,
        optional: true
    },
    booking_confirmation: {
        _type: 'object' as const,
        of: {
            brevo_template_id: z.number(),
            send_booking_confirmation: z.boolean()
        },
        nullable: true,
        optional: true
    },
    schedules: {
        _type: 'array' as const,
        of: {
            _type: 'object' as const,
            of: scheduleSchema.shape
        },
        optional: true
    },
    agent_signup_settings: {
        _type: 'object' as const,
        of: agentSignupSettingsSchema.shape,
        nullable: true,
        optional: true
    }
});

// Webhook settings schema
export const webhookSettingsSchema = z.object({
    url: z.string().url().nullable().optional(),
    api_key: z.string().nullable().optional(),
    enabled: z.boolean().default(false),
    events: z.object({
        promocode_redemption: z.boolean().default(false)
    }).default({})
});

// ===== Main partner schema =====
export const partnerSchemaSpec = markAsSchemaSpec({
    // Base model fields
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // Partner specific fields
    name: z.string().min(3),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),

    // Complex nested objects
    contact: {
        _type: 'object' as const,
        of: partnerContactSchema.shape,
        nullable: true
    },
    address: {
        _type: 'object' as const,
        of: addressSchema.shape,
        nullable: true
    },
    company_details: {
        _type: 'object' as const,
        of: companyDetailsSchema.shape,
        nullable: true
    },
    registration: {
        _type: 'object' as const,
        of: registrationSchema.shape,
        nullable: true
    },
    banking_details: {
        _type: 'object' as const,
        of: bankingDetailsSchema.shape,
        nullable: true
    },

    // Reference fields
    parent: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    users: { _type: 'array' as const, of: { _type: 'docRef' as const, collection: USER_COLLECTION }, nullable: true },

    // Complex nested structures
    financial_properties: financialPropertiesSchemaSpec,
    // Visual identity
    visual_identity: {
        _type: 'object' as const,
        of: visualIdentitySchema.shape,
        nullable: true
    },

    // Platform settings
    platform_settings: {
        _type: 'object' as const,
        of: platformSettingsSchema.shape,
        nullable: true
    },

    // Tags
    tags: {
        _type: 'array' as const,
        of: tagModelSpec,
        nullable: true,
        optional: true
    },

    // Tag slugs
    tag_slugs: {
        _type: 'array' as const,
        of: z.string(),
        nullable: true,
        optional: true
    },

    // Metadata
    data: {
        _type: 'object' as const,
        of: partnerDataSchema.shape,
        nullable: true,
        optional: true
    },

    // Webhook settings
    webhook_settings: {
        _type: 'object' as const,
        of: webhookSettingsSchema.shape,
        nullable: true,
        optional: true
    }
});

export const priceListItemSchemaSpec = z.object({
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limited', 'time-limited', 'starter', 'unlimited']),
    price: z.number(),
    package: z.string(),
});

// Price list item with docRef support for use in priceListSchemaSpec
const priceListItemWithDocRefSpec = {
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limited', 'time-limited', 'starter', 'unlimited']),
    price: z.number(),
    package: { _type: 'docRef' as const, collection: PACKAGE_COLLECTION }
};

// ===== Price list schema =====
export const priceListSchemaSpec = markAsSchemaSpec({
    // Base model fields
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable(),

    // Price list specific fields
    name: z.string().min(3),
    description: z.string().nullable(),
    type: z.enum(['partner', 'consumer']),
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    price_list: {
        _type: 'array' as const,
        of: priceListItemWithDocRefSpec,
        optional: true
    },
    package_prices: {
        _type: 'array' as const,
        of: priceListItemWithDocRefSpec
    },
});
