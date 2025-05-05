import { z } from 'zod';
import {
    baseModelSchema
} from './helpers';
import {
    genericToFirestore,
    genericFromFirestore
} from './utils';

// Import base schemas
import {
    countryAppSchema,
    CountryApp
} from '../base/country';

// Re-export base schemas
export * from '../base/country';

// Country Firestore schema - identical to app schema as it doesn't contain Firestore-specific types
export const countryFirestoreSchema = countryAppSchema;

// Define types based on schemas
export type CountryFirestore = z.infer<typeof countryFirestoreSchema>;

// Conversion functions using generic utilities for consistency
export const countryToFirestore = (country: CountryApp): CountryFirestore => {
    return genericToFirestore({
        appObject: country,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};

export const countryFromFirestore = (firestoreCountry: CountryFirestore): CountryApp => {
    return genericFromFirestore({
        firestoreObject: firestoreCountry,
        refFieldMappings: [],
        dateFieldMappings: []
    });
};

// For backwards compatibility
export type Country = CountryFirestore; 