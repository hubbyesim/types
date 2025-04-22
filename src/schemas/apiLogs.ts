import { z } from 'zod';
import {
    timestampSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';

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

// Define date field mappings
const dateFieldMappings: GenericDateFieldMapping<ApiLogApp, ApiLogFirestore>[] = [
    { field: 'timestamp' }
];

// Conversion functions
export const apiLogToFirestore = (apiLog: ApiLogApp): ApiLogFirestore => {
    return genericToFirestore({
        appObject: apiLog,
        refFieldMappings: [],
        dateFieldMappings
    });
};

export const apiLogFromFirestore = (firestoreApiLog: ApiLogFirestore): ApiLogApp => {
    return genericFromFirestore({
        firestoreObject: firestoreApiLog,
        refFieldMappings: [],
        dateFieldMappings
    });
};

// For backwards compatibility
export type ApiLog = ApiLogFirestore;
export type HApiLog = ApiLogApp; 