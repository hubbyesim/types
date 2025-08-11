import { createModelConverters } from '../src/utils/modelConverterFactory';
import { PartnerSchema, HPartnerSchema } from '../src';
import { partnerSchemaSpec } from '../src/specs/partner';
import { DocumentReference, Firestore } from 'firebase-admin/firestore';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';

// Mock Firebase for tests
beforeAll(() => {
    // Set up a test instance with isTest flag
    const testFirebase = createFirebaseService({ isTest: true });
    FirebaseService.setDefaultInstance(testFirebase);
});

// Helper function to check if an object is a proper Firebase Admin DocumentReference
function isDocumentReference(obj: any): boolean {
    return (
        obj &&
        typeof obj === 'object' &&
        'id' in obj &&
        typeof obj.id === 'string' &&
        'path' in obj &&
        typeof obj.path === 'string' &&
        'parent' in obj &&
        typeof obj.parent === 'object'
    );
}

describe('Model Converter Document References', () => {
    // Get Firestore instance from test Firebase after it's injected
    let db: Firestore;

    beforeAll(() => {
        db = FirebaseService.getDefaultInstance().firestore;
    });

    it('should convert string IDs to proper DocumentReferences', () => {
        // Create model converters with the Firestore instance
        const partnerConverters = createModelConverters<any, any>(db, partnerSchemaSpec);

        // Create sample data with document references (as strings)
        const sampleData = {
            id: 'test-partner-123',
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'user1',
            updated_by: null,
            name: 'Test Partner',
            type: 'travel-agency',
            is_active: true,
            contact: { email: 'test@example.com', office_phone: null },
            address: { country: 'Netherlands' },
            registration: {},
            banking_details: {
                account_holder: 'Test Partner',
                bank_name: 'Test Bank',
                iban: 'NL00TEST0123456789'
            },
            parent: 'parent-partner-456', // This should be converted to a document reference
            users: ['user-1', 'user-2'], // These should be converted to document references
            financial_properties: {
                administration_fee: 25.0,
                income_per_gb: 5.0,
                commission_fee: 10.0,
                payment_method: 'invoice',
                requires_card: false,
                next_invoice: new Date(),
                last_invoice: new Date(),
                pricing_strategies: {
                    partner: {
                        strategy: 'split',
                        modification_percentage: 10,
                        default_price_list: 'price-list-1', // This should be converted to a document reference
                        custom_prices: [
                            {
                                destination: 'France',
                                label: '5GB Package',
                                type: 'data-limited',
                                price: 19.99,
                                package: 'package-1' // This should be converted to a document reference
                            }
                        ]
                    },
                    user: {
                        modification_percentage: 5,
                        default_price_list: 'price-list-2', // This should be converted to a document reference
                        custom_prices: []
                    }
                }
            },
            visual_identity: {
                primary_color: '#FF5733',
                secondary_color: '#33FF57',
                logo: 'https://example.com/logo.png'
            },
            platform_settings: {
                package_strategy: {
                    name: 'default',
                    parameters: {}
                },
                booking_defaults: {
                    locale: 'en-US'
                }
            }
        };

        // Convert the data to Firestore format
        const firestoreData = partnerConverters.toFirestore(sampleData);

        // Check that parent field is a proper DocumentReference
        expect(isDocumentReference(firestoreData.parent)).toBe(true);
        expect(firestoreData.parent.id).toBe('parent-partner-456');

        // Check that users array contains proper DocumentReferences
        expect(Array.isArray(firestoreData.users)).toBe(true);
        expect(firestoreData.users.length).toBe(2);
        expect(isDocumentReference(firestoreData.users[0])).toBe(true);
        expect(firestoreData.users[0].id).toBe('user-1');
        expect(isDocumentReference(firestoreData.users[1])).toBe(true);
        expect(firestoreData.users[1].id).toBe('user-2');

        // Check nested document references
        expect(isDocumentReference(firestoreData.financial_properties.pricing_strategies.partner.default_price_list)).toBe(true);
        expect(firestoreData.financial_properties.pricing_strategies.partner.default_price_list.id).toBe('price-list-1');

        // Check deeply nested document reference in array
        expect(isDocumentReference(firestoreData.financial_properties.pricing_strategies.partner.custom_prices[0].package)).toBe(true);
        expect(firestoreData.financial_properties.pricing_strategies.partner.custom_prices[0].package.id).toBe('package-1');

        // Check other nested document reference
        expect(isDocumentReference(firestoreData.financial_properties.pricing_strategies.user.default_price_list)).toBe(true);
        expect(firestoreData.financial_properties.pricing_strategies.user.default_price_list.id).toBe('price-list-2');

        // Additional checks to ensure the references are actual Firebase Admin DocumentReferences
        // This is the most important part to distinguish between client and admin SDKs
        const parentRef = firestoreData.parent;
        expect(parentRef).toHaveProperty('firestore');
        expect(typeof parentRef.get).toBe('function');
        expect(typeof parentRef.set).toBe('function');
        expect(typeof parentRef.update).toBe('function');
        expect(typeof parentRef.delete).toBe('function');
    });

    // This test checks what would happen if we were using the Firebase client SDK instead
    it('should fail if using client SDK document references instead of admin SDK', () => {
        // Create a mock client Firestore that doesn't properly implement the admin SDK
        const mockClientDb = {
            doc: (path: string) => {
                // This simulates the client SDK which doesn't have all the admin SDK methods
                const id = path.split('/').pop() || '';
                return {
                    id,
                    path,
                    // Missing critical methods and properties that admin SDK has
                    // Note: This is a simplified mock, client SDK has different APIs
                };
            },
            collection: (path: string) => ({
                doc: (id: string) => ({
                    id,
                    path: `${path}/${id}`,
                    // Missing critical methods that admin SDK has
                })
            })
        } as unknown as Firestore;

        // Create model converters with the mock client Firestore
        const partnerConverters = createModelConverters<any, any>(mockClientDb, partnerSchemaSpec);

        // Simple data with a reference
        const sampleData = {
            id: 'test-partner',
            parent: 'parent-ref',
            // Add minimal required fields from partner schema
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'user1',
            updated_by: null,
            name: 'Test',
            type: 'travel-agency',
            is_active: true,
            contact: { email: 'test@example.com' },
            address: {},
            registration: {},
            banking_details: {},
            users: [],
            financial_properties: {
                pricing_strategies: {
                    partner: {
                        strategy: 'split',
                        custom_prices: []
                    }
                }
            },
            visual_identity: {},
            platform_settings: {
                package_strategy: {
                    name: 'default',
                    parameters: {}
                },
                booking_defaults: {
                    locale: 'en-US'
                }
            }
        };

        // Convert to Firestore format
        const firestoreData = partnerConverters.toFirestore(sampleData);

        // Check that parent field is an object with id and path properties
        expect(firestoreData.parent).toHaveProperty('id', 'parent-ref');
        expect(firestoreData.parent).toHaveProperty('path');

        // But it should be missing critical admin SDK methods
        expect(firestoreData.parent.firestore).toBeUndefined();
        expect(typeof firestoreData.parent.get).not.toBe('function');
        expect(typeof firestoreData.parent.set).not.toBe('function');
    });
}); 