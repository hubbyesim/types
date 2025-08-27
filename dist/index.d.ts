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
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited", "starter"]>>;
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
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                    properties: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }, {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }>, "many">>>;
            }, "strip", z.ZodTypeAny, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }[] | null | undefined;
            }, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
                    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                    properties: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }, {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }>, "many">>>;
            }, "strip", z.ZodTypeAny, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                    image_url: string;
                    alt: string;
                    click_url: string;
                    properties: Record<string, string>;
                }[] | null | undefined;
            }, {
                strategy: "destination" | "fixed" | "rotating" | "time_of_day";
                banners?: {
                    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
                booking_id_verification: z.ZodDefault<z.ZodBoolean>;
                booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                allowance: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                package_specification: {
                    type: string;
                    destination: string;
                    size: string;
                };
                enabled: boolean;
                booking_id_verification: boolean;
                allowance: number;
                booking_id_verification_pattern?: string | null | undefined;
            }, {
                package_specification: {
                    type: string;
                    destination: string;
                    size: string;
                };
                enabled: boolean;
                allowance: number;
                booking_id_verification?: boolean | undefined;
                booking_id_verification_pattern?: string | null | undefined;
            }>>>;
            booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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

declare const SUPPORTED_LOCALES$1: readonly ["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"];

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
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    receipt_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodEnum<["direct", "promo", "platform"]>>>;
    role: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    balance: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    profileRef: z.ZodString;
    review_requested: z.ZodEffects<z.ZodDate, Date, Date>;
    last_seen: z.ZodEffects<z.ZodDate, Date, Date>;
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
    profileRef: string;
    review_requested: Date;
    last_seen: Date;
    id?: string | null | undefined;
    stripe_id?: string | null | undefined;
    referral?: string | null | undefined;
    fcm?: string | undefined;
    deeplink?: string | null | undefined;
    gender?: string | null | undefined;
    company?: string | null | undefined;
    coordinates?: string | null | undefined;
    parameters?: any;
    locale?: string | null | undefined;
    phone_model?: string | null | undefined;
    phone_os?: string | null | undefined;
    phone_os_version?: string | null | undefined;
    ios?: boolean | null | undefined;
    has_card_saved?: boolean | null | undefined;
    admin?: boolean | null | undefined;
    currency?: string | null | undefined;
    receipt_email?: string | null | undefined;
    source?: "direct" | "promo" | "platform" | null | undefined;
    balance?: number | null | undefined;
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
    profileRef: string;
    review_requested: Date;
    last_seen: Date;
    id?: string | null | undefined;
    stripe_id?: string | null | undefined;
    referral?: string | null | undefined;
    fcm?: string | undefined;
    deeplink?: string | null | undefined;
    gender?: string | null | undefined;
    company?: string | null | undefined;
    coordinates?: string | null | undefined;
    parameters?: any;
    locale?: string | null | undefined;
    phone_model?: string | null | undefined;
    phone_os?: string | null | undefined;
    phone_os_version?: string | null | undefined;
    ios?: boolean | null | undefined;
    has_card_saved?: boolean | null | undefined;
    admin?: boolean | null | undefined;
    currency?: string | null | undefined;
    receipt_email?: string | null | undefined;
    source?: "direct" | "promo" | "platform" | null | undefined;
    balance?: number | null | undefined;
}>;
declare const HBookingSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    title: z.ZodNullable<z.ZodString>;
    first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    full_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pax: z.ZodNumber;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    booking_id: z.ZodNullable<z.ZodString>;
    flight_number: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "O"]>>;
    package_size: z.ZodOptional<z.ZodString>;
    sent_messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
    status: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]>;
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
    is_processed_for_esim_restoration: z.ZodBoolean;
    is_pseudonymized: z.ZodBoolean;
    import_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    package_specifications: z.ZodArray<z.ZodObject<{
        destination: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }>, "many">;
    departure_date: z.ZodEffects<z.ZodDate, Date, Date>;
    return_date: z.ZodEffects<z.ZodDate, Date, Date>;
    partner: z.ZodString;
    promo_codes: z.ZodArray<z.ZodString, "many">;
    users: z.ZodArray<z.ZodString, "many">;
    esims: z.ZodArray<z.ZodString, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    email: string | null;
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    partner: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    title: string | null;
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
    package_specifications: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
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
    gender?: "M" | "F" | "O" | undefined;
    external_id?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
}, {
    email: string | null;
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    partner: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    title: string | null;
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
    package_specifications: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
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
    gender?: "M" | "F" | "O" | undefined;
    external_id?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    flight_number?: string | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
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
    code: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    name: string;
    code: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
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
    data_used: z.ZodBoolean;
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
    country: z.ZodString;
    partner: z.ZodString;
    time_assigned: z.ZodEffects<z.ZodDate, Date, Date>;
    last_updated: z.ZodEffects<z.ZodDate, Date, Date>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    promo: string | null;
    partner: string;
    type: "promo" | "balance" | "code" | "api" | "external" | "payment";
    status: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
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
    coverage_label?: string | null | undefined;
}, {
    id: string;
    name: string;
    promo: string | null;
    partner: string;
    type: "promo" | "balance" | "code" | "api" | "external" | "payment";
    status: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
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
    coverage_label?: string | null | undefined;
}>;
declare const HPaymentSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodEffects<z.ZodDate, Date, Date>;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
    user: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    promo: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    iccid: string;
    user: string;
    amount: number;
    customer: string;
    date: Date;
    package: string;
    topup: boolean;
}, {
    id: string;
    promo: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    iccid: string;
    user: string;
    amount: number;
    customer: string;
    date: Date;
    package: string;
    topup: boolean;
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
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Date;
    updated_at: Date;
    key: string;
    method: "email" | "push" | "sms";
}, {
    id: string;
    status: "pending" | "sent" | "failed" | "delivered";
    created_at: Date;
    updated_at: Date;
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
    type: z.ZodNullable<z.ZodEnum<["data-limited", "time-limited", "starter"]>>;
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
    type: "data-limited" | "time-limited" | "starter" | null;
    is_active: boolean;
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    traffic_policy: string;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    country: string;
    label: string;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    price: number;
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
    type: "data-limited" | "time-limited" | "starter" | null;
    is_active: boolean;
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    traffic_policy: string;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    country: string;
    label: string;
    bytes: number;
    hidden: boolean;
    is_hidden: boolean;
    priority: number;
    price: number;
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
    external_id: z.ZodString;
    code: z.ZodString;
    allowance_user: z.ZodNumber;
    allowance_total: z.ZodNumber;
    type: z.ZodUnion<[z.ZodNullable<z.ZodEnum<["discount", "booking", "booking_without_destination"]>>, z.ZodString]>;
    usage: z.ZodArray<z.ZodString, "many">;
    uuid_usage: z.ZodArray<z.ZodString, "many">;
    package_specification: z.ZodOptional<z.ZodObject<{
        destination: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        package_id: z.ZodOptional<z.ZodString>;
        iata_code: z.ZodOptional<z.ZodString>;
        package_duration: z.ZodOptional<z.ZodNumber>;
        package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
        traffic_policy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
        package_duration?: number | undefined;
        package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
        traffic_policy?: string | undefined;
    }, {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
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
    code: string;
    type: string | null;
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    country: string;
    package: string;
    redeemed_at: Date;
    allowance_user: number;
    allowance_total: number;
    booking: string;
    usage: string[];
    uuid_usage: string[];
    valid_from: Date;
    valid_to: Date;
    package_size?: string | undefined;
    countries?: string[] | undefined;
    discount?: number | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
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
    code: string;
    type: string | null;
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    country: string;
    package: string;
    redeemed_at: Date;
    allowance_user: number;
    allowance_total: number;
    booking: string;
    usage: string[];
    uuid_usage: string[];
    valid_from: Date;
    valid_to: Date;
    package_size?: string | undefined;
    countries?: string[] | undefined;
    discount?: number | undefined;
    package_specification?: {
        destination?: string | undefined;
        size?: string | undefined;
        package_id?: string | undefined;
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
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
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
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
            user: z.ZodObject<{
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>;
    platform_settings: z.ZodObject<{
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
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>>>;
        booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    }, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
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
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
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
    package_prices: z.ZodArray<z.ZodObject<{
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limited", "time-limited"]>;
        price: z.ZodNumber;
        package: z.ZodString;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        type: "data-limited" | "time-limited";
        destination: string;
        package: string;
        label: string;
        price: number;
    }, {
        type: "data-limited" | "time-limited";
        destination: string;
        package: string;
        label: string;
        price: number;
    }>, "many">;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    name: string;
    partner: string;
    type: "partner" | "consumer";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    description: string | null;
    package_prices: {
        type: "data-limited" | "time-limited";
        destination: string;
        package: string;
        label: string;
        price: number;
    }[];
}, {
    id: string;
    name: string;
    partner: string;
    type: "partner" | "consumer";
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    description: string | null;
    package_prices: {
        type: "data-limited" | "time-limited";
        destination: string;
        package: string;
        label: string;
        price: number;
    }[];
}>;
declare const HFinancialPropertiesSchema: z.ZodObject<{
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
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
                package: string;
                label: string;
                price: number;
            }, {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }>, "many">;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        }, {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        }>;
        user: z.ZodObject<{
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
                package: string;
                label: string;
                price: number;
            }, {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }>, "many">;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        }, {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
    }, {
        partner: {
            strategy: "split" | "bundle";
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
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
                package: string;
                label: string;
                price: number;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
    };
    commission_fee?: number | null | undefined;
}, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
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
                package: string;
                label: string;
                price: number;
            }[];
        };
        user: {
            modification_percentage: number;
            default_price_list: string;
            custom_prices: {
                type: "data-limited" | "time-limited";
                destination: string;
                package: string;
                label: string;
                price: number;
            }[];
        };
    };
    commission_fee?: number | null | undefined;
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
    package: {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    };
    label: string;
    price: number;
}, {
    type: "data-limited" | "time-limited";
    destination: string;
    package: {
        _type: "docRef";
        collection: "/companies/hubby/packages";
    };
    label: string;
    price: number;
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
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
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
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
            user: z.ZodObject<{
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>;
    platform_settings: z.ZodObject<{
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
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>>>;
        booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    }, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
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
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
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
        booking_id_verification: z.ZodDefault<z.ZodBoolean>;
        booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        enabled: boolean;
        booking_id_verification: boolean;
        allowance: number;
        booking_id_verification_pattern?: string | null | undefined;
    }, {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        enabled: boolean;
        allowance: number;
        booking_id_verification?: boolean | undefined;
        booking_id_verification_pattern?: string | null | undefined;
    }>>>;
    booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    }, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
}, "strip", z.ZodTypeAny, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        enabled: boolean;
        booking_id_verification: boolean;
        allowance: number;
        booking_id_verification_pattern?: string | null | undefined;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    emit_events?: {
        topup: boolean;
        redemption: boolean;
        activation: boolean;
        depletion: boolean;
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
    visual_identity_options?: {
        hubby_branding: boolean;
        source_partner_branding: boolean;
        own_branding: boolean;
    } | null | undefined;
}, {
    package_strategy?: {
        name: string;
        parameters?: any;
        iso3_white_list?: string[] | undefined;
        supported_package_types?: "data-limited" | "unlimited" | undefined;
    } | null | undefined;
    free_esim?: {
        package_specification: {
            type: string;
            destination: string;
            size: string;
        };
        enabled: boolean;
        allowance: number;
        booking_id_verification?: boolean | undefined;
        booking_id_verification_pattern?: string | null | undefined;
    } | null | undefined;
    booking_defaults?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    } | null | undefined;
    booking_confirmation?: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null | undefined;
    emit_events?: {
        topup?: boolean | undefined;
        redemption?: boolean | undefined;
        activation?: boolean | undefined;
        depletion?: boolean | undefined;
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
    visual_identity_options?: {
        hubby_branding?: boolean | undefined;
        source_partner_branding?: boolean | undefined;
        own_branding?: boolean | undefined;
    } | null | undefined;
}>;
declare const HVisualIdentitySchema: z.ZodObject<{
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
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
            properties: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }, {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
            properties: z.ZodRecord<z.ZodString, z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    }, {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    font?: string | null | undefined;
    top_banner?: {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
    mid_banner?: {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    font?: string | null | undefined;
    top_banner?: {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
    mid_banner?: {
        strategy: "destination" | "fixed" | "rotating" | "time_of_day";
        banners?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[] | null | undefined;
    } | undefined;
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
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
        price: number;
    }, {
        type: "data-limited" | "time-limited";
        destination: string;
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
        price: number;
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
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
        price: number;
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
        package: {
            _type: "docRef";
            collection: "/companies/hubby/packages";
        };
        label: string;
        price: number;
    }[];
}>;
declare const HFreeEsimSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
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
    booking_id_verification: z.ZodDefault<z.ZodBoolean>;
    booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    allowance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    package_specification: {
        type: string;
        destination: string;
        size: string;
    };
    enabled: boolean;
    booking_id_verification: boolean;
    allowance: number;
    booking_id_verification_pattern?: string | null | undefined;
}, {
    package_specification: {
        type: string;
        destination: string;
        size: string;
    };
    enabled: boolean;
    allowance: number;
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
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    provider: string;
    description: string;
    id?: string | null | undefined;
}, {
    name: string;
    external_id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
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
    is_hidden: boolean;
    priority: number;
    price: number;
    days: number;
    iso: string;
    packageType: string;
}, {
    partner: string;
    is_active: boolean;
    size: string;
    traffic_policy: string;
    is_hidden: boolean;
    priority: number;
    price: number;
    days: number;
    iso: string;
    packageType: string;
}>;
declare const HBondioPackageSchema: z.ZodObject<{
    label: z.ZodEnum<["lambda", "tau"]>;
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
    label: "lambda" | "tau";
    is_hidden: boolean;
    priority: number;
    price: number;
    days: number;
    iso: string;
    packageType: string;
}, {
    partner: string;
    is_active: boolean;
    size: string;
    label: "lambda" | "tau";
    is_hidden: boolean;
    priority: number;
    price: number;
    days: number;
    iso: string;
    packageType: string;
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
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
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
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}>;
declare const HVisualIdentityBannerSchema: z.ZodObject<{
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
}, {
    email: string | null;
    name?: string | null | undefined;
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
    bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
    bank_name?: string | null | undefined;
    iban?: string | null | undefined;
}, {
    currency?: string | null | undefined;
    account_holder?: string | null | undefined;
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
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
    package_duration: z.ZodOptional<z.ZodNumber>;
    package_type: z.ZodOptional<z.ZodEnum<["data-limited", "time-limited", "starter", "unlimited"]>>;
    traffic_policy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}, {
    destination?: string | undefined;
    size?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
    package_duration?: number | undefined;
    package_type?: "data-limited" | "time-limited" | "starter" | "unlimited" | undefined;
    traffic_policy?: string | undefined;
}>;
declare const VisualIdentityBannerSchema: z.ZodObject<{
    image_url: z.ZodString;
    alt: z.ZodString;
    click_url: z.ZodString;
    locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
    image_url: string;
    alt: string;
    click_url: string;
    properties: Record<string, string>;
}, {
    locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodNullable<z.ZodString>;
    office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email: string | null;
    name?: string | null | undefined;
    office_phone?: string | null | undefined;
}, {
    email: string | null;
    name?: string | null | undefined;
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
        locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
        properties: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }, {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[] | null | undefined;
}, {
    strategy: "destination" | "fixed" | "rotating" | "time_of_day";
    banners?: {
        locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
declare const partnerAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodEffects<z.ZodDate, Date, Date>;
    updated_at: z.ZodEffects<z.ZodDate, Date, Date>;
    created_by: z.ZodNullable<z.ZodString>;
    updated_by: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    type: z.ZodNullable<z.ZodString>;
    is_active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    external_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodNullable<z.ZodString>;
        office_phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
    }, {
        email: string | null;
        name?: string | null | undefined;
        office_phone?: string | null | undefined;
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
        bank_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }, {
        currency?: string | null | undefined;
        account_holder?: string | null | undefined;
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    }>;
    parent: z.ZodString;
    users: z.ZodArray<z.ZodString, "many">;
    financial_properties: z.ZodObject<{
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
            user: z.ZodObject<{
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
                    package: string;
                    label: string;
                    price: number;
                }, {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }>, "many">;
            }, z.UnknownKeysParam, z.ZodTypeAny, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }, {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            }>;
        }, z.UnknownKeysParam, z.ZodTypeAny, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }, {
            partner: {
                strategy: "split" | "bundle";
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        }>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    }>;
    visual_identity: z.ZodObject<{
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
                locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
                properties: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }, {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }, {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        }>>;
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    }>;
    platform_settings: z.ZodObject<{
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
            booking_id_verification: z.ZodDefault<z.ZodBoolean>;
            booking_id_verification_pattern: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            allowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        }, {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        }>>>;
        booking_defaults: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        }, {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
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
    }, z.UnknownKeysParam, z.ZodTypeAny, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    }, {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    }>;
    tags: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
        description?: string | null | undefined;
        color?: string | null | undefined;
    }>, "many">;
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
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            booking_id_verification: boolean;
            allowance: number;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup: boolean;
            redemption: boolean;
            activation: boolean;
            depletion: boolean;
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
        visual_identity_options?: {
            hubby_branding: boolean;
            source_partner_branding: boolean;
            own_branding: boolean;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled: boolean;
        events: {
            promocode_redemption: boolean;
        };
        url?: string | null | undefined;
        api_key?: string | null | undefined;
    };
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    name: string;
    type: string | null;
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
        bank_name?: string | null | undefined;
        iban?: string | null | undefined;
    };
    parent: string;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
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
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
            user: {
                modification_percentage: number;
                default_price_list: string;
                custom_prices: {
                    type: "data-limited" | "time-limited";
                    destination: string;
                    package: string;
                    label: string;
                    price: number;
                }[];
            };
        };
        commission_fee?: number | null | undefined;
    };
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font?: string | null | undefined;
        top_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
        mid_banner?: {
            strategy: "destination" | "fixed" | "rotating" | "time_of_day";
            banners?: {
                locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[] | null | undefined;
        } | undefined;
    };
    platform_settings: {
        package_strategy?: {
            name: string;
            parameters?: any;
            iso3_white_list?: string[] | undefined;
            supported_package_types?: "data-limited" | "unlimited" | undefined;
        } | null | undefined;
        free_esim?: {
            package_specification: {
                type: string;
                destination: string;
                size: string;
            };
            enabled: boolean;
            allowance: number;
            booking_id_verification?: boolean | undefined;
            booking_id_verification_pattern?: string | null | undefined;
        } | null | undefined;
        booking_defaults?: {
            locale: "en-US" | "en-EU" | "en-GB" | "en-CA" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "sv-SE" | "sk-SK" | "de-BE" | "en-AU" | "da-DK";
        } | null | undefined;
        booking_confirmation?: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null | undefined;
        emit_events?: {
            topup?: boolean | undefined;
            redemption?: boolean | undefined;
            activation?: boolean | undefined;
            depletion?: boolean | undefined;
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
        visual_identity_options?: {
            hubby_branding?: boolean | undefined;
            source_partner_branding?: boolean | undefined;
            own_branding?: boolean | undefined;
        } | null | undefined;
    };
    tags: {
        name: string;
        created_at: Date;
        updated_at: Date;
        created_by: string;
        updated_by: string;
        slug: string;
        id?: string | null | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
    }[];
    webhook_settings: {
        enabled?: boolean | undefined;
        url?: string | null | undefined;
        api_key?: string | null | undefined;
        events?: {
            promocode_redemption?: boolean | undefined;
        } | undefined;
    };
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
type SupportedLocales = typeof SUPPORTED_LOCALES$1[number];
declare const SUPPORTED_LOCALES: readonly ["en-US", "en-EU", "en-GB", "en-CA", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "sv-SE", "sk-SK", "de-BE", "en-AU", "da-DK"];

export { Address, AddressSchema, Analytics, AnalyticsSchema, ApiLog, ApiLogApiRequest, ApiLogApiResponse, ApiLogSchema, BankingDetails, BankingDetailsSchema, BondioPackage, BondioPackageSchema, Booking, BookingApiRequest, BookingApiResponse, BookingSchema, BookingStatus, BookingStatusSchema, CommunicationChannel, CommunicationChannelSchema, CommunicationOptions, CommunicationOptionsSchema, Country, CountrySchema, Currency, CurrencySchema, ESIM, ESIMSchema, FirebaseService, HAddress, HAddressSchema, HAnalytics, HAnalyticsSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBondioPackage, HBondioPackageSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HESIM, HESIMSchema, HFinancialProperties, HFinancialPropertiesSchema, HFreeEsimSchema, HHubbyModel, HMessage, HMessageSchema, HPackage, HPackagePriceSchema, HPackageSchema, HPartner, HPartnerAppSchema, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPermission, HPermissionSchema, HPlatformSettingsSchema, HPriceList, HPriceListSchema, HPricingStrategySchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HRole, HRoleSchema, HScheduleFilter, HScheduleFilterSchema, HTag, HTagSchema, HTelnaPackage, HTelnaPackageSchema, HTrafficPolicy, HTrafficPolicySchema, HUser, HUserSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, HVisualIdentitySchema, HubbyModel, HubbyModelApp, HubbyModelFirestore, HubbyModelSchema, Message, MessageSchema, Package, PackagePrice, PackagePriceSchema, PackageSchema, PackageSpecification, Partner, PartnerApiRequest, PartnerApiResponse, PartnerContact, PartnerContactSchema, PartnerData, PartnerDataSchema, PartnerPackageSpecification, PartnerPackageSpecificationSchema, PartnerSchema, Payment, PaymentSchema, PlatformSettings, PlatformSettingsSchema, PriceList, PriceListApiRequest, PriceListApiResponse, PriceListSchema, PromoCode, PromoCodeSchema, PromoPackageSpecificationSchema, Registration, RegistrationSchema, SUPPORTED_LOCALES, Schedule, ScheduleFilter, ScheduleFilterSchema, ScheduleSchema, SupportedLocales, Tag, TagSchema, TelnaPackage, TelnaPackageSchema, TrafficPolicy, TrafficPolicySchema, User, UserFirestore, UserFirestoreSchema, UserSchema, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerSchema, VisualIdentityBannerStrategy, VisualIdentityBanners, VisualIdentityBannersSchema, VisualIdentitySchema, analyticsSpec, createConvertFirestoreToJS, createConvertJSToFirestore, createFirebaseService, createModelConverters, packageSchemaSpec, partnerAppSchema, partnerFromFirestore, partnerSchemaSpec, partnerToFirestore, priceListFromFirestore, priceListToFirestore, promoCodeFromFirestore, promoCodeToFirestore, userFromFirestore, userToFirestore };
