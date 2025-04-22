/**
 * Tests for the ESIM schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks';

// Now we can import the ESIM schemas and functions
import {
    esimAppSchema,
    esimToFirestore,
    esimFromFirestore,
    ESIMApp,
    ESIMFirestore
} from '../src/schemas/esim';

// Import collection paths from the correct source
import {
    COUNTRY_COLLECTION,
    USER_COLLECTION,
    PARTNER_COLLECTION,
    PAYMENT_COLLECTION
} from '../src/schemas/utils/collections';

import { z } from 'zod';

/**
 * Create a sample ESIM with comprehensive data for testing
 */
const createSampleESIM = (): ESIMApp => ({
    id: 'esim_123',
    iccid: '8900112233445566778',
    qr: 'data:image/png;base64,SAMPLE_QR_CODE',
    imsi: 123456789012345,
    provider: 'sample-provider',
    coverage_label: 'Global Coverage',
    total_data: 1073741824, // 1GB
    data_left: 1073741824,
    data_used: false,
    status: 'AVAILABLE',
    name: 'Global 1GB eSIM',
    android_auto: true,
    partner_price: 7.99,
    promo: 'FIRST_ORDER',
    type: 'payment',
    is_auto_install: true,
    is_archived: false,
    apn: 'internet',
    time_assigned: new Date('2023-10-01'),
    last_updated: new Date('2023-10-02'),
    country: 'country_123',
    user: 'user_123',
    partner: 'partner_123',
    payment: 'payment_123',
    created_at: new Date('2023-10-01'),
    updated_at: new Date('2023-10-01'),
    created_by: 'admin_123',
    updated_by: null
});

/**
 * Test ESIM app schema validation
 */
export const testESIMAppSchemaValidation = () => {
    try {
        const esimData = createSampleESIM();
        const validESIM = esimAppSchema.parse(esimData);
        console.log('✅ ESIM app schema validation passed');
        return validESIM;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ ESIM validation error:', error.errors);
        } else {
            console.error('❌ ESIM error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testESIMToFirestore = (esimData: ESIMApp) => {
    try {
        // Now run the conversion
        const firestoreESIM = esimToFirestore(esimData);
        
        // Verify document references work with our mocks
        
        // Country reference
        if (esimData.country && firestoreESIM.country) {
            if (!firestoreESIM.country.path.startsWith(COUNTRY_COLLECTION)) {
                throw new Error('Country document reference is invalid');
            }
        }
        
        // User reference
        if (esimData.user && firestoreESIM.user) {
            if (!firestoreESIM.user.path.startsWith(USER_COLLECTION)) {
                throw new Error('User document reference is invalid');
            }
        }
        
        // Partner reference
        if (esimData.partner && firestoreESIM.partner) {
            if (!firestoreESIM.partner.path.startsWith(PARTNER_COLLECTION)) {
                throw new Error('Partner document reference is invalid');
            }
        }
        
        // Payment reference
        if (esimData.payment && firestoreESIM.payment) {
            if (!firestoreESIM.payment.path.startsWith(PAYMENT_COLLECTION)) {
                throw new Error('Payment document reference is invalid');
            }
        }
        
        console.log('✅ ESIM to Firestore conversion passed');
        return firestoreESIM;
    } catch (error) {
        console.error('❌ ESIM to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testESIMFromFirestore = (firestoreESIM: ESIMFirestore, originalESIM: ESIMApp) => {
    try {
        // Now run the conversion
        const retrievedESIM = esimFromFirestore(firestoreESIM);
        
        // Test data integrity for important fields
        console.log('ESIM round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Basic fields test
        const basicFieldsTest = 
            originalESIM.id === retrievedESIM.id &&
            originalESIM.iccid === retrievedESIM.iccid &&
            originalESIM.imsi === retrievedESIM.imsi &&
            originalESIM.qr === retrievedESIM.qr &&
            originalESIM.name === retrievedESIM.name;
        
        console.log('- Basic fields:', basicFieldsTest ? '✅' : '❌');
        if (!basicFieldsTest) failedTests.push('Basic fields');
        
        // Numeric fields test
        const numericFieldsTest = 
            originalESIM.total_data === retrievedESIM.total_data &&
            originalESIM.data_left === retrievedESIM.data_left &&
            originalESIM.partner_price === retrievedESIM.partner_price;
            
        console.log('- Numeric fields:', numericFieldsTest ? '✅' : '❌');
        if (!numericFieldsTest) failedTests.push('Numeric fields');
        
        // Boolean fields test
        const booleanFieldsTest = 
            originalESIM.data_used === retrievedESIM.data_used &&
            originalESIM.android_auto === retrievedESIM.android_auto &&
            originalESIM.is_auto_install === retrievedESIM.is_auto_install &&
            originalESIM.is_archived === retrievedESIM.is_archived;
            
        console.log('- Boolean fields:', booleanFieldsTest ? '✅' : '❌');
        if (!booleanFieldsTest) failedTests.push('Boolean fields');
        
        // Date fields test - first ensure they're Date objects
        let timeAssignedMatch = true;
        if (originalESIM.time_assigned === null && retrievedESIM.time_assigned === null) {
            timeAssignedMatch = true;
        } else if (originalESIM.time_assigned instanceof Date && retrievedESIM.time_assigned instanceof Date) {
            timeAssignedMatch = originalESIM.time_assigned.getTime() === retrievedESIM.time_assigned.getTime();
        } else {
            timeAssignedMatch = false;
        }
        
        let lastUpdatedMatch = true;
        if (originalESIM.last_updated === null && retrievedESIM.last_updated === null) {
            lastUpdatedMatch = true;
        } else if (originalESIM.last_updated instanceof Date && retrievedESIM.last_updated instanceof Date) {
            lastUpdatedMatch = originalESIM.last_updated.getTime() === retrievedESIM.last_updated.getTime();
        } else {
            lastUpdatedMatch = false;
        }
        
        const createdAtMatch = 
            originalESIM.created_at instanceof Date && 
            retrievedESIM.created_at instanceof Date && 
            originalESIM.created_at.getTime() === retrievedESIM.created_at.getTime();
            
        const updatedAtMatch = 
            originalESIM.updated_at instanceof Date && 
            retrievedESIM.updated_at instanceof Date && 
            originalESIM.updated_at.getTime() === retrievedESIM.updated_at.getTime();
        
        const dateFieldsTest = timeAssignedMatch && lastUpdatedMatch && createdAtMatch && updatedAtMatch;
        
        console.log('- Date fields:', dateFieldsTest ? '✅' : '❌');
        if (!dateFieldsTest) {
            console.log('  - time_assigned:', timeAssignedMatch ? '✅' : '❌', typeof retrievedESIM.time_assigned);
            console.log('  - last_updated:', lastUpdatedMatch ? '✅' : '❌', typeof retrievedESIM.last_updated);
            console.log('  - created_at:', createdAtMatch ? '✅' : '❌', typeof retrievedESIM.created_at);
            console.log('  - updated_at:', updatedAtMatch ? '✅' : '❌', typeof retrievedESIM.updated_at);
            failedTests.push('Date fields');
        }
        
        // Reference fields test
        const countryMatch = originalESIM.country === retrievedESIM.country;
        const userMatch = originalESIM.user === retrievedESIM.user;
        const partnerMatch = originalESIM.partner === retrievedESIM.partner;
        const paymentMatch = originalESIM.payment === retrievedESIM.payment;
        
        const referenceFieldsTest = countryMatch && userMatch && partnerMatch && paymentMatch;
            
        console.log('- Reference fields:', referenceFieldsTest ? '✅' : '❌');
        if (!referenceFieldsTest) {
            console.log('  - country:', countryMatch ? '✅' : '❌', 'Original:', originalESIM.country, 'Retrieved:', retrievedESIM.country);
            console.log('  - user:', userMatch ? '✅' : '❌', 'Original:', originalESIM.user, 'Retrieved:', retrievedESIM.user);
            console.log('  - partner:', partnerMatch ? '✅' : '❌', 'Original:', originalESIM.partner, 'Retrieved:', retrievedESIM.partner);
            console.log('  - payment:', paymentMatch ? '✅' : '❌', 'Original:', originalESIM.payment, 'Retrieved:', retrievedESIM.payment);
            failedTests.push('Reference fields');
        }
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedESIM;
    } catch (error) {
        console.error('❌ ESIM from Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Run all ESIM tests
 */
export const runAllESIMTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running ESIM Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testESIMAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testESIMToFirestore(validData);
        
        // Test conversion back to app
        testESIMFromFirestore(firestoreData, validData);
        
        console.log('\n✅ All ESIM schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ ESIM schema tests failed:', error);
        return false;
    }
};

// Run tests directly when this file is executed
if (require.main === module) {
    try {
        runAllESIMTests();
    } finally {
        cleanupMocks();
    }
} 