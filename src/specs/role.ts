import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired, timestampNullableOptional, PERMISSION_COLLECTION } from './common';

export const roleSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  name: z.string(),
  description: z.string(),
  permissions: { _type: 'array' as const, of: { _type: 'docRef' as const, collection: PERMISSION_COLLECTION }, optional: true, nullable: true },
  created_at: timestampRequired,
  updated_at: timestampNullableOptional,
});