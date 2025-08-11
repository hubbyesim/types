import { z } from 'zod';
import { markAsSchemaSpec } from '../common';

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
export const ROLE_COLLECTION = 'roles';
export const PERMISSION_COLLECTION = 'permissions';
export const TRAFFIC_POLICY_COLLECTION = 'traffic_policies';

// Timestamp specs
export const timestampNullableOptional = { _type: 'timestamp' as const, nullable: true, optional: true };
export const timestampNullable = { _type: 'timestamp' as const, nullable: true, optional: false };
export const timestampRequired = { _type: 'timestamp' as const, nullable: false, optional: false };

export const hubbyModelSpec = {
    id: z.string().nullable().optional(),
    created_at: timestampRequired,
    updated_at: timestampNullableOptional,
    created_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: 'users', nullable: true, optional: true },
}

export const tagModelSpec = {
    ...hubbyModelSpec,
    slug: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
}