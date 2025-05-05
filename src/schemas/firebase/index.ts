// src/schemas/firebase/index.ts

// Import core schemas/types
import {
    timestampSchema, documentRefSchema, fieldValueSchema,
    baseModelSchema, createDocRefSchema
} from './core';
import type { HubbyModelFirestore, HubbyModel } from './core';

// Import remaining helpers - ONLY import things EXPORTED by helpers.ts after refactor
import {
    MockDocumentReference,
    setFirestoreInstance, getFirestoreInstance,
    toFirestore, fromFirestore,
    baseModelAppSchema, // This IS exported from helpers (re-export of base/helpers)
    docRefToStringSchema // This IS exported from helpers
} from './helpers';
// Import types from helpers needed for re-export - These are aliases defined in helpers.ts
import type { HubbyModelApp, HHubbyModel } from './helpers';

// Import Refs
import {
    PARTNER_COLLECTION, USER_COLLECTION, PROFILE_COLLECTION, PACKAGE_COLLECTION,
    PROMO_CODE_COLLECTION, COUNTRY_COLLECTION, ESIM_COLLECTION, PAYMENT_COLLECTION,
    PRICE_LIST_COLLECTION, BOOKING_COLLECTION, MESSAGE_COLLECTION, CURRENCY_COLLECTION,
    API_LOG_COLLECTION,
    partnerRefString, userRefString, profileRefString, packageRefString, promoCodeRefString,
    countryRefString, esimRefString, paymentRefString, priceListRefString, bookingRefString,
    messageRefString, currencyRefString, apiLogRefString,
    partnerRefStringNullable, userRefStringNullable, profileRefStringNullable, packageRefStringNullable,
    promoCodeRefStringNullable, countryRefStringNullable, esimRefStringNullable, paymentRefStringNullable,
    priceListRefStringNullable, bookingRefStringNullable, messageRefStringNullable,
    apiLogRefStringNullable,
    partnerRefStringArray, userRefStringArray, profileRefStringArray, packageRefStringArray,
    promoCodeRefStringArray, countryRefStringArray, esimRefStringArray, paymentRefStringArray,
    priceListRefStringArray, bookingRefStringArray, messageRefStringArray,
    apiLogRefStringArray,
    partnerRefStringArrayNullable, userRefStringArrayNullable, profileRefStringArrayNullable, packageRefStringArrayNullable,
    promoCodeRefStringArrayNullable, countryRefStringArrayNullable, esimRefStringArrayNullable, paymentRefStringArrayNullable,
    priceListRefStringArrayNullable, bookingRefStringArrayNullable, messageRefStringArrayNullable,
    apiLogRefStringArrayNullable,
    partnerRefSchema, userRefSchema, profileRefSchema, packageRefSchema, promoCodeRefSchema,
    countryRefSchema, esimRefSchema, paymentRefSchema, priceListRefSchema, bookingRefSchema,
    messageRefSchema, currencyRefSchema, apiLogRefSchema,
    partnerRefNullable, userRefNullable, profileRefNullable, packageRefNullable, promoCodeRefNullable,
    countryRefNullable, esimRefNullable, paymentRefNullable, priceListRefNullable, bookingRefNullable,
    messageRefNullable, currencyRefNullable, apiLogRefNullable,
    partnerRefArray, userRefArray, profileRefArray, packageRefArray, promoCodeRefArray,
    countryRefArray, esimRefArray, paymentRefArray, priceListRefArray, bookingRefArray,
    messageRefArray, currencyRefArray, apiLogRefArray,
    partnerRefArrayNullable, userRefArrayNullable, profileRefArrayNullable, packageRefArrayNullable,
    promoCodeRefArrayNullable, countryRefArrayNullable, esimRefArrayNullable, paymentRefArrayNullable,
    priceListRefArrayNullable, bookingRefArrayNullable, messageRefArrayNullable,
    currencyRefStringArrayNullable,
    apiLogRefArrayNullable
} from './refs';

// Import module schemas/types and functions
import type { UserApp, UserFirestore, ApiKeys, ApiKey, User } from './user';
import { userToFirestore, userFromFirestore } from './user';
import type { BookingApp, BookingFirestore } from './booking';
import { bookingToFirestore, bookingFromFirestore } from './booking';
import type { PartnerApp, PartnerFirestore } from './partner';
import { partnerToFirestore, partnerFromFirestore } from './partner';
import type { CountryApp, CountryFirestore } from './country';
import { countryToFirestore, countryFromFirestore } from './country';
import type { PackageApp, PackageFirestore } from './package';
import { packageToFirestore, packageFromFirestore } from './package';
import type { PromoCodeApp, PromoCodeFirestore } from './promoCode';
import { promoCodeToFirestore, promoCodeFromFirestore } from './promoCode';
import type { ESIMApp, ESIMFirestore } from './esim';
import { esimToFirestore, esimFromFirestore } from './esim';
import type { PaymentApp, PaymentFirestore } from './payment';
import { paymentToFirestore, paymentFromFirestore } from './payment';
import type { MessageApp, MessageFirestore, SentMessagesApp, SentMessagesFirestore, Message, SentMessages } from './message';
import { messageToFirestore, messageFromFirestore, sentMessagesToFirestore, sentMessagesFromFirestore } from './message';
import type { CurrencyApp, CurrencyFirestore } from './currency';
import { currencyToFirestore, currencyFromFirestore } from './currency';
import type { ApiLogApp, ApiLogFirestore } from './apiLogs';
import { apiLogToFirestore, apiLogFromFirestore } from './apiLogs';


// Export Values
export {
    // Core exports (values)
    timestampSchema, documentRefSchema, fieldValueSchema,
    baseModelSchema, createDocRefSchema,

    // Helper exports (values)
    MockDocumentReference,
    setFirestoreInstance, getFirestoreInstance,
    toFirestore, fromFirestore,
    baseModelAppSchema, // Re-export from helpers
    docRefToStringSchema, // Re-export from helpers

    // Refs exports (values) - Keep all these
    PARTNER_COLLECTION, USER_COLLECTION, PROFILE_COLLECTION, PACKAGE_COLLECTION,
    PROMO_CODE_COLLECTION, COUNTRY_COLLECTION, ESIM_COLLECTION, PAYMENT_COLLECTION,
    PRICE_LIST_COLLECTION, BOOKING_COLLECTION, MESSAGE_COLLECTION, CURRENCY_COLLECTION,
    API_LOG_COLLECTION,
    partnerRefString, userRefString, profileRefString, packageRefString, promoCodeRefString,
    countryRefString, esimRefString, paymentRefString, priceListRefString, bookingRefString,
    messageRefString, currencyRefString, apiLogRefString,
    partnerRefStringNullable, userRefStringNullable, profileRefStringNullable, packageRefStringNullable,
    promoCodeRefStringNullable, countryRefStringNullable, esimRefStringNullable, paymentRefStringNullable,
    priceListRefStringNullable, bookingRefStringNullable, messageRefStringNullable,
    apiLogRefStringNullable,
    partnerRefStringArray, userRefStringArray, profileRefStringArray, packageRefStringArray,
    promoCodeRefStringArray, countryRefStringArray, esimRefStringArray, paymentRefStringArray,
    priceListRefStringArray, bookingRefStringArray, messageRefStringArray,
    apiLogRefStringArray,
    partnerRefStringArrayNullable, userRefStringArrayNullable, profileRefStringArrayNullable, packageRefStringArrayNullable,
    promoCodeRefStringArrayNullable, countryRefStringArrayNullable, esimRefStringArrayNullable, paymentRefStringArrayNullable,
    priceListRefStringArrayNullable, bookingRefStringArrayNullable, messageRefStringArrayNullable,
    apiLogRefStringArrayNullable,
    partnerRefSchema, userRefSchema, profileRefSchema, packageRefSchema, promoCodeRefSchema,
    countryRefSchema, esimRefSchema, paymentRefSchema, priceListRefSchema, bookingRefSchema,
    messageRefSchema, currencyRefSchema, apiLogRefSchema,
    partnerRefNullable, userRefNullable, profileRefNullable, packageRefNullable, promoCodeRefNullable,
    countryRefNullable, esimRefNullable, paymentRefNullable, priceListRefNullable, bookingRefNullable,
    messageRefNullable, currencyRefNullable, apiLogRefNullable,
    partnerRefArray, userRefArray, profileRefArray, packageRefArray, promoCodeRefArray,
    countryRefArray, esimRefArray, paymentRefArray, priceListRefArray, bookingRefArray,
    messageRefArray, currencyRefArray, apiLogRefArray,
    partnerRefArrayNullable, userRefArrayNullable, profileRefArrayNullable, packageRefArrayNullable,
    promoCodeRefArrayNullable, countryRefArrayNullable, esimRefArrayNullable, paymentRefArrayNullable,
    priceListRefArrayNullable, bookingRefArrayNullable, messageRefArrayNullable,
    currencyRefStringArrayNullable,
    apiLogRefArrayNullable,

    // Module functions
    userToFirestore, userFromFirestore,
    bookingToFirestore, bookingFromFirestore,
    partnerToFirestore, partnerFromFirestore,
    countryToFirestore, countryFromFirestore,
    packageToFirestore, packageFromFirestore,
    promoCodeToFirestore, promoCodeFromFirestore,
    esimToFirestore, esimFromFirestore,
    paymentToFirestore, paymentFromFirestore,
    messageToFirestore, messageFromFirestore,
    sentMessagesToFirestore, sentMessagesFromFirestore,
    currencyToFirestore, currencyFromFirestore,
    apiLogToFirestore, apiLogFromFirestore,
};

// Export Types separately using 'export type'
export type {
    // Core types
    HubbyModelFirestore, HubbyModel,

    // Helper types
    HubbyModelApp, HHubbyModel,

    // User types
    UserApp, UserFirestore, ApiKeys as UserApiKeys, ApiKey as UserApiKey, User,

    // Booking types
    BookingApp, BookingFirestore,

    // Partner types
    PartnerApp, PartnerFirestore,

    // Country types
    CountryApp, CountryFirestore,

    // Package types
    PackageApp, PackageFirestore,

    // PromoCode types
    PromoCodeApp, PromoCodeFirestore,

    // Esim types
    ESIMApp, ESIMFirestore,

    // Payment types
    PaymentApp, PaymentFirestore,

    // Message types
    MessageApp, MessageFirestore, SentMessagesApp, SentMessagesFirestore, Message, SentMessages,

    // Currency types
    CurrencyApp, CurrencyFirestore,

    // ApiLog types
    ApiLogApp, ApiLogFirestore,
};