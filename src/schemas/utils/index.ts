/**
 * Centralized exports for all schema utilities
 */

// Export collection paths
export * from './collections';

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
} from '../utils'; 