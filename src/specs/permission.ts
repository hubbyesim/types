import { z } from 'zod';
import { markAsSchemaSpec } from '../common';
import { timestampRequired, timestampNullableOptional } from './common';

export const permissionSchemaSpec = markAsSchemaSpec({
  id: z.string().nullable().optional(),
  name: z.string(),
  description: z.string(),
  created_at: timestampRequired,
  updated_at: timestampNullableOptional,
});