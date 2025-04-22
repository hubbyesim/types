"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSentMessagesFromFirestore = exports.convertSentMessagesToFirestore = exports.sentMessagesFromFirestore = exports.sentMessagesToFirestore = exports.messageFromFirestore = exports.messageToFirestore = exports.sentMessagesAppSchema = exports.sentMessagesFirestoreSchema = exports.messageAppSchema = exports.messageFirestoreSchema = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase/firestore");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
// Firestore schema for Message
exports.messageFirestoreSchema = zod_1.z.object({
    id: zod_1.z.string(),
    key: zod_1.z.string(),
    method: zod_1.z.enum(["push", "sms", "email"]),
    status: zod_1.z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: helpers_1.timestampSchema,
    updated_at: helpers_1.timestampSchema
});
// App schema for Message
exports.messageAppSchema = zod_1.z.object({
    id: zod_1.z.string(),
    key: zod_1.z.string(),
    method: zod_1.z.enum(["push", "sms", "email"]),
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
// Convert a record of messages - with null safety
const sentMessagesToFirestore = (sentMessages) => {
    const result = {};
    for (const key in sentMessages) {
        const message = sentMessages[key];
        if (message) {
            result[key] = (0, exports.messageToFirestore)(message);
        }
    }
    return result;
};
exports.sentMessagesToFirestore = sentMessagesToFirestore;
const sentMessagesFromFirestore = (firestoreSentMessages) => {
    const result = {};
    for (const key in firestoreSentMessages) {
        const firestoreMessage = firestoreSentMessages[key];
        if (firestoreMessage) {
            result[key] = (0, exports.messageFromFirestore)(firestoreMessage);
        }
    }
    return result;
};
exports.sentMessagesFromFirestore = sentMessagesFromFirestore;
// Helper function for backward compatibility with runtime type conversion
const convertSentMessagesToFirestore = (sentMessages) => {
    const result = {};
    for (const key in sentMessages) {
        const message = sentMessages[key];
        if (message) {
            // Convert Date to Timestamp for Firestore if needed
            const firestoreMessage = Object.assign(Object.assign({}, message), { created_at: message.created_at instanceof Date
                    ? firestore_1.Timestamp.fromDate(message.created_at)
                    : message.created_at, updated_at: message.updated_at instanceof Date
                    ? firestore_1.Timestamp.fromDate(message.updated_at)
                    : message.updated_at });
            result[key] = firestoreMessage;
        }
    }
    return result;
};
exports.convertSentMessagesToFirestore = convertSentMessagesToFirestore;
const convertSentMessagesFromFirestore = (firestoreSentMessages) => {
    const result = {};
    for (const key in firestoreSentMessages) {
        const firestoreMessage = firestoreSentMessages[key];
        if (firestoreMessage) {
            // Convert Timestamp to Date for app if needed
            const appMessage = Object.assign(Object.assign({}, firestoreMessage), { created_at: firestoreMessage.created_at instanceof firestore_1.Timestamp
                    ? firestoreMessage.created_at.toDate()
                    : firestoreMessage.created_at, updated_at: firestoreMessage.updated_at instanceof firestore_1.Timestamp
                    ? firestoreMessage.updated_at.toDate()
                    : firestoreMessage.updated_at });
            result[key] = appMessage;
        }
    }
    return result;
};
exports.convertSentMessagesFromFirestore = convertSentMessagesFromFirestore;
