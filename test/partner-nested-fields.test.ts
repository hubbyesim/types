import { 
    PartnerApp, 
    PartnerFirestore, 
    partnerToFirestore, 
    partnerFromFirestore
} from '../src/schemas/firebase/partner';
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

describe('Partner Schema Nested Fields Conversion', () => {
  it('should correctly convert nested timestamp fields in financial_properties', () => {
    const now = new Date();
    const nextInvoice = new Date(now.getTime() + 30 * 86400000); // 30 days from now
    const lastInvoice = new Date(now.getTime() - 30 * 86400000); // 30 days ago
    
    // Create partner with nested financial_properties that have date fields
    const partnerWithNestedDates: PartnerApp = {
      id: 'test_partner_id',
      created_at: now,
      updated_at: now,
      created_by: 'system',
      updated_by: 'system',
      name: 'Test Partner',
      type: 'agency',
      is_active: true,
      contact: {
        email: 'contact@testpartner.com',
        office_phone: '+123456789'
      },
      address: {
        street: '123 Main St',
        city: 'Amsterdam',
        postal_code: '1000AB',
        country: 'NL'
      },
      registration: {
        chamber_of_commerce_number: '12345678',
        vat_number: 'NL123456789B01',
        anvr_number: null,
        tax_number: null
      },
      banking_details: {
        account_holder: 'Test Partner',
        bank_name: 'Test Bank',
        iban: 'NL12ABCD1234567890'
      },
      visual_identity: {
        primary_color: '#000000',
        secondary_color: '#FFFFFF',
        logo: 'https://example.com/logo.png',
        font: 'Arial'
      },
      data: {
        source: 'manual',
        manual: true
      },
      parent: null,
      users: ['user1', 'user2'],
      
      // Nested financial_properties with dates that need conversion
      financial_properties: {
        administration_fee: 10,
        income_per_gb: 5,
        commission_fee: 2,
        payment_method: 'invoice',
        requires_card: false,
        next_invoice: nextInvoice,
        last_invoice: lastInvoice,
        pricing_strategies: {
          partner: {
            modification_percentage: 10,
            strategy: 'split',
            default_price_list: 'price_list_1',
            custom_prices: [
              {
                destination: 'EU',
                label: '1GB',
                type: 'data-limit',
                price: 10,
                package: 'package_1'
              }
            ]
          },
          user: {
            modification_percentage: 5,
            default_price_list: 'price_list_2',
            custom_prices: [
              {
                destination: 'USA',
                label: '2GB',
                type: 'data-limit',
                price: 20,
                package: 'package_2'
              }
            ]
          }
        }
      },
      platform_settings: null
    };

    // Convert to Firestore format
    const firestorePartner = partnerToFirestore(partnerWithNestedDates);
    
    // Verify nested timestamps in financial_properties are converted
    expect(firestorePartner.financial_properties?.next_invoice).toBeInstanceOf(Object);
    expect('toDate' in firestorePartner.financial_properties!.next_invoice!).toBeTruthy();
    // @ts-ignore - we know this exists
    expect(firestorePartner.financial_properties!.next_invoice!.toDate().getTime()).toBe(nextInvoice.getTime());
    
    expect(firestorePartner.financial_properties?.last_invoice).toBeInstanceOf(Object);
    expect('toDate' in firestorePartner.financial_properties!.last_invoice!).toBeTruthy();
    // @ts-ignore - we know this exists
    expect(firestorePartner.financial_properties!.last_invoice!.toDate().getTime()).toBe(lastInvoice.getTime());
    
    // Verify nested package references are converted
    expect(firestorePartner.financial_properties?.pricing_strategies?.partner?.custom_prices[0].package).toBeInstanceOf(Object);
    expect(firestorePartner.financial_properties?.pricing_strategies?.partner?.custom_prices[0].package.id).toBe('package_1');
    
    expect(firestorePartner.financial_properties?.pricing_strategies?.user?.custom_prices[0].package).toBeInstanceOf(Object);
    expect(firestorePartner.financial_properties?.pricing_strategies?.user?.custom_prices[0].package.id).toBe('package_2');
    
    // Verify nested price list references are converted
    expect(firestorePartner.financial_properties?.pricing_strategies?.partner?.default_price_list).toBeInstanceOf(Object);
    expect(firestorePartner.financial_properties?.pricing_strategies?.partner?.default_price_list?.id).toBe('price_list_1');
    
    expect(firestorePartner.financial_properties?.pricing_strategies?.user?.default_price_list).toBeInstanceOf(Object);
    expect(firestorePartner.financial_properties?.pricing_strategies?.user?.default_price_list?.id).toBe('price_list_2');
    
    // Convert back to App format
    const appPartner = partnerFromFirestore(firestorePartner);
    
    // Verify timestamps are converted back to Date objects
    expect(appPartner.financial_properties?.next_invoice).toBeInstanceOf(Date);
    expect(appPartner.financial_properties?.next_invoice?.getTime()).toBe(nextInvoice.getTime());
    
    expect(appPartner.financial_properties?.last_invoice).toBeInstanceOf(Date);
    expect(appPartner.financial_properties?.last_invoice?.getTime()).toBe(lastInvoice.getTime());
    
    // Verify package references are converted back to string IDs
    expect(typeof appPartner.financial_properties?.pricing_strategies?.partner?.custom_prices[0].package).toBe('string');
    expect(appPartner.financial_properties?.pricing_strategies?.partner?.custom_prices[0].package).toBe('package_1');
    
    expect(typeof appPartner.financial_properties?.pricing_strategies?.user?.custom_prices[0].package).toBe('string');
    expect(appPartner.financial_properties?.pricing_strategies?.user?.custom_prices[0].package).toBe('package_2');
    
    // Verify price list references are converted back to string IDs
    expect(typeof appPartner.financial_properties?.pricing_strategies?.partner?.default_price_list).toBe('string');
    expect(appPartner.financial_properties?.pricing_strategies?.partner?.default_price_list).toBe('price_list_1');
    
    expect(typeof appPartner.financial_properties?.pricing_strategies?.user?.default_price_list).toBe('string');
    expect(appPartner.financial_properties?.pricing_strategies?.user?.default_price_list).toBe('price_list_2');
  });
}); 