/**
 * Tests for the Partner schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks';

// Now we can import the Partner schemas and functions
import {
    partnerAppSchema,
    partnerToFirestore,
    partnerFromFirestore,
    PartnerApp,
    PartnerFirestore,
    PARTNER_COLLECTION,
    PRICE_LIST_COLLECTION,
    PACKAGE_COLLECTION,
    USER_COLLECTION
} from '../src/schemas/partner';

import { z } from 'zod';

/**
 * Create a sample partner with comprehensive data to test conversions
 */
const createSamplePartner = (): PartnerApp => ({
    id: 'partner_123',
    name: 'Test Partner Corp',
    type: 'travel_agency',
    is_active: true,
    external_id: 'ext_partner_123',
    
    contact: {
        email: 'contact@testpartner.com',
        office_phone: '+31612345678'
    },
    
    address: {
        street: '123 Main St',
        city: 'Amsterdam',
        postal_code: '1000 AB',
        country: 'Netherlands'
    },
    
    registration: {
        chamber_of_commerce_number: 'KVK123456',
        vat_number: 'NL123456789B01',
        anvr_number: 12345,
        tax_number: 'TAX123456'
    },
    
    banking_details: {
        account_holder: 'Test Partner Corp',
        bank_name: 'ING Bank',
        iban: 'NL91INGB0123456789'
    },
    
    platform_settings: {
        booking_defaults: {
            locale: 'en-US'
        },
        free_esim: {
            allowance: 1,
            package_specifications: { 
                destination: 'Global',
                size: '1GB'
            }
        },
        schedules: [
            {
                days: 1,
                email: {
                    brevo_template_id: 12345,
                    subject: { 'en-US': 'Your eSIM is ready' },
                    preview_text: { 'en-US': 'Access your travel eSIM now' }
                },
                push: null,
                hour: 9,
                key: 'esim_ready',
                method: 'email',
                moment: 'departure',
                filter: null
            }
        ],
        booking_confirmation: {
            brevo_template_id: 67890,
            send_booking_confirmation: true
        }
    },
    
    visual_identity: {
        primary_color: '#1a73e8',
        secondary_color: '#f8f9fa',
        logo: 'https://example.com/logo.png',
        font: 'Roboto',
        top_banner: {
            strategy: 'fixed',
            banners: [{
                image_url: 'https://example.com/banner.jpg',
                alt: 'Travel with us',
                click_url: 'https://example.com/promo',
                locale: 'en-US',
                properties: { position: 'top' }
            }]
        },
        mid_banner: {
            strategy: 'rotating',
            banners: [{
                image_url: 'https://example.com/mid-banner.jpg',
                alt: 'Special offer',
                click_url: 'https://example.com/special',
                locale: 'en-US',
                properties: { position: 'middle' }
            }]
        }
    },
    
    parent: null,
    users: ['user_123', 'user_456'],
    
    financial_properties: {
        administration_fee: 5.99,
        income_per_gb: 2.5,
        commission_fee: 10.0,
        payment_method: 'invoice',
        requires_card: false,
        next_invoice: new Date('2023-12-31'),
        last_invoice: new Date('2023-11-30'),
        pricing_strategies: {
            partner: {
                strategy: 'split',
                modification_percentage: 10,
                default_price_list_id: 'price_list_123',
                custom_prices: [{
                    destination: 'Global',
                    label: 'Premium Global',
                    type: 'data-limit',
                    price: 29.99,
                    package: 'package_123'
                }]
            },
            user: {
                strategy: 'bundle',
                modification_percentage: 5,
                default_price_list_id: 'price_list_456',
                custom_prices: []
            }
        }
    },
    
    data: {
        source: 'api',
        manual: false
    },
    
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'system',
    updated_by: null
});

/**
 * Test partner app schema validation
 */
export const testPartnerAppSchemaValidation = () => {
    try {
        const partnerData = createSamplePartner();
        const validPartner = partnerAppSchema.parse(partnerData);
        console.log('✅ Partner app schema validation passed');
        return validPartner;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Partner validation error:', error.errors);
        } else {
            console.error('❌ Partner error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testPartnerToFirestore = (partnerData: PartnerApp) => {
    try {
        const firestorePartner = partnerToFirestore(partnerData);
        
        // Verify document references work with our mocks
        if (partnerData.users && firestorePartner.users) {
            const allRefsValid = firestorePartner.users.every(ref => {
                return ref.path.startsWith(USER_COLLECTION);
            });
            if (!allRefsValid) {
                throw new Error('User document references are invalid');
            }
        }
        
        // Verify pricing strategies references
        if (
            partnerData.financial_properties?.pricing_strategies?.partner?.default_price_list_id && 
            firestorePartner.financial_properties?.pricing_strategies?.partner?.default_price_list
        ) {
            const priceListRef = firestorePartner.financial_properties.pricing_strategies.partner.default_price_list;
            if (!priceListRef.path.startsWith(PRICE_LIST_COLLECTION)) {
                throw new Error('Price list document reference is invalid');
            }
        }
        
        // Verify package references in custom prices
        if (
            partnerData.financial_properties?.pricing_strategies?.partner?.custom_prices && 
            firestorePartner.financial_properties?.pricing_strategies?.partner?.custom_prices
        ) {
            const allPackageRefsValid = firestorePartner.financial_properties.pricing_strategies.partner.custom_prices.every(
                price => price.package.path.startsWith(PACKAGE_COLLECTION)
            );
            if (!allPackageRefsValid) {
                throw new Error('Package document references are invalid');
            }
        }
        
        console.log('✅ Partner to Firestore conversion passed');
        return firestorePartner;
    } catch (error) {
        console.error('❌ Partner to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testPartnerFromFirestore = (firestorePartner: PartnerFirestore, originalPartner: PartnerApp) => {
    try {
        const retrievedPartner = partnerFromFirestore(firestorePartner);
        
        // Test data integrity for important fields
        console.log('Partner round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Basic fields
        const basicFieldsTest = 
            originalPartner.id === retrievedPartner.id &&
            originalPartner.name === retrievedPartner.name &&
            originalPartner.type === retrievedPartner.type &&
            originalPartner.is_active === retrievedPartner.is_active;
        
        console.log(`- Basic fields: ${basicFieldsTest ? '✅' : '❌'}`);
        if (!basicFieldsTest) failedTests.push('Basic fields');
        
        // Contact info
        const contactTest = 
            originalPartner.contact?.email === retrievedPartner.contact?.email &&
            originalPartner.contact?.office_phone === retrievedPartner.contact?.office_phone;
        
        console.log(`- Contact info: ${contactTest ? '✅' : '❌'}`);
        if (!contactTest) failedTests.push('Contact info');
        
        // Address
        const addressTest =
            originalPartner.address?.street === retrievedPartner.address?.street &&
            originalPartner.address?.city === retrievedPartner.address?.city;
        
        console.log(`- Address: ${addressTest ? '✅' : '❌'}`);
        if (!addressTest) failedTests.push('Address');
        
        // References - Now we can properly check references since we fixed the bug
        let referencesTest = true;
        
        // Check parent - consider null and undefined as equivalent
        const parentEquivalent = 
            (originalPartner.parent === null && retrievedPartner.parent === undefined) ||
            (originalPartner.parent === undefined && retrievedPartner.parent === null) ||
            originalPartner.parent === retrievedPartner.parent;
            
        if (!parentEquivalent) {
            referencesTest = false;
        }
        
        // Check users array - consider null and undefined as equivalent
        const originalUsersExists = originalPartner.users !== null && originalPartner.users !== undefined;
        const retrievedUsersExists = retrievedPartner.users !== null && retrievedPartner.users !== undefined;
        
        if (originalUsersExists && retrievedUsersExists) {
            const originalUsers = originalPartner.users!;
            const retrievedUsers = retrievedPartner.users!;
            
            // Compare array lengths
            if (originalUsers.length !== retrievedUsers.length) {
                referencesTest = false;
            } else {
                // Compare each item
                for (let i = 0; i < originalUsers.length; i++) {
                    if (originalUsers[i] !== retrievedUsers[i]) {
                        referencesTest = false;
                        break;
                    }
                }
            }
        } else if (originalUsersExists !== retrievedUsersExists) {
            // One exists but not the other (considering null/undefined as equivalent)
            referencesTest = false;
        }
        
        console.log(`- References: ${referencesTest ? '✅' : '❌'}`);
        if (!referencesTest) failedTests.push('References');
        
        // Visual identity
        const visualIdentityTest =
            originalPartner.visual_identity?.primary_color === retrievedPartner.visual_identity?.primary_color &&
            originalPartner.visual_identity?.top_banner?.strategy === retrievedPartner.visual_identity?.top_banner?.strategy;
        
        console.log(`- Visual identity: ${visualIdentityTest ? '✅' : '❌'}`);
        if (!visualIdentityTest) failedTests.push('Visual identity');
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedPartner;
    } catch (error) {
        console.error('❌ Firestore to Partner conversion failed:', error);
        throw error;
    }
};

/**
 * Run all partner tests
 */
export const runAllPartnerTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running Partner Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test app schema validation
        const validPartner = testPartnerAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestorePartner = testPartnerToFirestore(validPartner);
        
        // Test conversion back to app
        testPartnerFromFirestore(firestorePartner, validPartner);
        
        console.log('\n✅ All Partner schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ Partner schema tests failed:', error);
        return false;
    } finally {
        // Clean up mocks
        cleanupMocks();
    }
};

// Run tests directly when this file is executed
if (require.main === module) {
    runAllPartnerTests();
} 