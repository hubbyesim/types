import { z } from 'zod';

declare const testEnv: {
    isTestEnvironment: boolean;
};
declare const zDateString: () => z.ZodEffects<z.ZodDate, Date, unknown>;
declare const baseModelAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
}, {
    id: string;
    created_by: string | null;
    updated_by: string | null;
    created_at?: unknown;
    updated_at?: unknown;
}>;
declare const hubbyModelAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
}, {
    id: string;
    created_by: string | null;
    updated_by: string | null;
    created_at?: unknown;
    updated_at?: unknown;
}>;
type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;
type HHubbyModel = HubbyModelApp;
declare const createIdSchema: (collectionPath: string) => z.ZodString;

declare const PARTNER_COLLECTION = "partners";
declare const USER_COLLECTION = "users";
declare const PROFILE_COLLECTION = "profiles";
declare const PACKAGE_COLLECTION = "packages";
declare const PROMO_CODE_COLLECTION = "promo_codes";
declare const COUNTRY_COLLECTION = "countries";
declare const ESIM_COLLECTION = "esims";
declare const PAYMENT_COLLECTION = "payments";
declare const PRICE_LIST_COLLECTION = "price_lists";
declare const BOOKING_COLLECTION = "bookings";
declare const MESSAGE_COLLECTION = "messages";
declare const CURRENCY_COLLECTION = "currencies";
declare const API_LOG_COLLECTION = "api_logs";
declare const partnerRefString: z.ZodString;
declare const userRefString: z.ZodString;
declare const profileRefString: z.ZodString;
declare const packageRefString: z.ZodString;
declare const promoCodeRefString: z.ZodString;
declare const countryRefString: z.ZodString;
declare const esimRefString: z.ZodString;
declare const paymentRefString: z.ZodString;
declare const priceListRefString: z.ZodString;
declare const bookingRefString: z.ZodString;
declare const messageRefString: z.ZodString;
declare const currencyRefString: z.ZodString;
declare const apiLogRefString: z.ZodString;
declare const partnerRefStringNullable: z.ZodNullable<z.ZodString>;
declare const userRefStringNullable: z.ZodNullable<z.ZodString>;
declare const profileRefStringNullable: z.ZodNullable<z.ZodString>;
declare const packageRefStringNullable: z.ZodNullable<z.ZodString>;
declare const promoCodeRefStringNullable: z.ZodNullable<z.ZodString>;
declare const countryRefStringNullable: z.ZodNullable<z.ZodString>;
declare const esimRefStringNullable: z.ZodNullable<z.ZodString>;
declare const paymentRefStringNullable: z.ZodNullable<z.ZodString>;
declare const priceListRefStringNullable: z.ZodNullable<z.ZodString>;
declare const bookingRefStringNullable: z.ZodNullable<z.ZodString>;
declare const messageRefStringNullable: z.ZodNullable<z.ZodString>;
declare const currencyRefStringNullable: z.ZodNullable<z.ZodString>;
declare const apiLogRefStringNullable: z.ZodNullable<z.ZodString>;
declare const partnerRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const userRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const profileRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const packageRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const promoCodeRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const countryRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const esimRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const paymentRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const priceListRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const bookingRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const messageRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const currencyRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const apiLogRefStringArray: z.ZodArray<z.ZodString, "many">;
declare const partnerRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const userRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const profileRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const packageRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const promoCodeRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const countryRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const esimRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const paymentRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const priceListRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const bookingRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const messageRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const currencyRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
declare const apiLogRefStringArrayNullable: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;

declare const apiKeySchema: z.ZodObject<{
    expires_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    secret: z.ZodString;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    expires_at: Date;
    secret: string;
    is_active: boolean;
}, {
    secret: string;
    is_active: boolean;
    expires_at?: unknown;
}>;
declare const apiKeysSchema: z.ZodObject<{
    allowed_keys: z.ZodArray<z.ZodString, "many">;
    keys: z.ZodRecord<z.ZodString, z.ZodObject<{
        expires_at: z.ZodEffects<z.ZodDate, Date, unknown>;
        secret: z.ZodString;
        is_active: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        expires_at: Date;
        secret: string;
        is_active: boolean;
    }, {
        secret: string;
        is_active: boolean;
        expires_at?: unknown;
    }>>;
}, "strip", z.ZodTypeAny, {
    keys: Record<string, {
        expires_at: Date;
        secret: string;
        is_active: boolean;
    }>;
    allowed_keys: string[];
}, {
    keys: Record<string, {
        secret: string;
        is_active: boolean;
        expires_at?: unknown;
    }>;
    allowed_keys: string[];
}>;
declare const commonUserFields: {
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodNullable<z.ZodString>;
    referral: z.ZodNullable<z.ZodString>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    company: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodString>;
    parameters: z.ZodNullable<z.ZodAny>;
    locale: z.ZodNullable<z.ZodString>;
    phone_model: z.ZodNullable<z.ZodString>;
    phone_os: z.ZodNullable<z.ZodString>;
    phone_os_version: z.ZodNullable<z.ZodString>;
    ios: z.ZodNullable<z.ZodBoolean>;
    has_card_saved: z.ZodNullable<z.ZodBoolean>;
    admin: z.ZodNullable<z.ZodBoolean>;
    api_keys: z.ZodNullable<z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodEffects<z.ZodDate, Date, unknown>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }, {
            secret: string;
            is_active: boolean;
            expires_at?: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at?: unknown;
        }>;
        allowed_keys: string[];
    }>>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
};
declare const userAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    partner: z.ZodNullable<z.ZodString>;
    profileRef: z.ZodNullable<z.ZodString>;
    balance: z.ZodNullable<z.ZodNumber>;
    review_requested: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    last_seen: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodNullable<z.ZodString>;
    referral: z.ZodNullable<z.ZodString>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    company: z.ZodNullable<z.ZodString>;
    coordinates: z.ZodNullable<z.ZodString>;
    parameters: z.ZodNullable<z.ZodAny>;
    locale: z.ZodNullable<z.ZodString>;
    phone_model: z.ZodNullable<z.ZodString>;
    phone_os: z.ZodNullable<z.ZodString>;
    phone_os_version: z.ZodNullable<z.ZodString>;
    ios: z.ZodNullable<z.ZodBoolean>;
    has_card_saved: z.ZodNullable<z.ZodBoolean>;
    admin: z.ZodNullable<z.ZodBoolean>;
    api_keys: z.ZodNullable<z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodEffects<z.ZodDate, Date, unknown>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }, {
            secret: string;
            is_active: boolean;
            expires_at?: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at?: unknown;
        }>;
        allowed_keys: string[];
    }>>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    createdAt: Date;
    partner: string | null;
    profileRef: string | null;
    balance: number | null;
    review_requested: Date | null;
    last_seen: Date | null;
    name: string | null;
    email: string | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    gender: string | null;
    company: string | null;
    coordinates: string | null;
    locale: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    } | null;
    currency: string | null;
    receipt_email: string | null;
    fcm?: string | undefined;
    parameters?: any;
}, {
    id: string;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    profileRef: string | null;
    balance: number | null;
    name: string | null;
    email: string | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    gender: string | null;
    company: string | null;
    coordinates: string | null;
    locale: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            secret: string;
            is_active: boolean;
            expires_at?: unknown;
        }>;
        allowed_keys: string[];
    } | null;
    currency: string | null;
    receipt_email: string | null;
    created_at?: unknown;
    updated_at?: unknown;
    createdAt?: unknown;
    review_requested?: unknown;
    last_seen?: unknown;
    fcm?: string | undefined;
    parameters?: any;
}>;
type UserApp = z.infer<typeof userAppSchema>;
type ApiKeys = z.infer<typeof apiKeysSchema>;
type ApiKey = z.infer<typeof apiKeySchema>;
type HUser = UserApp;

declare const communicationChannelSchema: z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>;
type CommunicationChannelType = z.infer<typeof communicationChannelSchema>;
type CommunicationChannel = CommunicationChannelType;
declare const CommunicationChannel: {
    readonly EMAIL: "EMAIL";
    readonly WHATSAPP: "WHATSAPP";
    readonly PUSH_NOTIFICATION: "PUSH_NOTIFICATION";
    readonly SMS: "SMS";
};
declare const communicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
}, "strip", z.ZodTypeAny, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}>;
declare const bookingStatusSchema: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
type BookingStatus = z.infer<typeof bookingStatusSchema>;
declare const commonBookingFields: {
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    full_name: z.ZodString;
    pax: z.ZodNumber;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    booking_id: z.ZodNullable<z.ZodString>;
    flight_number: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
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
    package_specifications: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
};
declare const bookingAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    return_date: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    departure_date: z.ZodEffects<z.ZodDate, Date, unknown>;
    partner: z.ZodString;
    promo_codes: z.ZodArray<z.ZodString, "many">;
    users: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    esims: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    full_name: z.ZodString;
    pax: z.ZodNumber;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    booking_id: z.ZodNullable<z.ZodString>;
    flight_number: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
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
    package_specifications: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    promo_codes: string[];
    esims: string[] | null;
    partner: string;
    email: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    return_date: Date | null;
    departure_date: Date;
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
    gender?: "M" | "F" | "O" | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}, {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    promo_codes: string[];
    esims: string[] | null;
    partner: string;
    email: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
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
    created_at?: unknown;
    updated_at?: unknown;
    gender?: "M" | "F" | "O" | undefined;
    return_date?: unknown;
    departure_date?: unknown;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}>;
type BookingApp = z.infer<typeof bookingAppSchema>;
type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;
type HBooking = BookingApp;

declare const addressSchema: z.ZodNullable<z.ZodObject<{
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
}>>;
declare const registrationSchema: z.ZodNullable<z.ZodObject<{
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
}>>;
declare const bankingDetailsSchema: z.ZodNullable<z.ZodObject<{
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
}>>;
declare const commonPackagePriceFields: {
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
};
declare const packagePriceAppSchema: z.ZodObject<{
    package: z.ZodString;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    package: string;
    destination: string;
    label: string;
    price: number;
}, {
    type: "data-limit" | "time-limit";
    package: string;
    destination: string;
    label: string;
    price: number;
}>;
declare const commonPricingStrategyFields: {
    modification_percentage: z.ZodNumber;
};
declare const partnerPricingStrategyAppSchema: z.ZodObject<{
    strategy: z.ZodEnum<["split", "bundle"]>;
    default_price_list: z.ZodNullable<z.ZodString>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodString;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    strategy: "split" | "bundle";
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}, {
    strategy: "split" | "bundle";
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}>;
declare const userPricingStrategyAppSchema: z.ZodObject<{
    default_price_list: z.ZodNullable<z.ZodString>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodString;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
    modification_percentage: number;
}>;
declare const commonFinancialPropertiesFields: {
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
    last_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
};
declare const financialPropertiesAppSchema: z.ZodNullable<z.ZodObject<{
    pricing_strategies: z.ZodNullable<z.ZodObject<{
        partner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["split", "bundle"]>;
            default_price_list: z.ZodNullable<z.ZodString>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodString;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }, {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }>>;
        user: z.ZodOptional<z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodString>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodString;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    }, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    }>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
    last_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
}, "strip", z.ZodTypeAny, {
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    commission_fee?: number | null | undefined;
    next_invoice?: Date | null | undefined;
    last_invoice?: Date | null | undefined;
}, {
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                package: string;
                destination: string;
                label: string;
                price: number;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    commission_fee?: number | null | undefined;
    next_invoice?: unknown;
    last_invoice?: unknown;
}>>;
declare const packageStrategySchema: z.ZodObject<{
    name: z.ZodString;
    iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    parameters: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    name: string;
    parameters?: any;
    iso3_white_list?: string[] | undefined;
}, {
    name: string;
    parameters?: any;
    iso3_white_list?: string[] | undefined;
}>;
declare const bookingDefaultsSchema: z.ZodObject<{
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
}, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
}>;
declare const bookingConfirmationSchema: z.ZodObject<{
    brevo_template_id: z.ZodNumber;
    send_booking_confirmation: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}, {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}>;
declare const visualIdentityBannerSchema: z.ZodObject<{
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
}, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
}>;
declare const visualIdentityBannerStrategySchema: z.ZodObject<{
    strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
    banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        image_url: z.ZodString;
        alt: z.ZodString;
        click_url: z.ZodString;
        locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
        properties: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    strategy: "fixed" | "destination" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[] | null | undefined;
}, {
    strategy: "fixed" | "destination" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[] | null | undefined;
}>;
declare const visualIdentitySchema: z.ZodObject<{
    primary_color: z.ZodString;
    secondary_color: z.ZodString;
    logo: z.ZodString;
    font: z.ZodString;
    top_banner: z.ZodOptional<z.ZodObject<{
        strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
        banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            image_url: z.ZodString;
            alt: z.ZodString;
            click_url: z.ZodString;
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
            properties: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }>>;
    mid_banner: z.ZodOptional<z.ZodObject<{
        strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
        banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            image_url: z.ZodString;
            alt: z.ZodString;
            click_url: z.ZodString;
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
            properties: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    primary_color: string;
    secondary_color: string;
    logo: string;
    font: string;
    top_banner?: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
    mid_banner?: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
}, {
    primary_color: string;
    secondary_color: string;
    logo: string;
    font: string;
    top_banner?: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
    mid_banner?: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
}>;
declare const scheduleFilterSchema: z.ZodNullable<z.ZodObject<{
    type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
}, "strip", z.ZodTypeAny, {
    value: string | number;
    type: "gender" | "iso3" | "percentage" | "age";
    comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
}, {
    value: string | number;
    type: "gender" | "iso3" | "percentage" | "age";
    comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
}>>;
declare const scheduleSchema: z.ZodObject<{
    days: z.ZodNumber;
    email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        brevo_template_id: z.ZodNumber;
        subject: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
        preview_text: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
    }, "strip", z.ZodTypeAny, {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    }, {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    }>>>;
    push: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        target: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        target: string;
        title?: Record<string, string> | undefined;
        body?: Record<string, string> | undefined;
    }, {
        target: string;
        title?: Record<string, string> | undefined;
        body?: Record<string, string> | undefined;
    }>>>;
    hour: z.ZodNumber;
    key: z.ZodString;
    method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
    moment: z.ZodEnum<["departure", "return", "immediate"]>;
    filter: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
    }, "strip", z.ZodTypeAny, {
        value: string | number;
        type: "gender" | "iso3" | "percentage" | "age";
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    }, {
        value: string | number;
        type: "gender" | "iso3" | "percentage" | "age";
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    }>>>>;
}, "strip", z.ZodTypeAny, {
    days: number;
    hour: number;
    key: string;
    method: "push" | "email" | "sms" | "whatsapp";
    moment: "departure" | "return" | "immediate";
    push?: {
        target: string;
        title?: Record<string, string> | undefined;
        body?: Record<string, string> | undefined;
    } | null | undefined;
    filter?: {
        value: string | number;
        type: "gender" | "iso3" | "percentage" | "age";
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    } | null | undefined;
    email?: {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    } | null | undefined;
}, {
    days: number;
    hour: number;
    key: string;
    method: "push" | "email" | "sms" | "whatsapp";
    moment: "departure" | "return" | "immediate";
    push?: {
        target: string;
        title?: Record<string, string> | undefined;
        body?: Record<string, string> | undefined;
    } | null | undefined;
    filter?: {
        value: string | number;
        type: "gender" | "iso3" | "percentage" | "age";
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    } | null | undefined;
    email?: {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    } | null | undefined;
}>;
declare const freeEsimSchema: z.ZodObject<{
    package_specification: z.ZodObject<{
        size: z.ZodString;
        type: z.ZodString;
        destination: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        destination: string;
        size: string;
    }, {
        type: string;
        destination: string;
        size: string;
    }>;
    allowance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    package_specification: {
        type: string;
        destination: string;
        size: string;
    };
    allowance: number;
}, {
    package_specification: {
        type: string;
        destination: string;
        size: string;
    };
    allowance: number;
}>;
declare const platformSettingsSchema: z.ZodNullable<z.ZodObject<{
    package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        parameters: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
    }, {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
    }>>>;
    free_esim: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        package_specification: z.ZodObject<{
            size: z.ZodString;
            type: z.ZodString;
            destination: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            destination: string;
            size: string;
        }, {
            type: string;
            destination: string;
            size: string;
        }>;
        allowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        allowance: number;
    }, {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        allowance: number;
    }>>>;
    booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    }, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    }>>>;
    booking_confirmation: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        brevo_template_id: z.ZodNumber;
        send_booking_confirmation: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    }, {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    }>>>;
    schedules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        days: z.ZodNumber;
        email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            subject: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
            preview_text: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
        }, "strip", z.ZodTypeAny, {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        }, {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        }>>>;
        push: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            target: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        }, {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        }>>>;
        hour: z.ZodNumber;
        key: z.ZodString;
        method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
        moment: z.ZodEnum<["departure", "return", "immediate"]>;
        filter: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
            type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        }, {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        }>>>>;
    }, "strip", z.ZodTypeAny, {
        days: number;
        hour: number;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        moment: "departure" | "return" | "immediate";
        push?: {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        } | null | undefined;
        filter?: {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null | undefined;
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
    }, {
        days: number;
        hour: number;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        moment: "departure" | "return" | "immediate";
        push?: {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        } | null | undefined;
        filter?: {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null | undefined;
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        allowance: number;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    schedules?: {
        days: number;
        hour: number;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        moment: "departure" | "return" | "immediate";
        push?: {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        } | null | undefined;
        filter?: {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null | undefined;
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
    }[] | undefined;
}, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        allowance: number;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    schedules?: {
        days: number;
        hour: number;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        moment: "departure" | "return" | "immediate";
        push?: {
            target: string;
            title?: Record<string, string> | undefined;
            body?: Record<string, string> | undefined;
        } | null | undefined;
        filter?: {
            value: string | number;
            type: "gender" | "iso3" | "percentage" | "age";
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null | undefined;
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
    }[] | undefined;
}>>;
declare const commonPartnerFields: {
    name: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    address: z.ZodNullable<z.ZodObject<{
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
    }>>;
    registration: z.ZodNullable<z.ZodObject<{
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
    }>>;
    banking_details: z.ZodNullable<z.ZodObject<{
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
    }>>;
    visual_identity: z.ZodNullable<z.ZodObject<{
        primary_color: z.ZodString;
        secondary_color: z.ZodString;
        logo: z.ZodString;
        font: z.ZodString;
        top_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
        mid_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>>;
    data: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>>;
};
declare const partnerAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    parent: z.ZodNullable<z.ZodString>;
    users: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    financial_properties: z.ZodNullable<z.ZodObject<{
        pricing_strategies: z.ZodNullable<z.ZodObject<{
            partner: z.ZodOptional<z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodString;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }>>;
            user: z.ZodOptional<z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodString;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        }, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        }>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
        last_invoice: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>>;
    }, "strip", z.ZodTypeAny, {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        commission_fee?: number | null | undefined;
        next_invoice?: Date | null | undefined;
        last_invoice?: Date | null | undefined;
    }, {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        commission_fee?: number | null | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    }>>;
    platform_settings: z.ZodNullable<z.ZodObject<{
        package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }>>>;
        free_esim: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            package_specification: z.ZodObject<{
                size: z.ZodString;
                type: z.ZodString;
                destination: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                destination: string;
                size: string;
            }, {
                type: string;
                destination: string;
                size: string;
            }>;
            allowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        }, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        }>>>;
        booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }>>>;
        booking_confirmation: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>>>;
        schedules: z.ZodOptional<z.ZodArray<z.ZodObject<{
            days: z.ZodNumber;
            email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                brevo_template_id: z.ZodNumber;
                subject: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
                preview_text: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
            }, "strip", z.ZodTypeAny, {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            }, {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            }>>>;
            push: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                target: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            }, {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            }>>>;
            hour: z.ZodNumber;
            key: z.ZodString;
            method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
            moment: z.ZodEnum<["departure", "return", "immediate"]>;
            filter: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
                type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }, {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }>>>>;
        }, "strip", z.ZodTypeAny, {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }, {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    }, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    }>>;
    name: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    address: z.ZodNullable<z.ZodObject<{
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
    }>>;
    registration: z.ZodNullable<z.ZodObject<{
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
    }>>;
    banking_details: z.ZodNullable<z.ZodObject<{
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
    }>>;
    visual_identity: z.ZodNullable<z.ZodObject<{
        primary_color: z.ZodString;
        secondary_color: z.ZodString;
        logo: z.ZodString;
        font: z.ZodString;
        top_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
        mid_banner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                image_url: z.ZodString;
                alt: z.ZodString;
                click_url: z.ZodString;
                locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>>;
    data: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    financial_properties: {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        commission_fee?: number | null | undefined;
        next_invoice?: Date | null | undefined;
        last_invoice?: Date | null | undefined;
    } | null;
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null;
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null;
    banking_details: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    type: string | null;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    name: string | null;
    parent: string | null;
    financial_properties: {
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    package: string;
                    destination: string;
                    label: string;
                    price: number;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        commission_fee?: number | null | undefined;
        next_invoice?: unknown;
        last_invoice?: unknown;
    } | null;
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            allowance: number;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        schedules?: {
            days: number;
            hour: number;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            moment: "departure" | "return" | "immediate";
            push?: {
                target: string;
                title?: Record<string, string> | undefined;
                body?: Record<string, string> | undefined;
            } | null | undefined;
            filter?: {
                value: string | number;
                type: "gender" | "iso3" | "percentage" | "age";
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null | undefined;
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
        }[] | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    address: {
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        country?: string | undefined;
    } | null;
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    } | null;
    banking_details: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    } | null;
    created_at?: unknown;
    updated_at?: unknown;
    is_active?: boolean | null | undefined;
    data?: {
        source: string;
        manual: boolean;
    } | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const priceListAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["partner", "consumer"]>;
    partner: z.ZodNullable<z.ZodString>;
    package_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodString;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "partner" | "consumer";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    description: string | null;
    partner: string | null;
    name: string;
    package_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
}, {
    id: string;
    type: "partner" | "consumer";
    created_by: string | null;
    updated_by: string | null;
    description: string | null;
    partner: string | null;
    name: string;
    package_prices: {
        type: "data-limit" | "time-limit";
        package: string;
        destination: string;
        label: string;
        price: number;
    }[];
    created_at?: unknown;
    updated_at?: unknown;
}>;
type PartnerApp = z.infer<typeof partnerAppSchema>;
type PriceListApp = z.infer<typeof priceListAppSchema>;
type Address = z.infer<typeof addressSchema>;
type Registration = z.infer<typeof registrationSchema>;
type BankingDetails = z.infer<typeof bankingDetailsSchema>;
type PackagePriceApp = z.infer<typeof packagePriceAppSchema>;
type PartnerPricingStrategyApp = z.infer<typeof partnerPricingStrategyAppSchema>;
type UserPricingStrategyApp = z.infer<typeof userPricingStrategyAppSchema>;
type FinancialPropertiesApp = z.infer<typeof financialPropertiesAppSchema>;
type PackageStrategy = z.infer<typeof packageStrategySchema>;
type BookingDefaults = z.infer<typeof bookingDefaultsSchema>;
type BookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
type VisualIdentityBanner = z.infer<typeof visualIdentityBannerSchema>;
type VisualIdentityBannerStrategy = z.infer<typeof visualIdentityBannerStrategySchema>;
type VisualIdentity = z.infer<typeof visualIdentitySchema>;
type ScheduleFilter = z.infer<typeof scheduleFilterSchema>;
type Schedule = z.infer<typeof scheduleSchema>;
type PlatformSettings = z.infer<typeof platformSettingsSchema>;
type HPartner = PartnerApp;
type HPriceList = PriceListApp;
type HPackagePrice = PackagePriceApp;
type HFinancialProperties = FinancialPropertiesApp;
type HPlatformSettings = PlatformSettings;
type HVisualIdentity = VisualIdentity;
type HSchedule = Schedule;
type HPackageStrategy = PackageStrategy;
type HBookingDefaults = BookingDefaults;
type HBookingConfirmation = BookingConfirmation;
type HVisualIdentityBanner = VisualIdentityBanner;
type HVisualIdentityBannerStrategy = VisualIdentityBannerStrategy;
type HScheduleFilter = ScheduleFilter;

declare const countryAppSchema: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    bokun_id: z.ZodNullable<z.ZodNumber>;
    LTE: z.ZodNullable<z.ZodBoolean>;
    apn: z.ZodNullable<z.ZodString>;
    click_count: z.ZodNullable<z.ZodNumber>;
    global_network: z.ZodNullable<z.ZodString>;
    global_price: z.ZodNullable<z.ZodNumber>;
    hubby: z.ZodNullable<z.ZodNumber>;
    imsi: z.ZodNullable<z.ZodNumber>;
    has_esim: z.ZodBoolean;
    name: z.ZodNullable<z.ZodString>;
    region: z.ZodNullable<z.ZodBoolean>;
    is_region: z.ZodNullable<z.ZodBoolean>;
    countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    tier: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string | null;
    countries: string[] | null;
    name: string | null;
    bokun_id: number | null;
    LTE: boolean | null;
    apn: string | null;
    click_count: number | null;
    global_network: string | null;
    global_price: number | null;
    hubby: number | null;
    imsi: number | null;
    has_esim: boolean;
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}, {
    id: string | null;
    countries: string[] | null;
    name: string | null;
    bokun_id: number | null;
    LTE: boolean | null;
    apn: string | null;
    click_count: number | null;
    global_network: string | null;
    global_price: number | null;
    hubby: number | null;
    imsi: number | null;
    has_esim: boolean;
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}>;
type CountryApp = z.infer<typeof countryAppSchema>;
type HCountry = CountryApp;

declare const commonPackageFields: {
    external_id: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    bytes: z.ZodNumber;
    hidden: z.ZodBoolean;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    country_data: z.ZodNullable<z.ZodObject<{
        id: z.ZodNullable<z.ZodString>;
        bokun_id: z.ZodNullable<z.ZodNumber>;
        LTE: z.ZodNullable<z.ZodBoolean>;
        apn: z.ZodNullable<z.ZodString>;
        click_count: z.ZodNullable<z.ZodNumber>;
        global_network: z.ZodNullable<z.ZodString>;
        global_price: z.ZodNullable<z.ZodNumber>;
        hubby: z.ZodNullable<z.ZodNumber>;
        imsi: z.ZodNullable<z.ZodNumber>;
        has_esim: z.ZodBoolean;
        name: z.ZodNullable<z.ZodString>;
        region: z.ZodNullable<z.ZodBoolean>;
        is_region: z.ZodNullable<z.ZodBoolean>;
        countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        tier: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }>>;
    price: z.ZodNumber;
    partner_price: z.ZodNumber;
    days: z.ZodNumber;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited"]>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imsi: number;
    }, {
        imsi: number;
    }>>;
};
declare const packageAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    country: z.ZodString;
    partner: z.ZodNullable<z.ZodString>;
    external_id: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    bytes: z.ZodNumber;
    hidden: z.ZodBoolean;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    country_data: z.ZodNullable<z.ZodObject<{
        id: z.ZodNullable<z.ZodString>;
        bokun_id: z.ZodNullable<z.ZodNumber>;
        LTE: z.ZodNullable<z.ZodBoolean>;
        apn: z.ZodNullable<z.ZodString>;
        click_count: z.ZodNullable<z.ZodNumber>;
        global_network: z.ZodNullable<z.ZodString>;
        global_price: z.ZodNullable<z.ZodNumber>;
        hubby: z.ZodNullable<z.ZodNumber>;
        imsi: z.ZodNullable<z.ZodNumber>;
        has_esim: z.ZodBoolean;
        name: z.ZodNullable<z.ZodString>;
        region: z.ZodNullable<z.ZodBoolean>;
        is_region: z.ZodNullable<z.ZodBoolean>;
        countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        tier: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }, {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    }>>;
    price: z.ZodNumber;
    partner_price: z.ZodNumber;
    days: z.ZodNumber;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited"]>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imsi: number;
    }, {
        imsi: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "data-limited" | "time-limited" | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    is_active: boolean;
    partner: string | null;
    name: string;
    country: string;
    label: string;
    price: number;
    days: number;
    external_id: string;
    provider: string;
    coverage_label: string | null;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    country_data: {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    partner_price: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}, {
    id: string;
    type: "data-limited" | "time-limited" | null;
    created_by: string | null;
    updated_by: string | null;
    is_active: boolean;
    partner: string | null;
    name: string;
    country: string;
    label: string;
    price: number;
    days: number;
    external_id: string;
    provider: string;
    coverage_label: string | null;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    country_data: {
        id: string | null;
        countries: string[] | null;
        name: string | null;
        bokun_id: number | null;
        LTE: boolean | null;
        apn: string | null;
        click_count: number | null;
        global_network: string | null;
        global_price: number | null;
        hubby: number | null;
        imsi: number | null;
        has_esim: boolean;
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    partner_price: number;
    provider_parameters: {
        imsi: number;
    } | null;
    created_at?: unknown;
    updated_at?: unknown;
    throttling?: number | undefined;
}>;
type PackageApp = z.infer<typeof packageAppSchema>;
type HPackage = PackageApp;

declare const promoCodeAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    external_id: z.ZodString;
    code: z.ZodString;
    allowance_user: z.ZodNumber;
    allowance_total: z.ZodNumber;
    type: z.ZodUnion<[z.ZodNullable<z.ZodEnum<["full-discount", "partial-discount", "booking", "traveler"]>>, z.ZodString]>;
    usage: z.ZodArray<z.ZodString, "many">;
    uuid_usage: z.ZodArray<z.ZodString, "many">;
    package_specification: z.ZodOptional<z.ZodObject<{
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
    }>>;
    partner: z.ZodNullable<z.ZodString>;
    valid_from: z.ZodEffects<z.ZodDate, Date, unknown>;
    valid_to: z.ZodEffects<z.ZodDate, Date, unknown>;
    discount: z.ZodOptional<z.ZodNumber>;
    package_size: z.ZodOptional<z.ZodString>;
    package: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    booking: z.ZodNullable<z.ZodString>;
    countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    max_bytes: z.ZodOptional<z.ZodNumber>;
    starter_data: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    code: string;
    type: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    country: string | null;
    package: string | null;
    external_id: string;
    allowance_user: number;
    allowance_total: number;
    booking: string | null;
    usage: string[];
    uuid_usage: string[];
    valid_from: Date;
    valid_to: Date;
    countries?: string[] | undefined;
    package_size?: string | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    } | undefined;
    discount?: number | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}, {
    id: string;
    code: string;
    type: string | null;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    country: string | null;
    package: string | null;
    external_id: string;
    allowance_user: number;
    allowance_total: number;
    booking: string | null;
    usage: string[];
    uuid_usage: string[];
    created_at?: unknown;
    updated_at?: unknown;
    countries?: string[] | undefined;
    package_size?: string | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    } | undefined;
    valid_from?: unknown;
    valid_to?: unknown;
    discount?: number | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}>;
type PromoCodeApp = z.infer<typeof promoCodeAppSchema>;
type HPromoCode = PromoCodeApp;

declare const commonESIMFields: {
    imsi: z.ZodNumber;
    qr: z.ZodString;
    iccid: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_data: z.ZodNullable<z.ZodNumber>;
    data_left: z.ZodNullable<z.ZodNumber>;
    data_used: z.ZodNullable<z.ZodBoolean>;
    status: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    android_auto: z.ZodBoolean;
    partner_price: z.ZodNullable<z.ZodNumber>;
    promo: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["api", "promo", "balance", "code", "external", "payment"]>;
    is_auto_install: z.ZodBoolean;
    is_archived: z.ZodBoolean;
    user: z.ZodNullable<z.ZodString>;
    payment: z.ZodNullable<z.ZodString>;
    apn: z.ZodNullable<z.ZodString>;
};
declare const esimAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    country: z.ZodNullable<z.ZodString>;
    time_assigned: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    last_updated: z.ZodNullable<z.ZodEffects<z.ZodDate, Date, unknown>>;
    partner: z.ZodNullable<z.ZodString>;
    imsi: z.ZodNumber;
    qr: z.ZodString;
    iccid: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_data: z.ZodNullable<z.ZodNumber>;
    data_left: z.ZodNullable<z.ZodNumber>;
    data_used: z.ZodNullable<z.ZodBoolean>;
    status: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    android_auto: z.ZodBoolean;
    partner_price: z.ZodNullable<z.ZodNumber>;
    promo: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["api", "promo", "balance", "code", "external", "payment"]>;
    is_auto_install: z.ZodBoolean;
    is_archived: z.ZodBoolean;
    user: z.ZodNullable<z.ZodString>;
    payment: z.ZodNullable<z.ZodString>;
    apn: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "code" | "balance" | "api" | "promo" | "external" | "payment";
    status: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    name: string;
    country: string | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    provider: string;
    partner_price: number | null;
    promo: string | null;
    payment: string | null;
    time_assigned: Date | null;
    last_updated: Date | null;
    qr: string;
    iccid: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}, {
    id: string;
    type: "code" | "balance" | "api" | "promo" | "external" | "payment";
    status: string | null;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    name: string;
    country: string | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    provider: string;
    partner_price: number | null;
    promo: string | null;
    payment: string | null;
    qr: string;
    iccid: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    is_auto_install: boolean;
    is_archived: boolean;
    created_at?: unknown;
    updated_at?: unknown;
    coverage_label?: string | null | undefined;
    time_assigned?: unknown;
    last_updated?: unknown;
}>;
type ESIMApp = z.infer<typeof esimAppSchema>;
type HESIM = ESIMApp;

declare const paymentAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodEffects<z.ZodDate, Date, unknown>;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    date: Date;
    updated_by: string | null;
    package: string;
    promo: string;
    iccid: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_by: string | null;
    updated_by: string | null;
    package: string;
    promo: string;
    iccid: string;
    amount: number;
    customer: string;
    topup: boolean;
    created_at?: unknown;
    updated_at?: unknown;
    date?: unknown;
}>;
type PaymentApp = z.infer<typeof paymentAppSchema>;
type HPayment = PaymentApp;

declare const messageAppSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Date;
    updated_at: Date;
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
    created_at?: unknown;
    updated_at?: unknown;
}>;
declare const sentMessagesAppSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Date;
    updated_at: Date;
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
    created_at?: unknown;
    updated_at?: unknown;
}>>;
type MessageApp = z.infer<typeof messageAppSchema>;
type SentMessagesApp = z.infer<typeof sentMessagesAppSchema>;
type HMessage = MessageApp;
type HSentMessages = SentMessagesApp;

declare const conversionRateSchema: z.ZodObject<{
    currency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    currency: number;
}, {
    currency: number;
}>;
type CoversionRate = z.infer<typeof conversionRateSchema>;
declare const commonCurrencyFields: {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
};
declare const currencyAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    updated_at: z.ZodEffects<z.ZodDate, Date, unknown>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    id: string;
    code: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    name: string;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    code: string;
    created_by: string | null;
    updated_by: string | null;
    name: string;
    rate: number;
    is_default: boolean;
    created_at?: unknown;
    updated_at?: unknown;
}>;
type CurrencyApp = z.infer<typeof currencyAppSchema>;
type HCurrency = CurrencyApp;

declare const apiLogAppSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodEffects<z.ZodDate, Date, unknown>;
    status_code: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    method: string;
    timestamp: Date;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}, {
    path: string;
    method: string;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
    timestamp?: unknown;
}>;
type ApiLogApp = z.infer<typeof apiLogAppSchema>;
type HApiLog = ApiLogApp;

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
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: string;
    updated_at: string;
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
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: string;
    updated_at: string;
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
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
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
    type: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
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
    type: string | null;
    created_by: string | null;
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
    type: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
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
    type: string | null;
    created_by: string | null;
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

declare const SUPPORTED_LOCALES: readonly ["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"];
type SupportedLocales = typeof SUPPORTED_LOCALES[number];
declare const supportedLocalesSchema: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
type SupportedLocalesFromSchema = z.infer<typeof supportedLocalesSchema>;

export { API_LOG_COLLECTION, Address, ApiKey, ApiKeys, ApiLogApp, BOOKING_COLLECTION, BankingDetails, BookingApiRequest, BookingApiResponse, BookingApp, BookingConfirmation, BookingDefaults, BookingStatus, COUNTRY_COLLECTION, CURRENCY_COLLECTION, CommunicationChannel, CommunicationChannelType, CommunicationOptions, CountryApp, CoversionRate, CurrencyApp, ESIMApp, ESIM_COLLECTION, FinancialPropertiesApp, HApiLog, HBooking, HBookingConfirmation, HBookingDefaults, HCountry, HCurrency, HESIM, HFinancialProperties, HHubbyModel, HMessage, HPackage, HPackagePrice, HPackageStrategy, HPartner, HPayment, HPlatformSettings, HPriceList, HPromoCode, HSchedule, HScheduleFilter, HSentMessages, HUser, HVisualIdentity, HVisualIdentityBanner, HVisualIdentityBannerStrategy, HubbyModelApp, MESSAGE_COLLECTION, MessageApp, PACKAGE_COLLECTION, PARTNER_COLLECTION, PAYMENT_COLLECTION, PRICE_LIST_COLLECTION, PROFILE_COLLECTION, PROMO_CODE_COLLECTION, PackageApp, PackagePriceApp, PackageSpecification, PackageSpecifications, PackageStrategy, PartnerApiRequest, PartnerApiResponse, PartnerApp, PartnerPricingStrategyApp, PaymentApp, PlatformSettings, PriceListApp, PromoCodeApiResponse, PromoCodeApp, Registration, SUPPORTED_LOCALES, Schedule, ScheduleFilter, SentMessagesApp, SupportedLocales, SupportedLocalesFromSchema, USER_COLLECTION, UserApp, UserPricingStrategyApp, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerStrategy, addressSchema, apiKeySchema, apiKeysSchema, apiLogAppSchema, apiLogRefString, apiLogRefStringArray, apiLogRefStringArrayNullable, apiLogRefStringNullable, bankingDetailsSchema, baseModelAppSchema, bookingApiRequestSchema, bookingApiResponseSchema, bookingAppSchema, bookingConfirmationSchema, bookingDefaultsSchema, bookingRefString, bookingRefStringArray, bookingRefStringArrayNullable, bookingRefStringNullable, bookingStatusSchema, commonBookingFields, commonCurrencyFields, commonESIMFields, commonFinancialPropertiesFields, commonPackageFields, commonPackagePriceFields, commonPartnerFields, commonPricingStrategyFields, commonUserFields, communicationChannelSchema, communicationOptionsSchema, conversionRateSchema, convertToDate, countryAppSchema, countryRefString, countryRefStringArray, countryRefStringArrayNullable, countryRefStringNullable, createIdSchema, currencyAppSchema, currencyRefString, currencyRefStringArray, currencyRefStringArrayNullable, currencyRefStringNullable, esimAppSchema, esimRefString, esimRefStringArray, esimRefStringArrayNullable, esimRefStringNullable, financialPropertiesAppSchema, freeEsimSchema, hubbyModelAppSchema, isDate, messageAppSchema, messageRefString, messageRefStringArray, messageRefStringArrayNullable, messageRefStringNullable, packageAppSchema, packagePriceAppSchema, packageRefString, packageRefStringArray, packageRefStringArrayNullable, packageRefStringNullable, packageSpecificationSchema, packageSpecificationsSchema, packageStrategySchema, partnerApiRequestSchema, partnerApiResponseSchema, partnerAppSchema, partnerPricingStrategyAppSchema, partnerRefString, partnerRefStringArray, partnerRefStringArrayNullable, partnerRefStringNullable, paymentAppSchema, paymentRefString, paymentRefStringArray, paymentRefStringArrayNullable, paymentRefStringNullable, platformSettingsSchema, priceListAppSchema, priceListRefString, priceListRefStringArray, priceListRefStringArrayNullable, priceListRefStringNullable, profileRefString, profileRefStringArray, profileRefStringArrayNullable, profileRefStringNullable, promoCodeApiResponseSchema, promoCodeAppSchema, promoCodeRefString, promoCodeRefStringArray, promoCodeRefStringArrayNullable, promoCodeRefStringNullable, registrationSchema, scheduleFilterSchema, scheduleSchema, sentMessagesAppSchema, supportedLocalesSchema, testEnv, userAppSchema, userPricingStrategyAppSchema, userRefString, userRefStringArray, userRefStringArrayNullable, userRefStringNullable, visualIdentityBannerSchema, visualIdentityBannerStrategySchema, visualIdentitySchema, zDateString };
