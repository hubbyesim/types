import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    BOOKING_COLLECTION,
    ESIM_COLLECTION,
    PAYMENT_COLLECTION,
    timestampNullable,
    timestampRequired,
} from './common';

export const packageQueuePackageSpecificationSchema = z.object({
    size: z.string().optional(),
    iso3: z.string().optional(),
    destination: z.string().optional(),
    package_type: z.enum(['data-limited', 'time-limited', 'starter', 'unlimited']).optional(),
    package_duration: z.number().optional(),
});

export const packageQueueSchemaSpec = markAsSchemaSpec({
    id: z.string(),
    uuid: z.string(),
    booking: { _type: 'docRef' as const, collection: BOOKING_COLLECTION, nullable: true },
    payment: { _type: 'docRef' as const, collection: PAYMENT_COLLECTION, nullable: true },
    bundle: z.string().nullable().optional(),
    esim: { _type: 'docRef' as const, collection: ESIM_COLLECTION, nullable: true },
    package_specification: packageQueuePackageSpecificationSchema,
    origin: z.enum(['booking', 'payment']),
    showed_at: timestampNullable,
    redeemed_at: timestampNullable,
    declined_at: timestampNullable,
    created_at: timestampRequired,
    updated_at: timestampRequired,
});
