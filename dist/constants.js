"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedLocalesSchema = exports.SUPPORTED_LOCALES = void 0;
const zod_1 = require("zod");
exports.SUPPORTED_LOCALES = [
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
];
// Create a Zod schema for validation
exports.supportedLocalesSchema = zod_1.z.enum(exports.SUPPORTED_LOCALES);
