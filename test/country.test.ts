import { buildClientSchema } from '../src/builders/client';
import { buildServerSchema } from '../src/builders/server';
import { convertFirestoreToJS, convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { countrySchemaSpec } from '../src/specs/country';
import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';

// Mock Firebase for tests
beforeAll(() => {
    // Set up a test instance with isTest flag
    const testFirebase = createFirebaseService({ isTest: true });
    FirebaseService.setDefaultInstance(testFirebase);
});

const ClientSchema = buildClientSchema(countrySchemaSpec);
const ServerSchema = buildServerSchema(countrySchemaSpec);

const roundtrip = (input: any) => {
    const parsedForServer = ServerSchema.parse(input);
    const firestoreData = convertJSToFirestore(parsedForServer, countrySchemaSpec);
    const jsData = convertFirestoreToJS(firestoreData, countrySchemaSpec);
    return ClientSchema.parse(jsData);
};

describe('Country schema roundtrip', () => {
    it('should support roundtrip from client to firestore and back', () => {
        const input = {
            id: 'NL',
            bokun_id: 1234,
            LTE: true,
            apn: 'internet',
            click_count: 100,
            global_network: 'Global',
            global_price: 9.99,
            hubby: 1,
            imsi: 20810,
            has_esim: true,
            name: 'Netherlands',
            region: false,
            is_region: false,
            countries: ['NL'],
            tier: 1,
            created_at: new Date('2024-01-01'),
            i18n_name: {
                en: 'Netherlands',
                nl: 'Nederland'
            }
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, countrySchemaSpec);

        // No need to check for Timestamp or DocumentReference since Country doesn't have these

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, countrySchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBe(input.id);
        expect(parsedClient.name).toBe(input.name);
        expect(parsedClient.bokun_id).toBe(input.bokun_id);
        expect(parsedClient.LTE).toBe(input.LTE);
        expect(parsedClient.has_esim).toBe(input.has_esim);
        expect(parsedClient.countries).toEqual(input.countries);
    });

    it('should support roundtrip with nullable fields', () => {
        // Country with minimal fields and nulls
        const input = {
            id: null,
            bokun_id: null,
            LTE: null,
            apn: null,
            click_count: null,
            global_network: null,
            global_price: null,
            hubby: null,
            imsi: null,
            has_esim: false,
            name: null,
            region: null,
            is_region: null,
            countries: null,
            tier: null,
            created_at: new Date('2024-01-01'),
            i18n_name: {
                en: 'Netherlands',
                nl: 'Nederland'
            }
        };

        const parsedForServer = ClientSchema.parse(input);
        const firestoreData = convertJSToFirestore(parsedForServer, countrySchemaSpec);

        // Simulate Firestore snapshot conversion
        const jsData = convertFirestoreToJS(firestoreData, countrySchemaSpec);

        // Validate back with client schema
        const parsedClient = ClientSchema.parse(jsData);

        // Check that all data round-trips correctly
        expect(parsedClient.id).toBeNull();
        expect(parsedClient.name).toBeNull();
        expect(parsedClient.has_esim).toBe(false);
        expect(parsedClient.countries).toBeNull();
    });

    it('should reject invalid country data', () => {
        const invalidCountry = {
            // Missing required has_esim field
            id: 'NL',
            name: 'Netherlands'
        };

        expect(() => ClientSchema.parse(invalidCountry)).toThrow();
    });
}); 