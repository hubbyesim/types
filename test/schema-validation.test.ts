import { z } from 'zod';
import { createValidator, createConversionValidator } from '../src/schemas/utils/validator.js';
import { 
    currencyAppSchema, 
    currencyFirestoreSchema,
    currencyToFirestore,
    currencyFromFirestore,
    CurrencyApp
} from '../src/schemas/currency.js';

// Create validators
const validateCurrencyApp = createValidator(currencyAppSchema, 'CurrencyApp');
const currencyConverter = createConversionValidator(
    currencyFirestoreSchema,
    currencyAppSchema,
    currencyToFirestore,
    currencyFromFirestore
);

// Test data
const validCurrencyApp: CurrencyApp = {
    id: 'currency_123',
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
    is_default: true,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'system',
    updated_by: 'system'
};

const invalidCurrencyApp = {
    id: 'currency_123',
    // Missing required fields
    code: 'USD',
    // Invalid type for rate
    rate: '1.0', 
    created_at: new Date(),
    updated_at: new Date()
};

/**
 * Simple test function that runs validation tests and logs results
 */
function runTests() {
    console.log('Running schema validation tests...\n');
    
    // Test valid data
    console.log('Testing valid currency data:');
    const validResult = validateCurrencyApp(validCurrencyApp);
    console.log(`Success: ${validResult.success}`);
    if (!validResult.success) {
        console.error(validResult.message);
    }
    console.log('');
    
    // Test invalid data
    console.log('Testing invalid currency data:');
    const invalidResult = validateCurrencyApp(invalidCurrencyApp);
    console.log(`Success: ${invalidResult.success}`);
    if (!invalidResult.success) {
        console.log('Expected validation errors:');
        console.log(invalidResult.message);
    }
    console.log('');
    
    // Test conversions
    console.log('Testing app to firestore conversion:');
    const conversionResult = currencyConverter.validateAppToFirestore(validCurrencyApp);
    console.log(`Success: ${conversionResult.success}`);
    if (conversionResult.success) {
        console.log('Converted data:', conversionResult.data);
    } else {
        console.error('Conversion failed:', conversionResult);
    }
}

// For ESM compatibility, check if this is the main module
// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/schema-validation.test.js');
if (isDirectlyExecuted) {
    runTests();
}

export { runTests }; 