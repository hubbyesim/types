"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceListToFirestore = exports.priceListFromFirestore = exports.partnerFromFirestore = exports.partnerToFirestore = exports.priceListAppSchema = exports.priceListFirestoreSchema = exports.partnerAppSchema = exports.partnerFirestoreSchema = exports.platformSettingsSchema = exports.scheduleSchema = exports.scheduleFilterSchema = exports.visualIdentitySchema = exports.visualIdentityBannerStrategySchema = exports.visualIdentityBannerSchema = exports.bookingConfirmationSchema = exports.bookingDefaultsSchema = exports.packageStrategySchema = exports.financialPropertiesAppSchema = exports.financialPropertiesFirestoreSchema = exports.userPricingStrategyAppSchema = exports.userPricingStrategyFirestoreSchema = exports.partnerPricingStrategyAppSchema = exports.partnerPricingStrategyFirestoreSchema = exports.packagePriceAppSchema = exports.packagePriceFirestoreSchema = exports.bankingDetailsSchema = exports.registrationSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const constants_1 = require("../constants");
const refs_1 = require("./refs");
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
exports.packagePriceFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPackagePriceFields), { package: refs_1.packageRefSchema.schema }));
exports.packagePriceAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPackagePriceFields), { package: refs_1.packageRefString }));
// Common pricing strategy fields
const commonPricingStrategyFields = {
    strategy: zod_1.z.enum(['split', 'bundle']),
    modification_percentage: zod_1.z.number()
};
exports.partnerPricingStrategyFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { strategy: zod_1.z.enum(['split', 'bundle']), default_price_list: refs_1.priceListRefNullable, custom_prices: zod_1.z.array(exports.packagePriceFirestoreSchema) }));
exports.partnerPricingStrategyAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { strategy: zod_1.z.enum(['split', 'bundle']), default_price_list: refs_1.priceListRefStringNullable, custom_prices: zod_1.z.array(exports.packagePriceAppSchema) }));
exports.userPricingStrategyFirestoreSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { default_price_list: refs_1.priceListRefNullable, custom_prices: zod_1.z.array(exports.packagePriceFirestoreSchema) }));
exports.userPricingStrategyAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonPricingStrategyFields), { default_price_list: refs_1.priceListRefStringNullable, custom_prices: zod_1.z.array(exports.packagePriceAppSchema) }));
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
        partner: exports.partnerPricingStrategyFirestoreSchema,
        user: exports.userPricingStrategyFirestoreSchema
    }).nullable() })).nullable();
exports.financialPropertiesAppSchema = zod_1.z.object(Object.assign(Object.assign({}, commonFinancialPropertiesFields), { pricing_strategies: zod_1.z.object({
        partner: exports.partnerPricingStrategyAppSchema,
        user: exports.userPricingStrategyAppSchema
    }).nullable() })).nullable();
exports.packageStrategySchema = zod_1.z.object({
    name: zod_1.z.string(),
    iso3_white_list: zod_1.z.array(zod_1.z.string()).optional(),
    parameters: zod_1.z.any()
});
exports.bookingDefaultsSchema = zod_1.z.object({
    locale: constants_1.supportedLocalesSchema
});
exports.bookingConfirmationSchema = zod_1.z.object({
    brevo_template_id: zod_1.z.number(),
    send_booking_confirmation: zod_1.z.boolean()
});
exports.visualIdentityBannerSchema = zod_1.z.object({
    image_url: zod_1.z.string(),
    alt: zod_1.z.string(),
    click_url: zod_1.z.string(),
    locale: constants_1.supportedLocalesSchema,
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
exports.partnerFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPartnerFields), { parent: refs_1.partnerRefNullable, users: refs_1.userRefArrayNullable, financial_properties: exports.financialPropertiesFirestoreSchema }));
// App schema for Partner
exports.partnerAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPartnerFields), { parent: refs_1.partnerRefStringNullable, users: refs_1.userRefStringArrayNullable, financial_properties: exports.financialPropertiesAppSchema }));
// Common price list fields
const commonPriceListFields = {
    name: zod_1.z.string(),
    type: zod_1.z.enum(['partner', 'user']).default('partner'),
};
// Type for price list
exports.priceListFirestoreSchema = helpers_1.baseModelSchema.extend(Object.assign(Object.assign({}, commonPriceListFields), { price_list: zod_1.z.array(exports.packagePriceFirestoreSchema) }));
exports.priceListAppSchema = helpers_1.baseModelAppSchema.extend(Object.assign(Object.assign({}, commonPriceListFields), { price_list: zod_1.z.array(exports.packagePriceAppSchema) }));
// Define types based on schemas
// Field mapping for conversions using the shared GenericRefFieldMapping interface
const utils_1 = require("./utils");
const refFieldMappings = [
    { app: 'parent', firestore: 'parent', collection: refs_1.PARTNER_COLLECTION, nullable: true },
    { app: 'users', firestore: 'users', collection: refs_1.USER_COLLECTION, nullable: true, isArray: true }
];
// Conversion functions
const partnerToFirestore = (partner) => {
    return (0, utils_1.genericToFirestore)({
        appObject: partner,
        refFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result, appData) => {
            // Handle financial properties specially due to complex nested structure
            if (appData.financial_properties) {
                const fp = Object.assign({}, appData.financial_properties);
                const financialProps = Object.assign(Object.assign({}, fp), { pricing_strategies: null });
                // Handle pricing strategies if they exist
                if (fp.pricing_strategies) {
                    const ps = fp.pricing_strategies;
                    // Convert partner pricing strategy
                    const partnerStrategy = Object.assign(Object.assign({}, ps.partner), { default_price_list: ps.partner.default_price_list
                            ? helpers_1.toFirestore.ref(refs_1.PRICE_LIST_COLLECTION, ps.partner.default_price_list)
                            : null, custom_prices: ps.partner.custom_prices.map((price) => (Object.assign(Object.assign({}, price), { package: helpers_1.toFirestore.ref(refs_1.PACKAGE_COLLECTION, price.package) }))) });
                    // Convert user pricing strategy
                    const userStrategy = Object.assign(Object.assign({}, ps.user), { default_price_list: ps.user.default_price_list
                            ? helpers_1.toFirestore.ref(refs_1.PRICE_LIST_COLLECTION, ps.user.default_price_list)
                            : null, custom_prices: ps.user.custom_prices.map((price) => (Object.assign(Object.assign({}, price), { package: helpers_1.toFirestore.ref(refs_1.PACKAGE_COLLECTION, price.package) }))) });
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
        }
    });
};
exports.partnerToFirestore = partnerToFirestore;
const partnerFromFirestore = (firestorePartner) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestorePartner,
        refFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result, firestoreData) => {
            // Handle financial properties specially
            if (firestoreData.financial_properties) {
                const fp = Object.assign({}, firestoreData.financial_properties);
                const financialProps = Object.assign(Object.assign({}, fp), { pricing_strategies: null });
                // Handle pricing strategies if they exist
                if (fp.pricing_strategies) {
                    const ps = fp.pricing_strategies;
                    // Convert partner pricing strategy
                    const partnerStrategy = Object.assign(Object.assign({}, ps.partner), { default_price_list: ps.partner.default_price_list
                            ? helpers_1.fromFirestore.ref(ps.partner.default_price_list)
                            : null, custom_prices: ps.partner.custom_prices.map(price => (Object.assign(Object.assign({}, price), { package: helpers_1.fromFirestore.ref(price.package) }))) });
                    // Convert user pricing strategy
                    const userStrategy = Object.assign(Object.assign({}, ps.user), { default_price_list: ps.user.default_price_list
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
        }
    });
};
exports.partnerFromFirestore = partnerFromFirestore;
// Field mapping for price list conversions
const priceListRefFieldMappings = [];
// Conversion function for PriceList from Firestore to App format
const priceListFromFirestore = (firestorePriceList) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestorePriceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result, firestoreData) => {
            // Convert array of objects with document references
            const priceList = firestoreData.price_list;
            if (Array.isArray(priceList)) {
                result.price_list = priceList.map((item) => (Object.assign(Object.assign({}, item), { package: helpers_1.fromFirestore.ref(item.package) })));
            }
        }
    });
};
exports.priceListFromFirestore = priceListFromFirestore;
// Conversion function for PriceList from App to Firestore format
const priceListToFirestore = (priceList) => {
    return (0, utils_1.genericToFirestore)({
        appObject: priceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        specialCaseHandler: (result, appData) => {
            // Convert array of objects with document references
            const priceListValue = appData.price_list;
            if (Array.isArray(priceListValue)) {
                result.price_list = priceListValue.map((item) => (Object.assign(Object.assign({}, item), { package: helpers_1.toFirestore.ref(refs_1.PACKAGE_COLLECTION, item.package) })));
            }
        }
    });
};
exports.priceListToFirestore = priceListToFirestore;
