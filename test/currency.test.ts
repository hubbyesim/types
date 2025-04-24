/**
 * Tests for the Currency schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks, setupMocks } from './mocks.js';

// Make sure mocks are properly initialized
setupMocks();

// Now we can import the Currency schemas and functions
import {
    currencyAppSchema,
    currencyToFirestore,
    currencyFromFirestore,
    CurrencyApp,
    CurrencyFirestore
} from '../src/schemas/currency.js';

import * as helpers from '../src/schemas/helpers.js';
import { z } from 'zod';

/**
 * Create a sample currency with comprehensive data for testing
 */
const createSampleCurrency = (): CurrencyApp => ({
    id: 'currency_eur',
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 1.0,
    is_default: true,
    created_at: new Date('2023-05-15'),
    updated_at: new Date('2023-06-01'),
    created_by: 'admin_user',
    updated_by: null
});

/**
 * Test currency app schema validation
 */
export const testCurrencyAppSchemaValidation = () => {
    try {
        const currencyData = createSampleCurrency();
        const validCurrency = currencyAppSchema.parse(currencyData);
        console.log('✅ Currency app schema validation passed');
        return validCurrency;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Currency validation error:', error.errors);
        } else {
            console.error('❌ Currency error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testCurrencyToFirestore = (currencyData: CurrencyApp) => {
    try {
        // Override toFirestore.ref for this test if needed
        const originalRef = helpers.toFirestore.ref;
        
        // Create a mock implementation if needed
        helpers.toFirestore.ref = <T>(collectionPath: string, id: string): any => {
            return new MockDocumentReference(collectionPath, id);
        };
        
        // Now run the conversion
        const firestoreCurrency = currencyToFirestore(currencyData);
        
        // Restore original function
        helpers.toFirestore.ref = originalRef;
        
        // Add validation checks specific to currency
        
        console.log('✅ Currency to Firestore conversion passed');
        return firestoreCurrency;
    } catch (error) {
        console.error('❌ Currency to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testCurrencyFromFirestore = (firestoreCurrency: CurrencyFirestore, originalCurrency: CurrencyApp) => {
    try {
        const retrievedCurrency = currencyFromFirestore(firestoreCurrency);
        
        // Test data integrity for important fields
        console.log('Currency round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Basic fields test
        const basicFieldsTest = 
            originalCurrency.id === retrievedCurrency.id &&
            originalCurrency.code === retrievedCurrency.code &&
            originalCurrency.symbol === retrievedCurrency.symbol &&
            originalCurrency.name === retrievedCurrency.name;
        
        console.log('- Basic fields:', basicFieldsTest ? '✅' : '❌');
        if (!basicFieldsTest) failedTests.push('Basic fields');
        
        // Rate and default flag test
        const rateDefaultTest = 
            originalCurrency.rate === retrievedCurrency.rate &&
            originalCurrency.is_default === retrievedCurrency.is_default;
        
        console.log('- Rate and default flag:', rateDefaultTest ? '✅' : '❌');
        if (!rateDefaultTest) failedTests.push('Rate and default flag');
        
        // Date fields test
        const createdAtMatch = originalCurrency.created_at.getTime() === retrievedCurrency.created_at.getTime();
        const updatedAtMatch = originalCurrency.updated_at.getTime() === retrievedCurrency.updated_at.getTime();
        
        const dateFieldsTest = createdAtMatch && updatedAtMatch;
        
        console.log('- Date fields:', dateFieldsTest ? '✅' : '❌');
        if (!dateFieldsTest) failedTests.push('Date fields');
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedCurrency;
    } catch (error) {
        console.error('❌ Currency from Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Run all Currency tests
 */
export const runAllCurrencyTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running Currency Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testCurrencyAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testCurrencyToFirestore(validData);
        
        // Test conversion back to app
        testCurrencyFromFirestore(firestoreData, validData);
        
        console.log('\n✅ All Currency schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ Currency schema tests failed:', error);
        return false;
    } finally {
        // Clean up mocks
        cleanupMocks();
    }
};

// Run tests directly when this file is executed
// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/currency.test.js');
if (isDirectlyExecuted) {
    runAllCurrencyTests();
} 