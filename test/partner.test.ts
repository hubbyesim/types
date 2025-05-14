import {
    PartnerSchema,
    HPartnerSchema,
    PriceListSchema,
    HPriceListSchema
} from "../src";
import { Timestamp } from "firebase-admin/firestore";
import { convertFirestoreToJS } from "../src/utils/firestoreTransformUtils";
import { partnerSchemaSpec, priceListSchemaSpec } from "../src/specs/partner";
import { convertJSToFirestore } from '../src/utils/firestoreTransformUtils';
import { FirebaseService, createFirebaseService } from '../src/services/firebase';
import { createModelConverters } from '../src/utils/modelConverterFactory';

// Mock Firebase for tests
beforeAll(() => {
    // Set up a test instance with isTest flag
    const testFirebase = createFirebaseService({ isTest: true });
    FirebaseService.setDefaultInstance(testFirebase);
});

describe("Partner Schema", () => {
    it("should convert from server to client and back", () => {
        const now = new Date();

        // Create a sample client side Partner object
        const clientPartner = {
            id: "test-partner-123",
            created_at: now,
            updated_at: now,
            created_by: "user1",
            updated_by: null,

            // Partner specific fields
            name: "Test Partner LLC",
            type: "travel-agency",
            is_active: true,
            external_id: "ext-123",

            // Nested objects
            contact: {
                email: "partner@example.com",
                office_phone: "+1234567890"
            },
            address: {
                street: "123 Main St",
                city: "Amsterdam",
                postal_code: "1000 AB",
                country: "Netherlands"
            },
            registration: {
                chamber_of_commerce_number: "12345678",
                vat_number: "NL123456789B01",
                anvr_number: 12345,
                tax_number: "123-45-6789"
            },
            banking_details: {
                account_holder: "Test Partner LLC",
                bank_name: "Dutch Bank",
                iban: "NL00BANK0123456789"
            },

            // References
            parent: null,
            users: [
                "user-1",
                "user-2"
            ],

            // Financial properties
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                commission_fee: 10.00,
                payment_method: "invoice",
                requires_card: false,
                next_invoice: now,
                last_invoice: now,
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: "price-list-1",
                        custom_prices: [
                            {
                                destination: "France",
                                label: "5GB Package",
                                type: "data-limited",
                                price: 19.99,
                                package: "package-1"
                            }
                        ]
                    },
                    user: {
                        modification_percentage: 5,
                        default_price_list: "price-list-2",
                        custom_prices: []
                    }
                }
            },

            // Visual identity
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png",
                font: "Roboto",
                top_banner: {
                    strategy: "fixed",
                    banners: [
                        {
                            image_url: "https://example.com/banner1.png",
                            alt: "Summer Sale",
                            click_url: "https://example.com/sale",
                            locale: "en-US",
                            properties: { theme: "summer" }
                        }
                    ]
                }
            },

            // Platform settings
            platform_settings: {
                package_strategy: {
                    name: "default",
                    iso3_white_list: ["NLD", "DEU", "FRA"],
                    parameters: { default_size: "5GB" }
                },
                booking_defaults: {
                    locale: "en-US"
                },
                schedules: [
                    {
                        days: 1,
                        hour: 12,
                        key: "welcome",
                        method: "email",
                        moment: "departure_date",
                        email: {
                            brevo_template_id: 12345,
                            subject: { "en-US": "Welcome" },
                            preview_text: { "en-US": "Welcome to our service" }
                        }
                    }
                ]
            },

            // Metadata
            data: {
                source: "manual",
                manual: true
            }
        };

        // First convert to server format
        const serverObj = PartnerSchema.parse(clientPartner);

        // Verify the document references were properly created
        expect(serverObj.financial_properties.pricing_strategies.partner.default_price_list.id).toBe(
            clientPartner.financial_properties.pricing_strategies.partner.default_price_list
        );

        // Convert server object to JS for client use
        const jsData = convertFirestoreToJS(serverObj, partnerSchemaSpec);

        // Now parse with client schema to convert back
        const roundtripClientObj = HPartnerSchema.parse(jsData);

        // Verify the conversion maintained the core data
        expect(roundtripClientObj.id).toBe(clientPartner.id);
        expect(roundtripClientObj.name).toBe(clientPartner.name);
        expect(roundtripClientObj.type).toBe(clientPartner.type);
        expect(roundtripClientObj.contact.email).toBe(clientPartner.contact.email);
        expect(roundtripClientObj.address.city).toBe(clientPartner.address.city);
        expect(roundtripClientObj.financial_properties.administration_fee).toBe(clientPartner.financial_properties.administration_fee);
        expect(roundtripClientObj.users).toEqual(clientPartner.users);

        // Verify nested document references were converted correctly
        expect(roundtripClientObj.financial_properties.pricing_strategies.partner.default_price_list).toBe(
            clientPartner.financial_properties.pricing_strategies.partner.default_price_list
        );

        // Verify nested object fields remained intact
        expect(roundtripClientObj.contact.email).toBe(clientPartner.contact.email);
        expect(roundtripClientObj.address.city).toBe(clientPartner.address.city);
        expect(roundtripClientObj.visual_identity.primary_color).toBe(clientPartner.visual_identity.primary_color);
    });

    it("should handle string dates for financial_properties date fields", () => {
        // Create a sample partner with string dates that would come from JSON in API
        const isoDateString = "2023-04-15T14:30:00.000Z";
        const expectedDate = new Date(isoDateString);

        const clientPartnerWithStringDates = {
            id: "partner-with-string-dates",
            created_at: new Date(),
            updated_at: new Date(),
            created_by: "user1",
            updated_by: null,
            name: "Date Test Partner",
            type: "travel-agency",
            is_active: true,
            contact: { email: "date-test@example.com", office_phone: null },
            address: { country: "Netherlands" },
            registration: {},
            users: [],

            // Adding missing required fields
            banking_details: {
                account_holder: "Date Test Partner LLC",
                bank_name: "Test Bank",
                iban: "NL00TEST0123456789"
            },
            parent: null,

            // Financial properties with string dates
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                payment_method: "invoice",
                requires_card: false,
                // Use string dates that would come from JSON in API
                next_invoice: isoDateString,
                last_invoice: isoDateString,
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: null,
                        custom_prices: []
                    }
                }
            },

            // Adding required visual identity
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png"
            },

            // Adding required platform settings
            platform_settings: {
                package_strategy: {
                    name: "default",
                    parameters: {}
                },
                booking_defaults: {
                    locale: "en-US"
                }
            },

            // Metadata
            data: {
                source: "manual",
                manual: true
            }
        };

        // Parse the client object with the client schema (which should convert the string dates to Date objects)
        const processedClientObj = HPartnerSchema.parse(clientPartnerWithStringDates);

        // Verify string dates were converted to Date objects
        expect(processedClientObj.financial_properties.next_invoice).toBeInstanceOf(Date);
        expect(processedClientObj.financial_properties.last_invoice).toBeInstanceOf(Date);
        expect(processedClientObj.financial_properties.next_invoice?.getTime()).toBe(expectedDate.getTime());
        expect(processedClientObj.financial_properties.last_invoice?.getTime()).toBe(expectedDate.getTime());

        // Now convert to server format
        const serverObj = PartnerSchema.parse(processedClientObj);

        // Verify the server object has Timestamp objects
        expect(serverObj.financial_properties.next_invoice).toBeInstanceOf(Timestamp);
        expect(serverObj.financial_properties.last_invoice).toBeInstanceOf(Timestamp);

        // Convert server object back to client format
        const jsData = convertFirestoreToJS(serverObj, partnerSchemaSpec);
        const roundtripClientObj = HPartnerSchema.parse(jsData);

        // Verify dates were properly roundtripped
        expect(roundtripClientObj.financial_properties.next_invoice).toBeInstanceOf(Date);
        expect(roundtripClientObj.financial_properties.last_invoice).toBeInstanceOf(Date);
        expect(roundtripClientObj.financial_properties.next_invoice?.getTime()).toBe(expectedDate.getTime());
        expect(roundtripClientObj.financial_properties.last_invoice?.getTime()).toBe(expectedDate.getTime());
    });

    it("should preprocess string dates from raw JSON received from API", () => {
        // This test simulates receiving a raw JSON object from an API where dates are strings
        const isoDateString = "2023-04-15T14:30:00.000Z";
        const expectedDate = new Date(isoDateString);

        // Create a raw JSON structure as it would be received from an API
        // All dates are strings, as they would be in JSON
        const rawJsonFromApi = {
            id: "partner-raw-json",
            created_at: "2023-01-01T10:00:00.000Z", // String date
            updated_at: "2023-02-01T11:00:00.000Z", // String date
            created_by: "user1",
            updated_by: null,
            name: "Raw JSON Partner",
            type: "travel-agency",
            is_active: true,
            contact: { email: "json-test@example.com", office_phone: null },
            address: { country: "Netherlands" },
            registration: {},
            users: [],
            banking_details: {
                account_holder: "Raw JSON Partner LLC",
                bank_name: "API Bank",
                iban: "NL00API0123456789"
            },
            parent: null,
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                payment_method: "invoice",
                requires_card: false,
                next_invoice: isoDateString, // String date
                last_invoice: isoDateString, // String date
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: null,
                        custom_prices: []
                    }
                }
            },
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png"
            },
            platform_settings: {
                package_strategy: {
                    name: "default",
                    parameters: {}
                },
                booking_defaults: {
                    locale: "en-US"
                }
            },
            data: {
                source: "api",
                manual: false
            }
        };

        // Parse the raw JSON directly with the client schema
        // This should preprocess all string dates to Date objects
        const processedClientObj = HPartnerSchema.parse(rawJsonFromApi);

        // Verify all string dates were converted to Date objects
        expect(processedClientObj.created_at).toBeInstanceOf(Date);
        expect(processedClientObj.updated_at).toBeInstanceOf(Date);
        expect(processedClientObj.financial_properties.next_invoice).toBeInstanceOf(Date);
        expect(processedClientObj.financial_properties.last_invoice).toBeInstanceOf(Date);

        // Verify conversion was correct
        expect(processedClientObj.created_at.toISOString()).toBe("2023-01-01T10:00:00.000Z");
        expect(processedClientObj.updated_at.toISOString()).toBe("2023-02-01T11:00:00.000Z");
        expect(processedClientObj.financial_properties.next_invoice.toISOString()).toBe(isoDateString);
        expect(processedClientObj.financial_properties.last_invoice.toISOString()).toBe(isoDateString);

        // Now convert to server format to test the full roundtrip
        const serverObj = PartnerSchema.parse(processedClientObj);

        // Verify the server object has Timestamp objects
        expect(serverObj.created_at).toBeInstanceOf(Timestamp);
        expect(serverObj.updated_at).toBeInstanceOf(Timestamp);
        expect(serverObj.financial_properties.next_invoice).toBeInstanceOf(Timestamp);
        expect(serverObj.financial_properties.last_invoice).toBeInstanceOf(Timestamp);

        // Convert server object back to client format
        const jsData = convertFirestoreToJS(serverObj, partnerSchemaSpec);
        const roundtripClientObj = HPartnerSchema.parse(jsData);

        // Verify all dates were properly roundtripped
        expect(roundtripClientObj.created_at).toBeInstanceOf(Date);
        expect(roundtripClientObj.updated_at).toBeInstanceOf(Date);
        expect(roundtripClientObj.financial_properties.next_invoice).toBeInstanceOf(Date);
        expect(roundtripClientObj.financial_properties.last_invoice).toBeInstanceOf(Date);

        // Verify the dates still match the original values
        expect(roundtripClientObj.created_at.toISOString()).toBe("2023-01-01T10:00:00.000Z");
        expect(roundtripClientObj.updated_at.toISOString()).toBe("2023-02-01T11:00:00.000Z");
        expect(roundtripClientObj.financial_properties.next_invoice.toISOString()).toBe(isoDateString);
        expect(roundtripClientObj.financial_properties.last_invoice.toISOString()).toBe(isoDateString);
    });
});

describe("PriceList Schema", () => {
    it("should convert from server to client and back", () => {
        const now = new Date();
        const timestamp = Timestamp.fromDate(now);

        // Create a sample client side PriceList object
        const clientPriceList = {
            id: "price-list-123",
            created_at: now,
            updated_at: now,
            created_by: "user1",
            updated_by: null,

            // PriceList specific fields
            name: "Standard Price List",
            description: "Default prices for all packages",
            type: "partner",
            partner: "partner-1",
            package_prices: [
                {
                    destination: "Spain",
                    label: "10GB Package",
                    type: "data-limited",
                    price: 29.99,
                    package: "package-3"
                },
                {
                    destination: "Italy",
                    label: "5GB Package",
                    type: "data-limited",
                    price: 19.99,
                    package: "package-4"
                }
            ]
        };

        // First convert to server format
        const serverObj = PriceListSchema.parse(clientPriceList);

        // Verify the document references were properly created
        expect(serverObj.partner.id).toBe(clientPriceList.partner);
        expect(serverObj.package_prices[0].package.id).toBe(clientPriceList.package_prices[0].package);

        // Convert server object to JS for client use
        const jsData = convertFirestoreToJS(serverObj, priceListSchemaSpec);

        // Now parse with client schema to convert back
        const roundtripClientObj = HPriceListSchema.parse(jsData);

        // Verify the conversion maintained the core data
        expect(roundtripClientObj.id).toBe(clientPriceList.id);
        expect(roundtripClientObj.name).toBe(clientPriceList.name);
        expect(roundtripClientObj.type).toBe(clientPriceList.type);
        expect(roundtripClientObj.partner).toBe(clientPriceList.partner);
        expect(roundtripClientObj.package_prices.length).toBe(clientPriceList.package_prices.length);

        // Verify package references were converted correctly
        expect(roundtripClientObj.package_prices[0].package).toBe(clientPriceList.package_prices[0].package);

        // Verify other fields remained intact
        expect(roundtripClientObj.name).toBe(clientPriceList.name);
        expect(roundtripClientObj.description).toBe(clientPriceList.description);
    });
});

describe("Firebase to JS conversion", () => {
    it("should convert a Firebase partner object directly to JS", () => {
        const now = new Date();
        const timestamp = Timestamp.fromDate(now);

        // Create a Firebase-style partner object (server format)
        const firebasePartner = {
            id: "firebase-partner-456",
            created_at: timestamp,
            updated_at: timestamp,
            created_by: "user1",
            updated_by: null,

            // Partner specific fields
            name: "Firebase Partner Inc",
            type: "hotel-chain",
            is_active: true,
            external_id: "fb-456",

            // Nested objects
            contact: {
                email: "firebase@example.com",
                office_phone: "+9876543210"
            },
            address: {
                street: "456 Cloud Ave",
                city: "Rotterdam",
                postal_code: "3000 XY",
                country: "Netherlands"
            },
            registration: {
                chamber_of_commerce_number: "87654321",
                vat_number: "NL987654321B01"
            },

            // References - these would be DocumentReference in actual Firestore
            parent: null,
            users: [
                "user-3",
                "user-4"
            ],

            // Financial properties with nested document references
            financial_properties: {
                administration_fee: 30.00,
                payment_method: "credit-card",
                pricing_strategies: {
                    partner: {
                        default_price_list: "price-list-3"
                    }
                }
            }
        };

        // Convert directly from Firebase format to JS
        const jsPartner = convertFirestoreToJS(firebasePartner, partnerSchemaSpec);

        // Verify conversion worked correctly
        expect(jsPartner.id).toBe(firebasePartner.id);
        expect(jsPartner.name).toBe(firebasePartner.name);
        expect(jsPartner.type).toBe(firebasePartner.type);
        expect(jsPartner.created_at).toBeInstanceOf(Date);
        expect(jsPartner.contact.email).toBe(firebasePartner.contact.email);
        expect(jsPartner.address.city).toBe(firebasePartner.address.city);

        // Verify references were properly converted
        expect(jsPartner.users).toEqual(["user-3", "user-4"]);
        expect(jsPartner.financial_properties.pricing_strategies.partner.default_price_list).toBe("price-list-3");
    });
});

describe("JS to Firestore conversion", () => {
    it("should convert string IDs to DocumentReferences", () => {
        // Create a client-side object with various document references as strings
        const clientPartner = {
            id: "test-doc-refs",
            created_at: new Date(),
            updated_at: new Date(),
            created_by: "test-user",
            updated_by: null,
            name: "Document Reference Test",
            type: "test-partner",
            is_active: true,
            contact: { email: "test@example.com", office_phone: null },
            address: { country: "Netherlands" },
            registration: {},
            banking_details: {
                account_holder: "Test Account",
                bank_name: "Test Bank",
                iban: "NL00TEST0123456789"
            },
            // String reference to parent partner
            parent: "parent-partner-id",
            // Array of string references to users
            users: ["user-1", "user-2", "user-3"],
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                payment_method: "invoice",
                requires_card: false,
                next_invoice: new Date(),
                last_invoice: new Date(),
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        // String reference to price list
                        default_price_list: "price-list-id",
                        custom_prices: [
                            {
                                destination: "Test Destination",
                                label: "Test Package",
                                type: "data-limited",
                                price: 19.99,
                                // String reference to package
                                package: "package-id-1"
                            }
                        ]
                    }
                }
            },
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png"
            },
            platform_settings: {
                package_strategy: {
                    name: "default",
                    parameters: {}
                },
                booking_defaults: {
                    locale: "en-US"
                }
            },
            data: {
                source: "test",
                manual: true
            }
        };

        // Convert to Firestore format
        const firestoreObj = convertJSToFirestore(clientPartner, partnerSchemaSpec);

        // Verify document references were properly converted

        // Check parent reference
        expect(firestoreObj.parent).toBeDefined();
        expect(firestoreObj.parent).toHaveProperty('id', 'parent-partner-id');
        expect(firestoreObj.parent).toHaveProperty('path');

        // Check users references array
        expect(Array.isArray(firestoreObj.users)).toBe(true);
        expect(firestoreObj.users.length).toBe(3);
        firestoreObj.users.forEach((userRef: any, index: number) => {
            expect(userRef).toHaveProperty('id', clientPartner.users[index]);
            expect(userRef).toHaveProperty('path');
        });

        // Check nested document reference in pricing strategies
        expect(firestoreObj.financial_properties.pricing_strategies.partner.default_price_list)
            .toHaveProperty('id', 'price-list-id');
        expect(firestoreObj.financial_properties.pricing_strategies.partner.default_price_list)
            .toHaveProperty('path');

        // Check deeply nested document reference in custom prices
        expect(firestoreObj.financial_properties.pricing_strategies.partner.custom_prices[0].package)
            .toHaveProperty('id', 'package-id-1');
        expect(firestoreObj.financial_properties.pricing_strategies.partner.custom_prices[0].package)
            .toHaveProperty('path');

        // Run a full roundtrip to verify convertFirestoreToJS can convert back correctly
        const jsObj = convertFirestoreToJS(firestoreObj, partnerSchemaSpec);

        // Verify converted back to string IDs
        expect(jsObj.parent).toBe('parent-partner-id');
        expect(jsObj.users).toEqual(['user-1', 'user-2', 'user-3']);
        expect(jsObj.financial_properties.pricing_strategies.partner.default_price_list).toBe('price-list-id');
        expect(jsObj.financial_properties.pricing_strategies.partner.custom_prices[0].package).toBe('package-id-1');
    });
});

describe("ModelConverterFactory", () => {
    it("should properly use createModelConverters to convert Partner model to/from Firestore", () => {
        // Get the Firebase service instance
        const firebase = FirebaseService.getDefaultInstance();
        const db = firebase.firestore;

        const now = new Date();

        // Create a sample client side Partner object
        const clientPartner = {
            id: "model-converter-partner-123",
            created_at: now,
            updated_at: now,
            created_by: "user1",
            updated_by: null,

            // Partner specific fields
            name: "Model Converter Test Partner",
            type: "travel-agency",
            is_active: true,
            external_id: "ext-456",

            // Nested objects
            contact: {
                email: "converter-test@example.com",
                office_phone: "+1234567890"
            },
            address: {
                street: "456 Test Ave",
                city: "Rotterdam",
                postal_code: "3000 XY",
                country: "Netherlands"
            },
            registration: {
                chamber_of_commerce_number: "12345678",
                vat_number: "NL123456789B01"
            },
            banking_details: {
                account_holder: "Test Partner LLC",
                bank_name: "Dutch Bank",
                iban: "NL00BANK0123456789"
            },

            // References
            parent: "parent-partner-id",
            users: [
                "user-id-1",
                "user-id-2"
            ],

            // Financial properties
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                commission_fee: 10.00,
                payment_method: "invoice",
                requires_card: false,
                next_invoice: now,
                last_invoice: now,
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: "price-list-id-1",
                        custom_prices: [
                            {
                                destination: "France",
                                label: "5GB Package",
                                type: "data-limited",
                                price: 19.99,
                                package: "package-id-1"
                            }
                        ]
                    },
                    user: {
                        modification_percentage: 5,
                        default_price_list: "price-list-id-2",
                        custom_prices: []
                    }
                }
            },

            // Visual identity
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png",
                font: "Roboto"
            },

            // Platform settings
            platform_settings: {
                package_strategy: {
                    name: "default",
                    iso3_white_list: ["NLD", "DEU", "FRA"],
                    parameters: { default_size: "5GB" }
                },
                booking_defaults: {
                    locale: "en-US"
                }
            },

            // Metadata
            data: {
                source: "manual",
                manual: true
            }
        };

        // Create converters using modelConverterFactory
        const partnerConverters = createModelConverters(db, partnerSchemaSpec);

        // Convert to Firestore format using the factory
        const firestoreData: any = partnerConverters.toFirestore(clientPartner);

        // Log how many times the console.log was called
        // Verify Timestamps were properly converted
        expect(firestoreData.created_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.updated_at).toBeInstanceOf(Timestamp);
        expect(firestoreData.financial_properties.next_invoice).toBeInstanceOf(Timestamp);
        expect(firestoreData.financial_properties.last_invoice).toBeInstanceOf(Timestamp);

        // Verify DocumentReferences were properly created
        expect(firestoreData.parent).toBeDefined();
        expect(firestoreData.parent.id).toBe('parent-partner-id');
        expect(firestoreData.parent).toHaveProperty('path');

        // Check users references array
        expect(Array.isArray(firestoreData.users)).toBe(true);
        expect(firestoreData.users.length).toBe(2);
        firestoreData.users.forEach((userRef: any, index: number) => {
            expect(userRef).toHaveProperty('id', clientPartner.users[index]);
            expect(userRef).toHaveProperty('path');
        });

        // Verify nested document reference in pricing strategies
        expect(firestoreData.financial_properties.pricing_strategies.partner.default_price_list)
            .toHaveProperty('id', 'price-list-id-1');
        expect(firestoreData.financial_properties.pricing_strategies.partner.default_price_list)
            .toHaveProperty('path');

        // Verify deeply nested document reference in custom prices
        expect(firestoreData.financial_properties.pricing_strategies.partner.custom_prices[0].package)
            .toHaveProperty('id', 'package-id-1');
        expect(firestoreData.financial_properties.pricing_strategies.partner.custom_prices[0].package)
            .toHaveProperty('path');

        // Now convert back to client model
        const clientData: any = partnerConverters.fromFirestore(firestoreData);

        // Verify dates were properly converted back
        expect(clientData.created_at).toBeInstanceOf(Date);
        expect(clientData.updated_at).toBeInstanceOf(Date);
        expect(clientData.financial_properties.next_invoice).toBeInstanceOf(Date);
        expect(clientData.financial_properties.last_invoice).toBeInstanceOf(Date);

        // Verify document references were converted back to string IDs
        expect(clientData.parent).toBe('parent-partner-id');
        expect(clientData.users).toEqual(['user-id-1', 'user-id-2']);
        expect(clientData.financial_properties.pricing_strategies.partner.default_price_list).toBe('price-list-id-1');
        expect(clientData.financial_properties.pricing_strategies.partner.custom_prices[0].package).toBe('package-id-1');

        // Verify other properties are preserved
        expect(clientData.name).toBe(clientPartner.name);
        expect(clientData.contact.email).toBe(clientPartner.contact.email);
        expect(clientData.financial_properties.administration_fee).toBe(clientPartner.financial_properties.administration_fee);
    });
});

describe("Partner Name Validation", () => {
    it("should disallow a partner name with just one character", () => {
        // Create a sample partner with a single character name
        const invalidPartner = {
            id: "single-char-name-partner",
            created_at: new Date(),
            updated_at: new Date(),
            created_by: "user1",
            updated_by: null,
            name: "A", // Single character name - should be disallowed
            type: "travel-agency",
            is_active: true,
            contact: {
                email: "test@example.com",
                office_phone: null
            },
            address: {
                street: "123 Main St",
                city: "Amsterdam",
                country: "Netherlands"
            },
            registration: {},
            banking_details: {
                account_holder: "Test Partner LLC",
                bank_name: "Test Bank",
                iban: "NL00TEST0123456789"
            },
            parent: null,
            users: [],
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                payment_method: "invoice",
                requires_card: false,
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: null,
                        custom_prices: []
                    }
                }
            },
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png"
            },
            platform_settings: {
                package_strategy: {
                    name: "default",
                    parameters: {}
                },
                booking_defaults: {
                    locale: "en-US"
                }
            },
            data: {
                source: "test",
                manual: true
            }
        };

        // Expect the PartnerSchema validation to throw an error due to the name length constraint
        expect(() => {
            PartnerSchema.parse(invalidPartner);
        }).toThrow(/String must contain at least 3 character/i);

        // Also expect the HPartnerSchema validation to throw an error
        expect(() => {
            HPartnerSchema.parse(invalidPartner);
        }).toThrow(/String must contain at least 3 character/i);
    });

    it("should convert undefined address fields to null when transforming to Firebase", () => {
        // Create a sample partner with undefined values in address
        const partnerWithUndefinedFields = {
            id: "undefined-fields-partner",
            created_at: new Date(),
            updated_at: new Date(),
            created_by: "user1",
            updated_by: null,
            name: "Test Partner",
            type: "travel-agency",
            is_active: true,
            contact: {
                email: "test@example.com",
                office_phone: null
            },
            address: {
                street: undefined, // Undefined field that should be converted to null
                city: "Amsterdam",
                postal_code: undefined, // Undefined field that should be converted to null
                country: "Netherlands"
            },
            registration: {},
            banking_details: {
                account_holder: "Test Partner LLC",
                bank_name: "Test Bank",
                iban: "NL00TEST0123456789"
            },
            parent: null,
            users: [],
            financial_properties: {
                administration_fee: 25.00,
                income_per_gb: 5.00,
                payment_method: "invoice",
                requires_card: false,
                pricing_strategies: {
                    partner: {
                        strategy: "split",
                        modification_percentage: 10,
                        default_price_list: null,
                        custom_prices: []
                    }
                }
            },
            visual_identity: {
                primary_color: "#FF5733",
                secondary_color: "#33FF57",
                logo: "https://example.com/logo.png"
            },
            platform_settings: {
                package_strategy: {
                    name: "default",
                    parameters: {}
                },
                booking_defaults: {
                    locale: "en-US"
                },
                free_esim: {
                    package_specification: {
                        size: "5GB",
                    },
                    booking_id_verification_pattern: "",
                    allowance: 10
                }
            },
            data: {
                source: "test",
                manual: true
            }
        };

        // Convert to Firestore format
        const firestoreObj = convertJSToFirestore(partnerWithUndefinedFields, partnerSchemaSpec);

        // Verify undefined fields are converted to null
        expect(firestoreObj.address.street).toBeNull();
        expect(firestoreObj.address.postal_code).toBeNull();

        // Verify other fields are maintained
        expect(firestoreObj.address.city).toBe("Amsterdam");
        expect(firestoreObj.address.country).toBe("Netherlands");

        // Converting back to client format should maintain nulls
        const jsData = convertFirestoreToJS(firestoreObj, partnerSchemaSpec);
        expect(jsData.address.street).toBeNull();
        expect(jsData.address.postal_code).toBeNull();

        expect(jsData.platform_settings.free_esim.booking_id_verification).toBe(false);
    });
}); 