import { buildServerSchema } from './schemas/builders/server';
import {
    userSchemaSpec,
    apiKeySpec,
    apiKeysSpec,
    apiKeysObjectSpec
} from './schemas/specs/user';
import {
    bookingSchemaSpec,
    communicationChannelSchema,
    bookingStatusSchema,
    communicationOptionsSchema
} from './schemas/specs/booking';
import { countrySchemaSpec } from './schemas/specs/country';
import { currencySchemaSpec } from './schemas/specs/currency';
import { esimSchemaSpec } from './schemas/specs/esim';
import { paymentSchemaSpec } from './schemas/specs/payment';
import { messageSchemaSpec } from './schemas/specs/message';
import { packageSchemaSpec } from './schemas/specs/package';
import { promoCodeSchemaSpec, packageSpecificationSchema as promoPackageSpecificationSchema } from './schemas/specs/promocode';
import {
    partnerSchemaSpec,
    priceListSchemaSpec,
    addressSchema,
    registrationSchema,
    bankingDetailsSchema,
    packageSpecificationSchema as partnerPackageSpecificationSchema,
    visualIdentityBannerSchema,
    scheduleFilterSchema,
    partnerContactSchema,
    partnerDataSchema
} from './schemas/specs/partner';
import { apiLogSchemaSpec } from './schemas/specs/apiLogs';
import { z } from 'zod';


export * from './index.client';

export const UserSchema = buildServerSchema(userSchemaSpec);
export const BookingSchema = buildServerSchema(bookingSchemaSpec);
export const CountrySchema = buildServerSchema(countrySchemaSpec);
export const CurrencySchema = buildServerSchema(currencySchemaSpec);
export const ESIMSchema = buildServerSchema(esimSchemaSpec);
export const PaymentSchema = buildServerSchema(paymentSchemaSpec);
export const MessageSchema = buildServerSchema(messageSchemaSpec);
export const PackageSchema = buildServerSchema(packageSchemaSpec);
export const PromoCodeSchema = buildServerSchema(promoCodeSchemaSpec);
export const PartnerSchema = buildServerSchema(partnerSchemaSpec);
export const PriceListSchema = buildServerSchema(priceListSchemaSpec);
export const ApiLogSchema = buildServerSchema(apiLogSchemaSpec);

// Additional lower-level schemas
export const AddressSchema = addressSchema;
export const RegistrationSchema = registrationSchema;
export const BankingDetailsSchema = bankingDetailsSchema;
export const PartnerPackageSpecificationSchema = partnerPackageSpecificationSchema;
export const PromoPackageSpecificationSchema = promoPackageSpecificationSchema;
export const VisualIdentityBannerSchema = visualIdentityBannerSchema;
export const ScheduleFilterSchema = scheduleFilterSchema;
export const PartnerContactSchema = partnerContactSchema;
export const PartnerDataSchema = partnerDataSchema;
export const CommunicationChannelSchema = communicationChannelSchema;
export const BookingStatusSchema = bookingStatusSchema;
export const CommunicationOptionsSchema = communicationOptionsSchema;

export type User = z.infer<typeof UserSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type ESIM = z.infer<typeof ESIMSchema>;
export type Payment = z.infer<typeof PaymentSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Package = z.infer<typeof PackageSchema>;
export type PromoCode = z.infer<typeof PromoCodeSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type PriceList = z.infer<typeof PriceListSchema>;
export type ApiLog = z.infer<typeof ApiLogSchema>;

// Additional lower-level types
export type Address = z.infer<typeof AddressSchema>;
export type Registration = z.infer<typeof RegistrationSchema>;
export type BankingDetails = z.infer<typeof BankingDetailsSchema>;
export type PartnerPackageSpecification = z.infer<typeof PartnerPackageSpecificationSchema>;
export type PromoPackageSpecification = z.infer<typeof PromoPackageSpecificationSchema>;
export type VisualIdentityBanner = z.infer<typeof VisualIdentityBannerSchema>;
export type ScheduleFilter = z.infer<typeof ScheduleFilterSchema>;
export type PartnerContact = z.infer<typeof PartnerContactSchema>;
export type PartnerData = z.infer<typeof PartnerDataSchema>;
export type CommunicationChannel = z.infer<typeof CommunicationChannelSchema>;
export type BookingStatus = z.infer<typeof BookingStatusSchema>;
export type CommunicationOptions = z.infer<typeof CommunicationOptionsSchema>;

