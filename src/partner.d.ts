import { DocumentReference, Timestamp } from 'firebase-admin/firestore'
import { HubbyModel } from './hubby';
import { Booking } from './booking';

export type Partner = {
    administration_fee: number | null;
    email: string | null;
    income_per_gb: number | null;
    name: string | null;
    requires_card: boolean | null;
    type: string | null;
    schedules: Schedule[] | null;
    visualIdentity: VisualIdentity | null;
    pricingStrategy?: PricingStrategy | null;
    packageStrategy?: PackageStrategy | null;
    travelSpiritConfig?: TravelSpiritConfig | null;
    next_invoice: Timestamp | null;
    last_invoice: Timestamp | null;
    parent: DocumentReference | null;
    payment_method: "invoice" | "direct",
    booking_confirmation: BookingConfirmation | null
    users: DocumentReference[] | null
    is_active?: boolean | null
    booking_defaults: BookingDefaults | null
    external_id?: string | null
    address?: {
        street?: string;
        city?: string;
        postal_code?: string;
        country?: string;
    } | null;
    banking_details?: {
        account_holder: string;
        bank_name: string;
        iban: string;
    } | null;
    office_phone?: string | null;
    chamber_of_commerce_number?: string | null;
    vat_number?: string | null;
    anvr_number?: number | null;
    tax_number?: string | null;
    commission_fee?: number | null;
    data?: {
        source: string;
        manual: boolean;
    } | null;
} & HubbyModel;

export type BookingDefaults = {
    locale: "en-GB" | "fr" | "de" | "it" | "es" | "pt" | "nl" | "pl" | "ru" | "ja" | "zh" | "ar" | "cz";
}

export type BookingConfirmation = {
    brevo_template_id: number;
    send_booking_confirmation: boolean;
}

export type VisualIdentity = {
    primary_color: string;
    secondary_color: string;
    tertiary_color: string;
    border_color: string;
    icon_color: string;
    text_color: string;
    background_color: string;
    card_color: string;
    button: ButtonColor;
    dataMeter: DataMeterColor;
    menu_bar: MenuBarColor;
    logo: string;
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
    properties: {
        [key: string]: string;
    }
}

export type ButtonColor = {
    color: string;
    text_color: string;
}

export type DataMeterColor = {
    full_color: string;
    empty_color: string;
}

export type MenuBarColor = {
    background_color: string;
    icon_color: string;
    text_color: string;
}

export type PricingStrategy = {
    name: string;
    parameters: any;
}

export type PackageStrategy = {
    name: string;
    iso3WhiteList?: string[];
    parameters: any;
}

export type IframeConfig = {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    font: string;
    iframe: string;
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
}

export type TravelSpiritConfig = {
    id: string;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    tableName: string;
    schedule: string;
    externalPartnerName: string;
}

