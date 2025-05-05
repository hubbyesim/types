import {
    PartnerApp, PartnerFirestore, partnerToFirestore, partnerFromFirestore,
    PriceListApp, PriceListFirestore, priceListToFirestore, priceListFromFirestore,
    PackagePriceApp, PackagePriceFirestore // Import nested types if needed for data creation
} from '../src/schemas/firebase/partner';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';
import { PARTNER_COLLECTION, USER_COLLECTION, PACKAGE_COLLECTION, PRICE_LIST_COLLECTION } from '../src/schemas/firebase/utils/collections';

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
        // Keep testEnv for mocking refs
        testEnv: { isTestEnvironment: true }, // Ensure mock refs are used
        toFirestore: {
            ...originalHelpers.toFirestore,
            date: (date: Date) => ({ toDate: () => date, toMillis: () => date.getTime() } as Timestamp),
            ref: (collection: string, id: string) => ({ // Simple mock for DocumentReference
                id: id,
                path: `${collection}/${id}`,
            } as DocumentReference),
        },
        fromFirestore: {
            ...originalHelpers.fromFirestore,
            date: (timestamp: Timestamp) => timestamp.toDate(),
            ref: (ref: DocumentReference) => ref.id,
        },
    };
});
// --- End Mocks ---

describe('Partner Schema Conversion', () => {

    it('should correctly convert between PartnerApp and PartnerFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const nextInvoice = new Date(Math.floor((now.getTime() + 86400000 * 30) / 1000) * 1000); // ~30 days later

        const partnerId = 'partner_main_123';
        const parentId = 'partner_parent_456';
        const userId1 = 'user_abc';
        const userId2 = 'user_def';
        const priceListId = 'pl_xyz';
        const packageId = 'pkg_standard';

        const initialPartnerApp: PartnerApp = {
            id: partnerId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'system',
            updated_by: 'system',
            name: 'Main Partner Inc.',
            type: 'reseller',
            is_active: true,
            external_id: 'ext-main-123',
            contact: { email: 'contact@mainpartner.com', office_phone: '+15551234' },
            address: { street: '123 Main St', city: 'Anytown', postal_code: '12345', country: 'USA' },
            registration: { chamber_of_commerce_number: 'COC123', vat_number: 'VAT456' },
            banking_details: { account_holder: 'Main Partner Inc.', bank_name: 'Global Bank', iban: 'IBAN123...' },
            visual_identity: {
                 primary_color: '#0000FF', secondary_color: '#FFFFFF', logo: 'logo.png', font: 'Arial',
                 top_banner: undefined,
                 mid_banner: undefined
             },
            parent: parentId,
            users: [userId1, userId2],
            financial_properties: {
                administration_fee: 50,
                income_per_gb: 0.5,
                commission_fee: 10,
                payment_method: 'invoice',
                requires_card: false,
                next_invoice: nextInvoice,
                last_invoice: null,
                pricing_strategies: {
                    partner: {
                        strategy: 'split', modification_percentage: 15,
                        default_price_list: priceListId,
                        custom_prices: [
                            { destination: 'USA', label: 'USA 5GB', type: 'data-limit', price: 10, package: packageId }
                        ]
                    },
                    user: undefined // Optional
                }
            },
            platform_settings: {
                 package_strategy: { name: 'Default', parameters: { default_gb: 5 } },
                 free_esim: null,
                 booking_defaults: { locale: 'en-US' },
                 booking_confirmation: { brevo_template_id: 1, send_booking_confirmation: true },
                 schedules: []
             },
        };

        // Convert to Firestore
        const partnerFirestore = partnerToFirestore(initialPartnerApp);

        // Basic Checks (checking a few key fields)
        expect(partnerFirestore.name).toBe('Main Partner Inc.');
        expect(partnerFirestore.parent?.id).toBe(parentId);
        expect(partnerFirestore.users).toHaveLength(2);
        expect(partnerFirestore.users?.[0].id).toBe(userId1);
        expect(partnerFirestore.financial_properties?.next_invoice?.toDate()).toEqual(nextInvoice);
        expect(partnerFirestore.financial_properties?.pricing_strategies?.partner?.default_price_list?.path).toContain(priceListId);
        expect(partnerFirestore.financial_properties?.pricing_strategies?.partner?.custom_prices[0].package?.path).toContain(packageId);
        expect(partnerFirestore.platform_settings?.booking_defaults?.locale).toBe('en-US');

        // Convert back to App
        const finalPartnerApp = partnerFromFirestore(partnerFirestore);

        // Assertions
        expect(finalPartnerApp.created_at?.getTime()).toEqual(initialPartnerApp.created_at?.getTime());
        expect(finalPartnerApp.updated_at?.getTime()).toEqual(initialPartnerApp.updated_at?.getTime());
        expect(finalPartnerApp.financial_properties?.next_invoice?.getTime()).toEqual(initialPartnerApp.financial_properties?.next_invoice?.getTime());

        // Compare the rest (might need a custom deep equal due to complexity/nested objects/dates)
        // For simplicity, checking a few key non-date/ref top-level fields and nested ones
        expect(finalPartnerApp.id).toEqual(initialPartnerApp.id);
        expect(finalPartnerApp.name).toEqual(initialPartnerApp.name);
        expect(finalPartnerApp.parent).toEqual(initialPartnerApp.parent);
        expect(finalPartnerApp.users).toEqual(initialPartnerApp.users);
        expect(finalPartnerApp.contact).toEqual(initialPartnerApp.contact);
        expect(finalPartnerApp.address).toEqual(initialPartnerApp.address);
        // Deep compare crucial nested objects minus dates/refs handled above
        expect(finalPartnerApp.financial_properties?.pricing_strategies?.partner?.custom_prices)
             .toEqual(initialPartnerApp.financial_properties?.pricing_strategies?.partner?.custom_prices);
         expect(finalPartnerApp.platform_settings?.package_strategy)
             .toEqual(initialPartnerApp.platform_settings?.package_strategy);

         // A full deep equal after filtering dates/refs might be more robust if needed
         // expect(filterDeep(finalPartnerApp)).toEqual(filterDeep(initialPartnerApp));
    });

    it('should correctly convert between PriceListApp and PriceListFirestore (Roundtrip)', () => {
        const now = new Date();
        const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
        const priceListId = 'pl_partner_abc';
        const partnerId = 'partner_for_pl_1';
        const packageId1 = 'pkg_eur_1gb';
        const packageId2 = 'pkg_global_5gb';

        const initialPriceListApp: PriceListApp = {
            id: priceListId,
            created_at: createdAt,
            updated_at: createdAt,
            created_by: 'admin',
            updated_by: 'admin',
            name: 'Partner Standard Prices',
            description: 'Default price list for partners',
            type: 'partner',
            partner: partnerId,
            package_prices: [
                { destination: 'EUR', label: 'Europe 1GB', type: 'data-limit', price: 5, package: packageId1 },
                { destination: 'GLOBAL', label: 'Global 5GB', type: 'data-limit', price: 25, package: packageId2 },
            ],
        };

        // Convert to Firestore
        const priceListFirestore = priceListToFirestore(initialPriceListApp);

        // Basic checks
        expect(priceListFirestore.name).toBe('Partner Standard Prices');
        expect(priceListFirestore.type).toBe('partner');
        expect(priceListFirestore.partner?.id).toBe(partnerId);
        expect(priceListFirestore.package_prices).toHaveLength(2);
        expect(priceListFirestore.package_prices[0].package?.path).toContain(packageId1);
        expect(priceListFirestore.package_prices[1].price).toBe(25);

        // Convert back to App
        const finalPriceListApp = priceListFromFirestore(priceListFirestore);

        // Assertions
        expect(finalPriceListApp.created_at?.getTime()).toEqual(initialPriceListApp.created_at?.getTime());
        expect(finalPriceListApp.updated_at?.getTime()).toEqual(initialPriceListApp.updated_at?.getTime());

        const finalFiltered = { ...finalPriceListApp, created_at: undefined, updated_at: undefined };
        const initialFiltered = { ...initialPriceListApp, created_at: undefined, updated_at: undefined };
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 