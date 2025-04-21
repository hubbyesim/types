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
import { SUPPORTED_LOCALES } from '../constants';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

// Define collection paths
export const PARTNER_COLLECTION = 'partners';
export const PRICE_LIST_COLLECTION = 'priceLists';
export const PACKAGE_COLLECTION = 'packages';
export const USER_COLLECTION = 'users';

// Define document reference schemas
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const priceListRefSchema = createDocRefSchema<any>(PRICE_LIST_COLLECTION);
export const packageRefSchema = createDocRefSchema<any>(PACKAGE_COLLECTION);
export const userRefSchema = createDocRefSchema<any>(USER_COLLECTION);

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
    package: z.string(),
});

// Common pricing strategy fields
const commonPricingStrategyFields = {
    strategy: z.enum(['split', 'bundle']),
    modification_percentage: z.number()
};

export const pricingStrategyFirestoreSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list: priceListRefSchema.schema.nullable(),
    custom_prices: z.array(packagePriceFirestoreSchema),
});

export const pricingStrategyAppSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list_id: z.string().nullable(),
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
        partner: pricingStrategyFirestoreSchema,
        user: pricingStrategyFirestoreSchema
    }).nullable()
}).nullable();

export const financialPropertiesAppSchema = z.object({
    ...commonFinancialPropertiesFields,
    pricing_strategies: z.object({
        partner: pricingStrategyAppSchema,
        user: pricingStrategyAppSchema
    }).nullable()
}).nullable();

export const packageStrategySchema = z.object({
    name: z.string(),
    iso3_white_list: z.array(z.string()).optional(),
    parameters: z.any()
});

export const bookingDefaultsSchema = z.object({
    locale: z.enum(SUPPORTED_LOCALES)
});

export const bookingConfirmationSchema = z.object({
    brevo_template_id: z.number(),
    send_booking_confirmation: z.boolean()
});

export const visualIdentityBannerSchema = z.object({
    image_url: z.string(),
    alt: z.string(),
    click_url: z.string(),
    locale: z.enum(SUPPORTED_LOCALES),
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
    parent: documentRefSchema.nullable(),
    users: z.array(documentRefSchema).nullable(),
    financial_properties: financialPropertiesFirestoreSchema,
});

// App schema for Partner
export const partnerAppSchema = baseModelAppSchema.extend({
    ...commonPartnerFields,
    parent: z.string().nullable(),
    users: z.array(z.string()).nullable(),
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
export type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
export type PartnerApp = z.infer<typeof partnerAppSchema>;
export type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
export type PriceListApp = z.infer<typeof priceListAppSchema>;

// Field mapping for conversions
interface RefFieldMapping {
    app: keyof PartnerApp;
    firestore: keyof PartnerFirestore;
    collection: string;
    nullable?: boolean;
    isArray?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'parent', firestore: 'parent', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'users', firestore: 'users', collection: USER_COLLECTION, nullable: true, isArray: true }
];

// Conversion functions
export const partnerToFirestore = (partner: PartnerApp): PartnerFirestore => {
    // Create base object with common fields
    const result = { ...partner } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = toFirestore.date(partner.created_at);
    result.updated_at = toFirestore.date(partner.updated_at);
    result.created_by = typeof partner.created_by === 'string' ? partner.created_by : null;
    result.updated_by = typeof partner.updated_by === 'string' ? partner.updated_by : null;

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable, isArray }) => {
        const value = partner[app];

        if (isArray) {
            if (nullable && value === null) {
                result[firestore] = null;
            } else if (Array.isArray(value)) {
                result[firestore] = value.map(id => toFirestore.ref<any>(collection, id));
            }
        } else if (nullable && value === null) {
            result[firestore] = null;
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }

        // Delete app field to avoid duplication
        delete result[app];
    });

    // Handle financial properties specially due to complex nested structure
    if (partner.financial_properties) {
        const fp = { ...partner.financial_properties };

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
                default_price_list: ps.partner.default_price_list_id
                    ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.partner.default_price_list_id)
                    : null,
                custom_prices: ps.partner.custom_prices.map(price => ({
                    ...price,
                    package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.package)
                }))
            };

            // Convert user pricing strategy
            const userStrategy = {
                ...ps.user,
                default_price_list: ps.user.default_price_list_id
                    ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.user.default_price_list_id)
                    : null,
                custom_prices: ps.user.custom_prices.map(price => ({
                    ...price,
                    package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.package)
                }))
            };

            const partnerStrategyObj: any = partnerStrategy;
            const userStrategyObj: any = userStrategy;

            if ('default_price_list_id' in partnerStrategyObj) {
                delete partnerStrategyObj.default_price_list_id;
            }

            if ('default_price_list_id' in userStrategyObj) {
                delete userStrategyObj.default_price_list_id;
            }

            // Set pricing strategies
            financialProps.pricing_strategies = {
                partner: partnerStrategyObj,
                user: userStrategyObj
            };
        }

        result.financial_properties = financialProps;
    }

    return result as unknown as PartnerFirestore;
};

export const partnerFromFirestore = (firestorePartner: PartnerFirestore): PartnerApp => {
    // Create base object with common fields
    const result = { ...firestorePartner } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = fromFirestore.date(firestorePartner.created_at);
    result.updated_at = fromFirestore.date(firestorePartner.updated_at);
    result.created_by = typeof firestorePartner.created_by === 'string'
        ? firestorePartner.created_by
        : firestorePartner.created_by ? fromFirestore.ref(firestorePartner.created_by) : null;
    result.updated_by = typeof firestorePartner.updated_by === 'string'
        ? firestorePartner.updated_by
        : firestorePartner.updated_by ? fromFirestore.ref(firestorePartner.updated_by) : null;

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable, isArray }) => {
        const value = firestorePartner[firestore];

        if (isArray) {
            if (nullable && value === null) {
                result[app] = null;
            } else if (Array.isArray(value)) {
                result[app] = value.map(ref => fromFirestore.ref(ref as any));
            }
        } else if (nullable && value === null) {
            result[app] = null;
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }

        // Delete firestore field to avoid duplication
        delete result[firestore];
    });

    // Handle financial properties specially
    if (firestorePartner.financial_properties) {
        const fp = { ...firestorePartner.financial_properties };

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
                default_price_list_id: ps.partner.default_price_list
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
                default_price_list_id: ps.user.default_price_list
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

    return result as unknown as PartnerApp;
};

// Field mapping for price list conversions
interface PriceListRefMapping {
    isArray: boolean;
    field: keyof PriceListFirestore & keyof PriceListApp;
    itemField: string;
    collection: string;
}

const priceListRefMappings: PriceListRefMapping[] = [
    { isArray: true, field: 'price_list', itemField: 'package', collection: PACKAGE_COLLECTION }
];

// Conversion function for PriceList from Firestore to App format
export const priceListFromFirestore = (firestorePriceList: PriceListFirestore): PriceListApp => {
    // Create base object with common fields
    const result = { ...firestorePriceList } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = fromFirestore.date(firestorePriceList.created_at);
    result.updated_at = fromFirestore.date(firestorePriceList.updated_at);
    result.created_by = typeof firestorePriceList.created_by === 'string'
        ? firestorePriceList.created_by
        : firestorePriceList.created_by ? fromFirestore.ref(firestorePriceList.created_by) : null;
    result.updated_by = typeof firestorePriceList.updated_by === 'string'
        ? firestorePriceList.updated_by
        : firestorePriceList.updated_by ? fromFirestore.ref(firestorePriceList.updated_by) : null;

    // Convert array of objects with document references
    priceListRefMappings.forEach(({ isArray, field, itemField }) => {
        const priceList = firestorePriceList[field];
        if (isArray && Array.isArray(priceList)) {
            result[field] = priceList.map((item: any) => ({
                ...item,
                [itemField]: fromFirestore.ref(item[itemField])
            }));
        }
    });

    return result as unknown as PriceListApp;
};

// Conversion function for PriceList from App to Firestore format
export const priceListToFirestore = (priceList: PriceListApp): PriceListFirestore => {
    // Create base object with common fields
    const result = { ...priceList } as unknown as Record<string, any>;

    // Handle base model fields
    result.created_at = toFirestore.date(priceList.created_at);
    result.updated_at = toFirestore.date(priceList.updated_at);
    result.created_by = typeof priceList.created_by === 'string' ? priceList.created_by : null;
    result.updated_by = typeof priceList.updated_by === 'string' ? priceList.updated_by : null;

    // Convert array of objects with document references
    priceListRefMappings.forEach(({ isArray, field, itemField, collection }) => {
        const priceListValue = priceList[field];
        if (isArray && Array.isArray(priceListValue)) {
            result[field] = priceListValue.map((item: any) => ({
                ...item,
                [itemField]: toFirestore.ref<any>(collection, item[itemField])
            }));
        }
    });

    return result as unknown as PriceListFirestore;
};

// For backwards compatibility
export type Partner = PartnerFirestore;
export type HPartner = PartnerApp;
export type PriceList = PriceListFirestore;
export type HPriceList = PriceListApp;
export type PackagePrice = z.infer<typeof packagePriceAppSchema>; 