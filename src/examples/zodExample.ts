import { Timestamp, DocumentReference } from 'firebase/firestore';
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

/**
 * Example: Using Zod for validation
 * 
 * This demonstrates:
 * 1. Validating an object against the schema
 * 2. Converting between Firestore and App models
 * 3. Type inference and safety
 */

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
    // Convert to Firestore model
    const firestoreUser = userToFirestore(user);

    // Validate against Firestore schema
    const validatedFirestoreUser = userFirestoreSchema.parse(firestoreUser);

    // In a real implementation, you would save to Firestore here
    console.log('Saving user to Firestore:', validatedFirestoreUser);

    return validatedFirestoreUser;
}

// Example: Converting from Firestore to App model
function getUserFromFirestore(firestoreUser: UserFirestore): UserApp {
    // Convert to App model
    const user = userFromFirestore(firestoreUser);

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
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
        } else {
            console.error('Error:', error);
        }
    }
}

// Example of an invalid user that will fail validation
function exampleInvalidUser() {
    try {
        // Invalid email will cause validation to fail
        const invalidUser = createNewUser('Invalid User', 'not-an-email', 'profile_123');
        console.log('This should not be reached');
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log('Validation failed as expected:', error.errors);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export { exampleUsage, exampleInvalidUser }; 