/**
 * Tests for the Package schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks, setupMocks } from './mocks.js';

// Make sure mocks are properly initialized
setupMocks();

// Import collection paths from the centralized refs file
import {
    COUNTRY_COLLECTION,
    PARTNER_COLLECTION
} from '../src/schemas/refs.js';

// Now we can import the Package schemas and functions
import {
    packageAppSchema,
    packageToFirestore,
    packageFromFirestore,
    PackageApp,
    PackageFirestore
} from '../src/schemas/package.js';

import { z } from 'zod';

/**
 * Create a sample package with comprehensive data for testing
 */
const createSamplePackage = (): PackageApp => ({
    id: 'package123',
    external_id: 'ext_package_123',
    provider: 'test-provider',
    coverage_label: null,
    label: 'SAMPLE',
    type: 'data-limited',
    bytes: 5368709120, // 5GB
    price: 19.99,
    partner_price: 15.99,
    days: 30,
    priority: 1,
    throttling: 1024,
    name: 'Sample Package',
    country_data: null,
    provider_parameters: {
        imsi: 123456789
    },
    hidden: false,
    is_hidden: false,
    is_active: true,
    country: 'country123',
    partner: 'partner123',
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-15'),
    created_by: 'admin123',
    updated_by: 'admin456'
});

/**
 * Test package app schema validation
 */
export const testPackageAppSchemaValidation = () => {
    try {
        const packageData = createSamplePackage();
        const validPackage = packageAppSchema.parse(packageData);
        console.log('✅ Package app schema validation passed');
        return validPackage;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Package validation error:', error.errors);
        } else {
            console.error('❌ Package error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testPackageToFirestore = (packageData: PackageApp) => {
    try {
        // Now run the conversion
        const firestorePackage = packageToFirestore(packageData);
        
        // Verify document references work with our mocks
        // Country reference
        if (packageData.country && firestorePackage.country) {
            if (!firestorePackage.country.path.startsWith(COUNTRY_COLLECTION)) {
                throw new Error('Country document reference is invalid');
            }
        }
        
        // Partner reference
        if (packageData.partner && firestorePackage.partner) {
            if (!firestorePackage.partner.path.startsWith(PARTNER_COLLECTION)) {
                throw new Error('Partner document reference is invalid');
            }
        }
        
        console.log('✅ Package to Firestore conversion passed');
        return firestorePackage;
    } catch (error) {
        console.error('❌ Package to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testPackageFromFirestore = (firestorePackage: PackageFirestore, originalPackage: PackageApp) => {
    try {
        // Now run the conversion
        const retrievedPackage = packageFromFirestore(firestorePackage);
        
        // Test data integrity for important fields
        console.log('Package round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Basic fields test
        const basicFieldsTest = 
            originalPackage.id === retrievedPackage.id &&
            originalPackage.name === retrievedPackage.name &&
            originalPackage.label === retrievedPackage.label &&
            originalPackage.type === retrievedPackage.type;
        
        console.log('- Basic fields:', basicFieldsTest ? '✅' : '❌');
        if (!basicFieldsTest) failedTests.push('Basic fields');
        
        // Numeric fields test
        const numericFieldsTest = 
            originalPackage.bytes === retrievedPackage.bytes &&
            originalPackage.price === retrievedPackage.price &&
            originalPackage.partner_price === retrievedPackage.partner_price &&
            originalPackage.days === retrievedPackage.days &&
            originalPackage.priority === retrievedPackage.priority &&
            originalPackage.throttling === retrievedPackage.throttling;
            
        console.log('- Numeric fields:', numericFieldsTest ? '✅' : '❌');
        if (!numericFieldsTest) failedTests.push('Numeric fields');
        
        // Boolean fields test
        const booleanFieldsTest = 
            originalPackage.hidden === retrievedPackage.hidden &&
            originalPackage.is_hidden === retrievedPackage.is_hidden &&
            originalPackage.is_active === retrievedPackage.is_active;
            
        console.log('- Boolean fields:', booleanFieldsTest ? '✅' : '❌');
        if (!booleanFieldsTest) failedTests.push('Boolean fields');
        
        // Date fields test - first ensure they're Date objects
        const createdAtMatch = 
            originalPackage.created_at instanceof Date && 
            retrievedPackage.created_at instanceof Date && 
            originalPackage.created_at.getTime() === retrievedPackage.created_at.getTime();
            
        const updatedAtMatch = 
            originalPackage.updated_at instanceof Date && 
            retrievedPackage.updated_at instanceof Date && 
            originalPackage.updated_at.getTime() === retrievedPackage.updated_at.getTime();
        
        const dateFieldsTest = createdAtMatch && updatedAtMatch;
        
        console.log('- Date fields:', dateFieldsTest ? '✅' : '❌');
        if (!dateFieldsTest) {
            console.log('  - created_at:', createdAtMatch ? '✅' : '❌', typeof retrievedPackage.created_at);
            console.log('  - updated_at:', updatedAtMatch ? '✅' : '❌', typeof retrievedPackage.updated_at);
            failedTests.push('Date fields');
        }
        
        // Reference fields test
        const countryMatch = originalPackage.country === retrievedPackage.country;
        const partnerMatch = originalPackage.partner === retrievedPackage.partner;
        
        const referenceFieldsTest = countryMatch && partnerMatch;
        
        console.log('- Reference fields:', referenceFieldsTest ? '✅' : '❌');
        if (!referenceFieldsTest) {
            console.log('  - country:', countryMatch ? '✅' : '❌', 'Original:', originalPackage.country, 'Retrieved:', retrievedPackage.country);
            console.log('  - partner:', partnerMatch ? '✅' : '❌', 'Original:', originalPackage.partner, 'Retrieved:', retrievedPackage.partner);
            failedTests.push('Reference fields');
        }
        
        // Provider parameters test
        const providerParamsTest = 
            originalPackage.provider_parameters?.imsi === retrievedPackage.provider_parameters?.imsi;
        
        console.log('- Provider parameters:', providerParamsTest ? '✅' : '❌');
        if (!providerParamsTest) failedTests.push('Provider parameters');
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedPackage;
    } catch (error) {
        console.error('❌ Package from Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Run all Package tests
 */
export const runAllPackageTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running Package Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testPackageAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testPackageToFirestore(validData);
        
        // Test conversion back to app
        testPackageFromFirestore(firestoreData, validData);
        
        console.log('\n✅ All Package schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ Package schema tests failed:', error);
        return false;
    }
};

// Run tests directly when this file is executed
// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/package.test.js');
if (isDirectlyExecuted) {
    try {
        runAllPackageTests();
    } finally {
        cleanupMocks();
    }
} 