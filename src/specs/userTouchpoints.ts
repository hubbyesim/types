import { z } from 'zod';
import { 
    USER_TOUCHPOINTS_COLLECTION,
    USER_COLLECTION,
    timestampRequired,
    timestampNullableOptional,
    BOOKING_COLLECTION,
    PROMO_CODE_COLLECTION,
    PARTNER_COLLECTION
} from './common';
import { markAsSchemaSpec } from '../common';

export const userTouchpointsSchemaSpec = markAsSchemaSpec({
    id: z.string().nullable().optional(),
    unique_device_identifier: z.string().nullable().optional(),
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    booking: { _type: 'docRef' as const, collection: BOOKING_COLLECTION, nullable: true, optional: true },
    promo_code: { _type: 'docRef' as const, collection: PROMO_CODE_COLLECTION, nullable: true, optional: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true, optional: true },
    promo_code_redeemed_at: timestampNullableOptional,
    esim_assigned_at: timestampNullableOptional,
    esim_install_initiated_at: timestampNullableOptional,
    esim_install_completed_at: timestampNullableOptional,
    esim_first_package_activated_at: timestampNullableOptional,
    esim_topped_up_at: timestampNullableOptional,
    created_at: timestampRequired,
    updated_at: timestampRequired,
    created_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    updated_by: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
});
