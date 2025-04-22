/**
 * Tests for the User schema
 * Uses mocks to avoid requiring a real Firestore instance
 */

// First, import and setup mocks (MUST happen before importing any schemas)
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks';

// Check if test environment flag is set
console.log('isTestEnvironment flag in user.test.ts:', require('../src/schemas/helpers').isTestEnvironment);

// Patch the ref method directly
const helpers = require('../src/schemas/helpers');
const originalToRefMethod = helpers.toFirestore.ref;
helpers.toFirestore.ref = (collectionPath: string, id: string): any => {
    return new MockDocumentReference(collectionPath, id);
};

const originalFromRefMethod = helpers.fromFirestore.ref;
helpers.fromFirestore.ref = (docRef: any): string => {
    if (docRef instanceof MockDocumentReference) {
        return docRef.id;
    }
    // For other types of references, extract ID
    return docRef?.id || null;
};

// For timestamps
const originalToDateMethod = helpers.toFirestore.date;
helpers.toFirestore.date = (date: Date): any => {
    return MockTimestamp.fromDate(date);
};

const originalFromDateMethod = helpers.fromFirestore.date;
helpers.fromFirestore.date = (timestamp: any): Date => {
    if (timestamp instanceof MockTimestamp) {
        return timestamp.toDate();
    }
    if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate();
    }
    return new Date(timestamp);
};

import { runSchemaTests } from './schema-test-template';

// Now we can import the User schemas and functions
import {
    userAppSchema,
    userToFirestore,
    userFromFirestore,
    UserApp,
    UserFirestore
} from '../src/schemas/user';

// Import collection paths from the correct source
import {
    PROFILE_COLLECTION,
    PARTNER_COLLECTION
} from '../src/schemas/utils/collections';

/**
 * Create a sample user with comprehensive data for testing
 */
const createSampleUser = (): UserApp => ({
    id: 'user_123',
    name: 'John Doe',
    email: 'john@example.com',
    stripe_id: 'cus_123456',
    referral: 'REF123',
    fcm: 'fcm_token_123',
    deeplink: 'app://user/123',
    gender: 'M',
    company: 'Acme Inc',
    coordinates: '52.3667,4.8945',
    parameters: { preferences: { darkMode: true } },
    locale: 'en-US',
    phone_model: 'iPhone 13',
    phone_os: 'iOS',
    phone_os_version: '15.0',
    ios: true,
    has_card_saved: true,
    admin: false,
    
    // Note: For testing, we need to handle the complex API keys structure separately
    // in the conversion functions rather than in the sample data
    api_keys: null,
    
    currency: 'EUR',
    receipt_email: 'receipts@example.com',
    createdAt: new Date('2023-01-01'),
    partner: 'partner_123',
    profileRef: 'profile_123',
    balance: 100.50,
    review_requested: new Date('2023-06-01'),
    last_seen: new Date('2023-07-15'),
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-08-01'),
    created_by: 'admin_user',
    updated_by: null
});

/**
 * Run all User schema tests
 */
export const runAllUserTests = () => {
    return runSchemaTests({
        schemaName: 'User',
        createSampleData: createSampleUser,
        appSchema: userAppSchema,
        toFirestore: userToFirestore,
        fromFirestore: userFromFirestore,
        referenceValidators: [
            {
                getValue: (data: UserFirestore) => data.profileRef,
                expectedPathPrefix: PROFILE_COLLECTION,
                description: 'ProfileRef'
            },
            {
                getValue: (data: UserFirestore) => data.partner,
                expectedPathPrefix: PARTNER_COLLECTION,
                description: 'Partner'
            }
        ],
        integrityChecks: [
            {
                name: 'Basic fields',
                check: (original, retrieved) => 
                    original.id === retrieved.id &&
                    original.name === retrieved.name &&
                    original.email === retrieved.email &&
                    original.admin === retrieved.admin
            },
            {
                name: 'Reference fields',
                check: (original, retrieved) => {
                    const partnerMatch = original.partner === retrieved.partner;
                    const profileRefMatch = original.profileRef === retrieved.profileRef;
                    
                    if (!partnerMatch || !profileRefMatch) {
                        console.log('  - partner:', partnerMatch ? '✅' : '❌', 'Original:', original.partner, 'Retrieved:', retrieved.partner);
                        console.log('  - profileRef:', profileRefMatch ? '✅' : '❌', 'Original:', original.profileRef, 'Retrieved:', retrieved.profileRef);
                    }
                    
                    return partnerMatch && profileRefMatch;
                }
            },
            {
                name: 'Date fields',
                check: (original, retrieved) => {
                    // CreatedAt check
                    const createdAtMatch = 
                        original.createdAt instanceof Date && 
                        retrieved.createdAt instanceof Date &&
                        original.createdAt.getTime() === retrieved.createdAt.getTime();
                    
                    // Review requested check (can be null/undefined)
                    let reviewRequestedMatch = true;
                    if (original.review_requested === null && retrieved.review_requested === null) {
                        reviewRequestedMatch = true;
                    } else if (original.review_requested instanceof Date && retrieved.review_requested instanceof Date) {
                        reviewRequestedMatch = original.review_requested.getTime() === retrieved.review_requested.getTime();
                    } else {
                        reviewRequestedMatch = false;
                    }
                    
                    // Last seen check (can be null/undefined)
                    let lastSeenMatch = true;
                    if (original.last_seen === null && retrieved.last_seen === null) {
                        lastSeenMatch = true;
                    } else if (original.last_seen instanceof Date && retrieved.last_seen instanceof Date) {
                        lastSeenMatch = original.last_seen.getTime() === retrieved.last_seen.getTime();
                    } else {
                        lastSeenMatch = false;
                    }
                    
                    // HubbyModel date fields
                    const createdAt2Match = 
                        original.created_at instanceof Date && 
                        retrieved.created_at instanceof Date &&
                        original.created_at.getTime() === retrieved.created_at.getTime();
                        
                    const updatedAtMatch = 
                        original.updated_at instanceof Date && 
                        retrieved.updated_at instanceof Date &&
                        original.updated_at.getTime() === retrieved.updated_at.getTime();
                        
                    // Log details if there's a failure
                    if (!createdAtMatch || !reviewRequestedMatch || !lastSeenMatch || !createdAt2Match || !updatedAtMatch) {
                        console.log('  - createdAt:', createdAtMatch ? '✅' : '❌', typeof retrieved.createdAt);
                        console.log('  - review_requested:', reviewRequestedMatch ? '✅' : '❌', typeof retrieved.review_requested);
                        console.log('  - last_seen:', lastSeenMatch ? '✅' : '❌', typeof retrieved.last_seen);
                        console.log('  - created_at:', createdAt2Match ? '✅' : '❌', typeof retrieved.created_at);
                        console.log('  - updated_at:', updatedAtMatch ? '✅' : '❌', typeof retrieved.updated_at);
                    }
                        
                    return createdAtMatch && reviewRequestedMatch && lastSeenMatch && createdAt2Match && updatedAtMatch;
                }
            },
            {
                name: 'Numeric fields',
                check: (original, retrieved) => 
                    original.balance === retrieved.balance
            }
        ]
    });
};

// Run tests directly when this file is executed
if (require.main === module) {
    try {
        runAllUserTests();
    } finally {
        cleanupMocks();
    }
} 