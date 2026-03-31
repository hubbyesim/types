import { markAsSchemaSpec } from '../common';
import { tagModelSpec } from './common';

// Tag collection schema spec built from shared tag model
export const tagSchemaSpec = markAsSchemaSpec(tagModelSpec);
