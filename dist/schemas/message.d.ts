import { z } from 'zod';
export declare const messageFirestoreSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["sms", "email", "push"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}>;
export declare const messageAppSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["sms", "email", "push"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}>;
export declare const sentMessagesFirestoreSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["sms", "email", "push"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
    updated_at: z.ZodType<FirebaseFirestore.Timestamp, z.ZodTypeDef, FirebaseFirestore.Timestamp>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    created_at: FirebaseFirestore.Timestamp;
    updated_at: FirebaseFirestore.Timestamp;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}>>;
export declare const sentMessagesAppSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    method: z.ZodEnum<["sms", "email", "push"]>;
    status: z.ZodEnum<["pending", "sent", "failed", "delivered"]>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "pending" | "sent" | "failed" | "delivered";
    key: string;
    method: "push" | "email" | "sms";
}>>;
export type MessageFirestore = z.infer<typeof messageFirestoreSchema>;
export type MessageApp = z.infer<typeof messageAppSchema>;
export type SentMessagesFirestore = z.infer<typeof sentMessagesFirestoreSchema>;
export type SentMessagesApp = z.infer<typeof sentMessagesAppSchema>;
export declare const messageToFirestore: (message: MessageApp) => MessageFirestore;
export declare const messageFromFirestore: (firestoreMessage: MessageFirestore) => MessageApp;
export declare const sentMessagesToFirestore: (sentMessages: SentMessagesApp) => SentMessagesFirestore;
export declare const sentMessagesFromFirestore: (firestoreSentMessages: SentMessagesFirestore) => SentMessagesApp;
export type Message = MessageApp;
export type SentMessages = SentMessagesApp;
