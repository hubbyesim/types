import {
    PartnerSchema,
    HPartnerSchema,
    PriceListSchema,
    HPriceListSchema
} from "../src";
import { Timestamp } from "firebase-admin/firestore";
import { convertFirestoreToJS } from "../src/schemas/utils/firestoreTansformUtils";

describe("Partner Schema", () => {
    it("should convert from server to client and back", () => {
        const now = new Date();
        const timestamp = Timestamp.fromDate(now);

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
        const jsData = convertFirestoreToJS(serverObj);

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
        const jsData = convertFirestoreToJS(serverObj);

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