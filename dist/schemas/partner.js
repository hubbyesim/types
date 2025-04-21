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
// Common package price fields shared between Firestore and App schemas
const commonPackagePriceFields = {
    destination: zod_1.z.string(),
    label: zod_1.z.string(),
    type: zod_1.z.enum(['data-limit', 'time-limit']),
    price: zod_1.z.number()
};
exports.packagePriceFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPackagePriceFields), { package: exports.packageRefSchema.schema }));
exports.packagePriceAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPackagePriceFields), { package: zod_1.z.string() }));
// Common pricing strategy fields
const commonPricingStrategyFields = {
    strategy: zod_1.z.enum(['split', 'bundle']),
    modification_percentage: zod_1.z.number()
};
exports.pricingStrategyFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { default_price_list: exports.priceListRefSchema.schema.nullable(), custom_prices: zod_1.z.array(exports.packagePriceFirestoreSchema) }));
exports.pricingStrategyAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { default_price_list_id: zod_1.z.string().nullable(), custom_prices: zod_1.z.array(exports.packagePriceAppSchema) }));
// Common financial properties fields
const commonFinancialPropertiesFields = {
    administration_fee: zod_1.z.number().nullable(),
    income_per_gb: zod_1.z.number().nullable(),
    commission_fee: zod_1.z.number().nullable().optional(),
    payment_method: zod_1.z.enum(['invoice', 'direct']),
    requires_card: zod_1.z.boolean().nullable(),
    next_invoice: zod_1.z.date().nullable(),
    last_invoice: zod_1.z.date().nullable(),
};
exports.financialPropertiesFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonFinancialPropertiesFields), { pricing_strategies: zod_1.z.object({
        partner: exports.pricingStrategyFirestoreSchema,
        user: exports.pricingStrategyFirestoreSchema
    }).nullable() })).nullable();
exports.financialPropertiesAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonFinancialPropertiesFields), { pricing_strategies: zod_1.z.object({
        partner: exports.pricingStrategyAppSchema,
        user: exports.pricingStrategyAppSchema
    }).nullable() })).nullable();
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
// Common partner fields shared between Firestore and App schemas
const commonPartnerFields = {
    // Basic information
    name: zod_1.z.string().nullable(),
    type: zod_1.z.string().nullable(),
    is_active: zod_1.z.boolean().nullable().optional(),
    external_id: zod_1.z.string().nullable().optional(),
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
    // Platform settings
    platform_settings: exports.platformSettingsSchema,
    // Visual identity
    visual_identity: exports.visualIdentitySchema.nullable(),
    // Metadata
    data: zod_1.z.object({
        source: zod_1.z.string(),
        manual: zod_1.z.boolean()
    }).nullable()
};
// Firestore schema for Partner
exports.partnerFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPartnerFields), { parent: helpers_1.documentRefSchema.nullable(), users: zod_1.z.array(helpers_1.documentRefSchema).nullable(), financial_properties: exports.financialPropertiesFirestoreSchema }));
// App schema for Partner
exports.partnerAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPartnerFields), { parent: zod_1.z.string().nullable(), users: zod_1.z.array(zod_1.z.string()).nullable(), financial_properties: exports.financialPropertiesAppSchema }));
// Common price list fields
const commonPriceListFields = {
    name: zod_1.z.string(),
    type: zod_1.z.enum(['partner', 'user']).default('partner'),
};
// Type for price list
exports.priceListFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPriceListFields), { price_list: zod_1.z.array(exports.packagePriceFirestoreSchema) }));
exports.priceListAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPriceListFields), { price_list: zod_1.z.array(exports.packagePriceAppSchema) }));
const refFieldMappings = [
    { app: 'parent', firestore: 'parent', collection: exports.PARTNER_COLLECTION, nullable: true },
    { app: 'users', firestore: 'users', collection: exports.USER_COLLECTION, nullable: true, isArray: true }
];
// Conversion functions
const partnerToFirestore = (partner) => {
    // Create base object with common fields
    const result = Object.assign({}, partner);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(partner.created_at);
    result.updated_at = helpers_1.toFirestore.date(partner.updated_at);
    result.created_by = typeof partner.created_by === 'string' ? partner.created_by : null;
    result.updated_by = typeof partner.updated_by === 'string' ? partner.updated_by : null;
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable, isArray }) => {
        const value = partner[app];
        if (isArray) {
            if (nullable && value === null) {
                result[firestore] = null;
            }
            else if (Array.isArray(value)) {
                result[firestore] = value.map(id => helpers_1.toFirestore.ref(collection, id));
            }
        }
        else if (nullable && value === null) {
            result[firestore] = null;
        }
        else if (typeof value === 'string') {
            result[firestore] = helpers_1.toFirestore.ref(collection, value);
        }
        // Delete app field to avoid duplication
        delete result[app];
    });
    // Handle financial properties specially due to complex nested structure
    if (partner.financial_properties) {
        const fp = Object.assign({}, partner.financial_properties);
        const financialProps = Object.assign(Object.assign({}, fp), { pricing_strategies: null });
        // Handle pricing strategies if they exist
        if (fp.pricing_strategies) {
            const ps = fp.pricing_strategies;
            // Convert partner pricing strategy
            const partnerStrategy = Object.assign(Object.assign({}, ps.partner), { default_price_list: ps.partner.default_price_list_id
                    ? helpers_1.toFirestore.ref(exports.PRICE_LIST_COLLECTION, ps.partner.default_price_list_id)
                    : null, custom_prices: ps.partner.custom_prices.map(price => (Object.assign(Object.assign({}, price), { package: helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, price.package) }))) });
            // Convert user pricing strategy
            const userStrategy = Object.assign(Object.assign({}, ps.user), { default_price_list: ps.user.default_price_list_id
                    ? helpers_1.toFirestore.ref(exports.PRICE_LIST_COLLECTION, ps.user.default_price_list_id)
                    : null, custom_prices: ps.user.custom_prices.map(price => (Object.assign(Object.assign({}, price), { package: helpers_1.toFirestore.ref(exports.PACKAGE_COLLECTION, price.package) }))) });
            const partnerStrategyObj = partnerStrategy;
            const userStrategyObj = userStrategy;
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
    return result;
};
exports.partnerToFirestore = partnerToFirestore;
const partnerFromFirestore = (firestorePartner) => {
    // Create base object with common fields
    const result = Object.assign({}, firestorePartner);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestorePartner.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestorePartner.updated_at);
    result.created_by = typeof firestorePartner.created_by === 'string'
        ? firestorePartner.created_by
        : firestorePartner.created_by ? helpers_1.fromFirestore.ref(firestorePartner.created_by) : null;
    result.updated_by = typeof firestorePartner.updated_by === 'string'
        ? firestorePartner.updated_by
        : firestorePartner.updated_by ? helpers_1.fromFirestore.ref(firestorePartner.updated_by) : null;
    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable, isArray }) => {
        const value = firestorePartner[firestore];
        if (isArray) {
            if (nullable && value === null) {
                result[app] = null;
            }
            else if (Array.isArray(value)) {
                result[app] = value.map(ref => helpers_1.fromFirestore.ref(ref));
            }
        }
        else if (nullable && value === null) {
            result[app] = null;
        }
        else if (value) {
            result[app] = helpers_1.fromFirestore.ref(value);
        }
        // Delete firestore field to avoid duplication
        delete result[firestore];
    });
    // Handle financial properties specially
    if (firestorePartner.financial_properties) {
        const fp = Object.assign({}, firestorePartner.financial_properties);
        const financialProps = Object.assign(Object.assign({}, fp), { pricing_strategies: null });
        // Handle pricing strategies if they exist
        if (fp.pricing_strategies) {
            const ps = fp.pricing_strategies;
            // Convert partner pricing strategy
            const partnerStrategy = Object.assign(Object.assign({}, ps.partner), { default_price_list_id: ps.partner.default_price_list
                    ? helpers_1.fromFirestore.ref(ps.partner.default_price_list)
                    : null, custom_prices: ps.partner.custom_prices.map(price => (Object.assign(Object.assign({}, price), { package: helpers_1.fromFirestore.ref(price.package) }))) });
            // Convert user pricing strategy
            const userStrategy = Object.assign(Object.assign({}, ps.user), { default_price_list_id: ps.user.default_price_list
                    ? helpers_1.fromFirestore.ref(ps.user.default_price_list)
                    : null, custom_prices: ps.user.custom_prices.map(price => (Object.assign(Object.assign({}, price), { package: helpers_1.fromFirestore.ref(price.package) }))) });
            const partnerStrategyObj = partnerStrategy;
            const userStrategyObj = userStrategy;
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
    return result;
};
exports.partnerFromFirestore = partnerFromFirestore;
const priceListRefMappings = [
    { isArray: true, field: 'price_list', itemField: 'package', collection: exports.PACKAGE_COLLECTION }
];
// Conversion function for PriceList from Firestore to App format
const priceListFromFirestore = (firestorePriceList) => {
    // Create base object with common fields
    const result = Object.assign({}, firestorePriceList);
    // Handle base model fields
    result.created_at = helpers_1.fromFirestore.date(firestorePriceList.created_at);
    result.updated_at = helpers_1.fromFirestore.date(firestorePriceList.updated_at);
    result.created_by = typeof firestorePriceList.created_by === 'string'
        ? firestorePriceList.created_by
        : firestorePriceList.created_by ? helpers_1.fromFirestore.ref(firestorePriceList.created_by) : null;
    result.updated_by = typeof firestorePriceList.updated_by === 'string'
        ? firestorePriceList.updated_by
        : firestorePriceList.updated_by ? helpers_1.fromFirestore.ref(firestorePriceList.updated_by) : null;
    // Convert array of objects with document references
    priceListRefMappings.forEach(({ isArray, field, itemField }) => {
        const priceList = firestorePriceList[field];
        if (isArray && Array.isArray(priceList)) {
            result[field] = priceList.map((item) => (Object.assign(Object.assign({}, item), { [itemField]: helpers_1.fromFirestore.ref(item[itemField]) })));
        }
    });
    return result;
};
exports.priceListFromFirestore = priceListFromFirestore;
// Conversion function for PriceList from App to Firestore format
const priceListToFirestore = (priceList) => {
    // Create base object with common fields
    const result = Object.assign({}, priceList);
    // Handle base model fields
    result.created_at = helpers_1.toFirestore.date(priceList.created_at);
    result.updated_at = helpers_1.toFirestore.date(priceList.updated_at);
    result.created_by = typeof priceList.created_by === 'string' ? priceList.created_by : null;
    result.updated_by = typeof priceList.updated_by === 'string' ? priceList.updated_by : null;
    // Convert array of objects with document references
    priceListRefMappings.forEach(({ isArray, field, itemField, collection }) => {
        const priceListValue = priceList[field];
        if (isArray && Array.isArray(priceListValue)) {
            result[field] = priceListValue.map((item) => (Object.assign(Object.assign({}, item), { [itemField]: helpers_1.toFirestore.ref(collection, item[itemField]) })));
        }
    });
    return result;
};
exports.priceListToFirestore = priceListToFirestore;
