export { v as API_LOG_COLLECTION, bb as Address, aD as ApiKey, aC as ApiKeys, A as ApiLogApp, r as BOOKING_COLLECTION, bd as BankingDetails, B as BookingApp, bk as BookingConfirmation, bj as BookingDefaults, aK as BookingStatus, n as COUNTRY_COLLECTION, u as CURRENCY_COLLECTION, aH as CommunicationChannel, aG as CommunicationChannelType, aN as CommunicationOptions, C as CountryApp, bV as CoversionRate, d as CurrencyApp, E as ESIMApp, o as ESIM_COLLECTION, bh as FinancialPropertiesApp, b_ as HApiLog, aO as HBooking, bA as HBookingConfirmation, bz as HBookingDefaults, bF as HCountry, bY as HCurrency, bN as HESIM, bu as HFinancialProperties, au as HHubbyModel, bS as HMessage, bI as HPackage, bt as HPackagePrice, by as HPackageStrategy, br as HPartner, bP as HPayment, bv as HPlatformSettings, bs as HPriceList, bK as HPromoCode, bx as HSchedule, bD as HScheduleFilter, bT as HSentMessages, aE as HUser, bw as HVisualIdentity, bB as HVisualIdentityBanner, bC as HVisualIdentityBannerStrategy, at as HubbyModelApp, t as MESSAGE_COLLECTION, M as MessageApp, l as PACKAGE_COLLECTION, i as PARTNER_COLLECTION, p as PAYMENT_COLLECTION, q as PRICE_LIST_COLLECTION, k as PROFILE_COLLECTION, m as PROMO_CODE_COLLECTION, a as PackageApp, be as PackagePriceApp, bi as PackageStrategy, P as PartnerApp, bf as PartnerPricingStrategyApp, c as PaymentApp, bq as PlatformSettings, ba as PriceListApp, b as PromoCodeApp, bc as Registration, e as SUPPORTED_LOCALES, bp as Schedule, bo as ScheduleFilter, S as SentMessagesApp, f as SupportedLocales, g as SupportedLocalesFromSchema, j as USER_COLLECTION, U as UserApp, bg as UserPricingStrategyApp, bn as VisualIdentity, bl as VisualIdentityBanner, bm as VisualIdentityBannerStrategy, aP as addressSchema, ay as apiKeySchema, az as apiKeysSchema, bZ as apiLogAppSchema, N as apiLogRefString, ac as apiLogRefStringArray, ao as apiLogRefStringArrayNullable, a0 as apiLogRefStringNullable, aR as bankingDetailsSchema, h as baseModelAppSchema, aM as bookingAppSchema, a$ as bookingConfirmationSchema, a_ as bookingDefaultsSchema, J as bookingRefString, aa as bookingRefStringArray, am as bookingRefStringArrayNullable, _ as bookingRefStringNullable, aJ as bookingStatusSchema, aL as commonBookingFields, bW as commonCurrencyFields, bL as commonESIMFields, aX as commonFinancialPropertiesFields, bG as commonPackageFields, aS as commonPackagePriceFields, b7 as commonPartnerFields, aU as commonPricingStrategyFields, aA as commonUserFields, aF as communicationChannelSchema, aI as communicationOptionsSchema, bU as conversionRateSchema, bE as countryAppSchema, F as countryRefString, a6 as countryRefStringArray, ai as countryRefStringArrayNullable, W as countryRefStringNullable, av as createIdSchema, bX as currencyAppSchema, L as currencyRefString, ax as currencyRefStringArray, ap as currencyRefStringArrayNullable, aw as currencyRefStringNullable, bM as esimAppSchema, G as esimRefString, a7 as esimRefStringArray, aj as esimRefStringArrayNullable, X as esimRefStringNullable, aY as financialPropertiesAppSchema, b5 as freeEsimSchema, as as hubbyModelAppSchema, bQ as messageAppSchema, K as messageRefString, ab as messageRefStringArray, an as messageRefStringArrayNullable, $ as messageRefStringNullable, bH as packageAppSchema, aT as packagePriceAppSchema, z as packageRefString, a4 as packageRefStringArray, ag as packageRefStringArrayNullable, T as packageRefStringNullable, aZ as packageStrategySchema, b8 as partnerAppSchema, aV as partnerPricingStrategyAppSchema, w as partnerRefString, a1 as partnerRefStringArray, ad as partnerRefStringArrayNullable, O as partnerRefStringNullable, bO as paymentAppSchema, H as paymentRefString, a8 as paymentRefStringArray, ak as paymentRefStringArrayNullable, Y as paymentRefStringNullable, b6 as platformSettingsSchema, b9 as priceListAppSchema, I as priceListRefString, a9 as priceListRefStringArray, al as priceListRefStringArrayNullable, Z as priceListRefStringNullable, y as profileRefString, a3 as profileRefStringArray, af as profileRefStringArrayNullable, R as profileRefStringNullable, bJ as promoCodeAppSchema, D as promoCodeRefString, a5 as promoCodeRefStringArray, ah as promoCodeRefStringArrayNullable, V as promoCodeRefStringNullable, aQ as registrationSchema, b3 as scheduleFilterSchema, b4 as scheduleSchema, bR as sentMessagesAppSchema, s as supportedLocalesSchema, aq as testEnv, aB as userAppSchema, aW as userPricingStrategyAppSchema, x as userRefString, a2 as userRefStringArray, ae as userRefStringArrayNullable, Q as userRefStringNullable, b0 as visualIdentityBannerSchema, b1 as visualIdentityBannerStrategySchema, b2 as visualIdentitySchema, ar as zDateString } from '../constants-e58b5f99.js';
import { z } from 'zod';

declare const packageSpecificationSchema: z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}>;
declare const packageSpecificationsSchema: z.ZodArray<z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}>, "many">;
declare const bookingApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    full_name: z.ZodString;
    pax: z.ZodNumber;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    booking_id: z.ZodNullable<z.ZodString>;
    return_date: z.ZodNullable<z.ZodString>;
    partner: z.ZodString;
    promo_codes: z.ZodArray<z.ZodString, "many">;
    departure_date: z.ZodString;
    flight_number: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    users: z.ZodArray<z.ZodString, "many">;
    esims: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    locale: z.ZodString;
    status: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    communication_options: z.ZodObject<{
        should_send_message: z.ZodBoolean;
        channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }>;
    is_processed_for_esim_restoration: z.ZodBoolean;
    is_pseudonymized: z.ZodBoolean;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    created_by: z.ZodOptional<z.ZodString>;
    updated_by: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    users: string[];
    promo_codes: string[];
    esims: string[] | null;
    partner: string;
    email: string | null;
    locale: string;
    return_date: string | null;
    departure_date: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    phone: string | null;
    booking_id: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    created_by?: string | undefined;
    updated_by?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    users: string[];
    promo_codes: string[];
    esims: string[] | null;
    partner: string;
    email: string | null;
    locale: string;
    return_date: string | null;
    departure_date: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    phone: string | null;
    booking_id: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    created_by?: string | undefined;
    updated_by?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
}>;
declare const promoCodeApiResponseSchema: z.ZodObject<{
    promo_code: z.ZodString;
    package_id: z.ZodString;
    package_size: z.ZodString;
    destination: z.ZodString;
}, "strip", z.ZodTypeAny, {
    package_size: string;
    destination: string;
    package_id: string;
    promo_code: string;
}, {
    package_size: string;
    destination: string;
    package_id: string;
    promo_code: string;
}>;
declare const bookingApiRequestSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    full_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    return_date: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    departure_date: z.ZodEffects<z.ZodDate, Date, unknown>;
    flight_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    communication_options: z.ZodObject<{
        should_send_message: z.ZodBoolean;
        channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }>;
    is_processed_for_esim_restoration: z.ZodBoolean;
    is_pseudonymized: z.ZodBoolean;
    date_of_birth: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    package_specifications: z.ZodArray<z.ZodObject<{
        destination: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }>, "many">;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    return_date: Date | null;
    departure_date: Date;
    title: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    package_specifications: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }[];
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    locale?: string | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    date_of_birth?: Date | undefined;
}, {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    title: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    package_specifications: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }[];
    created_at?: unknown;
    updated_at?: unknown;
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    locale?: string | undefined;
    return_date?: unknown;
    departure_date?: unknown;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    date_of_birth?: unknown;
}>;
declare const partnerApiRequestSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parent: z.ZodNullable<z.ZodString>;
    contact: z.ZodNullable<z.ZodObject<{
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        email: string | null;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        office_phone?: string | null | undefined;
    }>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }>>>;
    registration: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>>>;
    banking_details: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        account_holder: z.ZodString;
        bank_name: z.ZodString;
        iban: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }>>>;
    finance: z.ZodNullable<z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNumber>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
        last_invoice: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
        pricing_strategies: z.ZodOptional<z.ZodObject<{
            partner: z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodAny, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }>;
            user: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodAny, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    }>>;
    platform_settings: z.ZodOptional<z.ZodAny>;
    visual_identity: z.ZodNullable<z.ZodAny>;
    users: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    data: z.ZodOptional<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    platform_settings?: any;
    external_id?: string | null | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null | undefined;
    registration?: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null | undefined;
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null | undefined;
    visual_identity?: any;
}, {
    id: string;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    } | null;
    created_at?: unknown;
    updated_at?: unknown;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    platform_settings?: any;
    external_id?: string | null | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null | undefined;
    registration?: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null | undefined;
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null | undefined;
    visual_identity?: any;
}>;
declare const partnerApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parent: z.ZodNullable<z.ZodString>;
    contact: z.ZodNullable<z.ZodObject<{
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        email: string | null;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        office_phone?: string | null | undefined;
    }>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    }>>>;
    registration: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>>>;
    banking_details: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        account_holder: z.ZodString;
        bank_name: z.ZodString;
        iban: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }, {
        account_holder: string;
        bank_name: string;
        iban: string;
    }>>>;
    finance: z.ZodNullable<z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNumber>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
        last_invoice: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
        pricing_strategies: z.ZodOptional<z.ZodObject<{
            partner: z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodAny, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }>;
            user: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodAny, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    }>>;
    platform_settings: z.ZodOptional<z.ZodAny>;
    visual_identity: z.ZodNullable<z.ZodAny>;
    users: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    data: z.ZodOptional<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    platform_settings?: any;
    external_id?: string | null | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null | undefined;
    registration?: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null | undefined;
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null | undefined;
    visual_identity?: any;
}, {
    id: string;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        pricing_strategies?: {
            partner: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    } | null;
    created_at?: unknown;
    updated_at?: unknown;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    platform_settings?: any;
    external_id?: string | null | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null | undefined;
    registration?: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null | undefined;
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null | undefined;
    visual_identity?: any;
}>;
type PackageSpecification = z.infer<typeof packageSpecificationSchema>;
type PackageSpecifications = z.infer<typeof packageSpecificationsSchema>;
type BookingApiRequest = z.infer<typeof bookingApiRequestSchema>;
type BookingApiResponse = z.infer<typeof bookingApiResponseSchema>;
type PromoCodeApiResponse = z.infer<typeof promoCodeApiResponseSchema>;
type PartnerApiRequest = z.infer<typeof partnerApiRequestSchema>;
type PartnerApiResponse = z.infer<typeof partnerApiResponseSchema>;

declare const convertToDate: (value: any, field: string) => Date;
declare const isDate: (value: any) => value is Date;

export { BookingApiRequest, BookingApiResponse, PackageSpecification, PackageSpecifications, PartnerApiRequest, PartnerApiResponse, PromoCodeApiResponse, bookingApiRequestSchema, bookingApiResponseSchema, convertToDate, isDate, packageSpecificationSchema, packageSpecificationsSchema, partnerApiRequestSchema, partnerApiResponseSchema, promoCodeApiResponseSchema };
