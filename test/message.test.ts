import {
    MessageApp, MessageFirestore, messageToFirestore, messageFromFirestore,
    SentMessagesApp, SentMessagesFirestore, sentMessagesToFirestore, sentMessagesFromFirestore
} from '../src/schemas/firebase/message';
import { Timestamp } from 'firebase-admin/firestore';

// --- Mock Helpers --- Need to mock the actual helpers file
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
        toFirestore: {
            ...originalHelpers.toFirestore,
            date: (date: Date) => ({ // Simple mock for Timestamp
                toDate: () => date,
                toMillis: () => date.getTime(),
            } as Timestamp),
            // ref mock not needed for Message schema
        },
        fromFirestore: {
            ...originalHelpers.fromFirestore,
            date: (timestamp: Timestamp) => timestamp.toDate(),
            // ref mock not needed for Message schema
        },
    };
});

// Mock Timestamp for instanceof checks if necessary, though conversions use helpers
const mockTimestamp = (date: Date): Timestamp => ({
    toDate: () => date,
    toMillis: () => date.getTime(),
} as Timestamp);
// --- End Mocks ---

describe('Message Schema Conversion', () => {
    it('should correctly convert between MessageApp and MessageFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const messageId = 'msg_123';

        const initialMessageApp: MessageApp = {
            id: messageId,
            key: 'welcome_email',
            method: 'email',
            status: 'sent',
            created_at: createdAt,
            updated_at: createdAt,
        };

        // Convert to Firestore
        const messageFirestore = messageToFirestore(initialMessageApp);

        // Basic checks
        expect(messageFirestore.key).toBe('welcome_email');
        expect(messageFirestore.status).toBe('sent');
        expect(messageFirestore.created_at).toBeInstanceOf(Object);
        expect(messageFirestore.created_at?.toDate()).toEqual(createdAt);

        // Convert back to App
        const finalMessageApp = messageFromFirestore(messageFirestore);

        // Assertions
        expect(finalMessageApp.created_at?.getTime()).toEqual(initialMessageApp.created_at?.getTime());
        expect(finalMessageApp.updated_at?.getTime()).toEqual(initialMessageApp.updated_at?.getTime());

        const finalFiltered = { ...finalMessageApp, created_at: undefined, updated_at: undefined };
        const initialFiltered = { ...initialMessageApp, created_at: undefined, updated_at: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });

    it('should correctly convert between SentMessagesApp and SentMessagesFirestore (Roundtrip)', () => {
        const now1 = new Date();
        const now2 = new Date(now1.getTime() - 5000);
        const createdAt1 = new Date(Math.floor(now1.getTime() / 1000) * 1000);
        const createdAt2 = new Date(Math.floor(now2.getTime() / 1000) * 1000);
        const msgId1 = 'msg_abc';
        const msgId2 = 'msg_def';

        const initialSentMessagesApp: SentMessagesApp = {
            [msgId1]: {
                id: msgId1,
                key: 'order_confirmation',
                method: 'email',
                status: 'delivered',
                created_at: createdAt1,
                updated_at: createdAt1,
            },
            [msgId2]: {
                id: msgId2,
                key: 'shipping_update',
                method: 'sms',
                status: 'sent',
                created_at: createdAt2,
                updated_at: createdAt2,
            },
        };

        // Convert to Firestore
        const sentMessagesFirestore = sentMessagesToFirestore(initialSentMessagesApp);

        // Basic checks
        expect(sentMessagesFirestore[msgId1]).toBeDefined();
        expect(sentMessagesFirestore[msgId1].status).toBe('delivered');
        expect(sentMessagesFirestore[msgId1].created_at?.toDate()).toEqual(createdAt1);
        expect(sentMessagesFirestore[msgId2]).toBeDefined();
        expect(sentMessagesFirestore[msgId2].status).toBe('sent');
        expect(sentMessagesFirestore[msgId2].created_at?.toDate()).toEqual(createdAt2);

        // Convert back to App
        const finalSentMessagesApp = sentMessagesFromFirestore(sentMessagesFirestore);

        // Assertions (deep equality should work if dates are handled)
        expect(finalSentMessagesApp[msgId1].created_at.getTime()).toEqual(initialSentMessagesApp[msgId1].created_at.getTime());
        expect(finalSentMessagesApp[msgId2].created_at.getTime()).toEqual(initialSentMessagesApp[msgId2].created_at.getTime());

        // Compare the rest
        const finalFiltered = {
             [msgId1]: { ...finalSentMessagesApp[msgId1], created_at: undefined, updated_at: undefined },
             [msgId2]: { ...finalSentMessagesApp[msgId2], created_at: undefined, updated_at: undefined },
         };
         const initialFiltered = {
             [msgId1]: { ...initialSentMessagesApp[msgId1], created_at: undefined, updated_at: undefined },
             [msgId2]: { ...initialSentMessagesApp[msgId2], created_at: undefined, updated_at: undefined },
         };
         expect(finalFiltered).toEqual(initialFiltered);
    });
}); 