/**
 * Tests for the Country schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks';

// Now we can import the Country schemas and functions
import {
    countryAppSchema,
    countryToFirestore,
    countryFromFirestore,
    CountryApp,
    CountryFirestore
} from '../src/schemas/country';

import { z } from 'zod';

/**
 * Create a sample country with comprehensive data for testing
 */
const createSampleCountry = (): CountryApp => ({
    id: 'country_nl',
    bokun_id: 12345,
    LTE: true,
    apn: 'internet',
    click_count: 1250,
    global_network: 'provider_network',
    global_price: 29.99,
    hubby: 1,
    imsi: 204080,
    name: 'Netherlands',
    region: false,
    is_region: false,
    countries: ['Netherlands'],
    tier: 2
});

/**
 * Test country app schema validation
 */
export const testCountryAppSchemaValidation = () => {
    try {
        const countryData = createSampleCountry();
        const validCountry = countryAppSchema.parse(countryData);
        console.log('✅ Country app schema validation passed');
        return validCountry;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Country validation error:', error.errors);
        } else {
            console.error('❌ Country error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 * Note: For Country, this is effectively an identity function
 */
export const testCountryToFirestore = (countryData: CountryApp) => {
    try {
        const firestoreCountry = countryToFirestore(countryData);
        
        // Verify identity transformation
        if (JSON.stringify(countryData) !== JSON.stringify(firestoreCountry)) {
            throw new Error('Country to Firestore conversion failed - not an identity transformation');
        }
        
        console.log('✅ Country to Firestore conversion passed');
        return firestoreCountry;
    } catch (error) {
        console.error('❌ Country to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 * Note: For Country, this is effectively an identity function
 */
export const testCountryFromFirestore = (firestoreCountry: CountryFirestore, originalCountry: CountryApp) => {
    try {
        const retrievedCountry = countryFromFirestore(firestoreCountry);
        
        // Test data integrity for important fields
        console.log('Country round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // All fields test - should be identical
        const allFieldsTest = JSON.stringify(originalCountry) === JSON.stringify(retrievedCountry);
        
        console.log('- All fields:', allFieldsTest ? '✅' : '❌');
        if (!allFieldsTest) failedTests.push('All fields');
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedCountry;
    } catch (error) {
        console.error('❌ Country from Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Run all Country tests
 */
export const runAllCountryTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running Country Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testCountryAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testCountryToFirestore(validData);
        
        // Test conversion back to app
        testCountryFromFirestore(firestoreData, validData);
        
        console.log('\n✅ All Country schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ Country schema tests failed:', error);
        return false;
    }
};

// Run tests directly when this file is executed
if (require.main === module) {
    try {
        runAllCountryTests();
    } finally {
        cleanupMocks();
    }
} 