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