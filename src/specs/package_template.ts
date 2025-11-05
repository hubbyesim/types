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
    id: z.number(),
    name: z.string(),
    traffic_policy: z.number(),
    supported_countries: z.array(z.string()),
    voice_usage_allowance: z.number(),
    data_usage_allowance: z.number(),
    sms_usage_allowance: z.number(),
    activation_time_allowance: z.number(),
    activation_type: z.string(),
    earliest_activation_date: z.number(),
    earliest_available_date: z.number(),
    latest_available_date: z.number(),
    notes: z.string(),
    time_allowance: {
        _type: 'object' as const,
        of: {
            duration: z.number(),
            unit: z.string()
        }
    },
    status: z.string(),
    deactivated_date: z.number().nullable().optional(),
    apn: z.string(),
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

// Bondio Package Template Schema Spec
export const bondioPackageTemplateSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    name: z.string(),
    voice_minutes: z.number(),
    data_mega_bytes: z.number(),
    sms_messages: z.number(),
    period_days: z.number(),
    period_iterations: z.number(),
    throttled_speed_kbps: z.number(),
    archived_at: z.number().nullable(),
    label: z.string(),
    coverage: {
        _type: 'object' as const,
        of: bondioCoverageSchema.shape
    },
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: z.string().nullable(),
    updated_by: z.string().nullable()
});

