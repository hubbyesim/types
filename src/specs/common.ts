import { z } from 'zod';

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

export const timestampNullableOptional = { _type: 'timestamp' as const, nullable: true, optional: true };
export const timestampNullable = { _type: 'timestamp' as const, nullable: true, optional: false };
export const timestampRequired = { _type: 'timestamp' as const, nullable: false, optional: false };

export const hubbyModelSpec = {
    id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampNullableOptional,
    created_by: { _type: 'docRef' as const, collection: 'users', nullable: false, optional: false },
    updated_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
}

export const SUPPORTED_LOCALES = [
    'en-US',
    'en-GB',
    'nl-NL',
    'de-DE',
    'fr-FR',
    'it-IT',
    'es-ES',
    'cs-CZ',
    'pl-PL',
    'pt-PT',
    'fr-BE',
    'nl-BE',
    'de-AT',
    'de-CH',
    'fr-CH',
    'it-CH',
    'sv-SE',
    'sk-SK',
    'de-BE'
] as const;

// Define the type using TypeScript's typeof and indexing
export type SupportedLocales = typeof SUPPORTED_LOCALES[number];