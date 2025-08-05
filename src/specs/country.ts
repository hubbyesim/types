import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { hubbyModelSpec } from './common';

// Country schema spec
export const countrySchemaSpec = markAsSchemaSpec({
    ...hubbyModelSpec,
    bokun_id: z.number().nullable(),
    LTE: z.boolean().nullable(),
    apn: z.string().nullable(),
    click_count: z.number().nullable(),
    global_network: z.string().nullable(),
    global_price: z.number().nullable(),
    hubby: z.number().nullable(),
    imsi: z.number().nullable(),
    has_esim: z.boolean(),
    name: z.string().nullable(),
    region: z.boolean().nullable(),
    i18n_name: z.record(z.string()),
    is_region: z.boolean().nullable(),
    countries: z.array(z.string()).nullable(),
    tier: z.number().nullable()
});
