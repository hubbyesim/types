import * as zod from 'zod';
import { z } from 'zod';
import { Firestore, Timestamp, DocumentReference } from 'firebase-admin/firestore';

declare const userSchemaSpec: {
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    referral: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    platform: z.ZodOptional<z.ZodNullable<z.ZodEnum<["ios", "android"]>>>;
    platform_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    device_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    app_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parameters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    locale: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_os: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_os_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ios: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    has_card_saved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    admin: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    api_keys: {
        _type: "object";
        of: {
            allowed_keys: {
                _type: "array";
                nullable: boolean;
                optional: boolean;
                of: z.ZodString;
            };
            keys: {
                _type: "record";
                of: {
                    _type: "object";
                    of: {
                        expires_at: {
                            _type: "timestamp";
                        };
                        secret: z.ZodString;
                        is_active: z.ZodBoolean;
                    };
                };
            };
        };
        nullable: boolean;
        optional: boolean;
    };
    profileRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    receipt_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodEnum<["direct", "promo", "platform"]>>>;
    role: {
        _type: "docRef";
        collection: string;
        optional: boolean;
        nullable: boolean;
    };
    permissions: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        optional: boolean;
        nullable: boolean;
    };
    balance: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: {
        _type: "timestamp";
    };
    partner: {
        _type: "docRef";
        collection: string;
        optional: boolean;
        nullable: boolean;
    };
    review_requested: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    last_seen: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updated_by: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    push_to_start_token: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
};

declare const bookingSchemaSpec: {
    id: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    full_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pax: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    flight_number: z.ZodOptional<z.ZodString>;
    departure_location: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    status: z.ZodNullable<z.ZodOptional<z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>>>;
    data: {
        _type: "object";
        of: {
            source: z.ZodString;
            manual: z.ZodBoolean;
            action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        };
        nullable: boolean;
        optional: boolean;
    };
    communication_options: {
        _type: "object";
        of: {
            should_send_message: z.ZodBoolean;
            channels: {
                _type: "array";
                of: z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>;
            };
        };
    };
    is_processed_for_esim_restoration: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    is_pseudonymized: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodArray<z.ZodObject<{
        destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
        iso3: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        bundle_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>, "many">;
    departure_date: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    return_date: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
    };
    financial_insights: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        partner_commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        total_commission_amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }>>>;
    promo_codes: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        nullable: boolean;
        optional: boolean;
    };
    users: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        nullable: boolean;
        optional: boolean;
    };
    esims: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        nullable: boolean;
        optional: boolean;
    };
    hubby_foreign_identifiers: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        messaging_contact_id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        messaging_contact_id: string | null;
    }, {
        messaging_contact_id: string | null;
    }>>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodString>>;
};

declare const countrySchemaSpec: {
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
    i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
    is_region: z.ZodNullable<z.ZodBoolean>;
    countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    tier: z.ZodNullable<z.ZodNumber>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const currencySchemaSpec: {
    id: z.ZodString;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
};

declare const esimSchemaSpec: {
    id: z.ZodString;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    imsi: z.ZodNumber;
    qr: z.ZodString;
    iccid: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_data: z.ZodNumber;
    data_left: z.ZodNumber;
    uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    data_used: z.ZodBoolean;
    status: z.ZodNullable<z.ZodString>;
    status_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        telna_esim_status: z.ZodNumber;
        source: z.ZodString;
        status: z.ZodString;
        timestamp: z.ZodType<Date>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }, {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }>, "many">>>;
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
    country: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    destination: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    time_assigned: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    last_updated: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
};

declare const paymentSchemaSpec: {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    source: z.ZodEnum<["app", "webapp", "platform"]>;
    invoice: z.ZodOptional<z.ZodString>;
    fee: z.ZodOptional<z.ZodNumber>;
    topup: z.ZodBoolean;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "completed", "failed"]>>;
    payment_intent_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    error_message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodOptional<z.ZodArray<z.ZodObject<{
        package_type: z.ZodOptional<z.ZodString>;
        package_size: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        destination: z.ZodOptional<z.ZodString>;
        iso3: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }, {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }>, "many">>;
    user: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    app_payment_properties: z.ZodOptional<z.ZodObject<{
        package: z.ZodOptional<z.ZodString>;
        promo: z.ZodOptional<z.ZodString>;
        iccid: z.ZodOptional<z.ZodString>;
        global: z.ZodOptional<z.ZodString>;
        balance_used: z.ZodOptional<z.ZodNumber>;
        booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_amount: z.ZodOptional<z.ZodString>;
        is_special_offer: z.ZodOptional<z.ZodBoolean>;
        special_offer_discount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    }, {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    }>>;
    webapp_platform_payment_properties: z.ZodOptional<z.ZodObject<{
        promo_codes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        booking_id: z.ZodOptional<z.ZodString>;
        partner: z.ZodOptional<z.ZodString>;
        purchaseType: z.ZodOptional<z.ZodString>;
        affiliateId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        partner_name: z.ZodOptional<z.ZodString>;
        locale: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    }, {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    }>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const analyticsSpec: {
    service: z.ZodString;
    date: z.ZodString;
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    event: z.ZodString;
    parameter: z.ZodNullable<z.ZodString>;
    sum: z.ZodNumber;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const messageSchemaSpec: {
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
};

declare const packageSchemaSpec: {
    external_id: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    bytes: z.ZodNumber;
    hidden: z.ZodBoolean;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    traffic_policy: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    price: z.ZodNumber;
    partner_price: z.ZodNumber;
    days: z.ZodNumber;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imsi: number;
    }, {
        imsi: number;
    }>>;
    country: {
        _type: "docRef";
        collection: string;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    country_data: {
        _type: "object";
        of: {
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
            i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
            is_region: z.ZodNullable<z.ZodBoolean>;
            countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
            tier: z.ZodNullable<z.ZodNumber>;
            id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            created_at: {
                _type: "timestamp";
                nullable: boolean;
                optional: boolean;
            };
            updated_at: {
                _type: "timestamp";
                nullable: boolean;
                optional: boolean;
            };
            created_by: {
                _type: "docRef";
                collection: string;
                nullable: boolean;
                optional: boolean;
            };
            updated_by: {
                _type: "docRef";
                collection: string;
                nullable: boolean;
                optional: boolean;
            };
        };
        nullable: boolean;
        optional: boolean;
    };
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const promoCodeSchemaSpec: {
    id: z.ZodString;
    redeemed_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    external_id: z.ZodString;
    code: z.ZodString;
    claimed_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    allowance_user: z.ZodNumber;
    allowance_total: z.ZodNumber;
    type: z.ZodUnion<[z.ZodNullable<z.ZodEnum<["discount", "booking", "booking_without_destination"]>>, z.ZodString]>;
    usage: z.ZodArray<z.ZodString, "many">;
    uuid_usage: z.ZodArray<z.ZodString, "many">;
    package_specification: z.ZodOptional<z.ZodObject<{
        destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
        iso3: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        bundle_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>>;
    valid_from: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    valid_to: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    package: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    country: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    booking: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    discount: z.ZodOptional<z.ZodNumber>;
    package_size: z.ZodOptional<z.ZodString>;
    countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    max_bytes: z.ZodOptional<z.ZodNumber>;
    starter_data: z.ZodOptional<z.ZodNumber>;
};

declare const partnerSchemaSpec: {
    id: z.ZodString;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: {
        _type: "object";
        of: {
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            email: z.ZodNullable<z.ZodString>;
            office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        };
        nullable: boolean;
    };
    address: {
        _type: "object";
        of: {
            street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        };
        nullable: boolean;
    };
    registration: {
        _type: "object";
        of: {
            chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        };
        nullable: boolean;
    };
    banking_details: {
        _type: "object";
        of: {
            account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        };
        nullable: boolean;
    };
    parent: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    users: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        nullable: boolean;
    };
    financial_properties: {
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: {
            _type: "timestamp";
            nullable: boolean;
            optional: boolean;
        };
        last_invoice: {
            _type: "timestamp";
            nullable: boolean;
            optional: boolean;
        };
        pricing_strategies: {
            _type: "object";
            of: {
                partner: {
                    _type: "object";
                    of: {
                        strategy: z.ZodEnum<["split", "bundle"]>;
                        modification_percentage: z.ZodNumber;
                        default_price_list: {
                            _type: "docRef";
                            collection: string;
                            nullable: boolean;
                        };
                        custom_prices: {
                            _type: "array";
                            of: {
                                _type: "object";
                                of: {
                                    destination: z.ZodString;
                                    label: z.ZodString;
                                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                                    price: z.ZodNumber;
                                    package: {
                                        _type: "docRef";
                                        collection: string;
                                    };
                                };
                            };
                        };
                    };
                    optional: boolean;
                };
                user: {
                    _type: "object";
                    of: {
                        lifetime_discount_percentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                        modification_percentage: z.ZodNumber;
                        default_price_list: {
                            _type: "docRef";
                            collection: string;
                            nullable: boolean;
                        };
                        custom_prices: {
                            _type: "array";
                            of: {
                                _type: "object";
                                of: {
                                    destination: z.ZodString;
                                    label: z.ZodString;
                                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                                    price: z.ZodNumber;
                                    package: {
                                        _type: "docRef";
                                        collection: string;
                                    };
                                };
                            };
                        };
                    };
                    optional: boolean;
                };
            };
            nullable: boolean;
        };
    };
    visual_identity: {
        _type: "object";
        of: any;
        nullable: boolean;
    };
    platform_settings: {
        package_strategy: {
            _type: "object";
            of: {
                name: z.ZodString;
                iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                parameters: z.ZodAny;
            };
            nullable: boolean;
            optional: boolean;
        };
        free_esim: {
            _type: "object";
            of: {
                enabled: z.ZodBoolean;
                package_specification: z.ZodObject<{
                    size: z.ZodString;
                    package_type: z.ZodString;
                    destination: z.ZodString;
                    package_duration: z.ZodNumber;
                    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    destination: string;
                    size: string;
                    package_duration: number;
                    package_type: string;
                    type?: string | null | undefined;
                }, {
                    destination: string;
                    size: string;
                    package_duration: number;
                    package_type: string;
                    type?: string | null | undefined;
                }>;
                booking_id_verification: z.ZodDefault<z.ZodBoolean>;
                booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                allowance: z.ZodNumber;
                total_allowance: z.ZodNumber;
            };
            nullable: boolean;
            optional: boolean;
        };
        booking_defaults: {
            _type: "object";
            of: {
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
            };
            nullable: boolean;
            optional: boolean;
        };
        booking_confirmation: {
            _type: "object";
            of: {
                brevo_template_id: z.ZodNumber;
                send_booking_confirmation: z.ZodBoolean;
            };
            nullable: boolean;
            optional: boolean;
        };
        schedules: {
            _type: "array";
            of: {
                _type: "object";
                of: {
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
                    moment: z.ZodEnum<["departure_date", "return_date", "immediate"]>;
                    filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
                    }>>>;
                };
            };
            optional: boolean;
        };
        agent_signup_settings: {
            _type: "object";
            of: {
                slack_channel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                welcome_email_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                password_reset_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                partner_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
                enable_complimentary_booking: z.ZodDefault<z.ZodBoolean>;
                complimentary_booking_partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                is_sales_agent: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
                visual_identity_options: z.ZodDefault<z.ZodObject<{
                    hubby_branding: z.ZodDefault<z.ZodBoolean>;
                    source_partner_branding: z.ZodDefault<z.ZodBoolean>;
                    own_branding: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    hubby_branding: boolean;
                    source_partner_branding: boolean;
                    own_branding: boolean;
                }, {
                    hubby_branding?: boolean | undefined;
                    source_partner_branding?: boolean | undefined;
                    own_branding?: boolean | undefined;
                }>>;
            };
            nullable: boolean;
            optional: boolean;
        };
        brevo: {
            _type: "object";
            of: {
                list_ids: z.ZodArray<z.ZodNumber, "many">;
                campaign_mode: z.ZodBoolean;
            };
            nullable: boolean;
            optional: boolean;
        };
        upgrade_offer: {
            _type: "object";
            of: {
                enabled: z.ZodBoolean;
                discount_percentage: z.ZodNumber;
            };
            nullable: boolean;
            optional: boolean;
        };
        emit_events: {
            _type: "object";
            of: {
                topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            };
            nullable: boolean;
            optional: boolean;
        };
        visual_identity_options: {
            _type: "object";
            of: {
                hubby_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                source_partner_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                own_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            };
            nullable: boolean;
            optional: boolean;
        };
        account_manager: {
            _type: "docRef";
            collection: string;
            nullable: boolean;
            optional: boolean;
        };
        sales_partner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        external_sales_partner_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    };
    tags: {
        _type: "array";
        of: {
            slug: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            created_at: {
                _type: "timestamp";
                nullable: boolean;
                optional: boolean;
            };
            updated_at: {
                _type: "timestamp";
                nullable: boolean;
                optional: boolean;
            };
            created_by: {
                _type: "docRef";
                collection: string;
                nullable: boolean;
                optional: boolean;
            };
            updated_by: {
                _type: "docRef";
                collection: string;
                nullable: boolean;
                optional: boolean;
            };
        };
        nullable: boolean;
        optional: boolean;
    };
    tag_slugs: {
        _type: "array";
        of: z.ZodString;
        nullable: boolean;
        optional: boolean;
    };
    tag_references: {
        _type: "array";
        of: {
            _type: "docRef";
            collection: string;
        };
        nullable: boolean;
        optional: boolean;
    };
    data: {
        _type: "object";
        of: {
            source: z.ZodString;
            manual: z.ZodBoolean;
        };
        nullable: boolean;
        optional: boolean;
    };
    webhook_settings: {
        _type: "object";
        of: {
            url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            api_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            events: z.ZodDefault<z.ZodObject<{
                promocode_redemption: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                promocode_redemption: boolean;
            }, {
                promocode_redemption?: boolean | undefined;
            }>>;
        };
        nullable: boolean;
        optional: boolean;
    };
};
declare const priceListSchemaSpec: {
    id: z.ZodString;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["partner", "consumer"]>;
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    price_list: {
        _type: "array";
        of: {
            destination: z.ZodString;
            label: z.ZodString;
            type: z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>;
            price: z.ZodNumber;
            package: {
                _type: "docRef";
                collection: string;
            };
        };
        optional: boolean;
    };
    package_prices: {
        _type: "array";
        of: {
            destination: z.ZodString;
            label: z.ZodString;
            type: z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>;
            price: z.ZodNumber;
            package: {
                _type: "docRef";
                collection: string;
            };
        };
    };
};

declare const SUPPORTED_LOCALES$1: readonly ["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"];

declare const apiLogSchemaSpec: {
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: {
        _type: "record";
        of: z.ZodUnknown;
        optional: boolean;
    };
    timestamp: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    status_code: z.ZodNumber;
};

declare const userTouchpointsSchemaSpec: {
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    unique_device_identifier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    user: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    booking: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    promo_code: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    promo_code_redeemed_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    esim_assigned_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    esim_install_initiated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    esim_install_completed_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    esim_first_package_activated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    esim_topped_up_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    activation_initiated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    topup_initiated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    topup_checkout_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const reviewSchemaSpec: {
    id: z.ZodOptional<z.ZodString>;
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    questions: z.ZodRecord<z.ZodString, z.ZodAny>;
    reward_strategy: z.ZodObject<{
        base_reward: z.ZodObject<{
            package_size: z.ZodString;
            package_type: z.ZodEnum<["data-limited", "starter"]>;
        }, "strip", z.ZodTypeAny, {
            package_type: "data-limited" | "starter";
            package_size: string;
        }, {
            package_type: "data-limited" | "starter";
            package_size: string;
        }>;
        multipliers: z.ZodOptional<z.ZodObject<{
            quality_based: z.ZodOptional<z.ZodNumber>;
            completion_based: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        }, {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    }, {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    }>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};
declare const reviewSubmissionSchemaSpec: {
    id: z.ZodOptional<z.ZodString>;
    country: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    review: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    user: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    questions: z.ZodRecord<z.ZodString, z.ZodAny>;
    iccid: z.ZodString;
    isAndroid: z.ZodBoolean;
    country_id: z.ZodString;
    partner_id: z.ZodString;
    review_id: z.ZodString;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    analysis: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
};

declare const destinationSchemaSpec: {
    id: z.ZodString;
    type: z.ZodString;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    iso3s: z.ZodArray<z.ZodString, "many">;
    name: z.ZodString;
    i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
    is_active: z.ZodBoolean;
    sort_order: z.ZodNumber;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
};
declare const destinationBundleSchemaSpec: {
    id: z.ZodString;
    parent_document_id: z.ZodString;
    type: z.ZodEnum<["unlimited", "data-limited", "time-limited", "starter"]>;
    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    provider: z.ZodEnum<["telna", "bondio"]>;
    duration_in_days: z.ZodNumber;
    duration_in_seconds: z.ZodNumber;
    size_in_bytes: z.ZodNumber;
    size_in_megabytes: z.ZodNumber;
    size_in_gigabytes: z.ZodNumber;
    package_template: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    partner: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    traffic_policy: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
    };
    throttling: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    b2c_price: z.ZodNumber;
    b2b_price: z.ZodNumber;
    partner_b2c_price: {
        _type: "record";
        of: z.ZodNumber;
        nullable: boolean;
        optional: boolean;
    };
    partner_b2b_price: {
        _type: "record";
        of: z.ZodNumber;
        nullable: boolean;
        optional: boolean;
    };
    is_active: z.ZodDefault<z.ZodBoolean>;
    is_visible: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    deleted_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    deleted_by: z.ZodNullable<z.ZodString>;
};

declare const packageTemplateSchemaSpec: {
    id: z.ZodString;
    provider: z.ZodString;
    type: z.ZodString;
    purchase_price: z.ZodNumber;
    external_id: z.ZodString;
    supported_countries: z.ZodArray<z.ZodString, "many">;
    provider_specific_data: {
        _type: "record";
        of: z.ZodAny;
        nullable: boolean;
        optional: boolean;
    };
    size_in_gigabytes: z.ZodNumber;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
};

declare const loginRequestSchemaSpec: {
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodString;
    status: z.ZodEnum<["pending", "completed", "expired"]>;
    user: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    expires_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
};

declare const tagSchemaSpec: {
    slug: zod.ZodString;
    name: zod.ZodString;
    description: zod.ZodOptional<zod.ZodNullable<zod.ZodString>>;
    color: zod.ZodOptional<zod.ZodNullable<zod.ZodString>>;
    type: zod.ZodOptional<zod.ZodNullable<zod.ZodString>>;
    id: zod.ZodOptional<zod.ZodNullable<zod.ZodString>>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
    updated_by: {
        _type: "docRef";
        collection: string;
        nullable: boolean;
        optional: boolean;
    };
};

declare const liveActivityStatusSchema: z.ZodEnum<["created", "active", "ended", "dismissed", "failed"]>;
declare const liveActivityEventSchema: z.ZodEnum<["start", "update", "end"]>;
declare const liveActivityReasonSchema: z.ZodEnum<["expired", "data_exhausted", "no_packages", "manual", "recreated"]>;
declare const lastUpdateSchema: z.ZodOptional<z.ZodNullable<z.ZodObject<{
    event: z.ZodEnum<["start", "update", "end"]>;
    totalDataGb: z.ZodOptional<z.ZodNumber>;
    dataLeftGb: z.ZodOptional<z.ZodNumber>;
    apnsId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    statusCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    reason: z.ZodOptional<z.ZodEnum<["expired", "data_exhausted", "no_packages", "manual", "recreated"]>>;
}, "strip", z.ZodTypeAny, {
    event: "start" | "update" | "end";
    totalDataGb?: number | undefined;
    dataLeftGb?: number | undefined;
    apnsId?: string | null | undefined;
    statusCode?: number | null | undefined;
    reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
}, {
    event: "start" | "update" | "end";
    totalDataGb?: number | undefined;
    dataLeftGb?: number | undefined;
    apnsId?: string | null | undefined;
    statusCode?: number | null | undefined;
    reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
}>>>;
declare const liveActivitySchemaSpec: {
    id: z.ZodString;
    esim_id: z.ZodString;
    title: z.ZodString;
    message: z.ZodString;
    total_data_gb: z.ZodNullable<z.ZodString>;
    data_left_gb: z.ZodNullable<z.ZodString>;
    user_id: z.ZodString;
    push_to_start_token: z.ZodString;
    push_to_update_token: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["created", "active", "ended", "dismissed", "failed"]>;
    last_update_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    last_update: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        event: z.ZodEnum<["start", "update", "end"]>;
        totalDataGb: z.ZodOptional<z.ZodNumber>;
        dataLeftGb: z.ZodOptional<z.ZodNumber>;
        apnsId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        statusCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        reason: z.ZodOptional<z.ZodEnum<["expired", "data_exhausted", "no_packages", "manual", "recreated"]>>;
    }, "strip", z.ZodTypeAny, {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    }, {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    }>>>;
    ended_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    started_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    dismissed_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    recreated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    recreation_count: z.ZodDefault<z.ZodNumber>;
    click_count: z.ZodDefault<z.ZodNumber>;
    click_timestamps: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodDate, Date, unknown>, "many">>;
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
};

declare const jobStatusSchema: z.ZodEnum<["pending", "completed", "failed"]>;
declare const scheduledJobSchemaSpec: {
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    job_type: z.ZodString;
    execute_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    status: z.ZodEnum<["pending", "completed", "failed"]>;
    task_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    retry_count: z.ZodNumber;
    max_retries: z.ZodNumber;
    error: z.ZodNullable<z.ZodString>;
    scheduled_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    last_retry_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    updated_at: {
        _type: "timestamp";
        nullable: boolean;
        optional: boolean;
    };
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
};

/** ZOD SCHEMAS */
declare const HUserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    stripe_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    referral: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fcm: z.ZodOptional<z.ZodString>;
    deeplink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    platform: z.ZodOptional<z.ZodNullable<z.ZodEnum<["ios", "android"]>>>;
    platform_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    device_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    app_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parameters: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    locale: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_os: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone_os_version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ios: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    has_card_saved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    admin: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    api_keys: z.ZodObject<{
        allowed_keys: z.ZodArray<z.ZodString, "many">;
        keys: z.ZodRecord<z.ZodString, z.ZodObject<{
            expires_at: z.ZodEffects<z.ZodDate, Date, Date>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    }>;
    profileRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    receipt_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodEnum<["direct", "promo", "platform"]>>>;
    role: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    balance: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    review_requested: z.ZodEffects<z.ZodDate, Date, Date>;
    last_seen: z.ZodEffects<z.ZodDate, Date, Date>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updated_by: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    push_to_start_token: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string | null;
    email: string | null;
    api_keys: {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    };
    role: string;
    permissions: string[];
    createdAt: Date;
    partner: string;
    review_requested: Date;
    last_seen: Date;
    created_at: Date;
    updated_at: Date;
    id?: string | null | undefined;
    stripe_id?: string | null | undefined;
    referral?: string | null | undefined;
    fcm?: string | undefined;
    deeplink?: string | null | undefined;
    gender?: string | null | undefined;
    company?: string | null | undefined;
    coordinates?: string | null | undefined;
    ios?: boolean | null | undefined;
    platform?: "ios" | "android" | null | undefined;
    platform_version?: string | null | undefined;
    device_type?: string | null | undefined;
    app_version?: string | null | undefined;
    parameters?: any;
    locale?: string | null | undefined;
    phone_model?: string | null | undefined;
    phone_os?: string | null | undefined;
    phone_os_version?: string | null | undefined;
    has_card_saved?: boolean | null | undefined;
    admin?: boolean | null | undefined;
    profileRef?: string | null | undefined;
    currency?: string | null | undefined;
    receipt_email?: string | null | undefined;
    source?: "platform" | "direct" | "promo" | null | undefined;
    balance?: number | null | undefined;
    created_by?: string | null | undefined;
    updated_by?: string | null | undefined;
    push_to_start_token?: string | null | undefined;
    custom_branding?: any;
}, {
    name: string | null;
    email: string | null;
    api_keys: {
        keys: Record<string, {
            expires_at: Date;
            secret: string;
            is_active: boolean;
        }>;
        allowed_keys: string[];
    };
    role: string;
    permissions: string[];
    createdAt: Date;
    partner: string;
    review_requested: Date;
    last_seen: Date;
    created_at: Date;
    updated_at: Date;
    id?: string | null | undefined;
    stripe_id?: string | null | undefined;
    referral?: string | null | undefined;
    fcm?: string | undefined;
    deeplink?: string | null | undefined;
    gender?: string | null | undefined;
    company?: string | null | undefined;
    coordinates?: string | null | undefined;
    ios?: boolean | null | undefined;
    platform?: "ios" | "android" | null | undefined;
    platform_version?: string | null | undefined;
    device_type?: string | null | undefined;
    app_version?: string | null | undefined;
    parameters?: any;
    locale?: string | null | undefined;
    phone_model?: string | null | undefined;
    phone_os?: string | null | undefined;
    phone_os_version?: string | null | undefined;
    has_card_saved?: boolean | null | undefined;
    admin?: boolean | null | undefined;
    profileRef?: string | null | undefined;
    currency?: string | null | undefined;
    receipt_email?: string | null | undefined;
    source?: "platform" | "direct" | "promo" | null | undefined;
    balance?: number | null | undefined;
    created_by?: string | null | undefined;
    updated_by?: string | null | undefined;
    push_to_start_token?: string | null | undefined;
    custom_branding?: any;
}>;
declare const HBookingSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    full_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pax: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    flight_number: z.ZodOptional<z.ZodString>;
    departure_location: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    status: z.ZodNullable<z.ZodOptional<z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>>>;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
        action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    }, {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    }>;
    communication_options: z.ZodObject<{
        should_send_message: z.ZodBoolean;
        channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }>;
    is_processed_for_esim_restoration: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    is_pseudonymized: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodArray<z.ZodObject<{
        destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
        iso3: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        bundle_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>, "many">;
    departure_date: z.ZodEffects<z.ZodDate, Date, Date>;
    return_date: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    financial_insights: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        partner_commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        total_commission_amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }>>>;
    promo_codes: z.ZodArray<z.ZodString, "many">;
    users: z.ZodArray<z.ZodString, "many">;
    esims: z.ZodArray<z.ZodString, "many">;
    hubby_foreign_identifiers: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        messaging_contact_id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        messaging_contact_id: string | null;
    }, {
        messaging_contact_id: string | null;
    }>>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    package_specifications: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }[];
    departure_date: Date;
    return_date: Date;
    promo_codes: string[];
    users: string[];
    esims: string[];
    id?: string | undefined;
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    custom_branding?: string | null | undefined;
    status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED" | null | undefined;
    external_id?: string | null | undefined;
    title?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | undefined;
    departure_location?: string | undefined;
    brand?: string | null | undefined;
    sent_messages?: Record<string, any> | undefined;
    is_processed_for_esim_restoration?: boolean | null | undefined;
    is_pseudonymized?: boolean | null | undefined;
    import_id?: string | null | undefined;
    financial_insights?: {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    } | null | undefined;
    hubby_foreign_identifiers?: {
        messaging_contact_id: string | null;
    } | null | undefined;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    package_specifications: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }[];
    departure_date: Date;
    return_date: Date;
    promo_codes: string[];
    users: string[];
    esims: string[];
    id?: string | undefined;
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    custom_branding?: string | null | undefined;
    status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED" | null | undefined;
    external_id?: string | null | undefined;
    title?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | undefined;
    departure_location?: string | undefined;
    brand?: string | null | undefined;
    sent_messages?: Record<string, any> | undefined;
    is_processed_for_esim_restoration?: boolean | null | undefined;
    is_pseudonymized?: boolean | null | undefined;
    import_id?: string | null | undefined;
    financial_insights?: {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    } | null | undefined;
    hubby_foreign_identifiers?: {
        messaging_contact_id: string | null;
    } | null | undefined;
}>;
declare const HCountrySchema: z.ZodObject<{
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
    i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
    is_region: z.ZodNullable<z.ZodBoolean>;
    countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    tier: z.ZodNullable<z.ZodNumber>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
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
    i18n_name: Record<string, string>;
    is_region: boolean | null;
    countries: string[] | null;
    tier: number | null;
    id?: string | null | undefined;
}, {
    name: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
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
    i18n_name: Record<string, string>;
    is_region: boolean | null;
    countries: string[] | null;
    tier: number | null;
    id?: string | null | undefined;
}>;
declare const HCurrencySchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    symbol: string;
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    code: string;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    code: string;
    rate: number;
    is_default: boolean;
}>;
declare const HESIMSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    imsi: z.ZodNumber;
    qr: z.ZodString;
    iccid: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_data: z.ZodNumber;
    data_left: z.ZodNumber;
    uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    data_used: z.ZodBoolean;
    status: z.ZodNullable<z.ZodString>;
    status_history: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        telna_esim_status: z.ZodNumber;
        source: z.ZodString;
        status: z.ZodString;
        timestamp: z.ZodType<Date>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }, {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }>, "many">>>;
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
    country: z.ZodString;
    destination: z.ZodString;
    partner: z.ZodString;
    time_assigned: z.ZodEffects<z.ZodDate, Date, Date>;
    last_updated: z.ZodEffects<z.ZodDate, Date, Date>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    promo: string | null;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "promo" | "balance" | "code" | "api" | "external" | "payment";
    status: string | null;
    destination: string;
    apn: string | null;
    imsi: number;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number;
    data_left: number;
    data_used: boolean;
    android_auto: boolean;
    partner_price: number | null;
    payment: string | null;
    is_auto_install: boolean;
    is_archived: boolean;
    user: string | null;
    country: string;
    time_assigned: Date;
    last_updated: Date;
    custom_branding?: any;
    coverage_label?: string | null | undefined;
    uuid?: string | null | undefined;
    status_history?: {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }[] | null | undefined;
}, {
    id: string;
    name: string;
    promo: string | null;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "promo" | "balance" | "code" | "api" | "external" | "payment";
    status: string | null;
    destination: string;
    apn: string | null;
    imsi: number;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number;
    data_left: number;
    data_used: boolean;
    android_auto: boolean;
    partner_price: number | null;
    payment: string | null;
    is_auto_install: boolean;
    is_archived: boolean;
    user: string | null;
    country: string;
    time_assigned: Date;
    last_updated: Date;
    custom_branding?: any;
    coverage_label?: string | null | undefined;
    uuid?: string | null | undefined;
    status_history?: {
        timestamp: Date;
        source: string;
        status: string;
        telna_esim_status: number;
    }[] | null | undefined;
}>;
declare const HPaymentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodEffects<z.ZodDate, Date, Date>;
    source: z.ZodEnum<["app", "webapp", "platform"]>;
    invoice: z.ZodOptional<z.ZodString>;
    fee: z.ZodOptional<z.ZodNumber>;
    topup: z.ZodBoolean;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "completed", "failed"]>>;
    payment_intent_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    error_message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodOptional<z.ZodArray<z.ZodObject<{
        package_type: z.ZodOptional<z.ZodString>;
        package_size: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        destination: z.ZodOptional<z.ZodString>;
        iso3: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }, {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }>, "many">>;
    user: z.ZodString;
    partner: z.ZodString;
    app_payment_properties: z.ZodOptional<z.ZodObject<{
        package: z.ZodOptional<z.ZodString>;
        promo: z.ZodOptional<z.ZodString>;
        iccid: z.ZodOptional<z.ZodString>;
        global: z.ZodOptional<z.ZodString>;
        balance_used: z.ZodOptional<z.ZodNumber>;
        booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_amount: z.ZodOptional<z.ZodString>;
        is_special_offer: z.ZodOptional<z.ZodBoolean>;
        special_offer_discount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    }, {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    }>>;
    webapp_platform_payment_properties: z.ZodOptional<z.ZodObject<{
        promo_codes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        booking_id: z.ZodOptional<z.ZodString>;
        partner: z.ZodOptional<z.ZodString>;
        purchaseType: z.ZodOptional<z.ZodString>;
        affiliateId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        partner_name: z.ZodOptional<z.ZodString>;
        locale: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    }, {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    }>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    source: "platform" | "app" | "webapp";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    date: Date;
    user: string;
    amount: number;
    customer: string;
    topup: boolean;
    id?: string | null | undefined;
    custom_branding?: any;
    status?: "pending" | "processing" | "completed" | "failed" | undefined;
    package_specifications?: {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }[] | undefined;
    invoice?: string | undefined;
    fee?: number | undefined;
    payment_intent_id?: string | null | undefined;
    error_message?: string | null | undefined;
    app_payment_properties?: {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    } | undefined;
    webapp_platform_payment_properties?: {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    } | undefined;
}, {
    source: "platform" | "app" | "webapp";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    date: Date;
    user: string;
    amount: number;
    customer: string;
    topup: boolean;
    id?: string | null | undefined;
    custom_branding?: any;
    status?: "pending" | "processing" | "completed" | "failed" | undefined;
    package_specifications?: {
        destination?: string | undefined;
        iso3?: string | undefined;
        package_duration?: number | undefined;
        package_type?: string | undefined;
        package_size?: string | undefined;
    }[] | undefined;
    invoice?: string | undefined;
    fee?: number | undefined;
    payment_intent_id?: string | null | undefined;
    error_message?: string | null | undefined;
    app_payment_properties?: {
        promo?: string | undefined;
        booking_id?: string | null | undefined;
        iccid?: string | undefined;
        package?: string | undefined;
        global?: string | undefined;
        balance_used?: number | undefined;
        discount_amount?: string | undefined;
        is_special_offer?: boolean | undefined;
        special_offer_discount?: number | undefined;
    } | undefined;
    webapp_platform_payment_properties?: {
        locale?: string | undefined;
        partner?: string | undefined;
        booking_id?: string | undefined;
        promo_codes?: string[] | undefined;
        purchaseType?: string | undefined;
        affiliateId?: string | null | undefined;
        partner_name?: string | undefined;
    } | undefined;
}>;
declare const HMessageSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "failed" | "sent" | "delivered";
    key: string;
    method: "email" | "push" | "sms";
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "failed" | "sent" | "delivered";
    key: string;
    method: "email" | "push" | "sms";
}>;
declare const HPackageSchema: z.ZodObject<{
    external_id: z.ZodString;
    provider: z.ZodString;
    coverage_label: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    bytes: z.ZodNumber;
    hidden: z.ZodBoolean;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    traffic_policy: z.ZodString;
    price: z.ZodNumber;
    partner_price: z.ZodNumber;
    days: z.ZodNumber;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imsi: number;
    }, {
        imsi: number;
    }>>;
    country: z.ZodString;
    partner: z.ZodString;
    country_data: z.ZodObject<{
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
        i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
        is_region: z.ZodNullable<z.ZodBoolean>;
        countries: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        tier: z.ZodNullable<z.ZodNumber>;
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodEffects<z.ZodDate, Date, Date>;
        updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
        created_by: z.ZodString;
        updated_by: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string | null;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
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
        i18n_name: Record<string, string>;
        is_region: boolean | null;
        countries: string[] | null;
        tier: number | null;
        id?: string | null | undefined;
    }, {
        name: string | null;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
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
        i18n_name: Record<string, string>;
        is_region: boolean | null;
        countries: string[] | null;
        tier: number | null;
        id?: string | null | undefined;
    }>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    type: "data-limited" | "time-limited" | "starter" | "unlimited" | null;
    is_active: boolean;
    external_id: string;
    traffic_policy: string;
    price: number;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    country: string;
    label: string;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    country_data: {
        name: string | null;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
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
        i18n_name: Record<string, string>;
        is_region: boolean | null;
        countries: string[] | null;
        tier: number | null;
        id?: string | null | undefined;
    };
    id?: string | null | undefined;
    throttling?: number | undefined;
}, {
    name: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    type: "data-limited" | "time-limited" | "starter" | "unlimited" | null;
    is_active: boolean;
    external_id: string;
    traffic_policy: string;
    price: number;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    country: string;
    label: string;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    country_data: {
        name: string | null;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
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
        i18n_name: Record<string, string>;
        is_region: boolean | null;
        countries: string[] | null;
        tier: number | null;
        id?: string | null | undefined;
    };
    id?: string | null | undefined;
    throttling?: number | undefined;
}>;
declare const HPromoCodeSchema: z.ZodObject<{
    id: z.ZodString;
    redeemed_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    uuid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    external_id: z.ZodString;
    code: z.ZodString;
    claimed_at: z.ZodEffects<z.ZodDate, Date, Date>;
    allowance_user: z.ZodNumber;
    allowance_total: z.ZodNumber;
    type: z.ZodUnion<[z.ZodNullable<z.ZodEnum<["discount", "booking", "booking_without_destination"]>>, z.ZodString]>;
    usage: z.ZodArray<z.ZodString, "many">;
    uuid_usage: z.ZodArray<z.ZodString, "many">;
    package_specification: z.ZodOptional<z.ZodObject<{
        destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
        iso3: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        bundle_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>>;
    valid_from: z.ZodEffects<z.ZodDate, Date, Date>;
    valid_to: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    package: z.ZodString;
    country: z.ZodString;
    booking: z.ZodString;
    discount: z.ZodOptional<z.ZodNumber>;
    package_size: z.ZodOptional<z.ZodString>;
    countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    max_bytes: z.ZodOptional<z.ZodNumber>;
    starter_data: z.ZodOptional<z.ZodNumber>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    code: string;
    type: string | null;
    external_id: string;
    country: string;
    package: string;
    redeemed_at: Date;
    claimed_at: Date;
    allowance_user: number;
    allowance_total: number;
    booking: string;
    usage: string[];
    uuid_usage: string[];
    valid_from: Date;
    valid_to: Date;
    countries?: string[] | undefined;
    uuid?: string | null | undefined;
    package_size?: string | undefined;
    discount?: number | undefined;
    package_specification?: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    } | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    code: string;
    type: string | null;
    external_id: string;
    country: string;
    package: string;
    redeemed_at: Date;
    claimed_at: Date;
    allowance_user: number;
    allowance_total: number;
    booking: string;
    usage: string[];
    uuid_usage: string[];
    valid_from: Date;
    valid_to: Date;
    countries?: string[] | undefined;
    uuid?: string | null | undefined;
    package_size?: string | undefined;
    discount?: number | undefined;
    package_specification?: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    } | undefined;
    max_bytes?: number | undefined;
    starter_data?: number | undefined;
}>;
declare const HPartnerSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }>;
    address: z.ZodObject<{
        street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }>;
    registration: z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>;
    banking_details: z.ZodObject<{
        account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        last_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        pricing_strategies: z.ZodObject<{
            partner: z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }>;
            user: z.ZodObject<{
                lifetime_discount_percentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
        [x: string]: any;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    platform_settings: z.ZodObject<{
        package_strategy: z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }>;
        free_esim: z.ZodObject<{
            enabled: z.ZodBoolean;
            package_specification: z.ZodObject<{
                size: z.ZodString;
                package_type: z.ZodString;
                destination: z.ZodString;
                package_duration: z.ZodNumber;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }>;
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
            total_allowance: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>;
        booking_defaults: z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }>;
        booking_confirmation: z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>;
        schedules: z.ZodArray<z.ZodObject<{
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
            moment: z.ZodEnum<["departure_date", "return_date", "immediate"]>;
            filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
            }>>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }>, "many">;
        agent_signup_settings: z.ZodObject<{
            slack_channel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            welcome_email_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            password_reset_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            partner_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
            enable_complimentary_booking: z.ZodDefault<z.ZodBoolean>;
            complimentary_booking_partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_sales_agent: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
            visual_identity_options: z.ZodDefault<z.ZodObject<{
                hubby_branding: z.ZodDefault<z.ZodBoolean>;
                source_partner_branding: z.ZodDefault<z.ZodBoolean>;
                own_branding: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            }, {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            }>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        }, {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        }>;
        brevo: z.ZodObject<{
            list_ids: z.ZodArray<z.ZodNumber, "many">;
            campaign_mode: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            list_ids: number[];
            campaign_mode: boolean;
        }, {
            list_ids: number[];
            campaign_mode: boolean;
        }>;
        upgrade_offer: z.ZodObject<{
            enabled: z.ZodBoolean;
            discount_percentage: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enabled: boolean;
            discount_percentage: number;
        }, {
            enabled: boolean;
            discount_percentage: number;
        }>;
        emit_events: z.ZodObject<{
            topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        }, {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        }>;
        visual_identity_options: z.ZodObject<{
            hubby_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            source_partner_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            own_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        }, {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        }>;
        account_manager: z.ZodString;
        sales_partner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        external_sales_partner_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodEffects<z.ZodDate, Date, Date>;
        updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
        created_by: z.ZodString;
        updated_by: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
    tag_slugs: z.ZodArray<z.ZodString, "many">;
    tag_references: z.ZodArray<z.ZodString, "many">;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    webhook_settings: z.ZodObject<{
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        api_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        events: z.ZodDefault<z.ZodObject<{
            promocode_redemption: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            promocode_redemption: boolean;
        }, {
            promocode_redemption?: boolean | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    }, {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const HPriceListSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["partner", "consumer"]>;
    partner: z.ZodString;
    price_list: z.ZodArray<z.ZodObject<{
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>;
        price: z.ZodNumber;
        package: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }, {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }>, "many">;
    package_prices: z.ZodArray<z.ZodObject<{
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>;
        price: z.ZodNumber;
        package: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }, {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "partner" | "consumer";
    description: string | null;
    price_list: {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }[];
    package_prices: {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }[];
}, {
    id: string;
    name: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "partner" | "consumer";
    description: string | null;
    price_list: {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }[];
    package_prices: {
        type: "data-limited" | "time-limited" | "starter" | "unlimited";
        destination: string;
        price: number;
        package: string;
        label: string;
    }[];
}>;
declare const HFinancialPropertiesSchema: z.ZodObject<{
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
    last_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
    pricing_strategies: z.ZodObject<{
        partner: z.ZodObject<{
            strategy: z.ZodEnum<["split", "bundle"]>;
            modification_percentage: z.ZodNumber;
            default_price_list: z.ZodString;
            custom_prices: z.ZodArray<z.ZodObject<{
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limited", "time-limited"]>;
                price: z.ZodNumber;
                package: z.ZodString;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }, {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }>, "many">;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        }, {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        }>;
        user: z.ZodObject<{
            lifetime_discount_percentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            modification_percentage: z.ZodNumber;
            default_price_list: z.ZodString;
            custom_prices: z.ZodArray<z.ZodObject<{
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limited", "time-limited"]>;
                price: z.ZodNumber;
                package: z.ZodString;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }, {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }>, "many">;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        }, {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        };
    }, {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        };
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
    requires_card: boolean | null;
    next_invoice: Date;
    last_invoice: Date;
    pricing_strategies: {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        };
    };
    commission_fee?: number | null | undefined;
    commission_percentage?: number | null | undefined;
}, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
    requires_card: boolean | null;
    next_invoice: Date;
    last_invoice: Date;
    pricing_strategies: {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                price: number;
                package: string;
                label: string;
            }[];
            lifetime_discount_percentage?: number | null | undefined;
        };
    };
    commission_fee?: number | null | undefined;
    commission_percentage?: number | null | undefined;
}>;
declare const HApiLogSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    timestamp: z.ZodEffects<z.ZodDate, Date, Date>;
    status_code: z.ZodNumber;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    timestamp: Date;
    path: string;
    method: string;
    payload: Record<string, unknown>;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
}, {
    timestamp: Date;
    path: string;
    method: string;
    payload: Record<string, unknown>;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
}>;
declare const HPackagePriceSchema: z.ZodObject<{
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limited", "time-limited"]>;
    price: z.ZodNumber;
    package: z.ZodObject<{
        _type: z.ZodLiteral<"docRef">;
        collection: z.ZodLiteral<"/companies/hubby/packages">;
    }, "strip", z.ZodTypeAny, {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    }, {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    }>;
}, "strip", z.ZodTypeAny, {
    type: "data-limited" | "time-limited";
    destination: string;
    price: number;
    package: {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    };
    label: string;
}, {
    type: "data-limited" | "time-limited";
    destination: string;
    price: number;
    package: {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    };
    label: string;
}>;
declare const HubbyModelSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    id?: string | null | undefined;
}, {
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    id?: string | null | undefined;
}>;
declare const HPartnerAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }>;
    address: z.ZodObject<{
        street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }>;
    registration: z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>;
    banking_details: z.ZodObject<{
        account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        last_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        pricing_strategies: z.ZodObject<{
            partner: z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }>;
            user: z.ZodObject<{
                lifetime_discount_percentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
        [x: string]: any;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    platform_settings: z.ZodObject<{
        package_strategy: z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }>;
        free_esim: z.ZodObject<{
            enabled: z.ZodBoolean;
            package_specification: z.ZodObject<{
                size: z.ZodString;
                package_type: z.ZodString;
                destination: z.ZodString;
                package_duration: z.ZodNumber;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }>;
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
            total_allowance: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>;
        booking_defaults: z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }>;
        booking_confirmation: z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>;
        schedules: z.ZodArray<z.ZodObject<{
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
            moment: z.ZodEnum<["departure_date", "return_date", "immediate"]>;
            filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
            }>>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }>, "many">;
        agent_signup_settings: z.ZodObject<{
            slack_channel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            welcome_email_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            password_reset_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            partner_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
            enable_complimentary_booking: z.ZodDefault<z.ZodBoolean>;
            complimentary_booking_partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_sales_agent: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
            visual_identity_options: z.ZodDefault<z.ZodObject<{
                hubby_branding: z.ZodDefault<z.ZodBoolean>;
                source_partner_branding: z.ZodDefault<z.ZodBoolean>;
                own_branding: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            }, {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            }>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        }, {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        }>;
        brevo: z.ZodObject<{
            list_ids: z.ZodArray<z.ZodNumber, "many">;
            campaign_mode: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            list_ids: number[];
            campaign_mode: boolean;
        }, {
            list_ids: number[];
            campaign_mode: boolean;
        }>;
        upgrade_offer: z.ZodObject<{
            enabled: z.ZodBoolean;
            discount_percentage: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enabled: boolean;
            discount_percentage: number;
        }, {
            enabled: boolean;
            discount_percentage: number;
        }>;
        emit_events: z.ZodObject<{
            topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        }, {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        }>;
        visual_identity_options: z.ZodObject<{
            hubby_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            source_partner_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            own_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        }, {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        }>;
        account_manager: z.ZodString;
        sales_partner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        external_sales_partner_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodEffects<z.ZodDate, Date, Date>;
        updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
        created_by: z.ZodString;
        updated_by: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
    tag_slugs: z.ZodArray<z.ZodString, "many">;
    tag_references: z.ZodArray<z.ZodString, "many">;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    webhook_settings: z.ZodObject<{
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        api_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        events: z.ZodDefault<z.ZodObject<{
            promocode_redemption: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            promocode_redemption: boolean;
        }, {
            promocode_redemption?: boolean | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    }, {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const HPlatformSettingsSchema: z.ZodObject<{
    package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        parameters: z.ZodAny;
        supported_package_types: z.ZodOptional<z.ZodEnum<["data-limited", "unlimited"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    }, {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    }>>>;
    free_esim: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        enabled: z.ZodBoolean;
        package_specification: z.ZodObject<{
            size: z.ZodString;
            package_type: z.ZodString;
            destination: z.ZodString;
            package_duration: z.ZodNumber;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        }, {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        }>;
        booking_id_verification: z.ZodDefault<z.ZodBoolean>;
        booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowance: z.ZodNumber;
        total_allowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        package_specification: {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        };
        enabled: boolean;
        booking_id_verification: boolean;
        allowance: number;
        total_allowance: number;
        booking_id_verification_pattern?: string | null | undefined;
    }, {
        package_specification: {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        };
        enabled: boolean;
        allowance: number;
        total_allowance: number;
        booking_id_verification?: boolean | undefined;
        booking_id_verification_pattern?: string | null | undefined;
    }>>>;
    booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    }, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
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
    emit_events: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        topup: boolean;
        redemption: boolean;
        activation: boolean;
        depletion: boolean;
    }, {
        topup?: boolean | undefined;
        redemption?: boolean | undefined;
        activation?: boolean | undefined;
        depletion?: boolean | undefined;
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
        moment: z.ZodEnum<["departure_date", "return_date", "immediate"]>;
        filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
        }>>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        method: "email" | "push" | "sms" | "whatsapp";
        days: number;
        hour: number;
        moment: "departure_date" | "return_date" | "immediate";
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
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
    }, {
        key: string;
        method: "email" | "push" | "sms" | "whatsapp";
        days: number;
        hour: number;
        moment: "departure_date" | "return_date" | "immediate";
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
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
    }>, "many">>;
    brevo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        list_ids: z.ZodArray<z.ZodNumber, "many">;
        campaign_mode: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        list_ids: number[];
        campaign_mode: boolean;
    }, {
        list_ids: number[];
        campaign_mode: boolean;
    }>>>;
    visual_identity_options: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        hubby_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        source_partner_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        own_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        hubby_branding: boolean;
        source_partner_branding: boolean;
        own_branding: boolean;
    }, {
        hubby_branding?: boolean | undefined;
        source_partner_branding?: boolean | undefined;
        own_branding?: boolean | undefined;
    }>>>;
    agent_signup_settings: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        slack_channel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        welcome_email_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        password_reset_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        partner_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
        enable_complimentary_booking: z.ZodDefault<z.ZodBoolean>;
        complimentary_booking_partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_sales_agent: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
        visual_identity_options: z.ZodDefault<z.ZodObject<{
            hubby_branding: z.ZodDefault<z.ZodBoolean>;
            source_partner_branding: z.ZodDefault<z.ZodBoolean>;
            own_branding: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        }, {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enable_complimentary_booking: boolean;
        is_sales_agent: boolean | null;
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        slack_channel?: string | null | undefined;
        welcome_email_template?: number | null | undefined;
        password_reset_template?: number | null | undefined;
        partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
        complimentary_booking_partner_id?: string | null | undefined;
    }, {
        slack_channel?: string | null | undefined;
        welcome_email_template?: number | null | undefined;
        password_reset_template?: number | null | undefined;
        partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
        enable_complimentary_booking?: boolean | undefined;
        complimentary_booking_partner_id?: string | null | undefined;
        is_sales_agent?: boolean | null | undefined;
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | undefined;
    }>>>;
    upgrade_offer: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        enabled: z.ZodBoolean;
        discount_percentage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        discount_percentage: number;
    }, {
        enabled: boolean;
        discount_percentage: number;
    }>>>;
    account_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    external_sales_partner_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        };
        enabled: boolean;
        booking_id_verification: boolean;
        allowance: number;
        total_allowance: number;
        booking_id_verification_pattern?: string | null | undefined;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    schedules?: {
        key: string;
        method: "email" | "push" | "sms" | "whatsapp";
        days: number;
        hour: number;
        moment: "departure_date" | "return_date" | "immediate";
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
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
    }[] | undefined;
    agent_signup_settings?: {
        enable_complimentary_booking: boolean;
        is_sales_agent: boolean | null;
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        slack_channel?: string | null | undefined;
        welcome_email_template?: number | null | undefined;
        password_reset_template?: number | null | undefined;
        partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
        complimentary_booking_partner_id?: string | null | undefined;
    } | null | undefined;
    visual_identity_options?: {
        hubby_branding: boolean;
        source_partner_branding: boolean;
        own_branding: boolean;
    } | null | undefined;
    brevo?: {
        list_ids: number[];
        campaign_mode: boolean;
    } | null | undefined;
    upgrade_offer?: {
        enabled: boolean;
        discount_percentage: number;
    } | null | undefined;
    emit_events?: {
        topup: boolean;
        redemption: boolean;
        activation: boolean;
        depletion: boolean;
    } | null | undefined;
    account_manager?: string | null | undefined;
    external_sales_partner_manager?: string | null | undefined;
}, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            destination: string;
            size: string;
            package_duration: number;
            package_type: string;
            type?: string | null | undefined;
        };
        enabled: boolean;
        allowance: number;
        total_allowance: number;
        booking_id_verification?: boolean | undefined;
        booking_id_verification_pattern?: string | null | undefined;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    schedules?: {
        key: string;
        method: "email" | "push" | "sms" | "whatsapp";
        days: number;
        hour: number;
        moment: "departure_date" | "return_date" | "immediate";
        email?: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null | undefined;
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
    }[] | undefined;
    agent_signup_settings?: {
        slack_channel?: string | null | undefined;
        welcome_email_template?: number | null | undefined;
        password_reset_template?: number | null | undefined;
        partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
        enable_complimentary_booking?: boolean | undefined;
        complimentary_booking_partner_id?: string | null | undefined;
        is_sales_agent?: boolean | null | undefined;
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | undefined;
    } | null | undefined;
    visual_identity_options?: {
        hubby_branding?: boolean | undefined;
        source_partner_branding?: boolean | undefined;
        own_branding?: boolean | undefined;
    } | null | undefined;
    brevo?: {
        list_ids: number[];
        campaign_mode: boolean;
    } | null | undefined;
    upgrade_offer?: {
        enabled: boolean;
        discount_percentage: number;
    } | null | undefined;
    emit_events?: {
        topup?: boolean | undefined;
        redemption?: boolean | undefined;
        activation?: boolean | undefined;
        depletion?: boolean | undefined;
    } | null | undefined;
    account_manager?: string | null | undefined;
    external_sales_partner_manager?: string | null | undefined;
}>;
declare const HVisualIdentitySchema: z.ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
declare const HPricingStrategySchema: z.ZodObject<{
    strategy: z.ZodEnum<["split", "bundle"]>;
    modification_percentage: z.ZodNumber;
    default_price_list: z.ZodObject<{
        _type: z.ZodLiteral<"docRef">;
        collection: z.ZodLiteral<"price_lists">;
        nullable: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        _type: "docRef";
        nullable: true;
        collection: "price_lists";
    }, {
        _type: "docRef";
        nullable: true;
        collection: "price_lists";
    }>;
    custom_prices: z.ZodArray<z.ZodObject<{
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limited", "time-limited"]>;
        price: z.ZodNumber;
        package: z.ZodObject<{
            _type: z.ZodLiteral<"docRef">;
            collection: z.ZodLiteral<"/companies/hubby/packages">;
        }, "strip", z.ZodTypeAny, {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        }, {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "data-limited" | "time-limited";
        destination: string;
        price: number;
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
    }, {
        type: "data-limited" | "time-limited";
        destination: string;
        price: number;
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    strategy: "split" | "bundle";
    modification_percentage: number;
    default_price_list: {
        _type: "docRef";
        nullable: true;
        collection: "price_lists";
    };
    custom_prices: {
        type: "data-limited" | "time-limited";
        destination: string;
        price: number;
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
    }[];
}, {
    strategy: "split" | "bundle";
    modification_percentage: number;
    default_price_list: {
        _type: "docRef";
        nullable: true;
        collection: "price_lists";
    };
    custom_prices: {
        type: "data-limited" | "time-limited";
        destination: string;
        price: number;
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
    }[];
}>;
declare const HFreeEsimSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    package_specification: z.ZodObject<{
        size: z.ZodString;
        package_type: z.ZodString;
        destination: z.ZodString;
        package_duration: z.ZodNumber;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        destination: string;
        size: string;
        package_duration: number;
        package_type: string;
        type?: string | null | undefined;
    }, {
        destination: string;
        size: string;
        package_duration: number;
        package_type: string;
        type?: string | null | undefined;
    }>;
    booking_id_verification: z.ZodDefault<z.ZodBoolean>;
    booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    allowance: z.ZodNumber;
    total_allowance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    package_specification: {
        destination: string;
        size: string;
        package_duration: number;
        package_type: string;
        type?: string | null | undefined;
    };
    enabled: boolean;
    booking_id_verification: boolean;
    allowance: number;
    total_allowance: number;
    booking_id_verification_pattern?: string | null | undefined;
}, {
    package_specification: {
        destination: string;
        size: string;
        package_duration: number;
        package_type: string;
        type?: string | null | undefined;
    };
    enabled: boolean;
    allowance: number;
    total_allowance: number;
    booking_id_verification?: boolean | undefined;
    booking_id_verification_pattern?: string | null | undefined;
}>;
declare const HAnalyticsSchema: z.ZodObject<{
    service: z.ZodString;
    date: z.ZodString;
    partner: z.ZodString;
    event: z.ZodString;
    parameter: z.ZodNullable<z.ZodString>;
    sum: z.ZodNumber;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    date: string;
    service: string;
    event: string;
    parameter: string | null;
    sum: number;
    id?: string | null | undefined;
}, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    date: string;
    service: string;
    event: string;
    parameter: string | null;
    sum: number;
    id?: string | null | undefined;
}>;
declare const HRoleSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    description: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    permissions: string[];
    created_at: Date;
    updated_at: Date;
    description: string;
    id?: string | null | undefined;
}, {
    name: string;
    permissions: string[];
    created_at: Date;
    updated_at: Date;
    description: string;
    id?: string | null | undefined;
}>;
declare const HPermissionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    description: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    description: string;
    id?: string | null | undefined;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    description: string;
    id?: string | null | undefined;
}>;
declare const HTagSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    slug: string;
    id?: string | null | undefined;
    type?: string | null | undefined;
    description?: string | null | undefined;
    color?: string | null | undefined;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    slug: string;
    id?: string | null | undefined;
    type?: string | null | undefined;
    description?: string | null | undefined;
    color?: string | null | undefined;
}>;
declare const HTrafficPolicySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    external_id: z.ZodString;
    provider: z.ZodString;
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    external_id: string;
    provider: string;
    description: string;
    id?: string | null | undefined;
}, {
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    external_id: string;
    provider: string;
    description: string;
    id?: string | null | undefined;
}>;
declare const HTelnaPackageSchema: z.ZodObject<{
    size: z.ZodString;
    iso: z.ZodString;
    days: z.ZodNumber;
    price: z.ZodNumber;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    packageType: z.ZodString;
    partner: z.ZodString;
    traffic_policy: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    is_active: boolean;
    size: string;
    traffic_policy: string;
    price: number;
    is_hidden: boolean;
    priority: number;
    days: number;
    iso: string;
    packageType: string;
}, {
    partner: string;
    is_active: boolean;
    size: string;
    traffic_policy: string;
    price: number;
    is_hidden: boolean;
    priority: number;
    days: number;
    iso: string;
    packageType: string;
}>;
declare const HBondioPackageSchema: z.ZodObject<{
    label: z.ZodEnum<["lambda", "tau"]>;
    periodDays: z.ZodNumber;
    periodIterations: z.ZodNumber;
    throttling: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    size: z.ZodString;
    iso: z.ZodString;
    days: z.ZodNumber;
    price: z.ZodNumber;
    is_hidden: z.ZodBoolean;
    is_active: z.ZodBoolean;
    priority: z.ZodNumber;
    packageType: z.ZodString;
    partner: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    is_active: boolean;
    size: string;
    price: number;
    label: "lambda" | "tau";
    is_hidden: boolean;
    priority: number;
    days: number;
    iso: string;
    packageType: string;
    periodDays: number;
    periodIterations: number;
    throttling?: number | null | undefined;
}, {
    partner: string;
    is_active: boolean;
    size: string;
    price: number;
    label: "lambda" | "tau";
    is_hidden: boolean;
    priority: number;
    days: number;
    iso: string;
    packageType: string;
    periodDays: number;
    periodIterations: number;
    throttling?: number | null | undefined;
}>;
declare const HReviewSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    partner: z.ZodString;
    partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    questions: z.ZodRecord<z.ZodString, z.ZodAny>;
    reward_strategy: z.ZodObject<{
        base_reward: z.ZodObject<{
            package_size: z.ZodString;
            package_type: z.ZodEnum<["data-limited", "starter"]>;
        }, "strip", z.ZodTypeAny, {
            package_type: "data-limited" | "starter";
            package_size: string;
        }, {
            package_type: "data-limited" | "starter";
            package_size: string;
        }>;
        multipliers: z.ZodOptional<z.ZodObject<{
            quality_based: z.ZodOptional<z.ZodNumber>;
            completion_based: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        }, {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    }, {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    }>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    questions: Record<string, any>;
    reward_strategy: {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    };
    id?: string | undefined;
    partner_id?: string | null | undefined;
}, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    questions: Record<string, any>;
    reward_strategy: {
        base_reward: {
            package_type: "data-limited" | "starter";
            package_size: string;
        };
        multipliers?: {
            quality_based?: number | undefined;
            completion_based?: number | undefined;
        } | undefined;
    };
    id?: string | undefined;
    partner_id?: string | null | undefined;
}>;
declare const HReviewSubmissionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    country: z.ZodString;
    partner: z.ZodString;
    review: z.ZodString;
    user: z.ZodString;
    questions: z.ZodRecord<z.ZodString, z.ZodAny>;
    iccid: z.ZodString;
    isAndroid: z.ZodBoolean;
    country_id: z.ZodString;
    partner_id: z.ZodString;
    review_id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
    analysis: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    iccid: string;
    user: string;
    country: string;
    partner_id: string;
    questions: Record<string, any>;
    review: string;
    isAndroid: boolean;
    country_id: string;
    review_id: string;
    id?: string | undefined;
    analysis?: Record<string, any> | null | undefined;
}, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    iccid: string;
    user: string;
    country: string;
    partner_id: string;
    questions: Record<string, any>;
    review: string;
    isAndroid: boolean;
    country_id: string;
    review_id: string;
    id?: string | undefined;
    analysis?: Record<string, any> | null | undefined;
}>;
declare const HDestinationSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    iso3s: z.ZodArray<z.ZodString, "many">;
    name: z.ZodString;
    i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
    is_active: z.ZodBoolean;
    sort_order: z.ZodNumber;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    is_active: boolean;
    i18n_name: Record<string, string>;
    iso3s: string[];
    sort_order: number;
    tier?: number | null | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    is_active: boolean;
    i18n_name: Record<string, string>;
    iso3s: string[];
    sort_order: number;
    tier?: number | null | undefined;
}>;
declare const HDestinationBundleSchema: z.ZodObject<{
    id: z.ZodString;
    parent_document_id: z.ZodString;
    type: z.ZodEnum<["unlimited", "data-limited", "time-limited", "starter"]>;
    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    provider: z.ZodEnum<["telna", "bondio"]>;
    duration_in_days: z.ZodNumber;
    duration_in_seconds: z.ZodNumber;
    size_in_bytes: z.ZodNumber;
    size_in_megabytes: z.ZodNumber;
    size_in_gigabytes: z.ZodNumber;
    package_template: z.ZodString;
    partner: z.ZodString;
    traffic_policy: z.ZodString;
    throttling: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    b2c_price: z.ZodNumber;
    b2b_price: z.ZodNumber;
    partner_b2c_price: z.ZodRecord<z.ZodString, z.ZodNumber>;
    partner_b2b_price: z.ZodRecord<z.ZodString, z.ZodNumber>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    is_visible: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    deleted_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    deleted_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "data-limited" | "time-limited" | "starter" | "unlimited";
    is_active: boolean;
    traffic_policy: string;
    provider: "telna" | "bondio";
    priority: number;
    parent_document_id: string;
    duration_in_days: number;
    duration_in_seconds: number;
    size_in_bytes: number;
    size_in_megabytes: number;
    size_in_gigabytes: number;
    package_template: string;
    b2c_price: number;
    b2b_price: number;
    partner_b2c_price: Record<string, number>;
    partner_b2b_price: Record<string, number>;
    is_visible: boolean;
    deleted_at: Date;
    deleted_by: string | null;
    label?: string | null | undefined;
    throttling?: number | null | undefined;
}, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "data-limited" | "time-limited" | "starter" | "unlimited";
    traffic_policy: string;
    provider: "telna" | "bondio";
    parent_document_id: string;
    duration_in_days: number;
    duration_in_seconds: number;
    size_in_bytes: number;
    size_in_megabytes: number;
    size_in_gigabytes: number;
    package_template: string;
    b2c_price: number;
    b2b_price: number;
    partner_b2c_price: Record<string, number>;
    partner_b2b_price: Record<string, number>;
    deleted_at: Date;
    deleted_by: string | null;
    is_active?: boolean | undefined;
    label?: string | null | undefined;
    priority?: number | undefined;
    throttling?: number | null | undefined;
    is_visible?: boolean | undefined;
}>;
declare const HPackageTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    provider: z.ZodString;
    type: z.ZodString;
    purchase_price: z.ZodNumber;
    external_id: z.ZodString;
    supported_countries: z.ZodArray<z.ZodString, "many">;
    provider_specific_data: z.ZodRecord<z.ZodString, z.ZodAny>;
    size_in_gigabytes: z.ZodNumber;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    external_id: string;
    provider: string;
    size_in_gigabytes: number;
    purchase_price: number;
    supported_countries: string[];
    provider_specific_data: Record<string, any>;
    tier?: number | null | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    external_id: string;
    provider: string;
    size_in_gigabytes: number;
    purchase_price: number;
    supported_countries: string[];
    provider_specific_data: Record<string, any>;
    tier?: number | null | undefined;
}>;
declare const HUserTouchpointsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    unique_device_identifier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    user: z.ZodString;
    booking: z.ZodString;
    promo_code: z.ZodString;
    partner: z.ZodString;
    promo_code_redeemed_at: z.ZodEffects<z.ZodDate, Date, Date>;
    esim_assigned_at: z.ZodEffects<z.ZodDate, Date, Date>;
    esim_install_initiated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    esim_install_completed_at: z.ZodEffects<z.ZodDate, Date, Date>;
    esim_first_package_activated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    esim_topped_up_at: z.ZodEffects<z.ZodDate, Date, Date>;
    activation_initiated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    topup_initiated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    topup_checkout_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodString;
    updated_by: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    user: string;
    booking: string;
    promo_code: string;
    promo_code_redeemed_at: Date;
    esim_assigned_at: Date;
    esim_install_initiated_at: Date;
    esim_install_completed_at: Date;
    esim_first_package_activated_at: Date;
    esim_topped_up_at: Date;
    activation_initiated_at: Date;
    topup_initiated_at: Date;
    topup_checkout_at: Date;
    id?: string | null | undefined;
    unique_device_identifier?: string | null | undefined;
}, {
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    user: string;
    booking: string;
    promo_code: string;
    promo_code_redeemed_at: Date;
    esim_assigned_at: Date;
    esim_install_initiated_at: Date;
    esim_install_completed_at: Date;
    esim_first_package_activated_at: Date;
    esim_topped_up_at: Date;
    activation_initiated_at: Date;
    topup_initiated_at: Date;
    topup_checkout_at: Date;
    id?: string | null | undefined;
    unique_device_identifier?: string | null | undefined;
}>;
declare const HLoginRequestSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodString;
    status: z.ZodEnum<["pending", "completed", "expired"]>;
    user: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    expires_at: z.ZodEffects<z.ZodDate, Date, Date>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    email: string;
    created_at: Date;
    status: "pending" | "completed" | "expired";
    expires_at: Date;
    user: string;
    id?: string | null | undefined;
}, {
    email: string;
    created_at: Date;
    status: "pending" | "completed" | "expired";
    expires_at: Date;
    user: string;
    id?: string | null | undefined;
}>;
declare const HLiveActivitySchema: z.ZodObject<{
    id: z.ZodString;
    esim_id: z.ZodString;
    title: z.ZodString;
    message: z.ZodString;
    total_data_gb: z.ZodNullable<z.ZodString>;
    data_left_gb: z.ZodNullable<z.ZodString>;
    user_id: z.ZodString;
    push_to_start_token: z.ZodString;
    push_to_update_token: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["created", "active", "ended", "dismissed", "failed"]>;
    last_update_at: z.ZodEffects<z.ZodDate, Date, Date>;
    last_update: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        event: z.ZodEnum<["start", "update", "end"]>;
        totalDataGb: z.ZodOptional<z.ZodNumber>;
        dataLeftGb: z.ZodOptional<z.ZodNumber>;
        apnsId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        statusCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        reason: z.ZodOptional<z.ZodEnum<["expired", "data_exhausted", "no_packages", "manual", "recreated"]>>;
    }, "strip", z.ZodTypeAny, {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    }, {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    }>>>;
    ended_at: z.ZodEffects<z.ZodDate, Date, Date>;
    started_at: z.ZodEffects<z.ZodDate, Date, Date>;
    dismissed_at: z.ZodEffects<z.ZodDate, Date, Date>;
    recreated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    recreation_count: z.ZodDefault<z.ZodNumber>;
    click_count: z.ZodDefault<z.ZodNumber>;
    click_timestamps: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodDate, Date, unknown>, "many">>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    push_to_start_token: string;
    message: string;
    status: "failed" | "created" | "active" | "ended" | "dismissed";
    title: string;
    click_count: number;
    user_id: string;
    esim_id: string;
    total_data_gb: string | null;
    data_left_gb: string | null;
    push_to_update_token: string | null;
    last_update_at: Date;
    ended_at: Date;
    started_at: Date;
    dismissed_at: Date;
    recreated_at: Date;
    recreation_count: number;
    click_timestamps: Date[];
    last_update?: {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    } | null | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    push_to_start_token: string;
    message: string;
    status: "failed" | "created" | "active" | "ended" | "dismissed";
    title: string;
    user_id: string;
    esim_id: string;
    total_data_gb: string | null;
    data_left_gb: string | null;
    push_to_update_token: string | null;
    last_update_at: Date;
    ended_at: Date;
    started_at: Date;
    dismissed_at: Date;
    recreated_at: Date;
    click_count?: number | undefined;
    last_update?: {
        event: "start" | "update" | "end";
        totalDataGb?: number | undefined;
        dataLeftGb?: number | undefined;
        apnsId?: string | null | undefined;
        statusCode?: number | null | undefined;
        reason?: "manual" | "expired" | "data_exhausted" | "no_packages" | "recreated" | undefined;
    } | null | undefined;
    recreation_count?: number | undefined;
    click_timestamps?: unknown[] | undefined;
}>;
declare const HScheduledJobSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    job_type: z.ZodString;
    execute_at: z.ZodEffects<z.ZodDate, Date, Date>;
    status: z.ZodEnum<["pending", "completed", "failed"]>;
    task_data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    retry_count: z.ZodNumber;
    max_retries: z.ZodNumber;
    error: z.ZodNullable<z.ZodString>;
    scheduled_at: z.ZodEffects<z.ZodDate, Date, Date>;
    last_retry_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    status: "pending" | "completed" | "failed";
    job_type: string;
    execute_at: Date;
    task_data: Record<string, unknown>;
    retry_count: number;
    max_retries: number;
    error: string | null;
    scheduled_at: Date;
    last_retry_at: Date;
    id?: string | null | undefined;
}, {
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    status: "pending" | "completed" | "failed";
    job_type: string;
    execute_at: Date;
    task_data: Record<string, unknown>;
    retry_count: number;
    max_retries: number;
    error: string | null;
    scheduled_at: Date;
    last_retry_at: Date;
    id?: string | null | undefined;
}>;
declare const HAddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    country?: string | null | undefined;
    street?: string | null | undefined;
    city?: string | null | undefined;
    postal_code?: string | null | undefined;
}, {
    country?: string | null | undefined;
    street?: string | null | undefined;
    city?: string | null | undefined;
    postal_code?: string | null | undefined;
}>;
declare const HRegistrationSchema: z.ZodObject<{
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
}>;
declare const HBankingDetailsSchema: z.ZodObject<{
    account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    billing_email?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    billing_email?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}>;
declare const HPartnerPackageSpecificationSchema: z.ZodObject<{
    size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destination: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: string | null | undefined;
    destination?: string | null | undefined;
    size?: string | null | undefined;
}, {
    type?: string | null | undefined;
    destination?: string | null | undefined;
    size?: string | null | undefined;
}>;
declare const HPromoPackageSpecificationSchema: z.ZodObject<{
    destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
    iso3: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    bundle_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}>;
declare const HVisualIdentityBannerSchema: z.ZodObject<{
    action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
    action?: string | null | undefined;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
    action?: string | null | undefined;
}>;
declare const HVisualIdentityBannersSchema: z.ZodObject<{
    strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
    banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        image_url: z.ZodString;
        alt: z.ZodString;
        click_url: z.ZodString;
        locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
        properties: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }[] | null | undefined;
}, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }[] | null | undefined;
}>;
declare const HScheduleFilterSchema: z.ZodObject<{
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
}>;
declare const HPartnerContactSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
    office_email?: string | null | undefined;
}, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
    office_email?: string | null | undefined;
}>;
declare const HPartnerDataSchema: z.ZodObject<{
    source: z.ZodString;
    manual: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    source: string;
    manual: boolean;
}, {
    source: string;
    manual: boolean;
}>;
declare const HCommunicationChannelSchema: z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>;
declare const HBookingStatusSchema: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
declare const HCommunicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
}, "strip", z.ZodTypeAny, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}>;
declare const HRewardStrategySchema: z.ZodObject<{
    base_reward: z.ZodObject<{
        package_size: z.ZodString;
        package_type: z.ZodEnum<["data-limited", "starter"]>;
    }, "strip", z.ZodTypeAny, {
        package_type: "data-limited" | "starter";
        package_size: string;
    }, {
        package_type: "data-limited" | "starter";
        package_size: string;
    }>;
    multipliers: z.ZodOptional<z.ZodObject<{
        quality_based: z.ZodOptional<z.ZodNumber>;
        completion_based: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    }, {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    base_reward: {
        package_type: "data-limited" | "starter";
        package_size: string;
    };
    multipliers?: {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    } | undefined;
}, {
    base_reward: {
        package_type: "data-limited" | "starter";
        package_size: string;
    };
    multipliers?: {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    } | undefined;
}>;
declare const HBaseRewardSchema: z.ZodObject<{
    package_size: z.ZodString;
    package_type: z.ZodEnum<["data-limited", "starter"]>;
}, "strip", z.ZodTypeAny, {
    package_type: "data-limited" | "starter";
    package_size: string;
}, {
    package_type: "data-limited" | "starter";
    package_size: string;
}>;
declare const HRewardMultipliersSchema: z.ZodOptional<z.ZodObject<{
    quality_based: z.ZodOptional<z.ZodNumber>;
    completion_based: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    quality_based?: number | undefined;
    completion_based?: number | undefined;
}, {
    quality_based?: number | undefined;
    completion_based?: number | undefined;
}>>;
declare const HRewardPackageTypeSchema: z.ZodEnum<["data-limited", "starter"]>;
declare const HJobStatusSchema: z.ZodEnum<["pending", "completed", "failed"]>;
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
type HReview = z.infer<typeof HReviewSchema>;
type HReviewSubmission = z.infer<typeof HReviewSubmissionSchema>;
type HDestination = z.infer<typeof HDestinationSchema>;
type HDestinationBundle = z.infer<typeof HDestinationBundleSchema>;
type HPackageTemplate = z.infer<typeof HPackageTemplateSchema>;
type HUserTouchpoints = z.infer<typeof HUserTouchpointsSchema>;
type HLoginRequest = z.infer<typeof HLoginRequestSchema>;
type HLiveActivity = z.infer<typeof HLiveActivitySchema>;
type HScheduledJob = z.infer<typeof HScheduledJobSchema>;
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
type HRewardStrategy = z.infer<typeof HRewardStrategySchema>;
type HBaseReward = z.infer<typeof HBaseRewardSchema>;
type HRewardMultipliers = z.infer<typeof HRewardMultipliersSchema>;
type HRewardPackageType = z.infer<typeof HRewardPackageTypeSchema>;
type HJobStatus = z.infer<typeof HJobStatusSchema>;
type HHubbyModel = z.infer<typeof HubbyModelSchema>;
type HubbyModelApp = HHubbyModel;
type HRole = z.infer<typeof HRoleSchema>;
type HPermission = z.infer<typeof HPermissionSchema>;

type TimestampField = {
    _type: 'timestamp';
    optional?: boolean;
    nullable?: boolean;
};
type DocRefField = {
    _type: 'docRef';
    collection: string;
    optional?: boolean;
    nullable?: boolean;
};
type ArrayField = {
    _type: 'array';
    of: FieldSpec;
    optional?: boolean;
    nullable?: boolean;
};
type RecordField = {
    _type: 'record';
    of: FieldSpec;
    optional?: boolean;
    nullable?: boolean;
};
type ObjectField = {
    _type: 'object';
    of: Record<string, FieldSpec>;
    optional?: boolean;
    nullable?: boolean;
};
type FieldSpec = z.ZodTypeAny | TimestampField | DocRefField | ArrayField | RecordField | ObjectField | {
    [key: string]: FieldSpec;
};

/**
 * Creates converter functions for a specific model type with dependency injection.
 * This lets you use the conversion functions with your own Firebase instance.
 *
 * @param db - Firestore instance to use for document references
 * @param modelSchemaSpec - Schema specification for the model
 * @returns Object with to/from Firestore conversion functions
 */
declare function createModelConverters<TModel, TFirestore>(db: Firestore, modelSchemaSpec: FieldSpec): {
    /**
     * Converts a model instance to Firestore format
     */
    toFirestore: (model: TModel) => TFirestore;
    /**
     * Converts Firestore data to a model instance
     */
    fromFirestore: (firestoreData: TFirestore) => TModel;
};

declare function createConvertJSToFirestore(db: Firestore): (input: any, spec: FieldSpec) => any;
declare function createConvertFirestoreToJS(): (input: any, spec: FieldSpec, path?: string[]) => any;

declare class FirebaseService {
    private firestoreInstance;
    constructor(db: Firestore);
    getFirestore(): Firestore;
    static getDefaultInstance(): FirebaseService;
    static setDefaultInstance(instance: FirebaseService): void;
}
declare function createFirebaseService(db: Firestore): FirebaseService;

declare const PARTNER_COLLECTION = "/companies/hubby/partners";
declare const USER_COLLECTION = "users";
declare const PROFILE_COLLECTION = "/companies/hubby/profiles";
declare const PACKAGE_COLLECTION = "/companies/hubby/packages";
declare const PROMO_CODE_COLLECTION = "/companies/hubby/promo_codes";
declare const COUNTRY_COLLECTION = "countries";
declare const ESIM_COLLECTION = "esims";
declare const PAYMENT_COLLECTION = "payments";
declare const PRICE_LIST_COLLECTION = "price_lists";
declare const BOOKING_COLLECTION = "bookings";
declare const MESSAGE_COLLECTION = "messages";
declare const CURRENCY_COLLECTION = "currencies";
declare const API_LOG_COLLECTION = "api_logs";
declare const ROLE_COLLECTION = "roles";
declare const PERMISSION_COLLECTION = "permissions";
declare const TRAFFIC_POLICY_COLLECTION = "traffic_policies";
declare const REVIEW_COLLECTION = "/companies/hubby/reviews";
declare const REVIEW_SUBMISSION_COLLECTION = "/companies/hubby/review_submissions";
declare const DESTINATION_COLLECTION = "destinations";
declare const DESTINATION_OFFER_COLLECTION = "offers";
declare const USER_TOUCHPOINTS_COLLECTION = "user_touchpoints";
declare const LIVE_ACTIVITY_COLLECTION = "live_activities";
declare const TAG_COLLECTION = "tags";
declare const SCHEDULED_JOB_COLLECTION = "scheduled_jobs";

/** ZOD SCHEMAS */
declare const UserSchema: z.ZodTypeAny;
declare const UserFirestoreSchema: z.ZodTypeAny;
declare const BookingSchema: z.ZodTypeAny;
declare const CountrySchema: z.ZodTypeAny;
declare const CurrencySchema: z.ZodTypeAny;
declare const ESIMSchema: z.ZodTypeAny;
declare const PaymentSchema: z.ZodTypeAny;
declare const MessageSchema: z.ZodTypeAny;
declare const PackageSchema: z.ZodTypeAny;
declare const PromoCodeSchema: z.ZodTypeAny;
declare const PartnerSchema: z.ZodTypeAny;
declare const PriceListSchema: z.ZodTypeAny;
declare const ApiLogSchema: z.ZodTypeAny;
declare const VisualIdentitySchema: z.ZodTypeAny;
declare const PackagePriceSchema: z.ZodTypeAny;
declare const PlatformSettingsSchema: z.ZodTypeAny;
declare const ScheduleSchema: z.ZodTypeAny;
declare const AnalyticsSchema: z.ZodTypeAny;
declare const TagSchema: z.ZodTypeAny;
declare const TelnaPackageSchema: z.ZodTypeAny;
declare const BondioPackageSchema: z.ZodTypeAny;
declare const TrafficPolicySchema: z.ZodTypeAny;
declare const ReviewSchema: z.ZodTypeAny;
declare const ReviewSubmissionSchema: z.ZodTypeAny;
declare const DestinationSchema: z.ZodTypeAny;
declare const DestinationBundleSchema: z.ZodTypeAny;
declare const PackageTemplateSchema: z.ZodTypeAny;
declare const UserTouchpointsSchema: z.ZodTypeAny;
declare const LoginRequestSchema: z.ZodTypeAny;
declare const LiveActivitySchema: z.ZodTypeAny;
declare const ScheduledJobSchema: z.ZodTypeAny;
declare const AddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    country?: string | null | undefined;
    street?: string | null | undefined;
    city?: string | null | undefined;
    postal_code?: string | null | undefined;
}, {
    country?: string | null | undefined;
    street?: string | null | undefined;
    city?: string | null | undefined;
    postal_code?: string | null | undefined;
}>;
declare const RegistrationSchema: z.ZodObject<{
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
}>;
declare const BankingDetailsSchema: z.ZodObject<{
    account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    billing_email?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    billing_email?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}>;
declare const PartnerPackageSpecificationSchema: z.ZodObject<{
    size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destination: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: string | null | undefined;
    destination?: string | null | undefined;
    size?: string | null | undefined;
}, {
    type?: string | null | undefined;
    destination?: string | null | undefined;
    size?: string | null | undefined;
}>;
declare const PromoPackageSpecificationSchema: z.ZodObject<{
    destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
    iso3: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    bundle_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}>;
declare const VisualIdentityBannerSchema: z.ZodObject<{
    action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
    action?: string | null | undefined;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
    action?: string | null | undefined;
}>;
declare const ScheduleFilterSchema: z.ZodObject<{
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
}>;
declare const PartnerContactSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
    office_email?: string | null | undefined;
}, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
    office_email?: string | null | undefined;
}>;
declare const PartnerDataSchema: z.ZodObject<{
    source: z.ZodString;
    manual: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    source: string;
    manual: boolean;
}, {
    source: string;
    manual: boolean;
}>;
declare const CommunicationChannelSchema: z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>;
declare const BookingStatusSchema: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
declare const CommunicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
}, "strip", z.ZodTypeAny, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}>;
declare const VisualIdentityBannersSchema: z.ZodObject<{
    strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
    banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        image_url: z.ZodString;
        alt: z.ZodString;
        click_url: z.ZodString;
        locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
        properties: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }[] | null | undefined;
}, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
        action?: string | null | undefined;
    }[] | null | undefined;
}>;
declare const RewardStrategySchema: z.ZodObject<{
    base_reward: z.ZodObject<{
        package_size: z.ZodString;
        package_type: z.ZodEnum<["data-limited", "starter"]>;
    }, "strip", z.ZodTypeAny, {
        package_type: "data-limited" | "starter";
        package_size: string;
    }, {
        package_type: "data-limited" | "starter";
        package_size: string;
    }>;
    multipliers: z.ZodOptional<z.ZodObject<{
        quality_based: z.ZodOptional<z.ZodNumber>;
        completion_based: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    }, {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    base_reward: {
        package_type: "data-limited" | "starter";
        package_size: string;
    };
    multipliers?: {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    } | undefined;
}, {
    base_reward: {
        package_type: "data-limited" | "starter";
        package_size: string;
    };
    multipliers?: {
        quality_based?: number | undefined;
        completion_based?: number | undefined;
    } | undefined;
}>;
declare const BaseRewardSchema: z.ZodObject<{
    package_size: z.ZodString;
    package_type: z.ZodEnum<["data-limited", "starter"]>;
}, "strip", z.ZodTypeAny, {
    package_type: "data-limited" | "starter";
    package_size: string;
}, {
    package_type: "data-limited" | "starter";
    package_size: string;
}>;
declare const RewardMultipliersSchema: z.ZodOptional<z.ZodObject<{
    quality_based: z.ZodOptional<z.ZodNumber>;
    completion_based: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    quality_based?: number | undefined;
    completion_based?: number | undefined;
}, {
    quality_based?: number | undefined;
    completion_based?: number | undefined;
}>>;
declare const RewardPackageTypeSchema: z.ZodEnum<["data-limited", "starter"]>;
declare const JobStatusSchema: z.ZodEnum<["pending", "completed", "failed"]>;
type User = z.infer<typeof UserSchema>;
type UserFirestore = z.infer<typeof UserFirestoreSchema>;
type Booking = z.infer<typeof BookingSchema>;
type Country = z.infer<typeof CountrySchema>;
type Currency = z.infer<typeof CurrencySchema>;
type ESIM = z.infer<typeof ESIMSchema>;
type Payment = z.infer<typeof PaymentSchema>;
type Message = z.infer<typeof MessageSchema>;
type Package = z.infer<typeof PackageSchema>;
type PromoCode = z.infer<typeof PromoCodeSchema>;
type Partner = z.infer<typeof PartnerSchema>;
type PriceList = z.infer<typeof PriceListSchema>;
type ApiLog = z.infer<typeof ApiLogSchema>;
type Analytics = z.infer<typeof AnalyticsSchema>;
type Schedule = z.infer<typeof ScheduleSchema>;
type TelnaPackage = z.infer<typeof TelnaPackageSchema>;
type BondioPackage = z.infer<typeof BondioPackageSchema>;
type TrafficPolicy = z.infer<typeof TrafficPolicySchema>;
type Review = z.infer<typeof ReviewSchema>;
type ReviewSubmission = z.infer<typeof ReviewSubmissionSchema>;
type Destination = z.infer<typeof DestinationSchema>;
type DestinationBundle = z.infer<typeof DestinationBundleSchema>;
type PackageTemplate = z.infer<typeof PackageTemplateSchema>;
type UserTouchpoints = z.infer<typeof UserTouchpointsSchema>;
type LoginRequest = z.infer<typeof LoginRequestSchema>;
type LiveActivity = z.infer<typeof LiveActivitySchema>;
type ScheduledJob = z.infer<typeof ScheduledJobSchema>;
type LiveActivityStatus = z.infer<typeof liveActivityStatusSchema>;
type LiveActivityEvent = z.infer<typeof liveActivityEventSchema>;
type LiveActivityReason = z.infer<typeof liveActivityReasonSchema>;
type LastUpdate = z.infer<typeof lastUpdateSchema>;
type JobStatus = z.infer<typeof JobStatusSchema>;
type Address = z.infer<typeof AddressSchema>;
type Registration = z.infer<typeof RegistrationSchema>;
type BankingDetails = z.infer<typeof BankingDetailsSchema>;
type PartnerPackageSpecification = z.infer<typeof PartnerPackageSpecificationSchema>;
type PackageSpecification = z.infer<typeof PromoPackageSpecificationSchema>;
type VisualIdentity = z.infer<typeof VisualIdentitySchema>;
type VisualIdentityBanner = z.infer<typeof VisualIdentityBannerSchema>;
type VisualIdentityBanners = z.infer<typeof VisualIdentityBannersSchema>;
type VisualIdentityBannerStrategy = VisualIdentityBanners;
type ScheduleFilter = z.infer<typeof ScheduleFilterSchema>;
type PartnerContact = z.infer<typeof PartnerContactSchema>;
type PartnerData = z.infer<typeof PartnerDataSchema>;
type CommunicationChannel = z.infer<typeof CommunicationChannelSchema>;
type BookingStatus = z.infer<typeof BookingStatusSchema>;
type CommunicationOptions = z.infer<typeof CommunicationOptionsSchema>;
type PackagePrice = z.infer<typeof PackagePriceSchema>;
type PlatformSettings = z.infer<typeof PlatformSettingsSchema>;
type RewardStrategy = z.infer<typeof RewardStrategySchema>;
type BaseReward = z.infer<typeof BaseRewardSchema>;
type RewardMultipliers = z.infer<typeof RewardMultipliersSchema>;
type RewardPackageType = z.infer<typeof RewardPackageTypeSchema>;
type BookingApiRequest = Booking;
type BookingApiResponse = Booking;
type PartnerApiRequest = Partner;
type PartnerApiResponse = Partner;
type PriceListApiRequest = PriceList;
type PriceListApiResponse = PriceList;
type ApiLogApiRequest = ApiLog;
type ApiLogApiResponse = ApiLog;
type Tag = z.infer<typeof TagSchema>;

type HubbyModel = {
    id: string;
    created_at: Date;
    updated_at: Date | null;
    created_by: string;
    updated_by: string | null;
};
type HubbyModelFirestore = {
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp | null;
    created_by: DocumentReference | null | string;
    updated_by: DocumentReference | null | string;
};
declare const partnerFromFirestore: (partner: Partner) => HPartner;
declare const partnerToFirestore: (partner: HPartner) => Partner;
declare const userToFirestore: (user: User) => UserFirestore;
declare const userFromFirestore: (user: UserFirestore) => User;
declare const priceListFromFirestore: (priceList: PriceList) => HPriceList;
declare const priceListToFirestore: (priceList: HPriceList) => PriceList;
declare const promoCodeFromFirestore: (promoCode: PromoCode) => HPromoCode;
declare const promoCodeToFirestore: (promoCode: HPromoCode) => PromoCode;
declare const userTouchpointsFromFirestore: (userTouchpoints: UserTouchpoints) => HUserTouchpoints;
declare const userTouchpointsToFirestore: (userTouchpoints: HUserTouchpoints) => UserTouchpoints;
declare const bookingAppSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    full_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pax: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    booking_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    flight_number: z.ZodOptional<z.ZodString>;
    departure_location: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
    status: z.ZodNullable<z.ZodOptional<z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>>>;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
        action: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    }, {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    }>;
    communication_options: z.ZodObject<{
        should_send_message: z.ZodBoolean;
        channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }, {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    }>;
    is_processed_for_esim_restoration: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    is_pseudonymized: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodArray<z.ZodObject<{
        destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
        iso3: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        bundle_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>, "many">;
    departure_date: z.ZodEffects<z.ZodDate, Date, Date>;
    return_date: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    financial_insights: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        partner_commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        total_commission_amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }, {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    }>>>;
    promo_codes: z.ZodArray<z.ZodString, "many">;
    users: z.ZodArray<z.ZodString, "many">;
    esims: z.ZodArray<z.ZodString, "many">;
    hubby_foreign_identifiers: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        messaging_contact_id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        messaging_contact_id: string | null;
    }, {
        messaging_contact_id: string | null;
    }>>>;
    custom_branding: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    package_specifications: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }[];
    departure_date: Date;
    return_date: Date;
    promo_codes: string[];
    users: string[];
    esims: string[];
    id?: string | undefined;
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    custom_branding?: string | null | undefined;
    status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED" | null | undefined;
    external_id?: string | null | undefined;
    title?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | undefined;
    departure_location?: string | undefined;
    brand?: string | null | undefined;
    sent_messages?: Record<string, any> | undefined;
    is_processed_for_esim_restoration?: boolean | null | undefined;
    is_pseudonymized?: boolean | null | undefined;
    import_id?: string | null | undefined;
    financial_insights?: {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    } | null | undefined;
    hubby_foreign_identifiers?: {
        messaging_contact_id: string | null;
    } | null | undefined;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
        action?: string | null | undefined;
    };
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    package_specifications: {
        destination?: string | string[] | undefined;
        iso3?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        bundle_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }[];
    departure_date: Date;
    return_date: Date;
    promo_codes: string[];
    users: string[];
    esims: string[];
    id?: string | undefined;
    email?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    custom_branding?: string | null | undefined;
    status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED" | null | undefined;
    external_id?: string | null | undefined;
    title?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | undefined;
    departure_location?: string | undefined;
    brand?: string | null | undefined;
    sent_messages?: Record<string, any> | undefined;
    is_processed_for_esim_restoration?: boolean | null | undefined;
    is_pseudonymized?: boolean | null | undefined;
    import_id?: string | null | undefined;
    financial_insights?: {
        partner_commission_percentage?: number | null | undefined;
        total_commission_amount?: number | null | undefined;
        price?: number | null | undefined;
    } | null | undefined;
    hubby_foreign_identifiers?: {
        messaging_contact_id: string | null;
    } | null | undefined;
}>;
declare const partnerAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        office_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    }>;
    address: z.ZodObject<{
        street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }, {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    }>;
    registration: z.ZodObject<{
        chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }, {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    }>;
    banking_details: z.ZodObject<{
        account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        billing_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        commission_percentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        last_invoice: z.ZodEffects<z.ZodDate, Date, Date>;
        pricing_strategies: z.ZodObject<{
            partner: z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            }>;
            user: z.ZodObject<{
                lifetime_discount_percentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                modification_percentage: z.ZodNumber;
                default_price_list: z.ZodString;
                custom_prices: z.ZodArray<z.ZodObject<{
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limited", "time-limited"]>;
                    price: z.ZodNumber;
                    package: z.ZodString;
                }, z.UnknownKeysParam, z.ZodTypeAny, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
        [x: string]: any;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    platform_settings: z.ZodObject<{
        package_strategy: z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }, {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        }>;
        free_esim: z.ZodObject<{
            enabled: z.ZodBoolean;
            package_specification: z.ZodObject<{
                size: z.ZodString;
                package_type: z.ZodString;
                destination: z.ZodString;
                package_duration: z.ZodNumber;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }, {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            }>;
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
            total_allowance: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>;
        booking_defaults: z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"]>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        }>;
        booking_confirmation: z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>;
        schedules: z.ZodArray<z.ZodObject<{
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
            moment: z.ZodEnum<["departure_date", "return_date", "immediate"]>;
            filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
            }>>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }, {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }>, "many">;
        agent_signup_settings: z.ZodObject<{
            slack_channel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            welcome_email_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            password_reset_template: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            partner_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["wholesale", "reseller", "platform", "agent"]>>>;
            enable_complimentary_booking: z.ZodDefault<z.ZodBoolean>;
            complimentary_booking_partner_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_sales_agent: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
            visual_identity_options: z.ZodDefault<z.ZodObject<{
                hubby_branding: z.ZodDefault<z.ZodBoolean>;
                source_partner_branding: z.ZodDefault<z.ZodBoolean>;
                own_branding: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            }, {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            }>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        }, {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        }>;
        brevo: z.ZodObject<{
            list_ids: z.ZodArray<z.ZodNumber, "many">;
            campaign_mode: z.ZodBoolean;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            list_ids: number[];
            campaign_mode: boolean;
        }, {
            list_ids: number[];
            campaign_mode: boolean;
        }>;
        upgrade_offer: z.ZodObject<{
            enabled: z.ZodBoolean;
            discount_percentage: z.ZodNumber;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            enabled: boolean;
            discount_percentage: number;
        }, {
            enabled: boolean;
            discount_percentage: number;
        }>;
        emit_events: z.ZodObject<{
            topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        }, {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        }>;
        visual_identity_options: z.ZodObject<{
            hubby_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            source_partner_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            own_branding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        }, {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        }>;
        account_manager: z.ZodString;
        sales_partner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        external_sales_partner_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }, {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodEffects<z.ZodDate, Date, Date>;
        updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
        created_by: z.ZodString;
        updated_by: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }, {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
    tag_slugs: z.ZodArray<z.ZodString, "many">;
    tag_references: z.ZodArray<z.ZodString, "many">;
    data: z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>;
    webhook_settings: z.ZodObject<{
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        api_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        events: z.ZodDefault<z.ZodObject<{
            promocode_redemption: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            promocode_redemption: boolean;
        }, {
            promocode_redemption?: boolean | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    }, {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            enable_complimentary_booking: boolean;
            is_sales_agent: boolean | null;
            visual_identity_options: {
                hubby_branding: boolean;
                source_partner_branding: boolean;
                own_branding: boolean;
            };
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
        };
        visual_identity_options: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    data: {
        source: string;
        manual: boolean;
    };
    users: string[];
    contact: {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
        office_email?: string | null | undefined;
    };
    address: {
        country?: string | null | undefined;
        street?: string | null | undefined;
        city?: string | null | undefined;
        postal_code?: string | null | undefined;
    };
    registration: {
        chamber_of_commerce_number?: string | null | undefined;
        vat_number?: string | null | undefined;
        anvr_number?: number | null | undefined;
        tax_number?: string | null | undefined;
    };
    banking_details: {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        billing_email?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice" | "not-to-invoice" | "only-pay-out-commission";
        requires_card: boolean | null;
        next_invoice: Date;
        last_invoice: Date;
        pricing_strategies: {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    price: number;
                    package: string;
                    label: string;
                }[];
                lifetime_discount_percentage?: number | null | undefined;
            };
        };
        commission_fee?: number | null | undefined;
        commission_percentage?: number | null | undefined;
    };
    visual_identity: {
        [x: string]: any;
    };
    platform_settings: {
        package_strategy: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
        };
        free_esim: {
            package_specification: {
                destination: string;
                size: string;
                package_duration: number;
                package_type: string;
                type?: string | null | undefined;
            };
            enabled: boolean;
            allowance: number;
            total_allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        };
        booking_defaults: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "fr-CA" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK" | "ko-KR" | "hu-HU";
        };
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        };
        schedules: {
            key: string;
            method: "email" | "push" | "sms" | "whatsapp";
            days: number;
            hour: number;
            moment: "departure_date" | "return_date" | "immediate";
            email?: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null | undefined;
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
        }[];
        agent_signup_settings: {
            slack_channel?: string | null | undefined;
            welcome_email_template?: number | null | undefined;
            password_reset_template?: number | null | undefined;
            partner_type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
            enable_complimentary_booking?: boolean | undefined;
            complimentary_booking_partner_id?: string | null | undefined;
            is_sales_agent?: boolean | null | undefined;
            visual_identity_options?: {
                hubby_branding?: boolean | undefined;
                source_partner_branding?: boolean | undefined;
                own_branding?: boolean | undefined;
            } | undefined;
        };
        visual_identity_options: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        };
        brevo: {
            list_ids: number[];
            campaign_mode: boolean;
        };
        upgrade_offer: {
            enabled: boolean;
            discount_percentage: number;
        };
        emit_events: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
        };
        account_manager: string;
        sales_partner?: string | null | undefined;
        external_sales_partner_manager?: string | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        type?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    tag_slugs: string[];
    tag_references: string[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
    type?: "platform" | "wholesale" | "reseller" | "agent" | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const destinationAppSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    iso3s: z.ZodArray<z.ZodString, "many">;
    name: z.ZodString;
    i18n_name: z.ZodRecord<z.ZodString, z.ZodString>;
    is_active: z.ZodBoolean;
    sort_order: z.ZodNumber;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    is_active: boolean;
    i18n_name: Record<string, string>;
    iso3s: string[];
    sort_order: number;
    tier?: number | null | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    is_active: boolean;
    i18n_name: Record<string, string>;
    iso3s: string[];
    sort_order: number;
    tier?: number | null | undefined;
}>;
declare const destinationBundleAppSchema: z.ZodObject<{
    id: z.ZodString;
    parent_document_id: z.ZodString;
    type: z.ZodEnum<["unlimited", "data-limited", "time-limited", "starter"]>;
    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    provider: z.ZodEnum<["telna", "bondio"]>;
    duration_in_days: z.ZodNumber;
    duration_in_seconds: z.ZodNumber;
    size_in_bytes: z.ZodNumber;
    size_in_megabytes: z.ZodNumber;
    size_in_gigabytes: z.ZodNumber;
    package_template: z.ZodString;
    partner: z.ZodString;
    traffic_policy: z.ZodString;
    throttling: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    b2c_price: z.ZodNumber;
    b2b_price: z.ZodNumber;
    partner_b2c_price: z.ZodRecord<z.ZodString, z.ZodNumber>;
    partner_b2b_price: z.ZodRecord<z.ZodString, z.ZodNumber>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    is_visible: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    deleted_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    deleted_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "data-limited" | "time-limited" | "starter" | "unlimited";
    is_active: boolean;
    traffic_policy: string;
    provider: "telna" | "bondio";
    priority: number;
    parent_document_id: string;
    duration_in_days: number;
    duration_in_seconds: number;
    size_in_bytes: number;
    size_in_megabytes: number;
    size_in_gigabytes: number;
    package_template: string;
    b2c_price: number;
    b2b_price: number;
    partner_b2c_price: Record<string, number>;
    partner_b2b_price: Record<string, number>;
    is_visible: boolean;
    deleted_at: Date;
    deleted_by: string | null;
    label?: string | null | undefined;
    throttling?: number | null | undefined;
}, {
    id: string;
    partner: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: "data-limited" | "time-limited" | "starter" | "unlimited";
    traffic_policy: string;
    provider: "telna" | "bondio";
    parent_document_id: string;
    duration_in_days: number;
    duration_in_seconds: number;
    size_in_bytes: number;
    size_in_megabytes: number;
    size_in_gigabytes: number;
    package_template: string;
    b2c_price: number;
    b2b_price: number;
    partner_b2c_price: Record<string, number>;
    partner_b2b_price: Record<string, number>;
    deleted_at: Date;
    deleted_by: string | null;
    is_active?: boolean | undefined;
    label?: string | null | undefined;
    priority?: number | undefined;
    throttling?: number | null | undefined;
    is_visible?: boolean | undefined;
}>;
declare const packageTemplateAppSchema: z.ZodObject<{
    id: z.ZodString;
    provider: z.ZodString;
    type: z.ZodString;
    purchase_price: z.ZodNumber;
    external_id: z.ZodString;
    supported_countries: z.ZodArray<z.ZodString, "many">;
    provider_specific_data: z.ZodRecord<z.ZodString, z.ZodAny>;
    size_in_gigabytes: z.ZodNumber;
    tier: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    external_id: string;
    provider: string;
    size_in_gigabytes: number;
    purchase_price: number;
    supported_countries: string[];
    provider_specific_data: Record<string, any>;
    tier?: number | null | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    type: string;
    external_id: string;
    provider: string;
    size_in_gigabytes: number;
    purchase_price: number;
    supported_countries: string[];
    provider_specific_data: Record<string, any>;
    tier?: number | null | undefined;
}>;
declare const promoPackageSpecificationAppSchema: z.ZodObject<{
    destination: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodArray<z.ZodString, "many">]>;
    iso3: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    bundle_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}, {
    destination?: string | string[] | undefined;
    iso3?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    bundle_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}>;
type SupportedLocales = typeof SUPPORTED_LOCALES$1[number];
declare const SUPPORTED_LOCALES: readonly ["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "fr-CA", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK", "ko-KR", "hu-HU"];

export { API_LOG_COLLECTION, Address, AddressSchema, Analytics, AnalyticsSchema, ApiLog, ApiLogApiRequest, ApiLogApiResponse, ApiLogSchema, BOOKING_COLLECTION, BankingDetails, BankingDetailsSchema, BaseReward, BaseRewardSchema, BondioPackage, BondioPackageSchema, Booking, BookingApiRequest, BookingApiResponse, BookingSchema, BookingStatus, BookingStatusSchema, COUNTRY_COLLECTION, CURRENCY_COLLECTION, CommunicationChannel, CommunicationChannelSchema, CommunicationOptions, CommunicationOptionsSchema, Country, CountrySchema, Currency, CurrencySchema, DESTINATION_COLLECTION, DESTINATION_OFFER_COLLECTION, Destination, DestinationBundle, DestinationBundleSchema, DestinationSchema, ESIM, ESIMSchema, ESIM_COLLECTION, FirebaseService, HAddress, HAddressSchema, HAnalytics, HAnalyticsSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBaseReward, HBaseRewardSchema, HBondioPackage, HBondioPackageSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HDestination, HDestinationBundle, HDestinationBundleSchema, HDestinationSchema, HESIM, HESIMSchema, HFinancialProperties, HFinancialPropertiesSchema, HFreeEsimSchema, HHubbyModel, HJobStatus, HJobStatusSchema, HLiveActivity, HLiveActivitySchema, HLoginRequest, HLoginRequestSchema, HMessage, HMessageSchema, HPackage, HPackagePriceSchema, HPackageSchema, HPackageTemplate, HPackageTemplateSchema, HPartner, HPartnerAppSchema, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPermission, HPermissionSchema, HPlatformSettingsSchema, HPriceList, HPriceListSchema, HPricingStrategySchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HReview, HReviewSchema, HReviewSubmission, HReviewSubmissionSchema, HRewardMultipliers, HRewardMultipliersSchema, HRewardPackageType, HRewardPackageTypeSchema, HRewardStrategy, HRewardStrategySchema, HRole, HRoleSchema, HScheduleFilter, HScheduleFilterSchema, HScheduledJob, HScheduledJobSchema, HTag, HTagSchema, HTelnaPackage, HTelnaPackageSchema, HTrafficPolicy, HTrafficPolicySchema, HUser, HUserSchema, HUserTouchpoints, HUserTouchpointsSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, HVisualIdentityBannersSchema, HVisualIdentitySchema, HubbyModel, HubbyModelApp, HubbyModelFirestore, HubbyModelSchema, JobStatus, JobStatusSchema, LIVE_ACTIVITY_COLLECTION, LastUpdate, LiveActivity, LiveActivityEvent, LiveActivityReason, LiveActivitySchema, LiveActivityStatus, LoginRequest, LoginRequestSchema, MESSAGE_COLLECTION, Message, MessageSchema, PACKAGE_COLLECTION, PARTNER_COLLECTION, PAYMENT_COLLECTION, PERMISSION_COLLECTION, PRICE_LIST_COLLECTION, PROFILE_COLLECTION, PROMO_CODE_COLLECTION, Package, PackagePrice, PackagePriceSchema, PackageSchema, PackageSpecification, PackageTemplate, PackageTemplateSchema, Partner, PartnerApiRequest, PartnerApiResponse, PartnerContact, PartnerContactSchema, PartnerData, PartnerDataSchema, PartnerPackageSpecification, PartnerPackageSpecificationSchema, PartnerSchema, Payment, PaymentSchema, PlatformSettings, PlatformSettingsSchema, PriceList, PriceListApiRequest, PriceListApiResponse, PriceListSchema, PromoCode, PromoCodeSchema, PromoPackageSpecificationSchema, REVIEW_COLLECTION, REVIEW_SUBMISSION_COLLECTION, ROLE_COLLECTION, Registration, RegistrationSchema, Review, ReviewSchema, ReviewSubmission, ReviewSubmissionSchema, RewardMultipliers, RewardMultipliersSchema, RewardPackageType, RewardPackageTypeSchema, RewardStrategy, RewardStrategySchema, SCHEDULED_JOB_COLLECTION, SUPPORTED_LOCALES, Schedule, ScheduleFilter, ScheduleFilterSchema, ScheduleSchema, ScheduledJob, ScheduledJobSchema, SupportedLocales, TAG_COLLECTION, TRAFFIC_POLICY_COLLECTION, Tag, TagSchema, TelnaPackage, TelnaPackageSchema, TrafficPolicy, TrafficPolicySchema, USER_COLLECTION, USER_TOUCHPOINTS_COLLECTION, User, UserFirestore, UserFirestoreSchema, UserSchema, UserTouchpoints, UserTouchpointsSchema, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerSchema, VisualIdentityBannerStrategy, VisualIdentityBanners, VisualIdentityBannersSchema, VisualIdentitySchema, analyticsSpec, apiLogSchemaSpec, bookingAppSchema, bookingSchemaSpec, countrySchemaSpec, createConvertFirestoreToJS, createConvertJSToFirestore, createFirebaseService, createModelConverters, currencySchemaSpec, destinationAppSchema, destinationBundleAppSchema, destinationBundleSchemaSpec, destinationSchemaSpec, esimSchemaSpec, jobStatusSchema, lastUpdateSchema, liveActivityEventSchema, liveActivityReasonSchema, liveActivitySchemaSpec, liveActivityStatusSchema, loginRequestSchemaSpec, messageSchemaSpec, packageSchemaSpec, packageTemplateAppSchema, packageTemplateSchemaSpec, partnerAppSchema, partnerFromFirestore, partnerSchemaSpec, partnerToFirestore, paymentSchemaSpec, priceListFromFirestore, priceListSchemaSpec, priceListToFirestore, promoCodeFromFirestore, promoCodeSchemaSpec, promoCodeToFirestore, promoPackageSpecificationAppSchema, reviewSchemaSpec, reviewSubmissionSchemaSpec, scheduledJobSchemaSpec, tagSchemaSpec, userFromFirestore, userSchemaSpec, userToFirestore, userTouchpointsFromFirestore, userTouchpointsSchemaSpec, userTouchpointsToFirestore };
