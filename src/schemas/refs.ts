import { z } from 'zod';
import { createDocRefSchema, docRefToStringSchema } from './helpers';

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

// Centralized ref schemas
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

// Export string versions (for app schemas)
export const partnerRefString = docRefToStringSchema(partnerRefSchema);
export const userRefString = docRefToStringSchema(userRefSchema);
export const profileRefString = docRefToStringSchema(profileRefSchema);
export const packageRefString = docRefToStringSchema(packageRefSchema);
export const promoCodeRefString = docRefToStringSchema(promoCodeRefSchema);
export const countryRefString = docRefToStringSchema(countryRefSchema);
export const esimRefString = docRefToStringSchema(esimRefSchema);
export const paymentRefString = docRefToStringSchema(paymentRefSchema);
export const priceListRefString = docRefToStringSchema(priceListRefSchema);
export const bookingRefString = docRefToStringSchema(bookingRefSchema);
export const messageRefString = docRefToStringSchema(messageRefSchema);
export const currencyRefString = docRefToStringSchema(currencyRefSchema);
export const apiLogRefString = docRefToStringSchema(apiLogRefSchema);

// Export nullable string versions
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

// Export string array versions
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

// Export nullable string array versions
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