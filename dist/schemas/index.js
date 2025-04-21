"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFirestoreSchema = exports.sentMessagesFromFirestore = exports.sentMessagesToFirestore = exports.sentMessagesAppSchema = exports.sentMessagesFirestoreSchema = exports.messageFromFirestore = exports.messageToFirestore = exports.messageAppSchema = exports.messageFirestoreSchema = exports.paymentFromFirestore = exports.paymentToFirestore = exports.paymentAppSchema = exports.paymentFirestoreSchema = exports.esimFromFirestore = exports.esimToFirestore = exports.esimAppSchema = exports.esimFirestoreSchema = exports.promoCodeFromFirestore = exports.promoCodeToFirestore = exports.promoCodeAppSchema = exports.promoCodeFirestoreSchema = exports.packageFromFirestore = exports.packageToFirestore = exports.packageAppSchema = exports.packageFirestoreSchema = exports.countryFromFirestore = exports.countryToFirestore = exports.countryAppSchema = exports.countryFirestoreSchema = exports.PRICE_LIST_COLLECTION = exports.PARTNER_COLLECTION = exports.priceListFromFirestore = exports.priceListToFirestore = exports.priceListAppSchema = exports.priceListFirestoreSchema = exports.partnerFromFirestore = exports.partnerToFirestore = exports.partnerAppSchema = exports.partnerFirestoreSchema = exports.communicationOptionsSchema = exports.communicationChannelSchema = exports.bookingFromFirestore = exports.bookingToFirestore = exports.bookingAppSchema = exports.bookingFirestoreSchema = exports.PROFILE_COLLECTION = exports.userFromFirestore = exports.userToFirestore = exports.userAppSchema = exports.userFirestoreSchema = void 0;
exports.supportedLocalesSchema = exports.SUPPORTED_LOCALES = exports.partnerApiResponseSchema = exports.partnerApiRequestSchema = exports.bookingApiRequestSchema = exports.promoCodeApiResponseSchema = exports.bookingApiResponseSchema = exports.packageSpecificationsSchema = exports.packageSpecificationSchema = exports.apiLogFromFirestore = exports.apiLogToFirestore = exports.apiLogAppSchema = exports.apiLogFirestoreSchema = exports.conversionRateSchema = exports.currencyFromFirestore = exports.currencyToFirestore = exports.currencyAppSchema = void 0;
// Export helpers
__exportStar(require("./helpers"), exports);
// Export from user schema
var user_1 = require("./user");
Object.defineProperty(exports, "userFirestoreSchema", { enumerable: true, get: function () { return user_1.userFirestoreSchema; } });
Object.defineProperty(exports, "userAppSchema", { enumerable: true, get: function () { return user_1.userAppSchema; } });
Object.defineProperty(exports, "userToFirestore", { enumerable: true, get: function () { return user_1.userToFirestore; } });
Object.defineProperty(exports, "userFromFirestore", { enumerable: true, get: function () { return user_1.userFromFirestore; } });
Object.defineProperty(exports, "PROFILE_COLLECTION", { enumerable: true, get: function () { return user_1.PROFILE_COLLECTION; } });
// Export from booking schema
var booking_1 = require("./booking");
Object.defineProperty(exports, "bookingFirestoreSchema", { enumerable: true, get: function () { return booking_1.bookingFirestoreSchema; } });
Object.defineProperty(exports, "bookingAppSchema", { enumerable: true, get: function () { return booking_1.bookingAppSchema; } });
Object.defineProperty(exports, "bookingToFirestore", { enumerable: true, get: function () { return booking_1.bookingToFirestore; } });
Object.defineProperty(exports, "bookingFromFirestore", { enumerable: true, get: function () { return booking_1.bookingFromFirestore; } });
Object.defineProperty(exports, "communicationChannelSchema", { enumerable: true, get: function () { return booking_1.communicationChannelSchema; } });
Object.defineProperty(exports, "communicationOptionsSchema", { enumerable: true, get: function () { return booking_1.communicationOptionsSchema; } });
// Export from partner schema
var partner_1 = require("./partner");
Object.defineProperty(exports, "partnerFirestoreSchema", { enumerable: true, get: function () { return partner_1.partnerFirestoreSchema; } });
Object.defineProperty(exports, "partnerAppSchema", { enumerable: true, get: function () { return partner_1.partnerAppSchema; } });
Object.defineProperty(exports, "partnerToFirestore", { enumerable: true, get: function () { return partner_1.partnerToFirestore; } });
Object.defineProperty(exports, "partnerFromFirestore", { enumerable: true, get: function () { return partner_1.partnerFromFirestore; } });
Object.defineProperty(exports, "priceListFirestoreSchema", { enumerable: true, get: function () { return partner_1.priceListFirestoreSchema; } });
Object.defineProperty(exports, "priceListAppSchema", { enumerable: true, get: function () { return partner_1.priceListAppSchema; } });
Object.defineProperty(exports, "priceListToFirestore", { enumerable: true, get: function () { return partner_1.priceListToFirestore; } });
Object.defineProperty(exports, "priceListFromFirestore", { enumerable: true, get: function () { return partner_1.priceListFromFirestore; } });
Object.defineProperty(exports, "PARTNER_COLLECTION", { enumerable: true, get: function () { return partner_1.PARTNER_COLLECTION; } });
Object.defineProperty(exports, "PRICE_LIST_COLLECTION", { enumerable: true, get: function () { return partner_1.PRICE_LIST_COLLECTION; } });
// Export from country schema
var country_1 = require("./country");
Object.defineProperty(exports, "countryFirestoreSchema", { enumerable: true, get: function () { return country_1.countryFirestoreSchema; } });
Object.defineProperty(exports, "countryAppSchema", { enumerable: true, get: function () { return country_1.countryAppSchema; } });
Object.defineProperty(exports, "countryToFirestore", { enumerable: true, get: function () { return country_1.countryToFirestore; } });
Object.defineProperty(exports, "countryFromFirestore", { enumerable: true, get: function () { return country_1.countryFromFirestore; } });
// Export from package schema
var package_1 = require("./package");
Object.defineProperty(exports, "packageFirestoreSchema", { enumerable: true, get: function () { return package_1.packageFirestoreSchema; } });
Object.defineProperty(exports, "packageAppSchema", { enumerable: true, get: function () { return package_1.packageAppSchema; } });
Object.defineProperty(exports, "packageToFirestore", { enumerable: true, get: function () { return package_1.packageToFirestore; } });
Object.defineProperty(exports, "packageFromFirestore", { enumerable: true, get: function () { return package_1.packageFromFirestore; } });
// Export from promoCode schema
var promoCode_1 = require("./promoCode");
Object.defineProperty(exports, "promoCodeFirestoreSchema", { enumerable: true, get: function () { return promoCode_1.promoCodeFirestoreSchema; } });
Object.defineProperty(exports, "promoCodeAppSchema", { enumerable: true, get: function () { return promoCode_1.promoCodeAppSchema; } });
Object.defineProperty(exports, "promoCodeToFirestore", { enumerable: true, get: function () { return promoCode_1.promoCodeToFirestore; } });
Object.defineProperty(exports, "promoCodeFromFirestore", { enumerable: true, get: function () { return promoCode_1.promoCodeFromFirestore; } });
// Export from esim schema
var esim_1 = require("./esim");
Object.defineProperty(exports, "esimFirestoreSchema", { enumerable: true, get: function () { return esim_1.esimFirestoreSchema; } });
Object.defineProperty(exports, "esimAppSchema", { enumerable: true, get: function () { return esim_1.esimAppSchema; } });
Object.defineProperty(exports, "esimToFirestore", { enumerable: true, get: function () { return esim_1.esimToFirestore; } });
Object.defineProperty(exports, "esimFromFirestore", { enumerable: true, get: function () { return esim_1.esimFromFirestore; } });
// Export from payment schema
var payment_1 = require("./payment");
Object.defineProperty(exports, "paymentFirestoreSchema", { enumerable: true, get: function () { return payment_1.paymentFirestoreSchema; } });
Object.defineProperty(exports, "paymentAppSchema", { enumerable: true, get: function () { return payment_1.paymentAppSchema; } });
Object.defineProperty(exports, "paymentToFirestore", { enumerable: true, get: function () { return payment_1.paymentToFirestore; } });
Object.defineProperty(exports, "paymentFromFirestore", { enumerable: true, get: function () { return payment_1.paymentFromFirestore; } });
// Export from message schema
var message_1 = require("./message");
Object.defineProperty(exports, "messageFirestoreSchema", { enumerable: true, get: function () { return message_1.messageFirestoreSchema; } });
Object.defineProperty(exports, "messageAppSchema", { enumerable: true, get: function () { return message_1.messageAppSchema; } });
Object.defineProperty(exports, "messageToFirestore", { enumerable: true, get: function () { return message_1.messageToFirestore; } });
Object.defineProperty(exports, "messageFromFirestore", { enumerable: true, get: function () { return message_1.messageFromFirestore; } });
Object.defineProperty(exports, "sentMessagesFirestoreSchema", { enumerable: true, get: function () { return message_1.sentMessagesFirestoreSchema; } });
Object.defineProperty(exports, "sentMessagesAppSchema", { enumerable: true, get: function () { return message_1.sentMessagesAppSchema; } });
Object.defineProperty(exports, "sentMessagesToFirestore", { enumerable: true, get: function () { return message_1.sentMessagesToFirestore; } });
Object.defineProperty(exports, "sentMessagesFromFirestore", { enumerable: true, get: function () { return message_1.sentMessagesFromFirestore; } });
// Export from currency schema
var currency_1 = require("./currency");
Object.defineProperty(exports, "currencyFirestoreSchema", { enumerable: true, get: function () { return currency_1.currencyFirestoreSchema; } });
Object.defineProperty(exports, "currencyAppSchema", { enumerable: true, get: function () { return currency_1.currencyAppSchema; } });
Object.defineProperty(exports, "currencyToFirestore", { enumerable: true, get: function () { return currency_1.currencyToFirestore; } });
Object.defineProperty(exports, "currencyFromFirestore", { enumerable: true, get: function () { return currency_1.currencyFromFirestore; } });
Object.defineProperty(exports, "conversionRateSchema", { enumerable: true, get: function () { return currency_1.conversionRateSchema; } });
// Export from apiLogs schema
var apiLogs_1 = require("./apiLogs");
Object.defineProperty(exports, "apiLogFirestoreSchema", { enumerable: true, get: function () { return apiLogs_1.apiLogFirestoreSchema; } });
Object.defineProperty(exports, "apiLogAppSchema", { enumerable: true, get: function () { return apiLogs_1.apiLogAppSchema; } });
Object.defineProperty(exports, "apiLogToFirestore", { enumerable: true, get: function () { return apiLogs_1.apiLogToFirestore; } });
Object.defineProperty(exports, "apiLogFromFirestore", { enumerable: true, get: function () { return apiLogs_1.apiLogFromFirestore; } });
// Export from API schema
var api_1 = require("./api");
Object.defineProperty(exports, "packageSpecificationSchema", { enumerable: true, get: function () { return api_1.packageSpecificationSchema; } });
Object.defineProperty(exports, "packageSpecificationsSchema", { enumerable: true, get: function () { return api_1.packageSpecificationsSchema; } });
Object.defineProperty(exports, "bookingApiResponseSchema", { enumerable: true, get: function () { return api_1.bookingApiResponseSchema; } });
Object.defineProperty(exports, "promoCodeApiResponseSchema", { enumerable: true, get: function () { return api_1.promoCodeApiResponseSchema; } });
Object.defineProperty(exports, "bookingApiRequestSchema", { enumerable: true, get: function () { return api_1.bookingApiRequestSchema; } });
Object.defineProperty(exports, "partnerApiRequestSchema", { enumerable: true, get: function () { return api_1.partnerApiRequestSchema; } });
Object.defineProperty(exports, "partnerApiResponseSchema", { enumerable: true, get: function () { return api_1.partnerApiResponseSchema; } });
// Export from constants
var constants_1 = require("../constants");
Object.defineProperty(exports, "SUPPORTED_LOCALES", { enumerable: true, get: function () { return constants_1.SUPPORTED_LOCALES; } });
Object.defineProperty(exports, "supportedLocalesSchema", { enumerable: true, get: function () { return constants_1.supportedLocalesSchema; } });
