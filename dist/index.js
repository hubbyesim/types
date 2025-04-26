// src/schemas/firebase/helpers.ts
import { z as z2 } from "zod";
import { Timestamp } from "firebase-admin/firestore";

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
var createIdSchema = (collectionPath) => {
  return z.string().describe(`ID from ${collectionPath}`);
};

// src/schemas/firebase/helpers.ts
var MockDocumentReference = class {
  path;
  id;
  constructor(collectionPath, id) {
    this.path = `${collectionPath}/${id}`;
    this.id = id;
  }
};
var timestampSchema = z2.custom(
  (val) => val instanceof Timestamp
);
var documentRefSchema = z2.custom(
  (val) => typeof val === "object" && val !== null && "path" in val && "id" in val
);
var fieldValueSchema = z2.custom(
  (val) => typeof val === "object" && val !== null && "isEqual" in val
);
var toFirestore = {
  date: (date) => Timestamp.fromDate(date),
  ref: (collectionPath, id) => {
    if (testEnv.isTestEnvironment) {
      return new MockDocumentReference(collectionPath, id);
    }
    throw new Error("Implementation requires Firestore instance");
  }
};
var fromFirestore = {
  date: (timestamp) => timestamp.toDate(),
  ref: (docRef) => {
    if (docRef instanceof MockDocumentReference) {
      return docRef.id;
    }
    return docRef.id;
  }
};
var baseModelSchema = z2.object({
  id: z2.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
  created_by: z2.union([z2.string(), z2.null(), documentRefSchema]),
  updated_by: z2.union([z2.string(), z2.null(), documentRefSchema])
});
var hubbyModelFirestoreSchema = baseModelSchema;
var hubbyModelAppSchema = baseModelAppSchema;
var createDocRefSchema = (collectionPath) => {
  const schema = documentRefSchema.refine(
    (ref) => ref.path.startsWith(collectionPath),
    {
      message: `Document reference must be from collection ${collectionPath}`
    }
  );
  return {
    schema,
    collectionPath
  };
};
var docRefToStringSchema = (docRefSchema) => {
  return z2.string().describe(`ID from ${docRefSchema.collectionPath}`);
};

// src/schemas/firebase/refs.ts
import { z as z4 } from "zod";

// src/schemas/base/refs.ts
import { z as z3 } from "zod";
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
var partnerRefStringArray = z3.array(z3.string());
var userRefStringArray = z3.array(z3.string());
var profileRefStringArray = z3.array(z3.string());
var packageRefStringArray = z3.array(z3.string());
var promoCodeRefStringArray = z3.array(z3.string());
var countryRefStringArray = z3.array(z3.string());
var esimRefStringArray = z3.array(z3.string());
var paymentRefStringArray = z3.array(z3.string());
var priceListRefStringArray = z3.array(z3.string());
var bookingRefStringArray = z3.array(z3.string());
var messageRefStringArray = z3.array(z3.string());
var currencyRefStringArray = z3.array(z3.string());
var apiLogRefStringArray = z3.array(z3.string());
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

// src/schemas/firebase/refs.ts
var partnerRefSchema = createDocRefSchema(PARTNER_COLLECTION);
var userRefSchema = createDocRefSchema(USER_COLLECTION);
var profileRefSchema = createDocRefSchema(PROFILE_COLLECTION);
var packageRefSchema = createDocRefSchema(PACKAGE_COLLECTION);
var promoCodeRefSchema = createDocRefSchema(PROMO_CODE_COLLECTION);
var countryRefSchema = createDocRefSchema(COUNTRY_COLLECTION);
var esimRefSchema = createDocRefSchema(ESIM_COLLECTION);
var paymentRefSchema = createDocRefSchema(PAYMENT_COLLECTION);
var priceListRefSchema = createDocRefSchema(PRICE_LIST_COLLECTION);
var bookingRefSchema = createDocRefSchema(BOOKING_COLLECTION);
var messageRefSchema = createDocRefSchema(MESSAGE_COLLECTION);
var currencyRefSchema = createDocRefSchema(CURRENCY_COLLECTION);
var apiLogRefSchema = createDocRefSchema(API_LOG_COLLECTION);
var partnerRefNullable = partnerRefSchema.schema.nullable();
var userRefNullable = userRefSchema.schema.nullable();
var profileRefNullable = profileRefSchema.schema.nullable();
var packageRefNullable = packageRefSchema.schema.nullable();
var promoCodeRefNullable = promoCodeRefSchema.schema.nullable();
var countryRefNullable = countryRefSchema.schema.nullable();
var esimRefNullable = esimRefSchema.schema.nullable();
var paymentRefNullable = paymentRefSchema.schema.nullable();
var priceListRefNullable = priceListRefSchema.schema.nullable();
var bookingRefNullable = bookingRefSchema.schema.nullable();
var messageRefNullable = messageRefSchema.schema.nullable();
var currencyRefNullable = currencyRefSchema.schema.nullable();
var apiLogRefNullable = apiLogRefSchema.schema.nullable();
var partnerRefArray = z4.array(partnerRefSchema.schema);
var userRefArray = z4.array(userRefSchema.schema);
var profileRefArray = z4.array(profileRefSchema.schema);
var packageRefArray = z4.array(packageRefSchema.schema);
var promoCodeRefArray = z4.array(promoCodeRefSchema.schema);
var countryRefArray = z4.array(countryRefSchema.schema);
var esimRefArray = z4.array(esimRefSchema.schema);
var paymentRefArray = z4.array(paymentRefSchema.schema);
var priceListRefArray = z4.array(priceListRefSchema.schema);
var bookingRefArray = z4.array(bookingRefSchema.schema);
var messageRefArray = z4.array(messageRefSchema.schema);
var currencyRefArray = z4.array(currencyRefSchema.schema);
var apiLogRefArray = z4.array(apiLogRefSchema.schema);
var partnerRefArrayNullable = partnerRefArray.nullable();
var userRefArrayNullable = userRefArray.nullable();
var profileRefArrayNullable = profileRefArray.nullable();
var packageRefArrayNullable = packageRefArray.nullable();
var promoCodeRefArrayNullable = promoCodeRefArray.nullable();
var countryRefArrayNullable = countryRefArray.nullable();
var esimRefArrayNullable = esimRefArray.nullable();
var paymentRefArrayNullable = paymentRefArray.nullable();
var priceListRefArrayNullable = priceListRefArray.nullable();
var bookingRefArrayNullable = bookingRefArray.nullable();
var messageRefArrayNullable = messageRefArray.nullable();
var currencyRefArrayNullable = currencyRefArray.nullable();
var apiLogRefArrayNullable = apiLogRefArray.nullable();

// src/schemas/firebase/user.ts
import { z as z6 } from "zod";
import { FieldValue as FieldValue2 } from "firebase-admin/firestore";

// src/schemas/utils.ts
var convertToDate = (value) => {
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  if (value && typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate();
  }
  throw new Error(`Unable to convert value to Date: ${value}`);
};
var isDate = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};
function genericToFirestore({
  appObject,
  refFieldMappings: refFieldMappings6,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler
}) {
  const result = {};
  const refFieldNames = refFieldMappings6.map((mapping) => mapping.app);
  Object.keys(appObject).forEach((key) => {
    if (!refFieldNames.includes(key)) {
      result[key] = appObject[key];
    }
  });
  if ("created_at" in appObject && isDate(appObject.created_at)) {
    result.created_at = toFirestore.date(appObject.created_at);
  }
  if ("updated_at" in appObject && isDate(appObject.updated_at)) {
    result.updated_at = toFirestore.date(appObject.updated_at);
  }
  if ("created_by" in appObject) {
    result.created_by = typeof appObject.created_by === "string" ? appObject.created_by : null;
  }
  if ("updated_by" in appObject) {
    result.updated_by = typeof appObject.updated_by === "string" ? appObject.updated_by : null;
  }
  dateFieldMappings9.forEach(({ field, nullable }) => {
    const value = appObject[field];
    if (nullable && value === null) {
      result[field] = null;
    } else if (isDate(value)) {
      result[field] = toFirestore.date(value);
    }
  });
  refFieldMappings6.forEach(({ app, firestore, collection, isArray, nullable }) => {
    const value = appObject[app];
    if (isArray) {
      if (nullable && value === null) {
        result[firestore] = null;
      } else if (Array.isArray(value)) {
        result[firestore] = value.map((id) => toFirestore.ref(collection, id));
      }
    } else {
      if (nullable && value === null) {
        result[firestore] = null;
      } else if (typeof value === "string") {
        result[firestore] = toFirestore.ref(collection, value);
      }
    }
  });
  if (specialCaseHandler) {
    specialCaseHandler(result, appObject);
  }
  return result;
}
function genericFromFirestore({
  firestoreObject,
  refFieldMappings: refFieldMappings6,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler
}) {
  const result = {};
  const refFieldNames = refFieldMappings6.map((mapping) => mapping.firestore);
  Object.keys(firestoreObject).forEach((key) => {
    if (!refFieldNames.includes(key)) {
      result[key] = firestoreObject[key];
    }
  });
  if ("created_at" in firestoreObject) {
    result.created_at = fromFirestore.date(firestoreObject.created_at);
  }
  if ("updated_at" in firestoreObject) {
    result.updated_at = fromFirestore.date(firestoreObject.updated_at);
  }
  if ("created_by" in firestoreObject) {
    const createdBy = firestoreObject.created_by;
    result.created_by = typeof createdBy === "string" ? createdBy : createdBy ? fromFirestore.ref(createdBy) : null;
  }
  if ("updated_by" in firestoreObject) {
    const updatedBy = firestoreObject.updated_by;
    result.updated_by = typeof updatedBy === "string" ? updatedBy : updatedBy ? fromFirestore.ref(updatedBy) : null;
  }
  dateFieldMappings9.forEach(({ field, nullable }) => {
    const value = firestoreObject[field];
    if (nullable && value === null) {
      result[field] = null;
    } else {
      result[field] = convertToDate(value);
    }
  });
  refFieldMappings6.forEach(({ app, firestore, nullable, isArray }) => {
    const value = firestoreObject[firestore];
    if (isArray) {
      if (nullable && value === null) {
        result[app] = null;
      } else if (Array.isArray(value)) {
        result[app] = value.map((ref) => fromFirestore.ref(ref));
      }
    } else {
      if (nullable && value === null) {
        result[app] = null;
      } else if (value) {
        result[app] = fromFirestore.ref(value);
      }
    }
  });
  if (specialCaseHandler) {
    specialCaseHandler(result, firestoreObject);
  }
  return result;
}

// src/schemas/base/user.ts
import { z as z5 } from "zod";
var apiKeySchema = z5.object({
  expires_at: z5.date(),
  secret: z5.string(),
  is_active: z5.boolean()
});
var apiKeysSchema = z5.object({
  allowed_keys: z5.array(z5.string()),
  keys: z5.record(z5.string(), apiKeySchema)
});
var commonUserFields = {
  name: z5.string().nullable(),
  email: z5.string().email().nullable(),
  stripe_id: z5.string().nullable(),
  referral: z5.string().nullable(),
  fcm: z5.string().optional(),
  deeplink: z5.string().nullable(),
  gender: z5.string().nullable(),
  company: z5.string().nullable(),
  coordinates: z5.string().nullable(),
  parameters: z5.any().nullable(),
  locale: z5.string().nullable(),
  phone_model: z5.string().nullable(),
  phone_os: z5.string().nullable(),
  phone_os_version: z5.string().nullable(),
  ios: z5.boolean().nullable(),
  has_card_saved: z5.boolean().nullable(),
  admin: z5.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: z5.string().nullable(),
  receipt_email: z5.string().nullable()
};
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: z5.date(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: z5.number().nullable(),
  review_requested: z5.date().nullable(),
  last_seen: z5.date().nullable()
});

// src/schemas/firebase/user.ts
var apiKeySchema2 = z6.object({
  expires_at: timestampSchema,
  secret: z6.string(),
  is_active: z6.boolean()
});
var apiKeysSchema2 = z6.object({
  allowed_keys: z6.array(z6.string()),
  keys: z6.record(z6.string(), apiKeySchema2)
});
var userFirestoreSchema = baseModelSchema.extend({
  ...commonUserFields,
  createdAt: timestampSchema,
  partner: partnerRefNullable,
  profileRef: profileRefNullable,
  balance: z6.union([z6.number(), z6.null(), fieldValueSchema]),
  review_requested: timestampSchema.nullable(),
  last_seen: timestampSchema.nullable(),
  api_keys: apiKeysSchema2.nullable()
});
var refFieldMappings = [
  { app: "profileRef", firestore: "profileRef", collection: PROFILE_COLLECTION, nullable: true },
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true }
];
var dateFieldMappings = [
  { field: "createdAt" },
  { field: "review_requested", nullable: true },
  { field: "last_seen", nullable: true }
];
var userToFirestore = (user) => {
  return genericToFirestore({
    appObject: user,
    refFieldMappings,
    dateFieldMappings
  });
};
var userFromFirestore = (firestoreUser) => {
  return genericFromFirestore({
    firestoreObject: firestoreUser,
    refFieldMappings,
    dateFieldMappings,
    specialCaseHandler: (result, firestoreData) => {
      if (firestoreData.balance instanceof FieldValue2) {
        result.balance = null;
      }
    }
  });
};
var userToFirestoreWithBalance = (user) => {
  const result = userToFirestore(user);
  if (user.balance === null || typeof user.balance === "number") {
    result.balance = user.balance;
  }
  return result;
};

// src/schemas/base/utils.ts
var convertToDate2 = (value) => {
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  throw new Error(`Unable to convert value to Date: ${value}`);
};
var isDate2 = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};

// src/schemas/base/booking.ts
import { z as z8 } from "zod";

// src/constants.ts
import { z as z7 } from "zod";
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
var supportedLocalesSchema = z7.enum(SUPPORTED_LOCALES);

// src/schemas/base/booking.ts
var communicationChannelSchema = z8.enum([
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
var communicationOptionsSchema = z8.object({
  should_send_message: z8.boolean(),
  channels: z8.array(communicationChannelSchema)
});
var bookingStatusSchema = z8.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: z8.string().nullable(),
  first_name: z8.string(),
  last_name: z8.string(),
  full_name: z8.string(),
  pax: z8.number(),
  email: z8.string().email().nullable(),
  phone: z8.string().nullable(),
  booking_id: z8.string().nullable(),
  flight_number: z8.string().optional(),
  gender: z8.enum(["M", "F", "O"]).optional(),
  package_size: z8.string().optional(),
  sent_messages: z8.record(z8.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: z8.object({
    source: z8.string(),
    manual: z8.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z8.boolean(),
  is_pseudonymized: z8.boolean(),
  import_id: z8.string().nullable().optional(),
  package_specifications: z8.record(z8.any()).optional()
};
var bookingAppSchema = baseModelAppSchema.extend({
  ...commonBookingFields,
  return_date: z8.date().nullable(),
  departure_date: z8.date(),
  partner: partnerRefString,
  promo_codes: promoCodeRefStringArray,
  users: userRefStringArrayNullable,
  esims: esimRefStringArrayNullable
});

// src/schemas/firebase/booking.ts
var bookingFirestoreSchema = baseModelSchema.extend({
  ...commonBookingFields,
  return_date: timestampSchema.nullable(),
  departure_date: timestampSchema,
  partner: partnerRefSchema.schema,
  promo_codes: promoCodeRefArray,
  users: userRefArrayNullable,
  esims: esimRefArrayNullable
});
var refFieldMappings2 = [
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION },
  { app: "promo_codes", firestore: "promo_codes", collection: PROMO_CODE_COLLECTION, isArray: true },
  { app: "users", firestore: "users", collection: USER_COLLECTION, isArray: true, nullable: true },
  { app: "esims", firestore: "esims", collection: ESIM_COLLECTION, isArray: true, nullable: true }
];
var dateFieldMappings2 = [
  { field: "return_date", nullable: true },
  { field: "departure_date" }
];
var bookingToFirestore = (booking) => {
  return genericToFirestore({
    appObject: booking,
    refFieldMappings: refFieldMappings2,
    dateFieldMappings: dateFieldMappings2
  });
};
var bookingFromFirestore = (firestoreBooking) => {
  return genericFromFirestore({
    firestoreObject: firestoreBooking,
    refFieldMappings: refFieldMappings2,
    dateFieldMappings: dateFieldMappings2
  });
};

// src/schemas/firebase/partner.ts
import { z as z10 } from "zod";

// src/schemas/base/partner.ts
import { z as z9 } from "zod";
var addressSchema = z9.object({
  street: z9.string().optional(),
  city: z9.string().optional(),
  postal_code: z9.string().optional(),
  country: z9.string().optional()
}).nullable();
var registrationSchema = z9.object({
  chamber_of_commerce_number: z9.string().nullable().optional(),
  vat_number: z9.string().nullable().optional(),
  anvr_number: z9.number().nullable().optional(),
  tax_number: z9.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = z9.object({
  account_holder: z9.string(),
  bank_name: z9.string(),
  iban: z9.string()
}).nullable();
var commonPackagePriceFields = {
  destination: z9.string(),
  label: z9.string(),
  type: z9.enum(["data-limit", "time-limit"]),
  price: z9.number()
};
var packagePriceAppSchema = z9.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: z9.number()
};
var partnerPricingStrategyAppSchema = z9.object({
  ...commonPricingStrategyFields,
  strategy: z9.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: z9.array(packagePriceAppSchema)
});
var userPricingStrategyAppSchema = z9.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: z9.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: z9.number().nullable(),
  income_per_gb: z9.number().nullable(),
  commission_fee: z9.number().nullable().optional(),
  payment_method: z9.enum(["invoice", "direct"]),
  requires_card: z9.boolean().nullable(),
  next_invoice: z9.date().nullable().optional(),
  last_invoice: z9.date().nullable().optional()
};
var financialPropertiesAppSchema = z9.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: z9.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = z9.object({
  name: z9.string(),
  iso3_white_list: z9.array(z9.string()).optional(),
  parameters: z9.any()
});
var bookingDefaultsSchema = z9.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = z9.object({
  brevo_template_id: z9.number(),
  send_booking_confirmation: z9.boolean()
});
var visualIdentityBannerSchema = z9.object({
  image_url: z9.string(),
  alt: z9.string(),
  click_url: z9.string(),
  locale: supportedLocalesSchema,
  properties: z9.record(z9.string())
});
var visualIdentityBannerStrategySchema = z9.object({
  strategy: z9.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: z9.array(visualIdentityBannerSchema)
});
var visualIdentitySchema = z9.object({
  primary_color: z9.string(),
  secondary_color: z9.string(),
  logo: z9.string(),
  font: z9.string(),
  top_banner: visualIdentityBannerStrategySchema.optional(),
  mid_banner: visualIdentityBannerStrategySchema.optional()
});
var scheduleFilterSchema = z9.object({
  type: z9.enum(["iso3", "gender", "percentage", "age"]),
  value: z9.union([z9.string(), z9.number()]),
  comparison: z9.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = z9.object({
  days: z9.number(),
  email: z9.object({
    brevo_template_id: z9.number(),
    subject: z9.record(z9.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional(),
    preview_text: z9.record(z9.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional()
  }).nullable().optional(),
  push: z9.object({
    title: z9.record(z9.string()).optional(),
    body: z9.record(z9.string()).optional(),
    target: z9.string()
  }).nullable().optional(),
  hour: z9.number(),
  key: z9.string(),
  method: z9.enum(["email", "sms", "whatsapp", "push"]),
  moment: z9.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = z9.object({
  package_specification: z9.object({
    size: z9.string(),
    type: z9.string(),
    destination: z9.string()
  }),
  allowance: z9.number()
});
var platformSettingsSchema = z9.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: bookingDefaultsSchema.nullable().optional(),
  booking_confirmation: bookingConfirmationSchema.nullable().optional(),
  schedules: z9.array(scheduleSchema).optional()
}).nullable();
var commonContactFields = {
  email: z9.string().nullable(),
  office_phone: z9.string().nullable().optional()
};
var commonPartnerFields = {
  name: z9.string().nullable(),
  type: z9.string().nullable(),
  is_active: z9.boolean().nullable().optional(),
  external_id: z9.string().nullable().optional(),
  contact: z9.object(commonContactFields).nullable(),
  address: addressSchema,
  registration: registrationSchema,
  banking_details: bankingDetailsSchema,
  visual_identity: visualIdentitySchema.nullable(),
  data: z9.object({
    source: z9.string(),
    manual: z9.boolean()
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
  name: z9.string(),
  description: z9.string().nullable(),
  type: z9.enum(["partner", "consumer"]),
  partner: partnerRefStringNullable,
  package_prices: z9.array(packagePriceAppSchema)
});

// src/schemas/firebase/partner.ts
var commonPackagePriceFields2 = {
  destination: z10.string(),
  label: z10.string(),
  type: z10.enum(["data-limit", "time-limit"]),
  price: z10.number()
};
var packagePriceFirestoreSchema = z10.object({
  ...commonPackagePriceFields2,
  package: packageRefSchema.schema
});
var commonPricingStrategyFields2 = {
  modification_percentage: z10.number()
};
var partnerPricingStrategyFirestoreSchema = z10.object({
  ...commonPricingStrategyFields2,
  strategy: z10.enum(["split", "bundle"]),
  default_price_list: priceListRefNullable,
  custom_prices: z10.array(packagePriceFirestoreSchema)
});
var userPricingStrategyFirestoreSchema = z10.object({
  ...commonPricingStrategyFields2,
  default_price_list: priceListRefNullable,
  custom_prices: z10.array(packagePriceFirestoreSchema)
});
var firestoreFinancialPropertiesFields = {
  ...commonFinancialPropertiesFields,
  // Override date fields with timestamp
  next_invoice: timestampSchema.nullable(),
  last_invoice: timestampSchema.nullable()
};
var financialPropertiesFirestoreSchema = z10.object({
  ...firestoreFinancialPropertiesFields,
  pricing_strategies: z10.object({
    partner: partnerPricingStrategyFirestoreSchema.optional(),
    user: userPricingStrategyFirestoreSchema.optional()
  }).nullable()
}).nullable();
var partnerFirestoreSchema = baseModelSchema.extend({
  ...commonPartnerFields,
  parent: partnerRefNullable,
  users: userRefArrayNullable,
  financial_properties: financialPropertiesFirestoreSchema,
  platform_settings: platformSettingsSchema
});
var priceListFirestoreSchema = baseModelSchema.extend({
  name: z10.string(),
  description: z10.string().nullable(),
  partner: partnerRefNullable,
  package_prices: z10.array(packagePriceFirestoreSchema)
});
var partnerRefFieldMappings = [
  { app: "parent", firestore: "parent", collection: PARTNER_COLLECTION, nullable: true },
  { app: "users", firestore: "users", collection: USER_COLLECTION, isArray: true, nullable: true }
];
var partnerToFirestore = (partner) => {
  const result = genericToFirestore({
    appObject: partner,
    refFieldMappings: partnerRefFieldMappings,
    dateFieldMappings: []
  });
  if (partner.financial_properties?.next_invoice) {
    if (!result.financial_properties) {
      result.financial_properties = {
        administration_fee: null,
        income_per_gb: null,
        payment_method: "invoice",
        requires_card: null,
        next_invoice: null,
        last_invoice: null,
        pricing_strategies: null
      };
    }
    result.financial_properties.next_invoice = toFirestore.date(partner.financial_properties.next_invoice);
  }
  if (partner.financial_properties?.last_invoice) {
    if (!result.financial_properties) {
      result.financial_properties = {
        administration_fee: null,
        income_per_gb: null,
        payment_method: "invoice",
        requires_card: null,
        next_invoice: null,
        last_invoice: null,
        pricing_strategies: null
      };
    }
    result.financial_properties.last_invoice = toFirestore.date(partner.financial_properties.last_invoice);
  }
  return result;
};
var partnerFromFirestore = (firestorePartner) => {
  const result = genericFromFirestore({
    firestoreObject: firestorePartner,
    refFieldMappings: partnerRefFieldMappings,
    dateFieldMappings: []
  });
  if (firestorePartner.financial_properties?.next_invoice) {
    if (!result.financial_properties) {
      result.financial_properties = {
        administration_fee: null,
        income_per_gb: null,
        payment_method: "invoice",
        requires_card: null,
        next_invoice: null,
        last_invoice: null,
        pricing_strategies: null
      };
    }
    result.financial_properties.next_invoice = fromFirestore.date(firestorePartner.financial_properties.next_invoice);
  }
  if (firestorePartner.financial_properties?.last_invoice) {
    if (!result.financial_properties) {
      result.financial_properties = {
        administration_fee: null,
        income_per_gb: null,
        payment_method: "invoice",
        requires_card: null,
        next_invoice: null,
        last_invoice: null,
        pricing_strategies: null
      };
    }
    result.financial_properties.last_invoice = fromFirestore.date(firestorePartner.financial_properties.last_invoice);
  }
  return result;
};
var priceListRefFieldMappings = [
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true }
];
var priceListToFirestore = (priceList) => {
  return genericToFirestore({
    appObject: priceList,
    refFieldMappings: priceListRefFieldMappings,
    dateFieldMappings: []
  });
};
var priceListFromFirestore = (firestorePriceList) => {
  return genericFromFirestore({
    firestoreObject: firestorePriceList,
    refFieldMappings: priceListRefFieldMappings,
    dateFieldMappings: []
  });
};

// src/schemas/base/country.ts
import { z as z11 } from "zod";
var countryAppSchema = z11.object({
  id: z11.string().nullable(),
  bokun_id: z11.number().nullable(),
  LTE: z11.boolean().nullable(),
  apn: z11.string().nullable(),
  click_count: z11.number().nullable(),
  global_network: z11.string().nullable(),
  global_price: z11.number().nullable(),
  hubby: z11.number().nullable(),
  imsi: z11.number().nullable(),
  name: z11.string().nullable(),
  region: z11.boolean().nullable(),
  is_region: z11.boolean().nullable(),
  countries: z11.array(z11.string()).nullable(),
  tier: z11.number().nullable()
});

// src/schemas/firebase/country.ts
var countryFirestoreSchema = countryAppSchema;
var countryToFirestore = (country) => {
  return genericToFirestore({
    appObject: country,
    refFieldMappings: [],
    dateFieldMappings: []
  });
};
var countryFromFirestore = (firestoreCountry) => {
  return genericFromFirestore({
    firestoreObject: firestoreCountry,
    refFieldMappings: [],
    dateFieldMappings: []
  });
};

// src/schemas/firebase/package.ts
import { z as z13 } from "zod";

// src/schemas/base/package.ts
import { z as z12 } from "zod";
var commonPackageFields = {
  external_id: z12.string(),
  provider: z12.string(),
  coverage_label: z12.string().nullable(),
  label: z12.string(),
  bytes: z12.number(),
  hidden: z12.boolean(),
  is_hidden: z12.boolean(),
  is_active: z12.boolean(),
  priority: z12.number(),
  country_data: countryAppSchema.nullable(),
  price: z12.number(),
  partner_price: z12.number(),
  days: z12.number(),
  name: z12.string(),
  type: z12.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z12.number().optional(),
  provider_parameters: z12.object({
    imsi: z12.number()
  }).nullable()
};
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
});

// src/schemas/firebase/package.ts
var commonPackageFields2 = {
  external_id: z13.string(),
  provider: z13.string(),
  coverage_label: z13.string().nullable(),
  label: z13.string(),
  bytes: z13.number(),
  hidden: z13.boolean(),
  is_hidden: z13.boolean(),
  is_active: z13.boolean(),
  priority: z13.number(),
  country_data: countryFirestoreSchema.nullable(),
  price: z13.number(),
  partner_price: z13.number(),
  days: z13.number(),
  name: z13.string(),
  type: z13.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z13.number().optional(),
  provider_parameters: z13.object({
    imsi: z13.number()
  }).nullable()
};
var packageFirestoreSchema = baseModelSchema.extend({
  ...commonPackageFields2,
  country: countryRefSchema.schema,
  partner: partnerRefNullable
});
var refFieldMappings3 = [
  { app: "country", firestore: "country", collection: COUNTRY_COLLECTION },
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true }
];
var packageToFirestore = (packageData) => {
  return genericToFirestore({
    appObject: packageData,
    refFieldMappings: refFieldMappings3,
    dateFieldMappings: []
  });
};
var packageFromFirestore = (firestorePackage) => {
  return genericFromFirestore({
    firestoreObject: firestorePackage,
    refFieldMappings: refFieldMappings3,
    dateFieldMappings: []
  });
};

// src/schemas/firebase/promoCode.ts
import { z as z16 } from "zod";

// src/schemas/base/api.ts
import { z as z14 } from "zod";
var packageSpecificationSchema = z14.object({
  destination: z14.string().optional(),
  size: z14.string().optional(),
  package_id: z14.string().optional(),
  iata_code: z14.string().optional()
});
var packageSpecificationsSchema = z14.array(packageSpecificationSchema);
var bookingApiResponseSchema = z14.object({
  id: z14.string(),
  title: z14.string().nullable(),
  first_name: z14.string(),
  last_name: z14.string(),
  full_name: z14.string(),
  pax: z14.number(),
  email: z14.string().nullable(),
  phone: z14.string().nullable(),
  booking_id: z14.string().nullable(),
  return_date: z14.string().nullable(),
  // ISO string
  partner: z14.string(),
  // ID string
  promo_codes: z14.array(z14.string()),
  // Array of ID strings
  departure_date: z14.string(),
  // ISO string
  flight_number: z14.string().optional(),
  gender: z14.enum(["M", "F", "O"]).optional(),
  package_size: z14.string().optional(),
  sent_messages: z14.record(z14.any()).optional(),
  users: z14.array(z14.string()),
  // Array of ID strings
  esims: z14.array(z14.string()).nullable(),
  // Array of ID strings or null
  locale: z14.string(),
  status: z14.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z14.object({
    source: z14.string(),
    manual: z14.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z14.boolean(),
  is_pseudonymized: z14.boolean(),
  import_id: z14.string().nullable().optional(),
  created_at: z14.string(),
  // ISO string
  updated_at: z14.string(),
  // ISO string
  created_by: z14.string().optional(),
  updated_by: z14.string().optional()
});
var promoCodeApiResponseSchema = z14.object({
  promo_code: z14.string(),
  package_id: z14.string(),
  package_size: z14.string(),
  destination: z14.string()
});
var bookingApiRequestSchema = z14.object({
  id: z14.string(),
  title: z14.string().nullable(),
  first_name: z14.string().nullable().optional(),
  last_name: z14.string().nullable().optional(),
  full_name: z14.string().nullable().optional(),
  pax: z14.number().int().min(1).nullable().optional(),
  email: z14.string().nullable().optional(),
  phone: z14.string().nullable().optional(),
  booking_id: z14.string().min(3).nullable().optional(),
  return_date: z14.date().nullable(),
  // Must be after departure_date
  departure_date: z14.date(),
  // ISO 8601 date string
  flight_number: z14.string().nullable().optional(),
  gender: z14.enum(["M", "F", "O"]).optional(),
  package_size: z14.string().optional(),
  sent_messages: z14.record(z14.any()).optional(),
  locale: z14.string().min(2).max(5).optional(),
  status: z14.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z14.object({
    source: z14.string(),
    manual: z14.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z14.boolean(),
  is_pseudonymized: z14.boolean(),
  date_of_birth: z14.date().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: z14.date(),
  updated_at: z14.date()
});
var partnerApiRequestSchema = z14.object({
  id: z14.string(),
  name: z14.string().nullable(),
  type: z14.string().nullable(),
  is_active: z14.boolean().nullable().optional(),
  external_id: z14.string().nullable().optional(),
  parent: z14.string().nullable(),
  // String ID
  contact: z14.object({
    email: z14.string().nullable(),
    office_phone: z14.string().nullable().optional()
  }).nullable(),
  address: z14.object({
    street: z14.string().optional(),
    city: z14.string().optional(),
    postal_code: z14.string().optional(),
    country: z14.string().optional()
  }).nullable().optional(),
  registration: z14.object({
    chamber_of_commerce_number: z14.string().nullable().optional(),
    vat_number: z14.string().nullable().optional(),
    anvr_number: z14.number().nullable().optional(),
    tax_number: z14.string().nullable().optional()
  }).nullable().optional(),
  banking_details: z14.object({
    account_holder: z14.string(),
    bank_name: z14.string(),
    iban: z14.string()
  }).nullable().optional(),
  finance: z14.object({
    administration_fee: z14.number().nullable(),
    income_per_gb: z14.number().nullable(),
    commission_fee: z14.number().optional(),
    payment_method: z14.enum(["invoice", "direct"]),
    requires_card: z14.boolean().nullable(),
    next_invoice: z14.date().nullable(),
    last_invoice: z14.date().nullable(),
    pricing_strategies: z14.object({
      partner: z14.object({
        strategy: z14.enum(["split", "bundle"]),
        default_price_list: z14.string().nullable(),
        custom_prices: z14.array(z14.any()),
        modification_percentage: z14.number()
      }),
      user: z14.object({
        default_price_list: z14.string().nullable(),
        custom_prices: z14.array(z14.any()),
        modification_percentage: z14.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: z14.any().optional(),
  visual_identity: z14.any().nullable(),
  users: z14.array(z14.string()).nullable(),
  // Array of string IDs
  data: z14.object({
    source: z14.string(),
    manual: z14.boolean()
  }).optional(),
  created_at: z14.date(),
  updated_at: z14.date(),
  created_by: z14.string().nullable(),
  updated_by: z14.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/base/promoCode.ts
import { z as z15 } from "zod";
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: z15.string(),
  code: z15.string(),
  allowance_user: z15.number(),
  allowance_total: z15.number(),
  type: z15.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z15.string()),
  usage: z15.array(z15.string()),
  uuid_usage: z15.array(z15.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: z15.date(),
  valid_to: z15.date(),
  // Optional fields based on the type
  discount: z15.number().optional(),
  package_size: z15.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: z15.array(z15.string()).optional(),
  max_bytes: z15.number().optional(),
  starter_data: z15.number().optional()
});

// src/schemas/firebase/promoCode.ts
var promoCodeFirestoreSchema = baseModelSchema.extend({
  external_id: z16.string(),
  code: z16.string(),
  allowance_user: z16.number(),
  allowance_total: z16.number(),
  type: z16.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z16.string()),
  usage: z16.array(z16.string()),
  uuid_usage: z16.array(z16.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefNullable,
  valid_from: z16.union([z16.string(), z16.date(), timestampSchema]),
  valid_to: z16.union([z16.string(), z16.date(), timestampSchema]),
  // Optional fields based on the type
  discount: z16.number().optional(),
  package_size: z16.string().optional(),
  package: packageRefNullable,
  country: countryRefNullable,
  booking: bookingRefNullable,
  countries: z16.array(z16.string()).optional(),
  max_bytes: z16.number().optional(),
  starter_data: z16.number().optional()
});
var refFieldMappings4 = [
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true },
  { app: "package", firestore: "package", collection: PACKAGE_COLLECTION, nullable: true },
  { app: "country", firestore: "country", collection: COUNTRY_COLLECTION, nullable: true },
  { app: "booking", firestore: "booking", collection: BOOKING_COLLECTION, nullable: true }
];
var dateFieldMappings3 = [
  { field: "valid_from" },
  { field: "valid_to" }
];
var promoCodeToFirestore = (promoCode) => {
  return genericToFirestore({
    appObject: promoCode,
    refFieldMappings: refFieldMappings4,
    dateFieldMappings: dateFieldMappings3
  });
};
var promoCodeFromFirestore = (firestorePromoCode) => {
  return genericFromFirestore({
    firestoreObject: firestorePromoCode,
    refFieldMappings: refFieldMappings4,
    dateFieldMappings: dateFieldMappings3
  });
};

// src/schemas/base/esim.ts
import { z as z17 } from "zod";
var commonESIMFields = {
  imsi: z17.number(),
  qr: z17.string(),
  iccid: z17.string(),
  provider: z17.string(),
  coverage_label: z17.string().nullable().optional(),
  total_data: z17.number().nullable(),
  data_left: z17.number().nullable(),
  data_used: z17.boolean().nullable(),
  status: z17.string().nullable(),
  name: z17.string(),
  android_auto: z17.boolean(),
  partner_price: z17.number().nullable(),
  promo: z17.string().nullable(),
  type: z17.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: z17.boolean(),
  is_archived: z17.boolean(),
  user: z17.string().nullable(),
  payment: z17.string().nullable(),
  apn: z17.string().nullable()
};
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: z17.string().nullable(),
  time_assigned: z17.date().nullable(),
  last_updated: z17.date().nullable(),
  partner: z17.string().nullable()
});

// src/schemas/firebase/esim.ts
var esimFirestoreSchema = baseModelSchema.extend({
  ...commonESIMFields,
  country: countryRefNullable,
  time_assigned: timestampSchema.nullable(),
  last_updated: timestampSchema.nullable(),
  partner: partnerRefNullable
});
var refFieldMappings5 = [
  { app: "country", firestore: "country", collection: COUNTRY_COLLECTION, nullable: true },
  { app: "user", firestore: "user", collection: USER_COLLECTION, nullable: true },
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true },
  { app: "payment", firestore: "payment", collection: PAYMENT_COLLECTION, nullable: true }
];
var dateFieldMappings4 = [
  { field: "time_assigned", nullable: true },
  { field: "last_updated", nullable: true }
];
var esimToFirestore = (esim) => {
  return genericToFirestore({
    appObject: esim,
    refFieldMappings: refFieldMappings5,
    dateFieldMappings: dateFieldMappings4
  });
};
var esimFromFirestore = (firestoreEsim) => {
  return genericFromFirestore({
    firestoreObject: firestoreEsim,
    refFieldMappings: refFieldMappings5,
    dateFieldMappings: dateFieldMappings4
  });
};

// src/schemas/firebase/payment.ts
import { z as z19 } from "zod";

// src/schemas/base/payment.ts
import { z as z18 } from "zod";
var paymentAppSchema = baseModelAppSchema.extend({
  amount: z18.number(),
  customer: z18.string(),
  date: z18.date(),
  iccid: z18.string(),
  package: z18.string(),
  promo: z18.string(),
  topup: z18.boolean()
});

// src/schemas/firebase/payment.ts
var paymentFirestoreSchema = baseModelSchema.extend({
  amount: z19.number(),
  customer: z19.string(),
  date: timestampSchema,
  // In Firestore this is a Timestamp
  iccid: z19.string(),
  package: z19.string(),
  promo: z19.string(),
  topup: z19.boolean()
});
var dateFieldMappings5 = [
  { field: "date" }
];
var paymentToFirestore = (payment) => {
  return genericToFirestore({
    appObject: payment,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5
  });
};
var paymentFromFirestore = (firestorePayment) => {
  return genericFromFirestore({
    firestoreObject: firestorePayment,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5
  });
};

// src/schemas/firebase/message.ts
import { z as z21 } from "zod";
import { Timestamp as Timestamp3 } from "firebase/firestore";

// src/schemas/base/message.ts
import { z as z20 } from "zod";
var messageAppSchema = z20.object({
  id: z20.string(),
  key: z20.string(),
  method: z20.enum(["push", "sms", "email"]),
  status: z20.enum(["pending", "sent", "failed", "delivered"]),
  created_at: z20.date(),
  updated_at: z20.date()
});
var sentMessagesAppSchema = z20.record(messageAppSchema);

// src/schemas/firebase/message.ts
var messageFirestoreSchema = z21.object({
  id: z21.string(),
  key: z21.string(),
  method: z21.enum(["push", "sms", "email"]),
  status: z21.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampSchema,
  updated_at: timestampSchema
});
var sentMessagesFirestoreSchema = z21.record(messageFirestoreSchema);
var dateFieldMappings6 = [
  { field: "created_at" },
  { field: "updated_at" }
];
var messageToFirestore = (message) => {
  return genericToFirestore({
    appObject: message,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings6
  });
};
var messageFromFirestore = (firestoreMessage) => {
  return genericFromFirestore({
    firestoreObject: firestoreMessage,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings6
  });
};
var sentMessagesToFirestore = (sentMessages) => {
  const result = {};
  for (const key in sentMessages) {
    const message = sentMessages[key];
    if (message) {
      result[key] = messageToFirestore(message);
    }
  }
  return result;
};
var sentMessagesFromFirestore = (firestoreSentMessages) => {
  const result = {};
  for (const key in firestoreSentMessages) {
    const firestoreMessage = firestoreSentMessages[key];
    if (firestoreMessage) {
      result[key] = messageFromFirestore(firestoreMessage);
    }
  }
  return result;
};
var convertSentMessagesToFirestore = (sentMessages) => {
  const result = {};
  for (const key in sentMessages) {
    const message = sentMessages[key];
    if (message) {
      const firestoreMessage = {
        ...message,
        created_at: message.created_at instanceof Date ? Timestamp3.fromDate(message.created_at) : message.created_at,
        updated_at: message.updated_at instanceof Date ? Timestamp3.fromDate(message.updated_at) : message.updated_at
      };
      result[key] = firestoreMessage;
    }
  }
  return result;
};
var convertSentMessagesFromFirestore = (firestoreSentMessages) => {
  const result = {};
  for (const key in firestoreSentMessages) {
    const firestoreMessage = firestoreSentMessages[key];
    if (firestoreMessage) {
      const appMessage = {
        ...firestoreMessage,
        created_at: firestoreMessage.created_at instanceof Timestamp3 ? firestoreMessage.created_at.toDate() : firestoreMessage.created_at,
        updated_at: firestoreMessage.updated_at instanceof Timestamp3 ? firestoreMessage.updated_at.toDate() : firestoreMessage.updated_at
      };
      result[key] = appMessage;
    }
  }
  return result;
};

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
import { z as z22 } from "zod";
var conversionRateSchema = z22.object({
  currency: z22.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: z22.string(),
  symbol: z22.string(),
  name: z22.string(),
  rate: z22.number(),
  is_default: z22.boolean()
};
var currencyAppSchema = documentedObject(
  baseModelAppSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs
);

// src/schemas/firebase/currency.ts
var currencyFieldDocs2 = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var currencyFirestoreSchema = documentedObject(
  baseModelSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs2
);
var dateFieldMappings7 = [];
var currencyToFirestore = (currency) => {
  return genericToFirestore({
    appObject: currency,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings7
  });
};
var currencyFromFirestore = (firestoreCurrency) => {
  return genericFromFirestore({
    firestoreObject: firestoreCurrency,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings7
  });
};

// src/schemas/firebase/apiLogs.ts
import { z as z24 } from "zod";

// src/schemas/base/apiLogs.ts
import { z as z23 } from "zod";
var apiLogAppSchema = z23.object({
  id: z23.string().optional(),
  method: z23.string(),
  user_id: z23.string().optional(),
  path: z23.string(),
  resource_type: z23.string().optional(),
  resource_id: z23.string().optional(),
  partner_id: z23.string().optional(),
  payload: z23.record(z23.unknown()).optional(),
  timestamp: z23.date(),
  status_code: z23.number()
});

// src/schemas/firebase/apiLogs.ts
var apiLogFirestoreSchema = z24.object({
  id: z24.string().optional(),
  method: z24.string(),
  user_id: z24.string().optional(),
  path: z24.string(),
  resource_type: z24.string().optional(),
  resource_id: z24.string().optional(),
  partner_id: z24.string().optional(),
  payload: z24.record(z24.unknown()).optional(),
  timestamp: timestampSchema,
  status_code: z24.number()
});
var dateFieldMappings8 = [
  { field: "timestamp" }
];
var apiLogToFirestore = (apiLog) => {
  return genericToFirestore({
    appObject: apiLog,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings8
  });
};
var apiLogFromFirestore = (firestoreApiLog) => {
  return genericFromFirestore({
    firestoreObject: firestoreApiLog,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings8
  });
};
export {
  API_LOG_COLLECTION,
  BOOKING_COLLECTION,
  COUNTRY_COLLECTION,
  CURRENCY_COLLECTION,
  CommunicationChannel,
  ESIM_COLLECTION,
  MESSAGE_COLLECTION,
  MockDocumentReference,
  PACKAGE_COLLECTION,
  PARTNER_COLLECTION,
  PAYMENT_COLLECTION,
  PRICE_LIST_COLLECTION,
  PROFILE_COLLECTION,
  PROMO_CODE_COLLECTION,
  SUPPORTED_LOCALES,
  USER_COLLECTION,
  addressSchema,
  apiKeySchema2 as apiKeySchema,
  apiKeysSchema2 as apiKeysSchema,
  apiLogAppSchema,
  apiLogFirestoreSchema,
  apiLogFromFirestore,
  apiLogRefArray,
  apiLogRefArrayNullable,
  apiLogRefNullable,
  apiLogRefSchema,
  apiLogRefString,
  apiLogRefStringArray,
  apiLogRefStringArrayNullable,
  apiLogRefStringNullable,
  apiLogToFirestore,
  bankingDetailsSchema,
  baseModelAppSchema,
  baseModelSchema,
  bookingApiRequestSchema,
  bookingApiResponseSchema,
  bookingAppSchema,
  bookingConfirmationSchema,
  bookingDefaultsSchema,
  bookingFirestoreSchema,
  bookingFromFirestore,
  bookingRefArray,
  bookingRefArrayNullable,
  bookingRefNullable,
  bookingRefSchema,
  bookingRefString,
  bookingRefStringArray,
  bookingRefStringArrayNullable,
  bookingRefStringNullable,
  bookingStatusSchema,
  bookingToFirestore,
  commonBookingFields,
  commonCurrencyFields,
  commonESIMFields,
  commonFinancialPropertiesFields,
  commonPackageFields,
  commonPackagePriceFields,
  commonPartnerFields,
  commonPricingStrategyFields,
  communicationChannelSchema,
  communicationOptionsSchema,
  conversionRateSchema,
  convertSentMessagesFromFirestore,
  convertSentMessagesToFirestore,
  convertToDate2 as convertToDate,
  countryAppSchema,
  countryFirestoreSchema,
  countryFromFirestore,
  countryRefArray,
  countryRefArrayNullable,
  countryRefNullable,
  countryRefSchema,
  countryRefString,
  countryRefStringArray,
  countryRefStringArrayNullable,
  countryRefStringNullable,
  countryToFirestore,
  createDocRefSchema,
  currencyAppSchema,
  currencyFirestoreSchema,
  currencyFromFirestore,
  currencyRefArray,
  currencyRefArrayNullable,
  currencyRefNullable,
  currencyRefSchema,
  currencyRefString,
  currencyRefStringArray,
  currencyRefStringArrayNullable,
  currencyRefStringNullable,
  currencyToFirestore,
  docRefToStringSchema,
  documentRefSchema,
  esimAppSchema,
  esimFirestoreSchema,
  esimFromFirestore,
  esimRefArray,
  esimRefArrayNullable,
  esimRefNullable,
  esimRefSchema,
  esimRefString,
  esimRefStringArray,
  esimRefStringArrayNullable,
  esimRefStringNullable,
  esimToFirestore,
  fieldValueSchema,
  financialPropertiesAppSchema,
  financialPropertiesFirestoreSchema,
  freeEsimSchema,
  fromFirestore,
  genericFromFirestore,
  genericToFirestore,
  hubbyModelAppSchema,
  hubbyModelFirestoreSchema,
  isDate2 as isDate,
  messageAppSchema,
  messageFirestoreSchema,
  messageFromFirestore,
  messageRefArray,
  messageRefArrayNullable,
  messageRefNullable,
  messageRefSchema,
  messageRefString,
  messageRefStringArray,
  messageRefStringArrayNullable,
  messageRefStringNullable,
  messageToFirestore,
  packageAppSchema,
  packageFirestoreSchema,
  packageFromFirestore,
  packagePriceAppSchema,
  packagePriceFirestoreSchema,
  packageRefArray,
  packageRefArrayNullable,
  packageRefNullable,
  packageRefSchema,
  packageRefString,
  packageRefStringArray,
  packageRefStringArrayNullable,
  packageRefStringNullable,
  packageSpecificationSchema,
  packageSpecificationsSchema,
  packageStrategySchema,
  packageToFirestore,
  partnerApiRequestSchema,
  partnerApiResponseSchema,
  partnerAppSchema,
  partnerFirestoreSchema,
  partnerFromFirestore,
  partnerPricingStrategyAppSchema,
  partnerPricingStrategyFirestoreSchema,
  partnerRefArray,
  partnerRefArrayNullable,
  partnerRefNullable,
  partnerRefSchema,
  partnerRefString,
  partnerRefStringArray,
  partnerRefStringArrayNullable,
  partnerRefStringNullable,
  partnerToFirestore,
  paymentAppSchema,
  paymentFirestoreSchema,
  paymentFromFirestore,
  paymentRefArray,
  paymentRefArrayNullable,
  paymentRefNullable,
  paymentRefSchema,
  paymentRefString,
  paymentRefStringArray,
  paymentRefStringArrayNullable,
  paymentRefStringNullable,
  paymentToFirestore,
  platformSettingsSchema,
  priceListAppSchema,
  priceListFirestoreSchema,
  priceListFromFirestore,
  priceListRefArray,
  priceListRefArrayNullable,
  priceListRefNullable,
  priceListRefSchema,
  priceListRefString,
  priceListRefStringArray,
  priceListRefStringArrayNullable,
  priceListRefStringNullable,
  priceListToFirestore,
  profileRefArray,
  profileRefArrayNullable,
  profileRefNullable,
  profileRefSchema,
  profileRefString,
  profileRefStringArray,
  profileRefStringArrayNullable,
  profileRefStringNullable,
  promoCodeApiResponseSchema,
  promoCodeAppSchema,
  promoCodeFirestoreSchema,
  promoCodeFromFirestore,
  promoCodeRefArray,
  promoCodeRefArrayNullable,
  promoCodeRefNullable,
  promoCodeRefSchema,
  promoCodeRefString,
  promoCodeRefStringArray,
  promoCodeRefStringArrayNullable,
  promoCodeRefStringNullable,
  promoCodeToFirestore,
  registrationSchema,
  scheduleFilterSchema,
  scheduleSchema,
  sentMessagesFirestoreSchema,
  sentMessagesFromFirestore,
  sentMessagesToFirestore,
  supportedLocalesSchema,
  timestampSchema,
  toFirestore,
  userFirestoreSchema,
  userFromFirestore,
  userPricingStrategyAppSchema,
  userPricingStrategyFirestoreSchema,
  userRefArray,
  userRefArrayNullable,
  userRefNullable,
  userRefSchema,
  userRefString,
  userRefStringArray,
  userRefStringArrayNullable,
  userRefStringNullable,
  userToFirestore,
  userToFirestoreWithBalance,
  visualIdentityBannerSchema,
  visualIdentityBannerStrategySchema,
  visualIdentitySchema
};
//# sourceMappingURL=index.js.map