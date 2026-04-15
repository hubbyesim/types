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
            phone_verification_initiated_at: null,
            phone_verification_sms_requested_at: null,
            phone_verification_code_submitted_at: null,
            phone_verification_completed_at: null,
            created_at: new Date('2024-01-01T00:00:00Z'),
            updated_at: new Date('2024-01-01T00:00:00Z'),
            // created_by and updated_by are optional and should be omitted for basic test
        };

        const result = roundtrip(input);
        
        expect(result.id).toBe('test-touchpoint-id');
        expect(result.phone_verification_initiated_at).toBeNull();
        expect(result.phone_verification_sms_requested_at).toBeNull();
        expect(result.phone_verification_code_submitted_at).toBeNull();
        expect(result.phone_verification_completed_at).toBeNull();
        expect(result.created_at).toBeInstanceOf(Date);
        expect(result.updated_at).toBeInstanceOf(Date);
        expect(result.created_by).toBeUndefined();
        expect(result.updated_by).toBeUndefined();
    });

    it('should handle UserTouchpoints with optional fields', () => {
        const input = {
            id: 'test-touchpoint-id-2',
            phone_verification_initiated_at: new Date('2024-01-01T00:00:00Z'),
            phone_verification_sms_requested_at: new Date('2024-01-01T00:01:00Z'),
            phone_verification_code_submitted_at: new Date('2024-01-01T00:02:00Z'),
            phone_verification_completed_at: new Date('2024-01-01T00:03:00Z'),
            created_at: new Date('2024-01-01T00:00:00Z'),
            updated_at: new Date('2024-01-01T00:00:00Z'),
            // created_by and updated_by are optional
        };

        const result = roundtrip(input);
        
        expect(result.id).toBe('test-touchpoint-id-2');
        expect(result.phone_verification_initiated_at).toBeInstanceOf(Date);
        expect(result.phone_verification_sms_requested_at).toBeInstanceOf(Date);
        expect(result.phone_verification_code_submitted_at).toBeInstanceOf(Date);
        expect(result.phone_verification_completed_at).toBeInstanceOf(Date);
        expect(result.created_at).toBeInstanceOf(Date);
        expect(result.updated_at).toBeInstanceOf(Date);
        expect(result.created_by).toBeUndefined();
        expect(result.updated_by).toBeUndefined();
    });
});
