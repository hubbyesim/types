import { z } from 'zod';
import { createIdSchema } from './helpers';

// Collection paths
export const PARTNER_COLLECTION = 'partners';
export const USER_COLLECTION = 'users';
export const PROFILE_COLLECTION = 'profiles';
export const PACKAGE_COLLECTION = 'packages';
export const PROMO_CODE_COLLECTION = 'promo_codes';
export const COUNTRY_COLLECTION = 'countries';
export const ESIM_COLLECTION = 'esims';
export const PAYMENT_COLLECTION = 'payments';
export const PRICE_LIST_COLLECTION = 'price_lists';
export const BOOKING_COLLECTION = 'bookings';
export const MESSAGE_COLLECTION = 'messages';
export const CURRENCY_COLLECTION = 'currencies';
export const API_LOG_COLLECTION = 'api_logs';

// String ID schemas (for app schemas)
export const partnerRefString = createIdSchema(PARTNER_COLLECTION);
export const userRefString = createIdSchema(USER_COLLECTION);
export const profileRefString = createIdSchema(PROFILE_COLLECTION);
export const packageRefString = createIdSchema(PACKAGE_COLLECTION);
export const promoCodeRefString = createIdSchema(PROMO_CODE_COLLECTION);
export const countryRefString = createIdSchema(COUNTRY_COLLECTION);
export const esimRefString = createIdSchema(ESIM_COLLECTION);
export const paymentRefString = createIdSchema(PAYMENT_COLLECTION);
export const priceListRefString = createIdSchema(PRICE_LIST_COLLECTION);
export const bookingRefString = createIdSchema(BOOKING_COLLECTION);
export const messageRefString = createIdSchema(MESSAGE_COLLECTION);
export const currencyRefString = createIdSchema(CURRENCY_COLLECTION);
export const apiLogRefString = createIdSchema(API_LOG_COLLECTION);

// Nullable string versions
export const partnerRefStringNullable = partnerRefString.nullable();
export const userRefStringNullable = userRefString.nullable();
export const profileRefStringNullable = profileRefString.nullable();
export const packageRefStringNullable = packageRefString.nullable();
export const promoCodeRefStringNullable = promoCodeRefString.nullable();
export const countryRefStringNullable = countryRefString.nullable();
export const esimRefStringNullable = esimRefString.nullable();
export const paymentRefStringNullable = paymentRefString.nullable();
export const priceListRefStringNullable = priceListRefString.nullable();
export const bookingRefStringNullable = bookingRefString.nullable();
export const messageRefStringNullable = messageRefString.nullable();
export const currencyRefStringNullable = currencyRefString.nullable();
export const apiLogRefStringNullable = apiLogRefString.nullable();

// String array versions
export const partnerRefStringArray = z.array(z.string());
export const userRefStringArray = z.array(z.string());
export const profileRefStringArray = z.array(z.string());
export const packageRefStringArray = z.array(z.string());
export const promoCodeRefStringArray = z.array(z.string());
export const countryRefStringArray = z.array(z.string());
export const esimRefStringArray = z.array(z.string());
export const paymentRefStringArray = z.array(z.string());
export const priceListRefStringArray = z.array(z.string());
export const bookingRefStringArray = z.array(z.string());
export const messageRefStringArray = z.array(z.string());
export const currencyRefStringArray = z.array(z.string());
export const apiLogRefStringArray = z.array(z.string());

// Nullable string array versions
export const partnerRefStringArrayNullable = partnerRefStringArray.nullable();
export const userRefStringArrayNullable = userRefStringArray.nullable();
export const profileRefStringArrayNullable = profileRefStringArray.nullable();
export const packageRefStringArrayNullable = packageRefStringArray.nullable();
export const promoCodeRefStringArrayNullable = promoCodeRefStringArray.nullable();
export const countryRefStringArrayNullable = countryRefStringArray.nullable();
export const esimRefStringArrayNullable = esimRefStringArray.nullable();
export const paymentRefStringArrayNullable = paymentRefStringArray.nullable();
export const priceListRefStringArrayNullable = priceListRefStringArray.nullable();
export const bookingRefStringArrayNullable = bookingRefStringArray.nullable();
export const messageRefStringArrayNullable = messageRefStringArray.nullable();
export const currencyRefStringArrayNullable = currencyRefStringArray.nullable();
export const apiLogRefStringArrayNullable = apiLogRefStringArray.nullable(); 