import { PromoCodeSchema, HPromoCodeSchema } from "../src";
import { Timestamp } from "firebase-admin/firestore";
import { convertFirestoreToJS } from "../src/schemas/utils/firestoreTransformUtils";
import { promoCodeSchemaSpec } from "../src/schemas/specs/promocode";

describe("PromoCode Schema", () => {
    it("should convert from server to client and back", () => {
        const now = new Date();
        const timestamp = Timestamp.fromDate(now);

        // Create a sample client side PromoCode object
        const clientPromoCode = {
            id: "test-id-123",
            created_at: now,
            updated_at: now,
            created_by: "user1",
            updated_by: null,

            // PromoCode specific fields
            external_id: "ext-123",
            code: "SUMMER2023",
            allowance_user: 1,
            allowance_total: 100,
            type: "full-discount",
            usage: ["user1", "user2"],
            uuid_usage: ["uuid1", "uuid2"],
            package_specification: {
                destination: "Netherlands",
                size: "5GB",
                package_id: "pkg-123",
                iata_code: "AMS"
            },
            valid_from: now,
            valid_to: now,

            // References
            partner: "partner-123",
            package: null,
            country: "nld",
            booking: null,

            // Optional fields
            discount: 100,
            package_size: "5GB",
            countries: ["nl", "de", "fr"],
            max_bytes: 5000000000,
            starter_data: 100000000
        };

        // First convert to server format
        const serverObj = PromoCodeSchema.parse(clientPromoCode);

        // Verify the document references were properly created
        expect(serverObj.partner.id).toBe(clientPromoCode.partner);
        expect(serverObj.country.id).toBe(clientPromoCode.country);

        // Convert server object to JS for client use
        const jsData = convertFirestoreToJS(serverObj, promoCodeSchemaSpec);

        // Now parse with client schema to convert back
        const roundtripClientObj = HPromoCodeSchema.parse(jsData);

        // Verify the conversion maintained the core data
        expect(roundtripClientObj.id).toBe(clientPromoCode.id);
        expect(roundtripClientObj.code).toBe(clientPromoCode.code);
        expect(roundtripClientObj.external_id).toBe(clientPromoCode.external_id);
        expect(roundtripClientObj.allowance_user).toBe(clientPromoCode.allowance_user);
        expect(roundtripClientObj.allowance_total).toBe(clientPromoCode.allowance_total);
        expect(roundtripClientObj.type).toBe(clientPromoCode.type);
        expect(roundtripClientObj.package_specification.destination).toBe(clientPromoCode.package_specification.destination);
        expect(roundtripClientObj.partner).toBe(clientPromoCode.partner);
        expect(roundtripClientObj.country).toBe(clientPromoCode.country);
        expect(roundtripClientObj.discount).toBe(clientPromoCode.discount);
    });
}); 