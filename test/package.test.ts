import {
    PackageApp, PackageFirestore, packageToFirestore, packageFromFirestore
} from '../src/schemas/firebase/package';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import { COUNTRY_COLLECTION, PARTNER_COLLECTION } from '../src/schemas/firebase/utils/collections';

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

describe('Package Schema Conversion', () => {
    it('should correctly convert between PackageApp and PackageFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);

        const packageId = 'pkg_usa_5gb_30d';
        const countryId = 'country_usa';
        const partnerId = 'partner_seller';

        const initialPackageApp: PackageApp = {
            id: packageId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'catalog_mgr',
            updated_by: 'catalog_mgr',
            // Fields from commonPackageFields
            external_id: 'ext_pkg_usa_5gb',
            provider: 'providerX',
            coverage_label: 'North America',
            label: '5 GB Data', // Use label for size description
            bytes: 5000000000,
            hidden: false,
            is_hidden: false,
            is_active: true,
            priority: 1,
            country_data: null, // Assuming nullable object, or provide full CountryApp mock
            price: 15.00,
            partner_price: 12.00,
            days: 30,
            name: 'USA 5GB 30 Days', // Use name for full identifier
            type: 'data-limited',
            throttling: undefined, // Optional
            provider_parameters: { imsi: 12345 }, // Example
            // Fields specific to packageAppSchema
            country: countryId,
            partner: partnerId,
        };

        // Convert to Firestore
        const packageFirestore = packageToFirestore(initialPackageApp);

        // Basic Checks
        expect(packageFirestore.name).toBe('USA 5GB 30 Days');
        expect(packageFirestore.label).toBe('5 GB Data');
        expect(packageFirestore.bytes).toBe(5000000000);
        expect(packageFirestore.price).toBe(15.00);
        expect(packageFirestore.is_active).toBe(true);
        expect(packageFirestore.days).toBe(30);
        // Check the references (countries field doesn't exist, country is singular ref)
        expect(packageFirestore.country?.id).toBe(countryId);
        expect(packageFirestore.partner?.id).toBe(partnerId);
        expect(packageFirestore.created_at?.toDate()).toEqual(createdAt);

        // Convert back to App
        const finalPackageApp = packageFromFirestore(packageFirestore);

        // Assertions
        expect(finalPackageApp.created_at?.getTime()).toEqual(initialPackageApp.created_at?.getTime());
        expect(finalPackageApp.updated_at?.getTime()).toEqual(initialPackageApp.updated_at?.getTime());

        // Compare rest (excluding dates)
        const finalFiltered = { ...finalPackageApp, created_at: undefined, updated_at: undefined };
        const initialFiltered = { ...initialPackageApp, created_at: undefined, updated_at: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 