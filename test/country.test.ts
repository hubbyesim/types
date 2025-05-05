import {
    CountryApp, CountryFirestore, countryToFirestore, countryFromFirestore
} from '../src/schemas/firebase/country';
import { Timestamp } from 'firebase-admin/firestore'; // Not strictly needed if no date fields

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
         // Need date mock for baseModelSchema fields
         toFirestore: {
             ...originalHelpers.toFirestore,
             date: (date: Date) => ({ toDate: () => date, toMillis: () => date.getTime() } as Timestamp),
         },
         fromFirestore: {
             ...originalHelpers.fromFirestore,
             date: (timestamp: Timestamp) => timestamp.toDate(),
         },
    };
});
// --- End Mocks ---

describe('Country Schema Conversion', () => {
    it('should correctly convert between CountryApp and CountryFirestore (Roundtrip)', () => {
        const countryId = 'country_usa'; // Assuming id is used, though schema says nullable

        const initialCountryApp: CountryApp = {
            id: countryId,
            name: 'United States',
            bokun_id: 12345,
            LTE: true,
            apn: 'fast.internet',
            click_count: 1500,
            global_network: 'Network A',
            global_price: 10.5,
            hubby: 1,
            imsi: 987654321012345,
            has_esim: true,
            region: null, // Field is boolean | null
            is_region: false,
            countries: ['USA', 'CAN', 'MEX'],
            tier: 1,
        };

        // Convert to Firestore
        const countryFirestore = countryToFirestore(initialCountryApp);

        // Basic Checks (Firestore schema is same as App schema)
        expect(countryFirestore.name).toBe('United States');
        expect(countryFirestore.bokun_id).toBe(12345);
        expect(countryFirestore.LTE).toBe(true);
        expect(countryFirestore.apn).toBe('fast.internet');
        expect(countryFirestore.has_esim).toBe(true);
        expect(countryFirestore.is_region).toBe(false);
        expect(countryFirestore.countries).toEqual(['USA', 'CAN', 'MEX']);
        expect(countryFirestore.tier).toBe(1);
        // Check a nullable field
        expect(countryFirestore.region).toBeNull();

        // Convert back to App
        const finalCountryApp = countryFromFirestore(countryFirestore);

        // Assertions (Should be identical as no conversions happen)
        expect(finalCountryApp).toEqual(initialCountryApp);
    });
}); 