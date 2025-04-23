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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferenceSchemas = createReferenceSchemas;
exports.createArrayReferenceSchemas = createArrayReferenceSchemas;
const zod_1 = require("zod");
const helpers_1 = require("../helpers");
const refs = __importStar(require("../refs"));
/**
 * Creates both Firestore and App schema versions of a reference field
 *
 * NOTE: Consider using the centralized ref schemas in refs.ts whenever possible
 * instead of creating new ones with this function.
 *
 * @param collection The collection path
 * @param nullable Whether the reference is nullable
 * @returns An object with Firestore and App schema definitions
 */
function createReferenceSchemas(collection, nullable = false) {
    // Get the appropriate schema based on collection name and nullable flag
    const firestoreSchema = getFirestoreRefSchema(collection, nullable);
    const appSchema = getAppRefSchema(collection, nullable);
    if (!firestoreSchema || !appSchema) {
        // Fallback to dynamic creation if the schema isn't in the centralized refs
        const { createDocRefSchema } = require('../helpers');
        const refSchema = createDocRefSchema(collection);
        return {
            firestore: nullable
                ? refSchema.schema.nullable()
                : refSchema.schema,
            app: nullable
                ? (0, helpers_1.docRefToStringSchema)(refSchema).nullable()
                : (0, helpers_1.docRefToStringSchema)(refSchema),
            refSchema
        };
    }
    return {
        firestore: firestoreSchema,
        app: appSchema,
        // For backward compatibility
        refSchema: {
            schema: firestoreSchema,
            collectionPath: collection
        }
    };
}
/**
 * Helper function to get a firestore ref schema from the centralized refs
 */
function getFirestoreRefSchema(collection, nullable) {
    const collectionMap = {
        'partners': nullable ? refs.partnerRefNullable : refs.partnerRefSchema.schema,
        'users': nullable ? refs.userRefNullable : refs.userRefSchema.schema,
        'profiles': nullable ? refs.profileRefNullable : refs.profileRefSchema.schema,
        'packages': nullable ? refs.packageRefNullable : refs.packageRefSchema.schema,
        'promo_codes': nullable ? refs.promoCodeRefNullable : refs.promoCodeRefSchema.schema,
        'countries': nullable ? refs.countryRefNullable : refs.countryRefSchema.schema,
        'esims': nullable ? refs.esimRefNullable : refs.esimRefSchema.schema,
        'payments': nullable ? refs.paymentRefNullable : refs.paymentRefSchema.schema,
        'price_lists': nullable ? refs.priceListRefNullable : refs.priceListRefSchema.schema,
        'bookings': nullable ? refs.bookingRefNullable : refs.bookingRefSchema.schema,
        'messages': nullable ? refs.messageRefNullable : refs.messageRefSchema.schema,
        'currencies': nullable ? refs.currencyRefNullable : refs.currencyRefSchema.schema,
        'api_logs': nullable ? refs.apiLogRefNullable : refs.apiLogRefSchema.schema,
    };
    return collectionMap[collection];
}
/**
 * Helper function to get an app ref schema from the centralized refs
 */
function getAppRefSchema(collection, nullable) {
    const collectionMap = {
        'partners': nullable ? refs.partnerRefStringNullable : refs.partnerRefString,
        'users': nullable ? refs.userRefStringNullable : refs.userRefString,
        'profiles': nullable ? refs.profileRefStringNullable : refs.profileRefString,
        'packages': nullable ? refs.packageRefStringNullable : refs.packageRefString,
        'promo_codes': nullable ? refs.promoCodeRefStringNullable : refs.promoCodeRefString,
        'countries': nullable ? refs.countryRefStringNullable : refs.countryRefString,
        'esims': nullable ? refs.esimRefStringNullable : refs.esimRefString,
        'payments': nullable ? refs.paymentRefStringNullable : refs.paymentRefString,
        'price_lists': nullable ? refs.priceListRefStringNullable : refs.priceListRefString,
        'bookings': nullable ? refs.bookingRefStringNullable : refs.bookingRefString,
        'messages': nullable ? refs.messageRefStringNullable : refs.messageRefString,
        'currencies': nullable ? refs.currencyRefStringNullable : refs.currencyRefString,
        'api_logs': nullable ? refs.apiLogRefStringNullable : refs.apiLogRefString,
    };
    return collectionMap[collection];
}
/**
 * Creates both Firestore and App schema versions of an array reference field
 * @param collection The collection path
 * @param nullable Whether the array itself is nullable
 * @returns An object with Firestore and App schema definitions
 */
function createArrayReferenceSchemas(collection, nullable = false) {
    // Get the appropriate array schema based on collection name and nullable flag
    const firestoreSchema = getFirestoreArrayRefSchema(collection, nullable);
    const appSchema = getAppArrayRefSchema(collection, nullable);
    if (!firestoreSchema || !appSchema) {
        // Fallback to dynamic creation
        const { createDocRefSchema } = require('../helpers');
        const refSchema = createDocRefSchema(collection);
        return {
            firestore: nullable
                ? zod_1.z.array(refSchema.schema).nullable()
                : zod_1.z.array(refSchema.schema),
            app: nullable
                ? zod_1.z.array(zod_1.z.string()).nullable()
                : zod_1.z.array(zod_1.z.string()),
            refSchema
        };
    }
    // Get base reference schema for compatibility
    const baseRefSchema = getBaseRefSchema(collection);
    return {
        firestore: firestoreSchema,
        app: appSchema,
        // For backward compatibility
        refSchema: {
            schema: baseRefSchema ? (nullable ? baseRefSchema.schema.nullable() : baseRefSchema.schema)
                : zod_1.z.any(), // Fallback if we can't determine the right schema
            collectionPath: collection
        }
    };
}
/**
 * Helper function to get the base ref schema
 */
function getBaseRefSchema(collection) {
    const map = {
        'partners': refs.partnerRefSchema,
        'users': refs.userRefSchema,
        'profiles': refs.profileRefSchema,
        'packages': refs.packageRefSchema,
        'promo_codes': refs.promoCodeRefSchema,
        'countries': refs.countryRefSchema,
        'esims': refs.esimRefSchema,
        'payments': refs.paymentRefSchema,
        'price_lists': refs.priceListRefSchema,
        'bookings': refs.bookingRefSchema,
        'messages': refs.messageRefSchema,
        'currencies': refs.currencyRefSchema,
        'api_logs': refs.apiLogRefSchema,
    };
    return map[collection];
}
/**
 * Helper function to get a firestore array ref schema from the centralized refs
 */
function getFirestoreArrayRefSchema(collection, nullable) {
    const collectionMap = {
        'partners': nullable ? refs.partnerRefArrayNullable : refs.partnerRefArray,
        'users': nullable ? refs.userRefArrayNullable : refs.userRefArray,
        'profiles': nullable ? refs.profileRefArrayNullable : refs.profileRefArray,
        'packages': nullable ? refs.packageRefArrayNullable : refs.packageRefArray,
        'promo_codes': nullable ? refs.promoCodeRefArrayNullable : refs.promoCodeRefArray,
        'countries': nullable ? refs.countryRefArrayNullable : refs.countryRefArray,
        'esims': nullable ? refs.esimRefArrayNullable : refs.esimRefArray,
        'payments': nullable ? refs.paymentRefArrayNullable : refs.paymentRefArray,
        'price_lists': nullable ? refs.priceListRefArrayNullable : refs.priceListRefArray,
        'bookings': nullable ? refs.bookingRefArrayNullable : refs.bookingRefArray,
        'messages': nullable ? refs.messageRefArrayNullable : refs.messageRefArray,
        'currencies': nullable ? refs.currencyRefArrayNullable : refs.currencyRefArray,
        'api_logs': nullable ? refs.apiLogRefArrayNullable : refs.apiLogRefArray,
    };
    return collectionMap[collection];
}
/**
 * Helper function to get an app array ref schema from the centralized refs
 */
function getAppArrayRefSchema(collection, nullable) {
    const collectionMap = {
        'partners': nullable ? refs.partnerRefStringArrayNullable : refs.partnerRefStringArray,
        'users': nullable ? refs.userRefStringArrayNullable : refs.userRefStringArray,
        'profiles': nullable ? refs.profileRefStringArrayNullable : refs.profileRefStringArray,
        'packages': nullable ? refs.packageRefStringArrayNullable : refs.packageRefStringArray,
        'promo_codes': nullable ? refs.promoCodeRefStringArrayNullable : refs.promoCodeRefStringArray,
        'countries': nullable ? refs.countryRefStringArrayNullable : refs.countryRefStringArray,
        'esims': nullable ? refs.esimRefStringArrayNullable : refs.esimRefStringArray,
        'payments': nullable ? refs.paymentRefStringArrayNullable : refs.paymentRefStringArray,
        'price_lists': nullable ? refs.priceListRefStringArrayNullable : refs.priceListRefStringArray,
        'bookings': nullable ? refs.bookingRefStringArrayNullable : refs.bookingRefStringArray,
        'messages': nullable ? refs.messageRefStringArrayNullable : refs.messageRefStringArray,
        'currencies': nullable ? refs.currencyRefStringArrayNullable : refs.currencyRefStringArray,
        'api_logs': nullable ? refs.apiLogRefStringArrayNullable : refs.apiLogRefStringArray,
    };
    return collectionMap[collection];
}
/**
 * Utility to convert collection path to camelCase
 */
function camelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
        .replace(/\s+|-|_/g, '');
}
