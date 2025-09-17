import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { paymentSchemaSpec } from '../src/specs/payment';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';
import { firestore } from "./setup";

// Mock Firebase for tests
beforeAll(() => {
    // Set up a test instance with isTest flag
    const testFirebase = createFirebaseService(firestore);
    FirebaseService.setDefaultInstance(testFirebase);

});


const ClientSchema = buildClientSchema(paymentSchemaSpec);
const ServerSchema = buildServerSchema(paymentSchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, paymentSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, paymentSchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('Payment schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const now = new Date();

        const input = {
            id: 'payment123',
            created_at: now,
            updated_at: now,
            created_by: 'user123',
            updated_by: 'user123',
            amount: 49.99,
            customer: 'customer123',
            date: now,
            source: 'app' as const,
            topup: false,
            user: 'user456',
            app_payment_properties: {
                package: 'package-eu',
                promo: 'SUMMER50',
                iccid: 'iccid123456'
            }
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, paymentSchemaSpec);

        // Check timestamps are properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.date).toBeInstanceOf(Timestamp);

        // Check document references are properly converted
        expect(firestoreData.user).toBeInstanceOf(DocumentReference);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, paymentSchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.amount).toBe(input.amount);
        expect(parsedClient.customer).toBe(input.customer);
        expect(parsedClient.source).toBe(input.source);
        expect(parsedClient.topup).toBe(input.topup);
        expect(parsedClient.user).toBe(input.user);
        expect(parsedClient.app_payment_properties?.package).toBe(input.app_payment_properties.package);
        expect(parsedClient.app_payment_properties?.promo).toBe(input.app_payment_properties.promo);
        expect(parsedClient.app_payment_properties?.iccid).toBe(input.app_payment_properties.iccid);

        // Check date conversions
        expect(parsedClient.created_at.toISOString()).toBe(input.created_at.toISOString());
        expect(parsedClient.date.toISOString()).toBe(input.date.toISOString());
    });

    it('should support payment with nullable user reference', () => {
        const now = new Date();

        const input = {
            id: 'payment456',
            created_at: now,
            updated_at: now,
            created_by: null,
            updated_by: null,
            amount: 29.99,
            customer: 'customer456',
            date: now,
            source: 'webapp' as const,
            topup: true,
            user: null,
            webapp_platform_payment_properties: {
                promo_codes: ['WINTER20'],
                booking_id: 'booking-global-123'
            }
        };

        const result = roundtrip(input);

        expect(result.id).toBe(input.id);
        expect(result.amount).toBe(input.amount);
        expect(result.customer).toBe(input.customer);
        expect(result.source).toBe(input.source);
        expect(result.topup).toBe(input.topup);
        expect(result.user).toBeNull();
        expect(result.webapp_platform_payment_properties?.promo_codes).toEqual(input.webapp_platform_payment_properties.promo_codes);
        expect(result.webapp_platform_payment_properties?.booking_id).toBe(input.webapp_platform_payment_properties.booking_id);
    });

    it('should reject invalid payment data', () => {
        const invalidPayment = {
            // Missing required fields
            id: 'payment123',
            amount: 49.99,
            created_at: new Date()
        };

        expect(() => ClientSchema.parse(invalidPayment)).toThrow();
    });
}); 