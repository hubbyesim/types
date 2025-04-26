import { z } from 'zod';
import {
    baseModelAppSchema,
    zDateString
} from './helpers';
import {
    partnerRefStringNullable,
    profileRefStringNullable
} from './refs';

// Schema for API Key (base version with Date)
export const apiKeySchema = z.object({
    expires_at: zDateString(),
    secret: z.string(),
    is_active: z.boolean()
});

// Schema for API Keys
export const apiKeysSchema = z.object({
    allowed_keys: z.array(z.string()),
    keys: z.record(z.string(), apiKeySchema)
});

// Common user fields shared between schemas
export const commonUserFields = {
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    stripe_id: z.string().nullable(),
    referral: z.string().nullable(),
    fcm: z.string().optional(),
    deeplink: z.string().nullable(),
    gender: z.string().nullable(),
    company: z.string().nullable(),
    coordinates: z.string().nullable(),
    parameters: z.any().nullable(),
    locale: z.string().nullable(),
    phone_model: z.string().nullable(),
    phone_os: z.string().nullable(),
    phone_os_version: z.string().nullable(),
    ios: z.boolean().nullable(),
    has_card_saved: z.boolean().nullable(),
    admin: z.boolean().nullable(),
    api_keys: apiKeysSchema.nullable(),
    currency: z.string().nullable(),
    receipt_email: z.string().nullable()
};

// Define App schema (with JavaScript-friendly types)
export const userAppSchema = baseModelAppSchema.extend({
    ...commonUserFields,
    createdAt: zDateString(),
    partner: partnerRefStringNullable,
    profileRef: profileRefStringNullable,
    balance: z.number().nullable(),
    review_requested: zDateString().nullable(),
    last_seen: zDateString().nullable()
});

// Define types based on schemas
export type UserApp = z.infer<typeof userAppSchema>;
export type ApiKeys = z.infer<typeof apiKeysSchema>;
export type ApiKey = z.infer<typeof apiKeySchema>;

// For backwards compatibility
export type HUser = UserApp; 