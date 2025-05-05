import { z } from 'zod';

// Country schema - no transformations needed as it doesn't contain Firebase-specific types
export const countryAppSchema = z.object({
    id: z.string().nullable(),
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
    is_region: z.boolean().nullable(),
    countries: z.array(z.string()).nullable(),
    tier: z.number().nullable()
});

// Define type based on schema
export type CountryApp = z.infer<typeof countryAppSchema>;

// For backwards compatibility
export type HCountry = CountryApp; 