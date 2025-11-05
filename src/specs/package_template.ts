import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    timestampRequired
} from './common';

// Bondio Coverage nested schemas
export const bondioCoverageOperatorSchema = z.object({
    name: z.string(),
    supported_rats: z.array(z.string())
});

export const bondioCoverageCountrySchema = z.object({
    name: z.string(),
    iso2: z.string(),
    iso3: z.string(),
    operators: z.array(bondioCoverageOperatorSchema)
});

export const bondioCoverageSchema = z.object({
    id: z.string(),
    name: z.string(),
    label: z.string(),
    countries: z.array(bondioCoverageCountrySchema)
});

// Bondio Coverage Schema Spec for use in markAsSchemaSpec
export const bondioCoverageSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    name: z.string(),
    label: z.string(),
    countries: {
        _type: 'array' as const,
        of: {
            _type: 'object' as const,
            of: {
                name: z.string(),
                iso2: z.string(),
                iso3: z.string(),
                operators: {
                    _type: 'array' as const,
                    of: {
                        _type: 'object' as const,
                        of: {
                            name: z.string(),
                            supported_rats: {
                                _type: 'array' as const,
                                of: z.string()
                            }
                        }
                    }
                }
            }
        }
    }
});

// Telna Package Template Schema Spec
export const telnaPackageTemplateSchemaSpec = markAsSchemaSpec({
    id: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    purchase_price: z.number().nullable().optional(),
    traffic_policy: z.number().nullable().optional(),
    supported_countries: z.array(z.string()).nullable().optional(),
    voice_usage_allowance: z.number().nullable().optional(),
    data_usage_allowance: z.number().nullable().optional(),
    sms_usage_allowance: z.number().nullable().optional(),
    activation_time_allowance: z.number().nullable().optional(),
    activation_type: z.string().nullable().optional(),
    earliest_activation_date: z.number().nullable().optional(),
    earliest_available_date: z.number().nullable().optional(),
    latest_available_date: z.number().nullable().optional(),
    notes: z.string().nullable().optional(),
    time_allowance: {
        _type: 'object' as const,
        of: {
            duration: z.number(),
            unit: z.string()
        }
    },
    status: z.string().nullable().optional(),
    deactivated_date: z.number().nullable().optional(),
    apn: z.string().nullable().optional(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable().optional(),
    updated_by: z.string().nullable().optional()
});

// Bondio Package Template Schema Spec
export const bondioPackageTemplateSchemaSpec = markAsSchemaSpec({
    id: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    purchase_price: z.number().nullable().optional(),
    voice_minutes: z.number().nullable().optional(),
    data_mega_bytes: z.number().nullable().optional(),
    sms_messages: z.number().nullable().optional(),
    period_days: z.number().nullable().optional(),
    period_iterations: z.number().nullable().optional(),
    throttled_speed_kbps: z.number().nullable().optional(),
    archived_at: z.number().nullable().optional(),
    label: z.string().nullable().optional(),
    coverage: {
        _type: 'object' as const,
        of: bondioCoverageSchema.shape
    },
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable().optional(),
    updated_by: z.string().nullable().optional()
});

