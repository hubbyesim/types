import { buildClientSchema } from './builders/client';
import {
  userSchemaSpec,
  apiKeySpec,
  apiKeysSpec,
  apiKeysObjectSpec
} from './specs/user';
import {
  bookingSchemaSpec,
  communicationChannelSchema,
  bookingStatusSchema,
  communicationOptionsSchema
} from './specs/booking';
import { hubbyModelSpec } from './specs/common';
import { SUPPORTED_LOCALES as LOCALES } from './constants';
import { countrySchemaSpec } from './specs/country';
import { currencySchemaSpec } from './specs/currency';
import { esimSchemaSpec } from './specs/esim';
import { paymentSchemaSpec } from './specs/payment';
import { messageSchemaSpec } from './specs/message';
import { packageSchemaSpec } from './specs/package';
import { promoCodeSchemaSpec, packageSpecificationSchema as promoPackageSpecificationSchema } from './specs/promocode';
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
  financialPropertiesSchemaSpec as financialPropertiesSchema,
  packagePriceSchema,
  platformSettingsSchema,
  visualIdentitySchema,
  pricingStrategySchema,
  freeEsimSchema,
} from './specs/partner';
import { analyticsSpec } from './specs/analytics';
import { apiLogSchemaSpec } from './specs/apiLogs';
import { z } from 'zod';
import { roleSchemaSpec } from './specs/role';
import { permissionSchemaSpec } from './specs/permission';

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
export const HAnalyticsSchema = buildClientSchema(analyticsSpec);
export const HRoleSchema = buildClientSchema(roleSchemaSpec);
export const HPermissionSchema = buildClientSchema(permissionSchemaSpec);

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


export type HAnalytics = z.infer<typeof HAnalyticsSchema>;
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

export type HRole = z.infer<typeof HRoleSchema>;
export type HPermission = z.infer<typeof HPermissionSchema>; 