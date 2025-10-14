import { 
    ReviewSchema, 
    ReviewSubmissionSchema,
    RewardStrategySchema,
    BaseRewardSchema
} from '../src/index.server';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';
import { firestore } from './setup';

// Mock Firebase for tests
beforeAll(() => {
    const testFirebase = createFirebaseService(firestore);
    FirebaseService.setDefaultInstance(testFirebase);
});

describe('Review Schema', () => {
    it('should validate a valid Review object', () => {
        const validReview = {
            id: 'review-123',
            partner: 'partner-id',
            questions: {
                q1: 'How was the connectivity?',
                q2: 'Would you recommend this service?'
            },
            reward_strategy: {
                base_reward: {
                    package_size: '100MB',
                    package_type: 'data-limited' as const
                },
                multipliers: {
                    quality_based: 1.5,
                    completion_based: 2.0
                }
            },
            created_at: new Date(),
            updated_at: new Date(),
            created_by: null,
            updated_by: null
        };

        expect(() => ReviewSchema.parse(validReview)).not.toThrow();
    });

    it('should validate a Review with minimal fields', () => {
        const validReview = {
            partner: null,
            questions: {},
            reward_strategy: {
                base_reward: {
                    package_size: '500MB',
                    package_type: 'starter' as const
                }
            },
            created_at: new Date(),
            updated_at: null
        };

        expect(() => ReviewSchema.parse(validReview)).not.toThrow();
    });
});

describe('ReviewSubmission Schema', () => {
    it('should validate a valid ReviewSubmission object', () => {
        const validReviewSubmission = {
            id: 'submission-123',
            country: 'country-id',
            partner: 'partner-id',
            review: 'review-id',
            user: 'user-id',
            questions: {
                q1: 'Excellent',
                q2: 'Yes, definitely'
            },
            iccid: '8944500123456789012',
            isAndroid: true,
            country_id: 'US',
            partner_id: 'partner-123',
            review_id: 'review-456',
            created_at: new Date(),
            updated_at: new Date(),
            created_by: null,
            updated_by: null,
            analysis: {
                sentiment: 'positive',
                score: 0.85
            }
        };

        expect(() => ReviewSubmissionSchema.parse(validReviewSubmission)).not.toThrow();
    });

    it('should validate a ReviewSubmission with null references', () => {
        const validReviewSubmission = {
            country: null,
            partner: null,
            review: null,
            user: null,
            questions: {},
            iccid: '8944500123456789012',
            isAndroid: false,
            country_id: 'UK',
            partner_id: 'partner-456',
            review_id: 'review-789',
            created_at: new Date(),
            updated_at: null,
            analysis: null
        };

        expect(() => ReviewSubmissionSchema.parse(validReviewSubmission)).not.toThrow();
    });
});

describe('RewardStrategy Schema', () => {
    it('should validate a basic reward strategy', () => {
        const validStrategy = {
            base_reward: {
                package_size: '100MB',
                package_type: 'data-limited' as const
            }
        };

        expect(() => RewardStrategySchema.parse(validStrategy)).not.toThrow();
    });

    it('should validate a reward strategy with multipliers', () => {
        const validStrategy = {
            base_reward: {
                package_size: '500MB',
                package_type: 'starter' as const
            },
            multipliers: {
                quality_based: 1.2,
                completion_based: 1.5
            }
        };

        expect(() => RewardStrategySchema.parse(validStrategy)).not.toThrow();
    });
});

describe('BaseReward Schema', () => {
    it('should validate a base reward with data-limited type', () => {
        const validBaseReward = {
            package_size: '250MB',
            package_type: 'data-limited' as const
        };

        expect(() => BaseRewardSchema.parse(validBaseReward)).not.toThrow();
    });

    it('should validate a base reward with starter type', () => {
        const validBaseReward = {
            package_size: '1GB',
            package_type: 'starter' as const
        };

        expect(() => BaseRewardSchema.parse(validBaseReward)).not.toThrow();
    });

    it('should reject invalid package type', () => {
        const invalidBaseReward = {
            package_size: '100MB',
            package_type: 'unlimited'
        };

        expect(() => BaseRewardSchema.parse(invalidBaseReward)).toThrow();
    });
});

