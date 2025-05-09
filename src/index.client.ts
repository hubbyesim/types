import { buildClientSchema } from './schemas/builders/client';
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
import { SUPPORTED_LOCALES as LOCALES, hubbyModelSpec } from './schemas/specs/common';
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
  partnerDataSchema,
  financialPropertiesSchema,
  packagePriceSchema,
  platformSettingsSchema,
  visualIdentitySchema,
  pricingStrategySchema,
  freeEsimSchema
} from './schemas/specs/partner';
import { apiLogSchemaSpec } from './schemas/specs/apiLogs';
import { z } from 'zod';

export const HUserSchema = buildClientSchema(userSchemaSpec);
export const HBookingSchema = buildClientSchema(bookingSchemaSpec);
export const HCountrySchema = buildClientSchema(countrySchemaSpec);
export const HCurrencySchema = buildClientSchema(currencySchemaSpec);
export const HESIMSchema = buildClientSchema(esimSchemaSpec);
export const HPaymentSchema = buildClientSchema(paymentSchemaSpec);
export const HMessageSchema = buildClientSchema(messageSchemaSpec);
export const HPackageSchema = buildClientSchema(packageSchemaSpec);
export const HPromoCodeSchema = buildClientSchema(promoCodeSchemaSpec);
export const HPartnerSchema = buildClientSchema(partnerSchemaSpec);
export const HPriceListSchema = buildClientSchema(priceListSchemaSpec);
export const HFinancialPropertiesSchema = buildClientSchema(financialPropertiesSchema);
export const HApiLogSchema = buildClientSchema(apiLogSchemaSpec);
export const HPackagePriceSchema = buildClientSchema(packagePriceSchema);
export const HubbyModelSchema = buildClientSchema(hubbyModelSpec);
export const HPartnerAppSchema = buildClientSchema(partnerSchemaSpec);
export const HPlatformSettingsSchema = buildClientSchema(platformSettingsSchema);
export const HVisualIdentitySchema = buildClientSchema(visualIdentitySchema);
export const HPricingStrategySchema = buildClientSchema(pricingStrategySchema);
export const HFreeEsimSchema = buildClientSchema(freeEsimSchema);
// Additional lower-level schemas
export const HAddressSchema = addressSchema;
export const HRegistrationSchema = registrationSchema;
export const HBankingDetailsSchema = bankingDetailsSchema;
export const HPartnerPackageSpecificationSchema = partnerPackageSpecificationSchema;
export const HPromoPackageSpecificationSchema = promoPackageSpecificationSchema;
export const HVisualIdentityBannerSchema = visualIdentityBannerSchema;
export const HScheduleFilterSchema = scheduleFilterSchema;
export const HPartnerContactSchema = partnerContactSchema;
export const HPartnerDataSchema = partnerDataSchema;
export const HCommunicationChannelSchema = communicationChannelSchema;
export const HBookingStatusSchema = bookingStatusSchema;
export const HCommunicationOptionsSchema = communicationOptionsSchema;

export type HUser = z.infer<typeof HUserSchema>;
export type HBooking = z.infer<typeof HBookingSchema>;
export type HCountry = z.infer<typeof HCountrySchema>;
export type HCurrency = z.infer<typeof HCurrencySchema>;
export type HESIM = z.infer<typeof HESIMSchema>;
export type HPayment = z.infer<typeof HPaymentSchema>;
export type HMessage = z.infer<typeof HMessageSchema>;
export type HPackage = z.infer<typeof HPackageSchema>;
export type HPromoCode = z.infer<typeof HPromoCodeSchema>;
export type HPartner = z.infer<typeof HPartnerSchema>;
export type HPriceList = z.infer<typeof HPriceListSchema>;
export type HApiLog = z.infer<typeof HApiLogSchema>;

// Additional lower-level types
export type HAddress = z.infer<typeof HAddressSchema>;
export type HRegistration = z.infer<typeof HRegistrationSchema>;
export type HBankingDetails = z.infer<typeof HBankingDetailsSchema>;
export type HPartnerPackageSpecification = z.infer<typeof HPartnerPackageSpecificationSchema>;
export type HPromoPackageSpecification = z.infer<typeof HPromoPackageSpecificationSchema>;
export type HVisualIdentityBanner = z.infer<typeof HVisualIdentityBannerSchema>;
export type HFinancialProperties = z.infer<typeof HFinancialPropertiesSchema>;
export type HScheduleFilter = z.infer<typeof HScheduleFilterSchema>;
export type HPartnerContact = z.infer<typeof HPartnerContactSchema>;
export type HPartnerData = z.infer<typeof HPartnerDataSchema>;
export type HCommunicationChannel = z.infer<typeof HCommunicationChannelSchema>;
export type HBookingStatus = z.infer<typeof HBookingStatusSchema>;
export type HCommunicationOptions = z.infer<typeof HCommunicationOptionsSchema>;
export type HHubbyModel = z.infer<typeof HubbyModelSchema>;

export type HubbyModelApp = HHubbyModel;

export type SupportedLocales = typeof SUPPORTED_LOCALES[number];
export const SUPPORTED_LOCALES = LOCALES; 
