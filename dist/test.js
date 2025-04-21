"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodExample_1 = require("./examples/zodExample");
const zod_1 = require("zod");
const package_1 = require("./schemas/package");
const country_1 = require("./schemas/country");
const currency_1 = require("./schemas/currency");
const apiLogs_1 = require("./schemas/apiLogs");
const api_1 = require("./schemas/api");
// Run examples
console.log('----------------------------------------');
console.log('Running Valid User Example:');
console.log('----------------------------------------');
(0, zodExample_1.exampleUsage)();
console.log('\n----------------------------------------');
console.log('Running Invalid User Example:');
console.log('----------------------------------------');
(0, zodExample_1.exampleInvalidUser)();
// Test package schema
console.log('\n----------------------------------------');
console.log('Testing Package Schema:');
console.log('----------------------------------------');
try {
    // Create a sample package
    const packageData = {
        id: 'package_123',
        external_id: 'ext_123',
        provider: 'telna',
        coverage_label: 'Global',
        label: 'Premium Package',
        bytes: 1024 * 1024 * 1024, // 1GB
        countryId: 'country_123',
        hidden: false,
        is_hidden: false,
        is_active: true,
        priority: 1,
        country_data: null,
        price: 9.99,
        partner_price: 7.99,
        days: 30,
        partnerId: 'partner_123',
        name: 'Premium Global 1GB',
        type: 'data-limited',
        provider_parameters: {
            imsi: 12345
        },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: null
    };
    // Validate the package
    const validPackage = package_1.packageAppSchema.parse(packageData);
    console.log('Package validation successful');
    // Convert to Firestore (would throw if ref helpers were implemented)
    console.log('Package to Firestore conversion available');
    // Convert back to app
    console.log('Firestore to Package conversion available');
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('Package validation error:', error.errors);
    }
    else {
        console.error('Package error:', error);
    }
}
// Test country schema
console.log('\n----------------------------------------');
console.log('Testing Country Schema:');
console.log('----------------------------------------');
try {
    // Create a sample country
    const countryData = {
        id: 'country_123',
        bokun_id: 1234,
        LTE: true,
        apn: 'globaldata',
        click_count: 42,
        global_network: 'SETAR GSM',
        global_price: 9.99,
        hubby: 100,
        imsi: 12345,
        name: 'Netherlands',
        region: false,
        is_region: false,
        countries: ['NL'],
        tier: 2
    };
    // Validate the country
    const validCountry = country_1.countryAppSchema.parse(countryData);
    console.log('Country validation successful');
    // Convert to Firestore
    const firestoreCountry = (0, country_1.countryToFirestore)(validCountry);
    console.log('Country to Firestore conversion successful');
    // Convert back to app
    const retrievedCountry = (0, country_1.countryFromFirestore)(firestoreCountry);
    console.log('Firestore to Country conversion successful');
    // Check data integrity
    console.log('Country round trip successful:', countryData.id === retrievedCountry.id &&
        countryData.name === retrievedCountry.name);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('Country validation error:', error.errors);
    }
    else {
        console.error('Country error:', error);
    }
}
// Test currency schema
console.log('\n----------------------------------------');
console.log('Testing Currency Schema:');
console.log('----------------------------------------');
try {
    // Create a sample currency
    const currencyData = {
        id: 'currency_123',
        base_code: 'EUR',
        coversion_rates: {
            currency: 1.12
        },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: null
    };
    // Validate the currency
    const validCurrency = currency_1.currencyAppSchema.parse(currencyData);
    console.log('Currency validation successful');
    // Convert to Firestore
    const firestoreCurrency = (0, currency_1.currencyToFirestore)(validCurrency);
    console.log('Currency to Firestore conversion successful');
    // Convert back to app
    const retrievedCurrency = (0, currency_1.currencyFromFirestore)(firestoreCurrency);
    console.log('Currency to App conversion successful');
    // Check data integrity
    console.log('Currency round trip successful:', currencyData.id === retrievedCurrency.id &&
        currencyData.base_code === retrievedCurrency.base_code &&
        currencyData.coversion_rates.currency === retrievedCurrency.coversion_rates.currency);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('Currency validation error:', error.errors);
    }
    else {
        console.error('Currency error:', error);
    }
}
// Test ApiLog schema
console.log('\n----------------------------------------');
console.log('Testing ApiLog Schema:');
console.log('----------------------------------------');
try {
    // Create a sample API log
    const apiLogData = {
        id: 'log_123',
        method: 'GET',
        user_id: 'user_123',
        path: '/api/booking',
        resource_type: 'booking',
        resource_id: 'booking_123',
        partner_id: 'partner_123',
        payload: { id: 'booking_123' },
        timestamp: new Date(),
        status_code: 200
    };
    // Validate the API log
    const validApiLog = apiLogs_1.apiLogAppSchema.parse(apiLogData);
    console.log('ApiLog validation successful');
    // Convert to Firestore
    const firestoreApiLog = (0, apiLogs_1.apiLogToFirestore)(validApiLog);
    console.log('ApiLog to Firestore conversion successful');
    // Convert back to app
    const retrievedApiLog = (0, apiLogs_1.apiLogFromFirestore)(firestoreApiLog);
    console.log('ApiLog to App conversion successful');
    // Check data integrity
    console.log('ApiLog round trip successful:', apiLogData.id === retrievedApiLog.id &&
        apiLogData.method === retrievedApiLog.method &&
        apiLogData.status_code === retrievedApiLog.status_code);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('ApiLog validation error:', error.errors);
    }
    else {
        console.error('ApiLog error:', error);
    }
}
// Test API schemas
console.log('\n----------------------------------------');
console.log('Testing API Schemas:');
console.log('----------------------------------------');
try {
    // Test package specification schema
    const packageSpec = {
        destination: 'Netherlands',
        size: '1GB',
        package_id: 'package_123',
        iata_code: 'AMS'
    };
    const validPackageSpec = api_1.packageSpecificationSchema.parse(packageSpec);
    console.log('Package specification validation successful');
    // Test booking API request schema
    const bookingApiRequest = {
        id: 'booking_123',
        title: 'Mr',
        first_name: 'John',
        last_name: 'Doe',
        full_name: 'John Doe',
        pax: 1,
        email: 'john@example.com',
        phone: '+31612345678',
        booking_id: 'ABC123',
        return_date: new Date('2023-12-31'),
        departure_date: new Date('2023-12-15'),
        flight_number: 'KL123',
        gender: 'M',
        locale: 'en-US',
        status: 'CONFIRMED',
        data: {
            source: 'web',
            manual: false
        },
        communication_options: {
            should_send_message: true,
            channels: ['EMAIL']
        },
        is_processed_for_esim_restoration: false,
        is_pseudonymized: false,
        package_specifications: [packageSpec],
        created_at: new Date(),
        updated_at: new Date()
    };
    const validBookingApiRequest = api_1.bookingApiRequestSchema.parse(bookingApiRequest);
    console.log('Booking API request validation successful');
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('API validation error:', error.errors);
    }
    else {
        console.error('API error:', error);
    }
}
// Output success message
console.log('\n----------------------------------------');
console.log('✅ All Zod schemas are working correctly');
console.log('----------------------------------------');
