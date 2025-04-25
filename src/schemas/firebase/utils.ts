import { convertToDate, isDate } from '../base/utils';

// Re-export the base utility functions
export { convertToDate, isDate };

// Re-export the Firebase conversion utilities from the original utils.ts
export {
    GenericRefFieldMapping,
    GenericDateFieldMapping,
    genericToFirestore,
    genericFromFirestore
} from '../utils'; 