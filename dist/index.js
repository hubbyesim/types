// src/schemas/api.ts
import { z as z5 } from "zod";

// src/schemas/booking.ts
import { z as z4 } from "zod";

// src/schemas/helpers.ts
import { z } from "zod";

// src/schemas/utils/firestoreProvider.ts
function isTimestamp(value) {
  return value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function" && "seconds" in value && "nanoseconds" in value;
}
function isDocumentReference(value) {
  return value && typeof value === "object" && "id" in value && "path" in value;
}
function isFieldValue(value) {
  return value && typeof value === "object" && "isEqual" in value && typeof value.isEqual === "function";
}

// src/schemas/helpers.ts
var testEnv = { isTestEnvironment: false };
var MockDocumentReference = class {
  path;
  id;
  constructor(collectionPath, id) {
    this.path = `${collectionPath}/${id}`;
    this.id = id;
  }
};
var timestampSchema = z.custom(
  (val) => isTimestamp(val)
);
var documentRefSchema = z.custom(
  (val) => isDocumentReference(val)
);
var fieldValueSchema = z.custom(
  (val) => isFieldValue(val)
);
var createFirestoreHelpers = (firestore) => ({
  toFirestore: {
    date: (date) => firestore.Timestamp.fromDate(date),
    ref: (collectionPath, id) => {
      if (testEnv.isTestEnvironment) {
        return new MockDocumentReference(collectionPath, id);
      }
      return firestore.doc(`${collectionPath}/${id}`);
    },
    serverTimestamp: () => firestore.FieldValue.serverTimestamp()
  },
  fromFirestore: {
    date: (timestamp) => timestamp.toDate(),
    ref: (docRef) => {
      if (docRef instanceof MockDocumentReference) {
        return docRef.id;
      }
      return docRef.id;
    }
  }
});
var toFirestore = {
  date: (date) => {
    throw new Error("Please use createFirestoreHelpers(firestore).toFirestore.date() instead");
  },
  ref: (collectionPath, id) => {
    if (testEnv.isTestEnvironment) {
      return new MockDocumentReference(collectionPath, id);
    }
    throw new Error("Please use createFirestoreHelpers(firestore).toFirestore.ref() instead");
  }
};
var fromFirestore = {
  date: (timestamp) => {
    if (isTimestamp(timestamp)) {
      return timestamp.toDate();
    }
    throw new Error("Invalid timestamp object");
  },
  ref: (docRef) => {
    if (docRef instanceof MockDocumentReference) {
      return docRef.id;
    }
    if (isDocumentReference(docRef)) {
      return docRef.id;
    }
    throw new Error("Invalid document reference");
  }
};
var baseModelSchema = z.object({
  id: z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
  created_by: z.union([z.string(), z.null(), documentRefSchema]),
  updated_by: z.union([z.string(), z.null(), documentRefSchema])
});
var baseModelAppSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  created_by: z.union([z.string(), z.null()]),
  updated_by: z.union([z.string(), z.null()])
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
  return z.string().describe(`ID from ${docRefSchema.collectionPath}`);
};

// src/schemas/utils.ts
var convertToDate = (value) => {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  if (isTimestamp(value)) {
    return value.toDate();
  }
  throw new Error(`Unable to convert value to Date: ${value}`);
};
var isDate = (value) => {
  return value instanceof Date;
};
function genericToFirestore({
  appObject,
  refFieldMappings: refFieldMappings7,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler,
  firestore
}) {
  const result = {};
  const { toFirestore: toFirestore10 } = firestore ? createFirestoreHelpers(firestore) : { toFirestore: null };
  const refFieldNames = refFieldMappings7.map((mapping) => mapping.app);
  Object.keys(appObject).forEach((key) => {
    if (!refFieldNames.includes(key)) {
      result[key] = appObject[key];
    }
  });
  if ("created_at" in appObject && isDate(appObject.created_at)) {
    result.created_at = toFirestore10 ? toFirestore10.date(appObject.created_at) : appObject.created_at;
  }
  if ("updated_at" in appObject && isDate(appObject.updated_at)) {
    result.updated_at = toFirestore10 ? toFirestore10.date(appObject.updated_at) : appObject.updated_at;
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
      result[field] = toFirestore10 ? toFirestore10.date(value) : value;
    }
  });
  refFieldMappings7.forEach(({ app, firestore: firestoreField, collection, isArray, nullable }) => {
    const value = appObject[app];
    if (isArray) {
      if (nullable && value === null) {
        result[firestoreField] = null;
      } else if (Array.isArray(value)) {
        if (toFirestore10) {
          result[firestoreField] = value.map((id) => toFirestore10.ref(collection, id));
        } else {
          result[firestoreField] = value;
        }
      }
    } else {
      if (nullable && value === null) {
        result[firestoreField] = null;
      } else if (typeof value === "string") {
        if (toFirestore10) {
          result[firestoreField] = toFirestore10.ref(collection, value);
        } else {
          result[firestoreField] = value;
        }
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
  refFieldMappings: refFieldMappings7,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler,
  firestore
}) {
  const result = {};
  const { fromFirestore: fromFirestore10 } = firestore ? createFirestoreHelpers(firestore) : { fromFirestore: null };
  const refFieldNames = refFieldMappings7.map((mapping) => mapping.firestore);
  Object.keys(firestoreObject).forEach((key) => {
    if (!refFieldNames.includes(key)) {
      result[key] = firestoreObject[key];
    }
  });
  if ("created_at" in firestoreObject) {
    const createdAt = firestoreObject.created_at;
    result.created_at = isTimestamp(createdAt) ? createdAt.toDate() : createdAt instanceof Date ? createdAt : /* @__PURE__ */ new Date();
  }
  if ("updated_at" in firestoreObject) {
    const updatedAt = firestoreObject.updated_at;
    result.updated_at = isTimestamp(updatedAt) ? updatedAt.toDate() : updatedAt instanceof Date ? updatedAt : /* @__PURE__ */ new Date();
  }
  if ("created_by" in firestoreObject) {
    const createdBy = firestoreObject.created_by;
    if (typeof createdBy === "string") {
      result.created_by = createdBy;
    } else if (createdBy && "id" in createdBy && typeof createdBy.id === "string") {
      result.created_by = createdBy.id;
    } else {
      result.created_by = null;
    }
  }
  if ("updated_by" in firestoreObject) {
    const updatedBy = firestoreObject.updated_by;
    if (typeof updatedBy === "string") {
      result.updated_by = updatedBy;
    } else if (updatedBy && "id" in updatedBy && typeof updatedBy.id === "string") {
      result.updated_by = updatedBy.id;
    } else {
      result.updated_by = null;
    }
  }
  dateFieldMappings9.forEach(({ field, nullable }) => {
    const value = firestoreObject[field];
    if (nullable && value === null) {
      result[field] = null;
    } else {
      try {
        result[field] = convertToDate(value);
      } catch (error) {
        console.warn(`Failed to convert field ${String(field)} to Date: ${error}`);
        result[field] = value;
      }
    }
  });
  refFieldMappings7.forEach(({ app, firestore: firestoreField, nullable, isArray }) => {
    const value = firestoreObject[firestoreField];
    if (isArray) {
      if (nullable && value === null) {
        result[app] = null;
      } else if (Array.isArray(value)) {
        result[app] = value.map((ref) => {
          if (typeof ref === "string")
            return ref;
          return ref && "id" in ref ? ref.id : null;
        }).filter(Boolean);
      }
    } else {
      if (nullable && value === null) {
        result[app] = null;
      } else if (value) {
        if (typeof value === "string") {
          result[app] = value;
        } else if ("id" in value && typeof value.id === "string") {
          result[app] = value.id;
        } else {
          result[app] = null;
        }
      }
    }
  });
  if (specialCaseHandler) {
    specialCaseHandler(result, firestoreObject);
  }
  return result;
}

// src/schemas/refs.ts
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
var partnerRefString = docRefToStringSchema(partnerRefSchema);
var userRefString = docRefToStringSchema(userRefSchema);
var profileRefString = docRefToStringSchema(profileRefSchema);
var packageRefString = docRefToStringSchema(packageRefSchema);
var promoCodeRefString = docRefToStringSchema(promoCodeRefSchema);
var countryRefString = docRefToStringSchema(countryRefSchema);
var esimRefString = docRefToStringSchema(esimRefSchema);
var paymentRefString = docRefToStringSchema(paymentRefSchema);
var priceListRefString = docRefToStringSchema(priceListRefSchema);
var bookingRefString = docRefToStringSchema(bookingRefSchema);
var messageRefString = docRefToStringSchema(messageRefSchema);
var currencyRefString = docRefToStringSchema(currencyRefSchema);
var apiLogRefString = docRefToStringSchema(apiLogRefSchema);
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
var partnerRefArray = z2.array(partnerRefSchema.schema);
var userRefArray = z2.array(userRefSchema.schema);
var profileRefArray = z2.array(profileRefSchema.schema);
var packageRefArray = z2.array(packageRefSchema.schema);
var promoCodeRefArray = z2.array(promoCodeRefSchema.schema);
var countryRefArray = z2.array(countryRefSchema.schema);
var esimRefArray = z2.array(esimRefSchema.schema);
var paymentRefArray = z2.array(paymentRefSchema.schema);
var priceListRefArray = z2.array(priceListRefSchema.schema);
var bookingRefArray = z2.array(bookingRefSchema.schema);
var messageRefArray = z2.array(messageRefSchema.schema);
var currencyRefArray = z2.array(currencyRefSchema.schema);
var apiLogRefArray = z2.array(apiLogRefSchema.schema);
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

// src/constants.ts
import { z as z3 } from "zod";
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
var supportedLocalesSchema = z3.enum(SUPPORTED_LOCALES);

// src/schemas/booking.ts
var communicationChannelSchema = z4.enum([
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
var communicationOptionsSchema = z4.object({
  should_send_message: z4.boolean(),
  channels: z4.array(communicationChannelSchema)
});
var bookingStatusSchema = z4.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: z4.string().nullable(),
  first_name: z4.string(),
  last_name: z4.string(),
  full_name: z4.string(),
  pax: z4.number(),
  email: z4.string().email().nullable(),
  phone: z4.string().nullable(),
  booking_id: z4.string().nullable(),
  flight_number: z4.string().optional(),
  gender: z4.enum(["M", "F", "O"]).optional(),
  package_size: z4.string().optional(),
  sent_messages: z4.record(z4.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: z4.object({
    source: z4.string(),
    manual: z4.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z4.boolean(),
  is_pseudonymized: z4.boolean(),
  import_id: z4.string().nullable().optional(),
  package_specifications: z4.record(z4.any()).optional()
};
var bookingFirestoreSchema = baseModelSchema.extend({
  ...commonBookingFields,
  return_date: timestampSchema.nullable(),
  departure_date: timestampSchema,
  partner: partnerRefSchema.schema,
  promo_codes: promoCodeRefArray,
  users: userRefArrayNullable,
  esims: esimRefArrayNullable
});
var bookingAppSchema = baseModelAppSchema.extend({
  ...commonBookingFields,
  return_date: z4.date().nullable(),
  departure_date: z4.date(),
  partner: partnerRefString,
  promo_codes: promoCodeRefStringArray,
  users: userRefStringArrayNullable,
  esims: esimRefStringArrayNullable
});
var refFieldMappings = [
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION },
  { app: "promo_codes", firestore: "promo_codes", collection: PROMO_CODE_COLLECTION, isArray: true },
  { app: "users", firestore: "users", collection: USER_COLLECTION, isArray: true, nullable: true },
  { app: "esims", firestore: "esims", collection: ESIM_COLLECTION, isArray: true, nullable: true }
];
var dateFieldMappings = [
  { field: "return_date", nullable: true },
  { field: "departure_date" }
];
var bookingToFirestore = (booking, firestore) => {
  return genericToFirestore({
    appObject: booking,
    refFieldMappings,
    dateFieldMappings,
    firestore
  });
};
var bookingFromFirestore = (firestoreBooking, firestore) => {
  return genericFromFirestore({
    firestoreObject: firestoreBooking,
    refFieldMappings,
    dateFieldMappings,
    firestore
  });
};

// src/schemas/api.ts
var packageSpecificationSchema = z5.object({
  destination: z5.string().optional(),
  size: z5.string().optional(),
  package_id: z5.string().optional(),
  iata_code: z5.string().optional()
});
var packageSpecificationsSchema = z5.array(packageSpecificationSchema);
var bookingApiResponseSchema = z5.object({
  id: z5.string(),
  title: z5.string().nullable(),
  first_name: z5.string(),
  last_name: z5.string(),
  full_name: z5.string(),
  pax: z5.number(),
  email: z5.string().nullable(),
  phone: z5.string().nullable(),
  booking_id: z5.string().nullable(),
  return_date: z5.string().nullable(),
  // ISO string
  partner: z5.string(),
  // DocumentReference id
  promo_codes: z5.array(z5.string()),
  // Array of DocumentReference ids
  departure_date: z5.string(),
  // ISO string
  flight_number: z5.string().optional(),
  gender: z5.enum(["M", "F", "O"]).optional(),
  package_size: z5.string().optional(),
  sent_messages: z5.record(z5.any()).optional(),
  users: z5.array(z5.string()),
  // Array of DocumentReference ids
  esims: z5.array(z5.string()).nullable(),
  // Array of DocumentReference ids or null
  locale: z5.string(),
  status: z5.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z5.object({
    source: z5.string(),
    manual: z5.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z5.boolean(),
  is_pseudonymized: z5.boolean(),
  import_id: z5.string().nullable().optional(),
  created_at: z5.string(),
  // ISO string
  updated_at: z5.string(),
  // ISO string
  created_by: z5.string().optional(),
  updated_by: z5.string().optional()
});
var promoCodeApiResponseSchema = z5.object({
  promo_code: z5.string(),
  package_id: z5.string(),
  package_size: z5.string(),
  destination: z5.string()
});
var bookingApiRequestSchema = z5.object({
  id: z5.string(),
  title: z5.string().nullable(),
  first_name: z5.string().nullable().optional(),
  last_name: z5.string().nullable().optional(),
  full_name: z5.string().nullable().optional(),
  pax: z5.number().int().min(1).nullable().optional(),
  email: z5.string().nullable().optional(),
  phone: z5.string().nullable().optional(),
  booking_id: z5.string().min(3).nullable().optional(),
  return_date: z5.date().nullable(),
  // Must be after departure_date
  departure_date: z5.date(),
  // ISO 8601 date string
  flight_number: z5.string().nullable().optional(),
  gender: z5.enum(["M", "F", "O"]).optional(),
  package_size: z5.string().optional(),
  sent_messages: z5.record(z5.any()).optional(),
  locale: z5.string().min(2).max(5).optional(),
  status: z5.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: z5.object({
    source: z5.string(),
    manual: z5.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: z5.boolean(),
  is_pseudonymized: z5.boolean(),
  date_of_birth: z5.date().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: z5.date(),
  updated_at: z5.date()
});
var partnerApiRequestSchema = z5.object({
  id: z5.string(),
  name: z5.string().nullable(),
  type: z5.string().nullable(),
  is_active: z5.boolean().nullable().optional(),
  external_id: z5.string().nullable().optional(),
  parent: z5.string().nullable(),
  // Previously DocumentReference
  contact: z5.object({
    email: z5.string().nullable(),
    office_phone: z5.string().nullable().optional()
  }).nullable(),
  address: z5.object({
    street: z5.string().optional(),
    city: z5.string().optional(),
    postal_code: z5.string().optional(),
    country: z5.string().optional()
  }).nullable().optional(),
  registration: z5.object({
    chamber_of_commerce_number: z5.string().nullable().optional(),
    vat_number: z5.string().nullable().optional(),
    anvr_number: z5.number().nullable().optional(),
    tax_number: z5.string().nullable().optional()
  }).nullable().optional(),
  banking_details: z5.object({
    account_holder: z5.string(),
    bank_name: z5.string(),
    iban: z5.string()
  }).nullable().optional(),
  finance: z5.object({
    administration_fee: z5.number().nullable(),
    income_per_gb: z5.number().nullable(),
    commission_fee: z5.number().optional(),
    payment_method: z5.enum(["invoice", "direct"]),
    requires_card: z5.boolean().nullable(),
    next_invoice: z5.date().nullable(),
    // Previously Timestamp
    last_invoice: z5.date().nullable(),
    // Previously Timestamp
    pricing_strategies: z5.object({
      partner: z5.object({
        strategy: z5.enum(["split", "bundle"]),
        default_price_list: z5.string().nullable(),
        custom_prices: z5.array(z5.any()),
        modification_percentage: z5.number()
      }),
      user: z5.object({
        default_price_list: z5.string().nullable(),
        custom_prices: z5.array(z5.any()),
        modification_percentage: z5.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: z5.any().optional(),
  visual_identity: z5.any().nullable(),
  users: z5.array(z5.string()).nullable(),
  // Previously DocumentReference[]
  data: z5.object({
    source: z5.string(),
    manual: z5.boolean()
  }).optional(),
  created_at: z5.date(),
  updated_at: z5.date(),
  created_by: z5.string().nullable(),
  updated_by: z5.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/apiLogs.ts
import { z as z6 } from "zod";
var apiLogFirestoreSchema = z6.object({
  id: z6.string().optional(),
  method: z6.string(),
  user_id: z6.string().optional(),
  path: z6.string(),
  resource_type: z6.string().optional(),
  resource_id: z6.string().optional(),
  partner_id: z6.string().optional(),
  payload: z6.record(z6.unknown()).optional(),
  timestamp: timestampSchema,
  status_code: z6.number()
});
var apiLogAppSchema = z6.object({
  id: z6.string().optional(),
  method: z6.string(),
  user_id: z6.string().optional(),
  path: z6.string(),
  resource_type: z6.string().optional(),
  resource_id: z6.string().optional(),
  partner_id: z6.string().optional(),
  payload: z6.record(z6.unknown()).optional(),
  timestamp: z6.date(),
  status_code: z6.number()
});
var dateFieldMappings2 = [
  { field: "timestamp" }
];
var apiLogToFirestore = (apiLog) => {
  return genericToFirestore({
    appObject: apiLog,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings2
  });
};
var apiLogFromFirestore = (firestoreApiLog) => {
  return genericFromFirestore({
    firestoreObject: firestoreApiLog,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings2
  });
};

// src/schemas/country.ts
import { z as z7 } from "zod";
var countryFirestoreSchema = z7.object({
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
var countryAppSchema = countryFirestoreSchema;
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

// src/schemas/currency.ts
import { z as z8 } from "zod";

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

// src/schemas/currency.ts
var conversionRateSchema = z8.object({
  currency: z8.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: z8.string(),
  symbol: z8.string(),
  name: z8.string(),
  rate: z8.number(),
  is_default: z8.boolean()
};
var currencyFirestoreSchema = documentedObject(
  baseModelSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs
);
var currencyAppSchema = documentedObject(
  baseModelAppSchema.extend({
    ...commonCurrencyFields
  }),
  currencyFieldDocs
);
var dateFieldMappings3 = [];
var currencyToFirestore = (currency) => {
  return genericToFirestore({
    appObject: currency,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings3
  });
};
var currencyFromFirestore = (firestoreCurrency) => {
  return genericFromFirestore({
    firestoreObject: firestoreCurrency,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings3
  });
};

// src/schemas/esim.ts
import { z as z9 } from "zod";
var commonESIMFields = {
  imsi: z9.number(),
  qr: z9.string(),
  iccid: z9.string(),
  provider: z9.string(),
  coverage_label: z9.string().nullable().optional(),
  total_data: z9.number().nullable(),
  data_left: z9.number().nullable(),
  data_used: z9.boolean().nullable(),
  status: z9.string().nullable(),
  name: z9.string(),
  android_auto: z9.boolean(),
  partner_price: z9.number().nullable(),
  promo: z9.string().nullable(),
  type: z9.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: z9.boolean(),
  is_archived: z9.boolean(),
  user: z9.string().nullable(),
  payment: z9.string().nullable(),
  apn: z9.string().nullable()
};
var esimFirestoreSchema = baseModelSchema.extend({
  ...commonESIMFields,
  country: countryRefNullable,
  time_assigned: timestampSchema.nullable(),
  last_updated: timestampSchema.nullable(),
  partner: partnerRefNullable
});
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: z9.string().nullable(),
  time_assigned: z9.date().nullable(),
  last_updated: z9.date().nullable(),
  partner: z9.string().nullable()
});
var refFieldMappings2 = [
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
    refFieldMappings: refFieldMappings2,
    dateFieldMappings: dateFieldMappings4
  });
};
var esimFromFirestore = (firestoreEsim) => {
  return genericFromFirestore({
    firestoreObject: firestoreEsim,
    refFieldMappings: refFieldMappings2,
    dateFieldMappings: dateFieldMappings4
  });
};

// src/schemas/message.ts
import { z as z10 } from "zod";
var messageFirestoreSchema = z10.object({
  id: z10.string(),
  key: z10.string(),
  method: z10.enum(["push", "sms", "email"]),
  status: z10.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampSchema,
  updated_at: timestampSchema
});
var messageAppSchema = z10.object({
  id: z10.string(),
  key: z10.string(),
  method: z10.enum(["push", "sms", "email"]),
  status: z10.enum(["pending", "sent", "failed", "delivered"]),
  created_at: z10.date(),
  updated_at: z10.date()
});
var sentMessagesFirestoreSchema = z10.record(messageFirestoreSchema);
var sentMessagesAppSchema = z10.record(messageAppSchema);
var dateFieldMappings5 = [
  { field: "created_at" },
  { field: "updated_at" }
];
var messageToFirestore = (message, firestore) => {
  return genericToFirestore({
    appObject: message,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5,
    firestore
  });
};
var messageFromFirestore = (firestoreMessage, firestore) => {
  return genericFromFirestore({
    firestoreObject: firestoreMessage,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5,
    firestore
  });
};
var sentMessagesToFirestore = (sentMessages, firestore) => {
  const result = {};
  for (const key in sentMessages) {
    const message = sentMessages[key];
    if (message) {
      result[key] = messageToFirestore(message, firestore);
    }
  }
  return result;
};
var sentMessagesFromFirestore = (firestoreSentMessages, firestore) => {
  const result = {};
  for (const key in firestoreSentMessages) {
    const firestoreMessage = firestoreSentMessages[key];
    if (firestoreMessage) {
      result[key] = messageFromFirestore(firestoreMessage, firestore);
    }
  }
  return result;
};
var convertSentMessagesToFirestore = (sentMessages, firestore) => {
  const result = {};
  const firestoreHelpers = firestore ? createFirestoreHelpers(firestore) : null;
  for (const key in sentMessages) {
    const message = sentMessages[key];
    if (message) {
      const firestoreMessage = {
        ...message,
        created_at: message.created_at instanceof Date && firestoreHelpers ? firestoreHelpers.toFirestore.date(message.created_at) : message.created_at,
        updated_at: message.updated_at instanceof Date && firestoreHelpers ? firestoreHelpers.toFirestore.date(message.updated_at) : message.updated_at
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
        created_at: isTimestamp(firestoreMessage.created_at) ? firestoreMessage.created_at.toDate() : firestoreMessage.created_at,
        updated_at: isTimestamp(firestoreMessage.updated_at) ? firestoreMessage.updated_at.toDate() : firestoreMessage.updated_at
      };
      result[key] = appMessage;
    }
  }
  return result;
};

// src/schemas/package.ts
import { z as z11 } from "zod";
var commonPackageFields = {
  external_id: z11.string(),
  provider: z11.string(),
  coverage_label: z11.string().nullable(),
  label: z11.string(),
  bytes: z11.number(),
  hidden: z11.boolean(),
  is_hidden: z11.boolean(),
  is_active: z11.boolean(),
  priority: z11.number(),
  country_data: countryFirestoreSchema.nullable(),
  price: z11.number(),
  partner_price: z11.number(),
  days: z11.number(),
  name: z11.string(),
  type: z11.enum(["data-limited", "time-limited"]).nullable(),
  throttling: z11.number().optional(),
  provider_parameters: z11.object({
    imsi: z11.number()
  }).nullable()
};
var packageFirestoreSchema = baseModelSchema.extend({
  ...commonPackageFields,
  country: countryRefSchema.schema,
  partner: partnerRefNullable
});
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
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

// src/schemas/partner.ts
import { z as z12 } from "zod";
var addressSchema = z12.object({
  street: z12.string().optional(),
  city: z12.string().optional(),
  postal_code: z12.string().optional(),
  country: z12.string().optional()
}).nullable();
var registrationSchema = z12.object({
  chamber_of_commerce_number: z12.string().nullable().optional(),
  vat_number: z12.string().nullable().optional(),
  anvr_number: z12.number().nullable().optional(),
  tax_number: z12.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = z12.object({
  account_holder: z12.string(),
  bank_name: z12.string(),
  iban: z12.string()
}).nullable();
var commonPackagePriceFields = {
  destination: z12.string(),
  label: z12.string(),
  type: z12.enum(["data-limit", "time-limit"]),
  price: z12.number()
};
var packagePriceFirestoreSchema = z12.object({
  ...commonPackagePriceFields,
  package: packageRefSchema.schema
});
var packagePriceAppSchema = z12.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: z12.number()
};
var partnerPricingStrategyFirestoreSchema = z12.object({
  ...commonPricingStrategyFields,
  strategy: z12.enum(["split", "bundle"]),
  default_price_list: priceListRefNullable,
  custom_prices: z12.array(packagePriceFirestoreSchema)
});
var partnerPricingStrategyAppSchema = z12.object({
  ...commonPricingStrategyFields,
  strategy: z12.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: z12.array(packagePriceAppSchema)
});
var userPricingStrategyFirestoreSchema = z12.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefNullable,
  custom_prices: z12.array(packagePriceFirestoreSchema)
});
var userPricingStrategyAppSchema = z12.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: z12.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: z12.number().nullable(),
  income_per_gb: z12.number().nullable(),
  commission_fee: z12.number().nullable().optional(),
  payment_method: z12.enum(["invoice", "direct"]),
  requires_card: z12.boolean().nullable(),
  next_invoice: z12.date().nullable(),
  last_invoice: z12.date().nullable()
};
var financialPropertiesFirestoreSchema = z12.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: z12.object({
    partner: partnerPricingStrategyFirestoreSchema.optional(),
    user: userPricingStrategyFirestoreSchema.optional()
  }).nullable()
}).nullable();
var financialPropertiesAppSchema = z12.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: z12.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = z12.object({
  name: z12.string(),
  iso3_white_list: z12.array(z12.string()).optional(),
  parameters: z12.any()
});
var bookingDefaultsSchema = z12.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = z12.object({
  brevo_template_id: z12.number(),
  send_booking_confirmation: z12.boolean()
});
var visualIdentityBannerSchema = z12.object({
  image_url: z12.string(),
  alt: z12.string(),
  click_url: z12.string(),
  locale: supportedLocalesSchema,
  properties: z12.record(z12.string())
});
var visualIdentityBannerStrategySchema = z12.object({
  strategy: z12.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: z12.array(visualIdentityBannerSchema)
});
var visualIdentitySchema = z12.object({
  primary_color: z12.string(),
  secondary_color: z12.string(),
  logo: z12.string(),
  font: z12.string(),
  top_banner: visualIdentityBannerStrategySchema,
  mid_banner: visualIdentityBannerStrategySchema
});
var scheduleFilterSchema = z12.object({
  type: z12.enum(["iso3", "gender", "percentage", "age"]),
  value: z12.union([z12.string(), z12.number()]),
  comparison: z12.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable().optional();
var scheduleSchema = z12.object({
  days: z12.number(),
  email: z12.object({
    brevo_template_id: z12.number(),
    subject: z12.record(z12.string()).optional(),
    preview_text: z12.record(z12.string()).optional()
  }).nullable().optional(),
  push: z12.object({
    title: z12.record(z12.string()).optional(),
    body: z12.record(z12.string()).optional(),
    target: z12.string()
  }).nullable().optional(),
  hour: z12.number(),
  key: z12.string(),
  method: z12.enum(["email", "sms", "whatsapp", "push"]),
  moment: z12.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema
});
var platformSettingsSchema = z12.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: z12.object({
    allowance: z12.number().nullable(),
    package_specifications: z12.record(z12.any()).nullable()
  }).nullable(),
  booking_defaults: bookingDefaultsSchema.nullable(),
  schedules: z12.array(scheduleSchema).nullable(),
  booking_confirmation: bookingConfirmationSchema.nullable()
}).nullable();
var commonPartnerFields = {
  // Basic information
  name: z12.string().nullable(),
  type: z12.string().nullable(),
  is_active: z12.boolean().nullable().optional(),
  external_id: z12.string().nullable().optional(),
  // Contact information
  contact: z12.object({
    email: z12.string().nullable(),
    office_phone: z12.string().nullable().optional()
  }).nullable(),
  // Location information
  address: addressSchema,
  // Registration information
  registration: registrationSchema,
  // Banking information
  banking_details: bankingDetailsSchema,
  // Platform settings
  platform_settings: platformSettingsSchema,
  // Visual identity
  visual_identity: visualIdentitySchema.nullable(),
  // Metadata
  data: z12.object({
    source: z12.string(),
    manual: z12.boolean()
  }).nullable()
};
var partnerFirestoreSchema = baseModelSchema.extend({
  ...commonPartnerFields,
  parent: partnerRefNullable,
  users: userRefArrayNullable,
  financial_properties: financialPropertiesFirestoreSchema
});
var partnerAppSchema = baseModelAppSchema.extend({
  ...commonPartnerFields,
  parent: partnerRefStringNullable,
  users: userRefStringArrayNullable,
  financial_properties: financialPropertiesAppSchema
});
var commonPriceListFields = {
  name: z12.string(),
  type: z12.enum(["partner", "user"]).default("partner")
};
var priceListFirestoreSchema = baseModelSchema.extend({
  ...commonPriceListFields,
  price_list: z12.array(packagePriceFirestoreSchema)
});
var priceListAppSchema = baseModelAppSchema.extend({
  ...commonPriceListFields,
  price_list: z12.array(packagePriceAppSchema)
});
var refFieldMappings4 = [
  { app: "parent", firestore: "parent", collection: PARTNER_COLLECTION, nullable: true },
  { app: "users", firestore: "users", collection: USER_COLLECTION, nullable: true, isArray: true }
];
var partnerToFirestore = (partner) => {
  return genericToFirestore({
    appObject: partner,
    refFieldMappings: refFieldMappings4,
    dateFieldMappings: [],
    specialCaseHandler: (result, appData) => {
      if (appData.financial_properties) {
        const fp = { ...appData.financial_properties };
        const financialProps = {
          ...fp,
          pricing_strategies: null
        };
        if (fp.pricing_strategies) {
          const ps = fp.pricing_strategies;
          const pricingStrategies = {};
          if (ps.partner) {
            const partnerStrategy = {
              ...ps.partner,
              default_price_list: ps.partner.default_price_list ? toFirestore.ref(PRICE_LIST_COLLECTION, ps.partner.default_price_list) : null,
              custom_prices: ps.partner.custom_prices.map((price) => ({
                ...price,
                package: toFirestore.ref(PACKAGE_COLLECTION, price.package)
              }))
            };
            const partnerStrategyObj = partnerStrategy;
            if ("default_price_list" in partnerStrategyObj) {
              delete partnerStrategyObj.default_price_list;
            }
            pricingStrategies.partner = partnerStrategyObj;
          }
          if (ps.user) {
            const userStrategy = {
              ...ps.user,
              default_price_list: ps.user.default_price_list ? toFirestore.ref(PRICE_LIST_COLLECTION, ps.user.default_price_list) : null,
              custom_prices: ps.user.custom_prices.map((price) => ({
                ...price,
                package: toFirestore.ref(PACKAGE_COLLECTION, price.package)
              }))
            };
            const userStrategyObj = userStrategy;
            if ("default_price_list" in userStrategyObj) {
              delete userStrategyObj.default_price_list;
            }
            pricingStrategies.user = userStrategyObj;
          }
          financialProps.pricing_strategies = pricingStrategies;
        }
        result.financial_properties = financialProps;
      }
    }
  });
};
var partnerFromFirestore = (firestorePartner) => {
  return genericFromFirestore({
    firestoreObject: firestorePartner,
    refFieldMappings: refFieldMappings4,
    dateFieldMappings: [],
    specialCaseHandler: (result, firestoreData) => {
      if (firestoreData.financial_properties) {
        const fp = { ...firestoreData.financial_properties };
        const financialProps = {
          ...fp,
          pricing_strategies: null
        };
        if (fp.pricing_strategies) {
          const ps = fp.pricing_strategies;
          const pricingStrategies = {};
          if (ps.partner) {
            const partnerStrategy = {
              ...ps.partner,
              default_price_list: ps.partner.default_price_list ? fromFirestore.ref(ps.partner.default_price_list) : null,
              custom_prices: ps.partner.custom_prices.map((price) => ({
                ...price,
                package: fromFirestore.ref(price.package)
              }))
            };
            const partnerStrategyObj = partnerStrategy;
            if ("default_price_list" in partnerStrategyObj) {
              delete partnerStrategyObj.default_price_list;
            }
            pricingStrategies.partner = partnerStrategyObj;
          }
          if (ps.user) {
            const userStrategy = {
              ...ps.user,
              default_price_list: ps.user.default_price_list ? fromFirestore.ref(ps.user.default_price_list) : null,
              custom_prices: ps.user.custom_prices.map((price) => ({
                ...price,
                package: fromFirestore.ref(price.package)
              }))
            };
            const userStrategyObj = userStrategy;
            if ("default_price_list" in userStrategyObj) {
              delete userStrategyObj.default_price_list;
            }
            pricingStrategies.user = userStrategyObj;
          }
          financialProps.pricing_strategies = pricingStrategies;
        }
        result.financial_properties = financialProps;
      }
    }
  });
};
var priceListRefFieldMappings = [];
var priceListFromFirestore = (firestorePriceList) => {
  return genericFromFirestore({
    firestoreObject: firestorePriceList,
    refFieldMappings: priceListRefFieldMappings,
    dateFieldMappings: [],
    specialCaseHandler: (result, firestoreData) => {
      const priceList = firestoreData.price_list;
      if (Array.isArray(priceList)) {
        result.price_list = priceList.map((item) => ({
          ...item,
          package: fromFirestore.ref(item.package)
        }));
      }
    }
  });
};
var priceListToFirestore = (priceList) => {
  return genericToFirestore({
    appObject: priceList,
    refFieldMappings: priceListRefFieldMappings,
    dateFieldMappings: [],
    specialCaseHandler: (result, appData) => {
      const priceListValue = appData.price_list;
      if (Array.isArray(priceListValue)) {
        result.price_list = priceListValue.map((item) => ({
          ...item,
          package: toFirestore.ref(PACKAGE_COLLECTION, item.package)
        }));
      }
    }
  });
};

// src/schemas/payment.ts
import { z as z13 } from "zod";
var paymentFirestoreSchema = baseModelSchema.extend({
  amount: z13.number(),
  customer: z13.string(),
  date: z13.date(),
  // Note: In Firestore this would be a Timestamp, but we simplified for this example
  iccid: z13.string(),
  package: z13.string(),
  promo: z13.string(),
  topup: z13.boolean()
});
var paymentAppSchema = baseModelAppSchema.extend({
  amount: z13.number(),
  customer: z13.string(),
  date: z13.date(),
  iccid: z13.string(),
  package: z13.string(),
  promo: z13.string(),
  topup: z13.boolean()
});
var dateFieldMappings6 = [
  { field: "date" }
];
var paymentToFirestore = (payment) => {
  return genericToFirestore({
    appObject: payment,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings6
  });
};
var paymentFromFirestore = (firestorePayment) => {
  return genericFromFirestore({
    firestoreObject: firestorePayment,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings6
  });
};

// src/schemas/promoCode.ts
import { z as z14 } from "zod";
var promoCodeFirestoreSchema = baseModelSchema.extend({
  external_id: z14.string(),
  code: z14.string(),
  allowance_user: z14.number(),
  allowance_total: z14.number(),
  type: z14.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z14.string()),
  usage: z14.array(z14.string()),
  uuid_usage: z14.array(z14.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefNullable,
  valid_from: z14.union([z14.string(), z14.date(), timestampSchema]),
  valid_to: z14.union([z14.string(), z14.date(), timestampSchema]),
  // Optional fields based on the type
  discount: z14.number().optional(),
  package_size: z14.string().optional(),
  package: packageRefNullable,
  country: countryRefNullable,
  booking: bookingRefNullable,
  countries: z14.array(z14.string()).optional(),
  max_bytes: z14.number().optional(),
  starter_data: z14.number().optional()
});
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: z14.string(),
  code: z14.string(),
  allowance_user: z14.number(),
  allowance_total: z14.number(),
  type: z14.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(z14.string()),
  usage: z14.array(z14.string()),
  uuid_usage: z14.array(z14.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: z14.date(),
  valid_to: z14.date(),
  // Optional fields based on the type
  discount: z14.number().optional(),
  package_size: z14.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: z14.array(z14.string()).optional(),
  max_bytes: z14.number().optional(),
  starter_data: z14.number().optional()
});
var refFieldMappings5 = [
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true },
  { app: "package", firestore: "package", collection: PACKAGE_COLLECTION, nullable: true },
  { app: "country", firestore: "country", collection: COUNTRY_COLLECTION, nullable: true },
  { app: "booking", firestore: "booking", collection: BOOKING_COLLECTION, nullable: true }
];
var dateFieldMappings7 = [
  { field: "valid_from" },
  { field: "valid_to" }
];
var promoCodeToFirestore = (promoCode) => {
  return genericToFirestore({
    appObject: promoCode,
    refFieldMappings: refFieldMappings5,
    dateFieldMappings: dateFieldMappings7
  });
};
var promoCodeFromFirestore = (firestorePromoCode) => {
  return genericFromFirestore({
    firestoreObject: firestorePromoCode,
    refFieldMappings: refFieldMappings5,
    dateFieldMappings: dateFieldMappings7
  });
};

// src/schemas/user.ts
import { z as z15 } from "zod";
var apiKeySchema = z15.object({
  expires_at: timestampSchema,
  secret: z15.string(),
  is_active: z15.boolean()
});
var apiKeysSchema = z15.object({
  allowed_keys: z15.array(z15.string()),
  keys: z15.record(z15.string(), apiKeySchema)
});
var commonUserFields = {
  name: z15.string().nullable(),
  email: z15.string().email().nullable(),
  stripe_id: z15.string().nullable(),
  referral: z15.string().nullable(),
  fcm: z15.string().optional(),
  deeplink: z15.string().nullable(),
  gender: z15.string().nullable(),
  company: z15.string().nullable(),
  coordinates: z15.string().nullable(),
  parameters: z15.any().nullable(),
  locale: z15.string().nullable(),
  phone_model: z15.string().nullable(),
  phone_os: z15.string().nullable(),
  phone_os_version: z15.string().nullable(),
  ios: z15.boolean().nullable(),
  has_card_saved: z15.boolean().nullable(),
  admin: z15.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: z15.string().nullable(),
  receipt_email: z15.string().nullable()
};
var userFirestoreSchema = baseModelSchema.extend({
  ...commonUserFields,
  createdAt: timestampSchema,
  partner: partnerRefNullable,
  profileRef: profileRefNullable,
  balance: z15.union([z15.number(), z15.null(), fieldValueSchema]),
  review_requested: timestampSchema.nullable(),
  last_seen: timestampSchema.nullable()
});
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: z15.date(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: z15.number().nullable(),
  review_requested: z15.date().nullable(),
  last_seen: z15.date().nullable()
});
var refFieldMappings6 = [
  { app: "profileRef", firestore: "profileRef", collection: PROFILE_COLLECTION, nullable: true },
  { app: "partner", firestore: "partner", collection: PARTNER_COLLECTION, nullable: true }
];
var dateFieldMappings8 = [
  { field: "createdAt" },
  { field: "review_requested", nullable: true },
  { field: "last_seen", nullable: true }
];
var userToFirestore = (user, firestore) => {
  return genericToFirestore({
    appObject: user,
    refFieldMappings: refFieldMappings6,
    dateFieldMappings: dateFieldMappings8,
    firestore
  });
};
var userFromFirestore = (firestoreUser, firestore) => {
  return genericFromFirestore({
    firestoreObject: firestoreUser,
    refFieldMappings: refFieldMappings6,
    dateFieldMappings: dateFieldMappings8,
    specialCaseHandler: (result, firestoreData) => {
      if (isFieldValue(firestoreData.balance)) {
        result.balance = null;
      }
    },
    firestore
  });
};
var userToFirestoreWithBalance = (user, firestore) => {
  const result = userToFirestore(user, firestore);
  if (user.balance === null || typeof user.balance === "number") {
    result.balance = user.balance;
  }
  return result;
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
  apiKeySchema,
  apiKeysSchema,
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
  communicationChannelSchema,
  communicationOptionsSchema,
  conversionRateSchema,
  convertSentMessagesFromFirestore,
  convertSentMessagesToFirestore,
  convertToDate,
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
  createFirestoreHelpers,
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
  fromFirestore,
  genericFromFirestore,
  genericToFirestore,
  hubbyModelAppSchema,
  hubbyModelFirestoreSchema,
  isDate,
  isDocumentReference,
  isFieldValue,
  isTimestamp,
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
  sentMessagesAppSchema,
  sentMessagesFirestoreSchema,
  sentMessagesFromFirestore,
  sentMessagesToFirestore,
  supportedLocalesSchema,
  testEnv,
  timestampSchema,
  toFirestore,
  userAppSchema,
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