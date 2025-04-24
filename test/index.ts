/**
 * Test runner for all tests
 * 
 * We need to set the test environment flag before any imports
 */

// Enable test environment
import { testEnv } from '../src/schemas/helpers.js';
testEnv.isTestEnvironment = true;

import { runAllPartnerTests } from './partner.test.js';
import { runAllPromoCodeTests } from './promoCode.test.js';
import { runAllPackageTests } from './package.test.js';
import { runAllESIMTests } from './esim.test.js';
import { runAllUserTests } from './user.test.js';
import { runAllBookingTests } from './booking.test.js';
import { runAllCountryTests } from './country.test.js';
import { runAllCurrencyTests } from './currency.test.js';
// Import the schema validation tests
import { runTests as runSchemaValidationTests } from './schema-validation.test.js';
// Import additional test runners as they're created
// import { runAllApiLogsTests } from './apiLogs.test.js';
// import { runAllPaymentTests } from './payment.test.js';
// import { runAllMessageTests } from './message.test.js';
// import { runAllApiTests } from './api.test.js';

console.log('===================================================');
console.log('Running all tests for @hubbyesim/types');
console.log('===================================================');

let failed = false;

// Run schema validation tests
try {
    console.log('\n----------------------------------------');
    console.log('Running Schema Validation Tests:');
    console.log('----------------------------------------');
    runSchemaValidationTests();
} catch (error) {
    console.error('Schema validation tests failed with uncaught error:', error);
    failed = true;
}

// Run partner tests
try {
    const partnerResult = runAllPartnerTests();
    if (partnerResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('Partner tests failed with uncaught error:', error);
    failed = true;
}

// Run promoCode tests
try {
    const promoCodeResult = runAllPromoCodeTests();
    if (promoCodeResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('PromoCode tests failed with uncaught error:', error);
    failed = true;
}

// Run user tests
try {
    runAllUserTests();
    // Note: User tests return void, so we don't check the result
} catch (error) {
    console.error('User tests failed with uncaught error:', error);
    failed = true;
}

// Run booking tests
try {
    const bookingResult = runAllBookingTests();
    if (bookingResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('Booking tests failed with uncaught error:', error);
    failed = true;
}

// Run package tests
try {
    const packageResult = runAllPackageTests();
    if (packageResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('Package tests failed with uncaught error:', error);
    failed = true;
}

// Run ESIM tests
try {
    const esimResult = runAllESIMTests();
    if (esimResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('ESIM tests failed with uncaught error:', error);
    failed = true;
}

// Run Country tests
try {
    const countryResult = runAllCountryTests();
    if (countryResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('Country tests failed with uncaught error:', error);
    failed = true;
}

// Run Currency tests
try {
    const currencyResult = runAllCurrencyTests();
    if (currencyResult === false) {
        failed = true;
    }
} catch (error) {
    console.error('Currency tests failed with uncaught error:', error);
    failed = true;
}

// Add other test modules here as they're implemented

console.log('\n===================================================');
if (failed) {
    console.error('❌ Tests completed with failures');
    process.exit(1);
} else {
    console.log('✅ All tests passed successfully');
    process.exit(0);
} 