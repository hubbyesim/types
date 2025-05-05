import {
    PromoCodeApp, PromoCodeFirestore, promoCodeToFirestore, promoCodeFromFirestore
} from '../src/schemas/firebase/promoCode';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import {
    PARTNER_COLLECTION,
    PACKAGE_COLLECTION,
    COUNTRY_COLLECTION,
    BOOKING_COLLECTION
} from '../src/schemas/firebase/utils/collections';

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

describe('PromoCode Schema Conversion', () => {
    it('should correctly convert between PromoCodeApp and PromoCodeFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const validFrom = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const validTo = new Date(Math.floor((now.getTime() + 86400000 * 30) / 1000) * 1000); // 30 days later

        const promoCodeId = 'promo_jkl123';
        const partnerId = 'partner_promo_source';
        const packageId = 'pkg_promo_target';
        const countryId = 'country_ger';
        const bookingId = 'booking_with_promo';
        const userId1 = 'user_used_promo1';
        const uuid1 = 'uuid-usage-1';

        const initialPromoCodeApp: PromoCodeApp = {
            id: promoCodeId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'marketing_dept',
            updated_by: 'marketing_dept',
            external_id: 'ext_promo_123',
            code: 'SUMMERFUN',
            allowance_user: 1,
            allowance_total: 100,
            type: 'partial-discount',
            usage: [userId1], // Array of user IDs
            uuid_usage: [uuid1],
            package_specification: { destination: 'EUR', size: '1GB' },
            partner: partnerId,
            valid_from: validFrom,
            valid_to: validTo,
            discount: 10, // Optional field
            package: packageId, // Optional field
            country: countryId, // Optional field
            booking: bookingId, // Optional field
            countries: ['DEU', 'FRA'], // Optional field
        };

        // Convert to Firestore
        const promoCodeFirestore = promoCodeToFirestore(initialPromoCodeApp);

        // Basic Checks
        expect(promoCodeFirestore.code).toBe('SUMMERFUN');
        expect(promoCodeFirestore.type).toBe('partial-discount');
        expect(promoCodeFirestore.allowance_total).toBe(100);
        expect(promoCodeFirestore.usage).toEqual([userId1]);
        expect(promoCodeFirestore.uuid_usage).toEqual([uuid1]);
        expect(promoCodeFirestore.partner?.id).toBe(partnerId);
        expect(promoCodeFirestore.package?.id).toBe(packageId);
        expect(promoCodeFirestore.country?.id).toBe(countryId);
        expect(promoCodeFirestore.booking?.id).toBe(bookingId);
        expect((promoCodeFirestore.valid_from as Timestamp)?.toDate()).toEqual(validFrom);
        expect((promoCodeFirestore.valid_to as Timestamp)?.toDate()).toEqual(validTo);
        expect(promoCodeFirestore.discount).toBe(10);
        expect(promoCodeFirestore.countries).toEqual(['DEU', 'FRA']);

        // Convert back to App
        const finalPromoCodeApp = promoCodeFromFirestore(promoCodeFirestore);

        // Assertions
        expect(finalPromoCodeApp.created_at?.getTime()).toEqual(initialPromoCodeApp.created_at?.getTime());
        expect(finalPromoCodeApp.updated_at?.getTime()).toEqual(initialPromoCodeApp.updated_at?.getTime());
        expect(finalPromoCodeApp.valid_from?.getTime()).toEqual(initialPromoCodeApp.valid_from?.getTime());
        expect(finalPromoCodeApp.valid_to?.getTime()).toEqual(initialPromoCodeApp.valid_to?.getTime());

        // Compare rest (excluding dates)
        const finalFiltered = { ...finalPromoCodeApp, created_at: undefined, updated_at: undefined, valid_from: undefined, valid_to: undefined };
        const initialFiltered = { ...initialPromoCodeApp, created_at: undefined, updated_at: undefined, valid_from: undefined, valid_to: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 