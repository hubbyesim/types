import { Timestamp } from 'firebase-admin/firestore'
import { HubbyModel } from './hubby';

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
    payment_method: "invoice" | "direct"
} & HubbyModel;

export type VisualIdentity = {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    borderColor: string;
    buttonColor: string;
    iconColor: string;
    textColor: string;
    buttonTextColor: string;
    backgroundColor: string;
    fullDataMeterColor: string;
    emptyDataMeterColor: string;
    cardColor: string;
    menuBarColor: string;
    menuBarIconColor: string;
    menuBarTextColor: string;
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
}

