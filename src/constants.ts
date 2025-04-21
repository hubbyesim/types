import { z } from 'zod';

export const SUPPORTED_LOCALES = [
    'en-US',
    'en-GB',
    'nl-NL',
    'de-DE',
    'fr-FR',
    'it-IT',
    'es-ES',
    'cs-CZ',
    'pl-PL',
    'pt-PT',
    'fr-BE',
    'nl-BE',
    'de-AT',
    'de-CH',
    'fr-CH',
    'it-CH',
    'de-BE'
] as const;

// Define the type using TypeScript's typeof and indexing
export type SupportedLocales = typeof SUPPORTED_LOCALES[number];

// Create a Zod schema for validation
export const supportedLocalesSchema = z.enum(SUPPORTED_LOCALES);

// Type inference from the schema (alternative way to define the type)
export type SupportedLocalesFromSchema = z.infer<typeof supportedLocalesSchema>; 