import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import {
    hubbyModelSpec,
    timestampNullableOptional,
    PARTNER_COLLECTION,
    USER_COLLECTION,
    PROMO_CODE_COLLECTION,
} from './common';

export const autoInstallationEventsSchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,

    // Event timestamps
    auto_install_initiated: timestampNullableOptional,
    auto_install_completed: timestampNullableOptional,
    auto_install_failed: timestampNullableOptional,
    manual_install_selected: timestampNullableOptional,

    // Device & environment info
    device_model: z.string().nullable().optional(),
    os_name: z.enum(['iOS', 'Android']).nullable().optional(),
    os_version: z.string().nullable().optional(),
    app_version: z.string().nullable().optional(),
    unique_device_identifier: z.string().nullable().optional(),

    // Installation context
    esim_country_code: z.string().nullable().optional(),
    package_type: z.string().nullable().optional(),
    package_size: z.string().nullable().optional(),

    // Esim provider
    provider: z.enum(['telna', 'bondio']).nullable().optional(),
    error_code: z.string().nullable().optional(),

    // References
    user: { _type: 'docRef' as const, collection: USER_COLLECTION, nullable: true, optional: true },
    partner: { _type: 'docRef' as const, collection: PARTNER_COLLECTION, nullable: true, optional: true },
    promo_code: { _type: 'docRef' as const, collection: PROMO_CODE_COLLECTION, nullable: true, optional: true },
});
