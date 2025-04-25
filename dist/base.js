// src/schemas/base/helpers.ts
import { z } from "zod";
var testEnv = { isTestEnvironment: false };
var baseModelAppSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  created_by: z.union([z.string(), z.null()]),
  updated_by: z.union([z.string(), z.null()])
});
var hubbyModelAppSchema = baseModelAppSchema;
var createIdSchema = (collectionPath) => {
  return z.string().describe(`ID from ${collectionPath}`);
};

// src/schemas/base/refs.ts
import { z as z2 } from "zod";
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
var partnerRefStringArray = z2.array(z2.string());
var userRefStringArray = z2.array(z2.string());
var profileRefStringArray = z2.array(z2.string());
var packageRefStringArray = z2.array(z2.string());
var promoCodeRefStringArray = z2.array(z2.string());
var countryRefStringArray = z2.array(z2.string());
var esimRefStringArray = z2.array(z2.string());
var paymentRefStringArray = z2.array(z2.string());
var priceListRefStringArray = z2.array(z2.string());
var bookingRefStringArray = z2.array(z2.string());
var messageRefStringArray = z2.array(z2.string());
var currencyRefStringArray = z2.array(z2.string());
var apiLogRefStringArray = z2.array(z2.string());
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
import { z as z3 } from "zod";
var apiKeySchema = z3.object({
  expires_at: z3.date(),
  secret: z3.string(),
  is_active: z3.boolean()
});
var apiKeysSchema = z3.object({
  allowed_keys: z3.array(z3.string()),
  keys: z3.record(z3.string(), apiKeySchema)
});
var commonUserFields = {
  name: z3.string().nullable(),
  email: z3.string().email().nullable(),
  stripe_id: z3.string().nullable(),
  referral: z3.string().nullable(),
  fcm: z3.string().optional(),
  deeplink: z3.string().nullable(),
  gender: z3.string().nullable(),
  company: z3.string().nullable(),
  coordinates: z3.string().nullable(),
  parameters: z3.any().nullable(),
  locale: z3.string().nullable(),
  phone_model: z3.string().nullable(),
  phone_os: z3.string().nullable(),
  phone_os_version: z3.string().nullable(),
  ios: z3.boolean().nullable(),
  has_card_saved: z3.boolean().nullable(),
  admin: z3.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: z3.string().nullable(),
  receipt_email: z3.string().nullable()
};
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: z3.date(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: z3.number().nullable(),
  review_requested: z3.date().nullable(),
  last_seen: z3.date().nullable()
});

// src/schemas/base/booking.ts
import { z as z5 } from "zod";

// src/constants.ts
import { z as z4 } from "zod";
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
var supportedLocalesSchema = z4.enum(SUPPORTED_LOCALES);

// src/schemas/base/booking.ts
var communicationChannelSchema = z5.enum([
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
var communicationOptionsSchema = z5.object({
  should_send_message: z5.boolean(),
  channels: z5.array(communicationChannelSchema)
});
var bookingStatusSchema = z5.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: z5.string().nullable(),
  first_name: z5.string(),
  last_name: z5.string(),
  full_name: z5.string(),
  pax: z5.number(),
  email: z5.string().email().nullable(),
  phone: z5.string().nullable(),
  booking_id: z5.string().nullable(),
  flight_number: z5.string().optional(),
  gender: z5.enum(["M", "F", "O"]).optional(),
  package_size: z5.string().optional(),
  sent_messages: z5.record(z5.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: z5.object({
    source: z5.string(),
    manual: z5.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z5.boolean(),
  is_pseudonymized: z5.boolean(),
  import_id: z5.string().nullable().optional(),
  package_specifications: z5.record(z5.any()).optional()
};
var bookingAppSchema = baseModelAppSchema.extend({
  ...commonBookingFields,
  return_date: z5.date().nullable(),
  departure_date: z5.date(),
  partner: partnerRefString,
  promo_codes: promoCodeRefStringArray,
  users: userRefStringArrayNullable,
  esims: esimRefStringArrayNullable
});

// src/schemas/base/partner.ts
import { z as z6 } from "zod";
var addressSchema = z6.object({
  street: z6.string().optional(),
  city: z6.string().optional(),
  postal_code: z6.string().optional(),
  country: z6.string().optional()
}).nullable();
var registrationSchema = z6.object({
  chamber_of_commerce_number: z6.string().nullable().optional(),
  vat_number: z6.string().nullable().optional(),
  anvr_number: z6.number().nullable().optional(),
  tax_number: z6.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = z6.object({
  account_holder: z6.string(),
  bank_name: z6.string(),
  iban: z6.string()
}).nullable();
var commonPackagePriceFields = {
  destination: z6.string(),
  label: z6.string(),
  type: z6.enum(["data-limit", "time-limit"]),
  price: z6.number()
};
var packagePriceAppSchema = z6.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: z6.number()
};
var partnerPricingStrategyAppSchema = z6.object({
  ...commonPricingStrategyFields,
  strategy: z6.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: z6.array(packagePriceAppSchema)
});
var userPricingStrategyAppSchema = z6.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: z6.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: z6.number().nullable(),
  income_per_gb: z6.number().nullable(),
  commission_fee: z6.number().nullable().optional(),
  payment_method: z6.enum(["invoice", "direct"]),
  requires_card: z6.boolean().nullable(),
  next_invoice: z6.date().nullable().optional(),
  last_invoice: z6.date().nullable().optional()
};
var financialPropertiesAppSchema = z6.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: z6.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = z6.object({
  name: z6.string(),
  iso3_white_list: z6.array(z6.string()).optional(),
  parameters: z6.any()
});
var bookingDefaultsSchema = z6.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = z6.object({
  brevo_template_id: z6.number(),
  send_booking_confirmation: z6.boolean()
});
var visualIdentityBannerSchema = z6.object({
  image_url: z6.string(),
  alt: z6.string(),
  click_url: z6.string(),
  locale: supportedLocalesSchema,
  properties: z6.record(z6.string())
});
var visualIdentityBannerStrategySchema = z6.object({
  strategy: z6.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: z6.array(visualIdentityBannerSchema)
});
var visualIdentitySchema = z6.object({
  primary_color: z6.string(),
  secondary_color: z6.string(),
  logo: z6.string(),
  font: z6.string(),
  top_banner: visualIdentityBannerStrategySchema,
  mid_banner: visualIdentityBannerStrategySchema
});
var scheduleFilterSchema = z6.object({
  type: z6.enum(["iso3", "gender", "percentage", "age"]),
  value: z6.union([z6.string(), z6.number()]),
  comparison: z6.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = z6.object({
  days: z6.number(),
  email: z6.object({
    brevo_template_id: z6.number(),
    subject: z6.record(z6.string()).optional(),
    preview_text: z6.record(z6.string()).optional()
  }).nullable().optional(),
  push: z6.object({
    title: z6.record(z6.string()).optional(),
    body: z6.record(z6.string()).optional(),
    target: z6.string()
  }).nullable().optional(),
  hour: z6.number(),
  key: z6.string(),
  method: z6.enum(["email", "sms", "whatsapp", "push"]),
  moment: z6.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var platformSettingsSchema = z6.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: z6.object({
    packackage_specification: z6.object({
      size: z6.string(),
      type: z6.string(),
      destination: z6.string()
    }),
    allowance: z6.number()
  }).nullable().optional(),
  booking_defaults: bookingDefaultsSchema.nullable().optional(),
  booking_confirmation: bookingConfirmationSchema.nullable().optional(),
  schedules: z6.array(scheduleSchema).optional(),
  ios_app_id: z6.string().optional(),
  android_package_id: z6.string().optional(),
  faq: z6.object({
    title: z6.record(z6.string()),
    content: z6.record(z6.string()).optional(),
    link: z6.record(z6.string())
  }).array().optional(),
  ios_config: z6.string().optional(),
  terms_of_service: z6.record(z6.string()).optional(),
  privacy_policy: z6.record(z6.string()).optional(),
  enabled_locales: z6.array(supportedLocalesSchema).optional(),
  custom_texts: z6.record(z6.record(z6.string())).optional()
}).nullable();
var commonContactFields = {
  email: z6.string().nullable(),
  office_phone: z6.string().nullable().optional()
};
var commonPartnerFields = {
  name: z6.string().nullable(),
  type: z6.string().nullable(),
  is_active: z6.boolean().nullable().optional(),
  external_id: z6.string().nullable().optional(),
  contact: z6.object(commonContactFields).nullable(),
  address: addressSchema,
  registration: registrationSchema,
  banking_details: bankingDetailsSchema,
  visual_identity: visualIdentitySchema.nullable(),
  data: z6.object({
    source: z6.string(),
    manual: z6.boolean()
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
  name: z6.string(),
  description: z6.string().nullable(),
  partner: partnerRefStringNullable,
  package_prices: z6.array(packagePriceAppSchema)
});

// src/schemas/base/country.ts
import { z as z7 } from "zod";
var countryAppSchema = z7.object({
  id: z7.string().nullable(),
  bokun_id: z7.number().nullable(),
  LTE: z7.boolean().nullable(),
  apn: z7.string().nullable(),
  click_count: z7.number().nullable(),
  global_network: z7.string().nullable(),
  global_price: z7.number().nullable(),
  hubby: z7.number().nullable(),
  imsi: z7.number().nullable(),
  name: z7.string().nullable(),
  region: z7.boolean().nullable(),
  is_region: z7.boolean().nullable(),
  countries: z7.array(z7.string()).nullable(),
  tier: z7.number().nullable()
});

// src/schemas/base/package.ts
import { z as z8 } from "zod";
var commonPackageFields = {
  external_id: z8.string(),
  provider: z8.string(),
  coverage_label: z8.string().nullable(),
  label: z8.string(),
  bytes: z8.number(),
  hidden: z8.boolean(),
  is_hidden: z8.boolean(),
  is_active: z8.boolean(),
  priority: z8.number(),
  country_data: countryAppSchema.nullable(),
  price: z8.number(),
  partner_price: z8.number(),
  days: z8.number(),
  name: z8.string(),
  type: z8.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z8.number().optional(),
  provider_parameters: z8.object({
    imsi: z8.number()
  }).nullable()
};
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
});

// src/schemas/base/promoCode.ts
import { z as z10 } from "zod";

// src/schemas/base/api.ts
import { z as z9 } from "zod";
var packageSpecificationSchema = z9.object({
  destination: z9.string().optional(),
  size: z9.string().optional(),
  package_id: z9.string().optional(),
  iata_code: z9.string().optional()
});
var packageSpecificationsSchema = z9.array(packageSpecificationSchema);
var bookingApiResponseSchema = z9.object({
  id: z9.string(),
  title: z9.string().nullable(),
  first_name: z9.string(),
  last_name: z9.string(),
  full_name: z9.string(),
  pax: z9.number(),
  email: z9.string().nullable(),
  phone: z9.string().nullable(),
  booking_id: z9.string().nullable(),
  return_date: z9.string().nullable(),
  // ISO string
  partner: z9.string(),
  // ID string
  promo_codes: z9.array(z9.string()),
  // Array of ID strings
  departure_date: z9.string(),
  // ISO string
  flight_number: z9.string().optional(),
  gender: z9.enum(["M", "F", "O"]).optional(),
  package_size: z9.string().optional(),
  sent_messages: z9.record(z9.any()).optional(),
  users: z9.array(z9.string()),
  // Array of ID strings
  esims: z9.array(z9.string()).nullable(),
  // Array of ID strings or null
  locale: z9.string(),
  status: z9.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z9.object({
    source: z9.string(),
    manual: z9.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z9.boolean(),
  is_pseudonymized: z9.boolean(),
  import_id: z9.string().nullable().optional(),
  created_at: z9.string(),
  // ISO string
  updated_at: z9.string(),
  // ISO string
  created_by: z9.string().optional(),
  updated_by: z9.string().optional()
});
var promoCodeApiResponseSchema = z9.object({
  promo_code: z9.string(),
  package_id: z9.string(),
  package_size: z9.string(),
  destination: z9.string()
});
var bookingApiRequestSchema = z9.object({
  id: z9.string(),
  title: z9.string().nullable(),
  first_name: z9.string().nullable().optional(),
  last_name: z9.string().nullable().optional(),
  full_name: z9.string().nullable().optional(),
  pax: z9.number().int().min(1).nullable().optional(),
  email: z9.string().nullable().optional(),
  phone: z9.string().nullable().optional(),
  booking_id: z9.string().min(3).nullable().optional(),
  return_date: z9.date().nullable(),
  // Must be after departure_date
  departure_date: z9.date(),
  // ISO 8601 date string
  flight_number: z9.string().nullable().optional(),
  gender: z9.enum(["M", "F", "O"]).optional(),
  package_size: z9.string().optional(),
  sent_messages: z9.record(z9.any()).optional(),
  locale: z9.string().min(2).max(5).optional(),
  status: z9.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z9.object({
    source: z9.string(),
    manual: z9.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z9.boolean(),
  is_pseudonymized: z9.boolean(),
  date_of_birth: z9.date().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: z9.date(),
  updated_at: z9.date()
});
var partnerApiRequestSchema = z9.object({
  id: z9.string(),
  name: z9.string().nullable(),
  type: z9.string().nullable(),
  is_active: z9.boolean().nullable().optional(),
  external_id: z9.string().nullable().optional(),
  parent: z9.string().nullable(),
  // String ID
  contact: z9.object({
    email: z9.string().nullable(),
    office_phone: z9.string().nullable().optional()
  }).nullable(),
  address: z9.object({
    street: z9.string().optional(),
    city: z9.string().optional(),
    postal_code: z9.string().optional(),
    country: z9.string().optional()
  }).nullable().optional(),
  registration: z9.object({
    chamber_of_commerce_number: z9.string().nullable().optional(),
    vat_number: z9.string().nullable().optional(),
    anvr_number: z9.number().nullable().optional(),
    tax_number: z9.string().nullable().optional()
  }).nullable().optional(),
  banking_details: z9.object({
    account_holder: z9.string(),
    bank_name: z9.string(),
    iban: z9.string()
  }).nullable().optional(),
  finance: z9.object({
    administration_fee: z9.number().nullable(),
    income_per_gb: z9.number().nullable(),
    commission_fee: z9.number().optional(),
    payment_method: z9.enum(["invoice", "direct"]),
    requires_card: z9.boolean().nullable(),
    next_invoice: z9.date().nullable(),
    last_invoice: z9.date().nullable(),
    pricing_strategies: z9.object({
      partner: z9.object({
        strategy: z9.enum(["split", "bundle"]),
        default_price_list: z9.string().nullable(),
        custom_prices: z9.array(z9.any()),
        modification_percentage: z9.number()
      }),
      user: z9.object({
        default_price_list: z9.string().nullable(),
        custom_prices: z9.array(z9.any()),
        modification_percentage: z9.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: z9.any().optional(),
  visual_identity: z9.any().nullable(),
  users: z9.array(z9.string()).nullable(),
  // Array of string IDs
  data: z9.object({
    source: z9.string(),
    manual: z9.boolean()
  }).optional(),
  created_at: z9.date(),
  updated_at: z9.date(),
  created_by: z9.string().nullable(),
  updated_by: z9.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/base/promoCode.ts
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: z10.string(),
  code: z10.string(),
  allowance_user: z10.number(),
  allowance_total: z10.number(),
  type: z10.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z10.string()),
  usage: z10.array(z10.string()),
  uuid_usage: z10.array(z10.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: z10.date(),
  valid_to: z10.date(),
  // Optional fields based on the type
  discount: z10.number().optional(),
  package_size: z10.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: z10.array(z10.string()).optional(),
  max_bytes: z10.number().optional(),
  starter_data: z10.number().optional()
});

// src/schemas/base/esim.ts
import { z as z11 } from "zod";
var commonESIMFields = {
  imsi: z11.number(),
  qr: z11.string(),
  iccid: z11.string(),
  provider: z11.string(),
  coverage_label: z11.string().nullable().optional(),
  total_data: z11.number().nullable(),
  data_left: z11.number().nullable(),
  data_used: z11.boolean().nullable(),
  status: z11.string().nullable(),
  name: z11.string(),
  android_auto: z11.boolean(),
  partner_price: z11.number().nullable(),
  promo: z11.string().nullable(),
  type: z11.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: z11.boolean(),
  is_archived: z11.boolean(),
  user: z11.string().nullable(),
  payment: z11.string().nullable(),
  apn: z11.string().nullable()
};
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: z11.string().nullable(),
  time_assigned: z11.date().nullable(),
  last_updated: z11.date().nullable(),
  partner: z11.string().nullable()
});

// src/schemas/base/payment.ts
import { z as z12 } from "zod";
var paymentAppSchema = baseModelAppSchema.extend({
  amount: z12.number(),
  customer: z12.string(),
  date: z12.date(),
  iccid: z12.string(),
  package: z12.string(),
  promo: z12.string(),
  topup: z12.boolean()
});

// src/schemas/base/message.ts
import { z as z13 } from "zod";
var messageAppSchema = z13.object({
  id: z13.string(),
  key: z13.string(),
  method: z13.enum(["push", "sms", "email"]),
  status: z13.enum(["pending", "sent", "failed", "delivered"]),
  created_at: z13.date(),
  updated_at: z13.date()
});
var sentMessagesAppSchema = z13.record(messageAppSchema);

// src/schemas/base/currency.ts
import { z as z14 } from "zod";

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
var conversionRateSchema = z14.object({
  currency: z14.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: z14.string(),
  symbol: z14.string(),
  name: z14.string(),
  rate: z14.number(),
  is_default: z14.boolean()
};
var currencyAppSchema = documentedObject(
  baseModelAppSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs
);

// src/schemas/base/apiLogs.ts
import { z as z15 } from "zod";
var apiLogAppSchema = z15.object({
  id: z15.string().optional(),
  method: z15.string(),
  user_id: z15.string().optional(),
  path: z15.string(),
  resource_type: z15.string().optional(),
  resource_id: z15.string().optional(),
  partner_id: z15.string().optional(),
  payload: z15.record(z15.unknown()).optional(),
  timestamp: z15.date(),
  status_code: z15.number()
});

// src/schemas/base/utils.ts
var convertToDate = (value) => {
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  throw new Error(`Unable to convert value to Date: ${value}`);
};
var isDate = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};
export {
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
  testEnv,
  userAppSchema,
  userPricingStrategyAppSchema,
  userRefString,
  userRefStringArray,
  userRefStringArrayNullable,
  userRefStringNullable,
  visualIdentityBannerSchema,
  visualIdentityBannerStrategySchema,
  visualIdentitySchema
};
//# sourceMappingURL=base.js.map