import {
    ESIMApp, ESIMFirestore, esimToFirestore, esimFromFirestore
} from '../src/schemas/firebase/esim';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import { COUNTRY_COLLECTION, USER_COLLECTION, PARTNER_COLLECTION, PAYMENT_COLLECTION } from '../src/schemas/firebase/utils/collections';

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
        testEnv: { isTestEnvironment: true }, // Ensure mock refs are used
        toFirestore: {
            ...originalHelpers.toFirestore,
            date: (date: Date) => ({ toDate: () => date, toMillis: () => date.getTime() } as Timestamp),
            ref: (collection: string, id: string) => ({ id: id, path: `${collection}/${id}` } as DocumentReference),
        },
        fromFirestore: {
            ...originalHelpers.fromFirestore,
            date: (timestamp: Timestamp) => timestamp.toDate(),
            ref: (ref: DocumentReference) => ref.id,
        },
    };
});
// --- End Mocks ---

describe('ESIM Schema Conversion', () => {
    it('should correctly convert between ESIMApp and ESIMFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const timeAssigned = new Date(Math.floor((now.getTime() + 60000) / 1000) * 1000); // 1 min later
        const lastUpdated = new Date(Math.floor((now.getTime() + 120000) / 1000) * 1000); // 2 min later

        const esimId = 'esim_def456';
        const countryId = 'country_jpn';
        const userId = 'user_esim_holder';
        const partnerId = 'partner_esim_prov';
        const paymentId = 'pay_esim_fee';

        const initialESIMApp: ESIMApp = {
            id: esimId,
            created_at: createdAt,
            updated_at: lastUpdated, // Use lastUpdated here
            created_by: 'system',
            updated_by: 'system',
            // Common Fields
            imsi: 123456789012345, // Example IMSI
            qr: 'qr_code_data_here',
            iccid: '89...iccid...123',
            provider: 'providerA',
            status: 'ASSIGNED',
            name: 'My Esim',
            android_auto: false,
            type: 'payment', // Example type
            is_auto_install: false,
            is_archived: false,
            user: userId,
            payment: paymentId,
            apn: 'internet',
            // Nullable common fields
            coverage_label: 'Global',
            total_data: 5000000000, // 5GB
            data_left: 4000000000, // 4GB
            data_used: true,
            partner_price: 10.0,
            promo: null,
            // ESIMApp specific fields
            time_assigned: timeAssigned,
            last_updated: lastUpdated,
            country: countryId,
            partner: partnerId,
        };

        // Convert to Firestore
        const esimFirestore = esimToFirestore(initialESIMApp);

        // Basic Checks
        expect(esimFirestore.iccid).toBe('89...iccid...123');
        expect(esimFirestore.status).toBe('ASSIGNED');
        expect(esimFirestore.country?.id).toBe(countryId); // Country is ref
        expect((esimFirestore.user as any)?.id).toBe(userId);
        expect(esimFirestore.partner?.id).toBe(partnerId); // Partner is ref
        expect((esimFirestore.payment as any)?.id).toBe(paymentId);
        expect(esimFirestore.time_assigned?.toDate()).toEqual(timeAssigned);
        expect(esimFirestore.last_updated?.toDate()).toEqual(lastUpdated);

        // Convert back to App
        const finalESIMApp = esimFromFirestore(esimFirestore);

        // Assertions
        expect(finalESIMApp.created_at?.getTime()).toEqual(initialESIMApp.created_at?.getTime());
        expect(finalESIMApp.updated_at?.getTime()).toEqual(initialESIMApp.updated_at?.getTime());
        expect(finalESIMApp.time_assigned?.getTime()).toEqual(initialESIMApp.time_assigned?.getTime());
        expect(finalESIMApp.last_updated?.getTime()).toEqual(initialESIMApp.last_updated?.getTime());

        const finalFiltered = { ...finalESIMApp, created_at: undefined, updated_at: undefined, time_assigned: undefined, last_updated: undefined };
        const initialFiltered = { ...initialESIMApp, created_at: undefined, updated_at: undefined, time_assigned: undefined, last_updated: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 