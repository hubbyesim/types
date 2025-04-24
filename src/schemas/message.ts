import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';
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
    method: z.enum(["push", "sms", "email"]),
    status: z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: timestampSchema,
    updated_at: timestampSchema
});

// App schema for Message
export const messageAppSchema = z.object({
    id: z.string(),
    key: z.string(),
    method: z.enum(["push", "sms", "email"]),
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

// Convert a record of messages - with null safety
export const sentMessagesToFirestore = (sentMessages: SentMessagesApp): SentMessagesFirestore => {
    const result: Record<string, MessageFirestore> = {};

    for (const key in sentMessages) {
        const message = sentMessages[key];
        if (message) {
            result[key] = messageToFirestore(message);
        }
    }

    return result;
};

export const sentMessagesFromFirestore = (firestoreSentMessages: SentMessagesFirestore): SentMessagesApp => {
    const result: Record<string, MessageApp> = {};

    for (const key in firestoreSentMessages) {
        const firestoreMessage = firestoreSentMessages[key];
        if (firestoreMessage) {
            result[key] = messageFromFirestore(firestoreMessage);
        }
    }

    return result;
};

// For backwards compatibility
export type Message = MessageFirestore;
export type HMessage = MessageApp;
export type SentMessages = SentMessagesFirestore;
export type HSentMessages = SentMessagesApp;

// Helper function for backward compatibility with runtime type conversion
export const convertSentMessagesToFirestore = (sentMessages: Record<string, MessageApp>): Record<string, MessageFirestore> => {
    const result: Record<string, MessageFirestore> = {};
    
    for (const key in sentMessages) {
        const message = sentMessages[key];
        if (message) {
            // Convert Date to Timestamp for Firestore if needed
            const firestoreMessage: MessageFirestore = {
                ...message,
                created_at: message.created_at instanceof Date 
                    ? Timestamp.fromDate(message.created_at) 
                    : message.created_at,
                updated_at: message.updated_at instanceof Date 
                    ? Timestamp.fromDate(message.updated_at) 
                    : message.updated_at
            } as MessageFirestore;
            
            result[key] = firestoreMessage;
        }
    }
    
    return result;
};

export const convertSentMessagesFromFirestore = (firestoreSentMessages: Record<string, MessageFirestore>): Record<string, MessageApp> => {
    const result: Record<string, MessageApp> = {};
    
    for (const key in firestoreSentMessages) {
        const firestoreMessage = firestoreSentMessages[key];
        if (firestoreMessage) {
            // Convert Timestamp to Date for app if needed
            const appMessage: MessageApp = {
                ...firestoreMessage,
                created_at: firestoreMessage.created_at instanceof Timestamp 
                    ? firestoreMessage.created_at.toDate() 
                    : firestoreMessage.created_at as unknown as Date,
                updated_at: firestoreMessage.updated_at instanceof Timestamp 
                    ? firestoreMessage.updated_at.toDate() 
                    : firestoreMessage.updated_at as unknown as Date
            };
            
            result[key] = appMessage;
        }
    }
    
    return result;
}; 