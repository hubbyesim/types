import { z } from 'zod';

export const SUPPORTED_LOCALES = [
    'en-US',
    'en-EU',
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
    'sv-SE',
    'sk-SK',
    'de-BE',
    'en-AU',
    'pl-PL',
    'sv-SE',
    'da-DK'
] as const;

// Define the type using TypeScript's typeof and indexing

// Define the type using TypeScript's typeof and indexing
export type SupportedLocales = typeof SUPPORTED_LOCALES[number];

// Create a Zod schema for validation
export const supportedLocalesSchema = z.enum(SUPPORTED_LOCALES);

// Type inference from the schema (alternative way to define the type)
export type SupportedLocalesFromSchema = z.infer<typeof supportedLocalesSchema>; 