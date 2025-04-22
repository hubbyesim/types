import { z } from 'zod';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
export declare const PARTNER_COLLECTION = "partners";
export declare const PRICE_LIST_COLLECTION = "priceLists";
export declare const PACKAGE_COLLECTION = "packages";
export declare const USER_COLLECTION = "users";
export declare const partnerRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const priceListRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const packageRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const userRefSchema: {
    schema: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    collectionPath: string;
};
export declare const addressSchema: z.ZodNullable<z.ZodObject<{
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
}>>;
export declare const registrationSchema: z.ZodNullable<z.ZodObject<{
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
export declare const bankingDetailsSchema: z.ZodNullable<z.ZodObject<{
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
export declare const packagePriceFirestoreSchema: z.ZodObject<{
    package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    label: string;
    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    destination: string;
    price: number;
}, {
    type: "data-limit" | "time-limit";
    label: string;
    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
    destination: string;
    price: number;
}>;
export declare const packagePriceAppSchema: z.ZodObject<{
    package: z.ZodString;
    destination: z.ZodString;
    label: z.ZodString;
    type: z.ZodEnum<["data-limit", "time-limit"]>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "data-limit" | "time-limit";
    label: string;
    package: string;
    destination: string;
    price: number;
}, {
    type: "data-limit" | "time-limit";
    label: string;
    package: string;
    destination: string;
    price: number;
}>;
export declare const pricingStrategyFirestoreSchema: z.ZodObject<{
    default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }>, "many">;
    strategy: z.ZodEnum<["split", "bundle"]>;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }[];
    strategy: "split" | "bundle";
    modification_percentage: number;
}, {
    default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }[];
    strategy: "split" | "bundle";
    modification_percentage: number;
}>;
export declare const pricingStrategyAppSchema: z.ZodObject<{
    default_price_list: z.ZodNullable<z.ZodString>;
    custom_prices: z.ZodArray<z.ZodObject<{
        package: z.ZodString;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }>, "many">;
    strategy: z.ZodEnum<["split", "bundle"]>;
    modification_percentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }[];
    strategy: "split" | "bundle";
    modification_percentage: number;
}, {
    default_price_list: string | null;
    custom_prices: {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }[];
    strategy: "split" | "bundle";
    modification_percentage: number;
}>;
export declare const financialPropertiesFirestoreSchema: z.ZodNullable<z.ZodObject<{
    pricing_strategies: z.ZodNullable<z.ZodObject<{
        partner: z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }>, "many">;
            strategy: z.ZodEnum<["split", "bundle"]>;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }, {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }>;
        user: z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }>, "many">;
            strategy: z.ZodEnum<["split", "bundle"]>;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }, {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    }, {
        user: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    }>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodNullable<z.ZodDate>;
    last_invoice: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    pricing_strategies: {
        user: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    commission_fee?: number | null | undefined;
}, {
    pricing_strategies: {
        user: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    commission_fee?: number | null | undefined;
}>>;
export declare const financialPropertiesAppSchema: z.ZodNullable<z.ZodObject<{
    pricing_strategies: z.ZodNullable<z.ZodObject<{
        partner: z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodString>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodString;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }>, "many">;
            strategy: z.ZodEnum<["split", "bundle"]>;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }>;
        user: z.ZodObject<{
            default_price_list: z.ZodNullable<z.ZodString>;
            custom_prices: z.ZodArray<z.ZodObject<{
                package: z.ZodString;
                destination: z.ZodString;
                label: z.ZodString;
                type: z.ZodEnum<["data-limit", "time-limit"]>;
                price: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }, {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }>, "many">;
            strategy: z.ZodEnum<["split", "bundle"]>;
            modification_percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }, {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    }, {
        user: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    }>>;
    administration_fee: z.ZodNullable<z.ZodNumber>;
    income_per_gb: z.ZodNullable<z.ZodNumber>;
    commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    payment_method: z.ZodEnum<["invoice", "direct"]>;
    requires_card: z.ZodNullable<z.ZodBoolean>;
    next_invoice: z.ZodNullable<z.ZodDate>;
    last_invoice: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    pricing_strategies: {
        user: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    commission_fee?: number | null | undefined;
}, {
    pricing_strategies: {
        user: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
        partner: {
            default_price_list: string | null;
            custom_prices: {
                type: "data-limit" | "time-limit";
                label: string;
                package: string;
                destination: string;
                price: number;
            }[];
            strategy: "split" | "bundle";
            modification_percentage: number;
        };
    } | null;
    administration_fee: number | null;
    income_per_gb: number | null;
    payment_method: "direct" | "invoice";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    commission_fee?: number | null | undefined;
}>>;
export declare const packageStrategySchema: z.ZodObject<{
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
export declare const bookingDefaultsSchema: z.ZodObject<{
    locale: z.ZodEnum<["en-US", "en-GB", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL", "pt-PT", "fr-BE", "nl-BE", "de-AT", "de-CH", "fr-CH", "it-CH", "de-BE"]>;
}, "strip", z.ZodTypeAny, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
}, {
    locale: "en-US" | "en-GB" | "nl-NL" | "de-DE" | "fr-FR" | "it-IT" | "es-ES" | "cs-CZ" | "pl-PL" | "pt-PT" | "fr-BE" | "nl-BE" | "de-AT" | "de-CH" | "fr-CH" | "it-CH" | "de-BE";
}>;
export declare const bookingConfirmationSchema: z.ZodObject<{
    brevo_template_id: z.ZodNumber;
    send_booking_confirmation: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}, {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}>;
export declare const visualIdentityBannerSchema: z.ZodObject<{
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
export declare const visualIdentityBannerStrategySchema: z.ZodObject<{
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
export declare const visualIdentitySchema: z.ZodObject<{
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
    font: string;
    primary_color: string;
    secondary_color: string;
    logo: string;
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
    font: string;
    primary_color: string;
    secondary_color: string;
    logo: string;
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
export declare const scheduleFilterSchema: z.ZodNullable<z.ZodObject<{
    type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
}, "strip", z.ZodTypeAny, {
    type: "age" | "gender" | "iso3" | "percentage";
    value: string | number;
    comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
}, {
    type: "age" | "gender" | "iso3" | "percentage";
    value: string | number;
    comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
}>>;
export declare const scheduleSchema: z.ZodObject<{
    days: z.ZodNumber;
    email: z.ZodNullable<z.ZodObject<{
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
    }>>;
    push: z.ZodNullable<z.ZodObject<{
        title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        target: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        target: string;
        body?: Record<string, string> | undefined;
        title?: Record<string, string> | undefined;
    }, {
        target: string;
        body?: Record<string, string> | undefined;
        title?: Record<string, string> | undefined;
    }>>;
    hour: z.ZodNumber;
    key: z.ZodString;
    method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
    moment: z.ZodEnum<["departure", "return", "immediate"]>;
    filter: z.ZodNullable<z.ZodObject<{
        type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
    }, "strip", z.ZodTypeAny, {
        type: "age" | "gender" | "iso3" | "percentage";
        value: string | number;
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    }, {
        type: "age" | "gender" | "iso3" | "percentage";
        value: string | number;
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    }>>;
}, "strip", z.ZodTypeAny, {
    filter: {
        type: "age" | "gender" | "iso3" | "percentage";
        value: string | number;
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    } | null;
    push: {
        target: string;
        body?: Record<string, string> | undefined;
        title?: Record<string, string> | undefined;
    } | null;
    key: string;
    method: "push" | "email" | "sms" | "whatsapp";
    email: {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    } | null;
    hour: number;
    days: number;
    moment: "departure" | "return" | "immediate";
}, {
    filter: {
        type: "age" | "gender" | "iso3" | "percentage";
        value: string | number;
        comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
    } | null;
    push: {
        target: string;
        body?: Record<string, string> | undefined;
        title?: Record<string, string> | undefined;
    } | null;
    key: string;
    method: "push" | "email" | "sms" | "whatsapp";
    email: {
        brevo_template_id: number;
        subject?: Record<string, string> | undefined;
        preview_text?: Record<string, string> | undefined;
    } | null;
    hour: number;
    days: number;
    moment: "departure" | "return" | "immediate";
}>;
export declare const platformSettingsSchema: z.ZodNullable<z.ZodObject<{
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
        email: z.ZodNullable<z.ZodObject<{
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
        }>>;
        push: z.ZodNullable<z.ZodObject<{
            title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            target: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        }, {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        }>>;
        hour: z.ZodNumber;
        key: z.ZodString;
        method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
        moment: z.ZodEnum<["departure", "return", "immediate"]>;
        filter: z.ZodNullable<z.ZodObject<{
            type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
        }, "strip", z.ZodTypeAny, {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        }, {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        }>>;
    }, "strip", z.ZodTypeAny, {
        filter: {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null;
        push: {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        } | null;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        email: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null;
        hour: number;
        days: number;
        moment: "departure" | "return" | "immediate";
    }, {
        filter: {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null;
        push: {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        } | null;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        email: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null;
        hour: number;
        days: number;
        moment: "departure" | "return" | "immediate";
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
        filter: {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null;
        push: {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        } | null;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        email: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null;
        hour: number;
        days: number;
        moment: "departure" | "return" | "immediate";
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
        filter: {
            type: "age" | "gender" | "iso3" | "percentage";
            value: string | number;
            comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
        } | null;
        push: {
            target: string;
            body?: Record<string, string> | undefined;
            title?: Record<string, string> | undefined;
        } | null;
        key: string;
        method: "push" | "email" | "sms" | "whatsapp";
        email: {
            brevo_template_id: number;
            subject?: Record<string, string> | undefined;
            preview_text?: Record<string, string> | undefined;
        } | null;
        hour: number;
        days: number;
        moment: "departure" | "return" | "immediate";
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
export declare const partnerFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    parent: z.ZodNullable<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
    users: z.ZodNullable<z.ZodArray<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, "many">>;
    financial_properties: z.ZodNullable<z.ZodObject<{
        pricing_strategies: z.ZodNullable<z.ZodObject<{
            partner: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }>, "many">;
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }>;
            user: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }>, "many">;
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }, {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        pricing_strategies: {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    }, {
        pricing_strategies: {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
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
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    }, {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
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
            email: z.ZodNullable<z.ZodObject<{
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
            }>>;
            push: z.ZodNullable<z.ZodObject<{
                title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                target: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            }, {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            }>>;
            hour: z.ZodNumber;
            key: z.ZodString;
            method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
            moment: z.ZodEnum<["departure", "return", "immediate"]>;
            filter: z.ZodNullable<z.ZodObject<{
                type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
            }, "strip", z.ZodTypeAny, {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }, {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }>>;
        }, "strip", z.ZodTypeAny, {
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
        }, {
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    name: string | null;
    type: string | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    id: string;
    address: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null;
    parent: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    financial_properties: {
        pricing_strategies: {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    name: string | null;
    type: string | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    id: string;
    address: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null;
    parent: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    users: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>[] | null;
    financial_properties: {
        pricing_strategies: {
            user: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
export declare const partnerAppSchema: z.ZodObject<{
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
            partner: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodString;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }>, "many">;
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }>;
            user: z.ZodObject<{
                default_price_list: z.ZodNullable<z.ZodString>;
                custom_prices: z.ZodArray<z.ZodObject<{
                    package: z.ZodString;
                    destination: z.ZodString;
                    label: z.ZodString;
                    type: z.ZodEnum<["data-limit", "time-limit"]>;
                    price: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }, {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }>, "many">;
                strategy: z.ZodEnum<["split", "bundle"]>;
                modification_percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }, {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }, {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        }>>;
        administration_fee: z.ZodNullable<z.ZodNumber>;
        income_per_gb: z.ZodNullable<z.ZodNumber>;
        commission_fee: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        payment_method: z.ZodEnum<["invoice", "direct"]>;
        requires_card: z.ZodNullable<z.ZodBoolean>;
        next_invoice: z.ZodNullable<z.ZodDate>;
        last_invoice: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        pricing_strategies: {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    }, {
        pricing_strategies: {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
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
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    }, {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
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
            email: z.ZodNullable<z.ZodObject<{
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
            }>>;
            push: z.ZodNullable<z.ZodObject<{
                title: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                target: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            }, {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            }>>;
            hour: z.ZodNumber;
            key: z.ZodString;
            method: z.ZodEnum<["email", "sms", "whatsapp", "push"]>;
            moment: z.ZodEnum<["departure", "return", "immediate"]>;
            filter: z.ZodNullable<z.ZodObject<{
                type: z.ZodEnum<["iso3", "gender", "percentage", "age"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                comparison: z.ZodEnum<["equal", "not_equal", "greater_than", "less_than", "greater_than_or_equal", "less_than_or_equal"]>;
            }, "strip", z.ZodTypeAny, {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }, {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            }>>;
        }, "strip", z.ZodTypeAny, {
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
        }, {
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    name: string | null;
    type: string | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    id: string;
    address: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    financial_properties: {
        pricing_strategies: {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}, {
    name: string | null;
    type: string | null;
    data: {
        source: string;
        manual: boolean;
    } | null;
    id: string;
    address: {
        country?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
    } | null;
    parent: string | null;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    users: string[] | null;
    financial_properties: {
        pricing_strategies: {
            user: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
            partner: {
                default_price_list: string | null;
                custom_prices: {
                    type: "data-limit" | "time-limit";
                    label: string;
                    package: string;
                    destination: string;
                    price: number;
                }[];
                strategy: "split" | "bundle";
                modification_percentage: number;
            };
        } | null;
        administration_fee: number | null;
        income_per_gb: number | null;
        payment_method: "direct" | "invoice";
        requires_card: boolean | null;
        next_invoice: Date | null;
        last_invoice: Date | null;
        commission_fee?: number | null | undefined;
    } | null;
    contact: {
        email: string | null;
        office_phone?: string | null | undefined;
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
            filter: {
                type: "age" | "gender" | "iso3" | "percentage";
                value: string | number;
                comparison: "equal" | "not_equal" | "greater_than" | "less_than" | "greater_than_or_equal" | "less_than_or_equal";
            } | null;
            push: {
                target: string;
                body?: Record<string, string> | undefined;
                title?: Record<string, string> | undefined;
            } | null;
            key: string;
            method: "push" | "email" | "sms" | "whatsapp";
            email: {
                brevo_template_id: number;
                subject?: Record<string, string> | undefined;
                preview_text?: Record<string, string> | undefined;
            } | null;
            hour: number;
            days: number;
            moment: "departure" | "return" | "immediate";
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
        font: string;
        primary_color: string;
        secondary_color: string;
        logo: string;
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
    is_active?: boolean | null | undefined;
    external_id?: string | null | undefined;
}>;
export declare const priceListFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    updated_at: z.ZodType<Timestamp, z.ZodTypeDef, Timestamp>;
    created_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
    updated_by: z.ZodUnion<[z.ZodString, z.ZodNull, z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>]>;
} & {
    price_list: z.ZodArray<z.ZodObject<{
        package: z.ZodEffects<z.ZodType<DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, z.ZodTypeDef, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>, DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>>;
        destination: z.ZodString;
        label: z.ZodString;
        type: z.ZodEnum<["data-limit", "time-limit"]>;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }>, "many">;
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["partner", "user"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "user" | "partner";
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    price_list: {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }[];
}, {
    name: string;
    id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    created_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    updated_by: string | DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null;
    price_list: {
        type: "data-limit" | "time-limit";
        label: string;
        package: DocumentReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>;
        destination: string;
        price: number;
    }[];
    type?: "user" | "partner" | undefined;
}>;
export declare const priceListAppSchema: z.ZodObject<{
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
        label: string;
        package: string;
        destination: string;
        price: number;
    }, {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }>, "many">;
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["partner", "user"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "user" | "partner";
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    price_list: {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }[];
}, {
    name: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    created_by: string | null;
    updated_by: string | null;
    price_list: {
        type: "data-limit" | "time-limit";
        label: string;
        package: string;
        destination: string;
        price: number;
    }[];
    type?: "user" | "partner" | undefined;
}>;
export type PartnerFirestore = z.infer<typeof partnerFirestoreSchema>;
export type PartnerApp = z.infer<typeof partnerAppSchema>;
export type PriceListFirestore = z.infer<typeof priceListFirestoreSchema>;
export type PriceListApp = z.infer<typeof priceListAppSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Registration = z.infer<typeof registrationSchema>;
export type BankingDetails = z.infer<typeof bankingDetailsSchema>;
export type PackagePriceFirestore = z.infer<typeof packagePriceFirestoreSchema>;
export type PackagePriceApp = z.infer<typeof packagePriceAppSchema>;
export type PricingStrategyFirestore = z.infer<typeof pricingStrategyFirestoreSchema>;
export type PricingStrategyApp = z.infer<typeof pricingStrategyAppSchema>;
export type FinancialPropertiesFirestore = z.infer<typeof financialPropertiesFirestoreSchema>;
export type FinancialPropertiesApp = z.infer<typeof financialPropertiesAppSchema>;
export type PackageStrategy = z.infer<typeof packageStrategySchema>;
export type BookingDefaults = z.infer<typeof bookingDefaultsSchema>;
export type BookingConfirmation = z.infer<typeof bookingConfirmationSchema>;
export type VisualIdentityBanner = z.infer<typeof visualIdentityBannerSchema>;
export type VisualIdentityBannerStrategy = z.infer<typeof visualIdentityBannerStrategySchema>;
export type VisualIdentity = z.infer<typeof visualIdentitySchema>;
export type ScheduleFilter = z.infer<typeof scheduleFilterSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type PlatformSettings = z.infer<typeof platformSettingsSchema>;
export declare const partnerToFirestore: (partner: PartnerApp) => PartnerFirestore;
export declare const partnerFromFirestore: (firestorePartner: PartnerFirestore) => PartnerApp;
export declare const priceListFromFirestore: (firestorePriceList: PriceListFirestore) => PriceListApp;
export declare const priceListToFirestore: (priceList: PriceListApp) => PriceListFirestore;
export type Partner = PartnerFirestore;
export type HPartner = PartnerApp;
export type PriceList = PriceListFirestore;
export type HPriceList = PriceListApp;
export type PackagePrice = z.infer<typeof packagePriceAppSchema>;
