import {
    ApiLogApp, ApiLogFirestore, apiLogToFirestore, apiLogFromFirestore
} from '../src/schemas/firebase/apiLogs';
import { Timestamp } from 'firebase-admin/firestore';

// --- Mock Helpers ---
jest.mock('../src/schemas/firebase/helpers', () => {
    const originalHelpers = jest.requireActual('../src/schemas/firebase/helpers');
    return {
        ...originalHelpers,
        toFirestore: {
            ...originalHelpers.toFirestore,
            date: (date: Date) => ({ toDate: () => date, toMillis: () => date.getTime() } as Timestamp),
        },
        fromFirestore: {
            ...originalHelpers.fromFirestore,
            date: (timestamp: Timestamp) => timestamp.toDate(),
        },
    };
});
// --- End Mocks ---

describe('ApiLog Schema Conversion', () => {
    it('should correctly convert between ApiLogApp and ApiLogFirestore (Roundtrip)', () => {
        const now = new Date();
        const logTimestamp = new Date(Math.floor((now.getTime() - 5000) / 1000) * 1000); // 5 seconds ago
        const logId = 'log_mno456';
        const userId = 'user_api_caller';
        const resourceId = 'resource_abc';
        const partnerId = 'partner_api_owner';

        const initialApiLogApp: ApiLogApp = {
            // id is optional in Firestore schema, assume it's added during write or not part of App object
            // Base model fields (created_at, etc.) are NOT part of apiLogAppSchema
            method: 'POST',
            user_id: userId,
            path: '/v1/resource',
            resource_type: 'resource',
            resource_id: resourceId,
            partner_id: partnerId,
            payload: { data: 'sample', value: 123 },
            timestamp: logTimestamp,
            status_code: 201,
        };

        // Convert to Firestore
        // Note: genericToFirestore expects baseModel fields, but ApiLog doesn't have them.
        // Need to check how apiLogToFirestore is implemented. Assuming it handles this.
        const apiLogFirestore = apiLogToFirestore(initialApiLogApp);

        // Basic Checks
        expect(apiLogFirestore.method).toBe('POST');
        expect(apiLogFirestore.user_id).toBe(userId);
        expect(apiLogFirestore.path).toBe('/v1/resource');
        expect(apiLogFirestore.resource_type).toBe('resource');
        expect(apiLogFirestore.resource_id).toBe(resourceId);
        expect(apiLogFirestore.partner_id).toBe(partnerId);
        expect(apiLogFirestore.payload).toEqual({ data: 'sample', value: 123 });
        expect(apiLogFirestore.timestamp?.toDate()).toEqual(logTimestamp);
        expect(apiLogFirestore.status_code).toBe(201);
        // expect(apiLogFirestore.id).toBeUndefined(); // Assuming ID is not part of the converted object here

        // Convert back to App
        // Need to potentially add ID if fromFirestore expects it
        const firestoreDataWithId = { ...apiLogFirestore, id: logId }; // Add ID if necessary for `from` function
        const finalApiLogApp = apiLogFromFirestore(firestoreDataWithId);

        // Assertions
        expect(finalApiLogApp.timestamp?.getTime()).toEqual(initialApiLogApp.timestamp?.getTime());

        // Compare rest (excluding date)
        const finalFiltered = { ...finalApiLogApp, timestamp: undefined };
        // Remove id from comparison if it was added only for the 'from' function call
        delete finalFiltered.id; 
        const initialFiltered = { ...initialApiLogApp, timestamp: undefined };
        
        expect(finalFiltered).toEqual(initialFiltered);
    });
}); 