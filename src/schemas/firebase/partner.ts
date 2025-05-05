import { z } from 'zod';
import {
    baseModelSchema,
    timestampSchema
} from './core';
import {
    toFirestore,
    fromFirestore
} from './helpers';
import {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';
import {
    PARTNER_COLLECTION,
    PRICE_LIST_COLLECTION,
    PACKAGE_COLLECTION,
    USER_COLLECTION
} from './utils/collections';
import {
    partnerRefSchema,
    priceListRefSchema,
    packageRefSchema,
    userRefSchema,
    partnerRefNullable,
    userRefArrayNullable,
    priceListRefNullable
} from './refs';
import { NestedFieldPathMapping } from '../utils/nested-conversions';

// Import base types and schemas
import {
    commonPartnerFields,
    packagePriceAppSchema,
    partnerPricingStrategyAppSchema,
    userPricingStrategyAppSchema,
    financialPropertiesAppSchema,
    platformSettingsSchema,
    addressSchema,
    registrationSchema,
    bankingDetailsSchema,
    PartnerApp,
    PriceListApp,
    // Re-export other types
    Address,
    Registration,
    BankingDetails,
    PackagePriceApp,
    PartnerPricingStrategyApp,
    UserPricingStrategyApp,
    FinancialPropertiesApp,
    PackageStrategy,
    BookingDefaults,
    BookingConfirmation,
    VisualIdentityBanner,
    VisualIdentityBannerStrategy,
    VisualIdentity,
    ScheduleFilter,
    Schedule,
    commonFinancialPropertiesFields,
    PlatformSettings
} from '../base/partner';

// Re-export base schemas
export * from '../base/partner';

// Common package price fields shared with Firebase types
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

// Common pricing strategy fields with Firebase types
const commonPricingStrategyFields = {
    modification_percentage: z.number()
};

export const partnerPricingStrategyFirestoreSchema = z.object({
    ...commonPricingStrategyFields,
    strategy: z.enum(['split', 'bundle']),
    default_price_list: priceListRefNullable,
    custom_prices: z.array(packagePriceFirestoreSchema),
});

export const userPricingStrategyFirestoreSchema = z.object({
    ...commonPricingStrategyFields,
    default_price_list: priceListRefNullable,
    custom_prices: z.array(packagePriceFirestoreSchema),
});

// Create a modified version of commonFinancialPropertiesFields with Timestamp for Firebase
const firestoreFinancialPropertiesFields = {
    ...commonFinancialPropertiesFields,
    // Override date fields with timestamp
    next_invoice: timestampSchema.nullable(),
    last_invoice: timestampSchema.nullable()
};

export const financialPropertiesFirestoreSchema = z.object({
    ...firestoreFinancialPropertiesFields,
    pricing_strategies: z.object({
        partner: partnerPricingStrategyFirestoreSchema.optional(),
        user: userPricingStrategyFirestoreSchema.optional()
    }).nullable()
}).nullable();

// Firestore schema for Partner
export const partnerFirestoreSchema = baseModelSchema.extend({
    ...commonPartnerFields,
    parent: partnerRefNullable,
    users: userRefArrayNullable,
    financial_properties: financialPropertiesFirestoreSchema,
    platform_settings: platformSettingsSchema
});

// Firestore schema for PriceList
export const priceListFirestoreSchema = baseModelSchema.extend({
    name: z.string(),
    description: z.string().nullable(),
    type: z.enum(['partner', 'consumer']),
    partner: partnerRefNullable,
    package_prices: z.array(packagePriceFirestoreSchema)
});

// Types for Firestore schemas
export type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
export type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
export type PackagePriceFirestore = z.infer<typeof packagePriceFirestoreSchema>;
export type PartnerPricingStrategyFirestore = z.infer<typeof partnerPricingStrategyFirestoreSchema>;
export type UserPricingStrategyFirestore = z.infer<typeof userPricingStrategyFirestoreSchema>;
export type FinancialPropertiesFirestore = z.infer<typeof financialPropertiesFirestoreSchema>;
export type FinancialProperties = z.infer<typeof financialPropertiesAppSchema>;

// For backwards compatibility
export type Partner = PartnerFirestore;
export type PriceList = PriceListFirestore;
export type PackagePrice = PackagePriceFirestore;

// Field mapping for Partner conversions
const partnerRefFieldMappings: GenericRefFieldMapping<PartnerApp, PartnerFirestore>[] = [
    { app: 'parent', firestore: 'parent', collection: PARTNER_COLLECTION, nullable: true },
    { app: 'users', firestore: 'users', collection: USER_COLLECTION, isArray: true, nullable: true }
];

// Date field mappings for partner conversions (using base fields from baseModelSchema)
const partnerDateFieldMappings: GenericDateFieldMapping<PartnerApp, PartnerFirestore>[] = [];

// Define nested field mappings for financial_properties timestamps and package references
const nestedFieldMappings: NestedFieldPathMapping[] = [
    // Financial properties nested timestamps
    {
        path: ['financial_properties', 'next_invoice'],
        type: 'timestamp',
        nullable: true
    },
    {
        path: ['financial_properties', 'last_invoice'],
        type: 'timestamp',
        nullable: true
    },
    // Financial properties nested package references in pricing strategies
    {
        path: ['financial_properties', 'pricing_strategies', 'partner', 'custom_prices', '*', 'package'],
        type: 'reference',
        collection: PACKAGE_COLLECTION,
        wildcardIndex: 4
    },
    {
        path: ['financial_properties', 'pricing_strategies', 'user', 'custom_prices', '*', 'package'],
        type: 'reference',
        collection: PACKAGE_COLLECTION,
        wildcardIndex: 4
    },
    // Price list references in pricing strategies
    {
        path: ['financial_properties', 'pricing_strategies', 'partner', 'default_price_list'],
        type: 'reference',
        collection: PRICE_LIST_COLLECTION,
        nullable: true
    },
    {
        path: ['financial_properties', 'pricing_strategies', 'user', 'default_price_list'],
        type: 'reference',
        collection: PRICE_LIST_COLLECTION,
        nullable: true
    }
];

// Conversion functions - use the nested field mappings
export const partnerToFirestore = (partner: PartnerApp): PartnerFirestore => {
    const result = genericToFirestore({
        appObject: partner,
        refFieldMappings: partnerRefFieldMappings,
        dateFieldMappings: partnerDateFieldMappings,
        nestedFieldMappings: nestedFieldMappings
    });

    return result;
};

export const partnerFromFirestore = (firestorePartner: PartnerFirestore): PartnerApp => {
    const result = genericFromFirestore({
        firestoreObject: firestorePartner,
        refFieldMappings: partnerRefFieldMappings,
        dateFieldMappings: partnerDateFieldMappings,
        nestedFieldMappings: nestedFieldMappings
    });

    return result;
};

// Field mapping for PriceList conversions
const priceListRefFieldMappings: GenericRefFieldMapping<PriceListApp, PriceListFirestore>[] = [
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true }
];

// Define nested field mappings for price list
const priceListNestedFieldMappings: NestedFieldPathMapping[] = [
    // Package references in package_prices array
    {
        path: ['package_prices', '*', 'package'],
        type: 'reference',
        collection: PACKAGE_COLLECTION,
        wildcardIndex: 1
    }
];

export const priceListToFirestore = (priceList: PriceListApp): PriceListFirestore => {
    return genericToFirestore({
        appObject: priceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        nestedFieldMappings: priceListNestedFieldMappings
    });
};

export const priceListFromFirestore = (firestorePriceList: PriceListFirestore): PriceListApp => {
    return genericFromFirestore({
        firestoreObject: firestorePriceList,
        refFieldMappings: priceListRefFieldMappings,
        dateFieldMappings: [],
        nestedFieldMappings: priceListNestedFieldMappings
    });
}; 