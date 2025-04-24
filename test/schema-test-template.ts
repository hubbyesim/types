/**
 * Generic schema test template
 * 
 * This file provides a template for testing Zod schema validation and Firebase-App conversion
 */
import { z } from 'zod';
import { MockDocumentReference, MockTimestamp, cleanupMocks } from './mocks.js';

/**
 * Generic test for schema validation
 */
export function testSchemaValidation<T>(
    schemaName: string,
    schema: z.ZodType<T>,
    sampleData: T
): T | null {
    try {
        const validData = schema.parse(sampleData);
        console.log(`✅ ${schemaName} schema validation passed`);
        return validData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(`❌ ${schemaName} validation error:`, error.errors);
        } else {
            console.error(`❌ ${schemaName} error:`, error);
        }
        throw error;
    }
}

/**
 * Generic test for conversion to Firestore
 */
export function testToFirestore<T, F>(
    schemaName: string,
    toFirestoreFunction: (data: T) => F,
    sampleData: T,
    referenceValidators: Array<{
        getValue: (data: F) => any;
        expectedPathPrefix: string;
        description: string;
    }> = []
): F | null {
    try {
        // Run the conversion
        const firestoreData = toFirestoreFunction(sampleData);
        
        // Run reference validators if provided
        for (const validator of referenceValidators) {
            const value = validator.getValue(firestoreData);
            if (value) {
                const isValid = Array.isArray(value)
                    ? value.every(ref => ref.path.startsWith(validator.expectedPathPrefix))
                    : value.path.startsWith(validator.expectedPathPrefix);
                
                if (!isValid) {
                    throw new Error(`${validator.description} document references are invalid`);
                }
            }
        }
        
        console.log(`✅ ${schemaName} to Firestore conversion passed`);
        return firestoreData;
    } catch (error) {
        console.error(`❌ ${schemaName} to Firestore conversion failed:`, error);
        throw error;
    }
}

/**
 * Generic test for conversion from Firestore
 */
export function testFromFirestore<F, T>(
    schemaName: string,
    fromFirestoreFunction: (firestoreData: F) => T,
    firestoreData: F,
    originalData: T,
    integrityChecks: Array<{
        name: string;
        check: (original: T, retrieved: T) => boolean;
    }>
): T | null {
    try {
        // Run the conversion
        const retrievedData = fromFirestoreFunction(firestoreData);
        
        // Test data integrity
        console.log(`${schemaName} round trip data integrity check:`);
        
        // Track test failures
        const failedTests: string[] = [];
        
        // Run each integrity check
        for (const test of integrityChecks) {
            const passed = test.check(originalData, retrievedData);
            console.log(`- ${test.name}: ${passed ? '✅' : '❌'}`);
            
            if (!passed) {
                failedTests.push(test.name);
            }
        }
        
        // Overall result
        const allPassed = failedTests.length === 0;
        console.log(`Overall data integrity: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
        
        if (!allPassed) {
            throw new Error(`Data integrity tests failed for: ${failedTests.join(', ')}`);
        }
        
        return retrievedData;
    } catch (error) {
        console.error(`❌ ${schemaName} from Firestore conversion failed:`, error);
        throw error;
    }
}

/**
 * Generic function to run all tests for a schema
 */
export function runSchemaTests<AppType, FirestoreType>({
    schemaName,
    createSampleData,
    appSchema,
    toFirestore,
    fromFirestore,
    referenceValidators = [],
    integrityChecks
}: {
    schemaName: string;
    createSampleData: () => AppType;
    appSchema: z.ZodType<AppType>;
    toFirestore: (data: AppType) => FirestoreType;
    fromFirestore: (data: FirestoreType) => AppType;
    referenceValidators?: Array<{
        getValue: (data: FirestoreType) => any;
        expectedPathPrefix: string;
        description: string;
    }>;
    integrityChecks: Array<{
        name: string;
        check: (original: AppType, retrieved: AppType) => boolean;
    }>;
}): boolean {
    console.log(`\n----------------------------------------`);
    console.log(`Running ${schemaName} Schema Tests:`);
    console.log(`----------------------------------------`);
    
    try {
        // Test schema validation
        const validData = testSchemaValidation(schemaName, appSchema, createSampleData());
        
        // Test conversion to Firestore
        const firestoreData = testToFirestore(schemaName, toFirestore, validData!, referenceValidators);
        
        // Test conversion back to app
        testFromFirestore(schemaName, fromFirestore, firestoreData!, validData!, integrityChecks);
        
        console.log(`\n✅ All ${schemaName} schema tests passed successfully!`);
        return true;
    } catch (error) {
        console.error(`\n❌ ${schemaName} schema tests failed:`, error);
        return false;
    }
} 