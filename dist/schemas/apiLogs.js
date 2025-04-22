"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogFromFirestore = exports.apiLogToFirestore = exports.apiLogAppSchema = exports.apiLogFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
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
// Define date field mappings
const dateFieldMappings = [
    { field: 'timestamp' }
];
// Conversion functions
const apiLogToFirestore = (apiLog) => {
    return (0, utils_1.genericToFirestore)({
        appObject: apiLog,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.apiLogToFirestore = apiLogToFirestore;
const apiLogFromFirestore = (firestoreApiLog) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreApiLog,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.apiLogFromFirestore = apiLogFromFirestore;
