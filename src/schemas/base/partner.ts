import { z } from 'zod';
import {
    baseModelAppSchema
} from './helpers';
import { SUPPORTED_LOCALES, supportedLocalesSchema } from '../../constants';
import {
    packageRefString,
    partnerRefStringNullable,
    userRefStringArrayNullable,
    priceListRefStringNullable
} from './refs';

// Helper schemas for nested structures
export const addressSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional()
}).nullable();

export const registrationSchema = z.object({
    chamber_of_commerce_number: z.string().nullable().optional(),
    vat_number: z.string().nullable().optional(),
    anvr_number: z.number().nullable().optional(),
    tax_number: z.string().nullable().optional()
}).nullable();

export const bankingDetailsSchema = z.object({
    account_holder: z.string(),
    bank_name: z.string(),
    iban: z.string()
}).nullable();

// Common package price fields shared between schemas
export const commonPackagePriceFields = {
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limit', 'time-limit']),
    price: z.number()
};

export const packagePriceAppSchema = z.object({
    ...commonPackagePriceFields,
    package: packageRefString,
});

// Common pricing strategy fields
export const commonPricingStrategyFields = {
    modification_percentage: z.number()
};

export const partnerPricingStrategyAppSchema = z.object({
    ...commonPricingStrategyFields,
    strategy: z.enum(['split', 'bundle']),
    default_price_list: priceListRefStringNullable,
    custom_prices: z.array(packagePriceAppSchema),
});

export const userPricingStrategyAppSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list: priceListRefStringNullable,
    custom_prices: z.array(packagePriceAppSchema),
});

// Common financial properties fields
export const commonFinancialPropertiesFields = {
    administration_fee: z.number().nullable(),
    income_per_gb: z.number().nullable(),
    commission_fee: z.number().nullable().optional(),
    payment_method: z.enum(['invoice', 'direct']),
    requires_card: z.boolean().nullable(),
    next_invoice: z.date().nullable().optional(),
    last_invoice: z.date().nullable().optional(),
};

export const financialPropertiesAppSchema = z.object({
    ...commonFinancialPropertiesFields,
    pricing_strategies: z.object({
        partner: partnerPricingStrategyAppSchema.optional(),
        user: userPricingStrategyAppSchema.optional()
    }).nullable()
}).nullable();

export const packageStrategySchema = z.object({
    name: z.string(),
    iso3_white_list: z.array(z.string()).optional(),
    parameters: z.any()
});

export const bookingDefaultsSchema = z.object({
    locale: supportedLocalesSchema
});

export const bookingConfirmationSchema = z.object({
    brevo_template_id: z.number(),
    send_booking_confirmation: z.boolean()
});

export const visualIdentityBannerSchema = z.object({
    image_url: z.string(),
    alt: z.string(),
    click_url: z.string(),
    locale: supportedLocalesSchema,
    properties: z.record(z.string())
});

export const visualIdentityBannerStrategySchema = z.object({
    strategy: z.enum(['fixed', 'rotating', 'destination', 'time_of_day']),
    banners: z.array(visualIdentityBannerSchema)
});

export const visualIdentitySchema = z.object({
    primary_color: z.string(),
    secondary_color: z.string(),
    logo: z.string(),
    font: z.string(),
    top_banner: visualIdentityBannerStrategySchema,
    mid_banner: visualIdentityBannerStrategySchema
});

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
}).nullable();

export const scheduleSchema = z.object({
    days: z.number(),
    email: z.object({
        brevo_template_id: z.number(),
        subject: z.record(z.string()).optional(),
        preview_text: z.record(z.string()).optional()
    }).nullable().optional(),
    push: z.object({
        title: z.record(z.string()).optional(),
        body: z.record(z.string()).optional(),
        target: z.string()
    }).nullable().optional(),
    hour: z.number(),
    key: z.string(),
    method: z.enum(['email', 'sms', 'whatsapp', 'push']),
    moment: z.enum(['departure', 'return', 'immediate']),
    filter: scheduleFilterSchema.nullable().optional()
});

export const platformSettingsSchema = z.object({
    package_strategy: packageStrategySchema.nullable().optional(),
    free_esim: z.object({
        packackage_specification: z.object({
            size: z.string(),
            type: z.string(),
            destination: z.string()
        }),
        allowance: z.number()
    }).nullable().optional(),
    booking_defaults: bookingDefaultsSchema.nullable().optional(),
    booking_confirmation: bookingConfirmationSchema.nullable().optional(),
    schedules: z.array(scheduleSchema).optional(),
    ios_app_id: z.string().optional(),
    android_package_id: z.string().optional(),
    faq: z.object({
        title: z.record(z.string()),
        content: z.record(z.string()).optional(),
        link: z.record(z.string())
    }).array().optional(),
    ios_config: z.string().optional(),
    terms_of_service: z.record(z.string()).optional(),
    privacy_policy: z.record(z.string()).optional(),
    enabled_locales: z.array(supportedLocalesSchema).optional(),
    custom_texts: z.record(z.record(z.string())).optional()
}).nullable();

// Common contact information fields
const commonContactFields = {
    email: z.string().nullable(),
    office_phone: z.string().nullable().optional(),
};

// Common partner fields
export const commonPartnerFields = {
    name: z.string().nullable(),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),
    contact: z.object(commonContactFields).nullable(),
    address: addressSchema,
    registration: registrationSchema,
    banking_details: bankingDetailsSchema,
    visual_identity: visualIdentitySchema.nullable(),
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }).nullable().optional()
};

// App schema for Partner
export const partnerAppSchema = baseModelAppSchema.extend({
    ...commonPartnerFields,
    parent: partnerRefStringNullable,
    users: userRefStringArrayNullable,
    financial_properties: financialPropertiesAppSchema,
    platform_settings: platformSettingsSchema
});

// App schema for PriceList
export const priceListAppSchema = baseModelAppSchema.extend({
    name: z.string(),
    description: z.string().nullable(),
    partner: partnerRefStringNullable,
    package_prices: z.array(packagePriceAppSchema)
});

// Types for App schemas
export type PartnerApp = z.infer<typeof partnerAppSchema>;
export type PriceListApp = z.infer<typeof priceListAppSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Registration = z.infer<typeof registrationSchema>;
export type BankingDetails = z.infer<typeof bankingDetailsSchema>;
export type PackagePriceApp = z.infer<typeof packagePriceAppSchema>;
export type PartnerPricingStrategyApp = z.infer<typeof partnerPricingStrategyAppSchema>;
export type UserPricingStrategyApp = z.infer<typeof userPricingStrategyAppSchema>;
export type FinancialPropertiesApp = z.infer<typeof financialPropertiesAppSchema>;
export type PackageStrategy = z.infer<typeof packageStrategySchema>;
export type BookingDefaults = z.infer<typeof bookingDefaultsSchema>;
export type BookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
export type VisualIdentityBanner = z.infer<typeof visualIdentityBannerSchema>;
export type VisualIdentityBannerStrategy = z.infer<typeof visualIdentityBannerStrategySchema>;
export type VisualIdentity = z.infer<typeof visualIdentitySchema>;
export type ScheduleFilter = z.infer<typeof scheduleFilterSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type PlatformSettings = z.infer<typeof platformSettingsSchema>;

// For backwards compatibility
export type HPartner = PartnerApp;
export type HPriceList = PriceListApp;
export type HPackagePrice = PackagePriceApp;
export type HFinancialProperties = FinancialPropertiesApp;
export type HPlatformSettings = PlatformSettings;
export type HVisualIdentity = VisualIdentity;
export type HSchedule = Schedule;
export type HPackageStrategy = PackageStrategy;
export type HBookingDefaults = BookingDefaults;
export type HBookingConfirmation = BookingConfirmation;
export type HVisualIdentityBanner = VisualIdentityBanner;
export type HVisualIdentityBannerStrategy = VisualIdentityBannerStrategy;
export type HScheduleFilter = ScheduleFilter; 