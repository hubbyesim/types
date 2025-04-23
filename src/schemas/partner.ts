import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    documentRefSchema,
    createDocRefSchema,
    docRefToStringSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import { SUPPORTED_LOCALES, supportedLocalesSchema } from '../constants';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { 
    partnerRefSchema, 
    priceListRefSchema, 
    packageRefSchema, 
    userRefSchema,
    partnerRefNullable,
    userRefArrayNullable,
    priceListRefNullable,
    packageRefString,
    partnerRefStringNullable,
    userRefStringArrayNullable,
    priceListRefStringNullable,
    PARTNER_COLLECTION,
    PRICE_LIST_COLLECTION,
    PACKAGE_COLLECTION,
    USER_COLLECTION
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

// Common package price fields shared between Firestore and App schemas
const commonPackagePriceFields = {
    destination: z.string(),
    label: z.string(),
    type: z.enum(['data-limit', 'time-limit']),
    price: z.number()
};

export const packagePriceFirestoreSchema = z.object({
    ...commonPackagePriceFields,
    package: packageRefSchema.schema,
});

export const packagePriceAppSchema = z.object({
    ...commonPackagePriceFields,
    package: packageRefString,
});

// Common pricing strategy fields
const commonPricingStrategyFields = {
    strategy: z.enum(['split', 'bundle']),
    modification_percentage: z.number()
};

export const partnerPricingStrategyFirestoreSchema = z.object({
    ...commonPricingStrategyFields,
    strategy: z.enum(['split', 'bundle']),
    default_price_list: priceListRefNullable,
    custom_prices: z.array(packagePriceFirestoreSchema),
});

export const partnerPricingStrategyAppSchema = z.object({
    ...commonPricingStrategyFields,
    strategy: z.enum(['split', 'bundle']),
    default_price_list: priceListRefStringNullable,
    custom_prices: z.array(packagePriceAppSchema),
});

export const userPricingStrategyFirestoreSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list: priceListRefNullable,
    custom_prices: z.array(packagePriceFirestoreSchema),
});

export const userPricingStrategyAppSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list: priceListRefStringNullable,
    custom_prices: z.array(packagePriceAppSchema),
});

// Common financial properties fields
const commonFinancialPropertiesFields = {
    administration_fee: z.number().nullable(),
    income_per_gb: z.number().nullable(),
    commission_fee: z.number().nullable().optional(),
    payment_method: z.enum(['invoice', 'direct']),
    requires_card: z.boolean().nullable(),
    next_invoice: z.date().nullable(),
    last_invoice: z.date().nullable(),
};

export const financialPropertiesFirestoreSchema = z.object({
    ...commonFinancialPropertiesFields,
    pricing_strategies: z.object({
        partner: partnerPricingStrategyFirestoreSchema,
        user: userPricingStrategyFirestoreSchema
    }).nullable()
}).nullable();

export const financialPropertiesAppSchema = z.object({
    ...commonFinancialPropertiesFields,
    pricing_strategies: z.object({
        partner: partnerPricingStrategyAppSchema,
        user: userPricingStrategyAppSchema
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
    }).nullable(),
    push: z.object({
        title: z.record(z.string()).optional(),
        body: z.record(z.string()).optional(),
        target: z.string()
    }).nullable(),
    hour: z.number(),
    key: z.string(),
    method: z.enum(['email', 'sms', 'whatsapp', 'push']),
    moment: z.enum(['departure', 'return', 'immediate']),
    filter: scheduleFilterSchema
});

export const platformSettingsSchema = z.object({
    package_strategy: packageStrategySchema.nullable().optional(),
    free_esim: z.object({
        allowance: z.number().nullable(),
        package_specifications: z.record(z.any()).nullable()
    }).nullable(),
    booking_defaults: bookingDefaultsSchema.nullable(),
    schedules: z.array(scheduleSchema).nullable(),
    booking_confirmation: bookingConfirmationSchema.nullable()
}).nullable();

// Common partner fields shared between Firestore and App schemas
const commonPartnerFields = {
    // Basic information
    name: z.string().nullable(),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),

    // Contact information
    contact: z.object({
        email: z.string().nullable(),
        office_phone: z.string().nullable().optional()
    }).nullable(),

    // Location information
    address: addressSchema,

    // Registration information
    registration: registrationSchema,

    // Banking information
    banking_details: bankingDetailsSchema,

    // Platform settings
    platform_settings: platformSettingsSchema,

    // Visual identity
    visual_identity: visualIdentitySchema.nullable(),

    // Metadata
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }).nullable()
};

// Firestore schema for Partner
export const partnerFirestoreSchema = baseModelSchema.extend({
    ...commonPartnerFields,
    parent: partnerRefNullable,
    users: userRefArrayNullable,
    financial_properties: financialPropertiesFirestoreSchema,
});

// App schema for Partner
export const partnerAppSchema = baseModelAppSchema.extend({
    ...commonPartnerFields,
    parent: partnerRefStringNullable,
    users: userRefStringArrayNullable,
    financial_properties: financialPropertiesAppSchema,
});

// Common price list fields
const commonPriceListFields = {
    name: z.string(),
    type: z.enum(['partner', 'user']).default('partner'),
};

// Type for price list
export const priceListFirestoreSchema = baseModelSchema.extend({
    ...commonPriceListFields,
    price_list: z.array(packagePriceFirestoreSchema)
});

export const priceListAppSchema = baseModelAppSchema.extend({
    ...commonPriceListFields,
    price_list: z.array(packagePriceAppSchema)
});

// Define types based on schemas


// Field mapping for conversions using the shared GenericRefFieldMapping interface
import { 
    GenericRefFieldMapping, 
    GenericDateFieldMapping, 
    genericToFirestore, 
    genericFromFirestore 
} from './utils';

const refFieldMappings: GenericRefFieldMapping<PartnerApp, PartnerFirestore>[] = [
    { app: 'parent', firestore: 'parent', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'users', firestore: 'users', collection: USER_COLLECTION, nullable: true, isArray: true }
];

// Conversion functions
export const partnerToFirestore = (partner: PartnerApp): PartnerFirestore => {
    return genericToFirestore({
        appObject: partner,
        refFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result: Record<string, any>, appData: PartnerApp) => {
            // Handle financial properties specially due to complex nested structure
            if (appData.financial_properties) {
                const fp = { ...appData.financial_properties };
                const financialProps: any = {
                    ...fp,
                    pricing_strategies: null
                };

                // Handle pricing strategies if they exist
                if (fp.pricing_strategies) {
                    const ps = fp.pricing_strategies;

                    // Convert partner pricing strategy
                    const partnerStrategy = {
                        ...ps.partner,
                        default_price_list: ps.partner.default_price_list
                            ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.partner.default_price_list)
                            : null,
                        custom_prices: ps.partner.custom_prices.map((price: PackagePriceApp) => ({
                            ...price,
                            package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.package)
                        }))
                    };

                    // Convert user pricing strategy
                    const userStrategy = {
                        ...ps.user,
                        default_price_list: ps.user.default_price_list
                            ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.user.default_price_list)
                            : null,
                        custom_prices: ps.user.custom_prices.map((price: PackagePriceApp) => ({
                            ...price,
                            package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.package)
                        }))
                    };

                    const partnerStrategyObj: any = partnerStrategy;
                    const userStrategyObj: any = userStrategy;

                    if ('default_price_list' in partnerStrategyObj) {
                        delete partnerStrategyObj.default_price_list;
                    }

                    if ('default_price_list' in userStrategyObj) {
                        delete userStrategyObj.default_price_list;
                    }

                    // Set pricing strategies
                    financialProps.pricing_strategies = {
                        partner: partnerStrategyObj,
                        user: userStrategyObj
                    };
                }

                result.financial_properties = financialProps;
            }
        }
    });
};

export const partnerFromFirestore = (firestorePartner: PartnerFirestore): PartnerApp => {
    return genericFromFirestore({
        firestoreObject: firestorePartner,
        refFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result: Record<string, any>, firestoreData: PartnerFirestore) => {
            // Handle financial properties specially
            if (firestoreData.financial_properties) {
                const fp = { ...firestoreData.financial_properties };
                const financialProps: any = {
                    ...fp,
                    pricing_strategies: null
                };

                // Handle pricing strategies if they exist
                if (fp.pricing_strategies) {
                    const ps = fp.pricing_strategies;

                    // Convert partner pricing strategy
                    const partnerStrategy = {
                        ...ps.partner,
                        default_price_list: ps.partner.default_price_list
                            ? fromFirestore.ref(ps.partner.default_price_list)
                            : null,
                        custom_prices: ps.partner.custom_prices.map(price => ({
                            ...price,
                            package: fromFirestore.ref(price.package)
                        }))
                    };

                    // Convert user pricing strategy
                    const userStrategy = {
                        ...ps.user,
                        default_price_list: ps.user.default_price_list
                            ? fromFirestore.ref(ps.user.default_price_list)
                            : null,
                        custom_prices: ps.user.custom_prices.map(price => ({
                            ...price,
                            package: fromFirestore.ref(price.package)
                        }))
                    };

                    const partnerStrategyObj: any = partnerStrategy;
                    const userStrategyObj: any = userStrategy;

                    if ('default_price_list' in partnerStrategyObj) {
                        delete partnerStrategyObj.default_price_list;
                    }

                    if ('default_price_list' in userStrategyObj) {
                        delete userStrategyObj.default_price_list;
                    }

                    // Set pricing strategies
                    financialProps.pricing_strategies = {
                        partner: partnerStrategyObj,
                        user: userStrategyObj
                    };
                }

                result.financial_properties = financialProps;
            }
        }
    });
};

// Field mapping for price list conversions
const priceListRefFieldMappings: GenericRefFieldMapping<PriceListApp, PriceListFirestore>[] = [];

// Conversion function for PriceList from Firestore to App format
export const priceListFromFirestore = (firestorePriceList: PriceListFirestore): PriceListApp => {
    return genericFromFirestore({
        firestoreObject: firestorePriceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result: Record<string, any>, firestoreData: PriceListFirestore) => {
            // Convert array of objects with document references
            const priceList = firestoreData.price_list;
            if (Array.isArray(priceList)) {
                result.price_list = priceList.map((item: any) => ({
                    ...item,
                    package: fromFirestore.ref(item.package)
                }));
            }
        }
    });
};

// Conversion function for PriceList from App to Firestore format
export const priceListToFirestore = (priceList: PriceListApp): PriceListFirestore => {
    return genericToFirestore({
        appObject: priceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result: Record<string, any>, appData: PriceListApp) => {
            // Convert array of objects with document references
            const priceListValue = appData.price_list;
            if (Array.isArray(priceListValue)) {
                result.price_list = priceListValue.map((item: any) => ({
                    ...item,
                    package: toFirestore.ref<any>(PACKAGE_COLLECTION, item.package)
                }));
            }
        }
    });
};

// For backwards compatibility
export type Partner = PartnerFirestore;
export type HPartner = PartnerApp;
export type PriceList = PriceListFirestore;
export type HPriceList = PriceListApp;

export type HPackagePrice = z.infer<typeof packagePriceAppSchema>;
export type PackagePrice = z.infer<typeof packagePriceFirestoreSchema>;

export type HFinancialProperties = z.infer<typeof financialPropertiesAppSchema>;
export type FinancialProperties = z.infer<typeof financialPropertiesFirestoreSchema>;
export type HPlatformSettings = z.infer<typeof platformSettingsSchema>;
export type HVisualIdentity = z.infer<typeof visualIdentitySchema>;
export type HSchedule = z.infer<typeof scheduleSchema>;
export type HPackageStrategy = z.infer<typeof packageStrategySchema>;
export type HBookingDefaults = z.infer<typeof bookingDefaultsSchema>;
export type HBookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
export type HVisualIdentityBanner = z.infer<typeof visualIdentityBannerSchema>;
export type HVisualIdentityBannerStrategy = z.infer<typeof visualIdentityBannerStrategySchema>;
export type HScheduleFilter = z.infer<typeof scheduleFilterSchema>;
export type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
export type PartnerApp = z.infer<typeof partnerAppSchema>;
export type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
export type PriceListApp = z.infer<typeof priceListAppSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Registration = z.infer<typeof registrationSchema>;
export type BankingDetails = z.infer<typeof bankingDetailsSchema>;
export type PackagePriceFirestore = z.infer<typeof packagePriceFirestoreSchema>;
export type PackagePriceApp = z.infer<typeof packagePriceAppSchema>;
export type PartnerPricingStrategyFirestore = z.infer<typeof partnerPricingStrategyFirestoreSchema>;
export type PartnerPricingStrategyApp = z.infer<typeof partnerPricingStrategyAppSchema>;
export type UserPricingStrategyFirestore = z.infer<typeof userPricingStrategyFirestoreSchema>;
export type UserPricingStrategyApp = z.infer<typeof userPricingStrategyAppSchema>;
export type FinancialPropertiesFirestore = z.infer<typeof financialPropertiesFirestoreSchema>;
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