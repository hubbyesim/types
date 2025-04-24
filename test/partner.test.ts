/**
 * Tests for the Partner schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks, setupMocks } from './mocks.js';

// Make sure mocks are properly initialized
setupMocks();

// Import collection constants from the centralized refs
import {
    PARTNER_COLLECTION,
    PRICE_LIST_COLLECTION,
    PACKAGE_COLLECTION,
    USER_COLLECTION
} from '../src/schemas/refs.js';

// Now we can import the Partner schemas and functions
import {
    partnerAppSchema,
    partnerToFirestore,
    partnerFromFirestore,
    PartnerApp,
    PartnerFirestore,
    priceListAppSchema,
    priceListToFirestore,
    priceListFromFirestore,
    PriceListApp,
    PriceListFirestore
} from '../src/schemas/partner.js';

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
                default_price_list: 'price_list_123',
                custom_prices: [{
                    destination: 'Global',
                    label: 'Premium Global',
                    type: 'data-limit',
                    price: 29.99,
                    package: 'package_123'
                }]
            },
            user: {
                modification_percentage: 5,
                default_price_list: 'price_list_456',
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
            partnerData.financial_properties?.pricing_strategies?.partner?.default_price_list &&
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
 * Log test result and track failures
 */
const logTestResult = (testName: string, passed: boolean, failedTests: string[]) => {
    if (passed) {
        console.log(`  ✓ ${testName}`);
    } else {
        console.log(`  ✗ ${testName}`);
        failedTests.push(testName);
    }
};

/**
 * Test round-trip conversion from Firestore schema to App schema back to Firestore
 */
export const testPartnerFirestoreToAppToFirestore = (firestorePartner: PartnerFirestore) => {
    try {
        const appPartner = partnerFromFirestore(firestorePartner);
        const roundTripFirestore = partnerToFirestore(appPartner);

        // Test data integrity for important fields
        console.log('Partner Firestore→App→Firestore round trip data integrity check:');

        // Track test failures
        const failedTests: string[] = [];

        // Basic fields
        const basicFieldsTest =
            firestorePartner.id === roundTripFirestore.id &&
            firestorePartner.name === roundTripFirestore.name &&
            firestorePartner.type === roundTripFirestore.type &&
            firestorePartner.is_active === roundTripFirestore.is_active;

        logTestResult('Basic fields match', basicFieldsTest, failedTests);

        // Contact information
        const contactTest = JSON.stringify(firestorePartner.contact) === JSON.stringify(roundTripFirestore.contact);
        logTestResult('Contact info match', contactTest, failedTests);

        // Address
        const addressTest = JSON.stringify(firestorePartner.address) === JSON.stringify(roundTripFirestore.address);
        logTestResult('Address match', addressTest, failedTests);

        // Registration
        const registrationTest = JSON.stringify(firestorePartner.registration) === JSON.stringify(roundTripFirestore.registration);
        logTestResult('Registration match', registrationTest, failedTests);

        // Banking details
        const bankingTest = JSON.stringify(firestorePartner.banking_details) === JSON.stringify(roundTripFirestore.banking_details);
        logTestResult('Banking details match', bankingTest, failedTests);

        // Parent reference
        const parentTest =
            (!firestorePartner.parent && !roundTripFirestore.parent) ||
            (firestorePartner.parent?.path === roundTripFirestore.parent?.path);
        logTestResult('Parent reference match', parentTest, failedTests);

        // User references
        let usersTest = true;
        if (firestorePartner.users && roundTripFirestore.users) {
            if (firestorePartner.users.length === roundTripFirestore.users.length) {
                for (let i = 0; i < firestorePartner.users.length; i++) {
                    const userA = firestorePartner.users[i];
                    const userB = roundTripFirestore.users[i];
                    if (userA && userB && userA.path !== userB.path) {
                        usersTest = false;
                        break;
                    }
                }
            } else {
                usersTest = false;
            }
        } else {
            usersTest = !firestorePartner.users && !roundTripFirestore.users;
        }
        logTestResult('User references match', usersTest, failedTests);

        // Financial properties - basic fields
        const fpTest =
            (!firestorePartner.financial_properties && !roundTripFirestore.financial_properties) ||
            (firestorePartner.financial_properties?.administration_fee === roundTripFirestore.financial_properties?.administration_fee &&
                firestorePartner.financial_properties?.income_per_gb === roundTripFirestore.financial_properties?.income_per_gb &&
                firestorePartner.financial_properties?.payment_method === roundTripFirestore.financial_properties?.payment_method);
        logTestResult('Financial properties match', fpTest, failedTests);

        // Check pricing strategies if they exist
        let pricingStrategiesTest = true;
        if (
            firestorePartner.financial_properties?.pricing_strategies &&
            roundTripFirestore.financial_properties?.pricing_strategies
        ) {
            const originalPS = firestorePartner.financial_properties.pricing_strategies;
            const roundTripPS = roundTripFirestore.financial_properties.pricing_strategies;

            // Check partner strategy
            if (originalPS.partner && roundTripPS.partner) {
                if (
                    originalPS.partner.strategy !== roundTripPS.partner.strategy ||
                    originalPS.partner.modification_percentage !== roundTripPS.partner.modification_percentage ||
                    (originalPS.partner.default_price_list?.path !== roundTripPS.partner.default_price_list?.path)
                ) {
                    pricingStrategiesTest = false;
                }

                // Check custom prices
                if (
                    originalPS.partner.custom_prices.length !== roundTripPS.partner.custom_prices.length
                ) {
                    pricingStrategiesTest = false;
                } else {
                    // Compare each custom price
                    for (let i = 0; i < originalPS.partner.custom_prices.length; i++) {
                        const originalPrice = originalPS.partner.custom_prices[i];
                        const roundTripPrice = roundTripPS.partner.custom_prices[i];

                        if (originalPrice && roundTripPrice && (
                            originalPrice.destination !== roundTripPrice.destination ||
                            originalPrice.label !== roundTripPrice.label ||
                            originalPrice.type !== roundTripPrice.type ||
                            originalPrice.price !== roundTripPrice.price ||
                            (originalPrice.package && roundTripPrice.package &&
                                originalPrice.package.path !== roundTripPrice.package.path)
                        )) {
                            pricingStrategiesTest = false;
                            break;
                        }
                    }
                }
            } else if (originalPS.partner || roundTripPS.partner) {
                // One has partner strategy and the other doesn't
                pricingStrategiesTest = false;
            }

            // Check user strategy
            if (originalPS.user && roundTripPS.user) {
                if (
                    originalPS.user.custom_prices.length !== roundTripPS.user.custom_prices.length
                ) {
                    pricingStrategiesTest = false;
                }
            } else if (originalPS.user || roundTripPS.user) {
                // One has user strategy and the other doesn't
                pricingStrategiesTest = false;
            }
        } else if (
            (firestorePartner.financial_properties?.pricing_strategies && !roundTripFirestore.financial_properties?.pricing_strategies) ||
            (!firestorePartner.financial_properties?.pricing_strategies && roundTripFirestore.financial_properties?.pricing_strategies)
        ) {
            pricingStrategiesTest = false;
        }

        logTestResult('Pricing strategies match', pricingStrategiesTest, failedTests);

        // Platform settings
        const platformSettingsTest = JSON.stringify(firestorePartner.platform_settings) ===
            JSON.stringify(roundTripFirestore.platform_settings);
        logTestResult('Platform settings match', platformSettingsTest, failedTests);

        // Visual identity
        const visualIdentityTest = JSON.stringify(firestorePartner.visual_identity) ===
            JSON.stringify(roundTripFirestore.visual_identity);
        logTestResult('Visual identity match', visualIdentityTest, failedTests);

        // Metadata
        const metadataTest = JSON.stringify(firestorePartner.data) === JSON.stringify(roundTripFirestore.data);
        logTestResult('Metadata match', metadataTest, failedTests);

        // Check if all tests passed
        if (failedTests.length === 0) {
            console.log('✅ Partner Firestore→App→Firestore round trip test passed');
            return roundTripFirestore;
        } else {
            throw new Error(`Failed tests: ${failedTests.join(', ')}`);
        }
    } catch (error) {
        console.error('❌ Partner Firestore→App→Firestore round trip test failed:', error);
        throw error;
    }
};

// Helper function to create a sample price list for testing
const createSamplePriceList = (): PriceListApp => ({
    id: 'price_list_123',
    name: 'Standard Price List',
    type: 'partner',
    price_list: [
        {
            destination: 'Global',
            label: 'Basic Global',
            type: 'data-limit',
            price: 19.99,
            package: 'package_123'
        },
        {
            destination: 'Europe',
            label: 'Europe Travel',
            type: 'time-limit',
            price: 14.99,
            package: 'package_456'
        }
    ],
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'system',
    updated_by: null
});

/**
 * Test price list app schema validation
 */
export const testPriceListAppSchemaValidation = () => {
    try {
        const priceListData = createSamplePriceList();
        const validPriceList = priceListAppSchema.parse(priceListData);
        console.log('✅ PriceList app schema validation passed');
        return validPriceList;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ PriceList validation error:', error.errors);
        } else {
            console.error('❌ PriceList error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from price list app schema to Firestore schema
 */
export const testPriceListToFirestore = (priceListData: PriceListApp) => {
    try {
        const firestorePriceList = priceListToFirestore(priceListData);

        // Verify package references in price list items
        const allPackageRefsValid = firestorePriceList.price_list.every(
            price => price.package.path.startsWith(PACKAGE_COLLECTION)
        );

        if (!allPackageRefsValid) {
            throw new Error('Package document references are invalid');
        }

        console.log('✅ PriceList to Firestore conversion passed');
        return firestorePriceList;
    } catch (error) {
        console.error('❌ PriceList to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testPriceListFromFirestore = (firestorePriceList: PriceListFirestore, originalPriceList: PriceListApp) => {
    try {
        const retrievedPriceList = priceListFromFirestore(firestorePriceList);

        // Test data integrity for important fields
        console.log('PriceList App→Firestore→App round trip data integrity check:');

        // Track test failures
        const failedTests: string[] = [];

        // Basic fields
        const basicFieldsTest =
            originalPriceList.id === retrievedPriceList.id &&
            originalPriceList.name === retrievedPriceList.name &&
            originalPriceList.type === retrievedPriceList.type;

        logTestResult('Basic fields match', basicFieldsTest, failedTests);

        // Price list items
        let priceListItemsTest = true;
        if (originalPriceList.price_list.length === retrievedPriceList.price_list.length) {
            for (let i = 0; i < originalPriceList.price_list.length; i++) {
                const originalItem = originalPriceList.price_list[i];
                const retrievedItem = retrievedPriceList.price_list[i];

                if (originalItem && retrievedItem && (
                    originalItem.destination !== retrievedItem.destination ||
                    originalItem.label !== retrievedItem.label ||
                    originalItem.type !== retrievedItem.type ||
                    originalItem.price !== retrievedItem.price ||
                    originalItem.package !== retrievedItem.package
                )) {
                    priceListItemsTest = false;
                    break;
                }
            }
        } else {
            priceListItemsTest = false;
        }

        logTestResult('Price list items match', priceListItemsTest, failedTests);

        // Check if all tests passed
        if (failedTests.length === 0) {
            console.log('✅ PriceList App→Firestore→App round trip test passed');
            return retrievedPriceList;
        } else {
            throw new Error(`Failed tests: ${failedTests.join(', ')}`);
        }
    } catch (error) {
        console.error('❌ PriceList App→Firestore→App round trip test failed:', error);
        throw error;
    }
};

/**
 * Test round-trip conversion from Firestore schema to App schema back to Firestore
 */
export const testPriceListFirestoreToAppToFirestore = (firestorePriceList: PriceListFirestore) => {
    try {
        const appPriceList = priceListFromFirestore(firestorePriceList);
        const roundTripFirestore = priceListToFirestore(appPriceList);

        // Test data integrity for important fields
        console.log('PriceList Firestore→App→Firestore round trip data integrity check:');

        // Track test failures
        const failedTests: string[] = [];

        // Basic fields
        const basicFieldsTest =
            firestorePriceList.id === roundTripFirestore.id &&
            firestorePriceList.name === roundTripFirestore.name &&
            firestorePriceList.type === roundTripFirestore.type;

        logTestResult('Basic fields match', basicFieldsTest, failedTests);

        // Price list items
        let priceListItemsTest = true;
        if (firestorePriceList.price_list.length === roundTripFirestore.price_list.length) {
            for (let i = 0; i < firestorePriceList.price_list.length; i++) {
                const originalItem = firestorePriceList.price_list[i];
                const roundTripItem = roundTripFirestore.price_list[i];

                if (originalItem && roundTripItem && (
                    originalItem.destination !== roundTripItem.destination ||
                    originalItem.label !== roundTripItem.label ||
                    originalItem.type !== roundTripItem.type ||
                    originalItem.price !== roundTripItem.price ||
                    (originalItem.package && roundTripItem.package &&
                        originalItem.package.path !== roundTripItem.package.path)
                )) {
                    priceListItemsTest = false;
                    break;
                }
            }
        } else {
            priceListItemsTest = false;
        }

        logTestResult('Price list items match', priceListItemsTest, failedTests);

        // Check if all tests passed
        if (failedTests.length === 0) {
            console.log('✅ PriceList Firestore→App→Firestore round trip test passed');
            return roundTripFirestore;
        } else {
            throw new Error(`Failed tests: ${failedTests.join(', ')}`);
        }
    } catch (error) {
        console.error('❌ PriceList Firestore→App→Firestore round trip test failed:', error);
        throw error;
    }
};

/**
 * Run all price list tests
 */
export const runAllPriceListTests = () => {
    try {
        console.log('\nRunning PriceList Schema Tests:');

        // Validate app schema
        const validPriceList = testPriceListAppSchemaValidation();

        // Test app to Firestore conversion
        const firestorePriceList = testPriceListToFirestore(validPriceList);

        // Test Firestore to app conversion (round trip App → Firestore → App)
        testPriceListFromFirestore(firestorePriceList, validPriceList);

        // Test round trip Firestore → App → Firestore
        testPriceListFirestoreToAppToFirestore(firestorePriceList);

        console.log('\n✅ All PriceList schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ PriceList schema tests failed:', error);
        return false;
    }
};

/**
 * Run all partner tests
 */
export const runAllPartnerTests = () => {
    try {
        console.log('Running Partner Schema Tests:');

        // Validate app schema
        const validPartner = testPartnerAppSchemaValidation();

        // Test app to Firestore conversion
        const firestorePartner = testPartnerToFirestore(validPartner);

        // Test Firestore to app conversion (round trip App → Firestore → App)
        testPartnerFromFirestore(firestorePartner, validPartner);

        // Test round trip Firestore → App → Firestore
        testPartnerFirestoreToAppToFirestore(firestorePartner);

        console.log('\n✅ All Partner schema tests passed successfully!');

        // Run price list tests
        runAllPriceListTests();

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
// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/partner.test.js');
if (isDirectlyExecuted) {
    runAllPartnerTests();
} 