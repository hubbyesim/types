import { buildClientSchema } from '../src/schemas/builders/client';
import { buildServerSchema } from '../src/schemas/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/schemas/utils/firestoreTransformUtils';
import { esimSchemaSpec } from '../src/schemas/specs/esim';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

const ClientSchema = buildClientSchema(esimSchemaSpec);
const ServerSchema = buildServerSchema(esimSchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, esimSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, esimSchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('ESIM schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const now = new Date();

        const input = {
            id: 'esim123',
            created_at: now,
            updated_at: now,
            created_by: 'user123',
            updated_by: 'user123',
            imsi: 123456789,
            qr: 'qr-data-string',
            iccid: 'iccid-string',
            provider: 'Provider Name',
            coverage_label: 'EU Coverage',
            total_data: 5000,
            data_left: 4500,
            data_used: false,
            status: 'active',
            name: 'My eSIM',
            android_auto: true,
            partner_price: 19.99,
            promo: 'SUMMER2023',
            type: 'api',
            is_auto_install: true,
            is_archived: false,
            user: 'user456',
            payment: 'payment789',
            apn: 'internet',
            country: 'country123',
            partner: 'partner456',
            time_assigned: now,
            last_updated: now
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, esimSchemaSpec);

        // Check timestamps are properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.time_assigned).toBeInstanceOf(Timestamp);
        expect(firestoreData.last_updated).toBeInstanceOf(Timestamp);

        // Check document references are properly converted
        expect(firestoreData.country).toBeInstanceOf(DocumentReference);
        expect(firestoreData.partner).toBeInstanceOf(DocumentReference);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, esimSchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.imsi).toBe(input.imsi);
        expect(parsedClient.qr).toBe(input.qr);
        expect(parsedClient.iccid).toBe(input.iccid);
        expect(parsedClient.provider).toBe(input.provider);
        expect(parsedClient.coverage_label).toBe(input.coverage_label);
        expect(parsedClient.name).toBe(input.name);
        expect(parsedClient.type).toBe(input.type);
        expect(parsedClient.is_auto_install).toBe(input.is_auto_install);
        expect(parsedClient.country).toBe(input.country);
        expect(parsedClient.partner).toBe(input.partner);

        // Check date conversions
        expect(parsedClient.created_at.toISOString()).toBe(input.created_at.toISOString());
        expect(parsedClient.time_assigned.toISOString()).toBe(input.time_assigned.toISOString());
    });

    it('should support nullable and optional fields', () => {
        const now = new Date();

        // eSIM with minimal required fields and nulls
        const input = {
            id: 'esim456',
            created_at: now,
            updated_at: now,
            created_by: null,
            updated_by: null,
            imsi: 987654321,
            qr: 'qr-code-data',
            iccid: 'iccid-data',
            provider: 'Another Provider',
            status: null,
            name: 'Minimal eSIM',
            android_auto: false,
            partner_price: null,
            promo: null,
            type: 'payment',
            is_auto_install: false,
            is_archived: false,
            user: null,
            payment: null,
            apn: null,
            country: null,
            partner: null,
            time_assigned: null,
            last_updated: null,
            data_left: 0,
            data_used: false,
            total_data: 0
        };

        const result = roundtrip(input);

        expect(result.id).toBe(input.id);
        expect(result.imsi).toBe(input.imsi);
        expect(result.provider).toBe(input.provider);
        expect(result.status).toBeNull();
        expect(result.partner_price).toBeNull();
        expect(result.country).toBeNull();
        expect(result.partner).toBeNull();
        expect(result.time_assigned).toBeNull();
        expect(result.coverage_label).toBeUndefined();
    });

    it('should reject invalid eSIM data', () => {
        const invalidESIM = {
            // Missing required fields
            id: 'esim123',
            created_at: new Date(),
            name: 'Invalid eSIM'
        };

        expect(() => ClientSchema.parse(invalidESIM)).toThrow();
    });
}); 