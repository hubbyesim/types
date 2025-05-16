import { z } from 'zod';
import { PARTNER_COLLECTION, PROFILE_COLLECTION, timestampNullableOptional, timestampRequired, timestampNullable } from './common';
import { markAsSchemaSpec } from '../common'

export const apiKeySpec = {
    expires_at: { _type: 'timestamp' as const },
    secret: z.string(),
    is_active: z.boolean(),
}

export const apiKeysSpec = {
    _type: 'record' as const,
    of: {
        _type: 'object' as const,
        of: apiKeySpec
    }
}

export const apiKeysObjectSpec = {
    _type: 'object' as const,
    of: {
        allowed_keys: { _type: 'array' as const, nullable: true, optional: true, of: z.string() },
        keys: apiKeysSpec
    },
    nullable: true,
    optional: true
}

export const userSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    stripe_id: z.string().nullable().optional(),
    referral: z.string().nullable().optional(),
    fcm: z.string().optional(),
    deeplink: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    coordinates: z.string().nullable().optional(),
    parameters: z.any().nullable().optional(),
    locale: z.string().nullable().optional(),
    phone_model: z.string().nullable().optional(),
    phone_os: z.string().nullable().optional(),
    phone_os_version: z.string().nullable().optional(),
    ios: z.boolean().nullable().optional(),
    has_card_saved: z.boolean().nullable().optional(),
    admin: z.boolean().nullable().optional(),
    api_keys: apiKeysObjectSpec,
    currency: z.string().nullable().optional(),
    receipt_email: z.string().nullable().optional(),
    source: z.enum(['direct', 'promo', 'platform']).nullable().optional(),
    role: z.array(z.enum(['admin', 'user', 'platform'])).nullable().optional(),
    balance: z.number().nullable().optional(),
    createdAt: { _type: 'timestamp' as const },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, optional: true, nullable: true },
    profileRef: { _type: 'docRef' as const, collection: PROFILE_COLLECTION, optional: true, nullable: true },
    review_requested: timestampNullableOptional,
    last_seen: timestampNullableOptional
});