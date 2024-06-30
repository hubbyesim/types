export type PricingStrategy = {
    name: string;
    parameters: any;
}

export type PackageStrategy = {
    name: string;
    parameters: any;
}

export type IframeConfig = {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    font: string;
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

export type Partner = {
    administration_fee: number;
    email: string;
    income_per_gb: number;
    last_invoice: string; // ISO 8601 date string
    name: string;
    next_invoice: string; // ISO 8601 date string
    requires_card: boolean;
    type: string;
    schedules: Schedule[];
    pricingStrategy?: PricingStrategy;
    packageStrategy?: PackageStrategy;
    travelSpiritConfig?: TravelSpiritConfig;
}
