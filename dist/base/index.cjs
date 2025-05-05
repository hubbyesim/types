"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/schemas/base/index.ts
var base_exports = {};
__export(base_exports, {
  API_LOG_COLLECTION: () => API_LOG_COLLECTION,
  BOOKING_COLLECTION: () => BOOKING_COLLECTION,
  COUNTRY_COLLECTION: () => COUNTRY_COLLECTION,
  CURRENCY_COLLECTION: () => CURRENCY_COLLECTION,
  CommunicationChannel: () => CommunicationChannel,
  ESIM_COLLECTION: () => ESIM_COLLECTION,
  MESSAGE_COLLECTION: () => MESSAGE_COLLECTION,
  PACKAGE_COLLECTION: () => PACKAGE_COLLECTION,
  PARTNER_COLLECTION: () => PARTNER_COLLECTION,
  PAYMENT_COLLECTION: () => PAYMENT_COLLECTION,
  PRICE_LIST_COLLECTION: () => PRICE_LIST_COLLECTION,
  PROFILE_COLLECTION: () => PROFILE_COLLECTION,
  PROMO_CODE_COLLECTION: () => PROMO_CODE_COLLECTION,
  SUPPORTED_LOCALES: () => SUPPORTED_LOCALES,
  USER_COLLECTION: () => USER_COLLECTION,
  addressSchema: () => addressSchema,
  apiKeySchema: () => apiKeySchema,
  apiKeysSchema: () => apiKeysSchema,
  apiLogAppSchema: () => apiLogAppSchema,
  apiLogRefString: () => apiLogRefString,
  apiLogRefStringArray: () => apiLogRefStringArray,
  apiLogRefStringArrayNullable: () => apiLogRefStringArrayNullable,
  apiLogRefStringNullable: () => apiLogRefStringNullable,
  bankingDetailsSchema: () => bankingDetailsSchema,
  baseModelAppSchema: () => baseModelAppSchema,
  bookingApiRequestSchema: () => bookingApiRequestSchema,
  bookingApiResponseSchema: () => bookingApiResponseSchema,
  bookingAppSchema: () => bookingAppSchema,
  bookingConfirmationSchema: () => bookingConfirmationSchema,
  bookingDefaultsSchema: () => bookingDefaultsSchema,
  bookingRefString: () => bookingRefString,
  bookingRefStringArray: () => bookingRefStringArray,
  bookingRefStringArrayNullable: () => bookingRefStringArrayNullable,
  bookingRefStringNullable: () => bookingRefStringNullable,
  bookingStatusSchema: () => bookingStatusSchema,
  commonBookingFields: () => commonBookingFields,
  commonCurrencyFields: () => commonCurrencyFields,
  commonESIMFields: () => commonESIMFields,
  commonFinancialPropertiesFields: () => commonFinancialPropertiesFields,
  commonPackageFields: () => commonPackageFields,
  commonPackagePriceFields: () => commonPackagePriceFields,
  commonPartnerFields: () => commonPartnerFields,
  commonPricingStrategyFields: () => commonPricingStrategyFields,
  commonUserFields: () => commonUserFields,
  communicationChannelSchema: () => communicationChannelSchema,
  communicationOptionsSchema: () => communicationOptionsSchema,
  conversionRateSchema: () => conversionRateSchema,
  convertToDate: () => convertToDate,
  countryAppSchema: () => countryAppSchema,
  countryRefString: () => countryRefString,
  countryRefStringArray: () => countryRefStringArray,
  countryRefStringArrayNullable: () => countryRefStringArrayNullable,
  countryRefStringNullable: () => countryRefStringNullable,
  createIdSchema: () => createIdSchema,
  currencyAppSchema: () => currencyAppSchema,
  currencyRefString: () => currencyRefString,
  currencyRefStringArray: () => currencyRefStringArray,
  currencyRefStringArrayNullable: () => currencyRefStringArrayNullable,
  currencyRefStringNullable: () => currencyRefStringNullable,
  esimAppSchema: () => esimAppSchema,
  esimRefString: () => esimRefString,
  esimRefStringArray: () => esimRefStringArray,
  esimRefStringArrayNullable: () => esimRefStringArrayNullable,
  esimRefStringNullable: () => esimRefStringNullable,
  financialPropertiesAppSchema: () => financialPropertiesAppSchema,
  freeEsimSchema: () => freeEsimSchema,
  hubbyModelAppSchema: () => hubbyModelAppSchema,
  isDate: () => isDate,
  messageAppSchema: () => messageAppSchema,
  messageRefString: () => messageRefString,
  messageRefStringArray: () => messageRefStringArray,
  messageRefStringArrayNullable: () => messageRefStringArrayNullable,
  messageRefStringNullable: () => messageRefStringNullable,
  packageAppSchema: () => packageAppSchema,
  packagePriceAppSchema: () => packagePriceAppSchema,
  packageRefString: () => packageRefString,
  packageRefStringArray: () => packageRefStringArray,
  packageRefStringArrayNullable: () => packageRefStringArrayNullable,
  packageRefStringNullable: () => packageRefStringNullable,
  packageSpecificationSchema: () => packageSpecificationSchema,
  packageSpecificationsSchema: () => packageSpecificationsSchema,
  packageStrategySchema: () => packageStrategySchema,
  partnerApiRequestSchema: () => partnerApiRequestSchema,
  partnerApiResponseSchema: () => partnerApiResponseSchema,
  partnerAppSchema: () => partnerAppSchema,
  partnerPricingStrategyAppSchema: () => partnerPricingStrategyAppSchema,
  partnerRefString: () => partnerRefString,
  partnerRefStringArray: () => partnerRefStringArray,
  partnerRefStringArrayNullable: () => partnerRefStringArrayNullable,
  partnerRefStringNullable: () => partnerRefStringNullable,
  paymentAppSchema: () => paymentAppSchema,
  paymentRefString: () => paymentRefString,
  paymentRefStringArray: () => paymentRefStringArray,
  paymentRefStringArrayNullable: () => paymentRefStringArrayNullable,
  paymentRefStringNullable: () => paymentRefStringNullable,
  platformSettingsSchema: () => platformSettingsSchema,
  priceListAppSchema: () => priceListAppSchema,
  priceListRefString: () => priceListRefString,
  priceListRefStringArray: () => priceListRefStringArray,
  priceListRefStringArrayNullable: () => priceListRefStringArrayNullable,
  priceListRefStringNullable: () => priceListRefStringNullable,
  profileRefString: () => profileRefString,
  profileRefStringArray: () => profileRefStringArray,
  profileRefStringArrayNullable: () => profileRefStringArrayNullable,
  profileRefStringNullable: () => profileRefStringNullable,
  promoCodeApiResponseSchema: () => promoCodeApiResponseSchema,
  promoCodeAppSchema: () => promoCodeAppSchema,
  promoCodeRefString: () => promoCodeRefString,
  promoCodeRefStringArray: () => promoCodeRefStringArray,
  promoCodeRefStringArrayNullable: () => promoCodeRefStringArrayNullable,
  promoCodeRefStringNullable: () => promoCodeRefStringNullable,
  registrationSchema: () => registrationSchema,
  scheduleFilterSchema: () => scheduleFilterSchema,
  scheduleSchema: () => scheduleSchema,
  sentMessagesAppSchema: () => sentMessagesAppSchema,
  supportedLocalesSchema: () => supportedLocalesSchema,
  testEnv: () => testEnv,
  userAppSchema: () => userAppSchema,
  userPricingStrategyAppSchema: () => userPricingStrategyAppSchema,
  userRefString: () => userRefString,
  userRefStringArray: () => userRefStringArray,
  userRefStringArrayNullable: () => userRefStringArrayNullable,
  userRefStringNullable: () => userRefStringNullable,
  visualIdentityBannerSchema: () => visualIdentityBannerSchema,
  visualIdentityBannerStrategySchema: () => visualIdentityBannerStrategySchema,
  visualIdentitySchema: () => visualIdentitySchema,
  zDateString: () => zDateString
});
module.exports = __toCommonJS(base_exports);

// src/schemas/base/helpers.ts
var import_zod = require("zod");
var testEnv = { isTestEnvironment: false };
var iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
var zDateString = () => import_zod.z.preprocess((input) => {
  if (typeof input === "string") {
    if (!iso8601Regex.test(input)) {
      return void 0;
    }
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      return date;
    }
    return void 0;
  }
  if (input instanceof Date && !isNaN(input.getTime())) {
    return input;
  }
  return void 0;
}, import_zod.z.date());
var baseModelAppSchema = import_zod.z.object({
  id: import_zod.z.string(),
  created_at: zDateString(),
  updated_at: zDateString(),
  created_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null()]),
  updated_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null()])
});
var hubbyModelAppSchema = baseModelAppSchema;
var createIdSchema = (collectionPath) => {
  return import_zod.z.string().describe(`ID from ${collectionPath}`);
};

// src/schemas/base/refs.ts
var import_zod2 = require("zod");
var PARTNER_COLLECTION = "partners";
var USER_COLLECTION = "users";
var PROFILE_COLLECTION = "profiles";
var PACKAGE_COLLECTION = "packages";
var PROMO_CODE_COLLECTION = "promo_codes";
var COUNTRY_COLLECTION = "countries";
var ESIM_COLLECTION = "esims";
var PAYMENT_COLLECTION = "payments";
var PRICE_LIST_COLLECTION = "price_lists";
var BOOKING_COLLECTION = "bookings";
var MESSAGE_COLLECTION = "messages";
var CURRENCY_COLLECTION = "currencies";
var API_LOG_COLLECTION = "api_logs";
var partnerRefString = createIdSchema(PARTNER_COLLECTION);
var userRefString = createIdSchema(USER_COLLECTION);
var profileRefString = createIdSchema(PROFILE_COLLECTION);
var packageRefString = createIdSchema(PACKAGE_COLLECTION);
var promoCodeRefString = createIdSchema(PROMO_CODE_COLLECTION);
var countryRefString = createIdSchema(COUNTRY_COLLECTION);
var esimRefString = createIdSchema(ESIM_COLLECTION);
var paymentRefString = createIdSchema(PAYMENT_COLLECTION);
var priceListRefString = createIdSchema(PRICE_LIST_COLLECTION);
var bookingRefString = createIdSchema(BOOKING_COLLECTION);
var messageRefString = createIdSchema(MESSAGE_COLLECTION);
var currencyRefString = createIdSchema(CURRENCY_COLLECTION);
var apiLogRefString = createIdSchema(API_LOG_COLLECTION);
var partnerRefStringNullable = partnerRefString.nullable();
var userRefStringNullable = userRefString.nullable();
var profileRefStringNullable = profileRefString.nullable();
var packageRefStringNullable = packageRefString.nullable();
var promoCodeRefStringNullable = promoCodeRefString.nullable();
var countryRefStringNullable = countryRefString.nullable();
var esimRefStringNullable = esimRefString.nullable();
var paymentRefStringNullable = paymentRefString.nullable();
var priceListRefStringNullable = priceListRefString.nullable();
var bookingRefStringNullable = bookingRefString.nullable();
var messageRefStringNullable = messageRefString.nullable();
var currencyRefStringNullable = currencyRefString.nullable();
var apiLogRefStringNullable = apiLogRefString.nullable();
var partnerRefStringArray = import_zod2.z.array(import_zod2.z.string());
var userRefStringArray = import_zod2.z.array(import_zod2.z.string());
var profileRefStringArray = import_zod2.z.array(import_zod2.z.string());
var packageRefStringArray = import_zod2.z.array(import_zod2.z.string());
var promoCodeRefStringArray = import_zod2.z.array(import_zod2.z.string());
var countryRefStringArray = import_zod2.z.array(import_zod2.z.string());
var esimRefStringArray = import_zod2.z.array(import_zod2.z.string());
var paymentRefStringArray = import_zod2.z.array(import_zod2.z.string());
var priceListRefStringArray = import_zod2.z.array(import_zod2.z.string());
var bookingRefStringArray = import_zod2.z.array(import_zod2.z.string());
var messageRefStringArray = import_zod2.z.array(import_zod2.z.string());
var currencyRefStringArray = import_zod2.z.array(import_zod2.z.string());
var apiLogRefStringArray = import_zod2.z.array(import_zod2.z.string());
var partnerRefStringArrayNullable = partnerRefStringArray.nullable();
var userRefStringArrayNullable = userRefStringArray.nullable();
var profileRefStringArrayNullable = profileRefStringArray.nullable();
var packageRefStringArrayNullable = packageRefStringArray.nullable();
var promoCodeRefStringArrayNullable = promoCodeRefStringArray.nullable();
var countryRefStringArrayNullable = countryRefStringArray.nullable();
var esimRefStringArrayNullable = esimRefStringArray.nullable();
var paymentRefStringArrayNullable = paymentRefStringArray.nullable();
var priceListRefStringArrayNullable = priceListRefStringArray.nullable();
var bookingRefStringArrayNullable = bookingRefStringArray.nullable();
var messageRefStringArrayNullable = messageRefStringArray.nullable();
var currencyRefStringArrayNullable = currencyRefStringArray.nullable();
var apiLogRefStringArrayNullable = apiLogRefStringArray.nullable();

// src/schemas/base/user.ts
var import_zod3 = require("zod");
var apiKeySchema = import_zod3.z.object({
  expires_at: zDateString(),
  secret: import_zod3.z.string(),
  is_active: import_zod3.z.boolean()
});
var apiKeysSchema = import_zod3.z.object({
  allowed_keys: import_zod3.z.array(import_zod3.z.string()),
  keys: import_zod3.z.record(import_zod3.z.string(), apiKeySchema)
});
var commonUserFields = {
  name: import_zod3.z.string().nullable(),
  email: import_zod3.z.string().email().nullable(),
  stripe_id: import_zod3.z.string().nullable(),
  referral: import_zod3.z.string().nullable(),
  fcm: import_zod3.z.string().optional(),
  deeplink: import_zod3.z.string().nullable(),
  gender: import_zod3.z.string().nullable(),
  company: import_zod3.z.string().nullable(),
  coordinates: import_zod3.z.string().nullable(),
  parameters: import_zod3.z.any().nullable(),
  locale: import_zod3.z.string().nullable(),
  phone_model: import_zod3.z.string().nullable(),
  phone_os: import_zod3.z.string().nullable(),
  phone_os_version: import_zod3.z.string().nullable(),
  ios: import_zod3.z.boolean().nullable(),
  has_card_saved: import_zod3.z.boolean().nullable(),
  admin: import_zod3.z.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: import_zod3.z.string().nullable(),
  receipt_email: import_zod3.z.string().nullable()
};
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: zDateString(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: import_zod3.z.number().nullable(),
  review_requested: zDateString().nullable(),
  last_seen: zDateString().nullable()
});

// src/schemas/base/booking.ts
var import_zod5 = require("zod");

// src/constants.ts
var import_zod4 = require("zod");
var SUPPORTED_LOCALES = [
  "en-US",
  "en-GB",
  "nl-NL",
  "de-DE",
  "fr-FR",
  "it-IT",
  "es-ES",
  "cs-CZ",
  "pl-PL",
  "pt-PT",
  "fr-BE",
  "nl-BE",
  "de-AT",
  "de-CH",
  "fr-CH",
  "it-CH",
  "de-BE"
];
var supportedLocalesSchema = import_zod4.z.enum(SUPPORTED_LOCALES);

// src/schemas/base/booking.ts
var communicationChannelSchema = import_zod5.z.enum([
  "EMAIL",
  "WHATSAPP",
  "PUSH_NOTIFICATION",
  "SMS"
]);
var CommunicationChannel = {
  EMAIL: "EMAIL",
  WHATSAPP: "WHATSAPP",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  SMS: "SMS"
};
var communicationOptionsSchema = import_zod5.z.object({
  should_send_message: import_zod5.z.boolean(),
  channels: import_zod5.z.array(communicationChannelSchema)
});
var bookingStatusSchema = import_zod5.z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: import_zod5.z.string().nullable(),
  first_name: import_zod5.z.string(),
  last_name: import_zod5.z.string(),
  full_name: import_zod5.z.string(),
  pax: import_zod5.z.number(),
  email: import_zod5.z.string().email().nullable(),
  phone: import_zod5.z.string().nullable(),
  booking_id: import_zod5.z.string().nullable(),
  flight_number: import_zod5.z.string().optional(),
  gender: import_zod5.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod5.z.string().optional(),
  sent_messages: import_zod5.z.record(import_zod5.z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: import_zod5.z.object({
    source: import_zod5.z.string(),
    manual: import_zod5.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod5.z.boolean(),
  is_pseudonymized: import_zod5.z.boolean(),
  import_id: import_zod5.z.string().nullable().optional(),
  package_specifications: import_zod5.z.record(import_zod5.z.any()).optional()
};
var bookingAppSchema = baseModelAppSchema.extend({
  ...commonBookingFields,
  return_date: zDateString().nullable(),
  departure_date: zDateString(),
  partner: partnerRefString,
  promo_codes: promoCodeRefStringArray,
  users: userRefStringArrayNullable,
  esims: esimRefStringArrayNullable
});

// src/schemas/base/partner.ts
var import_zod6 = require("zod");
var addressSchema = import_zod6.z.object({
  street: import_zod6.z.string().optional(),
  city: import_zod6.z.string().optional(),
  postal_code: import_zod6.z.string().optional(),
  country: import_zod6.z.string().optional()
}).nullable();
var registrationSchema = import_zod6.z.object({
  chamber_of_commerce_number: import_zod6.z.string().nullable().optional(),
  vat_number: import_zod6.z.string().nullable().optional(),
  anvr_number: import_zod6.z.number().nullable().optional(),
  tax_number: import_zod6.z.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = import_zod6.z.object({
  account_holder: import_zod6.z.string(),
  bank_name: import_zod6.z.string(),
  iban: import_zod6.z.string()
}).nullable();
var commonPackagePriceFields = {
  destination: import_zod6.z.string(),
  label: import_zod6.z.string(),
  type: import_zod6.z.enum(["data-limit", "time-limit"]),
  price: import_zod6.z.number()
};
var packagePriceAppSchema = import_zod6.z.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: import_zod6.z.number()
};
var partnerPricingStrategyAppSchema = import_zod6.z.object({
  ...commonPricingStrategyFields,
  strategy: import_zod6.z.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod6.z.array(packagePriceAppSchema)
});
var userPricingStrategyAppSchema = import_zod6.z.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod6.z.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: import_zod6.z.number().nullable(),
  income_per_gb: import_zod6.z.number().nullable(),
  commission_fee: import_zod6.z.number().nullable().optional(),
  payment_method: import_zod6.z.enum(["invoice", "direct"]),
  requires_card: import_zod6.z.boolean().nullable(),
  next_invoice: zDateString().nullable().optional(),
  last_invoice: zDateString().nullable().optional()
};
var financialPropertiesAppSchema = import_zod6.z.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: import_zod6.z.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = import_zod6.z.object({
  name: import_zod6.z.string(),
  iso3_white_list: import_zod6.z.array(import_zod6.z.string()).optional(),
  parameters: import_zod6.z.any()
});
var bookingDefaultsSchema = import_zod6.z.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = import_zod6.z.object({
  brevo_template_id: import_zod6.z.number(),
  send_booking_confirmation: import_zod6.z.boolean()
});
var visualIdentityBannerSchema = import_zod6.z.object({
  image_url: import_zod6.z.string(),
  alt: import_zod6.z.string(),
  click_url: import_zod6.z.string(),
  locale: supportedLocalesSchema,
  properties: import_zod6.z.record(import_zod6.z.string())
});
var visualIdentityBannerStrategySchema = import_zod6.z.object({
  strategy: import_zod6.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: import_zod6.z.array(visualIdentityBannerSchema).nullable().optional()
});
var visualIdentitySchema = import_zod6.z.object({
  primary_color: import_zod6.z.string(),
  secondary_color: import_zod6.z.string(),
  logo: import_zod6.z.string(),
  font: import_zod6.z.string(),
  top_banner: visualIdentityBannerStrategySchema.optional(),
  mid_banner: visualIdentityBannerStrategySchema.optional()
});
var scheduleFilterSchema = import_zod6.z.object({
  type: import_zod6.z.enum(["iso3", "gender", "percentage", "age"]),
  value: import_zod6.z.union([import_zod6.z.string(), import_zod6.z.number()]),
  comparison: import_zod6.z.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = import_zod6.z.object({
  days: import_zod6.z.number(),
  email: import_zod6.z.object({
    brevo_template_id: import_zod6.z.number(),
    subject: import_zod6.z.record(import_zod6.z.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional(),
    preview_text: import_zod6.z.record(import_zod6.z.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional()
  }).nullable().optional(),
  push: import_zod6.z.object({
    title: import_zod6.z.record(import_zod6.z.string()).optional(),
    body: import_zod6.z.record(import_zod6.z.string()).optional(),
    target: import_zod6.z.string()
  }).nullable().optional(),
  hour: import_zod6.z.number(),
  key: import_zod6.z.string(),
  method: import_zod6.z.enum(["email", "sms", "whatsapp", "push"]),
  moment: import_zod6.z.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = import_zod6.z.object({
  package_specification: import_zod6.z.object({
    size: import_zod6.z.string(),
    type: import_zod6.z.string(),
    destination: import_zod6.z.string()
  }),
  allowance: import_zod6.z.number()
});
var platformSettingsSchema = import_zod6.z.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: bookingDefaultsSchema.nullable().optional(),
  booking_confirmation: bookingConfirmationSchema.nullable().optional(),
  schedules: import_zod6.z.array(scheduleSchema).optional()
}).nullable();
var commonContactFields = {
  email: import_zod6.z.string().nullable(),
  office_phone: import_zod6.z.string().nullable().optional()
};
var commonPartnerFields = {
  name: import_zod6.z.string().nullable(),
  type: import_zod6.z.string().nullable(),
  is_active: import_zod6.z.boolean().nullable().optional(),
  external_id: import_zod6.z.string().nullable().optional(),
  contact: import_zod6.z.object(commonContactFields).nullable(),
  address: addressSchema,
  registration: registrationSchema,
  banking_details: bankingDetailsSchema,
  visual_identity: visualIdentitySchema.nullable(),
  data: import_zod6.z.object({
    source: import_zod6.z.string(),
    manual: import_zod6.z.boolean()
  }).nullable().optional()
};
var partnerAppSchema = baseModelAppSchema.extend({
  ...commonPartnerFields,
  parent: partnerRefStringNullable,
  users: userRefStringArrayNullable,
  financial_properties: financialPropertiesAppSchema,
  platform_settings: platformSettingsSchema
});
var priceListAppSchema = baseModelAppSchema.extend({
  name: import_zod6.z.string(),
  description: import_zod6.z.string().nullable(),
  type: import_zod6.z.enum(["partner", "consumer"]),
  partner: partnerRefStringNullable,
  package_prices: import_zod6.z.array(packagePriceAppSchema)
});

// src/schemas/base/country.ts
var import_zod7 = require("zod");
var countryAppSchema = import_zod7.z.object({
  id: import_zod7.z.string().nullable(),
  bokun_id: import_zod7.z.number().nullable(),
  LTE: import_zod7.z.boolean().nullable(),
  apn: import_zod7.z.string().nullable(),
  click_count: import_zod7.z.number().nullable(),
  global_network: import_zod7.z.string().nullable(),
  global_price: import_zod7.z.number().nullable(),
  hubby: import_zod7.z.number().nullable(),
  imsi: import_zod7.z.number().nullable(),
  has_esim: import_zod7.z.boolean(),
  name: import_zod7.z.string().nullable(),
  region: import_zod7.z.boolean().nullable(),
  is_region: import_zod7.z.boolean().nullable(),
  countries: import_zod7.z.array(import_zod7.z.string()).nullable(),
  tier: import_zod7.z.number().nullable()
});

// src/schemas/base/package.ts
var import_zod8 = require("zod");
var commonPackageFields = {
  external_id: import_zod8.z.string(),
  provider: import_zod8.z.string(),
  coverage_label: import_zod8.z.string().nullable(),
  label: import_zod8.z.string(),
  bytes: import_zod8.z.number(),
  hidden: import_zod8.z.boolean(),
  is_hidden: import_zod8.z.boolean(),
  is_active: import_zod8.z.boolean(),
  priority: import_zod8.z.number(),
  country_data: countryAppSchema.nullable(),
  price: import_zod8.z.number(),
  partner_price: import_zod8.z.number(),
  days: import_zod8.z.number(),
  name: import_zod8.z.string(),
  type: import_zod8.z.enum(["data-limited", "time-limited"]).nullable(),
  throttling: import_zod8.z.number().optional(),
  provider_parameters: import_zod8.z.object({
    imsi: import_zod8.z.number()
  }).nullable()
};
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
});

// src/schemas/base/promoCode.ts
var import_zod10 = require("zod");

// src/schemas/base/api.ts
var import_zod9 = require("zod");
var packageSpecificationSchema = import_zod9.z.object({
  destination: import_zod9.z.string().optional(),
  size: import_zod9.z.string().optional(),
  package_id: import_zod9.z.string().optional(),
  iata_code: import_zod9.z.string().optional()
});
var packageSpecificationsSchema = import_zod9.z.array(packageSpecificationSchema);
var bookingApiResponseSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  title: import_zod9.z.string().nullable(),
  first_name: import_zod9.z.string(),
  last_name: import_zod9.z.string(),
  full_name: import_zod9.z.string(),
  pax: import_zod9.z.number(),
  email: import_zod9.z.string().nullable(),
  phone: import_zod9.z.string().nullable(),
  booking_id: import_zod9.z.string().nullable(),
  return_date: import_zod9.z.string().nullable(),
  // ISO string
  partner: import_zod9.z.string(),
  // ID string
  promo_codes: import_zod9.z.array(import_zod9.z.string()),
  // Array of ID strings
  departure_date: import_zod9.z.string(),
  // ISO string
  flight_number: import_zod9.z.string().optional(),
  gender: import_zod9.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod9.z.string().optional(),
  sent_messages: import_zod9.z.record(import_zod9.z.any()).optional(),
  users: import_zod9.z.array(import_zod9.z.string()),
  // Array of ID strings
  esims: import_zod9.z.array(import_zod9.z.string()).nullable(),
  // Array of ID strings or null
  locale: import_zod9.z.string(),
  status: import_zod9.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod9.z.object({
    source: import_zod9.z.string(),
    manual: import_zod9.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod9.z.boolean(),
  is_pseudonymized: import_zod9.z.boolean(),
  import_id: import_zod9.z.string().nullable().optional(),
  created_at: import_zod9.z.string(),
  // ISO string
  updated_at: import_zod9.z.string(),
  // ISO string
  created_by: import_zod9.z.string().optional(),
  updated_by: import_zod9.z.string().optional()
});
var promoCodeApiResponseSchema = import_zod9.z.object({
  promo_code: import_zod9.z.string(),
  package_id: import_zod9.z.string(),
  package_size: import_zod9.z.string(),
  destination: import_zod9.z.string()
});
var bookingApiRequestSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  title: import_zod9.z.string().nullable(),
  first_name: import_zod9.z.string().nullable().optional(),
  last_name: import_zod9.z.string().nullable().optional(),
  full_name: import_zod9.z.string().nullable().optional(),
  pax: import_zod9.z.number().int().min(1).nullable().optional(),
  email: import_zod9.z.string().nullable().optional(),
  phone: import_zod9.z.string().nullable().optional(),
  booking_id: import_zod9.z.string().min(3).nullable().optional(),
  return_date: zDateString().nullable(),
  // Must be after departure_date
  departure_date: zDateString(),
  // ISO 8601 date string
  flight_number: import_zod9.z.string().nullable().optional(),
  gender: import_zod9.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod9.z.string().optional(),
  sent_messages: import_zod9.z.record(import_zod9.z.any()).optional(),
  locale: import_zod9.z.string().min(2).max(5).optional(),
  status: import_zod9.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod9.z.object({
    source: import_zod9.z.string(),
    manual: import_zod9.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod9.z.boolean(),
  is_pseudonymized: import_zod9.z.boolean(),
  date_of_birth: zDateString().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: zDateString(),
  updated_at: zDateString()
});
var partnerApiRequestSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  name: import_zod9.z.string().nullable(),
  type: import_zod9.z.string().nullable(),
  is_active: import_zod9.z.boolean().nullable().optional(),
  external_id: import_zod9.z.string().nullable().optional(),
  parent: import_zod9.z.string().nullable(),
  // String ID
  contact: import_zod9.z.object({
    email: import_zod9.z.string().nullable(),
    office_phone: import_zod9.z.string().nullable().optional()
  }).nullable(),
  address: import_zod9.z.object({
    street: import_zod9.z.string().optional(),
    city: import_zod9.z.string().optional(),
    postal_code: import_zod9.z.string().optional(),
    country: import_zod9.z.string().optional()
  }).nullable().optional(),
  registration: import_zod9.z.object({
    chamber_of_commerce_number: import_zod9.z.string().nullable().optional(),
    vat_number: import_zod9.z.string().nullable().optional(),
    anvr_number: import_zod9.z.number().nullable().optional(),
    tax_number: import_zod9.z.string().nullable().optional()
  }).nullable().optional(),
  banking_details: import_zod9.z.object({
    account_holder: import_zod9.z.string(),
    bank_name: import_zod9.z.string(),
    iban: import_zod9.z.string()
  }).nullable().optional(),
  finance: import_zod9.z.object({
    administration_fee: import_zod9.z.number().nullable(),
    income_per_gb: import_zod9.z.number().nullable(),
    commission_fee: import_zod9.z.number().optional(),
    payment_method: import_zod9.z.enum(["invoice", "direct"]),
    requires_card: import_zod9.z.boolean().nullable(),
    next_invoice: zDateString().nullable(),
    last_invoice: zDateString().nullable(),
    pricing_strategies: import_zod9.z.object({
      partner: import_zod9.z.object({
        strategy: import_zod9.z.enum(["split", "bundle"]),
        default_price_list: import_zod9.z.string().nullable(),
        custom_prices: import_zod9.z.array(import_zod9.z.any()),
        modification_percentage: import_zod9.z.number()
      }),
      user: import_zod9.z.object({
        default_price_list: import_zod9.z.string().nullable(),
        custom_prices: import_zod9.z.array(import_zod9.z.any()),
        modification_percentage: import_zod9.z.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: import_zod9.z.any().optional(),
  visual_identity: import_zod9.z.any().nullable(),
  users: import_zod9.z.array(import_zod9.z.string()).nullable(),
  // Array of string IDs
  data: import_zod9.z.object({
    source: import_zod9.z.string(),
    manual: import_zod9.z.boolean()
  }).optional(),
  created_at: zDateString(),
  updated_at: zDateString(),
  created_by: import_zod9.z.string().nullable(),
  updated_by: import_zod9.z.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/base/promoCode.ts
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: import_zod10.z.string(),
  code: import_zod10.z.string(),
  allowance_user: import_zod10.z.number(),
  allowance_total: import_zod10.z.number(),
  type: import_zod10.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(import_zod10.z.string()),
  usage: import_zod10.z.array(import_zod10.z.string()),
  uuid_usage: import_zod10.z.array(import_zod10.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: zDateString(),
  valid_to: zDateString(),
  // Optional fields based on the type
  discount: import_zod10.z.number().optional(),
  package_size: import_zod10.z.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: import_zod10.z.array(import_zod10.z.string()).optional(),
  max_bytes: import_zod10.z.number().optional(),
  starter_data: import_zod10.z.number().optional()
});

// src/schemas/base/esim.ts
var import_zod11 = require("zod");
var commonESIMFields = {
  imsi: import_zod11.z.number(),
  qr: import_zod11.z.string(),
  iccid: import_zod11.z.string(),
  provider: import_zod11.z.string(),
  coverage_label: import_zod11.z.string().nullable().optional(),
  total_data: import_zod11.z.number().nullable(),
  data_left: import_zod11.z.number().nullable(),
  data_used: import_zod11.z.boolean().nullable(),
  status: import_zod11.z.string().nullable(),
  name: import_zod11.z.string(),
  android_auto: import_zod11.z.boolean(),
  partner_price: import_zod11.z.number().nullable(),
  promo: import_zod11.z.string().nullable(),
  type: import_zod11.z.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: import_zod11.z.boolean(),
  is_archived: import_zod11.z.boolean(),
  user: import_zod11.z.string().nullable(),
  payment: import_zod11.z.string().nullable(),
  apn: import_zod11.z.string().nullable()
};
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: import_zod11.z.string().nullable(),
  time_assigned: zDateString().nullable(),
  last_updated: zDateString().nullable(),
  partner: import_zod11.z.string().nullable()
});

// src/schemas/base/payment.ts
var import_zod12 = require("zod");
var paymentAppSchema = baseModelAppSchema.extend({
  amount: import_zod12.z.number(),
  customer: import_zod12.z.string(),
  date: zDateString(),
  iccid: import_zod12.z.string(),
  package: import_zod12.z.string(),
  promo: import_zod12.z.string(),
  topup: import_zod12.z.boolean()
});

// src/schemas/base/message.ts
var import_zod13 = require("zod");
var messageAppSchema = import_zod13.z.object({
  id: import_zod13.z.string(),
  key: import_zod13.z.string(),
  method: import_zod13.z.enum(["push", "sms", "email"]),
  status: import_zod13.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: zDateString(),
  updated_at: zDateString()
});
var sentMessagesAppSchema = import_zod13.z.record(messageAppSchema);

// src/schemas/base/currency.ts
var import_zod14 = require("zod");

// src/schemas/utils/documentation.ts
function documented(schema, description) {
  return schema.describe(description);
}
function documentedObject(schema, fieldDocs) {
  const shape = schema.shape;
  const documentedShape = { ...shape };
  for (const [key, value] of Object.entries(shape)) {
    if (key in fieldDocs && fieldDocs[key]) {
      documentedShape[key] = documented(value, fieldDocs[key]);
    }
  }
  return schema.extend(documentedShape);
}

// src/schemas/base/currency.ts
var conversionRateSchema = import_zod14.z.object({
  currency: import_zod14.z.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: import_zod14.z.string(),
  symbol: import_zod14.z.string(),
  name: import_zod14.z.string(),
  rate: import_zod14.z.number(),
  is_default: import_zod14.z.boolean()
};
var currencyAppSchema = documentedObject(
  baseModelAppSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs
);

// src/schemas/base/apiLogs.ts
var import_zod15 = require("zod");
var apiLogAppSchema = import_zod15.z.object({
  id: import_zod15.z.string().optional(),
  method: import_zod15.z.string(),
  user_id: import_zod15.z.string().optional(),
  path: import_zod15.z.string(),
  resource_type: import_zod15.z.string().optional(),
  resource_id: import_zod15.z.string().optional(),
  partner_id: import_zod15.z.string().optional(),
  payload: import_zod15.z.record(import_zod15.z.unknown()).optional(),
  timestamp: zDateString(),
  status_code: import_zod15.z.number()
});

// src/schemas/base/utils.ts
var convertToDate = (value, field) => {
  if (typeof value === void 0) {
    return /* @__PURE__ */ new Date("1970-01-01");
  }
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  throw new Error(`Unable to convert value to Date: ${value} for field: ${field}`);
};
var isDate = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  API_LOG_COLLECTION,
  BOOKING_COLLECTION,
  COUNTRY_COLLECTION,
  CURRENCY_COLLECTION,
  CommunicationChannel,
  ESIM_COLLECTION,
  MESSAGE_COLLECTION,
  PACKAGE_COLLECTION,
  PARTNER_COLLECTION,
  PAYMENT_COLLECTION,
  PRICE_LIST_COLLECTION,
  PROFILE_COLLECTION,
  PROMO_CODE_COLLECTION,
  SUPPORTED_LOCALES,
  USER_COLLECTION,
  addressSchema,
  apiKeySchema,
  apiKeysSchema,
  apiLogAppSchema,
  apiLogRefString,
  apiLogRefStringArray,
  apiLogRefStringArrayNullable,
  apiLogRefStringNullable,
  bankingDetailsSchema,
  baseModelAppSchema,
  bookingApiRequestSchema,
  bookingApiResponseSchema,
  bookingAppSchema,
  bookingConfirmationSchema,
  bookingDefaultsSchema,
  bookingRefString,
  bookingRefStringArray,
  bookingRefStringArrayNullable,
  bookingRefStringNullable,
  bookingStatusSchema,
  commonBookingFields,
  commonCurrencyFields,
  commonESIMFields,
  commonFinancialPropertiesFields,
  commonPackageFields,
  commonPackagePriceFields,
  commonPartnerFields,
  commonPricingStrategyFields,
  commonUserFields,
  communicationChannelSchema,
  communicationOptionsSchema,
  conversionRateSchema,
  convertToDate,
  countryAppSchema,
  countryRefString,
  countryRefStringArray,
  countryRefStringArrayNullable,
  countryRefStringNullable,
  createIdSchema,
  currencyAppSchema,
  currencyRefString,
  currencyRefStringArray,
  currencyRefStringArrayNullable,
  currencyRefStringNullable,
  esimAppSchema,
  esimRefString,
  esimRefStringArray,
  esimRefStringArrayNullable,
  esimRefStringNullable,
  financialPropertiesAppSchema,
  freeEsimSchema,
  hubbyModelAppSchema,
  isDate,
  messageAppSchema,
  messageRefString,
  messageRefStringArray,
  messageRefStringArrayNullable,
  messageRefStringNullable,
  packageAppSchema,
  packagePriceAppSchema,
  packageRefString,
  packageRefStringArray,
  packageRefStringArrayNullable,
  packageRefStringNullable,
  packageSpecificationSchema,
  packageSpecificationsSchema,
  packageStrategySchema,
  partnerApiRequestSchema,
  partnerApiResponseSchema,
  partnerAppSchema,
  partnerPricingStrategyAppSchema,
  partnerRefString,
  partnerRefStringArray,
  partnerRefStringArrayNullable,
  partnerRefStringNullable,
  paymentAppSchema,
  paymentRefString,
  paymentRefStringArray,
  paymentRefStringArrayNullable,
  paymentRefStringNullable,
  platformSettingsSchema,
  priceListAppSchema,
  priceListRefString,
  priceListRefStringArray,
  priceListRefStringArrayNullable,
  priceListRefStringNullable,
  profileRefString,
  profileRefStringArray,
  profileRefStringArrayNullable,
  profileRefStringNullable,
  promoCodeApiResponseSchema,
  promoCodeAppSchema,
  promoCodeRefString,
  promoCodeRefStringArray,
  promoCodeRefStringArrayNullable,
  promoCodeRefStringNullable,
  registrationSchema,
  scheduleFilterSchema,
  scheduleSchema,
  sentMessagesAppSchema,
  supportedLocalesSchema,
  testEnv,
  userAppSchema,
  userPricingStrategyAppSchema,
  userRefString,
  userRefStringArray,
  userRefStringArrayNullable,
  userRefStringNullable,
  visualIdentityBannerSchema,
  visualIdentityBannerStrategySchema,
  visualIdentitySchema,
  zDateString
});
//# sourceMappingURL=index.cjs.map