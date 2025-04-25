/**
 * Utils barrel file for Firebase schemas
 * Exports all utility functions from a single point for easier imports
 */

// Export collections
export * from './collections';

// Export the documentation helpers
export * from '../../utils/documentation';

// Export the validation helpers
export * from '../../utils/validator';

// Export the version compatibility helpers
export * from '../../utils/version';

// Export schema utilities
export * from '../../utils/schemas';

// Export conversion utilities
export {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    convertToDate,
    isDate,
    genericToFirestore,
    genericFromFirestore
} from '../../utils'; 