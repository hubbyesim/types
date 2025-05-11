import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { userSchemaSpec } from '../src/specs/user';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { createDocRef } from './di';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';

const ClientSchema = buildClientSchema(userSchemaSpec);
const ServerSchema = buildServerSchema(userSchemaSpec);

// Mock Firebase for tests
beforeAll(() => {
  // Set up a test instance with isTest flag
  const testFirebase = createFirebaseService({ isTest: true });
  FirebaseService.setDefaultInstance(testFirebase);
});

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, userSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, userSchemaSpec);
    return ClientSchema.parse(jsData);
}

describe('User schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const input = {
            name: 'Alice',
            email: 'alice@example.com',
            stripe_id: null,
            partner: 'partner123',
            createdAt: new Date('2024-01-01'),
            referral: 'referral123',
            deeplink: 'deeplink123',
            gender: '',
            api_keys: {
                allowed_keys: ['read', 'write'],
                keys: {
                    prod: {
                        expires_at: new Date('2024-12-31'),
                        secret: 'shh123',
                        is_active: true,
                    }
                }
            },
            balance: 100,
            role: ['user'],
            review_requested: null,
            last_seen: null,
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, userSchemaSpec);

        expect(firestoreData.createdAt).toBeInstanceOf(Timestamp);
        
        // Use our DI container to create a real document reference
        const partnerRef = createDocRef('partners', input.partner);
        firestoreData.partner = partnerRef;
        
        expect(firestoreData.partner).toBeInstanceOf(DocumentReference);
        
        const jsData = convertFirestoreToJS(firestoreData, userSchemaSpec);
        const parsedClient = ClientSchema.parse(jsData);

        // Match relevant properties
        expect(parsedClient.name).toBe(input.name);
        expect(parsedClient.partner).toBe(input.partner);
        expect(parsedClient.api_keys?.keys?.prod?.secret).toBe(input.api_keys?.keys?.prod?.secret);

        expect(parsedClient.createdAt.toISOString()).toBe(input.createdAt.toISOString());
    });

    it('should support roundtrip with optional and nullable fields', () => {
        const input = {
            name: 'Alice',
            email: 'alice@example.com',
            partner: 'partner123',
            createdAt: new Date('2024-01-01'),
        }

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, userSchemaSpec);

        expect(firestoreData.createdAt).toBeInstanceOf(Timestamp);
        
        // Use our DI container to create a real document reference
        const partnerRef = createDocRef('partners', input.partner);
        firestoreData.partner = partnerRef;
        
        expect(firestoreData.partner).toBeInstanceOf(DocumentReference);
        
        const jsData = convertFirestoreToJS(firestoreData, userSchemaSpec);
        const parsedClient = ClientSchema.parse(jsData);

        // Match relevant properties
        expect(parsedClient.name).toBe(input.name);
        expect(parsedClient.partner).toBe(input.partner);

        expect(parsedClient.api_keys).toBeUndefined();
    });
});
