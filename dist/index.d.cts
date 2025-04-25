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
    return_date: string | null;
    departure_date: string;
    partner: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: string;
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
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
    return_date: string | null;
    departure_date: string;
    partner: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: string;
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
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
    return_date: z.ZodNullable<z.ZodDate>;
    departure_date: z.ZodDate;
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
    date_of_birth: z.ZodOptional<z.ZodDate>;
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
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    locale?: string | undefined;
    date_of_birth?: Date | undefined;
}, {
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
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    locale?: string | undefined;
    date_of_birth?: Date | undefined;
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
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
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
        commission_fee?: number | undefined;
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
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | undefined;
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
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
        commission_fee?: number | undefined;
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
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    is_active?: boolean | null | undefined;
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
    platform_settings?: any;
    visual_identity?: any;
}, {
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
        commission_fee?: number | undefined;
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
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    is_active?: boolean | null | undefined;
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
    platform_settings?: any;
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
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
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
        commission_fee?: number | undefined;
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
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | undefined;
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
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
        commission_fee?: number | undefined;
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
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    is_active?: boolean | null | undefined;
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
    platform_settings?: any;
    visual_identity?: any;
}, {
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
        commission_fee?: number | undefined;
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
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    is_active?: boolean | null | undefined;
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
    platform_settings?: any;
    visual_identity?: any;
}>;
type PackageSpecification = z.infer<typeof packageSpecificationSchema>;
type PackageSpecifications = z.infer<typeof packageSpecificationsSchema>;
type BookingApiRequest = z.infer<typeof bookingApiRequestSchema>;
type BookingApiResponse = z.infer<typeof bookingApiResponseSchema>;
type PromoCodeApiResponse = z.infer<typeof promoCodeApiResponseSchema>;
type PartnerApiRequest = z.infer<typeof partnerApiRequestSchema>;
type PartnerApiResponse = z.infer<typeof partnerApiResponseSchema>;

/**
 * FirestoreProvider interface
 *
 * This interface defines the required methods and objects needed from Firestore
 * to allow the shared types package to work without directly depending on firebase or firebase-admin.
 *
 * Implementation can be provided by either:
 * - firebase (client SDK)
 * - firebase-admin (server SDK)
 */
interface FirestoreProvider {
    Timestamp: {
        fromDate(date: Date): any;
        now(): any;
    };
    FieldValue: {
        serverTimestamp(): any;
        increment(n: number): any;
    };
    doc(path: string): any;
    collection(path: string): any;
}
interface TimestampLike {
    toDate(): Date;
    seconds: number;
    nanoseconds: number;
    isEqual?(other: TimestampLike): boolean;
}
interface FieldValueLike {
    isEqual?(other: FieldValueLike): boolean;
}
interface DocumentReferenceLike {
    id: string;
    path: string;
}
declare function isTimestamp(value: any): value is TimestampLike;
declare function isDocumentReference(value: any): value is DocumentReferenceLike;
declare function isFieldValue(value: any): value is FieldValueLike;

interface GenericRefFieldMapping<AppType, FirestoreType> {
    app: keyof AppType;
    firestore: keyof FirestoreType;
    collection: string;
    nullable?: boolean;
    isArray?: boolean;
}
interface GenericDateFieldMapping<AppType, FirestoreType> {
    field: keyof FirestoreType & keyof AppType;
    nullable?: boolean;
}
declare const convertToDate: (value: unknown) => Date;
declare const isDate: (value: unknown) => value is Date;
declare function genericToFirestore<AppType extends Record<string, any>, FirestoreType extends Record<string, any>>({ appObject, refFieldMappings, dateFieldMappings, specialCaseHandler, firestore }: {
    appObject: AppType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, appData: AppType) => void;
    firestore?: FirestoreProvider;
}): FirestoreType;
declare function genericFromFirestore<FirestoreType extends Record<string, any>, AppType extends Record<string, any>>({ firestoreObject, refFieldMappings, dateFieldMappings, specialCaseHandler, firestore }: {
    firestoreObject: FirestoreType;
    refFieldMappings: GenericRefFieldMapping<AppType, FirestoreType>[];
    dateFieldMappings: GenericDateFieldMapping<AppType, FirestoreType>[];
    specialCaseHandler?: (result: Record<string, any>, firestoreData: FirestoreType) => void;
    firestore?: FirestoreProvider;
}): AppType;

declare const apiLogFirestoreSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    status_code: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    method: string;
    timestamp: TimestampLike;
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
    timestamp: TimestampLike;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}>;
declare const apiLogAppSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    path: z.ZodString;
    resource_type: z.ZodOptional<z.ZodString>;
    resource_id: z.ZodOptional<z.ZodString>;
    partner_id: z.ZodOptional<z.ZodString>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodDate;
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
    timestamp: Date;
    status_code: number;
    id?: string | undefined;
    user_id?: string | undefined;
    resource_type?: string | undefined;
    resource_id?: string | undefined;
    partner_id?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}>;
type ApiLogFirestore = z.infer<typeof apiLogFirestoreSchema>;
type ApiLogApp = z.infer<typeof apiLogAppSchema>;
declare const apiLogToFirestore: (apiLog: ApiLogApp) => ApiLogFirestore;
declare const apiLogFromFirestore: (firestoreApiLog: ApiLogFirestore) => ApiLogApp;
type ApiLog = ApiLogFirestore;
type HApiLog = ApiLogApp;

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
declare const bookingFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    return_date: z.ZodNullable<z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>>;
    departure_date: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    partner: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    promo_codes: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
    users: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
    esims: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
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
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    updated_by: string | DocumentReferenceLike | null;
    users: DocumentReferenceLike[] | null;
    promo_codes: DocumentReferenceLike[];
    esims: DocumentReferenceLike[] | null;
    return_date: TimestampLike | null;
    departure_date: TimestampLike;
    partner: DocumentReferenceLike;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    updated_by: string | DocumentReferenceLike | null;
    users: DocumentReferenceLike[] | null;
    promo_codes: DocumentReferenceLike[];
    esims: DocumentReferenceLike[] | null;
    return_date: TimestampLike | null;
    departure_date: TimestampLike;
    partner: DocumentReferenceLike;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}>;
declare const bookingAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    return_date: z.ZodNullable<z.ZodDate>;
    departure_date: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    updated_by: string | null;
    users: string[] | null;
    promo_codes: string[];
    esims: string[] | null;
    return_date: Date | null;
    departure_date: Date;
    partner: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "UNPAID" | "EXPIRED";
    updated_by: string | null;
    users: string[] | null;
    promo_codes: string[];
    esims: string[] | null;
    return_date: Date | null;
    departure_date: Date;
    partner: string;
    title: string | null;
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    email: string | null;
    phone: string | null;
    booking_id: string | null;
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
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
    flight_number?: string | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    import_id?: string | null | undefined;
    package_specifications?: Record<string, any> | undefined;
}>;
type BookingFirestore = z.infer<typeof bookingFirestoreSchema>;
type BookingApp = z.infer<typeof bookingAppSchema>;
type CommunicationOptions = z.infer<typeof communicationOptionsSchema>;
declare const bookingToFirestore: (booking: BookingApp, firestore?: FirestoreProvider) => BookingFirestore;
declare const bookingFromFirestore: (firestoreBooking: BookingFirestore, firestore?: FirestoreProvider) => BookingApp;
type Booking = BookingFirestore;
type HBooking = BookingApp;

declare const countryFirestoreSchema: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    bokun_id: z.ZodNullable<z.ZodNumber>;
    LTE: z.ZodNullable<z.ZodBoolean>;
    apn: z.ZodNullable<z.ZodString>;
    click_count: z.ZodNullable<z.ZodNumber>;
    global_network: z.ZodNullable<z.ZodString>;
    global_price: z.ZodNullable<z.ZodNumber>;
    hubby: z.ZodNullable<z.ZodNumber>;
    imsi: z.ZodNullable<z.ZodNumber>;
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
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}>;
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
    region: boolean | null;
    is_region: boolean | null;
    tier: number | null;
}>;
type CountryFirestore = z.infer<typeof countryFirestoreSchema>;
type CountryApp = z.infer<typeof countryAppSchema>;
declare const countryToFirestore: (country: CountryApp) => CountryFirestore;
declare const countryFromFirestore: (firestoreCountry: CountryFirestore) => CountryApp;
type Country = CountryFirestore;
type HCountry = CountryApp;

declare const conversionRateSchema: z.ZodObject<{
    currency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    currency: number;
}, {
    currency: number;
}>;
type CoversionRate = z.infer<typeof conversionRateSchema>;
declare const currencyFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    code: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    rate: z.ZodNumber;
    is_default: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    code: string;
    updated_by: string | DocumentReferenceLike | null;
    name: string;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    code: string;
    updated_by: string | DocumentReferenceLike | null;
    name: string;
    rate: number;
    is_default: boolean;
}>;
declare const currencyAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    code: string;
    updated_by: string | null;
    name: string;
    rate: number;
    is_default: boolean;
}, {
    symbol: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    code: string;
    updated_by: string | null;
    name: string;
    rate: number;
    is_default: boolean;
}>;
type CurrencyFirestore = z.infer<typeof currencyFirestoreSchema>;
type CurrencyApp = z.infer<typeof currencyAppSchema>;
declare const currencyToFirestore: (currency: CurrencyApp) => CurrencyFirestore;
declare const currencyFromFirestore: (firestoreCurrency: CurrencyFirestore) => CurrencyApp;
type Currency = CurrencyFirestore;
type HCurrency = CurrencyApp;

declare const esimFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    country: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    time_assigned: z.ZodNullable<z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>>;
    last_updated: z.ZodNullable<z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
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
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    status: string | null;
    type: "code" | "api" | "promo" | "balance" | "external" | "payment";
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    name: string;
    country: DocumentReferenceLike | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    promo: string | null;
    payment: string | null;
    time_assigned: TimestampLike | null;
    last_updated: TimestampLike | null;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    partner_price: number | null;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    status: string | null;
    type: "code" | "api" | "promo" | "balance" | "external" | "payment";
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    name: string;
    country: DocumentReferenceLike | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    promo: string | null;
    payment: string | null;
    time_assigned: TimestampLike | null;
    last_updated: TimestampLike | null;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    partner_price: number | null;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}>;
declare const esimAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    country: z.ZodNullable<z.ZodString>;
    time_assigned: z.ZodNullable<z.ZodDate>;
    last_updated: z.ZodNullable<z.ZodDate>;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    status: string | null;
    type: "code" | "api" | "promo" | "balance" | "external" | "payment";
    updated_by: string | null;
    partner: string | null;
    name: string;
    country: string | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    promo: string | null;
    payment: string | null;
    time_assigned: Date | null;
    last_updated: Date | null;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    partner_price: number | null;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    status: string | null;
    type: "code" | "api" | "promo" | "balance" | "external" | "payment";
    updated_by: string | null;
    partner: string | null;
    name: string;
    country: string | null;
    user: string | null;
    apn: string | null;
    imsi: number;
    promo: string | null;
    payment: string | null;
    time_assigned: Date | null;
    last_updated: Date | null;
    qr: string;
    iccid: string;
    provider: string;
    total_data: number | null;
    data_left: number | null;
    data_used: boolean | null;
    android_auto: boolean;
    partner_price: number | null;
    is_auto_install: boolean;
    is_archived: boolean;
    coverage_label?: string | null | undefined;
}>;
type ESIMFirestore = z.infer<typeof esimFirestoreSchema>;
type ESIMApp = z.infer<typeof esimAppSchema>;
declare const esimToFirestore: (esim: ESIMApp) => ESIMFirestore;
declare const esimFromFirestore: (firestoreEsim: ESIMFirestore) => ESIMApp;
type ESIM = ESIMFirestore;
type HESIM = ESIMApp;

declare const testEnv: {
    isTestEnvironment: boolean;
};
declare class MockDocumentReference {
    path: string;
    id: string;
    constructor(collectionPath: string, id: string);
}
declare const timestampSchema: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
declare const documentRefSchema: z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>;
declare const fieldValueSchema: z.ZodType<FieldValueLike, z.ZodTypeDef, FieldValueLike>;
declare const createFirestoreHelpers: (firestore: FirestoreProvider) => {
    toFirestore: {
        date: (date: Date) => TimestampLike;
        ref: <T>(collectionPath: string, id: string) => DocumentReferenceLike;
        serverTimestamp: () => FieldValueLike;
    };
    fromFirestore: {
        date: (timestamp: TimestampLike) => Date;
        ref: <T>(docRef: DocumentReferenceLike | MockDocumentReference) => string;
    };
};
declare const toFirestore: {
    date: (date: Date) => any;
    ref: <T>(collectionPath: string, id: string) => any;
};
declare const fromFirestore: {
    date: (timestamp: any) => Date;
    ref: <T>(docRef: any) => string;
};
declare const baseModelSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
}>;
declare const baseModelAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
}>;
declare const hubbyModelFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
}>;
declare const hubbyModelAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
}>;
type HubbyModelFirestore = z.infer<typeof hubbyModelFirestoreSchema>;
type HubbyModelApp = z.infer<typeof hubbyModelAppSchema>;
type HubbyModel = HubbyModelFirestore;
type HHubbyModel = HubbyModelApp;
declare const createDocRefSchema: <T>(collectionPath: string) => {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const docRefToStringSchema: <T>(docRefSchema: ReturnType<typeof createDocRefSchema<T>>) => z.ZodString;

declare const messageFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}>;
declare const messageAppSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}>;
declare const sentMessagesFirestoreSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}>>;
declare const sentMessagesAppSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["push", "sms", "email"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    method: "push" | "email" | "sms";
    key: string;
}>>;
type MessageFirestore = z.infer<typeof messageFirestoreSchema>;
type MessageApp = z.infer<typeof messageAppSchema>;
type SentMessagesFirestore = z.infer<typeof sentMessagesFirestoreSchema>;
type SentMessagesApp = z.infer<typeof sentMessagesAppSchema>;
declare const messageToFirestore: (message: MessageApp, firestore?: FirestoreProvider) => MessageFirestore;
declare const messageFromFirestore: (firestoreMessage: MessageFirestore, firestore?: FirestoreProvider) => MessageApp;
declare const sentMessagesToFirestore: (sentMessages: SentMessagesApp, firestore?: FirestoreProvider) => SentMessagesFirestore;
declare const sentMessagesFromFirestore: (firestoreSentMessages: SentMessagesFirestore, firestore?: FirestoreProvider) => SentMessagesApp;
type Message = MessageFirestore;
type HMessage = MessageApp;
type SentMessages = SentMessagesFirestore;
type HSentMessages = SentMessagesApp;
declare const convertSentMessagesToFirestore: (sentMessages: Record<string, MessageApp>, firestore?: FirestoreProvider) => Record<string, MessageFirestore>;
declare const convertSentMessagesFromFirestore: (firestoreSentMessages: Record<string, MessageFirestore>) => Record<string, MessageApp>;

declare const packageFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    country: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
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
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    type: "data-limited" | "time-limited" | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    name: string;
    is_active: boolean;
    external_id: string;
    country: DocumentReferenceLike;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    label: string;
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
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    price: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    type: "data-limited" | "time-limited" | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    name: string;
    is_active: boolean;
    external_id: string;
    country: DocumentReferenceLike;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    label: string;
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
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    price: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}>;
declare const packageAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: "data-limited" | "time-limited" | null;
    updated_by: string | null;
    partner: string | null;
    name: string;
    is_active: boolean;
    external_id: string;
    country: string;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    label: string;
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
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    price: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: "data-limited" | "time-limited" | null;
    updated_by: string | null;
    partner: string | null;
    name: string;
    is_active: boolean;
    external_id: string;
    country: string;
    provider: string;
    coverage_label: string | null;
    partner_price: number;
    label: string;
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
        region: boolean | null;
        is_region: boolean | null;
        tier: number | null;
    } | null;
    price: number;
    days: number;
    provider_parameters: {
        imsi: number;
    } | null;
    throttling?: number | undefined;
}>;
type PackageFirestore = z.infer<typeof packageFirestoreSchema>;
type PackageApp = z.infer<typeof packageAppSchema>;
declare const packageToFirestore: (packageData: PackageApp) => PackageFirestore;
declare const packageFromFirestore: (firestorePackage: PackageFirestore) => PackageApp;
type Package = PackageFirestore;
type HPackage = PackageApp;

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
declare const packagePriceFirestoreSchema: z.ZodObject<{
    package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    destination: string;
    label: string;
    price: number;
    package: DocumentReferenceLike;
}, {
    type: "data-limit" | "time-limit";
    destination: string;
    label: string;
    price: number;
    package: DocumentReferenceLike;
}>;
declare const packagePriceAppSchema: z.ZodObject<{
    package: z.ZodString;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    destination: string;
    label: string;
    price: number;
    package: string;
}, {
    type: "data-limit" | "time-limit";
    destination: string;
    label: string;
    price: number;
    package: string;
}>;
declare const partnerPricingStrategyFirestoreSchema: z.ZodObject<{
    strategy: z.ZodEnum<["split", "bundle"]>;
    default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    strategy: "split" | "bundle";
    default_price_list: DocumentReferenceLike | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }[];
    modification_percentage: number;
}, {
    strategy: "split" | "bundle";
    default_price_list: DocumentReferenceLike | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }[];
    modification_percentage: number;
}>;
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
        destination: string;
        label: string;
        price: number;
        package: string;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    strategy: "split" | "bundle";
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
    modification_percentage: number;
}, {
    strategy: "split" | "bundle";
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
    modification_percentage: number;
}>;
declare const userPricingStrategyFirestoreSchema: z.ZodObject<{
    default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: DocumentReferenceLike | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }[];
    modification_percentage: number;
}, {
    default_price_list: DocumentReferenceLike | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
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
        destination: string;
        label: string;
        price: number;
        package: string;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }>, "many">;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
    modification_percentage: number;
}, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
    modification_percentage: number;
}>;
declare const financialPropertiesFirestoreSchema: z.ZodNullable<z.ZodObject<{
    pricing_strategies: z.ZodNullable<z.ZodObject<{
        partner: z.ZodOptional<z.ZodObject<{
            strategy: z.ZodEnum<["split", "bundle"]>;
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        }, {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        }>>;
        user: z.ZodOptional<z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        }, {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
    }, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
    }>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodNullable<z.ZodDate>;
    last_invoice: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    commission_fee?: number | null | undefined;
}, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: DocumentReferenceLike | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: DocumentReferenceLike;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    commission_fee?: number | null | undefined;
}>>;
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
                destination: string;
                label: string;
                price: number;
                package: string;
            }, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        }, {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
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
                destination: string;
                label: string;
                price: number;
                package: string;
            }, {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }>, "many">;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        }, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
    }, {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
    }>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodNullable<z.ZodDate>;
    last_invoice: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    commission_fee?: number | null | undefined;
}, {
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    pricing_strategies: {
        partner?: {
            strategy: "split" | "bundle";
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
        user?: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                destination: string;
                label: string;
                price: number;
                package: string;
            }[];
            modification_percentage: number;
        } | undefined;
    } | null;
    commission_fee?: number | null | undefined;
}>>;
declare const packageStrategySchema: z.ZodObject<{
    name: z.ZodString;
    iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    parameters: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    name: string;
    iso3_white_list?: string[] | undefined;
    parameters?: any;
}, {
    name: string;
    iso3_white_list?: string[] | undefined;
    parameters?: any;
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
    banners: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    strategy: "fixed" | "destination" | "rotating" | "time_of_day";
    banners: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[];
}, {
    strategy: "fixed" | "destination" | "rotating" | "time_of_day";
    banners: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        image_url: string;
        alt: string;
        click_url: string;
        properties: Record<string, string>;
    }[];
}>;
declare const visualIdentitySchema: z.ZodObject<{
    primary_color: z.ZodString;
    secondary_color: z.ZodString;
    logo: z.ZodString;
    font: z.ZodString;
    top_banner: z.ZodObject<{
        strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
        banners: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    }, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    }>;
    mid_banner: z.ZodObject<{
        strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
        banners: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    }, {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    primary_color: string;
    secondary_color: string;
    logo: string;
    font: string;
    top_banner: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    };
    mid_banner: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    };
}, {
    primary_color: string;
    secondary_color: string;
    logo: string;
    font: string;
    top_banner: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    };
    mid_banner: {
        strategy: "fixed" | "destination" | "rotating" | "time_of_day";
        banners: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
            image_url: string;
            alt: string;
            click_url: string;
            properties: Record<string, string>;
        }[];
    };
}>;
declare const scheduleFilterSchema: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
declare const scheduleSchema: z.ZodObject<{
    days: z.ZodNumber;
    email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        brevo_template_id: z.ZodNumber;
        subject: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        preview_text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
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
    method: "push" | "email" | "sms" | "whatsapp";
    key: string;
    days: number;
    hour: number;
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
    method: "push" | "email" | "sms" | "whatsapp";
    key: string;
    days: number;
    hour: number;
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
declare const platformSettingsSchema: z.ZodNullable<z.ZodObject<{
    package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        parameters: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        name: string;
        iso3_white_list?: string[] | undefined;
        parameters?: any;
    }, {
        name: string;
        iso3_white_list?: string[] | undefined;
        parameters?: any;
    }>>>;
    free_esim: z.ZodNullable<z.ZodObject<{
        allowance: z.ZodNullable<z.ZodNumber>;
        package_specifications: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        package_specifications: Record<string, any> | null;
        allowance: number | null;
    }, {
        package_specifications: Record<string, any> | null;
        allowance: number | null;
    }>>;
    booking_defaults: z.ZodNullable<z.ZodObject<{
        locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
    }, "strip", z.ZodTypeAny, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    }, {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    }>>;
    schedules: z.ZodNullable<z.ZodArray<z.ZodObject<{
        days: z.ZodNumber;
        email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            subject: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            preview_text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
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
        method: "push" | "email" | "sms" | "whatsapp";
        key: string;
        days: number;
        hour: number;
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
        method: "push" | "email" | "sms" | "whatsapp";
        key: string;
        days: number;
        hour: number;
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
    booking_confirmation: z.ZodNullable<z.ZodObject<{
        brevo_template_id: z.ZodNumber;
        send_booking_confirmation: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    }, {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    free_esim: {
        package_specifications: Record<string, any> | null;
        allowance: number | null;
    } | null;
    booking_defaults: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    } | null;
    schedules: {
        method: "push" | "email" | "sms" | "whatsapp";
        key: string;
        days: number;
        hour: number;
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
    }[] | null;
    booking_confirmation: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null;
    package_strategy?: {
        name: string;
        iso3_white_list?: string[] | undefined;
        parameters?: any;
    } | null | undefined;
}, {
    free_esim: {
        package_specifications: Record<string, any> | null;
        allowance: number | null;
    } | null;
    booking_defaults: {
        locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
    } | null;
    schedules: {
        method: "push" | "email" | "sms" | "whatsapp";
        key: string;
        days: number;
        hour: number;
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
    }[] | null;
    booking_confirmation: {
        brevo_template_id: number;
        send_booking_confirmation: boolean;
    } | null;
    package_strategy?: {
        name: string;
        iso3_white_list?: string[] | undefined;
        parameters?: any;
    } | null | undefined;
}>>;
declare const partnerFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    parent: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    users: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
    financial_properties: z.ZodNullable<z.ZodObject<{
        pricing_strategies: z.ZodNullable<z.ZodObject<{
            partner: z.ZodOptional<z.ZodObject<{
                strategy: z.ZodEnum<["split", "bundle"]>;
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            }>>;
            user: z.ZodOptional<z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            }, {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        }, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        }>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
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
    platform_settings: z.ZodNullable<z.ZodObject<{
        package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        }, {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        }>>>;
        free_esim: z.ZodNullable<z.ZodObject<{
            allowance: z.ZodNullable<z.ZodNumber>;
            package_specifications: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        }, {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        }>>;
        booking_defaults: z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }>>;
        schedules: z.ZodNullable<z.ZodArray<z.ZodObject<{
            days: z.ZodNumber;
            email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                brevo_template_id: z.ZodNumber;
                subject: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                preview_text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
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
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        booking_confirmation: z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    }, {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    }>>;
    visual_identity: z.ZodNullable<z.ZodObject<{
        primary_color: z.ZodString;
        secondary_color: z.ZodString;
        logo: z.ZodString;
        font: z.ZodString;
        top_banner: z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }>;
        mid_banner: z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    }, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    }>>;
    data: z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    type: string | null;
    updated_by: string | DocumentReferenceLike | null;
    users: DocumentReferenceLike[] | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    name: string | null;
    parent: DocumentReferenceLike | null;
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
    platform_settings: {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    } | null;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    type: string | null;
    updated_by: string | DocumentReferenceLike | null;
    users: DocumentReferenceLike[] | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    name: string | null;
    parent: DocumentReferenceLike | null;
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
    platform_settings: {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    } | null;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: DocumentReferenceLike | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: DocumentReferenceLike;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const partnerAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            }, {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
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
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }, {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }>, "many">;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        }, {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        }>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
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
    platform_settings: z.ZodNullable<z.ZodObject<{
        package_strategy: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            name: z.ZodString;
            iso3_white_list: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            parameters: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        }, {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        }>>>;
        free_esim: z.ZodNullable<z.ZodObject<{
            allowance: z.ZodNullable<z.ZodNumber>;
            package_specifications: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        }, {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        }>>;
        booking_defaults: z.ZodNullable<z.ZodObject<{
            locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
        }, "strip", z.ZodTypeAny, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }, {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        }>>;
        schedules: z.ZodNullable<z.ZodArray<z.ZodObject<{
            days: z.ZodNumber;
            email: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                brevo_template_id: z.ZodNumber;
                subject: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                preview_text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
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
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        booking_confirmation: z.ZodNullable<z.ZodObject<{
            brevo_template_id: z.ZodNumber;
            send_booking_confirmation: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }, {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    }, {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    }>>;
    visual_identity: z.ZodNullable<z.ZodObject<{
        primary_color: z.ZodString;
        secondary_color: z.ZodString;
        logo: z.ZodString;
        font: z.ZodString;
        top_banner: z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }>;
        mid_banner: z.ZodObject<{
            strategy: z.ZodEnum<["fixed", "rotating", "destination", "time_of_day"]>;
            banners: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }, {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    }, {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    }>>;
    data: z.ZodNullable<z.ZodObject<{
        source: z.ZodString;
        manual: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        source: string;
        manual: boolean;
    }, {
        source: string;
        manual: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    name: string | null;
    parent: string | null;
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
    platform_settings: {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    } | null;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: string | null;
    updated_by: string | null;
    users: string[] | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    name: string | null;
    parent: string | null;
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
    platform_settings: {
        free_esim: {
            package_specifications: Record<string, any> | null;
            allowance: number | null;
        } | null;
        booking_defaults: {
            locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
        } | null;
        schedules: {
            method: "push" | "email" | "sms" | "whatsapp";
            key: string;
            days: number;
            hour: number;
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
        }[] | null;
        booking_confirmation: {
            brevo_template_id: number;
            send_booking_confirmation: boolean;
        } | null;
        package_strategy?: {
            name: string;
            iso3_white_list?: string[] | undefined;
            parameters?: any;
        } | null | undefined;
    } | null;
    visual_identity: {
        primary_color: string;
        secondary_color: string;
        logo: string;
        font: string;
        top_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
        mid_banner: {
            strategy: "fixed" | "destination" | "rotating" | "time_of_day";
            banners: {
                locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
                image_url: string;
                alt: string;
                click_url: string;
                properties: Record<string, string>;
            }[];
        };
    } | null;
    financial_properties: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies: {
            partner?: {
                strategy: "split" | "bundle";
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
            user?: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    destination: string;
                    label: string;
                    price: number;
                    package: string;
                }[];
                modification_percentage: number;
            } | undefined;
        } | null;
        commission_fee?: number | null | undefined;
    } | null;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
declare const priceListFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    price_list: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }>, "many">;
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["partner", "user"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    type: "partner" | "user";
    updated_by: string | DocumentReferenceLike | null;
    name: string;
    price_list: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }[];
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
    name: string;
    price_list: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: DocumentReferenceLike;
    }[];
    type?: "partner" | "user" | undefined;
}>;
declare const priceListAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    price_list: z.ZodArray<z.ZodObject<{
        package: z.ZodString;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }, {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }>, "many">;
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["partner", "user"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    type: "partner" | "user";
    updated_by: string | null;
    name: string;
    price_list: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    name: string;
    price_list: {
        type: "data-limit" | "time-limit";
        destination: string;
        label: string;
        price: number;
        package: string;
    }[];
    type?: "partner" | "user" | undefined;
}>;
declare const partnerToFirestore: (partner: PartnerApp) => PartnerFirestore;
declare const partnerFromFirestore: (firestorePartner: PartnerFirestore) => PartnerApp;
declare const priceListFromFirestore: (firestorePriceList: PriceListFirestore) => PriceListApp;
declare const priceListToFirestore: (priceList: PriceListApp) => PriceListFirestore;
type Partner = PartnerFirestore;
type HPartner = PartnerApp;
type PriceList = PriceListFirestore;
type HPriceList = PriceListApp;
type HPackagePrice = z.infer<typeof packagePriceAppSchema>;
type PackagePrice = z.infer<typeof packagePriceFirestoreSchema>;
type HFinancialProperties = z.infer<typeof financialPropertiesAppSchema>;
type FinancialProperties = z.infer<typeof financialPropertiesFirestoreSchema>;
type HPlatformSettings = z.infer<typeof platformSettingsSchema>;
type HVisualIdentity = z.infer<typeof visualIdentitySchema>;
type HSchedule = z.infer<typeof scheduleSchema>;
type HPackageStrategy = z.infer<typeof packageStrategySchema>;
type HBookingDefaults = z.infer<typeof bookingDefaultsSchema>;
type HBookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
type HVisualIdentityBanner = z.infer<typeof visualIdentityBannerSchema>;
type HVisualIdentityBannerStrategy = z.infer<typeof visualIdentityBannerStrategySchema>;
type HScheduleFilter = z.infer<typeof scheduleFilterSchema>;
type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
type PartnerApp = z.infer<typeof partnerAppSchema>;
type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
type PriceListApp = z.infer<typeof priceListAppSchema>;
type Address = z.infer<typeof addressSchema>;
type Registration = z.infer<typeof registrationSchema>;
type BankingDetails = z.infer<typeof bankingDetailsSchema>;
type PackagePriceFirestore = z.infer<typeof packagePriceFirestoreSchema>;
type PackagePriceApp = z.infer<typeof packagePriceAppSchema>;
type PartnerPricingStrategyFirestore = z.infer<typeof partnerPricingStrategyFirestoreSchema>;
type PartnerPricingStrategyApp = z.infer<typeof partnerPricingStrategyAppSchema>;
type UserPricingStrategyFirestore = z.infer<typeof userPricingStrategyFirestoreSchema>;
type UserPricingStrategyApp = z.infer<typeof userPricingStrategyAppSchema>;
type FinancialPropertiesFirestore = z.infer<typeof financialPropertiesFirestoreSchema>;
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

declare const paymentFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodDate;
    iccid: z.ZodString;
    package: z.ZodString;
    promo: z.ZodString;
    topup: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    date: Date;
    updated_by: string | DocumentReferenceLike | null;
    promo: string;
    iccid: string;
    package: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    date: Date;
    updated_by: string | DocumentReferenceLike | null;
    promo: string;
    iccid: string;
    package: string;
    amount: number;
    customer: string;
    topup: boolean;
}>;
declare const paymentAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    amount: z.ZodNumber;
    customer: z.ZodString;
    date: z.ZodDate;
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
    promo: string;
    iccid: string;
    package: string;
    amount: number;
    customer: string;
    topup: boolean;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    date: Date;
    updated_by: string | null;
    promo: string;
    iccid: string;
    package: string;
    amount: number;
    customer: string;
    topup: boolean;
}>;
type PaymentFirestore = z.infer<typeof paymentFirestoreSchema>;
type PaymentApp = z.infer<typeof paymentAppSchema>;
declare const paymentToFirestore: (payment: PaymentApp) => PaymentFirestore;
declare const paymentFromFirestore: (firestorePayment: PaymentFirestore) => PaymentApp;
type Payment = PaymentFirestore;
type HPayment = PaymentApp;

declare const promoCodeFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
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
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    valid_from: z.ZodUnion<[z.ZodString, z.ZodDate, z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>]>;
    valid_to: z.ZodUnion<[z.ZodString, z.ZodDate, z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>]>;
    discount: z.ZodOptional<z.ZodNumber>;
    package_size: z.ZodOptional<z.ZodString>;
    package: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    country: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    booking: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    countries: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    max_bytes: z.ZodOptional<z.ZodNumber>;
    starter_data: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    code: string;
    type: string | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    external_id: string;
    country: DocumentReferenceLike | null;
    package: DocumentReferenceLike | null;
    allowance_user: number;
    allowance_total: number;
    booking: DocumentReferenceLike | null;
    usage: string[];
    uuid_usage: string[];
    valid_from: string | Date | TimestampLike;
    valid_to: string | Date | TimestampLike;
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
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    code: string;
    type: string | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    external_id: string;
    country: DocumentReferenceLike | null;
    package: DocumentReferenceLike | null;
    allowance_user: number;
    allowance_total: number;
    booking: DocumentReferenceLike | null;
    usage: string[];
    uuid_usage: string[];
    valid_from: string | Date | TimestampLike;
    valid_to: string | Date | TimestampLike;
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
}>;
declare const promoCodeAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
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
    valid_from: z.ZodDate;
    valid_to: z.ZodDate;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    code: string;
    type: string | null;
    updated_by: string | null;
    partner: string | null;
    external_id: string;
    country: string | null;
    package: string | null;
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
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    code: string;
    type: string | null;
    updated_by: string | null;
    partner: string | null;
    external_id: string;
    country: string | null;
    package: string | null;
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
}>;
type PromoCodeFirestore = z.infer<typeof promoCodeFirestoreSchema>;
type PromoCodeApp = z.infer<typeof promoCodeAppSchema>;
declare const promoCodeToFirestore: (promoCode: PromoCodeApp) => PromoCodeFirestore;
declare const promoCodeFromFirestore: (firestorePromoCode: PromoCodeFirestore) => PromoCodeApp;
type PromoCode = PromoCodeFirestore;
type HPromoCode = PromoCodeApp;

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
declare const partnerRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const userRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const profileRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const packageRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const promoCodeRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const countryRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const esimRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const paymentRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const priceListRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const bookingRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const messageRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const currencyRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const apiLogRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>;
    collectionPath: string;
};
declare const partnerRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const userRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const profileRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const packageRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const promoCodeRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const countryRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const esimRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const paymentRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const priceListRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const bookingRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const messageRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const currencyRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
declare const apiLogRefNullable: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
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
declare const partnerRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const userRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const profileRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const packageRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const promoCodeRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const countryRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const esimRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const paymentRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const priceListRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const bookingRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const messageRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const currencyRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const apiLogRefArray: z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">;
declare const partnerRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const userRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const profileRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const packageRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const promoCodeRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const countryRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const esimRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const paymentRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const priceListRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const bookingRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const messageRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const currencyRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
declare const apiLogRefArrayNullable: z.ZodNullable<z.ZodArray<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>, "many">>;
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
    expires_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    secret: z.ZodString;
    is_active: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    is_active: boolean;
    expires_at: TimestampLike;
    secret: string;
}, {
    is_active: boolean;
    expires_at: TimestampLike;
    secret: string;
}>;
declare const apiKeysSchema: z.ZodObject<{
    allowed_keys: z.ZodArray<z.ZodString, "many">;
    keys: z.ZodRecord<z.ZodString, z.ZodObject<{
        expires_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
        secret: z.ZodString;
        is_active: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        is_active: boolean;
        expires_at: TimestampLike;
        secret: string;
    }, {
        is_active: boolean;
        expires_at: TimestampLike;
        secret: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    keys: Record<string, {
        is_active: boolean;
        expires_at: TimestampLike;
        secret: string;
    }>;
    allowed_keys: string[];
}, {
    keys: Record<string, {
        is_active: boolean;
        expires_at: TimestampLike;
        secret: string;
    }>;
    allowed_keys: string[];
}>;
declare const userFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    updated_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>]>;
} & {
    createdAt: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
    partner: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    profileRef: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReferenceLike, z.ZodTypeDef, DocumentReferenceLike>, DocumentReferenceLike, DocumentReferenceLike>>;
    balance: z.ZodUnion<[z.ZodNumber, z.ZodNull, z.ZodType<FieldValueLike, z.ZodTypeDef, FieldValueLike>]>;
    review_requested: z.ZodNullable<z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>>;
    last_seen: z.ZodNullable<z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>>;
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
            expires_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    }>>;
    currency: z.ZodNullable<z.ZodString>;
    receipt_email: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    email: string | null;
    gender: string | null;
    locale: string | null;
    name: string | null;
    currency: string | null;
    balance: number | FieldValueLike | null;
    createdAt: TimestampLike;
    profileRef: DocumentReferenceLike | null;
    review_requested: TimestampLike | null;
    last_seen: TimestampLike | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}, {
    id: string;
    created_at: TimestampLike;
    updated_at: TimestampLike;
    created_by: string | DocumentReferenceLike | null;
    updated_by: string | DocumentReferenceLike | null;
    partner: DocumentReferenceLike | null;
    email: string | null;
    gender: string | null;
    locale: string | null;
    name: string | null;
    currency: string | null;
    balance: number | FieldValueLike | null;
    createdAt: TimestampLike;
    profileRef: DocumentReferenceLike | null;
    review_requested: TimestampLike | null;
    last_seen: TimestampLike | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}>;
declare const userAppSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull]>;
} & {
    createdAt: z.ZodDate;
    partner: z.ZodNullable<z.ZodString>;
    profileRef: z.ZodNullable<z.ZodString>;
    balance: z.ZodNullable<z.ZodNumber>;
    review_requested: z.ZodNullable<z.ZodDate>;
    last_seen: z.ZodNullable<z.ZodDate>;
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
            expires_at: z.ZodType<TimestampLike, z.ZodTypeDef, TimestampLike>;
            secret: z.ZodString;
            is_active: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    }, {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
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
    partner: string | null;
    email: string | null;
    gender: string | null;
    locale: string | null;
    name: string | null;
    currency: string | null;
    balance: number | null;
    createdAt: Date;
    profileRef: string | null;
    review_requested: Date | null;
    last_seen: Date | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    partner: string | null;
    email: string | null;
    gender: string | null;
    locale: string | null;
    name: string | null;
    currency: string | null;
    balance: number | null;
    createdAt: Date;
    profileRef: string | null;
    review_requested: Date | null;
    last_seen: Date | null;
    stripe_id: string | null;
    referral: string | null;
    deeplink: string | null;
    company: string | null;
    coordinates: string | null;
    phone_model: string | null;
    phone_os: string | null;
    phone_os_version: string | null;
    ios: boolean | null;
    has_card_saved: boolean | null;
    admin: boolean | null;
    api_keys: {
        keys: Record<string, {
            is_active: boolean;
            expires_at: TimestampLike;
            secret: string;
        }>;
        allowed_keys: string[];
    } | null;
    receipt_email: string | null;
    parameters?: any;
    fcm?: string | undefined;
}>;
type UserFirestore = z.infer<typeof userFirestoreSchema>;
type UserApp = z.infer<typeof userAppSchema>;
type ApiKeys = z.infer<typeof apiKeysSchema>;
type ApiKey = z.infer<typeof apiKeySchema>;
declare const userToFirestore: (user: UserApp, firestore?: FirestoreProvider) => UserFirestore;
declare const userFromFirestore: (firestoreUser: UserFirestore, firestore?: FirestoreProvider) => UserApp;
declare const userToFirestoreWithBalance: (user: UserApp, firestore?: FirestoreProvider) => UserFirestore;
type User = UserFirestore;
type HUser = UserApp;

declare const SUPPORTED_LOCALES: readonly ["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"];
type SupportedLocales = typeof SUPPORTED_LOCALES[number];
declare const supportedLocalesSchema: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
type SupportedLocalesFromSchema = z.infer<typeof supportedLocalesSchema>;

export { API_LOG_COLLECTION, Address, ApiKey, ApiKeys, ApiLog, ApiLogApp, ApiLogFirestore, BOOKING_COLLECTION, BankingDetails, Booking, BookingApiRequest, BookingApiResponse, BookingApp, BookingConfirmation, BookingDefaults, BookingFirestore, BookingStatus, COUNTRY_COLLECTION, CURRENCY_COLLECTION, CommunicationChannel, CommunicationChannelType, CommunicationOptions, Country, CountryApp, CountryFirestore, CoversionRate, Currency, CurrencyApp, CurrencyFirestore, DocumentReferenceLike, ESIM, ESIMApp, ESIMFirestore, ESIM_COLLECTION, FieldValueLike, FinancialProperties, FinancialPropertiesApp, FinancialPropertiesFirestore, FirestoreProvider, GenericDateFieldMapping, GenericRefFieldMapping, HApiLog, HBooking, HBookingConfirmation, HBookingDefaults, HCountry, HCurrency, HESIM, HFinancialProperties, HHubbyModel, HMessage, HPackage, HPackagePrice, HPackageStrategy, HPartner, HPayment, HPlatformSettings, HPriceList, HPromoCode, HSchedule, HScheduleFilter, HSentMessages, HUser, HVisualIdentity, HVisualIdentityBanner, HVisualIdentityBannerStrategy, HubbyModel, HubbyModelApp, HubbyModelFirestore, MESSAGE_COLLECTION, Message, MessageApp, MessageFirestore, MockDocumentReference, PACKAGE_COLLECTION, PARTNER_COLLECTION, PAYMENT_COLLECTION, PRICE_LIST_COLLECTION, PROFILE_COLLECTION, PROMO_CODE_COLLECTION, Package, PackageApp, PackageFirestore, PackagePrice, PackagePriceApp, PackagePriceFirestore, PackageSpecification, PackageSpecifications, PackageStrategy, Partner, PartnerApiRequest, PartnerApiResponse, PartnerApp, PartnerFirestore, PartnerPricingStrategyApp, PartnerPricingStrategyFirestore, Payment, PaymentApp, PaymentFirestore, PlatformSettings, PriceList, PriceListApp, PriceListFirestore, PromoCode, PromoCodeApiResponse, PromoCodeApp, PromoCodeFirestore, Registration, SUPPORTED_LOCALES, Schedule, ScheduleFilter, SentMessages, SentMessagesApp, SentMessagesFirestore, SupportedLocales, SupportedLocalesFromSchema, TimestampLike, USER_COLLECTION, User, UserApp, UserFirestore, UserPricingStrategyApp, UserPricingStrategyFirestore, VisualIdentity, VisualIdentityBanner, VisualIdentityBannerStrategy, addressSchema, apiKeySchema, apiKeysSchema, apiLogAppSchema, apiLogFirestoreSchema, apiLogFromFirestore, apiLogRefArray, apiLogRefArrayNullable, apiLogRefNullable, apiLogRefSchema, apiLogRefString, apiLogRefStringArray, apiLogRefStringArrayNullable, apiLogRefStringNullable, apiLogToFirestore, bankingDetailsSchema, baseModelAppSchema, baseModelSchema, bookingApiRequestSchema, bookingApiResponseSchema, bookingAppSchema, bookingConfirmationSchema, bookingDefaultsSchema, bookingFirestoreSchema, bookingFromFirestore, bookingRefArray, bookingRefArrayNullable, bookingRefNullable, bookingRefSchema, bookingRefString, bookingRefStringArray, bookingRefStringArrayNullable, bookingRefStringNullable, bookingStatusSchema, bookingToFirestore, communicationChannelSchema, communicationOptionsSchema, conversionRateSchema, convertSentMessagesFromFirestore, convertSentMessagesToFirestore, convertToDate, countryAppSchema, countryFirestoreSchema, countryFromFirestore, countryRefArray, countryRefArrayNullable, countryRefNullable, countryRefSchema, countryRefString, countryRefStringArray, countryRefStringArrayNullable, countryRefStringNullable, countryToFirestore, createDocRefSchema, createFirestoreHelpers, currencyAppSchema, currencyFirestoreSchema, currencyFromFirestore, currencyRefArray, currencyRefArrayNullable, currencyRefNullable, currencyRefSchema, currencyRefString, currencyRefStringArray, currencyRefStringArrayNullable, currencyRefStringNullable, currencyToFirestore, docRefToStringSchema, documentRefSchema, esimAppSchema, esimFirestoreSchema, esimFromFirestore, esimRefArray, esimRefArrayNullable, esimRefNullable, esimRefSchema, esimRefString, esimRefStringArray, esimRefStringArrayNullable, esimRefStringNullable, esimToFirestore, fieldValueSchema, financialPropertiesAppSchema, financialPropertiesFirestoreSchema, fromFirestore, genericFromFirestore, genericToFirestore, hubbyModelAppSchema, hubbyModelFirestoreSchema, isDate, isDocumentReference, isFieldValue, isTimestamp, messageAppSchema, messageFirestoreSchema, messageFromFirestore, messageRefArray, messageRefArrayNullable, messageRefNullable, messageRefSchema, messageRefString, messageRefStringArray, messageRefStringArrayNullable, messageRefStringNullable, messageToFirestore, packageAppSchema, packageFirestoreSchema, packageFromFirestore, packagePriceAppSchema, packagePriceFirestoreSchema, packageRefArray, packageRefArrayNullable, packageRefNullable, packageRefSchema, packageRefString, packageRefStringArray, packageRefStringArrayNullable, packageRefStringNullable, packageSpecificationSchema, packageSpecificationsSchema, packageStrategySchema, packageToFirestore, partnerApiRequestSchema, partnerApiResponseSchema, partnerAppSchema, partnerFirestoreSchema, partnerFromFirestore, partnerPricingStrategyAppSchema, partnerPricingStrategyFirestoreSchema, partnerRefArray, partnerRefArrayNullable, partnerRefNullable, partnerRefSchema, partnerRefString, partnerRefStringArray, partnerRefStringArrayNullable, partnerRefStringNullable, partnerToFirestore, paymentAppSchema, paymentFirestoreSchema, paymentFromFirestore, paymentRefArray, paymentRefArrayNullable, paymentRefNullable, paymentRefSchema, paymentRefString, paymentRefStringArray, paymentRefStringArrayNullable, paymentRefStringNullable, paymentToFirestore, platformSettingsSchema, priceListAppSchema, priceListFirestoreSchema, priceListFromFirestore, priceListRefArray, priceListRefArrayNullable, priceListRefNullable, priceListRefSchema, priceListRefString, priceListRefStringArray, priceListRefStringArrayNullable, priceListRefStringNullable, priceListToFirestore, profileRefArray, profileRefArrayNullable, profileRefNullable, profileRefSchema, profileRefString, profileRefStringArray, profileRefStringArrayNullable, profileRefStringNullable, promoCodeApiResponseSchema, promoCodeAppSchema, promoCodeFirestoreSchema, promoCodeFromFirestore, promoCodeRefArray, promoCodeRefArrayNullable, promoCodeRefNullable, promoCodeRefSchema, promoCodeRefString, promoCodeRefStringArray, promoCodeRefStringArrayNullable, promoCodeRefStringNullable, promoCodeToFirestore, registrationSchema, scheduleFilterSchema, scheduleSchema, sentMessagesAppSchema, sentMessagesFirestoreSchema, sentMessagesFromFirestore, sentMessagesToFirestore, supportedLocalesSchema, testEnv, timestampSchema, toFirestore, userAppSchema, userFirestoreSchema, userFromFirestore, userPricingStrategyAppSchema, userPricingStrategyFirestoreSchema, userRefArray, userRefArrayNullable, userRefNullable, userRefSchema, userRefString, userRefStringArray, userRefStringArrayNullable, userRefStringNullable, userToFirestore, userToFirestoreWithBalance, visualIdentityBannerSchema, visualIdentityBannerStrategySchema, visualIdentitySchema };
