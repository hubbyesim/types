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

export const timestampNullableOptional = { _type: 'timestamp' as const, nullable: true, optional: true };
export const timestampNullable = { _type: 'timestamp' as const, nullable: true, optional: false };
export const timestampRequired = { _type: 'timestamp' as const, nullable: false, optional: false };