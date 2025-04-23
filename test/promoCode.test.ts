/**
 * Tests for the PromoCode schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks';

// Now we can import the PromoCode schemas and functions
import {
    promoCodeAppSchema,
    promoCodeToFirestore,
    promoCodeFromFirestore,
    PromoCodeApp,
    PromoCodeFirestore
} from '../src/schemas/promoCode';

// Import collection constants from the centralized refs
import {
    PARTNER_COLLECTION,
    COUNTRY_COLLECTION,
    BOOKING_COLLECTION,
    PACKAGE_COLLECTION
} from '../src/schemas/refs';

import { z } from 'zod';

// Import helpers for use in tests
import * as helpers from '../src/schemas/helpers';

/**
 * Create a sample promo code with comprehensive data for testing
 */
const createSamplePromoCode = (): PromoCodeApp => ({
    id: 'promo_123',
    external_id: 'external_promo_123',
    code: 'SUMMER2023',
    allowance_user: 1,
    allowance_total: 100,
    type: 'partial-discount',
    usage: ['user_1', 'user_2'],
    uuid_usage: ['uuid_1', 'uuid_2'],
    package_specification: {
        destination: 'Global',
        size: '5GB'
    },
    partner: 'partner_123',
    valid_from: new Date('2023-06-01'),
    valid_to: new Date('2023-09-01'),
    
    // Optional fields based on type
    discount: 25, // 25% discount
    package_size: '5GB',
    package: 'package_123',
    country: 'country_nl',
    booking: null,
    countries: ['country_nl', 'country_de', 'country_fr'],
    max_bytes: 5368709120, // 5GB in bytes
    starter_data: 52428800, // 50MB in bytes
    
    created_at: new Date('2023-05-15'),
    updated_at: new Date('2023-05-15'),
    created_by: 'admin_user',
    updated_by: null
});

/**
 * Test promo code app schema validation
 */
export const testPromoCodeAppSchemaValidation = () => {
    try {
        const promoCodeData = createSamplePromoCode();
        const validPromoCode = promoCodeAppSchema.parse(promoCodeData);
        return validPromoCode;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Removed console.error
        } else {
            // Removed console.error
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testPromoCodeToFirestore = (promoCodeData: PromoCodeApp) => {
    try {
        // Create a mock implementation for document references
        const originalRefMethod = helpers.toFirestore.ref;
        const originalDateMethod = helpers.toFirestore.date;
        
        // Mock document references
        helpers.toFirestore.ref = <T>(collectionPath: string, id: string): any => {
            return new MockDocumentReference(collectionPath, id);
        };
        
        // Mock timestamps
        helpers.toFirestore.date = (date: Date): any => {
            return new MockTimestamp(date);
        };
        
        // Run the conversion
        const firestorePromoCode = promoCodeToFirestore(promoCodeData);
        
        // Restore original functions
        helpers.toFirestore.ref = originalRefMethod;
        helpers.toFirestore.date = originalDateMethod;
        
        // Verify document references work with our mocks
        // Partner reference
        if (promoCodeData.partner && !firestorePromoCode.partner) {
            throw new Error('Partner reference not set correctly');
        }
        if (promoCodeData.partner && firestorePromoCode.partner) {
            if (!firestorePromoCode.partner.path.startsWith(PARTNER_COLLECTION)) {
                throw new Error('Partner document reference is invalid');
            }
        }
        
        // Package reference
        if (promoCodeData.package && !firestorePromoCode.package) {
            throw new Error('Package reference not set correctly');
        }
        if (promoCodeData.package && firestorePromoCode.package) {
            if (!firestorePromoCode.package.path.startsWith(PACKAGE_COLLECTION)) {
                throw new Error('Package document reference is invalid');
            }
        }
        
        // Country reference
        if (promoCodeData.country && !firestorePromoCode.country) {
            throw new Error('Country reference not set correctly');
        }
        if (promoCodeData.country && firestorePromoCode.country) {
            if (!firestorePromoCode.country.path.startsWith(COUNTRY_COLLECTION)) {
                throw new Error('Country document reference is invalid');
            }
        }
        
        // Booking reference
        if (promoCodeData.booking && !firestorePromoCode.booking) {
            throw new Error('Booking reference not set correctly');
        }
        if (promoCodeData.booking && firestorePromoCode.booking) {
            if (!firestorePromoCode.booking.path.startsWith(BOOKING_COLLECTION)) {
                throw new Error('Booking document reference is invalid');
            }
        }
        
        return firestorePromoCode;
    } catch (error) {
        // Removed console.error
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testPromoCodeFromFirestore = (
    originalPromoCode: PromoCodeApp, 
    firestorePromoCode: PromoCodeFirestore
) => {
    try {
        // Mock the Firestore references
        const originalRefMethod = helpers.fromFirestore.ref;
        const originalDateMethod = helpers.fromFirestore.date;
        
        // Mock document references
        helpers.fromFirestore.ref = (<T>(docRef: any): string => {
            // Custom implementation for testing
            if (docRef && typeof docRef === 'object' && 'id' in docRef) {
                return docRef.id;
            }
            return '';
        }) as any;
        
        helpers.fromFirestore.date = ((timestamp: MockTimestamp): Date => {
            // Custom implementation for testing
            if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
                return timestamp.toDate();
            }
            return new Date();
        }) as any;
        
        // Run the conversion
        const convertedPromoCode = promoCodeFromFirestore(firestorePromoCode);
        
        // Restore original functions
        helpers.fromFirestore.ref = originalRefMethod;
        helpers.fromFirestore.date = originalDateMethod;
        
        // Check data integrity
        const failures: string[] = [];
        
        // Test basic fields
        const basicFields = [
            'id',
            'external_id',
            'code',
            'allowance_user',
            'allowance_total',
            'type',
            'created_by',
            'updated_by'
        ];
        
        basicFields.forEach(field => {
            if ((originalPromoCode as Record<string, any>)[field] !== (convertedPromoCode as Record<string, any>)[field]) {
                failures.push(
                    `Field ${field} value mismatch: ` +
                    `Original: ${(originalPromoCode as Record<string, any>)[field]}, ` +
                    `Converted: ${(convertedPromoCode as Record<string, any>)[field]}`
                );
            }
        });
        
        // Test array fields
        const arrayFields = ['usage', 'uuid_usage', 'countries'];
        
        arrayFields.forEach(field => {
            if ((originalPromoCode as Record<string, any>)[field] && (convertedPromoCode as Record<string, any>)[field]) {
                // Check array length
                if ((originalPromoCode as Record<string, any>)[field].length !== (convertedPromoCode as Record<string, any>)[field].length) {
                    failures.push(
                        `Array field ${field} length mismatch: ` +
                        `Original: ${(originalPromoCode as Record<string, any>)[field].length}, ` +
                        `Converted: ${(convertedPromoCode as Record<string, any>)[field].length}`
                    );
                } else {
                    // Check each array element
                    for (let i = 0; i < (originalPromoCode as Record<string, any>)[field].length; i++) {
                        if ((originalPromoCode as Record<string, any>)[field][i] !== (convertedPromoCode as Record<string, any>)[field][i]) {
                            failures.push(
                                `Array field ${field} element ${i} mismatch: ` +
                                `Original: ${(originalPromoCode as Record<string, any>)[field][i]}, ` +
                                `Converted: ${(convertedPromoCode as Record<string, any>)[field][i]}`
                            );
                        }
                    }
                }
            }
        });
        
        // Test date fields
        const dateFields = ['valid_from', 'valid_to', 'created_at', 'updated_at'];
        
        dateFields.forEach(field => {
            if ((originalPromoCode as Record<string, any>)[field] && (convertedPromoCode as Record<string, any>)[field]) {
                if ((originalPromoCode as Record<string, any>)[field].getTime() !== (convertedPromoCode as Record<string, any>)[field].getTime()) {
                    failures.push(
                        `Date field ${field} mismatch: ` +
                        `Original: ${(originalPromoCode as Record<string, any>)[field].toISOString()}, ` +
                        `Converted: ${(convertedPromoCode as Record<string, any>)[field].toISOString()}`
                    );
                }
            } else if ((originalPromoCode as Record<string, any>)[field] !== (convertedPromoCode as Record<string, any>)[field]) {
                failures.push(
                    `Date field ${field} nullability mismatch: ` +
                    `Original: ${(originalPromoCode as Record<string, any>)[field]}, ` +
                    `Converted: ${(convertedPromoCode as Record<string, any>)[field]}`
                );
            }
        });
        
        // Test reference fields
        const refFields = ['partner', 'package', 'country', 'booking'];
        
        refFields.forEach(field => {
            if ((originalPromoCode as Record<string, any>)[field] !== (convertedPromoCode as Record<string, any>)[field]) {
                failures.push(
                    `Reference field ${field} mismatch: ` +
                    `Original: ${(originalPromoCode as Record<string, any>)[field]}, ` +
                    `Converted: ${(convertedPromoCode as Record<string, any>)[field]}`
                );
            }
        });
        
        // Test nested object fields
        if (
            JSON.stringify((originalPromoCode as Record<string, any>).package_specification) !== 
            JSON.stringify((convertedPromoCode as Record<string, any>).package_specification)
        ) {
            failures.push(
                `Nested object field package_specification mismatch: ` +
                `Original: ${JSON.stringify((originalPromoCode as Record<string, any>).package_specification)}, ` +
                `Converted: ${JSON.stringify((convertedPromoCode as Record<string, any>).package_specification)}`
            );
        }
        
        // Test numeric fields
        ['discount', 'max_bytes', 'starter_data'].forEach(field => {
            if ((originalPromoCode as Record<string, any>)[field] !== (convertedPromoCode as Record<string, any>)[field]) {
                failures.push(
                    `Numeric field ${field} mismatch: ` +
                    `Original: ${(originalPromoCode as Record<string, any>)[field]}, ` +
                    `Converted: ${(convertedPromoCode as Record<string, any>)[field]}`
                );
            }
        });
        
        if (failures.length > 0) {
            throw new Error(`Data integrity failures:\n${failures.join('\n')}`);
        }
        
        return convertedPromoCode;
    } catch (error) {
        // Removed console.error
        throw error;
    }
};

/**
 * Test reference handling specifically
 */
export const testPromoCodeReferenceHandling = () => {
    try {
        const promoCodeData = createSamplePromoCode();
        
        // Create a couple of refs to test
        promoCodeData.partner = 'partner_test_123';
        promoCodeData.package = 'package_test_456';
        promoCodeData.country = 'country_test_789';
        promoCodeData.booking = 'booking_test_101112';
        
        // Mock helper functions
        const originalToRefMethod = helpers.toFirestore.ref;
        const originalToDateMethod = helpers.toFirestore.date;
        const originalFromRefMethod = helpers.fromFirestore.ref;
        const originalFromDateMethod = helpers.fromFirestore.date;
        
        // Setup mocks
        helpers.toFirestore.ref = <T>(collectionPath: string, id: string): any => {
            return new MockDocumentReference(collectionPath, id);
        };
        
        helpers.toFirestore.date = (date: Date): any => {
            return new MockTimestamp(date);
        };
        
        helpers.fromFirestore.ref = (<T>(docRef: any): string => {
            // Custom implementation for testing
            if (docRef && typeof docRef === 'object' && 'id' in docRef) {
                return docRef.id;
            }
            return '';
        }) as any;
        
        helpers.fromFirestore.date = ((timestamp: MockTimestamp): Date => {
            // Custom implementation for testing
            if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
                return timestamp.toDate();
            }
            return new Date();
        }) as any;
        
        // Convert to Firestore
        const firestorePromoCode = promoCodeToFirestore(promoCodeData);
        
        // Verify references are set
        if (!firestorePromoCode.partner || !firestorePromoCode.partner.path) {
            throw new Error('Partner reference not correctly set in Firestore object');
        }
        
        if (!firestorePromoCode.package || !firestorePromoCode.package.path) {
            throw new Error('Package reference not correctly set in Firestore object');
        }
        
        if (!firestorePromoCode.country || !firestorePromoCode.country.path) {
            throw new Error('Country reference not correctly set in Firestore object');
        }
        
        if (!firestorePromoCode.booking || !firestorePromoCode.booking.path) {
            throw new Error('Booking reference not correctly set in Firestore object');
        }
        
        // Convert back to app schema
        const convertedPromoCode = promoCodeFromFirestore(firestorePromoCode);
        
        // Verify references match original
        if (convertedPromoCode.partner !== promoCodeData.partner) {
            throw new Error(
                `Partner reference mismatch: ` +
                `Original: ${promoCodeData.partner}, ` +
                `Converted: ${convertedPromoCode.partner}`
            );
        }
        
        if (convertedPromoCode.package !== promoCodeData.package) {
            throw new Error(
                `Package reference mismatch: ` +
                `Original: ${promoCodeData.package}, ` +
                `Converted: ${convertedPromoCode.package}`
            );
        }
        
        if (convertedPromoCode.country !== promoCodeData.country) {
            throw new Error(
                `Country reference mismatch: ` +
                `Original: ${promoCodeData.country}, ` +
                `Converted: ${convertedPromoCode.country}`
            );
        }
        
        if (convertedPromoCode.booking !== promoCodeData.booking) {
            throw new Error(
                `Booking reference mismatch: ` +
                `Original: ${promoCodeData.booking}, ` +
                `Converted: ${convertedPromoCode.booking}`
            );
        }
        
        // Restore original methods
        helpers.toFirestore.ref = originalToRefMethod;
        helpers.toFirestore.date = originalToDateMethod;
        helpers.fromFirestore.ref = originalFromRefMethod;
        helpers.fromFirestore.date = originalFromDateMethod;
        
        return true;
    } catch (error) {
        // Removed console.error
        throw error;
    }
};

/**
 * Run all PromoCode tests
 */
export const runAllPromoCodeTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running PromoCode Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testPromoCodeAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testPromoCodeToFirestore(validData);
        
        // Test conversion back to app
        testPromoCodeFromFirestore(validData, firestoreData);
        
        // Test specific reference handling
        testPromoCodeReferenceHandling();
        
        console.log('\n✅ All PromoCode schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ PromoCode schema tests failed:', error);
        return false;
    }
};

// Run tests directly when this file is executed
if (require.main === module) {
    try {
        runAllPromoCodeTests();
    } finally {
        cleanupMocks();
    }
} 