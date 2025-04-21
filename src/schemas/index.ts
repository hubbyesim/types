// Export helpers
export * from './helpers';

// Export from user schema
export {
  userFirestoreSchema,
  userAppSchema,
  userToFirestore,
  userFromFirestore,
  User,
  UserFirestore,
  UserApp,
  PROFILE_COLLECTION,
  ApiKeys,
  ApiKey,
  apiKeysSchema,
  apiKeySchema
} from './user';

// Export from booking schema
export {
  bookingFirestoreSchema,
  bookingAppSchema,
  bookingToFirestore,
  bookingFromFirestore,
  Booking,
  BookingFirestore,
  BookingApp,
  BookingStatus,
  CommunicationChannel,
  CommunicationOptions,
  communicationChannelSchema,
  communicationOptionsSchema
} from './booking';

// Import types for re-export with aliases
import { FinancialPropertiesApp } from './partner';

// Export from partner schema
export {
  partnerFirestoreSchema,
  partnerAppSchema,
  partnerToFirestore,
  partnerFromFirestore,
  Partner,
  PartnerFirestore,
  PartnerApp,
  priceListFirestoreSchema,
  priceListAppSchema,
  priceListToFirestore,
  priceListFromFirestore,
  PriceList,
  PriceListApp,
  PriceListFirestore,
  PackagePrice,
  PARTNER_COLLECTION,
  PRICE_LIST_COLLECTION,
  financialPropertiesFirestoreSchema,
  financialPropertiesAppSchema,
  platformSettingsSchema,
  FinancialPropertiesFirestore,
  FinancialPropertiesApp,
  PlatformSettings,
  Schedule,
  scheduleSchema
} from './partner';

// Add type alias for backwards compatibility
export { FinancialPropertiesApp as FinancialProperties };

// Export from country schema
export {
  countryFirestoreSchema,
  countryAppSchema,
  countryToFirestore,
  countryFromFirestore,
  Country,
  CountryFirestore,
  CountryApp
} from './country';

// Export from package schema
export {
  packageFirestoreSchema,
  packageAppSchema,
  packageToFirestore,
  packageFromFirestore,
  Package,
  PackageFirestore,
  PackageApp
} from './package';

// Export from promoCode schema
export {
  promoCodeFirestoreSchema,
  promoCodeAppSchema,
  promoCodeToFirestore,
  promoCodeFromFirestore,
  PromoCode,
  PromoCodeFirestore,
  PromoCodeApp
} from './promoCode';

// Export from esim schema
export {
  esimFirestoreSchema,
  esimAppSchema,
  esimToFirestore,
  esimFromFirestore,
  ESIM,
  ESIMFirestore,
  ESIMApp
} from './esim';

// Export from payment schema
export {
  paymentFirestoreSchema,
  paymentAppSchema,
  paymentToFirestore,
  paymentFromFirestore,
  Payment,
  PaymentFirestore,
  PaymentApp
} from './payment';

// Export from message schema
export {
  messageFirestoreSchema,
  messageAppSchema,
  messageToFirestore,
  messageFromFirestore,
  sentMessagesFirestoreSchema,
  sentMessagesAppSchema,
  sentMessagesToFirestore,
  sentMessagesFromFirestore,
  Message,
  MessageFirestore,
  MessageApp,
  SentMessages,
  SentMessagesFirestore,
  SentMessagesApp
} from './message';

// Export from currency schema
export {
  currencyFirestoreSchema,
  currencyAppSchema,
  currencyToFirestore,
  currencyFromFirestore,
  Currency,
  CurrencyFirestore,
  CurrencyApp,
  CoversionRate,
  conversionRateSchema
} from './currency';

// Export from apiLogs schema
export {
  apiLogFirestoreSchema,
  apiLogAppSchema,
  apiLogToFirestore,
  apiLogFromFirestore,
  ApiLog,
  ApiLogFirestore,
  ApiLogApp
} from './apiLogs';

// Export from API schema
export {
  packageSpecificationSchema,
  packageSpecificationsSchema,
  bookingApiResponseSchema,
  promoCodeApiResponseSchema,
  bookingApiRequestSchema,
  partnerApiRequestSchema,
  partnerApiResponseSchema,
  PackageSpecification,
  PackageSpecifications,
  BookingApiRequest,
  BookingApiResponse,
  PromoCodeApiResponse,
  PartnerApiRequest,
  PartnerApiResponse
} from './api';

// Export from constants
export {
  SUPPORTED_LOCALES,
  SupportedLocales,
  supportedLocalesSchema,
  SupportedLocalesFromSchema
} from '../constants';
