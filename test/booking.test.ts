import { buildClientSchema } from '../src/schemas/builders/client';
import { buildServerSchema } from '../src/schemas/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/schemas/utils/firestoreTransformUtils';
import { bookingSchemaSpec } from '../src/schemas/specs/booking';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

const ClientSchema = buildClientSchema(bookingSchemaSpec);
const ServerSchema = buildServerSchema(bookingSchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, bookingSchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, bookingSchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('Booking schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const now = new Date();

        const input = {
            id: '123',
            created_at: now,
            updated_at: now,
            created_by: 'user123',
            updated_by: 'user123',
            title: 'Mr',
            first_name: 'John',
            last_name: 'Doe',
            full_name: 'John Doe',
            pax: 2,
            email: 'john@example.com',
            phone: '+1234567890',
            booking_id: 'B12345',
            locale: 'en-US',
            status: 'CONFIRMED',
            data: {
                source: 'web',
                manual: false
            },
            communication_options: {
                should_send_message: true,
                channels: ['EMAIL', 'WHATSAPP']
            },
            is_processed_for_esim_restoration: false,
            is_pseudonymized: false,
            departure_date: now,
            return_date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            partner: 'partner123',
            promo_codes: ['promo1', 'promo2'],
            users: ['user1', 'user2'],
            esims: null
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, bookingSchemaSpec);

        // Check timestamps are properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.departure_date).toBeInstanceOf(Timestamp);
        expect(firestoreData.return_date).toBeInstanceOf(Timestamp);

        // Check document references are properly converted
        expect(firestoreData.partner).toBeInstanceOf(DocumentReference);
        expect(firestoreData.promo_codes[0]).toBeInstanceOf(DocumentReference);
        expect(firestoreData.users[0]).toBeInstanceOf(DocumentReference);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, bookingSchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.first_name).toBe(input.first_name);
        expect(parsedClient.last_name).toBe(input.last_name);
        expect(parsedClient.email).toBe(input.email);
        expect(parsedClient.status).toBe(input.status);
        expect(parsedClient.locale).toBe(input.locale);
        expect(parsedClient.partner).toBe(input.partner);
        expect(parsedClient.promo_codes).toEqual(input.promo_codes);
        expect(parsedClient.users).toEqual(input.users);
        expect(parsedClient.esims).toBeNull();
        expect(parsedClient.communication_options.channels).toEqual(input.communication_options.channels);

        // Check date conversions
        expect(parsedClient.created_at.toISOString()).toBe(input.created_at.toISOString());
        expect(parsedClient.departure_date.toISOString()).toBe(input.departure_date.toISOString());
        expect(parsedClient.return_date.toISOString()).toBe(input.return_date.toISOString());
    });

    it('should support roundtrip with optional fields', () => {
        const now = new Date();

        // Minimal booking with just required fields
        const input = {
            id: '123',
            created_at: now,
            updated_at: now,
            created_by: null,
            updated_by: null,
            title: null,
            first_name: 'John',
            last_name: 'Doe',
            full_name: 'John Doe',
            pax: 1,
            email: null,
            phone: null,
            booking_id: null,
            locale: 'en-US',
            status: 'PENDING',
            data: {
                source: 'api',
                manual: true
            },
            communication_options: {
                should_send_message: false,
                channels: []
            },
            is_processed_for_esim_restoration: false,
            is_pseudonymized: false,
            departure_date: now,
            return_date: null,
            partner: 'partner123',
            promo_codes: [],
            users: null,
            esims: null
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, bookingSchemaSpec);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, bookingSchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.first_name).toBe(input.first_name);
        expect(parsedClient.email).toBeNull();
        expect(parsedClient.flight_number).toBeUndefined();
        expect(parsedClient.gender).toBeUndefined();
        expect(parsedClient.return_date).toBeNull();
        expect(parsedClient.promo_codes).toEqual([]);
        expect(parsedClient.users).toBeNull();
    });

    it('should reject invalid booking data', () => {
        const invalidBooking = {
            // Missing required fields
            id: '123',
            first_name: 'John',
            last_name: 'Doe'
        };

        expect(() => ClientSchema.parse(invalidBooking)).toThrow();
    });
}); 