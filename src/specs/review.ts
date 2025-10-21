import { z } from 'zod';
import {
    PARTNER_COLLECTION,
    COUNTRY_COLLECTION,
    USER_COLLECTION,
    timestampRequired,
    timestampNullable
} from './common';
import { markAsSchemaSpec } from '../common';

// Collection paths
export const REVIEW_COLLECTION = '/companies/hubby/reviews';
export const REVIEW_SUBMISSION_COLLECTION = '/companies/hubby/review_submissions';

// Package type schema for reward strategy
export const rewardPackageTypeSchema = z.enum(['data-limited', 'starter']);
export type RewardPackageType = z.infer<typeof rewardPackageTypeSchema>;

// Reward strategy base reward schema
export const baseRewardSchema = z.object({
    package_size: z.string(),
    package_type: rewardPackageTypeSchema
});

export type BaseReward = z.infer<typeof baseRewardSchema>;

// Reward strategy multipliers schema
export const rewardMultipliersSchema = z.object({
    quality_based: z.number().optional(),
    completion_based: z.number().optional()
}).optional();

export type RewardMultipliers = z.infer<typeof rewardMultipliersSchema>;

// Reward strategy schema
export const rewardStrategySchema = z.object({
    base_reward: baseRewardSchema,
    multipliers: rewardMultipliersSchema
});

export type RewardStrategy = z.infer<typeof rewardStrategySchema>;

// Review schema spec
export const reviewSchemaSpec = markAsSchemaSpec({
    id: z.string().optional(),
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    partner_id: z.string().nullable().optional(),
    questions: z.record(z.any()),
    reward_strategy: rewardStrategySchema,
    created_at: timestampRequired,
    updated_at: timestampNullable,
    created_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true }
});

// Review submission schema spec
export const reviewSubmissionSchemaSpec = markAsSchemaSpec({
    id: z.string().optional(),
    country: { _type: 'docRef' as const, collection: COUNTRY_COLLECTION, nullable: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true },
    review: { _type: 'docRef' as const, collection: REVIEW_COLLECTION, nullable: true },
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true },
    questions: z.record(z.any()),
    iccid: z.string(),
    isAndroid: z.boolean(),
    country_id: z.string(),
    partner_id: z.string(),
    review_id: z.string(),
    created_at: timestampRequired,
    updated_at: timestampNullable,
    created_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    analysis: z.record(z.any()).nullable().optional()
});

