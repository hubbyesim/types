import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { toFirestore, fromFirestore } from '../firebase/helpers';

/**
 * Interface for nested field path mapping configuration
 */
export interface NestedFieldPathMapping {
  path: string[]; // Path to the nested field (e.g., ['api_keys', 'keys', '*', 'expires_at'])
  type: 'timestamp' | 'reference';
  collection?: string; // Required for reference type
  nullable?: boolean;
  arrayField?: boolean; // Whether the field is an array of references/timestamps
  wildcardIndex?: number; // Index in the path that contains a wildcard '*'
}

/**
 * Deep traverses an object and returns the value at the specified path
 */
const getValueAtPath = (obj: any, path: string[], wildcardIndex?: number): any[] => {
  if (!obj) return [];

  if (path.length === 0) return [obj];

  const [first, ...rest] = path;

  // Handle wildcard in the path
  if (first === '*' && wildcardIndex !== undefined) {
    if (!obj || typeof obj !== 'object') return [];

    // Collect all values at all possible keys at this level
    const results: any[] = [];
    for (const key of Object.keys(obj)) {
      const nestedResults = getValueAtPath(obj[key], rest, wildcardIndex);
      results.push(...nestedResults);
    }
    return results;
  }

  return getValueAtPath(obj[first], rest, wildcardIndex);
};

/**
 * Deep traverses an object and sets the value at the specified path
 */
const setValueAtPath = (
  obj: any,
  path: string[],
  valueTransformer: (value: any) => any,
  wildcardIndex?: number,
  arrayField?: boolean
): void => {
  if (!obj || path.length === 0) return;

  const [first, ...rest] = path;

  // Handle wildcard in the path
  if (first === '*' && wildcardIndex !== undefined) {
    if (!obj || typeof obj !== 'object') return;

    for (const key of Object.keys(obj)) {
      setValueAtPath(obj[key], rest, valueTransformer, wildcardIndex, arrayField);
    }
    return;
  }

  if (rest.length === 0) {
    // We're at the leaf node, set the transformed value
    if (obj[first] !== undefined && obj[first] !== null) {
      // Handle array fields specially
      if (arrayField && Array.isArray(obj[first])) {
        obj[first] = obj[first].map((item: any) => valueTransformer(item));
      } else {
        obj[first] = valueTransformer(obj[first]);
      }
    }
    return;
  }

  // Ensure the path exists
  if (obj[first] === undefined) {
    obj[first] = {};
  }

  setValueAtPath(obj[first], rest, valueTransformer, wildcardIndex, arrayField);
};

/**
 * Processes nested fields in an object, converting them to Firestore format
 */
export const processNestedFieldsToFirestore = (
  obj: any,
  nestedFieldMappings: NestedFieldPathMapping[]
): void => {
  if (!obj) return;

  nestedFieldMappings.forEach(mapping => {
    const { path, type, collection, nullable, wildcardIndex, arrayField } = mapping;

    setValueAtPath(
      obj,
      path,
      (value) => {
        if (nullable && value === null) return null;

        if (type === 'timestamp' && value instanceof Date) {
          return toFirestore.date(value);
        }

        if (type === 'reference' && typeof value === 'string' && collection) {
          return toFirestore.ref(collection, value);
        }

        return value;
      },
      wildcardIndex,
      arrayField
    );
  });
};

/**
 * Processes nested fields in an object, converting them from Firestore format
 */
export const processNestedFieldsFromFirestore = (
  obj: any,
  nestedFieldMappings: NestedFieldPathMapping[]
): void => {
  if (!obj) return;

  nestedFieldMappings.forEach(mapping => {
    const { path, type, nullable, wildcardIndex, arrayField } = mapping;

    setValueAtPath(
      obj,
      path,
      (value) => {
        if (nullable && value === null) return null;

        if (type === 'timestamp' && value && typeof value === 'object' && 'toDate' in value) {
          return fromFirestore.date(value as Timestamp);
        }

        if (type === 'reference' && value && typeof value === 'object' && value.id) {
          return fromFirestore.ref(value as DocumentReference);
        }

        return value;
      },
      wildcardIndex,
      arrayField
    );
  });
};

/**
 * ========================
 * RECURSIVE CONVERTER IMPLEMENTATION 
 * ========================
 */

/**
 * Type definitions to recognize field types
 */
type ReferenceField = { type: 'reference', collection: string, isArray?: boolean };
type TimestampField = { type: 'timestamp' };
type FieldType = ReferenceField | TimestampField;

/**
 * Interface for specifying type mappings for recursive conversion
 */
export interface RecursiveTypeMapping {
  [key: string]: FieldType | RecursiveTypeMapping;
}

/**
 * Helper function to create a DocumentReference mock with path property
 * for testing purposes
 */
const createDocRefWithPath = (collection: string, id: string) => {
  const ref = toFirestore.ref(collection, id);
  // Add path property if it doesn't exist in test mocks
  if (!('path' in ref)) {
    Object.defineProperty(ref, 'path', {
      get: function () { return `${collection}/${id}`; }
    });
  }
  return ref;
};

/**
 * Recursively processes an object to convert values to Firestore format
 * @param obj - The object to process
 * @param typeMappings - Type mappings for fields that need conversion
 * @returns - A new object with converted values
 */
export const recursiveToFirestore = (
  obj: any,
  typeMappings?: RecursiveTypeMapping
): any => {
  if (obj === null) {
    return null;
  }

  if (obj === undefined) {
    return undefined;
  }

  // Handle primitive values directly
  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return toFirestore.date(obj);
  }

  // Handle arrays by recursively processing each element
  if (Array.isArray(obj)) {
    // Check if we're dealing with an array of references
    if (typeMappings && '*' in typeMappings) {
      const itemMapping = typeMappings['*'];

      // Handle array of references
      if (typeof itemMapping === 'object' && 'type' in itemMapping && itemMapping.type === 'reference') {
        return obj.map(id => {
          if (typeof id === 'string') {
            return toFirestore.ref((itemMapping as ReferenceField).collection, id);
          }
          return recursiveToFirestore(id, itemMapping as any);
        });
      }
    }

    // Regular array handling
    return obj.map(item => recursiveToFirestore(item, typeMappings));
  }

  // Process object recursively
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      // Skip undefined values to avoid creating empty objects
      continue;
    }

    // Check if we have specific type mapping for this field
    const fieldMapping = typeMappings?.[key];

    if (fieldMapping && typeof fieldMapping === 'object' && 'type' in fieldMapping) {
      // This is a direct field mapping
      if (value === null) {
        result[key] = null;
      } else if (fieldMapping.type === 'timestamp' && value instanceof Date) {
        result[key] = toFirestore.date(value);
      } else if (fieldMapping.type === 'reference') {
        const refField = fieldMapping as ReferenceField;
        if (refField.isArray && Array.isArray(value)) {
          // Handle array of references
          result[key] = value.map((id: string) =>
            toFirestore.ref(refField.collection, id)
          );
        } else if (typeof value === 'string') {
          // Handle single reference
          result[key] = toFirestore.ref(refField.collection, value);
        } else {
          // Fallback
          result[key] = recursiveToFirestore(value, undefined);
        }
      } else {
        result[key] = recursiveToFirestore(value, undefined);
      }
    } else if (fieldMapping && typeof fieldMapping === 'object') {
      // This is a nested mapping
      if (value === null) {
        result[key] = null;
      } else if (typeof value === 'object') {
        const nestedResult = recursiveToFirestore(value, fieldMapping as RecursiveTypeMapping);
        // Only assign the nested result if it's not undefined or an empty object
        if (nestedResult !== undefined && (typeof nestedResult !== 'object' || Object.keys(nestedResult).length > 0)) {
          result[key] = nestedResult;
        }
      } else {
        result[key] = value;
      }
    } else {
      // No specific mapping, just recurse
      result[key] = recursiveToFirestore(value, undefined);
    }
  }

  return result;
};

/**
 * Recursively processes an object to convert Firestore values to app model format
 * @param obj - The Firestore object to process
 * @param typeMappings - Type mappings for fields that need conversion
 * @returns - A new object with converted values
 */
export const recursiveFromFirestore = (
  obj: any,
  typeMappings?: RecursiveTypeMapping
): any => {
  if (obj === null) {
    return null;
  }

  if (obj === undefined) {
    return undefined;
  }

  // Handle primitive values directly
  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle Timestamp objects
  if (obj && typeof obj === 'object' && 'toDate' in obj && typeof obj.toDate === 'function') {
    return fromFirestore.date(obj as Timestamp);
  }

  // Handle DocumentReference objects
  if (obj && typeof obj === 'object' && 'id' in obj && typeof (obj as any).id === 'string') {
    return fromFirestore.ref(obj as DocumentReference);
  }

  // Handle arrays by recursively processing each element
  if (Array.isArray(obj)) {
    // Check if we're dealing with an array of references
    if (typeMappings && '*' in typeMappings) {
      const itemMapping = typeMappings['*'];

      // Handle array of references
      if (typeof itemMapping === 'object' && 'type' in itemMapping && itemMapping.type === 'reference') {
        return obj.map(ref => fromFirestore.ref(ref as DocumentReference));
      }
    }

    // Regular array processing
    return obj.map(item => recursiveFromFirestore(item, typeMappings));
  }

  // Process object recursively
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Check if we have specific type mapping for this field
    const fieldMapping = typeMappings?.[key];

    if (fieldMapping && typeof fieldMapping === 'object' && 'type' in fieldMapping) {
      // This is a direct field mapping
      if (value === null) {
        result[key] = null;
      } else if (fieldMapping.type === 'timestamp' && value && typeof value === 'object' && 'toDate' in value) {
        result[key] = fromFirestore.date(value as Timestamp);
      } else if (fieldMapping.type === 'reference') {
        const refField = fieldMapping as ReferenceField;
        if (refField.isArray && Array.isArray(value)) {
          // Handle array of references
          result[key] = value.map(ref => fromFirestore.ref(ref as DocumentReference));
        } else if (value && typeof value === 'object' && 'id' in value) {
          // Handle single reference
          result[key] = fromFirestore.ref(value as DocumentReference);
        } else {
          // Fallback
          result[key] = recursiveFromFirestore(value, undefined);
        }
      } else {
        result[key] = recursiveFromFirestore(value, undefined);
      }
    } else if (fieldMapping && typeof fieldMapping === 'object') {
      // This is a nested mapping
      if (value === null) {
        result[key] = null;
      } else if (typeof value === 'object') {
        const nestedResult = recursiveFromFirestore(value, fieldMapping as RecursiveTypeMapping);
        // Only assign the nested result if it's not undefined or an empty object
        if (nestedResult !== undefined && (typeof nestedResult !== 'object' || Object.keys(nestedResult).length > 0)) {
          result[key] = nestedResult;
        }
      } else {
        result[key] = value;
      }
    } else {
      // No specific mapping, just recurse
      result[key] = recursiveFromFirestore(value, undefined);
    }
  }

  return result;
};

/**
 * Example usage for API keys:
 * 
 * const apiKeysMappings: NestedFieldPathMapping[] = [
 *   {
 *     path: ['api_keys', 'keys', '*', 'expires_at'],
 *     type: 'timestamp',
 *     nullable: true,
 *     wildcardIndex: 2
 *   }
 * ];
 */ 