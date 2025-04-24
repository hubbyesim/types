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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  API_LOG_COLLECTION: () => API_LOG_COLLECTION,
  BOOKING_COLLECTION: () => BOOKING_COLLECTION,
  COUNTRY_COLLECTION: () => COUNTRY_COLLECTION,
  CURRENCY_COLLECTION: () => CURRENCY_COLLECTION,
  CommunicationChannel: () => CommunicationChannel,
  ESIM_COLLECTION: () => ESIM_COLLECTION,
  MESSAGE_COLLECTION: () => MESSAGE_COLLECTION,
  MockDocumentReference: () => MockDocumentReference,
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
  apiLogFirestoreSchema: () => apiLogFirestoreSchema,
  apiLogFromFirestore: () => apiLogFromFirestore,
  apiLogRefArray: () => apiLogRefArray,
  apiLogRefArrayNullable: () => apiLogRefArrayNullable,
  apiLogRefNullable: () => apiLogRefNullable,
  apiLogRefSchema: () => apiLogRefSchema,
  apiLogRefString: () => apiLogRefString,
  apiLogRefStringArray: () => apiLogRefStringArray,
  apiLogRefStringArrayNullable: () => apiLogRefStringArrayNullable,
  apiLogRefStringNullable: () => apiLogRefStringNullable,
  apiLogToFirestore: () => apiLogToFirestore,
  bankingDetailsSchema: () => bankingDetailsSchema,
  baseModelAppSchema: () => baseModelAppSchema,
  baseModelSchema: () => baseModelSchema,
  bookingApiRequestSchema: () => bookingApiRequestSchema,
  bookingApiResponseSchema: () => bookingApiResponseSchema,
  bookingAppSchema: () => bookingAppSchema,
  bookingConfirmationSchema: () => bookingConfirmationSchema,
  bookingDefaultsSchema: () => bookingDefaultsSchema,
  bookingFirestoreSchema: () => bookingFirestoreSchema,
  bookingFromFirestore: () => bookingFromFirestore,
  bookingRefArray: () => bookingRefArray,
  bookingRefArrayNullable: () => bookingRefArrayNullable,
  bookingRefNullable: () => bookingRefNullable,
  bookingRefSchema: () => bookingRefSchema,
  bookingRefString: () => bookingRefString,
  bookingRefStringArray: () => bookingRefStringArray,
  bookingRefStringArrayNullable: () => bookingRefStringArrayNullable,
  bookingRefStringNullable: () => bookingRefStringNullable,
  bookingStatusSchema: () => bookingStatusSchema,
  bookingToFirestore: () => bookingToFirestore,
  communicationChannelSchema: () => communicationChannelSchema,
  communicationOptionsSchema: () => communicationOptionsSchema,
  conversionRateSchema: () => conversionRateSchema,
  convertSentMessagesFromFirestore: () => convertSentMessagesFromFirestore,
  convertSentMessagesToFirestore: () => convertSentMessagesToFirestore,
  convertToDate: () => convertToDate,
  countryAppSchema: () => countryAppSchema,
  countryFirestoreSchema: () => countryFirestoreSchema,
  countryFromFirestore: () => countryFromFirestore,
  countryRefArray: () => countryRefArray,
  countryRefArrayNullable: () => countryRefArrayNullable,
  countryRefNullable: () => countryRefNullable,
  countryRefSchema: () => countryRefSchema,
  countryRefString: () => countryRefString,
  countryRefStringArray: () => countryRefStringArray,
  countryRefStringArrayNullable: () => countryRefStringArrayNullable,
  countryRefStringNullable: () => countryRefStringNullable,
  countryToFirestore: () => countryToFirestore,
  createDocRefSchema: () => createDocRefSchema,
  currencyAppSchema: () => currencyAppSchema,
  currencyFirestoreSchema: () => currencyFirestoreSchema,
  currencyFromFirestore: () => currencyFromFirestore,
  currencyRefArray: () => currencyRefArray,
  currencyRefArrayNullable: () => currencyRefArrayNullable,
  currencyRefNullable: () => currencyRefNullable,
  currencyRefSchema: () => currencyRefSchema,
  currencyRefString: () => currencyRefString,
  currencyRefStringArray: () => currencyRefStringArray,
  currencyRefStringArrayNullable: () => currencyRefStringArrayNullable,
  currencyRefStringNullable: () => currencyRefStringNullable,
  currencyToFirestore: () => currencyToFirestore,
  docRefToStringSchema: () => docRefToStringSchema,
  documentRefSchema: () => documentRefSchema,
  esimAppSchema: () => esimAppSchema,
  esimFirestoreSchema: () => esimFirestoreSchema,
  esimFromFirestore: () => esimFromFirestore,
  esimRefArray: () => esimRefArray,
  esimRefArrayNullable: () => esimRefArrayNullable,
  esimRefNullable: () => esimRefNullable,
  esimRefSchema: () => esimRefSchema,
  esimRefString: () => esimRefString,
  esimRefStringArray: () => esimRefStringArray,
  esimRefStringArrayNullable: () => esimRefStringArrayNullable,
  esimRefStringNullable: () => esimRefStringNullable,
  esimToFirestore: () => esimToFirestore,
  fieldValueSchema: () => fieldValueSchema,
  financialPropertiesAppSchema: () => financialPropertiesAppSchema,
  financialPropertiesFirestoreSchema: () => financialPropertiesFirestoreSchema,
  fromFirestore: () => fromFirestore,
  genericFromFirestore: () => genericFromFirestore,
  genericToFirestore: () => genericToFirestore,
  hubbyModelAppSchema: () => hubbyModelAppSchema,
  hubbyModelFirestoreSchema: () => hubbyModelFirestoreSchema,
  isDate: () => isDate,
  messageAppSchema: () => messageAppSchema,
  messageFirestoreSchema: () => messageFirestoreSchema,
  messageFromFirestore: () => messageFromFirestore,
  messageRefArray: () => messageRefArray,
  messageRefArrayNullable: () => messageRefArrayNullable,
  messageRefNullable: () => messageRefNullable,
  messageRefSchema: () => messageRefSchema,
  messageRefString: () => messageRefString,
  messageRefStringArray: () => messageRefStringArray,
  messageRefStringArrayNullable: () => messageRefStringArrayNullable,
  messageRefStringNullable: () => messageRefStringNullable,
  messageToFirestore: () => messageToFirestore,
  packageAppSchema: () => packageAppSchema,
  packageFirestoreSchema: () => packageFirestoreSchema,
  packageFromFirestore: () => packageFromFirestore,
  packagePriceAppSchema: () => packagePriceAppSchema,
  packagePriceFirestoreSchema: () => packagePriceFirestoreSchema,
  packageRefArray: () => packageRefArray,
  packageRefArrayNullable: () => packageRefArrayNullable,
  packageRefNullable: () => packageRefNullable,
  packageRefSchema: () => packageRefSchema,
  packageRefString: () => packageRefString,
  packageRefStringArray: () => packageRefStringArray,
  packageRefStringArrayNullable: () => packageRefStringArrayNullable,
  packageRefStringNullable: () => packageRefStringNullable,
  packageSpecificationSchema: () => packageSpecificationSchema,
  packageSpecificationsSchema: () => packageSpecificationsSchema,
  packageStrategySchema: () => packageStrategySchema,
  packageToFirestore: () => packageToFirestore,
  partnerApiRequestSchema: () => partnerApiRequestSchema,
  partnerApiResponseSchema: () => partnerApiResponseSchema,
  partnerAppSchema: () => partnerAppSchema,
  partnerFirestoreSchema: () => partnerFirestoreSchema,
  partnerFromFirestore: () => partnerFromFirestore,
  partnerPricingStrategyAppSchema: () => partnerPricingStrategyAppSchema,
  partnerPricingStrategyFirestoreSchema: () => partnerPricingStrategyFirestoreSchema,
  partnerRefArray: () => partnerRefArray,
  partnerRefArrayNullable: () => partnerRefArrayNullable,
  partnerRefNullable: () => partnerRefNullable,
  partnerRefSchema: () => partnerRefSchema,
  partnerRefString: () => partnerRefString,
  partnerRefStringArray: () => partnerRefStringArray,
  partnerRefStringArrayNullable: () => partnerRefStringArrayNullable,
  partnerRefStringNullable: () => partnerRefStringNullable,
  partnerToFirestore: () => partnerToFirestore,
  paymentAppSchema: () => paymentAppSchema,
  paymentFirestoreSchema: () => paymentFirestoreSchema,
  paymentFromFirestore: () => paymentFromFirestore,
  paymentRefArray: () => paymentRefArray,
  paymentRefArrayNullable: () => paymentRefArrayNullable,
  paymentRefNullable: () => paymentRefNullable,
  paymentRefSchema: () => paymentRefSchema,
  paymentRefString: () => paymentRefString,
  paymentRefStringArray: () => paymentRefStringArray,
  paymentRefStringArrayNullable: () => paymentRefStringArrayNullable,
  paymentRefStringNullable: () => paymentRefStringNullable,
  paymentToFirestore: () => paymentToFirestore,
  platformSettingsSchema: () => platformSettingsSchema,
  priceListAppSchema: () => priceListAppSchema,
  priceListFirestoreSchema: () => priceListFirestoreSchema,
  priceListFromFirestore: () => priceListFromFirestore,
  priceListRefArray: () => priceListRefArray,
  priceListRefArrayNullable: () => priceListRefArrayNullable,
  priceListRefNullable: () => priceListRefNullable,
  priceListRefSchema: () => priceListRefSchema,
  priceListRefString: () => priceListRefString,
  priceListRefStringArray: () => priceListRefStringArray,
  priceListRefStringArrayNullable: () => priceListRefStringArrayNullable,
  priceListRefStringNullable: () => priceListRefStringNullable,
  priceListToFirestore: () => priceListToFirestore,
  profileRefArray: () => profileRefArray,
  profileRefArrayNullable: () => profileRefArrayNullable,
  profileRefNullable: () => profileRefNullable,
  profileRefSchema: () => profileRefSchema,
  profileRefString: () => profileRefString,
  profileRefStringArray: () => profileRefStringArray,
  profileRefStringArrayNullable: () => profileRefStringArrayNullable,
  profileRefStringNullable: () => profileRefStringNullable,
  promoCodeApiResponseSchema: () => promoCodeApiResponseSchema,
  promoCodeAppSchema: () => promoCodeAppSchema,
  promoCodeFirestoreSchema: () => promoCodeFirestoreSchema,
  promoCodeFromFirestore: () => promoCodeFromFirestore,
  promoCodeRefArray: () => promoCodeRefArray,
  promoCodeRefArrayNullable: () => promoCodeRefArrayNullable,
  promoCodeRefNullable: () => promoCodeRefNullable,
  promoCodeRefSchema: () => promoCodeRefSchema,
  promoCodeRefString: () => promoCodeRefString,
  promoCodeRefStringArray: () => promoCodeRefStringArray,
  promoCodeRefStringArrayNullable: () => promoCodeRefStringArrayNullable,
  promoCodeRefStringNullable: () => promoCodeRefStringNullable,
  promoCodeToFirestore: () => promoCodeToFirestore,
  registrationSchema: () => registrationSchema,
  scheduleFilterSchema: () => scheduleFilterSchema,
  scheduleSchema: () => scheduleSchema,
  sentMessagesAppSchema: () => sentMessagesAppSchema,
  sentMessagesFirestoreSchema: () => sentMessagesFirestoreSchema,
  sentMessagesFromFirestore: () => sentMessagesFromFirestore,
  sentMessagesToFirestore: () => sentMessagesToFirestore,
  supportedLocalesSchema: () => supportedLocalesSchema,
  testEnv: () => testEnv,
  timestampSchema: () => timestampSchema,
  toFirestore: () => toFirestore,
  userAppSchema: () => userAppSchema,
  userFirestoreSchema: () => userFirestoreSchema,
  userFromFirestore: () => userFromFirestore,
  userPricingStrategyAppSchema: () => userPricingStrategyAppSchema,
  userPricingStrategyFirestoreSchema: () => userPricingStrategyFirestoreSchema,
  userRefArray: () => userRefArray,
  userRefArrayNullable: () => userRefArrayNullable,
  userRefNullable: () => userRefNullable,
  userRefSchema: () => userRefSchema,
  userRefString: () => userRefString,
  userRefStringArray: () => userRefStringArray,
  userRefStringArrayNullable: () => userRefStringArrayNullable,
  userRefStringNullable: () => userRefStringNullable,
  userToFirestore: () => userToFirestore,
  userToFirestoreWithBalance: () => userToFirestoreWithBalance,
  visualIdentityBannerSchema: () => visualIdentityBannerSchema,
  visualIdentityBannerStrategySchema: () => visualIdentityBannerStrategySchema,
  visualIdentitySchema: () => visualIdentitySchema
});
module.exports = __toCommonJS(src_exports);

// src/schemas/api.ts
var import_zod5 = require("zod");

// src/schemas/booking.ts
var import_zod4 = require("zod");

// src/schemas/helpers.ts
var import_zod = require("zod");
var import_firestore = require("firebase-admin/firestore");
var testEnv = { isTestEnvironment: false };
var MockDocumentReference = class {
  path;
  id;
  constructor(collectionPath, id) {
    this.path = `${collectionPath}/${id}`;
    this.id = id;
  }
};
var timestampSchema = import_zod.z.custom(
  (val) => val instanceof import_firestore.Timestamp
);
var documentRefSchema = import_zod.z.custom(
  (val) => typeof val === "object" && val !== null && "path" in val && "id" in val
);
var fieldValueSchema = import_zod.z.custom(
  (val) => typeof val === "object" && val !== null && "isEqual" in val
);
var toFirestore = {
  date: (date) => import_firestore.Timestamp.fromDate(date),
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
var baseModelSchema = import_zod.z.object({
  id: import_zod.z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
  created_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null(), documentRefSchema]),
  updated_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null(), documentRefSchema])
});
var baseModelAppSchema = import_zod.z.object({
  id: import_zod.z.string(),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date(),
  created_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null()]),
  updated_by: import_zod.z.union([import_zod.z.string(), import_zod.z.null()])
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
  return import_zod.z.string().describe(`ID from ${docRefSchema.collectionPath}`);
};

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
  refFieldMappings: refFieldMappings7,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler
}) {
  const result = {};
  const refFieldNames = refFieldMappings7.map((mapping) => mapping.app);
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
  refFieldMappings7.forEach(({ app, firestore, collection, isArray, nullable }) => {
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
  refFieldMappings: refFieldMappings7,
  dateFieldMappings: dateFieldMappings9,
  specialCaseHandler
}) {
  const result = {};
  const refFieldNames = refFieldMappings7.map((mapping) => mapping.firestore);
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
  refFieldMappings7.forEach(({ app, firestore, nullable, isArray }) => {
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

// src/schemas/refs.ts
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
var partnerRefArray = import_zod2.z.array(partnerRefSchema.schema);
var userRefArray = import_zod2.z.array(userRefSchema.schema);
var profileRefArray = import_zod2.z.array(profileRefSchema.schema);
var packageRefArray = import_zod2.z.array(packageRefSchema.schema);
var promoCodeRefArray = import_zod2.z.array(promoCodeRefSchema.schema);
var countryRefArray = import_zod2.z.array(countryRefSchema.schema);
var esimRefArray = import_zod2.z.array(esimRefSchema.schema);
var paymentRefArray = import_zod2.z.array(paymentRefSchema.schema);
var priceListRefArray = import_zod2.z.array(priceListRefSchema.schema);
var bookingRefArray = import_zod2.z.array(bookingRefSchema.schema);
var messageRefArray = import_zod2.z.array(messageRefSchema.schema);
var currencyRefArray = import_zod2.z.array(currencyRefSchema.schema);
var apiLogRefArray = import_zod2.z.array(apiLogRefSchema.schema);
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

// src/constants.ts
var import_zod3 = require("zod");
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
var supportedLocalesSchema = import_zod3.z.enum(SUPPORTED_LOCALES);

// src/schemas/booking.ts
var communicationChannelSchema = import_zod4.z.enum([
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
var communicationOptionsSchema = import_zod4.z.object({
  should_send_message: import_zod4.z.boolean(),
  channels: import_zod4.z.array(communicationChannelSchema)
});
var bookingStatusSchema = import_zod4.z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: import_zod4.z.string().nullable(),
  first_name: import_zod4.z.string(),
  last_name: import_zod4.z.string(),
  full_name: import_zod4.z.string(),
  pax: import_zod4.z.number(),
  email: import_zod4.z.string().email().nullable(),
  phone: import_zod4.z.string().nullable(),
  booking_id: import_zod4.z.string().nullable(),
  flight_number: import_zod4.z.string().optional(),
  gender: import_zod4.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod4.z.string().optional(),
  sent_messages: import_zod4.z.record(import_zod4.z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: import_zod4.z.object({
    source: import_zod4.z.string(),
    manual: import_zod4.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod4.z.boolean(),
  is_pseudonymized: import_zod4.z.boolean(),
  import_id: import_zod4.z.string().nullable().optional(),
  package_specifications: import_zod4.z.record(import_zod4.z.any()).optional()
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
  return_date: import_zod4.z.date().nullable(),
  departure_date: import_zod4.z.date(),
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
var bookingToFirestore = (booking) => {
  return genericToFirestore({
    appObject: booking,
    refFieldMappings,
    dateFieldMappings
  });
};
var bookingFromFirestore = (firestoreBooking) => {
  return genericFromFirestore({
    firestoreObject: firestoreBooking,
    refFieldMappings,
    dateFieldMappings
  });
};

// src/schemas/api.ts
var packageSpecificationSchema = import_zod5.z.object({
  destination: import_zod5.z.string().optional(),
  size: import_zod5.z.string().optional(),
  package_id: import_zod5.z.string().optional(),
  iata_code: import_zod5.z.string().optional()
});
var packageSpecificationsSchema = import_zod5.z.array(packageSpecificationSchema);
var bookingApiResponseSchema = import_zod5.z.object({
  id: import_zod5.z.string(),
  title: import_zod5.z.string().nullable(),
  first_name: import_zod5.z.string(),
  last_name: import_zod5.z.string(),
  full_name: import_zod5.z.string(),
  pax: import_zod5.z.number(),
  email: import_zod5.z.string().nullable(),
  phone: import_zod5.z.string().nullable(),
  booking_id: import_zod5.z.string().nullable(),
  return_date: import_zod5.z.string().nullable(),
  // ISO string
  partner: import_zod5.z.string(),
  // DocumentReference id
  promo_codes: import_zod5.z.array(import_zod5.z.string()),
  // Array of DocumentReference ids
  departure_date: import_zod5.z.string(),
  // ISO string
  flight_number: import_zod5.z.string().optional(),
  gender: import_zod5.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod5.z.string().optional(),
  sent_messages: import_zod5.z.record(import_zod5.z.any()).optional(),
  users: import_zod5.z.array(import_zod5.z.string()),
  // Array of DocumentReference ids
  esims: import_zod5.z.array(import_zod5.z.string()).nullable(),
  // Array of DocumentReference ids or null
  locale: import_zod5.z.string(),
  status: import_zod5.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod5.z.object({
    source: import_zod5.z.string(),
    manual: import_zod5.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod5.z.boolean(),
  is_pseudonymized: import_zod5.z.boolean(),
  import_id: import_zod5.z.string().nullable().optional(),
  created_at: import_zod5.z.string(),
  // ISO string
  updated_at: import_zod5.z.string(),
  // ISO string
  created_by: import_zod5.z.string().optional(),
  updated_by: import_zod5.z.string().optional()
});
var promoCodeApiResponseSchema = import_zod5.z.object({
  promo_code: import_zod5.z.string(),
  package_id: import_zod5.z.string(),
  package_size: import_zod5.z.string(),
  destination: import_zod5.z.string()
});
var bookingApiRequestSchema = import_zod5.z.object({
  id: import_zod5.z.string(),
  title: import_zod5.z.string().nullable(),
  first_name: import_zod5.z.string().nullable().optional(),
  last_name: import_zod5.z.string().nullable().optional(),
  full_name: import_zod5.z.string().nullable().optional(),
  pax: import_zod5.z.number().int().min(1).nullable().optional(),
  email: import_zod5.z.string().nullable().optional(),
  phone: import_zod5.z.string().nullable().optional(),
  booking_id: import_zod5.z.string().min(3).nullable().optional(),
  return_date: import_zod5.z.date().nullable(),
  // Must be after departure_date
  departure_date: import_zod5.z.date(),
  // ISO 8601 date string
  flight_number: import_zod5.z.string().nullable().optional(),
  gender: import_zod5.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod5.z.string().optional(),
  sent_messages: import_zod5.z.record(import_zod5.z.any()).optional(),
  locale: import_zod5.z.string().min(2).max(5).optional(),
  status: import_zod5.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod5.z.object({
    source: import_zod5.z.string(),
    manual: import_zod5.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod5.z.boolean(),
  is_pseudonymized: import_zod5.z.boolean(),
  date_of_birth: import_zod5.z.date().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: import_zod5.z.date(),
  updated_at: import_zod5.z.date()
});
var partnerApiRequestSchema = import_zod5.z.object({
  id: import_zod5.z.string(),
  name: import_zod5.z.string().nullable(),
  type: import_zod5.z.string().nullable(),
  is_active: import_zod5.z.boolean().nullable().optional(),
  external_id: import_zod5.z.string().nullable().optional(),
  parent: import_zod5.z.string().nullable(),
  // Previously DocumentReference
  contact: import_zod5.z.object({
    email: import_zod5.z.string().nullable(),
    office_phone: import_zod5.z.string().nullable().optional()
  }).nullable(),
  address: import_zod5.z.object({
    street: import_zod5.z.string().optional(),
    city: import_zod5.z.string().optional(),
    postal_code: import_zod5.z.string().optional(),
    country: import_zod5.z.string().optional()
  }).nullable().optional(),
  registration: import_zod5.z.object({
    chamber_of_commerce_number: import_zod5.z.string().nullable().optional(),
    vat_number: import_zod5.z.string().nullable().optional(),
    anvr_number: import_zod5.z.number().nullable().optional(),
    tax_number: import_zod5.z.string().nullable().optional()
  }).nullable().optional(),
  banking_details: import_zod5.z.object({
    account_holder: import_zod5.z.string(),
    bank_name: import_zod5.z.string(),
    iban: import_zod5.z.string()
  }).nullable().optional(),
  finance: import_zod5.z.object({
    administration_fee: import_zod5.z.number().nullable(),
    income_per_gb: import_zod5.z.number().nullable(),
    commission_fee: import_zod5.z.number().optional(),
    payment_method: import_zod5.z.enum(["invoice", "direct"]),
    requires_card: import_zod5.z.boolean().nullable(),
    next_invoice: import_zod5.z.date().nullable(),
    // Previously Timestamp
    last_invoice: import_zod5.z.date().nullable(),
    // Previously Timestamp
    pricing_strategies: import_zod5.z.object({
      partner: import_zod5.z.object({
        strategy: import_zod5.z.enum(["split", "bundle"]),
        default_price_list: import_zod5.z.string().nullable(),
        custom_prices: import_zod5.z.array(import_zod5.z.any()),
        modification_percentage: import_zod5.z.number()
      }),
      user: import_zod5.z.object({
        default_price_list: import_zod5.z.string().nullable(),
        custom_prices: import_zod5.z.array(import_zod5.z.any()),
        modification_percentage: import_zod5.z.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: import_zod5.z.any().optional(),
  visual_identity: import_zod5.z.any().nullable(),
  users: import_zod5.z.array(import_zod5.z.string()).nullable(),
  // Previously DocumentReference[]
  data: import_zod5.z.object({
    source: import_zod5.z.string(),
    manual: import_zod5.z.boolean()
  }).optional(),
  created_at: import_zod5.z.date(),
  updated_at: import_zod5.z.date(),
  created_by: import_zod5.z.string().nullable(),
  updated_by: import_zod5.z.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/apiLogs.ts
var import_zod6 = require("zod");
var apiLogFirestoreSchema = import_zod6.z.object({
  id: import_zod6.z.string().optional(),
  method: import_zod6.z.string(),
  user_id: import_zod6.z.string().optional(),
  path: import_zod6.z.string(),
  resource_type: import_zod6.z.string().optional(),
  resource_id: import_zod6.z.string().optional(),
  partner_id: import_zod6.z.string().optional(),
  payload: import_zod6.z.record(import_zod6.z.unknown()).optional(),
  timestamp: timestampSchema,
  status_code: import_zod6.z.number()
});
var apiLogAppSchema = import_zod6.z.object({
  id: import_zod6.z.string().optional(),
  method: import_zod6.z.string(),
  user_id: import_zod6.z.string().optional(),
  path: import_zod6.z.string(),
  resource_type: import_zod6.z.string().optional(),
  resource_id: import_zod6.z.string().optional(),
  partner_id: import_zod6.z.string().optional(),
  payload: import_zod6.z.record(import_zod6.z.unknown()).optional(),
  timestamp: import_zod6.z.date(),
  status_code: import_zod6.z.number()
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
var import_zod7 = require("zod");
var countryFirestoreSchema = import_zod7.z.object({
  id: import_zod7.z.string().nullable(),
  bokun_id: import_zod7.z.number().nullable(),
  LTE: import_zod7.z.boolean().nullable(),
  apn: import_zod7.z.string().nullable(),
  click_count: import_zod7.z.number().nullable(),
  global_network: import_zod7.z.string().nullable(),
  global_price: import_zod7.z.number().nullable(),
  hubby: import_zod7.z.number().nullable(),
  imsi: import_zod7.z.number().nullable(),
  name: import_zod7.z.string().nullable(),
  region: import_zod7.z.boolean().nullable(),
  is_region: import_zod7.z.boolean().nullable(),
  countries: import_zod7.z.array(import_zod7.z.string()).nullable(),
  tier: import_zod7.z.number().nullable()
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
var import_zod8 = require("zod");

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
var conversionRateSchema = import_zod8.z.object({
  currency: import_zod8.z.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: import_zod8.z.string(),
  symbol: import_zod8.z.string(),
  name: import_zod8.z.string(),
  rate: import_zod8.z.number(),
  is_default: import_zod8.z.boolean()
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
var import_zod9 = require("zod");
var commonESIMFields = {
  imsi: import_zod9.z.number(),
  qr: import_zod9.z.string(),
  iccid: import_zod9.z.string(),
  provider: import_zod9.z.string(),
  coverage_label: import_zod9.z.string().nullable().optional(),
  total_data: import_zod9.z.number().nullable(),
  data_left: import_zod9.z.number().nullable(),
  data_used: import_zod9.z.boolean().nullable(),
  status: import_zod9.z.string().nullable(),
  name: import_zod9.z.string(),
  android_auto: import_zod9.z.boolean(),
  partner_price: import_zod9.z.number().nullable(),
  promo: import_zod9.z.string().nullable(),
  type: import_zod9.z.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: import_zod9.z.boolean(),
  is_archived: import_zod9.z.boolean(),
  apn: import_zod9.z.string().nullable()
};
var esimFirestoreSchema = baseModelSchema.extend({
  ...commonESIMFields,
  country: countryRefNullable,
  user: userRefNullable,
  time_assigned: timestampSchema.nullable(),
  last_updated: timestampSchema.nullable(),
  partner: partnerRefNullable,
  payment: paymentRefNullable
});
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: import_zod9.z.string().nullable(),
  user: import_zod9.z.string().nullable(),
  time_assigned: import_zod9.z.date().nullable(),
  last_updated: import_zod9.z.date().nullable(),
  partner: import_zod9.z.string().nullable(),
  payment: import_zod9.z.string().nullable()
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
var import_zod10 = require("zod");
var import_firestore2 = require("firebase/firestore");
var messageFirestoreSchema = import_zod10.z.object({
  id: import_zod10.z.string(),
  key: import_zod10.z.string(),
  method: import_zod10.z.enum(["push", "sms", "email"]),
  status: import_zod10.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampSchema,
  updated_at: timestampSchema
});
var messageAppSchema = import_zod10.z.object({
  id: import_zod10.z.string(),
  key: import_zod10.z.string(),
  method: import_zod10.z.enum(["push", "sms", "email"]),
  status: import_zod10.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: import_zod10.z.date(),
  updated_at: import_zod10.z.date()
});
var sentMessagesFirestoreSchema = import_zod10.z.record(messageFirestoreSchema);
var sentMessagesAppSchema = import_zod10.z.record(messageAppSchema);
var dateFieldMappings5 = [
  { field: "created_at" },
  { field: "updated_at" }
];
var messageToFirestore = (message) => {
  return genericToFirestore({
    appObject: message,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5
  });
};
var messageFromFirestore = (firestoreMessage) => {
  return genericFromFirestore({
    firestoreObject: firestoreMessage,
    refFieldMappings: [],
    dateFieldMappings: dateFieldMappings5
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
        created_at: message.created_at instanceof Date ? import_firestore2.Timestamp.fromDate(message.created_at) : message.created_at,
        updated_at: message.updated_at instanceof Date ? import_firestore2.Timestamp.fromDate(message.updated_at) : message.updated_at
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
        created_at: firestoreMessage.created_at instanceof import_firestore2.Timestamp ? firestoreMessage.created_at.toDate() : firestoreMessage.created_at,
        updated_at: firestoreMessage.updated_at instanceof import_firestore2.Timestamp ? firestoreMessage.updated_at.toDate() : firestoreMessage.updated_at
      };
      result[key] = appMessage;
    }
  }
  return result;
};

// src/schemas/package.ts
var import_zod11 = require("zod");
var commonPackageFields = {
  external_id: import_zod11.z.string(),
  provider: import_zod11.z.string(),
  coverage_label: import_zod11.z.string().nullable(),
  label: import_zod11.z.string(),
  bytes: import_zod11.z.number(),
  hidden: import_zod11.z.boolean(),
  is_hidden: import_zod11.z.boolean(),
  is_active: import_zod11.z.boolean(),
  priority: import_zod11.z.number(),
  country_data: countryFirestoreSchema.nullable(),
  price: import_zod11.z.number(),
  partner_price: import_zod11.z.number(),
  days: import_zod11.z.number(),
  name: import_zod11.z.string(),
  type: import_zod11.z.enum(["data-limited", "time-limited"]).nullable(),
  throttling: import_zod11.z.number().optional(),
  provider_parameters: import_zod11.z.object({
    imsi: import_zod11.z.number()
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
var import_zod12 = require("zod");
var addressSchema = import_zod12.z.object({
  street: import_zod12.z.string().optional(),
  city: import_zod12.z.string().optional(),
  postal_code: import_zod12.z.string().optional(),
  country: import_zod12.z.string().optional()
}).nullable();
var registrationSchema = import_zod12.z.object({
  chamber_of_commerce_number: import_zod12.z.string().nullable().optional(),
  vat_number: import_zod12.z.string().nullable().optional(),
  anvr_number: import_zod12.z.number().nullable().optional(),
  tax_number: import_zod12.z.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = import_zod12.z.object({
  account_holder: import_zod12.z.string(),
  bank_name: import_zod12.z.string(),
  iban: import_zod12.z.string()
}).nullable();
var commonPackagePriceFields = {
  destination: import_zod12.z.string(),
  label: import_zod12.z.string(),
  type: import_zod12.z.enum(["data-limit", "time-limit"]),
  price: import_zod12.z.number()
};
var packagePriceFirestoreSchema = import_zod12.z.object({
  ...commonPackagePriceFields,
  package: packageRefSchema.schema
});
var packagePriceAppSchema = import_zod12.z.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: import_zod12.z.number()
};
var partnerPricingStrategyFirestoreSchema = import_zod12.z.object({
  ...commonPricingStrategyFields,
  strategy: import_zod12.z.enum(["split", "bundle"]),
  default_price_list: priceListRefNullable,
  custom_prices: import_zod12.z.array(packagePriceFirestoreSchema)
});
var partnerPricingStrategyAppSchema = import_zod12.z.object({
  ...commonPricingStrategyFields,
  strategy: import_zod12.z.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod12.z.array(packagePriceAppSchema)
});
var userPricingStrategyFirestoreSchema = import_zod12.z.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefNullable,
  custom_prices: import_zod12.z.array(packagePriceFirestoreSchema)
});
var userPricingStrategyAppSchema = import_zod12.z.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod12.z.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: import_zod12.z.number().nullable(),
  income_per_gb: import_zod12.z.number().nullable(),
  commission_fee: import_zod12.z.number().nullable().optional(),
  payment_method: import_zod12.z.enum(["invoice", "direct"]),
  requires_card: import_zod12.z.boolean().nullable(),
  next_invoice: import_zod12.z.date().nullable(),
  last_invoice: import_zod12.z.date().nullable()
};
var financialPropertiesFirestoreSchema = import_zod12.z.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: import_zod12.z.object({
    partner: partnerPricingStrategyFirestoreSchema.optional(),
    user: userPricingStrategyFirestoreSchema.optional()
  }).nullable()
}).nullable();
var financialPropertiesAppSchema = import_zod12.z.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: import_zod12.z.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = import_zod12.z.object({
  name: import_zod12.z.string(),
  iso3_white_list: import_zod12.z.array(import_zod12.z.string()).optional(),
  parameters: import_zod12.z.any()
});
var bookingDefaultsSchema = import_zod12.z.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = import_zod12.z.object({
  brevo_template_id: import_zod12.z.number(),
  send_booking_confirmation: import_zod12.z.boolean()
});
var visualIdentityBannerSchema = import_zod12.z.object({
  image_url: import_zod12.z.string(),
  alt: import_zod12.z.string(),
  click_url: import_zod12.z.string(),
  locale: supportedLocalesSchema,
  properties: import_zod12.z.record(import_zod12.z.string())
});
var visualIdentityBannerStrategySchema = import_zod12.z.object({
  strategy: import_zod12.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: import_zod12.z.array(visualIdentityBannerSchema)
});
var visualIdentitySchema = import_zod12.z.object({
  primary_color: import_zod12.z.string(),
  secondary_color: import_zod12.z.string(),
  logo: import_zod12.z.string(),
  font: import_zod12.z.string(),
  top_banner: visualIdentityBannerStrategySchema,
  mid_banner: visualIdentityBannerStrategySchema
});
var scheduleFilterSchema = import_zod12.z.object({
  type: import_zod12.z.enum(["iso3", "gender", "percentage", "age"]),
  value: import_zod12.z.union([import_zod12.z.string(), import_zod12.z.number()]),
  comparison: import_zod12.z.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = import_zod12.z.object({
  days: import_zod12.z.number(),
  email: import_zod12.z.object({
    brevo_template_id: import_zod12.z.number(),
    subject: import_zod12.z.record(import_zod12.z.string()).optional(),
    preview_text: import_zod12.z.record(import_zod12.z.string()).optional()
  }).nullable(),
  push: import_zod12.z.object({
    title: import_zod12.z.record(import_zod12.z.string()).optional(),
    body: import_zod12.z.record(import_zod12.z.string()).optional(),
    target: import_zod12.z.string()
  }).nullable(),
  hour: import_zod12.z.number(),
  key: import_zod12.z.string(),
  method: import_zod12.z.enum(["email", "sms", "whatsapp", "push"]),
  moment: import_zod12.z.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema
});
var platformSettingsSchema = import_zod12.z.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: import_zod12.z.object({
    allowance: import_zod12.z.number().nullable(),
    package_specifications: import_zod12.z.record(import_zod12.z.any()).nullable()
  }).nullable(),
  booking_defaults: bookingDefaultsSchema.nullable(),
  schedules: import_zod12.z.array(scheduleSchema).nullable(),
  booking_confirmation: bookingConfirmationSchema.nullable()
}).nullable();
var commonPartnerFields = {
  // Basic information
  name: import_zod12.z.string().nullable(),
  type: import_zod12.z.string().nullable(),
  is_active: import_zod12.z.boolean().nullable().optional(),
  external_id: import_zod12.z.string().nullable().optional(),
  // Contact information
  contact: import_zod12.z.object({
    email: import_zod12.z.string().nullable(),
    office_phone: import_zod12.z.string().nullable().optional()
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
  data: import_zod12.z.object({
    source: import_zod12.z.string(),
    manual: import_zod12.z.boolean()
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
  name: import_zod12.z.string(),
  type: import_zod12.z.enum(["partner", "user"]).default("partner")
};
var priceListFirestoreSchema = baseModelSchema.extend({
  ...commonPriceListFields,
  price_list: import_zod12.z.array(packagePriceFirestoreSchema)
});
var priceListAppSchema = baseModelAppSchema.extend({
  ...commonPriceListFields,
  price_list: import_zod12.z.array(packagePriceAppSchema)
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
var import_zod13 = require("zod");
var paymentFirestoreSchema = baseModelSchema.extend({
  amount: import_zod13.z.number(),
  customer: import_zod13.z.string(),
  date: import_zod13.z.date(),
  // Note: In Firestore this would be a Timestamp, but we simplified for this example
  iccid: import_zod13.z.string(),
  package: import_zod13.z.string(),
  promo: import_zod13.z.string(),
  topup: import_zod13.z.boolean()
});
var paymentAppSchema = baseModelAppSchema.extend({
  amount: import_zod13.z.number(),
  customer: import_zod13.z.string(),
  date: import_zod13.z.date(),
  iccid: import_zod13.z.string(),
  package: import_zod13.z.string(),
  promo: import_zod13.z.string(),
  topup: import_zod13.z.boolean()
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
var import_zod14 = require("zod");
var promoCodeFirestoreSchema = baseModelSchema.extend({
  external_id: import_zod14.z.string(),
  code: import_zod14.z.string(),
  allowance_user: import_zod14.z.number(),
  allowance_total: import_zod14.z.number(),
  type: import_zod14.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(import_zod14.z.string()),
  usage: import_zod14.z.array(import_zod14.z.string()),
  uuid_usage: import_zod14.z.array(import_zod14.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefNullable,
  valid_from: import_zod14.z.union([import_zod14.z.string(), import_zod14.z.date(), timestampSchema]),
  valid_to: import_zod14.z.union([import_zod14.z.string(), import_zod14.z.date(), timestampSchema]),
  // Optional fields based on the type
  discount: import_zod14.z.number().optional(),
  package_size: import_zod14.z.string().optional(),
  package: packageRefNullable,
  country: countryRefNullable,
  booking: bookingRefNullable,
  countries: import_zod14.z.array(import_zod14.z.string()).optional(),
  max_bytes: import_zod14.z.number().optional(),
  starter_data: import_zod14.z.number().optional()
});
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: import_zod14.z.string(),
  code: import_zod14.z.string(),
  allowance_user: import_zod14.z.number(),
  allowance_total: import_zod14.z.number(),
  type: import_zod14.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(import_zod14.z.string()),
  usage: import_zod14.z.array(import_zod14.z.string()),
  uuid_usage: import_zod14.z.array(import_zod14.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: import_zod14.z.date(),
  valid_to: import_zod14.z.date(),
  // Optional fields based on the type
  discount: import_zod14.z.number().optional(),
  package_size: import_zod14.z.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: import_zod14.z.array(import_zod14.z.string()).optional(),
  max_bytes: import_zod14.z.number().optional(),
  starter_data: import_zod14.z.number().optional()
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
var import_zod15 = require("zod");
var import_firestore3 = require("firebase-admin/firestore");
var apiKeySchema = import_zod15.z.object({
  expires_at: timestampSchema,
  secret: import_zod15.z.string(),
  is_active: import_zod15.z.boolean()
});
var apiKeysSchema = import_zod15.z.object({
  allowed_keys: import_zod15.z.array(import_zod15.z.string()),
  keys: import_zod15.z.record(import_zod15.z.string(), apiKeySchema)
});
var commonUserFields = {
  name: import_zod15.z.string().nullable(),
  email: import_zod15.z.string().email().nullable(),
  stripe_id: import_zod15.z.string().nullable(),
  referral: import_zod15.z.string().nullable(),
  fcm: import_zod15.z.string().optional(),
  deeplink: import_zod15.z.string().nullable(),
  gender: import_zod15.z.string().nullable(),
  company: import_zod15.z.string().nullable(),
  coordinates: import_zod15.z.string().nullable(),
  parameters: import_zod15.z.any().nullable(),
  locale: import_zod15.z.string().nullable(),
  phone_model: import_zod15.z.string().nullable(),
  phone_os: import_zod15.z.string().nullable(),
  phone_os_version: import_zod15.z.string().nullable(),
  ios: import_zod15.z.boolean().nullable(),
  has_card_saved: import_zod15.z.boolean().nullable(),
  admin: import_zod15.z.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: import_zod15.z.string().nullable(),
  receipt_email: import_zod15.z.string().nullable()
};
var userFirestoreSchema = baseModelSchema.extend({
  ...commonUserFields,
  createdAt: timestampSchema,
  partner: partnerRefNullable,
  profileRef: profileRefNullable,
  balance: import_zod15.z.union([import_zod15.z.number(), import_zod15.z.null(), fieldValueSchema]),
  review_requested: timestampSchema.nullable(),
  last_seen: timestampSchema.nullable()
});
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: import_zod15.z.date(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: import_zod15.z.number().nullable(),
  review_requested: import_zod15.z.date().nullable(),
  last_seen: import_zod15.z.date().nullable()
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
var userToFirestore = (user) => {
  return genericToFirestore({
    appObject: user,
    refFieldMappings: refFieldMappings6,
    dateFieldMappings: dateFieldMappings8
  });
};
var userFromFirestore = (firestoreUser) => {
  return genericFromFirestore({
    firestoreObject: firestoreUser,
    refFieldMappings: refFieldMappings6,
    dateFieldMappings: dateFieldMappings8,
    specialCaseHandler: (result, firestoreData) => {
      if (firestoreData.balance instanceof import_firestore3.FieldValue) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map