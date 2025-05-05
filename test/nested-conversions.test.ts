import { 
    NestedFieldPathMapping, 
    processNestedFieldsToFirestore, 
    processNestedFieldsFromFirestore 
} from '../src/schemas/utils/nested-conversions';
import { UserApp, UserFirestore, userToFirestore, userFromFirestore } from '../src/schemas/firebase/user';
import { Timestamp, DocumentReference } from 'firebase-admin/firestore';

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

// Mock the helper functions from '../src/schemas/firebase/helpers'
jest.mock('../src/schemas/firebase/helpers', () => ({
  toFirestore: {
    date: (date: Date) => mockTimestamp(date),
    ref: (collection: string, id: string) => mockDocRef(id, collection),
  },
  fromFirestore: {
    date: (timestamp: Timestamp) => timestamp.toDate(),
    ref: (ref: DocumentReference) => ref.id,
  },
}));

describe('Nested Conversions Utility', () => {
  it('should convert nested timestamp fields to Firestore format', () => {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + 86400000); // Tomorrow
    
    // Create a test object with nested Date
    const testObject = {
      id: 'test123',
      api_keys: {
        allowed_keys: ['key1', 'key2'],
        keys: {
          'key1': {
            expires_at: expiryDate,
            secret: 'secret1',
            is_active: true
          },
          'key2': {
            expires_at: new Date(expiryDate.getTime() + 86400000), // Day after tomorrow
            secret: 'secret2',
            is_active: false
          }
        }
      }
    };
    
    // Define the mapping
    const mappings: NestedFieldPathMapping[] = [
      {
        path: ['api_keys', 'keys', '*', 'expires_at'],
        type: 'timestamp',
        wildcardIndex: 2
      }
    ];
    
    // Convert to Firestore format
    processNestedFieldsToFirestore(testObject, mappings);
    
    // Verify conversion
    expect(testObject.api_keys.keys['key1'].expires_at).toBeInstanceOf(Object);
    expect('toDate' in testObject.api_keys.keys['key1'].expires_at).toBeTruthy();
    // Use type assertion to safely access toDate()
    const timestamp1 = testObject.api_keys.keys['key1'].expires_at as unknown as Timestamp;
    expect(timestamp1.toDate().getTime()).toBe(expiryDate.getTime());
    
    // Verify the second key as well
    expect(testObject.api_keys.keys['key2'].expires_at).toBeInstanceOf(Object);
    expect('toDate' in testObject.api_keys.keys['key2'].expires_at).toBeTruthy();
    // Use type assertion to safely access toDate()
    const timestamp2 = testObject.api_keys.keys['key2'].expires_at as unknown as Timestamp;
    expect(timestamp2.toDate().getTime()).toBe(expiryDate.getTime() + 86400000);
  });
  
  it('should convert nested timestamp fields from Firestore format', () => {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + 86400000); // Tomorrow
    
    // Create a test object with nested Timestamp
    const testObject = {
      id: 'test123',
      api_keys: {
        allowed_keys: ['key1', 'key2'],
        keys: {
          'key1': {
            expires_at: mockTimestamp(expiryDate),
            secret: 'secret1',
            is_active: true
          },
          'key2': {
            expires_at: mockTimestamp(new Date(expiryDate.getTime() + 86400000)), // Day after tomorrow
            secret: 'secret2',
            is_active: false
          }
        }
      }
    };
    
    // Define the mapping
    const mappings: NestedFieldPathMapping[] = [
      {
        path: ['api_keys', 'keys', '*', 'expires_at'],
        type: 'timestamp',
        wildcardIndex: 2
      }
    ];
    
    // Convert from Firestore format
    processNestedFieldsFromFirestore(testObject, mappings);
    
    // Verify conversion
    expect(testObject.api_keys.keys['key1'].expires_at).toBeInstanceOf(Date);
    // Use type assertion to safely access getTime()
    const date1 = testObject.api_keys.keys['key1'].expires_at as unknown as Date;
    expect(date1.getTime()).toBe(expiryDate.getTime());
    
    // Verify the second key as well
    expect(testObject.api_keys.keys['key2'].expires_at).toBeInstanceOf(Date);
    // Use type assertion to safely access getTime()
    const date2 = testObject.api_keys.keys['key2'].expires_at as unknown as Date;
    expect(date2.getTime()).toBe(expiryDate.getTime() + 86400000);
  });
  
  it('should convert deeply nested reference fields to Firestore format', () => {
    const partnerId = 'partner123';
    const otherPartnerIds = ['partner456', 'partner789'];
    
    // Create a test object with nested references
    const testObject = {
      id: 'test123',
      partner: partnerId, // This will be handled by the regular conversion
      parameters: {
        preferences: {
          theme: 'dark'
        },
        relationships: {
          primaryPartner: partnerId,  // This should be converted to a reference
          otherPartners: otherPartnerIds // This should be converted to an array of references
        }
      }
    };
    
    // Define the mapping
    const mappings: NestedFieldPathMapping[] = [
      {
        path: ['parameters', 'relationships', 'primaryPartner'],
        type: 'reference',
        collection: 'partners'
      },
      {
        path: ['parameters', 'relationships', 'otherPartners'],
        type: 'reference',
        collection: 'partners',
        arrayField: true // Mark this as an array field for proper handling
      }
    ];
    
    // Convert to Firestore format
    processNestedFieldsToFirestore(testObject, mappings);
    
    // Verify conversion of primaryPartner
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.primaryPartner).toBeInstanceOf(Object);
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.primaryPartner.id).toBe(partnerId);
    
    // Verify conversion of otherPartners array
    // @ts-ignore - accessing dynamic properties
    expect(Array.isArray(testObject.parameters.relationships.otherPartners)).toBeTruthy();
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.otherPartners.length).toBe(2);
    // The first partner ID should now be an object with id
    // @ts-ignore - accessing dynamic properties
    expect(typeof testObject.parameters.relationships.otherPartners[0]).toBe('object');
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.otherPartners[0].id).toBe(otherPartnerIds[0]);
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.otherPartners[1].id).toBe(otherPartnerIds[1]);
  });
  
  it('should handle null and nullable fields correctly', () => {
    // Create a test object with nullable fields
    const testObject = {
      id: 'test123',
      api_keys: {
        allowed_keys: ['key1', 'key2'],
        keys: {
          'key1': {
            expires_at: null,  // Should remain null
            secret: 'secret1',
            is_active: true
          }
        }
      },
      parameters: {
        relationships: {
          primaryPartner: null  // Should remain null
        }
      }
    };
    
    // Define the mapping
    const mappings: NestedFieldPathMapping[] = [
      {
        path: ['api_keys', 'keys', '*', 'expires_at'],
        type: 'timestamp',
        nullable: true,
        wildcardIndex: 2
      },
      {
        path: ['parameters', 'relationships', 'primaryPartner'],
        type: 'reference',
        collection: 'partners',
        nullable: true
      }
    ];
    
    // Convert to Firestore format
    processNestedFieldsToFirestore(testObject, mappings);
    
    // Verify nulls remain null
    expect(testObject.api_keys.keys['key1'].expires_at).toBeNull();
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.primaryPartner).toBeNull();
    
    // Convert back from Firestore format (should be a no-op for nulls)
    processNestedFieldsFromFirestore(testObject, mappings);
    
    // Verify nulls still remain null
    expect(testObject.api_keys.keys['key1'].expires_at).toBeNull();
    // @ts-ignore - accessing dynamic properties
    expect(testObject.parameters.relationships.primaryPartner).toBeNull();
  });
  
  it('should work with the userToFirestore and userFromFirestore functions', () => {
    const now = new Date();
    const apiKeyExpiry = new Date(now.getTime() + 86400000); // Tomorrow
    const partnerId = 'partner123';
    
    // Create a user with nested fields
    const testUser: UserApp = {
      id: 'test123',
      created_at: now,
      updated_at: now,
      created_by: 'system',
      updated_by: 'system',
      name: 'Nested Test User',
      email: 'nested-test@example.com',
      stripe_id: null,
      referral: null,
      deeplink: null,
      gender: null,
      company: null,
      coordinates: null,
      // Complex parameters object with nested references and dates
      parameters: {
        preferences: {
          theme: 'dark'
        },
        relationships: {
          primaryPartner: partnerId
        },
        timestamps: {
          lastLogin: now
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
      partner: partnerId,
      profileRef: null,
      createdAt: now,
      balance: 0,
      review_requested: null,
      last_seen: null,
      // Api keys with nested timestamps
      api_keys: {
        allowed_keys: ['apikey1'],
        keys: {
          'apikey1': {
            expires_at: apiKeyExpiry,
            secret: 'secret123',
            is_active: true
          }
        }
      }
    };
    
    // Convert to Firestore format using the userToFirestore function
    const firestoreUser = userToFirestore(testUser);
    
    // Verify top-level fields are converted
    expect(firestoreUser.partner).toBeInstanceOf(Object);
    expect(firestoreUser.partner?.id).toBe(partnerId);
    expect(firestoreUser.createdAt).toBeInstanceOf(Object);
    expect('toDate' in firestoreUser.createdAt).toBeTruthy();
    
    // Verify nested api_keys are converted
    expect(firestoreUser.api_keys?.keys['apikey1'].expires_at).toBeInstanceOf(Object);
    expect('toDate' in firestoreUser.api_keys!.keys['apikey1'].expires_at).toBeTruthy();
    
    // Convert back to app format
    const appUser = userFromFirestore(firestoreUser);
    
    // Verify roundtrip conversion of main fields
    expect(appUser.partner).toBe(partnerId);
    expect(appUser.createdAt).toBeInstanceOf(Date);
    
    // Verify roundtrip conversion of nested fields
    expect(appUser.api_keys?.keys['apikey1'].expires_at).toBeInstanceOf(Date);
    expect(appUser.api_keys!.keys['apikey1'].expires_at.getTime()).toBe(apiKeyExpiry.getTime());
  });
}); 