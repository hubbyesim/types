import { z } from 'zod';
import { baseModelAppSchema, zDateString } from './helpers';

// App schema for Message
export const messageAppSchema = z.object({
    id: z.string(),
    key: z.string(),
    method: z.enum(["push", "sms", "email"]),
    status: z.enum(["pending", "sent", "failed", "delivered"]),
    created_at: zDateString(),
    updated_at: zDateString()
});

// Define SentMessages schema (a record of messages)
export const sentMessagesAppSchema = z.record(messageAppSchema);

// Define types based on schemas
export type MessageApp = z.infer<typeof messageAppSchema>;
export type SentMessagesApp = z.infer<typeof sentMessagesAppSchema>;

// For backwards compatibility
export type HMessage = MessageApp;
export type HSentMessages = SentMessagesApp; 