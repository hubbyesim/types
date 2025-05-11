/**
 * Utils barrel file
 * Exports all utility functions from a single point for easier imports
 */

// Export collections
export * from './collections';

// Export the documentation helpers
export * from './documentation';

// Export the validation helpers
export * from './validator';

// Export the version compatibility helpers
export * from './version';

// Export schema utilities
export * from './schemas';

// Export conversion utilities
export {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    convertToDate,
    isDate,
    genericToFirestore,
    genericFromFirestore
} from '.';

// Nested field conversions
export { processNestedFieldsToFirestore, processNestedFieldsFromFirestore } from './nested-conversions';
export type { NestedFieldPathMapping } from './nested-conversions';

// Add other utility exports as needed 