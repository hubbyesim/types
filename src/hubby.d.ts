import { Timestamp, DocumentReference } from "firebase-admin/firestore"

export type HubbyModel = {
    id: string,
    created_at: Timestamp
    updated_at: Timestamp
    created_by: string | null | DocumentReference
    updated_by: string | null | DocumentReference
}

export const supportedLocales: readonly ["en-US", "nl-NL", "de-DE", "fr-FR", "it-IT", "es-ES", "cs-CZ", "pl-PL"]
export type SupportedLocales = (typeof supportedLocales)[number];