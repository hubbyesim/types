"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documented = documented;
exports.documentedObject = documentedObject;
/**
 * Adds documentation to a Zod schema using JSDoc-style comments
 * This makes schema fields self-documenting when users hover over them in their IDE
 *
 * @param schema The Zod schema to document
 * @param description Documentation string that will appear in IDE tooltips
 * @returns The same schema with documentation attached
 */
function documented(schema, description) {
    return schema.describe(description);
}
/**
 * Creates a documented object schema by adding JSDoc comments to each field
 *
 * @param schema The object schema to document
 * @param fieldDocs Record of field names to their documentation strings
 * @returns The same schema with field documentation attached
 */
function documentedObject(schema, fieldDocs) {
    // Get the original shape of the schema
    const shape = schema.shape;
    // Create a new shape with documented fields
    const documentedShape = Object.assign({}, shape);
    for (const [key, value] of Object.entries(shape)) {
        if (key in fieldDocs && fieldDocs[key]) {
            documentedShape[key] = documented(value, fieldDocs[key]);
        }
    }
    // Return a new schema with the documented shape
    return schema.extend(documentedShape);
}
