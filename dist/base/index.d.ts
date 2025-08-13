import { z } from 'zod';

declare const HUserSchema: any;
declare const HBookingSchema: any;
declare const HCountrySchema: any;
declare const HCurrencySchema: any;
declare const HESIMSchema: any;
declare const HPaymentSchema: any;
declare const HMessageSchema: any;
declare const HPackageSchema: any;
declare const HPromoCodeSchema: any;
declare const HPartnerSchema: any;
declare const HPriceListSchema: any;
declare const HFinancialPropertiesSchema: any;
declare const HApiLogSchema: any;
declare const HPackagePriceSchema: any;
declare const HubbyModelSchema: any;
declare const HPartnerAppSchema: any;
declare const HPlatformSettingsSchema: any;
declare const HVisualIdentitySchema: any;
declare const HPricingStrategySchema: any;
declare const HFreeEsimSchema: any;
declare const HAnalyticsSchema: any;
declare const HRoleSchema: any;
declare const HPermissionSchema: any;
declare const HTagSchema: any;
declare const HTrafficPolicySchema: any;
declare const HTelnaPackageSchema: any;
declare const HBondioPackageSchema: any;
declare const HAddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const HRegistrationSchema: z.ZodObject<{
    chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const HBankingDetailsSchema: z.ZodObject<{
    account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const HPartnerPackageSpecificationSchema: z.ZodObject<{
    size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destination: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const HPromoPackageSpecificationSchema: z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<{
        "data-limited": "data-limited";
        "time-limited": "time-limited";
        starter: "starter";
        unlimited: "unlimited";
    }>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const HVisualIdentityBannerSchema: z.ZodObject<{
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<{
        "en-US": "en-US";
        "en-EU": "en-EU";
        "en-GB": "en-GB";
        "en-CA": "en-CA";
        "nl-NL": "nl-NL";
        "de-DE": "de-DE";
        "fr-FR": "fr-FR";
        "it-IT": "it-IT";
        "es-ES": "es-ES";
        "cs-CZ": "cs-CZ";
        "pl-PL": "pl-PL";
        "pt-PT": "pt-PT";
        "fr-BE": "fr-BE";
        "nl-BE": "nl-BE";
        "de-AT": "de-AT";
        "de-CH": "de-CH";
        "fr-CH": "fr-CH";
        "it-CH": "it-CH";
        "sv-SE": "sv-SE";
        "sk-SK": "sk-SK";
        "de-BE": "de-BE";
        "en-AU": "en-AU";
        "da-DK": "da-DK";
    }>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, z.core.$strip>;
declare const HScheduleFilterSchema: z.ZodObject<{
    type: z.ZodEnum<{
        gender: "gender";
        iso3: "iso3";
        percentage: "percentage";
        age: "age";
    }>;
    value: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    comparison: z.ZodEnum<{
        equal: "equal";
        not_equal: "not_equal";
        greater_than: "greater_than";
        less_than: "less_than";
        greater_than_or_equal: "greater_than_or_equal";
        less_than_or_equal: "less_than_or_equal";
    }>;
}, z.core.$strip>;
declare const HPartnerContactSchema: z.ZodObject<{
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const HPartnerDataSchema: z.ZodObject<{
    source: z.ZodString;
    manual: z.ZodBoolean;
}, z.core.$strip>;
declare const HCommunicationChannelSchema: z.ZodEnum<{
    EMAIL: "EMAIL";
    WHATSAPP: "WHATSAPP";
    PUSH_NOTIFICATION: "PUSH_NOTIFICATION";
    SMS: "SMS";
}>;
declare const HBookingStatusSchema: z.ZodEnum<{
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
    UNPAID: "UNPAID";
    EXPIRED: "EXPIRED";
}>;
declare const HCommunicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<{
        EMAIL: "EMAIL";
        WHATSAPP: "WHATSAPP";
        PUSH_NOTIFICATION: "PUSH_NOTIFICATION";
        SMS: "SMS";
    }>>;
}, z.core.$strip>;
type HAnalytics = z.infer<typeof HAnalyticsSchema>;
type HUser = z.infer<typeof HUserSchema>;
type HBooking = z.infer<typeof HBookingSchema>;
type HCountry = z.infer<typeof HCountrySchema>;
type HCurrency = z.infer<typeof HCurrencySchema>;
type HESIM = z.infer<typeof HESIMSchema>;
type HPayment = z.infer<typeof HPaymentSchema>;
type HMessage = z.infer<typeof HMessageSchema>;
type HPackage = z.infer<typeof HPackageSchema>;
type HPromoCode = z.infer<typeof HPromoCodeSchema>;
type HPartner = z.infer<typeof HPartnerSchema>;
type HPriceList = z.infer<typeof HPriceListSchema>;
type HApiLog = z.infer<typeof HApiLogSchema>;
type HTag = z.infer<typeof HTagSchema>;
type HTrafficPolicy = z.infer<typeof HTrafficPolicySchema>;
type HBondioPackage = z.infer<typeof HBondioPackageSchema>;
type HTelnaPackage = z.infer<typeof HTelnaPackageSchema>;
type HAddress = z.infer<typeof HAddressSchema>;
type HRegistration = z.infer<typeof HRegistrationSchema>;
type HBankingDetails = z.infer<typeof HBankingDetailsSchema>;
type HPartnerPackageSpecification = z.infer<typeof HPartnerPackageSpecificationSchema>;
type HPromoPackageSpecification = z.infer<typeof HPromoPackageSpecificationSchema>;
type HVisualIdentityBanner = z.infer<typeof HVisualIdentityBannerSchema>;
type HFinancialProperties = z.infer<typeof HFinancialPropertiesSchema>;
type HScheduleFilter = z.infer<typeof HScheduleFilterSchema>;
type HPartnerContact = z.infer<typeof HPartnerContactSchema>;
type HPartnerData = z.infer<typeof HPartnerDataSchema>;
type HCommunicationChannel = z.infer<typeof HCommunicationChannelSchema>;
type HBookingStatus = z.infer<typeof HBookingStatusSchema>;
type HCommunicationOptions = z.infer<typeof HCommunicationOptionsSchema>;
type HHubbyModel = z.infer<typeof HubbyModelSchema>;
type HubbyModelApp = HHubbyModel;
type SupportedLocales = typeof SUPPORTED_LOCALES[number];
declare const SUPPORTED_LOCALES: readonly ["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"];
type HRole = z.infer<typeof HRoleSchema>;
type HPermission = z.infer<typeof HPermissionSchema>;

export { HAddress, HAddressSchema, HAnalytics, HAnalyticsSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBondioPackage, HBondioPackageSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HESIM, HESIMSchema, HFinancialProperties, HFinancialPropertiesSchema, HFreeEsimSchema, HHubbyModel, HMessage, HMessageSchema, HPackage, HPackagePriceSchema, HPackageSchema, HPartner, HPartnerAppSchema, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPermission, HPermissionSchema, HPlatformSettingsSchema, HPriceList, HPriceListSchema, HPricingStrategySchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HRole, HRoleSchema, HScheduleFilter, HScheduleFilterSchema, HTag, HTagSchema, HTelnaPackage, HTelnaPackageSchema, HTrafficPolicy, HTrafficPolicySchema, HUser, HUserSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, HVisualIdentitySchema, HubbyModelApp, HubbyModelSchema, SUPPORTED_LOCALES, SupportedLocales };
