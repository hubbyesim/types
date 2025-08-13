import { z } from 'zod';
import { Firestore, Timestamp, DocumentReference } from 'firebase-admin/firestore';

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
    type: z.ZodNullable<z.ZodEnum<{
        "data-limited": "data-limited";
        "time-limited": "time-limited";
        starter: "starter";
    }>>;
    throttling: z.ZodOptional<z.ZodNumber>;
    provider_parameters: z.ZodNullable<z.ZodObject<{
        imsi: z.ZodNumber;
    }, z.core.$strip>>;
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
            countries: z.ZodNullable<z.ZodArray<z.ZodString>>;
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
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: {
        _type: "object";
        of: {
            email: z.ZodNullable<z.ZodString>;
            office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
            bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
        payment_method: z.ZodEnum<{
            direct: "direct";
            invoice: "invoice";
        }>;
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
                        strategy: z.ZodEnum<{
                            split: "split";
                            bundle: "bundle";
                        }>;
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
                                    type: z.ZodEnum<{
                                        "data-limited": "data-limited";
                                        "time-limited": "time-limited";
                                    }>;
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
                                    type: z.ZodEnum<{
                                        "data-limited": "data-limited";
                                        "time-limited": "time-limited";
                                    }>;
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
        of: {
            primary_color: z.ZodString;
            secondary_color: z.ZodString;
            logo: z.ZodString;
            font: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            top_banner: z.ZodOptional<z.ZodObject<{
                strategy: z.ZodEnum<{
                    fixed: "fixed";
                    destination: "destination";
                    rotating: "rotating";
                    time_of_day: "time_of_day";
                }>;
                banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
                }, z.core.$strip>>>>;
            }, z.core.$strip>>;
            mid_banner: z.ZodOptional<z.ZodObject<{
                strategy: z.ZodEnum<{
                    fixed: "fixed";
                    destination: "destination";
                    rotating: "rotating";
                    time_of_day: "time_of_day";
                }>;
                banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
                }, z.core.$strip>>>>;
            }, z.core.$strip>>;
        };
        nullable: boolean;
    };
    platform_settings: {
        _type: "object";
        of: {
            package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                name: z.ZodString;
                iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString>>;
                parameters: z.ZodAny;
                supported_package_types: z.ZodOptional<z.ZodEnum<{
                    "data-limited": "data-limited";
                    unlimited: "unlimited";
                }>>;
            }, z.core.$strip>>>;
            free_esim: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                enabled: z.ZodBoolean;
                package_specification: z.ZodObject<{
                    size: z.ZodString;
                    type: z.ZodString;
                    destination: z.ZodString;
                }, z.core.$strip>;
                booking_id_verification: z.ZodDefault<z.ZodBoolean>;
                booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                allowance: z.ZodNumber;
            }, z.core.$strip>>>;
            booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
            }, z.core.$strip>>>;
            booking_confirmation: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                brevo_template_id: z.ZodNumber;
                send_booking_confirmation: z.ZodBoolean;
            }, z.core.$strip>>>;
            emit_events: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                topup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                redemption: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                activation: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
                depletion: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            schedules: z.ZodOptional<z.ZodArray<z.ZodObject<{
                days: z.ZodNumber;
                email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    brevo_template_id: z.ZodNumber;
                    subject: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    preview_text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                }, z.core.$strip>>>;
                push: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                    target: z.ZodString;
                }, z.core.$strip>>>;
                hour: z.ZodNumber;
                key: z.ZodString;
                method: z.ZodEnum<{
                    email: "email";
                    push: "push";
                    sms: "sms";
                    whatsapp: "whatsapp";
                }>;
                moment: z.ZodEnum<{
                    departure_date: "departure_date";
                    return_date: "return_date";
                    immediate: "immediate";
                }>;
                filter: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
                }, z.core.$strip>>>;
            }, z.core.$strip>>>;
            review_settings: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                enabled: z.ZodOptional<z.ZodBoolean>;
                question: z.ZodOptional<z.ZodString>;
                size: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
        };
        nullable: boolean;
    };
    tags: {
        _type: "array";
        of: {
            slug: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
            }, z.core.$strip>>;
        };
        nullable: boolean;
        optional: boolean;
    };
};

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

declare const UserSchema: any;
declare const UserFirestoreSchema: any;
declare const BookingSchema: any;
declare const CountrySchema: any;
declare const CurrencySchema: any;
declare const ESIMSchema: any;
declare const PaymentSchema: any;
declare const MessageSchema: any;
declare const PackageSchema: any;
declare const PromoCodeSchema: any;
declare const PartnerSchema: any;
declare const PriceListSchema: any;
declare const ApiLogSchema: any;
declare const VisualIdentitySchema: any;
declare const PackagePriceSchema: any;
declare const PlatformSettingsSchema: any;
declare const ScheduleSchema: any;
declare const AnalyticsSchema: any;
declare const TagSchema: any;
declare const TelnaPackageSchema: any;
declare const BondioPackageSchema: any;
declare const TrafficPolicySchema: any;
declare const AddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const RegistrationSchema: z.ZodObject<{
    chamber_of_commerce_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vat_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    anvr_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    tax_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const BankingDetailsSchema: z.ZodObject<{
    account_holder: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const PartnerPackageSpecificationSchema: z.ZodObject<{
    size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    destination: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const PromoPackageSpecificationSchema: z.ZodObject<{
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
declare const VisualIdentityBannerSchema: z.ZodObject<{
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
declare const ScheduleFilterSchema: z.ZodObject<{
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
declare const PartnerContactSchema: z.ZodObject<{
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const PartnerDataSchema: z.ZodObject<{
    source: z.ZodString;
    manual: z.ZodBoolean;
}, z.core.$strip>;
declare const CommunicationChannelSchema: z.ZodEnum<{
    EMAIL: "EMAIL";
    WHATSAPP: "WHATSAPP";
    PUSH_NOTIFICATION: "PUSH_NOTIFICATION";
    SMS: "SMS";
}>;
declare const BookingStatusSchema: z.ZodEnum<{
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
    UNPAID: "UNPAID";
    EXPIRED: "EXPIRED";
}>;
declare const CommunicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<{
        EMAIL: "EMAIL";
        WHATSAPP: "WHATSAPP";
        PUSH_NOTIFICATION: "PUSH_NOTIFICATION";
        SMS: "SMS";
    }>>;
}, z.core.$strip>;
declare const VisualIdentityBannersSchema: z.ZodObject<{
    strategy: z.ZodEnum<{
        fixed: "fixed";
        destination: "destination";
        rotating: "rotating";
        time_of_day: "time_of_day";
    }>;
    banners: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>>>;
}, z.core.$strip>;
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
declare const partnerAppSchema: any;

export { Address, AddressSchema, Analytics, AnalyticsSchema, ApiLog, ApiLogApiRequest, ApiLogApiResponse, ApiLogSchema, BankingDetails, BankingDetailsSchema, BondioPackage, BondioPackageSchema, Booking, BookingApiRequest, BookingApiResponse, BookingSchema, BookingStatus, BookingStatusSchema, CommunicationChannel, CommunicationChannelSchema, CommunicationOptions, CommunicationOptionsSchema, Country, CountrySchema, Currency, CurrencySchema, ESIM, ESIMSchema, FirebaseService, HAddress, HAddressSchema, HAnalytics, HAnalyticsSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBondioPackage, HBondioPackageSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HESIM, HESIMSchema, HFinancialProperties, HFinancialPropertiesSchema, HFreeEsimSchema, HHubbyModel, HMessage, HMessageSchema, HPackage, HPackagePriceSchema, HPackageSchema, HPartner, HPartnerAppSchema, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPermission, HPermissionSchema, HPlatformSettingsSchema, HPriceList, HPriceListSchema, HPricingStrategySchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HRole, HRoleSchema, HScheduleFilter, HScheduleFilterSchema, HTag, HTagSchema, HTelnaPackage, HTelnaPackageSchema, HTrafficPolicy, HTrafficPolicySchema, HUser, HUserSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, HVisualIdentitySchema, HubbyModel, HubbyModelApp, HubbyModelFirestore, HubbyModelSchema, Message, MessageSchema, Package, PackagePrice, PackagePriceSchema, PackageSchema, PackageSpecification, Partner, PartnerApiRequest, PartnerApiResponse, PartnerContact, PartnerContactSchema, PartnerData, PartnerDataSchema, PartnerPackageSpecification, PartnerPackageSpecificationSchema, PartnerSchema, Payment, PaymentSchema, PlatformSettings, PlatformSettingsSchema, PriceList, PriceListApiRequest, PriceListApiResponse, PriceListSchema, PromoCode, PromoCodeSchema, PromoPackageSpecificationSchema, Registration, RegistrationSchema, SUPPORTED_LOCALES, Schedule, ScheduleFilter, ScheduleFilterSchema, ScheduleSchema, SupportedLocales, Tag, TagSchema, TelnaPackage, TelnaPackageSchema, TrafficPolicy, TrafficPolicySchema, User, UserFirestore, UserFirestoreSchema, UserSchema, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerSchema, VisualIdentityBannerStrategy, VisualIdentityBanners, VisualIdentityBannersSchema, VisualIdentitySchema, analyticsSpec, createConvertFirestoreToJS, createConvertJSToFirestore, createFirebaseService, createModelConverters, packageSchemaSpec, partnerAppSchema, partnerFromFirestore, partnerSchemaSpec, partnerToFirestore, priceListFromFirestore, priceListToFirestore, promoCodeFromFirestore, promoCodeToFirestore, userFromFirestore, userToFirestore };
