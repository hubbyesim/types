import {
    PaymentApp, PaymentFirestore, paymentToFirestore, paymentFromFirestore
} from '../src/schemas/firebase/payment';
import { Timestamp } from 'firebase-admin/firestore';

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
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

describe('Payment Schema Conversion', () => {
    it('should correctly convert between PaymentApp and PaymentFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const paymentDate = new Date(Math.floor((now.getTime() - 3600000) / 1000) * 1000); // 1 hour ago

        const paymentId = 'pay_ghi789';
        const customerId = 'cust_abc123'; // Assuming customer maps to user ID or similar
        const packageId = 'pkg_monthly_10';
        const promoId = 'promo_launch';
        const iccid = '89...forpayment...456';

        const initialPaymentApp: PaymentApp = {
            id: paymentId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'stripe_webhook',
            updated_by: 'stripe_webhook',
            amount: 10.99,
            customer: customerId,
            date: paymentDate,
            iccid: iccid,
            package: packageId,
            promo: promoId,
            topup: false,
            // Fields from base/payment that are NOT in firebase/payment were removed:
            // status: 'succeeded',
            // provider: 'stripe',
            // fee: 0.50,
            // psp_ref: 'ch_123xyz',
            // metadata: { order_id: 'order_555' },
        };

        // Convert to Firestore
        const paymentFirestore = paymentToFirestore(initialPaymentApp);

        // Basic Checks - Note: Firestore schema seems simpler than App schema
        expect(paymentFirestore.amount).toBe(10.99);
        expect(paymentFirestore.customer).toBe(customerId);
        expect(paymentFirestore.date?.toDate()).toEqual(paymentDate);
        expect(paymentFirestore.iccid).toBe(iccid);
        expect(paymentFirestore.package).toBe(packageId);
        expect(paymentFirestore.promo).toBe(promoId);
        expect(paymentFirestore.topup).toBe(false);
        // Check base fields that are expected in Firestore object via baseModelSchema
        expect(paymentFirestore.created_at?.toDate()).toEqual(createdAt);
        expect(paymentFirestore.created_by).toBe('stripe_webhook');

        // Convert back to App
        const finalPaymentApp = paymentFromFirestore(paymentFirestore);

        // Assertions
        // The `fromFirestore` will likely only contain fields present in PaymentFirestore + baseModel
        // Fields like status, provider, fee, psp_ref, metadata from base will be missing

        expect(finalPaymentApp.created_at?.getTime()).toEqual(initialPaymentApp.created_at?.getTime());
        expect(finalPaymentApp.updated_at?.getTime()).toEqual(initialPaymentApp.updated_at?.getTime());
        expect(finalPaymentApp.date?.getTime()).toEqual(initialPaymentApp.date?.getTime());

        // Create expected subset based on Firestore schema + base model fields
        const expectedFinalApp: Partial<PaymentApp> = {
            id: paymentId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'stripe_webhook',
            updated_by: 'stripe_webhook',
            amount: 10.99,
            customer: customerId,
            date: paymentDate,
            iccid: iccid,
            package: packageId,
            promo: promoId,
            topup: false,
        };

        // Compare the result with the expected subset
        expect(finalPaymentApp).toEqual(expectedFinalApp);

        // Optionally, verify that fields *not* in Firestore schema are indeed undefined/missing
        // These fields weren't in the initial data for the roundtrip test based on Firestore schema
        // expect(finalPaymentApp.status).toBeUndefined();
        // expect(finalPaymentApp.provider).toBeUndefined();
        // expect(finalPaymentApp.metadata).toBeUndefined();
    });
}); 