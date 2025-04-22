"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE_COLLECTION = exports.docRefToStringSchema = exports.createDocRefSchema = exports.hubbyModelAppSchema = exports.hubbyModelFirestoreSchema = exports.baseModelAppSchema = exports.baseModelSchema = exports.fromFirestore = exports.toFirestore = exports.fieldValueSchema = exports.documentRefSchema = exports.timestampSchema = exports.MockDocumentReference = exports.isTestEnvironment = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase-admin/firestore");
// Flag to indicate if we're running in a test environment
exports.isTestEnvironment = false;
// Test environment document references for mocking
class MockDocumentReference {
    constructor(collectionPath, id) {
        this.path = `${collectionPath}/${id}`;
        this.id = id;
    }
}
exports.MockDocumentReference = MockDocumentReference;
// Firebase type schemas with custom type guards instead of z.instanceof
exports.timestampSchema = zod_1.z.custom((val) => val instanceof firestore_1.Timestamp);
exports.documentRefSchema = zod_1.z.custom((val) => typeof val === 'object' &&
    val !== null &&
    'path' in val &&
    'id' in val);
exports.fieldValueSchema = zod_1.z.custom((val) => typeof val === 'object' &&
    val !== null &&
    'isEqual' in val);
// Conversion helpers
exports.toFirestore = {
    date: (date) => firestore_1.Timestamp.fromDate(date),
    ref: (collectionPath, id) => {
        // For tests, return a mock document reference
        if (exports.isTestEnvironment) {
            return new MockDocumentReference(collectionPath, id);
        }
        // In a real environment, this requires a Firestore instance
        throw new Error('Implementation requires Firestore instance');
    }
};
exports.fromFirestore = {
    date: (timestamp) => timestamp.toDate(),
    ref: (docRef) => {
        if (docRef instanceof MockDocumentReference) {
            return docRef.id;
        }
        return docRef.id;
    }
};
// Base model schema for common fields
exports.baseModelSchema = zod_1.z.object({
    id: zod_1.z.string(),
    created_at: exports.timestampSchema,
    updated_at: exports.timestampSchema,
    created_by: zod_1.z.union([zod_1.z.string(), zod_1.z.null(), exports.documentRefSchema]),
    updated_by: zod_1.z.union([zod_1.z.string(), zod_1.z.null(), exports.documentRefSchema])
});
// App version of the base model
exports.baseModelAppSchema = zod_1.z.object({
    id: zod_1.z.string(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
    created_by: zod_1.z.union([zod_1.z.string(), zod_1.z.null()]),
    updated_by: zod_1.z.union([zod_1.z.string(), zod_1.z.null()])
});
// Define HubbyModel schemas explicitly
exports.hubbyModelFirestoreSchema = exports.baseModelSchema;
exports.hubbyModelAppSchema = exports.baseModelAppSchema;
// Helper function to create document reference schemas
const createDocRefSchema = (collectionPath) => {
    const schema = exports.documentRefSchema.refine((ref) => ref.path.startsWith(collectionPath), {
        message: `Document reference must be from collection ${collectionPath}`
    });
    return {
        schema,
        collectionPath
    };
};
exports.createDocRefSchema = createDocRefSchema;
// Helper function to convert a document reference schema to a string schema
const docRefToStringSchema = (docRefSchema) => {
    return zod_1.z.string().describe(`ID from ${docRefSchema.collectionPath}`);
};
exports.docRefToStringSchema = docRefToStringSchema;
exports.PROFILE_COLLECTION = 'profiles';
