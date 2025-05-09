'use strict';

var zod = require('zod');

// src/schemas/builders/client.ts
function wrapZodSchema(schema, options) {
  let wrapped = schema;
  if (options?.nullable && !wrapped.isNullable?.()) {
    wrapped = wrapped.nullable();
  }
  if (options?.optional && !wrapped.isOptional?.()) {
    wrapped = wrapped.optional();
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

// src/schemas/builders/client.ts
function buildClientSchema(spec, path = []) {
  const pathString = path.join(".");
  if (spec === void 0 || spec === null) {
    throw new Error(`Invalid schema spec at "${pathString || "<root>"}": received ${spec}`);
  }
  if (spec instanceof zod.z.ZodType) {
    return wrapZodSchema(spec);
  }
  if ("_type" in spec && spec._type === "array") {
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
  if ("_type" in spec && spec._type === "record") {
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
  if ("_type" in spec && spec._type === "timestamp") {
    let schema = zod.z.date();
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if ("_type" in spec && spec._type === "docRef") {
    let schema = zod.z.string();
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if (typeof spec === "object" && "_type" in spec && spec._type === "object" && "of" in spec) {
    return wrapObjectSchema(spec, path, buildClientSchema);
  }
  if (isSchemaSpec(spec) || typeof spec === "object" && "_type" in spec && spec._type === "object") {
    return wrapPlainObjectSchema(spec, path, buildClientSchema);
  }
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
}

// src/schemas/specs/common.ts
var PARTNER_COLLECTION = "partners";
var USER_COLLECTION = "users";
var PROFILE_COLLECTION = "profiles";
var PACKAGE_COLLECTION = "packages";
var PROMO_CODE_COLLECTION = "promo_codes";
var COUNTRY_COLLECTION = "countries";
var ESIM_COLLECTION = "esims";
var PRICE_LIST_COLLECTION = "price_lists";
var BOOKING_COLLECTION = "bookings";
var timestampNullableOptional = { _type: "timestamp", nullable: true, optional: true };
var timestampNullable = { _type: "timestamp", nullable: true, optional: false };
var timestampRequired = { _type: "timestamp", nullable: false, optional: false };

// src/schemas/specs/user.ts
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
  name: zod.z.string().nullable(),
  email: zod.z.string().email().nullable(),
  stripe_id: zod.z.string().nullable().optional(),
  referral: zod.z.string().nullable().optional(),
  fcm: zod.z.string().optional(),
  deeplink: zod.z.string().nullable().optional(),
  gender: zod.z.string().nullable().optional(),
  company: zod.z.string().nullable().optional(),
  coordinates: zod.z.string().nullable().optional(),
  parameters: zod.z.any().nullable().optional(),
  locale: zod.z.string().nullable().optional(),
  phone_model: zod.z.string().nullable().optional(),
  phone_os: zod.z.string().nullable().optional(),
  phone_os_version: zod.z.string().nullable().optional(),
  ios: zod.z.boolean().nullable().optional(),
  has_card_saved: zod.z.boolean().nullable().optional(),
  admin: zod.z.boolean().nullable().optional(),
  api_keys: apiKeysObjectSpec,
  currency: zod.z.string().nullable().optional(),
  receipt_email: zod.z.string().nullable().optional(),
  source: zod.z.enum(["direct", "promo", "platform"]).nullable().optional(),
  role: zod.z.array(zod.z.enum(["admin", "user", "platform"])).nullable().optional(),
  balance: zod.z.number().nullable().optional(),
  createdAt: { _type: "timestamp" },
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, optional: true, nullable: true },
  profileRef: { _type: "docRef", collection: PROFILE_COLLECTION, optional: true, nullable: true },
  review_requested: timestampNullableOptional,
  last_seen: timestampNullableOptional
});
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
var supportedLocalesSchema = zod.z.enum(SUPPORTED_LOCALES);

// src/schemas/specs/booking.ts
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
var bookingSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  title: zod.z.string().nullable(),
  first_name: zod.z.string(),
  last_name: zod.z.string(),
  full_name: zod.z.string(),
  pax: zod.z.number(),
  email: zod.z.string().email().nullable(),
  phone: zod.z.string().nullable(),
  booking_id: zod.z.string().nullable(),
  flight_number: zod.z.string().optional(),
  gender: zod.z.enum(["M", "F", "O"]).optional(),
  package_size: zod.z.string().optional(),
  sent_messages: zod.z.record(zod.z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: {
    _type: "object",
    of: {
      source: zod.z.string(),
      manual: zod.z.boolean()
    }
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
  is_processed_for_esim_restoration: zod.z.boolean(),
  is_pseudonymized: zod.z.boolean(),
  import_id: zod.z.string().nullable().optional(),
  package_specifications: zod.z.record(zod.z.any()).optional(),
  departure_date: timestampRequired,
  return_date: timestampNullable,
  partner: { _type: "docRef", collection: PARTNER_COLLECTION },
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
  }
});
var countrySchemaSpec = markAsSchemaSpec({
  id: zod.z.string().nullable(),
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
  data_used: zod.z.boolean(),
  status: zod.z.string().nullable(),
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
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  // Timestamp fields
  time_assigned: timestampNullable,
  last_updated: timestampNullable
});
var paymentSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Payment specific fields
  amount: zod.z.number(),
  customer: zod.z.string(),
  date: timestampRequired,
  iccid: zod.z.string(),
  package: zod.z.string(),
  promo: zod.z.string(),
  topup: zod.z.boolean(),
  // Reference fields
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true }
});
var messageSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  key: zod.z.string(),
  method: zod.z.enum(["push", "sms", "email"]),
  status: zod.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampRequired,
  updated_at: timestampRequired
});
var packageSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
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
  price: zod.z.number(),
  partner_price: zod.z.number(),
  days: zod.z.number(),
  name: zod.z.string(),
  type: zod.z.enum(["data-limited", "time-limited"]).nullable(),
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
  country_data: zod.z.any().nullable()
});
var packageSpecificationSchema = zod.z.object({
  destination: zod.z.string().optional(),
  size: zod.z.string().optional(),
  package_id: zod.z.string().optional(),
  iata_code: zod.z.string().optional()
});
var promoCodeSchemaSpec = markAsSchemaSpec({
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // PromoCode specific fields
  external_id: zod.z.string(),
  code: zod.z.string(),
  allowance_user: zod.z.number(),
  allowance_total: zod.z.number(),
  type: zod.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(zod.z.string()),
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
var addressSchema = zod.z.object({
  street: zod.z.string().optional(),
  city: zod.z.string().optional(),
  postal_code: zod.z.string().optional(),
  country: zod.z.string().optional()
});
var registrationSchema = zod.z.object({
  chamber_of_commerce_number: zod.z.string().nullable().optional(),
  vat_number: zod.z.string().nullable().optional(),
  anvr_number: zod.z.number().nullable().optional(),
  tax_number: zod.z.string().nullable().optional()
});
var bankingDetailsSchema = zod.z.object({
  account_holder: zod.z.string(),
  bank_name: zod.z.string(),
  iban: zod.z.string()
});
var packageSpecificationSchema2 = zod.z.object({
  size: zod.z.string(),
  type: zod.z.string(),
  destination: zod.z.string()
});
var visualIdentityBannerSchema = zod.z.object({
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
var partnerContactSchema = zod.z.object({
  email: zod.z.string().nullable(),
  office_phone: zod.z.string().nullable().optional()
});
var partnerDataSchema = zod.z.object({
  source: zod.z.string(),
  manual: zod.z.boolean()
});
var partnerSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Partner specific fields
  name: zod.z.string().nullable(),
  type: zod.z.string().nullable(),
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
  financial_properties: {
    _type: "object",
    of: {
      administration_fee: zod.z.number().nullable(),
      income_per_gb: zod.z.number().nullable(),
      commission_fee: zod.z.number().nullable().optional(),
      payment_method: zod.z.enum(["invoice", "direct"]),
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
    },
    nullable: true
  },
  // Visual identity
  visual_identity: {
    _type: "object",
    of: {
      primary_color: zod.z.string(),
      secondary_color: zod.z.string(),
      logo: zod.z.string(),
      font: zod.z.string(),
      top_banner: {
        _type: "object",
        of: {
          strategy: zod.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
          banners: {
            _type: "array",
            of: {
              _type: "object",
              of: visualIdentityBannerSchema.shape
            },
            nullable: true,
            optional: true
          }
        },
        optional: true
      },
      mid_banner: {
        _type: "object",
        of: {
          strategy: zod.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
          banners: {
            _type: "array",
            of: {
              _type: "object",
              of: visualIdentityBannerSchema.shape
            },
            nullable: true,
            optional: true
          }
        },
        optional: true
      }
    },
    nullable: true
  },
  // Platform settings
  platform_settings: {
    _type: "object",
    of: {
      package_strategy: {
        _type: "object",
        of: {
          name: zod.z.string(),
          iso3_white_list: zod.z.array(zod.z.string()).optional(),
          parameters: zod.z.any()
        },
        nullable: true,
        optional: true
      },
      free_esim: {
        _type: "object",
        of: {
          package_specification: {
            _type: "object",
            of: packageSpecificationSchema2.shape
          },
          allowance: zod.z.number()
        },
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
          of: {
            days: zod.z.number(),
            email: {
              _type: "object",
              of: {
                brevo_template_id: zod.z.number(),
                subject: zod.z.record(zod.z.string()).refine(
                  (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
                  { message: "Keys must be supported locales" }
                ).optional(),
                preview_text: zod.z.record(zod.z.string()).refine(
                  (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
                  { message: "Keys must be supported locales" }
                ).optional()
              },
              nullable: true,
              optional: true
            },
            push: {
              _type: "object",
              of: {
                title: zod.z.record(zod.z.string()).optional(),
                body: zod.z.record(zod.z.string()).optional(),
                target: zod.z.string()
              },
              nullable: true,
              optional: true
            },
            hour: zod.z.number(),
            key: zod.z.string(),
            method: zod.z.enum(["email", "sms", "whatsapp", "push"]),
            moment: zod.z.enum(["departure_date", "return_date", "immediate"]),
            filter: {
              _type: "object",
              of: scheduleFilterSchema.shape,
              nullable: true,
              optional: true
            }
          }
        },
        optional: true
      }
    },
    nullable: true
  },
  // Metadata
  data: {
    _type: "object",
    of: partnerDataSchema.shape,
    nullable: true,
    optional: true
  }
});
var priceListSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: zod.z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: zod.z.string().nullable(),
  updated_by: zod.z.string().nullable(),
  // Price list specific fields
  name: zod.z.string(),
  description: zod.z.string().nullable(),
  type: zod.z.enum(["partner", "consumer"]),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  package_prices: {
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
var HApiLogSchema = buildClientSchema(apiLogSchemaSpec);
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

exports.HAddressSchema = HAddressSchema;
exports.HApiLogSchema = HApiLogSchema;
exports.HBankingDetailsSchema = HBankingDetailsSchema;
exports.HBookingSchema = HBookingSchema;
exports.HBookingStatusSchema = HBookingStatusSchema;
exports.HCommunicationChannelSchema = HCommunicationChannelSchema;
exports.HCommunicationOptionsSchema = HCommunicationOptionsSchema;
exports.HCountrySchema = HCountrySchema;
exports.HCurrencySchema = HCurrencySchema;
exports.HESIMSchema = HESIMSchema;
exports.HMessageSchema = HMessageSchema;
exports.HPackageSchema = HPackageSchema;
exports.HPartnerContactSchema = HPartnerContactSchema;
exports.HPartnerDataSchema = HPartnerDataSchema;
exports.HPartnerPackageSpecificationSchema = HPartnerPackageSpecificationSchema;
exports.HPartnerSchema = HPartnerSchema;
exports.HPaymentSchema = HPaymentSchema;
exports.HPriceListSchema = HPriceListSchema;
exports.HPromoCodeSchema = HPromoCodeSchema;
exports.HPromoPackageSpecificationSchema = HPromoPackageSpecificationSchema;
exports.HRegistrationSchema = HRegistrationSchema;
exports.HScheduleFilterSchema = HScheduleFilterSchema;
exports.HUserSchema = HUserSchema;
exports.HVisualIdentityBannerSchema = HVisualIdentityBannerSchema;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map