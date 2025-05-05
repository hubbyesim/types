import {
    BookingApp, BookingFirestore, bookingToFirestore, bookingFromFirestore
} from '../src/schemas/firebase/booking';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import { PARTNER_COLLECTION, PROMO_CODE_COLLECTION, USER_COLLECTION, ESIM_COLLECTION } from '../src/schemas/firebase/utils/collections';

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

describe('Booking Schema Conversion', () => {
    it('should correctly convert between BookingApp and BookingFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const departureDate = new Date(Math.floor((now.getTime() + 86400000 * 7) / 1000) * 1000); // 7 days later
        const returnDate = new Date(Math.floor((now.getTime() + 86400000 * 14) / 1000) * 1000); // 14 days later

        const bookingId = 'booking_xyz789';
        const partnerId = 'partner_booking_1';
        const promoId1 = 'promo_summer24';
        const userId1 = 'user_traveler_1';
        const esimId1 = 'esim_abc111';

        const initialBookingApp: BookingApp = {
            id: bookingId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: partnerId,
            updated_by: partnerId,
            title: 'Mr.',
            first_name: 'Test',
            last_name: 'Traveler',
            full_name: 'Test Traveler',
            pax: 1,
            email: 'test@traveler.com',
            phone: '+11234567890',
            booking_id: 'BK123',
            data: { source: 'web', manual: false },
            is_processed_for_esim_restoration: false,
            is_pseudonymized: false,
            departure_date: departureDate,
            return_date: returnDate,
            status: 'CONFIRMED',
            locale: 'nl-NL',
            partner: partnerId,
            promo_codes: [promoId1],
            users: [userId1],
            esims: [esimId1],
            communication_options: { should_send_message: true, channels: ['EMAIL', 'SMS'] },
        };

        // Convert to Firestore
        const bookingFirestore = bookingToFirestore(initialBookingApp);

        // Basic Checks
        expect(bookingFirestore.status).toBe('CONFIRMED');
        expect(bookingFirestore.partner?.id).toBe(partnerId);
        expect(bookingFirestore.departure_date?.toDate()).toEqual(departureDate);
        expect(bookingFirestore.return_date?.toDate()).toEqual(returnDate);
        expect(bookingFirestore.promo_codes).toHaveLength(1);
        expect(bookingFirestore.promo_codes[0].id).toBe(promoId1);
        expect(bookingFirestore.users).toHaveLength(1);
        expect(bookingFirestore.users?.[0].id).toBe(userId1);
        expect(bookingFirestore.esims).toHaveLength(1);
        expect(bookingFirestore.esims?.[0].id).toBe(esimId1);

        // Convert back to App
        const finalBookingApp = bookingFromFirestore(bookingFirestore);

        // Assertions
        expect(finalBookingApp.created_at?.getTime()).toEqual(initialBookingApp.created_at?.getTime());
        expect(finalBookingApp.updated_at?.getTime()).toEqual(initialBookingApp.updated_at?.getTime());
        expect(finalBookingApp.departure_date?.getTime()).toEqual(initialBookingApp.departure_date?.getTime());
        expect(finalBookingApp.return_date?.getTime()).toEqual(initialBookingApp.return_date?.getTime());

        const finalFiltered = { ...finalBookingApp, created_at: undefined, updated_at: undefined, departure_date: undefined, return_date: undefined };
        const initialFiltered = { ...initialBookingApp, created_at: undefined, updated_at: undefined, departure_date: undefined, return_date: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 