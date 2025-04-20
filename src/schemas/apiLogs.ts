import { z } from 'zod';
import {
    timestampSchema,
    fromFirestore,
    toFirestore
} from './helpers';

// Firestore schema for ApiLog
export const apiLogFirestoreSchema = z.object({
    id: z.string().optional(),
    method: z.string(),
    user_id: z.string().optional(),
    path: z.string(),
    resource_type: z.string().optional(),
    resource_id: z.string().optional(),
    partner_id: z.string().optional(),
    payload: z.record(z.unknown()).optional(),
    timestamp: timestampSchema,
    status_code: z.number()
});

// App schema for ApiLog
export const apiLogAppSchema = z.object({
    id: z.string().optional(),
    method: z.string(),
    user_id: z.string().optional(),
    path: z.string(),
    resource_type: z.string().optional(),
    resource_id: z.string().optional(),
    partner_id: z.string().optional(),
    payload: z.record(z.unknown()).optional(),
    timestamp: z.date(),
    status_code: z.number()
});

// Define types based on schemas
export type ApiLogFirestore = z.infer<typeof apiLogFirestoreSchema>;
export type ApiLogApp = z.infer<typeof apiLogAppSchema>;

// Conversion functions
export const apiLogToFirestore = (apiLog: ApiLogApp): ApiLogFirestore => {
    return {
        id: apiLog.id,
        method: apiLog.method,
        user_id: apiLog.user_id,
        path: apiLog.path,
        resource_type: apiLog.resource_type,
        resource_id: apiLog.resource_id,
        partner_id: apiLog.partner_id,
        payload: apiLog.payload,
        timestamp: toFirestore.date(apiLog.timestamp),
        status_code: apiLog.status_code
    };
};

export const apiLogFromFirestore = (firestoreApiLog: ApiLogFirestore): ApiLogApp => {
    return {
        id: firestoreApiLog.id,
        method: firestoreApiLog.method,
        user_id: firestoreApiLog.user_id,
        path: firestoreApiLog.path,
        resource_type: firestoreApiLog.resource_type,
        resource_id: firestoreApiLog.resource_id,
        partner_id: firestoreApiLog.partner_id,
        payload: firestoreApiLog.payload,
        timestamp: fromFirestore.date(firestoreApiLog.timestamp),
        status_code: firestoreApiLog.status_code
    };
};

// For backwards compatibility
export type ApiLog = ApiLogApp; 