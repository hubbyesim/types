import { z } from 'zod';
import {
    baseModelSchema,
    baseModelAppSchema,
    timestampSchema,
    fromFirestore,
    toFirestore
} from './helpers';

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

// Conversion functions
export const messageToFirestore = (message: MessageApp): MessageFirestore => {
    return {
        id: message.id,
        key: message.key,
        method: message.method,
        status: message.status,
        created_at: toFirestore.date(message.created_at),
        updated_at: toFirestore.date(message.updated_at)
    };
};

export const messageFromFirestore = (firestoreMessage: MessageFirestore): MessageApp => {
    return {
        id: firestoreMessage.id,
        key: firestoreMessage.key,
        method: firestoreMessage.method,
        status: firestoreMessage.status,
        created_at: fromFirestore.date(firestoreMessage.created_at),
        updated_at: fromFirestore.date(firestoreMessage.updated_at)
    };
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
export type Message = MessageApp;
export type SentMessages = SentMessagesApp; 