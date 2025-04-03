import { Timestamp, DocumentReference } from "firebase-admin/firestore"

export type HubbyModel = {
    id: string,
    created_at: Timestamp
    updated_at: Timestamp
    created_by: string | null | DocumentReference
    updated_by: string | null | DocumentReference
}