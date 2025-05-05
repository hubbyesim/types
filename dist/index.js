// src/schemas/firebase/partner.ts
import { z as z8 } from "zod";

// src/schemas/firebase/core.ts
import { z } from "zod";
import { Timestamp } from "firebase-admin/firestore";
var timestampSchema = z.custom(
  (val) => val instanceof Timestamp
);
var documentRefSchema = z.custom(
  (val) => typeof val === "object" && val !== null && "path" in val && "id" in val
);
var fieldValueSchema = z.custom(
  (val) => typeof val === "object" && val !== null && "isEqual" in val
);
var baseModelSchema = z.object({
  id: z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
  created_by: z.union([z.string(), z.null(), documentRefSchema]),
  updated_by: z.union([z.string(), z.null(), documentRefSchema])
});
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

// src/schemas/firebase/helpers.ts
import { z as z3 } from "zod";
import { Timestamp as Timestamp2 } from "firebase-admin/firestore";

// src/schemas/base/helpers.ts
import { z as z2 } from "zod";
var testEnv = { isTestEnvironment: false };
var iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
var zDateString = () => z2.preprocess((input) => {
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
}, z2.date());
var baseModelAppSchema = z2.object({
  id: z2.string(),
  created_at: zDateString(),
  updated_at: zDateString(),
  created_by: z2.union([z2.string(), z2.null()]),
  updated_by: z2.union([z2.string(), z2.null()])
});
var createIdSchema = (collectionPath) => {
  return z2.string().describe(`ID from ${collectionPath}`);
};

// src/schemas/firebase/helpers.ts
import * as admin from "firebase-admin";
var globalDb;
try {
  if (admin.apps.length > 0) {
    globalDb = admin.firestore();
  }
} catch (e) {
}
var MockDocumentReference = class {
  path;
  id;
  constructor(collectionPath, id) {
    this.path = `${collectionPath}/${id}`;
    this.id = id;
  }
};
var firestoreInstance = null;
var setFirestoreInstance = (db) => {
  firestoreInstance = db;
};
var getFirestoreInstance = () => {
  if (firestoreInstance) {
    return firestoreInstance;
  }
  if (globalDb) {
    return globalDb;
  }
  try {
    if (admin.apps.length > 0) {
      return admin.firestore();
    }
  } catch (e) {
  }
  throw new Error("Firestore instance not available. Initialize firebase-admin or call setFirestoreInstance first.");
};
var toFirestore = {
  date: (date) => Timestamp2.fromDate(date),
  ref: (collectionPath, id, db) => {
    if (testEnv.isTestEnvironment) {
      return new MockDocumentReference(collectionPath, id);
    }
    const firestore2 = db || getFirestoreInstance();
    return firestore2.collection(collectionPath).doc(id);
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
var docRefToStringSchema = (docRefSchema) => {
  return z3.string().describe(`ID from ${docRefSchema.collectionPath}`);
};

// src/schemas/utils/nested-conversions.ts
var setValueAtPath = (obj, path, valueTransformer, wildcardIndex, arrayField) => {
  if (!obj || path.length === 0)
    return;
  const [first, ...rest] = path;
  if (first === "*" && wildcardIndex !== void 0) {
    if (!obj || typeof obj !== "object")
      return;
    for (const key of Object.keys(obj)) {
      setValueAtPath(obj[key], rest, valueTransformer, wildcardIndex, arrayField);
    }
    return;
  }
  if (rest.length === 0) {
    if (obj[first] !== void 0 && obj[first] !== null) {
      if (arrayField && Array.isArray(obj[first])) {
        obj[first] = obj[first].map((item) => valueTransformer(item));
      } else {
        obj[first] = valueTransformer(obj[first]);
      }
    }
    return;
  }
  if (obj[first] === void 0) {
    obj[first] = {};
  }
  setValueAtPath(obj[first], rest, valueTransformer, wildcardIndex, arrayField);
};
var processNestedFieldsToFirestore = (obj, nestedFieldMappings3) => {
  if (!obj)
    return;
  nestedFieldMappings3.forEach((mapping) => {
    const { path, type, collection, nullable, wildcardIndex, arrayField } = mapping;
    setValueAtPath(
      obj,
      path,
      (value) => {
        if (nullable && value === null)
          return null;
        if (type === "timestamp" && value instanceof Date) {
          return toFirestore.date(value);
        }
        if (type === "reference" && typeof value === "string" && collection) {
          return toFirestore.ref(collection, value);
        }
        return value;
      },
      wildcardIndex,
      arrayField
    );
  });
};
var processNestedFieldsFromFirestore = (obj, nestedFieldMappings3) => {
  if (!obj)
    return;
  nestedFieldMappings3.forEach((mapping) => {
    const { path, type, nullable, wildcardIndex, arrayField } = mapping;
    setValueAtPath(
      obj,
      path,
      (value) => {
        if (nullable && value === null)
          return null;
        if (type === "timestamp" && value && typeof value === "object" && "toDate" in value) {
          return fromFirestore.date(value);
        }
        if (type === "reference" && value && typeof value === "object" && value.id) {
          return fromFirestore.ref(value);
        }
        return value;
      },
      wildcardIndex,
      arrayField
    );
  });
};

// src/schemas/utils.ts
var convertToDate = (value, field) => {
  if (typeof value === "string") {
    return new Date(value);
  }
  if (value && typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate();
  }
  throw new Error(`Unable to convert value to Date: ${value} for field: ${field}`);
};
var isDate = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};
function genericToFirestore({
  appObject,
  refFieldMappings: refFieldMappings6,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler,
  nestedFieldMappings: nestedFieldMappings3
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
  refFieldMappings6.forEach(({ app, firestore: firestore2, collection, isArray, nullable }) => {
    const value = appObject[app];
    if (isArray) {
      if (nullable && value === null) {
        result[firestore2] = null;
      } else if (Array.isArray(value)) {
        result[firestore2] = value.map((id) => toFirestore.ref(collection, id));
      }
    } else {
      if (nullable && value === null) {
        result[firestore2] = null;
      } else if (typeof value === "string") {
        result[firestore2] = toFirestore.ref(collection, value);
      }
    }
  });
  if (specialCaseHandler) {
    specialCaseHandler(result, appObject);
  }
  if (nestedFieldMappings3 && nestedFieldMappings3.length > 0) {
    processNestedFieldsToFirestore(result, nestedFieldMappings3);
  }
  return result;
}
function genericFromFirestore({
  firestoreObject,
  refFieldMappings: refFieldMappings6,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler,
  nestedFieldMappings: nestedFieldMappings3
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
    if (nullable && value === null || value === void 0) {
      result[field] = null;
    } else {
      result[field] = convertToDate(value, field);
    }
  });
  refFieldMappings6.forEach(({ app, firestore: firestore2, nullable, isArray }) => {
    const value = firestoreObject[firestore2];
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
  if (nestedFieldMappings3 && nestedFieldMappings3.length > 0) {
    processNestedFieldsFromFirestore(result, nestedFieldMappings3);
  }
  return result;
}

// src/schemas/base/refs.ts
import { z as z4 } from "zod";
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
var partnerRefStringArray = z4.array(z4.string());
var userRefStringArray = z4.array(z4.string());
var profileRefStringArray = z4.array(z4.string());
var packageRefStringArray = z4.array(z4.string());
var promoCodeRefStringArray = z4.array(z4.string());
var countryRefStringArray = z4.array(z4.string());
var esimRefStringArray = z4.array(z4.string());
var paymentRefStringArray = z4.array(z4.string());
var priceListRefStringArray = z4.array(z4.string());
var bookingRefStringArray = z4.array(z4.string());
var messageRefStringArray = z4.array(z4.string());
var currencyRefStringArray = z4.array(z4.string());
var apiLogRefStringArray = z4.array(z4.string());
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
import { z as z5 } from "zod";
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
var partnerRefArray = z5.array(partnerRefSchema.schema);
var userRefArray = z5.array(userRefSchema.schema);
var profileRefArray = z5.array(profileRefSchema.schema);
var packageRefArray = z5.array(packageRefSchema.schema);
var promoCodeRefArray = z5.array(promoCodeRefSchema.schema);
var countryRefArray = z5.array(countryRefSchema.schema);
var esimRefArray = z5.array(esimRefSchema.schema);
var paymentRefArray = z5.array(paymentRefSchema.schema);
var priceListRefArray = z5.array(priceListRefSchema.schema);
var bookingRefArray = z5.array(bookingRefSchema.schema);
var messageRefArray = z5.array(messageRefSchema.schema);
var currencyRefArray = z5.array(currencyRefSchema.schema);
var apiLogRefArray = z5.array(apiLogRefSchema.schema);
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

// src/schemas/base/partner.ts
import { z as z7 } from "zod";

// src/constants.ts
import { z as z6 } from "zod";
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
var supportedLocalesSchema = z6.enum(SUPPORTED_LOCALES);

// src/schemas/base/partner.ts
var addressSchema = z7.object({
  street: z7.string().optional(),
  city: z7.string().optional(),
  postal_code: z7.string().optional(),
  country: z7.string().optional()
}).nullable();
var registrationSchema = z7.object({
  chamber_of_commerce_number: z7.string().nullable().optional(),
  vat_number: z7.string().nullable().optional(),
  anvr_number: z7.number().nullable().optional(),
  tax_number: z7.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = z7.object({
  account_holder: z7.string(),
  bank_name: z7.string(),
  iban: z7.string()
}).nullable();
var commonPackagePriceFields = {
  destination: z7.string(),
  label: z7.string(),
  type: z7.enum(["data-limit", "time-limit"]),
  price: z7.number()
};
var packagePriceAppSchema = z7.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: z7.number()
};
var partnerPricingStrategyAppSchema = z7.object({
  ...commonPricingStrategyFields,
  strategy: z7.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: z7.array(packagePriceAppSchema)
});
var userPricingStrategyAppSchema = z7.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: z7.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: z7.number().nullable(),
  income_per_gb: z7.number().nullable(),
  commission_fee: z7.number().nullable().optional(),
  payment_method: z7.enum(["invoice", "direct"]),
  requires_card: z7.boolean().nullable(),
  next_invoice: zDateString().nullable().optional(),
  last_invoice: zDateString().nullable().optional()
};
var financialPropertiesAppSchema = z7.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: z7.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = z7.object({
  name: z7.string(),
  iso3_white_list: z7.array(z7.string()).optional(),
  parameters: z7.any()
});
var bookingDefaultsSchema = z7.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = z7.object({
  brevo_template_id: z7.number(),
  send_booking_confirmation: z7.boolean()
});
var visualIdentityBannerSchema = z7.object({
  image_url: z7.string(),
  alt: z7.string(),
  click_url: z7.string(),
  locale: supportedLocalesSchema,
  properties: z7.record(z7.string())
});
var visualIdentityBannerStrategySchema = z7.object({
  strategy: z7.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: z7.array(visualIdentityBannerSchema).nullable().optional()
});
var visualIdentitySchema = z7.object({
  primary_color: z7.string(),
  secondary_color: z7.string(),
  logo: z7.string(),
  font: z7.string(),
  top_banner: visualIdentityBannerStrategySchema.optional(),
  mid_banner: visualIdentityBannerStrategySchema.optional()
});
var scheduleFilterSchema = z7.object({
  type: z7.enum(["iso3", "gender", "percentage", "age"]),
  value: z7.union([z7.string(), z7.number()]),
  comparison: z7.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = z7.object({
  days: z7.number(),
  email: z7.object({
    brevo_template_id: z7.number(),
    subject: z7.record(z7.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional(),
    preview_text: z7.record(z7.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional()
  }).nullable().optional(),
  push: z7.object({
    title: z7.record(z7.string()).optional(),
    body: z7.record(z7.string()).optional(),
    target: z7.string()
  }).nullable().optional(),
  hour: z7.number(),
  key: z7.string(),
  method: z7.enum(["email", "sms", "whatsapp", "push"]),
  moment: z7.enum(["departure_date", "return_date", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = z7.object({
  package_specification: z7.object({
    size: z7.string(),
    type: z7.string(),
    destination: z7.string()
  }),
  allowance: z7.number()
});
var platformSettingsSchema = z7.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: bookingDefaultsSchema.nullable().optional(),
  booking_confirmation: bookingConfirmationSchema.nullable().optional(),
  schedules: z7.array(scheduleSchema).optional()
}).nullable();
var commonContactFields = {
  email: z7.string().nullable(),
  office_phone: z7.string().nullable().optional()
};
var commonPartnerFields = {
  name: z7.string().nullable(),
  type: z7.string().nullable(),
  is_active: z7.boolean().nullable().optional(),
  external_id: z7.string().nullable().optional(),
  contact: z7.object(commonContactFields).nullable(),
  address: addressSchema,
  registration: registrationSchema,
  banking_details: bankingDetailsSchema,
  visual_identity: visualIdentitySchema.nullable(),
  data: z7.object({
    source: z7.string(),
    manual: z7.boolean()
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
  name: z7.string(),
  description: z7.string().nullable(),
  type: z7.enum(["partner", "consumer"]),
  partner: partnerRefStringNullable,
  package_prices: z7.array(packagePriceAppSchema)
});

// src/schemas/firebase/partner.ts
var commonPackagePriceFields2 = {
  destination: z8.string(),
  label: z8.string(),
  type: z8.enum(["data-limited", "time-limited"]),
  price: z8.number()
};
var packagePriceFirestoreSchema = z8.object({
  ...commonPackagePriceFields2,
  package: packageRefSchema.schema
});
var commonPricingStrategyFields2 = {
  modification_percentage: z8.number()
};
var partnerPricingStrategyFirestoreSchema = z8.object({
  ...commonPricingStrategyFields2,
  strategy: z8.enum(["split", "bundle"]),
  default_price_list: priceListRefNullable,
  custom_prices: z8.array(packagePriceFirestoreSchema)
});
var userPricingStrategyFirestoreSchema = z8.object({
  ...commonPricingStrategyFields2,
  default_price_list: priceListRefNullable,
  custom_prices: z8.array(packagePriceFirestoreSchema)
});
var firestoreFinancialPropertiesFields = {
  ...commonFinancialPropertiesFields,
  // Override date fields with timestamp
  next_invoice: timestampSchema.nullable(),
  last_invoice: timestampSchema.nullable()
};
var financialPropertiesFirestoreSchema = z8.object({
  ...firestoreFinancialPropertiesFields,
  pricing_strategies: z8.object({
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
  name: z8.string(),
  description: z8.string().nullable(),
  type: z8.enum(["partner", "consumer"]),
  partner: partnerRefNullable,
  package_prices: z8.array(packagePriceFirestoreSchema)
});
var partnerRefFieldMappings = [
  { app: "parent", firestore: "parent", collection: PARTNER_COLLECTION, nullable: true },
  { app: "users", firestore: "users", collection: USER_COLLECTION, isArray: true, nullable: true }
];
var partnerDateFieldMappings = [];
var nestedFieldMappings = [
  // Financial properties nested timestamps
  {
    path: ["financial_properties", "next_invoice"],
    type: "timestamp",
    nullable: true
  },
  {
    path: ["financial_properties", "last_invoice"],
    type: "timestamp",
    nullable: true
  },
  // Financial properties nested package references in pricing strategies
  {
    path: ["financial_properties", "pricing_strategies", "partner", "custom_prices", "*", "package"],
    type: "reference",
    collection: PACKAGE_COLLECTION,
    wildcardIndex: 4
  },
  {
    path: ["financial_properties", "pricing_strategies", "user", "custom_prices", "*", "package"],
    type: "reference",
    collection: PACKAGE_COLLECTION,
    wildcardIndex: 4
  },
  // Price list references in pricing strategies
  {
    path: ["financial_properties", "pricing_strategies", "partner", "default_price_list"],
    type: "reference",
    collection: PRICE_LIST_COLLECTION,
    nullable: true
  },
  {
    path: ["financial_properties", "pricing_strategies", "user", "default_price_list"],
    type: "reference",
    collection: PRICE_LIST_COLLECTION,
    nullable: true
  }
];
var partnerToFirestore = (partner) => {
  const result = genericToFirestore({
    appObject: partner,
    refFieldMappings: partnerRefFieldMappings,
    dateFieldMappings: partnerDateFieldMappings,
    nestedFieldMappings
  });
  return result;
};
var partnerFromFirestore = (firestorePartner) => {
  const result = genericFromFirestore({
    firestoreObject: firestorePartner,
    refFieldMappings: partnerRefFieldMappings,
    dateFieldMappings: partnerDateFieldMappings,
    nestedFieldMappings
  });
  return result;
};

// src/schemas/base/api.ts
import { z as z10 } from "zod";

// src/schemas/base/booking.ts
import { z as z9 } from "zod";
var communicationChannelSchema = z9.enum([
  "EMAIL",
  "WHATSAPP",
  "PUSH_NOTIFICATION",
  "SMS"
]);
var communicationOptionsSchema = z9.object({
  should_send_message: z9.boolean(),
  channels: z9.array(communicationChannelSchema)
});
var bookingStatusSchema = z9.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: z9.string().nullable(),
  first_name: z9.string(),
  last_name: z9.string(),
  full_name: z9.string(),
  pax: z9.number(),
  email: z9.string().email().nullable(),
  phone: z9.string().nullable(),
  booking_id: z9.string().nullable(),
  flight_number: z9.string().optional(),
  gender: z9.enum(["M", "F", "O"]).optional(),
  package_size: z9.string().optional(),
  sent_messages: z9.record(z9.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: z9.object({
    source: z9.string(),
    manual: z9.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z9.boolean(),
  is_pseudonymized: z9.boolean(),
  import_id: z9.string().nullable().optional(),
  package_specifications: z9.record(z9.any()).optional()
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

// src/schemas/base/api.ts
var packageSpecificationSchema = z10.object({
  destination: z10.string().optional(),
  size: z10.string().optional(),
  package_id: z10.string().optional(),
  iata_code: z10.string().optional()
});
var packageSpecificationsSchema = z10.array(packageSpecificationSchema);
var bookingApiResponseSchema = z10.object({
  id: z10.string(),
  title: z10.string().nullable(),
  first_name: z10.string(),
  last_name: z10.string(),
  full_name: z10.string(),
  pax: z10.number(),
  email: z10.string().nullable(),
  phone: z10.string().nullable(),
  booking_id: z10.string().nullable(),
  return_date: z10.string().nullable(),
  // ISO string
  partner: z10.string(),
  // ID string
  promo_codes: z10.array(z10.string()),
  // Array of ID strings
  departure_date: z10.string(),
  // ISO string
  flight_number: z10.string().optional(),
  gender: z10.enum(["M", "F", "O"]).optional(),
  package_size: z10.string().optional(),
  sent_messages: z10.record(z10.any()).optional(),
  users: z10.array(z10.string()),
  // Array of ID strings
  esims: z10.array(z10.string()).nullable(),
  // Array of ID strings or null
  locale: z10.string(),
  status: z10.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z10.object({
    source: z10.string(),
    manual: z10.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z10.boolean(),
  is_pseudonymized: z10.boolean(),
  import_id: z10.string().nullable().optional(),
  created_at: z10.string(),
  // ISO string
  updated_at: z10.string(),
  // ISO string
  created_by: z10.string().optional(),
  updated_by: z10.string().optional()
});
var promoCodeApiResponseSchema = z10.object({
  promo_code: z10.string(),
  package_id: z10.string(),
  package_size: z10.string(),
  destination: z10.string()
});
var bookingApiRequestSchema = z10.object({
  id: z10.string(),
  title: z10.string().nullable(),
  first_name: z10.string().nullable().optional(),
  last_name: z10.string().nullable().optional(),
  full_name: z10.string().nullable().optional(),
  pax: z10.number().int().min(1).nullable().optional(),
  email: z10.string().nullable().optional(),
  phone: z10.string().nullable().optional(),
  booking_id: z10.string().min(3).nullable().optional(),
  return_date: zDateString().nullable(),
  // Must be after departure_date
  departure_date: zDateString(),
  // ISO 8601 date string
  flight_number: z10.string().nullable().optional(),
  gender: z10.enum(["M", "F", "O"]).optional(),
  package_size: z10.string().optional(),
  sent_messages: z10.record(z10.any()).optional(),
  locale: z10.string().min(2).max(5).optional(),
  status: z10.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z10.object({
    source: z10.string(),
    manual: z10.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z10.boolean(),
  is_pseudonymized: z10.boolean(),
  date_of_birth: zDateString().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: zDateString(),
  updated_at: zDateString()
});
var partnerApiRequestSchema = z10.object({
  id: z10.string(),
  name: z10.string().nullable(),
  type: z10.string().nullable(),
  is_active: z10.boolean().nullable().optional(),
  external_id: z10.string().nullable().optional(),
  parent: z10.string().nullable(),
  // String ID
  contact: z10.object({
    email: z10.string().nullable(),
    office_phone: z10.string().nullable().optional()
  }).nullable(),
  address: z10.object({
    street: z10.string().optional(),
    city: z10.string().optional(),
    postal_code: z10.string().optional(),
    country: z10.string().optional()
  }).nullable().optional(),
  registration: z10.object({
    chamber_of_commerce_number: z10.string().nullable().optional(),
    vat_number: z10.string().nullable().optional(),
    anvr_number: z10.number().nullable().optional(),
    tax_number: z10.string().nullable().optional()
  }).nullable().optional(),
  banking_details: z10.object({
    account_holder: z10.string(),
    bank_name: z10.string(),
    iban: z10.string()
  }).nullable().optional(),
  finance: z10.object({
    administration_fee: z10.number().nullable(),
    income_per_gb: z10.number().nullable(),
    commission_fee: z10.number().optional(),
    payment_method: z10.enum(["invoice", "direct"]),
    requires_card: z10.boolean().nullable(),
    next_invoice: zDateString().nullable(),
    last_invoice: zDateString().nullable(),
    pricing_strategies: z10.object({
      partner: z10.object({
        strategy: z10.enum(["split", "bundle"]),
        default_price_list: z10.string().nullable(),
        custom_prices: z10.array(z10.any()),
        modification_percentage: z10.number()
      }),
      user: z10.object({
        default_price_list: z10.string().nullable(),
        custom_prices: z10.array(z10.any()),
        modification_percentage: z10.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: z10.any().optional(),
  visual_identity: z10.any().nullable(),
  users: z10.array(z10.string()).nullable(),
  // Array of string IDs
  data: z10.object({
    source: z10.string(),
    manual: z10.boolean()
  }).optional(),
  created_at: zDateString(),
  updated_at: zDateString(),
  created_by: z10.string().nullable(),
  updated_by: z10.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/firebase/user.ts
import { z as z12 } from "zod";
import { FieldValue as FieldValue3 } from "firebase-admin/firestore";

// src/schemas/base/user.ts
import { z as z11 } from "zod";
var apiKeySchema = z11.object({
  expires_at: zDateString(),
  secret: z11.string(),
  is_active: z11.boolean()
});
var apiKeysSchema = z11.object({
  allowed_keys: z11.array(z11.string()),
  keys: z11.record(z11.string(), apiKeySchema)
});
var commonUserFields = {
  name: z11.string().nullable(),
  email: z11.string().email().nullable(),
  stripe_id: z11.string().nullable(),
  referral: z11.string().nullable(),
  fcm: z11.string().optional(),
  deeplink: z11.string().nullable(),
  gender: z11.string().nullable(),
  company: z11.string().nullable(),
  coordinates: z11.string().nullable(),
  parameters: z11.any().nullable(),
  locale: z11.string().nullable(),
  phone_model: z11.string().nullable(),
  phone_os: z11.string().nullable(),
  phone_os_version: z11.string().nullable(),
  ios: z11.boolean().nullable(),
  has_card_saved: z11.boolean().nullable(),
  admin: z11.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: z11.string().nullable(),
  receipt_email: z11.string().nullable()
};
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: zDateString(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: z11.number().nullable(),
  review_requested: zDateString().nullable().optional(),
  last_seen: zDateString().nullable().optional()
});

// src/schemas/firebase/user.ts
var apiKeySchema2 = z12.object({
  expires_at: timestampSchema,
  secret: z12.string(),
  is_active: z12.boolean()
});
var apiKeysSchema2 = z12.object({
  allowed_keys: z12.array(z12.string()),
  keys: z12.record(z12.string(), apiKeySchema2)
});
var userFirestoreSchema = baseModelSchema.extend({
  ...commonUserFields,
  createdAt: timestampSchema,
  partner: partnerRefNullable,
  profileRef: profileRefNullable,
  balance: z12.union([z12.number(), z12.null(), fieldValueSchema]),
  review_requested: timestampSchema.nullable().optional(),
  last_seen: timestampSchema.nullable().optional(),
  api_keys: apiKeysSchema2.nullable().optional()
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
var nestedFieldMappings2 = [
  // API Keys nested timestamps
  {
    path: ["api_keys", "keys", "*", "expires_at"],
    type: "timestamp",
    nullable: true,
    wildcardIndex: 2
  },
  // Optional conversions for parameters field - only apply if needed
  // Parameters nested timestamps - for example, if storing login timestamps
  {
    path: ["parameters", "timestamps", "lastLogin"],
    type: "timestamp",
    nullable: true
  },
  {
    path: ["parameters", "timestamps", "accountCreated"],
    type: "timestamp",
    nullable: true
  },
  // Parameters nested partner references
  {
    path: ["parameters", "relationships", "primaryPartner"],
    type: "reference",
    collection: PARTNER_COLLECTION,
    nullable: true
  },
  {
    path: ["parameters", "relationships", "otherPartners"],
    type: "reference",
    collection: PARTNER_COLLECTION,
    nullable: true,
    arrayField: true
  }
];
var userToFirestore = (user) => {
  const result = genericToFirestore({
    appObject: user,
    refFieldMappings,
    dateFieldMappings,
    nestedFieldMappings: nestedFieldMappings2
  });
  return result;
};
var userFromFirestore = (firestoreUser) => {
  const result = genericFromFirestore({
    firestoreObject: firestoreUser,
    refFieldMappings,
    dateFieldMappings,
    nestedFieldMappings: nestedFieldMappings2,
    specialCaseHandler: (result2, firestoreData) => {
      if (firestoreData.balance instanceof FieldValue3) {
        result2.balance = null;
      }
    }
  });
  return result;
};

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

// src/schemas/base/country.ts
import { z as z13 } from "zod";
var countryAppSchema = z13.object({
  id: z13.string().nullable(),
  bokun_id: z13.number().nullable(),
  LTE: z13.boolean().nullable(),
  apn: z13.string().nullable(),
  click_count: z13.number().nullable(),
  global_network: z13.string().nullable(),
  global_price: z13.number().nullable(),
  hubby: z13.number().nullable(),
  imsi: z13.number().nullable(),
  has_esim: z13.boolean(),
  name: z13.string().nullable(),
  region: z13.boolean().nullable(),
  is_region: z13.boolean().nullable(),
  countries: z13.array(z13.string()).nullable(),
  tier: z13.number().nullable()
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
import { z as z15 } from "zod";

// src/schemas/base/package.ts
import { z as z14 } from "zod";
var commonPackageFields = {
  external_id: z14.string(),
  provider: z14.string(),
  coverage_label: z14.string().nullable(),
  label: z14.string(),
  bytes: z14.number(),
  hidden: z14.boolean(),
  is_hidden: z14.boolean(),
  is_active: z14.boolean(),
  priority: z14.number(),
  country_data: countryAppSchema.nullable(),
  price: z14.number(),
  partner_price: z14.number(),
  days: z14.number(),
  name: z14.string(),
  type: z14.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z14.number().optional(),
  provider_parameters: z14.object({
    imsi: z14.number()
  }).nullable()
};
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
});

// src/schemas/firebase/package.ts
var commonPackageFields2 = {
  external_id: z15.string(),
  provider: z15.string(),
  coverage_label: z15.string().nullable(),
  label: z15.string(),
  bytes: z15.number(),
  hidden: z15.boolean(),
  is_hidden: z15.boolean(),
  is_active: z15.boolean(),
  priority: z15.number(),
  country_data: countryFirestoreSchema.nullable(),
  price: z15.number(),
  partner_price: z15.number(),
  days: z15.number(),
  name: z15.string(),
  type: z15.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z15.number().optional(),
  provider_parameters: z15.object({
    imsi: z15.number()
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
import { z as z17 } from "zod";

// src/schemas/base/promoCode.ts
import { z as z16 } from "zod";
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: z16.string(),
  code: z16.string(),
  allowance_user: z16.number(),
  allowance_total: z16.number(),
  type: z16.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z16.string()),
  usage: z16.array(z16.string()),
  uuid_usage: z16.array(z16.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: zDateString(),
  valid_to: zDateString(),
  // Optional fields based on the type
  discount: z16.number().optional(),
  package_size: z16.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: z16.array(z16.string()).optional(),
  max_bytes: z16.number().optional(),
  starter_data: z16.number().optional()
});

// src/schemas/firebase/promoCode.ts
var promoCodeFirestoreSchema = baseModelSchema.extend({
  external_id: z17.string(),
  code: z17.string(),
  allowance_user: z17.number(),
  allowance_total: z17.number(),
  type: z17.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z17.string()),
  usage: z17.array(z17.string()),
  uuid_usage: z17.array(z17.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefNullable,
  valid_from: z17.union([z17.string(), z17.date(), timestampSchema]),
  valid_to: z17.union([z17.string(), z17.date(), timestampSchema]),
  // Optional fields based on the type
  discount: z17.number().optional(),
  package_size: z17.string().optional(),
  package: packageRefNullable,
  country: countryRefNullable,
  booking: bookingRefNullable,
  countries: z17.array(z17.string()).optional(),
  max_bytes: z17.number().optional(),
  starter_data: z17.number().optional()
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
import { z as z18 } from "zod";
var commonESIMFields = {
  imsi: z18.number(),
  qr: z18.string(),
  iccid: z18.string(),
  provider: z18.string(),
  coverage_label: z18.string().nullable().optional(),
  total_data: z18.number().nullable(),
  data_left: z18.number().nullable(),
  data_used: z18.boolean().nullable(),
  status: z18.string().nullable(),
  name: z18.string(),
  android_auto: z18.boolean(),
  partner_price: z18.number().nullable(),
  promo: z18.string().nullable(),
  type: z18.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: z18.boolean(),
  is_archived: z18.boolean(),
  user: z18.string().nullable(),
  payment: z18.string().nullable(),
  apn: z18.string().nullable()
};
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: z18.string().nullable(),
  time_assigned: zDateString().nullable(),
  last_updated: zDateString().nullable(),
  partner: z18.string().nullable()
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
import { z as z20 } from "zod";

// src/schemas/base/payment.ts
import { z as z19 } from "zod";
var paymentAppSchema = baseModelAppSchema.extend({
  amount: z19.number(),
  customer: z19.string(),
  date: zDateString(),
  iccid: z19.string(),
  package: z19.string(),
  promo: z19.string(),
  topup: z19.boolean()
});

// src/schemas/firebase/payment.ts
var paymentFirestoreSchema = baseModelSchema.extend({
  amount: z20.number(),
  customer: z20.string(),
  date: timestampSchema,
  // In Firestore this is a Timestamp
  iccid: z20.string(),
  package: z20.string(),
  promo: z20.string(),
  topup: z20.boolean()
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
import { z as z22 } from "zod";
import { Timestamp as Timestamp4 } from "firebase-admin/firestore";

// src/schemas/base/message.ts
import { z as z21 } from "zod";
var messageAppSchema = z21.object({
  id: z21.string(),
  key: z21.string(),
  method: z21.enum(["push", "sms", "email"]),
  status: z21.enum(["pending", "sent", "failed", "delivered"]),
  created_at: zDateString(),
  updated_at: zDateString()
});
var sentMessagesAppSchema = z21.record(messageAppSchema);

// src/schemas/firebase/message.ts
var messageFirestoreSchema = z22.object({
  id: z22.string(),
  key: z22.string(),
  method: z22.enum(["push", "sms", "email"]),
  status: z22.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampSchema,
  updated_at: timestampSchema
});
var sentMessagesFirestoreSchema = z22.record(messageFirestoreSchema);
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
import { z as z23 } from "zod";
var conversionRateSchema = z23.object({
  currency: z23.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: z23.string(),
  symbol: z23.string(),
  name: z23.string(),
  rate: z23.number(),
  is_default: z23.boolean()
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
import { z as z25 } from "zod";

// src/schemas/base/apiLogs.ts
import { z as z24 } from "zod";
var apiLogAppSchema = z24.object({
  id: z24.string().optional(),
  method: z24.string(),
  user_id: z24.string().optional(),
  path: z24.string(),
  resource_type: z24.string().optional(),
  resource_id: z24.string().optional(),
  partner_id: z24.string().optional(),
  payload: z24.record(z24.unknown()).optional(),
  timestamp: zDateString(),
  status_code: z24.number()
});

// src/schemas/firebase/apiLogs.ts
var apiLogFirestoreSchema = z25.object({
  id: z25.string().optional(),
  method: z25.string(),
  user_id: z25.string().optional(),
  path: z25.string(),
  resource_type: z25.string().optional(),
  resource_id: z25.string().optional(),
  partner_id: z25.string().optional(),
  payload: z25.record(z25.unknown()).optional(),
  timestamp: timestampSchema,
  status_code: z25.number()
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
  packageSpecificationSchema as apiPackageSpecificationSchema,
  packageSpecificationsSchema as apiPackageSpecificationsSchema,
  baseModelAppSchema,
  baseModelSchema,
  bookingApiRequestSchema,
  bookingApiResponseSchema,
  bookingFromFirestore,
  bookingRefArray,
  bookingRefArrayNullable,
  bookingRefNullable,
  bookingRefSchema,
  bookingRefString,
  bookingRefStringArray,
  bookingRefStringArrayNullable,
  bookingRefStringNullable,
  bookingToFirestore,
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
  currencyFromFirestore,
  currencyRefArray,
  currencyRefNullable,
  currencyRefSchema,
  currencyRefString,
  currencyRefStringArrayNullable,
  currencyToFirestore,
  docRefToStringSchema,
  documentRefSchema,
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
  fromFirestore,
  getFirestoreInstance,
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
  packageFromFirestore,
  packageRefArray,
  packageRefArrayNullable,
  packageRefNullable,
  packageRefSchema,
  packageRefString,
  packageRefStringArray,
  packageRefStringArrayNullable,
  packageRefStringNullable,
  packageToFirestore,
  partnerApiRequestSchema,
  partnerApiResponseSchema,
  partnerAppSchema,
  partnerFirestoreSchema,
  partnerFromFirestore,
  partnerRefArray,
  partnerRefArrayNullable,
  partnerRefNullable,
  partnerRefSchema,
  partnerRefString,
  partnerRefStringArray,
  partnerRefStringArrayNullable,
  partnerRefStringNullable,
  partnerToFirestore,
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
  priceListRefArray,
  priceListRefArrayNullable,
  priceListRefNullable,
  priceListRefSchema,
  priceListRefString,
  priceListRefStringArray,
  priceListRefStringArrayNullable,
  priceListRefStringNullable,
  profileRefArray,
  profileRefArrayNullable,
  profileRefNullable,
  profileRefSchema,
  profileRefString,
  profileRefStringArray,
  profileRefStringArrayNullable,
  profileRefStringNullable,
  promoCodeApiResponseSchema,
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
  sentMessagesFromFirestore,
  sentMessagesToFirestore,
  setFirestoreInstance,
  supportedLocalesSchema,
  timestampSchema,
  toFirestore,
  userFromFirestore,
  userRefArray,
  userRefArrayNullable,
  userRefNullable,
  userRefSchema,
  userRefString,
  userRefStringArray,
  userRefStringArrayNullable,
  userRefStringNullable,
  userToFirestore
};
//# sourceMappingURL=index.js.map