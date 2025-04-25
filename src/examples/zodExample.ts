import { z } from 'zod';
import {
    userFirestoreSchema,
    userAppSchema,
    userToFirestore,
    userFromFirestore,
    UserApp,
    UserFirestore,
    User
} from '../schemas/user';
import { FirestoreProvider } from '../schemas/utils';

/**
 * Example: Using Zod for validation
 * 
 * This demonstrates:
 * 1. Validating an object against the schema
 * 2. Converting between Firestore and App models
 * 3. Type inference and safety
 */

// Example: Creating a FirestoreProvider implementation
function createMockFirestoreProvider(): FirestoreProvider {
    return {
        Timestamp: {
            fromDate: (date: Date) => ({
                toDate: () => date,
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: (date.getTime() % 1000) * 1000000
            }),
            now: () => {
                const date = new Date();
                return {
                    toDate: () => date,
                    seconds: Math.floor(date.getTime() / 1000),
                    nanoseconds: (date.getTime() % 1000) * 1000000
                };
            }
        },
        FieldValue: {
            serverTimestamp: () => ({ isEqual: () => false }),
            increment: (n: number) => ({ value: n, isEqual: () => false })
        },
        doc: (path: string) => ({
            id: path.split('/').pop() || '',
            path
        }),
        collection: (path: string) => ({
            path
        })
    };
}

// Get a mock Firestore provider for examples
const mockFirestore = createMockFirestoreProvider();

// Example: Validating an App model
function validateUserApp(userData: unknown): UserApp {
    // Parse and validate the data against the schema
    // This will throw an error if validation fails
    const validatedUser = userAppSchema.parse(userData);

    // Return the validated user
    return validatedUser;
}

// Example: Converting from App to Firestore model
function saveUserToFirestore(user: UserApp): UserFirestore {
    // Convert to Firestore model using the mock provider
    const firestoreUser = userToFirestore(user, mockFirestore);

    // Validate against Firestore schema
    const validatedFirestoreUser = userFirestoreSchema.parse(firestoreUser);

    // In a real implementation, you would save to Firestore here
    console.log('Saving user to Firestore:', validatedFirestoreUser);

    return validatedFirestoreUser;
}

// Example: Converting from Firestore to App model
function getUserFromFirestore(firestoreUser: UserFirestore): UserApp {
    // Convert to App model using the mock provider
    const user = userFromFirestore(firestoreUser, mockFirestore);

    // In a real implementation, you would return the user to the app
    console.log('User for app:', user);

    return user;
}

// Example: Creating a new user
function createNewUser(name: string, email: string, profileRef: string | null): UserApp {
    const now = new Date();

    // Create a new user object that follows the App schema (using Date objects)
    const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        profileRef,
        createdAt: now,
        created_at: now,
        updated_at: now,
        created_by: 'system',
        updated_by: null
    };

    // Validate the new user
    return validateUserApp(newUser);
}

// Example usage
function exampleUsage() {
    try {
        // Create a new user
        const user = createNewUser('John Doe', 'john@example.com', 'profile_123');

        // Convert to Firestore model
        const firestoreUser = saveUserToFirestore(user);

        // Convert back to App model
        const retrievedUser = getUserFromFirestore(firestoreUser);

        console.log('Round trip successful:',
            user.id === retrievedUser.id &&
            user.name === retrievedUser.name &&
            user.profileRef === retrievedUser.profileRef
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (typeof z !== 'undefined' && 'ZodError' in z && error instanceof z.ZodError) {
                console.error('Validation error:', (error as z.ZodError).errors);
            } else {
                console.error('Error:', error);
            }
        } else {
            console.error('Unknown error:', error);
        }
    }
}

// Example of an invalid user that will fail validation
function exampleInvalidUser() {
    try {
        // Invalid email will cause validation to fail
        const invalidUser = createNewUser('Invalid User', 'not-an-email', 'profile_123');
        console.log('This should not be reached');
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (typeof z !== 'undefined' && 'ZodError' in z && error instanceof z.ZodError) {
                console.log('Validation failed as expected:', (error as z.ZodError).errors);
            } else {
                console.error('Unexpected error:', error);
            }
        } else {
            console.error('Unknown error:', error);
        }
    }
}

export { exampleUsage, exampleInvalidUser }; 