import { DocumentReference } from 'firebase-admin/firestore'
import { HubbyModel } from './hubby';
import { Package } from './package';
import { PackageSpecifications } from './api';
import type { SupportedLocales } from './constants';

export type Partner = {
    // Basic information
    id: string;
    name: string | null;
    type: string | null;
    is_active?: boolean | null;
    external_id?: string | null;
    parent: DocumentReference | null;

    // Contact information
    contact: {
        email: string | null;
        office_phone?: string | null;
    } | null;

    // Location information
    address?: {
        street?: string;
        city?: string;
        postal_code?: string;
        country?: string;
    } | null;

    // Registration information
    registration?: {
        chamber_of_commerce_number?: string | null;
        vat_number?: string | null;
        anvr_number?: number | null;
        tax_number?: string | null;
    } | null;

    // Banking information
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;

    // Financial information
    financial_properties: FinancialProperties | null;

    // Platform settings
    platform_settings?: PlatformSettings | null;

    // Visual identity
    visual_identity: VisualIdentity | null;

    // User management
    users: DocumentReference[] | null;

    // Metadata
    data?: {
        source: string;
        manual: boolean;
    } | null;
} & HubbyModel;

export type PlatformSettings = {
    package_strategy?: PackageStrategy | null;
    free_esim: {
        allowance: number | null;
        package_specifications: PackageSpecifications | null;
    } | null;
    booking_defaults: BookingDefaults | null;

    // Communication
    schedules: Schedule[] | null;
    booking_confirmation: BookingConfirmation | null;
} | null;

export type FinancialProperties = {
    administration_fee: number | null;
    income_per_gb: number | null;
    commission_fee?: number | null;
    payment_method: "invoice" | "direct";
    requires_card: boolean | null;
    next_invoice: Date | null;
    last_invoice: Date | null;
    pricing_strategies?: {
        partner: {
            strategy: "split" | "bundle";
            default_price_list: DocumentReference<PriceList> | null;
            custom_prices: PackagePricing[];
            modification_percentage: number;
        },
        user: {
            default_price_list: DocumentReference<PriceList> | null;
            custom_prices: PackagePricing[];
            modification_percentage: number;
        }
    } | null;
} | null;

export type PriceList = {
    id: string;
    name: string;
    price_list: PackagePricing[];
} & HubbyModel;

export type PackagePricing = {
    destination: string;
    label: string;
    package: DocumentReference<Package>;
    type: "data-limit" | "time-limit";
    price: number;
}

export type BookingDefaults = {
    locale: SupportedLocales
}

export type BookingConfirmation = {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}

export type VisualIdentity = {
    primary_color: string;
    secondary_color: string;
    logo: string;
    font: string;
    top_banner: VisualIdentityBannerStrategy;
    mid_banner: VisualIdentityBannerStrategy;
}

export type VisualIdentityBannerStrategy = {
    strategy: "fixed" | "rotating" | "destination" | "time_of_day"
    banners: VisualIdentityBanner[];
}

export type VisualIdentityBanner = {
    image_url: string;
    alt: string;
    click_url: string;
    locale: SupportedLocales;
    properties: {
        [key: string]: string;
    }
}


// Marked for deprecation
export type PackageStrategy = {
    name: string;
    iso3_white_list?: string[];
    parameters: any;
}

export type Schedule = {
    days: number;
    email: {
        brevo_template_id: number;
        subject?: Record<SupportedLocales, string>;
        preview_text?: Record<SupportedLocales, string>;
    } | null;
    push: {
        title?: Record<SupportedLocales, string>;
        body?: Record<SupportedLocales, string>;
        target: string;
    } | null;
    hour: number;
    key: string;
    method: 'email' | 'sms' | 'whatsapp' | 'push';
    moment: 'departure' | 'return' | 'immediate';
    filter: {
        type: 'iso3' | 'gender' | 'percentage' | 'age';
        value: string | number;
        comparison: 'equal' | 'not_equal' | 'greater_than' | 'less_than' | 'greater_than_or_equal' | 'less_than_or_equal';
    } | null;
}

