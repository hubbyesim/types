import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { userTouchpointsSchemaSpec } from '../src/specs/userTouchpoints';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';
import { firestore } from './setup';

const ClientSchema = buildClientSchema(userTouchpointsSchemaSpec);
const ServerSchema = buildServerSchema(userTouchpointsSchemaSpec);

// Create a function to generate document references
// Mock Firebase for tests
beforeAll(() => {
    // Set up a test instance with isTest flag
    const testFirebase = createFirebaseService(firestore);
    FirebaseService.setDefaultInstance(testFirebase);
});

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, userTouchpointsSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, userTouchpointsSchemaSpec);
    return ClientSchema.parse(jsData);
}

describe('UserTouchpoints schema roundtrip', () => {
    it('should handle basic UserTouchpoints data', () => {
        const input = {
            id: 'test-touchpoint-id',
            created_at: new Date('2024-01-01T00:00:00Z'),
            updated_at: new Date('2024-01-01T00:00:00Z'),
            // created_by and updated_by are optional and should be omitted for basic test
        };

        const result = roundtrip(input);
        
        expect(result.id).toBe('test-touchpoint-id');
        expect(result.created_at).toBeInstanceOf(Date);
        expect(result.updated_at).toBeInstanceOf(Date);
        expect(result.created_by).toBeUndefined();
        expect(result.updated_by).toBeUndefined();
    });

    it('should handle UserTouchpoints with optional fields', () => {
        const input = {
            id: 'test-touchpoint-id-2',
            created_at: new Date('2024-01-01T00:00:00Z'),
            updated_at: new Date('2024-01-01T00:00:00Z'),
            // created_by and updated_by are optional
        };

        const result = roundtrip(input);
        
        expect(result.id).toBe('test-touchpoint-id-2');
        expect(result.created_at).toBeInstanceOf(Date);
        expect(result.updated_at).toBeInstanceOf(Date);
        expect(result.created_by).toBeUndefined();
        expect(result.updated_by).toBeUndefined();
    });
});
