import { Timestamp } from "firebase-admin/firestore"

export interface ApiLog {
  // Flattened searchable fields
  id?: string
  timestamp: Timestamp
  userId?: string
  userEmail?: string
  method: string         
  path: string          
  statusCode: number    
  responseTime: number  
  resourceType?: string 
  resourceId?: string   
  resourceAction?: 'create' | 'update' | 'delete' | 'read'

  // Detailed data
  requestData: {
    method: string
    path: string
    query: Record<string, any>
    body: any
    headers: Record<string, string | string[]>
  }
  responseData: {
    statusCode: number
    responseTime: number
    error?: string
    body?: any
  }
  resourceData?: {
    type: string
    id: string
    action: 'create' | 'update' | 'delete' | 'read'
    before?: any
    after?: any
  }
}