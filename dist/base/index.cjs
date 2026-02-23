'use strict';

var zod = require('zod');

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
  let objectSchema = zod.z.object(shape);
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
  let schema = zod.z.object(shape);
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
  if (spec instanceof zod.z.ZodType) {
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
    let schema = zod.z.array(buildClientSchema(spec.of, [...path, "[i]"]));
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
    let schema = zod.z.record(buildClientSchema(spec.of, [...path, "[key]"]));
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "timestamp") {
    let schema = zod.z.preprocess((val) => {
      if (typeof val === "string") {
        const date = new Date(val);
        return isNaN(date.getTime()) ? void 0 : date;
      }
      if (typeof val === "number") {
        const date = new Date(val);
        return isNaN(date.getTime()) ? void 0 : date;
      }
      return val;
    }, zod.z.date({ required_error: "Date is required", invalid_type_error: "Invalid date format" }));
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && spec !== null && "_type" in spec && spec._type === "docRef") {
    let schema = zod.z.string();
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
var PACKAGE_TEMPLATE_COLLECTION = "/companies/hubby/package_templates";
var PROMO_CODE_COLLECTION = "/companies/hubby/promo_codes";
var COUNTRY_COLLECTION = "countries";
var ESIM_COLLECTION = "esims";
var PRICE_LIST_COLLECTION = "price_lists";
var BOOKING_COLLECTION = "bookings";
var ROLE_COLLECTION = "roles";
var PERMISSION_COLLECTION = "permissions";
var TRAFFIC_POLICY_COLLECTION = "traffic_policies";
var DESTINATION_COLLECTION = "destinations";
var TAG_COLLECTION = "tags";
var timestampNullableOptional = { _type: "timestamp", nullable: true, optional: true };
var timestampNullable = { _type: "timestamp", nullable: true, optional: true };
var timestampRequired = { _type: "timestamp", nullable: false, optional: false };
var dateSchema = zod.z.preprocess((val) => {
  if (val instanceof Date)
    return val;
  if (typeof val === "string" || typeof val === "number") {
    const date = new Date(val);
    return isNaN(date.getTime()) ? void 0 : date;
  }
  return val;
}, zod.z.date());
var hubbyModelSpec = {
  id: zod.z.string().nullable().optional(),
  created_at: timestampRequired,
  updated_at: timestampNullableOptional,
  created_by: { _type: "docRef", collection: "users", nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: "users", nullable: true, optional: true }
};
var tagModelSpec = {
  ...hubbyModelSpec,
  slug: zod.z.string(),
  name: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  color: zod.z.string().nullable().optional(),
  type: zod.z.string().nullable().optional()
  // can be 'partner', 'booking' etc...
};

// src/specs/user.ts
var apiKeySpec = {
  expires_at: { _type: "timestamp" },
  secret: zod.z.string(),
  is_active: zod.z.boolean()
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
    allowed_keys: { _type: "array", nullable: true, optional: true, of: zod.z.string() },
    keys: apiKeysSpec
  },
  nullable: true,
  optional: true
};
var userSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  name: zod.z.string().nullable(),
  email: zod.z.string().email().nullable(),
  stripe_id: zod.z.string().nullable().optional(),
  referral: zod.z.string().nullable().optional(),
  fcm: zod.z.string().optional(),
  deeplink: zod.z.string().nullable().optional(),
  gender: zod.z.string().nullable().optional(),
  company: zod.z.string().nullable().optional(),
  coordinates: zod.z.string().nullable().optional(),
  platform: zod.z.enum(["ios", "android"]).nullable().optional(),
  platform_version: zod.z.string().nullable().optional(),
  device_type: zod.z.string().nullable().optional(),
  app_version: zod.z.string().nullable().optional(),
  parameters: zod.z.any().nullable().optional(),
  locale: zod.z.string().nullable().optional(),
  phone_model: zod.z.string().nullable().optional(),
  phone_os: zod.z.string().nullable().optional(),
  phone_os_version: zod.z.string().nullable().optional(),
  ios: zod.z.boolean().nullable().optional(),
  has_card_saved: zod.z.boolean().nullable().optional(),
  admin: zod.z.boolean().nullable().optional(),
  api_keys: apiKeysObjectSpec,
  profileRef: zod.z.string().nullable().optional(),
  currency: zod.z.string().nullable().optional(),
  receipt_email: zod.z.string().nullable().optional(),
  source: zod.z.enum(["direct", "promo", "platform"]).nullable().optional(),
  role: { _type: "docRef", collection: ROLE_COLLECTION, optional: true, nullable: true },
  permissions: { _type: "array", of: { _type: "docRef", collection: PERMISSION_COLLECTION }, optional: true, nullable: true },
  balance: zod.z.number().nullable().optional(),
  createdAt: { _type: "timestamp" },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, optional: true, nullable: true },
  review_requested: timestampNullableOptional,
  last_seen: timestampNullableOptional,
  created_at: timestampNullableOptional,
  updated_at: timestampNullableOptional,
  created_by: zod.z.string().nullable().optional(),
  updated_by: zod.z.string().nullable().optional(),
  push_to_start_token: zod.z.string().nullable().optional(),
  custom_branding: zod.z.any().nullable().optional()
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
  "da-DK",
  "ko-KR",
  "hu-HU",
  "nn-NO",
  "pt-PT",
  "pt-BR",
  "en-NZ"
];
var supportedLocalesSchema = zod.z.enum(SUPPORTED_LOCALES);
var packageSpecificationSchema = zod.z.object({
  destination: zod.z.string().optional().or(zod.z.array(zod.z.string())),
  iso3: zod.z.string().optional(),
  size: zod.z.string().optional(),
  package_id: zod.z.string().optional(),
  bundle_id: zod.z.string().optional(),
  iata_code: zod.z.string().optional(),
  package_duration: zod.z.number().optional(),
  package_type: zod.z.enum(["data-limited", "time-limited", "starter", "unlimited"]).optional(),
  traffic_policy: zod.z.string().optional()
});
var promoCodeSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  redeemed_at: timestampNullableOptional,
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // PromoCode specific fields
  uuid: zod.z.string().uuid().nullable().optional(),
  external_id: zod.z.string(),
  code: zod.z.string(),
  claimed_at: timestampNullableOptional,
  allowance_user: zod.z.number(),
  allowance_total: zod.z.number(),
  type: zod.z.enum(["discount", "booking", "booking_without_destination"]).nullable().or(zod.z.string()),
  usage: zod.z.array(zod.z.string()),
  uuid_usage: zod.z.array(zod.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  valid_from: timestampRequired,
  valid_to: timestampRequired,
  // Reference fields
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  package: { _type: "docRef", collection: PACKAGE_COLLECTION, nullable: true },
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  booking: { _type: "docRef", collection: BOOKING_COLLECTION, nullable: true },
  // Optional fields based on the type
  discount: zod.z.number().optional(),
  package_size: zod.z.string().optional(),
  countries: zod.z.array(zod.z.string()).optional(),
  max_bytes: zod.z.number().optional(),
  starter_data: zod.z.number().optional()
});

// src/specs/booking.ts
var communicationChannelSchema = zod.z.enum([
  "EMAIL",
  "WHATSAPP",
  "PUSH_NOTIFICATION",
  "SMS"
]);
var bookingStatusSchema = zod.z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var communicationOptionsSchema = zod.z.object({
  should_send_message: zod.z.boolean(),
  channels: zod.z.array(communicationChannelSchema)
});
var financialInsightsSchema = zod.z.object({
  partner_commission_percentage: zod.z.number().nullable().optional(),
  total_commission_amount: zod.z.number().nullable().optional(),
  price: zod.z.number().nullable().optional()
}).nullable().optional();
var bookingSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().optional(),
  external_id: zod.z.string().nullable().optional(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  title: zod.z.string().nullable().optional(),
  first_name: zod.z.string().nullable().optional(),
  last_name: zod.z.string().nullable().optional(),
  full_name: zod.z.string().nullable().optional(),
  pax: zod.z.number().optional().nullable(),
  email: zod.z.string().email().nullable().optional(),
  phone: zod.z.string().nullable().optional(),
  booking_id: zod.z.string().nullable().optional(),
  flight_number: zod.z.string().optional(),
  departure_location: zod.z.string().optional(),
  brand: zod.z.string().nullable().optional(),
  gender: zod.z.enum(["M", "F", "O"]).optional(),
  sent_messages: zod.z.record(zod.z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema.optional().nullable(),
  data: {
    _type: "object",
    of: {
      source: zod.z.string().nullable().optional(),
      manual: zod.z.boolean().nullable().optional(),
      action: zod.z.string().nullable().optional()
    },
    nullable: true,
    optional: true
  },
  communication_options: {
    _type: "object",
    of: {
      should_send_message: zod.z.boolean(),
      channels: {
        _type: "array",
        of: communicationChannelSchema
      }
    }
  },
  is_processed_for_esim_restoration: zod.z.boolean().optional().nullable(),
  is_pseudonymized: zod.z.boolean().optional().nullable(),
  import_id: zod.z.string().nullable().optional(),
  package_specifications: zod.z.array(packageSpecificationSchema).min(1),
  departure_date: timestampRequired,
  return_date: timestampNullable,
  partner: { _type: "docRef", collection: PARTNER_COLLECTION },
  financial_insights: financialInsightsSchema,
  promo_codes: {
    _type: "array",
    of: { _type: "docRef", collection: PROMO_CODE_COLLECTION },
    nullable: true,
    optional: true
  },
  users: {
    _type: "array",
    of: { _type: "docRef", collection: USER_COLLECTION },
    nullable: true,
    optional: true
  },
  esims: {
    _type: "array",
    of: { _type: "docRef", collection: ESIM_COLLECTION },
    nullable: true,
    optional: true
  },
  hubby_foreign_identifiers: zod.z.object({
    messaging_contact_id: zod.z.string().nullable()
  }).nullable().optional(),
  custom_branding: zod.z.string().nullable().optional()
  // Optional custom branding key that references partner->visual_identity->custom_branding->{key}
});
var countrySchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  bokun_id: zod.z.number().nullable(),
  LTE: zod.z.boolean().nullable(),
  apn: zod.z.string().nullable(),
  click_count: zod.z.number().nullable(),
  global_network: zod.z.string().nullable(),
  global_price: zod.z.number().nullable(),
  hubby: zod.z.number().nullable(),
  imsi: zod.z.number().nullable(),
  has_esim: zod.z.boolean(),
  name: zod.z.string().nullable(),
  region: zod.z.boolean().nullable(),
  i18n_name: zod.z.record(zod.z.string()),
  is_region: zod.z.boolean().nullable(),
  countries: zod.z.array(zod.z.string()).nullable(),
  tier: zod.z.number().nullable()
});
zod.z.object({
  currency: zod.z.number()
});
var currencySchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // ISO 4217 currency code (e.g., "USD", "EUR")
  code: zod.z.string().describe('ISO 4217 currency code (e.g., "USD", "EUR")'),
  // Currency symbol (e.g., "$", "€")
  symbol: zod.z.string().describe('Currency symbol (e.g., "$", "\u20AC")'),
  // Full name of the currency (e.g., "US Dollar")
  name: zod.z.string().describe('Full name of the currency (e.g., "US Dollar")'),
  // Exchange rate relative to base currency
  rate: zod.z.number().describe("Exchange rate relative to base currency"),
  // Whether this is the default currency
  is_default: zod.z.boolean().describe("Whether this is the default currency")
});
var statusHistorySchema = zod.z.object({
  telna_esim_status: zod.z.number(),
  source: zod.z.string(),
  status: zod.z.string(),
  timestamp: timestampRequired
});
var esimStatusHistorySchema = markAsSchemaSpec(zod.z.array(statusHistorySchema).nullable().optional());
var esimSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Common eSIM fields
  imsi: zod.z.number(),
  qr: zod.z.string(),
  iccid: zod.z.string(),
  provider: zod.z.string(),
  coverage_label: zod.z.string().nullable().optional(),
  total_data: zod.z.number(),
  data_left: zod.z.number(),
  uuid: zod.z.string().uuid().nullable().optional(),
  data_used: zod.z.boolean(),
  status: zod.z.string().nullable(),
  status_history: esimStatusHistorySchema,
  name: zod.z.string(),
  android_auto: zod.z.boolean(),
  partner_price: zod.z.number().nullable(),
  promo: zod.z.string().nullable(),
  type: zod.z.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: zod.z.boolean(),
  is_archived: zod.z.boolean(),
  user: zod.z.string().nullable(),
  payment: zod.z.string().nullable(),
  apn: zod.z.string().nullable(),
  // Reference fields
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  destination: { _type: "docRef", collection: DESTINATION_COLLECTION, nullable: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  // Timestamp fields
  time_assigned: timestampNullable,
  last_updated: timestampNullable,
  custom_branding: zod.z.any().nullable().optional()
});
var paymentSchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  // Core payment fields (universal across ALL payment types)
  amount: zod.z.number(),
  customer: zod.z.string(),
  date: timestampRequired,
  source: zod.z.enum(["app", "webapp", "platform"]),
  invoice: zod.z.string().optional(),
  fee: zod.z.number().optional(),
  topup: zod.z.boolean(),
  status: zod.z.enum(["pending", "processing", "completed", "failed"]).optional(),
  // 'pending' | 'processing' | 'completed' | 'failed'
  payment_intent_id: zod.z.string().nullable().optional(),
  // Stripe PaymentIntent ID
  error_message: zod.z.string().nullable().optional(),
  // Error message
  // Common resolved package specification (same format for all sources)
  package_specifications: zod.z.array(zod.z.object({
    package_type: zod.z.string().optional(),
    package_size: zod.z.string().optional(),
    package_duration: zod.z.number().optional(),
    destination: zod.z.string().optional(),
    iso3: zod.z.string().optional()
  })).optional(),
  // Reference fields
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true },
  // Source-specific payment properties
  app_payment_properties: zod.z.object({
    package: zod.z.string().optional(),
    // package_id for app payments
    promo: zod.z.string().optional(),
    iccid: zod.z.string().optional(),
    global: zod.z.string().optional(),
    balance_used: zod.z.number().optional(),
    booking_id: zod.z.string().nullable().optional(),
    discount_amount: zod.z.string().optional(),
    is_special_offer: zod.z.boolean().optional(),
    special_offer_discount: zod.z.number().optional()
  }).optional(),
  webapp_platform_payment_properties: zod.z.object({
    promo_codes: zod.z.array(zod.z.string()).optional(),
    booking_id: zod.z.string().optional(),
    partner: zod.z.string().optional(),
    purchaseType: zod.z.string().optional(),
    affiliateId: zod.z.string().nullable().optional(),
    partner_name: zod.z.string().optional(),
    locale: zod.z.string().optional()
  }).optional(),
  custom_branding: zod.z.any().nullable().optional()
});
var messageSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  key: zod.z.string(),
  method: zod.z.enum(["push", "sms", "email"]),
  status: zod.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampRequired,
  updated_at: timestampRequired
});
var trafficPolicySpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  name: zod.z.string(),
  description: zod.z.string(),
  external_id: zod.z.string(),
  provider: zod.z.string()
});
var packageSchemaSpec = markAsSchemaSpec({
  ...hubbyModelSpec,
  // Package specific fields
  external_id: zod.z.string(),
  provider: zod.z.string(),
  coverage_label: zod.z.string().nullable(),
  label: zod.z.string(),
  bytes: zod.z.number(),
  hidden: zod.z.boolean(),
  is_hidden: zod.z.boolean(),
  is_active: zod.z.boolean(),
  priority: zod.z.number(),
  traffic_policy: { _type: "docRef", collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
  price: zod.z.number(),
  partner_price: zod.z.number(),
  days: zod.z.number(),
  name: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited", "starter", "unlimited"]).nullable(),
  throttling: zod.z.number().optional(),
  provider_parameters: zod.z.object({
    imsi: zod.z.number()
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
  size: zod.z.string(),
  iso: zod.z.string(),
  days: zod.z.number(),
  price: zod.z.number(),
  is_hidden: zod.z.boolean(),
  is_active: zod.z.boolean(),
  priority: zod.z.number(),
  packageType: zod.z.string(),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true }
});
var telnaPackageSchema = markAsSchemaSpec({
  traffic_policy: { _type: "docRef", collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
  ...commonPackageSchema
});
var bondioPackageSchema = markAsSchemaSpec({
  ...commonPackageSchema,
  label: zod.z.enum(["lambda", "tau"]),
  periodDays: zod.z.number(),
  periodIterations: zod.z.number(),
  throttling: zod.z.number().optional().nullable()
});
var addressSchema = zod.z.object({
  street: zod.z.string().nullable().optional(),
  city: zod.z.string().nullable().optional(),
  postal_code: zod.z.string().nullable().optional(),
  country: zod.z.string().nullable().optional()
});
var emitEventSchema = zod.z.object({
  topup: zod.z.boolean().optional().default(false),
  redemption: zod.z.boolean().optional().default(false),
  activation: zod.z.boolean().optional().default(false),
  depletion: zod.z.boolean().optional().default(false)
});
var registrationSchema = zod.z.object({
  chamber_of_commerce_number: zod.z.string().nullable().optional(),
  vat_number: zod.z.string().nullable().optional(),
  anvr_number: zod.z.number().nullable().optional(),
  tax_number: zod.z.string().nullable().optional()
});
var bankingDetailsSchema = zod.z.object({
  account_holder: zod.z.string().nullable().optional(),
  billing_email: zod.z.string().nullable().optional(),
  bank_name: zod.z.string().nullable().optional(),
  iban: zod.z.string().nullable().optional(),
  currency: zod.z.string().nullable().optional()
});
var packagePriceSchema = zod.z.object({
  destination: zod.z.string(),
  label: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited"]),
  price: zod.z.number(),
  package: zod.z.object({ _type: zod.z.literal("docRef"), collection: zod.z.literal(PACKAGE_COLLECTION) })
});
var packageSpecificationSchema2 = zod.z.object({
  size: zod.z.string().nullable().optional(),
  type: zod.z.string().nullable().optional(),
  destination: zod.z.string().nullable().optional()
});
var pricingStrategySchema = zod.z.object({
  strategy: zod.z.enum(["split", "bundle"]),
  modification_percentage: zod.z.number(),
  default_price_list: zod.z.object({
    _type: zod.z.literal("docRef"),
    collection: zod.z.literal(PRICE_LIST_COLLECTION),
    nullable: zod.z.literal(true)
  }),
  custom_prices: zod.z.array(packagePriceSchema)
});
var visualIdentityBannerSchema = zod.z.object({
  action: zod.z.string().nullable().optional(),
  image_url: zod.z.string(),
  alt: zod.z.string(),
  click_url: zod.z.string(),
  locale: supportedLocalesSchema,
  properties: zod.z.record(zod.z.string())
});
var scheduleFilterSchema = zod.z.object({
  type: zod.z.enum(["iso3", "gender", "percentage", "age"]),
  value: zod.z.union([zod.z.string(), zod.z.number()]),
  comparison: zod.z.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
});
var visualIdentityBannersSchema = zod.z.object({
  strategy: zod.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: zod.z.array(visualIdentityBannerSchema).nullable().optional()
});
var visualIdentityCustomBrandingSchema = zod.z.object({
  primary_color: zod.z.string(),
  secondary_color: zod.z.string(),
  logo: zod.z.string(),
  font: zod.z.string().nullable().optional(),
  top_banner: visualIdentityBannersSchema.optional(),
  mid_banner: visualIdentityBannersSchema.optional()
});
var visualIdentitySchema = zod.z.object({
  primary_color: zod.z.string(),
  secondary_color: zod.z.string(),
  logo: zod.z.string(),
  font: zod.z.string().nullable().optional(),
  top_banner: visualIdentityBannersSchema.optional(),
  mid_banner: visualIdentityBannersSchema.optional(),
  custom_branding: zod.z.record(visualIdentityCustomBrandingSchema).optional()
});
var partnerContactSchema = zod.z.object({
  name: zod.z.string().nullable().optional(),
  email: zod.z.string().nullable(),
  office_phone: zod.z.string().nullable().optional(),
  office_email: zod.z.string().nullable().optional()
});
var partnerDataSchema = zod.z.object({
  source: zod.z.string(),
  manual: zod.z.boolean()
});
var packageStrategySchema = zod.z.object({
  name: zod.z.string(),
  iso3_white_list: zod.z.array(zod.z.string()).optional(),
  parameters: zod.z.any()
});
var scheduleEmailSchema = zod.z.object({
  brevo_template_id: zod.z.number(),
  subject: zod.z.record(zod.z.string()).refine(
    (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
    { message: "Keys must be supported locales" }
  ).optional(),
  preview_text: zod.z.record(zod.z.string()).refine(
    (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
    { message: "Keys must be supported locales" }
  ).optional()
}).nullable().optional();
var schedulePushSchema = zod.z.object({
  title: zod.z.record(zod.z.string()).optional(),
  body: zod.z.record(zod.z.string()).optional(),
  target: zod.z.string()
}).nullable().optional();
var scheduleSchema = zod.z.object({
  days: zod.z.number(),
  email: scheduleEmailSchema,
  push: schedulePushSchema,
  hour: zod.z.number(),
  key: zod.z.string(),
  method: zod.z.enum(["email", "sms", "whatsapp", "push"]),
  moment: zod.z.enum(["departure_date", "return_date", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = zod.z.object({
  enabled: zod.z.boolean(),
  package_specification: zod.z.object({
    size: zod.z.string(),
    package_type: zod.z.string(),
    destination: zod.z.string(),
    package_duration: zod.z.number(),
    type: zod.z.string().nullable().optional()
  }),
  booking_id_verification: zod.z.boolean().default(false),
  booking_id_verification_pattern: zod.z.string().nullable().optional(),
  allowance: zod.z.number(),
  total_allowance: zod.z.number()
});
var agentSignupSettingsSchema = zod.z.object({
  slack_channel: zod.z.string().nullable().optional(),
  welcome_email_template: zod.z.number().nullable().optional(),
  password_reset_template: zod.z.number().nullable().optional(),
  partner_type: zod.z.enum(["wholesale", "reseller", "platform", "agent"]).nullable().optional(),
  enable_complimentary_booking: zod.z.boolean().default(true),
  complimentary_booking_partner_id: zod.z.string().nullable().optional(),
  is_sales_agent: zod.z.boolean().nullable().optional().default(false),
  visual_identity_options: zod.z.object({
    hubby_branding: zod.z.boolean().default(true),
    source_partner_branding: zod.z.boolean().default(false),
    own_branding: zod.z.boolean().default(false)
  }).default({})
});
var platformSettingsSchema = zod.z.object({
  package_strategy: zod.z.object({
    name: zod.z.string(),
    iso3_white_list: zod.z.array(zod.z.string()).optional(),
    parameters: zod.z.any(),
    supported_package_types: zod.z.enum(["data-limited", "unlimited"]).optional()
  }).nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: zod.z.object({
    locale: supportedLocalesSchema
  }).nullable().optional(),
  booking_confirmation: zod.z.object({
    brevo_template_id: zod.z.number(),
    send_booking_confirmation: zod.z.boolean()
  }).nullable().optional(),
  emit_events: emitEventSchema.nullable().optional(),
  schedules: zod.z.array(scheduleSchema).optional(),
  brevo: zod.z.object({
    list_ids: zod.z.array(zod.z.number()),
    campaign_mode: zod.z.boolean()
  }).nullable().optional(),
  visual_identity_options: zod.z.object({
    hubby_branding: zod.z.boolean().optional().default(true),
    source_partner_branding: zod.z.boolean().optional().default(false),
    own_branding: zod.z.boolean().optional().default(false)
  }).nullable().optional(),
  agent_signup_settings: agentSignupSettingsSchema.nullable().optional(),
  upgrade_offer: zod.z.object({
    enabled: zod.z.boolean(),
    discount_percentage: zod.z.number().min(0).max(100)
  }).nullable().optional(),
  account_manager: zod.z.string().nullable().optional(),
  external_sales_partner_manager: zod.z.string().nullable().optional()
});
markAsSchemaSpec({
  destination: zod.z.string(),
  label: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited"]),
  price: zod.z.number(),
  package: { _type: "docRef", collection: PACKAGE_COLLECTION }
});
var financialPropertiesSchemaSpec = markAsSchemaSpec({
  administration_fee: zod.z.number().nullable(),
  income_per_gb: zod.z.number().nullable(),
  commission_fee: zod.z.number().nullable().optional(),
  commission_percentage: zod.z.number().nullable().optional(),
  payment_method: zod.z.enum(["invoice", "direct", "not-to-invoice", "only-pay-out-commission"]),
  requires_card: zod.z.boolean().nullable(),
  next_invoice: timestampNullableOptional,
  last_invoice: timestampNullableOptional,
  pricing_strategies: {
    _type: "object",
    of: {
      partner: {
        _type: "object",
        of: {
          strategy: zod.z.enum(["split", "bundle"]),
          modification_percentage: zod.z.number(),
          default_price_list: { _type: "docRef", collection: PRICE_LIST_COLLECTION, nullable: true },
          custom_prices: {
            _type: "array",
            of: {
              _type: "object",
              of: {
                destination: zod.z.string(),
                label: zod.z.string(),
                type: zod.z.enum(["data-limited", "time-limited"]),
                price: zod.z.number(),
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
          lifetime_discount_percentage: zod.z.number().optional().nullable(),
          modification_percentage: zod.z.number(),
          default_price_list: { _type: "docRef", collection: PRICE_LIST_COLLECTION, nullable: true },
          custom_prices: {
            _type: "array",
            of: {
              _type: "object",
              of: {
                destination: zod.z.string(),
                label: zod.z.string(),
                type: zod.z.enum(["data-limited", "time-limited"]),
                price: zod.z.number(),
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
var platformSettingsSchemaSpec = markAsSchemaSpec({
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
      brevo_template_id: zod.z.number(),
      send_booking_confirmation: zod.z.boolean()
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
  },
  brevo: {
    _type: "object",
    of: {
      list_ids: zod.z.array(zod.z.number()),
      campaign_mode: zod.z.boolean()
    },
    nullable: true,
    optional: true
  },
  upgrade_offer: {
    _type: "object",
    of: {
      enabled: zod.z.boolean(),
      discount_percentage: zod.z.number().min(0).max(100)
    },
    nullable: true,
    optional: true
  },
  emit_events: {
    _type: "object",
    of: emitEventSchema.shape,
    nullable: true,
    optional: true
  },
  visual_identity_options: {
    _type: "object",
    of: {
      hubby_branding: zod.z.boolean().optional().default(true),
      source_partner_branding: zod.z.boolean().optional().default(false),
      own_branding: zod.z.boolean().optional().default(false)
    },
    nullable: true,
    optional: true
  },
  account_manager: {
    _type: "docRef",
    collection: USER_COLLECTION,
    nullable: true,
    optional: true
  },
  sales_partner: zod.z.string().nullable().optional(),
  external_sales_partner_manager: zod.z.string().nullable().optional()
});
var webhookSettingsSchema = zod.z.object({
  url: zod.z.string().url().nullable().optional(),
  api_key: zod.z.string().nullable().optional(),
  enabled: zod.z.boolean().default(false),
  events: zod.z.object({
    promocode_redemption: zod.z.boolean().default(false)
  }).default({})
});
var partnerSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Partner specific fields
  name: zod.z.string().min(3),
  type: zod.z.enum(["wholesale", "reseller", "platform", "agent"]).nullable().optional(),
  is_active: zod.z.boolean().nullable().optional(),
  external_id: zod.z.string().nullable().optional(),
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
  platform_settings: platformSettingsSchemaSpec,
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
    of: zod.z.string(),
    nullable: true,
    optional: true
  },
  tag_references: {
    _type: "array",
    of: { _type: "docRef", collection: TAG_COLLECTION },
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
zod.z.object({
  destination: zod.z.string(),
  label: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited", "starter", "unlimited"]),
  price: zod.z.number(),
  package: zod.z.string()
});
var priceListItemWithDocRefSpec = {
  destination: zod.z.string(),
  label: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited", "starter", "unlimited"]),
  price: zod.z.number(),
  package: { _type: "docRef", collection: PACKAGE_COLLECTION }
};
var priceListSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Price list specific fields
  name: zod.z.string().min(3),
  description: zod.z.string().nullable(),
  type: zod.z.enum(["partner", "consumer"]),
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
  service: zod.z.string(),
  date: zod.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // YYYY-MM-DD
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  event: zod.z.string(),
  parameter: zod.z.string().nullable(),
  sum: zod.z.number()
});
var payloadSpec = {
  _type: "record",
  of: zod.z.unknown(),
  optional: true
};
var apiLogSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().optional(),
  method: zod.z.string(),
  user_id: zod.z.string().optional(),
  path: zod.z.string(),
  resource_type: zod.z.string().optional(),
  resource_id: zod.z.string().optional(),
  partner_id: zod.z.string().optional(),
  payload: payloadSpec,
  timestamp: timestampRequired,
  status_code: zod.z.number()
});
var userTouchpointsSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  unique_device_identifier: zod.z.string().nullable().optional(),
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  booking: { _type: "docRef", collection: BOOKING_COLLECTION, nullable: true, optional: true },
  promo_code: { _type: "docRef", collection: PROMO_CODE_COLLECTION, nullable: true, optional: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true, optional: true },
  promo_code_redeemed_at: timestampNullableOptional,
  esim_assigned_at: timestampNullableOptional,
  esim_install_initiated_at: timestampNullableOptional,
  esim_install_completed_at: timestampNullableOptional,
  esim_first_package_activated_at: timestampNullableOptional,
  esim_topped_up_at: timestampNullableOptional,
  activation_initiated_at: timestampNullableOptional,
  topup_initiated_at: timestampNullableOptional,
  topup_checkout_at: timestampNullableOptional,
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true }
});
var roleSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  name: zod.z.string(),
  description: zod.z.string(),
  permissions: { _type: "array", of: { _type: "docRef", collection: PERMISSION_COLLECTION }, optional: true, nullable: true },
  created_at: timestampRequired,
  updated_at: timestampNullableOptional
});
var permissionSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  name: zod.z.string(),
  description: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampNullableOptional
});
var REVIEW_COLLECTION = "/companies/hubby/reviews";
var rewardPackageTypeSchema = zod.z.enum(["data-limited", "starter"]);
var baseRewardSchema = zod.z.object({
  package_size: zod.z.string(),
  package_type: rewardPackageTypeSchema
});
var rewardMultipliersSchema = zod.z.object({
  quality_based: zod.z.number().optional(),
  completion_based: zod.z.number().optional()
}).optional();
var rewardStrategySchema = zod.z.object({
  base_reward: baseRewardSchema,
  multipliers: rewardMultipliersSchema
});
var reviewSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().optional(),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  partner_id: zod.z.string().nullable().optional(),
  questions: zod.z.record(zod.z.any()),
  reward_strategy: rewardStrategySchema,
  created_at: timestampRequired,
  updated_at: timestampNullable,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true }
});
var reviewSubmissionSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().optional(),
  country: { _type: "docRef", collection: COUNTRY_COLLECTION, nullable: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  review: { _type: "docRef", collection: REVIEW_COLLECTION, nullable: true },
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true },
  questions: zod.z.record(zod.z.any()),
  iccid: zod.z.string(),
  isAndroid: zod.z.boolean(),
  country_id: zod.z.string(),
  partner_id: zod.z.string(),
  review_id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampNullable,
  created_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  updated_by: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  analysis: zod.z.record(zod.z.any()).nullable().optional()
});
var destinationSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  type: zod.z.string(),
  // "country" or region names like "Europe", "Asia", "Middle East"
  tier: zod.z.number().nullable().optional(),
  // 1, 2, 3
  iso3s: zod.z.array(zod.z.string()),
  name: zod.z.string(),
  i18n_name: zod.z.record(zod.z.string()),
  is_active: zod.z.boolean(),
  sort_order: zod.z.number(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable()
});
var destinationBundleSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  parent_document_id: zod.z.string(),
  type: zod.z.enum(["unlimited", "data-limited", "time-limited", "starter"]),
  label: zod.z.string().nullable().optional(),
  //'5 Days' or '5GB'
  provider: zod.z.enum(["telna", "bondio"]),
  duration_in_days: zod.z.number(),
  duration_in_seconds: zod.z.number(),
  size_in_bytes: zod.z.number(),
  size_in_megabytes: zod.z.number(),
  size_in_gigabytes: zod.z.number(),
  package_template: { _type: "docRef", collection: PACKAGE_TEMPLATE_COLLECTION, nullable: true },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  //All unlimited packages will have a traffic policy, but this only refers to telna bundles
  traffic_policy: { _type: "docRef", collection: TRAFFIC_POLICY_COLLECTION, nullable: true },
  throttling: zod.z.number().optional().nullable(),
  b2c_price: zod.z.number(),
  b2b_price: zod.z.number(),
  partner_b2c_price: {
    _type: "record",
    of: zod.z.number(),
    nullable: true,
    optional: true
  },
  partner_b2b_price: {
    _type: "record",
    of: zod.z.number(),
    nullable: true,
    optional: true
  },
  is_active: zod.z.boolean().default(true),
  is_visible: zod.z.boolean().default(true),
  //All bundles that will have a partner will probably be invisible
  priority: zod.z.number().default(10),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  deleted_at: timestampNullable,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  deleted_by: zod.z.string().nullable()
});
var packageTemplateSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  provider: zod.z.string(),
  // e.g., "telna", "bondio"
  type: zod.z.string(),
  purchase_price: zod.z.number(),
  external_id: zod.z.string(),
  supported_countries: zod.z.array(zod.z.string()),
  // iso3 codes
  provider_specific_data: {
    _type: "record",
    of: zod.z.any(),
    nullable: true,
    optional: true
  },
  size_in_gigabytes: zod.z.number(),
  tier: zod.z.number().nullable().optional(),
  // 1, 2, 3
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable()
});
var loginRequestSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  email: zod.z.string().email(),
  status: zod.z.enum(["pending", "completed", "expired"]),
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true, optional: true },
  created_at: timestampRequired,
  expires_at: timestampRequired
});

// src/specs/tag.ts
var tagSchemaSpec = markAsSchemaSpec(tagModelSpec);
var liveActivityStatusSchema = zod.z.enum(["created", "active", "ended", "dismissed", "failed"]);
var liveActivityEventSchema = zod.z.enum(["start", "update", "end"]);
var liveActivityReasonSchema = zod.z.enum(["expired", "data_exhausted", "no_packages", "manual", "recreated"]);
var lastUpdateSchema = zod.z.object({
  event: liveActivityEventSchema,
  totalDataGb: zod.z.number().optional(),
  dataLeftGb: zod.z.number().optional(),
  apnsId: zod.z.string().nullable().optional(),
  statusCode: zod.z.number().nullable().optional(),
  reason: liveActivityReasonSchema.optional()
}).nullable().optional();
var liveActivitySchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  esim_id: zod.z.string(),
  title: zod.z.string(),
  message: zod.z.string(),
  total_data_gb: zod.z.string().nullable(),
  data_left_gb: zod.z.string().nullable(),
  user_id: zod.z.string(),
  push_to_start_token: zod.z.string(),
  push_to_update_token: zod.z.string().nullable(),
  status: liveActivityStatusSchema,
  last_update_at: timestampNullable,
  last_update: lastUpdateSchema,
  ended_at: timestampNullable,
  started_at: timestampNullable,
  dismissed_at: timestampNullable,
  recreated_at: timestampNullable,
  recreation_count: zod.z.number().default(0),
  click_count: zod.z.number().default(0),
  click_timestamps: zod.z.array(dateSchema).default([]),
  created_at: timestampRequired,
  updated_at: timestampNullable,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable()
});
var jobStatusSchema = zod.z.enum(["pending", "completed", "failed"]);
var scheduledJobSchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable().optional(),
  job_type: zod.z.string(),
  execute_at: timestampRequired,
  status: jobStatusSchema,
  task_data: zod.z.record(zod.z.unknown()),
  retry_count: zod.z.number(),
  max_retries: zod.z.number(),
  error: zod.z.string().nullable(),
  scheduled_at: timestampNullable,
  last_retry_at: timestampNullable,
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable()
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
var HFinancialPropertiesSchema = buildClientSchema(
  financialPropertiesSchemaSpec
);
var HApiLogSchema = buildClientSchema(apiLogSchemaSpec);
var HPackagePriceSchema = buildClientSchema(packagePriceSchema);
var HubbyModelSchema = buildClientSchema(hubbyModelSpec);
var HPartnerAppSchema = buildClientSchema(partnerSchemaSpec);
var HPlatformSettingsSchema = buildClientSchema(
  platformSettingsSchema
);
var HVisualIdentitySchema = buildClientSchema(visualIdentitySchema);
var HPricingStrategySchema = buildClientSchema(pricingStrategySchema);
var HFreeEsimSchema = buildClientSchema(freeEsimSchema);
var HAnalyticsSchema = buildClientSchema(analyticsSpec);
var HRoleSchema = buildClientSchema(roleSchemaSpec);
var HPermissionSchema = buildClientSchema(permissionSchemaSpec);
var HTagSchema = buildClientSchema(tagSchemaSpec);
var HTrafficPolicySchema = buildClientSchema(trafficPolicySpec);
var HTelnaPackageSchema = buildClientSchema(telnaPackageSchema);
var HBondioPackageSchema = buildClientSchema(bondioPackageSchema);
var HReviewSchema = buildClientSchema(reviewSchemaSpec);
var HReviewSubmissionSchema = buildClientSchema(
  reviewSubmissionSchemaSpec
);
var HDestinationSchema = buildClientSchema(destinationSchemaSpec);
var HDestinationBundleSchema = buildClientSchema(
  destinationBundleSchemaSpec
);
var HPackageTemplateSchema = buildClientSchema(
  packageTemplateSchemaSpec
);
var HUserTouchpointsSchema = buildClientSchema(
  userTouchpointsSchemaSpec
);
var HLoginRequestSchema = buildClientSchema(loginRequestSchemaSpec);
var HLiveActivitySchema = buildClientSchema(liveActivitySchemaSpec);
var HScheduledJobSchema = buildClientSchema(scheduledJobSchemaSpec);
var HAddressSchema = addressSchema;
var HRegistrationSchema = registrationSchema;
var HBankingDetailsSchema = bankingDetailsSchema;
var HPartnerPackageSpecificationSchema = packageSpecificationSchema2;
var HPromoPackageSpecificationSchema = packageSpecificationSchema;
var HVisualIdentityBannerSchema = visualIdentityBannerSchema;
var HVisualIdentityBannersSchema = visualIdentityBannersSchema;
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
var HJobStatusSchema = jobStatusSchema;
var SUPPORTED_LOCALES2 = SUPPORTED_LOCALES;

exports.HAddressSchema = HAddressSchema;
exports.HAnalyticsSchema = HAnalyticsSchema;
exports.HApiLogSchema = HApiLogSchema;
exports.HBankingDetailsSchema = HBankingDetailsSchema;
exports.HBaseRewardSchema = HBaseRewardSchema;
exports.HBondioPackageSchema = HBondioPackageSchema;
exports.HBookingSchema = HBookingSchema;
exports.HBookingStatusSchema = HBookingStatusSchema;
exports.HCommunicationChannelSchema = HCommunicationChannelSchema;
exports.HCommunicationOptionsSchema = HCommunicationOptionsSchema;
exports.HCountrySchema = HCountrySchema;
exports.HCurrencySchema = HCurrencySchema;
exports.HDestinationBundleSchema = HDestinationBundleSchema;
exports.HDestinationSchema = HDestinationSchema;
exports.HESIMSchema = HESIMSchema;
exports.HFinancialPropertiesSchema = HFinancialPropertiesSchema;
exports.HFreeEsimSchema = HFreeEsimSchema;
exports.HJobStatusSchema = HJobStatusSchema;
exports.HLiveActivitySchema = HLiveActivitySchema;
exports.HLoginRequestSchema = HLoginRequestSchema;
exports.HMessageSchema = HMessageSchema;
exports.HPackagePriceSchema = HPackagePriceSchema;
exports.HPackageSchema = HPackageSchema;
exports.HPackageTemplateSchema = HPackageTemplateSchema;
exports.HPartnerAppSchema = HPartnerAppSchema;
exports.HPartnerContactSchema = HPartnerContactSchema;
exports.HPartnerDataSchema = HPartnerDataSchema;
exports.HPartnerPackageSpecificationSchema = HPartnerPackageSpecificationSchema;
exports.HPartnerSchema = HPartnerSchema;
exports.HPaymentSchema = HPaymentSchema;
exports.HPermissionSchema = HPermissionSchema;
exports.HPlatformSettingsSchema = HPlatformSettingsSchema;
exports.HPriceListSchema = HPriceListSchema;
exports.HPricingStrategySchema = HPricingStrategySchema;
exports.HPromoCodeSchema = HPromoCodeSchema;
exports.HPromoPackageSpecificationSchema = HPromoPackageSpecificationSchema;
exports.HRegistrationSchema = HRegistrationSchema;
exports.HReviewSchema = HReviewSchema;
exports.HReviewSubmissionSchema = HReviewSubmissionSchema;
exports.HRewardMultipliersSchema = HRewardMultipliersSchema;
exports.HRewardPackageTypeSchema = HRewardPackageTypeSchema;
exports.HRewardStrategySchema = HRewardStrategySchema;
exports.HRoleSchema = HRoleSchema;
exports.HScheduleFilterSchema = HScheduleFilterSchema;
exports.HScheduledJobSchema = HScheduledJobSchema;
exports.HTagSchema = HTagSchema;
exports.HTelnaPackageSchema = HTelnaPackageSchema;
exports.HTrafficPolicySchema = HTrafficPolicySchema;
exports.HUserSchema = HUserSchema;
exports.HUserTouchpointsSchema = HUserTouchpointsSchema;
exports.HVisualIdentityBannerSchema = HVisualIdentityBannerSchema;
exports.HVisualIdentityBannersSchema = HVisualIdentityBannersSchema;
exports.HVisualIdentitySchema = HVisualIdentitySchema;
exports.HubbyModelSchema = HubbyModelSchema;
exports.SUPPORTED_LOCALES = SUPPORTED_LOCALES2;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map