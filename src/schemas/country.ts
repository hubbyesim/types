import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    fromFirestore,
    toFirestore
} from './helpers';

// Country Firestore schema - no transformations needed as it doesn't 
// contain Firestore-specific types
export const countryFirestoreSchema = z.object({
    id: z.string().nullable(),
    bokun_id: z.number().nullable(),
    LTE: z.boolean().nullable(),
    apn: z.string().nullable(),
    click_count: z.number().nullable(),
    global_network: z.string().nullable(),
    global_price: z.number().nullable(),
    hubby: z.number().nullable(),
    imsi: z.number().nullable(),
    name: z.string().nullable(),
    region: z.boolean().nullable(),
    is_region: z.boolean().nullable(),
    countries: z.array(z.string()).nullable(),
    tier: z.number().nullable()
});

// For Country, the app schema is identical to the Firestore schema
// since there are no Firestore-specific types to convert
export const countryAppSchema = countryFirestoreSchema;

// Define types based on schemas
export type CountryFirestore = z.infer<typeof countryFirestoreSchema>;
export type CountryApp = z.infer<typeof countryAppSchema>;

// Conversion functions (these are identity functions since no transformation is needed)
export const countryToFirestore = (country: CountryApp): CountryFirestore => country;
export const countryFromFirestore = (firestoreCountry: CountryFirestore): CountryApp => firestoreCountry;

// For backwards compatibility
export type Country = CountryFirestore;
export type HCountry = CountryApp; 