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

export type SupportedLocales = typeof SUPPORTED_LOCALES[number]; 