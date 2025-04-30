"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
  apiKeySchema: () => apiKeySchema2,
  apiKeysSchema: () => apiKeysSchema2,
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
  commonBookingFields: () => commonBookingFields,
  commonCurrencyFields: () => commonCurrencyFields,
  commonESIMFields: () => commonESIMFields,
  commonFinancialPropertiesFields: () => commonFinancialPropertiesFields,
  commonPackageFields: () => commonPackageFields,
  commonPackagePriceFields: () => commonPackagePriceFields,
  commonPartnerFields: () => commonPartnerFields,
  commonPricingStrategyFields: () => commonPricingStrategyFields,
  communicationChannelSchema: () => communicationChannelSchema,
  communicationOptionsSchema: () => communicationOptionsSchema,
  conversionRateSchema: () => conversionRateSchema,
  convertSentMessagesFromFirestore: () => convertSentMessagesFromFirestore,
  convertSentMessagesToFirestore: () => convertSentMessagesToFirestore,
  convertToDate: () => convertToDate2,
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
  freeEsimSchema: () => freeEsimSchema,
  fromFirestore: () => fromFirestore,
  genericFromFirestore: () => genericFromFirestore,
  genericToFirestore: () => genericToFirestore,
  getFirestoreInstance: () => getFirestoreInstance,
  hubbyModelAppSchema: () => hubbyModelAppSchema,
  hubbyModelFirestoreSchema: () => hubbyModelFirestoreSchema,
  isDate: () => isDate2,
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
  sentMessagesFirestoreSchema: () => sentMessagesFirestoreSchema,
  sentMessagesFromFirestore: () => sentMessagesFromFirestore,
  sentMessagesToFirestore: () => sentMessagesToFirestore,
  setFirestoreInstance: () => setFirestoreInstance,
  supportedLocalesSchema: () => supportedLocalesSchema,
  timestampSchema: () => timestampSchema,
  toFirestore: () => toFirestore,
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

// src/schemas/firebase/helpers.ts
var import_zod2 = require("zod");
var import_firestore = require("firebase-admin/firestore");

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
var createIdSchema = (collectionPath) => {
  return import_zod.z.string().describe(`ID from ${collectionPath}`);
};

// src/schemas/firebase/helpers.ts
var admin = __toESM(require("firebase-admin"), 1);
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
var timestampSchema = import_zod2.z.custom(
  (val) => val instanceof import_firestore.Timestamp
);
var documentRefSchema = import_zod2.z.custom(
  (val) => typeof val === "object" && val !== null && "path" in val && "id" in val
);
var fieldValueSchema = import_zod2.z.custom(
  (val) => typeof val === "object" && val !== null && "isEqual" in val
);
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
  date: (date) => import_firestore.Timestamp.fromDate(date),
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
var baseModelSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
  created_by: import_zod2.z.union([import_zod2.z.string(), import_zod2.z.null(), documentRefSchema]),
  updated_by: import_zod2.z.union([import_zod2.z.string(), import_zod2.z.null(), documentRefSchema])
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
  return import_zod2.z.string().describe(`ID from ${docRefSchema.collectionPath}`);
};

// src/schemas/firebase/refs.ts
var import_zod4 = require("zod");

// src/schemas/base/refs.ts
var import_zod3 = require("zod");
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
var partnerRefStringArray = import_zod3.z.array(import_zod3.z.string());
var userRefStringArray = import_zod3.z.array(import_zod3.z.string());
var profileRefStringArray = import_zod3.z.array(import_zod3.z.string());
var packageRefStringArray = import_zod3.z.array(import_zod3.z.string());
var promoCodeRefStringArray = import_zod3.z.array(import_zod3.z.string());
var countryRefStringArray = import_zod3.z.array(import_zod3.z.string());
var esimRefStringArray = import_zod3.z.array(import_zod3.z.string());
var paymentRefStringArray = import_zod3.z.array(import_zod3.z.string());
var priceListRefStringArray = import_zod3.z.array(import_zod3.z.string());
var bookingRefStringArray = import_zod3.z.array(import_zod3.z.string());
var messageRefStringArray = import_zod3.z.array(import_zod3.z.string());
var currencyRefStringArray = import_zod3.z.array(import_zod3.z.string());
var apiLogRefStringArray = import_zod3.z.array(import_zod3.z.string());
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
var partnerRefArray = import_zod4.z.array(partnerRefSchema.schema);
var userRefArray = import_zod4.z.array(userRefSchema.schema);
var profileRefArray = import_zod4.z.array(profileRefSchema.schema);
var packageRefArray = import_zod4.z.array(packageRefSchema.schema);
var promoCodeRefArray = import_zod4.z.array(promoCodeRefSchema.schema);
var countryRefArray = import_zod4.z.array(countryRefSchema.schema);
var esimRefArray = import_zod4.z.array(esimRefSchema.schema);
var paymentRefArray = import_zod4.z.array(paymentRefSchema.schema);
var priceListRefArray = import_zod4.z.array(priceListRefSchema.schema);
var bookingRefArray = import_zod4.z.array(bookingRefSchema.schema);
var messageRefArray = import_zod4.z.array(messageRefSchema.schema);
var currencyRefArray = import_zod4.z.array(currencyRefSchema.schema);
var apiLogRefArray = import_zod4.z.array(apiLogRefSchema.schema);
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
var import_zod6 = require("zod");
var import_firestore2 = require("firebase-admin/firestore");

// src/schemas/utils.ts
var convertToDate = (value, field) => {
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
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
  return result;
}

// src/schemas/base/user.ts
var import_zod5 = require("zod");
var apiKeySchema = import_zod5.z.object({
  expires_at: zDateString(),
  secret: import_zod5.z.string(),
  is_active: import_zod5.z.boolean()
});
var apiKeysSchema = import_zod5.z.object({
  allowed_keys: import_zod5.z.array(import_zod5.z.string()),
  keys: import_zod5.z.record(import_zod5.z.string(), apiKeySchema)
});
var commonUserFields = {
  name: import_zod5.z.string().nullable(),
  email: import_zod5.z.string().email().nullable(),
  stripe_id: import_zod5.z.string().nullable(),
  referral: import_zod5.z.string().nullable(),
  fcm: import_zod5.z.string().optional(),
  deeplink: import_zod5.z.string().nullable(),
  gender: import_zod5.z.string().nullable(),
  company: import_zod5.z.string().nullable(),
  coordinates: import_zod5.z.string().nullable(),
  parameters: import_zod5.z.any().nullable(),
  locale: import_zod5.z.string().nullable(),
  phone_model: import_zod5.z.string().nullable(),
  phone_os: import_zod5.z.string().nullable(),
  phone_os_version: import_zod5.z.string().nullable(),
  ios: import_zod5.z.boolean().nullable(),
  has_card_saved: import_zod5.z.boolean().nullable(),
  admin: import_zod5.z.boolean().nullable(),
  api_keys: apiKeysSchema.nullable(),
  currency: import_zod5.z.string().nullable(),
  receipt_email: import_zod5.z.string().nullable()
};
var userAppSchema = baseModelAppSchema.extend({
  ...commonUserFields,
  createdAt: zDateString(),
  partner: partnerRefStringNullable,
  profileRef: profileRefStringNullable,
  balance: import_zod5.z.number().nullable(),
  review_requested: zDateString().nullable(),
  last_seen: zDateString().nullable()
});

// src/schemas/firebase/user.ts
var apiKeySchema2 = import_zod6.z.object({
  expires_at: timestampSchema,
  secret: import_zod6.z.string(),
  is_active: import_zod6.z.boolean()
});
var apiKeysSchema2 = import_zod6.z.object({
  allowed_keys: import_zod6.z.array(import_zod6.z.string()),
  keys: import_zod6.z.record(import_zod6.z.string(), apiKeySchema2)
});
var userFirestoreSchema = baseModelSchema.extend({
  ...commonUserFields,
  createdAt: timestampSchema,
  partner: partnerRefNullable,
  profileRef: profileRefNullable,
  balance: import_zod6.z.union([import_zod6.z.number(), import_zod6.z.null(), fieldValueSchema]),
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
      if (firestoreData.balance instanceof import_firestore2.FieldValue) {
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
var convertToDate2 = (value, field) => {
  if (value && typeof value === "object" && "getTime" in value) {
    return value;
  }
  if (typeof value === "string") {
    return new Date(value);
  }
  throw new Error(`Unable to convert value to Date: ${value} for field: ${field}`);
};
var isDate2 = (value) => {
  return value && typeof value === "object" && "getTime" in value;
};

// src/schemas/base/booking.ts
var import_zod8 = require("zod");

// src/constants.ts
var import_zod7 = require("zod");
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
var supportedLocalesSchema = import_zod7.z.enum(SUPPORTED_LOCALES);

// src/schemas/base/booking.ts
var communicationChannelSchema = import_zod8.z.enum([
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
var communicationOptionsSchema = import_zod8.z.object({
  should_send_message: import_zod8.z.boolean(),
  channels: import_zod8.z.array(communicationChannelSchema)
});
var bookingStatusSchema = import_zod8.z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "UNPAID",
  "EXPIRED"
]);
var commonBookingFields = {
  title: import_zod8.z.string().nullable(),
  first_name: import_zod8.z.string(),
  last_name: import_zod8.z.string(),
  full_name: import_zod8.z.string(),
  pax: import_zod8.z.number(),
  email: import_zod8.z.string().email().nullable(),
  phone: import_zod8.z.string().nullable(),
  booking_id: import_zod8.z.string().nullable(),
  flight_number: import_zod8.z.string().optional(),
  gender: import_zod8.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod8.z.string().optional(),
  sent_messages: import_zod8.z.record(import_zod8.z.any()).optional(),
  locale: supportedLocalesSchema,
  status: bookingStatusSchema,
  data: import_zod8.z.object({
    source: import_zod8.z.string(),
    manual: import_zod8.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod8.z.boolean(),
  is_pseudonymized: import_zod8.z.boolean(),
  import_id: import_zod8.z.string().nullable().optional(),
  package_specifications: import_zod8.z.record(import_zod8.z.any()).optional()
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
var import_zod10 = require("zod");

// src/schemas/base/partner.ts
var import_zod9 = require("zod");
var addressSchema = import_zod9.z.object({
  street: import_zod9.z.string().optional(),
  city: import_zod9.z.string().optional(),
  postal_code: import_zod9.z.string().optional(),
  country: import_zod9.z.string().optional()
}).nullable();
var registrationSchema = import_zod9.z.object({
  chamber_of_commerce_number: import_zod9.z.string().nullable().optional(),
  vat_number: import_zod9.z.string().nullable().optional(),
  anvr_number: import_zod9.z.number().nullable().optional(),
  tax_number: import_zod9.z.string().nullable().optional()
}).nullable();
var bankingDetailsSchema = import_zod9.z.object({
  account_holder: import_zod9.z.string(),
  bank_name: import_zod9.z.string(),
  iban: import_zod9.z.string()
}).nullable();
var commonPackagePriceFields = {
  destination: import_zod9.z.string(),
  label: import_zod9.z.string(),
  type: import_zod9.z.enum(["data-limit", "time-limit"]),
  price: import_zod9.z.number()
};
var packagePriceAppSchema = import_zod9.z.object({
  ...commonPackagePriceFields,
  package: packageRefString
});
var commonPricingStrategyFields = {
  modification_percentage: import_zod9.z.number()
};
var partnerPricingStrategyAppSchema = import_zod9.z.object({
  ...commonPricingStrategyFields,
  strategy: import_zod9.z.enum(["split", "bundle"]),
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod9.z.array(packagePriceAppSchema)
});
var userPricingStrategyAppSchema = import_zod9.z.object({
  ...commonPricingStrategyFields,
  default_price_list: priceListRefStringNullable,
  custom_prices: import_zod9.z.array(packagePriceAppSchema)
});
var commonFinancialPropertiesFields = {
  administration_fee: import_zod9.z.number().nullable(),
  income_per_gb: import_zod9.z.number().nullable(),
  commission_fee: import_zod9.z.number().nullable().optional(),
  payment_method: import_zod9.z.enum(["invoice", "direct"]),
  requires_card: import_zod9.z.boolean().nullable(),
  next_invoice: zDateString().nullable().optional(),
  last_invoice: zDateString().nullable().optional()
};
var financialPropertiesAppSchema = import_zod9.z.object({
  ...commonFinancialPropertiesFields,
  pricing_strategies: import_zod9.z.object({
    partner: partnerPricingStrategyAppSchema.optional(),
    user: userPricingStrategyAppSchema.optional()
  }).nullable()
}).nullable();
var packageStrategySchema = import_zod9.z.object({
  name: import_zod9.z.string(),
  iso3_white_list: import_zod9.z.array(import_zod9.z.string()).optional(),
  parameters: import_zod9.z.any()
});
var bookingDefaultsSchema = import_zod9.z.object({
  locale: supportedLocalesSchema
});
var bookingConfirmationSchema = import_zod9.z.object({
  brevo_template_id: import_zod9.z.number(),
  send_booking_confirmation: import_zod9.z.boolean()
});
var visualIdentityBannerSchema = import_zod9.z.object({
  image_url: import_zod9.z.string(),
  alt: import_zod9.z.string(),
  click_url: import_zod9.z.string(),
  locale: supportedLocalesSchema,
  properties: import_zod9.z.record(import_zod9.z.string())
});
var visualIdentityBannerStrategySchema = import_zod9.z.object({
  strategy: import_zod9.z.enum(["fixed", "rotating", "destination", "time_of_day"]),
  banners: import_zod9.z.array(visualIdentityBannerSchema).nullable().optional()
});
var visualIdentitySchema = import_zod9.z.object({
  primary_color: import_zod9.z.string(),
  secondary_color: import_zod9.z.string(),
  logo: import_zod9.z.string(),
  font: import_zod9.z.string(),
  top_banner: visualIdentityBannerStrategySchema.optional(),
  mid_banner: visualIdentityBannerStrategySchema.optional()
});
var scheduleFilterSchema = import_zod9.z.object({
  type: import_zod9.z.enum(["iso3", "gender", "percentage", "age"]),
  value: import_zod9.z.union([import_zod9.z.string(), import_zod9.z.number()]),
  comparison: import_zod9.z.enum([
    "equal",
    "not_equal",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal"
  ])
}).nullable();
var scheduleSchema = import_zod9.z.object({
  days: import_zod9.z.number(),
  email: import_zod9.z.object({
    brevo_template_id: import_zod9.z.number(),
    subject: import_zod9.z.record(import_zod9.z.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional(),
    preview_text: import_zod9.z.record(import_zod9.z.string()).refine(
      (val) => Object.keys(val).every((key) => SUPPORTED_LOCALES.includes(key)),
      { message: "Keys must be supported locales" }
    ).optional()
  }).nullable().optional(),
  push: import_zod9.z.object({
    title: import_zod9.z.record(import_zod9.z.string()).optional(),
    body: import_zod9.z.record(import_zod9.z.string()).optional(),
    target: import_zod9.z.string()
  }).nullable().optional(),
  hour: import_zod9.z.number(),
  key: import_zod9.z.string(),
  method: import_zod9.z.enum(["email", "sms", "whatsapp", "push"]),
  moment: import_zod9.z.enum(["departure", "return", "immediate"]),
  filter: scheduleFilterSchema.nullable().optional()
});
var freeEsimSchema = import_zod9.z.object({
  package_specification: import_zod9.z.object({
    size: import_zod9.z.string(),
    type: import_zod9.z.string(),
    destination: import_zod9.z.string()
  }),
  allowance: import_zod9.z.number()
});
var platformSettingsSchema = import_zod9.z.object({
  package_strategy: packageStrategySchema.nullable().optional(),
  free_esim: freeEsimSchema.nullable().optional(),
  booking_defaults: bookingDefaultsSchema.nullable().optional(),
  booking_confirmation: bookingConfirmationSchema.nullable().optional(),
  schedules: import_zod9.z.array(scheduleSchema).optional()
}).nullable();
var commonContactFields = {
  email: import_zod9.z.string().nullable(),
  office_phone: import_zod9.z.string().nullable().optional()
};
var commonPartnerFields = {
  name: import_zod9.z.string().nullable(),
  type: import_zod9.z.string().nullable(),
  is_active: import_zod9.z.boolean().nullable().optional(),
  external_id: import_zod9.z.string().nullable().optional(),
  contact: import_zod9.z.object(commonContactFields).nullable(),
  address: addressSchema,
  registration: registrationSchema,
  banking_details: bankingDetailsSchema,
  visual_identity: visualIdentitySchema.nullable(),
  data: import_zod9.z.object({
    source: import_zod9.z.string(),
    manual: import_zod9.z.boolean()
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
  name: import_zod9.z.string(),
  description: import_zod9.z.string().nullable(),
  type: import_zod9.z.enum(["partner", "consumer"]),
  partner: partnerRefStringNullable,
  package_prices: import_zod9.z.array(packagePriceAppSchema)
});

// src/schemas/firebase/partner.ts
var commonPackagePriceFields2 = {
  destination: import_zod10.z.string(),
  label: import_zod10.z.string(),
  type: import_zod10.z.enum(["data-limit", "time-limit"]),
  price: import_zod10.z.number()
};
var packagePriceFirestoreSchema = import_zod10.z.object({
  ...commonPackagePriceFields2,
  package: packageRefSchema.schema
});
var commonPricingStrategyFields2 = {
  modification_percentage: import_zod10.z.number()
};
var partnerPricingStrategyFirestoreSchema = import_zod10.z.object({
  ...commonPricingStrategyFields2,
  strategy: import_zod10.z.enum(["split", "bundle"]),
  default_price_list: priceListRefNullable,
  custom_prices: import_zod10.z.array(packagePriceFirestoreSchema)
});
var userPricingStrategyFirestoreSchema = import_zod10.z.object({
  ...commonPricingStrategyFields2,
  default_price_list: priceListRefNullable,
  custom_prices: import_zod10.z.array(packagePriceFirestoreSchema)
});
var firestoreFinancialPropertiesFields = {
  ...commonFinancialPropertiesFields,
  // Override date fields with timestamp
  next_invoice: timestampSchema.nullable(),
  last_invoice: timestampSchema.nullable()
};
var financialPropertiesFirestoreSchema = import_zod10.z.object({
  ...firestoreFinancialPropertiesFields,
  pricing_strategies: import_zod10.z.object({
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
  name: import_zod10.z.string(),
  description: import_zod10.z.string().nullable(),
  type: import_zod10.z.enum(["partner", "consumer"]),
  partner: partnerRefNullable,
  package_prices: import_zod10.z.array(packagePriceFirestoreSchema)
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
var import_zod11 = require("zod");
var countryAppSchema = import_zod11.z.object({
  id: import_zod11.z.string().nullable(),
  bokun_id: import_zod11.z.number().nullable(),
  LTE: import_zod11.z.boolean().nullable(),
  apn: import_zod11.z.string().nullable(),
  click_count: import_zod11.z.number().nullable(),
  global_network: import_zod11.z.string().nullable(),
  global_price: import_zod11.z.number().nullable(),
  hubby: import_zod11.z.number().nullable(),
  imsi: import_zod11.z.number().nullable(),
  has_esim: import_zod11.z.boolean(),
  name: import_zod11.z.string().nullable(),
  region: import_zod11.z.boolean().nullable(),
  is_region: import_zod11.z.boolean().nullable(),
  countries: import_zod11.z.array(import_zod11.z.string()).nullable(),
  tier: import_zod11.z.number().nullable()
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
var import_zod13 = require("zod");

// src/schemas/base/package.ts
var import_zod12 = require("zod");
var commonPackageFields = {
  external_id: import_zod12.z.string(),
  provider: import_zod12.z.string(),
  coverage_label: import_zod12.z.string().nullable(),
  label: import_zod12.z.string(),
  bytes: import_zod12.z.number(),
  hidden: import_zod12.z.boolean(),
  is_hidden: import_zod12.z.boolean(),
  is_active: import_zod12.z.boolean(),
  priority: import_zod12.z.number(),
  country_data: countryAppSchema.nullable(),
  price: import_zod12.z.number(),
  partner_price: import_zod12.z.number(),
  days: import_zod12.z.number(),
  name: import_zod12.z.string(),
  type: import_zod12.z.enum(["data-limited", "time-limited"]).nullable(),
  throttling: import_zod12.z.number().optional(),
  provider_parameters: import_zod12.z.object({
    imsi: import_zod12.z.number()
  }).nullable()
};
var packageAppSchema = baseModelAppSchema.extend({
  ...commonPackageFields,
  country: countryRefString,
  partner: partnerRefStringNullable
});

// src/schemas/firebase/package.ts
var commonPackageFields2 = {
  external_id: import_zod13.z.string(),
  provider: import_zod13.z.string(),
  coverage_label: import_zod13.z.string().nullable(),
  label: import_zod13.z.string(),
  bytes: import_zod13.z.number(),
  hidden: import_zod13.z.boolean(),
  is_hidden: import_zod13.z.boolean(),
  is_active: import_zod13.z.boolean(),
  priority: import_zod13.z.number(),
  country_data: countryFirestoreSchema.nullable(),
  price: import_zod13.z.number(),
  partner_price: import_zod13.z.number(),
  days: import_zod13.z.number(),
  name: import_zod13.z.string(),
  type: import_zod13.z.enum(["data-limited", "time-limited"]).nullable(),
  throttling: import_zod13.z.number().optional(),
  provider_parameters: import_zod13.z.object({
    imsi: import_zod13.z.number()
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
var import_zod16 = require("zod");

// src/schemas/base/api.ts
var import_zod14 = require("zod");
var packageSpecificationSchema = import_zod14.z.object({
  destination: import_zod14.z.string().optional(),
  size: import_zod14.z.string().optional(),
  package_id: import_zod14.z.string().optional(),
  iata_code: import_zod14.z.string().optional()
});
var packageSpecificationsSchema = import_zod14.z.array(packageSpecificationSchema);
var bookingApiResponseSchema = import_zod14.z.object({
  id: import_zod14.z.string(),
  title: import_zod14.z.string().nullable(),
  first_name: import_zod14.z.string(),
  last_name: import_zod14.z.string(),
  full_name: import_zod14.z.string(),
  pax: import_zod14.z.number(),
  email: import_zod14.z.string().nullable(),
  phone: import_zod14.z.string().nullable(),
  booking_id: import_zod14.z.string().nullable(),
  return_date: import_zod14.z.string().nullable(),
  // ISO string
  partner: import_zod14.z.string(),
  // ID string
  promo_codes: import_zod14.z.array(import_zod14.z.string()),
  // Array of ID strings
  departure_date: import_zod14.z.string(),
  // ISO string
  flight_number: import_zod14.z.string().optional(),
  gender: import_zod14.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod14.z.string().optional(),
  sent_messages: import_zod14.z.record(import_zod14.z.any()).optional(),
  users: import_zod14.z.array(import_zod14.z.string()),
  // Array of ID strings
  esims: import_zod14.z.array(import_zod14.z.string()).nullable(),
  // Array of ID strings or null
  locale: import_zod14.z.string(),
  status: import_zod14.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod14.z.object({
    source: import_zod14.z.string(),
    manual: import_zod14.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod14.z.boolean(),
  is_pseudonymized: import_zod14.z.boolean(),
  import_id: import_zod14.z.string().nullable().optional(),
  created_at: import_zod14.z.string(),
  // ISO string
  updated_at: import_zod14.z.string(),
  // ISO string
  created_by: import_zod14.z.string().optional(),
  updated_by: import_zod14.z.string().optional()
});
var promoCodeApiResponseSchema = import_zod14.z.object({
  promo_code: import_zod14.z.string(),
  package_id: import_zod14.z.string(),
  package_size: import_zod14.z.string(),
  destination: import_zod14.z.string()
});
var bookingApiRequestSchema = import_zod14.z.object({
  id: import_zod14.z.string(),
  title: import_zod14.z.string().nullable(),
  first_name: import_zod14.z.string().nullable().optional(),
  last_name: import_zod14.z.string().nullable().optional(),
  full_name: import_zod14.z.string().nullable().optional(),
  pax: import_zod14.z.number().int().min(1).nullable().optional(),
  email: import_zod14.z.string().nullable().optional(),
  phone: import_zod14.z.string().nullable().optional(),
  booking_id: import_zod14.z.string().min(3).nullable().optional(),
  return_date: zDateString().nullable(),
  // Must be after departure_date
  departure_date: zDateString(),
  // ISO 8601 date string
  flight_number: import_zod14.z.string().nullable().optional(),
  gender: import_zod14.z.enum(["M", "F", "O"]).optional(),
  package_size: import_zod14.z.string().optional(),
  sent_messages: import_zod14.z.record(import_zod14.z.any()).optional(),
  locale: import_zod14.z.string().min(2).max(5).optional(),
  status: import_zod14.z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "UNPAID", "EXPIRED"]),
  data: import_zod14.z.object({
    source: import_zod14.z.string(),
    manual: import_zod14.z.boolean()
  }),
  communication_options: communicationOptionsSchema,
  is_processed_for_esim_restoration: import_zod14.z.boolean(),
  is_pseudonymized: import_zod14.z.boolean(),
  date_of_birth: zDateString().optional(),
  package_specifications: packageSpecificationsSchema,
  created_at: zDateString(),
  updated_at: zDateString()
});
var partnerApiRequestSchema = import_zod14.z.object({
  id: import_zod14.z.string(),
  name: import_zod14.z.string().nullable(),
  type: import_zod14.z.string().nullable(),
  is_active: import_zod14.z.boolean().nullable().optional(),
  external_id: import_zod14.z.string().nullable().optional(),
  parent: import_zod14.z.string().nullable(),
  // String ID
  contact: import_zod14.z.object({
    email: import_zod14.z.string().nullable(),
    office_phone: import_zod14.z.string().nullable().optional()
  }).nullable(),
  address: import_zod14.z.object({
    street: import_zod14.z.string().optional(),
    city: import_zod14.z.string().optional(),
    postal_code: import_zod14.z.string().optional(),
    country: import_zod14.z.string().optional()
  }).nullable().optional(),
  registration: import_zod14.z.object({
    chamber_of_commerce_number: import_zod14.z.string().nullable().optional(),
    vat_number: import_zod14.z.string().nullable().optional(),
    anvr_number: import_zod14.z.number().nullable().optional(),
    tax_number: import_zod14.z.string().nullable().optional()
  }).nullable().optional(),
  banking_details: import_zod14.z.object({
    account_holder: import_zod14.z.string(),
    bank_name: import_zod14.z.string(),
    iban: import_zod14.z.string()
  }).nullable().optional(),
  finance: import_zod14.z.object({
    administration_fee: import_zod14.z.number().nullable(),
    income_per_gb: import_zod14.z.number().nullable(),
    commission_fee: import_zod14.z.number().optional(),
    payment_method: import_zod14.z.enum(["invoice", "direct"]),
    requires_card: import_zod14.z.boolean().nullable(),
    next_invoice: zDateString().nullable(),
    last_invoice: zDateString().nullable(),
    pricing_strategies: import_zod14.z.object({
      partner: import_zod14.z.object({
        strategy: import_zod14.z.enum(["split", "bundle"]),
        default_price_list: import_zod14.z.string().nullable(),
        custom_prices: import_zod14.z.array(import_zod14.z.any()),
        modification_percentage: import_zod14.z.number()
      }),
      user: import_zod14.z.object({
        default_price_list: import_zod14.z.string().nullable(),
        custom_prices: import_zod14.z.array(import_zod14.z.any()),
        modification_percentage: import_zod14.z.number()
      })
    }).optional()
  }).nullable(),
  platform_settings: import_zod14.z.any().optional(),
  visual_identity: import_zod14.z.any().nullable(),
  users: import_zod14.z.array(import_zod14.z.string()).nullable(),
  // Array of string IDs
  data: import_zod14.z.object({
    source: import_zod14.z.string(),
    manual: import_zod14.z.boolean()
  }).optional(),
  created_at: zDateString(),
  updated_at: zDateString(),
  created_by: import_zod14.z.string().nullable(),
  updated_by: import_zod14.z.string().nullable()
});
var partnerApiResponseSchema = partnerApiRequestSchema;

// src/schemas/base/promoCode.ts
var import_zod15 = require("zod");
var promoCodeAppSchema = baseModelAppSchema.extend({
  external_id: import_zod15.z.string(),
  code: import_zod15.z.string(),
  allowance_user: import_zod15.z.number(),
  allowance_total: import_zod15.z.number(),
  type: import_zod15.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(import_zod15.z.string()),
  usage: import_zod15.z.array(import_zod15.z.string()),
  uuid_usage: import_zod15.z.array(import_zod15.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefStringNullable,
  valid_from: zDateString(),
  valid_to: zDateString(),
  // Optional fields based on the type
  discount: import_zod15.z.number().optional(),
  package_size: import_zod15.z.string().optional(),
  package: packageRefStringNullable,
  country: countryRefStringNullable,
  booking: bookingRefStringNullable,
  countries: import_zod15.z.array(import_zod15.z.string()).optional(),
  max_bytes: import_zod15.z.number().optional(),
  starter_data: import_zod15.z.number().optional()
});

// src/schemas/firebase/promoCode.ts
var promoCodeFirestoreSchema = baseModelSchema.extend({
  external_id: import_zod16.z.string(),
  code: import_zod16.z.string(),
  allowance_user: import_zod16.z.number(),
  allowance_total: import_zod16.z.number(),
  type: import_zod16.z.enum(["full-discount", "partial-discount", "booking", "traveler"]).nullable().or(import_zod16.z.string()),
  usage: import_zod16.z.array(import_zod16.z.string()),
  uuid_usage: import_zod16.z.array(import_zod16.z.string()),
  package_specification: packageSpecificationSchema.optional(),
  partner: partnerRefNullable,
  valid_from: import_zod16.z.union([import_zod16.z.string(), import_zod16.z.date(), timestampSchema]),
  valid_to: import_zod16.z.union([import_zod16.z.string(), import_zod16.z.date(), timestampSchema]),
  // Optional fields based on the type
  discount: import_zod16.z.number().optional(),
  package_size: import_zod16.z.string().optional(),
  package: packageRefNullable,
  country: countryRefNullable,
  booking: bookingRefNullable,
  countries: import_zod16.z.array(import_zod16.z.string()).optional(),
  max_bytes: import_zod16.z.number().optional(),
  starter_data: import_zod16.z.number().optional()
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
var import_zod17 = require("zod");
var commonESIMFields = {
  imsi: import_zod17.z.number(),
  qr: import_zod17.z.string(),
  iccid: import_zod17.z.string(),
  provider: import_zod17.z.string(),
  coverage_label: import_zod17.z.string().nullable().optional(),
  total_data: import_zod17.z.number().nullable(),
  data_left: import_zod17.z.number().nullable(),
  data_used: import_zod17.z.boolean().nullable(),
  status: import_zod17.z.string().nullable(),
  name: import_zod17.z.string(),
  android_auto: import_zod17.z.boolean(),
  partner_price: import_zod17.z.number().nullable(),
  promo: import_zod17.z.string().nullable(),
  type: import_zod17.z.enum(["api", "promo", "balance", "code", "external", "payment"]),
  is_auto_install: import_zod17.z.boolean(),
  is_archived: import_zod17.z.boolean(),
  user: import_zod17.z.string().nullable(),
  payment: import_zod17.z.string().nullable(),
  apn: import_zod17.z.string().nullable()
};
var esimAppSchema = baseModelAppSchema.extend({
  ...commonESIMFields,
  country: import_zod17.z.string().nullable(),
  time_assigned: zDateString().nullable(),
  last_updated: zDateString().nullable(),
  partner: import_zod17.z.string().nullable()
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
var import_zod19 = require("zod");

// src/schemas/base/payment.ts
var import_zod18 = require("zod");
var paymentAppSchema = baseModelAppSchema.extend({
  amount: import_zod18.z.number(),
  customer: import_zod18.z.string(),
  date: zDateString(),
  iccid: import_zod18.z.string(),
  package: import_zod18.z.string(),
  promo: import_zod18.z.string(),
  topup: import_zod18.z.boolean()
});

// src/schemas/firebase/payment.ts
var paymentFirestoreSchema = baseModelSchema.extend({
  amount: import_zod19.z.number(),
  customer: import_zod19.z.string(),
  date: timestampSchema,
  // In Firestore this is a Timestamp
  iccid: import_zod19.z.string(),
  package: import_zod19.z.string(),
  promo: import_zod19.z.string(),
  topup: import_zod19.z.boolean()
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
var import_zod21 = require("zod");
var import_firestore3 = require("firebase-admin/firestore");

// src/schemas/base/message.ts
var import_zod20 = require("zod");
var messageAppSchema = import_zod20.z.object({
  id: import_zod20.z.string(),
  key: import_zod20.z.string(),
  method: import_zod20.z.enum(["push", "sms", "email"]),
  status: import_zod20.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: zDateString(),
  updated_at: zDateString()
});
var sentMessagesAppSchema = import_zod20.z.record(messageAppSchema);

// src/schemas/firebase/message.ts
var messageFirestoreSchema = import_zod21.z.object({
  id: import_zod21.z.string(),
  key: import_zod21.z.string(),
  method: import_zod21.z.enum(["push", "sms", "email"]),
  status: import_zod21.z.enum(["pending", "sent", "failed", "delivered"]),
  created_at: timestampSchema,
  updated_at: timestampSchema
});
var sentMessagesFirestoreSchema = import_zod21.z.record(messageFirestoreSchema);
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
        created_at: message.created_at instanceof Date ? import_firestore3.Timestamp.fromDate(message.created_at) : message.created_at,
        updated_at: message.updated_at instanceof Date ? import_firestore3.Timestamp.fromDate(message.updated_at) : message.updated_at
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
        created_at: firestoreMessage.created_at instanceof import_firestore3.Timestamp ? firestoreMessage.created_at.toDate() : firestoreMessage.created_at,
        updated_at: firestoreMessage.updated_at instanceof import_firestore3.Timestamp ? firestoreMessage.updated_at.toDate() : firestoreMessage.updated_at
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
var import_zod22 = require("zod");
var conversionRateSchema = import_zod22.z.object({
  currency: import_zod22.z.number()
});
var currencyFieldDocs = {
  code: 'ISO 4217 currency code (e.g., "USD", "EUR")',
  symbol: 'Currency symbol (e.g., "$", "\u20AC")',
  name: 'Full name of the currency (e.g., "US Dollar")',
  rate: "Exchange rate relative to base currency",
  is_default: "Whether this is the default currency"
};
var commonCurrencyFields = {
  code: import_zod22.z.string(),
  symbol: import_zod22.z.string(),
  name: import_zod22.z.string(),
  rate: import_zod22.z.number(),
  is_default: import_zod22.z.boolean()
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
var import_zod24 = require("zod");

// src/schemas/base/apiLogs.ts
var import_zod23 = require("zod");
var apiLogAppSchema = import_zod23.z.object({
  id: import_zod23.z.string().optional(),
  method: import_zod23.z.string(),
  user_id: import_zod23.z.string().optional(),
  path: import_zod23.z.string(),
  resource_type: import_zod23.z.string().optional(),
  resource_id: import_zod23.z.string().optional(),
  partner_id: import_zod23.z.string().optional(),
  payload: import_zod23.z.record(import_zod23.z.unknown()).optional(),
  timestamp: zDateString(),
  status_code: import_zod23.z.number()
});

// src/schemas/firebase/apiLogs.ts
var apiLogFirestoreSchema = import_zod24.z.object({
  id: import_zod24.z.string().optional(),
  method: import_zod24.z.string(),
  user_id: import_zod24.z.string().optional(),
  path: import_zod24.z.string(),
  resource_type: import_zod24.z.string().optional(),
  resource_id: import_zod24.z.string().optional(),
  partner_id: import_zod24.z.string().optional(),
  payload: import_zod24.z.record(import_zod24.z.unknown()).optional(),
  timestamp: timestampSchema,
  status_code: import_zod24.z.number()
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
  freeEsimSchema,
  fromFirestore,
  genericFromFirestore,
  genericToFirestore,
  getFirestoreInstance,
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
  sentMessagesFirestoreSchema,
  sentMessagesFromFirestore,
  sentMessagesToFirestore,
  setFirestoreInstance,
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
});
//# sourceMappingURL=index.cjs.map