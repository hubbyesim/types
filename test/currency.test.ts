import {
    CurrencyApp, CurrencyFirestore, currencyToFirestore, currencyFromFirestore
} from '../src/schemas/firebase/currency';
import { Timestamp } from 'firebase-admin/firestore'; // Not strictly needed if no date fields

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
        // No date/ref conversions needed for Currency schema based on definition
        // Add mocks if currency schema evolves to include them
    };
});
// --- End Mocks ---

describe('Currency Schema Conversion', () => {
    it('should correctly convert between CurrencyApp and CurrencyFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);

        const currencyId = 'curr_eur';

        const initialCurrencyApp: CurrencyApp = {
            id: currencyId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'system',
            updated_by: 'system',
            // Fields from commonCurrencyFields
            code: 'EUR',
            symbol: '€',
            name: 'Euro',
            rate: 1.1,
            is_default: false,
        };

        // Convert to Firestore
        const currencyFirestore = currencyToFirestore(initialCurrencyApp);

        // Basic Checks
        expect(currencyFirestore.code).toBe('EUR');
        expect(currencyFirestore.symbol).toBe('€');
        expect(currencyFirestore.name).toBe('Euro');
        expect(currencyFirestore.rate).toBe(1.1);
        expect(currencyFirestore.is_default).toBe(false);
        expect(currencyFirestore.created_at?.toDate()).toEqual(createdAt);
        expect(currencyFirestore.updated_at?.toDate()).toEqual(createdAt);

        // Convert back to App
        const finalCurrencyApp = currencyFromFirestore(currencyFirestore);

        // Assertions
        expect(finalCurrencyApp.created_at?.getTime()).toEqual(initialCurrencyApp.created_at?.getTime());
        expect(finalCurrencyApp.updated_at?.getTime()).toEqual(initialCurrencyApp.updated_at?.getTime());

        // Compare rest (excluding dates)
        const finalFiltered = { ...finalCurrencyApp, created_at: undefined, updated_at: undefined };
        const initialFiltered = { ...initialCurrencyApp, created_at: undefined, updated_at: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 