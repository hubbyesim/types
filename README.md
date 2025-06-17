# Hubby Types

This package contains type definitions for the Hubby eSIM project with Zod schema validation.

## Migration to Zod Schemas

This package has been upgraded to use Zod schemas for improved runtime validation and type safety. The migration provides:

1. Dual schema approach:
   - Firestore schemas using native Firestore types (Timestamp, DocumentReference)
   - App schemas using JavaScript-friendly types (Date, string IDs)

2. Automatic conversion between Firestore and app data

3. Backward compatibility with existing type definitions

## How to Use

### Importing Types

You can continue to import types as before for backward compatibility:

```typescript
import { Booking } from '@hubbyesim/types';
```

Or import the new Zod-based types directly:

```typescript
import { BookingApp, BookingFirestore } from '@hubbyesim/types/schemas/booking';
```

### Validating Data with Zod

```typescript
import { bookingAppSchema, bookingFirestoreSchema } from '@hubbyesim/types/schemas/booking';

// Validate app data
try {
  const validBooking = bookingAppSchema.parse(bookingData);
  // Data is valid, proceed
} catch (error) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    console.error('Validation failed:', error.errors);
  }
}
```

### Converting Between Firestore and App Data

```typescript
import { 
  bookingToFirestore, 
  bookingFromFirestore 
} from '@hubbyesim/types/schemas/booking';

// Convert app data to Firestore format
const firestoreData = bookingToFirestore(appData);

// Convert Firestore data to app format
const appData = bookingFromFirestore(firestoreData);
```

## Example

```typescript
import { z } from 'zod';
import { 
  userAppSchema, 
  userFirestoreSchema,
  userToFirestore,
  userFromFirestore
} from '@hubbyesim/types/schemas/user';

// Create a new user with type safety
const user = {
  id: 'user_123',
  name: 'John Doe',
  email: 'john@example.com',
  profileId: 'profile_456',
  createdAt: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: 'system',
  updated_by: null
};

// Validate
const validUser = userAppSchema.parse(user);

// Convert to Firestore
const firestoreUser = userToFirestore(validUser);

// Save to Firestore (in your code)
// await userCollection.doc(firestoreUser.id).set(firestoreUser);

// Convert back to app format
const retrievedUser = userFromFirestore(firestoreUser);
```

## Available Models

The following models have been migrated to use Zod schemas:

- `User`
- `Booking`
- `Partner`
- `Country`
- `Package`
- `PromoCode`
- `ESIM`
- `Payment`
- `Message` (including `SentMessages`)
- `Currency`
- `ApiLog`
- `API` (including request/response types)

Each model has:

- Firestore schema (`xxxFirestoreSchema`)
- App schema (`xxxAppSchema`)
- Conversion functions (`xxxToFirestore`, `xxxFromFirestore`)
- Type definitions (`XxxApp`, `XxxFirestore`)

## Implemented Features

- ✅ Dual schema approach (Firestore/App)
- ✅ Automatic conversion between formats
- ✅ DocumentReference handling (as string IDs in app schema)
- ✅ Collection path constants for references
- ✅ Backward compatibility
- ✅ Comprehensive schema validation
- ✅ Type-safe conversion functions

## Key Benefits

1. **Runtime Validation**: Validate data shape at runtime, not just during compilation
2. **Developer Experience**: Strong type inference and autocomplete
3. **Error Handling**: Detailed and structured error messages
4. **Simplified Integration**: Seamless conversion between Firestore and application data
5. **Maintainability**: Single source of truth for types, with schemas that generate TypeScript types

## Type System

This package uses a dual-type system for each schema:

1. `*Firestore` types - Represent data as stored in Firestore
2. `*App` types - Represent data as used in application code

For convenience and backward compatibility:
- Firestore types are exported with both their full name and the base name (e.g., `BookingFirestore` and `Booking`)
- App types are exported with an H-prefix (e.g., `BookingApp` as `HBooking`)

### Type Generation

All types are now automatically exported from a single `index.ts` file that is generated from the schema files.

To regenerate the exports after making changes to schema files, run:

```bash
npm run generate-exports
```

> **Note:** The individual .d.ts files in the src/ directory (like booking.d.ts, etc.) are deprecated and will be removed in a future version. All types are now exported directly from the schema files through the generated index.ts. 

include like this:

  "dependencies": {
    "@hubbyesim/types": "git+https://github.com/hubbyesim/types.git#v1.0.5"
  }