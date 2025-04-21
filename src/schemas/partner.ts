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

export const packagePriceFirestoreSchema = z.object({
    destination: z.string(),
    label: z.string(),
    package: packageRefSchema.schema,
    type: z.enum(['data-limit', 'time-limit']),
    price: z.number()
});

export const packagePriceAppSchema = z.object({
    destination: z.string(),
    label: z.string(),
    packageId: z.string(),
    type: z.enum(['data-limit', 'time-limit']),
    price: z.number()
});

export const pricingStrategyFirestoreSchema = z.object({
    strategy: z.enum(['split', 'bundle']),
    default_price_list: priceListRefSchema.schema.nullable(),
    custom_prices: z.array(packagePriceFirestoreSchema),
    modification_percentage: z.number()
});

export const pricingStrategyAppSchema = z.object({
    strategy: z.enum(['split', 'bundle']),
    default_price_list_id: z.string().nullable(),
    custom_prices: z.array(packagePriceAppSchema),
    modification_percentage: z.number()
});

export const financialPropertiesFirestoreSchema = z.object({
    administration_fee: z.number().nullable(),
    income_per_gb: z.number().nullable(),
    commission_fee: z.number().nullable().optional(),
    payment_method: z.enum(['invoice', 'direct']),
    requires_card: z.boolean().nullable(),
    next_invoice: z.date().nullable(),
    last_invoice: z.date().nullable(),
    pricing_strategies: z.object({
        partner: pricingStrategyFirestoreSchema,
        user: pricingStrategyFirestoreSchema
    }).nullable()
}).nullable();

export const financialPropertiesAppSchema = z.object({
    administration_fee: z.number().nullable(),
    income_per_gb: z.number().nullable(),
    commission_fee: z.number().nullable().optional(),
    payment_method: z.enum(['invoice', 'direct']),
    requires_card: z.boolean().nullable(),
    next_invoice: z.date().nullable(),
    last_invoice: z.date().nullable(),
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

// Firestore schema for Partner
export const partnerFirestoreSchema = baseModelSchema.extend({
    // Basic information
    name: z.string().nullable(),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),
    parent: documentRefSchema.nullable(),

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

    // Financial information
    financial_properties: financialPropertiesFirestoreSchema,

    // Platform settings
    platform_settings: platformSettingsSchema,

    // Visual identity
    visual_identity: visualIdentitySchema.nullable(),

    // User management
    users: z.array(documentRefSchema).nullable(),

    // Metadata
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }).nullable()
});

// App schema for Partner
export const partnerAppSchema = baseModelAppSchema.extend({
    // Basic information
    name: z.string().nullable(),
    type: z.string().nullable(),
    is_active: z.boolean().nullable().optional(),
    external_id: z.string().nullable().optional(),
    parentId: z.string().nullable(),

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

    // Financial information
    financial_properties: financialPropertiesAppSchema,

    // Platform settings
    platform_settings: platformSettingsSchema,

    // Visual identity
    visual_identity: visualIdentitySchema.nullable(),

    // User management
    user_ids: z.array(z.string()).nullable(),

    // Metadata
    data: z.object({
        source: z.string(),
        manual: z.boolean()
    }).nullable()
});

// Define types based on schemas
export type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
export type PartnerApp = z.infer<typeof partnerAppSchema>;

// Type for price list
export const priceListFirestoreSchema = baseModelSchema.extend({
    id: z.string(),
    name: z.string(),
    type: z.enum(['partner', 'user']).default('partner'),
    price_list: z.array(packagePriceFirestoreSchema)
});

export const priceListAppSchema = baseModelAppSchema.extend({
    id: z.string(),
    name: z.string(),
    type: z.enum(['partner', 'user']).default('partner'),
    price_list: z.array(packagePriceAppSchema)
});

export type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
export type PriceListApp = z.infer<typeof priceListAppSchema>;

// Conversion functions
export const partnerToFirestore = (partner: PartnerApp): PartnerFirestore => {
    // Create a base partner object
    const basePartner: Partial<PartnerFirestore> = {
        id: partner.id,
        created_at: toFirestore.date(partner.created_at),
        updated_at: toFirestore.date(partner.updated_at),
        created_by: typeof partner.created_by === 'string' ? partner.created_by : null,
        updated_by: typeof partner.updated_by === 'string' ? partner.updated_by : null,
        name: partner.name,
        type: partner.type,
        is_active: partner.is_active,
        external_id: partner.external_id,
        parent: partner.parentId
            ? toFirestore.ref<PartnerFirestore>(PARTNER_COLLECTION, partner.parentId)
            : null,
        contact: partner.contact,
        address: partner.address,
        registration: partner.registration,
        banking_details: partner.banking_details,
        platform_settings: partner.platform_settings,
        visual_identity: partner.visual_identity,
        users: partner.user_ids
            ? partner.user_ids.map(id => toFirestore.ref<any>(USER_COLLECTION, id))
            : null,
        data: partner.data,
        financial_properties: null // Default to null
    };

    // Handle financial properties separately
    if (partner.financial_properties) {
        const fp = { ...partner.financial_properties };

        // Copy the financial properties without pricing strategies
        const financialProps: any = {
            administration_fee: fp.administration_fee,
            income_per_gb: fp.income_per_gb,
            commission_fee: fp.commission_fee,
            payment_method: fp.payment_method,
            requires_card: fp.requires_card,
            next_invoice: fp.next_invoice,
            last_invoice: fp.last_invoice,
            pricing_strategies: null // Default to null
        };

        // Handle pricing strategies if they exist
        if (fp.pricing_strategies) {
            const ps = fp.pricing_strategies;

            // Convert partner pricing strategy
            const partnerStrategy = {
                strategy: ps.partner.strategy,
                default_price_list: ps.partner.default_price_list_id
                    ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.partner.default_price_list_id)
                    : null,
                custom_prices: ps.partner.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.packageId),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.partner.modification_percentage
            };

            // Convert user pricing strategy
            const userStrategy = {
                strategy: ps.user.strategy,
                default_price_list: ps.user.default_price_list_id
                    ? toFirestore.ref<PriceListFirestore>(PRICE_LIST_COLLECTION, ps.user.default_price_list_id)
                    : null,
                custom_prices: ps.user.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.packageId),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.user.modification_percentage
            };

            // Set pricing strategies
            financialProps.pricing_strategies = {
                partner: partnerStrategy,
                user: userStrategy
            };
        }

        // Set financial properties
        basePartner.financial_properties = financialProps;
    }

    return basePartner as PartnerFirestore;
};

export const partnerFromFirestore = (firestorePartner: PartnerFirestore): PartnerApp => {
    // Create a base partner object
    const basePartner: Partial<PartnerApp> = {
        id: firestorePartner.id,
        created_at: fromFirestore.date(firestorePartner.created_at),
        updated_at: fromFirestore.date(firestorePartner.updated_at),
        created_by: typeof firestorePartner.created_by === 'string'
            ? firestorePartner.created_by
            : firestorePartner.created_by ? fromFirestore.ref(firestorePartner.created_by) : null,
        updated_by: typeof firestorePartner.updated_by === 'string'
            ? firestorePartner.updated_by
            : firestorePartner.updated_by ? fromFirestore.ref(firestorePartner.updated_by) : null,
        name: firestorePartner.name,
        type: firestorePartner.type,
        is_active: firestorePartner.is_active,
        external_id: firestorePartner.external_id,
        parentId: firestorePartner.parent ? fromFirestore.ref(firestorePartner.parent) : null,
        contact: firestorePartner.contact,
        address: firestorePartner.address,
        registration: firestorePartner.registration,
        banking_details: firestorePartner.banking_details,
        platform_settings: firestorePartner.platform_settings,
        visual_identity: firestorePartner.visual_identity,
        user_ids: firestorePartner.users
            ? firestorePartner.users.map(ref => fromFirestore.ref(ref))
            : null,
        data: firestorePartner.data,
        financial_properties: null // Default to null
    };

    // Handle financial properties separately
    if (firestorePartner.financial_properties) {
        const fp = { ...firestorePartner.financial_properties };

        // Copy the financial properties without pricing strategies
        const financialProps: any = {
            administration_fee: fp.administration_fee,
            income_per_gb: fp.income_per_gb,
            commission_fee: fp.commission_fee,
            payment_method: fp.payment_method,
            requires_card: fp.requires_card,
            next_invoice: fp.next_invoice,
            last_invoice: fp.last_invoice,
            pricing_strategies: null // Default to null
        };

        // Handle pricing strategies if they exist
        if (fp.pricing_strategies) {
            const ps = fp.pricing_strategies;

            // Convert partner pricing strategy
            const partnerStrategy = {
                strategy: ps.partner.strategy,
                default_price_list_id: ps.partner.default_price_list
                    ? fromFirestore.ref(ps.partner.default_price_list)
                    : null,
                custom_prices: ps.partner.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    packageId: fromFirestore.ref(price.package),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.partner.modification_percentage
            };

            // Convert user pricing strategy
            const userStrategy = {
                strategy: ps.user.strategy,
                default_price_list_id: ps.user.default_price_list
                    ? fromFirestore.ref(ps.user.default_price_list)
                    : null,
                custom_prices: ps.user.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    packageId: fromFirestore.ref(price.package),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.user.modification_percentage
            };

            // Set pricing strategies
            financialProps.pricing_strategies = {
                partner: partnerStrategy,
                user: userStrategy
            };
        }

        // Set financial properties
        basePartner.financial_properties = financialProps;
    }

    return basePartner as PartnerApp;
};

// Conversion function for PriceList from Firestore to App format
export const priceListFromFirestore = (firestorePriceList: PriceListFirestore): PriceListApp => {
    // Create a base priceList object with app-friendly types
    const basePriceList: Partial<PriceListApp> = {
        id: firestorePriceList.id,
        name: firestorePriceList.name,
        type: firestorePriceList.type,
        created_at: fromFirestore.date(firestorePriceList.created_at),
        updated_at: fromFirestore.date(firestorePriceList.updated_at),
        created_by: typeof firestorePriceList.created_by === 'string'
            ? firestorePriceList.created_by
            : firestorePriceList.created_by ? fromFirestore.ref(firestorePriceList.created_by) : null,
        updated_by: typeof firestorePriceList.updated_by === 'string'
            ? firestorePriceList.updated_by
            : firestorePriceList.updated_by ? fromFirestore.ref(firestorePriceList.updated_by) : null,
    };

    // Convert package references in price_list
    if (firestorePriceList.price_list) {
        basePriceList.price_list = firestorePriceList.price_list.map(price => ({
            destination: price.destination,
            label: price.label,
            packageId: fromFirestore.ref(price.package),
            type: price.type,
            price: price.price
        }));
    }

    return basePriceList as PriceListApp;
};

// Conversion function for PriceList from App to Firestore format
export const priceListToFirestore = (priceList: PriceListApp): PriceListFirestore => {
    // Create a base priceList object with Firestore types
    const basePriceList: Partial<PriceListFirestore> = {
        id: priceList.id,
        name: priceList.name,
        type: priceList.type,
        created_at: toFirestore.date(priceList.created_at),
        updated_at: toFirestore.date(priceList.updated_at),
        created_by: typeof priceList.created_by === 'string' ? priceList.created_by : null,
        updated_by: typeof priceList.updated_by === 'string' ? priceList.updated_by : null,
    };

    // Convert packageIds to document references in price_list
    if (priceList.price_list) {
        basePriceList.price_list = priceList.price_list.map(price => ({
            destination: price.destination,
            label: price.label,
            package: toFirestore.ref<any>(PACKAGE_COLLECTION, price.packageId),
            type: price.type,
            price: price.price
        }));
    }

    return basePriceList as PriceListFirestore;
};

// For backwards compatibility
export type Partner = PartnerApp;
export type PartnerWithFirestore = PartnerFirestore;
export type PriceList = PriceListApp;
export type PackagePrice = z.infer<typeof packagePriceAppSchema>; 