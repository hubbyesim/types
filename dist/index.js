import { z } from 'zod';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';

// src/schemas/builders/server.ts
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
if (!getApps().length) {
  initializeApp({
    credential: applicationDefault()
  });
}
var db = getFirestore();

// src/schemas/builders/server.ts
var buildServerSchema = (spec, path = []) => {
  const pathString = path.join(".");
  if (spec === void 0 || spec === null) {
    throw new Error(`Invalid spec at "${pathString || "<root>"}": received ${spec}`);
  }
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec);
  }
  if ("_type" in spec && spec._type === "array") {
    if (!("of" in spec)) {
      throw new Error(`Array spec at "${pathString}" is missing 'of'`);
    }
    const itemSchema = spec.of instanceof z.ZodType ? spec.of : buildServerSchema(spec.of, [...path, "[i]"]);
    let arraySchema = z.array(itemSchema);
    if (spec.nullable)
      arraySchema = arraySchema.nullable();
    if (spec.optional)
      arraySchema = arraySchema.optional();
    return arraySchema;
  }
  if ("_type" in spec && spec._type === "record") {
    if (!("of" in spec)) {
      throw new Error(`Record spec at "${pathString}" is missing 'of'`);
    }
    const valueSchema = spec.of instanceof z.ZodType ? spec.of : buildServerSchema(spec.of, [...path, "[key]"]);
    let recordSchema = z.record(valueSchema);
    if (spec.nullable)
      recordSchema = recordSchema.nullable();
    if (spec.optional)
      recordSchema = recordSchema.optional();
    return recordSchema;
  }
  if ("_type" in spec && spec._type === "timestamp") {
    let tsSchema = z.date().transform((date) => Timestamp.fromDate(date));
    if (spec.nullable)
      tsSchema = tsSchema.nullable();
    if (spec.optional)
      tsSchema = tsSchema.optional();
    return tsSchema;
  }
  if ("_type" in spec && spec._type === "docRef") {
    let refSchema = z.string().transform((id) => db.doc(`${spec.collection}/${id}`));
    if (spec.nullable)
      refSchema = refSchema.nullable();
    if (spec.optional)
      refSchema = refSchema.optional();
    return refSchema;
  }
  if (typeof spec === "object" && !("_type" in spec)) {
    const shape = {};
    for (const [key, val] of Object.entries(spec)) {
      shape[key] = buildServerSchema(val, [...path, key]);
    }
    return z.object(shape);
  }
  if (typeof spec === "object" && "_type" in spec && spec._type === "object" && "of" in spec) {
    return wrapObjectSchema(spec, path, buildServerSchema);
  }
  if (isSchemaSpec(spec) || typeof spec === "object" && "_type" in spec && spec._type === "object") {
    return wrapPlainObjectSchema(spec, path, buildServerSchema);
  }
  throw new Error(`Unknown or malformed spec at "${pathString}": ${JSON.stringify(spec)}`);
};

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
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  stripe_id: z.string().nullable().optional(),
  referral: z.string().nullable().optional(),
  fcm: z.string().optional(),
  deeplink: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  coordinates: z.string().nullable().optional(),
  parameters: z.any().nullable().optional(),
  locale: z.string().nullable().optional(),
  phone_model: z.string().nullable().optional(),
  phone_os: z.string().nullable().optional(),
  phone_os_version: z.string().nullable().optional(),
  ios: z.boolean().nullable().optional(),
  has_card_saved: z.boolean().nullable().optional(),
  admin: z.boolean().nullable().optional(),
  api_keys: apiKeysObjectSpec,
  currency: z.string().nullable().optional(),
  receipt_email: z.string().nullable().optional(),
  source: z.enum(["direct", "promo", "platform"]).nullable().optional(),
  role: z.array(z.enum(["admin", "user", "platform"])).nullable().optional(),
  balance: z.number().nullable().optional(),
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
var supportedLocalesSchema = z.enum(SUPPORTED_LOCALES);

// src/schemas/specs/booking.ts
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
var bookingSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  title: z.string().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  pax: z.number(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  booking_id: z.string().nullable(),
  flight_number: z.string().optional(),
  gender: z.enum(["M", "F", "O"]).optional(),
  package_size: z.string().optional(),
  sent_messages: z.record(z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: {
    _type: "object",
    of: {
      source: z.string(),
      manual: z.boolean()
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
  package_specifications: z.record(z.any()).optional(),
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
  id: z.string().nullable(),
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
  data_used: z.boolean(),
  status: z.string().nullable(),
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
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Payment specific fields
  amount: z.number(),
  customer: z.string(),
  date: timestampRequired,
  iccid: z.string(),
  package: z.string(),
  promo: z.string(),
  topup: z.boolean(),
  // Reference fields
  user: { _type: "docRef", collection: USER_COLLECTION, nullable: true }
});
var messageSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  key: z.string(),
  method: z.enum(["push", "sms", "email"]),
  status: z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampRequired,
  updated_at: timestampRequired
});
var packageSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
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
  price: z.number(),
  partner_price: z.number(),
  days: z.number(),
  name: z.string(),
  type: z.enum(["data-limited", "time-limited"]).nullable(),
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
  country_data: z.any().nullable()
});
var packageSpecificationSchema = z.object({
  destination: z.string().optional(),
  size: z.string().optional(),
  package_id: z.string().optional(),
  iata_code: z.string().optional()
});
var promoCodeSchemaSpec = markAsSchemaSpec({
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // PromoCode specific fields
  external_id: z.string(),
  code: z.string(),
  allowance_user: z.number(),
  allowance_total: z.number(),
  type: z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z.string()),
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
var addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional()
});
var registrationSchema = z.object({
  chamber_of_commerce_number: z.string().nullable().optional(),
  vat_number: z.string().nullable().optional(),
  anvr_number: z.number().nullable().optional(),
  tax_number: z.string().nullable().optional()
});
var bankingDetailsSchema = z.object({
  account_holder: z.string(),
  bank_name: z.string(),
  iban: z.string()
});
var packageSpecificationSchema2 = z.object({
  size: z.string(),
  type: z.string(),
  destination: z.string()
});
var visualIdentityBannerSchema = z.object({
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
var partnerContactSchema = z.object({
  email: z.string().nullable(),
  office_phone: z.string().nullable().optional()
});
var partnerDataSchema = z.object({
  source: z.string(),
  manual: z.boolean()
});
var partnerSchemaSpec = markAsSchemaSpec({
  // Base model fields
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Partner specific fields
  name: z.string().nullable(),
  type: z.string().nullable(),
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
  financial_properties: {
    _type: "object",
    of: {
      administration_fee: z.number().nullable(),
      income_per_gb: z.number().nullable(),
      commission_fee: z.number().nullable().optional(),
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
    },
    nullable: true
  },
  // Visual identity
  visual_identity: {
    _type: "object",
    of: {
      primary_color: z.string(),
      secondary_color: z.string(),
      logo: z.string(),
      font: z.string(),
      top_banner: {
        _type: "object",
        of: {
          strategy: z.enum(["fixed", "rotating", "destination", "time_of_day"]),
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
          strategy: z.enum(["fixed", "rotating", "destination", "time_of_day"]),
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
          name: z.string(),
          iso3_white_list: z.array(z.string()).optional(),
          parameters: z.any()
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
          allowance: z.number()
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
          of: {
            days: z.number(),
            email: {
              _type: "object",
              of: {
                brevo_template_id: z.number(),
                subject: z.record(z.string()).refine(
                  (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
                  { message: "Keys must be supported locales" }
                ).optional(),
                preview_text: z.record(z.string()).refine(
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
                title: z.record(z.string()).optional(),
                body: z.record(z.string()).optional(),
                target: z.string()
              },
              nullable: true,
              optional: true
            },
            hour: z.number(),
            key: z.string(),
            method: z.enum(["email", "sms", "whatsapp", "push"]),
            moment: z.enum(["departure_date", "return_date", "immediate"]),
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
  id: z.string(),
  created_at: timestampRequired,
  updated_at: timestampRequired,
  created_by: z.string().nullable(),
  updated_by: z.string().nullable(),
  // Price list specific fields
  name: z.string(),
  description: z.string().nullable(),
  type: z.enum(["partner", "consumer"]),
  partner: { _type: "docRef", collection: PARTNER_COLLECTION, nullable: true },
  package_prices: {
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
function buildClientSchema(spec, path = []) {
  const pathString = path.join(".");
  if (spec === void 0 || spec === null) {
    throw new Error(`Invalid schema spec at "${pathString || "<root>"}": received ${spec}`);
  }
  if (spec instanceof z.ZodType) {
    return wrapZodSchema(spec);
  }
  if ("_type" in spec && spec._type === "array") {
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
  if ("_type" in spec && spec._type === "record") {
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
  if ("_type" in spec && spec._type === "timestamp") {
    let schema = z.date();
    if (spec.nullable)
      schema = schema.nullable();
    if (spec.optional)
      schema = schema.optional();
    return schema;
  }
  if ("_type" in spec && spec._type === "docRef") {
    let schema = z.string();
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

// src/index.server.ts
var UserSchema = buildServerSchema(userSchemaSpec);
var BookingSchema = buildServerSchema(bookingSchemaSpec);
var CountrySchema = buildServerSchema(countrySchemaSpec);
var CurrencySchema = buildServerSchema(currencySchemaSpec);
var ESIMSchema = buildServerSchema(esimSchemaSpec);
var PaymentSchema = buildServerSchema(paymentSchemaSpec);
var MessageSchema = buildServerSchema(messageSchemaSpec);
var PackageSchema = buildServerSchema(packageSchemaSpec);
var PromoCodeSchema = buildServerSchema(promoCodeSchemaSpec);
var PartnerSchema = buildServerSchema(partnerSchemaSpec);
var PriceListSchema = buildServerSchema(priceListSchemaSpec);
var ApiLogSchema = buildServerSchema(apiLogSchemaSpec);
var AddressSchema = addressSchema;
var RegistrationSchema = registrationSchema;
var BankingDetailsSchema = bankingDetailsSchema;
var PartnerPackageSpecificationSchema = packageSpecificationSchema2;
var PromoPackageSpecificationSchema = packageSpecificationSchema;
var VisualIdentityBannerSchema = visualIdentityBannerSchema;
var ScheduleFilterSchema = scheduleFilterSchema;
var PartnerContactSchema = partnerContactSchema;
var PartnerDataSchema = partnerDataSchema;
var CommunicationChannelSchema = communicationChannelSchema;
var BookingStatusSchema = bookingStatusSchema;
var CommunicationOptionsSchema = communicationOptionsSchema;

export { AddressSchema, ApiLogSchema, BankingDetailsSchema, BookingSchema, BookingStatusSchema, CommunicationChannelSchema, CommunicationOptionsSchema, CountrySchema, CurrencySchema, ESIMSchema, HAddressSchema, HApiLogSchema, HBankingDetailsSchema, HBookingSchema, HBookingStatusSchema, HCommunicationChannelSchema, HCommunicationOptionsSchema, HCountrySchema, HCurrencySchema, HESIMSchema, HMessageSchema, HPackageSchema, HPartnerContactSchema, HPartnerDataSchema, HPartnerPackageSpecificationSchema, HPartnerSchema, HPaymentSchema, HPriceListSchema, HPromoCodeSchema, HPromoPackageSpecificationSchema, HRegistrationSchema, HScheduleFilterSchema, HUserSchema, HVisualIdentityBannerSchema, MessageSchema, PackageSchema, PartnerContactSchema, PartnerDataSchema, PartnerPackageSpecificationSchema, PartnerSchema, PaymentSchema, PriceListSchema, PromoCodeSchema, PromoPackageSpecificationSchema, RegistrationSchema, ScheduleFilterSchema, UserSchema, VisualIdentityBannerSchema };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map