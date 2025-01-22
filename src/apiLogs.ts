import { Timestamp } from "firebase-admin/firestore"

export interface ApiLog {
  id?: string
  method: string
  user_id?: string
  path: string
  resource_type?: string
  resource_id?: string
  partner_id?: string
  payload?: Record<string, unknown>
  timestamp: Timestamp,
  status_code: number
}
