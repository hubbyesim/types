/**
 * Tests for the Booking schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks, setupMocks } from './mocks.js';

// Make sure mocks are properly initialized
setupMocks();

// Import collection constants from the centralized refs
import {
    PARTNER_COLLECTION,
    PROMO_CODE_COLLECTION,
    USER_COLLECTION,
    ESIM_COLLECTION
} from '../src/schemas/refs.js';

// Now we can import the Booking schemas and functions
import {
    bookingAppSchema,
    bookingToFirestore,
    bookingFromFirestore,
    BookingApp,
    BookingFirestore,
    BookingStatus,
    CommunicationChannel
} from '../src/schemas/booking.js';

import { SupportedLocales } from '../src/constants.js';
import { z } from 'zod';

/**
 * Create a sample booking with comprehensive data for testing
 */
const createSampleBooking = (): BookingApp => ({
    id: 'booking123',
    title: 'Mr',
    first_name: 'John',
    last_name: 'Doe',
    full_name: 'John Doe',
    pax: 2,
    email: 'john.doe@example.com',
    phone: '+1234567890',
    booking_id: 'BOOK123',
    flight_number: 'FL456',
    gender: 'M',
    package_size: 'Large',
    sent_messages: {},
    locale: 'en-US' as SupportedLocales,
    status: 'CONFIRMED',
    data: {
        source: 'website',
        manual: false
    },
    communication_options: {
        should_send_message: true,
        channels: ['EMAIL', 'WHATSAPP']
    },
    is_processed_for_esim_restoration: false,
    is_pseudonymized: false,
    import_id: 'imp123',
    package_specifications: { data_limit: '5GB' },
    return_date: new Date('2023-12-31'),
    departure_date: new Date('2023-12-15'),
    partner: 'partner123',
    promo_codes: ['promo123', 'promo456'],
    users: ['user123'],
    esims: ['esim123', 'esim456'],
    created_at: new Date('2023-12-01'),
    updated_at: new Date('2023-12-05'),
    created_by: 'admin123',
    updated_by: 'admin456'
});

/**
 * Test booking app schema validation
 */
export const testBookingAppSchemaValidation = () => {
    try {
        const bookingData = createSampleBooking();
        const validBooking = bookingAppSchema.parse(bookingData);
        console.log('✅ Booking app schema validation passed');
        return validBooking;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Booking validation error:', error.errors);
        } else {
            console.error('❌ Booking error:', error);
        }
        throw error;
    }
};

/**
 * Test conversion from app schema to Firestore schema
 */
export const testBookingToFirestore = (bookingData: BookingApp) => {
    try {
        // Now run the conversion
        const firestoreBooking = bookingToFirestore(bookingData);
        
        // Verify document references work with our mocks
        // Partner reference
        if (bookingData.partner && firestoreBooking.partner) {
            if (!firestoreBooking.partner.path.startsWith(PARTNER_COLLECTION)) {
                throw new Error('Partner document reference is invalid');
            }
        }
        
        // Check promo codes array references
        if (bookingData.promo_codes && firestoreBooking.promo_codes) {
            const allPromoRefsValid = firestoreBooking.promo_codes.every(ref => {
                return ref.path.startsWith(PROMO_CODE_COLLECTION);
            });
            if (!allPromoRefsValid) {
                throw new Error('Promo code document references are invalid');
            }
        }
        
        // Check users array references
        if (bookingData.users && firestoreBooking.users) {
            const allUserRefsValid = firestoreBooking.users.every(ref => {
                return ref.path.startsWith(USER_COLLECTION);
            });
            if (!allUserRefsValid) {
                throw new Error('User document references are invalid');
            }
        }
        
        // Check esims array references
        if (bookingData.esims && firestoreBooking.esims) {
            const allEsimRefsValid = firestoreBooking.esims.every(ref => {
                return ref.path.startsWith(ESIM_COLLECTION);
            });
            if (!allEsimRefsValid) {
                throw new Error('Esim document references are invalid');
            }
        }
        
        console.log('✅ Booking to Firestore conversion passed');
        return firestoreBooking;
    } catch (error) {
        console.error('❌ Booking to Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Test conversion from Firestore schema back to app schema
 */
export const testBookingFromFirestore = (firestoreBooking: BookingFirestore, originalBooking: BookingApp) => {
    try {
        // Now run the conversion
        const retrievedBooking = bookingFromFirestore(firestoreBooking);
        
        // Test data integrity for important fields
        console.log('Booking round trip data integrity check:');
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Basic fields test
        const basicFieldsTest = 
            originalBooking.id === retrievedBooking.id &&
            originalBooking.first_name === retrievedBooking.first_name &&
            originalBooking.last_name === retrievedBooking.last_name &&
            originalBooking.full_name === retrievedBooking.full_name &&
            originalBooking.title === retrievedBooking.title;
        
        console.log('- Basic fields:', basicFieldsTest ? '✅' : '❌');
        if (!basicFieldsTest) failedTests.push('Basic fields');
        
        // Reference fields test
        const partnerMatch = originalBooking.partner === retrievedBooking.partner;
        
        // Check promo_codes arrays
        let promoCodesMatch = true;
        if (originalBooking.promo_codes && retrievedBooking.promo_codes) {
            promoCodesMatch = 
                originalBooking.promo_codes.length === retrievedBooking.promo_codes.length &&
                originalBooking.promo_codes.every((id, index) => id === retrievedBooking.promo_codes?.[index]);
        } else if (originalBooking.promo_codes !== retrievedBooking.promo_codes) {
            promoCodesMatch = false;
        }
        
        // Check users arrays
        let usersMatch = true;
        if (originalBooking.users && retrievedBooking.users) {
            usersMatch = 
                originalBooking.users.length === retrievedBooking.users.length &&
                originalBooking.users.every((id, index) => id === retrievedBooking.users?.[index]);
        } else if (originalBooking.users !== retrievedBooking.users) {
            usersMatch = false;
        }
        
        // Check esims arrays
        let esimsMatch = true;
        if (originalBooking.esims && retrievedBooking.esims) {
            esimsMatch = 
                originalBooking.esims.length === retrievedBooking.esims.length &&
                originalBooking.esims.every((id, index) => id === retrievedBooking.esims?.[index]);
        } else if (originalBooking.esims !== retrievedBooking.esims) {
            esimsMatch = false;
        }
        
        const referenceFieldsTest = partnerMatch && promoCodesMatch && usersMatch && esimsMatch;
                
        console.log('- Reference fields:', referenceFieldsTest ? '✅' : '❌');
        if (!referenceFieldsTest) {
            console.log('  - partner:', partnerMatch ? '✅' : '❌', 'Original:', originalBooking.partner, 'Retrieved:', retrievedBooking.partner);
            console.log('  - promo_codes:', promoCodesMatch ? '✅' : '❌');
            console.log('  - users:', usersMatch ? '✅' : '❌');
            console.log('  - esims:', esimsMatch ? '✅' : '❌');
            failedTests.push('Reference fields');
        }
        
        // Date fields test - first ensure they're Date objects
        const departureDateMatch = 
            originalBooking.departure_date instanceof Date && 
            retrievedBooking.departure_date instanceof Date && 
            originalBooking.departure_date.getTime() === retrievedBooking.departure_date.getTime();
            
        let returnDateMatch = true;
        if (originalBooking.return_date === null && retrievedBooking.return_date === null) {
            returnDateMatch = true;
        } else if (originalBooking.return_date instanceof Date && retrievedBooking.return_date instanceof Date) {
            returnDateMatch = originalBooking.return_date.getTime() === retrievedBooking.return_date.getTime();
        } else {
            returnDateMatch = false;
        }
        
        const createdAtMatch = 
            originalBooking.created_at instanceof Date && 
            retrievedBooking.created_at instanceof Date && 
            originalBooking.created_at.getTime() === retrievedBooking.created_at.getTime();
            
        const updatedAtMatch = 
            originalBooking.updated_at instanceof Date && 
            retrievedBooking.updated_at instanceof Date && 
            originalBooking.updated_at.getTime() === retrievedBooking.updated_at.getTime();
        
        const dateFieldsTest = departureDateMatch && returnDateMatch && createdAtMatch && updatedAtMatch;
        
        console.log('- Date fields:', dateFieldsTest ? '✅' : '❌');
        if (!dateFieldsTest) {
            console.log('  - departure_date:', departureDateMatch ? '✅' : '❌', typeof retrievedBooking.departure_date);
            console.log('  - return_date:', returnDateMatch ? '✅' : '❌', typeof retrievedBooking.return_date);
            console.log('  - created_at:', createdAtMatch ? '✅' : '❌', typeof retrievedBooking.created_at);
            console.log('  - updated_at:', updatedAtMatch ? '✅' : '❌', typeof retrievedBooking.updated_at);
            failedTests.push('Date fields');
        }
        
        // Metadata fields test
        const metadataFieldsTest = 
            originalBooking.booking_id === retrievedBooking.booking_id &&
            originalBooking.email === retrievedBooking.email &&
            originalBooking.phone === retrievedBooking.phone &&
            originalBooking.status === retrievedBooking.status;
            
        console.log('- Metadata fields:', metadataFieldsTest ? '✅' : '❌');
        if (!metadataFieldsTest) failedTests.push('Metadata fields');
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedBooking;
    } catch (error) {
        console.error('❌ Booking from Firestore conversion failed:', error);
        throw error;
    }
};

/**
 * Run all Booking tests
 */
export const runAllBookingTests = () => {
    console.log('\n----------------------------------------');
    console.log('Running Booking Schema Tests:');
    console.log('----------------------------------------');
    
    try {
        // Test schema validation
        const validData = testBookingAppSchemaValidation();
        
        // Test conversion to Firestore
        const firestoreData = testBookingToFirestore(validData);
        
        // Test conversion back to app
        testBookingFromFirestore(firestoreData, validData);
        
        console.log('\n✅ All Booking schema tests passed successfully!');
        return true;
    } catch (error) {
        console.error('\n❌ Booking schema tests failed:', error);
        return false;
    }
};

// Run tests directly when this file is executed
// In ESM, there's no direct replacement for require.main === module
// We can check if the current file's URL ends with this file's name
const isDirectlyExecuted = import.meta.url.endsWith('/booking.test.js');
if (isDirectlyExecuted) {
    try {
        runAllBookingTests();
    } finally {
        cleanupMocks();
    }
} 