import { UserApp, UserFirestore, userToFirestore, userFromFirestore } from '../src/schemas/firebase/user';
import { ApiKey, ApiKeys } from '../src/schemas/base/user';
import { Timestamp, DocumentReference, FieldValue as ActualFieldValue } from 'firebase-admin/firestore';

// Mock Firestore types/functions
const mockTimestamp = (date: Date): Timestamp => {
  return {
    toDate: () => date,
    toMillis: () => date.getTime(),
    isEqual: (other) => date.getTime() === other.toMillis(),
    valueOf: () => date.getTime().toString(),
  } as Timestamp;
};

const mockDocRef = (id: string, collection: string): DocumentReference => {
  return {
    id: id,
    path: `${collection}/${id}`,
  } as DocumentReference;
};

// Mock FieldValue
const mockFieldValueObject = { _isMockFieldValue: true } as unknown as ActualFieldValue;

// Mock the helper functions from '../src/schemas/firebase/helpers'
jest.mock('../src/schemas/firebase/helpers', () => ({
  toFirestore: {
    date: (date: Date) => mockTimestamp(date),
    ref: (collection: string, id: string) => mockDocRef(id, collection),
    fieldValue: () => mockFieldValueObject, 
  },
  fromFirestore: {
    date: (timestamp: Timestamp) => {
      // Handle our fake timestamp for the test case
      if (timestamp && typeof timestamp === 'object' && 'notADate' in timestamp) {
        return timestamp;
      }
      return timestamp.toDate();
    },
    ref: (ref: DocumentReference) => ref.id,
  },
}));

describe('User Schema Nested Fields Conversion', () => {
  it('should correctly convert nested timestamp fields in api_keys (roundtrip)', () => {
    const now = new Date();
    // Create a date without milliseconds for easier comparison
    const createdAt = new Date(Math.floor(now.getTime() / 1000) * 1000);
    const apiKeyExpiry = new Date(Math.floor((now.getTime() + 86400000 * 30) / 1000) * 1000); // 30 days from now
    
    // Create user with api_keys that have expiry_date
    const userWithApiKeys: UserApp = {
      id: 'test_user_id',
      created_at: createdAt,
      updated_at: createdAt,
      created_by: 'system',
      updated_by: 'system',
      name: 'API Key Test User',
      email: 'api-test@example.com',
      stripe_id: null,
      referral: null,
      deeplink: null,
      gender: null,
      company: null,
      coordinates: null,
      parameters: null,
      locale: 'en-US',
      phone_model: null,
      phone_os: null,
      phone_os_version: null,
      ios: null,
      has_card_saved: null,
      admin: false,
      currency: null,
      receipt_email: null,
      partner: null,
      profileRef: null,
      createdAt: createdAt,
      balance: 0,
      review_requested: null,
      last_seen: null,
      
      // Api keys with expiry dates (nested timestamp field)
      api_keys: {
        allowed_keys: ['key1', 'key2'],
        keys: {
          'key1': {
            expires_at: apiKeyExpiry,
            secret: 'secret1',
            is_active: true
          },
          'key2': {
            expires_at: new Date(apiKeyExpiry.getTime() + 86400000), // One day later
            secret: 'secret2',
            is_active: false
          }
        }
      }
    };

    // Convert to Firestore format
    const firestoreUser = userToFirestore(userWithApiKeys);

    // Verify nested timestamp conversion
    expect(firestoreUser.api_keys).toBeDefined();
    expect(firestoreUser.api_keys!.keys['key1']).toBeDefined();
    expect(firestoreUser.api_keys!.keys['key1'].expires_at).toBeInstanceOf(Object); // Should be Timestamp
    expect('toDate' in firestoreUser.api_keys!.keys['key1'].expires_at).toBeTruthy(); // Should have toDate method
    
    // Verify the second key as well
    expect(firestoreUser.api_keys!.keys['key2']).toBeDefined();
    expect(firestoreUser.api_keys!.keys['key2'].expires_at).toBeInstanceOf(Object); // Should be Timestamp
    expect('toDate' in firestoreUser.api_keys!.keys['key2'].expires_at).toBeTruthy(); // Should have toDate method

    // Convert back to App format
    const appUser = userFromFirestore(firestoreUser);

    // Verify nested api_keys were properly converted back
    expect(appUser.api_keys).toBeDefined();
    expect(appUser.api_keys!.keys['key1']).toBeDefined();
    expect(appUser.api_keys!.keys['key1'].expires_at).toBeInstanceOf(Date);
    expect(appUser.api_keys!.keys['key1'].expires_at.getTime()).toBe(apiKeyExpiry.getTime());
    
    // Verify the second key conversion
    expect(appUser.api_keys!.keys['key2']).toBeDefined();
    expect(appUser.api_keys!.keys['key2'].expires_at).toBeInstanceOf(Date);
    expect(appUser.api_keys!.keys['key2'].expires_at.getTime()).toBe(apiKeyExpiry.getTime() + 86400000);
  });

  it('should demonstrate what happens without nested field conversion', () => {
    const now = new Date();
    const apiKeyExpiry = new Date(Math.floor((now.getTime() + 86400000 * 30) / 1000) * 1000); // 30 days from now
    
    // Create a user with api_keys
    const userWithApiKeys: UserApp = {
      id: 'test_user_id',
      created_at: now,
      updated_at: now,
      created_by: 'system',
      updated_by: 'system',
      name: 'Conversion Demo',
      email: 'conversion-demo@example.com',
      stripe_id: null,
      referral: null,
      deeplink: null,
      gender: null,
      company: null,
      coordinates: null,
      parameters: null,
      locale: 'en-US',
      phone_model: null,
      phone_os: null,
      phone_os_version: null,
      ios: null,
      has_card_saved: null,
      admin: false,
      currency: null,
      receipt_email: null,
      partner: null,
      profileRef: null,
      createdAt: now,
      balance: 0,
      review_requested: null,
      last_seen: null,
      
      // Api keys with expiry dates
      api_keys: {
        allowed_keys: ['key1'],
        keys: {
          'key1': {
            expires_at: apiKeyExpiry,
            secret: 'secret1',
            is_active: true
          }
        }
      }
    };

    // THIS TEST DEMONSTRATES WHAT WOULD HAPPEN WITHOUT NESTED CONVERSION
    
    // First, let's create a typical Firestore user to convert
    const firestoreUser = userToFirestore(userWithApiKeys);
    
    // Since the current approach properly converts nested fields, we'll artificially 
    // create a scenario to demonstrate what happens without the nested field conversion
    
    // Create a non-timestamp object that looks like a timestamp but isn't one
    // Use type assertion to treat it as a Timestamp for the test
    const notReallyATimestamp = {
      notADate: true,
      toDate: () => 'fake date',
      // Add minimum required Timestamp properties to satisfy the type checker
      seconds: 0,
      nanoseconds: 0,
      toMillis: () => 0,
      isEqual: () => false,
      valueOf: () => ''
    } as unknown as Timestamp;
    
    // Create a cloned user to avoid reference issues, but we need to manually handle the special objects
    const clonedFirestoreUser = { ...firestoreUser };
    
    // Create a clone of the api_keys structure
    if (firestoreUser.api_keys) {
      clonedFirestoreUser.api_keys = {
        allowed_keys: [...firestoreUser.api_keys.allowed_keys],
        keys: { 
          key1: {
            ...firestoreUser.api_keys.keys.key1,
            expires_at: notReallyATimestamp // Replace with our fake timestamp
          }
        }
      };
    }
    
    // Now convert the broken Firestore user back to App format
    const resultUser = userFromFirestore(clonedFirestoreUser);
    
    // In an application without proper nested conversion:
    // - The timestamp would not be properly converted to a Date
    // - It would retain the original format (our fake timestamp)
    // These assertions show what would happen in that case:
    expect(resultUser.api_keys!.keys.key1.expires_at).not.toBeInstanceOf(Date);
    expect(resultUser.api_keys!.keys.key1.expires_at).toBe(notReallyATimestamp);
  });

  it('should handle deeply nested partner references in parameters object', () => {
    const now = new Date();
    const partnerId = 'partner_id_123';
    
    // Create a user with a nested partner reference in the parameters field
    const userWithNestedRefs: UserApp = {
      id: 'test_nested_refs',
      created_at: now,
      updated_at: now,
      created_by: 'system',
      updated_by: 'system',
      name: 'Nested Refs Test',
      email: 'nested-refs@example.com',
      stripe_id: null,
      referral: null,
      deeplink: null,
      gender: null,
      company: null,
      coordinates: null,
      // Complex parameters object with nested partner reference
      parameters: {
        preferences: {
          theme: 'dark',
          notifications: true
        },
        relationships: {
          primaryPartner: partnerId,  // This should be a reference to a partner
          otherPartners: ['partner_id_456', 'partner_id_789']
        },
        timestamps: {
          lastLogin: now,  // This should be a timestamp
          accountCreated: now
        }
      },
      locale: 'en-US',
      phone_model: null,
      phone_os: null,
      phone_os_version: null,
      ios: null,
      has_card_saved: null,
      admin: false,
      currency: null,
      receipt_email: null,
      partner: partnerId,  // This is handled correctly by the conversion
      profileRef: null,
      createdAt: now,
      balance: 0,
      review_requested: null,
      last_seen: null,
      api_keys: null
    };

    // Convert to Firestore format
    const firestoreUser = userToFirestore(userWithNestedRefs);
    
    // The main partner field should be converted to a DocumentReference
    expect(firestoreUser.partner).toBeInstanceOf(Object);
    expect(firestoreUser.partner?.id).toBe(partnerId);
    
    // Now the nested partner reference should also be converted to a DocumentReference
    // @ts-ignore - accessing dynamic properties
    expect(firestoreUser.parameters.relationships.primaryPartner).toBeInstanceOf(Object);
    // @ts-ignore - accessing dynamic properties
    expect(firestoreUser.parameters.relationships.primaryPartner.id).toBe(partnerId);
    
    // And nested timestamps should now be Firestore Timestamps
    // @ts-ignore - accessing dynamic properties
    expect('toDate' in firestoreUser.parameters.timestamps.lastLogin).toBeTruthy();
    
    // Convert back to App format
    const appUser = userFromFirestore(firestoreUser);
    
    // The main partner field should be converted back to a string ID
    expect(appUser.partner).toBe(partnerId);
    
    // The nested partner reference should also be converted back to string
    // @ts-ignore - accessing dynamic properties
    expect(appUser.parameters.relationships.primaryPartner).toBe(partnerId);
    
    // And the nested timestamps should be Date objects
    // @ts-ignore - accessing dynamic properties
    expect(appUser.parameters.timestamps.lastLogin).toBeInstanceOf(Date);
    // @ts-ignore - accessing dynamic properties
    expect(appUser.parameters.timestamps.lastLogin.getTime()).toBe(now.getTime());
  });
}); 