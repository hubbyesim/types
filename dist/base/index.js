import { z } from 'zod';

// src/builders/client.ts
function wrapZodSchema(schema, options) {
  if (!options)
    return schema;
  let wrapped = schema;
  if (options.nullable && !wrapped.isNullable?.()) {
    wrapped = wrapped.nullable();
  }
  if (options.optional && !wrapped.isOptional?.()) {
    wrapped = wrapped.optional();
  }
  for (const [key, value] of Object.entries(options)) {
    if (["nullable", "optional"].includes(key) || value === void 0) {
      continue;
    }
    if (typeof wrapped[key] === "function") {
      wrapped = wrapped[key](value);
    }
  }
  return wrapped;
}
function wrapObjectSchema(spec, path, builder) {
  const pathString = path.join(".");
  if (!("of" in spec)) {
    throw new Error(`Object spec at "${pathString}" is missing 'of'`);
  }
  const shape = {};
  for (const [key, value] of Object.entries(spec.of)) {
    shape[key] = builder(value, [...path, key]);
  }
  let objectSchema = z.object(shape);
  if (spec.nullable)
    objectSchema = objectSchema.nullable();
  if (spec.optional)
    objectSchema = objectSchema.optional();
  return objectSchema;
}
function wrapPlainObjectSchema(spec, path, builder) {
  path.join(".");
  if ("_type" in spec && spec._type === "object" && "of" in spec) {
    return wrapObjectSchema(spec, path, builder);
  }
  const shape = {};
  for (const [key, val] of Object.entries(spec)) {
    if (key !== "_type" && key !== "nullable" && key !== "optional") {
      shape[key] = builder(val, [...path, key]);
    }
  }
  let schema = z.object(shape);
  if ("nullable" in spec && spec.nullable === true) {
    schema = schema.nullable();
  }
  if ("optional" in spec && spec.optional === true) {
    schema = schema.optional();
  }
  return schema;
}
var SCHEMA_MARKER = Symbol("ZodSchemaSpecMarker");
function markAsSchemaSpec(spec) {
  Object.defineProperty(spec, SCHEMA_MARKER, {
    value: true,
    enumerable: false,
    configurable: false,
    writable: false
  });
  return spec;
}
function isSchemaSpec(obj) {
  return typeof obj === "object" && obj !== null && SCHEMA_MARKER in obj;
}

// src/builders/client.ts
function buildClientSchema(spec, path = []) {
  const pathString = path.join(".");
  if (spec === void 0 || spec === null) {
    throw new Error(`Invalid schema spec at "${pathString || "<root>"}": received ${spec}`);
  }
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec);
  }
  if (typeof spec === "object" && spec !== null && ("_def" in spec || "~standard" in spec && spec["~standard"]?.vendor === "zod")) {
    try {
      return wrapZodSchema(spec);
    } catch (error) {
      console.warn(`Failed to use object as Zod schema at "${pathString}":`, error);
    }
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "array") {
    if (!("of" in spec)) {
      throw new Error(`Array spec at "${pathString}" is missing 'of'`);
    }
    let schema = z.array(buildClientSchema(spec.of, [...path, "[i]"]));
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "record") {
    if (!("of" in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }
    let schema = z.record(buildClientSchema(spec.of, [...path, "[key]"]));
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "timestamp") {
    let schema = z.preprocess((val) => {
      if (typeof val === "string") {
        const date = new Date(val);
        return isNaN(date.getTime()) ? void 0 : date;
      }
      if (typeof val === "number") {
        const date = new Date(val);
        return isNaN(date.getTime()) ? void 0 : date;
      }
      return val;
    }, z.date({ required_error: "Date is required", invalid_type_error: "Invalid date format" }));
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "docRef") {
    let schema = z.string();
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "object" && "of" in spec) {
    return wrapObjectSchema(spec, path, buildClientSchema);
  }
  if (isSchemaSpec(spec) || typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "object") {
    return wrapPlainObjectSchema(spec, path, buildClientSchema);
  }
  if (typeof spec === "object" && spec !== null) {
    try {
      return wrapPlainObjectSchema(spec, path, buildClientSchema);
    } catch (error) {
      console.warn(`Failed to handle object as plain schema at "${pathString}":`, error);
    }
  }
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
}
var PARTNER_COLLECTION = "/companies/hubby/partners";
var USER_COLLECTION = "users";
var PACKAGE_COLLECTION = "/companies/hubby/packages";
var PROMO_CODE_COLLECTION = "/companies/hubby/promo_codes";
var COUNTRY_COLLECTION = "countries";
var ESIM_COLLECTION = "esims";
var PRICE_LIST_COLLECTION = "price_lists";
var BOOKING_COLLECTION = "bookings";
var ROLE_COLLECTION = "roles";
var PERMISSION_COLLECTION = "permissions";
var TRAFFIC_POLICY_COLLECTION = "traffic_policies";
var timestampNullableOptional = { _type: "timestamp", nullable: true, optional: true };
var timestampNullable = { _type: "timestamp", nullable: true, optional: false };
var timestampRequired = { _type: "timestamp", nullable: false, optional: false };
var hubbyModelSpec = {
  id: z.string().nullable().optional(),
  created_at: timestampRequired,
  updated_at: timestampNullableOptional,
  created_by: { _type: "docRef", collection: "users", nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: "users", nullable: true, optional: true }
};
var tagModelSpec = {
  ...hubbyModelSpec,
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  color: z.string().nullable().optional()
};

// src/specs/user.ts
var apiKeySpec = {
  expires_at: { _type: "timestamp" },
  secret: z.string(),
  is_active: z.boolean()
};
var apiKeysSpec = {
  _type: "record",
  of: {
    _type: "object",
    of: apiKeySpec
  }
};
var apiKeysObjectSpec = {
  _type: "object",
  of: {
    allowed_keys: { _type: "array", nullable: true, optional: true, of: z.string() },
    keys: apiKeysSpec
  },
  nullable: true,
  optional: true
};
var userSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  stripe_id: z.string().nullable().optional(),
  referral: z.string().nullable().optional(),
  fcm: z.string().optional(),
  deeplink: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  coordinates: z.string().nullable().optional(),
  platform: z.enum(["ios", "android"]).nullable().optional(),
  platform_version: z.string().nullable().optional(),
  device_type: z.string().nullable().optional(),
  app_version: z.string().nullable().optional(),
  parameters: z.any().nullable().optional(),
  locale: z.string().nullable().optional(),
  phone_model: z.string().nullable().optional(),
  phone_os: z.string().nullable().optional(),
  phone_os_version: z.string().nullable().optional(),
  ios: z.boolean().nullable().optional(),
  has_card_saved: z.boolean().nullable().optional(),
  admin: z.boolean().nullable().optional(),
  api_keys: apiKeysObjectSpec,
  profileRef: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  receipt_email: z.string().nullable().optional(),
  source: z.enum(["direct", "promo", "platform"]).nullable().optional(),
  role: { _type: "docRef", collection: ROLE_COLLECTION, optional: true, nullable: true },
  permissions: { _type: "array", of: { _type: "docRef", collection: PERMISSION_COLLECTION }, optional: true, nullable: true },
  balance: z.number().nullable().optional(),
  createdAt: { _type: "timestamp" },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, optional: true, nullable: true },
  review_requested: timestampNullableOptional,
  last_seen: timestampNullableOptional,
  created_at: timestampNullableOptional,
  updated_at: timestampNullableOptional,
  created_by: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  push_to_start_token: z.string().nullable().optional()
});
var SUPPORTED_LOCALES = [
  "en-US",
  "en-EU",
  "en-GB",
  "en-CA",
  "nl-NL",
  "de-DE",
  "fr-FR",
  "fr-CA",
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
  "sv-SE",
  "sk-SK",
  "de-BE",
  "en-AU",
  "da-DK"
];
var supportedLocalesSchema = z.enum(SUPPORTED_LOCALES);
var packageSpecificationSchema = z.object({
  destination: z.string().optional().or(z.array(z.string())),
  size: z.string().optional(),
  package_id: z.string().optional(),
  iata_code: z.string().optional(),
  package_duration: z.number().optional(),
  package_type: z.enum(["data-limited", "time-limited", "starter", "unlimited"]).optional(),
  traffic_policy: z.string().optional()
});
var promoCodeSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  redeemed_at: timestampNullableOptional,
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // PromoCode specific fields
  uuid: z.string().uuid().nullable().optional(),
  external_id: z.string(),
  code: z.string(),
  claimed_at: timestampNullableOptional,
  allowance_user: z.number(),
  allowance_total: z.number(),
  type: z.enum(["discount", "booking", "booking_without_destination"]).nullable().or(z.string()),
  usage: z.array(z.string()),
  uuid_usage: z.array(z.string()),
  package_specification: packageSpecificationSchema.optional(),
  valid_from: timestampRequired,
  valid_to: timestampRequired,
  // Reference fields
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  package: { _type: "docRef", collection: PACKAGE_COLLECTION, nullable: true },
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  booking: { _type: "docRef", collection: BOOKING_COLLECTION, nullable: true },
  // Optional fields based on the type
  discount: z.number().optional(),
  package_size: z.string().optional(),
  countries: z.array(z.string()).optional(),
  max_bytes: z.number().optional(),
  starter_data: z.number().optional()
});

// src/specs/booking.ts
var communicationChannelSchema = z.enum([
  "EMAIL",
  "WHATSAPP",
  "PUSH_NOTIFICATION",
  "SMS"
]);
var bookingStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var communicationOptionsSchema = z.object({
  should_send_message: z.boolean(),
  channels: z.array(communicationChannelSchema)
});
var financialInsightsSchema = z.object({
  partner_commission_percentage: z.number().nullable().optional(),
  total_commission_amount: z.number().nullable().optional(),
  price: z.number().nullable().optional()
}).nullable().optional();
var bookingSchemaSpec = markAsSchemaSpec({
  id: z.string().optional(),
  external_id: z.string().nullable().optional(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  title: z.string().nullable(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  pax: z.number(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  booking_id: z.string().nullable(),
  flight_number: z.string().optional(),
  gender: z.enum(["M", "F", "O"]).optional(),
  sent_messages: z.record(z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: {
    _type: "object",
    of: {
      source: z.string(),
      manual: z.boolean(),
      action: z.string()
    }
  },
  communication_options: {
    _type: "object",
    of: {
      should_send_message: z.boolean(),
      channels: {
        _type: "array",
        of: communicationChannelSchema
      }
    }
  },
  is_processed_for_esim_restoration: z.boolean(),
  is_pseudonymized: z.boolean(),
  import_id: z.string().nullable().optional(),
  package_specifications: z.array(packageSpecificationSchema).min(1),
  departure_date: timestampRequired,
  return_date: timestampNullable,
  partner: { _type: "docRef", collection: PARTNER_COLLECTION },
  financial_insights: financialInsightsSchema,
  promo_codes: {
    _type: "array",
    of: { _type: "docRef", collection: PROMO_CODE_COLLECTION }
  },
  users: {
    _type: "array",
    of: { _type: "docRef", collection: USER_COLLECTION },
    nullable: true
  },
  esims: {
    _type: "array",
    of: { _type: "docRef", collection: ESIM_COLLECTION },
    nullable: true
  },
  hubby_foreign_identifiers: z.object({
    messaging_contact_id: z.string().nullable()
  }).nullable().optional()
});
var countrySchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  bokun_id: z.number().nullable(),
  LTE: z.boolean().nullable(),
  apn: z.string().nullable(),
  click_count: z.number().nullable(),
  global_network: z.string().nullable(),
  global_price: z.number().nullable(),
  hubby: z.number().nullable(),
  imsi: z.number().nullable(),
  has_esim: z.boolean(),
  name: z.string().nullable(),
  region: z.boolean().nullable(),
  i18n_name: z.record(z.string()),
  is_region: z.boolean().nullable(),
  countries: z.array(z.string()).nullable(),
  tier: z.number().nullable()
});
z.object({
  currency: z.number()
});
var currencySchemaSpec = markAsSchemaSpec({
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // ISO 4217 currency code (e.g., "USD", "EUR")
  code: z.string().describe('ISO 4217 currency code (e.g., "USD", "EUR")'),
  // Currency symbol (e.g., "$", "€")
  symbol: z.string().describe('Currency symbol (e.g., "$", "\u20AC")'),
  // Full name of the currency (e.g., "US Dollar")
  name: z.string().describe('Full name of the currency (e.g., "US Dollar")'),
  // Exchange rate relative to base currency
  rate: z.number().describe("Exchange rate relative to base currency"),
  // Whether this is the default currency
  is_default: z.boolean().describe("Whether this is the default currency")
});
var statusHistorySchema = z.object({
  telna_esim_status: z.number(),
  source: z.string(),
  status: z.string(),
  timestamp: timestampRequired
});
var esimStatusHistorySchema = markAsSchemaSpec(z.array(statusHistorySchema).nullable().optional());
var esimSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Common eSIM fields
  imsi: z.number(),
  qr: z.string(),
  iccid: z.string(),
  provider: z.string(),
  coverage_label: z.string().nullable().optional(),
  total_data: z.number(),
  data_left: z.number(),
  uuid: z.string().uuid().nullable().optional(),
  data_used: z.boolean(),
  status: z.string().nullable(),
  status_history: esimStatusHistorySchema,
  name: z.string(),
  android_auto: z.boolean(),
  partner_price: z.number().nullable(),
  promo: z.string().nullable(),
  type: z.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: z.boolean(),
  is_archived: z.boolean(),
  user: z.string().nullable(),
  payment: z.string().nullable(),
  apn: z.string().nullable(),
  // Reference fields
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  // Timestamp fields
  time_assigned: timestampNullable,
  last_updated: timestampNullable
});
var paymentSchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  // Core payment fields (universal across ALL payment types)
  amount: z.number(),
  customer: z.string(),
  date: timestampRequired,
  source: z.enum(["app", "webapp", "platform"]),
  invoice: z.string().optional(),
  fee: z.number().optional(),
  topup: z.boolean(),
  status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
  // 'pending' | 'processing' | 'completed' | 'failed'
  payment_intent_id: z.string().nullable().optional(),
  // Stripe PaymentIntent ID
  error_message: z.string().nullable().optional(),
  // Error message
  // Common resolved package specification (same format for all sources)
  package_specifications: z.array(z.object({
    package_type: z.string().optional(),
    package_size: z.string().optional(),
    package_duration: z.number().optional(),
    destination: z.string().optional(),
    iso3: z.string().optional()
  })).optional(),
  // Reference fields
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true },
  // Source-specific payment properties
  app_payment_properties: z.object({
    package: z.string().optional(),
    // package_id for app payments
    promo: z.string().optional(),
    iccid: z.string().optional(),
    global: z.string().optional(),
    balance_used: z.number().optional(),
    booking_id: z.string().nullable().optional(),
    discount_amount: z.string().optional(),
    is_special_offer: z.boolean().optional(),
    special_offer_discount: z.number().optional()
  }).optional(),
  webapp_platform_payment_properties: z.object({
    promo_codes: z.array(z.string()).optional(),
    booking_id: z.string().optional(),
    partner: z.string().optional(),
    purchaseType: z.string().optional(),
    affiliateId: z.string().nullable().optional(),
    partner_name: z.string().optional(),
    locale: z.string().optional()
  }).optional()
});
var messageSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  key: z.string(),
  method: z.enum(["push", "sms", "email"]),
  status: z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampRequired,
  updated_at: timestampRequired
});
var trafficPolicySpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  name: z.string(),
  description: z.string(),
  external_id: z.string(),
  provider: z.string()
});
var packageSchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  // Package specific fields
  external_id: z.string(),
  provider: z.string(),
  coverage_label: z.string().nullable(),
  label: z.string(),
  bytes: z.number(),
  hidden: z.boolean(),
  is_hidden: z.boolean(),
  is_active: z.boolean(),
  priority: z.number(),
  traffic_policy: { _type: "docRef", collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
  price: z.number(),
  partner_price: z.number(),
  days: z.number(),
  name: z.string(),
  type: z.enum(["data-limited", "time-limited", "starter", "unlimited"]).nullable(),
  throttling: z.number().optional(),
  provider_parameters: z.object({
    imsi: z.number()
  }).nullable(),
  // Reference fields
  country: { _type: "docRef", collection: COUNTRY_COLLECTION },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  // Nested country data - need to use dynamic reference to country schema
  // This would typically be handled better with a proper recursive schema definition
  // but for simplicity, we're using any type here
  country_data: {
    _type: "object",
    of: countrySchemaSpec,
    nullable: true,
    optional: true
  }
  // country_data: z.any().nullable()
});
var commonPackageSchema = markAsSchemaSpec({
  size: z.string(),
  iso: z.string(),
  days: z.number(),
  price: z.number(),
  is_hidden: z.boolean(),
  is_active: z.boolean(),
  priority: z.number(),
  packageType: z.string(),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true }
});
var telnaPackageSchema = markAsSchemaSpec({
  traffic_policy: { _type: "docRef", collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
  ...commonPackageSchema
});
var bondioPackageSchema = markAsSchemaSpec({
  ...commonPackageSchema,
  label: z.enum(["lambda", "tau"]),
  periodDays: z.number(),
  periodIterations: z.number(),
  throttling: z.number().optional().nullable()
});
var addressSchema = z.object({
  street: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  country: z.string().nullable().optional()
});
var emitEventSchema = z.object({
  topup: z.boolean().optional().default(false),
  redemption: z.boolean().optional().default(false),
  activation: z.boolean().optional().default(false),
  depletion: z.boolean().optional().default(false)
});
var registrationSchema = z.object({
  chamber_of_commerce_number: z.string().nullable().optional(),
  vat_number: z.string().nullable().optional(),
  anvr_number: z.number().nullable().optional(),
  tax_number: z.string().nullable().optional()
});
var bankingDetailsSchema = z.object({
  account_holder: z.string().nullable().optional(),
  billing_email: z.string().nullable().optional(),
  bank_name: z.string().nullable().optional(),
  iban: z.string().nullable().optional(),
  currency: z.string().nullable().optional()
});
var packagePriceSchema = z.object({
  destination: z.string(),
  label: z.string(),
  type: z.enum(["data-limited", "time-limited"]),
  price: z.number(),
  package: z.object({ _type: z.literal("docRef"), collection: z.literal(PACKAGE_COLLECTION) })
});
var packageSpecificationSchema2 = z.object({
  size: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  destination: z.string().nullable().optional()
});
var pricingStrategySchema = z.object({
  strategy: z.enum(["split", "bundle"]),
  modification_percentage: z.number(),
  default_price_list: z.object({
    _type: z.literal("docRef"),
    collection: z.literal(PRICE_LIST_COLLECTION),
    nullable: z.literal(true)
  }),
  custom_prices: z.array(packagePriceSchema)
});
var visualIdentityBannerSchema = z.object({
  action: z.string().nullable().optional(),
  image_url: z.string(),
  alt: z.string(),
  click_url: z.string(),
  locale: supportedLocalesSchema,
  properties: z.record(z.string())
});
var scheduleFilterSchema = z.object({
  type: z.enum(["iso3", "gender", "percentage", "age"]),
  value: z.union([z.string(), z.number()]),
  comparison: z.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
});
var visualIdentityBannersSchema = z.object({
  strategy: z.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: z.array(visualIdentityBannerSchema).nullable().optional()
});
var visualIdentitySchema = z.object({
  primary_color: z.string(),
  secondary_color: z.string(),
  logo: z.string(),
  font: z.string().nullable().optional(),
  top_banner: visualIdentityBannersSchema.optional(),
  mid_banner: visualIdentityBannersSchema.optional()
});
var partnerContactSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().nullable(),
  office_phone: z.string().nullable().optional(),
  office_email: z.string().nullable().optional()
});
var partnerDataSchema = z.object({
  source: z.string(),
  manual: z.boolean()
});
var packageStrategySchema = z.object({
  name: z.string(),
  iso3_white_list: z.array(z.string()).optional(),
  parameters: z.any()
});
var scheduleEmailSchema = z.object({
  brevo_template_id: z.number(),
  subject: z.record(z.string()).refine(
    (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
    { message: "Keys must be supported locales" }
  ).optional(),
  preview_text: z.record(z.string()).refine(
    (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
    { message: "Keys must be supported locales" }
  ).optional()
}).nullable().optional();
var schedulePushSchema = z.object({
  title: z.record(z.string()).optional(),
  body: z.record(z.string()).optional(),
  target: z.string()
}).nullable().optional();
var scheduleSchema = z.object({
  days: z.number(),
  email: scheduleEmailSchema,
  push: schedulePushSchema,
  hour: z.number(),
  key: z.string(),
  method: z.enum(["email", "sms", "whatsapp", "push"]),
  moment: z.enum(["departure_date", "return_date", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = z.object({
  enabled: z.boolean(),
  package_specification: z.object({
    size: z.string(),
    package_type: z.string(),
    destination: z.string(),
    package_duration: z.number(),
    type: z.string().nullable().optional()
  }),
  booking_id_verification: z.boolean().default(false),
  booking_id_verification_pattern: z.string().nullable().optional(),
  allowance: z.number(),
  total_allowance: z.number()
});
var agentSignupSettingsSchema = z.object({
  slack_channel: z.string().nullable().optional(),
  welcome_email_template: z.number().nullable().optional(),
  password_reset_template: z.number().nullable().optional(),
  partner_type: z.enum(["wholesale", "reseller", "platform", "agent"]).nullable().optional(),
  enable_complimentary_booking: z.boolean().default(true),
  complimentary_booking_partner_id: z.string().nullable().optional(),
  visual_identity_options: z.object({
    hubby_branding: z.boolean().default(true),
    source_partner_branding: z.boolean().default(false),
    own_branding: z.boolean().default(false)
  }).default({})
});
var platformSettingsSchema = z.object({
  package_strategy: z.object({
    name: z.string(),
    iso3_white_list: z.array(z.string()).optional(),
    parameters: z.any(),
    supported_package_types: z.enum(["data-limited", "unlimited"]).optional()
  }).nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: z.object({
    locale: supportedLocalesSchema
  }).nullable().optional(),
  booking_confirmation: z.object({
    brevo_template_id: z.number(),
    send_booking_confirmation: z.boolean()
  }).nullable().optional(),
  emit_events: emitEventSchema.nullable().optional(),
  schedules: z.array(scheduleSchema).optional(),
  brevo: z.object({
    list_ids: z.array(z.number()),
    campaign_mode: z.boolean()
  }).nullable().optional(),
  visual_identity_options: z.object({
    hubby_branding: z.boolean().optional().default(true),
    source_partner_branding: z.boolean().optional().default(false),
    own_branding: z.boolean().optional().default(false)
  }).nullable().optional(),
  agent_signup_settings: agentSignupSettingsSchema.nullable().optional(),
  upgrade_offer: z.object({
    enabled: z.boolean(),
    discount_percentage: z.number().min(0).max(100)
  }).nullable().optional()
});
markAsSchemaSpec({
  destination: z.string(),
  label: z.string(),
  type: z.enum(["data-limited", "time-limited"]),
  price: z.number(),
  package: { _type: "docRef", collection: PACKAGE_COLLECTION }
});
var financialPropertiesSchemaSpec = markAsSchemaSpec({
  administration_fee: z.number().nullable(),
  income_per_gb: z.number().nullable(),
  commission_fee: z.number().nullable().optional(),
  commission_percentage: z.number().nullable().optional(),
  payment_method: z.enum(["invoice", "direct"]),
  requires_card: z.boolean().nullable(),
  next_invoice: timestampNullableOptional,
  last_invoice: timestampNullableOptional,
  pricing_strategies: {
    _type: "object",
    of: {
      partner: {
        _type: "object",
        of: {
          strategy: z.enum(["split", "bundle"]),
          modification_percentage: z.number(),
          default_price_list: { _type: "docRef", collection: PRICE_LIST_COLLECTION, nullable: true },
          custom_prices: {
            _type: "array",
            of: {
              _type: "object",
              of: {
                destination: z.string(),
                label: z.string(),
                type: z.enum(["data-limited", "time-limited"]),
                price: z.number(),
                package: { _type: "docRef", collection: PACKAGE_COLLECTION }
              }
            }
          }
        },
        optional: true
      },
      user: {
        _type: "object",
        of: {
          modification_percentage: z.number(),
          default_price_list: { _type: "docRef", collection: PRICE_LIST_COLLECTION, nullable: true },
          custom_prices: {
            _type: "array",
            of: {
              _type: "object",
              of: {
                destination: z.string(),
                label: z.string(),
                type: z.enum(["data-limited", "time-limited"]),
                price: z.number(),
                package: { _type: "docRef", collection: PACKAGE_COLLECTION }
              }
            }
          }
        },
        optional: true
      }
    },
    nullable: true
  }
});
markAsSchemaSpec({
  package_strategy: {
    _type: "object",
    of: packageStrategySchema.shape,
    nullable: true,
    optional: true
  },
  free_esim: {
    _type: "object",
    of: freeEsimSchema.shape,
    nullable: true,
    optional: true
  },
  booking_defaults: {
    _type: "object",
    of: {
      locale: supportedLocalesSchema
    },
    nullable: true,
    optional: true
  },
  booking_confirmation: {
    _type: "object",
    of: {
      brevo_template_id: z.number(),
      send_booking_confirmation: z.boolean()
    },
    nullable: true,
    optional: true
  },
  schedules: {
    _type: "array",
    of: {
      _type: "object",
      of: scheduleSchema.shape
    },
    optional: true
  },
  agent_signup_settings: {
    _type: "object",
    of: agentSignupSettingsSchema.shape,
    nullable: true,
    optional: true
  }
});
var webhookSettingsSchema = z.object({
  url: z.string().url().nullable().optional(),
  api_key: z.string().nullable().optional(),
  enabled: z.boolean().default(false),
  events: z.object({
    promocode_redemption: z.boolean().default(false)
  }).default({})
});
var partnerSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Partner specific fields
  name: z.string().min(3),
  type: z.enum(["wholesale", "reseller", "platform", "agent"]).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  external_id: z.string().nullable().optional(),
  // Complex nested objects
  contact: {
    _type: "object",
    of: partnerContactSchema.shape,
    nullable: true
  },
  address: {
    _type: "object",
    of: addressSchema.shape,
    nullable: true
  },
  registration: {
    _type: "object",
    of: registrationSchema.shape,
    nullable: true
  },
  banking_details: {
    _type: "object",
    of: bankingDetailsSchema.shape,
    nullable: true
  },
  // Reference fields
  parent: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  users: { _type: "array", of: { _type: "docRef", collection: USER_COLLECTION }, nullable: true },
  // Complex nested structures
  financial_properties: financialPropertiesSchemaSpec,
  // Visual identity
  visual_identity: {
    _type: "object",
    of: visualIdentitySchema.shape,
    nullable: true
  },
  // Platform settings
  platform_settings: {
    _type: "object",
    of: platformSettingsSchema.shape,
    nullable: true
  },
  // Tags
  tags: {
    _type: "array",
    of: tagModelSpec,
    nullable: true,
    optional: true
  },
  // Tag slugs
  tag_slugs: {
    _type: "array",
    of: z.string(),
    nullable: true,
    optional: true
  },
  // Metadata
  data: {
    _type: "object",
    of: partnerDataSchema.shape,
    nullable: true,
    optional: true
  },
  // Webhook settings
  webhook_settings: {
    _type: "object",
    of: webhookSettingsSchema.shape,
    nullable: true,
    optional: true
  }
});
z.object({
  destination: z.string(),
  label: z.string(),
  type: z.enum(["data-limited", "time-limited", "starter", "unlimited"]),
  price: z.number(),
  package: z.string()
});
var priceListItemWithDocRefSpec = {
  destination: z.string(),
  label: z.string(),
  type: z.enum(["data-limited", "time-limited", "starter", "unlimited"]),
  price: z.number(),
  package: { _type: "docRef", collection: PACKAGE_COLLECTION }
};
var priceListSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Price list specific fields
  name: z.string().min(3),
  description: z.string().nullable(),
  type: z.enum(["partner", "consumer"]),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  price_list: {
    _type: "array",
    of: priceListItemWithDocRefSpec,
    optional: true
  },
  package_prices: {
    _type: "array",
    of: priceListItemWithDocRefSpec
  }
});
var analyticsSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  service: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // YYYY-MM-DD
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  event: z.string(),
  parameter: z.string().nullable(),
  sum: z.number()
});
var payloadSpec = {
  _type: "record",
  of: z.unknown(),
  optional: true
};
var apiLogSchemaSpec = markAsSchemaSpec({
  id: z.string().optional(),
  method: z.string(),
  user_id: z.string().optional(),
  path: z.string(),
  resource_type: z.string().optional(),
  resource_id: z.string().optional(),
  partner_id: z.string().optional(),
  payload: payloadSpec,
  timestamp: timestampRequired,
  status_code: z.number()
});
var userTouchpointsSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  unique_device_identifier: z.string().nullable().optional(),
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  booking: { _type: "docRef", collection: BOOKING_COLLECTION, nullable: true, optional: true },
  promo_code: { _type: "docRef", collection: PROMO_CODE_COLLECTION, nullable: true, optional: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true },
  promo_code_redeemed_at: timestampNullableOptional,
  esim_assigned_at: timestampNullableOptional,
  esim_install_initiated_at: timestampNullableOptional,
  esim_install_completed_at: timestampNullableOptional,
  esim_first_package_activated_at: timestampNullableOptional,
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true }
});
var roleSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  name: z.string(),
  description: z.string(),
  permissions: { _type: "array", of: { _type: "docRef", collection: PERMISSION_COLLECTION }, optional: true, nullable: true },
  created_at: timestampRequired,
  updated_at: timestampNullableOptional
});
var permissionSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  name: z.string(),
  description: z.string(),
  created_at: timestampRequired,
  updated_at: timestampNullableOptional
});
var REVIEW_COLLECTION = "/companies/hubby/reviews";
var rewardPackageTypeSchema = z.enum(["data-limited", "starter"]);
var baseRewardSchema = z.object({
  package_size: z.string(),
  package_type: rewardPackageTypeSchema
});
var rewardMultipliersSchema = z.object({
  quality_based: z.number().optional(),
  completion_based: z.number().optional()
}).optional();
var rewardStrategySchema = z.object({
  base_reward: baseRewardSchema,
  multipliers: rewardMultipliersSchema
});
var reviewSchemaSpec = markAsSchemaSpec({
  id: z.string().optional(),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  partner_id: z.string().nullable().optional(),
  questions: z.record(z.any()),
  reward_strategy: rewardStrategySchema,
  created_at: timestampRequired,
  updated_at: timestampNullable,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true }
});
var reviewSubmissionSchemaSpec = markAsSchemaSpec({
  id: z.string().optional(),
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  review: { _type: "docRef", collection: REVIEW_COLLECTION, nullable: true },
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true },
  questions: z.record(z.any()),
  iccid: z.string(),
  isAndroid: z.boolean(),
  country_id: z.string(),
  partner_id: z.string(),
  review_id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampNullable,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  analysis: z.record(z.any()).nullable().optional()
});
var loginRequestSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  email: z.string().email(),
  status: z.enum(["pending", "completed", "expired"]),
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  created_at: timestampRequired,
  expires_at: timestampRequired
});

// src/index.client.ts
var HUserSchema = buildClientSchema(userSchemaSpec);
var HBookingSchema = buildClientSchema(bookingSchemaSpec);
var HCountrySchema = buildClientSchema(countrySchemaSpec);
var HCurrencySchema = buildClientSchema(currencySchemaSpec);
var HESIMSchema = buildClientSchema(esimSchemaSpec);
var HPaymentSchema = buildClientSchema(paymentSchemaSpec);
var HMessageSchema = buildClientSchema(messageSchemaSpec);
var HPackageSchema = buildClientSchema(packageSchemaSpec);
var HPromoCodeSchema = buildClientSchema(promoCodeSchemaSpec);
var HPartnerSchema = buildClientSchema(partnerSchemaSpec);
var HPriceListSchema = buildClientSchema(priceListSchemaSpec);
var HFinancialPropertiesSchema = buildClientSchema(financialPropertiesSchemaSpec);
var HApiLogSchema = buildClientSchema(apiLogSchemaSpec);
var HPackagePriceSchema = buildClientSchema(packagePriceSchema);
var HubbyModelSchema = buildClientSchema(hubbyModelSpec);
var HPartnerAppSchema = buildClientSchema(partnerSchemaSpec);
var HPlatformSettingsSchema = buildClientSchema(platformSettingsSchema);
var HVisualIdentitySchema = buildClientSchema(visualIdentitySchema);
var HPricingStrategySchema = buildClientSchema(pricingStrategySchema);
var HFreeEsimSchema = buildClientSchema(freeEsimSchema);
var HAnalyticsSchema = buildClientSchema(analyticsSpec);
var HRoleSchema = buildClientSchema(roleSchemaSpec);
var HPermissionSchema = buildClientSchema(permissionSchemaSpec);
var HTagSchema = buildClientSchema(tagModelSpec);
var HTrafficPolicySchema = buildClientSchema(trafficPolicySpec);
var HTelnaPackageSchema = buildClientSchema(telnaPackageSchema);
var HBondioPackageSchema = buildClientSchema(bondioPackageSchema);
var HReviewSchema = buildClientSchema(reviewSchemaSpec);
var HReviewSubmissionSchema = buildClientSchema(reviewSubmissionSchemaSpec);
var HUserTouchpointsSchema = buildClientSchema(userTouchpointsSchemaSpec);
var HLoginRequestSchema = buildClientSchema(loginRequestSchemaSpec);
var HAddressSchema = addressSchema;
var HRegistrationSchema = registrationSchema;
var HBankingDetailsSchema = bankingDetailsSchema;
var HPartnerPackageSpecificationSchema = packageSpecificationSchema2;
var HPromoPackageSpecificationSchema = packageSpecificationSchema;
var HVisualIdentityBannerSchema = visualIdentityBannerSchema;
var HScheduleFilterSchema = scheduleFilterSchema;
var HPartnerContactSchema = partnerContactSchema;
var HPartnerDataSchema = partnerDataSchema;
var HCommunicationChannelSchema = communicationChannelSchema;
var HBookingStatusSchema = bookingStatusSchema;
var HCommunicationOptionsSchema = communicationOptionsSchema;
var HRewardStrategySchema = rewardStrategySchema;
var HBaseRewardSchema = baseRewardSchema;
var HRewardMultipliersSchema = rewardMultipliersSchema;
var HRewardPackageTypeSchema = rewardPackageTypeSchema;
var SUPPORTED_LOCALES2 = SUPPORTED_LOCALES;

export { HAddressSchema, HAnalyticsSchema, HApiLogSchema, HBankingDetailsSchema, HBaseRewardSchema, HBondioPackageSchema, HBookingSchema, HBookingStatusSchema, HCommunicationChannelSchema, HCommunicationOptionsSchema, HCountrySchema, HCurrencySchema, HESIMSchema, HFinancialPropertiesSchema, HFreeEsimSchema, HLoginRequestSchema, HMessageSchema, HPackagePriceSchema, HPackageSchema, HPartnerAppSchema, HPartnerContactSchema, HPartnerDataSchema, HPartnerPackageSpecificationSchema, HPartnerSchema, HPaymentSchema, HPermissionSchema, HPlatformSettingsSchema, HPriceListSchema, HPricingStrategySchema, HPromoCodeSchema, HPromoPackageSpecificationSchema, HRegistrationSchema, HReviewSchema, HReviewSubmissionSchema, HRewardMultipliersSchema, HRewardPackageTypeSchema, HRewardStrategySchema, HRoleSchema, HScheduleFilterSchema, HTagSchema, HTelnaPackageSchema, HTrafficPolicySchema, HUserSchema, HUserTouchpointsSchema, HVisualIdentityBannerSchema, HVisualIdentitySchema, HubbyModelSchema, SUPPORTED_LOCALES2 as SUPPORTED_LOCALES };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map