"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceListToFirestore = exports.priceListFromFirestore = exports.partnerFromFirestore = exports.partnerToFirestore = exports.priceListAppSchema = exports.priceListFirestoreSchema = exports.partnerAppSchema = exports.partnerFirestoreSchema = exports.platformSettingsSchema = exports.scheduleSchema = exports.scheduleFilterSchema = exports.visualIdentitySchema = exports.visualIdentityBannerStrategySchema = exports.visualIdentityBannerSchema = exports.bookingConfirmationSchema = exports.bookingDefaultsSchema = exports.packageStrategySchema = exports.financialPropertiesAppSchema = exports.financialPropertiesFirestoreSchema = exports.pricingStrategyAppSchema = exports.pricingStrategyFirestoreSchema = exports.packagePriceAppSchema = exports.packagePriceFirestoreSchema = exports.bankingDetailsSchema = exports.registrationSchema = exports.addressSchema = exports.userRefSchema = exports.packageRefSchema = exports.priceListRefSchema = exports.partnerRefSchema = exports.USER_COLLECTION = exports.PACKAGE_COLLECTION = exports.PRICE_LIST_COLLECTION = exports.PARTNER_COLLECTION = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
// Define collection paths
exports.PARTNER_COLLECTION = 'partners';
exports.PRICE_LIST_COLLECTION = 'priceLists';
exports.PACKAGE_COLLECTION = 'packages';
exports.USER_COLLECTION = 'users';
// Define document reference schemas
exports.partnerRefSchema = (0, helpers_1.createDocRefSchema)(exports.PARTNER_COLLECTION);
exports.priceListRefSchema = (0, helpers_1.createDocRefSchema)(exports.PRICE_LIST_COLLECTION);
exports.packageRefSchema = (0, helpers_1.createDocRefSchema)(exports.PACKAGE_COLLECTION);
exports.userRefSchema = (0, helpers_1.createDocRefSchema)(exports.USER_COLLECTION);
// Helper schemas for nested structures
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    postal_code: zod_1.z.string().optional(),
    country: zod_1.z.string().optional()
}).nullable();
exports.registrationSchema = zod_1.z.object({
    chamber_of_commerce_number: zod_1.z.string().nullable().optional(),
    vat_number: zod_1.z.string().nullable().optional(),
    anvr_number: zod_1.z.number().nullable().optional(),
    tax_number: zod_1.z.string().nullable().optional()
}).nullable();
exports.bankingDetailsSchema = zod_1.z.object({
    account_holder: zod_1.z.string(),
    bank_name: zod_1.z.string(),
    iban: zod_1.z.string()
}).nullable();
exports.packagePriceFirestoreSchema = zod_1.z.object({
    destination: zod_1.z.string(),
    label: zod_1.z.string(),
    package: exports.packageRefSchema.schema,
    type: zod_1.z.enum(['data-limit', 'time-limit']),
    price: zod_1.z.number()
});
exports.packagePriceAppSchema = zod_1.z.object({
    destination: zod_1.z.string(),
    label: zod_1.z.string(),
    package: zod_1.z.string(),
    type: zod_1.z.enum(['data-limit', 'time-limit']),
    price: zod_1.z.number()
});
exports.pricingStrategyFirestoreSchema = zod_1.z.object({
    strategy: zod_1.z.enum(['split', 'bundle']),
    default_price_list: exports.priceListRefSchema.schema.nullable(),
    custom_prices: zod_1.z.array(exports.packagePriceFirestoreSchema),
    modification_percentage: zod_1.z.number()
});
exports.pricingStrategyAppSchema = zod_1.z.object({
    strategy: zod_1.z.enum(['split', 'bundle']),
    default_price_list_id: zod_1.z.string().nullable(),
    custom_prices: zod_1.z.array(exports.packagePriceAppSchema),
    modification_percentage: zod_1.z.number()
});
exports.financialPropertiesFirestoreSchema = zod_1.z.object({
    administration_fee: zod_1.z.number().nullable(),
    income_per_gb: zod_1.z.number().nullable(),
    commission_fee: zod_1.z.number().nullable().optional(),
    payment_method: zod_1.z.enum(['invoice', 'direct']),
    requires_card: zod_1.z.boolean().nullable(),
    next_invoice: zod_1.z.date().nullable(),
    last_invoice: zod_1.z.date().nullable(),
    pricing_strategies: zod_1.z.object({
        partner: exports.pricingStrategyFirestoreSchema,
        user: exports.pricingStrategyFirestoreSchema
    }).nullable()
}).nullable();
exports.financialPropertiesAppSchema = zod_1.z.object({
    administration_fee: zod_1.z.number().nullable(),
    income_per_gb: zod_1.z.number().nullable(),
    commission_fee: zod_1.z.number().nullable().optional(),
    payment_method: zod_1.z.enum(['invoice', 'direct']),
    requires_card: zod_1.z.boolean().nullable(),
    next_invoice: zod_1.z.date().nullable(),
    last_invoice: zod_1.z.date().nullable(),
    pricing_strategies: zod_1.z.object({
        partner: exports.pricingStrategyAppSchema,
        user: exports.pricingStrategyAppSchema
    }).nullable()
}).nullable();
exports.packageStrategySchema = zod_1.z.object({
    name: zod_1.z.string(),
    iso3_white_list: zod_1.z.array(zod_1.z.string()).optional(),
    parameters: zod_1.z.any()
});
exports.bookingDefaultsSchema = zod_1.z.object({
    locale: zod_1.z.enum(constants_1.SUPPORTED_LOCALES)
});
exports.bookingConfirmationSchema = zod_1.z.object({
    brevo_template_id: zod_1.z.number(),
    send_booking_confirmation: zod_1.z.boolean()
});
exports.visualIdentityBannerSchema = zod_1.z.object({
    image_url: zod_1.z.string(),
    alt: zod_1.z.string(),
    click_url: zod_1.z.string(),
    locale: zod_1.z.enum(constants_1.SUPPORTED_LOCALES),
    properties: zod_1.z.record(zod_1.z.string())
});
exports.visualIdentityBannerStrategySchema = zod_1.z.object({
    strategy: zod_1.z.enum(['fixed', 'rotating', 'destination', 'time_of_day']),
    banners: zod_1.z.array(exports.visualIdentityBannerSchema)
});
exports.visualIdentitySchema = zod_1.z.object({
    primary_color: zod_1.z.string(),
    secondary_color: zod_1.z.string(),
    logo: zod_1.z.string(),
    font: zod_1.z.string(),
    top_banner: exports.visualIdentityBannerStrategySchema,
    mid_banner: exports.visualIdentityBannerStrategySchema
});
exports.scheduleFilterSchema = zod_1.z.object({
    type: zod_1.z.enum(['iso3', 'gender', 'percentage', 'age']),
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    comparison: zod_1.z.enum([
        'equal',
        'not_equal',
        'greater_than',
        'less_than',
        'greater_than_or_equal',
        'less_than_or_equal'
    ])
}).nullable();
exports.scheduleSchema = zod_1.z.object({
    days: zod_1.z.number(),
    email: zod_1.z.object({
        brevo_template_id: zod_1.z.number(),
        subject: zod_1.z.record(zod_1.z.string()).optional(),
        preview_text: zod_1.z.record(zod_1.z.string()).optional()
    }).nullable(),
    push: zod_1.z.object({
        title: zod_1.z.record(zod_1.z.string()).optional(),
        body: zod_1.z.record(zod_1.z.string()).optional(),
        target: zod_1.z.string()
    }).nullable(),
    hour: zod_1.z.number(),
    key: zod_1.z.string(),
    method: zod_1.z.enum(['email', 'sms', 'whatsapp', 'push']),
    moment: zod_1.z.enum(['departure', 'return', 'immediate']),
    filter: exports.scheduleFilterSchema
});
exports.platformSettingsSchema = zod_1.z.object({
    package_strategy: exports.packageStrategySchema.nullable().optional(),
    free_esim: zod_1.z.object({
        allowance: zod_1.z.number().nullable(),
        package_specifications: zod_1.z.record(zod_1.z.any()).nullable()
    }).nullable(),
    booking_defaults: exports.bookingDefaultsSchema.nullable(),
    schedules: zod_1.z.array(exports.scheduleSchema).nullable(),
    booking_confirmation: exports.bookingConfirmationSchema.nullable()
}).nullable();
// Firestore schema for Partner
exports.partnerFirestoreSchema = helpers_1.baseModelSchema.extend({
    // Basic information
    name: zod_1.z.string().nullable(),
    type: zod_1.z.string().nullable(),
    is_active: zod_1.z.boolean().nullable().optional(),
    external_id: zod_1.z.string().nullable().optional(),
    parent: helpers_1.documentRefSchema.nullable(),
    // Contact information
    contact: zod_1.z.object({
        email: zod_1.z.string().nullable(),
        office_phone: zod_1.z.string().nullable().optional()
    }).nullable(),
    // Location information
    address: exports.addressSchema,
    // Registration information
    registration: exports.registrationSchema,
    // Banking information
    banking_details: exports.bankingDetailsSchema,
    // Financial information
    financial_properties: exports.financialPropertiesFirestoreSchema,
    // Platform settings
    platform_settings: exports.platformSettingsSchema,
    // Visual identity
    visual_identity: exports.visualIdentitySchema.nullable(),
    // User management
    users: zod_1.z.array(helpers_1.documentRefSchema).nullable(),
    // Metadata
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }).nullable()
});
// App schema for Partner
exports.partnerAppSchema = helpers_1.baseModelAppSchema.extend({
    // Basic information
    name: zod_1.z.string().nullable(),
    type: zod_1.z.string().nullable(),
    is_active: zod_1.z.boolean().nullable().optional(),
    external_id: zod_1.z.string().nullable().optional(),
    parentId: zod_1.z.string().nullable(),
    // Contact information
    contact: zod_1.z.object({
        email: zod_1.z.string().nullable(),
        office_phone: zod_1.z.string().nullable().optional()
    }).nullable(),
    // Location information
    address: exports.addressSchema,
    // Registration information
    registration: exports.registrationSchema,
    // Banking information
    banking_details: exports.bankingDetailsSchema,
    // Financial information
    financial_properties: exports.financialPropertiesAppSchema,
    // Platform settings
    platform_settings: exports.platformSettingsSchema,
    // Visual identity
    visual_identity: exports.visualIdentitySchema.nullable(),
    // User management
    user_ids: zod_1.z.array(zod_1.z.string()).nullable(),
    // Metadata
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }).nullable()
});
// Type for price list
exports.priceListFirestoreSchema = helpers_1.baseModelSchema.extend({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['partner', 'user']).default('partner'),
    price_list: zod_1.z.array(exports.packagePriceFirestoreSchema)
});
exports.priceListAppSchema = helpers_1.baseModelAppSchema.extend({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['partner', 'user']).default('partner'),
    price_list: zod_1.z.array(exports.packagePriceAppSchema)
});
// Conversion functions
const partnerToFirestore = (partner) => {
    // Create a base partner object
    const basePartner = {
        id: partner.id,
        created_at: helpers_1.toFirestore.date(partner.created_at),
        updated_at: helpers_1.toFirestore.date(partner.updated_at),
        created_by: typeof partner.created_by === 'string' ? partner.created_by : null,
        updated_by: typeof partner.updated_by === 'string' ? partner.updated_by : null,
        name: partner.name,
        type: partner.type,
        is_active: partner.is_active,
        external_id: partner.external_id,
        parent: partner.parentId
            ? helpers_1.toFirestore.ref(exports.PARTNER_COLLECTION, partner.parentId)
            : null,
        contact: partner.contact,
        address: partner.address,
        registration: partner.registration,
        banking_details: partner.banking_details,
        platform_settings: partner.platform_settings,
        visual_identity: partner.visual_identity,
        users: partner.user_ids
            ? partner.user_ids.map(id => helpers_1.toFirestore.ref(exports.USER_COLLECTION, id))
            : null,
        data: partner.data,
        financial_properties: null // Default to null
    };
    // Handle financial properties separately
    if (partner.financial_properties) {
        const fp = Object.assign({}, partner.financial_properties);
        // Copy the financial properties without pricing strategies
        const financialProps = {
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
                    ? helpers_1.toFirestore.ref(exports.PRICE_LIST_COLLECTION, ps.partner.default_price_list_id)
                    : null,
                custom_prices: ps.partner.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, price.package),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.partner.modification_percentage
            };
            // Convert user pricing strategy
            const userStrategy = {
                strategy: ps.user.strategy,
                default_price_list: ps.user.default_price_list_id
                    ? helpers_1.toFirestore.ref(exports.PRICE_LIST_COLLECTION, ps.user.default_price_list_id)
                    : null,
                custom_prices: ps.user.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, price.package),
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
    return basePartner;
};
exports.partnerToFirestore = partnerToFirestore;
const partnerFromFirestore = (firestorePartner) => {
    // Create a base partner object
    const basePartner = {
        id: firestorePartner.id,
        created_at: helpers_1.fromFirestore.date(firestorePartner.created_at),
        updated_at: helpers_1.fromFirestore.date(firestorePartner.updated_at),
        created_by: typeof firestorePartner.created_by === 'string'
            ? firestorePartner.created_by
            : firestorePartner.created_by ? helpers_1.fromFirestore.ref(firestorePartner.created_by) : null,
        updated_by: typeof firestorePartner.updated_by === 'string'
            ? firestorePartner.updated_by
            : firestorePartner.updated_by ? helpers_1.fromFirestore.ref(firestorePartner.updated_by) : null,
        name: firestorePartner.name,
        type: firestorePartner.type,
        is_active: firestorePartner.is_active,
        external_id: firestorePartner.external_id,
        parentId: firestorePartner.parent ? helpers_1.fromFirestore.ref(firestorePartner.parent) : null,
        contact: firestorePartner.contact,
        address: firestorePartner.address,
        registration: firestorePartner.registration,
        banking_details: firestorePartner.banking_details,
        platform_settings: firestorePartner.platform_settings,
        visual_identity: firestorePartner.visual_identity,
        user_ids: firestorePartner.users
            ? firestorePartner.users.map(ref => helpers_1.fromFirestore.ref(ref))
            : null,
        data: firestorePartner.data,
        financial_properties: null // Default to null
    };
    // Handle financial properties separately
    if (firestorePartner.financial_properties) {
        const fp = Object.assign({}, firestorePartner.financial_properties);
        // Copy the financial properties without pricing strategies
        const financialProps = {
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
                    ? helpers_1.fromFirestore.ref(ps.partner.default_price_list)
                    : null,
                custom_prices: ps.partner.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: helpers_1.fromFirestore.ref(price.package),
                    type: price.type,
                    price: price.price
                })),
                modification_percentage: ps.partner.modification_percentage
            };
            // Convert user pricing strategy
            const userStrategy = {
                strategy: ps.user.strategy,
                default_price_list_id: ps.user.default_price_list
                    ? helpers_1.fromFirestore.ref(ps.user.default_price_list)
                    : null,
                custom_prices: ps.user.custom_prices.map(price => ({
                    destination: price.destination,
                    label: price.label,
                    package: helpers_1.fromFirestore.ref(price.package),
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
    return basePartner;
};
exports.partnerFromFirestore = partnerFromFirestore;
// Conversion function for PriceList from Firestore to App format
const priceListFromFirestore = (firestorePriceList) => {
    // Create a base priceList object with app-friendly types
    const basePriceList = {
        id: firestorePriceList.id,
        name: firestorePriceList.name,
        type: firestorePriceList.type,
        created_at: helpers_1.fromFirestore.date(firestorePriceList.created_at),
        updated_at: helpers_1.fromFirestore.date(firestorePriceList.updated_at),
        created_by: typeof firestorePriceList.created_by === 'string'
            ? firestorePriceList.created_by
            : firestorePriceList.created_by ? helpers_1.fromFirestore.ref(firestorePriceList.created_by) : null,
        updated_by: typeof firestorePriceList.updated_by === 'string'
            ? firestorePriceList.updated_by
            : firestorePriceList.updated_by ? helpers_1.fromFirestore.ref(firestorePriceList.updated_by) : null,
    };
    // Convert package references in price_list
    if (firestorePriceList.price_list) {
        basePriceList.price_list = firestorePriceList.price_list.map(price => ({
            destination: price.destination,
            label: price.label,
            package: helpers_1.fromFirestore.ref(price.package),
            type: price.type,
            price: price.price
        }));
    }
    return basePriceList;
};
exports.priceListFromFirestore = priceListFromFirestore;
// Conversion function for PriceList from App to Firestore format
const priceListToFirestore = (priceList) => {
    // Create a base priceList object with Firestore types
    const basePriceList = {
        id: priceList.id,
        name: priceList.name,
        type: priceList.type,
        created_at: helpers_1.toFirestore.date(priceList.created_at),
        updated_at: helpers_1.toFirestore.date(priceList.updated_at),
        created_by: typeof priceList.created_by === 'string' ? priceList.created_by : null,
        updated_by: typeof priceList.updated_by === 'string' ? priceList.updated_by : null,
    };
    // Convert packageIds to document references in price_list
    if (priceList.price_list) {
        basePriceList.price_list = priceList.price_list.map(price => ({
            destination: price.destination,
            label: price.label,
            package: helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, price.package),
            type: price.type,
            price: price.price
        }));
    }
    return basePriceList;
};
exports.priceListToFirestore = priceListToFirestore;
