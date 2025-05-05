import { z } from 'zod';
import { createDocRefSchema } from './core';

// Re-export collection paths from base
import {
    PARTNER_COLLECTION,
    USER_COLLECTION,
    PROFILE_COLLECTION,
    PACKAGE_COLLECTION,
    PROMO_CODE_COLLECTION,
    COUNTRY_COLLECTION,
    ESIM_COLLECTION,
    PAYMENT_COLLECTION,
    PRICE_LIST_COLLECTION,
    BOOKING_COLLECTION,
    MESSAGE_COLLECTION,
    CURRENCY_COLLECTION,
    API_LOG_COLLECTION,

    // Re-export string ref schemas
    partnerRefString,
    userRefString,
    profileRefString,
    packageRefString,
    promoCodeRefString,
    countryRefString,
    esimRefString,
    paymentRefString,
    priceListRefString,
    bookingRefString,
    messageRefString,
    currencyRefString,
    apiLogRefString,

    // Re-export nullable string ref schemas
    partnerRefStringNullable,
    userRefStringNullable,
    profileRefStringNullable,
    packageRefStringNullable,
    promoCodeRefStringNullable,
    countryRefStringNullable,
    esimRefStringNullable,
    paymentRefStringNullable,
    priceListRefStringNullable,
    bookingRefStringNullable,
    messageRefStringNullable,
    currencyRefStringNullable,
    apiLogRefStringNullable,

    // Re-export string array ref schemas
    partnerRefStringArray,
    userRefStringArray,
    profileRefStringArray,
    packageRefStringArray,
    promoCodeRefStringArray,
    countryRefStringArray,
    esimRefStringArray,
    paymentRefStringArray,
    priceListRefStringArray,
    bookingRefStringArray,
    messageRefStringArray,
    currencyRefStringArray,
    apiLogRefStringArray,

    // Re-export nullable string array ref schemas
    partnerRefStringArrayNullable,
    userRefStringArrayNullable,
    profileRefStringArrayNullable,
    packageRefStringArrayNullable,
    promoCodeRefStringArrayNullable,
    countryRefStringArrayNullable,
    esimRefStringArrayNullable,
    paymentRefStringArrayNullable,
    priceListRefStringArrayNullable,
    bookingRefStringArrayNullable,
    messageRefStringArrayNullable,
    currencyRefStringArrayNullable,
    apiLogRefStringArrayNullable
} from '../base/refs';

// Re-export all for convenience
export * from '../base/refs';

// Centralized ref schemas using Firebase DocumentReference
export const partnerRefSchema = createDocRefSchema<any>(PARTNER_COLLECTION);
export const userRefSchema = createDocRefSchema<any>(USER_COLLECTION);
export const profileRefSchema = createDocRefSchema<any>(PROFILE_COLLECTION);
export const packageRefSchema = createDocRefSchema<any>(PACKAGE_COLLECTION);
export const promoCodeRefSchema = createDocRefSchema<any>(PROMO_CODE_COLLECTION);
export const countryRefSchema = createDocRefSchema<any>(COUNTRY_COLLECTION);
export const esimRefSchema = createDocRefSchema<any>(ESIM_COLLECTION);
export const paymentRefSchema = createDocRefSchema<any>(PAYMENT_COLLECTION);
export const priceListRefSchema = createDocRefSchema<any>(PRICE_LIST_COLLECTION);
export const bookingRefSchema = createDocRefSchema<any>(BOOKING_COLLECTION);
export const messageRefSchema = createDocRefSchema<any>(MESSAGE_COLLECTION);
export const currencyRefSchema = createDocRefSchema<any>(CURRENCY_COLLECTION);
export const apiLogRefSchema = createDocRefSchema<any>(API_LOG_COLLECTION);

// Export nullable versions
export const partnerRefNullable = partnerRefSchema.schema.nullable();
export const userRefNullable = userRefSchema.schema.nullable();
export const profileRefNullable = profileRefSchema.schema.nullable();
export const packageRefNullable = packageRefSchema.schema.nullable();
export const promoCodeRefNullable = promoCodeRefSchema.schema.nullable();
export const countryRefNullable = countryRefSchema.schema.nullable();
export const esimRefNullable = esimRefSchema.schema.nullable();
export const paymentRefNullable = paymentRefSchema.schema.nullable();
export const priceListRefNullable = priceListRefSchema.schema.nullable();
export const bookingRefNullable = bookingRefSchema.schema.nullable();
export const messageRefNullable = messageRefSchema.schema.nullable();
export const currencyRefNullable = currencyRefSchema.schema.nullable();
export const apiLogRefNullable = apiLogRefSchema.schema.nullable();

// Export array versions
export const partnerRefArray = z.array(partnerRefSchema.schema);
export const userRefArray = z.array(userRefSchema.schema);
export const profileRefArray = z.array(profileRefSchema.schema);
export const packageRefArray = z.array(packageRefSchema.schema);
export const promoCodeRefArray = z.array(promoCodeRefSchema.schema);
export const countryRefArray = z.array(countryRefSchema.schema);
export const esimRefArray = z.array(esimRefSchema.schema);
export const paymentRefArray = z.array(paymentRefSchema.schema);
export const priceListRefArray = z.array(priceListRefSchema.schema);
export const bookingRefArray = z.array(bookingRefSchema.schema);
export const messageRefArray = z.array(messageRefSchema.schema);
export const currencyRefArray = z.array(currencyRefSchema.schema);
export const apiLogRefArray = z.array(apiLogRefSchema.schema);

// Export nullable array versions
export const partnerRefArrayNullable = partnerRefArray.nullable();
export const userRefArrayNullable = userRefArray.nullable();
export const profileRefArrayNullable = profileRefArray.nullable();
export const packageRefArrayNullable = packageRefArray.nullable();
export const promoCodeRefArrayNullable = promoCodeRefArray.nullable();
export const countryRefArrayNullable = countryRefArray.nullable();
export const esimRefArrayNullable = esimRefArray.nullable();
export const paymentRefArrayNullable = paymentRefArray.nullable();
export const priceListRefArrayNullable = priceListRefArray.nullable();
export const bookingRefArrayNullable = bookingRefArray.nullable();
export const messageRefArrayNullable = messageRefArray.nullable();
export const currencyRefArrayNullable = currencyRefArray.nullable();
export const apiLogRefArrayNullable = apiLogRefArray.nullable(); 