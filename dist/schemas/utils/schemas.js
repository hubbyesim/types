"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferenceSchemas = createReferenceSchemas;
exports.createArrayReferenceSchemas = createArrayReferenceSchemas;
const zod_1 = require("zod");
const helpers_1 = require("../helpers");
/**
 * Creates both Firestore and App schema versions of a reference field
 * @param collection The collection path
 * @param nullable Whether the reference is nullable
 * @returns An object with Firestore and App schema definitions
 */
function createReferenceSchemas(collection, nullable = false) {
    const refSchema = (0, helpers_1.createDocRefSchema)(collection);
    // Create Firestore schema - either the document reference schema or nullable version
    const firestoreSchema = nullable
        ? refSchema.schema.nullable()
        : refSchema.schema;
    // Create App schema - either the string schema or nullable version
    const appSchema = nullable
        ? (0, helpers_1.docRefToStringSchema)(refSchema).nullable()
        : (0, helpers_1.docRefToStringSchema)(refSchema);
    return {
        firestore: firestoreSchema,
        app: appSchema,
        refSchema
    };
}
/**
 * Creates both Firestore and App schema versions of an array reference field
 * @param collection The collection path
 * @param nullable Whether the array itself is nullable
 * @returns An object with Firestore and App schema definitions
 */
function createArrayReferenceSchemas(collection, nullable = false) {
    const refSchema = (0, helpers_1.createDocRefSchema)(collection);
    // Create Firestore schema - array of document references, optionally nullable
    const firestoreSchema = nullable
        ? zod_1.z.array(refSchema.schema).nullable()
        : zod_1.z.array(refSchema.schema);
    // Create App schema - array of strings, optionally nullable
    const appSchema = nullable
        ? zod_1.z.array(zod_1.z.string()).nullable()
        : zod_1.z.array(zod_1.z.string());
    return {
        firestore: firestoreSchema,
        app: appSchema,
        refSchema
    };
}
