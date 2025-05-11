import { z } from 'zod';

/**
 * Adds documentation to a Zod schema using JSDoc-style comments
 * This makes schema fields self-documenting when users hover over them in their IDE
 * 
 * @param schema The Zod schema to document
 * @param description Documentation string that will appear in IDE tooltips
 * @returns The same schema with documentation attached
 */
export function documented<T extends z.ZodTypeAny>(
  schema: T,
  description: string
): T {
  return schema.describe(description) as T;
}

/**
 * Creates a documented object schema by adding JSDoc comments to each field
 * 
 * @param schema The object schema to document
 * @param fieldDocs Record of field names to their documentation strings
 * @returns The same schema with field documentation attached
 */
export function documentedObject<T extends z.ZodObject<any>>(
  schema: T,
  fieldDocs: Record<string, string>
): T {
  type Shape = z.ZodRawShape;
  
  // Get the original shape of the schema
  const shape = schema.shape as Shape;
  
  // Create a new shape with documented fields
  const documentedShape = { ...shape };
  
  for (const [key, value] of Object.entries(shape)) {
    if (key in fieldDocs && fieldDocs[key]) {
      documentedShape[key] = documented(value as z.ZodTypeAny, fieldDocs[key]);
    }
  }
  
  // Return a new schema with the documented shape
  return schema.extend(documentedShape) as T;
} 