import { DocumentReference, Timestamp } from 'firebase-admin/firestore'
import { HubbyModel, SupportedLocales } from './hubby';
import { Booking } from './booking';
import { PackageSpecifications } from './api';

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
    
    // Financial information
    finance: {
        administration_fee: number | null;
        income_per_gb: number | null;
        commission_fee?: number | null;
        payment_method: "invoice" | "direct";
        requires_card: boolean | null;
        next_invoice: Timestamp | null;
        last_invoice: Timestamp | null;   
        pricing_strategy?: {
            strategy: "split" | "bundle";
            default_price_list: string;
            custom_prices: PartnerPricing[];
        } | null;
    } | null;
    
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    
    // Platform settings
    platform_settings?: {
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

export type PartnerPricing = {
    iso3: string;
    label: "1GB" | "1DAY";
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
    strategy: "fixed" | "rotating" | "destination" | "timeOfDay"
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
    iso3WhiteList?: string[];
    parameters: any;
}

export type Schedule = {
    days: number;
    email: {
        brevoTemplateId: number;
        travelerBrevoTemplateId?: number;
    };
    hour: number;
    key: string;
    method: string;
    moment: string;
    subject?: Record<SupportedLocales, string>;
    previewText?: Record<SupportedLocales, string>;
}

