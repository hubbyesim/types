import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { currencySchemaSpec } from '../src/specs/currency';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';

// Mock Firebase for tests
beforeAll(() => {
  // Set up a test instance with isTest flag
  const testFirebase = createFirebaseService({ isTest: true });
  FirebaseService.setDefaultInstance(testFirebase);
});

const ClientSchema = buildClientSchema(currencySchemaSpec);
const ServerSchema = buildServerSchema(currencySchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, currencySchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, currencySchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('Currency schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const now = new Date();

        const input = {
            id: 'currency123',
            created_at: now,
            updated_at: now,
            created_by: 'user123',
            updated_by: 'user123',
            code: 'USD',
            symbol: '$',
            name: 'US Dollar',
            rate: 1.0,
            is_default: true
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, currencySchemaSpec);

        // Check timestamps are properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, currencySchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.code).toBe(input.code);
        expect(parsedClient.symbol).toBe(input.symbol);
        expect(parsedClient.name).toBe(input.name);
        expect(parsedClient.rate).toBe(input.rate);
        expect(parsedClient.is_default).toBe(input.is_default);

        // Check date conversions
        expect(parsedClient.created_at.toISOString()).toBe(input.created_at.toISOString());
        expect(parsedClient.updated_at.toISOString()).toBe(input.updated_at.toISOString());
    });

    it('should support non-default currencies', () => {
        const now = new Date();

        const input = {
            id: 'currency456',
            created_at: now,
            updated_at: now,
            created_by: null,
            updated_by: null,
            code: 'EUR',
            symbol: '€',
            name: 'Euro',
            rate: 0.85,
            is_default: false
        };

        const result = roundtrip(input);

        expect(result.id).toBe(input.id);
        expect(result.code).toBe(input.code);
        expect(result.symbol).toBe(input.symbol);
        expect(result.rate).toBe(input.rate);
        expect(result.is_default).toBe(false);
    });

    it('should reject invalid currency data', () => {
        const invalidCurrency = {
            // Missing required fields
            id: 'currency123',
            code: 'USD',
            symbol: '$'
        };

        expect(() => ClientSchema.parse(invalidCurrency)).toThrow();
    });
}); 