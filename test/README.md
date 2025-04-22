# Schema Testing Guide

This document provides guidance for implementing and testing Zod schemas for Firestore data models, with special attention to reference field handling.

## Best Practices for Reference Fields

References between collections in Firestore require special handling during conversions between app and Firestore schemas. The following pattern has been implemented and tested:

### 1. Define Field Mappings

```typescript
// Field mapping for conversions
interface RefFieldMapping {
    app: keyof YourAppType;
    firestore: keyof YourFirestoreType;
    collection: string;
    nullable?: boolean;
}

const refFieldMappings: RefFieldMapping[] = [
    { app: 'partner', firestore: 'partner', collection: PARTNER_COLLECTION, nullable: true },
    // Add more reference fields as needed
];
```

### 2. Conversion to Firestore

```typescript
export const toFirestore = (appData: YourAppType): YourFirestoreType => {
    // Create base object excluding reference fields
    const result: Record<string, any> = {};
    
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.app);
    Object.keys(appData).forEach(key => {
        if (!refFieldNames.includes(key as any)) {
            result[key] = appData[key as keyof typeof appData];
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, collection, nullable }) => {
        const value = appData[app];

        if (nullable && value === null) {
            result[firestore] = null;
        } else if (typeof value === 'string') {
            result[firestore] = toFirestore.ref<any>(collection, value);
        }
    });

    return result as unknown as YourFirestoreType;
};
```

### 3. Conversion from Firestore

```typescript
export const fromFirestore = (firestoreData: YourFirestoreType): YourAppType => {
    // Create base object excluding reference fields
    const result: Record<string, any> = {};
    
    // Copy all fields except references that will be handled separately
    const refFieldNames = refFieldMappings.map(mapping => mapping.firestore);
    Object.keys(firestoreData).forEach(key => {
        if (!refFieldNames.includes(key as any)) {
            result[key] = firestoreData[key as keyof typeof firestoreData];
        }
    });

    // Convert reference fields
    refFieldMappings.forEach(({ app, firestore, nullable }) => {
        const value = firestoreData[firestore];

        if (nullable && value === null) {
            result[app] = null;
        } else if (value) {
            result[app] = fromFirestore.ref(value as any);
        }
    });

    return result as unknown as YourAppType;
};
```

## Testing Reference Handling

To properly test reference field handling:

1. Use mocks for Firestore document references
2. Test both directions of the conversion
3. Verify data integrity of all fields after round-trip conversion
4. Add specific tests for reference field handling

Example:

```typescript
// Create a test for reference fields
const testReferenceHandling = () => {
    // Create a sample with reference fields
    const sampleData = {
        // ...required fields
        // Reference fields to test
        partner: 'partner_123',
    };
    
    // Mock the document reference functions
    helpers.toFirestore.ref = (collection, id) => new MockDocumentReference(collection, id);
    
    // Test conversion to Firestore
    const firestoreData = toFirestore(sampleData);
    
    // Verify reference is properly set
    assert(firestoreData.partner instanceof MockDocumentReference);
    
    // Test conversion back to app
    helpers.fromFirestore.ref = (docRef) => docRef.id;
    const retrievedData = fromFirestore(firestoreData);
    
    // Verify reference is properly converted back
    assert(retrievedData.partner === 'partner_123');
};
```

## Common Issues and Solutions

1. **Issue**: References disappear during conversion
   **Solution**: Don't delete fields from the result object during conversion

2. **Issue**: Overwriting fields during conversion
   **Solution**: Use separate objects for app and Firestore fields

3. **Issue**: Type safety with indexing
   **Solution**: Use `Record<string, any>` and proper type casts

4. **Issue**: Nullable references
   **Solution**: Explicitly handle null values in conversions

By following these patterns, you can ensure safe and consistent handling of reference fields in your schema conversions. 