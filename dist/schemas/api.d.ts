import { z } from 'zod';
export declare const packageSpecificationSchema: z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    size?: string | undefined;
    destination?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}, {
    size?: string | undefined;
    destination?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}>;
export declare const packageSpecificationsSchema: z.ZodArray<z.ZodObject<{
    destination: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    package_id: z.ZodOptional<z.ZodString>;
    iata_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    size?: string | undefined;
    destination?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}, {
    size?: string | undefined;
    destination?: string | undefined;
    package_id?: string | undefined;
    iata_code?: string | undefined;
}>, "many">;
export declare const communicationOptionsSchema: z.ZodObject<{
    should_send_message: z.ZodBoolean;
    channels: z.ZodArray<z.ZodEnum<["EMAIL", "WHATSAPP", "PUSH_NOTIFICATION", "SMS"]>, "many">;
}, "strip", z.ZodTypeAny, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}, {
    should_send_message: boolean;
    channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
}>;
export declare const bookingApiResponseSchema: z.ZodObject<{
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
    data: {
        source: string;
        manual: boolean;
    };
    id: string;
    title: string | null;
    email: string | null;
    status: "CANCELLED" | "PENDING" | "CONFIRMED" | "COMPLETED" | "UNPAID" | "EXPIRED";
    created_at: string;
    updated_at: string;
    phone: string | null;
    users: string[];
    esims: string[] | null;
    return_date: string | null;
    departure_date: string;
    partner: string;
    promo_codes: string[];
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    booking_id: string | null;
    locale: string;
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
    data: {
        source: string;
        manual: boolean;
    };
    id: string;
    title: string | null;
    email: string | null;
    status: "CANCELLED" | "PENDING" | "CONFIRMED" | "COMPLETED" | "UNPAID" | "EXPIRED";
    created_at: string;
    updated_at: string;
    phone: string | null;
    users: string[];
    esims: string[] | null;
    return_date: string | null;
    departure_date: string;
    partner: string;
    promo_codes: string[];
    first_name: string;
    last_name: string;
    full_name: string;
    pax: number;
    booking_id: string | null;
    locale: string;
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
export declare const promoCodeApiResponseSchema: z.ZodObject<{
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
export declare const bookingApiRequestSchema: z.ZodObject<{
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
        size?: string | undefined;
        destination?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }, {
        size?: string | undefined;
        destination?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }>, "many">;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    data: {
        source: string;
        manual: boolean;
    };
    id: string;
    title: string | null;
    status: "CANCELLED" | "PENDING" | "CONFIRMED" | "COMPLETED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
    return_date: Date | null;
    departure_date: Date;
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    package_specifications: {
        size?: string | undefined;
        destination?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }[];
    email?: string | null | undefined;
    phone?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    locale?: string | undefined;
    date_of_birth?: Date | undefined;
}, {
    data: {
        source: string;
        manual: boolean;
    };
    id: string;
    title: string | null;
    status: "CANCELLED" | "PENDING" | "CONFIRMED" | "COMPLETED" | "UNPAID" | "EXPIRED";
    created_at: Date;
    updated_at: Date;
    return_date: Date | null;
    departure_date: Date;
    communication_options: {
        should_send_message: boolean;
        channels: ("EMAIL" | "WHATSAPP" | "PUSH_NOTIFICATION" | "SMS")[];
    };
    is_processed_for_esim_restoration: boolean;
    is_pseudonymized: boolean;
    package_specifications: {
        size?: string | undefined;
        destination?: string | undefined;
        package_id?: string | undefined;
        iata_code?: string | undefined;
    }[];
    email?: string | null | undefined;
    phone?: string | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    full_name?: string | null | undefined;
    pax?: number | null | undefined;
    booking_id?: string | null | undefined;
    flight_number?: string | null | undefined;
    gender?: "M" | "F" | "O" | undefined;
    package_size?: string | undefined;
    sent_messages?: Record<string, any> | undefined;
    locale?: string | undefined;
    date_of_birth?: Date | undefined;
}>;
export declare const partnerApiRequestSchema: z.ZodObject<{
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
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    }, {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
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
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
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
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }, {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
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
    name: string | null;
    type: string | null;
    id: string;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    address?: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
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
    name: string | null;
    type: string | null;
    id: string;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    address?: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
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
export declare const partnerApiResponseSchema: z.ZodObject<{
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
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    }, {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
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
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
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
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }, {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    }, {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
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
    name: string | null;
    type: string | null;
    id: string;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    address?: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
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
    name: string | null;
    type: string | null;
    id: string;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
    } | null;
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        pricing_strategies?: {
            user: {
                default_price_list: string | null;
                custom_prices: any[];
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: any[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | undefined;
        commission_fee?: number | undefined;
    } | null;
    data?: {
        source: string;
        manual: boolean;
    } | undefined;
    address?: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null | undefined;
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
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
export type PackageSpecification = z.infer<typeof packageSpecificationSchema>;
export type PackageSpecifications = z.infer<typeof packageSpecificationsSchema>;
export type BookingApiRequest = z.infer<typeof bookingApiRequestSchema>;
export type BookingApiResponse = z.infer<typeof bookingApiResponseSchema>;
export type PromoCodeApiResponse = z.infer<typeof promoCodeApiResponseSchema>;
export type PartnerApiRequest = z.infer<typeof partnerApiRequestSchema>;
export type PartnerApiResponse = z.infer<typeof partnerApiResponseSchema>;
