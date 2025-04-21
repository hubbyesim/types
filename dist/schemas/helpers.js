"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docRefToStringSchema = exports.createDocRefSchema = exports.hubbyModelAppSchema = exports.hubbyModelFirestoreSchema = exports.baseModelAppSchema = exports.baseModelSchema = exports.fromFirestore = exports.toFirestore = exports.fieldValueSchema = exports.documentRefSchema = exports.timestampSchema = void 0;
const zod_1 = require("zod");
const firestore_1 = require("firebase-admin/firestore");
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
        // Note: This is a simplified version. In a real implementation, 
        // you'd need to use the Firestore instance to create a proper reference.
        // This would typically use something like:
        // return firestore.collection(collectionPath).doc(id) as DocumentReference<T>;
        throw new Error('Implementation requires Firestore instance');
    }
};
exports.fromFirestore = {
    date: (timestamp) => timestamp.toDate(),
    ref: (docRef) => docRef.id
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
