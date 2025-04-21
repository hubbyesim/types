"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogFromFirestore = exports.apiLogToFirestore = exports.apiLogAppSchema = exports.apiLogFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
// Firestore schema for ApiLog
exports.apiLogFirestoreSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    method: zod_1.z.string(),
    user_id: zod_1.z.string().optional(),
    path: zod_1.z.string(),
    resource_type: zod_1.z.string().optional(),
    resource_id: zod_1.z.string().optional(),
    partner_id: zod_1.z.string().optional(),
    payload: zod_1.z.record(zod_1.z.unknown()).optional(),
    timestamp: helpers_1.timestampSchema,
    status_code: zod_1.z.number()
});
// App schema for ApiLog
exports.apiLogAppSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    method: zod_1.z.string(),
    user_id: zod_1.z.string().optional(),
    path: zod_1.z.string(),
    resource_type: zod_1.z.string().optional(),
    resource_id: zod_1.z.string().optional(),
    partner_id: zod_1.z.string().optional(),
    payload: zod_1.z.record(zod_1.z.unknown()).optional(),
    timestamp: zod_1.z.date(),
    status_code: zod_1.z.number()
});
// Conversion functions
const apiLogToFirestore = (apiLog) => {
    return {
        id: apiLog.id,
        method: apiLog.method,
        user_id: apiLog.user_id,
        path: apiLog.path,
        resource_type: apiLog.resource_type,
        resource_id: apiLog.resource_id,
        partner_id: apiLog.partner_id,
        payload: apiLog.payload,
        timestamp: helpers_1.toFirestore.date(apiLog.timestamp),
        status_code: apiLog.status_code
    };
};
exports.apiLogToFirestore = apiLogToFirestore;
const apiLogFromFirestore = (firestoreApiLog) => {
    return {
        id: firestoreApiLog.id,
        method: firestoreApiLog.method,
        user_id: firestoreApiLog.user_id,
        path: firestoreApiLog.path,
        resource_type: firestoreApiLog.resource_type,
        resource_id: firestoreApiLog.resource_id,
        partner_id: firestoreApiLog.partner_id,
        payload: firestoreApiLog.payload,
        timestamp: helpers_1.fromFirestore.date(firestoreApiLog.timestamp),
        status_code: firestoreApiLog.status_code
    };
};
exports.apiLogFromFirestore = apiLogFromFirestore;
