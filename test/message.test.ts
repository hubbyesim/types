import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { messageSchemaSpec } from '../src/specs/message';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';

// Mock Firebase for tests
beforeAll(() => {
  // Set up a test instance with isTest flag
  const testFirebase = createFirebaseService({ isTest: true });
  FirebaseService.setDefaultInstance(testFirebase);
});

const ClientSchema = buildClientSchema(messageSchemaSpec);
const ServerSchema = buildServerSchema(messageSchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, messageSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, messageSchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('Message schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const now = new Date();

        const input = {
            id: 'message123',
            key: 'activation-message',
            method: 'email',
            status: 'sent',
            created_at: now,
            updated_at: now
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, messageSchemaSpec);

        // Check timestamps are properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, messageSchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.key).toBe(input.key);
        expect(parsedClient.method).toBe(input.method);
        expect(parsedClient.status).toBe(input.status);

        // Check date conversions
        expect(parsedClient.created_at.toISOString()).toBe(input.created_at.toISOString());
        expect(parsedClient.updated_at.toISOString()).toBe(input.updated_at.toISOString());
    });

    it('should support different message methods and statuses', () => {
        const now = new Date();

        // Test with SMS message that has pending status
        const input = {
            id: 'message456',
            key: 'verification-code',
            method: 'sms',
            status: 'pending',
            created_at: now,
            updated_at: now
        };

        const result = roundtrip(input);

        expect(result.id).toBe(input.id);
        expect(result.key).toBe(input.key);
        expect(result.method).toBe('sms');
        expect(result.status).toBe('pending');
    });

    it('should reject invalid message data', () => {
        const invalidMessage = {
            // Missing required fields
            id: 'message123',
            key: 'test-message'
        };

        expect(() => ClientSchema.parse(invalidMessage)).toThrow();
    });

    it('should reject invalid message method', () => {
        const now = new Date();

        const invalidMethod = {
            id: 'message123',
            key: 'test-message',
            method: 'invalid-method', // Not a valid method
            status: 'sent',
            created_at: now,
            updated_at: now
        };

        expect(() => ClientSchema.parse(invalidMethod)).toThrow();
    });
}); 