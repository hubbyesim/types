import { z } from 'zod';

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
declare const HApiLogSchema: z.ZodTypeAny;
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
type HScheduleFilter = z.infer<typeof HScheduleFilterSchema>;
type HPartnerContact = z.infer<typeof HPartnerContactSchema>;
type HPartnerData = z.infer<typeof HPartnerDataSchema>;
type HCommunicationChannel = z.infer<typeof HCommunicationChannelSchema>;
type HBookingStatus = z.infer<typeof HBookingStatusSchema>;
type HCommunicationOptions = z.infer<typeof HCommunicationOptionsSchema>;

declare const UserSchema: z.ZodTypeAny;
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
type User = z.infer<typeof UserSchema>;
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
type Address = z.infer<typeof AddressSchema>;
type Registration = z.infer<typeof RegistrationSchema>;
type BankingDetails = z.infer<typeof BankingDetailsSchema>;
type PartnerPackageSpecification = z.infer<typeof PartnerPackageSpecificationSchema>;
type PromoPackageSpecification = z.infer<typeof PromoPackageSpecificationSchema>;
type VisualIdentityBanner = z.infer<typeof VisualIdentityBannerSchema>;
type ScheduleFilter = z.infer<typeof ScheduleFilterSchema>;
type PartnerContact = z.infer<typeof PartnerContactSchema>;
type PartnerData = z.infer<typeof PartnerDataSchema>;
type CommunicationChannel = z.infer<typeof CommunicationChannelSchema>;
type BookingStatus = z.infer<typeof BookingStatusSchema>;
type CommunicationOptions = z.infer<typeof CommunicationOptionsSchema>;

export { Address, AddressSchema, ApiLog, ApiLogSchema, BankingDetails, BankingDetailsSchema, Booking, BookingSchema, BookingStatus, BookingStatusSchema, CommunicationChannel, CommunicationChannelSchema, CommunicationOptions, CommunicationOptionsSchema, Country, CountrySchema, Currency, CurrencySchema, ESIM, ESIMSchema, HAddress, HAddressSchema, HApiLog, HApiLogSchema, HBankingDetails, HBankingDetailsSchema, HBooking, HBookingSchema, HBookingStatus, HBookingStatusSchema, HCommunicationChannel, HCommunicationChannelSchema, HCommunicationOptions, HCommunicationOptionsSchema, HCountry, HCountrySchema, HCurrency, HCurrencySchema, HESIM, HESIMSchema, HMessage, HMessageSchema, HPackage, HPackageSchema, HPartner, HPartnerContact, HPartnerContactSchema, HPartnerData, HPartnerDataSchema, HPartnerPackageSpecification, HPartnerPackageSpecificationSchema, HPartnerSchema, HPayment, HPaymentSchema, HPriceList, HPriceListSchema, HPromoCode, HPromoCodeSchema, HPromoPackageSpecification, HPromoPackageSpecificationSchema, HRegistration, HRegistrationSchema, HScheduleFilter, HScheduleFilterSchema, HUser, HUserSchema, HVisualIdentityBanner, HVisualIdentityBannerSchema, Message, MessageSchema, Package, PackageSchema, Partner, PartnerContact, PartnerContactSchema, PartnerData, PartnerDataSchema, PartnerPackageSpecification, PartnerPackageSpecificationSchema, PartnerSchema, Payment, PaymentSchema, PriceList, PriceListSchema, PromoCode, PromoCodeSchema, PromoPackageSpecification, PromoPackageSpecificationSchema, Registration, RegistrationSchema, ScheduleFilter, ScheduleFilterSchema, User, UserSchema, VisualIdentityBanner, VisualIdentityBannerSchema };
