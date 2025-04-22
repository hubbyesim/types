/**
 * Firebase mocks for testing
 */

// Import the helpers module
const helpers = require('../src/schemas/helpers');

// Export the mock reference from helpers for convenience
export const { MockDocumentReference } = helpers;

// Mock Timestamp
export class MockTimestamp {
    seconds: number;
    nanoseconds: number;
    
    constructor(date: Date) {
        this.seconds = Math.floor(date.getTime() / 1000);
        this.nanoseconds = (date.getTime() % 1000) * 1000000;
    }
    
    toDate(): Date {
        return new Date(this.seconds * 1000 + this.nanoseconds / 1000000);
    }
    
    static fromDate(date: Date): MockTimestamp {
        return new MockTimestamp(date);
    }
}

// Mock FieldValue
export class MockFieldValue {
    static serverTimestamp() {
        return new MockTimestamp(new Date());
    }
    
    static delete() {
        return null;
    }
    
    isEqual(other: any) {
        return this === other;
    }
}

// Store the original function implementations
export const originalFunctions = {
    toFirestoreDate: null as any,
    fromFirestoreDate: null as any
};

// Setup the mocks
export const setupMocks = () => {
    // Enable test environment
    helpers.isTestEnvironment = true;
    
    // Store original functions for cleanup
    originalFunctions.toFirestoreDate = helpers.toFirestore.date;
    originalFunctions.fromFirestoreDate = helpers.fromFirestore.date;
    
    // Override date functions
    helpers.toFirestore.date = (date: Date): any => {
        return MockTimestamp.fromDate(date);
    };
    
    helpers.fromFirestore.date = (timestamp: any): Date => {
        if (timestamp instanceof MockTimestamp) {
            return timestamp.toDate();
        }
        if (timestamp && typeof timestamp.toDate === 'function') {
            return timestamp.toDate();
        }
        return new Date(timestamp);
    };
};

// Initialize mocks
setupMocks();

// Cleanup function to restore original functions
export const cleanupMocks = () => {
    // Disable test environment
    helpers.isTestEnvironment = false;
    
    // Restore date functions
    helpers.toFirestore.date = originalFunctions.toFirestoreDate;
    helpers.fromFirestore.date = originalFunctions.fromFirestoreDate;
}; 