import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    hubbyModelSpec,
    USER_COLLECTION,
    USER_TOUCHPOINTS_COLLECTION,
    PROMO_CODE_COLLECTION
} from './common';

export const appFlowFeedbackSchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    message: z.string(),
    type: z.string(),
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true },
    user_touchpoint: { _type: 'docRef' as const, collection: USER_TOUCHPOINTS_COLLECTION, nullable: true },
    promo_code: { _type: 'docRef' as const, collection: PROMO_CODE_COLLECTION, nullable: true },
    iccid: z.string().nullable(),
    locale: z.string().nullable()
});
