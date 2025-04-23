import { z } from 'zod';
import { docRefToStringSchema } from '../helpers';
import * as refs from '../refs';

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
export function createReferenceSchemas<T>(collection: string, nullable = false) {
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
                ? docRefToStringSchema(refSchema).nullable() 
                : docRefToStringSchema(refSchema),
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
function getFirestoreRefSchema(collection: string, nullable: boolean) {
    const collectionMap: Record<string, any> = {
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
function getAppRefSchema(collection: string, nullable: boolean) {
    const collectionMap: Record<string, any> = {
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
export function createArrayReferenceSchemas<T>(collection: string, nullable = false) {
    // Get the appropriate array schema based on collection name and nullable flag
    const firestoreSchema = getFirestoreArrayRefSchema(collection, nullable);
    const appSchema = getAppArrayRefSchema(collection, nullable);
    
    if (!firestoreSchema || !appSchema) {
        // Fallback to dynamic creation
        const { createDocRefSchema } = require('../helpers');
        const refSchema = createDocRefSchema(collection);
        
        return {
            firestore: nullable 
                ? z.array(refSchema.schema).nullable() 
                : z.array(refSchema.schema),
            app: nullable 
                ? z.array(z.string()).nullable() 
                : z.array(z.string()),
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
                   : z.any(), // Fallback if we can't determine the right schema
            collectionPath: collection
        }
    };
}

/**
 * Helper function to get the base ref schema
 */
function getBaseRefSchema(collection: string) {
    const map: Record<string, any> = {
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
function getFirestoreArrayRefSchema(collection: string, nullable: boolean) {
    const collectionMap: Record<string, any> = {
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
function getAppArrayRefSchema(collection: string, nullable: boolean) {
    const collectionMap: Record<string, any> = {
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
function camelCase(str: string) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
            index === 0 ? letter.toLowerCase() : letter.toUpperCase()
        )
        .replace(/\s+|-|_/g, '');
} 