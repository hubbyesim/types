import { z } from 'zod';
import { SUPPORTED_LOCALES, SupportedLocales } from '../constants';

// Re-export SUPPORTED_LOCALES for backward compatibility
export { SUPPORTED_LOCALES };
export type { SupportedLocales };

// Collection paths
export const PARTNER_COLLECTION = '/companies/hubby/partners';
export const USER_COLLECTION = 'users';
export const PROFILE_COLLECTION = '/companies/hubby/profiles';
export const PACKAGE_COLLECTION = '/companies/hubby/packages';
export const PROMO_CODE_COLLECTION = '/companies/hubby/promo_codes';
export const COUNTRY_COLLECTION = 'countries';
export const ESIM_COLLECTION = 'esims';
export const PAYMENT_COLLECTION = 'payments';
export const PRICE_LIST_COLLECTION = 'price_lists';
export const BOOKING_COLLECTION = 'bookings';
export const MESSAGE_COLLECTION = 'messages';
export const CURRENCY_COLLECTION = 'currencies';
export const API_LOG_COLLECTION = 'api_logs'

// Base timestamp type
const baseTimestamp = { _type: 'timestamp' as const };

// Derived timestamp types
export const timestampRequired = { ...baseTimestamp, nullable: false, optional: false };
export const timestampNullable = { ...baseTimestamp, nullable: true, optional: false };
export const timestampNullableOptional = { ...baseTimestamp, nullable: true, optional: true };

export const hubbyModelSpec = {
    id: z.string().nullable().optional(),
    created_at: timestampRequired,
    updated_at: timestampNullableOptional,
    created_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
}