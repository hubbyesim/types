import { z } from 'zod';
import { Firestore, Timestamp, DocumentReference } from 'firebase-admin/firestore';
import { AppOptions } from 'firebase-admin/app';

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
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
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
            account_holder: z.ZodString;
            bank_name: z.ZodString;
            iban: z.ZodString;
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
        payment_method: z.ZodEnum<["invoice", "direct"]>;
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
        of: {
            primary_color: z.ZodString;
            secondary_color: z.ZodString;
            logo: z.ZodString;
            font: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }[] | null | undefined;
            }, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
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
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }[] | null | undefined;
            }, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }[] | null | undefined;
            }>>;
        };
        nullable: boolean;
    };
    platform_settings: {
        _type: "object";
        of: {
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
        };
        nullable: boolean;
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
};

declare const SUPPORTED_LOCALES$1: readonly ["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"];

declare const HUserSchema: z.ZodTypeAny;
declare const HBookingSchema: z.ZodTypeAny;
declare const HCountrySchema: z.ZodTypeAny;
declare const HCurrencySchema: z.ZodTypeAny;
declare const HESIMSchema: z.ZodTypeAny;
declare const HPaymentSchema: z.ZodTypeAny;
declare const HMessageSchema: z.ZodTypeAny;
declare const HPackageSchema: z.ZodTypeAny;
declare const HPromoCodeSchema: z.ZodTypeAny;
declare const HPartnerSchema: z.ZodTypeAny;
declare const HPriceListSchema: z.ZodTypeAny;
declare const HFinancialPropertiesSchema: z.ZodTypeAny;
declare const HApiLogSchema: z.ZodTypeAny;
declare const HPackagePriceSchema: z.ZodTypeAny;
declare const HubbyModelSchema$1: z.ZodTypeAny;
declare const HPartnerAppSchema: z.ZodTypeAny;
declare const HPlatformSettingsSchema: z.ZodTypeAny;
declare const HVisualIdentitySchema: z.ZodTypeAny;
declare const HPricingStrategySchema: z.ZodTypeAny;
declare const HFreeEsimSchema: z.ZodTypeAny;
declare const HAddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    country?: string | undefined;
    street?: string | undefined;
    city?: string | undefined;
    postal_code?: string | undefined;
}, {
    country?: string | undefined;
    street?: string | undefined;
    city?: string | undefined;
    postal_code?: string | undefined;
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
}>;
declare const HPartnerPackageSpecificationSchema: z.ZodObject<{
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
declare const HPromoPackageSpecificationSchema: z.ZodObject<{
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
declare const HVisualIdentityBannerSchema: z.ZodObject<{
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
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    office_phone?: string | null | undefined;
}, {
    email: string | null;
    office_phone?: string | null | undefined;
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
type HHubbyModel = z.infer<typeof HubbyModelSchema$1>;
type HubbyModelApp = HHubbyModel;

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

interface FirebaseConfig {
    credential?: AppOptions['credential'];
    projectId?: string;
    storageBucket?: string;
    databaseURL?: string;
    isTest?: boolean;
}
declare class FirebaseService {
    private app;
    private firestoreInstance;
    constructor(config?: FirebaseConfig);
    get firestore(): Firestore;
    static getDefaultInstance(): FirebaseService;
    static setDefaultInstance(instance: FirebaseService): void;
}
declare function createFirebaseService(config?: FirebaseConfig): FirebaseService;

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
declare const HubbyModelSchema: z.ZodTypeAny;
declare const VisualIdentitySchema: z.ZodTypeAny;
declare const PackagePriceSchema: z.ZodTypeAny;
declare const PlatformSettingsSchema: z.ZodTypeAny;
declare const ScheduleSchema: z.ZodTypeAny;
declare const AddressSchema: z.ZodObject<{
    street: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    country?: string | undefined;
    street?: string | undefined;
    city?: string | undefined;
    postal_code?: string | undefined;
}, {
    country?: string | undefined;
    street?: string | undefined;
    city?: string | undefined;
    postal_code?: string | undefined;
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
}>;
declare const PartnerPackageSpecificationSchema: z.ZodObject<{
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
declare const PromoPackageSpecificationSchema: z.ZodObject<{
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
declare const VisualIdentityBannerSchema: z.ZodObject<{
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
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    office_phone?: string | null | undefined;
}, {
    email: string | null;
    office_phone?: string | null | undefined;
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
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[] | null | undefined;
}, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[] | null | undefined;
}>;
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
type Schedule = z.infer<typeof ScheduleSchema>;
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
declare const partnerAppSchema: z.ZodTypeAny;
type SupportedLocales = typeof SUPPORTED_LOCALES$1[number];
declare const SUPPORTED_LOCALES: readonly ["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"];

export { Address, AddressSchema, ApiLog, ApiLogApiRequest, ApiLogApiResponse, ApiLogSchema, BankingDetails, BankingDetailsSchema, Booking, BookingApiRequest, BookingApiResponse, BookingSchema, BookingStatus, BookingStatusSchema, CommunicationChannel, CommunicationChannelSchema, CommunicationOptions, CommunicationOptionsSchema, Country, CountrySchema, Currency, CurrencySchema, ESIM, ESIMSchema, FirebaseService, HAddress, HAddressSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HESIM, HESIMSchema, HFinancialProperties, HFinancialPropertiesSchema, HFreeEsimSchema, HHubbyModel, HMessage, HMessageSchema, HPackage, HPackagePriceSchema, HPackageSchema, HPartner, HPartnerAppSchema, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPlatformSettingsSchema, HPriceList, HPriceListSchema, HPricingStrategySchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HScheduleFilter, HScheduleFilterSchema, HUser, HUserSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, HVisualIdentitySchema, HubbyModel, HubbyModelApp, HubbyModelFirestore, HubbyModelSchema, Message, MessageSchema, Package, PackagePrice, PackagePriceSchema, PackageSchema, PackageSpecification, Partner, PartnerApiRequest, PartnerApiResponse, PartnerContact, PartnerContactSchema, PartnerData, PartnerDataSchema, PartnerPackageSpecification, PartnerPackageSpecificationSchema, PartnerSchema, Payment, PaymentSchema, PlatformSettings, PlatformSettingsSchema, PriceList, PriceListApiRequest, PriceListApiResponse, PriceListSchema, PromoCode, PromoCodeSchema, PromoPackageSpecificationSchema, Registration, RegistrationSchema, SUPPORTED_LOCALES, Schedule, ScheduleFilter, ScheduleFilterSchema, ScheduleSchema, SupportedLocales, User, UserFirestore, UserFirestoreSchema, UserSchema, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerSchema, VisualIdentityBannerStrategy, VisualIdentityBanners, VisualIdentityBannersSchema, VisualIdentitySchema, createConvertFirestoreToJS, createConvertJSToFirestore, createFirebaseService, createModelConverters, partnerAppSchema, partnerFromFirestore, partnerSchemaSpec, partnerToFirestore, priceListFromFirestore, priceListToFirestore, promoCodeFromFirestore, promoCodeToFirestore, userFromFirestore, userToFirestore };
