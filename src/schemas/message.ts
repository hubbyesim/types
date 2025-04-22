import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    fromFirestore,
    toFirestore
} from './helpers';
import {
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from './utils';

// Firestore schema for Message
export const messageFirestoreSchema = z.object({
    id: z.string(),
    key: z.string(),
    method: z.enum(["sms", "email", "push"]),
    status: z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: timestampSchema,
    updated_at: timestampSchema
});

// App schema for Message
export const messageAppSchema = z.object({
    id: z.string(),
    key: z.string(),
    method: z.enum(["sms", "email", "push"]),
    status: z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: z.date(),
    updated_at: z.date()
});

// Define SentMessages schema (a record of messages)
export const sentMessagesFirestoreSchema = z.record(messageFirestoreSchema);
export const sentMessagesAppSchema = z.record(messageAppSchema);

// Define types based on schemas
export type MessageFirestore = z.infer<typeof messageFirestoreSchema>;
export type MessageApp = z.infer<typeof messageAppSchema>;
export type SentMessagesFirestore = z.infer<typeof sentMessagesFirestoreSchema>;
export type SentMessagesApp = z.infer<typeof sentMessagesAppSchema>;

// Define date field mappings
const dateFieldMappings: GenericDateFieldMapping<MessageApp, MessageFirestore>[] = [
    { field: 'created_at' },
    { field: 'updated_at' }
];

// Conversion functions
export const messageToFirestore = (message: MessageApp): MessageFirestore => {
    return genericToFirestore({
        appObject: message,
        refFieldMappings: [],
        dateFieldMappings
    });
};

export const messageFromFirestore = (firestoreMessage: MessageFirestore): MessageApp => {
    return genericFromFirestore({
        firestoreObject: firestoreMessage,
        refFieldMappings: [],
        dateFieldMappings
    });
};

// Convert a record of messages
export const sentMessagesToFirestore = (sentMessages: SentMessagesApp): SentMessagesFirestore => {
    const result: Record<string, MessageFirestore> = {};

    for (const key in sentMessages) {
        result[key] = messageToFirestore(sentMessages[key]);
    }

    return result;
};

export const sentMessagesFromFirestore = (firestoreSentMessages: SentMessagesFirestore): SentMessagesApp => {
    const result: Record<string, MessageApp> = {};

    for (const key in firestoreSentMessages) {
        result[key] = messageFromFirestore(firestoreSentMessages[key]);
    }

    return result;
};

// For backwards compatibility
export type Message = MessageFirestore;
export type HMessage = MessageApp;
export type SentMessages = SentMessagesFirestore;
export type HSentMessages = SentMessagesApp; 