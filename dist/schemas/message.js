"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentMessagesFromFirestore = exports.sentMessagesToFirestore = exports.messageFromFirestore = exports.messageToFirestore = exports.sentMessagesAppSchema = exports.sentMessagesFirestoreSchema = exports.messageAppSchema = exports.messageFirestoreSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
// Firestore schema for Message
exports.messageFirestoreSchema = zod_1.z.object({
    id: zod_1.z.string(),
    key: zod_1.z.string(),
    method: zod_1.z.enum(["sms", "email", "push"]),
    status: zod_1.z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: helpers_1.timestampSchema,
    updated_at: helpers_1.timestampSchema
});
// App schema for Message
exports.messageAppSchema = zod_1.z.object({
    id: zod_1.z.string(),
    key: zod_1.z.string(),
    method: zod_1.z.enum(["sms", "email", "push"]),
    status: zod_1.z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date()
});
// Define SentMessages schema (a record of messages)
exports.sentMessagesFirestoreSchema = zod_1.z.record(exports.messageFirestoreSchema);
exports.sentMessagesAppSchema = zod_1.z.record(exports.messageAppSchema);
// Define date field mappings
const dateFieldMappings = [
    { field: 'created_at' },
    { field: 'updated_at' }
];
// Conversion functions
const messageToFirestore = (message) => {
    return (0, utils_1.genericToFirestore)({
        appObject: message,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.messageToFirestore = messageToFirestore;
const messageFromFirestore = (firestoreMessage) => {
    return (0, utils_1.genericFromFirestore)({
        firestoreObject: firestoreMessage,
        refFieldMappings: [],
        dateFieldMappings
    });
};
exports.messageFromFirestore = messageFromFirestore;
// Convert a record of messages
const sentMessagesToFirestore = (sentMessages) => {
    const result = {};
    for (const key in sentMessages) {
        result[key] = (0, exports.messageToFirestore)(sentMessages[key]);
    }
    return result;
};
exports.sentMessagesToFirestore = sentMessagesToFirestore;
const sentMessagesFromFirestore = (firestoreSentMessages) => {
    const result = {};
    for (const key in firestoreSentMessages) {
        result[key] = (0, exports.messageFromFirestore)(firestoreSentMessages[key]);
    }
    return result;
};
exports.sentMessagesFromFirestore = sentMessagesFromFirestore;
